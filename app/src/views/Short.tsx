// Typed blanks, checked tolerantly (answerCheck.blankOk). Lab mode shows live ✓/✗ per blank; Paper mode only after Submit.
import { useState } from 'react'
import { Md } from '../lib/kit'
import type { ShortQ } from '../types'
import { HintLadder, hintCap, loc } from '../practice/Hints'
import { blankOk, blankWhy } from '../practice/answerCheck'
import { Explanation } from '../practice/viewKit'
import { IconCheckFill, IconXFill } from '../lib/icons'
import { tr } from '../practice/ui'
import type { QViewProps } from './contract'

export default function ShortView({ q, mode, lang, onDone, review }: QViewProps<ShortQ>) {
  const L = loc(q, lang)
  const [vals, setVals] = useState<string[]>(Array.isArray(review?.answer) ? (review!.answer as string[]) : q.blanks.map(() => ''))
  const [done, setDone] = useState(!!review)
  const [hints, setHints] = useState(review?.hints ?? 0)
  const oks = q.blanks.map((b, i) => blankOk(b, vals[i] ?? ''))
  const nOk = oks.filter(Boolean).length
  const all = nOk === q.blanks.length
  const live = mode === 'learn'
  const submit = () => {
    if (done) return
    setDone(true)
    onDone({ correct: all && hints === 0, score: (nOk / q.blanks.length) * hintCap(hints), hints, answer: vals, summary: `${nOk}/${q.blanks.length} blanks right` })
  }
  const wide = q.blanks.some((b) => b.type === 'code' || b.accept.some((a) => a.length > 18))
  return (
    <div className="short" onKeyDown={(e) => { if (e.key === 'Enter' && (e.target as HTMLElement).tagName === 'INPUT') { e.preventDefault(); submit() } }}>
      <div className={'pq-blanks' + (wide ? ' wide' : '')}>
        {q.blanks.map((b, i) => {
          const show = done || (live && vals[i]?.trim())
          const st = show ? (oks[i] ? 'ok' : 'err') : ''
          const why = done && !oks[i] ? blankWhy(b, vals[i] ?? '', lang) : null
          return (
            <label key={i} className={'pq-blank ' + st}>
              <span className="pq-blank-l">{b.label}</span>
              <span className="pq-blank-in">
                <input value={vals[i]} disabled={done} placeholder={b.placeholder} spellCheck={false} autoComplete="off"
                  style={b.type === 'code' ? { fontFamily: 'var(--mono)' } : undefined}
                  onChange={(e) => setVals((a) => a.map((x, j) => (j === i ? e.target.value : x)))} />
                {st === 'ok' && <span className="pq-blank-ic ok"><IconCheckFill size={18} /></span>}
                {st === 'err' && <span className="pq-blank-ic err"><IconXFill size={18} /></span>}
              </span>
              {done && !oks[i] && <small className="short-key">{tr(lang, 'Jawaban', 'Answer')}: <code>{b.accept[0]}</code>{b.accept.length > 1 ? <span className="muted"> ({tr(lang, 'atau', 'or')} {b.accept.slice(1).join(' / ')})</span> : null}</small>}
              {why && <small className="short-why"><Md inline>{why}</Md></small>}
            </label>
          )
        })}
      </div>
      {!done && (
        <>
          <div className="pq-actions"><button className="btn primary" onClick={submit}>{tr(lang, 'Kumpulkan', 'Submit')}</button>
            {live && <span className="muted pq-hint">{tr(lang, 'Mode Lab: tanda ✓/✗ langsung muncul.', 'Lab mode: ✓/✗ appear live.')}</span>}</div>
          <HintLadder hints={L.hints} work={[]} lang={lang} resetKey={q.id} refs={q.refs} onUse={setHints} />
        </>
      )}
      {done && (
        <div className="pq-res">
          <div className={'wb-verdict ' + (all ? 'ok' : nOk ? 'warn' : 'err')}><b>{nOk}/{q.blanks.length} {tr(lang, 'isian benar', 'blanks right')}</b>{hints > 0 && <span> · {tr(lang, 'maks', 'max')} {Math.round(hintCap(hints) * 100)}%</span>}</div>
          <Explanation lang={lang}>{L.explanation}</Explanation>
        </div>
      )}
    </div>
  )
}
