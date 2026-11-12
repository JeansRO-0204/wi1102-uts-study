// Annotated code listing: numbered lines, noted lines/blocks marked, tap/hover a line to read its note.
// On wide screens (>= 880px) and in print every note is shown beside / under its line; `highlight` marks the active line
// (used by the Tracer). Syntax ids render as chips that call onSyntax(id).
import { useMemo, useState } from 'react'
import type { LineNote, SyntaxId } from '../types'
import { SYNTAX_BY_ID } from './syntax'
import { Ticks } from './SyntaxCardView'
import './content.css'

export default function CodeNotes({ code, notes = [], highlight = null, onSyntax, lang = 'en', wide = true }: {
  code: string; notes?: LineNote[]; highlight?: number | null; onSyntax?: (id: string) => void; lang?: 'id' | 'en'; wide?: boolean
}) {
  const lines = useMemo(() => code.replace(/\n$/, '').split('\n'), [code])
  const [openAt, setOpenAt] = useState<number | null>(null)
  // map first line -> note; lines inside a block -> its first line
  const { byStart, owner, hasAny } = useMemo(() => {
    const byStart = new Map<number, LineNote[]>(); const owner = new Map<number, number>()
    for (const n of notes) {
      const [a, b] = Array.isArray(n.line) ? n.line : [n.line, n.line]
      byStart.set(a, [...(byStart.get(a) ?? []), n])
      for (let l = a; l <= b; l++) if (!owner.has(l)) owner.set(l, a)
    }
    return { byStart, owner, hasAny: notes.length > 0 }
  }, [notes])
  const text = (n: LineNote) => (lang === 'en' && n.en ? n.en : n.note)

  return (
    <div className={'cn' + (wide ? ' wide' : '')}>
      {lines.map((ln, i) => {
        const no = i + 1
        const own = owner.get(no)
        const here = byStart.get(no)
        const isOpen = own != null && openAt === own
        const cls = ['cn-row', own != null ? 'in' : '', here ? 'has start' : '', isOpen ? 'open' : '', highlight === no ? 'hl' : ''].filter(Boolean).join(' ')
        return (
          <div key={i} className={cls} onClick={() => own != null && setOpenAt(openAt === own ? null : own)} onMouseEnter={() => own != null && setOpenAt(own)}>
            <div className="cn-num">{no}</div>
            <div className="cn-src">{ln === '' ? ' ' : ln}</div>
            <div className="cn-note">
              {here?.map((n, k) => {
                const sid = n.syntax
                const card = sid ? SYNTAX_BY_ID.get(sid) : undefined
                return (
                  <div key={k}>
                    <Ticks>{text(n)}</Ticks>
                    {sid && <button className="cn-chip" onClick={(e) => { e.stopPropagation(); onSyntax?.(sid as SyntaxId) }} title="Open syntax card">{card ? card.title : sid}</button>}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      {hasAny && <div className="cn-hint">Tap a marked line to read its explanation.</div>}
    </div>
  )
}
