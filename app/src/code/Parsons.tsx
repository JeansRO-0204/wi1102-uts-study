// Parsons problem: the solution's lines, shuffled, plus 1–2 distractor lines taken from the classic wrong variants.
// Tap a line to place it, ◀ ▶ to change its indentation, ▲ ▼ to move, or drag. Used as a hint rung of Program.
import { useMemo, useState } from 'react'
import './program.css'

export interface PItem { id: string; text: string; indent: number; distractor?: boolean; why?: string }
export interface ParsonsSet { correct: PItem[]; pool: PItem[]; unit: number }

/** Remove a trailing `# comment` (outside quotes). */
function stripComment(l: string): string {
  let q: string | null = null
  for (let i = 0; i < l.length; i++) {
    const c = l[i]
    if (q) { if (c === q) q = null } else if (c === '"' || c === "'") q = c
    else if (c === '#') return l.slice(0, i).replace(/\s+$/, '')
  }
  return l.replace(/\s+$/, '')
}

/** Meaningful lines of a listing with their indentation level (comments / blank lines dropped). */
export function codeLines(code: string, pseudo = false): { text: string; indent: number }[] {
  const raw = code.replace(/\t/g, '    ').split('\n')
    .map((l) => (pseudo ? l.replace(/\{[^}]*\}/g, '').replace(/\s+$/, '') : stripComment(l)))
    .filter((l) => l.trim() !== '')
  const spaces = raw.map((l) => /^ */.exec(l)![0].length)
  const pos = spaces.filter((x) => x > 0)
  const unit = pos.length ? Math.min(...pos) : 1
  return raw.map((l, i) => ({ text: l.trim(), indent: Math.round(spaces[i] / unit) }))
}

function rng(seed: string) {
  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19) }
  let a = h >>> 0
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

const key = (s: string) => s.replace(/\s+/g, '')

export function buildParsons(solution: string, wrongs: { code: string; msg: string; msgEn?: string }[], seed: string, opts: { pseudo?: boolean; maxDistractors?: number; lang?: 'id' | 'en' } = {}): ParsonsSet {
  const sol = codeLines(solution, opts.pseudo)
  const unit = 1
  const correct: PItem[] = sol.map((l, i) => ({ id: `c${i}`, text: l.text, indent: l.indent }))
  const have = new Set(correct.map((c) => key(c.text)))
  const dis: PItem[] = []
  if (!opts.pseudo) {
    for (const w of wrongs) {
      for (const l of codeLines(w.code)) {
        if (dis.length >= (opts.maxDistractors ?? 2)) break
        if (have.has(key(l.text)) || dis.some((d) => key(d.text) === key(l.text))) continue
        dis.push({ id: `d${dis.length}`, text: l.text, indent: l.indent, distractor: true, why: (opts.lang === 'en' && w.msgEn) || w.msg })
        break // at most one line per wrong variant: spreads the distractors
      }
    }
  }
  const rand = rng(seed)
  const pool = [...correct, ...dis]
  for (let tries = 0; tries < 6; tries++) {
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]] }
    if (pool.length < 2 || pool.some((p, i) => p.id !== correct[i]?.id)) break
  }
  return { correct, pool, unit }
}

interface Placed { id: string; indent: number }
const T = {
  id: { pool: 'Baris tersedia', ans: 'Susunanmu', empty: 'Ketuk baris di kiri untuk menaruhnya di sini. Perhatikan juga indentasinya.', check: 'Periksa susunan', reset: 'Ulangi', insert: 'Pindahkan ke editor',
    good: 'Susunan dan indentasi benar.', bad: 'Belum tepat:', wrongLine: 'baris ini tidak dibutuhkan (jebakan)', wrongPos: 'baris ini salah urutan', wrongInd: 'indentasi salah', missing: 'Masih ada baris yang belum dipakai.', note: 'Ada 1–2 baris jebakan yang tidak perlu dipakai.', up: 'Naik', down: 'Turun', less: 'Kurangi indentasi', more: 'Tambah indentasi', rm: 'Kembalikan' },
  en: { pool: 'Available lines', ans: 'Your order', empty: 'Tap a line on the left to place it here. Mind the indentation too.', check: 'Check order', reset: 'Reset', insert: 'Move to editor',
    good: 'Order and indentation are right.', bad: 'Not quite:', wrongLine: 'this line is not needed (a distractor)', wrongPos: 'wrong position', wrongInd: 'wrong indentation', missing: 'Some lines are still unused.', note: '1–2 distractor lines are not needed.', up: 'Up', down: 'Down', less: 'Less indent', more: 'More indent', rm: 'Put back' },
}

export default function Parsons({ set, lang = 'en', pseudo, onInsert, onChecked }: { set: ParsonsSet; lang?: 'id' | 'en'; pseudo?: boolean; onInsert?: (code: string) => void; onChecked?: (ok: boolean) => void }) {
  const t = T[lang]
  const byId = useMemo(() => new Map(set.pool.map((p) => [p.id, p])), [set])
  const [placed, setPlaced] = useState<Placed[]>([])
  const [res, setRes] = useState<{ ok: boolean; rows: string[] } | null>(null)
  const [drag, setDrag] = useState<{ from: 'pool' | 'placed'; id: string } | null>(null)
  const inAns = new Set(placed.map((p) => p.id))
  const pool = set.pool.filter((p) => !inAns.has(p.id))
  const hasDis = set.pool.some((p) => p.distractor)

  const touch = (f: (p: Placed[]) => Placed[]) => { setPlaced(f); setRes(null) }
  const add = (id: string, at?: number) => touch((p) => { const n = p.filter((x) => x.id !== id); const x = { id, indent: p.find((y) => y.id === id)?.indent ?? 0 }; n.splice(at ?? n.length, 0, x); return n })
  const move = (i: number, d: number) => touch((p) => { const j = i + d; if (j < 0 || j >= p.length) return p; const n = [...p]; [n[i], n[j]] = [n[j], n[i]]; return n })
  const ind = (i: number, d: number) => touch((p) => p.map((x, k) => (k === i ? { ...x, indent: Math.max(0, Math.min(6, x.indent + d)) } : x)))
  const rm = (i: number) => touch((p) => p.filter((_, k) => k !== i))

  const check = () => {
    const rows = placed.map((p, i) => {
      const it = byId.get(p.id)!
      if (it.distractor) return `✗ ${t.wrongLine}`
      const want = set.correct[i]
      if (!want || want.text !== it.text) return `✗ ${t.wrongPos}`
      if (want.indent !== p.indent) return `✗ ${t.wrongInd}`
      return '✓'
    })
    const ok = placed.length === set.correct.length && rows.every((r) => r === '✓')
    setRes({ ok, rows }); onChecked?.(ok)
  }
  const code = () => placed.map((p) => (pseudo ? '  ' : '    ').repeat(p.indent) + byId.get(p.id)!.text).join('\n')

  return (
    <div className="pars">
      {hasDis && <div className="pars-note">{t.note}</div>}
      <div className="pars-cols">
        <div className="pars-col" onDragOver={(e) => drag?.from === 'placed' && e.preventDefault()} onDrop={() => { if (drag?.from === 'placed') rm(placed.findIndex((p) => p.id === drag.id)); setDrag(null) }}>
          <b>{t.pool}</b>
          {pool.map((p) => (
            <button key={p.id} className="pars-line" draggable onDragStart={() => setDrag({ from: 'pool', id: p.id })} onDragEnd={() => setDrag(null)} onClick={() => add(p.id)}>
              <code>{p.text}</code>
            </button>
          ))}
          {!pool.length && <span className="muted pars-small">—</span>}
        </div>
        <div className="pars-col pars-ans" onDragOver={(e) => e.preventDefault()} onDrop={() => { if (drag) add(drag.id); setDrag(null) }}>
          <b>{t.ans}</b>
          {!placed.length && <span className="muted pars-small">{t.empty}</span>}
          {placed.map((p, i) => (
            <div key={p.id} className={'pars-row' + (res ? (res.rows[i] === '✓' ? ' ok' : ' err') : '')} draggable
              onDragStart={() => setDrag({ from: 'placed', id: p.id })} onDragEnd={() => setDrag(null)}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }} onDrop={(e) => { e.stopPropagation(); if (drag) add(drag.id, i); setDrag(null) }}>
              <span className="pars-ind" style={{ width: p.indent * 18 }} />
              <code className="pars-code">{byId.get(p.id)!.text}</code>
              <span className="pars-btns">
                <button title={t.less} aria-label={t.less} onClick={() => ind(i, -1)} disabled={p.indent === 0}>◀</button>
                <button title={t.more} aria-label={t.more} onClick={() => ind(i, 1)}>▶</button>
                <button title={t.up} aria-label={t.up} onClick={() => move(i, -1)} disabled={i === 0}>▲</button>
                <button title={t.down} aria-label={t.down} onClick={() => move(i, 1)} disabled={i === placed.length - 1}>▼</button>
                <button title={t.rm} aria-label={t.rm} onClick={() => rm(i)}>✕</button>
              </span>
              {res && res.rows[i] !== '✓' && <span className="pars-why">{res.rows[i]}{byId.get(p.id)!.distractor && byId.get(p.id)!.why ? `: ${byId.get(p.id)!.why!.replace(/[`*]/g, '')}` : ''}</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="pars-actions">
        <button className="btn sm primary" disabled={!placed.length} onClick={check}>{t.check}</button>
        <button className="btn sm" onClick={() => { setPlaced([]); setRes(null) }}>{t.reset}</button>
        {onInsert && <button className="btn sm ghost" disabled={!placed.length} onClick={() => onInsert(code())}>{t.insert}</button>}
        {res && <span className={'chip ' + (res.ok ? 'ok' : 'warn')}>{res.ok ? t.good : placed.length < set.correct.length && res.rows.every((r) => r === '✓') ? t.missing : t.bad + ' ' + res.rows.filter((r) => r !== '✓').length}</span>}
      </div>
    </div>
  )
}
