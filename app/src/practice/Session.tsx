// Practice runner: numbered strip, ←/→ navigation, Paper/Lab mode, optional countdown, results with
// per-archetype / per-topic score and "retry the wrong ones".
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Mode, Problem, Question } from '../types'
import { ARCHETYPES } from '../types'
import type { Outcome } from '../views/contract'
import { UI_LANG } from './Hints'
import { ProblemView, problemScore } from './QuestionView'
import { groupBy, type Source } from './store'
import { Bar, accColor, fmt04, pct, rubricLetter, tr } from './ui'
import { IconChevronLeft, IconChevronRight, IconTimer } from '../lib/icons'

export interface SessionProps {
  title: string
  problems: Problem[]
  mode: Mode
  src: Source
  /** seconds; when set a countdown runs and the session ends at 0 */
  timeLimit?: number
  onExit: () => void
  onRetry?: (ps: Problem[], mode: Mode) => void
}

const fmtT = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`

export default function Session(p: SessionProps) {
  const { problems: ps, mode, src } = p
  const lang = UI_LANG
  const [idx, setIdx] = useState(0)
  const [outs, setOuts] = useState<Record<string, Outcome | undefined>>({})
  const [finished, setFinished] = useState(false)
  const endAt = useMemo(() => (p.timeLimit ? Date.now() + p.timeLimit * 1000 : 0), [p.timeLimit])
  const [left, setLeft] = useState(p.timeLimit ?? 0)

  const finish = () => setFinished(true)
  const finishRef = useRef(finish); finishRef.current = finish
  useEffect(() => {
    if (!endAt || finished) return
    const t = setInterval(() => {
      const l = Math.round((endAt - Date.now()) / 1000)
      setLeft(l)
      if (l <= 0) { clearInterval(t); finishRef.current() }
    }, 500)
    return () => clearInterval(t)
  }, [endAt, finished])

  const go = (i: number) => setIdx(Math.max(0, Math.min(ps.length - 1, i)))
  const isLast = idx === ps.length - 1
  const state = (pr: Problem) => {
    const sc = problemScore(pr, outs)
    return { sc, done: sc.n === pr.parts.length, any: sc.n > 0 }
  }
  const cur = ps[idx]
  const curDone = cur ? state(cur).done : false
  const live = useRef({ curDone, isLast })
  live.current = { curDone, isLast }
  useEffect(() => {
    if (finished) return
    const f = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'ArrowLeft') { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)) }
      else if (e.key === 'ArrowRight') { e.preventDefault(); setIdx((i) => Math.min(ps.length - 1, i + 1)) }
      else if (e.key === 'Enter' && live.current.curDone && t?.tagName !== 'BUTTON') {
        e.preventDefault()
        if (live.current.isLast) setFinished(true); else setIdx((i) => i + 1)
      }
    }
    window.addEventListener('keydown', f)
    return () => window.removeEventListener('keydown', f)
  }, [finished, ps.length])

  if (finished) return <Results {...p} outs={outs} />
  if (!cur) return <div className="pr-empty"><h3>{tr(lang, 'Tidak ada soal', 'No problems')}</h3><button className="btn" onClick={p.onExit}>{tr(lang, 'Kembali', 'Back')}</button></div>
  const answered = ps.filter((x) => state(x).done).length
  return (
    <div className="pr-session">
      <div className="pr-sess-head">
        <div><b>{p.title}</b> <span className="muted">· {mode === 'test' ? tr(lang, 'Mode Kertas', 'Paper mode') : 'Lab'} · {answered}/{ps.length} {tr(lang, 'selesai', 'done')}</span></div>
        <div className="row">
          {p.timeLimit ? <span className={'pr-timer' + (left < 120 ? ' low' : '')}><IconTimer size={14} /> {fmtT(left)}</span> : null}
          <button className="btn" onClick={() => { if (answered === ps.length || confirm(tr(lang, `${ps.length - answered} soal belum selesai. Akhiri sesi?`, `${ps.length - answered} unfinished. End the session?`))) finish() }}>{tr(lang, 'Selesai', 'Finish')}</button>
          <button className="btn ghost" onClick={() => { if (confirm(tr(lang, 'Keluar dari sesi? Jawaban yang sudah dikumpulkan tetap tersimpan.', 'Leave the session? Submitted answers are kept.'))) p.onExit() }}>{tr(lang, 'Keluar', 'Quit')}</button>
        </div>
      </div>
      {mode === 'test' && idx === 0 && !answered && <p className="pq-paperhint">{tr(lang, 'Mode Kertas meniru ujian: tanpa Run, satu kali kumpul, laporan lengkap sesudahnya. Hanya mode ini yang dihitung untuk penguasaan.', 'Paper mode mimics the exam: no Run, one submit, full report afterwards. Only this mode counts toward mastery.')}</p>}
      <div className="pr-strip" role="tablist">
        {ps.map((x, i) => {
          const s = state(x)
          const cls = 'pr-dot' + (i === idx ? ' cur' : '') + (s.done ? (s.sc.frac >= 0.8 ? ' ok' : s.sc.frac >= 0.4 ? ' ans' : ' bad') : s.any ? ' ans' : '')
          return <button key={x.id} className={cls} onClick={() => go(i)} title={x.title}>{i + 1}</button>
        })}
      </div>
      <div className="pr-sess-body">
        <ProblemView key={cur.id} problem={cur} mode={mode} outs={outs} src={src} onPartDone={(q, o) => setOuts((m) => ({ ...m, [q.id]: o }))} />
      </div>
      <div className="pr-sess-nav">
        <button className="btn" disabled={idx === 0} onClick={() => go(idx - 1)}><IconChevronLeft size={14} />{tr(lang, 'Sebelumnya', 'Previous')}</button>
        <span className="muted">{tr(lang, 'Soal', 'Problem')} {idx + 1} / {ps.length}</span>
        {isLast
          ? <button className={'btn' + (curDone ? ' primary' : '')} onClick={finish}>{tr(lang, 'Lihat hasil', 'See results')}</button>
          : <button className={'btn' + (curDone ? ' primary' : '')} onClick={() => go(idx + 1)}>{tr(lang, 'Berikutnya', 'Next')}<IconChevronRight size={14} />{curDone && <kbd>↵</kbd>}</button>}
      </div>
    </div>
  )
}

/* ---------- results ---------- */
export function Results(p: SessionProps & { outs: Record<string, Outcome | undefined> }) {
  const lang = UI_LANG
  const { problems: ps, outs } = p
  const rows = ps.map((pr) => ({ pr, sc: problemScore(pr, outs) }))
  const graded = rows.filter((r) => r.sc.n > 0)
  const score = graded.reduce((s, r) => s + r.sc.frac / Math.max(r.sc.wDone, 1e-9), 0)
  const ratio = graded.length ? score / graded.length : 0
  const wrong = rows.filter((r) => r.sc.n > 0 && r.sc.frac / Math.max(r.sc.wDone, 1e-9) < 0.8).map((r) => r.pr)
  const unanswered = rows.filter((r) => r.sc.n === 0).length
  const total04 = graded.reduce((s, r) => s + r.sc.score04, 0)
  const [show, setShow] = useState<'none' | 'wrong' | 'all'>(p.timeLimit ? 'all' : 'none')
  const byArch = [...groupBy(graded, (r) => r.pr.archetype)].map(([a, xs]) => ({ a, n: xs.length, s: xs.reduce((t, r) => t + r.sc.frac / Math.max(r.sc.wDone, 1e-9), 0) }))
  const byTopic = [...groupBy(graded.flatMap((r) => r.pr.parts.filter((q) => outs[q.id] && !outs[q.id]!.skipped).map((q) => ({ q, o: outs[q.id]! }))), (x) => x.q.topic)]
    .map(([t, xs]) => ({ t, n: xs.length, s: xs.reduce((a, x) => a + x.o.score, 0) })).sort((a, b) => a.s / a.n - b.s / b.n)
  const hintsUsed = graded.reduce((n, r) => n + r.pr.parts.reduce((m, q) => m + (outs[q.id]?.hints ?? 0), 0), 0)
  const list = show === 'all' ? ps : show === 'wrong' ? wrong : []
  return (
    <div className="pr-results">
      <div className="pr-score" style={{ ['--c' as string]: accColor(ratio) }}>
        <div className="pr-score-ring"><b>{pct(ratio)}</b><small>{graded.length} {tr(lang, 'soal', 'problems')}</small></div>
        <div>
          <h2>{p.title}: {tr(lang, 'hasil', 'results')}</h2>
          <p className="muted">{ratio >= 0.8 ? tr(lang, 'Kuat. Pertahankan.', 'Strong. Keep it up.') : ratio >= 0.55 ? tr(lang, 'Hampir. Ulangi bagian yang meleset di bawah.', 'Getting there. Review the misses below.') : tr(lang, 'Perlu latihan. Ulangi yang salah dan baca pembahasan.', 'Needs work. Retry the misses and read the explanations.')}</p>
          {graded.some((r) => r.pr.parts.length > 1) || graded.length ? <p className="muted">{tr(lang, 'Jumlah nilai 0–4 per soal', 'Sum of 0–4 problem scores')}: <b>{fmt04(total04)}</b> / {graded.length * 4} ({rubricLetter(total04 / Math.max(1, graded.length))} {tr(lang, 'rata-rata', 'avg')}){hintsUsed > 0 ? ` · ${hintsUsed} ${tr(lang, 'petunjuk dipakai', 'hints used')}` : ''}</p> : null}
          {unanswered > 0 && <p className="muted">{unanswered} {tr(lang, 'belum dikerjakan (tidak dihitung).', 'not attempted (not counted).')}</p>}
          <div className="row">
            {wrong.length > 0 && p.onRetry && <button className="btn primary" onClick={() => p.onRetry!(wrong, p.mode)}>{tr(lang, `Ulangi ${wrong.length} yang meleset`, `Retry the ${wrong.length} misses`)}</button>}
            <button className="btn" onClick={() => setShow(show === 'all' ? 'none' : 'all')}>{show === 'all' ? tr(lang, 'Sembunyikan tinjauan', 'Hide review') : tr(lang, 'Tinjau semua jawaban', 'Review all')}</button>
            {wrong.length > 0 && <button className="btn" onClick={() => setShow('wrong')}>{tr(lang, 'Hanya yang meleset', 'Misses only')}</button>}
            <button className="btn ghost" onClick={p.onExit}>{tr(lang, 'Selesai', 'Done')}</button>
          </div>
        </div>
      </div>
      <div className="pr-cols">
        <section className="pr-card"><h3>{tr(lang, 'Per tipe soal', 'By archetype')}</h3>
          {byArch.map((x) => <Bar key={x.a} value={x.s / x.n} label={ARCHETYPES.find((a) => a.id === x.a)?.[lang === 'en' ? 'titleEn' : 'title']} right={`${Math.round(x.s * 10) / 10}/${x.n}`} />)}
          {!byArch.length && <p className="muted">–</p>}
        </section>
        <section className="pr-card"><h3>{tr(lang, 'Per topik', 'By topic')} <small className="muted">{tr(lang, 'terlemah dulu', 'weakest first')}</small></h3>
          {byTopic.slice(0, 10).map((x) => <Bar key={x.t} value={x.s / x.n} label={x.t} right={`${Math.round(x.s * 10) / 10}/${x.n}`} />)}
          {!byTopic.length && <p className="muted">–</p>}
        </section>
      </div>
      {list.length > 0 && (
        <div className="pr-review">
          <h3>{tr(lang, 'Tinjauan', 'Review')}</h3>
          {list.map((pr) => {
            const sc = problemScore(pr, outs)
            const fr = sc.n ? sc.frac / sc.wDone : 0
            return (
              <article key={pr.id} className={'pr-review-item ' + (!sc.n ? 'skip' : fr >= 0.8 ? 'ok' : 'bad')}>
                <div className="pr-review-n">{ps.indexOf(pr) + 1}{!sc.n ? ' · ' + tr(lang, 'belum dikerjakan', 'unanswered') : ''}</div>
                <ProblemView problem={pr} mode={p.mode} outs={outs} layout="stack" src={p.src} />
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export type { Question }
