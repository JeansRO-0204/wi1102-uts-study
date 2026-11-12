// Topic groups for filtering. The bank's `topic` labels are free text (~200 distinct), too many for a filter,
// so each question is mapped to one or more of these groups from its topic label, patterns and archetype.
import type { PatternId, Problem, Question } from '../types'

export interface TopicGroup { id: string; label: string; re?: RegExp; patterns?: PatternId[]; archetypes?: string[] }

export const TOPIC_GROUPS: TopicGroup[] = [
  { id: 'ct', label: 'CT pillars & concepts', re: /\bCT\b|decomposition|pattern recognition|generali[sz]ation|abstraction|top-down|why ct|benefits/i },
  { id: 'algorithm', label: 'Algorithms & instruction order', re: /algorithm|instruction order|following instructions|programming steps|evaluating|worst case|simulation|optimi[sz]ation|greedy|pruning|knapsack|binary pattern/i },
  { id: 'graphs', label: 'Graphs & routes', re: /graph|route|path|DFS/i },
  { id: 'constraint', label: 'Constraints & assignment', re: /constraint|assignment with|task allocation|cost|capacity|table analysis/i, archetypes: ['constraint'] },
  { id: 'classify', label: 'Classification & unique codes', re: /classification|unique code|complete & disjoint/i, archetypes: ['classify'] },
  { id: 'robot', label: 'Robot commands', re: /robot/i, archetypes: ['robot'] },
  { id: 'structure', label: 'Program structure & pseudocode', re: /program structure|pseudocode|blocks and indentation|variable names|compiler|control structures|standard library|software\b/i },
  { id: 'io', label: 'Input, output & types', re: /input|output|type|sequence|declaration|^assignment\b|variable/i, patterns: ['sequence-io', 'type-conversion'] },
  { id: 'operators', label: 'Operators & formulas', re: /operator|formula|arithmetic|division|modulo|pythagor|constants|digits/i, patterns: ['operators'] },
  { id: 'branching', label: 'Branching (if / elif)', re: /branching|selection|if-else|if-elif|maximum of three|\bif\b/i, patterns: ['if-single', 'if-else', 'if-elif', 'nested-if'] },
  { id: 'for', label: 'For loops', re: /\bfor\b|counting backward|counting down|series|factorial|repetition|iteration|choosing a loop/i, patterns: ['for-count', 'for-backward'] },
  { id: 'while', label: 'While loops & sentinels', re: /while|iteration|sentinel|double stopping|limited attempts/i, patterns: ['while-counter', 'while-sentinel', 'while-condition'] },
  { id: 'nested', label: 'Nested loops', re: /nested loop|matrix|patterns\)|nested loops/i, patterns: ['nested-loop'] },
  { id: 'accumulate', label: 'Sum, count & average', re: /accumulat|average|count|statistic|sigma|sum\b|frequency|trend/i, patterns: ['accumulate-sum', 'count-if', 'average'] },
  { id: 'maxmin', label: 'Max / min', re: /max|min\b|largest|best subarray/i, patterns: ['max-min'] },
  { id: 'search', label: 'Searching & flags', re: /search|flag|marking/i, patterns: ['search-flag', 'search-last'] },
  { id: 'array', label: 'Arrays & lists', re: /array|list|matrix|sublist|element access|stack|queue|two-pointer|sort/i, patterns: ['array-populate', 'array-map', 'array-compare'] },
  { id: 'string', label: 'Strings', re: /string/i, patterns: ['string-processing'] },
  { id: 'subprogram', label: 'Functions & procedures', re: /function|procedure|subprogram|parameter|local variable|return|call validity/i, patterns: ['function-def-call', 'procedure', 'function-composition'] },
  { id: 'flowchart', label: 'Flowcharts', re: /flowchart/i },
  { id: 'tracing', label: 'Tracing & debugging', re: /tracing|reading a|debugging/i, archetypes: ['trace'] },
  { id: 'impact', label: 'Computing impact & ethics', re: /ethic|privacy|netiquette|security|green computing|generative ai|piracy|online classes|social media/i },
]
const OTHER: TopicGroup = { id: 'other', label: 'Other' }
export const TOPIC_LABEL: Record<string, string> = Object.fromEntries([...TOPIC_GROUPS, OTHER].map((g) => [g.id, g.label]))

/** Topic groups of one question. */
export function groupsOfQ(q: Question, archetype?: string): string[] {
  const text = `${q.topic}`
  const pats = q.patterns ?? []
  const out = TOPIC_GROUPS.filter((g) =>
    (g.re && g.re.test(text)) || g.patterns?.some((p) => pats.includes(p)) || (archetype && g.archetypes?.includes(archetype)),
  ).map((g) => g.id)
  if (q.decks.includes('D11') && !out.includes('impact')) out.push('impact')
  return out.length ? out : [OTHER.id]
}
/** Topic groups of a problem = union over its parts, in taxonomy order. */
export function groupsOfP(p: Problem): string[] {
  const s = new Set(p.parts.flatMap((q) => groupsOfQ(q, p.archetype)))
  if (s.size > 1) s.delete(OTHER.id) // 'Other' only when nothing else fits
  return [...TOPIC_GROUPS, OTHER].map((g) => g.id).filter((id) => s.has(id))
}
