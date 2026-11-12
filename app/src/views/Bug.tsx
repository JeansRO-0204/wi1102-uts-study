// Find-the-bug: tap the wrong line(s), submit, then see which were right and the fixed code with line-by-line notes.
import { useState } from 'react'
import { Md } from '../lib/kit'
import type { BugQ, SyntaxId } from '../types'
import { HintLadder, hintCap, loc } from '../practice/Hints'
import { Explanation } from '../practice/viewKit'
import { tr } from '../practice/ui'
import CodeNotes from '../content/CodeNotes'
import SyntaxDrawer from '../content/SyntaxDrawer'
import type { QViewProps } from './contract'

export default function BugView({ q, mode, lang, onDone, review }: QViewProps<BugQ>) {
  const L = loc(q, lang)
  const lines = q.code.replace(/\n+$/, '').split('\n')
  const [sel, setSel] = useState<number[]>(Array.isArray(review?.answer) ? (review!.answer as number[]) : [])
  const [done, setDone] = useState(!!review)
  const [ladder, setLadder] = useState(review?.hints ?? 0)
  const [synOpen, setSynOpen] = useState(false)
  const [synCounted, setSynCounted] = useState(false)
  // opening a syntax card is one rung in Paper mode, free in Lab mode
  const hints = ladder + (synCounted && mode === 'test' ? 1 : 0)
  const hit = sel.filter((l) => q.badLines.includes(l)).length
  const extra = sel.length - hit
  const exact = hit === q.badLines.length && extra === 0
  const toggle = (n: number) => { if (!done) setSel((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n])) }
  const submit = () => {
    if (done || !sel.length) return
    setDone(true)
    const raw = hit / (q.badLines.length + extra)
    onDone({ correct: exact && hints === 0, score: raw * hintCap(hints), hints, answer: sel, summary: exact ? 'bug found' : `${hit}/${q.badLines.length} bug lines` })
  }
  const openCard = (_id?: SyntaxId) => setSynCounted(true)
  return (
    <div className="bug">
      <p className="pq-note">{tr(lang, 'Ketuk baris yang salah (boleh lebih dari satu).', 'Tap the wrong line(s).')}</p>
      <div className="bug-code" role="group" aria-label="code">
        {lines.map((ln, i) => {
          const n = i + 1, picked = sel.includes(n), isBad = q.badLines.includes(n)
          const cls = 'bug-line' + (picked ? ' sel' : '') + (done ? (isBad ? (picked ? ' hit' : ' miss') : picked ? ' fp' : '') : '')
          return (
            <button key={n} className={cls} onClick={() => toggle(n)} aria-pressed={picked} disabled={done}>
              <span className="bug-n">{n}</span><code>{ln || ' '}</code>
              {done && isBad && <span className="bug-tag">{picked ? '✓ bug' : tr(lang, 'bug terlewat', 'missed bug')}</span>}
              {done && !isBad && picked && <span className="bug-tag fp">{tr(lang, 'baris ini benar', 'this line is fine')}</span>}
            </button>
          )
        })}
      </div>
      {!done && (
        <>
          <div className="pq-actions">
            <button className="btn primary" disabled={!sel.length} onClick={submit}>{tr(lang, 'Kumpulkan', 'Submit')}</button>
            {!!q.syntax?.length && <button className="btn" onClick={() => { setSynOpen(true); setSynCounted(true) }}>{tr(lang, 'Kartu sintaks', 'Syntax cards')}{mode === 'test' ? ` (−1 ${tr(lang, 'petunjuk', 'hint')})` : ''}</button>}
          </div>
          <HintLadder hints={L.hints} work={[]} lang={lang} resetKey={q.id} refs={q.refs} onUse={setLadder} />
        </>
      )}
      {done && (
        <div className="pq-res">
          <div className={'wb-verdict ' + (exact ? 'ok' : hit ? 'warn' : 'err')}>
            <b>{exact ? tr(lang, 'Bug ditemukan', 'Bug found') : `${hit}/${q.badLines.length} ${tr(lang, 'baris bug tepat', 'bug lines right')}`}</b>
            {extra > 0 && <span> · {extra} {tr(lang, 'baris yang benar kamu tandai', 'correct line(s) wrongly marked')}</span>}
            {hints > 0 && <span> · {tr(lang, 'maks', 'max')} {Math.round(hintCap(hints) * 100)}%</span>}
          </div>
          <h4 className="bug-h">{tr(lang, 'Kode yang benar', 'The fixed code')}</h4>
          <CodeNotes code={q.fixed} notes={q.lineNotes} lang={lang} onSyntax={openCard as (id: string) => void} />
          <Explanation lang={lang}>{L.explanation}</Explanation>
          {q.badLines.length > 0 && <p className="muted"><Md inline>{tr(lang, 'Baris bug: ', 'Bug line(s): ') + q.badLines.join(', ')}</Md></p>}
        </div>
      )}
      {!!q.syntax?.length && <SyntaxDrawer ids={q.syntax} open={synOpen} onClose={() => setSynOpen(false)} onOpenCard={openCard} lang={lang} />}
    </div>
  )
}
