// Page-side API for the Python worker. All learner code runs here (never on the main thread).
// Usage: const r = await py.run(code, ['5'])  ·  await py.trace(code, stdin, ['i','sum'])  ·  await py.call(src, 'check', [ans])
import type { RunResult } from '../types'

export interface PyRun extends RunResult { error_line?: number | null; prompts: string[] }
export interface PyTraceStep { line: number; fn: string; depth: number; vars: Record<string, string>; out: number }
export interface PyTrace extends PyRun { trace: PyTraceStep[] }
export interface PyStatic { defs: { name: string; returns_value: boolean }[]; uses: Record<'for' | 'while' | 'if' | 'list' | 'list_index', boolean>; syntax_error: string | null }

const WALL_MS = 8000 // hard wall-clock stop (the harness's step budget normally fires first)

let worker: Worker | null = null
let seq = 0
const pending = new Map<number, { resolve: (s: string) => void; reject: (e: Error) => void; timer: ReturnType<typeof setTimeout> }>()
let status: 'idle' | 'loading' | 'ready' = 'idle'
const statusSubs = new Set<(s: typeof status) => void>()
const setStatus = (s: typeof status) => { status = s; statusSubs.forEach((f) => f(s)) }

function spawn() {
  worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
  worker.onmessage = (e: MessageEvent<{ id: number; res?: string; err?: string }>) => {
    const p = pending.get(e.data.id)
    if (!p) return
    clearTimeout(p.timer)
    pending.delete(e.data.id)
    setStatus('ready')
    if (e.data.err) p.reject(new Error(e.data.err))
    else p.resolve(e.data.res!)
  }
  return worker
}

function request(req: object, wall = WALL_MS): Promise<string> {
  const w = worker ?? spawn()
  if (status === 'idle') setStatus('loading')
  const id = ++seq
  return new Promise((resolve, reject) => {
    // first call includes downloading Pyodide: give it a generous budget
    const budget = status === 'ready' ? wall : 90_000
    const timer = setTimeout(() => {
      pending.delete(id)
      w.terminate(); worker = null; setStatus('idle')
      pending.forEach((p) => { clearTimeout(p.timer); p.reject(new Error('Python stopped (timeout)')) }); pending.clear()
      reject(new Error('Program stopped: time limit exceeded (the loop probably never ends)'))
    }, budget)
    pending.set(id, { resolve, reject, timer })
    w.postMessage({ id, req: JSON.stringify(req) })
  })
}

export const py = {
  /** Start downloading Pyodide early (e.g. when a practice page opens). */
  warm() { void request({ op: 'static', code: 'pass' }).catch(() => {}) },
  status: () => status,
  onStatus(f: (s: typeof status) => void) { statusSubs.add(f); return () => { statusSubs.delete(f) } },
  async run(code: string, stdin: string[] = [], maxSteps?: number): Promise<PyRun> {
    try { return JSON.parse(await request({ op: 'run', code, stdin, max_steps: maxSteps })) as PyRun }
    catch (e) { return { stdout: '', error: (e as Error).message, timeout: true, prompts: [] } }
  },
  async trace(code: string, stdin: string[] = [], watch?: string[]): Promise<PyTrace> {
    try { return JSON.parse(await request({ op: 'trace', code, stdin, watch })) as PyTrace }
    catch (e) { return { stdout: '', error: (e as Error).message, timeout: true, prompts: [], trace: [] } }
  },
  async call<T = unknown>(code: string, fn: string, args: unknown[]): Promise<{ value: T | null; error: string | null }> {
    try { return JSON.parse(await request({ op: 'call', code, fn, args })) }
    catch (e) { return { value: null, error: (e as Error).message } }
  },
  async static(code: string): Promise<PyStatic> { return JSON.parse(await request({ op: 'static', code })) as PyStatic },
}
