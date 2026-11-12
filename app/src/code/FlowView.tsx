// Read-only flowchart renderer: auto-layout of the FlowBlock tree into SVG (course style: Start/End terminators,
// parallelogram I/O, rectangle process, diamond decisions with Yes/No, loop-back arrows, predefined-process boxes).
// Optional editable mode (used by FlowBuilder): every arrow / empty branch gets a drop slot `data-slot="<listPath>|<index>"`,
// blocks get pointer handlers. With `editable` off the output is identical to the read-only view.
// `active` is a block id from flow.ts (`"2"`, `"3.body.1"`, `"1.then.0"`): that block is highlighted.
import { useId, type ReactNode, type PointerEvent as RPointerEvent } from 'react'
import type { Flowchart, FlowBlock } from '../types'
import { slotValid } from './flowOps.ts'
import './flow.css'

interface Metrics { ch: number; lh: number; fs: number; gap: number; wrap: number; wrapDia: number }
const FULL: Metrics = { ch: 7.7, lh: 17, fs: 12.5, gap: 26, wrap: 28, wrapDia: 16 }
const COMPACT: Metrics = { ch: 6.7, lh: 14.5, fs: 11, gap: 18, wrap: 24, wrapDia: 14 }

interface Lay { L: number; R: number; h: number; draw: (cx: number, y: number) => void }
type Kind = 'term' | 'io' | 'proc' | 'call' | 'dia'

function wrapText(text: string, max: number): string[] {
  const out: string[] = []
  for (const para of (text || '').split('\n')) {
    let cur = ''
    for (const w of para.split(/\s+/).filter(Boolean)) {
      if (!cur) cur = w
      else if ((cur + ' ' + w).length <= max) cur += ' ' + w
      else { out.push(cur); cur = w }
      while (cur.length > max + 6) { out.push(cur.slice(0, max)); cur = cur.slice(max) }
    }
    out.push(cur)
  }
  return out.length ? out : ['']
}

const IO_WORD = /^(input|output|read|baca|print|write|tulis|cetak|masukan|tampilkan|display)\b/i
function ioDisplay(dir: 'in' | 'out', text: string): string {
  const t = text.trim()
  if (!t) return dir === 'in' ? 'input( )' : 'output( )'
  return t.split('\n').map((l) => (IO_WORD.test(l.trim()) ? l.trim() : `${dir === 'in' ? 'input' : 'output'}(${l.trim()})`)).join('\n')
}

export interface FlowEditProps {
  /** show drop slots on every arrow and make blocks interactive */
  editable?: boolean
  /** selected block id (highlighted, being edited) */
  selected?: string | null
  /** block ids to outline in red (flowToPython errors) */
  errorIds?: string[]
  /** id of the block being dragged: it is dimmed and slots that would be invalid are hidden */
  dragId?: string | null
  /** true while any drag (also from the palette) is in progress: slots grow */
  dragging?: boolean
  /** slot key ("<listPath>|<index>") highlighted as the current drop target */
  hotSlot?: string | null
  /** canvas zoom factor (editable mode only) */
  zoom?: number
  onBlockPointerDown?: (id: string, e: RPointerEvent) => void
  /** Enter / Space on a focused block */
  onBlockActivate?: (id: string) => void
  /** tap on a slot (tap-to-place) */
  onSlotClick?: (listPath: string, index: number) => void
}

export function FlowView({ flow, active, compact, editable, selected, errorIds, dragId, dragging, hotSlot, zoom = 1, onBlockPointerDown, onBlockActivate, onSlotClick }: { flow: Flowchart; active?: string | null; compact?: boolean } & FlowEditProps) {
  const edit = !!editable
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const M = compact && !edit ? COMPACT : FULL
  const els: ReactNode[] = []
  let key = 0
  const k = () => `e${key++}`
  const arrowId = `fl-arr-${uid}`

  /* ---- drawing primitives ---- */
  const edge = (pts: [number, number][], arrow = false) => {
    els.push(<path key={k()} className="fl-edge" d={'M' + pts.map((p) => `${p[0]} ${p[1]}`).join(' L')} markerEnd={arrow ? `url(#${arrowId})` : undefined} />)
  }
  const label = (x: number, y: number, t: string, anchor: 'start' | 'middle' | 'end' = 'middle') => {
    els.push(<text key={k()} className="fl-lbl" x={x} y={y} textAnchor={anchor}>{t}</text>)
  }
  const dims = (kind: Kind, text: string) => {
    const lines = wrapText(text, kind === 'dia' ? M.wrapDia : M.wrap)
    const tw = Math.max(...lines.map((l) => l.length)) * M.ch
    const th = lines.length * M.lh
    let w: number, h: number
    switch (kind) {
      case 'term': w = Math.max(tw + 44, 76); h = M.lh + 16; break
      case 'io': w = Math.max(tw + 56, 90); h = Math.max(th + 16, 36); break
      case 'dia': w = Math.max(tw * 1.55 + 46, 104); h = Math.max(th * 1.45 + 26, 62); break
      default: w = Math.max(tw + 30, 70); h = Math.max(th + 16, 36)
    }
    return { lines, w, h }
  }
  const shape = (kind: Kind, text: string, id: string | null, empty = false): Lay & { w: number } => {
    const d = dims(kind, text)
    return {
      L: d.w / 2, R: d.w / 2, h: d.h, w: d.w,
      draw: (cx, y) => {
        const x0 = cx - d.w / 2, cy = y + d.h / 2
        let body: ReactNode
        switch (kind) {
          case 'term': body = <rect className="fl-shape fl-term" x={x0} y={y} width={d.w} height={d.h} rx={d.h / 2} />; break
          case 'io': { const s = 13; body = <polygon className="fl-shape fl-io" points={`${x0 + s},${y} ${x0 + d.w},${y} ${x0 + d.w - s},${y + d.h} ${x0},${y + d.h}`} />; break }
          case 'dia': body = <polygon className="fl-shape fl-dia" points={`${cx},${y} ${x0 + d.w},${cy} ${cx},${y + d.h} ${x0},${cy}`} />; break
          case 'call': body = <g><rect className="fl-shape fl-call" x={x0} y={y} width={d.w} height={d.h} /><line className="fl-bar" x1={x0 + 9} y1={y} x2={x0 + 9} y2={y + d.h} /><line className="fl-bar" x1={x0 + d.w - 9} y1={y} x2={x0 + d.w - 9} y2={y + d.h} /></g>; break
          default: body = <rect className="fl-shape fl-proc" x={x0} y={y} width={d.w} height={d.h} />
        }
        const t0 = cy - ((d.lines.length - 1) * M.lh) / 2
        const live = edit && id !== null
        const cls = 'fl-blk' + (id !== null && id === active ? ' fl-on' : '') + (live ? ' fl-int' : '') + (live && id === selected ? ' fl-sel' : '')
          + (live && errorIds?.includes(id!) ? ' fl-err' : '') + (live && dragId != null && (id === dragId || id!.startsWith(dragId + '.')) ? ' fl-drag' : '')
        els.push(
          <g key={k()} className={cls} data-id={id ?? undefined}
            {...(live ? {
              tabIndex: 0, role: 'button', 'aria-label': text.replace(/\n/g, ' '),
              onPointerDown: (e: RPointerEvent) => onBlockPointerDown?.(id!, e),
              onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onBlockActivate?.(id!) } },
            } : {})}>
            {body}
            {d.lines.map((l, i) => <text key={i} className={'fl-txt' + (empty ? ' fl-txt-ph' : '')} x={cx} y={t0 + i * M.lh} textAnchor="middle" dominantBaseline="central" fontSize={M.fs}>{l}</text>)}
          </g>,
        )
      },
    }
  }
  const placeholder = (listPath: string): Lay => edit ? ({
    L: 44, R: 44, h: 32,
    draw: (cx, y) => { els.push(<g key={k()}><rect className="fl-ph fl-ph-edit" x={cx - 44} y={y} width={88} height={32} rx={8} /><text className="fl-lbl" x={cx + 11} y={y + 17} textAnchor="middle" dominantBaseline="central">drop here</text></g>); slot(cx - 32, y + 16, listPath, 0) },
  }) : ({
    L: 34, R: 34, h: 28,
    draw: (cx, y) => { els.push(<g key={k()}><rect className="fl-ph" x={cx - 34} y={y} width={68} height={28} rx={6} /><text className="fl-lbl" x={cx} y={y + 15} textAnchor="middle" dominantBaseline="central">…</text></g>) },
  })

  /* ---- drop slots (editable mode only) ---- */
  function slot(x: number, y: number, listPath: string, idx: number) {
    if (!edit) return
    const key = `${listPath}|${idx}`
    const off = dragId != null && !slotValid(dragId, listPath, idx)
    els.push(
      <g key={k()} className={'fl-slot' + (hotSlot === key ? ' fl-slot-hot' : '') + (off ? ' fl-slot-off' : '') + (dragging ? ' fl-slot-live' : '')} data-slot={key}
        onClick={() => onSlotClick?.(listPath, idx)}>
        <circle className="fl-slot-hit" cx={x} cy={y} r={15} />
        <circle className="fl-slot-dot" cx={x} cy={y} r={6} />
        <path className="fl-slot-plus" d={`M${x - 3} ${y} H${x + 3} M${x} ${y - 3} V${y + 3}`} />
      </g>,
    )
  }

  /* ---- layout ---- */
  const G = edit ? 36 : M.gap, MG = edit ? 34 : G * 0.8, LO = edit ? 15 : 6
  const seq = (lays: Lay[], listPath = '', off = 1): Lay => ({
    L: Math.max(0, ...lays.map((l) => l.L)), R: Math.max(0, ...lays.map((l) => l.R)),
    h: lays.reduce((a, l) => a + l.h, 0) + G * Math.max(0, lays.length - 1),
    draw: (cx, y) => {
      let cur = y
      lays.forEach((l, i) => {
        l.draw(cx, cur); cur += l.h
        if (i < lays.length - 1) { edge([[cx, cur], [cx, cur + G]], true); slot(cx, cur + G / 2, listPath, i + off); cur += G }
      })
    },
  })
  /** a block list; `n` = number of blocks (entry/exit drop slots are drawn by the parent when n > 0) */
  const layList = (blocks: FlowBlock[] | undefined, prefix: string): (Lay & { n: number }) | null =>
    blocks && blocks.length ? { ...seq(blocks.map((b, i) => layBlock(b, prefix ? `${prefix}.${i}` : String(i))), prefix), n: blocks.length } : null
  const listOrPh = (blocks: FlowBlock[] | undefined, prefix: string): Lay & { n: number } => layList(blocks, prefix) ?? { ...placeholder(prefix), n: 0 }

  const layBlock = (b: FlowBlock, id: string): Lay => {
    switch (b.t) {
      case 'io': return shape('io', ioDisplay(b.dir, b.text), id)
      case 'process': return shape('proc', edit && !b.text.trim() ? 'process' : b.text || ' ', id, edit && !b.text.trim())
      case 'call': return shape('call', edit && !b.text.trim() ? 'call()' : b.text || ' ', id, edit && !b.text.trim())
      case 'if': {
        const dia = shape('dia', b.cond || '?', id)
        const thP = `${id}.then`, elP = `${id}.else`
        const th = edit ? listOrPh(b.then, thP) : layList(b.then, thP), el = edit ? listOrPh(b.else, elP) : layList(b.else, elP)
        const hw = dia.w / 2
        if (th && el) {
          const xl = Math.max(th.R + 16, hw + 22), xr = Math.max(el.L + 16, hw + 22)
          const hb = Math.max(th.h, el.h)
          return {
            L: Math.max(xl + th.L, hw), R: Math.max(xr + el.R, hw), h: dia.h + G + hb + MG,
            draw: (cx, y) => {
              dia.draw(cx, y)
              const yd = y + dia.h / 2, y0 = y + dia.h + G, yb = y0 + hb + MG
              edge([[cx - hw, yd], [cx - xl, yd], [cx - xl, y0]], true); label(cx - hw - 4, yd - 5, 'Yes', 'end')
              edge([[cx + hw, yd], [cx + xr, yd], [cx + xr, y0]], true); label(cx + hw + 4, yd - 5, 'No', 'start')
              th.draw(cx - xl, y0); el.draw(cx + xr, y0)
              edge([[cx - xl, y0 + th.h], [cx - xl, yb], [cx, yb]])
              edge([[cx + xr, y0 + el.h], [cx + xr, yb], [cx, yb]])
              if (edit) {
                if (th.n) { slot(cx - xl, y0 - 16, thP, 0); slot(cx - xl, (y0 + th.h + yb) / 2, thP, th.n) }
                if (el.n) { slot(cx + xr, y0 - 16, elP, 0); slot(cx + xr, (y0 + el.h + yb) / 2, elP, el.n) }
              }
            },
          }
        }
        const one = th ?? el
        if (one) {
          const yes = !!th
          const side = Math.max(one.R + 18, hw + 24)
          return {
            L: Math.max(one.L, hw), R: Math.max(side, hw), h: dia.h + G + one.h + MG,
            draw: (cx, y) => {
              dia.draw(cx, y)
              const yd = y + dia.h / 2, y0 = y + dia.h + G, yb = y0 + one.h + MG
              edge([[cx, y + dia.h], [cx, y0]], true); label(cx + 6, y + dia.h + 13, yes ? 'Yes' : 'No', 'start')
              one.draw(cx, y0)
              edge([[cx, y0 + one.h], [cx, yb]])
              edge([[cx + hw, yd], [cx + side, yd], [cx + side, yb], [cx, yb]]); label(cx + hw + 4, yd - 5, yes ? 'No' : 'Yes', 'start')
            },
          }
        }
        return { L: hw, R: hw, h: dia.h, draw: (cx, y) => dia.draw(cx, y) }
      }
      case 'while': {
        const dia = shape('dia', b.cond || '?', id)
        const bodyP = `${id}.body`
        const body = listOrPh(b.body, bodyP)
        const hw = dia.w / 2
        const xr = Math.max(body.R + 18, hw + 26), xl = Math.max(body.L + 18, hw + 26)
        return {
          L: xl, R: xr, h: dia.h + G + body.h + MG * 2,
          draw: (cx, y) => {
            dia.draw(cx, y)
            const yd = y + dia.h / 2, y0 = y + dia.h + G, yl = y0 + body.h + MG, ye = yl + MG
            edge([[cx, y + dia.h], [cx, y0]], true); label(cx + LO, y + dia.h + 13, 'Yes', 'start')
            body.draw(cx, y0)
            edge([[cx, y0 + body.h], [cx, yl], [cx + xr, yl], [cx + xr, yd], [cx + hw + 1, yd]], true)
            edge([[cx - hw, yd], [cx - xl, yd], [cx - xl, ye], [cx, ye]]); label(cx - hw - 4, yd - 5, 'No', 'end')
            if (edit && body.n) { slot(cx, y0 - 17, bodyP, 0); slot(cx, y0 + body.h + MG / 2, bodyP, body.n) }
          },
        }
      }
      case 'repeat': {
        const dia = shape('dia', b.until || '?', id)
        const bodyP = `${id}.body`
        const body = listOrPh(b.body, bodyP)
        const hw = dia.w / 2
        const xr = Math.max(body.R + 18, hw + 26)
        const J = edit ? 40 : 28
        return {
          L: Math.max(body.L, hw), R: xr, h: J + body.h + G + dia.h,
          draw: (cx, y) => {
            const yj = y + J / 2, yb0 = y + J
            edge([[cx, y], [cx, yj]]); edge([[cx, yj], [cx, yb0]], true)
            body.draw(cx, yb0)
            const yd0 = yb0 + body.h + G
            edge([[cx, yb0 + body.h], [cx, yd0]], true)
            dia.draw(cx, yd0)
            const ym = yd0 + dia.h / 2
            edge([[cx + hw, ym], [cx + xr, ym], [cx + xr, yj], [cx + 1, yj]], true); label(cx + hw + 4, ym - 5, 'No', 'start')
            label(cx + LO, yd0 + dia.h + 13, 'Yes', 'start')
            if (edit && body.n) { slot(cx, y + J - 12, bodyP, 0); slot(cx, yb0 + body.h + G / 2, bodyP, body.n) }
          },
        }
      }
    }
  }

  const blocks = flow?.blocks ?? []
  const start = shape('term', 'Start', null), end = shape('term', 'End', null)
  const root = seq([start, ...blocks.map((b, i) => layBlock(b, String(i))), end], '', 0)
  const mx = edit ? 28 : 14
  const W = Math.ceil(root.L + root.R + mx * 2), H = Math.ceil(root.h + mx * 2)
  root.draw(mx + root.L, mx)

  const svgProps = edit
    ? { width: Math.round(W * zoom), height: Math.round(H * zoom), style: { touchAction: 'pan-x pan-y' } as const }
    : { width: W, height: H, style: { maxWidth: '100%', height: 'auto', minWidth: Math.min(W, compact ? 280 : 340) } as const }
  const svg = (
    <svg className="fl-svg" viewBox={`0 0 ${W} ${H}`} {...svgProps} role="img" aria-label="Flowchart">
      <defs>
        <marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" className="fl-head" /></marker>
      </defs>
      {els}
    </svg>
  )
  if (edit) return <div className={'fl-wrap fl-editing' + (dragging ? ' fl-dragging' : '')}>{svg}</div>

  return (
    <div className={'fl-wrap' + (compact ? ' fl-compact' : '')}>
      {flow?.title ? <div className="fl-title">{flow.title}</div> : null}
      <div className="fl-scroll">{svg}</div>
    </div>
  )
}
