// Mock exam: timed, real exam proportions (Part I = 10 multi-correct MCQ, Part II = essays one per archetype).
// Printable on A4 (soal + separate kunci), then a self-marking entry screen. Can also be sat in-app (Session with timer).
import { useEffect, useMemo, useState } from 'react'
import { Md, useLocalState } from '../lib/kit'
import type { Archetype, MCQMulti, Problem, RubricScore } from '../types'
import { ARCHETYPES, RUBRIC_INDEX } from '../types'
import { ItemLangToggle, UI_LANG, effLang, loc, useLang, type Lang } from './Hints'
import { AnswerKey, PaperQuestion } from './Paper'
import { PAPERS, POOL, partWeights, shuffled, sourceText } from './pool'
import { Figures, Bar, accColor, fmt04, go, rubricLetter, tr } from './ui'
import Session from './Session'
import { RubricPicker } from './viewKit'
import { scoreMulti, type Mark } from './answerCheck'
import { logAttempt, usePStore } from './store'
import './practice.css'

type MItem = { q: MCQMulti; p: Problem }
/** item language: Indonesian only for Indonesian-source items when the learner picked the original */
const useItemLang = () => { const [gl] = useLang(); return (p: Problem): Lang => effLang(p.source.lang, gl) }
const ptitle = (p: Problem, l: Lang) => (l === 'en' && p.en?.title) || p.title
const pintro = (p: Problem, l: Lang) => (l === 'en' && p.en?.intro) || p.intro
interface MockSet { part1: MItem[]; essays: Problem[] }
const ESSAY_SLOTS: Archetype[] = ['constraint', 'classify', 'robot', 'trace', 'program', 'program']

export function buildMock(officialOnly: boolean, attempted: Set<string>): MockSet {
  const ok = (p: Problem) => !p.source.outOfScope && (!officialOnly || p.source.official)
  const pool = POOL.filter(ok)
  const mcq: MItem[] = pool.filter((p) => p.archetype === 'mcq-multi').flatMap((p) => p.parts.filter((q): q is MCQMulti => q.kind === 'mcq-multi').map((q) => ({ q, p })))
  const fresh = (x: MItem) => !attempted.has(x.q.id)
  const part1 = [...shuffled(mcq.filter(fresh)), ...shuffled(mcq.filter((x) => !fresh(x)))].slice(0, 10)
  const used = new Set<string>()
  const essays: Problem[] = []
  for (const a of ESSAY_SLOTS) {
    const c = pool.filter((p) => p.archetype === a && !used.has(p.id))
    const pick = [...shuffled(c.filter((p) => !p.parts.some((q) => attempted.has(q.id)))), ...shuffled(c)][0]
    if (pick) { used.add(pick.id); essays.push(pick) }
  }
  return { part1, essays }
}

const fmtT = (s: number) => { const a = Math.max(0, s); return `${Math.floor(a / 3600)}:${String(Math.floor((a % 3600) / 60)).padStart(2, '0')}:${String(a % 60).padStart(2, '0')}` }

type Stage = 'config' | 'sit' | 'mark' | 'done' | 'app'

export default function Mock() {
  const lang = UI_LANG
  const store = usePStore()
  const [minutes, setMinutes] = useLocalState('bk.mock.min', 120)
  const [official, setOfficial] = useLocalState('bk.mock.off', false)
  const [stage, setStage] = useState<Stage>('config')
  const [set, setSet] = useState<MockSet>(() => buildMock(false, new Set()))
  const [startAt, setStartAt] = useState(0)
  const attempted = useMemo(() => new Set(store.attempts.map((a) => a.id)), [store.attempts])
  const [marks, setMarks] = useState<Record<string, Mark[]>>({})
  const [rub, setRub] = useState<Record<string, RubricScore | null>>({})
  const reroll = () => setSet(buildMock(official, attempted))
  useEffect(reroll, [official]) // eslint-disable-line react-hooks/exhaustive-deps

  const begin = (s: Stage) => { setMarks({}); setRub({}); setStartAt(Date.now()); setStage(s) }
  const nEssayParts = set.essays.reduce((n, p) => n + p.parts.length, 0)

  if (stage === 'app') {
    const ps: Problem[] = [...set.part1.map(({ q, p }) => ({ ...p, id: p.id + '#' + q.id, parts: [q] })), ...set.essays]
    return <Session title={tr(lang, 'Ujian simulasi', 'Mock exam')} problems={ps} mode="test" src="mock" timeLimit={minutes * 60} onExit={() => setStage('config')} />
  }
  if (stage === 'sit') return <Sit set={set} minutes={minutes} startAt={startAt} onDone={() => setStage('mark')} onBack={() => setStage('config')} />
  if (stage === 'mark' || stage === 'done') return <MarkEntry set={set} marks={marks} setMarks={setMarks} rub={rub} setRub={setRub} stage={stage} onFinish={() => setStage('done')} onExit={() => setStage('config')} />

  return (
    <div className="pr-page">
      <h2>{tr(lang, 'Ujian simulasi', 'Mock exam')}</h2>
      <p className="muted">{tr(lang, 'Sama seperti hari-H: Bagian I (10 soal ○/✗, +1 / −1 / 0) lalu esai Bagian II, satu per tipe. Cetak dan kerjakan di kertas dengan pensil, atau kerjakan langsung di aplikasi. Setelah itu kamu menilai dirimu sendiri dengan rubrik resmi.', 'Like the real day: Part I (10 ○/✗ items, +1 / −1 / 0) then Part II essays, one per archetype. Print it and work on paper, or sit it in the app. Afterwards you self-mark on the official rubric.')}</p>
      <div className="pr-form">
        <section className="pr-card">
          <h3>{tr(lang, 'Pengaturan', 'Settings')}</h3>
          <div className="pr-field"><label>{tr(lang, 'Waktu', 'Time limit')}</label>
            <div className="seg">{[60, 90, 120, 150].map((m) => <button key={m} className={minutes === m ? 'on' : ''} onClick={() => setMinutes(m)}>{m} {tr(lang, 'mnt', 'min')}</button>)}</div></div>
          <div className="pr-field"><label className="pr-check"><input type="checkbox" checked={official} onChange={(e) => setOfficial(e.target.checked)} /> {tr(lang, 'Hanya soal resmi', 'Official items only')}</label></div>
          <div className="mk-actions">
            <button className="btn primary pr-big" disabled={!set.part1.length && !set.essays.length} onClick={() => begin('sit')}>{tr(lang, 'Mulai di kertas (cetak) →', 'Start on paper (print) →')}</button>
            <button className="btn pr-big" disabled={!set.part1.length && !set.essays.length} onClick={() => begin('app')}>{tr(lang, 'Kerjakan di aplikasi (Mode Kertas)', 'Sit it in the app (Paper mode)')}</button>
            <button className="btn ghost sm" onClick={reroll}>{tr(lang, 'Acak ulang soal', 'Re-roll the set')}</button>
          </div>
          <p className="muted pr-small">{tr(lang, 'Soal yang belum pernah kamu kerjakan diutamakan.', 'Items you have not tried yet are preferred.')}</p>
        </section>
        <section className="pr-card">
          <h3>{tr(lang, 'Susunan', 'Composition')}</h3>
          <div className="pr-comp"><span>{tr(lang, 'Bagian I', 'Part I')} · {tr(lang, 'pilihan ganda ○/✗', 'multi-correct MCQ')}</span><b>{set.part1.length}/10</b></div>
          {set.essays.map((p, i) => <div key={p.id} className="pr-comp"><span>{tr(lang, 'Soal', 'Q')} {i + 1} · {ARCHETYPES.find((a) => a.id === p.archetype)?.[lang === 'en' ? 'titleEn' : 'title']}<small className="muted"> · {sourceText(p)}</small></span><b>{p.parts.length}</b></div>)}
          {set.part1.length < 10 && <p className="muted pr-small">{tr(lang, 'Bank belum punya 10 soal Bagian I; ukuran mengikuti isi bank.', 'The bank has fewer than 10 Part I items so far.')}</p>}
          {set.essays.length < ESSAY_SLOTS.length && <p className="muted pr-small">{tr(lang, 'Beberapa tipe esai belum ada di bank.', 'Some essay archetypes are not in the bank yet.')}</p>}
          <p className="muted pr-small">{nEssayParts} {tr(lang, 'bagian esai', 'essay parts')} · {PAPERS.length} papers</p>
        </section>
      </div>
    </div>
  )
}

/* ---------- on-paper sitting: printable sheet + key ---------- */
function Sit({ set, minutes, startAt, onDone, onBack }: { set: MockSet; minutes: number; startAt: number; onDone: () => void; onBack: () => void }) {
  const lang = UI_LANG
  const il = useItemLang()
  const anyId = [...set.part1.map((x) => x.p), ...set.essays].some((p) => p.source.lang === 'id')
  const [now, setNow] = useState(Date.now())
  const [print, setPrint] = useState<'paper' | 'key'>('paper')
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const left = Math.round(minutes * 60 - (now - startAt) / 1000)
  const doPrint = (w: 'paper' | 'key') => { setPrint(w); setTimeout(() => window.print(), 60) }
  return (
    <div className="mk-root" data-print={print}>
      <div className="mk-bar no-print">
        <button className="btn ghost sm" onClick={() => { if (confirm(tr(lang, 'Batalkan ujian?', 'Cancel the exam?'))) onBack() }}>{tr(lang, 'Batal', 'Cancel')}</button>
        <span className={'pr-timer' + (left < 600 ? ' low' : '')}>{fmtT(left)}</span>
        <span className="grow" />
        {anyId && <ItemLangToggle srcLang="id" />}
        <button className="btn" onClick={() => doPrint('paper')}>{tr(lang, 'Cetak soal', 'Print paper')}</button>
        <button className="btn" onClick={() => doPrint('key')}>{tr(lang, 'Cetak kunci', 'Print key')}</button>
        <button className="btn primary" onClick={onDone}>{tr(lang, 'Selesai → nilai diri', 'Done → self-mark')}</button>
      </div>
      <p className="muted no-print mk-hint">{tr(lang, 'Kerjakan di kertas dengan pensil. Kunci tidak ditampilkan di layar; cetak terpisah atau tunggu sampai tahap menilai.', 'Work on paper. The key is not shown on screen; print it separately or wait for the marking step.')}</p>
      <div className="mk-paper">
        <header className="mk-title">
          <h1>WI1102 Computational Thinking</h1>
          <p>UTS mock exam · {minutes} minutes · pencil allowed</p>
          <p className="mk-who">Name: ______________________ &nbsp; Student ID (NIM): ______________</p>
        </header>
        {set.part1.length > 0 && (
          <section className="mk-part">
            <h2>Part I · Multiple-correct MCQ</h2>
            <p className="mk-rule">Circle ○ for every statement that is <b>correct</b>, cross ✗ every one that is <b>wrong</b>. Correct +1, wrong −1, blank 0.</p>
            {set.part1.map(({ q, p }, i) => <PaperQuestion key={q.id} q={q} p={p} n={i + 1} lang={il(p)} />)}
          </section>
        )}
        {set.essays.length > 0 && (
          <section className="mk-part mk-break">
            <h2>Part II · Essays</h2>
            {set.essays.map((p, i) => (
              <div key={p.id} className="mk-prob">
                <h3>Problem {i + 1}{p.title ? ` · ${ptitle(p, il(p))}` : ''}</h3>
                {pintro(p, il(p)) && <Md>{pintro(p, il(p))!}</Md>}
                <Figures figures={p.figures} />
                {p.parts.map((q) => <PaperQuestion key={q.id} q={q} p={p} lang={il(p)} />)}
              </div>
            ))}
          </section>
        )}
      </div>
      <div className="mk-keysheet">
        <header className="mk-title"><h1>Answer key · WI1102 UTS mock exam</h1></header>
        {set.part1.length > 0 && <section className="mk-part"><h2>Part I</h2>
          {set.part1.map(({ q, p }, i) => <div key={q.id} className="mk-krow"><b>{i + 1}.</b> <AnswerKey q={q} lang={il(p)} /></div>)}</section>}
        {set.essays.map((p, i) => (
          <section key={p.id} className="mk-part"><h2>Problem {i + 1} · {ptitle(p, il(p))}</h2>
            {p.parts.map((q) => <div key={q.id} className="mk-krow">{q.label && <b>({q.label}) </b>}<AnswerKey q={q} lang={il(p)} /></div>)}</section>
        ))}
      </div>
    </div>
  )
}

/* ---------- self-marking entry ---------- */
function MarkEntry({ set, marks, setMarks, rub, setRub, stage, onFinish, onExit }: {
  set: MockSet; marks: Record<string, Mark[]>; setMarks: (f: (m: Record<string, Mark[]>) => Record<string, Mark[]>) => void
  rub: Record<string, RubricScore | null>; setRub: (f: (m: Record<string, RubricScore | null>) => Record<string, RubricScore | null>) => void
  stage: Stage; onFinish: () => void; onExit: () => void
}) {
  const lang = UI_LANG
  const il = useItemLang()
  const [open, setOpen] = useState<string | null>(null)
  const done = stage === 'done'
  const get = (q: MCQMulti) => marks[q.id] ?? q.options.map(() => '-' as Mark)
  const setMark = (q: MCQMulti, i: number, m: Mark) => { if (!done) setMarks((all) => ({ ...all, [q.id]: get(q).map((x, j) => (j === i ? m : x)) })) }
  const part1 = set.part1.map(({ q, p }) => ({ q, p, r: scoreMulti(q, get(q)) }))
  const raw1 = part1.reduce((s, x) => s + x.r.raw, 0), max1 = part1.reduce((s, x) => s + x.r.max, 0)
  const essays = set.essays.map((p) => {
    const w = partWeights(p)
    const got = p.parts.map((q) => rub[q.id] ?? null)
    const any = got.some((g) => g != null)
    const s = got.reduce<number>((t, g, i) => t + w[i] * (g ?? 0), 0)
    return { p, w, got, any, s }
  })
  const finish = () => {
    for (const { q, p, r } of part1) {
      logAttempt({ id: q.id, deck: q.decks[0], archetype: p.archetype, topic: q.topic, correct: r.perfect, score: r.norm, src: 'mock', kind: q.kind, mode: 'test', hints: 0, opts: r.per.map((x) => ({ mark: x.mark, ok: x.ok })) })
    }
    for (const { p, got } of essays) p.parts.forEach((q, i) => {
      const g = got[i]
      if (g != null) logAttempt({ id: q.id, deck: q.decks[0], archetype: p.archetype, topic: q.topic, correct: g === 4, score: g / 4, src: 'mock', kind: q.kind, mode: 'test', hints: 0 })
    })
    onFinish()
  }
  const total2 = essays.filter((e) => e.any).reduce((t, e) => t + e.s, 0)
  const nMarked = essays.filter((e) => e.any).length
  return (
    <div className="pr-page mk-mark">
      <h2>{done ? tr(lang, 'Hasil ujian simulasi', 'Mock exam results') : tr(lang, 'Nilai dirimu sendiri', 'Self-mark')}</h2>
      {!done && <p className="muted">{tr(lang, 'Salin tanda ○/✗ dari kertasmu (kosongkan yang kamu kosongkan), lalu beri nilai tiap bagian esai dengan rubrik resmi. Hanya yang kamu isi yang dicatat.', 'Copy your ○/✗ marks from the paper (leave blank what you left blank), then mark each essay part on the official rubric. Only what you fill in is recorded.')}</p>}
      {done && (
        <div className="pr-cols">
          <section className="pr-card"><h3>{tr(lang, 'Bagian I', 'Part I')}</h3>
            <p className="mk-big" style={{ color: accColor(Math.max(0, raw1) / Math.max(1, max1)) }}>{raw1} / {max1}</p>
            <p className="muted">{part1.reduce((n, x) => n + x.r.per.filter((p) => p.pts > 0).length, 0)} {tr(lang, 'tepat', 'right')} · {part1.reduce((n, x) => n + x.r.per.filter((p) => p.pts < 0).length, 0)} {tr(lang, 'keliru', 'wrong')} · {part1.reduce((n, x) => n + x.r.per.filter((p) => p.pts === 0).length, 0)} {tr(lang, 'kosong', 'blank')}</p></section>
          <section className="pr-card"><h3>{tr(lang, 'Bagian II (0–4 per soal)', 'Part II (0–4 per problem)')}</h3>
            {essays.map((e, i) => <Bar key={e.p.id} value={e.any ? e.s / 4 : 0} label={`${tr(lang, 'Soal', 'Q')} ${i + 1}`} right={e.any ? `${fmt04(e.s)} (${rubricLetter(e.s)})` : '–'} />)}
            {nMarked > 0 && <p className="muted pr-small">{tr(lang, 'Rata-rata', 'Average')}: {fmt04(total2 / nMarked)} / 4</p>}</section>
        </div>
      )}
      <section className="pr-card">
        <h3>{tr(lang, 'Bagian I', 'Part I')} <small className="muted">+1 / −1 / 0</small></h3>
        {part1.map(({ q, p: prob, r }, i) => (
          <div key={q.id} className="mk-entry">
            <div className="mk-entry-h"><b>{i + 1}.</b> <span className="mk-entry-t"><Md inline>{loc(q, il(prob)).stem}</Md></span>{done && <span className={'chip ' + (r.perfect ? 'ok' : r.raw > 0 ? 'warn' : 'err')}>{r.raw}/{r.max}</span>}
              {done && <button className="btn sm ghost" onClick={() => setOpen(open === q.id ? null : q.id)}>{open === q.id ? tr(lang, 'Tutup', 'Hide') : tr(lang, 'Kunci', 'Key')}</button>}</div>
            <div className="mk-entry-opts">
              {q.options.map((o, k) => {
                const m = get(q)[k], p = r.per[k]
                return (
                  <div key={k} className={'mk-entry-o' + (done ? (m === '-' ? ' blank' : p.ok ? ' right' : ' wrong') : '')}>
                    <span className="mk-entry-l">{String.fromCharCode(97 + k)}</span>
                    <span className="mk-entry-txt"><Md inline>{loc(q, il(prob)).options?.[k] ?? o}</Md></span>
                    <span className="mm-marks">{(['o', 'x', '-'] as Mark[]).map((x) => <button key={x} className={'mm-mk ' + x + (m === x ? ' on' : '')} disabled={done} aria-label={x === 'o' ? '○' : x === 'x' ? '✗' : '—'} onClick={() => setMark(q, k, x)}>{x === 'o' ? '○' : x === 'x' ? '✗' : '—'}</button>)}</span>
                    {done && <span className={'mm-pts ' + (p.pts > 0 ? 'ok' : p.pts < 0 ? 'err' : '')}>{p.pts > 0 ? '+1' : p.pts < 0 ? '−1' : '0'}</span>}
                  </div>
                )
              })}
            </div>
            {done && open === q.id && <div className="mk-entry-key">{q.options.map((_, k) => <div key={k}><b>{String.fromCharCode(97 + k)} {q.correct[k] ? '○' : '✗'}</b> {loc(q, il(prob)).why?.[k] && <Md inline>{loc(q, il(prob)).why![k]}</Md>}</div>)}</div>}
          </div>
        ))}
        {!part1.length && <p className="muted">–</p>}
      </section>
      {essays.map((e, i) => (
        <section key={e.p.id} className="pr-card">
          <h3>{tr(lang, 'Soal', 'Q')} {i + 1} · {ptitle(e.p, il(e.p))}</h3>
          {e.p.parts.map((q, j) => (
            <details key={q.id} className="mk-ess" open={!done && j === 0}>
              <summary>{q.label ? `(${q.label}) ` : ''}{Math.round(e.w[j] * 100)}% · <span className="muted">{rub[q.id] != null ? `${rub[q.id]} (${RUBRIC_INDEX[rub[q.id]!]})` : tr(lang, 'belum dinilai', 'not marked')}</span></summary>
              <div className="pq-stem"><Md>{loc(q, il(e.p)).stem}</Md></div>
              <div className="pq-model"><h4>{tr(lang, 'Kunci / jawaban model', 'Key / model answer')}</h4><AnswerKey q={q} lang={il(e.p)} /></div>
              <RubricPicker rows={'rubric' in q ? q.rubric : undefined} value={rub[q.id] ?? null} disabled={done} lang={il(e.p)} onChange={(s) => setRub((m) => ({ ...m, [q.id]: s }))} />
            </details>
          ))}
          {done && e.any && <p className="pq-total">{tr(lang, 'Nilai soal', 'Problem score')}: <b>{fmt04(e.s)}</b> / 4 <small className="muted">({rubricLetter(e.s)})</small></p>}
        </section>
      ))}
      <div className="mk-foot">
        {!done && <button className="btn primary pr-big" onClick={finish}>{tr(lang, 'Simpan & lihat hasil', 'Save & see results')}</button>}
        {done && <><button className="btn primary" onClick={() => go('progres')}>{tr(lang, 'Ke Progres', 'To Progress')}</button><button className="btn" onClick={onExit}>{tr(lang, 'Ujian baru', 'New exam')}</button></>}
      </div>
    </div>
  )
}
