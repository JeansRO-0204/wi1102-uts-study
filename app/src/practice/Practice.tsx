// Practice: choose by archetype / deck / source / paper / topic, Paper or Lab, interleaved by default; then run a Session.
import { useEffect, useMemo, useState } from 'react'
import { useLocalState } from '../lib/kit'
import { ARCHETYPES, DECKS, type Archetype, type DeckId, type MisTag, type Mode, type Problem, type SourceKind } from '../types'
import { UI_LANG } from './Hints'
import { MIS_LABEL, PAPERS, POOL, USING_SAMPLES, filterProblems, interleave, nextUp, shuffled } from './pool'
import Session from './Session'
import { generateConstraintProblem } from '../views/constraintGen'
import { generateRobotProblem } from '../robot/generators'
import { usePStore } from './store'
import { SOURCE_LABEL, deckColor, takePreset, tr, type Preset } from './ui'
import './practice.css'

interface Cfg {
  archetypes: Archetype[]; decks: DeckId[]; sources: SourceKind[]; paper: string; topic: string; tag?: MisTag
  order: 'mix' | 'seq'; count: number; officialOnly: boolean; includeOos: boolean; flaggedOnly: boolean; wrongOnly: boolean
}
const BASE: Cfg = { archetypes: [], decks: [], sources: [], paper: '', topic: '', order: 'mix', count: 10, officialOnly: false, includeOos: false, flaggedOnly: false, wrongOnly: false }

const toggle = <T,>(xs: T[], x: T) => (xs.includes(x) ? xs.filter((y) => y !== x) : [...xs, x])

export default function Practice() {
  const lang = UI_LANG
  const store = usePStore()
  const [mode, setMode] = useLocalState<Mode>('bk.pmode', 'test')
  const [preset] = useState<Preset | null>(() => takePreset())
  const [cfg, setCfg] = useState<Cfg>(() => ({
    ...BASE,
    archetypes: preset?.archetype ? [preset.archetype] : [], decks: preset?.deck ? [preset.deck] : [], topic: preset?.topic ?? '', tag: preset?.tag,
    paper: preset?.paper ?? '', flaggedOnly: !!preset?.flaggedOnly, wrongOnly: !!preset?.wrongOnly,
  }))
  const [run, setRun] = useState<{ key: number; ps: Problem[]; mode: Mode; title: string } | null>(null)

  const filter = useMemo(() => ({ ...cfg, tag: cfg.tag, topic: cfg.topic || undefined, paper: cfg.paper || undefined, flagged: store.flagged, attempts: store.attempts }), [cfg, store.flagged, store.attempts])
  const avail = useMemo(() => filterProblems(filter), [filter])
  const topics = useMemo(() => [...new Set(POOL.filter((p) => !cfg.archetypes.length || cfg.archetypes.includes(p.archetype)).flatMap((p) => p.parts.map((q) => q.topic)))].sort(), [cfg.archetypes])
  const kinds = useMemo(() => [...new Set(POOL.map((p) => p.source.kind))], [])
  const archInPool = ARCHETYPES.filter((a) => POOL.some((p) => p.archetype === a.id))
  const decksInPool = DECKS.filter((d) => POOL.some((p) => p.parts.some((q) => q.decks.includes(d.id))))
  const up = useMemo(() => nextUp(store.attempts), [store.attempts])

  const start = (m: Mode = mode, ps?: Problem[], title?: string) => {
    const list = ps ?? (cfg.order === 'mix' ? interleave(avail) : avail)
    const n = cfg.count > 0 ? list.slice(0, cfg.count) : list
    if (!n.length) return
    setRun({ key: Date.now(), ps: n, mode: m, title: title ?? tr(lang, 'Latihan', 'Practice') })
  }
  // arriving from Beranda "Next up" / Progres with a preset that asks to start straight away
  const [auto, setAuto] = useState(!!preset?.autostart)
  useEffect(() => { if (auto && avail.length) { setAuto(false); start(preset?.mode ?? mode) } }) // eslint-disable-line react-hooks/exhaustive-deps

  if (run) return <Session key={run.key} title={run.title} problems={run.ps} mode={run.mode} src="quiz" onExit={() => setRun(null)} onRetry={(ps, m) => setRun({ key: Date.now(), ps: shuffled(ps), mode: m, title: tr(lang, 'Ulangi', 'Retry') })} />

  const fresh = (kind: 'constraint' | 'robot') => {
    const base = Math.floor(Math.random() * 90000) + 1000
    const ps = [0, 1, 2].map((i) => (kind === 'robot' ? generateRobotProblem(base + i) : generateConstraintProblem(base + i)))
    start(mode, ps, tr(lang, 'Soal baru (acak)', 'New random items'))
  }
  const set = (p: Partial<Cfg>) => setCfg((c) => ({ ...c, ...p }))
  const pill = (on: boolean, label: string, onClick: () => void, color?: string) => (
    <button key={label} className={'pr-pill sm' + (on ? ' on' : '')} style={color ? ({ ['--c' as string]: color }) : undefined} onClick={onClick} aria-pressed={on}>{label}</button>
  )
  return (
    <div className="pr-page">
      <h2>{tr(lang, 'Latihan', 'Practice')}</h2>
      <p className="muted">{tr(lang, 'Pilih soal berdasarkan tipe, deck, sumber, atau paper. Bawaan: campur antar-tipe (interleaving) dan Mode Kertas seperti ujian.', 'Pick by archetype, deck, source or paper. Default: interleaved and Paper mode, like the exam.')}</p>
      {USING_SAMPLES && <div className="pr-banner">{tr(lang, 'Bank soal masih diisi: yang tampil baru contoh pengembang.', 'The question bank is still being filled: only dev samples for now.')}</div>}
      {up && (
        <div className="pr-next">
          <div><b>{tr(lang, 'Berikutnya untukmu', 'Next up')}</b> <span className="muted">{ARCHETYPES.find((a) => a.id === up.archetype)?.[lang === 'en' ? 'titleEn' : 'title']}{up.tag ? ' · ' + MIS_LABEL[up.tag] : ''}</span></div>
          <button className="btn primary sm" onClick={() => { const ps = interleave(filterProblems({ archetypes: [up.archetype], tag: up.tag })); const alt = ps.length ? ps : interleave(filterProblems({ archetypes: [up.archetype] })); start(mode, alt.slice(0, 8), tr(lang, 'Berikutnya untukmu', 'Next up')) }}>{tr(lang, 'Mulai', 'Start')}</button>
        </div>
      )}
      <div className="pr-form">
        <section className="pr-card">
          <div className="pr-field"><label>{tr(lang, 'Mode', 'Mode')}</label>
            <div className="seg">
              <button className={mode === 'test' ? 'on' : ''} onClick={() => setMode('test')}>{tr(lang, 'Kertas (seperti ujian)', 'Paper (like the exam)')}</button>
              <button className={mode === 'learn' ? 'on' : ''} onClick={() => setMode('learn')}>Lab</button>
            </div>
            <p className="muted pr-small">{mode === 'test' ? tr(lang, 'Textarea polos, tanpa Run, satu kali kumpul, lalu laporan lengkap. Dihitung untuk penguasaan.', 'Plain textarea, no Run, single submit, then the full report. Counts toward mastery.') : tr(lang, 'Ada Run, cek langkah, umpan balik langsung, dan tracer. Tidak dihitung untuk penguasaan.', 'Run, step checks, live feedback and the tracer. Does not count toward mastery.')}</p>
          </div>
          <div className="pr-field"><label>{tr(lang, 'Tipe soal', 'Archetype')}</label>
            <div className="row-wrap">{archInPool.map((a) => pill(cfg.archetypes.includes(a.id), lang === 'en' ? a.titleEn : a.title, () => set({ archetypes: toggle(cfg.archetypes, a.id) })))}</div></div>
          <div className="pr-field"><label>Deck</label>
            <div className="row-wrap">{decksInPool.map((d) => pill(cfg.decks.includes(d.id), `${d.id} ${d.short}`, () => set({ decks: toggle(cfg.decks, d.id) }), deckColor(d.id)))}</div></div>
          <div className="pr-field"><label>{tr(lang, 'Sumber', 'Source')}</label>
            <div className="row-wrap">{kinds.map((k) => pill(cfg.sources.includes(k), SOURCE_LABEL[k], () => set({ sources: toggle(cfg.sources, k) })))}</div></div>
          <div className="pr-field row-wrap">
            <label className="pr-sel">{tr(lang, 'Paper', 'Paper')}<select value={cfg.paper} onChange={(e) => set({ paper: e.target.value })}><option value="">{tr(lang, 'Semua', 'All')}</option>{PAPERS.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}</select></label>
            <label className="pr-sel">{tr(lang, 'Topik', 'Topic')}<select value={cfg.topic} onChange={(e) => set({ topic: e.target.value })}><option value="">{tr(lang, 'Semua', 'All')}</option>{topics.map((t) => <option key={t}>{t}</option>)}</select></label>
            {cfg.tag && <button className="chip warn" onClick={() => set({ tag: undefined })} title={tr(lang, 'Hapus filter', 'Clear filter')}>{MIS_LABEL[cfg.tag]} ✕</button>}
          </div>
        </section>
        <section className="pr-card">
          <div className="pr-field"><label>{tr(lang, 'Urutan', 'Order')}</label>
            <div className="seg"><button className={cfg.order === 'mix' ? 'on' : ''} onClick={() => set({ order: 'mix' })}>{tr(lang, 'Campur (interleaving)', 'Interleaved')}</button><button className={cfg.order === 'seq' ? 'on' : ''} onClick={() => set({ order: 'seq' })}>{tr(lang, 'Berurutan', 'In order')}</button></div></div>
          <div className="pr-field"><label>{tr(lang, 'Jumlah soal', 'Problems')}</label>
            <div className="seg">{[5, 10, 20, 0].map((n) => <button key={n} className={cfg.count === n ? 'on' : ''} onClick={() => set({ count: n })}>{n || tr(lang, 'Semua', 'All')}</button>)}</div></div>
          <div className="pr-field pr-checks">
            <label className="pr-check"><input type="checkbox" checked={cfg.officialOnly} onChange={(e) => set({ officialOnly: e.target.checked })} /> {tr(lang, 'Hanya soal resmi', 'Official items only')}</label>
            <label className="pr-check"><input type="checkbox" checked={cfg.includeOos} onChange={(e) => set({ includeOos: e.target.checked })} /> {tr(lang, 'Sertakan di luar cakupan (KU1102 lama)', 'Include out-of-scope (old KU1102)')}</label>
            <label className="pr-check"><input type="checkbox" checked={cfg.wrongOnly} onChange={(e) => set({ wrongOnly: e.target.checked })} /> {tr(lang, 'Hanya yang terakhir salah', 'Only last-wrong')}</label>
            <label className="pr-check"><input type="checkbox" checked={cfg.flaggedOnly} onChange={(e) => set({ flaggedOnly: e.target.checked })} /> {tr(lang, `Hanya yang ditandai (${store.flagged.length})`, `Flagged only (${store.flagged.length})`)}</label>
          </div>
          <div className="pr-avail"><b>{avail.length}</b> {tr(lang, 'soal tersedia', 'problems available')}{cfg.count > 0 && avail.length > cfg.count ? ` · ${tr(lang, 'diambil', 'taking')} ${cfg.count}` : ''}</div>
          <button className="btn primary pr-big" disabled={!avail.length} onClick={() => start()}>{tr(lang, 'Mulai latihan', 'Start practice')} →</button>
          <div className="pr-field"><label>{tr(lang, 'Soal baru (acak)', 'New random items')}</label>
            <div className="row-wrap"><button className="btn sm" onClick={() => fresh('constraint')}>{tr(lang, 'Constraint ×3', 'Constraint ×3')}</button><button className="btn sm" onClick={() => fresh('robot')}>{tr(lang, 'Robot ×3', 'Robot ×3')}</button></div>
            <p className="muted pr-small">{tr(lang, 'Varian baru supaya tidak sekadar menghafal.', 'Fresh variants so you cannot just memorise.')}</p></div>
          <button className="btn ghost sm" onClick={() => setCfg(BASE)}>{tr(lang, 'Atur ulang filter', 'Reset filters')}</button>
        </section>
      </div>
    </div>
  )
}
