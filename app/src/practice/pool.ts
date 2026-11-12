// Single access point for the question bank + selection helpers. Pure (no React).
import { PAPERS, PROBLEMS, QUESTIONS } from '../bank'
import type { Archetype, DeckId, MisTag, Paper, Problem, Question, SourceKind } from '../types'
import { archetypeStats, type Attempt } from './store'
import { SOURCE_LABEL } from './ui'

/** Dev samples (ids start with "sample-") are hidden as soon as real items exist. */
const REAL = PROBLEMS.filter((p) => !p.id.startsWith('sample-'))
export const POOL: Problem[] = REAL.length ? REAL : PROBLEMS
export const USING_SAMPLES = !REAL.length
export const POOL_Q: { q: Question; p: Problem }[] = QUESTIONS.filter((x) => POOL.includes(x.p))
export const PAPER_OF = new Map<string, Paper>()
for (const pa of PAPERS) for (const id of pa.problems) if (!PAPER_OF.has(id)) PAPER_OF.set(id, pa)
export { PAPERS }

export const shuffled = <T,>(xs: readonly T[]): T[] => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

/** "UTS 2025 · Soal 4" (the label is printed as in the source), or "Mock-up". */
export function sourceText(p: Problem): string {
  const s = p.source
  const bits = [SOURCE_LABEL[s.kind] + (s.year ? ' ' + s.year : ''), s.label].filter(Boolean)
  return bits.join(' · ')
}

/** Normalised part weights of a problem (official "Cara Penilaian"); equal when unspecified. */
export function partWeights(p: Problem): number[] {
  const w = p.parts.map((q) => q.weight ?? 0)
  const sum = w.reduce((a, b) => a + b, 0)
  if (sum <= 0) return p.parts.map(() => 1 / Math.max(1, p.parts.length))
  return w.map((x) => x / sum)
}

export interface PoolFilter {
  archetypes?: Archetype[]
  decks?: DeckId[]
  sources?: SourceKind[]
  paper?: string
  topic?: string
  tag?: MisTag
  officialOnly?: boolean
  includeOos?: boolean
  flaggedOnly?: boolean
  flagged?: string[]
  /** only problems where the latest attempt of some part was wrong */
  wrongOnly?: boolean
  attempts?: Attempt[]
}
export function lastWrongIds(atts: Attempt[]): Set<string> {
  const last = new Map<string, Attempt>()
  for (const a of atts) { const c = last.get(a.id); if (!c || a.t >= c.t) last.set(a.id, a) }
  return new Set([...last.values()].filter((a) => !a.correct).map((a) => a.id))
}
export function filterProblems(f: PoolFilter): Problem[] {
  const wrong = f.wrongOnly ? lastWrongIds(f.attempts ?? []) : null
  const paper = f.paper ? new Set(PAPERS.find((x) => x.id === f.paper)?.problems ?? []) : null
  return POOL.filter((p) => {
    if (f.archetypes?.length && !f.archetypes.includes(p.archetype)) return false
    if (f.sources?.length && !f.sources.includes(p.source.kind)) return false
    if (f.officialOnly && !p.source.official) return false
    if (!f.includeOos && p.source.outOfScope) return false
    if (paper && !paper.has(p.id)) return false
    if (f.decks?.length && !p.parts.some((q) => q.decks.some((d) => f.decks!.includes(d)))) return false
    if (f.topic && !p.parts.some((q) => q.topic === f.topic)) return false
    if (f.tag && !p.parts.some((q) => q.misconceptions?.includes(f.tag!))) return false
    if (f.flaggedOnly && !p.parts.some((q) => f.flagged?.includes(q.id))) return false
    if (wrong && !p.parts.some((q) => wrong.has(q.id))) return false
    return true
  })
}

/** Round-robin across archetypes so consecutive problems differ (interleaving). */
export function interleave(ps: Problem[]): Problem[] {
  const groups = new Map<string, Problem[]>()
  for (const p of shuffled(ps)) { const g = groups.get(p.archetype); if (g) g.push(p); else groups.set(p.archetype, [p]) }
  const lists = shuffled([...groups.values()])
  const out: Problem[] = []
  while (lists.some((l) => l.length)) for (const l of lists) { const x = l.shift(); if (x) out.push(x) }
  return out
}

/** Pick the weakest archetype (Paper-mode accuracy; untried counts as 0.35) and its most frequent misconception. */
export function nextUp(atts: Attempt[]): { archetype: Archetype; tag?: MisTag; acc: number | null; n: number } | null {
  const present = [...new Set(POOL.map((p) => p.archetype))].filter((a) => a !== 'concept' || POOL.every((p) => p.archetype === 'concept'))
  if (!present.length) return null
  const paper = archetypeStats(atts, true), all = archetypeStats(atts)
  const scored = present.map((a) => {
    const s = paper.get(a) ?? all.get(a)
    return { a, acc: s?.acc ?? null, n: s?.n ?? 0, key: s ? s.acc : 0.35 }
  }).sort((x, y) => x.key - y.key)
  const w = scored[0]
  const counts = new Map<MisTag, number>()
  for (const a of atts) if (a.archetype === w.a && !a.correct) for (const t of a.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1)
  let tag = [...counts].sort((x, y) => y[1] - x[1])[0]?.[0]
  if (!tag) {
    const tc = new Map<MisTag, number>()
    for (const p of POOL) if (p.archetype === w.a) for (const q of p.parts) for (const t of q.misconceptions ?? []) tc.set(t, (tc.get(t) ?? 0) + 1)
    tag = [...tc].sort((x, y) => y[1] - x[1])[0]?.[0]
  }
  return { archetype: w.a, tag, acc: w.acc, n: w.n }
}

export const MIS_LABEL: Record<MisTag, string> = {
  'off-by-one': 'Off-by-one (range / bounds)', 'str-concat': 'Joining text without str()', 'return-vs-print': 'return vs print',
  'while-no-next': 'while without Next-Element', 'sentinel-counted': 'Sentinel counted as data', 'assign-vs-eq': '= vs ==',
  'int-vs-float-div': 'int vs float division', 'input-is-str': 'input() returns text', 'scope-local': 'Local / global variable',
  'indentation': 'Indentation', 'not-disjoint': 'Overlapping conditions', 'not-complete': 'Incomplete conditions',
  'init-in-loop': 'Initialisation inside the loop', 'max-init-zero': 'max = 0 (all negative)', 'index-range': 'Index out of range',
  'repeat-count': 'Wrong repeat count (n−1?)', 'constraint-missed': 'Constraint missed', 'unique-column-class': 'Level-1 on a unique column',
}
