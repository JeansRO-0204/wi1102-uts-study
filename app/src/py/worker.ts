/// <reference lib="webworker" />
// Pyodide Web Worker (ES module): loads CPython-in-WASM once, then serves harness.py requests.
// The page terminates and respawns this worker if a request exceeds its wall-clock budget (see client.ts),
// on top of the harness's own deterministic step budget.
import harnessSrc from './harness.py?raw'

const PYODIDE_VERSION = '0.27.2'
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

interface PyodideLike { runPython(code: string): unknown; globals: { get(name: string): (s: string) => string } }

let ready: Promise<(req: string) => string> | null = null
function boot() {
  if (!ready) {
    ready = (async () => {
      const mod = (await import(/* @vite-ignore */ INDEX_URL + 'pyodide.mjs')) as { loadPyodide(o: { indexURL: string }): Promise<PyodideLike> }
      const py = await mod.loadPyodide({ indexURL: INDEX_URL })
      py.runPython(harnessSrc.replace(/if __name__ == "__main__":[\s\S]*$/, ''))
      const handle = py.globals.get('handle')
      return (req: string) => handle(req)
    })()
    ready.catch(() => { ready = null })
  }
  return ready
}

self.onmessage = async (e: MessageEvent<{ id: number; req: string }>) => {
  const { id, req } = e.data
  try {
    const handle = await boot()
    ;(self as unknown as Worker).postMessage({ id, res: handle(req) })
  } catch (err) {
    ;(self as unknown as Worker).postMessage({ id, err: String(err) })
  }
}
