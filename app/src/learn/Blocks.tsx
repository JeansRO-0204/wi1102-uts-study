// Renderers for lesson blocks (learn/types.ts). Interactive ones keep their own state; Python runs in the shared Pyodide worker.
import { Suspense, lazy, useContext, useMemo, useState } from 'react'
import { Md, PageChip, PageCtx, pageSrc } from '../lib/kit'
import type { Block } from './types'
import type { LineNote, PageRef } from '../types'
import Editor from '../code/Editor'
import { FlowView } from '../code/FlowView'
import { pseudoToPython } from '../code/pseudo.ts'
import { py } from '../py/client'
import { sameLenient } from '../practice/answerCheck'
import { SYNTAX_BY_ID } from '../content/syntax'
import SyntaxCardView from '../content/SyntaxCardView'
import CodeNotes from '../content/CodeNotes'
import { QUESTION } from '../bank'

const Tracer = lazy(() => import('../code/Tracer'))
const QuestionView = lazy(() => import('../practice/QuestionView'))

export function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case 'text': return <div className="lb-text"><Md>{b.md}</Md>{b.refs?.length ? <div className="lb-refs">{b.refs.map((r, i) => <PageChip key={i} r={r} />)}</div> : null}</div>
    case 'key': return <aside className="lb-call lb-key"><b className="lb-call-h">Key idea</b><Md>{b.md}</Md></aside>
    case 'trap': return <aside className="lb-call lb-trap"><b className="lb-call-h">Common mistake</b><Md>{b.md}</Md></aside>
    case 'code': return <CodeBlock b={b} />
    case 'trace': return <Card kind="Step through it" caption={b.caption}><Suspense fallback={<Loading />}><Tracer code={b.code} stdin={b.stdin} notes={b.notes} lang="en" compact /></Suspense></Card>
    case 'predict': return <Predict b={b} />
    case 'quiz': return <Quiz b={b} />
    case 'question': return <BankQuestion id={b.id} note={b.note} />
    case 'syntax': return <div className="lb-syntax">{b.ids.map((id) => { const c = SYNTAX_BY_ID.get(id); return c ? <SyntaxCardView key={id} card={c} lang="en" /> : null })}</div>
    case 'slide': return <Slide r={b.ref} caption={b.caption} />
  }
}

const Loading = () => <div className="muted lb-loading">Loading…</div>
function Card({ kind, caption, children, tone }: { kind: string; caption?: string; children: React.ReactNode; tone?: string }) {
  return (
    <section className={'lb-card' + (tone ? ' ' + tone : '')}>
      <header className="lb-card-h"><span className="lb-kind">{kind}</span>{caption ? <span className="lb-cap"><Md inline>{caption}</Md></span> : null}</header>
      {children}
    </section>
  )
}

function Slide({ r, caption }: { r: PageRef; caption?: string }) {
  const open = useContext(PageCtx)
  return (
    <figure className="lb-slide">
      <button type="button" onClick={() => open(r)} title="Zoom"><img src={pageSrc(r.src, r.page)} alt={caption ?? `${r.src} page ${r.page}`} loading="lazy" /></button>
      <figcaption>{caption ? <Md inline>{caption}</Md> : null} <PageChip r={r} /></figcaption>
    </figure>
  )
}

/* ---------------- code: Python / pseudocode / flowchart tabs, Python editable + runnable ---------------- */

type Rep = 'python' | 'pseudo' | 'flow'
function CodeBlock({ b }: { b: Extract<Block, { t: 'code' }> }) {
  const reps = (['python', 'pseudo', 'flow'] as Rep[]).filter((r) => (r === 'python' ? b.python : r === 'pseudo' ? b.pseudo : b.flow))
  const [rep, setRep] = useState<Rep>(reps[0])
  const [code, setCode] = useState(b.python ?? '')
  const [stdin, setStdin] = useState((b.stdin ?? []).join('\n'))
  const [out, setOut] = useState<{ text: string; err?: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [showNotes, setShowNotes] = useState(true)
  const needsInput = /\binput\s*\(/.test(rep === 'pseudo' ? b.pseudo ?? '' : code)

  const runIt = async () => {
    setBusy(true); setOut(null)
    let src = code
    if (rep === 'pseudo' && b.pseudo) {
      const t = pseudoToPython(b.pseudo)
      if (t.errors.length) { setOut({ text: '', err: `Line ${t.errors[0].line}: ${t.errors[0].msg}` }); setBusy(false); return }
      src = t.code
    }
    const r = await py.run(src, stdin.split('\n').filter((l, i, a) => l !== '' || i < a.length - 1))
    setOut({ text: r.stdout, err: r.error ?? undefined }); setBusy(false)
  }
  const notes: LineNote[] | undefined = rep === 'python' ? b.notes : rep === 'pseudo' ? b.pseudoNotes : undefined
  const edited = rep === 'python' && code !== (b.python ?? '')

  return (
    <Card kind="Example" caption={b.caption}>
      {reps.length > 1 && (
        <div className="seg lb-reps" role="tablist">
          {reps.map((r) => <button key={r} role="tab" aria-selected={rep === r} className={rep === r ? 'on' : ''} onClick={() => { setRep(r); setOut(null) }}>{r === 'python' ? 'Python' : r === 'pseudo' ? 'Pseudocode' : 'Flowchart'}</button>)}
        </div>
      )}
      {rep === 'flow' && b.flow ? <div className="lb-flow"><FlowView flow={b.flow} /></div> : (
        <>
          {rep === 'python'
            ? <Editor value={code} onChange={setCode} mode="learn" language="python" minLines={3} maxLines={24} onRun={runIt} ariaLabel="Example code (editable)" />
            : <Editor value={b.pseudo ?? ''} mode="learn" language="pseudo" readOnly minLines={3} maxLines={24} ariaLabel="Pseudocode" />}
          <div className="lb-run">
            {needsInput && <label className="lb-stdin"><span className="muted">Input (one value per line)</span><textarea rows={Math.min(5, Math.max(1, stdin.split('\n').length))} value={stdin} onChange={(e) => setStdin(e.target.value)} spellCheck={false} /></label>}
            <div className="lb-run-btns">
              <button className="btn sm primary" onClick={runIt} disabled={busy}>{busy ? 'Running…' : '▶ Run'}</button>
              {edited && <button className="btn sm ghost" onClick={() => { setCode(b.python ?? ''); setOut(null) }}>Reset code</button>}
              {notes?.length ? <button className="btn sm ghost" onClick={() => setShowNotes((s) => !s)}>{showNotes ? 'Hide' : 'Show'} line notes</button> : null}
              {rep === 'python' && <span className="muted lb-hint">Edit it and run again: try to break it.</span>}
            </div>
            {out && <pre className={'lb-out' + (out.err ? ' err' : '')}>{out.text}{out.err ? (out.text ? '\n' : '') + out.err : ''}{!out.text && !out.err ? '(no output)' : ''}</pre>}
          </div>
          {showNotes && notes?.length && !edited ? <CodeNotes code={rep === 'python' ? b.python ?? '' : b.pseudo ?? ''} notes={notes} lang="en" /> : null}
        </>
      )}
    </Card>
  )
}

/* ---------------- predict the output ---------------- */

function Predict({ b }: { b: Extract<Block, { t: 'predict' }> }) {
  const [guess, setGuess] = useState('')
  const [res, setRes] = useState<{ out: string; err?: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const reveal = async () => { setBusy(true); const r = await py.run(b.code, b.stdin ?? []); setRes({ out: r.stdout, err: r.error ?? undefined }); setBusy(false) }
  const match = res && !res.err && guess.trim() ? sameLenient(guess, res.out) && guess.trim().split('\n').length === res.out.trim().split('\n').length : null
  return (
    <Card kind="Predict the output" caption={b.prompt} tone="lb-predict">
      <Editor value={b.code} mode="learn" language="python" readOnly minLines={2} maxLines={16} ariaLabel="Program to predict" />
      {b.stdin?.length ? <p className="muted lb-small">Input: <code>{b.stdin.join(' ⏎ ')}</code></p> : null}
      <label className="lb-guess"><span className="muted">Your prediction (what appears on screen)</span>
        <textarea rows={Math.max(2, guess.split('\n').length)} value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Type the output, one line per printed line" spellCheck={false} disabled={!!res} /></label>
      {!res ? <button className="btn sm primary" onClick={reveal} disabled={busy}>{busy ? 'Running…' : guess.trim() ? 'Run and compare' : 'Just show me'}</button> : (
        <div className="lb-reveal">
          {match !== null && <div className={'lb-verdict ' + (match ? 'ok' : 'no')}>{match ? '✓ Your prediction matches' : '✗ Not quite: compare line by line'}</div>}
          <div className="lb-cmp">
            {guess.trim() ? <div><span className="muted">You said</span><pre className="lb-out">{guess}</pre></div> : null}
            <div><span className="muted">Actual output</span><pre className={'lb-out' + (res.err ? ' err' : '')}>{res.out || (res.err ? '' : '(no output)')}{res.err ?? ''}</pre></div>
          </div>
          <div className="lb-explain"><Md>{b.explain}</Md></div>
          <button className="btn sm ghost" onClick={() => { setRes(null); setGuess('') }}>Try again</button>
        </div>
      )}
    </Card>
  )
}

/* ---------------- quick check ---------------- */

function Quiz({ b }: { b: Extract<Block, { t: 'quiz' }> }) {
  const multi = b.correct.length > 1
  const [pick, setPick] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const ok = checked && pick.length === b.correct.length && pick.every((i) => b.correct.includes(i))
  const toggle = (i: number) => { if (checked) return; setPick((p) => (multi ? (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]) : [i])) }
  return (
    <Card kind={multi ? 'Quick check · tick all that apply' : 'Quick check'} tone="lb-quiz">
      <div className="lb-q"><Md>{b.q}</Md></div>
      <ul className="lb-opts" role={multi ? 'group' : 'radiogroup'}>
        {b.options.map((o, i) => {
          const sel = pick.includes(i), right = b.correct.includes(i)
          const cls = checked ? (right ? ' right' : sel ? ' wrong' : '') : sel ? ' sel' : ''
          return (
            <li key={i}>
              <button type="button" className={'lb-opt' + cls} role={multi ? 'checkbox' : 'radio'} aria-checked={sel} onClick={() => toggle(i)}>
                <span className="lb-box" aria-hidden>{checked ? (right ? '✓' : sel ? '✗' : '') : sel ? (multi ? '✓' : '●') : ''}</span>
                <span className="lb-otext"><Md inline>{o}</Md></span>
              </button>
              {checked && (sel || right) && <div className="lb-why"><Md inline>{b.why[i]}</Md></div>}
            </li>
          )
        })}
      </ul>
      {!checked ? <button className="btn sm primary" disabled={!pick.length} onClick={() => setChecked(true)}>Check</button> : (
        <div className="lb-qfoot"><span className={'lb-verdict ' + (ok ? 'ok' : 'no')}>{ok ? '✓ Correct' : multi ? '✗ Not all right: read the notes under each option' : '✗ Not this one: see why below'}</span>
          <button className="btn sm ghost" onClick={() => { setChecked(false); setPick([]) }}>Try again</button></div>
      )}
    </Card>
  )
}

/* ---------------- embedded bank question ---------------- */

function BankQuestion({ id, note }: { id: string; note?: string }) {
  const x = useMemo(() => QUESTION.get(id), [id])
  const [open, setOpen] = useState(false)
  if (!x) return null
  const title = x.p.en?.title ?? x.p.title
  return (
    <Card kind="Practice question" caption={note} tone="lb-bank">
      {!open ? (
        <div className="lb-bank-closed">
          <div><b>{title}</b><small className="muted"> · {x.q.topic}</small></div>
          <button className="btn sm primary" onClick={() => setOpen(true)}>Try it here</button>
          <a className="btn sm ghost" href={`#/problems/${x.p.id}`}>Open full problem</a>
        </div>
      ) : (
        <Suspense fallback={<Loading />}><QuestionView q={x.q} problem={x.p} mode="learn" src="learn" header compact /></Suspense>
      )}
    </Card>
  )
}

/** Several bank questions in a row: one compact list, one open at a time. */
export function QuestionList({ items }: { items: { id: string; note?: string }[] }) {
  const rows = useMemo(() => items.map((it) => ({ ...it, x: QUESTION.get(it.id) })).filter((r) => r.x), [items])
  const [open, setOpen] = useState<string | null>(null)
  return (
    <Card kind={`Practice questions · ${rows.length}`} tone="lb-bank" caption="Real exam and exercise items on what you just read. Open any; they're optional but they're the best test of this section.">
      <ol className="lb-qlist">
        {rows.map((r) => {
          const x = r.x!
          const on = open === r.id
          return (
            <li key={r.id} className={on ? 'on' : ''}>
              <button type="button" className="lb-qrow" aria-expanded={on} onClick={() => setOpen(on ? null : r.id)}>
                <span className="lb-qt"><b>{x.p.en?.title ?? x.p.title}</b>{r.note ? <small className="muted"> · <Md inline>{r.note}</Md></small> : <small className="muted"> · {x.q.topic}</small>}</span>
                <span className="lb-qgo">{on ? 'Close' : 'Try'}</span>
              </button>
              {on && <div className="lb-qbody"><Suspense fallback={<Loading />}><QuestionView q={x.q} problem={x.p} mode="learn" src="learn" header compact /></Suspense></div>}
            </li>
          )
        })}
      </ol>
    </Card>
  )
}
