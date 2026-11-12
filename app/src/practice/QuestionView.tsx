// Dispatches a question to its per-kind view (lazy), wraps it in the shared chrome (label, weight, stem, figures,
// confidence toggle, flag, source pages) and logs the attempt. ProblemView steps through (or stacks) the parts of a
// multi-part problem and shows the weighted 0–4 problem score ("Cara Penilaian").
import { Suspense, lazy, useEffect, useRef, useState, type ComponentType } from 'react'
import { Md, PageChip } from '../lib/kit'
import type { Mode, Problem, Question, QKind } from '../types'
import type { Outcome, QViewProps } from '../views/contract'
import { ItemLangToggle, effLang, loc, useLang, type Lang } from './Hints'
import { logAttempt, toggleFlag, usePStore, type Source } from './store'
import { partWeights, sourceText } from './pool'
import { Figures, fmt04, rubricLetter, tr } from './ui'

const VIEWS: Record<QKind, ComponentType<QViewProps<any>>> = {
  'mcq-multi': lazy(() => import('../views/McqMulti')),
  mcq: lazy(() => import('../views/Mcq')),
  short: lazy(() => import('../views/Short')),
  open: lazy(() => import('../views/Open')),
  constraint: lazy(() => import('../views/Constraint')),
  classify: lazy(() => import('../views/Classify')),
  robot: lazy(() => import('../views/Robot')),
  program: lazy(() => import('../views/Program')),
  trace: lazy(() => import('../views/Trace')),
  bug: lazy(() => import('../views/Bug')),
}

export const KIND_LABEL: Record<QKind, string> = {
  'mcq-multi': 'Multi-correct ○/✗', mcq: 'Multiple choice', short: 'Short answer', open: 'Essay', constraint: 'Constraint', classify: 'Classification',
  robot: 'Robot', program: 'Program', trace: 'Read a program', bug: 'Find the bug',
}

export function ProblemHeader({ problem, lang }: { problem: Problem; lang: Lang }) {
  const title = (lang === 'en' && problem.en?.title) || problem.title
  const intro = (lang === 'en' && problem.en?.intro) || problem.intro
  const s = problem.source
  return (
    <header className="pq-prob">
      <div className="pq-meta">
        <span className="chip pq-slide">{sourceText(problem)}</span>
        {!s.official && <span className="chip warn" title={tr(lang, 'Bukan soal resmi dosen: kunci dicek ke slide', 'Not an official course item: the key was checked against the slides')}>{tr(lang, 'tidak resmi', 'unofficial')}</span>}
        {s.outOfScope && <span className="chip err">{tr(lang, 'di luar cakupan', 'out of scope')}</span>}
        {problem.paperWeight != null && <span className="chip">{tr(lang, 'bobot soal', 'problem weight')} {Math.round(problem.paperWeight * 100)}%</span>}
        {problem.minutes != null && <span className="chip">~{problem.minutes} {tr(lang, 'menit', 'min')}</span>}
      </div>
      <h3 className="pq-prob-title">{title}</h3>
      {s.lang === 'id' && <div className="pq-langtg"><ItemLangToggle srcLang={s.lang} /></div>}
      {intro && <div className="pp-intro"><Md>{intro}</Md></div>}
      <Figures figures={problem.figures} />
    </header>
  )
}

export interface QuestionViewProps {
  q: Question
  problem: Problem
  mode: Mode
  review?: Outcome
  onDone?: (o: Outcome) => void
  src?: Source
  compact?: boolean
  /** also render the problem header (title, source chip, intro, figures); ProblemView does it once for all parts */
  header?: boolean
  /** do not log (e.g. mock self-marking logs by itself) */
  noLog?: boolean
  /** the surrounding ProblemHeader already shows the ID/EN toggle */
  hideLangToggle?: boolean
}

export default function QuestionView({ q, problem, mode, review: reviewProp, onDone, src = 'quiz', compact, header, noLog, hideLangToggle }: QuestionViewProps) {
  const [gl] = useLang()
  const lang = effLang(problem.source.lang, gl)
  const store = usePStore()
  const [conf, setConf] = useState<'sure' | 'unsure' | undefined>()
  // an outcome present at mount = read-only review; one that arrives later (the learner just submitted) must not remount the view
  const [review] = useState(reviewProp)
  const [done, setDone] = useState(!!review)
  const t0 = useRef(Date.now())
  const logged = useRef(false)
  const View = VIEWS[q.kind]
  const L = loc(q, lang)
  const flagged = store.flagged.includes(q.id)
  const handle = (o: Outcome) => {
    setDone(true)
    if (!review && !noLog && !o.skipped && !logged.current) {
      logged.current = true
      logAttempt({
        id: q.id, deck: q.decks[0], archetype: problem.archetype, topic: q.topic, correct: o.correct, score: o.score, src, kind: q.kind,
        mode, hints: o.hints, conf, tags: o.tags, secs: Math.round((Date.now() - t0.current) / 1000), opts: o.opts,
      })
    }
    onDone?.(o)
  }
  const multi = problem.parts.length > 1
  return (
    <article className={'pq-q' + (compact ? ' compact' : '')} data-kind={q.kind}>
      {header && <ProblemHeader problem={problem} lang={lang} />}
      <div className="pq-meta">
        {q.label && <span className="chip pq-part">{multi ? tr(lang, 'Bagian', 'Part') + ' ' : ''}{q.label}</span>}
        <span className="chip">{KIND_LABEL[q.kind]}</span>
        {q.weight != null && multi && <span className="chip">{tr(lang, 'bobot', 'weight')} {Math.round(q.weight * 100)}%</span>}
        <span className="chip pq-topic">{q.topic}</span>
        <span className={'chip pq-mode ' + (mode === 'test' ? 'paper' : 'lab')}>{mode === 'test' ? tr(lang, 'Mode Kertas', 'Paper mode') : 'Lab'}</span>
        {q.difficulty && <span className="pq-diff" aria-label={`level ${q.difficulty}`}>{'●'.repeat(q.difficulty)}<i>{'●'.repeat(3 - q.difficulty)}</i></span>}
      </div>
      {!header && !hideLangToggle && problem.source.lang === 'id' && <div className="pq-langtg"><ItemLangToggle srcLang={problem.source.lang} /></div>}
      <div className="pq-stem"><Md>{L.stem}</Md></div>
      <Figures figures={q.figures} />
      {!done && !review && (
        <div className="pq-conf" role="group" aria-label={tr(lang, 'Seberapa yakin?', 'How sure are you?')}>
          <span className="muted">{tr(lang, 'Seberapa yakin sebelum mengumpulkan?', 'How sure before you submit?')}</span>
          <div className="seg">
            <button className={conf === 'sure' ? 'on' : ''} onClick={() => setConf(conf === 'sure' ? undefined : 'sure')}>{tr(lang, 'Yakin', 'Sure')}</button>
            <button className={conf === 'unsure' ? 'on' : ''} onClick={() => setConf(conf === 'unsure' ? undefined : 'unsure')}>{tr(lang, 'Ragu', 'Unsure')}</button>
          </div>
        </div>
      )}
      <Suspense fallback={<div className="page-loading" aria-label="Loading"><i /><i /><i /></div>}>
        <View key={q.id + (review ? ':r' : '')} q={q} problem={problem} mode={mode} lang={lang} onDone={handle} review={review} compact={compact} />
      </Suspense>
      <footer className="pq-foot">
        {q.refs?.map((r) => <PageChip key={r.src + r.page} r={r} />)}
        <span className="grow" />
        <button className={'btn sm' + (flagged ? ' on' : '')} onClick={() => toggleFlag(q.id)} title={tr(lang, 'Tandai untuk diulang nanti', 'Mark to revisit later')}>{flagged ? '⚑ ' + tr(lang, 'Ditandai', 'Flagged') : '⚐ ' + tr(lang, 'Tandai', 'Flag')}</button>
      </footer>
    </article>
  )
}

/* ---------- problem level ---------- */

/** Official-style problem score on 0–4: Σ weight × part score, from the parts answered so far. */
export function problemScore(problem: Problem, outs: Record<string, Outcome | undefined>) {
  const w = partWeights(problem)
  let s = 0, wDone = 0, fracSum = 0
  problem.parts.forEach((q, i) => {
    const o = outs[q.id]
    if (!o || o.skipped) return
    s += w[i] * (o.rubricScore ?? o.score * 4)
    fracSum += w[i] * o.score
    wDone += w[i]
  })
  const n = problem.parts.filter((q) => outs[q.id] && !outs[q.id]!.skipped).length
  return { score04: s, frac: fracSum, wDone, n, total: problem.parts.length, complete: n === problem.parts.length }
}

export interface ProblemViewProps {
  problem: Problem
  mode: Mode
  outs: Record<string, Outcome | undefined>
  onPartDone?: (q: Question, o: Outcome) => void
  /** 'steps' = one part at a time with tabs (Session); 'stack' = all parts under each other (past papers) */
  layout?: 'steps' | 'stack'
  src?: Source
  compact?: boolean
  noHeader?: boolean
}

export function ProblemView({ problem, mode, outs, onPartDone, layout = 'steps', src, compact, noHeader }: ProblemViewProps) {
  const [gl] = useLang()
  const lang = effLang(problem.source.lang, gl)
  const [part, setPart] = useState(0)
  useEffect(() => setPart(0), [problem.id])
  const multi = problem.parts.length > 1
  const sc = problemScore(problem, outs)
  const w = partWeights(problem)
  const parts = layout === 'stack' ? problem.parts.map((_, i) => i) : [part]
  return (
    <div className={'pq-problem' + (layout === 'stack' ? ' stack' : '')}>
      {!noHeader && <ProblemHeader problem={problem} lang={lang} />}
      {multi && layout === 'steps' && (
        <div className="pq-parts seg" role="tablist">
          {problem.parts.map((q, i) => {
            const o = outs[q.id]
            return <button key={q.id} role="tab" className={(i === part ? 'on' : '') + (o ? ' done' : '')} onClick={() => setPart(i)}>{q.label ?? i + 1}{o ? ' ✓' : ''}</button>
          })}
        </div>
      )}
      {parts.map((i) => {
        const q = problem.parts[i]
        return (
          <div key={q.id} className="pq-part-wrap">
            <QuestionView q={q} problem={problem} mode={mode} review={outs[q.id]} onDone={(o) => onPartDone?.(q, o)} src={src} compact={compact} hideLangToggle={!noHeader} />
            {layout === 'steps' && multi && outs[q.id] && i < problem.parts.length - 1 && (
              <div className="pq-nextpart"><button className="btn primary" onClick={() => setPart(i + 1)}>{tr(lang, 'Lanjut ke bagian', 'Next part')} {problem.parts[i + 1].label ?? i + 2} →</button></div>
            )}
          </div>
        )
      })}
      {multi && sc.n > 0 && (
        <section className="pq-pscore">
          <h4>{tr(lang, 'Nilai soal (cara penilaian resmi)', 'Problem score (official marking)')}</h4>
          <table>
            <tbody>
              {problem.parts.map((q, i) => {
                const o = outs[q.id]
                const r = o ? (o.rubricScore ?? o.score * 4) : null
                return <tr key={q.id}><td>{q.label ?? i + 1}</td><td>{Math.round(w[i] * 100)}%</td><td>{r == null ? <span className="muted">{tr(lang, 'belum', 'not yet')}</span> : <><b>{fmt04(r)}</b> / 4 <small className="muted">({rubricLetter(r)})</small></>}</td></tr>
              })}
            </tbody>
          </table>
          <p className="pq-total">{tr(lang, 'Total', 'Total')}: <b>{fmt04(sc.score04)}</b> / 4 <small className="muted">({rubricLetter(sc.score04)})</small>{!sc.complete && <span className="muted"> · {tr(lang, 'baru', 'only')} {sc.n}/{sc.total} {tr(lang, 'bagian', 'parts')}</span>}</p>
        </section>
      )}
    </div>
  )
}
