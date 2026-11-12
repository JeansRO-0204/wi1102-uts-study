// Pure tree operations on a FlowBlock tree (Node-importable: only `import type`).
// Ids follow flow.ts: "3", "1.then.0", "2.body.1". A *list path* names a block list: "" (top level), "1.then", "2.body", "1.else".
// A *slot* is (listPath, index): the insertion point before element `index` of that list (index === length means the end).
import type { FlowBlock } from '../types'

type Blocks = FlowBlock[]
type Rec = Record<string, unknown>

export function splitId(id: string): { listPath: string; index: number } {
  const p = id.split('.')
  return { listPath: p.slice(0, -1).join('.'), index: Number(p[p.length - 1]) }
}
export const joinId = (listPath: string, index: number) => (listPath ? `${listPath}.${index}` : String(index))

export function getList(blocks: Blocks, listPath: string): Blocks | null {
  if (!listPath) return blocks
  const p = listPath.split('.')
  let list: Blocks = blocks
  for (let j = 0; j < p.length; j += 2) {
    const b = list[Number(p[j])]
    if (!b) return null
    list = ((b as unknown as Rec)[p[j + 1]] as Blocks | undefined) ?? []
  }
  return list
}

export function getBlock(blocks: Blocks, id: string): FlowBlock | null {
  const { listPath, index } = splitId(id)
  return getList(blocks, listPath)?.[index] ?? null
}

function upd(list: Blocks, p: string[], fn: (l: Blocks) => Blocks): Blocks {
  if (!p.length) return fn(list)
  const [i, key, ...rest] = p
  const idx = Number(i)
  return list.map((b, j) => (j !== idx ? b : ({ ...b, [key]: upd(((b as unknown as Rec)[key] as Blocks | undefined) ?? [], rest, fn) } as FlowBlock)))
}
export function updateList(blocks: Blocks, listPath: string, fn: (l: Blocks) => Blocks): Blocks {
  return upd(blocks, listPath ? listPath.split('.') : [], fn)
}

export function insertAt(blocks: Blocks, listPath: string, index: number, b: FlowBlock): Blocks {
  return updateList(blocks, listPath, (l) => { const a = l.slice(); a.splice(Math.max(0, Math.min(index, a.length)), 0, b); return a })
}
export function deleteAt(blocks: Blocks, id: string): Blocks {
  const { listPath, index } = splitId(id)
  return updateList(blocks, listPath, (l) => l.filter((_, i) => i !== index))
}
export function replaceBlock(blocks: Blocks, id: string, fn: (b: FlowBlock) => FlowBlock): Blocks {
  const { listPath, index } = splitId(id)
  return updateList(blocks, listPath, (l) => l.map((b, i) => (i === index ? fn(b) : b)))
}

/** true when `b` lies strictly inside block `a` (a's then/else/body, any depth) */
export const isAncestor = (a: string, b: string) => b.startsWith(a + '.')

/** can block `id` be dropped into slot (listPath, index)? false inside its own subtree and on its own (no-op) position */
export function slotValid(id: string, listPath: string, index: number): boolean {
  if (listPath === id || isAncestor(id, listPath + '.')) return false
  const s = splitId(id)
  if (listPath === s.listPath && (index === s.index || index === s.index + 1)) return false
  return true
}

/** Move block `id` (with its whole subtree) into slot (toListPath, toIndex). Indices refer to the tree BEFORE the move.
 *  Returns null when invalid (into its own subtree / missing block), the same array when it would not change anything. */
export function moveBlock(blocks: Blocks, id: string, toListPath: string, toIndex: number): Blocks | null {
  if (toListPath === id || isAncestor(id, toListPath)) return null
  const blk = getBlock(blocks, id)
  if (!blk || !getList(blocks, toListPath)) return null
  const s = splitId(id)
  if (toListPath === s.listPath && (toIndex === s.index || toIndex === s.index + 1)) return blocks
  let path = toListPath, idx = toIndex
  if (toListPath === s.listPath) { if (toIndex > s.index) idx = toIndex - 1 }
  else {
    // the target path may run through a later sibling of the source: removal shifts that sibling's index down by one
    const sp = s.listPath ? s.listPath.split('.') : []
    const tp = toListPath ? toListPath.split('.') : []
    const sameParent = sp.every((x, i) => tp[i] === x)
    if (sameParent && tp.length > sp.length && Number(tp[sp.length]) > s.index) { tp[sp.length] = String(Number(tp[sp.length]) - 1); path = tp.join('.') }
  }
  return insertAt(deleteAt(blocks, id), path, idx, blk)
}

export function makeBlock(key: string): FlowBlock {
  switch (key) {
    case 'in': return { t: 'io', dir: 'in', text: '' }
    case 'out': return { t: 'io', dir: 'out', text: '' }
    case 'process': return { t: 'process', text: '' }
    case 'if': return { t: 'if', cond: '', then: [], else: [] }
    case 'while': return { t: 'while', cond: '', body: [] }
    case 'repeat': return { t: 'repeat', body: [], until: '' }
    default: return { t: 'call', text: '' }
  }
}

export function blockText(b: FlowBlock): string {
  switch (b.t) { case 'if': case 'while': return b.cond; case 'repeat': return b.until; default: return b.text }
}
export function withText(b: FlowBlock, text: string): FlowBlock {
  switch (b.t) { case 'if': case 'while': return { ...b, cond: text }; case 'repeat': return { ...b, until: text }; default: return { ...b, text } }
}

/** Map a `flowToPython` error message ("block 2 › Yes branch › block 1: …") back to a block id ("1.then.0"), or null. */
export function errorId(msg: string): string | null {
  const m = /^(block \d+(?: › (?:Yes branch|No branch|body) › block \d+)*)/.exec(msg)
  if (!m) return null
  const parts = m[1].split(' › ')
  const ids: string[] = []
  parts.forEach((p, i) => {
    if (i % 2 === 0) ids.push(String(Number(p.replace('block ', '')) - 1))
    else ids.push(p === 'Yes branch' ? 'then' : p === 'No branch' ? 'else' : 'body')
  })
  return ids.join('.')
}
