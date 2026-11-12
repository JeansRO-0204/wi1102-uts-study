// Contract between the practice engine (Session / QuestionView, owned by the practice agent) and the per-kind
// question views (each owned by one widget agent). Do not change without updating every view.
import type { MisTag, Mode, Problem, Question, RubricScore } from '../types'
import type { Lang } from '../practice/Hints'

/** What a view reports when the learner finishes a question. */
export interface Outcome {
  /** fully correct (for rubric items: rubric score 4) */
  correct: boolean
  /** 0..1, ALREADY capped by hintCap(hints) */
  score: number
  /** for essay-style items: the official 0–4 score (auto-filled or self-marked) */
  rubricScore?: RubricScore
  /** hint-ladder rungs opened */
  hints: number
  tags?: MisTag[]
  /** one line for the history list, e.g. "3/4 tests passed: off-by-one in range" (English) */
  summary?: string
  /** Part I: per-option marks */
  opts?: { mark: 'o' | 'x' | '-'; ok: boolean }[]
  /** the learner's answer, so the item can be re-shown read-only (review / ← → navigation) */
  answer?: unknown
  /** learner skipped without answering */
  skipped?: boolean
}

/** NOTE: the shell (practice/QuestionView) renders the stem, figures, label/weight and source chips. Views render only the answer area. */
export interface QViewProps<Q extends Question = Question> {
  q: Q
  problem: Problem
  /** 'learn' = Lab mode (Run, step checks, hints, live feedback); 'test' = Paper mode (no run, no feedback until Submit) */
  mode: Mode
  lang: Lang
  /** call exactly once per attempt */
  onDone: (o: Outcome) => void
  /** when set, show this previous outcome read-only (answers + feedback), no new attempt */
  review?: Outcome
  /** smaller chrome (inside mocks / narrow panels) */
  compact?: boolean
}
