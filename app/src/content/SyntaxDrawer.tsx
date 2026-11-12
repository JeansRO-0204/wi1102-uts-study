// Slide-over listing syntax cards by id. onOpenCard fires when the learner opens a card (views count it as a hint rung in Paper mode).
import { useEffect, useRef, useState } from 'react'
import type { SyntaxId } from '../types'
import { SYNTAX_BY_ID } from './syntax'
import SyntaxCardView, { Ticks } from './SyntaxCardView'
import { IconX } from '../lib/icons'
import './content.css'

export default function SyntaxDrawer({ ids, open, onClose, onOpenCard, lang = 'en' }: { ids: SyntaxId[]; open: boolean; onClose: () => void; onOpenCard?: (id: SyntaxId) => void; lang?: 'id' | 'en' }) {
  const [openId, setOpenId] = useState<SyntaxId | null>(null)
  const cb = useRef(onOpenCard); cb.current = onOpenCard
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, onClose])
  useEffect(() => {
    if (open && ids.length === 1) { setOpenId(ids[0]); cb.current?.(ids[0]) }
    if (!open) setOpenId(null)
  }, [open, ids.join(',')]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!open) return null
  const cards = ids.map((i) => SYNTAX_BY_ID.get(i)).filter((c) => !!c)
  return (
    <>
      <div className="sx-scrim" onClick={onClose} />
      <aside className="sx-drawer" role="dialog" aria-label="Syntax cards">
        <header><b>Syntax cards</b><button className="btn sm ghost" onClick={onClose} aria-label="Close"><IconX size={16} /></button></header>
        <div className="body">
          {cards.length === 0 && <p className="muted">No cards for this question yet.</p>}
          {cards.map((c) => (
            <div key={c.id} className="sx-item">
              <button className="head" aria-expanded={openId === c.id} onClick={() => { const n = openId === c.id ? null : c.id; setOpenId(n); if (n) cb.current?.(c.id) }}>
                <span>{c.title}<br /><small><Ticks>{c.rule.length > 90 ? c.rule.slice(0, 88) + '…' : c.rule}</Ticks></small></span>
                <span aria-hidden>{openId === c.id ? '−' : '+'}</span>
              </button>
              {openId === c.id && <div className="open"><SyntaxCardView card={c} /></div>}
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
