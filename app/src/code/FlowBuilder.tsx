// Drag-and-drop flowchart editor. The SVG chart (FlowView in editable mode) is the canvas; a palette of the standard symbols
// is dragged onto the arrows (drop slots). Existing shapes can be dragged to another slot (their whole subtree moves) or onto the
// trash. Pointer events only (mouse / touch / pen): touch uses a short long-press to start a drag so the canvas still scrolls.
// Click / tap a shape to edit its text in a floating box. A collapsible Outline panel keeps the old list editor as the keyboard fallback.
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { Flowchart, FlowBlock } from '../types'
import { FlowView } from './FlowView'
import { FlowMermaid } from './FlowMermaid'
import { flowToPython } from './flow.ts'
import * as O from './flowOps.ts'
import './flow.css'

type Blocks = FlowBlock[]

/* ------------------------------------------------------------------ palette symbols */
const PAL: { key: string; label: string }[] = [
  { key: 'in', label: 'Input' }, { key: 'out', label: 'Output' }, { key: 'process', label: 'Process' },
  { key: 'if', label: 'Decision' }, { key: 'while', label: 'While' }, { key: 'repeat', label: 'Repeat–until' }, { key: 'call', label: 'Subprogram' },
]
const kindKey = (b: FlowBlock) => (b.t === 'io' ? b.dir : b.t)

function SymbolIcon({ k, size = 64 }: { k: string; size?: number }) {
  let body
  switch (k) {
    case 'in': case 'out': body = <><polygon className="fl-shape fl-io" points="12,6 61,6 52,34 3,34" /><text className="fb-sym-t" x="32" y="21" textAnchor="middle" dominantBaseline="central">{k}</text></>; break
    case 'if': body = <polygon className="fl-shape fl-dia" points="32,3 61,20 32,37 3,20" />; break
    case 'while': body = <><polygon className="fl-shape fl-dia" points="26,3 48,18 26,33 4,18" /><path className="fl-edge" d="M48 18 H58 V38 H26 V33" /></>; break
    case 'repeat': body = <><rect className="fl-shape fl-proc" x="10" y="2" width="34" height="11" /><polygon className="fl-shape fl-dia" points="27,16 46,27 27,38 8,27" /><path className="fl-edge" d="M46 27 H58 V7 H44" /></>; break
    case 'call': body = <><rect className="fl-shape fl-call" x="4" y="6" width="56" height="28" /><line className="fl-bar" x1="11" y1="6" x2="11" y2="34" /><line className="fl-bar" x1="53" y1="6" x2="53" y2="34" /></>; break
    default: body = <rect className="fl-shape fl-proc" x="4" y="6" width="56" height="28" />
  }
  return <svg viewBox="0 0 64 40" width={size} height={size * 0.625} aria-hidden="true" className="fb-sym">{body}</svg>
}

/* ------------------------------------------------------------------ symbol bar */
const SYMS = ['←', '≤', '≥', '≠', ' mod ', ' div ', ' and ', ' or ', ' not ']
type FieldEl = HTMLInputElement | HTMLTextAreaElement
type Focus = { current: FieldEl | null }

function insertSym(el: FieldEl | null, s: string) {
  if (!el) return
  el.focus()
  const a = el.selectionStart ?? el.value.length, z = el.selectionEnd ?? a
  el.setRangeText(s, a, z, 'end')
  el.dispatchEvent(new Event('input', { bubbles: true }))
}
function Syms({ focus, label }: { focus: Focus; label?: string }) {
  const keep = (e: React.SyntheticEvent) => e.preventDefault()
  return (
    <div className="fb-syms" role="group" aria-label="Symbols">
      {label ? <span>{label}</span> : null}
      {SYMS.map((s) => <button type="button" key={s} onPointerDown={keep} onMouseDown={keep} onClick={() => insertSym(focus.current, s)}>{s.trim()}</button>)}
    </div>
  )
}

/* ------------------------------------------------------------------ outline (list editor, keyboard fallback) */
const KINDS: { key: string; label: string }[] = [
  { key: 'in', label: 'Input' }, { key: 'out', label: 'Output' }, { key: 'process', label: 'Process' }, { key: 'if', label: 'If (decision)' },
  { key: 'while', label: 'While' }, { key: 'repeat', label: 'Repeat–until' }, { key: 'call', label: 'Call subprogram' },
]
const TAG: Record<string, string> = { io: 'Input / Output', process: 'Process', if: 'Decision', while: 'While loop', repeat: 'Repeat–until loop', call: 'Call subprogram' }

function Field({ value, onChange, placeholder, focus, label }: { value: string; onChange: (v: string) => void; placeholder: string; focus: Focus; label: string }) {
  return (
    <input className="fb-in" value={value} placeholder={placeholder} aria-label={label} spellCheck={false} autoCapitalize="off" autoCorrect="off"
      onFocus={(e) => { focus.current = e.currentTarget }} onChange={(e) => onChange(e.target.value)} />
  )
}

function AddBar({ onAdd, compact }: { onAdd: (b: FlowBlock) => void; compact?: boolean }) {
  const [open, setOpen] = useState(false)
  if (!open) return <button type="button" className="fb-plus" onClick={() => setOpen(true)} aria-label="Add block">+ {compact ? '' : 'add block'}</button>
  return (
    <div className="fb-pal-list" role="group" aria-label="Choose a block type">
      {KINDS.map((k) => <button type="button" key={k.key} onClick={() => { onAdd(O.makeBlock(k.key)); setOpen(false) }}>{k.label}</button>)}
      <button type="button" onClick={() => setOpen(false)} aria-label="Cancel">Cancel</button>
    </div>
  )
}

function List({ blocks, onChange, focus, title }: { blocks: Blocks; onChange: (b: Blocks) => void; focus: Focus; title?: string }) {
  const set = (i: number, b: FlowBlock) => onChange(blocks.map((x, j) => (j === i ? b : x)))
  const del = (i: number) => onChange(blocks.filter((_, j) => j !== i))
  const move = (i: number, d: -1 | 1) => { const a = blocks.slice(); const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; onChange(a) }
  const ins = (i: number, b: FlowBlock) => { const a = blocks.slice(); a.splice(i, 0, b); onChange(a) }
  return (
    <div className="fb-list">
      {blocks.length === 0 ? <div className="fb-empty">{title ?? 'No blocks yet.'} Press + to add one.</div> : null}
      {blocks.map((b, i) => (
        <div key={i} style={{ display: 'grid', gap: 4 }}>
          {i > 0 ? <AddBar compact onAdd={(nb) => ins(i, nb)} /> : null}
          <div className={'fb-card fb-t-' + b.t}>
            <div className="fb-head">
              <span className="fb-tag">{i + 1}. {TAG[b.t]}</span>
              <span className="fb-ctl">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} aria-label="Move down">↓</button>
                <button type="button" className="fb-del" onClick={() => del(i)} aria-label="Delete block">✕</button>
              </span>
            </div>
            <Body b={b} onChange={(nb) => set(i, nb)} focus={focus} />
          </div>
        </div>
      ))}
      <AddBar onAdd={(nb) => onChange([...blocks, nb])} />
    </div>
  )
}

function Body({ b, onChange, focus }: { b: FlowBlock; onChange: (b: FlowBlock) => void; focus: Focus }) {
  switch (b.t) {
    case 'io':
      return (
        <div className="fb-row">
          <span className="seg" role="group" aria-label="I/O type">
            <button type="button" className={b.dir === 'in' ? 'on' : ''} onClick={() => onChange({ ...b, dir: 'in' })}>input</button>
            <button type="button" className={b.dir === 'out' ? 'on' : ''} onClick={() => onChange({ ...b, dir: 'out' })}>output</button>
          </span>
          <Field value={b.text} onChange={(v) => onChange({ ...b, text: v })} focus={focus} label="I/O block content" placeholder={b.dir === 'in' ? 'N   or   A, B' : '"Sum =", total'} />
        </div>
      )
    case 'process':
      return <Field value={b.text} onChange={(v) => onChange({ ...b, text: v })} focus={focus} label="Process block content" placeholder="sum ← sum + i" />
    case 'call':
      return <Field value={b.text} onChange={(v) => onChange({ ...b, text: v })} focus={focus} label="Subprogram call" placeholder="result ← Area(r)   or   PrintName(name)" />
    case 'if':
      return (
        <>
          <Field value={b.cond} onChange={(v) => onChange({ ...b, cond: v })} focus={focus} label="Decision condition" placeholder="A >= B" />
          <div className="fb-sub">
            <div className="fb-sub-h">Yes (true)</div>
            <List blocks={b.then} onChange={(x) => onChange({ ...b, then: x })} focus={focus} title="The Yes branch is empty." />
          </div>
          <div className="fb-sub">
            <div className="fb-sub-h">No (false)</div>
            <List blocks={b.else ?? []} onChange={(x) => onChange({ ...b, else: x })} focus={focus} title="The No branch is empty (that is allowed)." />
          </div>
        </>
      )
    case 'while':
      return (
        <>
          <Field value={b.cond} onChange={(v) => onChange({ ...b, cond: v })} focus={focus} label="Loop condition" placeholder="i <= N" />
          <div className="fb-sub">
            <div className="fb-sub-h">Loop body (while the condition is true)</div>
            <List blocks={b.body} onChange={(x) => onChange({ ...b, body: x })} focus={focus} />
          </div>
        </>
      )
    case 'repeat':
      return (
        <>
          <div className="fb-sub">
            <div className="fb-sub-h">Loop body (runs at least once)</div>
            <List blocks={b.body} onChange={(x) => onChange({ ...b, body: x })} focus={focus} />
          </div>
          <div className="fb-row">
            <span className="fb-lab">until</span>
            <Field value={b.until} onChange={(v) => onChange({ ...b, until: v })} focus={focus} label="Stop condition" placeholder="X = 0" />
          </div>
        </>
      )
  }
}

/* ------------------------------------------------------------------ main editor */
type Src = { kind: 'new'; key: string } | { kind: 'move'; id: string }
interface Press { src: Src; x: number; y: number; pid: number; type: string; started: boolean; timer: number | null }
const SNAP = 72
const PLACEHOLDER: Record<string, string> = {
  in: 'N   or   A, B', out: '"Sum =", total', process: 'sum ← sum + i', call: 'result ← Area(r)', if: 'A >= B', while: 'i <= N', repeat: 'X = 0',
}

function Editor({ value, onChange }: { value: Flowchart; onChange: (f: Flowchart) => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const trashRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const popRef = useRef<HTMLDivElement>(null)
  const taRef = useRef<HTMLTextAreaElement | null>(null)
  const outlineFocus = useRef<FieldEl | null>(null) as Focus
  const taFocus = taRef as Focus

  const [zoom, setZoom] = useState(1)
  const [drag, setDrag] = useState<{ src: Src; over: string | null } | null>(null)
  const [armed, setArmed] = useState<string | null>(null)
  const [edit, setEdit] = useState<{ id: string; draft: string } | null>(null)
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null)
  const [, bump] = useState(0)

  /* ---- value + history ---- */
  const valueRef = useRef(value); valueRef.current = value
  const hist = useRef<Flowchart[]>([])
  const last = useRef<{ key: string; t: number }>({ key: '', t: 0 })
  const commit = useCallback((next: Flowchart, coalesce = '') => {
    const now = Date.now()
    if (!(coalesce && last.current.key === coalesce && now - last.current.t < 1200)) { hist.current.push(valueRef.current); if (hist.current.length > 60) hist.current.shift() }
    last.current = { key: coalesce, t: now }
    valueRef.current = next
    onChange(next)
    bump((n) => n + 1)
  }, [onChange])
  const setBlocks = useCallback((blocks: Blocks, coalesce = '') => commit({ ...valueRef.current, blocks }, coalesce), [commit])
  const undo = useCallback(() => {
    const prev = hist.current.pop()
    if (!prev) return
    last.current = { key: '', t: 0 }
    valueRef.current = prev
    setEdit(null)
    onChange(prev)
    bump((n) => n + 1)
  }, [onChange])

  /* ---- compiled output ---- */
  const res = useMemo(() => flowToPython(value), [value])
  const emptyChart = !value.blocks.length
  const errs = emptyChart ? [] : res.errors
  const errorIds = useMemo(() => errs.map(O.errorId).filter((x): x is string => !!x), [errs])

  /* ---- editor popover ---- */
  const openEditor = useCallback((id: string) => {
    const b = O.getBlock(valueRef.current.blocks, id)
    if (!b) return
    setEdit({ id, draft: O.blockText(b) })
  }, [])
  const closeEditor = () => setEdit(null)
  const commitDraft = () => {
    if (!edit) return
    const b = O.getBlock(valueRef.current.blocks, edit.id)
    if (b && O.blockText(b) !== edit.draft) setBlocks(O.replaceBlock(valueRef.current.blocks, edit.id, (x) => O.withText(x, edit.draft)))
    setEdit(null)
  }
  const editBlock = edit ? O.getBlock(value.blocks, edit.id) : null
  useEffect(() => { if (edit && !editBlock) setEdit(null) }, [edit, editBlock])
  useLayoutEffect(() => {
    if (!edit) { setPos(null); return }
    const c = contentRef.current, el = c?.querySelector(`[data-id="${edit.id}"]`)
    if (!c || !el) return
    const cr = c.getBoundingClientRect(), r = el.getBoundingClientRect()
    const w = Math.min(290, cr.width - 8)
    setPos({ left: Math.max(4, Math.min(r.left - cr.left + r.width / 2 - w / 2, cr.width - w - 4)), top: r.bottom - cr.top + 8 })
  }, [edit?.id, value, zoom]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!edit || !pos) return
    const ta = taRef.current
    if (document.activeElement !== ta) { ta?.focus(); ta?.select() }
    popRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [edit?.id, !!pos]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ---- drops ---- */
  const applyDrop = useCallback((src: Src, over: string | null) => {
    if (!over) return
    const blocks = valueRef.current.blocks
    if (over === 'trash') { if (src.kind === 'move') { setEdit(null); setBlocks(O.deleteAt(blocks, src.id)) } return }
    const bar = over.lastIndexOf('|')
    const lp = over.slice(0, bar), idx = Number(over.slice(bar + 1))
    if (src.kind === 'new') {
      setBlocks(O.insertAt(blocks, lp, idx, O.makeBlock(src.key)))
      const id = O.joinId(lp, idx)
      setEdit({ id, draft: '' })
    } else {
      const next = O.moveBlock(blocks, src.id, lp, idx)
      if (next && next !== blocks) { setEdit(null); setBlocks(next) }
    }
  }, [setBlocks])

  /* ---- pointer drag engine ---- */
  const press = useRef<Press | null>(null)
  const dragRef = useRef<{ src: Src; over: string | null } | null>(null)
  const ptr = useRef({ x: 0, y: 0 })
  const raf = useRef(0)

  const placeGhost = () => { const g = ghostRef.current; if (g) g.style.transform = `translate(${ptr.current.x + 14}px, ${ptr.current.y - 34}px)` }
  const pick = (): string | null => {
    const d = dragRef.current, c = canvasRef.current
    if (!d || !c) return null
    const { x, y } = ptr.current
    const tr = trashRef.current?.getBoundingClientRect()
    if (d.src.kind === 'move' && tr && x >= tr.left - 10 && x <= tr.right + 10 && y >= tr.top - 10 && y <= tr.bottom + 10) return 'trash'
    const cr = c.getBoundingClientRect()
    if (x < cr.left - 30 || x > cr.right + 30 || y < cr.top - 30 || y > cr.bottom + 30) return null
    let best: string | null = null, bd = SNAP * SNAP
    c.querySelectorAll<SVGGElement>('.fl-slot:not(.fl-slot-off)').forEach((el) => {
      const r = el.querySelector('.fl-slot-dot')!.getBoundingClientRect()
      const sx = r.left + r.width / 2, sy = r.top + r.height / 2
      if (sx < cr.left || sx > cr.right || sy < cr.top || sy > cr.bottom) return
      const dd = (sx - x) ** 2 + (sy - y) ** 2
      if (dd < bd) { bd = dd; best = el.dataset.slot ?? null }
    })
    return best
  }
  const tick = () => {
    const d = dragRef.current, c = canvasRef.current
    if (!d) return
    if (c) {
      const r = c.getBoundingClientRect(), { x, y } = ptr.current, Z = 56
      const inX = x > r.left - 30 && x < r.right + 30, inY = y > r.top - 30 && y < r.bottom + 30
      const speed = (dist: number) => Math.ceil(((Z - Math.max(0, dist)) / Z) * 18)
      if (inY) { if (x < r.left + Z) c.scrollLeft -= speed(x - r.left); else if (x > r.right - Z) c.scrollLeft += speed(r.right - x) }
      if (inX) { if (y < r.top + Z) c.scrollTop -= speed(y - r.top); else if (y > r.bottom - Z) c.scrollTop += speed(r.bottom - y) }
    }
    if (ptr.current.y < 50) window.scrollBy(0, -12)
    else if (ptr.current.y > window.innerHeight - 50) window.scrollBy(0, 12)
    const over = pick()
    if (over !== d.over) { d.over = over; setDrag({ src: d.src, over }) }
    raf.current = requestAnimationFrame(tick)
  }
  const startDrag = (src: Src) => {
    const p = press.current
    if (!p) return
    p.started = true
    if (p.timer) { clearTimeout(p.timer); p.timer = null }
    setEdit(null); setArmed(null)
    dragRef.current = { src, over: null }
    setDrag({ src, over: null })
    if (p.type === 'touch') navigator.vibrate?.(8)
    cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(tick)
  }
  const endDrag = (drop: boolean) => {
    const d = dragRef.current
    cancelAnimationFrame(raf.current)
    dragRef.current = null
    setDrag(null)
    if (drop && d) applyDrop(d.src, pick2(d))
  }
  const pick2 = (d: { over: string | null }) => d.over

  const api = useRef({ move: (_e: PointerEvent) => {}, up: (_e: PointerEvent) => {}, cancel: () => {}, key: (_e: KeyboardEvent) => {} })
  api.current.move = (e) => {
    ptr.current = { x: e.clientX, y: e.clientY }
    const p = press.current
    if (!p || e.pointerId !== p.pid) return
    if (!p.started) {
      const dist = Math.hypot(e.clientX - p.x, e.clientY - p.y)
      if (p.type === 'touch') { if (dist > 10) { if (p.timer) clearTimeout(p.timer); press.current = null } }
      else if (dist > 5) startDrag(p.src)
    }
    if (p.started) placeGhost()
  }
  api.current.up = (e) => {
    const p = press.current
    if (!p || e.pointerId !== p.pid) return
    press.current = null
    if (p.timer) clearTimeout(p.timer)
    if (p.started) { ptr.current = { x: e.clientX, y: e.clientY }; const d = dragRef.current; if (d) d.over = pick(); endDrag(true) }
    else if (p.src.kind === 'move') openEditor(p.src.id)
    else setArmed((a) => (a === (p.src as { key: string }).key ? null : (p.src as { key: string }).key))
  }
  api.current.cancel = () => {
    const p = press.current
    if (p?.timer) clearTimeout(p.timer)
    press.current = null
    if (dragRef.current) endDrag(false)
  }
  api.current.key = (e) => {
    const t = e.target as HTMLElement | null
    const typing = !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
    if (e.key === 'Escape') { if (dragRef.current) { e.preventDefault(); api.current.cancel() } else if (armed) setArmed(null); return }
    if (typing) return
    const root = rootRef.current, ae = document.activeElement
    const mine = !!root && (root.contains(ae) || ae === document.body || !ae)
    if (!mine) return
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === 'z') { e.preventDefault(); undo() }
  }
  useEffect(() => {
    const mv = (e: PointerEvent) => api.current.move(e), up = (e: PointerEvent) => api.current.up(e), cn = () => api.current.cancel(), kd = (e: KeyboardEvent) => api.current.key(e)
    // a started touch drag must not scroll the page/canvas
    const tm = (e: TouchEvent) => { if (dragRef.current && e.cancelable) e.preventDefault() }
    window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', cn)
    window.addEventListener('keydown', kd); window.addEventListener('touchmove', tm, { passive: false })
    return () => {
      window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', cn)
      window.removeEventListener('keydown', kd); window.removeEventListener('touchmove', tm); cancelAnimationFrame(raf.current)
    }
  }, [])
  useLayoutEffect(() => { if (drag) placeGhost() }, [!!drag]) // eslint-disable-line react-hooks/exhaustive-deps

  const beginPress = (src: Src, e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    if (e.pointerType !== 'touch') e.preventDefault()
    if (edit) commitDraft()
    ptr.current = { x: e.clientX, y: e.clientY }
    const p: Press = { src, x: e.clientX, y: e.clientY, pid: e.pointerId, type: e.pointerType, started: false, timer: null }
    if (e.pointerType === 'touch') p.timer = window.setTimeout(() => { if (press.current === p) { startDrag(src); placeGhost() } }, 260)
    press.current = p
  }

  /* ---- zoom with ctrl/cmd + wheel (trackpad pinch) ---- */
  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const wh = (e: WheelEvent) => { if (!(e.ctrlKey || e.metaKey)) return; e.preventDefault(); setZoom((z) => Math.max(0.5, Math.min(1.8, +(z - e.deltaY * 0.005).toFixed(2)))) }
    c.addEventListener('wheel', wh, { passive: false })
    return () => c.removeEventListener('wheel', wh)
  }, [])

  const dragSrcId = drag?.src.kind === 'move' ? drag.src.id : null
  const ghostKey = drag ? (drag.src.kind === 'new' ? drag.src.key : kindKey(O.getBlock(value.blocks, drag.src.id) ?? { t: 'process', text: '' })) : ''
  const hot = drag && drag.over && drag.over !== 'trash' ? drag.over : null
  const selId = edit?.id ?? null
  const armedLabel = armed ? PAL.find((p) => p.key === armed)?.label : null
  const jumpTo = (id: string) => {
    openEditor(id)
    setTimeout(() => contentRef.current?.querySelector(`[data-id="${id}"]`)?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' }), 0)
  }
  const delSel = () => { if (!edit) return; const id = edit.id; setEdit(null); setBlocks(O.deleteAt(valueRef.current.blocks, id)) }

  return (
    <div className="fb fb-editor" ref={rootRef}>
      <div className="fb-bar">
        <button type="button" className="fb-btn" onClick={undo} disabled={!hist.current.length} aria-label="Undo (Ctrl or Cmd + Z)" title="Undo (Ctrl/Cmd + Z)">↶ Undo</button>
        <span className="fb-hint">{armed ? `Tap a + on an arrow to place “${armedLabel}”.` : 'Drag a symbol onto an arrow. Tap a shape to edit it; drag it to move it.'}</span>
        <span className="fb-zoom" role="group" aria-label="Zoom">
          <button type="button" className="fb-btn" onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.15).toFixed(2)))} aria-label="Zoom out">−</button>
          <button type="button" className="fb-btn fb-zoom-v" onClick={() => setZoom(1)} aria-label="Reset zoom">{Math.round(zoom * 100)}%</button>
          <button type="button" className="fb-btn" onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.15).toFixed(2)))} aria-label="Zoom in">+</button>
        </span>
      </div>

      <div className="fb-main">
        <div className="fb-canvas-wrap">
          <div className="fb-canvas" ref={canvasRef} onPointerDown={(e) => { if (edit && !(e.target as Element).closest?.('.fl-blk, .fb-pop')) commitDraft() }}>
            <div className="fb-content" ref={contentRef}>
              <FlowView
                flow={value} editable zoom={zoom} selected={selId} errorIds={errorIds} dragId={dragSrcId} dragging={!!drag || !!armed} hotSlot={hot}
                onBlockPointerDown={(id, e) => beginPress({ kind: 'move', id }, e)}
                onBlockActivate={openEditor}
                onSlotClick={(lp, idx) => { if (armed) { applyDrop({ kind: 'new', key: armed }, `${lp}|${idx}`); setArmed(null) } }}
              />
              {edit && editBlock && pos ? (
                <div className="fb-pop" ref={popRef} style={{ left: pos.left, top: pos.top }} role="dialog" aria-label="Edit block"
                  onBlur={(e) => { if (!popRef.current?.contains(e.relatedTarget as Node | null)) commitDraft() }}>
                  <div className="fb-pop-h">
                    <span>{editBlock.t === 'if' ? 'Decision: condition' : editBlock.t === 'while' ? 'While: condition' : editBlock.t === 'repeat' ? 'Repeat until' : TAG[editBlock.t]}</span>
                    {editBlock.t === 'io' ? (
                      <span className="seg" role="group" aria-label="I/O type">
                        {(['in', 'out'] as const).map((d) => (
                          <button type="button" key={d} className={editBlock.dir === d ? 'on' : ''} onPointerDown={(e) => e.preventDefault()}
                            onClick={() => setBlocks(O.replaceBlock(valueRef.current.blocks, edit.id, (x) => (x.t === 'io' ? { ...x, dir: d } : x)))}>{d === 'in' ? 'input' : 'output'}</button>
                        ))}
                      </span>
                    ) : null}
                    <button type="button" className="fb-pop-del" onPointerDown={(e) => e.preventDefault()} onClick={delSel} aria-label="Delete block">Delete</button>
                  </div>
                  <textarea ref={taRef} className="fb-in fb-pop-in" rows={Math.min(4, Math.max(1, edit.draft.split('\n').length))} value={edit.draft} spellCheck={false} autoCapitalize="off" autoCorrect="off"
                    placeholder={PLACEHOLDER[editBlock.t === 'io' ? editBlock.dir : editBlock.t]} aria-label="Block text"
                    onChange={(e) => setEdit({ id: edit.id, draft: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); commitDraft() }
                      else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeEditor() }
                    }} />
                  <Syms focus={taFocus} />
                  <div className="fb-pop-f">Enter = OK · Esc = cancel · Shift+Enter = new line</div>
                </div>
              ) : null}
            </div>
          </div>
          {drag && drag.src.kind === 'move' ? (
            <div ref={trashRef} className={'fb-trash' + (drag.over === 'trash' ? ' fb-trash-hot' : '')} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" /></svg>
              <span>Drop to delete</span>
            </div>
          ) : null}
        </div>

        <div className="fb-palette" role="group" aria-label="Symbol palette">
          <div className="fb-pal-h">Symbols</div>
          <div className="fb-pal-items">
            {PAL.map((p) => (
              <button type="button" key={p.key} className={'fb-pal-item' + (armed === p.key ? ' on' : '')} aria-pressed={armed === p.key}
                title={`${p.label}: drag onto an arrow, or tap then tap a +`}
                onPointerDown={(e) => beginPress({ kind: 'new', key: p.key }, e)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setArmed((a) => (a === p.key ? null : p.key)) } }}
                onContextMenu={(e) => e.preventDefault()}>
                <SymbolIcon k={p.key} />
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {emptyChart ? <div className="fb-note">Empty chart: drop a symbol on the arrow between Start and End.</div> : null}

      <div className="fb-live">
        {errs.length ? (
          <ul className="fb-errs" role="alert">
            {errs.map((m, i) => {
              const id = O.errorId(m)
              return <li key={i}>{id ? <button type="button" onClick={() => jumpTo(id)}>{m}</button> : m}</li>
            })}
          </ul>
        ) : !emptyChart ? <div className="fb-ok">Compiles to Python with no errors.</div> : null}
        <details className="fb-det">
          <summary>Python generated from this flowchart</summary>
          <pre className="fb-code">{res.code || '# (nothing yet)'}</pre>
        </details>
        <details className="fb-det fb-outline">
          <summary>Outline: edit as a list (keyboard friendly, no dragging)</summary>
          <Syms focus={outlineFocus} label="Symbols:" />
          <List blocks={value.blocks} onChange={(b) => setBlocks(b, 'outline')} focus={outlineFocus} title="The flowchart is still empty (only Start and End)." />
        </details>
      </div>

      {drag ? (
        <div className="fb-ghost" ref={ghostRef} aria-hidden="true"><SymbolIcon k={ghostKey} size={78} /></div>
      ) : null}
    </div>
  )
}

type FlowMode = 'blocks' | 'mermaid'
const MODE_KEY = 'bk.flowMode'
const readMode = (): FlowMode => { try { return localStorage.getItem(MODE_KEY) === 'mermaid' ? 'mermaid' : 'blocks' } catch { return 'blocks' } }

export function FlowBuilder({ value, onChange, readOnly }: { value: Flowchart; onChange: (f: Flowchart) => void; readOnly?: boolean }) {
  const [mode, setModeState] = useState<FlowMode>(readMode)
  const setMode = (m: FlowMode) => { setModeState(m); try { localStorage.setItem(MODE_KEY, m) } catch { /* ignore */ } }
  if (readOnly) return <div className="fb fb-ro"><FlowView flow={value} /></div>
  return (
    <div className="fb-wrap">
      <div className="seg fb-mode" role="tablist" aria-label="Flowchart input">
        <button type="button" role="tab" aria-selected={mode === 'blocks'} className={mode === 'blocks' ? 'on' : ''} onClick={() => setMode('blocks')}>Drag &amp; drop</button>
        <button type="button" role="tab" aria-selected={mode === 'mermaid'} className={mode === 'mermaid' ? 'on' : ''} onClick={() => setMode('mermaid')}>Mermaid text</button>
      </div>
      {mode === 'blocks' ? <Editor value={value} onChange={onChange} /> : <FlowMermaid value={value} onChange={onChange} />}
    </div>
  )
}
