// Guided lessons ("Learn" tab): one lesson per deck, read section by section, with runnable code, step-through traces,
// quick checks and bank questions embedded along the way. Content lives in learn/lessons/<deck>.ts (one file per deck).
// PURE types: lesson files `import type` only, so build/verify-learn.ts can load them with plain Node.
import type { DeckId, Flowchart, LineNote, PageRef, SyntaxId } from '../types'

export interface Lesson {
  deck: DeckId
  /** e.g. 'Conditionals & Repetition' */
  title: string
  /** one or two sentences: what this lesson is about and why it matters for the UTS */
  summary: string
  /** estimated reading + doing time */
  minutes: number
  /** "By the end you can …" (3–5 items, concrete, exam-shaped) */
  goals: string[]
  sections: Section[]
  /** the exam angle: what UTS questions on this deck look like (markdown, short) */
  examAngle?: string
}

export interface Section {
  /** stable within the lesson, kebab-case: 'why-loops', 'while-sentinel' */
  id: string
  title: string
  blocks: Block[]
}

export type Block =
  /** explanation in markdown (GFM tables OK, inline `code`, **bold**); keep paragraphs short. `refs` = slide pages it comes from */
  | { t: 'text'; md: string; refs?: PageRef[] }
  /** highlighted key idea / rule to remember */
  | { t: 'key'; md: string }
  /** a classic mistake: what students write, why it's wrong, the fix */
  | { t: 'trap'; md: string }
  /**
   * worked example in up to three representations (tabs). `python` is runnable and editable in place (a mini playground);
   * `stdin` = input lines fed to input() (one value per line). The verifier runs it, and checks that `pseudo` and `flow`
   * (when given) print the same output for the same `stdin`. `notes` = line-by-line notes for the Python.
   */
  | { t: 'code'; caption?: string; python?: string; pseudo?: string; flow?: Flowchart; stdin?: string[]; notes?: LineNote[]; pseudoNotes?: LineNote[] }
  /** step through a Python program line by line with the variable table (the Tracer) */
  | { t: 'trace'; caption?: string; code: string; stdin?: string[]; notes?: LineNote[] }
  /** "what does this print?": the learner types a prediction, then runs it to compare. Output is computed live, never written here. */
  | { t: 'predict'; prompt?: string; code: string; stdin?: string[]; explain: string }
  /** a quick check. `correct` = indices of the right options (one → single choice; several → tick all that apply) */
  | { t: 'quiz'; q: string; options: string[]; correct: number[]; why: string[] }
  /** embed a question from the bank by id (a part id, e.g. 'd05-oddeven-b'); rendered with the full practice view in Lab mode */
  | { t: 'question'; id: string; note?: string }
  /** syntax reference cards (Python ⇄ pseudocode ⇄ flowchart), shown inline */
  | { t: 'syntax'; ids: SyntaxId[] }
  /** a slide page shown inline (diagrams, tables worth seeing as drawn) */
  | { t: 'slide'; ref: PageRef; caption?: string }
