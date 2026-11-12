// Progressive help: hints first (nudges), then the worked solution one step at a time. Also the ID/EN language switch.
// Each rung opened lowers the maximum credit (HINT_CAPS); views apply the cap when scoring.
import { useEffect, useState, useSyncExternalStore } from 'react'
import { Md, PageChip } from '../lib/kit'
import type { PageRef, Question } from '../types'
import { IconBulbFill, IconChevronDown } from '../lib/icons'

export type Lang = 'id' | 'en'
/** App-wide choice for Indonesian-source items (English by default; only '"id"' means Indonesian), shared live, persisted in localStorage. */
const langSubs = new Set<() => void>()
const readLang = (): Lang => { try { return localStorage.getItem('bk.lang') === '"id"' ? 'id' : 'en' } catch { return 'en' } }
let curLang: Lang = readLang()
function setLangGlobal(l: Lang) { curLang = l; try { localStorage.setItem('bk.lang', JSON.stringify(l)) } catch { /* ignore */ } langSubs.forEach((f) => f()) }
export function useLang(): [Lang, (l: Lang) => void] {
  const l = useSyncExternalStore((f) => { langSubs.add(f); return () => { langSubs.delete(f) } }, () => curLang)
  return [l, setLangGlobal]
}

/** Page chrome (labels, buttons, feedback of pages that are not tied to one item) is always English. */
export const UI_LANG: Lang = 'en'
/** Language an item is shown in: Indonesian only when its source is Indonesian AND the learner toggled to the original. */
export const effLang = (srcLang: 'id' | 'en' | undefined, g: Lang): Lang => (srcLang === 'id' ? g : 'en')

/** Maximum credit after opening n rungs of the ladder (0 rungs = 100%). Past the table = 0. */
export const HINT_CAPS = [1, 0.85, 0.7, 0.5, 0.3, 0]
export const hintCap = (n: number) => HINT_CAPS[Math.min(n, HINT_CAPS.length - 1)]

/** Language-resolved text of a question. English falls back to Indonesian field by field. */
export function loc(q: Question, lang: Lang) {
  const en = lang === 'en' ? q.en : undefined
  const opts = 'options' in q ? q.options : undefined
  const why = 'why' in q ? q.why : undefined
  return {
    stem: en?.stem ?? q.stem,
    options: opts ? (en?.options?.length === opts.length ? en.options : opts) : undefined,
    why: why ? (en?.why?.length === why.length ? en.why : why) : undefined,
    explanation: en?.explanation ?? q.explanation,
    hints: en?.hints ?? q.hints ?? [],
    work: en?.work ?? q.work ?? splitWork(en?.explanation ?? q.explanation),
    answer: q.kind === 'open' ? (en?.answer ?? q.answer) : undefined,
    keyPoints: q.kind === 'open' ? (en?.keyPoints?.length === q.keyPoints?.length ? en?.keyPoints : q.keyPoints) : undefined,
    labels: q.kind === 'short' ? q.blanks.map((b, i) => en?.labels?.[i] ?? b.label) : undefined,
    plan: q.kind === 'program' ? (en?.plan ?? q.plan) : undefined,
    /** wrong-answer messages / rubric descriptions / sample notes are resolved by the helpers below */
  }
}

/** Pick the text for `lang` from a main/English pair (English mirror may be missing). */
export const pick = (lang: Lang, main: string, en?: string) => (lang === 'en' && en) || main
/** A constraint check() message: plain string or an [indonesian, english] pair. */
export function msgOf(m: unknown, lang: Lang): string {
  if (Array.isArray(m)) return String((lang === 'en' ? m[1] ?? m[0] : m[0]) ?? '')
  return String(m ?? '')
}

/** Split a markdown worked solution into revealable steps (paragraphs / list items / display-math blocks). */
export function splitWork(md: string): string[] {
  const parts: string[] = []
  for (const block of md.split(/\n\s*\n/)) {
    const b = block.trim()
    if (!b) continue
    const lines = b.split('\n')
    // a list block becomes one step per item
    if (lines.length > 1 && lines.every((l) => /^\s*([-*]|\d+[.)])\s/.test(l) || /^\s{2,}/.test(l))) {
      let cur = ''
      for (const l of lines) {
        if (/^\s*([-*]|\d+[.)])\s/.test(l)) { if (cur) parts.push(cur); cur = l.replace(/^\s*([-*]|\d+[.)])\s/, '') } else cur += '\n' + l
      }
      if (cur) parts.push(cur)
    } else parts.push(b)
  }
  return parts
}

const T = {
  en: { hint: 'Hint', step: 'Show next step', all: 'Show all', of: 'of', hide: 'Hide help', work: 'Worked solution', none: 'No hints for this one: try the worked solution.', cap: 'max credit' },
  id: { hint: 'Petunjuk', step: 'Tampilkan langkah berikutnya', all: 'Tampilkan semua', of: 'dari', hide: 'Sembunyikan', work: 'Pembahasan', none: 'Tidak ada petunjuk: coba lihat pembahasan.', cap: 'nilai maks' },
}

/**
 * Hint ladder: each click reveals one more rung: hint 1 → hint 2 → … → step 1 of the worked solution → step 2 → …
 * `onUse` reports how far the learner went (views cap the score with hintCap(n)).
 * Archetype views may pass extra rungs (plan, Parsons, skeleton) as `hints` entries; they render as markdown.
 */
export function HintLadder({ hints, work, lang = 'en', resetKey, onUse, refs = [] }: { hints: string[]; work: string[]; lang?: Lang; resetKey?: string; onUse?: (n: number) => void; refs?: PageRef[] }) {
  const [n, setN] = useState(0)
  const [open, setOpen] = useState(true)
  useEffect(() => { setN(0); setOpen(true) }, [resetKey])
  const t = T[lang]
  const total = hints.length + work.length
  if (!total && !refs.length) return null
  const shownH = hints.slice(0, Math.min(n, hints.length))
  const shownW = work.slice(0, Math.max(0, n - hints.length))
  const more = (k: number) => { const v = Math.min(total, n + k); setN(v); setOpen(true); onUse?.(v) }
  const inHints = n < hints.length
  const label = inHints ? `${t.hint} ${n + 1} ${t.of} ${hints.length}` : `${t.step} (${n - hints.length + 1}/${work.length})`
  return (
    <div className="hl">
      {open && n > 0 && (
        <div className="hl-list">
          {shownH.map((h, i) => (
            <div key={'h' + i} className="hl-hint"><IconBulbFill size={15} /><div><b>{t.hint} {i + 1}</b><Md>{h}</Md></div></div>
          ))}
          {shownW.length > 0 && (
            <div className="hl-work">
              <b>{t.work}</b>
              <ol>{shownW.map((w, i) => <li key={'w' + i}><Md>{w}</Md></li>)}</ol>
            </div>
          )}
        </div>
      )}
      <div className="hl-bar">
        {n < total && <button className="btn sm hl-btn" onClick={() => more(1)}>{inHints ? <IconBulbFill size={14} /> : null}{label}</button>}
        {n < total && !inHints && work.length - (n - hints.length) > 1 && <button className="btn sm ghost" onClick={() => more(total)}>{t.all}</button>}
        {n > 0 && <button className="btn sm ghost" onClick={() => setOpen((o) => !o)}>{open ? t.hide : `${t.hint} (${n})`}<IconChevronDown size={12} style={{ transform: open ? 'rotate(180deg)' : undefined }} /></button>}
        {refs.map((r) => <PageChip key={r.src + r.page} r={r} />)}
        {n > 0 && <span className="hl-cap" title={t.cap}>{t.cap}: {Math.round(hintCap(n) * 100)}%</span>}
        <span className="hl-pips" aria-hidden>{Array.from({ length: total }, (_, i) => <i key={i} className={(i < hints.length ? 'h' : 'w') + (i < n ? ' on' : '')} />)}</span>
      </div>
    </div>
  )
}

/** ID | EN segmented switch. */
export function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="seg lang-sw" title="Language of the original source (ID) or English">
      <button className={lang === 'id' ? 'on' : ''} onClick={() => setLang('id')}>ID</button>
      <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
    </div>
  )
}

/** Toggle for items whose source is Indonesian: "Original (ID) / English". Renders nothing otherwise. */
export function ItemLangToggle({ srcLang }: { srcLang?: 'id' | 'en' }) {
  const [lang, setLang] = useLang()
  if (srcLang !== 'id') return null
  return <span className="lang-tg" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><small className="muted">Original (ID) / English</small><LangSwitch lang={lang} setLang={setLang} /></span>
}
