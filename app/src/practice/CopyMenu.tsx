// "Copy" menu on a problem / part: the question as Markdown (for pasting into an AI chat), optionally with the answer
// and explanation, and the figures as one PNG. The heavy formatter is imported on click. The clipboard write starts
// synchronously inside the click (ClipboardItem with a promise), which Safari requires.
import { useEffect, useRef, useState } from 'react'
import type { Problem, Question } from '../types'
import type { Lang } from './Hints'
import { tr } from './ui'

type What = 'q' | 'qa' | 'fig'
const mod = () => import('./copyQuestion')

async function fallbackText(text: string) {
  const ta = Object.assign(document.createElement('textarea'), { value: text })
  ta.style.cssText = 'position:fixed;opacity:0'
  document.body.appendChild(ta); ta.select()
  const ok = document.execCommand('copy'); ta.remove()
  if (!ok) throw new Error('copy failed')
}

function copy(what: What, problem: Problem, lang: Lang, parts?: Question[]): Promise<void> {
  if (what === 'fig') {
    const blob = mod().then((m) => m.figuresPng(m.figuresOf(problem, parts)))
    return navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
  }
  const text = mod().then((m) => m.problemMarkdown(problem, lang, { parts, withAnswer: what === 'qa' }))
  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
    return navigator.clipboard.write([new ClipboardItem({ 'text/plain': text.then((t) => new Blob([t], { type: 'text/plain' })) })])
      .catch(() => text.then((t) => navigator.clipboard.writeText(t)).catch(() => text.then(fallbackText)))
  }
  return text.then((t) => (navigator.clipboard?.writeText ? navigator.clipboard.writeText(t) : fallbackText(t)))
}

export default function CopyMenu({ problem, lang, parts, allowAnswer, label }: { problem: Problem; lang: Lang; parts?: Question[]; allowAnswer: boolean; label?: string }) {
  const [msg, setMsg] = useState<string | null>(null)
  const ref = useRef<HTMLDetailsElement>(null)
  const hasFigs = !!(problem.figures?.length || (parts ?? problem.parts).some((q) => q.figures?.length))
  useEffect(() => { if (!msg) return; const t = setTimeout(() => setMsg(null), 2200); return () => clearTimeout(t) }, [msg])
  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) ref.current.open = false }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])
  const run = (w: What) => {
    if (ref.current) ref.current.open = false
    copy(w, problem, lang, parts).then(
      () => setMsg(w === 'fig' ? tr(lang, 'Gambar disalin ✓', 'Image copied ✓') : tr(lang, 'Disalin ✓', 'Copied ✓')),
      () => setMsg(tr(lang, 'Gagal menyalin', 'Copy failed')),
    )
  }
  return (
    <details className="cp-menu" ref={ref}>
      <summary className="btn sm ghost" title={tr(lang, 'Salin soal (misalnya untuk ditanyakan ke AI)', 'Copy the question (e.g. to ask an AI about it)')}>
        {msg ?? <>⧉ {label ?? tr(lang, 'Salin', 'Copy')}</>}
      </summary>
      <div className="cp-pop" role="menu">
        <button role="menuitem" onClick={() => run('q')}><b>{tr(lang, 'Soal', 'Question')}</b><small>{tr(lang, 'Teks, tabel, kode, tautan gambar (Markdown)', 'Text, tables, code, figure links (Markdown)')}</small></button>
        {allowAnswer
          ? <button role="menuitem" onClick={() => run('qa')}><b>{tr(lang, 'Soal + kunci & pembahasan', 'Question + answer & explanation')}</b><small>{tr(lang, 'Untuk minta AI menjelaskan jawabannya', 'To have an AI explain the solution')}</small></button>
          : <span className="cp-off"><b>{tr(lang, 'Soal + kunci', 'Question + answer')}</b><small>{tr(lang, 'Kumpulkan dulu (Mode Kertas)', 'Submit first (Paper mode)')}</small></span>}
        {hasFigs && <button role="menuitem" onClick={() => run('fig')}><b>{tr(lang, 'Gambar sebagai satu gambar', 'Figures as one image')}</b><small>{tr(lang, 'Tempel setelah teksnya', 'Paste it after the text')}</small></button>}
      </div>
    </details>
  )
}
