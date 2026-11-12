// Difficulty: the item's own `difficulty` when the bank sets it, else an estimate from its content.
// Estimates are shown with "≈" so they read as a guide, not a label from the source.
import type { Problem, Question } from '../types'

export type Diff = 1 | 2 | 3
const codeLines = (src?: string) => (src ?? '').split('\n').filter((l) => l.trim() && !l.trim().startsWith('#') && !/^\s*\{.*\}\s*$/.test(l)).length
const byLines = (n: number): Diff => (n <= 8 ? 1 : n <= 20 ? 2 : 3)

export function estimate(q: Question): Diff {
  switch (q.kind) {
    case 'mcq': case 'mcq-multi': case 'bug': return 1
    case 'short': return q.blanks.length > 2 ? 2 : 1
    case 'open': case 'robot': case 'constraint': case 'classify': return 2
    case 'trace': return byLines(codeLines(q.code ?? q.pseudo) || (q.flow ? JSON.stringify(q.flow).split('"t":').length * 2 : 6))
    case 'program': {
      const d = byLines(codeLines(q.solution.python))
      const sub = q.mustUse?.some((m) => m === 'function' || m === 'procedure' || m === 'subprogram')
      return (sub && d < 3 ? d + 1 : d) as Diff
    }
  }
}
/** Question difficulty and whether it is estimated. */
export function diffOfQ(q: Question): { d: Diff; est: boolean } {
  return q.difficulty ? { d: q.difficulty, est: false } : { d: estimate(q), est: true }
}
/** Problem difficulty = hardest part. */
export function diffOfP(p: Problem): { d: Diff; est: boolean } {
  const all = p.parts.map(diffOfQ)
  const d = Math.max(...all.map((x) => x.d)) as Diff
  return { d, est: all.filter((x) => x.d === d).every((x) => x.est) }
}
export const DIFF_LABEL: Record<Diff, string> = { 1: 'Easy', 2: 'Medium', 3: 'Hard' }
