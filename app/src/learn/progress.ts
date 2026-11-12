// Lesson progress in localStorage (bk.learn): sections marked done per deck, and where the learner was.
import { useSyncExternalStore } from 'react'
import type { DeckId } from '../types'

export interface LessonProgress { done: string[]; last?: string; finished?: number }
type All = Partial<Record<DeckId, LessonProgress>>
const KEY = 'bk.learn'
const subs = new Set<() => void>()
let cache: All | null = null
const read = (): All => { if (cache) return cache; try { cache = JSON.parse(localStorage.getItem(KEY) ?? '{}') as All } catch { cache = {} } return cache }
const write = (a: All) => { cache = a; try { localStorage.setItem(KEY, JSON.stringify(a)) } catch { /* ignore */ } subs.forEach((f) => f()) }

export function useLearn(): All {
  return useSyncExternalStore((f) => { subs.add(f); return () => { subs.delete(f) } }, read, () => ({}))
}
export function markSection(deck: DeckId, id: string, done = true) {
  const a = read(), p = a[deck] ?? { done: [] }
  const set = new Set(p.done); if (done) set.add(id); else set.delete(id)
  write({ ...a, [deck]: { ...p, done: [...set], last: id } })
}
export function setLast(deck: DeckId, id: string) {
  const a = read(), p = a[deck] ?? { done: [] }
  if (p.last !== id) write({ ...a, [deck]: { ...p, last: id } })
}
export function finishLesson(deck: DeckId) {
  const a = read(), p = a[deck] ?? { done: [] }
  write({ ...a, [deck]: { ...p, finished: Date.now() } })
}
export function resetLesson(deck: DeckId) { const a = { ...read() }; delete a[deck]; write(a) }
