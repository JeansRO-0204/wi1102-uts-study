// Step-through visualiser of a Python run (py.trace): active line, variables (changed ones flash), stdout so far,
// array cells with index pointers, call frames for subprograms, ◀ ▶ + scrubber + play, and the active line's note.
import { useEffect, useMemo, useRef, useState } from 'react'
import { py, type PyTrace, type PyTraceStep } from '../py/client'
import { Md } from '../lib/kit'
import CodeNotes from '../content/CodeNotes'
import { explainError } from '../content/errors'
import type { LineNote, SyntaxId } from '../types'
import './program.css'

const POINTERS = new Set(['i', 'j', 'k', 'idx', 'index', 'pos', 'p', 'lo', 'hi', 'mid', 'low', 'high', 'left', 'right', 'start', 'end', 'cur', 'curr', 'x'])

/** Split a Python list/tuple repr into its items (top-level commas), or null when it is not a flat-ish list. */
export function parseList(repr: string): string[] | null {
  const t = repr.trim()
  if (!/^\[.*\]$/s.test(t)) return null
  const inner = t.slice(1, -1)
  if (!inner.trim()) return []
  const out: string[] = []
  let depth = 0, q: string | null = null, cur = ''
  for (const c of inner) {
    if (q) { cur += c; if (c === q) q = null; continue }
    if (c === '"' || c === "'") { q = c; cur += c; continue }
    if (c === '[' || c === '(' || c === '{') depth++
    if (c === ']' || c === ')' || c === '}') depth--
    if (c === ',' && depth === 0) { out.push(cur.trim()); cur = ''; continue }
    cur += c
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

const isInt = (s: string) => /^-?\d+$/.test(s)
const noteFor = (notes: LineNote[] | undefined, line: number) => notes?.find((n) => (Array.isArray(n.line) ? line >= n.line[0] && line <= n.line[1] : n.line === line))

function Arr({ name, items, prev, ptrs }: { name: string; items: string[]; prev: string[] | null; ptrs: { name: string; at: number }[] }) {
  return (
    <div className="tr-arr">
      <span className="tr-arr-name">{name}</span>
      <div className="tr-cells">
        {items.map((v, i) => {
          const here = ptrs.filter((p) => p.at === i)
          const changed = prev != null && prev[i] !== v
          return (
            <div key={i + ':' + v} className={'tr-cell' + (here.length ? ' at' : '') + (changed ? ' flash' : '')}>
              <div className="tr-val">{v}</div>
              <div className="tr-idx">{i}</div>
              <div className="tr-ptr">{here.length ? '▲ ' + here.map((h) => h.name).join(',') : ''}</div>
            </div>
          )
        })}
        {!items.length && <span className="muted">[ ]</span>}
      </div>
    </div>
  )
}

export default function Tracer({ code, stdin = [], notes, lang = 'en', onSyntax, compact }: {
  code: string; stdin?: string[]; notes?: LineNote[]; lang?: 'id' | 'en'; onSyntax?: (id: SyntaxId) => void; compact?: boolean
}) {
  const [res, setRes] = useState<PyTrace | null>(null)
  const [i, setI] = useState(0)
  const [play, setPlay] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let live = true
    setRes(null); setI(0); setPlay(false)
    py.trace(code, stdin).then((r) => { if (live) setRes(r) })
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, stdin.join('\n')])

  const steps: PyTraceStep[] = res?.trace ?? []
  const last = steps.length - 1
  useEffect(() => {
    if (!play) return
    if (i >= last) { setPlay(false); return }
    const h = setTimeout(() => setI((x) => Math.min(last, x + 1)), 650)
    return () => clearTimeout(h)
  }, [play, i, last])

  const step = steps[Math.min(i, Math.max(0, last))]
  const prev = i > 0 ? steps[i - 1] : undefined
  const hasFrames = useMemo(() => steps.some((s) => s.depth > 0), [steps])
  // call stack at step i: the latest step at each depth ≤ current depth
  const frames = useMemo(() => {
    if (!step) return []
    const fs: PyTraceStep[] = []
    for (let d = 0; d <= step.depth; d++) {
      for (let k = Math.min(i, last); k >= 0; k--) if (steps[k].depth === d) { fs.push(steps[k]); break }
    }
    return fs
  }, [steps, i, last, step])

  if (!res) return <div className="tr tr-load" aria-busy>Running the program to trace it…</div>
  if (!steps.length) {
    const ex = res.error ? explainError(res.error, res.error_line, code) : null
    return <div className="tr tr-load">{ex ? <><b>{ex.title}</b> {ex.why} {ex.fix}</> : res.error ?? 'There are no steps to trace.'}</div>
  }

  const ended = step.line === 0
  const stdout = res.stdout.slice(0, step.out)
  const sameFrame = prev && prev.fn === step.fn && prev.depth === step.depth
  const note = !ended ? noteFor(notes, step.line) : undefined
  const err = res.error && i >= last ? explainError(res.error, res.error_line, code) : null

  const renderVars = (s: PyTraceStep, p: PyTraceStep | undefined) => {
    const ents = Object.entries(s.vars)
    const lists = ents.filter(([, v]) => parseList(v) != null)
    const scalars = ents.filter(([, v]) => parseList(v) == null)
    const named = scalars.filter(([k, v]) => POINTERS.has(k) && isInt(v))
    return (
      <>
        {scalars.length > 0 && (
          <div className="tr-vars">
            {scalars.map(([k, v]) => (
              <span key={k + ':' + v} className={'tr-var' + (p && p.vars[k] !== v ? ' flash' : '')}><b>{k}</b> = {v}</span>
            ))}
          </div>
        )}
        {lists.map(([k, v]) => {
          const items = parseList(v)!
          const pv = p?.vars[k] != null ? parseList(p.vars[k]) : null
          const ptrs = named.map(([n, val]) => ({ name: n, at: Number(val) })).filter((x) => x.at >= 0 && x.at < items.length)
          return <Arr key={k} name={k} items={items} prev={pv} ptrs={ptrs} />
        })}
        {!ents.length && <span className="muted">(no variables yet)</span>}
      </>
    )
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); setI((x) => Math.min(last, x + 1)) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); setI((x) => Math.max(0, x - 1)) }
  }

  return (
    <div className={'tr' + (compact ? ' tr-compact' : '')} ref={root} tabIndex={0} onKeyDown={onKey} aria-label="Step-by-step tracer">
      <div className="tr-ctl">
        <button className="btn sm" onClick={() => { setI(0); setPlay(false) }} disabled={i === 0} aria-label="To start">⏮</button>
        <button className="btn sm" onClick={() => { setI((x) => Math.max(0, x - 1)); setPlay(false) }} disabled={i === 0} aria-label="Previous step">◀</button>
        <button className="btn sm primary" onClick={() => { if (i >= last) setI(0); setPlay((p) => !p) }} aria-label={play ? 'Pause' : 'Play'}>{play ? '⏸' : '▶'}</button>
        <button className="btn sm" onClick={() => { setI((x) => Math.min(last, x + 1)); setPlay(false) }} disabled={i >= last} aria-label="Next step">▶|</button>
        <input type="range" min={0} max={last} value={Math.min(i, last)} onChange={(e) => { setI(Number(e.target.value)); setPlay(false) }} aria-label="Step position" />
        <span className="tr-pos">{Math.min(i, last) + 1} / {steps.length}</span>
      </div>
      <div className="tr-grid">
        <div className="tr-code">
          <CodeNotes code={code} notes={notes} highlight={ended ? null : step.line} onSyntax={onSyntax as ((id: string) => void) | undefined} lang={lang} />
        </div>
        <div className="tr-side">
          {hasFrames && (
            <div className="tr-frames">
              <b>Call stack</b>
              {frames.map((f, k) => (
                <div key={k} className={'tr-frame' + (k === frames.length - 1 ? ' cur' : '')}>
                  <div className="tr-frame-h">{f.fn === '<module>' ? 'main program' : `${f.fn}()`}{f.depth > 0 && <span className="muted"> · depth {f.depth}</span>}</div>
                  {k === frames.length - 1 ? renderVars(step, sameFrame ? prev : undefined) : renderVars(f, undefined)}
                </div>
              ))}
            </div>
          )}
          {!hasFrames && <div className="tr-block"><b>Variables</b>{renderVars(step, sameFrame ? prev : undefined)}</div>}
          <div className="tr-block">
            <b>Output so far</b>
            <pre className="tr-out">{stdout || <span className="muted">(empty)</span>}</pre>
          </div>
        </div>
      </div>
      <div className="tr-note">
        {ended ? <span>{res.error ? <>The program stopped. {err ? <><b>{err.title}.</b> {err.why} {err.fix}</> : res.error}</> : 'The program finished.'}</span>
          : <><b>Line {step.line}</b>{note ? <> · <Md inline>{(lang === 'en' && note.en) || note.note}</Md></> : null}</>}
        {res.trace.length >= 4000 && i >= last && <div className="muted">The trace was cut at 4000 steps.</div>}
      </div>
    </div>
  )
}
