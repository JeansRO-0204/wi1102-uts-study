// Part I, exactly as on the paper: per option ○ (true) / ✗ (false) / blank. +1 per correct mark, −1 per wrong mark, 0 blank.
import { useMemo, useState } from 'react'
import { Md } from '../lib/kit'
import type { MCQMulti } from '../types'
import { HintLadder, hintCap, loc } from '../practice/Hints'
import { scoreMulti, type Mark } from '../practice/answerCheck'
import { Explanation } from '../practice/viewKit'
import { tr } from '../practice/ui'
import type { QViewProps } from './contract'

const NEXT: Record<Mark, Mark> = { '-': 'o', o: 'x', x: '-' }

export default function McqMultiView({ q, lang, onDone, review }: QViewProps<MCQMulti>) {
  const L = loc(q, lang)
  const init = Array.isArray(review?.answer) ? (review!.answer as Mark[]) : q.options.map(() => '-' as Mark)
  const [marks, setMarks] = useState<Mark[]>(init)
  const [done, setDone] = useState(!!review)
  const [hints, setHints] = useState(review?.hints ?? 0)
  const res = useMemo(() => scoreMulti(q, marks), [q, marks])
  const cap = hintCap(hints)
  const set = (i: number, m: Mark) => { if (!done) setMarks((a) => a.map((x, j) => (j === i ? m : x))) }
  const submit = () => {
    if (done) return
    setDone(true)
    onDone({
      correct: res.perfect && hints === 0, score: res.norm * cap, hints,
      opts: res.per.map((p) => ({ mark: p.mark, ok: p.ok })), answer: marks,
      summary: `${res.raw}/${res.max} (+1/−1/0)`,
    })
  }
  const marked = marks.filter((m) => m !== '-').length
  const labels = { o: tr(lang, 'Benar (○)', 'True (○)'), x: tr(lang, 'Salah (✗)', 'False (✗)'), '-': tr(lang, 'Kosongkan', 'Leave blank') }
  return (
    <div className="mm">
      <p className="pq-note">{tr(lang, 'Lingkari ○ setiap pilihan yang benar, silang ✗ yang salah, kosongkan jika ragu.', 'Circle ○ each correct option, cross ✗ each wrong one, leave blank if unsure.')}</p>
      <ol className="mm-list">
        {q.options.map((o, i) => {
          const m = marks[i]
          const p = res.per[i]
          const cls = 'mm-row' + (done ? (m === '-' ? ' blank' : p.ok ? ' right' : ' wrong') : '')
          return (
            <li key={i} className={cls}>
              <div className="mm-main">
                <span className="mm-n">{String.fromCharCode(97 + i)}</span>
                <div className="mm-text" onClick={() => set(i, NEXT[m])}><Md inline>{L.options?.[i] ?? o}</Md></div>
                <div className="mm-marks" role="radiogroup" aria-label={`${tr(lang, 'Pilihan', 'Option')} ${String.fromCharCode(97 + i)}`}>
                  {(['o', 'x', '-'] as Mark[]).map((k) => (
                    <button key={k} role="radio" aria-checked={m === k} aria-label={labels[k]} title={labels[k]} disabled={done}
                      className={'mm-mk ' + k + (m === k ? ' on' : '')} onClick={() => set(i, k)}>{k === 'o' ? '○' : k === 'x' ? '✗' : '—'}</button>
                  ))}
                </div>
              </div>
              {done && (
                <div className="mm-why">
                  <span className={'mm-pts ' + (p.pts > 0 ? 'ok' : p.pts < 0 ? 'err' : '')}>{p.pts > 0 ? '+1' : p.pts < 0 ? '−1' : '0'}</span>
                  <div>
                    <b>{tr(lang, 'Kunci', 'Key')}: {q.correct[i] ? tr(lang, '○ benar', '○ true') : tr(lang, '✗ salah', '✗ false')}</b>
                    {m === '-' && <span className="muted"> · {tr(lang, 'kamu mengosongkan', 'you left it blank')}</span>}
                    {L.why?.[i] && <Md>{L.why[i]}</Md>}
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ol>
      {!done && (
        <>
          <div className="mm-bar">
            <button className="btn primary" onClick={submit}>{tr(lang, 'Kumpulkan', 'Submit')}</button>
            <span className="muted">{marked}/{q.options.length} {tr(lang, 'ditandai', 'marked')}</span>
          </div>
          <HintLadder hints={L.hints} work={[]} lang={lang} resetKey={q.id} refs={q.refs} onUse={setHints} />
        </>
      )}
      <details className="mm-tip" open={done}>
        <summary>{tr(lang, 'Kalau ragu, kosongkan', 'When unsure, leave it blank')}</summary>
        <p>{tr(lang,
          'Tiap pilihan: +1 bila tandamu tepat, −1 bila keliru, 0 bila kosong. Jika peluangmu benar adalah p, nilai harapan menandai = p·(+1) + (1−p)·(−1) = **2p − 1**. Jadi menandai hanya untung jika p > 50 %: tebakan murni (p = 50 %) impas, dan bila hanya 25 % yakin kamu rugi rata-rata 0,5 poin per pilihan.',
          'Per option: +1 for a correct mark, −1 for a wrong one, 0 if blank. If your chance of being right is p, the expected value of marking is p·(+1) + (1−p)·(−1) = **2p − 1**. Marking only pays when p > 50 %: a pure guess (50 %) breaks even, and at 25 % sure you lose 0.5 points per option on average.')
          .split('**').map((s, i) => (i % 2 ? <b key={i}>{s}</b> : s))}</p>
      </details>
      {done && (
        <div className="mm-sum">
          <div className={'wb-verdict ' + (res.perfect ? 'ok' : res.raw > 0 ? 'warn' : 'err')}>
            <b>{tr(lang, 'Nilai', 'Score')}: {res.raw} / {res.max}</b>
            <span> · {res.per.filter((p) => p.pts > 0).length} {tr(lang, 'tepat', 'right')}, {res.per.filter((p) => p.pts < 0).length} {tr(lang, 'keliru', 'wrong')}, {res.per.filter((p) => p.pts === 0).length} {tr(lang, 'kosong', 'blank')}</span>
            {hints > 0 && <span> · {tr(lang, 'maks', 'max')} {Math.round(cap * 100)}% {tr(lang, 'karena', 'because of')} {hints} {tr(lang, 'petunjuk', 'hint(s)')}</span>}
          </div>
          <Explanation lang={lang}>{L.explanation}</Explanation>
        </div>
      )}
    </div>
  )
}
