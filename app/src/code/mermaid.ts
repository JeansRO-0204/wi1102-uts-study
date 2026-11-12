// Mermaid flowchart text ⇄ Flowchart block tree. PURE TypeScript (Node-importable): only `import type`.
//
// mermaidToFlow: parses `flowchart TD` / `graph TD` text (nodes + arrows), then recovers the structure
// (sequence, if/else, while, repeat-until) from the arrow graph, so a free-form chart turns into the same blocks
// the drag-and-drop builder makes and compiles with flow.ts. Shapes:
//   A([Start])  A((End))         terminal (start / end)
//   A[/input x/]  A[/output x/]   input / output (parallelogram)
//   A[x ← x + 1]                  process
//   A{x > 0}                      decision: label its arrows -->|Yes| and -->|No|
//   A[[Max(a, b)]]                subprogram call
// flowToMermaid: the reverse, so a chart built with blocks can be shown and edited as text.
import type { Flowchart, FlowBlock } from '../types'

export interface MermaidError { line: number; msg: string }
export interface MermaidResult { flow: Flowchart | null; errors: MermaidError[]; warnings: MermaidError[] }

type Kind = 'term' | 'io' | 'process' | 'decision' | 'call'
interface Node { id: string; kind: Kind; text: string; dir?: 'in' | 'out'; line: number; shaped: boolean }
interface Edge { from: string; to: string; label: string; line: number }

/* ------------------------------------------------------------------ parsing */

const SHAPES: { open: string; close: string; shape: string }[] = [
  { open: '([', close: '])', shape: 'stadium' }, { open: '((', close: '))', shape: 'circle' }, { open: '[[', close: ']]', shape: 'sub' },
  { open: '[(', close: ')]', shape: 'db' }, { open: '[/', close: '/]', shape: 'para' }, { open: '[\\', close: '\\]', shape: 'para' },
  { open: '[/', close: '\\]', shape: 'para' }, { open: '[\\', close: '/]', shape: 'para' }, { open: '{{', close: '}}', shape: 'hex' },
  { open: '{', close: '}', shape: 'rhombus' }, { open: '(', close: ')', shape: 'round' }, { open: '[', close: ']', shape: 'rect' }, { open: '>', close: ']', shape: 'flag' },
]
const ID = /^[\p{L}\p{N}_]+/u
const ARROW = /^\s*(?:--\s*([^\s>|-][^>|]*?)\s*-->|==\s*([^=>|][^>|]*?)\s*==>|-\.\s*([^.>|][^>|]*?)\s*\.->|--+>|==+>|-\.+->|---+|===+|--[xo]|<-->)\s*(?:\|([^|]*)\|)?\s*/
const START_RE = /^(start|mulai|begin|awal|program\b.*)$/i
const END_RE = /^(end|selesai|stop|finish|berhenti|akhir|end program)$/i
const IN_RE = /^(input|read|baca|masukan|masukkan|get|scan)\b\s*(?:\((.*)\)|(.*))$/i
const OUT_RE = /^(output|print|write|tulis|cetak|tampilkan|display|show)\b\s*(?:\((.*)\)|(.*))$/i

function cleanText(s: string): string {
  return s
    .replace(/<br\s*\/?>/gi, '\n').replace(/&lt;|#lt;|#60;/g, '<').replace(/&gt;|#gt;|#62;/g, '>').replace(/&amp;|#amp;/g, '&').replace(/#quot;|&quot;/g, '"')
    .replace(/<-+/g, '←').replace(/:=/g, '←')
    .split('\n').map((l) => l.trim()).filter(Boolean).join('\n')
}

/** Read `id`, `id[label]`, `id{label}` … at the start of `s`. */
function readNode(s: string): { id: string; shape?: string; text?: string; rest: string } | null {
  const m = ID.exec(s)
  if (!m) return null
  const id = m[0]
  let rest = s.slice(id.length)
  for (const sh of SHAPES) {
    if (!rest.startsWith(sh.open)) continue
    let body = rest.slice(sh.open.length)
    let text: string
    const q = /^\s*"((?:[^"\\]|\\.)*)"\s*/.exec(body)
    if (q && body.slice(q[0].length).startsWith(sh.close)) { text = q[1]; body = body.slice(q[0].length) }
    else {
      const at = body.indexOf(sh.close)
      if (at < 0) continue
      text = body.slice(0, at)
    }
    return { id, shape: sh.shape, text: cleanText(text), rest: body.slice(body.indexOf(sh.close) + sh.close.length) }
  }
  return { id, rest }
}

function classify(shape: string | undefined, text: string): { kind: Kind; dir?: 'in' | 'out'; text: string } {
  const one = text.replace(/\n/g, ' ').trim()
  const io = (t: string): { kind: Kind; dir?: 'in' | 'out'; text: string } | null => {
    const lines = t.split('\n')
    const first = lines[0].trim()
    let m = IN_RE.exec(first)
    if (m) return { kind: 'io', dir: 'in', text: [(m[2] ?? m[3] ?? '').trim(), ...lines.slice(1)].filter(Boolean).join('\n') }
    m = OUT_RE.exec(first)
    if (m) return { kind: 'io', dir: 'out', text: [(m[2] ?? m[3] ?? '').trim(), ...lines.slice(1)].filter(Boolean).join('\n') }
    return null
  }
  if (START_RE.test(one) || END_RE.test(one)) {
    if (shape === 'stadium' || shape === 'circle' || shape === 'round' || shape === 'rect' || !shape) return { kind: 'term', text: one }
  }
  switch (shape) {
    case 'rhombus': case 'hex': return { kind: 'decision', text: one.replace(/\?\s*$/, '').trim() }
    case 'para': return io(text) ?? { kind: 'io', dir: /["']/.test(text) ? 'out' : 'in', text }
    case 'sub': return { kind: 'call', text }
    default: return io(text) ?? { kind: 'process', text }
  }
}

const YES = /^(y|yes|ya|iya|true|t|benar|b|ok|1)$/i
const NO = /^(n|no|tidak|tdk|false|f|salah|s|bukan|0)$/i

export function mermaidToFlow(src: string): MermaidResult {
  const errors: MermaidError[] = [], warnings: MermaidError[] = []
  const nodes = new Map<string, Node>()
  const order: string[] = []
  const edges: Edge[] = []
  let subgraphs = 0

  const touch = (r: { id: string; shape?: string; text?: string }, line: number) => {
    const had = nodes.get(r.id)
    if (r.shape !== undefined || !had) {
      const c = classify(r.shape, r.text ?? r.id)
      if (had && had.shaped && r.shape !== undefined) { warnings.push({ line, msg: `Node ${r.id} is defined twice; using the later shape and text` }) }
      if (!had || r.shape !== undefined) nodes.set(r.id, { id: r.id, kind: c.kind, text: c.text, dir: c.dir, line: had?.line ?? line, shaped: r.shape !== undefined })
      if (!had) order.push(r.id)
    }
  }

  src.replace(/\r/g, '').split('\n').forEach((raw, i) => {
    const line = i + 1
    // `;` separates statements, but not inside a quoted label (where Mermaid entities like #quot; live)
    for (let stmt of raw.replace(/%%.*$/, '').split(/;(?=(?:[^"]*"[^"]*")*[^"]*$)/)) {
      stmt = stmt.trim()
      if (!stmt) continue
      if (/^(flowchart|graph)\b/i.test(stmt)) continue
      if (/^(classDef|class|style|linkStyle|click|direction|accTitle|accDescr|title)\b/.test(stmt)) continue
      if (/^subgraph\b/.test(stmt)) { subgraphs++; continue }
      if (stmt === 'end' && subgraphs > 0) { subgraphs--; continue }
      if (/^```/.test(stmt)) continue
      let rest = stmt
      let first = readNode(rest)
      if (!first) { errors.push({ line, msg: `Can't read "${stmt}". Start each line with a node id, e.g. A[x ← 1] --> B` }); continue }
      touch(first, line)
      rest = first.rest
      let prev = first.id
      while (rest.trim()) {
        if (/^\s*&/.test(rest)) { errors.push({ line, msg: '"&" (several nodes at once) is not supported: write one arrow per line' }); rest = ''; break }
        const a = ARROW.exec(rest)
        if (!a) { errors.push({ line, msg: `Expected an arrow (-->) after ${prev}, found "${rest.trim()}"` }); break }
        const label = cleanText(a[4] ?? a[1] ?? a[2] ?? a[3] ?? '')
        rest = rest.slice(a[0].length)
        const nx = readNode(rest)
        if (!nx) { errors.push({ line, msg: `Arrow from ${prev} doesn't point at a node` }); break }
        touch(nx, line)
        edges.push({ from: prev, to: nx.id, label, line })
        prev = nx.id
        rest = nx.rest
      }
    }
  })
  if (errors.length) return { flow: null, errors, warnings }
  if (!nodes.size) return { flow: null, errors: [{ line: 1, msg: 'No nodes yet. Start with: flowchart TD' }], warnings }
  return structure(nodes, order, edges, errors, warnings)
}

/* ------------------------------------------------------------------ graph → blocks */

function structure(nodes: Map<string, Node>, order: string[], edges: Edge[], errors: MermaidError[], warnings: MermaidError[]): MermaidResult {
  const out = new Map<string, Edge[]>()
  const inc = new Map<string, number>()
  for (const e of edges) { out.set(e.from, [...(out.get(e.from) ?? []), e]); inc.set(e.to, (inc.get(e.to) ?? 0) + 1) }
  const N = (id: string) => nodes.get(id)!
  const fail = (id: string | null, msg: string): MermaidResult => ({ flow: null, errors: [...errors, { line: id ? N(id).line : 1, msg }], warnings })

  // Start: a terminal that says Start (or any terminal without incoming arrows), else the first node without incoming arrows
  const starts = order.filter((id) => N(id).kind === 'term' && START_RE.test(N(id).text))
  const roots = order.filter((id) => !inc.get(id))
  let start = starts[0] ?? roots.find((id) => N(id).kind === 'term' && !END_RE.test(N(id).text)) ?? roots[0]
  if (!start) return fail(null, 'No starting point: every node has an arrow into it. Add Start([Start]) --> first step')

  // checks per node
  for (const id of order) {
    const n = N(id), o = out.get(id) ?? []
    if (n.kind === 'decision' && o.length !== 2) return fail(id, `Decision ${id} {${n.text}} needs exactly 2 arrows out (Yes and No), it has ${o.length}`)
    if (n.kind !== 'decision' && o.length > 1) return fail(id, `${id} has ${o.length} arrows out. Only a decision {…} may branch`)
    if (n.kind === 'decision' && !n.text) return fail(id, `Decision ${id} has no condition`)
  }
  if (N(start).kind === 'term') {
    const o = out.get(start) ?? []
    if (!o.length) return { flow: { blocks: [] }, errors, warnings }
    start = o[0].to
  }

  /** yes/no edges of a decision */
  const branches = (id: string): { yes: string; no: string } => {
    const [a, b] = out.get(id)!
    const ya = YES.test(a.label), na = NO.test(a.label), yb = YES.test(b.label), nb = NO.test(b.label)
    if ((ya && !yb) || (nb && !na)) return { yes: a.to, no: b.to }
    if ((yb && !ya) || (na && !nb)) return { yes: b.to, no: a.to }
    warnings.push({ line: N(id).line, msg: `Decision ${id}: label its arrows -->|Yes| and -->|No|. Assumed the first arrow is Yes` })
    return { yes: a.to, no: b.to }
  }
  /** BFS distances from `from`, not walking past nodes in `stops` (they're included). `from` itself is walked from
   *  only when it isn't a stop, unless `force` (used to look ahead from a loop head). */
  const reach = (from: string, stops: Set<string>, force = false): Map<string, number> => {
    const d = new Map<string, number>([[from, 0]])
    const q = [from]
    while (q.length) {
      const x = q.shift()!
      if (stops.has(x) && !(x === from && force)) continue
      for (const e of out.get(x) ?? []) if (!d.has(e.to)) { d.set(e.to, d.get(x)! + 1); q.push(e.to) }
    }
    return d
  }
  /** can `from` get back to `target` without passing a stop (or target itself)? */
  const returnsTo = (from: string, target: string, stops: Set<string>) => from === target || reach(from, new Set([...stops, target])).has(target)
  const neg = (c: string) => { const m = /^not\s*\((.*)\)$/i.exec(c.trim()); return m ? m[1] : `not (${c})` }

  let steps = 0
  class Bail extends Error { id: string | null; constructor(id: string | null, msg: string) { super(msg); this.id = id } }

  const seq = (from: string | undefined, stops: Set<string>, skipRepeat: Set<string>): FlowBlock[] => {
    const blocks: FlowBlock[] = []
    const seen = new Set<string>()
    let cur = from
    while (cur !== undefined && !stops.has(cur)) {
      if (++steps > 5000) throw new Bail(cur, 'The chart is too tangled to read')
      if (seen.has(cur)) throw new Bail(cur, `Arrows loop back to ${cur} in a way that isn't a while or repeat-until loop`)
      seen.add(cur)
      const n = N(cur)
      if (n.kind === 'term') {
        if (!END_RE.test(n.text) && (out.get(cur)?.length ?? 0) > 0) { cur = out.get(cur)![0].to; continue }
        return blocks
      }
      // repeat-until: a decision further on jumps back here, and its other arrow leaves the loop
      if (!skipRepeat.has(cur)) {
        const fromH = reach(cur, new Set([...stops, cur]), true)
        const back = edges.find((e) => e.to === cur && N(e.from).kind === 'decision' && e.from !== cur && fromH.has(e.from) && !stops.has(e.from))
        if (back) {
          const D = back.from
          const { yes, no } = branches(D)
          const exit = yes === cur ? no : yes
          if (!returnsTo(exit, cur, stops)) {
            const body = seq(cur, new Set([...stops, D]), new Set([...skipRepeat, cur]))
            const c = N(D).text
            blocks.push({ t: 'repeat', body, until: exit === yes ? c : neg(c) })
            cur = exit
            continue
          }
        }
      }
      if (n.kind === 'decision') {
        const { yes, no } = branches(cur)
        const yLoop = returnsTo(yes, cur, stops), nLoop = returnsTo(no, cur, stops)
        if (yLoop && nLoop) throw new Bail(cur, `Both arrows of decision ${cur} lead back to it, so the loop never ends`)
        if (yLoop || nLoop) {
          const bodyStart = yLoop ? yes : no
          const body = bodyStart === cur ? [] : seq(bodyStart, new Set([...stops, cur]), skipRepeat)
          blocks.push({ t: 'while', cond: yLoop ? n.text : neg(n.text), body })
          cur = yLoop ? no : yes
          continue
        }
        // if / else: join at the nearest node both branches reach
        const ry = reach(yes, stops), rn = reach(no, stops)
        let join: string | undefined, best = Infinity
        for (const [id, dy] of ry) {
          const dn = rn.get(id)
          if (dn === undefined) continue
          const score = Math.max(dy, dn) * 1000 + dy + dn
          if (score < best) { best = score; join = id }
        }
        const inner = join ? new Set([...stops, join]) : stops
        const th = seq(yes, inner, skipRepeat), el = seq(no, inner, skipRepeat)
        if (!th.length && el.length) blocks.push({ t: 'if', cond: neg(n.text), then: el })
        else blocks.push({ t: 'if', cond: n.text, then: th, ...(el.length ? { else: el } : {}) })
        cur = join
        if (cur !== undefined && N(cur).kind === 'term' && END_RE.test(N(cur).text)) return blocks
        continue
      }
      if (n.kind === 'io') blocks.push({ t: 'io', dir: n.dir ?? 'in', text: n.text })
      else if (n.kind === 'call') blocks.push({ t: 'call', text: n.text })
      else blocks.push({ t: 'process', text: n.text })
      cur = out.get(cur)?.[0]?.to
    }
    return blocks
  }

  try {
    const blocks = seq(start, new Set(), new Set())
    const unreached = order.filter((id) => !reach(start, new Set()).has(id) && N(id).kind !== 'term' && id !== start)
    for (const id of unreached) warnings.push({ line: N(id).line, msg: `${id} is not connected to the chart, so it's ignored` })
    return { flow: { blocks }, errors, warnings }
  } catch (e) {
    if (e instanceof Bail) return fail(e.id, e.message)
    throw e
  }
}

/* ------------------------------------------------------------------ blocks → mermaid */

/** Label text, quoted only when it has characters that would end the shape early. */
const q = (s: string) => { const t = s.replace(/\n/g, '<br>'); return /[[\]{}|#;]/.test(t) ? '"' + t.replace(/"/g, '#quot;') + '"' : t }
const IO_WORD = /^(input|output|read|baca|print|write|tulis|cetak|masukan|tampilkan|display)\b/i

export function flowToMermaid(f: Flowchart): string {
  const lines: string[] = ['flowchart TD']
  const shapes = new Map<string, string>([['S', '([Start])'], ['E', '([End])']])
  const declared = new Set<string>()
  const ref = (id: string) => { if (declared.has(id)) return id; declared.add(id); return id + (shapes.get(id) ?? '') }
  let n = 0
  type Pending = { from: string; label?: string }
  const link = (ins: Pending[], to: string) => { for (const p of ins) lines.push(`  ${ref(p.from)} -->${p.label ? `|${p.label}|` : ''} ${ref(to)}`) }
  const node = (shape: string) => { const id = `n${++n}`; shapes.set(id, shape); return id }
  const gen = (blocks: FlowBlock[], ins: Pending[]): { outs: Pending[]; entry?: string } => {
    let cur = ins
    let entry: string | undefined
    const enter = (id: string) => { link(cur, id); entry ??= id }
    for (const b of blocks ?? []) {
      switch (b.t) {
        case 'io': {
          const t = b.text.split('\n').map((l) => (IO_WORD.test(l.trim()) ? l.trim() : `${b.dir === 'in' ? 'input' : 'output'}(${l.trim()})`)).join('\n')
          const id = node(`[/${q(t || (b.dir === 'in' ? 'input()' : 'output()'))}/]`); enter(id); cur = [{ from: id }]; break
        }
        case 'process': { const id = node(`[${q(b.text)}]`); enter(id); cur = [{ from: id }]; break }
        case 'call': { const id = node(`[[${q(b.text)}]]`); enter(id); cur = [{ from: id }]; break }
        case 'if': {
          const id = node(`{${q(b.cond)}}`); enter(id)
          const th = gen(b.then, [{ from: id, label: 'Yes' }])
          const el = b.else?.length ? gen(b.else, [{ from: id, label: 'No' }]) : { outs: [{ from: id, label: 'No' }] }
          cur = [...th.outs, ...el.outs]; break
        }
        case 'while': {
          const id = node(`{${q(b.cond)}}`); enter(id)
          const body = gen(b.body, [{ from: id, label: 'Yes' }])
          link(body.outs, id)
          cur = [{ from: id, label: 'No' }]; break
        }
        case 'repeat': {
          const before = cur
          const body = gen(b.body, before)
          const id = node(`{${q(b.until)}}`)
          if (body.entry) { link(body.outs, id); entry ??= body.entry } else { link(before, id); entry ??= id }
          lines.push(`  ${ref(id)} -->|No| ${ref(body.entry ?? id)}`)
          cur = [{ from: id, label: 'Yes' }]; break
        }
      }
    }
    return { outs: cur, entry }
  }
  const r = gen(f?.blocks ?? [], [{ from: 'S' }])
  link(r.outs, 'E')
  return lines.join('\n') + '\n'
}
