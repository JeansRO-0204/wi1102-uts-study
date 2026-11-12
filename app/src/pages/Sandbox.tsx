// Playground: a Colab-style notebook of Python cells. Each cell is its own program run through the same harness the
// practice checker uses (cells do not share variables). Notebook saved in localStorage `bk.notebook`.
import { useCallback, useEffect, useRef, useState } from 'react'
import { py, type PyRun } from '../py/client'
import { explainError } from '../content/errors'
import Editor from '../code/Editor'
import { Md } from '../lib/kit'
import '../code/program.css'
import './pages.css'

interface Out { stdout: string; error?: string; line?: number | null; why?: string; prompts: number; timeout?: boolean }
interface Cell { id: number; code: string; stdin: string; showIn: boolean; n?: number; out?: Out }

const KEY = 'bk.notebook'
const START: Omit<Cell, 'id'>[] = [
  { code: '# Input and conversion: input() always gives a string\nname = input()\nage = int(input())\nprint("Hello, " + name)\nprint("Next year you will be " + str(age + 1))\n', stdin: 'Rina\n17', showIn: true },
  { code: '# if / elif / else\nscore = int(input())\nif (score >= 80):\n    print("A")\nelif (score >= 65):\n    print("B")\nelse:\n    print("C")\n', stdin: '72', showIn: true },
  { code: '# for + range: sum of 1..N (the upper bound of range is not included, so N+1)\nN = int(input())\ntotal = 0\nfor i in range(1, N+1):\n    total = total + i\nprint("Sum = " + str(total))\n', stdin: '5', showIn: true },
  { code: '# list: maximum, then a search with the found flag\ndata = [4, 9, 2, 7, 9]\nx = int(input())\nmaxv = data[0]\nfor i in range(1, len(data)):\n    if (data[i] > maxv):\n        maxv = data[i]\nprint("Max = " + str(maxv))\nfound = False\ni = 0\nwhile (i < len(data) and not found):\n    if (data[i] == x):\n        found = True\n    else:\n        i = i + 1\nif (found):\n    print("Found at index " + str(i))\nelse:\n    print("Not found")\n', stdin: '7', showIn: true },
]
let nextId = 1
const fresh = (c: Omit<Cell, 'id'>): Cell => ({ ...c, id: nextId++ })
function load(): Cell[] {
  try {
    const j = JSON.parse(localStorage.getItem(KEY) ?? 'null') as { cells?: Cell[] } | null
    if (j?.cells?.length) return j.cells.map((c) => fresh({ code: String(c.code ?? ''), stdin: String(c.stdin ?? ''), showIn: !!c.showIn, n: c.n, out: c.out }))
  } catch { /* ignore */ }
  return START.map(fresh)
}
const lines = (s: string) => s.split('\n').filter((_, i, a) => !(i === a.length - 1 && a[i] === ''))

export default function Sandbox() {
  const [cells, setCells] = useState<Cell[]>(load)
  const [running, setRunning] = useState<number | null>(null)
  const [status, setStatus] = useState(py.status())
  const count = useRef(Math.max(0, ...cells.map((c) => c.n ?? 0)))
  const cellsRef = useRef(cells)
  cellsRef.current = cells
  useEffect(() => { py.warm(); return py.onStatus(setStatus) }, [])
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ cells })) } catch { /* ignore */ }
  }, [cells])

  const patch = useCallback((id: number, p: Partial<Cell>) => setCells((cs) => cs.map((c) => (c.id === id ? { ...c, ...p } : c))), [])

  const run = useCallback(async (id: number) => {
    const c = cellsRef.current.find((x) => x.id === id)
    if (!c) return
    setRunning(id)
    const r: PyRun = await py.run(c.code, lines(c.stdin))
    let why: string | undefined
    if (r.error) {
      const ex = explainError(r.error, r.error_line, c.code, 'en')
      why = ex ? `**${ex.title}.** ${ex.why} ${ex.fix}` : undefined
    }
    patch(id, { n: ++count.current, out: { stdout: r.stdout, error: r.error, line: r.error_line, why, prompts: r.prompts.filter(Boolean).length, timeout: r.timeout } })
    setRunning(null)
  }, [patch])
  const runAll = async () => { for (const c of cellsRef.current) await run(c.id) }

  const add = (after?: number) => setCells((cs) => {
    const c = fresh({ code: '', stdin: '', showIn: false })
    if (after == null) return [...cs, c]
    const i = cs.findIndex((x) => x.id === after)
    return [...cs.slice(0, i + 1), c, ...cs.slice(i + 1)]
  })
  const del = (id: number) => setCells((cs) => (cs.length > 1 ? cs.filter((c) => c.id !== id) : cs.map((c) => (c.id === id ? { ...c, code: '', stdin: '', out: undefined, n: undefined } : c))))
  const move = (id: number, d: -1 | 1) => setCells((cs) => {
    const i = cs.findIndex((c) => c.id === id), j = i + d
    if (j < 0 || j >= cs.length) return cs
    const a = [...cs]; [a[i], a[j]] = [a[j], a[i]]; return a
  })
  const reset = () => { if (confirm('Replace the notebook with the starter cells? Your cells will be lost.')) setCells(START.map(fresh)) }

  return (
    <div className="pg nb">
      <div className="nb-top">
        <b>Playground</b>
        <button className="btn sm primary" onClick={() => void runAll()} disabled={running != null}>▶ Run all</button>
        <button className="btn sm" onClick={() => add()}>+ Code cell</button>
        <button className="btn sm ghost" onClick={reset}>Reset notebook</button>
        <span className="grow" />
        <span className="muted nb-status">Python: {status === 'ready' ? 'ready' : status === 'loading' ? 'loading (first time only)…' : 'not loaded'}</span>
      </div>
      <p className="muted nb-note">Each cell is its own program (cells do not share variables), run with the same checker as the practice questions. <kbd>⌘/Ctrl</kbd>+<kbd>Enter</kbd> runs the focused cell.</p>
      {cells.map((c, i) => (
        <section key={c.id} className="nb-cell">
          <div className="nb-gut">
            <button className="nb-play" onClick={() => void run(c.id)} disabled={running != null} aria-label="Run cell" title="Run cell">{running === c.id ? <i className="nb-spin" /> : '▶'}</button>
            <span className="nb-count">[{c.n ?? ' '}]</span>
          </div>
          <div className="nb-main">
            <div className="nb-tools">
              <button className="nb-t" onClick={() => patch(c.id, { showIn: !c.showIn })} aria-pressed={c.showIn}>{c.showIn ? '▾' : '▸'} Input (stdin)</button>
              <span className="grow" />
              <button className="nb-t" onClick={() => move(c.id, -1)} disabled={i === 0} aria-label="Move up" title="Move up">↑</button>
              <button className="nb-t" onClick={() => move(c.id, 1)} disabled={i === cells.length - 1} aria-label="Move down" title="Move down">↓</button>
              <button className="nb-t" onClick={() => add(c.id)} aria-label="Add cell below" title="Add cell below">＋</button>
              <button className="nb-t del" onClick={() => del(c.id)} aria-label="Delete cell" title="Delete cell">✕</button>
            </div>
            <Editor value={c.code} onChange={(v) => patch(c.id, { code: v })} mode="learn" language="python" onRun={() => void run(c.id)} ariaLabel={`Cell ${i + 1} code`}
              errorLine={c.out?.error && c.out.line ? c.out.line : null} errorMessage={c.out?.why} minLines={3} maxLines={24} placeholder="# write Python here" />
            {c.showIn && (
              <label className="nb-in"><small>Input, one line per <code>input()</code></small>
                <textarea rows={2} value={c.stdin} onChange={(e) => patch(c.id, { stdin: e.target.value })} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" /></label>
            )}
            {c.out && (
              <div className="nb-out">
                {c.out.stdout ? <pre className="nb-stdout">{c.out.stdout}</pre> : !c.out.error && <div className="muted prog-small">(no output)</div>}
                {c.out.prompts > 0 && <div className="muted prog-small">Text inside input("…") is not printed.</div>}
                {c.out.error && (
                  <div className="nb-tb" role="alert">
                    <div className="nb-tb-h">{c.out.timeout ? 'Stopped' : 'Traceback'}{c.out.line ? ` · line ${c.out.line}` : ''}</div>
                    <pre>{c.out.error}</pre>
                    {c.out.why && <div className="nb-tb-why"><Md>{c.out.why}</Md></div>}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      ))}
      <button className="btn sm nb-addbottom" onClick={() => add()}>+ Code cell</button>
    </div>
  )
}
