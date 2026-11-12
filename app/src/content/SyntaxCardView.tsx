// One syntax card: rule, Python / pseudocode / flowchart tabs, a runnable example, classic slips, slide citations.
import { Fragment, useState } from 'react'
import type { SyntaxCard } from '../types'
import { DECKS } from '../types'
import { PageChip } from '../lib/kit'
import { py, type PyRun } from '../py/client'
import { explainError } from './errors'
import './content.css'

/** Inline text with `code` spans and **bold**. */
export function Ticks({ children }: { children: string }) {
  const parts = children.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
  return <>{parts.map((p, i) => p.startsWith('`') ? <code key={i} className="sx-ic">{p.slice(1, -1)}</code> : p.startsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : <Fragment key={i}>{p}</Fragment>)}</>
}

type Tab = 'python' | 'pseudo' | 'flow'

export default function SyntaxCardView({ card, lang: _lang = 'en', highlighted, onSeen }: { card: SyntaxCard; lang?: 'id' | 'en'; highlighted?: boolean; onSeen?: () => void }) {
  const [tab, setTab] = useState<Tab>('python')
  const [res, setRes] = useState<PyRun | 'busy' | null>(null)
  const tabs: [Tab, string][] = [['python', 'Python'], ...(card.pseudo ? [['pseudo', 'Pseudocode'] as [Tab, string]] : []), ...(card.flow ? [['flow', 'Flowchart'] as [Tab, string]] : [])]
  async function run() {
    if (!card.example) return
    setRes('busy'); onSeen?.()
    setRes(await py.run(card.example.code, card.example.stdin ?? []))
  }
  const ex = res && res !== 'busy' ? res : null
  const exp = ex?.error ? explainError(ex.error, ex.error_line, card.example?.code, 'en') : null
  return (
    <article className={'sx-card' + (highlighted ? ' target' : '')} id={'sx-' + card.id}>
      <header>
        <h3>{card.title}</h3>
        {card.decks.map((d) => <span key={d} className="sx-deck">{DECKS.find((x) => x.id === d)?.short ?? d}</span>)}
      </header>
      <p className="sx-rule"><Ticks>{card.rule}</Ticks></p>
      <div className="sx-tabs" role="tablist">{tabs.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => { setTab(k); onSeen?.() }}>{l}</button>)}</div>
      {tab === 'python' && <pre className="sx-code">{card.python}</pre>}
      {tab === 'pseudo' && card.pseudo && <pre className="sx-code">{card.pseudo}</pre>}
      {tab === 'flow' && card.flow && <div className="sx-flow"><Ticks>{card.flow}</Ticks></div>}
      {card.example && (
        <div className="sx-ex">
          <h4>Example</h4>
          <pre className="sx-code">{card.example.code}</pre>
          {card.example.stdin && card.example.stdin.length > 0 && <div className="sx-stdin">Input: {card.example.stdin.map((s, i) => <code key={i} className="sx-ic">{s}</code>)}</div>}
          <button className="btn sm" onClick={run} disabled={res === 'busy'}>{res === 'busy' ? 'Running…' : ex ? 'Run again' : 'Run example'}</button>
          {ex && !ex.error && <pre className="sx-code out">{ex.stdout || '(no output)'}</pre>}
          {ex && ex.error && <pre className="sx-code err">{(ex.stdout ? ex.stdout + '\n' : '') + ex.error + (exp ? '\n→ ' + exp.title : '')}</pre>}
          {card.example.note && <p className="sx-note"><Ticks>{card.example.note}</Ticks></p>}
        </div>
      )}
      {card.slips.length > 0 && (
        <div className="sx-slips">
          <h4>Common slips</h4>
          {card.slips.map((s, i) => (
            <div key={i} className="sx-slip">
              <div className="w">✗ {s.wrong}</div>
              <div><Ticks>{s.why}</Ticks></div>
              <div className="f">✓ <Ticks>{s.fix}</Ticks></div>
            </div>
          ))}
        </div>
      )}
      {card.refs && card.refs.length > 0 && <div className="sx-refs">Slides: {card.refs.map((r, i) => <PageChip key={i} r={r} />)}</div>}
    </article>
  )
}
