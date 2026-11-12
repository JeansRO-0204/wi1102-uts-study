// Question bank aggregator. Every app/src/bank/*.ts file (except index.ts and files starting with "_")
// exports `bank: BankFile`. Adding a source = adding a file here; nothing else to wire.
//
// RULE for bank files: they may only `import type` (no runtime imports), so build/verify.ts can load them
// with plain Node (type stripping) and run every reference answer in CPython.
import type { BankFile, Expected, Flashcard, Paper, Problem, Question } from '../types'
import expectedJson from './_expected.json'

const files = import.meta.glob<{ bank: BankFile }>(['./*.ts', '!./index.ts', '!./_*.ts'], { eager: true })

export const PROBLEMS: Problem[] = []
export const PAPERS: Paper[] = []
export const FLASHCARDS: Flashcard[] = []
for (const [path, mod] of Object.entries(files).sort(([a], [b]) => a.localeCompare(b))) {
  if (!mod.bank) { console.warn(`bank file ${path} has no \`bank\` export`); continue }
  PROBLEMS.push(...mod.bank.problems)
  PAPERS.push(...(mod.bank.papers ?? []))
  FLASHCARDS.push(...(mod.bank.flashcards ?? []))
}

export const PROBLEM = new Map(PROBLEMS.map((p) => [p.id, p]))
/** Every question with a back-pointer to its problem. */
export const QUESTIONS: { q: Question; p: Problem }[] = PROBLEMS.flatMap((p) => p.parts.map((q) => ({ q, p })))
export const QUESTION = new Map(QUESTIONS.map((x) => [x.q.id, x]))
/** Reference results computed by build/verify.ts (outputs, traces, robot paths). */
export const EXPECTED = expectedJson as Record<string, Expected>
