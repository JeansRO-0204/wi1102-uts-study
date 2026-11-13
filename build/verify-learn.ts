// Lesson verifier. Run from the repo root:  node build/verify-learn.ts [--only D05]
// Loads app/src/learn/lessons/*.ts and checks every block: Python examples run (through the same harness the site uses),
// pseudocode / flowchart versions compile and print the SAME output as the Python for the same stdin, traces and predicts run,
// quiz indices are valid, embedded bank question ids exist, syntax ids exist, slide pages exist, line notes are in range.
import { spawn } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { createInterface } from 'node:readline'
import { fileURLToPath, pathToFileURL } from 'node:url'
import type { Lesson, Block } from '../app/src/learn/types.ts'
import type { BankFile, LineNote, PageRef } from '../app/src/types.ts'
import { pseudoToPython } from '../app/src/code/pseudo.ts'
import { flowToPython } from '../app/src/code/flow.ts'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null
const errors: string[] = [], warns: string[] = []
const err = (where: string, m: string) => errors.push(`✗ ${where}: ${m}`)
const warn = (where: string, m: string) => warns.push(`⚠ ${where}: ${m}`)

const pyProc = spawn('python3', ['-I', path.join(ROOT, 'app/src/py/harness.py')], { stdio: ['pipe', 'pipe', 'inherit'] })
const pyLines = createInterface({ input: pyProc.stdout! })
const queue: ((s: string) => void)[] = []
pyLines.on('line', (l) => queue.shift()?.(l))
const py = <T = any>(req: object): Promise<T> => new Promise((res) => { queue.push((l) => res(JSON.parse(l))); pyProc.stdin!.write(JSON.stringify(req) + '\n') })
const run = (code: string, stdin: string[] = []) => py<{ stdout: string; error?: string | null; timeout?: boolean }>({ op: 'run', code, stdin })

// bank part ids
const bankIds = new Set<string>()
for (const f of readdirSync(path.join(ROOT, 'app/src/bank')).filter((f) => f.endsWith('.ts') && f !== 'index.ts' && !f.startsWith('_'))) {
  const mod = (await import(pathToFileURL(path.join(ROOT, 'app/src/bank', f)).href)) as { bank?: BankFile }
  for (const p of mod.bank?.problems ?? []) for (const q of p.parts) bankIds.add(q.id)
}
const syntaxSrc = readFileSync(path.join(ROOT, 'app/src/content/syntax.ts'), 'utf8')
const syntaxIds = new Set([...syntaxSrc.matchAll(/^\s*id: '([a-z-]+)'/gm)].map((m) => m[1]))
const pageIndex = JSON.parse(readFileSync(path.join(ROOT, 'app/public/pages/index.json'), 'utf8')) as Record<string, number>
// local-only sources (gitignored page folders, e.g. the practicum sheets) aren't in the tracked index: count their images
for (const d of readdirSync(path.join(ROOT, 'app/public/pages'), { withFileTypes: true })) if (d.isDirectory() && !pageIndex[d.name]) pageIndex[d.name] = readdirSync(path.join(ROOT, 'app/public/pages', d.name)).filter((x) => x.endsWith('.jpg')).length
const checkRef = (w: string, r: PageRef) => { const n = pageIndex[r.src]; if (!n) err(w, `unknown source '${r.src}'`); else if (r.page < 1 || r.page > n) err(w, `${r.src} has ${n} pages, cited p${r.page}`) }
const checkNotes = (w: string, notes: LineNote[] | undefined, src: string) => {
  const n = src.replace(/\n+$/, '').split('\n').length
  for (const x of notes ?? []) { const [a, b] = Array.isArray(x.line) ? x.line : [x.line, x.line]; if (a < 1 || b > n || a > b) err(w, `line note ${JSON.stringify(x.line)} outside 1..${n}`) }
}
const norm = (s: string) => s.replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '')
const ID_WORDS = /\b(yang|dengan|untuk|adalah|tidak|jika|maka|dan|atau|ini|itu|dari|pada|akan|bisa|harus)\b/gi

const dir = path.join(ROOT, 'app/src/learn/lessons')
const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.ts')).sort() : []
let blocks = 0, runs = 0, lessonsN = 0
for (const f of files) {
  const mod = (await import(pathToFileURL(path.join(dir, f)).href)) as { lesson?: Lesson }
  const L = mod.lesson
  if (!L) { err(f, 'no `lesson` export'); continue }
  if (only && L.deck !== only) continue
  lessonsN++
  if (!L.title || !L.summary || !L.goals?.length || !L.sections?.length) err(f, 'title, summary, goals and sections are required')
  const secIds = new Set<string>()
  for (const s of L.sections) {
    const W = `${L.deck}/${s.id}`
    if (secIds.has(s.id)) err(W, 'duplicate section id'); secIds.add(s.id)
    if (!/^[a-z0-9-]+$/.test(s.id)) err(W, 'section id must be kebab-case')
    if (!s.blocks.length) err(W, 'empty section')
    const hasDoing = s.blocks.some((b) => ['code', 'trace', 'predict', 'quiz', 'question'].includes(b.t))
    if (!hasDoing) warn(W, 'no interactive block (code / trace / predict / quiz / question) in this section')
    for (const [i, b] of s.blocks.entries()) {
      blocks++
      const w = `${W}#${i + 1} ${b.t}`
      const prose = JSON.stringify(b)
      const idHits = (prose.match(ID_WORDS) ?? []).length
      if (idHits >= 4) warn(w, `looks Indonesian (${idHits} Indonesian words): lessons are in English`)
      await checkBlock(w, b)
    }
  }
}

async function checkBlock(w: string, b: Block) {
  switch (b.t) {
    case 'text': for (const r of b.refs ?? []) checkRef(w, r); if (!b.md.trim()) err(w, 'empty text'); break
    case 'key': case 'trap': if (!b.md.trim()) err(w, 'empty'); break
    case 'slide': checkRef(w, b.ref); break
    case 'syntax': for (const id of b.ids) if (!syntaxIds.has(id)) err(w, `unknown syntax id '${id}'`); break
    case 'question': if (!bankIds.has(b.id)) err(w, `no bank question with id '${b.id}' (use a PART id, e.g. 'd05-oddeven-b')`); break
    case 'quiz': {
      if (b.options.length < 2) err(w, 'needs at least 2 options')
      if (!b.correct.length) err(w, 'no correct option')
      if (b.correct.some((c) => c < 0 || c >= b.options.length)) err(w, 'correct index out of range')
      if (b.why.length !== b.options.length) err(w, `why[] must have one entry per option (${b.why.length} vs ${b.options.length})`)
      break
    }
    case 'trace': case 'predict': {
      runs++
      const r = await run(b.code, b.stdin)
      if (r.error) err(w, `Python error: ${r.error.split('\n').slice(-1)[0]}`)
      if (b.t === 'trace') checkNotes(w, b.notes, b.code)
      if (b.t === 'predict' && !r.stdout.trim()) err(w, 'prints nothing: nothing to predict')
      break
    }
    case 'code': {
      if (!b.python && !b.pseudo && !b.flow) { err(w, 'needs python, pseudo or flow'); break }
      let ref: string | null = null
      if (b.python) {
        runs++
        const r = await run(b.python, b.stdin)
        if (r.error) err(w, `Python error: ${r.error.split('\n').slice(-1)[0]}`)
        else ref = norm(r.stdout)
        checkNotes(w, b.notes, b.python)
      }
      if (b.pseudo) {
        const t = pseudoToPython(b.pseudo)
        if (t.errors.length) err(w, `pseudocode: line ${t.errors[0].line}: ${t.errors[0].msg}`)
        else {
          runs++
          const r = await run(t.code, b.stdin)
          if (r.error) err(w, `pseudocode runs into: ${r.error.split('\n').slice(-1)[0]}`)
          else if (ref !== null && norm(r.stdout) !== ref) err(w, `pseudocode prints ${JSON.stringify(norm(r.stdout).slice(0, 80))}, Python prints ${JSON.stringify(ref.slice(0, 80))}`)
        }
        checkNotes(w, b.pseudoNotes, b.pseudo)
      }
      if (b.flow) {
        const t = flowToPython(b.flow)
        if (t.errors.length) err(w, `flowchart: ${t.errors[0]}`)
        else {
          runs++
          const r = await run(t.code, b.stdin)
          if (r.error) err(w, `flowchart runs into: ${r.error.split('\n').slice(-1)[0]}`)
          else if (ref !== null && norm(r.stdout) !== ref) err(w, `flowchart prints ${JSON.stringify(norm(r.stdout).slice(0, 80))}, Python prints ${JSON.stringify(ref.slice(0, 80))}`)
        }
      }
      break
    }
  }
}

pyProc.stdin!.end()
for (const m of warns) console.log(m)
for (const m of errors) console.log(m)
console.log(`${lessonsN} lessons, ${blocks} blocks, ${runs} Python runs, ${errors.length} errors, ${warns.length} warnings`)
console.log(errors.length ? 'FAILED' : 'OK')
process.exit(errors.length ? 1 : 0)
