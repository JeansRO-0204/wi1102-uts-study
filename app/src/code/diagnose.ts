// Diagnosis of learner programs and trace answers. PURE TypeScript with type-only imports, so it can be unit-tested in
// plain Node: everything that needs the browser (Pyodide, answerCheck, explainError) is injected through `DiagDeps`.
import type { MisTag, OutputMatch, ProgramQ, RubricRow, RubricScore } from '../types'
import type { PyRun, PyStatic } from '../py/client'

export interface DiagDeps {
  run(code: string, stdin: string[]): Promise<PyRun>
  call<T = unknown>(code: string, fn: string, args: unknown[]): Promise<{ value: T | null; error: string | null }>
  static(code: string): Promise<PyStatic>
  outputOk(mode: OutputMatch, got: string, ref: string): boolean
  outputDiff(got: string, ref: string): string
  explain?(err: string, line: number | null | undefined, code: string): { title: string; why: string; fix: string } | null
}

export type FailKind = 'wrong-variant' | 'error' | 'timeout' | 'empty' | 'format' | 'extra' | 'missing' | 'diff' | 'judge'
export interface Diag { kind: FailKind; msg: string; tag?: MisTag; variant?: number }
export interface TestReport {
  index: number; name: string; stdin: string[]; edge?: string
  ref: string; got: string; ok: boolean
  error?: string; errorLine?: number | null; timeout?: boolean
  diag?: Diag
}
export interface MustCheck { need: string; ok: boolean; msg: string }
export interface Report {
  tests: TestReport[]; passed: number; total: number
  mustUse: MustCheck[]; mustOk: boolean
  /** at least one test ran to completion without a Python error */
  ranOk: boolean
  suggested: RubricScore
  tags: MisTag[]
  /** one line for the history list */
  headline: string
  /** extra learner-facing notes (compile errors etc.) */
  notes: string[]
}

const trimEnd = (s: string) => s.replace(/\r/g, '').replace(/\s+$/g, '')
const lines = (s: string) => (trimEnd(s) ? trimEnd(s).split('\n') : [])

/** Map a Python error text to a misconception tag, if recognisable. */
export function tagForError(err: string): MisTag | undefined {
  if (/can only concatenate str|must be str, not|unsupported operand type.*'str'/.test(err)) return 'str-concat'
  if (/not supported between instances of 'str' and 'int'|not supported between instances of 'int' and 'str'/.test(err)) return 'input-is-str'
  if (/IndexError/.test(err)) return 'index-range'
  if (/UnboundLocalError|NameError/.test(err) && /local variable|referenced before/.test(err)) return 'scope-local'
  if (/IndentationError/.test(err)) return 'indentation'
  if (/maybe you meant '=='|cannot assign to/i.test(err)) return 'assign-vs-eq'
  return undefined
}

function mustCheck(need: NonNullable<ProgramQ['mustUse']>[number], st: PyStatic): MustCheck {
  const defs = st.defs ?? []
  switch (need) {
    case 'function': { const ok = defs.some((d) => d.returns_value); return { need, ok, msg: ok ? 'Has a function (def … returns a value)' : 'The task requires a **function**: a `def name(...)` that `return`s a value.' } }
    case 'procedure': { const ok = defs.some((d) => !d.returns_value); return { need, ok, msg: ok ? 'Has a procedure (def without a return value)' : 'The task requires a **procedure**: a `def name(...)` without a `return` value.' } }
    case 'subprogram': { const ok = defs.length > 0; return { need, ok, msg: ok ? 'Has a subprogram' : 'The task requires a **subprogram** (`def`). Remember to call it too.' } }
    case 'array': { const ok = !!st.uses?.list; return { need, ok, msg: ok ? 'Uses an array (list)' : 'The task requires an **array** (list).' } }
    case 'while': case 'for': case 'if': { const ok = !!st.uses?.[need]; return { need, ok, msg: ok ? `Uses \`${need}\`` : `The task requires the \`${need}\` structure.` } }
  }
}

/** Official-style suggestion: all tests + mustUse → 4; all tests but mustUse missing, or most tests → 3; some → 2; runs but wrong → 1; nothing → 0. */
export function suggestRubric(passed: number, total: number, mustOk: boolean, blank: boolean): RubricScore {
  if (blank) return 0
  if (total > 0 && passed === total) return mustOk ? 4 : 3
  if (total > 0 && passed / total > 0.5) return 3
  if (passed > 0) return 2
  return 1
}
/** The rubric row to preselect: exact score if the rubric has it, else the nearest row at or below, else the nearest above. */
export function nearestRow(rows: RubricRow[], s: RubricScore): RubricScore {
  const sc = rows.map((r) => r.score)
  if (!sc.length || sc.includes(s)) return s
  const below = sc.filter((x) => x <= s).sort((a, b) => b - a)[0]
  return below ?? sc.sort((a, b) => a - b)[0]
}

/** Reference outputs for each test: baked values when given, otherwise by running the reference solution. */
export async function referenceOutputs(q: ProgramQ, baked: string[] | undefined, deps: DiagDeps): Promise<string[]> {
  if (baked && baked.length === q.tests.length) return baked
  const out: string[] = []
  for (const t of q.tests) out.push((await deps.run(q.solution.python, t.stdin ?? [])).stdout)
  return out
}

function genericDiag(q: ProgramQ, t: TestReport, code: string, deps: DiagDeps): Diag {
  const edge = t.edge ? ` (edge case: ${t.edge})` : ''
  if (t.timeout) return { kind: 'timeout', tag: 'while-no-next', msg: 'The program does not stop. Check the loop: does the control variable change on every pass (Next-Element, e.g. `i = i + 1`), and can the end condition ever be reached?' + edge }
  if (t.error) {
    const ex = deps.explain?.(t.error, t.errorLine, code)
    const msg = ex ? `**${ex.title}**. ${ex.why} ${ex.fix}` : `Python error: \`${t.error}\`${t.errorLine ? ` (line ${t.errorLine})` : ''}`
    return { kind: 'error', tag: tagForError(t.error), msg: msg + edge }
  }
  const got = trimEnd(t.got), ref = trimEnd(t.ref)
  if (!got) {
    const usesReturn = /\breturn\b/.test(code), usesPrint = /\bprint\s*\(/.test(code)
    return { kind: 'empty', tag: usesReturn && !usesPrint ? 'return-vs-print' : undefined, msg: usesReturn && !usesPrint
      ? '**No output.** `return` only gives a value back to the caller; to show it on screen use `print(...)` (in the main program).' + edge
      : '**No output.** Is `print` missing, or is the output statement inside an `if` / loop that never runs?' + edge }
  }
  if (deps.outputOk('numbers', got, ref)) return { kind: 'format', msg: `The numbers are right, but the output format differs. ${deps.outputDiff(got, ref)}${edge}` }
  const gl = lines(got).length, rl = lines(ref).length
  const d = deps.outputDiff(got, ref)
  if (gl > rl) return { kind: 'extra', msg: `The output has **too many** lines (${gl}, expected ${rl}). ${d}${edge}` }
  if (gl < rl) return { kind: 'missing', msg: `The output has **too few** lines (${gl}, expected ${rl}). ${d}${edge}` }
  return { kind: 'diff', msg: `${d}${edge}` }
}

/** Run every hidden test against the learner's (already compiled) Python and diagnose each failure. */
export async function runReport(q: ProgramQ, code: string, baked: string[] | undefined, deps: DiagDeps, lang: 'id' | 'en' = 'en'): Promise<Report> {
  const blank = !code.trim()
  const refs = await referenceOutputs(q, baked, deps)
  const tests: TestReport[] = []
  for (let i = 0; i < q.tests.length; i++) {
    const t = q.tests[i], stdin = t.stdin ?? []
    const base: TestReport = { index: i, name: t.name ?? `Test ${i + 1}`, stdin, edge: t.edge, ref: refs[i] ?? '', got: '', ok: false }
    if (blank) { tests.push(base); continue }
    const r = await deps.run(code, stdin)
    base.got = r.stdout; base.error = r.error ?? undefined; base.errorLine = r.error_line; base.timeout = r.timeout
    if (!r.error) {
      if (q.match === 'judge' && q.judge) {
        const j = await deps.call<string | null>(q.judge, 'judge', [stdin, r.stdout, base.ref])
        if (j.error) base.diag = { kind: 'judge', msg: `The checker failed: ${j.error}` }
        else if (j.value) base.diag = { kind: 'judge', msg: String(j.value) }
        else base.ok = true
        if (!base.ok && !base.diag) base.diag = { kind: 'judge', msg: 'The output was not accepted.' }
      } else base.ok = deps.outputOk(q.match === 'judge' ? 'lenient' : q.match, r.stdout, base.ref)
    }
    tests.push(base)
  }

  // 1) known wrong variants: run each on the failing tests and compare outputs with the learner's
  const failing = tests.filter((t) => !t.ok && !t.error && !t.timeout && !blank)
  const wrong = q.wrong ?? []
  if (failing.length && wrong.length) {
    const hit: boolean[][] = wrong.map(() => tests.map(() => false))
    for (let w = 0; w < wrong.length; w++) {
      for (const t of failing) {
        const r = await deps.run(wrong[w].code, t.stdin)
        if (!r.error && deps.outputOk('exact', t.got, r.stdout)) hit[w][t.index] = true
      }
    }
    const scoreOf = (w: number) => failing.filter((t) => hit[w][t.index]).length
    const order = wrong.map((_, w) => w).sort((a, b) => scoreOf(b) - scoreOf(a))
    for (const t of failing) {
      const w = order.find((x) => hit[x][t.index])
      if (w !== undefined && scoreOf(w) > 0) t.diag = { kind: 'wrong-variant', msg: (lang === 'en' && wrong[w].msgEn) || wrong[w].msg, tag: wrong[w].tag, variant: w }
    }
  }
  for (const t of tests) if (!t.ok && !t.diag && !blank) t.diag = genericDiag(q, t, code, deps)

  // 2) structural requirements
  let mustUse: MustCheck[] = []
  if (q.mustUse?.length && !blank) {
    const st = await deps.static(code).catch(() => null)
    if (st) mustUse = q.mustUse.map((n) => mustCheck(n, st))
    else mustUse = q.mustUse.map((n) => ({ need: n, ok: false, msg: 'The structure could not be checked (syntax error).' }))
  }
  const mustOk = mustUse.every((m) => m.ok)
  const passed = tests.filter((t) => t.ok).length
  const ranOk = tests.some((t) => !t.error && !t.timeout && !blank)
  const suggested = suggestRubric(passed, tests.length, mustOk, blank)
  const tagSet = new Set<MisTag>()
  for (const t of tests) if (t.diag?.tag) tagSet.add(t.diag.tag)
  if (q.mustUse?.length && !mustOk) { /* no tag: structural */ }
  const tags = [...tagSet]
  const firstBad = tests.find((t) => !t.ok && t.diag)
  const short = firstBad?.diag ? firstBad.diag.msg.replace(/[`*]/g, '').split(/(?<=[.!?])\s/)[0].slice(0, 80) : ''
  const headline = blank ? 'No answer yet'
    : `${passed}/${tests.length} tests passed${firstBad && passed < tests.length ? ': ' + short : ''}${!mustOk ? '; structure requirement not met' : ''}`
  return { tests, passed, total: tests.length, mustUse, mustOk, ranOk, suggested, tags, headline, notes: [] }
}

/** A report for a learner answer that could not even be compiled (pseudocode / flowchart errors). */
export function failedReport(q: ProgramQ, notes: string[], blank: boolean): Report {
  return {
    tests: q.tests.map((t, i) => ({ index: i, name: t.name ?? `Test ${i + 1}`, stdin: t.stdin ?? [], edge: t.edge, ref: '', got: '', ok: false })),
    passed: 0, total: q.tests.length, mustUse: [], mustOk: !(q.mustUse?.length), ranOk: false,
    suggested: blank ? 0 : 1, tags: [], headline: blank ? 'No answer yet' : 'The answer could not be translated to a program', notes,
  }
}

/* ============================== trace answers ============================== */

/** Normalise a displayed variable value: quotes stripped, numbers canonical, booleans/None lowercase, list spacing removed. */
export function normVal(s: string | undefined): string {
  let t = (s ?? '').trim()
  if (!t || t === '-' || t === '—' || t === '?') return ''
  t = t.replace(/[‘’“”]/g, "'").replace(/"/g, "'")
  if (/^'.*'$/.test(t) && !t.includes("','")) t = t.slice(1, -1)
  const n = Number(t.replace(',', '.'))
  if (t !== '' && Number.isFinite(n) && /^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t.replace(',', '.'))) return String(n)
  if (/^\[.*\]$/.test(t) || /^\(.*\)$/.test(t)) return t.replace(/\s+/g, '').replace(/'/g, '')
  return t.toLowerCase()
}

/** One row per change of the watched state (same rule as build/verify.ts), for tests / fallbacks when nothing is baked. */
export function tableFromTrace(trace: { vars: Record<string, string> }[], watch: string[]): Record<string, string>[] {
  const rows: Record<string, string>[] = []
  for (const s of trace) {
    const row = Object.fromEntries(watch.map((w) => [w, s.vars[w] ?? '']))
    const prev = rows.at(-1)
    if (!prev || watch.some((w) => prev[w] !== row[w])) rows.push(row)
  }
  return rows.filter((r) => Object.values(r).some((v) => v !== ''))
}

const collapse = (xs: string[]) => xs.filter((x, i) => x !== '' && x !== xs.slice(0, i).reverse().find((y) => y !== ''))
function lcs(a: string[], b: string[]) {
  const d = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0))
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = a[i - 1] === b[j - 1] ? d[i - 1][j - 1] + 1 : Math.max(d[i - 1][j], d[i][j - 1])
  return d[a.length][b.length]
}

export interface TableCheck {
  /** per learner row: true = a state that really occurs (in order), false = does not occur / out of order, null = empty row */
  rowOk: (boolean | null)[]
  cols: { col: string; ok: boolean; got: string[]; want: string[] }[]
  score: number
  correct: boolean
  msgs: string[]
}
/**
 * Tolerant row-wise comparison of a learner's trace table with the baked table (one row per state change, see verify.ts).
 * Learners on paper usually write one row per loop iteration, so we compare in two ways:
 *  - each variable's history (distinct consecutive values, blanks skipped) must equal the expected history;
 *  - each non-empty row must be a state that actually occurs, in non-decreasing order (blank cell = unchanged).
 */
export function compareTable(rows: string[][], cols: string[], expected: Record<string, string>[]): TableCheck {
  const E = expected.map((r) => cols.map((c) => normVal(r[c])))
  // carry blanks forward
  const carried: (string[] | null)[] = []
  let prev: string[] = cols.map(() => '')
  for (const r of rows) {
    const cells = cols.map((_, j) => normVal(r[j]))
    if (cells.every((c) => c === '')) { carried.push(null); continue }
    const full = cells.map((c, j) => c !== '' ? c : prev[j])
    carried.push(full); prev = full
  }
  const rowOk: (boolean | null)[] = []
  let at = 0
  for (const row of carried) {
    if (!row) { rowOk.push(null); continue }
    let found = -1
    for (let k = at; k < E.length; k++) if (E[k].every((v, j) => v === row[j] || (v === '' && row[j] === ''))) { found = k; break }
    if (found >= 0) { rowOk.push(true); at = found } else rowOk.push(false)
  }
  const colRes = cols.map((col, j) => {
    const got = collapse(rows.map((r) => normVal(r[j])))
    const want = collapse(E.map((r) => r[j]))
    return { col, ok: got.length === want.length && got.every((x, i) => x === want[i]), got, want }
  })
  const colScore = colRes.map((c) => (c.want.length ? lcs(c.got, c.want) / Math.max(c.got.length, c.want.length, 1) : 1))
  const mean = colScore.reduce((a, b) => a + b, 0) / Math.max(1, colScore.length)
  const bad = rowOk.filter((x) => x === false).length
  const correct = colRes.every((c) => c.ok) && bad === 0
  const msgs: string[] = []
  for (const c of colRes) {
    if (c.ok) continue
    if (!c.got.length) msgs.push(`Column \`${c.col}\` is still empty.`)
    else {
      const i = c.want.findIndex((w, k) => c.got[k] !== w)
      msgs.push(`Column \`${c.col}\`: your sequence of values \`${c.got.join(', ')}\`, expected \`${c.want.join(', ')}\`${i >= 0 ? ` (value #${i + 1} differs)` : ''}.`)
    }
  }
  if (bad && colRes.every((c) => c.ok)) msgs.push(`${bad} row(s) hold a combination of values that never occurs together (check when each variable is updated).`)
  return { rowOk, cols: colRes, score: correct ? 1 : Math.min(mean, 0.8), correct, msgs }
}

/** Per-variable check of final values. */
export function compareFinal(got: Record<string, string>, expected: Record<string, string>, watch: string[]) {
  const per = watch.map((w) => ({ name: w, ok: normVal(got[w]) === normVal(expected[w]) && normVal(expected[w]) !== '' || (normVal(expected[w]) === '' && normVal(got[w]) === ''), want: expected[w] ?? '' }))
  return { per, correct: per.every((p) => p.ok), score: per.filter((p) => p.ok).length / Math.max(1, per.length) }
}

/** Variables whose value changes during a trace (candidates for the "which variables?" hint). */
export function changingVars(trace: { depth?: number; vars: Record<string, string> }[]): string[] {
  const seen = new Map<string, Set<string>>()
  for (const s of trace) for (const [k, v] of Object.entries(s.vars)) { if (!seen.has(k)) seen.set(k, new Set()); seen.get(k)!.add(v) }
  return [...seen].filter(([, v]) => v.size > 1).map(([k]) => k)
}
