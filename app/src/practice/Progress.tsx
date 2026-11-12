// Progress: per-archetype mastery (Paper vs all), per deck/topic, misconception heat-map, Part I calibration, export/import.
import { useMemo, useRef, useState } from 'react'
import { QUESTION } from '../bank'
import { ARCHETYPES, DECKS, type Archetype, type MisTag } from '../types'
import { UI_LANG } from './Hints'
import { MIS_LABEL, POOL, USING_SAMPLES } from './pool'
import { archetypeStats, exportAll, groupBy, importAll, proficiency, resetAll, topicStats, usePStore, type Attempt } from './store'
import { Bar, Ring, accColor, deckColor, go, pct, setPreset, tr } from './ui'
import './practice.css'

export function useAllAttempts(): Attempt[] { return usePStore().attempts }

const ALL_TAGS = Object.keys(MIS_LABEL) as MisTag[]

export default function Progress() {
  const lang = UI_LANG
  const store = usePStore()
  const atts = store.attempts
  const [msg, setMsg] = useState('')
  const file = useRef<HTMLInputElement>(null)
  const paper = useMemo(() => archetypeStats(atts, true), [atts])
  const all = useMemo(() => archetypeStats(atts), [atts])
  const archs = ARCHETYPES.filter((a) => POOL.some((p) => p.archetype === a.id) || all.has(a.id))
  const topics = useMemo(() => topicStats(atts).sort((a, b) => a.acc - b.acc), [atts])
  const byDeck = DECKS.map((d) => ({ d, p: proficiency(atts.filter((a) => a.deck === d.id)) })).filter((x) => x.p)

  // misconception heat-map: tag × archetype, cell = (attempts tagged) / (attempts on items exposed to that tag)
  const heat = useMemo(() => {
    const cells = new Map<string, { hit: number; exp: number }>()
    for (const a of atts) {
      const q = QUESTION.get(a.id)?.q
      const arch = a.archetype
      const exposed = new Set<MisTag>([...(q?.misconceptions ?? []), ...(a.tags ?? [])])
      for (const t of exposed) {
        const k = t + '|' + arch
        const c = cells.get(k) ?? { hit: 0, exp: 0 }
        c.exp++; if (a.tags?.includes(t)) c.hit++
        cells.set(k, c)
      }
    }
    const used = ALL_TAGS.filter((t) => [...cells.keys()].some((k) => k.startsWith(t + '|')))
    const cols = [...new Set([...cells.keys()].map((k) => k.split('|')[1] as Archetype))]
    return { cells, used, cols }
  }, [atts])

  // Bagian I calibration
  const cal = useMemo(() => {
    const mm = atts.filter((a) => a.kind === 'mcq-multi' && a.opts)
    const part = (xs: Attempt[]) => { let m = 0, r = 0, b = 0, pts = 0; for (const a of xs) for (const o of a.opts ?? []) { if (o.mark === '-') b++; else { m++; if (o.ok) { r++; pts++ } else pts-- } } return { m, r, b, pts, acc: m ? r / m : null as number | null } }
    return { all: part(mm), sure: part(mm.filter((a) => a.conf === 'sure')), unsure: part(mm.filter((a) => a.conf === 'unsure')), n: mm.length }
  }, [atts])

  const days = useMemo(() => {
    const key = (t: number) => { const d = new Date(t); return `${d.getMonth() + 1}/${d.getDate()}` }
    const by = groupBy(atts, (a) => key(a.t))
    return Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (13 - i)); const xs = by.get(key(d.getTime())) ?? []; return { label: key(d.getTime()), ok: xs.filter((a) => a.correct).length, bad: xs.filter((a) => !a.correct).length } })
  }, [atts])
  const maxDay = Math.max(1, ...days.map((d) => d.ok + d.bad))

  const download = () => {
    const url = URL.createObjectURL(new Blob([exportAll()], { type: 'application/json' }))
    const a = document.createElement('a'); a.href = url; a.download = `wi1102-progress-${new Date().toISOString().slice(0, 10)}.json`; a.click(); URL.revokeObjectURL(url)
  }
  const onFile = async (f?: File) => {
    if (!f) return
    try { setMsg(tr(lang, `Berhasil mengimpor ${importAll(await f.text())} set data.`, `Imported ${importAll(await f.text())} data sets.`)) } catch (e) { setMsg('Import failed: ' + (e as Error).message) }
  }
  const practice = (p: Parameters<typeof setPreset>[0]) => { setPreset(p); go('latihan') }
  const ratio = (a: number | null) => (a == null ? '–' : pct(a))
  const ev = (acc: number | null) => (acc == null ? null : 2 * acc - 1)

  return (
    <div className="pr-page">
      <h2>{tr(lang, 'Progres', 'Progress')}</h2>
      {!atts.length && <div className="pr-banner">{tr(lang, 'Belum ada percobaan. Kerjakan beberapa soal dulu.', 'No attempts yet. Do a few problems first.')}</div>}
      <section className="pr-card">
        <h3>{tr(lang, 'Penguasaan per tipe soal', 'Mastery per archetype')} <small className="muted">{tr(lang, 'cincin = hanya Mode Kertas · bar = semua mode', 'ring = Paper mode only · bar = all modes')}</small></h3>
        <div className="pr-archs">
          {archs.map((a) => {
            const pp = paper.get(a.id), aa = all.get(a.id)
            return (
              <div key={a.id} className="pr-arch">
                <Ring value={pp?.acc ?? null} size={60} />
                <div className="pr-arch-main"><b>{lang === 'en' ? a.titleEn : a.title}</b>
                  <span className="muted pr-small">{pp ? `${pp.n} ${tr(lang, 'percobaan kertas', 'paper attempts')}` : tr(lang, 'belum ada percobaan kertas', 'no paper attempts')}{aa ? ` · ${tr(lang, 'semua', 'all')} ${pct(aa.acc)} (${aa.n})` : ''}</span></div>
                <button className="btn sm" onClick={() => practice({ archetype: a.id, mode: 'test' })}>{tr(lang, 'Latih', 'Practice')}</button>
              </div>
            )
          })}
        </div>
      </section>
      <div className="pr-cols">
        <section className="pr-card"><h3>{tr(lang, 'Per deck', 'By deck')}</h3>
          {byDeck.map(({ d, p }) => <Bar key={d.id} value={p!.acc} color={deckColor(d.id)} label={<><b>{d.id}</b> {d.short}</>} right={`${pct(p!.acc)} · ${p!.n}`} />)}
          {!byDeck.length && <p className="muted">–</p>}
        </section>
        <section className="pr-card"><h3>{tr(lang, 'Percobaan 14 hari terakhir', 'Attempts, last 14 days')}</h3>
          <svg viewBox="0 0 420 150" className="pr-chart" role="img">
            {days.map((d, i) => { const h = (d.ok / maxDay) * 100, h2 = (d.bad / maxDay) * 100, x = 8 + i * 29.5; return (
              <g key={i}><rect x={x} y={115 - h - h2} width={22} height={h2} rx={3} fill="var(--err)" opacity={.75} /><rect x={x} y={115 - h} width={22} height={h} rx={3} fill="var(--ok)" opacity={.8} />
                <text x={x + 11} y={132} textAnchor="middle" fontSize="8.5" fill="var(--muted)">{i % 2 === 0 ? d.label : ''}</text></g>) })}
            <line x1="4" x2="416" y1="115" y2="115" stroke="var(--line)" />
          </svg>
        </section>
      </div>
      <section className="pr-card">
        <h3>{tr(lang, 'Peta panas miskonsepsi', 'Misconception heat-map')} <small className="muted">{tr(lang, 'seberapa sering kesalahan ini muncul pada soal yang memuatnya', 'how often this slip occurs on items that can trigger it')}</small></h3>
        {heat.used.length ? (
          <div className="pr-heat-wrap"><table className="pr-heat">
            <thead><tr><th />{heat.cols.map((c) => <th key={c}>{ARCHETYPES.find((a) => a.id === c)?.[lang === 'en' ? 'titleEn' : 'title']?.split(' ')[0]}</th>)}</tr></thead>
            <tbody>{heat.used.map((t) => <tr key={t}><th scope="row">{MIS_LABEL[t]}</th>{heat.cols.map((c) => {
              const x = heat.cells.get(t + '|' + c)
              const v = x ? x.hit / x.exp : null
              return <td key={c} title={x ? `${x.hit}/${x.exp}` : ''} style={v == null ? undefined : { background: `color-mix(in srgb, var(--err) ${Math.round(v * 80)}%, transparent)` }}>{x ? `${x.hit}/${x.exp}` : ''}</td>
            })}</tr>)}</tbody></table></div>
        ) : <p className="muted">{tr(lang, 'Muncul setelah ada soal program/robot yang salah dengan penyebab terdeteksi.', 'Appears once wrong program/robot answers have detected causes.')}</p>}
      </section>
      <section className="pr-card">
        <h3>{tr(lang, 'Kalibrasi Bagian I (○/✗/kosong)', 'Part I calibration (○/✗/blank)')}</h3>
        {cal.n ? (
          <>
            <div className="pr-cal">
              <div><b>{ratio(cal.all.acc)}</b><small>{tr(lang, 'tanda tepat', 'marks right')} ({cal.all.r}/{cal.all.m})</small></div>
              <div><b>{cal.all.b}</b><small>{tr(lang, 'dikosongkan', 'left blank')}</small></div>
              <div><b>{ratio(cal.sure.acc)}</b><small>{tr(lang, 'saat yakin', 'when sure')} ({cal.sure.m})</small></div>
              <div><b>{ratio(cal.unsure.acc)}</b><small>{tr(lang, 'saat ragu', 'when unsure')} ({cal.unsure.m})</small></div>
            </div>
            <p>{tr(lang, 'Nilai harapan tiap tanda = 2p − 1, dengan p = ketepatanmu.', 'Expected value per mark = 2p − 1, with p your accuracy.')} {ev(cal.all.acc) != null && <>{tr(lang, 'Untukmu', 'For you')}: <b style={{ color: accColor(cal.all.acc ?? 0) }}>{ev(cal.all.acc)! >= 0 ? '+' : ''}{ev(cal.all.acc)!.toFixed(2)}</b> {tr(lang, 'poin per tanda.', 'points per mark.')}</>}</p>
            {cal.unsure.m > 0 && <p>{tr(lang, 'Menandai saat ragu memberimu', 'Marking when unsure earned you')} <b>{cal.unsure.pts >= 0 ? '+' : ''}{cal.unsure.pts}</b> {tr(lang, 'poin', 'points')}{cal.unsure.pts < 0 ? ' · ' + tr(lang, 'lebih baik dikosongkan.', 'blanks would have been better.') : cal.unsure.acc != null && cal.unsure.acc < 0.5 ? '' : ' · ' + tr(lang, 'menebak terarahmu cukup baik.', 'your educated guesses pay off.')}</p>}
            {cal.sure.m === 0 && cal.unsure.m === 0 && <p className="muted pr-small">{tr(lang, 'Pakai tombol Yakin / Ragu sebelum mengumpulkan untuk melihat pembagian ini.', 'Use the Sure / Unsure toggle before submitting to see this split.')}</p>}
          </>
        ) : <p className="muted">{tr(lang, 'Belum ada soal Bagian I. Menandai hanya untung jika kamu >50 % yakin.', 'No Part I items yet. Marking only pays when you are >50 % sure.')}</p>}
      </section>
      <section className="pr-card"><h3>{tr(lang, 'Semua topik', 'All topics')} <small className="muted">{tr(lang, 'terlemah dulu', 'weakest first')}</small></h3>
        {topics.map((t) => <div key={t.deck + t.topic} className="pr-topic-row"><Bar value={t.acc} label={<><span className="pr-lec" style={{ background: deckColor(t.deck) }}>{t.deck}</span> {t.topic}</>} right={`${pct(t.acc)} · ${t.n}`} /><button className="btn sm ghost" onClick={() => practice({ deck: t.deck, topic: t.topic })}>{tr(lang, 'Latih', 'Practice')}</button></div>)}
        {!topics.length && <p className="muted">–</p>}
      </section>
      <section className="pr-card">
        <h3>{tr(lang, 'Datamu', 'Your data')}</h3>
        <p className="muted pr-small">{tr(lang, 'Semua tersimpan di browser ini (kunci bk.*). Ekspor untuk cadangan atau pindah perangkat.', 'Everything is stored in this browser (bk.* keys). Export to back up or move devices.')}</p>
        <div className="row">
          <button className="btn" onClick={download}>⬇ Export JSON</button>
          <button className="btn" onClick={() => file.current?.click()}>⬆ Import JSON</button>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => { void onFile(e.target.files?.[0]); e.target.value = '' }} />
          <button className="btn ghost" style={{ color: 'var(--err)' }} onClick={() => { if (confirm(tr(lang, 'Hapus semua progres, kotak kartu, dan tanda? Tidak bisa dibatalkan.', 'Delete all progress, card boxes and flags? This cannot be undone.'))) { resetAll(); setMsg(tr(lang, 'Progres direset.', 'Progress reset.')) } }}>{tr(lang, 'Reset semua', 'Reset all')}</button>
        </div>
        {msg && <p className="pr-small">{msg}</p>}
      </section>
    </div>
  )
}
