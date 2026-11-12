// Shared contracts for the WI1102 UTS study site. Every agent builds against these.
// Do not change shapes without updating every user (bank files, views, build/verify.ts).
//
// LANGUAGE: the site is ENGLISH by default. Main text fields hold the SOURCE's own language verbatim
// (`Provenance.lang`). For Indonesian sources (lang 'id') every learner-facing field also has an English
// version in the `en` mirror (and `descEn`, `noteEn`, `msgEn`, LineNote.en …); the UI shows English and offers
// an ID/EN toggle on those items only. For English sources (lang 'en') everything, including hints, notes and
// feedback written for this site, is in English in the main fields and there is no toggle.
//
// EXECUTION FIDELITY: never hand-write expected outputs, trace rows or robot paths. `build/verify.ts`
// computes them by running the reference solutions (CPython via app/src/py/harness.py) and writes
// app/src/bank/_expected.json, which the UI reads.
import type { ComponentType, LazyExoticComponent } from 'react'

/* ============================== course structure ============================== */

export type DeckId = 'D01' | 'D02' | 'D03' | 'D04' | 'D05' | 'D06' | 'D07' | 'D08' | 'D09' | 'D10' | 'D11'
export interface Deck { id: DeckId; title: string; titleEn: string; short: string; color: string; src?: string }
export const DECKS: Deck[] = [
  { id: 'D01', title: 'Berpikir Komputasional', titleEn: 'Computational Thinking', short: 'CT', color: '#7c3aed', src: 'D01_ComputationalThinking' },
  { id: 'D02', title: 'Berpikir Algoritmik', titleEn: 'Algorithmic Thinking', short: 'Algoritma', color: '#4f46e5', src: 'D02_AlgorithmicThinking' },
  { id: 'D03', title: 'Abstraksi & Klasifikasi', titleEn: 'Abstraction & Classification', short: 'Abstraksi', color: '#0284c7' },
  { id: 'D04', title: 'Struktur Dasar Program', titleEn: 'Basic Program Structure', short: 'Struktur', color: '#0891b2', src: 'D04_BasicStructure' },
  { id: 'D05', title: 'Percabangan & Pengulangan', titleEn: 'Conditionals & Repetition', short: 'If/Loop', color: '#059669', src: 'D05_Conditionals_Repetition' },
  { id: 'D06', title: 'Array', titleEn: 'Array', short: 'Array', color: '#65a30d', src: 'D06_Array' },
  { id: 'D07', title: 'Deck 07', titleEn: 'Deck 07', short: 'D07', color: '#ca8a04' },
  { id: 'D08', title: 'Deck 08', titleEn: 'Deck 08', short: 'D08', color: '#d97706' },
  { id: 'D09', title: 'Deck 09', titleEn: 'Deck 09', short: 'D09', color: '#ea580c' },
  { id: 'D10', title: 'Subprogram', titleEn: 'Subprogram', short: 'Subprogram', color: '#db2777', src: 'D10_Subprogram' },
  { id: 'D11', title: 'Dampak Teknologi Computing', titleEn: 'Computing Impact', short: 'Dampak', color: '#9333ea', src: 'D11_ComputingImpact' },
]

/** The exam's question archetypes (see PLAN.md §0). The site is organised around these. */
export type Archetype =
  | 'mcq-multi'   // Bagian I: circle every correct option, cross every wrong one (+1 / −1 / 0)
  | 'constraint'  // Essay: find one configuration satisfying constraints + explain with CT principles
  | 'classify'    // Essay: hierarchical classification + unique codes
  | 'robot'       // Essay: robot command language with repeat n, parameterised by N
  | 'program'     // Essay: write a program (Python / pseudocode / flowchart)
  | 'trace'       // Essay: read a program or flowchart, give output / trace table
  | 'concept'     // Recall / short concept questions (slides, mock-ups, older papers)
export const ARCHETYPES: { id: Archetype; title: string; titleEn: string }[] = [
  { id: 'mcq-multi', title: 'Pilihan ganda (banyak jawaban)', titleEn: 'Multiple-correct MCQ' },
  { id: 'constraint', title: 'Penugasan / constraint', titleEn: 'Constraint assignment' },
  { id: 'classify', title: 'Klasifikasi hierarkis & kode', titleEn: 'Hierarchical classification' },
  { id: 'robot', title: 'Perintah robot (repeat n)', titleEn: 'Robot commands' },
  { id: 'program', title: 'Menulis program', titleEn: 'Write a program' },
  { id: 'trace', title: 'Membaca program / flowchart', titleEn: 'Read a program / flowchart' },
  { id: 'concept', title: 'Konsep', titleEn: 'Concepts' },
]

/** Programming patterns: the unit of skill for program/trace items. */
export type PatternId =
  | 'sequence-io' | 'type-conversion' | 'operators' | 'if-single' | 'if-else' | 'if-elif' | 'nested-if'
  | 'for-count' | 'for-backward' | 'while-counter' | 'while-sentinel' | 'while-condition' | 'nested-loop'
  | 'accumulate-sum' | 'count-if' | 'average' | 'max-min' | 'search-flag' | 'search-last'
  | 'array-populate' | 'array-map' | 'array-compare' | 'function-def-call' | 'procedure' | 'function-composition'
  | 'string-processing' | 'game-rules'

/** Misconception tags: used for targeted feedback and the "Next up" weakness queue. */
export type MisTag =
  | 'off-by-one' | 'str-concat' | 'return-vs-print' | 'while-no-next' | 'sentinel-counted' | 'assign-vs-eq'
  | 'int-vs-float-div' | 'input-is-str' | 'scope-local' | 'indentation' | 'not-disjoint' | 'not-complete'
  | 'init-in-loop' | 'max-init-zero' | 'index-range' | 'repeat-count' | 'constraint-missed' | 'unique-column-class'

/* ============================== provenance & references ============================== */

/** Where an item comes from. `src` is the materials/ file stem (also the page-image folder: app/public/pages/<src>/NNN.jpg). */
export type SourceKind =
  | 'uts'        // a real past UTS paper
  | 'guide'      // official grading guide (Petunjuk Penilaian), has official rubrics
  | 'tahunlalu'  // "UTS CT tahun lalu" collection
  | 'latihan'    // Latihan-1 / Latihan-2
  | 'mock'       // student-made mock-ups (unofficial)
  | 'tubay'      // Tutor Sebaya STEI'25
  | 'practicum'  // Praktikum #1–#4 (assignments)
  | 'module'     // Python module
  | 'extra'      // deck 05 extra exercises
  | 'slide'      // exercises / examples on lecture slides
  | 'older'      // KU1102 papers 2018/2019/2021 + Latihan Soal 2019 (older course)
  | 'generated'  // written for this site
export interface Provenance {
  kind: SourceKind
  /** materials/ file stem, e.g. 'UTS2025_attempt_scan', 'Praktikum3_LoopArray', 'D06_Array' */
  src?: string
  /** label as printed, e.g. 'Soal 4', 'Problem 2', 'Exercise 3', 'No. 7' */
  label?: string
  /** 1-based page(s) in the source PDF */
  pages?: number[]
  /** official = from the course team (UTS, guide, practicum, slides, module, extra). Mock-ups/TUBAY/generated are not. */
  official: boolean
  /** older-course or beyond-the-syllabus content: shown in its paper, kept out of default practice pools */
  outOfScope?: boolean
  /** year of the paper, if any */
  year?: number
  /** language of the source text (and therefore of the main fields). 'id' ⇒ `en` mirrors are required and the item gets an ID/EN toggle. */
  lang: 'id' | 'en'
}
/** A citation to a source page image. Rendered as a chip that opens the page lightbox. */
export interface PageRef { src: string; page: number }

/* ============================== rubric (official format) ============================== */

/** Official UTS marking: 0–4 with letter index; 3.5 = "AB" exists in the guide. */
export type RubricScore = 0 | 1 | 2 | 3 | 3.5 | 4
export const RUBRIC_INDEX: Record<RubricScore, string> = { 0: 'E', 1: 'D', 2: 'C', 3: 'B', 3.5: 'AB', 4: 'A' }
export interface RubricRow { score: RubricScore; desc: string; descEn?: string }
/** A graded sample answer (e.g. from the marked 2025 paper, anonymised). */
export interface Sample { answer: string; score: RubricScore; note: string; noteEn?: string }

/* ============================== representations ============================== */

export type Rep = 'python' | 'pseudo' | 'flow'

/**
 * Structured flowchart as a block tree (what the builder edits and what past-paper flowcharts are transcribed to).
 * `text` of io/process/cond is written in the course's pseudocode (Liem notation) or Python-ish expressions;
 * the flowchart compiler translates it through the pseudocode transpiler.
 */
export type FlowBlock =
  | { t: 'io'; dir: 'in' | 'out'; text: string }          // parallelogram: input(x) / output(x)
  | { t: 'process'; text: string }                         // rectangle: x ← x + 1
  | { t: 'if'; cond: string; then: FlowBlock[]; else?: FlowBlock[] }
  | { t: 'while'; cond: string; body: FlowBlock[] }        // test at top
  | { t: 'repeat'; body: FlowBlock[]; until: string }      // test at bottom
  | { t: 'call'; text: string }                            // predefined process (subprogram call)
export interface Flowchart { title?: string; blocks: FlowBlock[] }

/* ============================== questions ============================== */

/** English mirror of the text fields; any field left out falls back to Indonesian. */
export interface En {
  stem?: string; options?: string[]; why?: string[]; explanation?: string; hints?: string[]; work?: string[]
  answer?: string; keyPoints?: string[]; labels?: string[]; plan?: string; intro?: string; title?: string
}

interface QBase {
  /** globally unique, stable, lowercase: '<src-short>-<label>' e.g. 'uts25-s4b', 'prak3-p2', 'd06-ex4', 'gen-robot-03' */
  id: string
  /** 1–2 decks this mainly tests */
  decks: DeckId[]
  /** short human topic label, consistent within a deck (e.g. 'UU ITE', 'Max/min array', 'Robot repeat') */
  topic: string
  patterns?: PatternId[]
  misconceptions?: MisTag[]
  /** label shown in a multi-part problem, e.g. 'a', 'b', '4a' */
  label?: string
  /** weight of this part inside its problem (official "Cara Penilaian"), e.g. 0.4; parts of a problem sum to 1 */
  weight?: number
  /** markdown (Indonesian). Code in fenced blocks. Tables in GFM. Figures as PageRef in `figures`. */
  stem: string
  /** figures shown under the stem: page images of the source (or app/public/fig/... paths) */
  figures?: (PageRef | string)[]
  /** worked solution / discussion as one markdown block (Indonesian) */
  explanation: string
  /** progressive hints, nudge → method; never contain the final answer */
  hints?: string[]
  /** worked solution as ordered steps (revealed one at a time after the hints) */
  work?: string[]
  difficulty?: 1 | 2 | 3
  refs?: PageRef[]
  en?: En
}

/** Bagian I format: mark each option ○ (benar) or ✗ (salah) or leave blank. +1 per correct mark, −1 per wrong mark, 0 blank. */
export interface MCQMulti extends QBase { kind: 'mcq-multi'; options: string[]; correct: boolean[]; /** per-option reason */ why?: string[] }
/** Classic single-answer MCQ (mock-ups, older papers). `answer` = 0-based indexes. */
export interface MCQ extends QBase { kind: 'mcq'; options: string[]; answer: number[]; why?: string[] }

/** One typed blank; normalisation per type (see practice/answerCheck.ts). */
export interface Blank {
  label: string
  accept: string[]
  type?: 'text' | 'number' | 'code'
  tol?: { rel?: number; abs?: number }
  placeholder?: string
  wrong?: { match: string; msg: string; msgEn?: string }[]
}
export interface ShortQ extends QBase { kind: 'short'; blanks: Blank[] }

/** Free response marked against the official-style rubric (self-marked, with graded samples). */
export interface OpenQ extends QBase {
  kind: 'open'
  /** model / alternative answer (markdown). For questions with many valid answers say so and give 1–3 examples. */
  answer: string
  /** 0–4 rubric rows, highest first. Use the official wording when the source has one. */
  rubric?: RubricRow[]
  /** short checkable points a good answer contains (helps self-marking) */
  keyPoints?: string[]
  samples?: Sample[]
}

/**
 * Constraint assignment. The learner builds an answer in the UI; `check` (Python) validates it.
 * shape 'assign': answer is {entity: slot | null} (or {entity: [slots]} when multi)
 * shape 'grid':   answer is a list of [row, col] checkmarks (rows × cols table, like the book-collection guide)
 * check: Python source defining `def check(ans) -> list` returning violated-constraint messages ([] = valid). Each message is
 *   a string (source language) or a pair [indonesian, english]; for lang 'id' sources use pairs so the English UI can show them.
 */
export interface ConstraintQ extends QBase {
  kind: 'constraint'
  shape: 'assign' | 'grid'
  /** assign: entities (people/items) and slots (projects/groups). grid: rows and cols. */
  entities: string[]
  slots: string[]
  multi?: boolean
  check: string
  /** one valid answer (verified by build/verify.ts) */
  solution: unknown
  rubric?: RubricRow[]
  samples?: Sample[]
}

/** Hierarchical classification + unique code column. Auto-checks generic properties; reasoning is rubric-marked. */
export interface ClassifyQ extends QBase {
  kind: 'classify'
  /** the data table: column names and rows (the code column is filled by the learner) */
  columns: string[]
  rows: (string | number)[][]
  codeColumn: string
  /** model answer: levels and code pattern, plus codes for every row */
  model: { levels: { attr: string; codes?: Record<string, string> }[]; pattern: string; codes: string[] }
  rubric?: RubricRow[]
  samples?: Sample[]
}

/**
 * Robot command language. The learner writes a program in `dialect`; the simulator runs it for every n in `nValues`
 * and compares the drawn path with the reference `solution`'s path. Both run on the same simulator (app/src/robot/).
 */
export interface RobotQ extends QBase {
  kind: 'robot'
  dialect: 'ladybug' | 'rody' | 'generic'
  /** variable name the pattern is parameterised by, as printed ('N' or 'n') */
  param: string
  nValues: number[]
  /** reference program in the dialect */
  solution: string
  rubric?: RubricRow[]
  samples?: Sample[]
}

/**
 * Line-by-line explanation of a code listing (Indonesian; `en` optional). `line` is 1-based in the listing it annotates,
 * or [from, to] for a block. Write one note per meaningful line or block: WHAT it does and WHY (the rule / the trap),
 * e.g. "range(1, N+1): batas atas tidak ikut, jadi +1 agar N ikut diproses".
 */
export interface LineNote { line: number | [number, number]; note: string; en?: string; syntax?: SyntaxId }

/** Syntax constructs with a reference card (app/src/content/syntax.ts). */
export type SyntaxId =
  | 'program-template' | 'comment' | 'declarations' | 'assign' | 'input' | 'type-conversion' | 'print-str' | 'operators'
  | 'relational-logical' | 'if' | 'if-else' | 'if-elif' | 'for-range' | 'for-backward' | 'while' | 'sentinel'
  | 'list-init' | 'list-index' | 'def-function' | 'def-procedure' | 'return' | 'call' | 'math-import' | 'indentation'
/** A syntax reference card: the same construct in Python, Liem pseudocode and flowchart, plus the classic slips. */
export interface SyntaxCard {
  id: SyntaxId
  title: string
  /** one-sentence rule */
  rule: string
  python: string
  pseudo?: string
  /** which flowchart symbol and how it is drawn, in words */
  flow?: string
  /** minimal example with its output */
  example?: { code: string; stdin?: string[]; note?: string }
  /** common mistakes: wrong form → why → fix */
  slips: { wrong: string; why: string; fix: string }[]
  decks: DeckId[]
  refs?: PageRef[]
  /** SyntaxCards are written in English (main fields); `en` is unused for them. Kept for compatibility. */
  en?: { title?: string; rule?: string; flow?: string; slips?: { why?: string; fix?: string }[] }
}

/** One hidden test of a program. stdin lines feed input(); prompts passed to input() are NOT part of stdout. */
export interface ProgTest { name?: string; stdin?: string[]; /** human note shown on failure, e.g. 'N = 1', 'tidak ditemukan' */ edge?: string }
/** How the learner's stdout is compared with the reference output. */
export type OutputMatch =
  | 'exact'    // after trimming trailing spaces/blank lines
  | 'lenient'  // case/whitespace/punctuation-insensitive, numbers compared numerically (5 == 5.0)
  | 'numbers'  // only the sequence of numbers must match
  | 'judge'    // `judge` decides (free output format, e.g. "Tampilan input dan output bebas")
export interface ProgramQ extends QBase {
  kind: 'program'
  /** representations the learner may answer in; `required` forces one (past paper asks for it) */
  reps: Rep[]
  required?: Rep
  solution: { python: string; pseudo?: string; flow?: Flowchart }
  tests: ProgTest[]
  match: OutputMatch
  /** Python source `def judge(stdin: list[str], out: str, ref_out: str) -> str | None` returning an Indonesian error message or None when OK */
  judge?: string
  /** structural requirements checked statically, e.g. a subprogram is mandatory ("wajib membuat subprogram") */
  mustUse?: ('function' | 'procedure' | 'subprogram' | 'array' | 'while' | 'for' | 'if')[]
  /** classic wrong solutions: each must FAIL at least one test (verified); msg is the targeted feedback when output matches it */
  wrong?: { code: string; msg: string; msgEn?: string; tag?: MisTag }[]
  /** hint ladder extras: plan = pseudocode outline (no Python); skeleton = solution with ___ blanks */
  plan?: string
  skeleton?: string
  /** line-by-line explanation of solution.python (shown with the worked solution) */
  lineNotes?: LineNote[]
  /** line-by-line explanation of solution.pseudo, when given */
  pseudoNotes?: LineNote[]
  /** syntax cards relevant to this item (offered as a hint; counts as a hint rung in Paper mode) */
  syntax?: SyntaxId[]
  rubric?: RubricRow[]
  samples?: Sample[]
}

/** Read a program / flowchart: predict output or fill a trace table. Expected values come from execution. */
export interface TraceQ extends QBase {
  kind: 'trace'
  /** exactly one of code (Python) / pseudo / flow */
  code?: string
  pseudo?: string
  flow?: Flowchart
  stdin?: string[]
  /** what is asked: printed output, a per-iteration table of `watch` variables, or the final values of `watch` */
  ask: 'output' | 'table' | 'final'
  watch?: string[]
  /** line-by-line explanation of the listing (code / pseudo), shown after submit next to the tracer */
  lineNotes?: LineNote[]
  syntax?: SyntaxId[]
}

/** Find-the-bug: lines are 1-based in `code`. */
export interface BugQ extends QBase { kind: 'bug'; code: string; badLines: number[]; fixed: string; lineNotes?: LineNote[]; syntax?: SyntaxId[] }

export type Question = MCQMulti | MCQ | ShortQ | OpenQ | ConstraintQ | ClassifyQ | RobotQ | ProgramQ | TraceQ | BugQ
export type QKind = Question['kind']

/** A numbered problem (Soal) from a paper or exercise set: shared intro + one or more parts. Standalone items are a Problem with one part. */
export interface Problem {
  /** unique: '<paper>-<n>' e.g. 'uts25-s4', 'prak3-p2' */
  id: string
  archetype: Archetype
  source: Provenance
  /** short title as printed, e.g. 'Soal 4 – Suit Gunting-Batu-Kertas' */
  title: string
  /** shared scenario text above the parts (markdown, Indonesian verbatim) */
  intro?: string
  figures?: (PageRef | string)[]
  /** official overall weight of this Soal in its paper (e.g. 0.15), if known */
  paperWeight?: number
  /** suggested minutes on paper */
  minutes?: number
  parts: Question[]
  en?: { title?: string; intro?: string }
}

/** A whole paper, for the Past papers page and printable mocks. */
export interface Paper {
  id: string        // e.g. 'uts2025', 'guide2024'
  title: string
  year?: number
  date?: string
  minutes?: number
  kind: SourceKind
  /** language of the paper's source text ('id' ⇒ ID/EN toggle on its page) */
  lang?: 'id' | 'en'
  note?: string     // caveats (English), e.g. 'unofficial key', 'sample answers from a marked student sheet (anonymised)'
  noteId?: string
  problems: string[] // Problem ids in paper order
}

export interface Flashcard { id: string; decks: DeckId[]; topic: string; front: string; back: string; en?: { front?: string; back?: string }; refs?: PageRef[] }

/** What every bank file exports. */
export interface BankFile { problems: Problem[]; papers?: Paper[]; flashcards?: Flashcard[] }

/* ============================== widgets ============================== */

/** learn = hints + per-step checks + Run (Lab); test = Paper mode: no run, no checks until Submit. */
export type Mode = 'learn' | 'test'
export interface WidgetResult { correct: boolean; score?: number; summary?: string }
export interface WidgetProps<T = unknown> { mode?: Mode; task?: T; onResult?: (r: WidgetResult) => void; compact?: boolean }
export interface WidgetDef {
  id: string; title: string; deck: DeckId | 'tool'; blurb: string
  component: LazyExoticComponent<ComponentType<WidgetProps<any>>> | ComponentType<WidgetProps<any>>
  size?: { w: number; h: number }; taskable?: boolean
}

/* ============================== execution results (filled by build/verify.ts) ============================== */

export interface RunResult { stdout: string; error?: string; timeout?: boolean; steps?: number }
export interface TraceStep { line: number; vars: Record<string, string>; out: string }
/** app/src/bank/_expected.json: keyed by question id */
export interface Expected {
  /** program: reference stdout per test (same order as tests) */
  outputs?: string[]
  /** trace: reference stdout, final vars, and table rows (one per loop iteration / watched change) */
  output?: string
  final?: Record<string, string>
  table?: Record<string, string>[]
  /** robot: reference path per n (as a compact string of unit moves) */
  paths?: Record<string, string>
}
