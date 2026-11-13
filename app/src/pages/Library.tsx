// Library: every source document (slides, practicum, practice sets, past papers, older KU1102 papers).
// #/library            → shelves + full-text search over every page
// #/library/<src>[/n]  → reader: continuous page images, page jump, PDF open/download; click a page to zoom.
// Text index and PDFs come from build/library.mjs (public/library.json, public/materials/*.pdf).
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { PAGE_COUNT, PageCtx, isTyping, pageSrc } from '../lib/kit'
import { IconArrowLeft, IconChevronLeft, IconChevronRight } from '../lib/icons'
import './library.css'

interface Doc { src: string; title: string; group: GroupId; lang: 'en' | 'id'; note?: string }
type GroupId = 'slides' | 'practicum' | 'practice' | 'past' | 'older'
const GROUPS: { id: GroupId; title: string; blurb: string }[] = [
  { id: 'slides', title: 'Lecture slides', blurb: 'WI1102 decks, in English (the course intro is in Indonesian). Decks 03 and 07–09 are not in the library yet.' },
  { id: 'practicum', title: 'Practicum', blurb: 'Python module and the four practicum sheets, in English.' },
  { id: 'practice', title: 'Practice sets & mocks', blurb: 'Exercise sheets, tutor-made sets and mock exams. Tutor sets and mocks are unofficial.' },
  { id: 'past', title: 'Past papers', blurb: 'Previous WI1102 exams and the official marking guide.' },
  { id: 'older', title: 'Older KU1102 papers', blurb: 'From the predecessor course. Partly out of scope for WI1102.' },
]
const DOCS: Doc[] = [
  { src: 'D00_CourseIntro', title: '00 · Course Introduction', group: 'slides', lang: 'id' },
  { src: 'D01_ComputationalThinking', title: '01 · Computational Thinking', group: 'slides', lang: 'en' },
  { src: 'D02_AlgorithmicThinking', title: '02 · Algorithmic Thinking', group: 'slides', lang: 'en' },
  { src: 'D04_BasicStructure', title: '04 · Basic Structure of a Procedural Program', group: 'slides', lang: 'en' },
  { src: 'D05_Conditionals_Repetition', title: '05 · Conditionals & Repetition', group: 'slides', lang: 'en' },
  { src: 'D06_Array', title: '06 · Array', group: 'slides', lang: 'en' },
  { src: 'D10_Subprogram', title: '10 · Subprogram', group: 'slides', lang: 'en' },
  { src: 'D11_ComputingImpact', title: '11 · Computing Impact', group: 'slides', lang: 'en' },
  { src: 'D05_ExtraExercises', title: 'Deck 05 Extra Exercises', group: 'practice', lang: 'en' },
  { src: 'D04_LatihanPython', title: 'Week 4 Python Exercises (Latihan Python)', group: 'practice', lang: 'id' },
  { src: 'D06_ArrayExercises', title: 'Deck 06 Array Exercises', group: 'practice', lang: 'id' },
  { src: 'Latihan-1', title: 'Exercise Set 1 (Latihan 1)', group: 'practice', lang: 'id' },
  { src: 'Latihan-2', title: 'Exercise Set 2 (Latihan 2)', group: 'practice', lang: 'id' },
  { src: 'Mock_AcadsFTI25', title: 'Mock · Acads FTI 2025', group: 'practice', lang: 'id', note: 'unofficial' },
  { src: 'Mock_Pengkom', title: 'Mock · Pengkom', group: 'practice', lang: 'id', note: 'unofficial' },
  { src: 'Mock_Gemini', title: 'Mock · Gemini-generated', group: 'practice', lang: 'id', note: 'unofficial' },
  { src: 'TUBAY_STEI25', title: 'TUBAY STEI 2025', group: 'practice', lang: 'id', note: 'unofficial' },
  { src: 'Tutor_Orkhan', title: 'Tutor set · Python programming (Orkhan)', group: 'practice', lang: 'id', note: 'unofficial' },
  { src: 'Tutor_ObjekAneh', title: 'Tutor problem · Objek Aneh', group: 'practice', lang: 'id', note: 'unofficial' },
  { src: 'UTS_CT_TahunLalu', title: 'UTS · Previous year (with answers)', group: 'past', lang: 'id' },
  { src: 'UTS2024_PetunjukPenilaian_BagII', title: 'UTS 2024 · Marking guide, Part II', group: 'past', lang: 'id' },
  { src: 'UTS2025_attempt_scan', title: 'UTS 2025 · Marked attempt (scan)', group: 'past', lang: 'id', note: 'images only' },
  { src: 'UTS_KU1102_2018', title: 'KU1102 UTS 2018', group: 'older', lang: 'id' },
  { src: 'UTS_KU1102_2019', title: 'KU1102 UTS 2019', group: 'older', lang: 'id' },
  { src: 'UTS_KU1102_2021', title: 'KU1102 UTS 2021', group: 'older', lang: 'id' },
  { src: 'UTS_KU1102_2022', title: 'KU1102 UTS 2022 (programming stream)', group: 'older', lang: 'id' },
  { src: 'UTS_KU1102_2023', title: 'KU1102 UTS 2023 (programming stream)', group: 'older', lang: 'id' },
  { src: 'KU1102_LatihanSoal_2019', title: 'KU1102 Practice Problems 2019', group: 'older', lang: 'id' },
]
// the practicum sheets are course-internal: listed only on a local dev server, never on the public site
if (import.meta.env.DEV) DOCS.push(
  { src: 'Module_Python', title: 'Python Module', group: 'practicum', lang: 'en' },
  { src: 'Praktikum1_BasicStructure', title: 'Practicum 1 · Basic Structure', group: 'practicum', lang: 'en' },
  { src: 'Praktikum2_Conditionals', title: 'Practicum 2 · Conditionals', group: 'practicum', lang: 'en' },
  { src: 'Praktikum3_LoopArray', title: 'Practicum 3 · Loops & Arrays', group: 'practicum', lang: 'en' },
  { src: 'Praktikum4_Subprogram', title: 'Practicum 4 · Subprograms', group: 'practicum', lang: 'en' },
)
/** Outside resources, shown on Home and the Library. */
export const LINKS = [
  { href: 'https://acads.steik-site.com/academic', title: 'Acads STEI-K 2025', desc: 'Academic division site: materials and exam prep for the cohort' },
  { href: 'https://drive.google.com/drive/folders/1ZBKbmyllppje4GJrv8rCi2YrTtjtOImO', title: 'Computational Thinking course Drive', desc: 'Official slides, past papers and practice sets (Google Drive)' },
]
export function ExternalLinks() {
  return (
    <div className="lib-links">
      {LINKS.map((l) => (
        <a key={l.href} className="lib-link" href={l.href} target="_blank" rel="noopener noreferrer">
          <b>{l.title} <span aria-hidden>↗</span></b><small className="muted">{l.desc}</small>
        </a>
      ))}
    </div>
  )
}
const docOf = (src: string) => DOCS.find((d) => d.src === src)

interface Index { pdfs: string[]; counts: Record<string, number>; dims: Record<string, [number, number] | null>; pages: [string, number, string][] }
const EMPTY: Index = { pdfs: [], counts: {}, dims: {}, pages: [] }
let indexP: Promise<Index> | null = null
/** Page count: library.json first, else the app-wide index (public/pages/index.json). */
const countOf = (ix: Index | null, src: string) => ix?.counts[src] ?? PAGE_COUNT[src] ?? 0
const loadIndex = () => (indexP ??= fetch('library.json').then((r) => (r.ok ? r.json() : EMPTY)).catch(() => EMPTY))
function useIndex() {
  const [ix, setIx] = useState<Index | null>(null)
  useEffect(() => { loadIndex().then(setIx) }, [])
  return ix
}
const pdfHref = (src: string) => `materials/${src}.pdf`

export default function Library({ src, page }: { src?: string; page?: number }) {
  const doc = src ? docOf(src) : undefined
  if (src) return doc ? <Reader doc={doc} start={page} /> : <div className="pr-page"><p className="muted">No document <code>{src}</code>.</p><a className="btn" href="#/library">← Library</a></div>
  return <Shelves />
}

/* ---------------- shelves + search ---------------- */

function Shelves() {
  const ix = useIndex()
  const [q, setQ] = useState('')
  const [group, setGroup] = useState<'' | GroupId>('')
  const hits = useMemo(() => search(ix, q, group), [ix, q, group])
  const searching = q.trim().length >= 2
  return (
    <div className="pr-page lib">
      <div className="lib-head">
        <div>
          <h2>Library</h2>
          <p className="muted">{DOCS.length} documents · {DOCS.reduce((s, d) => s + countOf(ix, d.src), 0) || '…'} pages. Search every page, or open a document to read it.</p>
        </div>
      </div>
      <ExternalLinks />
      <div className="lib-search">
        <input type="search" placeholder="Search all materials, e.g. KAMUS, while, return, decomposition…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search all materials" autoFocus />
        <select value={group} onChange={(e) => setGroup(e.target.value as '' | GroupId)} aria-label="Collection">
          <option value="">All collections</option>{GROUPS.filter((g) => DOCS.some((d) => d.group === g.id)).map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
        </select>
      </div>

      {searching ? (
        <section className="lib-results" aria-live="polite">
          {!ix ? <p className="muted">Loading the text index…</p> : (
            <>
              <p className="muted">{hits.total} matching page{hits.total === 1 ? '' : 's'}{hits.total > hits.list.length ? ` (showing ${hits.list.length})` : ''}. Scanned pages have no text and aren't searchable.</p>
              {hits.byDoc.map(([s, list]) => (
                <div key={s} className="lib-hitdoc">
                  <h4><a href={`#/library/${s}`}>{docOf(s)?.title ?? s}</a> <span className="muted">{list.length} page{list.length === 1 ? '' : 's'}</span></h4>
                  {list.map((h) => (
                    <a key={h.page} className="lib-hit" href={`#/library/${s}/${h.page}`}>
                      <img src={pageSrc(s, h.page)} alt="" loading="lazy" />
                      <span><b>Page {h.page}</b><small><Snippet text={h.text} q={q} /></small></span>
                    </a>
                  ))}
                </div>
              ))}
            </>
          )}
        </section>
      ) : (
        GROUPS.filter((g) => (!group || g.id === group) && DOCS.some((d) => d.group === g.id)).map((g) => (
          <section key={g.id} className="lib-shelf">
            <h3>{g.title}</h3>
            <p className="muted">{g.blurb}</p>
            <div className="lib-grid">
              {DOCS.filter((d) => d.group === g.id).map((d) => (
                <a key={d.src} className="lib-card" href={`#/library/${d.src}`}>
                  <span className="lib-thumb"><img src={pageSrc(d.src, 1)} alt="" loading="lazy" /></span>
                  <span className="lib-meta">
                    <b>{d.title}</b>
                    <small className="muted">{countOf(ix, d.src) || '–'} pages · {d.lang === 'id' ? 'Indonesian' : 'English'}{d.note ? ` · ${d.note}` : ''}</small>
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}

const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
function search(ix: Index | null, q: string, group: '' | GroupId) {
  const terms = norm(q).trim().split(/\s+/).filter((t) => t.length >= 2)
  if (!ix || !terms.length) return { total: 0, list: [], byDoc: [] as [string, { page: number; text: string }[]][] }
  const all = ix.pages.filter(([s, , t]) => {
    const d = docOf(s)
    if (!d || (group && d.group !== group)) return false
    const n = norm(t)
    return terms.every((w) => n.includes(w))
  })
  // rank: more occurrences first, then library order
  const score = (t: string) => terms.reduce((s, w) => s + norm(t).split(w).length - 1, 0)
  const order = (s: string) => DOCS.findIndex((d) => d.src === s)
  const list = all.map(([s, page, text]) => ({ s, page, text, sc: score(text) }))
    .sort((a, b) => order(a.s) - order(b.s) || a.page - b.page).slice(0, 120)
  const byDoc = new Map<string, { page: number; text: string; sc: number }[]>()
  for (const h of list) byDoc.set(h.s, [...(byDoc.get(h.s) ?? []), h])
  const ranked = [...byDoc.entries()].sort((a, b) => b[1].reduce((s, h) => s + h.sc, 0) - a[1].reduce((s, h) => s + h.sc, 0))
  return { total: all.length, list, byDoc: ranked }
}

/** ~180 chars of page text around the first match, with every term highlighted. */
function Snippet({ text, q }: { text: string; q: string }) {
  const terms = norm(q).trim().split(/\s+/).filter((t) => t.length >= 2)
  const flat = text.replace(/\s+/g, ' ')
  const at = Math.max(0, norm(flat).indexOf(terms[0] ?? '') - 60)
  const cut = (at > 0 ? '…' : '') + flat.slice(at, at + 180) + (flat.length > at + 180 ? '…' : '')
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return <>{cut.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part))}</>
}

/* ---------------- reader ---------------- */

function Reader({ doc, start }: { doc: Doc; start?: number }) {
  const ix = useIndex()
  const open = useContext(PageCtx)
  const total = countOf(ix, doc.src)
  const [w, h] = ix?.dims[doc.src] ?? [1600, 900]
  const [cur, setCur] = useState(start ?? 1)
  const [jump, setJump] = useState('')
  const refs = useRef<(HTMLElement | null)[]>([])
  const hasPdf = ix?.pdfs.includes(doc.src)

  // scroll to the start page once the page list exists
  useEffect(() => {
    if (!total || !start) return
    requestAnimationFrame(() => refs.current[start - 1]?.scrollIntoView({ block: 'start' }))
  }, [total, start, doc.src])
  // track the page in view and keep it in the URL (replaceState: no history spam)
  useEffect(() => {
    if (!total) return
    const io = new IntersectionObserver((es) => {
      const vis = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (vis) {
        const n = Number((vis.target as HTMLElement).dataset.page)
        setCur(n)
        history.replaceState(null, '', `#/library/${doc.src}/${n}`)
      }
    }, { rootMargin: '-40% 0px -55% 0px' })
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [total, doc.src])

  const goTo = (n: number) => {
    const p = Math.min(Math.max(1, n), total || 1)
    refs.current[p - 1]?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (isTyping(e)) return
      if (e.key === 'j') goTo(cur + 1)
      if (e.key === 'k') goTo(cur - 1)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  })

  return (
    <div className="lib-reader">
      <div className="lib-bar">
        <a className="btn sm ghost" href="#/library" title="Back to the library"><IconArrowLeft size={14} /> Library</a>
        <b className="lib-title">{doc.title}</b>
        <span className="lib-nav">
          <button className="btn sm ghost" onClick={() => goTo(cur - 1)} disabled={cur <= 1} aria-label="Previous page"><IconChevronLeft size={14} /></button>
          <form onSubmit={(e) => { e.preventDefault(); goTo(Number(jump)); setJump('') }}>
            <input inputMode="numeric" value={jump} placeholder={String(cur)} onChange={(e) => setJump(e.target.value.replace(/\D/g, ''))} aria-label="Go to page" />
          </form>
          <span className="muted">/ {total || '…'}</span>
          <button className="btn sm ghost" onClick={() => goTo(cur + 1)} disabled={!!total && cur >= total} aria-label="Next page"><IconChevronRight size={14} /></button>
        </span>
        {hasPdf && <span className="lib-pdf">
          <a className="btn sm" href={pdfHref(doc.src)} target="_blank" rel="noopener">Open PDF</a>
          <a className="btn sm ghost" href={pdfHref(doc.src)} download>Download</a>
        </span>}
      </div>
      <div className="lib-pages">
        {Array.from({ length: total }, (_, i) => (
          <figure key={i} ref={(el) => { refs.current[i] = el }} data-page={i + 1} className="lib-page" id={`p${i + 1}`}>
            <button type="button" onClick={() => open({ src: doc.src, page: i + 1 })} title="Zoom">
              <img src={pageSrc(doc.src, i + 1)} alt={`${doc.title}, page ${i + 1}`} loading="lazy" decoding="async" width={w} height={h} />
            </button>
            <figcaption className="muted">{i + 1}</figcaption>
          </figure>
        ))}
        {!total && <p className="muted">Loading…</p>}
      </div>
    </div>
  )
}
