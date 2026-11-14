// Bank verifier + answer-key baker.  Run from the repo root:  node build/verify.ts [--only <idPrefix>]
// (Node ≥ 23 strips TypeScript types natively; bank files only `import type`, so they load as-is.)
//
// For every question it checks structure and RUNS the reference answers through app/src/py/harness.py in CPython
// (the same harness the browser runs in Pyodide), then writes app/src/bank/_expected.json.
// Exit code 1 if anything is wrong. Optional modules (robot simulator, pseudocode transpiler, flowchart compiler)
// are used when they exist, so this script works before and after the Phase-1 widgets land.
import { spawn } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createInterface } from 'node:readline'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import type { BankFile, Expected, PageRef, Problem, Question } from '../app/src/types.ts'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BANK = path.join(ROOT, 'app/src/bank')
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null
const errors: string[] = []
const warns: string[] = []
const err = (id: string, m: string) => errors.push(`✗ ${id}: ${m}`)
const warn = (id: string, m: string) => warns.push(`⚠ ${id}: ${m}`)

/* ---------- Python harness (persistent CPython process, JSON lines) ---------- */
const pyProc = spawn('python3', ['-I', path.join(ROOT, 'app/src/py/harness.py')], { stdio: ['pipe', 'pipe', 'inherit'] })
const pyLines = createInterface({ input: pyProc.stdout! })
const queue: ((s: string) => void)[] = []
pyLines.on('line', (l) => queue.shift()?.(l))
function py<T = any>(req: object): Promise<T> {
  return new Promise((res) => { queue.push((l) => res(JSON.parse(l))); pyProc.stdin!.write(JSON.stringify(req) + '\n') })
}

/* ---------- optional TS modules from Phase 1 ---------- */
async function optional<T>(rel: string): Promise<T | null> {
  const f = path.join(ROOT, rel)
  return existsSync(f) ? ((await import(pathToFileURL(f).href)) as T) : null
}
const robotMod = await optional<{ runRobot(dialect: string, src: string, param: string, n: number): { path: string; error?: string } }>('app/src/robot/sim.ts')
const pseudoMod = await optional<{ pseudoToPython(src: string): { code: string; errors: { line: number; msg: string }[] } }>('app/src/code/pseudo.ts')
const flowMod = await optional<{ flowToPython(f: unknown): { code: string; errors: string[] } }>('app/src/code/flow.ts')

/* ---------- load bank ---------- */
const pageIndex = JSON.parse(readFileSync(path.join(ROOT, 'app/public/pages/index.json'), 'utf8')) as Record<string, number>
// local-only sources (gitignored page folders, e.g. the practicum sheets) aren't in the tracked index: count their images
for (const d of readdirSync(path.join(ROOT, 'app/public/pages'), { withFileTypes: true })) if (d.isDirectory() && !pageIndex[d.name]) pageIndex[d.name] = readdirSync(path.join(ROOT, 'app/public/pages', d.name)).filter((x) => x.endsWith('.jpg')).length
const problems: { p: Problem; file: string }[] = []
const flashFiles: [string, { id: string; topic: string }[]][] = []
for (const f of readdirSync(BANK).filter((f) => f.endsWith('.ts') && f !== 'index.ts' && !f.startsWith('_')).sort()) {
  const mod = (await import(pathToFileURL(path.join(BANK, f)).href)) as { bank?: BankFile }
  if (!mod.bank) { err(f, 'no `bank` export'); continue }
  for (const p of mod.bank.problems) problems.push({ p, file: f })
  if (mod.bank.flashcards?.length) flashFiles.push([f, mod.bank.flashcards])
}

const DECKS = new Set(['D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D07', 'D08', 'D09', 'D10', 'D11'])
const seen = new Set<string>()
const checkRef = (id: string, r: PageRef | string) => {
  if (typeof r === 'string') { if (!existsSync(path.join(ROOT, 'app/public', r))) err(id, `figure file missing: ${r}`); return }
  const n = pageIndex[r.src]
  if (!n) err(id, `unknown source '${r.src}'`)
  else if (r.page < 1 || r.page > n) err(id, `${r.src} has ${n} pages, cited h${r.page}`)
}

const expected: Record<string, Expected> = {}
const stats = { problems: 0, questions: 0, ran: 0 }

/** Compare learner/variant output with reference under a match mode (mirrors practice/answerCheck.ts outputOk). */
function tokens(s: string) { return s.toLowerCase().replace(/(\d),(\d)/g, '$1.$2').replace(/[^\p{L}\p{N}.\-+]+/gu, ' ').trim().split(/\s+/).filter(Boolean) }
function sameOut(mode: string, got: string, ref: string) {
  const trim = (s: string) => s.replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '')
  if (mode === 'exact') return trim(got) === trim(ref)
  if (mode === 'numbers') { const n = (s: string) => (s.match(/[-+]?\d+(?:\.\d+)?(?:e[-+]?\d+)?/gi) ?? []).map(Number); const a = n(got), b = n(ref); return a.length === b.length && a.every((x, i) => Math.abs(x - b[i]) < 1e-9) }
  // lenient: identical to sameLenient() in app/src/practice/answerCheck.ts (numbers exact & in order; expected words in order, extra words allowed)
  const tk = (s: string) => tokens(s).map((t) => t.replace(/^[.+]+|[.\-+]+$/g, '')).filter(Boolean)
  const isNum = (t: string) => /^-?\d+(?:\.\d+)?(?:e[-+]?\d+)?$/i.test(t)
  const LIT = new Set(['none', 'true', 'false', 'not', 'no', 'never', 'tidak', 'bukan', 'tak', 'belum'])
  const line = (gs: string, rs: string) => {
    const g = tk(gs), r = tk(rs)
    const gn = g.filter(isNum).map(Number), rn = r.filter(isNum).map(Number)
    if (gn.length !== rn.length || !gn.every((x, i) => Math.abs(x - rn[i]) < 1e-9 * Math.max(1, Math.abs(rn[i])))) return false
    const gw = g.filter((t) => !isNum(t)), rw = r.filter((t) => !isNum(t))
    let k = 0
    for (const w of gw) { if (k < rw.length && w === rw[k]) k++; else if (LIT.has(w)) return false }
    return k === rw.length
  }
  const lines = (s: string) => s.replace(/\r/g, '').split('\n').filter((l) => tk(l).length)
  const gl = lines(got), rl = lines(ref)
  return gl.length === rl.length && gl.every((l, i) => line(l, rl[i]))
}

async function verifyQuestion(p: Problem, q: Question) {
  const id = q.id
  if (seen.has(id)) err(id, 'duplicate question id'); seen.add(id)
  if (!q.decks?.length || q.decks.some((d) => !DECKS.has(d))) err(id, `bad decks ${JSON.stringify(q.decks)}`)
  if (!q.stem?.trim()) err(id, 'empty stem')
  if (!q.explanation?.trim()) warn(id, 'no explanation')
  for (const r of [...(q.refs ?? []), ...(q.figures ?? [])]) checkRef(id, r)
  const exp: Expected = {}
  // line-by-line notes must point inside their listing
  const notesIn = (notes: { line: number | [number, number] }[] | undefined, listing: string | undefined, what: string) => {
    if (!notes || !listing) return
    const n = listing.split('\n').length
    for (const x of notes) { const [a, b] = Array.isArray(x.line) ? x.line : [x.line, x.line]; if (a < 1 || b > n || a > b) err(id, `${what} line ${JSON.stringify(x.line)} outside 1..${n}`) }
  }
  if (q.kind === 'program') {
    notesIn(q.lineNotes, q.solution.python, 'lineNotes'); notesIn(q.pseudoNotes, q.solution.pseudo, 'pseudoNotes')
    if (!q.lineNotes?.length) warn(id, 'program without lineNotes')
  }
  if (q.kind === 'trace') { notesIn(q.lineNotes, q.code ?? q.pseudo, 'lineNotes'); if (!q.lineNotes?.length && !q.flow) warn(id, 'trace without lineNotes') }
  if (q.kind === 'bug') notesIn(q.lineNotes, q.code, 'lineNotes')

  switch (q.kind) {
    case 'mcq-multi':
      if (q.correct.length !== q.options.length) err(id, 'correct[] length ≠ options length')
      if (!q.correct.some(Boolean)) err(id, 'no correct option (exam guarantees at least one)')
      if (q.why && q.why.length !== q.options.length) err(id, 'why[] length ≠ options length')
      if (q.en?.options && q.en.options.length !== q.options.length) err(id, 'en.options length mismatch')
      break
    case 'mcq':
      if (!q.answer.length || q.answer.some((a) => a < 0 || a >= q.options.length)) err(id, 'answer index out of range')
      if (q.en?.options && q.en.options.length !== q.options.length) err(id, 'en.options length mismatch')
      break
    case 'short':
      if (!q.blanks.length || q.blanks.some((b) => !b.accept.length)) err(id, 'blank without accepted answers')
      for (const h of q.hints ?? []) for (const b of q.blanks) for (const a of b.accept) if (a.length > 2 && h.includes(a)) warn(id, `hint leaks the answer "${a}"`)
      break
    case 'open':
      if (!q.answer?.trim()) err(id, 'open question without model answer')
      if (q.rubric) checkRubric(id, q.rubric)
      break
    case 'constraint': {
      const r = await py<{ value: string[] | null; error: string | null }>({ op: 'call', code: q.check, fn: 'check', args: [q.solution] })
      stats.ran++
      if (r.error) err(id, `check() crashed on the reference solution: ${r.error}`)
      else if (!Array.isArray(r.value)) err(id, 'check() must return a list of messages')
      else if (r.value.length) err(id, `reference solution violates: ${r.value.join(' | ')}`)
      if (q.rubric) checkRubric(id, q.rubric)
      break
    }
    case 'classify':
      if (q.model.codes.length !== q.rows.length) err(id, `model.codes has ${q.model.codes.length} codes for ${q.rows.length} rows`)
      if (new Set(q.model.codes).size !== q.model.codes.length) err(id, 'model codes are not unique')
      if (q.rows.some((row) => row.length !== q.columns.length)) err(id, 'row length ≠ columns length')
      if (q.rubric) checkRubric(id, q.rubric)
      break
    case 'robot':
      if (!q.nValues.length) err(id, 'no nValues')
      if (robotMod) {
        exp.paths = {}
        for (const n of q.nValues) {
          const r = robotMod.runRobot(q.dialect, q.solution, q.param, n)
          if (r.error) err(id, `reference robot program fails for ${q.param}=${n}: ${r.error}`)
          exp.paths[String(n)] = r.path
        }
      } else warn(id, 'robot simulator (app/src/robot/sim.ts) not built yet: paths not baked')
      if (q.rubric) checkRubric(id, q.rubric)
      break
    case 'program': {
      if (!q.tests.length) err(id, 'no tests')
      if (q.match === 'judge' && !q.judge) err(id, "match 'judge' without judge()")
      if (q.required && !q.reps.includes(q.required)) err(id, 'required rep not in reps')
      exp.outputs = []
      for (const t of q.tests) {
        const r = await py({ op: 'run', code: q.solution.python, stdin: t.stdin ?? [] }); stats.ran++
        if (r.error) err(id, `reference solution fails on stdin ${JSON.stringify(t.stdin ?? [])}: ${r.error}`)
        if (r.stdin_left) { /* reserved */ }
        exp.outputs.push(r.stdout)
        if (q.judge) {
          const j = await py<{ value: string | null; error: string | null }>({ op: 'call', code: q.judge, fn: 'judge', args: [t.stdin ?? [], r.stdout, r.stdout] })
          if (j.error) err(id, `judge() crashed: ${j.error}`)
          else if (j.value) err(id, `judge() rejects the reference output: ${j.value}`)
        }
      }
      if (q.mustUse?.length) {
        const s = await py<{ defs: { name: string; returns_value: boolean }[]; uses: Record<string, boolean>; syntax_error: string | null }>({ op: 'static', code: q.solution.python })
        for (const m of q.mustUse) {
          const ok = m === 'function' ? s.defs.some((d) => d.returns_value) : m === 'procedure' ? s.defs.some((d) => !d.returns_value) : m === 'subprogram' ? s.defs.length > 0
            : m === 'array' ? s.uses.list || s.uses.list_index : s.uses[m]
          if (!ok) err(id, `reference solution does not satisfy mustUse '${m}'`)
        }
      }
      for (const [k, w] of (q.wrong ?? []).entries()) {
        let failed = false
        for (const [i, t] of q.tests.entries()) {
          const r = await py({ op: 'run', code: w.code, stdin: t.stdin ?? [] }); stats.ran++
          let ok = !r.error && !r.timeout
          if (ok && q.match === 'judge' && q.judge) { const j = await py<{ value: string | null }>({ op: 'call', code: q.judge, fn: 'judge', args: [t.stdin ?? [], r.stdout, exp.outputs[i]] }); ok = !j.value }
          else if (ok) ok = sameOut(q.match, r.stdout, exp.outputs[i])
          if (!ok) { failed = true; break }
        }
        if (!failed) err(id, `wrong[${k}] passes every test: add a test that catches it ("${w.msg.slice(0, 50)}…")`)
      }
      for (const [rep, src] of [['pseudo', q.solution.pseudo], ['flow', q.solution.flow]] as const) {
        if (!src) continue
        const tr = rep === 'pseudo' ? pseudoMod?.pseudoToPython(src as string) : flowMod?.flowToPython(src)
        if (!tr) { warn(id, `${rep} solution present but its compiler is not built yet`); continue }
        if (tr.errors.length) { err(id, `${rep} solution does not compile: ${JSON.stringify(tr.errors[0])}`); continue }
        for (const [i, t] of q.tests.entries()) {
          const r = await py({ op: 'run', code: tr.code, stdin: t.stdin ?? [] }); stats.ran++
          if (r.error || !sameOut(q.match === 'judge' ? 'lenient' : q.match, r.stdout, exp.outputs[i])) { err(id, `${rep} solution output differs from Python on test ${i + 1}: ${r.error ?? JSON.stringify(r.stdout.slice(0, 80))}`); break }
        }
      }
      if (q.rubric) checkRubric(id, q.rubric)
      break
    }
    case 'trace': {
      const n = [q.code, q.pseudo, q.flow].filter(Boolean).length
      if (n !== 1) { err(id, 'trace needs exactly one of code / pseudo / flow'); break }
      let code = q.code
      if (q.pseudo) { const t = pseudoMod?.pseudoToPython(q.pseudo); if (!t) { warn(id, 'pseudocode transpiler not built yet'); break } if (t.errors.length) { err(id, `pseudo does not compile: ${JSON.stringify(t.errors[0])}`); break } code = t.code }
      if (q.flow) { const t = flowMod?.flowToPython(q.flow); if (!t) { warn(id, 'flowchart compiler not built yet'); break } if (t.errors.length) { err(id, `flow does not compile: ${t.errors[0]}`); break } code = t.code }
      if ((q.ask === 'table' || q.ask === 'final') && !q.watch?.length) err(id, `ask '${q.ask}' needs watch[]`)
      const r = await py<{ stdout: string; error: string | null; trace: { line: number; vars: Record<string, string> }[] }>({ op: 'trace', code, stdin: q.stdin ?? [], watch: q.watch }); stats.ran++
      if (r.error) err(id, `program errors: ${r.error}`)
      exp.output = r.stdout
      const last = r.trace.at(-1)
      if (last) exp.final = last.vars
      if (q.watch?.length) {
        // one row each time the watched state changes (all watched vars defined or not)
        const rows: Record<string, string>[] = []
        for (const s of r.trace) {
          const row = Object.fromEntries(q.watch.map((w) => [w, s.vars[w] ?? '']))
          const prev = rows.at(-1)
          if (!prev || q.watch.some((w) => prev[w] !== row[w])) rows.push(row)
        }
        exp.table = rows.filter((row) => Object.values(row).some((v) => v !== ''))
      }
      break
    }
    case 'bug': {
      const lines = q.code.split('\n').length
      if (q.badLines.some((l) => l < 1 || l > lines)) err(id, 'badLines out of range')
      break
    }
  }
  if (Object.keys(exp).length) expected[id] = exp
}

/* ---------- language completeness (site is English; Indonesian sources need full `en` mirrors) ---------- */
const langIssues = new Map<string, string[]>() // file → issues
const ID_WORDS = /\b(yang|dan|untuk|dengan|adalah|tidak|karena|jika|setiap|nilai|baris|maka|sehingga|harus|agar|bukan|sudah|belum|kalau|di dalam|perulangan|keluaran|masukan)\b/i
const looksId = (s?: string) => !!s && (s.match(new RegExp(ID_WORDS, 'gi'))?.length ?? 0) >= 2
function langCheck(file: string, p: Problem) {
  const out: string[] = langIssues.get(file) ?? []
  const add = (id: string, m: string) => out.push(`${id}: ${m}`)
  const lang = p.source.lang
  // an English mirror must keep the source's structure: same GFM table rows, code fences and list items (no summaries)
  const shape = (s: string) => { const L = s.split('\n'); return [L.filter((l) => /^\s*\|.*\|\s*$/.test(l)).length, (s.match(/```/g) ?? []).length, L.filter((l) => /^\s*([-*]|\d+[.)])\s+/.test(l)).length] }
  const same = (id: string, k: string, a: unknown, b: unknown) => {
    if (typeof a !== 'string' || typeof b !== 'string') return
    const [ta, fa, la] = shape(a), [tb, fb, lb] = shape(b)
    if (ta !== tb) add(id, `en.${k} has ${tb} table rows, the source has ${ta}`)
    if (fa !== fb) add(id, `en.${k} has ${fb / 2} code blocks, the source has ${fa / 2}`)
    if (la !== lb) add(id, `en.${k} has ${lb} list items, the source has ${la}`)
  }
  if (lang === 'id') {
    same(p.id, 'intro', p.intro, p.en?.intro)
    for (const q of p.parts) {
      same(q.id, 'stem', q.stem, q.en?.stem); same(q.id, 'explanation', q.explanation, q.en?.explanation)
      if (q.kind === 'open') same(q.id, 'answer', q.answer, q.en?.answer)
      q.work?.forEach((w, i) => same(q.id, `work[${i}]`, w, q.en?.work?.[i]))
    }
    if (p.intro && !p.en?.intro) add(p.id, 'intro without en.intro')
    if (!p.en?.title && /\b(soal|dan|yang)\b/i.test(p.title)) add(p.id, 'title without en.title')
  }
  for (const q of p.parts) {
    const e = q.en ?? {}
    const notes = 'lineNotes' in q ? (q.lineNotes ?? []) : []
    const pnotes = q.kind === 'program' ? (q.pseudoNotes ?? []) : []
    const rubric = 'rubric' in q ? (q.rubric ?? []) : []
    const samples = 'samples' in q ? (q.samples ?? []) : []
    const wrong = q.kind === 'program' ? (q.wrong ?? []) : []
    if (lang === 'id') {
      if (!e.stem) add(q.id, 'en.stem')
      if ('options' in q && !e.options) add(q.id, 'en.options')
      if (q.kind === 'mcq-multi' && q.why && !e.why) add(q.id, 'en.why')
      if (q.kind === 'mcq' && q.why && !e.why) add(q.id, 'en.why')
      if (q.explanation && !e.explanation) add(q.id, 'en.explanation')
      if (q.hints?.length && !e.hints) add(q.id, 'en.hints')
      if (q.work?.length && !e.work) add(q.id, 'en.work')
      if (q.kind === 'open' && !e.answer) add(q.id, 'en.answer')
      if (q.kind === 'open' && q.keyPoints?.length && !e.keyPoints) add(q.id, 'en.keyPoints')
      if (q.kind === 'program' && q.plan && !e.plan) add(q.id, 'en.plan')
      if (q.kind === 'short' && !e.labels) add(q.id, 'en.labels')
      if (rubric.some((r) => !r.descEn)) add(q.id, 'rubric descEn')
      if (samples.some((s) => !s.noteEn)) add(q.id, 'sample noteEn')
      if ([...notes, ...pnotes].some((n) => !n.en)) add(q.id, 'lineNotes en')
      if (wrong.some((w) => !w.msgEn)) add(q.id, 'wrong msgEn')
    } else {
      // English source: everything written for the site must already be English
      const fields: [string, string | undefined][] = [['stem', q.stem], ['explanation', q.explanation], ...(q.hints ?? []).map((h, i): [string, string] => [`hints[${i}]`, h]),
        ...(q.work ?? []).map((h, i): [string, string] => [`work[${i}]`, h]), ...notes.map((n, i): [string, string] => [`lineNotes[${i}]`, n.note]),
        ...wrong.map((w, i): [string, string] => [`wrong[${i}].msg`, w.msg]), ...rubric.map((r, i): [string, string] => [`rubric[${i}]`, r.desc]),
        ...(q.kind === 'open' ? [['answer', q.answer] as [string, string]] : []), ...(q.kind === 'program' ? [['plan', q.plan] as [string, string | undefined]] : [])]
      for (const [k, v] of fields) if (looksId(v)) { add(q.id, `${k} looks Indonesian`); break }
    }
    // site-written labels are always English, whatever the source language: topic chips, test names/edges, judge feedback
    const ONE_ID = /\b(yang|dan|untuk|dengan|tidak|kasus|nilai|baris|perulangan|pengulangan|percabangan|keluaran|masukan|ditemukan|kosong|semua|negatif|positif|jumlah|rata|terbesar|terkecil|struktur|dasar|konsep|dampak|hukum|etika|penugasan|klasifikasi|bersarang|deret|rumus|menghitung|membaca|kasus|contoh|sama|hanya|dalam|perangkat|ancaman|kekerasan|kecanduan|sintaks|prosedur|fungsi|privasi|dunia|menelusuri|pola|graf|pilar|optimasi|simulasi|pencarian|lisensi|pembajakan|komputasi|mencegah|istilah|abstraksi|dekomposisi|algoritma|tugas|kode|hak)\b/i
    if (ONE_ID.test(q.topic)) add(q.id, `topic "${q.topic}" not English`)
    if (q.kind === 'program') {
      for (const t of q.tests) for (const s of [t.edge, t.name]) if (s && ONE_ID.test(s)) { add(q.id, `test label "${s}" not English`); break }
      if (q.judge && /return\s+f?["'][^"'\n]*\b(tidak|harus|salah|keluaran|seharusnya|baris|kota|belum|kurang)\b/i.test(q.judge)) add(q.id, 'judge() messages not English')
    }
  }
  langIssues.set(file, out)
}
const fcIssues = new Map<string, string[]>()
function flashLang(file: string, cards: { id: string; topic: string }[]) {
  const ONE_ID = /\b(yang|dan|untuk|dengan|tidak|perulangan|pengulangan|percabangan|keluaran|masukan|dasar|konsep|dampak|hukum|etika|klasifikasi|struktur)\b/i
  const bad = cards.filter((c) => ONE_ID.test(c.topic)).map((c) => `${c.id}: flashcard topic "${c.topic}" not English`)
  if (bad.length) langIssues.set(file, [...(langIssues.get(file) ?? []), ...bad])
  void fcIssues
}

function checkRubric(id: string, rows: { score: number }[]) {
  const ok = new Set([0, 1, 2, 3, 3.5, 4])
  if (rows.some((r) => !ok.has(r.score))) err(id, 'rubric score must be 0, 1, 2, 3, 3.5 or 4')
  if (!rows.some((r) => r.score === 4)) warn(id, 'rubric has no score-4 row')
}

for (const { p, file } of problems) {
  if (only && !p.id.startsWith(only)) continue
  stats.problems++
  if (seen.has('P:' + p.id)) err(p.id, `duplicate problem id (${file})`); seen.add('P:' + p.id)
  if (!p.parts.length) err(p.id, 'problem without parts')
  for (const r of p.figures ?? []) checkRef(p.id, r)
  if (p.source.src && !pageIndex[p.source.src]) err(p.id, `unknown source src '${p.source.src}'`)
  for (const pg of p.source.pages ?? []) if (p.source.src && pageIndex[p.source.src] && (pg < 1 || pg > pageIndex[p.source.src])) err(p.id, `source page ${pg} out of range`)
  const w = p.parts.map((q) => q.weight).filter((x) => x != null) as number[]
  if (w.length && (w.length !== p.parts.length || Math.abs(w.reduce((a, b) => a + b, 0) - 1) > 1e-6)) err(p.id, `part weights must be given for all parts and sum to 1 (got ${JSON.stringify(w)})`)
  for (const q of p.parts) { stats.questions++; await verifyQuestion(p, q) }
  if (!p.source.lang) err(p.id, 'source.lang missing')
  langCheck(file, p)
}
pyProc.stdin!.end()

// local-only bank files (gitignored, never on the public site): their expected results go to a gitignored file too
const LOCAL_BANK = new Set(['practicum.ts'])
const localIds = new Set(problems.filter((x) => LOCAL_BANK.has(x.file)).flatMap((x) => x.p.parts.map((q) => q.id)))
const pick = (local: boolean) => Object.fromEntries(Object.entries(expected).filter(([id]) => localIds.has(id) === local))
const out = path.join(BANK, '_expected.json')
if (!only) {
  writeFileSync(out, JSON.stringify(pick(false), null, 0) + '\n')
  if (localIds.size) writeFileSync(path.join(BANK, '_expected.local.json'), JSON.stringify(pick(true), null, 0) + '\n')
}
const bySrc = new Map<string, number>()
for (const { p } of problems) bySrc.set(p.source.kind, (bySrc.get(p.source.kind) ?? 0) + p.parts.length)
console.log(`${stats.problems} problems, ${stats.questions} questions, ${stats.ran} Python runs · by source: ${[...bySrc].map(([k, v]) => `${k} ${v}`).join(', ')}`)
for (const [f, cards] of flashFiles) flashLang(f, cards)
// language completeness: summary per file; --lang prints every issue; --strict-lang makes them errors
const strictLang = process.argv.includes('--strict-lang')
for (const [file, issues] of langIssues) {
  if (!issues.length) continue
  console.log(`🌐 ${file}: ${issues.length} language issue(s)` + (process.argv.includes('--lang') || strictLang ? '\n   ' + issues.join('\n   ') : ''))
  if (strictLang) issues.forEach((i) => err(file, 'lang ' + i))
}
warns.forEach((w) => console.log(w))
errors.forEach((e) => console.log(e))
console.log(errors.length ? `FAILED: ${errors.length} error(s)` : `OK${only ? '' : ` → ${path.relative(ROOT, out)}`}`)
process.exit(errors.length ? 1 : 0)
