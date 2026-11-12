// Past papers: every Paper in paper order (intro, figures, all parts). Answer in place, Paper or Lab mode.
import { useMemo, useState } from 'react'
import { PROBLEM } from '../bank'
import { Md, useLocalState } from '../lib/kit'
import type { Mode, Paper, Problem } from '../types'
import type { Outcome } from '../views/contract'
import { ItemLangToggle, UI_LANG, useLang } from './Hints'
import { PAPERS, USING_SAMPLES } from './pool'
import { ProblemView, problemScore } from './QuestionView'
import { usePStore } from './store'
import { SOURCE_LABEL, fmt04, go, pct, tr } from './ui'
import { IconChevronLeft, IconInfoFill } from '../lib/icons'
import './practice.css'

const problemsOf = (p: Paper): Problem[] => p.problems.map((id) => PROBLEM.get(id)).filter((x): x is Problem => !!x)

export default function Past({ arg }: { arg?: string }) {
  const paper = arg ? PAPERS.find((p) => p.id === arg) : undefined
  return paper ? <PaperPage key={paper.id} paper={paper} /> : <PaperList />
}

function PaperList() {
  const lang = UI_LANG
  const store = usePStore()
  const answered = new Set(store.attempts.map((a) => a.id))
  const groups = new Map<string, Paper[]>()
  for (const p of [...PAPERS].sort((a, b) => (b.year ?? 0) - (a.year ?? 0))) { const g = groups.get(p.kind); if (g) g.push(p); else groups.set(p.kind, [p]) }
  return (
    <div className="pr-page">
      <h2>{tr(lang, 'Soal lalu', 'Past papers')}</h2>
      <p className="muted">{tr(lang, 'Setiap paper ditampilkan sesuai urutan aslinya, lengkap dengan pengantar, gambar, dan semua bagian.', 'Every paper in its original order, with the intro, figures and all parts.')}</p>
      {!PAPERS.length && <div className="pr-banner">{USING_SAMPLES ? tr(lang, 'Belum ada paper di bank.', 'No papers in the bank yet.') : tr(lang, 'Bank belum memuat daftar paper.', 'The bank has no paper lists yet.')}</div>}
      {[...groups].map(([kind, ps]) => (
        <section key={kind}>
          <h3 className="pp-group">{SOURCE_LABEL[kind as keyof typeof SOURCE_LABEL] ?? kind}</h3>
          <div className="pp-list">
            {ps.map((p) => {
              const pr = problemsOf(p)
              const nq = pr.reduce((n, x) => n + x.parts.length, 0)
              const done = pr.reduce((n, x) => n + x.parts.filter((q) => answered.has(q.id)).length, 0)
              return (
                <a key={p.id} className="pp-item" href={'#/soal-lalu/' + p.id}>
                  <b className="pp-year">{p.year ?? '·'}</b>
                  <span className="pp-main"><b>{p.title}</b><span className="muted">{pr.length} {tr(lang, 'soal', 'problems')} · {nq} {tr(lang, 'bagian', 'parts')}{p.minutes ? ` · ${p.minutes} ${tr(lang, 'menit', 'min')}` : ''}{p.date ? ` · ${p.date}` : ''}</span>
                    <span className="pr-prog pp-prog"><div style={{ width: pct(done / Math.max(1, nq)) }} /></span></span>
                  <span className="chip">{done}/{nq}</span>
                </a>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

function PaperPage({ paper }: { paper: Paper }) {
  const lang = UI_LANG
  const [gl] = useLang()
  const [mode, setMode] = useLocalState<Mode>('bk.pmode', 'test')
  const [outs, setOuts] = useState<Record<string, Outcome | undefined>>({})
  const ps = useMemo(() => problemsOf(paper), [paper])
  const missing = paper.problems.length - ps.length
  // paper total on the official weights, from the problems answered so far
  const weighted = ps.reduce((s, p) => { const sc = problemScore(p, outs); return sc.n ? s + (p.paperWeight ?? 0) * (sc.score04 / 4) : s }, 0)
  const anyW = ps.some((p) => p.paperWeight != null)
  const nDone = ps.filter((p) => problemScore(p, outs).n > 0).length
  return (
    <div className="pr-page pp-page">
      <div className="pp-head">
        <div>
          <button className="btn ghost sm" onClick={() => go('soal-lalu')}><IconChevronLeft size={14} />{tr(lang, 'Soal lalu', 'Past papers')}</button>
          <h2>{paper.title}</h2>
          <p className="muted">{[paper.year, paper.date, paper.minutes ? `${paper.minutes} ${tr(lang, 'menit', 'min')}` : null].filter(Boolean).join(' · ')}</p>
        </div>
        <div className="row" style={{ gap: 10, alignItems: 'center' }}>
        {paper.lang === 'id' && <ItemLangToggle srcLang="id" />}
        <div className="seg" title={tr(lang, 'Mode', 'Mode')}>
          <button className={mode === 'test' ? 'on' : ''} onClick={() => setMode('test')}>{tr(lang, 'Kertas', 'Paper')}</button>
          <button className={mode === 'learn' ? 'on' : ''} onClick={() => setMode('learn')}>Lab</button>
        </div>
        </div>
      </div>
      {(() => { const note = paper.lang === 'id' && gl === 'id' ? (paper.noteId ?? paper.note) : paper.note; return note ? <div className="pp-note"><IconInfoFill size={16} /><Md inline>{note}</Md></div> : null })()}
      {missing > 0 && <div className="pr-banner">{missing} {tr(lang, 'soal di paper ini belum ada di bank.', 'problems of this paper are not in the bank yet.')}</div>}
      {nDone > 0 && <div className="pp-const"><b>{tr(lang, 'Sejauh ini', 'So far')}:</b> {nDone}/{ps.length} {tr(lang, 'soal', 'problems')}{anyW ? <> · {tr(lang, 'nilai berbobot resmi', 'official-weighted')} <b>{fmt04(weighted * 100)}</b>/{fmt04(ps.reduce((s, p) => s + (p.paperWeight ?? 0), 0) * 100)}</> : null}</div>}
      {ps.map((p) => (
        <section key={p.id} className="pp-prob">
          <ProblemView problem={p} mode={mode} outs={outs} layout="stack" src="past" onPartDone={(q, o) => setOuts((m) => ({ ...m, [q.id]: o }))} />
        </section>
      ))}
    </div>
  )
}
