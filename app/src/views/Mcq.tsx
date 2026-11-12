// Classic single-/multi-answer MCQ (mock-ups, older papers). Select, Submit, per-option verdict with the reason.
import { useState } from 'react'
import { Md } from '../lib/kit'
import type { MCQ } from '../types'
import { HintLadder, hintCap, loc } from '../practice/Hints'
import { Explanation } from '../practice/viewKit'
import { IconCheckFill, IconXFill } from '../lib/icons'
import { tr } from '../practice/ui'
import type { QViewProps } from './contract'

const same = (a: number[], b: number[]) => a.length === b.length && a.every((x) => b.includes(x))

export default function McqView({ q, lang, onDone, review }: QViewProps<MCQ>) {
  const L = loc(q, lang)
  const multi = q.answer.length > 1
  const [sel, setSel] = useState<number[]>(Array.isArray(review?.answer) ? (review!.answer as number[]) : [])
  const [done, setDone] = useState(!!review)
  const [hints, setHints] = useState(review?.hints ?? 0)
  const ok = same(sel, q.answer)
  const toggle = (i: number) => { if (!done) setSel((s) => (multi ? (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]) : [i])) }
  const submit = () => {
    if (done || !sel.length) return
    setDone(true)
    // partial credit for multi-answer: right picks minus wrong picks, floor 0
    const part = multi ? Math.max(0, sel.filter((i) => q.answer.includes(i)).length - sel.filter((i) => !q.answer.includes(i)).length) / q.answer.length : ok ? 1 : 0
    onDone({ correct: ok && hints === 0, score: (ok ? 1 : part) * hintCap(hints), hints, answer: sel, summary: ok ? 'correct' : 'wrong' })
  }
  return (
    <div className="mcq" onKeyDown={(e) => { if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'BUTTON') { e.preventDefault(); submit() } }}>
      {multi && <p className="pq-note">{tr(lang, 'Pilih semua yang benar.', 'Select all that apply.')}</p>}
      <div className="pq-opts" role={multi ? 'group' : 'radiogroup'}>
        {q.options.map((o, i) => {
          const picked = sel.includes(i), right = q.answer.includes(i)
          const cls = 'pq-opt' + (picked ? ' sel' : '') + (done ? (right ? ' right' : picked ? ' wrong' : '') : '') + (done ? ' locked' : '')
          return (
            <div key={i}>
              <button className={cls} onClick={() => toggle(i)} aria-pressed={picked} style={{ width: '100%' }}>
                <span className="pq-key">{multi ? (picked ? '☑' : '☐') : String.fromCharCode(65 + i)}</span>
                <span className="pq-opt-body"><Md inline>{L.options?.[i] ?? o}</Md></span>
                {done && right && <span className="pq-mark ok"><IconCheckFill size={20} /></span>}
                {done && picked && !right && <span className="pq-mark err"><IconXFill size={20} /></span>}
              </button>
              {done && L.why?.[i] && <div className="mcq-why"><Md>{L.why[i]}</Md></div>}
            </div>
          )
        })}
      </div>
      {!done && (
        <>
          <div className="pq-actions"><button className="btn primary" disabled={!sel.length} onClick={submit}>{tr(lang, 'Kumpulkan', 'Submit')}</button></div>
          <HintLadder hints={L.hints} work={[]} lang={lang} resetKey={q.id} refs={q.refs} onUse={setHints} />
        </>
      )}
      {done && (
        <div className="pq-res">
          <div className={'wb-verdict ' + (ok ? 'ok' : 'err')}><b>{ok ? tr(lang, 'Benar', 'Correct') : tr(lang, 'Belum tepat', 'Not quite')}</b>
            {!ok && <span> · {tr(lang, 'Kunci', 'Key')}: {q.answer.map((i) => String.fromCharCode(65 + i)).join(', ')}</span>}
            {hints > 0 && <span> · {tr(lang, 'maks', 'max')} {Math.round(hintCap(hints) * 100)}%</span>}</div>
          <Explanation lang={lang}>{L.explanation}</Explanation>
        </div>
      )}
    </div>
  )
}
