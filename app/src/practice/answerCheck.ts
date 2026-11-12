// Tolerant answer checking. Never stricter than a human marker would be:
// case/spacing/punctuation are normalised for text, numbers compare numerically (5 == 5.0), code blanks ignore spacing.
// Also: program-output comparison modes (types.ts OutputMatch) and the Part I +1/−1/0 scoring rule.
import { parseNum, within } from '../lib/kit'
import type { Blank, MCQMulti, OutputMatch } from '../types'

const normText = (s: string) => s.toLowerCase().replace(/[.,;:!?'"`()]/g, ' ').replace(/\s+/g, ' ').trim()
/** Code fragment: drop all whitespace, unify quotes, so `range( 1 , N+1 )` == `range(1,N+1)` and "x" == 'x'. */
const normCode = (s: string) => s.replace(/\s+/g, '').replace(/"/g, "'")

/** Is `got` an accepted answer for this blank? */
export function blankOk(b: Blank, got: string): boolean {
  if (!got.trim()) return false
  const type = b.type ?? 'text'
  return b.accept.some((acc) => {
    switch (type) {
      case 'number': { const x = parseNum(got.replace(/[−–]/g, '-').replace(',', '.').trim()); return Number.isFinite(x) && within(x, Number(acc), b.tol ?? { abs: 1e-9 }) }
      case 'code': return normCode(got) === normCode(acc)
      default: return normText(got) === normText(acc) || normText(got).replace(/ /g, '') === normText(acc).replace(/ /g, '')
    }
  })
}

/** Targeted message for a known wrong answer, or null. */
export function blankWhy(b: Blank, got: string, lang: 'id' | 'en' = 'en'): string | null {
  const w = b.wrong?.find((w) => blankOk({ ...b, accept: [w.match], wrong: undefined }, got))
  return w ? (lang === 'en' && w.msgEn) || w.msg : null
}

/* ---------- program output ---------- */

const NUM = /[-+]?\d+(?:\.\d+)?(?:e[-+]?\d+)?/gi
const trimLines = (s: string) => s.replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '')
const numbers = (s: string) => (s.match(NUM) ?? []).map(Number)
const sameNums = (a: number[], b: number[]) => a.length === b.length && a.every((x, i) => within(x, b[i], { rel: 1e-9, abs: 1e-9 }) || Math.abs(x - b[i]) < 1e-9)
/**
 * Lenient = how a marker reads a handwritten program's output: case, spacing and punctuation don't matter,
 * extra labels/words are fine ("Largest = 5" for an expected "5"), but
 *   • the numbers must be exactly the expected numbers, in order, nothing more or less (5 == 5.0), and
 *   • every word of the expected output must appear, in order.
 * MUST stay identical to sameOut() in build/verify.ts.
 */
export function lenientTokens(s: string) {
  return s.toLowerCase().replace(/(\d),(\d)/g, '$1.$2').replace(/[^\p{L}\p{N}.\-+]+/gu, ' ').trim().split(/\s+/)
    .map((t) => t.replace(/^[.+]+|[.\-+]+$/g, '')).filter(Boolean)
}
const isNum = (t: string) => /^-?\d+(?:\.\d+)?(?:e[-+]?\d+)?$/i.test(t)
/** Never a harmless extra "label": Python literals (an extra None = print instead of return) and negations (flip the meaning). */
const LITERAL = new Set(['none', 'true', 'false', 'not', 'no', 'never', 'tidak', 'bukan', 'tak', 'belum'])
function sameLenientLine(got: string, ref: string) {
  const g = lenientTokens(got), r = lenientTokens(ref)
  const gn = g.filter(isNum).map(Number), rn = r.filter(isNum).map(Number)
  if (gn.length !== rn.length || !gn.every((x, i) => Math.abs(x - rn[i]) < 1e-9 * Math.max(1, Math.abs(rn[i])))) return false
  const gw = g.filter((t) => !isNum(t)), rw = r.filter((t) => !isNum(t))
  let k = 0
  for (const w of gw) {
    if (k < rw.length && w === rw[k]) k++
    else if (LITERAL.has(w)) return false
  }
  return k === rw.length
}
/** Line by line (non-empty lines): same number of lines; each line passes sameLenientLine. */
export function sameLenient(got: string, ref: string) {
  const lines = (s: string) => s.replace(/\r/g, '').split('\n').filter((l) => lenientTokens(l).length)
  const g = lines(got), r = lines(ref)
  return g.length === r.length && g.every((l, i) => sameLenientLine(l, r[i]))
}

/** Compare learner stdout with reference stdout. 'judge' is handled by the caller (runs Python). */
export function outputOk(mode: OutputMatch, got: string, ref: string): boolean {
  switch (mode) {
    case 'exact': return trimLines(got) === trimLines(ref)
    case 'numbers': return sameNums(numbers(got), numbers(ref))
    case 'lenient': return sameLenient(got, ref)
    default: return false
  }
}

/** One-line description of the first difference (shown under a failed test). */
export function outputDiff(got: string, ref: string): string {
  const g = trimLines(got).split('\n'), r = trimLines(ref).split('\n')
  for (let i = 0; i < Math.max(g.length, r.length); i++) {
    if ((g[i] ?? '') !== (r[i] ?? '')) {
      if (g[i] === undefined) return `Line ${i + 1} is missing: expected \`${r[i]}\``
      if (r[i] === undefined) return `Line ${i + 1} is extra: \`${g[i]}\``
      return `Line ${i + 1}: your output \`${g[i]}\`, expected \`${r[i]}\``
    }
  }
  return ''
}

/* ---------- Part I: multi-correct MCQ ---------- */

export type Mark = 'o' | 'x' | '-'
/**
 * Official rule: per option, a correct mark (○ on a true option or ✗ on a false one) = +1, a wrong mark = −1,
 * blank = 0. Max = number of options (4). Returned `norm` is clamped to 0..1 for proficiency.
 */
export function scoreMulti(q: MCQMulti, marks: Mark[]) {
  const per = q.correct.map((c, i) => {
    const m = marks[i] ?? '-'
    if (m === '-') return { mark: m, ok: false, pts: 0 }
    const ok = (m === 'o') === c
    return { mark: m, ok, pts: ok ? 1 : -1 }
  })
  const raw = per.reduce((s, p) => s + p.pts, 0)
  const max = q.correct.length
  return { per, raw, max, norm: Math.max(0, raw) / max, perfect: raw === max }
}
