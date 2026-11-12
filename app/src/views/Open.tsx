// Essay / explanation item: write (or "I am writing on paper"), reveal the model answer, tick the key points,
// self-mark on the official 0–4 rubric (A/AB/B/C/D/E), compare with graded samples.
import { useMemo, useState } from 'react'
import { Md } from '../lib/kit'
import type { OpenQ, RubricScore } from '../types'
import { HintLadder, hintCap, loc } from '../practice/Hints'
import { DEFAULT_RUBRIC, Explanation, RubricPicker, SamplesList } from '../practice/viewKit'
import { RUBRIC_INDEX } from '../types'
import { tr } from '../practice/ui'
import type { QViewProps } from './contract'

interface Saved { text: string; paper: boolean; ticks: number[]; self: RubricScore | null; revealed: boolean }

export default function OpenView({ q, problem, lang, onDone, review }: QViewProps<OpenQ>) {
  const L = loc(q, lang)
  const saved = review?.answer as Saved | undefined
  const [text, setText] = useState(saved?.text ?? '')
  const [paper, setPaper] = useState(saved?.paper ?? false)
  const [revealed, setRevealed] = useState(saved?.revealed ?? !!review)
  const [ticks, setTicks] = useState<number[]>(saved?.ticks ?? [])
  const [self, setSelf] = useState<RubricScore | null>(saved?.self ?? null)
  const [done, setDone] = useState(!!review)
  const [hints, setHints] = useState(review?.hints ?? 0)
  const rows = q.rubric?.length ? q.rubric : DEFAULT_RUBRIC
  const kp = L.keyPoints
  const answerMd = L.answer ?? q.answer
  const suggested = useMemo<RubricScore | null>(() => {
    if (!q.keyPoints?.length) return null
    const f = ticks.length / q.keyPoints.length
    const want = f >= 1 ? 4 : f >= 0.8 ? 3.5 : f >= 0.6 ? 3 : f >= 0.3 ? 2 : f > 0 ? 1 : 0
    return rows.map((r) => r.score).reduce((b, s) => (Math.abs(s - want) < Math.abs(b - want) ? s : b)) as RubricScore
  }, [ticks, q.keyPoints, rows])
  const chosen = self ?? suggested
  const save = () => {
    if (done || chosen == null) return
    setDone(true)
    const a: Saved = { text, paper, ticks, self: chosen, revealed: true }
    onDone({ correct: chosen === 4, score: (chosen / 4) * hintCap(hints), rubricScore: chosen, hints, answer: a, summary: `mark ${chosen} (${RUBRIC_INDEX[chosen]})` })
  }
  const w = problem.parts.length > 1 && q.weight != null ? ` · ${tr(lang, 'bobot', 'weight')} ${Math.round(q.weight * 100)}%` : ''
  return (
    <div className="open">
      {!revealed && (
        <>
          <div className="open-switch">
            <label className="pr-check"><input type="checkbox" checked={paper} onChange={(e) => setPaper(e.target.checked)} /> {tr(lang, 'Saya menulis di kertas', 'I am writing on paper')}</label>
          </div>
          {!paper
            ? <textarea className="pq-open" rows={7} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false}
                placeholder={tr(lang, 'Tulis jawabanmu di sini, seperti di lembar ujian…', 'Write your answer here, as on the exam sheet…')} />
            : <div className="open-paper">{tr(lang, 'Tulis jawabanmu di kertas dulu, lalu tekan tombol di bawah untuk membandingkan.', 'Write your answer on paper first, then press the button below to compare.')}</div>}
          <HintLadder hints={L.hints} work={[]} lang={lang} resetKey={q.id} refs={q.refs} onUse={setHints} />
          <div className="pq-actions">
            <button className="btn primary" onClick={() => setRevealed(true)}>{tr(lang, 'Lihat jawaban model & nilai diri', 'Show model answer & self-mark')}</button>
            <span className="muted pq-hint">{tr(lang, 'Setelah ini kamu menilai dirimu sendiri dengan rubrik resmi.', 'Next you mark yourself with the official rubric.')}</span>
          </div>
        </>
      )}
      {revealed && (
        <>
          {!paper && text.trim() && <div className="open-mine"><h4>{tr(lang, 'Jawabanmu', 'Your answer')}</h4><pre>{text}</pre></div>}
          <div className="pq-model"><h4>{tr(lang, 'Jawaban model / contoh', 'Model answer / example')}</h4><Md>{answerMd}</Md></div>
          {kp && kp.length > 0 && (
            <fieldset className="open-kp" disabled={done}>
              <legend>{tr(lang, 'Apakah jawabanmu memuat poin-poin ini?', 'Does your answer contain these points?')}</legend>
              {kp.map((k, i) => (
                <label key={i} className={'open-kp-i' + (ticks.includes(i) ? ' on' : '')}>
                  <input type="checkbox" checked={ticks.includes(i)} onChange={() => setTicks((t) => (t.includes(i) ? t.filter((x) => x !== i) : [...t, i]))} />
                  <Md inline>{k}</Md>
                </label>
              ))}
              <small className="muted">{ticks.length}/{kp.length}</small>
            </fieldset>
          )}
          <RubricPicker rows={rows} value={chosen} onChange={setSelf} disabled={done} lang={lang} suggested={suggested} />
          <SamplesList samples={q.samples} lang={lang} />
          {!done && (
            <div className="pq-actions">
              <button className="btn primary" disabled={chosen == null} onClick={save}>{tr(lang, 'Simpan nilai', 'Save mark')}{chosen != null ? ` (${chosen} · ${RUBRIC_INDEX[chosen]})` : ''}</button>
              {suggested != null && self == null && <span className="muted pq-hint">{tr(lang, 'Baris rubrik sudah dipilih dari poin yang kamu centang; ubah jika perlu.', 'Rubric row pre-selected from your ticks; change it if needed.')}</span>}
            </div>
          )}
          {done && (
            <div className="pq-res">
              <div className={'wb-verdict ' + (chosen === 4 ? 'ok' : (chosen ?? 0) >= 2 ? 'warn' : 'err')}>
                <b>{tr(lang, 'Nilaimu', 'Your mark')}: {chosen} / 4 ({RUBRIC_INDEX[chosen as RubricScore]}){w}</b>
                {hints > 0 && <span> · {tr(lang, 'maks', 'max')} {Math.round(hintCap(hints) * 100)}% {tr(lang, 'karena petunjuk', 'because of hints')}</span>}
              </div>
              <Explanation lang={lang}>{L.explanation}</Explanation>
            </div>
          )}
        </>
      )}
    </div>
  )
}
