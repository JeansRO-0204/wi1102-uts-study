import { useContext, type ReactNode } from 'react'
import { PageCtx, pageSrc } from '../lib/kit'
import { DECKS, RUBRIC_INDEX, type Archetype, type DeckId, type MisTag, type PageRef, type RubricScore, type SourceKind } from '../types'
import type { Lang } from './Hints'

export const deckColor = (d: DeckId) => DECKS.find((x) => x.id === d)?.color ?? '#64748b'
export const pct = (x: number) => Math.round(x * 100) + '%'
export const accColor = (a: number) => (a >= 0.8 ? 'var(--ok)' : a >= 0.55 ? '#d97706' : 'var(--err)')
/** Language pick: tr(lang, 'Indonesia', 'English'). */
export const tr = (lang: Lang, id: string, en: string) => (lang === 'en' ? en : id)

export function Bar({ value, color, label, right }: { value: number; color?: string; label?: ReactNode; right?: ReactNode }) {
  return (
    <div className="pr-bar">
      {label && <div className="pr-bar-label">{label}</div>}
      <div className="pr-bar-track"><div className="pr-bar-fill" style={{ width: `${Math.max(2, value * 100)}%`, background: color ?? accColor(value) }} /></div>
      {right && <div className="pr-bar-right">{right}</div>}
    </div>
  )
}

/** Circular mastery ring; `value` 0..1 or null (no data). */
export function Ring({ value, size = 56, label }: { value: number | null; size?: number; label?: ReactNode }) {
  const r = (size - 8) / 2, c = 2 * Math.PI * r
  const v = value ?? 0
  return (
    <span className="pr-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--soft)" strokeWidth={6} />
        {value != null && <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={accColor(v)} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={`${c * v} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />}
      </svg>
      <b>{label ?? (value == null ? '–' : Math.round(v * 100))}</b>
    </span>
  )
}

/* ---------- navigation ---------- */
export const ROUTES = { home: '', practice: 'latihan', past: 'soal-lalu', mock: 'ujian', cards: 'kartu', syntax: 'sintaks', progress: 'progres' } as const
/** Navigate by hash: go('latihan'), go('soal-lalu/uts2025'), go() = home. */
export function go(sub?: string) { location.hash = '#/' + (sub ?? '') }

/** One-shot hand-off between pages (Beranda/Progres → Latihan). Not under bk.* so it is not exported. */
export interface Preset { deck?: DeckId; archetype?: Archetype; topic?: string; tag?: MisTag; flaggedOnly?: boolean; wrongOnly?: boolean; paper?: string; mode?: 'test' | 'learn'; autostart?: boolean }
export function setPreset(p: Preset) { try { sessionStorage.setItem('practice.preset', JSON.stringify(p)) } catch { /* ignore */ } }
export function takePreset(): Preset | null {
  try { const s = sessionStorage.getItem('practice.preset'); if (s) { sessionStorage.removeItem('practice.preset'); return JSON.parse(s) as Preset } } catch { /* ignore */ }
  return null
}

/* ---------- labels ---------- */
export const SOURCE_LABEL: Record<SourceKind, string> = {
  uts: 'UTS', guide: 'Grading guide', tahunlalu: 'UTS last year', latihan: 'Latihan (exercises)', mock: 'Mock-up', tubay: 'TUBAY (peer tutoring)',
  practicum: 'Practicum', module: 'Python module', extra: 'D05 extra exercises', slide: 'Slides', older: 'Old KU1102', generated: 'Site-generated',
}
/** Nearest official rubric index letter for a 0..4 score: 3.2 -> B, 3.6 -> AB. */
export function rubricLetter(x: number): string {
  const steps: RubricScore[] = [0, 1, 2, 3, 3.5, 4]
  let best = steps[0]
  for (const s of steps) if (Math.abs(s - x) < Math.abs(best - x)) best = s
  return RUBRIC_INDEX[best]
}
export const fmt04 = (x: number) => (Math.round(x * 10) / 10).toString()

/** Figures of a problem or question: page images (open the lightbox) or plain image paths. */
export function Figures({ figures }: { figures?: (PageRef | string)[] }) {
  const open = useContext(PageCtx)
  if (!figures?.length) return null
  return (
    <div className="pp-figs">
      {figures.map((f, i) => typeof f === 'string'
        ? <figure key={i} className="pp-fig"><img src={f} alt="" loading="lazy" /></figure>
        : <figure key={i} className="pp-fig"><button onClick={() => open(f)} title="Enlarge"><img src={pageSrc(f.src, f.page)} alt={`${f.src} p. ${f.page}`} loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} /></button><figcaption>{f.src.replace(/_/g, ' ')} · p. {f.page}</figcaption></figure>)}
    </div>
  )
}
