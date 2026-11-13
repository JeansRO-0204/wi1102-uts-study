// Shared UI kit for the "interactive working" workbenches. Widgets compose these; styles live in styles.css (.wb-*).
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import katex from 'katex'
import type { DeckId, Mode, PageRef } from '../types'
import { IconCheck, IconChevronLeft, IconChevronRight, LEVEL_ICON } from './icons'

/** Id of the Workspace panel a component is rendered in (null outside the Workspace). */
export const PanelIdCtx = createContext<string | null>(null)

/* ---------- persistence ---------- */
export function useLocalState<T>(key: string, init: T): [T, (v: T | ((p: T) => T)) => void] {
  const [v, setV] = useState<T>(() => {
    try { const s = localStorage.getItem(key); if (s != null) return JSON.parse(s) as T } catch { /* ignore */ }
    return init
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* ignore */ } }, [key, v])
  return [v, setV]
}

/* ---------- text ---------- */
/** Markdown with GFM tables and KaTeX math ($x$, $$x$$). */
export function Md({ children, inline }: { children: string; inline?: boolean }) {
  // inline markdown lives inside <p>, <button>, <li>…: render with phrasing elements only (span wrapper, p → span)
  if (inline) return (
    <span className="md md-inline">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={{ p: 'span' }}>{children}</ReactMarkdown>
    </span>
  )
  return (
    <div className="md">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{children}</ReactMarkdown>
    </div>
  )
}
/** Inline TeX, e.g. <Tex>{'E = h\\nu'}</Tex>. Use for formulas inside widgets. */
export function Tex({ children, block }: { children: string; block?: boolean }) {
  const html = katex.renderToString(children, { throwOnError: false, displayMode: !!block })
  return <span className={block ? 'tex tex-block' : 'tex'} dangerouslySetInnerHTML={{ __html: html }} />
}

/* ---------- source pages (slides, past papers, practicum…) ---------- */
/** Page image of a materials/ PDF, rendered by build/render.sh to public/pages/<src>/NNN.jpg */
export function pageSrc(src: string, n: number) { return `pages/${src}/${String(n).padStart(3, '0')}.jpg` }
/** Page counts per source, filled from public/pages/index.json at startup (see App.tsx). */
export const PAGE_COUNT: Record<string, number> = {}
type PageOpen = (r: PageRef) => void
export const PageCtx = createContext<PageOpen>(() => {})
/** Short label for a source id: 'D06_Array' → 'D06', 'Praktikum3_LoopArray' → 'Prak3', else the id. */
export function srcShort(src: string) {
  const m = src.match(/^(D\d\d)_/) ?? src.match(/^Praktikum(\d)/)
  if (m) return src.startsWith('Praktikum') ? 'Prak' + m[1] : m[1]
  return src.replace(/_/g, ' ')
}
/** Clickable citation chip "[D06 h12]" that opens the page lightbox. */
export function PageChip({ r }: { r: PageRef }) {
  const open = useContext(PageCtx)
  return <button className="slide-ref" onClick={() => open(r)} title="Open the source page">{srcShort(r.src)} p{r.page}</button>
}
export function PageLightbox({ at, onClose, onNav }: { at: PageRef | null; onClose: () => void; onNav: (n: number) => void }) {
  const total = at ? PAGE_COUNT[at.src] ?? 0 : 0
  useEffect(() => {
    if (!at) return
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (isTyping(e)) return
      if (e.key === 'ArrowRight' && (!total || at.page < total)) onNav(at.page + 1)
      if (e.key === 'ArrowLeft' && at.page > 1) onNav(at.page - 1)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [at, total, onClose, onNav])
  if (!at) return null
  return (
    <div className="lightbox" onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={pageSrc(at.src, at.page)} alt={`${at.src} page ${at.page}`} />
        <figcaption>
          <button disabled={at.page <= 1} onClick={() => onNav(at.page - 1)} aria-label="Previous page"><IconChevronLeft size={16} /></button>
          <span>{srcShort(at.src)} · page {at.page}{total ? ` / ${total}` : ''}</span>
          <button disabled={!!total && at.page >= total} onClick={() => onNav(at.page + 1)} aria-label="Next page"><IconChevronRight size={16} /></button>
          <a href={`#/library/${at.src}/${at.page}`} onClick={onClose}>Open in library</a>
          <button onClick={onClose}>Close</button>
        </figcaption>
      </figure>
    </div>
  )
}

/* ---------- workbench ---------- */
export type Level = 'ok' | 'err' | 'warn' | 'hint' | 'info'
export interface Note { level: Level; msg: string }

/**
 * Frame for every interactive widget: title, Learn/Test toggle (hidden when `mode` is forced by a task),
 * reset button, optional toolbar on the right.
 */
export function Workbench({ title, subtitle, mode, onMode, onReset, tools, compact, children }: {
  title: string; subtitle?: ReactNode; mode?: Mode; onMode?: (m: Mode) => void; onReset?: () => void
  tools?: ReactNode; compact?: boolean; children: ReactNode
}) {
  return (
    <section className={'wb' + (compact ? ' wb-compact' : '')}>
      <header className="wb-head">
        <div className="wb-title"><h3>{title}</h3>{subtitle && <small>{subtitle}</small>}</div>
        <div className="wb-tools">
          {tools}
          {mode && onMode && <ModeToggle mode={mode} onChange={onMode} />}
          {onReset && <button className="btn ghost" onClick={onReset} title="Start over">↺ Reset</button>}
        </div>
      </header>
      <div className="wb-body">{children}</div>
    </section>
  )
}

export function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="seg" title="Learn: hints after each step. Test: no hints until you press Check.">
      <button className={mode === 'learn' ? 'on' : ''} onClick={() => onChange('learn')}>Learn</button>
      <button className={mode === 'test' ? 'on' : ''} onClick={() => onChange('test')}>Test</button>
    </div>
  )
}

/** Mode state for a widget: forced by props.mode if given (practice), else user-toggleable and remembered. */
export function useMode(forced?: Mode, key = 'bk.mode'): [Mode, ((m: Mode) => void) | undefined] {
  const [m, setM] = useLocalState<Mode>(key, 'learn')
  return forced ? [forced, undefined] : [m, setM]
}

export type StepStatus = 'locked' | 'active' | 'done' | 'error'
/** One numbered step of a worked procedure. In learn mode, later steps stay `locked` until earlier ones are done. */
export function Step({ n, title, status, children, notes }: {
  n: number; title: ReactNode; status: StepStatus; children?: ReactNode; notes?: Note[]
}) {
  return (
    <div className={'wb-step ' + status}>
      <div className="wb-step-head">
        <span className="wb-step-n">{status === 'done' ? <IconCheck size={14} style={{ strokeWidth: 2.6 }} /> : status === 'error' ? '!' : n}</span>
        <span className="wb-step-title">{title}</span>
      </div>
      {status !== 'locked' && <div className="wb-step-body">{children}{notes && <Feedback notes={notes} />}</div>}
    </div>
  )
}

/** List of feedback lines (✓ correct, ✗ error with reason, ⚠ warning, 💡 hint). Markdown+math allowed. */
export function Feedback({ notes }: { notes: Note[] }) {
  if (!notes.length) return null
  return (
    <ul className="wb-fb">
      {notes.map((n, i) => (
        <li key={i} className={n.level}><span className="ic">{(() => { const I = LEVEL_ICON[n.level]; return <I size={16} /> })()}</span><Md inline>{n.msg}</Md></li>
      ))}
    </ul>
  )
}

/** Overall verdict banner after the final Check. */
export function Verdict({ correct, title, children }: { correct: boolean | 'partial'; title: string; children?: ReactNode }) {
  const cls = correct === true ? 'ok' : correct === 'partial' ? 'warn' : 'err'
  return <div className={'wb-verdict ' + cls}><b>{title}</b>{children}</div>
}

/** True if `v` matches `answer` within tolerance (default 2 % relative). */
export function within(v: number, answer: number, tol: { rel?: number; abs?: number } = {}) {
  if (!Number.isFinite(v)) return false
  if (tol.abs != null) return Math.abs(v - answer) <= tol.abs
  const rel = tol.rel ?? 0.02
  return answer === 0 ? Math.abs(v) < 1e-12 : Math.abs((v - answer) / answer) <= rel
}
/** Parses "6.63e-34", "6.63x10^-34", "6.63×10⁻³⁴", "6,63" etc. Returns NaN if unparseable. */
export function parseNum(s: string): number {
  const sup: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+' }
  let t = s.trim().replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, (c) => sup[c]).replace(/\s/g, '').replace(',', '.')
  t = t.replace(/[x×*]10\^?\(?([+-]?\d+)\)?/i, 'e$1')
  if (!/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(t)) return NaN
  return Number(t)
}
/** Number input that accepts scientific notation; shows ✓/✗ state when `state` is given. */
export function NumInput({ value, onChange, unit, placeholder, state, width = 130, disabled }: {
  value: string; onChange: (s: string) => void; unit?: ReactNode; placeholder?: string
  state?: 'ok' | 'err' | null; width?: number; disabled?: boolean
}) {
  return (
    <span className={'num-in ' + (state ?? '')}>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder ?? 'e.g. 4.86e-7'} style={{ width }} disabled={disabled} inputMode="decimal" />
      {unit && <span className="unit">{unit}</span>}
    </span>
  )
}

/** Format a number in scientific notation for display: 4.861e-7 → "4.86 × 10⁻⁷". */
export function sci(x: number, sig = 3): string {
  if (!Number.isFinite(x)) return '—'
  if (x === 0) return '0'
  const e = Math.floor(Math.log10(Math.abs(x)))
  if (e >= -2 && e <= 4) return Number(x.toPrecision(sig)).toString()
  const m = x / 10 ** e
  const sup = String(e).replace(/[-0-9]/g, (c) => '⁻⁰¹²³⁴⁵⁶⁷⁸⁹'['-0123456789'.indexOf(c)])
  return `${m.toFixed(sig - 1)} × 10${sup}`
}



/** Records a practice/widget attempt for per-topic progress (read by practice/Progress). */
export function recordAttempt(a: { id: string; deck: DeckId; topic: string; correct: boolean; score?: number }) {
  try {
    const log = JSON.parse(localStorage.getItem('bk.attempts') || '[]') as unknown[]
    log.push({ ...a, t: Date.now() })
    localStorage.setItem('bk.attempts', JSON.stringify(log.slice(-5000)))
  } catch { /* ignore */ }
}

/** True when a key event comes from somewhere the user is typing (inputs, textareas, selects, contenteditable such as CodeMirror). */
export function isTyping(e: { target: EventTarget | null }): boolean {
  const t = e.target as HTMLElement | null
  if (!t || !t.tagName) return false
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName) || t.isContentEditable || !!t.closest?.('.cm-editor,[contenteditable="true"],[role="textbox"]')
}
