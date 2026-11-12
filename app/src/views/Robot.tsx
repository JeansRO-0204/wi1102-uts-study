// Robot question view (UTS Soal 3: Robot Rody / Ladybug). Learner writes a command program; the simulator runs it for every
// n in q.nValues and compares the drawn route with EXPECTED[q.id].paths (or the reference solution, same simulator).
// Paper mode: bare textarea, one Submit, then the report. Lab mode: Run + live per-n results. Hints cap the credit.
import { useEffect, useMemo, useRef, useState } from 'react'
import { Feedback, Md, type Note } from '../lib/kit'
import { EXPECTED } from '../bank'
import { RUBRIC_INDEX, type RobotQ, type RubricRow, type RubricScore } from '../types'
import type { MisTag } from '../types'
import { hintCap, loc } from '../practice/Hints'
import CodeNotes from '../content/CodeNotes'
import RobotCanvas from '../robot/Canvas'
import Editor from '../code/Editor'
import { ROBOT_RUBRIC } from '../robot/generators'
import { dirWord, firstDivergence, runRobot, similarity, skeleton, type RobotRun } from '../robot/sim'
import type { QViewProps } from './contract'
import '../robot/robot.css'

const ARROW: Record<string, string> = { U: '↑', D: '↓', L: '←', R: '→' }
const RUBRIC_ORDER: RubricScore[] = [4, 3.5, 3, 2, 1, 0]

interface PerN {
  n: number
  want: string
  run: RobotRun
  ok: boolean
  div: number
}
interface Analysis {
  per: PerN[]
  parseError?: string
  parseLine?: number
  passCount: number
  allOk: boolean
  usesRepeat: boolean
  empty: boolean
  sim: number
  auto: RubricScore
  tag?: MisTag
  notes: Note[]
}

/** Run the learner's program for every n and diagnose it. Messages come in an (Indonesian, English) pair via tx(). */
function analyse(q: RobotQ, src: string, refs: Record<number, string>, refUsesRepeat: boolean, lang: 'id' | 'en'): Analysis {
  const tx = (id: string, en: string) => (lang === 'en' ? en : id)
  const P = q.param
  const per: PerN[] = q.nValues.map((n) => {
    const run = runRobot(q.dialect, src, P, n)
    const want = refs[n] ?? ''
    const div = run.error ? 0 : firstDivergence(run.path, want)
    return { n, want, run, ok: !run.error && div < 0, div }
  })
  const empty = !src.trim()
  const first = per[0]?.run
  const notes: Note[] = []
  const passCount = per.filter((p) => p.ok).length
  const allOk = passCount === per.length && per.length > 0
  const usesRepeat = per.some((p) => p.run.usesRepeat)
  const sim = per.length ? per.reduce((s, p) => s + (p.run.error ? 0 : similarity(p.run.path, p.want)), 0) / per.length : 0
  let tag: MisTag | undefined

  if (empty) {
    return { per, passCount: 0, allOk: false, usesRepeat: false, empty: true, sim: 0, auto: 0, notes: [{ level: 'warn', msg: tx('Belum ada jawaban.', 'No answer yet.') }] }
  }
  if (first?.error) {
    notes.push({ level: 'err', msg: first.error })
    const auto: RubricScore = 1 // something was written, but it cannot run
    return { per, parseError: first.error, parseLine: first.errorLine, passCount: 0, allOk: false, usesRepeat: false, empty: false, sim: 0, auto, notes }
  }
  // per-n runtime errors (e.g. repeat count too big for large n)
  for (const p of per) if (p.run.error) notes.push({ level: 'err', msg: `${P} = ${p.n}: ${p.run.error}` })

  const lines = src.replace(/\r/g, '').split('\n')
  const failing = per.filter((p) => !p.ok && !p.run.error)

  if (allOk) {
    if (!usesRepeat && refUsesRepeat && q.nValues.length > 1) {
      // cannot normally happen (a repeat-free program has the same route for every n), but keep the rubric rule
      notes.push({ level: 'warn', msg: tx('Hasil benar, tetapi tidak memakai `repeat`: perintah yang berulang ditulis berjajar (rubrik 3).', 'Correct result but no `repeat`: the repeated commands are written out one by one (rubric 3).') })
    } else if (!usesRepeat && refUsesRepeat) {
      notes.push({ level: 'warn', msg: tx('Hasil benar, tetapi tidak memakai `repeat`: perintah yang berulang ditulis berjajar. Rubrik resmi memberi 3 ("ditulis berjajar, namun hasil eksekusi benar").', 'Result is right but `repeat` is not used: repeated commands are written out one by one. The official rubric gives 3.') })
    } else {
      notes.push({ level: 'ok', msg: tx(`Rute tepat untuk semua ${P} (${per.map((p) => p.n).join(', ')}).`, `The route is exact for every ${P} (${per.map((p) => p.n).join(', ')}).`) })
    }
    const auto: RubricScore = usesRepeat || !refUsesRepeat ? 4 : 3
    return { per, passCount, allOk, usesRepeat, empty, sim: 1, auto, notes }
  }

  // --- diagnose the failing n values ---
  const okNs = per.filter((p) => p.ok).map((p) => p.n)
  const failNs = failing.map((p) => p.n)
  if (okNs.length && failNs.length && Math.max(...okNs) < Math.min(...failNs)) {
    notes.push({ level: 'err', msg: tx(`Benar untuk ${P} = ${okNs.join(', ')}, tetapi salah mulai ${P} = ${Math.min(...failNs)}: **jumlah ulang salah** (mis. ${P}−1 padahal seharusnya ${P}?) atau ada bagian yang tidak ikut bergantung pada ${P}.`, `Right for ${P} = ${okNs.join(', ')} but wrong from ${P} = ${Math.min(...failNs)}: **the repeat count is off** (e.g. ${P}−1 instead of ${P}?) or a part does not depend on ${P}.`) })
    tag = 'repeat-count'
  }
  const gots = per.map((p) => p.run.path)
  if (per.length > 1 && gots.every((g) => g === gots[0]) && failing.length) {
    notes.push({ level: 'err', msg: tx(`Rutemu **sama untuk semua ${P}**: belum ada \`repeat\` yang jumlah ulangnya bergantung pada ${P}.`, `Your route is **the same for every ${P}**: no \`repeat\` count depends on ${P} yet.`) })
    tag = 'repeat-count'
  }
  for (const p of failing) {
    const got = p.run.path
    const asN = per.find((o) => o.n !== p.n && o.want === got)
    const head = `${P} = ${p.n}: `
    if (asN) {
      const diff = asN.n - p.n
      const hint = diff === -1 ? tx('jumlah ulangmu kurang satu (memakai n−1 padahal seharusnya n?)', 'your repeat count is one short (n−1 instead of n?)')
        : diff === 1 ? tx('jumlah ulangmu lebih satu (n+1?)', 'your repeat count is one too many (n+1?)')
        : tx(`jumlah ulangmu seperti untuk ${P} = ${asN.n}`, `your repeat count behaves like ${P} = ${asN.n}`)
      notes.push({ level: 'err', msg: head + tx(`hasil programmu sama dengan target ${P} = ${asN.n}: ${hint}.`, `your result equals the target for ${P} = ${asN.n}: ${hint}.`) })
      tag = 'repeat-count'
      continue
    }
    const d = p.div
    const seg = p.run.segments[d]
    const srcLine = seg ? lines[seg.line - 1]?.trim() : undefined
    if (d >= got.length) {
      notes.push({ level: 'err', msg: head + tx(`rutemu berhenti terlalu awal: kurang ${p.want.length - got.length} langkah (langkah ke-${d + 1} seharusnya ${ARROW[p.want[d]] ?? ''} ${dirWord(p.want[d])}). Ada bagian yang belum ditulis?`, `your route stops too early: ${p.want.length - got.length} steps missing (step ${d + 1} should be ${ARROW[p.want[d]] ?? ''}). Is a part missing?`) })
    } else if (d >= p.want.length) {
      notes.push({ level: 'err', msg: head + tx(`rute target sudah selesai setelah ${p.want.length} langkah, tetapi robotmu masih bergerak ${got.length - p.want.length} langkah lagi.`, `the target route is finished after ${p.want.length} steps but your robot keeps moving for ${got.length - p.want.length} more.`) })
    } else {
      notes.push({ level: 'err', msg: head + tx(`langkah ke-${d + 1} robotmu bergerak ${ARROW[got[d]]} ${dirWord(got[d])}, seharusnya ${ARROW[p.want[d]]} ${dirWord(p.want[d])}${srcLine ? ` (dari baris ${seg.line}: \`${srcLine}\`)` : ''}.`, `step ${d + 1} your robot moves ${ARROW[got[d]]}, it should be ${ARROW[p.want[d]]}${srcLine ? ` (from line ${seg.line}: \`${srcLine}\`)` : ''}.`) })
    }
  }
  // rubric (official 0–4 wording): proportion of n that work + similarity of the rest
  let auto: RubricScore
  const frac = passCount / per.length
  if (frac >= 0.66) auto = 3
  else if (passCount > 0 || sim >= 0.5) auto = 2
  else if (sim >= 0.2) auto = 1
  else auto = 1
  if (passCount === 0 && sim < 0.12) auto = 1
  return { per, passCount, allOk, usesRepeat, empty, sim, auto, tag, notes }
}

const T = {
  id: {
    target: 'Bentuk target', hideT: 'Sembunyikan', showT: 'Tampilkan', commands: 'Daftar perintah', yours: 'Jawabanmu',
    ph: 'Tulis perintahmu di sini, seperti di kertas ujian…', tipRody: 'Boleh ditulis seperti di kertas: `repeat n` lalu isinya menjorok, atau `repeat n ( walk down )`. Besar/kecil huruf bebas.',
    tipLady: 'Boleh ditulis seperti di kertas: `Repeat N-1 ( Forward 1 Right )`, `(F R F L)x2`, koma, huruf besar/kecil bebas. `Forward` tanpa angka = 1.',
    run: 'Jalankan', submit: 'Kumpulkan jawaban', paperNote: 'Mode kertas: tidak ada Run. Tulis, lalu kumpulkan sekali.', empty: 'Tulis jawaban dulu.',
    results: 'Hasil untuk setiap nilai', hints: 'Petunjuk', hintBtn: 'Petunjuk', hide: 'Sembunyikan', cap: 'nilai maks',
    r1: 'Gambar jalurnya untuk n = 1, 2, 3', r2: 'Bagian yang berulang', r3: 'Kerangka', r4: 'Jawaban lengkap',
    r1t: 'Gambar di kertas dulu. Lihat apa yang **bertambah** tiap n naik 1 (disorot):', r2t: 'Setiap warna/nuansa = satu putaran `repeat` pada program acuan (abu-abu = di luar repeat). Tuliskan perintah untuk **satu putaran**, lalu pikirkan berapa kali diulang.',
    r3t: 'Isi tempat ___ dengan perintah dan sesuaikan jumlah ulang yang bergantung pada n:', r4t: 'Program acuan (ada alternatif lain yang juga benar):',
    report: 'Laporan', rubric: 'Nilai rubrik (resmi, 0–4)', rubricNote: 'Terpilih otomatis dari hasil simulasi. Ubah jika menurutmu tidak sesuai.', save: 'Simpan nilai', saved: 'Tersimpan',
    ref: 'Program acuan', samples: 'Contoh jawaban bernilai', final: 'Nilai akhir', afterCap: 'setelah batas petunjuk', ok: 'benar', bad: 'salah', err: 'galat', mark: 'nilai',
    expl: 'Penjelasan',
  },
  en: {
    target: 'Target shapes', hideT: 'Hide', showT: 'Show', commands: 'Command list', yours: 'Your answer',
    ph: 'Write your commands here, as on the exam paper…', tipRody: 'Write it as on paper: `repeat n` with an indented block, or `repeat n ( walk down )`. Case does not matter.',
    tipLady: 'Write it as on paper: `Repeat N-1 ( Forward 1 Right )`, `(F R F L)x2`, commas, any case. `Forward` with no number = 1.',
    run: 'Run', submit: 'Submit answer', paperNote: 'Paper mode: no Run. Write, then submit once.', empty: 'Write an answer first.',
    results: 'Result for each value', hints: 'Hints', hintBtn: 'Hint', hide: 'Hide', cap: 'max credit',
    r1: 'Draw the route for n = 1, 2, 3', r2: 'The repeating part', r3: 'Skeleton', r4: 'Full answer',
    r1t: 'Draw it on paper first. See what **grows** when n goes up by 1 (highlighted):', r2t: 'Each colour/shade = one round of `repeat` in the reference program (grey = outside any repeat). Write the commands for **one round**, then decide how often it repeats.',
    r3t: 'Fill each ___ with a command and set the repeat counts that depend on n:', r4t: 'Reference program (other answers can be right too):',
    report: 'Report', rubric: 'Rubric mark (official, 0–4)', rubricNote: 'Pre-selected from the simulation. Change it if you disagree.', save: 'Save mark', saved: 'Saved',
    ref: 'Reference program', samples: 'Graded sample answers', final: 'Final score', afterCap: 'after the hint cap', ok: 'right', bad: 'wrong', err: 'error', mark: 'mark',
    expl: 'Explanation',
  },
} as const

function growth(a: string, b: string): [string, string, string] {
  // common prefix and suffix of consecutive routes; the middle of `b` is what grew
  let p = 0
  while (p < a.length && p < b.length && a[p] === b[p]) p++
  let s = 0
  while (s < a.length - p && s < b.length - p && a[a.length - 1 - s] === b[b.length - 1 - s]) s++
  return [b.slice(0, p), b.slice(p, b.length - s), b.slice(b.length - s)]
}

const arrows = (p: string) => p.split('').map((c) => ARROW[c] ?? c).join(' ')

export default function RobotView({ q, mode, lang, onDone, review, compact }: QViewProps<RobotQ>) {
  const t = T[lang]
  const L = loc(q, lang)
  const reviewAns = (review?.answer as { src?: string } | undefined)?.src
  const [src, setSrc] = useState(reviewAns ?? '')
  const [rungs, setRungs] = useState(review?.hints ?? 0)
  const [open, setOpen] = useState(true)
  const [submitted, setSubmitted] = useState(!!review)
  const [ran, setRan] = useState<string | null>(null)
  const [showTarget, setShowTarget] = useState(true)
  const [mark, setMark] = useState<RubricScore | null>(review?.rubricScore ?? null)
  const [saved, setSaved] = useState(!!review)
  const lab = mode === 'learn'

  // reset when the question changes
  useEffect(() => {
    setSrc(reviewAns ?? ''); setRungs(review?.hints ?? 0); setSubmitted(!!review); setRan(null); setMark(review?.rubricScore ?? null); setSaved(!!review); setOpen(true)
  }, [q.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // reference routes: baked (EXPECTED) with the same simulator as fallback (generated variants)
  const { refs, refRun, refUsesRepeat, refErr } = useMemo(() => {
    const refs: Record<number, string> = {}
    let err: string | undefined
    for (const n of q.nValues) {
      const baked = EXPECTED[q.id]?.paths?.[String(n)]
      if (baked !== undefined) { refs[n] = baked; continue }
      const r = runRobot(q.dialect, q.solution, q.param, n)
      if (r.error) err = r.error
      refs[n] = r.path
    }
    const unitN = q.nValues[Math.min(2, q.nValues.length - 1)] ?? 1
    const refRun = runRobot(q.dialect, q.solution, q.param, unitN)
    return { refs, refRun, refUsesRepeat: refRun.usesRepeat, refErr: err }
  }, [q])
  const unitN = q.nValues[Math.min(2, q.nValues.length - 1)] ?? 1

  const subject = submitted ? src : lab ? ran : null
  const an = useMemo(() => (subject !== null ? analyse(q, subject, refs, refUsesRepeat, lang) : null), [q, subject, refs, refUsesRepeat, lang])
  const live = useMemo(() => (lab && src.trim() ? runRobot(q.dialect, src, q.param, q.nValues[0] ?? 1) : null), [lab, src, q])

  const rubric: RubricRow[] = (q.rubric?.length ? q.rubric : ROBOT_RUBRIC).slice().sort((a, b) => RUBRIC_ORDER.indexOf(a.score) - RUBRIC_ORDER.indexOf(b.score))
  const cap = hintCap(rungs)
  const readOnly = submitted || !!review
  const rungCount = 4

  const doRun = () => { if (src.trim()) setRan(src) }
  const doSubmit = () => {
    if (!src.trim() || readOnly) return
    setSubmitted(true)
    setRan(src)
    const a = analyse(q, src, refs, refUsesRepeat, lang)
    setMark(a.auto)
  }
  const finish = () => {
    if (!an || mark === null || saved) return
    setSaved(true)
    const score = (mark / 4) * hintCap(rungs)
    const bad = an.per.filter((p) => !p.ok).length
    const idx = RUBRIC_INDEX[mark]
    onDone({
      correct: mark === 4,
      score,
      rubricScore: mark,
      hints: rungs,
      tags: an.tag && mark < 4 ? [an.tag] : undefined,
      summary: an.empty ? 'Not answered' : `Rubric ${mark} (${idx}): ${an.per.length - bad}/${an.per.length} values of ${q.param} right${an.tag ? ', wrong repeat count' : ''}`,
      answer: { src },
    })
  }
  const rody = q.dialect === 'rody'
  const ladyShown = q.dialect !== 'rody'
  const growthRows = q.nValues.slice(0, 3).map((n, i, arr) => {
    const w = refs[n] ?? ''
    if (i === 0) return { n, parts: ['', w, ''] as [string, string, string] }
    return { n, parts: growth(refs[arr[i - 1]] ?? '', w) }
  })

  return (
    <div className={'robot-view' + (compact ? ' compact' : '')}>

      <details className="robot-box robot-cmds">
        <summary>{t.commands}</summary>
        <table><tbody>
          {rody ? (
            <>
              <tr><td>up</td><td>{lang === 'en' ? 'move up 1 step' : 'bergerak ke atas 1 langkah'}</td></tr>
              <tr><td>down</td><td>{lang === 'en' ? 'move down 1 step' : 'bergerak ke bawah 1 langkah'}</td></tr>
              <tr><td>walk</td><td>{lang === 'en' ? 'walk forward (right) 1 step' : 'berjalan ke depan (kanan) 1 langkah'}</td></tr>
              <tr><td>repeat n</td><td>{lang === 'en' ? 'repeat the indented commands n times (n = 0: not run at all)' : 'ulangi perintah yang menjorok di bawahnya n kali (n = 0: tidak dijalankan sama sekali)'}</td></tr>
            </>
          ) : (
            <>
              <tr><td>Forward N</td><td>{lang === 'en' ? 'move N units forward in the facing direction' : 'maju N satuan ke arah hadap'}</td></tr>
              <tr><td>Left</td><td>{lang === 'en' ? 'turn 90° left in place' : 'belok kiri 90° di tempat'}</td></tr>
              <tr><td>Right</td><td>{lang === 'en' ? 'turn 90° right in place' : 'belok kanan 90° di tempat'}</td></tr>
              <tr><td>Repeat N ( … )</td><td>{lang === 'en' ? 'repeat the commands in the brackets N times (N < 1: not run)' : 'ulangi perintah dalam kurung N kali (N < 1: tidak dijalankan)'}</td></tr>
            </>
          )}
        </tbody></table>
        {ladyShown && !rody && <p className="robot-tip">{lang === 'en' ? 'Ladybug starts facing up.' : 'Ladybug mula-mula menghadap ke atas.'}</p>}
      </details>

      <section className="robot-box">
        <h4>{t.target}<button className="btn sm ghost" onClick={() => setShowTarget((v) => !v)}>{showTarget ? t.hideT : t.showT}</button></h4>
        {showTarget && (
          <div className="robot-tiles">
            {q.nValues.map((n) => <div className="robot-tile" key={n}><RobotCanvas target={refs[n]} animate={false} small label={`${q.param} = ${n}`} /></div>)}
          </div>
        )}
        {refErr && <p className="robot-tip" style={{ color: 'var(--err)' }}>Problem with the reference program: {refErr}</p>}
      </section>

      <section className="robot-box">
        <h4>{t.yours}</h4>
        <Editor
          value={src} onChange={setSrc} mode={mode} readOnly={readOnly} language="plain" ariaLabel={t.yours} placeholder={readOnly ? undefined : t.ph}
          minLines={7} maxLines={30} onRun={lab ? doRun : undefined} onSubmit={doSubmit}
        />
        {!readOnly && <p className="robot-tip"><Md inline>{rody ? t.tipRody : t.tipLady}</Md></p>}
        {!readOnly && !lab && <p className="robot-tip">{t.paperNote}</p>}
        {lab && !readOnly && live?.error && <div className="robot-err"><Feedback notes={[{ level: 'warn', msg: live.error }]} /></div>}
        {!readOnly && (
          <div className="robot-actions">
            {lab && <button className="btn" onClick={doRun} disabled={!src.trim()}>▶ {t.run}</button>}
            <span className="robot-spacer" />
            <button className="btn primary" onClick={doSubmit} disabled={!src.trim()} title={!src.trim() ? t.empty : undefined}>{t.submit}</button>
          </div>
        )}
      </section>

      {!readOnly && (
        <section className="robot-box robot-ladder">
          <h4>{t.hints}</h4>
          <div className="robot-bar">
            {rungs < rungCount && (
              <button className="btn sm" onClick={() => { setRungs((r) => r + 1); setOpen(true) }}>
                💡 {t.hintBtn} {rungs + 1}/{rungCount}: {[t.r1, t.r2, t.r3, t.r4][rungs]}
              </button>
            )}
            {rungs > 0 && <button className="btn sm ghost" onClick={() => setOpen((o) => !o)}>{open ? t.hide : `${t.hintBtn} (${rungs})`}</button>}
            {rungs > 0 && <span className="robot-cap">{t.cap}: {Math.round(cap * 100)}%</span>}
            <span className="robot-pips" aria-hidden>{Array.from({ length: rungCount }, (_, i) => <i key={i} className={i < rungs ? 'on' : ''} />)}</span>
          </div>
        </section>
      )}
      {(!readOnly || rungs > 0) && open && rungs > 0 && (
        <div className="robot-ladder">
          {rungs >= 1 && (
            <div className="robot-rung">
              <b>{t.hintBtn} 1 · {t.r1}</b>
              <Md>{(L.hints[0] ?? '') + (L.hints[0] ? '\n\n' : '') + t.r1t}</Md>
              <div className="robot-moves">
                {growthRows.map((g) => (
                  <div className="row" key={g.n}><b>{q.param} = {g.n}</b><span>{arrows(g.parts[0])}{g.parts[0] && ' '}<mark>{arrows(g.parts[1])}</mark>{g.parts[2] && ' '}{arrows(g.parts[2])}</span></div>
                ))}
              </div>
            </div>
          )}
          {rungs >= 2 && (
            <div className="robot-rung">
              <b>{t.hintBtn} 2 · {t.r2}</b>
              <Md>{t.r2t}</Md>
              <div className="robot-tiles"><div className="robot-tile"><RobotCanvas target={refs[unitN]} unit={refRun.segments} small label={`${q.param} = ${unitN}`} /></div></div>
            </div>
          )}
          {rungs >= 3 && (
            <div className="robot-rung">
              <b>{t.hintBtn} 3 · {t.r3}</b>
              <Md>{t.r3t}</Md>
              <pre className="robot-skel">{skeleton(q.solution)}</pre>
            </div>
          )}
          {rungs >= 4 && (
            <div className="robot-rung">
              <b>{t.hintBtn} 4 · {t.r4}</b>
              <Md>{t.r4t}</Md>
              <CodeNotes code={q.solution} lang={lang} />
              {L.work.length > 0 && <ol>{L.work.map((w, i) => <li key={i}><Md inline>{w}</Md></li>)}</ol>}
            </div>
          )}
        </div>
      )}

      {an && !an.empty && (
        <section className="robot-box">
          <h4>{submitted ? t.report : t.results}</h4>
          <div className="robot-tiles big">
            {an.per.map((p) => (
              <div className={'robot-tile ' + (p.ok ? 'ok' : 'bad')} key={p.n}>
                <div className="robot-tile-head">
                  <span>{q.param} = {p.n}</span>
                  <span className={'chip ' + (p.ok ? 'ok' : 'err')}>{p.ok ? '✓ ' + t.ok : p.run.error ? '! ' + t.err : '✗ ' + t.bad}</span>
                </div>
                <RobotCanvas target={p.want} got={p.run.error ? '' : p.run.path} small />
                {!p.ok && !p.run.error && p.div >= 0 && <div className="robot-tile-note">{lang === 'en' ? `First difference at step ${p.div + 1}.` : `Beda pertama di langkah ke-${p.div + 1}.`}</div>}
              </div>
            ))}
          </div>
          <Feedback notes={an.notes} />
        </section>
      )}

      {submitted && an && (
        <>
          <section className="robot-box">
            <h4>{t.rubric}</h4>
            <p className="robot-tip">{t.rubricNote}</p>
            <div className="robot-rubric" role="radiogroup" aria-label={t.rubric}>
              {rubric.map((r) => (
                <label key={r.score} className={(mark === r.score ? 'on ' : '') + (an.auto === r.score ? 'auto' : '')}>
                  <input type="radio" name={'rb-' + q.id} checked={mark === r.score} disabled={saved} onChange={() => setMark(r.score)} />
                  <span><span className="sc">{r.score}</span> <span className="ix">{RUBRIC_INDEX[r.score]}</span></span>
                  <span>{(lang === 'en' && r.descEn) || r.desc}</span>
                </label>
              ))}
            </div>
            {mark !== null && (
              <div className="robot-scoreline" style={{ marginTop: 10 }}>
                <span>{t.final}:</span><b>{Math.round((mark / 4) * cap * 100)}%</b>
                {rungs > 0 && <span className="robot-cap">({t.mark} {mark}/4 × {Math.round(cap * 100)}% {t.afterCap})</span>}
              </div>
            )}
            {!review && <div className="robot-actions"><span className="robot-spacer" /><button className="btn primary" disabled={saved || mark === null} onClick={finish}>{saved ? '✓ ' + t.saved : t.save}</button></div>}
          </section>

          <section className="robot-box">
            <h4>{t.ref}</h4>
            <CodeNotes code={q.solution} lang={lang} />
            <Md>{L.explanation}</Md>
          </section>

          {q.samples && q.samples.length > 0 && (
            <section className="robot-box">
              <h4>{t.samples}</h4>
              {q.samples.map((s, i) => (
                <div className="robot-sample" key={i}>
                  <pre>{s.answer}</pre>
                  <div><b>{t.mark} {s.score}</b> · <Md inline>{(lang === 'en' && s.noteEn) || s.note}</Md></div>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  )
}
