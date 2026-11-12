// CodeMirror 6 editor (lazy chunk: import it through code/Editor.tsx).
// Lab mode ('learn'): Python highlighting, line numbers, active line, bracket matching + auto-close, auto-indent after ':',
//   Tab / Shift-Tab = 4 spaces, indent guides, search, undo history, autocomplete.  Cmd/Ctrl+Enter = Run, +Shift = Submit.
// Paper mode ('test'): line numbers only, monochrome (optional "Colours" toggle, localStorage bk.paperColors), no autocomplete,
//   no auto-close, no auto-indent (Tab still inserts 4 spaces).
// Errors: errorLine = red gutter number + line background + lint squiggle (message in the tooltip and under the editor);
//   highlightLine = the tracer's active line (blue).
import { useEffect, useRef, useSyncExternalStore } from 'react'
import { Annotation, Compartment, EditorState, Prec, RangeSet, RangeSetBuilder, StateEffect, StateField, type Extension } from '@codemirror/state'
import {
  Decoration, EditorView, GutterMarker, ViewPlugin, drawSelection, highlightActiveLine, highlightActiveLineGutter, keymap, lineNumberMarkers, lineNumbers,
  placeholder as cmPlaceholder, type DecorationSet, type ViewUpdate,
} from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentLess, indentMore, insertNewline } from '@codemirror/commands'
import { python } from '@codemirror/lang-python'
import { HighlightStyle, bracketMatching, indentUnit, syntaxHighlighting } from '@codemirror/language'
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete'
import { lintGutter, setDiagnostics, type Diagnostic } from '@codemirror/lint'
import { highlightSelectionMatches, search, searchKeymap } from '@codemirror/search'
import { tags as t } from '@lezer/highlight'
import { Md } from '../lib/kit'
import type { Mode } from '../types'
import { pseudoLanguage } from './pseudoLang'
import './program.css'

export interface CodeEditorProps {
  value: string
  onChange?: (v: string) => void
  mode: Mode
  readOnly?: boolean
  placeholder?: string
  /** 1-based line to mark as the error line */
  errorLine?: number | null
  /** shown in the lint tooltip and under the editor (views pass explainError(...) text) */
  errorMessage?: string
  /** 1-based line to highlight in blue (the tracer's active line) */
  highlightLine?: number | null
  /** Cmd/Ctrl+Enter = Run when `onRun` is given, otherwise Submit; Cmd/Ctrl+Shift+Enter = Submit */
  onSubmit?: () => void
  onRun?: () => void
  ariaLabel?: string
  language?: 'python' | 'pseudo' | 'plain'
  /** force colours in Paper mode; undefined = the learner's own toggle (bk.paperColors) */
  paperColors?: boolean
  minLines?: number
  maxLines?: number
}

/* ---------- Paper-mode colour preference ---------- */
const COLOR_KEY = 'bk.paperColors'
const colorSubs = new Set<() => void>()
const readColors = () => { try { return localStorage.getItem(COLOR_KEY) === 'true' } catch { return false } }
const setColors = (v: boolean) => { try { localStorage.setItem(COLOR_KEY, JSON.stringify(v)) } catch { /* ignore */ } colorSubs.forEach((f) => f()) }
const usePaperColors = () => useSyncExternalStore((f) => { colorSubs.add(f); return () => { colorSubs.delete(f) } }, readColors, () => false)

/* ---------- theme ---------- */
const LH = 22
const baseTheme = EditorView.theme({
  '&': { fontSize: '14px', backgroundColor: 'transparent', color: 'var(--ink)', minWidth: '0' },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': { fontFamily: 'var(--mono)', lineHeight: `${LH}px`, overflow: 'auto' },
  '.cm-content': { padding: '10px 0', caretColor: 'var(--ink)' },
  '.cm-line': { padding: '0 12px 0 8px' },
  '.cm-gutters': { backgroundColor: 'var(--fill-2)', color: 'var(--muted)', border: 'none', borderRight: '1px solid var(--line)' },
  '.cm-gutterElement': { padding: '0 8px 0 10px' },
  '.cm-lineNumbers .cm-gutterElement': { minWidth: '28px' },
  '.cm-activeLine': { backgroundColor: 'rgba(0, 122, 255, .06)' },
  '.cm-activeLineGutter': { backgroundColor: 'rgba(0, 122, 255, .12)', color: 'var(--ink)' },
  '.cm-cursor': { borderLeftColor: 'var(--ink)', borderLeftWidth: '2px' },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, ::selection': { backgroundColor: 'rgba(0, 122, 255, .22)' },
  '.cm-matchingBracket': { backgroundColor: 'rgba(0, 122, 255, .18)', outline: '1px solid rgba(0, 122, 255, .4)', color: 'inherit' },
  '.cm-nonmatchingBracket': { backgroundColor: 'var(--err-soft)', color: 'inherit' },
  '.cm-placeholder': { color: 'var(--muted)' },
  '.cm-line.cm-errLine': { backgroundColor: 'var(--err-soft)', boxShadow: 'inset 3px 0 0 var(--err)' },
  '.cm-line.cm-hlLine': { backgroundColor: 'rgba(0, 122, 255, .16)', boxShadow: 'inset 3px 0 0 var(--accent)' },
  '.cm-gutterElement.cm-errNum': { backgroundColor: 'var(--err)', color: '#fff', borderRadius: '4px' },
  '.cm-ig': { backgroundImage: 'linear-gradient(to right, rgba(60, 60, 67, .22) 1px, transparent 1px)', backgroundSize: '4ch 100%', backgroundRepeat: 'repeat-x' },
  '.cm-tooltip': { border: '1px solid var(--line)', borderRadius: '8px', backgroundColor: 'var(--fill)', fontFamily: 'var(--font)', fontSize: '13px' },
  '.cm-tooltip-autocomplete ul': { fontFamily: 'var(--mono)' },
  '.cm-tooltip-lint': { maxWidth: '360px' },
  '.cm-panels': { backgroundColor: 'var(--fill-2)', color: 'var(--ink)', fontFamily: 'var(--font)' },
  '.cm-panels input, .cm-panels button': { fontSize: '13px' },
})

const labStyle = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.operatorKeyword, t.moduleKeyword, t.definitionKeyword], color: '#8250df' },
  { tag: [t.meta], color: '#8250df', fontWeight: '700' },
  { tag: [t.string, t.special(t.string)], color: '#0a7a3d' },
  { tag: [t.number, t.bool, t.null, t.atom], color: '#c2570c' },
  { tag: t.comment, color: '#7a7a85', fontStyle: 'italic' },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: '#0b66c3' },
  { tag: [t.definition(t.variableName), t.className], color: '#0b66c3', fontWeight: '600' },
  { tag: [t.self], color: '#8250df' },
  { tag: t.typeName, color: '#0e7490' },
  { tag: [t.operator], color: '#b4237a' },
])

/* ---------- decorations: error line, tracer line, indent guides ---------- */
interface Marks { err: number | null; hl: number | null }
const setMarks = StateEffect.define<Marks>()
const lineClasses = (doc: EditorState['doc'], m: Marks) => {
  const by = new Map<number, string[]>()
  const add = (n: number | null, c: string) => { if (n && n >= 1 && n <= doc.lines) by.set(doc.line(n).from, [...(by.get(doc.line(n).from) ?? []), c]) }
  add(m.hl, 'cm-hlLine'); add(m.err, 'cm-errLine')
  return [...by.entries()].sort((a, b) => a[0] - b[0])
}
const marksField = StateField.define<{ marks: Marks; deco: DecorationSet }>({
  create: () => ({ marks: { err: null, hl: null }, deco: Decoration.none }),
  update(v, tr) {
    let marks = v.marks
    let changed = tr.docChanged
    for (const e of tr.effects) if (e.is(setMarks)) { marks = e.value; changed = true }
    if (!changed) return v
    const b = new RangeSetBuilder<Decoration>()
    for (const [from, cls] of lineClasses(tr.state.doc, marks)) b.add(from, from, Decoration.line({ class: cls.join(' ') }))
    return { marks, deco: b.finish() }
  },
  provide: (f) => EditorView.decorations.from(f, (v) => v.deco),
})
class ErrNum extends GutterMarker { elementClass = 'cm-errNum' }
const errNum = new ErrNum()
const numField = StateField.define<RangeSet<GutterMarker>>({
  create: () => RangeSet.empty,
  update(v, tr) {
    for (const e of tr.effects) if (e.is(setMarks)) {
      const n = e.value.err
      return n && n >= 1 && n <= tr.state.doc.lines ? RangeSet.of([errNum.range(tr.state.doc.line(n).from)]) : RangeSet.empty
    }
    return v.map(tr.changes)
  },
  provide: (f) => lineNumberMarkers.from(f),
})
const guideMark = Decoration.mark({ class: 'cm-ig' })
const guides = ViewPlugin.fromClass(class {
  decorations: DecorationSet
  constructor(view: EditorView) { this.decorations = this.build(view) }
  update(u: ViewUpdate) { if (u.docChanged || u.viewportChanged) this.decorations = this.build(u.view) }
  build(view: EditorView) {
    const b = new RangeSetBuilder<Decoration>()
    let last = -1
    for (const { from, to } of view.visibleRanges) {
      let pos = from
      while (pos <= to) {
        const line = view.state.doc.lineAt(pos)
        pos = line.to + 1
        if (line.number <= last) continue
        last = line.number
        const m = /^[ \t]+/.exec(line.text)
        if (m && m[0].length >= 2) b.add(line.from, line.from + m[0].length, guideMark)
      }
    }
    return b.finish()
  }
}, { decorations: (v) => v.decorations })

const External = Annotation.define<boolean>()
const INDENT = '    '

export default function CodeEditor(props: CodeEditorProps) {
  const { value, mode, readOnly, errorLine, errorMessage, highlightLine, language = 'python', minLines = 8, maxLines = 28, ariaLabel } = props
  const lab = mode === 'learn'
  const hostRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const dyn = useRef(new Compartment())
  const cb = useRef(props)
  cb.current = props
  const prefColors = usePaperColors()
  const colours = lab || (props.paperColors ?? prefColors)
  const showToggle = !lab && !readOnly && props.paperColors === undefined

  // everything that depends on mode / language / read-only
  const build = (): Extension => {
    const ext: Extension[] = []
    const run = () => { const c = cb.current; if (c.onRun) { c.onRun(); return true } if (c.onSubmit) { c.onSubmit(); return true } return false }
    const submit = () => { const c = cb.current; if (c.onSubmit) { c.onSubmit(); return true } return false }
    ext.push(Prec.highest(keymap.of([{ key: 'Mod-Enter', run }, { key: 'Mod-Shift-Enter', run: submit }])))
    const spaces = (v: EditorView) => { v.dispatch(v.state.update(v.state.replaceSelection(INDENT), { scrollIntoView: true, userEvent: 'input' })); return true }
    const multiLine = (v: EditorView) => v.state.selection.ranges.some((r) => !r.empty && v.state.doc.lineAt(r.from).number !== v.state.doc.lineAt(r.to).number)
    if (lab) {
      ext.push(
        highlightActiveLine(), highlightActiveLineGutter(), bracketMatching(), highlightSelectionMatches(), guides, indentUnit.of(INDENT),
        search({ top: true }),
        keymap.of([
          { key: 'Tab', run: (v) => (multiLine(v) ? indentMore(v) : spaces(v)), shift: indentLess },
          { key: 'Escape', run: (v) => { v.contentDOM.blur(); return true } },
          ...searchKeymap, ...historyKeymap, ...defaultKeymap,
        ]),
      )
      if (!readOnly) {
        ext.push(closeBrackets(), keymap.of(closeBracketsKeymap))
        if (language === 'python') ext.push(autocompletion({ icons: false, activateOnTyping: true }), keymap.of(completionKeymap))
      }
    } else {
      ext.push(keymap.of([
        { key: 'Enter', run: insertNewline },
        { key: 'Tab', run: spaces },
        ...historyKeymap,
        ...defaultKeymap.filter((k) => !/[\[\]/\\]/.test(k.key ?? '') && k.key !== 'Enter'),
      ]))
    }
    if (colours) {
      ext.push(language === 'python' ? python() : language === 'pseudo' ? pseudoLanguage : [], syntaxHighlighting(labStyle))
    }
    if (readOnly) ext.push(EditorState.readOnly.of(true))
    ext.push(EditorView.theme({
      '.cm-content': { minHeight: `${minLines * LH + 20}px` },
      '.cm-scroller': { maxHeight: `${maxLines * LH + 20}px` },
    }))
    ext.push(EditorView.contentAttributes.of({ 'aria-label': ariaLabel ?? 'Program answer', spellcheck: 'false', autocorrect: 'off', autocapitalize: 'off', autocomplete: 'off', 'data-gramm': 'false' }))
    if (props.placeholder) {
      const el = document.createElement('span'); el.style.whiteSpace = 'pre'; el.textContent = props.placeholder
      ext.push(cmPlaceholder(el))
    }
    return ext
  }

  // create the view once
  useEffect(() => {
    const view = new EditorView({
      parent: hostRef.current!,
      state: EditorState.create({
        doc: cb.current.value,
        extensions: [
          lineNumbers(), history(), drawSelection(), baseTheme, marksField, numField, lintGutter(),
          EditorView.updateListener.of((u) => {
            if (u.docChanged && !u.transactions.some((tr) => tr.annotation(External))) cb.current.onChange?.(u.state.doc.toString())
          }),
          dyn.current.of(build()),
        ],
      }),
    })
    viewRef.current = view
    return () => { view.destroy(); viewRef.current = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // reconfigure on mode / language / colours / size changes
  useEffect(() => {
    viewRef.current?.dispatch({ effects: dyn.current.reconfigure(build()) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, language, readOnly, colours, minLines, maxLines, props.placeholder, ariaLabel])

  // external value changes (restore, reset, Parsons insert, question change)
  useEffect(() => {
    const v = viewRef.current
    if (!v) return
    const cur = v.state.doc.toString()
    if (cur !== value) v.dispatch({ changes: { from: 0, to: cur.length, insert: value }, annotations: External.of(true) })
  }, [value])

  // error + tracer lines, lint squiggle
  useEffect(() => {
    const v = viewRef.current
    if (!v) return
    const effects: StateEffect<unknown>[] = [setMarks.of({ err: errorLine ?? null, hl: highlightLine ?? null })]
    if (highlightLine && highlightLine >= 1 && highlightLine <= v.state.doc.lines) effects.push(EditorView.scrollIntoView(v.state.doc.line(highlightLine).from, { y: 'nearest' }))
    v.dispatch({ effects })
    const diags: Diagnostic[] = []
    if (errorLine && errorLine >= 1 && errorLine <= v.state.doc.lines) {
      const l = v.state.doc.line(errorLine)
      const lead = /^\s*/.exec(l.text)![0].length
      const from = l.from + Math.min(lead, l.text.length)
      diags.push({ from, to: Math.max(l.to, from), severity: 'error', message: (errorMessage ?? 'Error on this line').replace(/[*`]/g, '') })
    }
    v.dispatch(setDiagnostics(v.state, diags))
  }, [errorLine, errorMessage, highlightLine])

  return (
    <div className={'ce' + (!lab ? ' ce-paper' : '') + (readOnly ? ' ce-ro' : '')}>
      <div className="ce-host" ref={hostRef} />
      {(errorLine && errorMessage) || showToggle ? (
        <div className="ce-foot">
          {errorLine && errorMessage ? <div className="ce-err" role="alert"><b>Line {errorLine}</b> <Md inline>{errorMessage}</Md></div> : <span />}
          {showToggle && (
            <button type="button" className={'ce-colours' + (prefColors ? ' on' : '')} aria-pressed={prefColors} onClick={() => setColors(!prefColors)} title="The exam is on paper: practise without colours">
              Colours {prefColors ? 'on' : 'off'}
            </button>
          )}
        </div>
      ) : null}
    </div>
  )
}
