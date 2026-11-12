// Mermaid mode of the flowchart builder: type `flowchart TD` text, see the chart live.
// The text is parsed into the same block tree (mermaid.ts), so grading, the Python preview and the tracer don't change.
// Only a text that parses replaces the answer; while it has errors the last good chart stays.
import { useMemo, useState } from 'react'
import type { Flowchart } from '../types'
import Editor from './Editor'
import { FlowView } from './FlowView'
import { flowToPython } from './flow.ts'
import { flowToMermaid, mermaidToFlow } from './mermaid.ts'

const EXAMPLE = `flowchart TD
  S([Start]) --> A[/input(N)/]
  A --> B[i ← 1<br>sum ← 0]
  B --> C{i ≤ N}
  C -->|Yes| D[sum ← sum + i]
  D --> E[i ← i + 1]
  E --> C
  C -->|No| F[/output(sum)/]
  F --> G([End])
`

export function FlowMermaid({ value, onChange }: { value: Flowchart; onChange: (f: Flowchart) => void }) {
  // start from the current chart (so switching from blocks keeps the work), or the example when empty
  const [text, setText] = useState(() => (value.blocks.length ? flowToMermaid(value) : ''))
  const parsed = useMemo(() => mermaidToFlow(text), [text])
  const res = useMemo(() => (parsed.flow ? flowToPython(parsed.flow) : null), [parsed])
  const firstErr = parsed.errors[0]

  const edit = (t: string) => {
    setText(t)
    const p = mermaidToFlow(t)
    if (p.flow && !p.errors.length) onChange({ ...value, blocks: p.flow.blocks })
  }

  return (
    <div className="fm">
      <div className="fm-grid">
        <div className="fm-src">
          <Editor value={text} onChange={edit} mode="learn" language="plain" minLines={12} maxLines={30} ariaLabel="Flowchart as Mermaid text"
            placeholder={EXAMPLE} errorLine={firstErr?.line ?? null} errorMessage={firstErr ? `Line ${firstErr.line}: ${firstErr.msg}` : undefined} />
          {!text.trim() && <button type="button" className="btn sm ghost" onClick={() => edit(EXAMPLE)}>Insert an example</button>}
          <details className="fb-det fm-help">
            <summary>Mermaid cheat sheet</summary>
            <table>
              <tbody>
                <tr><td><code>S([Start])</code> · <code>E([End])</code></td><td>Start / End</td></tr>
                <tr><td><code>A[/input(x)/]</code> · <code>B[/output(x)/]</code></td><td>Input / output (parallelogram)</td></tr>
                <tr><td><code>C[x ← x + 1]</code></td><td>Process. <code>&lt;-</code> also works for ←; <code>&lt;br&gt;</code> = new line</td></tr>
                <tr><td><code>D{'{'}x &gt; 0{'}'}</code></td><td>Decision. Label its arrows <code>--&gt;|Yes|</code> and <code>--&gt;|No|</code></td></tr>
                <tr><td><code>F[[Max(a, b)]]</code></td><td>Subprogram call</td></tr>
                <tr><td><code>A --&gt; B --&gt; C</code></td><td>Arrows; chain several on one line</td></tr>
              </tbody>
            </table>
            <p className="muted">Loops are read from the arrows: a decision whose Yes or No arrow comes back to it is a <b>while</b>; a decision at the bottom that jumps back up is a <b>repeat … until</b>.</p>
          </details>
        </div>
        <div className="fm-preview" aria-label="Chart preview">
          {parsed.flow && parsed.flow.blocks.length ? <FlowView flow={parsed.flow} /> : <div className="muted fm-empty">{text.trim() ? 'Fix the errors to see the chart.' : 'The chart appears here as you type.'}</div>}
        </div>
      </div>
      <div className="fb-live">
        {parsed.errors.length ? (
          <ul className="fb-errs" role="alert">{parsed.errors.map((e, i) => <li key={i}>Line {e.line}: {e.msg}</li>)}</ul>
        ) : res?.errors.length ? (
          <ul className="fb-errs" role="alert">{res.errors.map((m, i) => <li key={i}>{m}</li>)}</ul>
        ) : text.trim() ? <div className="fb-ok">Compiles to Python with no errors.</div> : null}
        {parsed.warnings.length ? <ul className="fm-warn">{parsed.warnings.map((w, i) => <li key={i}>Line {w.line}: {w.msg}</li>)}</ul> : null}
        <details className="fb-det">
          <summary>Python generated from this flowchart</summary>
          <pre className="fb-code">{res?.code || '# (nothing yet)'}</pre>
        </details>
      </div>
    </div>
  )
}
