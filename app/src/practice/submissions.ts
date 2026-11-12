// LeetCode-style submission history (localStorage `bk.subs`, per question id, newest first, capped) and editor drafts
// (`bk.draft.<id>.<rep>`). Both live under `bk.` so Export/Import carries them. Also small helpers shared by the Program /
// Trace views and the Problems page (verdict classification, similar problems, solved status).
import { useSyncExternalStore } from 'react'
import type { Problem, Question, Rep } from '../types'
import { POOL, POOL_Q } from './pool'
import type { Attempt } from './store'

export type SubVerdict = 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Time Limit Exceeded' | 'Syntax Error' | 'Structure requirement not met'
export interface Submission { t: number; verdict: SubVerdict; passed: number; total: number; rep: Rep; code: string; mode: 'test' | 'learn'; hints: number }

/** Colour tone of a verdict: green / red / amber (the CSS classes are .prog-tone-ok / err / warn). */
export const verdictTone = (v: SubVerdict | 'Finished'): 'ok' | 'err' | 'warn' | 'info' =>
  v === 'Accepted' ? 'ok' : v === 'Structure requirement not met' ? 'warn' : v === 'Finished' ? 'info' : 'err'

/** Minimal shape of a per-case result, enough to classify a verdict. */
export interface CaseLite { ok: boolean | null; error?: string; timeout?: boolean }
const SYNTAX = /(^|\n)\s*(Syntax|Indentation|Tab)Error|invalid syntax/
/** LeetCode-style verdict: the first failing case decides (time limit, syntax/runtime error, wrong answer); structure comes last. */
export function verdictFromCases(cases: CaseLite[], mustOk: boolean, compileFail = false): SubVerdict | 'Finished' {
  if (compileFail) return 'Syntax Error'
  for (const c of cases) {
    if (c.timeout) return 'Time Limit Exceeded'
    if (c.error) return SYNTAX.test(c.error) ? 'Syntax Error' : 'Runtime Error'
    if (c.ok === false) return 'Wrong Answer'
  }
  if (!mustOk) return 'Structure requirement not met'
  return cases.some((c) => c.ok === true) ? 'Accepted' : 'Finished'
}

/* ---------- store ---------- */
const KEY = 'bk.subs'
const CAP = 30
const subs = new Set<() => void>()
let snap: { raw: string | null; data: Record<string, Submission[]> } = { raw: null, data: {} }
function read(): Record<string, Submission[]> {
  let raw: string | null = null
  try { raw = localStorage.getItem(KEY) } catch { /* ignore */ }
  if (raw === snap.raw) return snap.data
  let data: Record<string, Submission[]> = {}
  try { const j = raw ? JSON.parse(raw) : {}; if (j && typeof j === 'object') data = j } catch { /* ignore */ }
  snap = { raw, data }
  return data
}
if (typeof window !== 'undefined') window.addEventListener('storage', (e) => { if (e.key === KEY) subs.forEach((f) => f()) })

export function allSubmissions(): Record<string, Submission[]> { return read() }
export function getSubmissions(id: string): Submission[] { return read()[id] ?? [] }
export function logSubmission(id: string, s: Omit<Submission, 't'>) {
  const data = { ...read() }
  data[id] = [{ ...s, t: Date.now() }, ...(data[id] ?? [])].slice(0, CAP)
  try { localStorage.setItem(KEY, JSON.stringify(data)) } catch { /* ignore */ }
  subs.forEach((f) => f())
}
export function clearSubmissions(id: string) {
  const data = { ...read() }; delete data[id]
  try { localStorage.setItem(KEY, JSON.stringify(data)) } catch { /* ignore */ }
  subs.forEach((f) => f())
}
const EMPTY: Submission[] = []
/** Submissions of one question, newest first. */
export function useSubmissions(id: string): Submission[] {
  return useSyncExternalStore((f) => { subs.add(f); return () => { subs.delete(f) } }, () => read()[id] ?? EMPTY, () => EMPTY)
}

/* ---------- drafts ---------- */
const dkey = (id: string, rep: Rep) => `bk.draft.${id}.${rep}`
export function loadDraft(id: string, rep: Rep): string | null { try { return localStorage.getItem(dkey(id, rep)) } catch { return null } }
export function saveDraft(id: string, rep: Rep, text: string) {
  try { if (text) localStorage.setItem(dkey(id, rep), text); else localStorage.removeItem(dkey(id, rep)) } catch { /* ignore */ }
}
export function clearDraft(id: string, rep: Rep) { try { localStorage.removeItem(dkey(id, rep)) } catch { /* ignore */ } }

/* ---------- helpers ---------- */
export function timeAgo(t: number): string {
  const s = Math.max(0, Math.round((Date.now() - t) / 1000))
  if (s < 45) return 'just now'
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))} min ago`
  if (s < 86400) return `${Math.round(s / 3600)} h ago`
  return `${Math.round(s / 86400)} d ago`
}

/** 'solved' = every part has a fully-correct Paper-mode attempt; 'attempted' = any attempt; else 'new'. */
export function problemStatus(p: Problem, attempts: Attempt[]): 'solved' | 'attempted' | 'new' {
  const ids = new Set(p.parts.map((q) => q.id))
  const mine = attempts.filter((a) => ids.has(a.id))
  if (!mine.length) return 'new'
  const solved = p.parts.every((q) => mine.some((a) => a.id === q.id && a.mode === 'test' && a.correct))
  return solved ? 'solved' : 'attempted'
}

/** Up to `n` other problems that share a `patterns` entry with `q` (most shared first; ties broken by a stable hash of the ids). */
export function similarProblems(q: Question, problem: Problem, n = 3): Problem[] {
  const mine = new Set(q.patterns ?? [])
  if (!mine.size) return []
  const hash = (s: string) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h) }
  const best = new Map<string, { p: Problem; shared: number }>()
  for (const { q: o, p } of POOL_Q) {
    if (p.id === problem.id || !POOL.includes(p) || p.source.outOfScope) continue
    const shared = (o.patterns ?? []).filter((x) => mine.has(x)).length
    if (!shared) continue
    const cur = best.get(p.id)
    if (!cur || cur.shared < shared) best.set(p.id, { p, shared })
  }
  return [...best.values()].sort((a, b) => b.shared - a.shared || hash(a.p.id + q.id) - hash(b.p.id + q.id)).slice(0, n).map((x) => x.p)
}
