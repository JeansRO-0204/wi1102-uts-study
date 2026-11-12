// Flowchart block tree → Python. PURE TypeScript (Node-importable): only `import type`, explicit `.ts` relative imports.
// Every block's text goes through the pseudocode translator (pseudo.ts) so the two representations share one dialect.
import type { Flowchart, FlowBlock } from '../types'
import { pseudoToPython } from './pseudo.ts'

export interface FlowResult {
  code: string
  errors: string[]
  /** map[i] = id of the block that produced Python line i+1 (null for generated lines). Ids: see `blockPathLabel`. */
  map: (string | null)[]
}

/**
 * Block ids: top-level blocks are "0", "1", …; children use "<parent>.then.<i>", "<parent>.else.<i>", "<parent>.body.<i>".
 * FlowView's `active` prop takes one of these ids.
 */
export function blockPathLabel(id: string): string {
  const parts = id.split('.')
  let out = `block ${Number(parts[0]) + 1}`
  for (let i = 1; i < parts.length; i += 2) {
    const where = parts[i] === 'then' ? 'Yes branch' : parts[i] === 'else' ? 'No branch' : 'body'
    out += ` › ${where} › block ${Number(parts[i + 1]) + 1}`
  }
  return out
}

const IO_WORD = /^(input|output|read|baca|print|write|tulis|cetak|masukan|tampilkan|display)\b/i

/** the pseudocode text of one block's own statement(s) */
function ioText(dir: 'in' | 'out', text: string): string[] {
  const t = text.trim()
  if (!t) return [dir === 'in' ? 'input()' : 'output()']
  return t.split('\n').map((x) => x.trim()).filter(Boolean).map((l) => (IO_WORD.test(l) ? l : `${dir === 'in' ? 'input' : 'output'}(${l})`))
}

export function flowToPython(f: Flowchart): FlowResult {
  try { return compile(f) } catch (e) { return { code: '', errors: ['Broken flowchart: ' + (e as Error).message], map: [] } }
}

function compile(f: Flowchart): FlowResult {
  const errors: string[] = []
  const lines: { text: string; id: string | null }[] = []
  const emit = (d: number, text: string, id: string | null) => lines.push({ text: '  '.repeat(d) + text, id })

  const walk = (blocks: FlowBlock[], prefix: string, d: number): void => {
    ;(blocks ?? []).forEach((b, i) => {
      if (!b || typeof b !== 'object') { errors.push(`${blockPathLabel(prefix ? `${prefix}.${i}` : String(i))}: empty block`); return }
      const id = prefix ? `${prefix}.${i}` : String(i)
      switch (b.t) {
        case 'io': for (const l of ioText(b.dir, b.text)) emit(d, l, id); break
        case 'process':
        case 'call':
          if (!b.text.trim()) errors.push(`${blockPathLabel(id)}: empty box, write its command`)
          for (const l of b.text.split('\n')) if (l.trim()) emit(d, l.trim(), id)
          break
        case 'if':
          if (!b.cond.trim()) errors.push(`${blockPathLabel(id)}: the decision condition is still empty`)
          emit(d, `if (${b.cond.trim() || 'False'}) then`, id)
          walk(b.then, `${id}.then`, d + 1)
          if (b.else && b.else.length) { emit(d, 'else', id); walk(b.else, `${id}.else`, d + 1) }
          break
        case 'while':
          if (!b.cond.trim()) errors.push(`${blockPathLabel(id)}: the loop condition is still empty`)
          emit(d, `while (${b.cond.trim() || 'False'}) do`, id)
          walk(b.body, `${id}.body`, d + 1)
          break
        case 'repeat':
          if (!b.until.trim()) errors.push(`${blockPathLabel(id)}: the stop condition is still empty`)
          emit(d, 'repeat', id)
          walk(b.body, `${id}.body`, d + 1)
          emit(d, `until (${b.until.trim() || 'True'})`, id)
          break
        default: errors.push(`${blockPathLabel(id)}: unknown block type`)
      }
    })
  }
  if (!f || !Array.isArray(f.blocks) || !f.blocks.length) return { code: '', errors: ['The flowchart is still empty'], map: [] }
  walk(f.blocks, '', 0)

  const res = pseudoToPython(lines.map((l) => l.text).join('\n'))
  for (const e of res.errors) {
    const id = lines[e.line - 1]?.id
    errors.push(id ? `${blockPathLabel(id)}: ${e.msg}` : e.msg)
  }
  // empty bodies in flowcharts are fine; the translator emits `pass`
  const map = res.map.map((n) => (n > 0 ? lines[n - 1]?.id ?? null : null))
  return { code: res.code, errors, map }
}
