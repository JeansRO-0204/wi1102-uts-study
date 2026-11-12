// Fresh "Project assignment" puzzles (UTS 2025 Soal 1 style) for spaced practice. Pure TS, Node-importable
// (type-only imports). Every puzzle is built around a planted valid assignment, so it ALWAYS has a solution;
// `solveAll` enumerates solutions by backtracking and the Python `check` is generated from the same data.
//
// Answer format of the generated ConstraintQ (shape 'assign'): { "<name>": "P3", ... } (slot names from `slots`).
import type { ConstraintQ, Problem, RubricRow, RubricScore } from '../types'

export const DIVISIONS = ['Keuangan', 'Pemasaran', 'Humas'] as const
const NAMES = ['Asep', 'Bakir', 'Cica', 'Dudi', 'Euis', 'Fahri', 'Gugun', 'Hendra', 'Indah', 'Joko', 'Kirana', 'Lestari', 'Maman', 'Nadia', 'Oki', 'Putri', 'Rangga', 'Sari', 'Teddy', 'Usman', 'Vina', 'Wawan', 'Yuni', 'Zaki']
const COMPANIES = ['RichDigi', 'NusaTech', 'KreasiKita', 'DigiNusantara', 'MediaPrima', 'Satu Atap Digital']
const EXP_STEPS = [5, 8, 10, 12, 15]

export interface GenPerson { name: string; age: number; div: string; exp: number; minat: number[] }
/** divs empty = any division; minExp 0 = no minimum; needInterest = must be interested in this project */
export interface GenRule { divs: string[]; minExp: number; needInterest: boolean }
export interface GenPuzzle { company: string; people: GenPerson[]; rules: GenRule[]; planted: number[]; maxPer: number }
export interface GenOpts { people?: number; projects?: number }

/** small deterministic PRNG */
export function rng(seed: number) {
  let a = (seed >>> 0) || 1
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return {
    next,
    int: (lo: number, hi: number) => lo + Math.floor(next() * (hi - lo + 1)),
    pick: <T,>(xs: readonly T[]): T => xs[Math.floor(next() * xs.length)],
    shuffle: <T,>(xs: readonly T[]): T[] => { const r = [...xs]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [r[i], r[j]] = [r[j], r[i]] } return r },
  }
}

export function eligible(pz: GenPuzzle, person: number, proj: number): boolean {
  const p = pz.people[person]; const r = pz.rules[proj]
  if (r.divs.length && !r.divs.includes(p.div)) return false
  if (p.exp < r.minExp) return false
  if (r.needInterest && !p.minat.includes(proj + 1)) return false
  return true
}

export function genPuzzle(seed: number, opts: GenOpts = {}): GenPuzzle {
  const R = rng(seed * 7919 + 13)
  const k = Math.max(3, Math.min(6, opts.projects ?? R.pick([4, 5, 5])))
  const n = Math.max(k, Math.min(3 * k, opts.people ?? R.pick([7, 8, 8])))
  const maxPer = 3
  const names = R.shuffle(NAMES).slice(0, n)
  const people: GenPerson[] = names.map((name) => ({ name, age: R.int(20, 42), div: R.pick(DIVISIONS), exp: R.int(3, 17), minat: [] }))
  // planted assignment: every project gets 1..3 people
  const sizes = Array<number>(k).fill(1)
  for (let left = n - k; left > 0;) { const j = R.int(0, k - 1); if (sizes[j] < maxPer) { sizes[j]++; left-- } }
  const order = R.shuffle(people.map((_, i) => i))
  const planted = Array<number>(n).fill(0)
  let at = 0
  sizes.forEach((sz, proj) => { for (let c = 0; c < sz; c++) planted[order[at++]] = proj })
  // rules derived from the planted members
  const rules: GenRule[] = []
  for (let proj = 0; proj < k; proj++) {
    const mem = people.filter((_, i) => planted[i] === proj)
    const divs = [...new Set(mem.map((m) => m.div))]
    const minE = Math.min(...mem.map((m) => m.exp))
    const thr = [...EXP_STEPS].reverse().find((t) => t <= minE)
    const cands: GenRule[] = [{ divs: [], minExp: 0, needInterest: true }]
    if (divs.length <= 2) {
      cands.push({ divs, minExp: 0, needInterest: false }, { divs, minExp: 0, needInterest: false }, { divs, minExp: 0, needInterest: true })
      if (thr) cands.push({ divs, minExp: thr, needInterest: false })
    }
    if (thr) cands.push({ divs: [], minExp: thr, needInterest: true })
    rules.push(R.pick(cands))
  }
  // interests: members get the project they need; everybody gets 1–3 random interests in total
  people.forEach((p, i) => {
    if (rules[planted[i]].needInterest) p.minat.push(planted[i] + 1)
    const want = R.int(1, 3)
    while (p.minat.length < want) { const x = R.int(1, k); if (!p.minat.includes(x)) p.minat.push(x) }
    p.minat.sort((a, b) => a - b)
  })
  return { company: R.pick(COMPANIES), people, rules, planted, maxPer }
}

/** Enumerate valid assignments (person index -> project index), up to `limit`. */
export function solveAll(pz: GenPuzzle, limit = 5000): number[][] {
  const n = pz.people.length; const k = pz.rules.length
  const opts = pz.people.map((_, i) => pz.rules.map((_, j) => j).filter((j) => eligible(pz, i, j)))
  const cnt = Array<number>(k).fill(0)
  const cur = Array<number>(n).fill(-1)
  const out: number[][] = []
  const go = (i: number) => {
    if (out.length >= limit) return
    if (i === n) { if (cnt.every((c) => c >= 1)) out.push([...cur]); return }
    // prune: remaining people must be able to fill empty projects
    const empty = cnt.filter((c) => c === 0).length
    if (empty > n - i) return
    for (const j of opts[i]) {
      if (cnt[j] >= pz.maxPer) continue
      cnt[j]++; cur[i] = j
      go(i + 1)
      cnt[j]--; cur[i] = -1
    }
  }
  go(0)
  return out
}

const slotName = (j: number) => 'P' + (j + 1)

function ruleText(r: GenRule, proj: number): string {
  const P = slotName(proj)
  const dv = r.divs.length ? 'from the ' + r.divs.join(' or ') + ' division' : ''
  const ex = r.minExp ? `with at least ${r.minExp} years of work experience` : ''
  const it = r.needInterest ? `who are interested in project ${P}` : ''
  const parts = [dv, ex, it].filter(Boolean)
  return `Project ${P} needs staff ${parts.join(', ')}.`
}

const pyStr = (s: string) => JSON.stringify(s)

/** Python source of `check(ans)`: English messages, one per violated constraint instance, naming the person. */
export function constraintCheckSource(pz: GenPuzzle): string {
  const people = pz.people.map((p) => `${pyStr(p.name)}: [${pyStr(p.div)}, ${p.exp}, [${p.minat.join(', ')}]]`).join(', ')
  const rules = pz.rules.map((r, j) => `${pyStr(slotName(j))}: [[${r.divs.map(pyStr).join(', ')}], ${r.minExp}, ${r.needInterest ? 1 : 0}]`).join(', ')
  return `PEOPLE = {${people}}
RULES = {${rules}}
MAXPER = ${pz.maxPer}
def check(ans):
    errs = []
    cnt = {s: 0 for s in RULES}
    for n, (dv, ex, mi) in PEOPLE.items():
        s = ans.get(n)
        if s is None or s == "":
            errs.append(n + " is not assigned to any project (everyone must be placed).")
            continue
        if s not in RULES:
            errs.append(n + ": unknown project " + str(s) + ".")
            continue
        cnt[s] += 1
        divs, mn, ni = RULES[s]
        why = []
        if divs and dv not in divs:
            why.append("division is " + dv + ", " + s + " needs " + " / ".join(divs))
        if ex < mn:
            why.append("experience is " + str(ex) + " years, " + s + " needs at least " + str(mn))
        if ni and int(s[1:]) not in mi:
            why.append("is not interested in " + s)
        if why:
            errs.append(n + " does not fit " + s + ": " + "; ".join(why) + ".")
    for s, c in cnt.items():
        if c < 1:
            errs.append("Project " + s + " has no staff yet (minimum 1 person).")
        if c > MAXPER:
            errs.append("Project " + s + " has " + str(c) + " people (maximum " + str(MAXPER) + ").")
    return errs`
}

export const CONSTRAINT_RUBRIC: RubricRow[] = [
  { score: 4, desc: 'The configuration satisfies every constraint' },
  { score: 3, desc: 'Satisfies most constraints (only one kind of constraint is violated)' },
  { score: 2, desc: 'Satisfies only some of the constraints' },
  { score: 1, desc: 'Violates the constraints, but something is still right' },
  { score: 0, desc: 'No answer, or entirely wrong' },
]

const EXPLAIN_RUBRIC: RubricRow[] = [
  { score: 4, desc: 'The explanation contains abstraction (only the important information), decomposition (formulating the constraints), pattern recognition, and a correct algorithm' },
  { score: 3, desc: 'Contains these principles, but with one mistake' },
  { score: 2, desc: 'Correct for only some of the principles' },
  { score: 1, desc: 'Generally incorrect, but something is still right' },
  { score: 0, desc: 'No answer, or entirely wrong' },
]

/** One generated assignment puzzle as a ConstraintQ (shape 'assign'). */
export function generateConstraintQ(seed: number, opts: GenOpts = {}): ConstraintQ {
  const pz = genPuzzle(seed, opts)
  const sols = solveAll(pz, 1)
  if (!sols.length) throw new Error('constraintGen: puzzle without solution (seed ' + seed + ')') // cannot happen: planted
  const sol = sols[0]
  const k = pz.rules.length
  const slots = pz.rules.map((_, j) => slotName(j))
  const solution: Record<string, string> = {}
  pz.people.forEach((p, i) => { solution[p.name] = slotName(sol[i]) })
  const table = ['| Name | Age | Division | Work experience (yrs) | Project interests |', '|---|---|---|---|---|',
    ...pz.people.map((p) => `| ${p.name} | ${p.age} | ${p.div} | ${p.exp} | ${p.minat.map((m) => 'P' + m).join(', ')} |`)].join('\n')
  const stem = [
    `The company ${pz.company} will assign ${pz.people.length} new employees (${pz.people.map((p) => p.name).join(', ')}) to ${k} ongoing projects: ${slots.join(', ')}. Some important information:`,
    '',
    ...pz.rules.map((r, j) => `- ${ruleText(r, j)}`),
    `- Everyone must be placed in exactly one project, and every project must get at least 1 (one) and at most ${pz.maxPer} (three) people.`,
    '',
    table,
    '',
    'Task: give 1 (one) assignment of employees that satisfies all the requirements above, in the format `<name> - <project code>`.',
  ].join('\n')
  // most-constrained person (for the hint text)
  const nOpt = pz.people.map((_, i) => pz.rules.map((_, j) => j).filter((j) => eligible(pz, i, j)))
  const tight = nOpt.map((o, i) => ({ i, o })).sort((a, b) => a.o.length - b.o.length)[0]
  const byProj = slots.map((s, j) => `**${s}**: ${pz.people.filter((_, i) => sol[i] === j).map((p) => p.name).join(', ')}`)
  return {
    id: `gen-constraint-${seed}`, kind: 'constraint', shape: 'assign', decks: ['D01'], topic: 'Constraint (random)', label: 'a',
    stem,
    entities: pz.people.map((p) => p.name), slots, multi: false,
    check: constraintCheckSource(pz), solution,
    rubric: CONSTRAINT_RUBRIC,
    hints: [
      'Ignore data that is not used (for example age). First write down each project\'s requirements: division, minimum experience, and interest.',
      `Summary of the requirements (constraint table):\n\n${['| Project | Division | Min. experience | Interest |', '|---|---|---|---|', ...pz.rules.map((r, j) => `| ${slotName(j)} | ${r.divs.length ? r.divs.join(' / ') : 'any'} | ${r.minExp ? r.minExp + ' yrs' : '-'} | ${r.needInterest ? 'must be interested' : '-'} |`)].join('\n')}\n\nPlus: everyone gets exactly 1 project, every project gets 1–${pz.maxPer} people.`,
    ],
    explanation: `One valid assignment: ${byProj.join('; ')}.\n\nMethod: (1) abstraction: only division, experience and interest matter; (2) decomposition: each project's requirements + the 1–${pz.maxPer} people limit; (3) pattern: handle the tightest requirements first (e.g. ${pz.people[tight.i].name} only fits ${tight.o.map(slotName).join(', ')}); (4) algorithm: assign the most constrained people first, then fill in the rest while keeping the size limits.`,
    difficulty: 2,
  }
}

/** A whole generated Problem: assignment (a) is ConstraintQ; the explanation part (b) is left to W1's Open view. */
export function generateConstraintProblem(seed: number, opts: GenOpts = {}): Problem {
  const a = generateConstraintQ(seed, opts)
  return {
    id: `gen-constraint-p${seed}`, archetype: 'constraint', title: 'Project assignment (random)',
    source: { kind: 'generated' as const, lang: 'en' as const, official: false },
    parts: [
      { ...a, weight: 0.4 },
      {
        id: `gen-constraint-${seed}-b`, kind: 'open', label: 'b', weight: 0.6, decks: ['D01'], topic: 'Constraint (random)',
        stem: 'Give a short, clear explanation showing your reasoning with the principles of computational thinking: abstraction, problem decomposition, pattern recognition, and algorithmic thinking.',
        answer: 'Abstraction: only division, experience, interest and the size limit matter. Decomposition: each project\'s requirements are stated separately. Pattern: projects with tight requirements get priority. Algorithm: order the assignment steps from the most constrained.',
        rubric: EXPLAIN_RUBRIC,
        keyPoints: ['Names the important information and what is ignored (abstraction)', 'States each project\'s requirements (decomposition)', 'Recognises the pattern (most constrained first)', 'Gives ordered assignment steps (algorithm)'],
        explanation: a.explanation,
      },
    ],
  }
}

/* ====================================================================================================
 * Classification helpers (UTS 2025 Soal 2 / 2024 Soal 2): build codes from the learner's hierarchy and
 * check generic properties. Pure TS so it can be unit-tested with Node.
 * ================================================================================================== */

export type ColFmt = 'full' | 'a3' | 'A3' | 'a2' | 'A2'
export type ClsLevel = { kind: 'col'; col: number; fmt: ColFmt } | { kind: 'derived'; name: string; codes: string[] }
export interface ClsCfg { levels: ClsLevel[]; sep: string; seq: boolean; digits: number; scope: 'group' | 'global' }
export interface ClsIssue { level: 'ok' | 'err' | 'warn' | 'info'; msg: string; trap?: boolean }

const plain = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]/g, '')

export function fmtValue(v: string | number, fmt: ColFmt): string {
  const s = plain(String(v))
  if (fmt === 'full') return s
  const n = fmt === 'a3' || fmt === 'A3' ? 3 : 2
  const cut = s.slice(0, n)
  return fmt[0] === 'A' ? cut.toUpperCase() : cut.charAt(0).toUpperCase() + cut.slice(1).toLowerCase()
}

/** the code piece of one level for one row ('' if not defined yet) */
export function levelPiece(rows: (string | number)[][], lv: ClsLevel, r: number): string {
  if (lv.kind === 'col') return fmtValue(rows[r][lv.col] ?? '', lv.fmt)
  return plain(lv.codes[r] ?? '')
}
/** the raw group key of one level for one row (the value before abbreviation) */
export function levelKey(rows: (string | number)[][], lv: ClsLevel, r: number): string {
  return lv.kind === 'col' ? String(rows[r][lv.col] ?? '') : (lv.codes[r] ?? '').trim()
}
export const levelName = (columns: string[], lv: ClsLevel) => (lv.kind === 'col' ? columns[lv.col] : lv.name.trim() || 'derived attribute')

export function buildCodes(rows: (string | number)[][], cfg: ClsCfg): { codes: string[]; prefixes: string[] } {
  const prefixes = rows.map((_, r) => cfg.levels.map((lv) => levelPiece(rows, lv, r)).filter(Boolean).join(cfg.sep))
  const seen = new Map<string, number>()
  const codes = prefixes.map((pre, r) => {
    if (!cfg.seq) return pre
    const key = cfg.scope === 'group' ? pre : ''
    const k = (seen.get(key) ?? 0) + 1
    seen.set(key, k)
    const num = String(cfg.scope === 'group' ? k : r + 1).padStart(cfg.digits, '0')
    return [pre, num].filter(Boolean).join(cfg.sep)
  })
  return { codes, prefixes }
}

export interface ColProfile { col: number; name: string; distinct: number; ratio: number; kind: 'repeat' | 'unique' | 'constant' }
/** which columns repeat values (good for grouping) and which are (nearly) unique */
export function columnProfile(columns: string[], rows: (string | number)[][], skip: string[] = []): ColProfile[] {
  const n = rows.length
  return columns.map((name, col) => ({ name, col })).filter((c) => !skip.includes(c.name)).map(({ name, col }) => {
    const d = new Set(rows.map((r) => String(r[col]))).size
    const ratio = n ? d / n : 0
    return { col, name, distinct: d, ratio, kind: (d <= 1 ? 'constant' : ratio >= 0.7 && n >= 5 ? 'unique' : 'repeat') as ColProfile['kind'] }
  })
}

export function analyzeClassify(columns: string[], rows: (string | number)[][], cfg: ClsCfg): { issues: ClsIssue[]; suggested: RubricScore; codes: string[]; dup: Set<string> } {
  const n = rows.length
  const { codes, prefixes } = buildCodes(rows, cfg)
  const issues: ClsIssue[] = []
  const dup = new Set<string>()
  const cnt = new Map<string, number>()
  codes.forEach((c) => cnt.set(c, (cnt.get(c) ?? 0) + 1))
  cnt.forEach((v, k) => { if (v > 1) dup.add(k) })
  if (!cfg.levels.length) return { issues: [{ level: 'err', msg: 'No hierarchy levels yet: add at least two levels.' }], suggested: 0, codes, dup }
  let nErr = 0; let trap = false
  cfg.levels.forEach((lv, i) => {
    const nm = `Level ${i + 1} (${levelName(columns, lv)})`
    const empty = rows.filter((_, r) => !levelPiece(rows, lv, r)).length
    if (empty) { issues.push({ level: 'err', msg: `${nm}: ${empty} row(s) have no code yet.` }); nErr++; return }
    const keys = new Map<string, Set<string>>() // piece -> raw keys
    rows.forEach((_, r) => { const p = levelPiece(rows, lv, r); (keys.get(p) ?? keys.set(p, new Set()).get(p)!).add(levelKey(rows, lv, r)) })
    const rawD = new Set(rows.map((_, r) => levelKey(rows, lv, r))).size
    const merged = [...keys.entries()].find(([, ks]) => ks.size > 1)
    if (lv.kind === 'col' && merged) {
      issues.push({ level: 'err', msg: `${nm}: the values ${[...merged[1]].map((x) => `"${x}"`).join(' and ')} get the same code "${merged[0]}". Use a different abbreviation or the full value.` }); nErr++
    }
    const ratio = rawD / n
    if (n >= 5 && ratio >= 0.7) {
      if (i === 0) {
        trap = true
        issues.push({ level: 'err', trap: true, msg: `${nm}: ${rawD} distinct values over ${n} rows, so almost every row forms its own group. Level 1 on a nearly unique column (title/name) is the rubric **C** case. Pick an attribute whose values repeat (genre, origin, type) and keep the unique column for the sequence number.` })
      } else issues.push({ level: 'warn', msg: `${nm}: ${rawD} distinct values over ${n} rows. Too many groups to be useful for classification.` })
    } else if (rawD <= 1 && n >= 3) {
      issues.push({ level: 'warn', msg: `${nm}: all rows have the same value, so this level distinguishes nothing.` })
    } else if (!(lv.kind === 'col' && merged)) {
      issues.push({ level: 'ok', msg: `${nm}: ${rawD} group(s) for ${n} rows.` })
    }
    if (lv.kind === 'col' && lv.fmt === 'full' && typeof rows[0]?.[lv.col] === 'string' && rows.some((_, r) => levelPiece(rows, lv, r).length > 8)) {
      issues.push({ level: 'info', msg: `${nm}: the code uses the long full value. A 2–4 letter abbreviation is easier to write and read.` })
    }
  })
  if (cfg.levels.length === 1) issues.push({ level: 'warn', msg: 'Only one level: that is plain grouping, not yet a hierarchy. Add a second level inside each group.' })
  // codes: unique / sequence / extensible
  const preDup = new Set(prefixes.filter((p, i) => prefixes.indexOf(p) !== i))
  if (!cfg.seq) {
    if (preDup.size) { issues.push({ level: 'err', msg: `Duplicate codes (${[...preDup].slice(0, 3).join(', ')}…): some items share the same levels. Add a sequence number to make the codes unique.` }); nErr++ }
    else issues.push({ level: 'warn', msg: 'The codes are unique now, but without a sequence number a new item with the same levels would clash (not extensible).' })
  } else {
    if (dup.size) { issues.push({ level: 'err', msg: `Duplicate codes remain: ${[...dup].slice(0, 3).join(', ')}.` }); nErr++ }
    else issues.push({ level: 'ok', msg: `All ${n} codes are unique; the ${cfg.scope === 'group' ? 'per-group' : 'global'} sequence number separates items with the same levels.` })
    if (cfg.digits < 3) issues.push({ level: 'warn', msg: `A ${cfg.digits}-digit sequence number only fits ${10 ** cfg.digits - 1} items per ${cfg.scope === 'group' ? 'group' : 'catalogue'}. Use 3 digits so it is easy to extend.` })
  }
  const derived = cfg.levels.filter((l): l is Extract<ClsLevel, { kind: 'derived' }> => l.kind === 'derived')
  if (derived.length && !derived.some((l) => l.codes.some((c) => /^(lain|oth|etc|xxx|umum|misc|other)/i.test(c.trim())))) {
    issues.push({ level: 'info', msg: 'For a derived attribute, provide a catch-all group (e.g. "OTH") so a new item that does not fit still has a place.' })
  }
  const allEmpty = codes.every((c) => !c)
  let suggested: RubricScore = cfg.levels.length === 1 ? 2 : (4 - Math.min(2, nErr)) as RubricScore
  if (trap) suggested = Math.min(suggested, 2) as RubricScore
  if (allEmpty) suggested = 1
  return { issues, suggested, codes, dup }
}
