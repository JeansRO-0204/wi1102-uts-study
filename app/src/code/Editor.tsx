// Code editor entry point. Same prop API as before; the editor itself is CodeMirror 6 (code/CodeEditor.tsx), loaded lazily.
// While the chunk loads (or if it fails) a plain textarea with the same value is shown, so typing is never lost.
// Paper mode ('test') = line numbers only, monochrome, no autocomplete / auto-close / auto-indent; Lab mode ('learn') = full editor.
import { Suspense, lazy, useLayoutEffect, useRef, Component, type ReactNode } from 'react'
import type { CodeEditorProps } from './CodeEditor'
import './program.css'

export interface EditorProps extends CodeEditorProps {
  /** @deprecated use minLines */
  minRows?: number
}

const CodeEditor = lazy(() => import('./CodeEditor'))
const INDENT = '    '

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { bad: boolean }> {
  state = { bad: false }
  static getDerivedStateFromError() { return { bad: true } }
  render() { return this.state.bad ? this.props.fallback : this.props.children }
}

function TextareaEditor({ value, onChange, mode, readOnly, placeholder, errorLine, highlightLine, minRows = 8, onSubmit, onRun, ariaLabel }: EditorProps) {
  const ta = useRef<HTMLTextAreaElement>(null)
  const gut = useRef<HTMLDivElement>(null)
  const sel = useRef<[number, number] | null>(null)
  const n = value.split('\n').length
  const rows = Math.min(28, Math.max(minRows, n + 1))

  useLayoutEffect(() => {
    if (sel.current && ta.current) { ta.current.setSelectionRange(sel.current[0], sel.current[1]); sel.current = null }
  })

  const apply = (v: string, a: number, b = a) => { sel.current = [a, b]; onChange?.(v) }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); if (onRun && !e.shiftKey) onRun(); else onSubmit?.(); return }
    if (mode !== 'learn' || readOnly) return
    const el = e.currentTarget
    const { selectionStart: s, selectionEnd: t } = el
    if (e.key === 'Tab') {
      e.preventDefault()
      const ls = value.lastIndexOf('\n', s - 1) + 1
      if (e.shiftKey || (s !== t && value.slice(s, t).includes('\n'))) {
        // (de)indent every selected line
        const end = t
        const block = value.slice(ls, end)
        const out = block.split('\n').map((l) => (e.shiftKey ? l.replace(/^( {1,4}|\t)/, '') : INDENT + l)).join('\n')
        const delta = out.length - block.length
        apply(value.slice(0, ls) + out + value.slice(end), Math.max(ls, s + (out.split('\n')[0].length - block.split('\n')[0].length)), t + delta)
      } else apply(value.slice(0, s) + INDENT + value.slice(t), s + INDENT.length)
    } else if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault()
      const ls = value.lastIndexOf('\n', s - 1) + 1
      const line = value.slice(ls, s)
      const base = /^[ \t]*/.exec(line)![0]
      const opens = /:\s*(#.*)?$/.test(line)
      const ins = '\n' + base + (opens ? INDENT : '')
      apply(value.slice(0, s) + ins + value.slice(t), s + ins.length)
    }
  }

  return (
    <div className={'ed' + (mode === 'test' ? ' ed-paper' : '') + (readOnly ? ' ed-ro' : '')}>
      <div className="ed-gut" ref={gut} aria-hidden>
        {Array.from({ length: Math.max(n, rows) }, (_, i) => (
          <div key={i} className={(errorLine === i + 1 ? 'err ' : '') + (highlightLine === i + 1 ? 'hl' : '')}>{i < n ? i + 1 : ''}</div>
        ))}
      </div>
      <textarea
        ref={ta} className="ed-ta" value={value} rows={rows} wrap="off" readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)} onKeyDown={onKeyDown}
        onScroll={(e) => { if (gut.current) gut.current.scrollTop = e.currentTarget.scrollTop }}
        placeholder={placeholder} aria-label={ariaLabel ?? 'Program answer'}
        spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" data-gramm="false"
      />
    </div>
  )
}

export default function Editor(props: EditorProps) {
  const { minRows, minLines, ...rest } = props
  const fallback = <TextareaEditor {...props} />
  return (
    <Boundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <CodeEditor {...rest} minLines={minLines ?? minRows} />
      </Suspense>
    </Boundary>
  )
}
