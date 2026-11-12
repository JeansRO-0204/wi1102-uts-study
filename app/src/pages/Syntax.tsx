// Syntax reference page (route #/sintaks, optional #/sintaks/<id>): all cards grouped by deck, cheat table, searchable.
import { useEffect, useMemo, useState } from 'react'
import { DECKS, type DeckId, type SyntaxId } from '../types'
import { SYNTAX, CHEAT } from '../content/syntax'
import SyntaxCardView from '../content/SyntaxCardView'
import '../content/content.css'
import './pages.css'

const ORDER: DeckId[] = ['D02', 'D04', 'D05', 'D06', 'D10']

export default function Syntax({ id }: { id?: string }) {
  const [q, setQ] = useState('')
  const [deck, setDeck] = useState<DeckId | 'all'>('all')
  const [target, setTarget] = useState<string | undefined>(id)
  useEffect(() => setTarget(id), [id])
  useEffect(() => { if (target) document.getElementById('sx-' + target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [target])
  const needle = q.trim().toLowerCase()
  const shown = useMemo(() => SYNTAX.filter((c) => {
    if (deck !== 'all' && !c.decks.includes(deck)) return false
    if (!needle) return true
    const hay = [c.title, c.rule, c.python, c.pseudo, c.flow, c.id, ...c.slips.map((s) => s.wrong + s.why + s.fix)].join(' ').toLowerCase()
    return hay.includes(needle)
  }), [needle, deck])
  const groups = ORDER.map((d) => ({ d, cards: shown.filter((c) => c.decks[0] === d) })).filter((g) => g.cards.length)
  const cheat = CHEAT.filter((r) => !needle || (r.what + r.python + r.pseudo + r.flow).toLowerCase().includes(needle))
  const jump = (sid?: SyntaxId) => { if (!sid) return; setQ(''); setDeck('all'); setTarget(sid); setTimeout(() => document.getElementById('sx-' + sid)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50) }

  return (
    <div className="pg sx-page">
      <div className="pg-head">
        <h1>Syntax</h1>
        <p className="muted">Notation exactly as in the lecture slides: Python, Liem pseudocode, and flowchart symbols. Each card has a one-sentence rule, a runnable example, and the slips that come up most often.</p>
      </div>
      <div className="sx-bar">
        <input className="sx-search" type="search" placeholder="Search: while, elif, return, index…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search syntax" />
        <div className="sx-chips">
          <button className={deck === 'all' ? 'on' : ''} onClick={() => setDeck('all')}>All</button>
          {ORDER.map((d) => <button key={d} className={deck === d ? 'on' : ''} onClick={() => setDeck(d)}>{DECKS.find((x) => x.id === d)?.short}</button>)}
        </div>
      </div>

      {cheat.length > 0 && deck === 'all' && (
        <section className="sx-group">
          <h2>Cheat table: Python ⇄ pseudocode ⇄ flowchart</h2>
          <div className="sx-cheat"><table>
            <thead><tr><th>Concept</th><th>Python</th><th>Pseudocode (Liem)</th><th>Flowchart</th></tr></thead>
            <tbody>{cheat.map((r, i) => (
              <tr key={i}><td>{r.id ? <a onClick={() => jump(r.id)}>{r.what}</a> : r.what}</td><td className="m">{r.python}</td><td className="m">{r.pseudo}</td><td>{r.flow}</td></tr>
            ))}</tbody>
          </table></div>
        </section>
      )}

      {groups.map((g) => {
        const dk = DECKS.find((x) => x.id === g.d)
        return (
          <section key={g.d} className="sx-group">
            <h2>{g.d} · {dk?.titleEn}</h2>
            <div className="sx-grid">{g.cards.map((c) => <SyntaxCardView key={c.id} card={c} highlighted={target === c.id} />)}</div>
          </section>
        )
      })}
      {groups.length === 0 && <p className="muted">No cards match “{q}”.</p>}
    </div>
  )
}
