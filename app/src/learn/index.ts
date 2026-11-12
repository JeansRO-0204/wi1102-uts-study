// Lesson registry: every learn/lessons/*.ts that exports `lesson`, in deck order.
import { DECKS, type DeckId } from '../types'
import type { Lesson } from './types'

const mods = import.meta.glob<{ lesson?: Lesson }>('./lessons/*.ts', { eager: true })
const order = (d: DeckId) => DECKS.findIndex((x) => x.id === d)
export const LESSONS: Lesson[] = Object.values(mods).map((m) => m.lesson).filter((l): l is Lesson => !!l).sort((a, b) => order(a.deck) - order(b.deck))
export const LESSON = new Map(LESSONS.map((l) => [l.deck, l]))
