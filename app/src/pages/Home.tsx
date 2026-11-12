// Home: countdown, "Next up" (weakest archetype × misconception), archetype cards with mastery rings, bank counts.
import { useMemo } from 'react'
import { ARCHETYPES, type Archetype, type MisTag } from '../types'
import { PROBLEMS } from '../bank'
import { UI_LANG } from '../practice/Hints'
import { MIS_LABEL, POOL, nextUp } from '../practice/pool'
import { archetypeStats, isDue, usePStore } from '../practice/store'
import { FLASHCARDS } from '../bank'
import { Ring, SOURCE_LABEL, go, pct, setPreset, tr } from '../practice/ui'
import '../practice/practice.css'
import './pages.css'
import { ExternalLinks } from './Library'

const EXAM = new Date(2026, 10, 14, 8, 0, 0) // Sat 14 Nov 2026
function daysLeft() { const t = new Date(); t.setHours(0, 0, 0, 0); const e = new Date(EXAM); e.setHours(0, 0, 0, 0); return Math.round((e.getTime() - t.getTime()) / 86400000) }

export default function Home() {
  const lang = UI_LANG
  const store = usePStore()
  const paper = useMemo(() => archetypeStats(store.attempts, true), [store.attempts])
  const all = useMemo(() => archetypeStats(store.attempts), [store.attempts])
  const up = useMemo(() => nextUp(store.attempts), [store.attempts])
  const d = daysLeft()
  const due = FLASHCARDS.filter((c) => isDue(store.cards[c.id])).length
  const bySource = new Map<string, number>()
  for (const p of PROBLEMS) bySource.set(p.source.kind, (bySource.get(p.source.kind) ?? 0) + p.parts.length)
  const start = (archetype: Archetype, tag?: MisTag, auto = false) => { setPreset({ archetype, tag, mode: 'test', autostart: auto }); go('latihan') }
  return (
    <div className="pr-page">
      <div className="pr-hero">
        <div>
          <h2>WI1102 · UTS Computational Thinking</h2>
          <p className="muted">{tr(lang, 'Ujian tulis tangan, Sabtu 14 Nov 2026. Bagian I: pilihan ganda ○/✗ (+1 / −1 / 0). Bagian II: esai dinilai 0–4 dengan rubrik resmi.', 'Handwritten exam, Sat 14 Nov 2026. Part I: ○/✗ MCQ (+1 / −1 / 0). Part II: essays marked 0–4 on the official rubric.')}</p>
        </div>
        <div className={'pr-count' + (d <= 3 ? ' urgent' : '')}>
          <b>{d > 0 ? d : d === 0 ? tr(lang, 'Hari ini', 'Today') : '–'}</b>
          <span>{d > 1 ? tr(lang, 'hari menuju UTS', 'days to the exam') : d === 1 ? tr(lang, 'hari lagi, besok!', 'day left, tomorrow!') : d === 0 ? tr(lang, 'hari-H, semangat!', 'exam day, good luck!') : tr(lang, 'UTS sudah lewat', 'exam passed')}</span>
        </div>
      </div>
      {up && (
        <div className="pr-next">
          <div><b>{tr(lang, 'Berikutnya untukmu', 'Next up')}</b><br /><span className="muted">{ARCHETYPES.find((a) => a.id === up.archetype)?.[lang === 'en' ? 'titleEn' : 'title']}{up.tag ? ` · ${MIS_LABEL[up.tag]}` : ''}{up.acc != null ? ` · ${pct(up.acc)}` : ` · ${tr(lang, 'belum dicoba', 'not tried yet')}`}</span></div>
          <button className="btn primary" onClick={() => start(up.archetype, up.tag, true)}>{tr(lang, 'Mulai', 'Start')} →</button>
        </div>
      )}
      <h3 className="pr-sec">{tr(lang, 'Tipe soal', 'Archetypes')}</h3>
      <div className="pr-archgrid">
        {ARCHETYPES.map((a) => {
          const n = POOL.filter((p) => p.archetype === a.id).length
          const pp = paper.get(a.id), aa = all.get(a.id)
          return (
            <button key={a.id} className="pr-archcard" disabled={!n} onClick={() => start(a.id)}>
              <Ring value={pp?.acc ?? null} size={58} />
              <span className="pr-archcard-t"><b>{lang === 'en' ? a.titleEn : a.title}</b>
                <small className="muted">{n} {tr(lang, 'soal', 'problems')}{pp ? ` · ${tr(lang, 'kertas', 'paper')} ${pp.n}×` : aa ? ` · ${tr(lang, 'lab', 'lab')} ${aa.n}×` : ''}</small></span>
            </button>
          )
        })}
      </div>
      <div className="pr-modes">
        <a className="pr-mode" href="#/soal-lalu"><b>{tr(lang, 'Soal lalu', 'Past papers')}</b><p>{tr(lang, 'Setiap paper, urut seperti aslinya.', 'Every paper in order.')}</p></a>
        <a className="pr-mode" href="#/ujian"><b>{tr(lang, 'Ujian simulasi', 'Mock exam')}</b><p>{tr(lang, 'Berwaktu, bisa dicetak, lalu nilai diri.', 'Timed, printable, then self-mark.')}</p></a>
        <a className={'pr-mode' + (due ? ' accent' : '')} href="#/kartu"><b>{tr(lang, 'Kartu', 'Flashcards')}</b><p>{due ? `${due} ${tr(lang, 'jatuh tempo hari ini', 'due today')}` : tr(lang, 'Leitner 1·2·4·8 hari.', 'Leitner 1·2·4·8 days.')}</p></a>
        <a className="pr-mode" href="#/sintaks"><b>{tr(lang, 'Sintaks', 'Syntax')}</b><p>{tr(lang, 'Kartu Python ⇄ pseudocode ⇄ flowchart.', 'Python ⇄ pseudocode ⇄ flowchart cards.')}</p></a>
        <a className="pr-mode" href="#/library"><b>{tr(lang, 'Pustaka', 'Library')}</b><p>{tr(lang, 'Semua slide, praktikum & soal, bisa dicari.', 'Every slide deck, practicum and paper, searchable.')}</p></a>
      </div>
      <ExternalLinks />
      <div className="pg-sources"><h3>{tr(lang, 'Bank per sumber', 'Bank by source')}</h3>
        <div className="row-wrap">{[...bySource].map(([k, v]) => <span key={k} className="chip">{SOURCE_LABEL[k as keyof typeof SOURCE_LABEL] ?? k} · {v}</span>)}</div></div>
    </div>
  )
}
