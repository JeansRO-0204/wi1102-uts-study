// Robot command simulator for the two exam dialects (Robot Rody, Ladybug) plus a lenient "generic" mode.
// PURE TypeScript: no imports, no enums (build/verify.ts loads this with plain Node type stripping).
//
// Canonical route: `path` is a string over {U,D,L,R}: one letter per UNIT move in absolute directions
// (U = up/north, R = right/east ...). Rody: up=U, down=D, walk=R. Ladybug starts facing up (as in the figure);
// Forward N emits N letters in the current heading; Left/Right turn 90 degrees in place and emit nothing.
// So two programs that draw the same route give equal strings, whatever commands they used.
//
// Lenient input (as students write on paper): any case, commas/semicolons/arrows as separators, `x`/`*`/`×`
// repeat shorthand `(FR FL)x2`, letter shorthand `FR FL` = Forward 1, Right, Forward 1, Left, `Forward` without a
// number = 1, `Repeat N-1 ( ... )` on one or many lines, or `repeat n` + indented block (Rody).

export type Dir = 'U' | 'D' | 'L' | 'R'
export type Dialect = 'ladybug' | 'rody' | 'generic'

export interface Seg {
  x1: number; y1: number; x2: number; y2: number
  dir: Dir
  /** 1-based source line of the command that made this unit move */
  line: number
  /** id of the outermost `repeat` that was running (-1 = none) and its iteration index: for "show the repeating unit" */
  rep: number
  iter: number
}
export interface RobotRun {
  /** canonical route; '' when there is an error */
  path: string
  error?: string
  errorLine?: number
  segments: Seg[]
  /** the program contains at least one repeat */
  usesRepeat: boolean
  /** number of command tokens (size of the program as written) */
  commands: number
  end: { x: number; y: number; dir: Dir }
}

/* ------------------------------------------------------------------ tokenizer */

interface Tok { k: 'num' | 'id' | 'sym'; v: string; line: number; indent: number; bol: boolean }

class RobotError extends Error {
  line: number
  constructor(line: number, msg: string) { super(msg); this.line = line }
}
const fail = (line: number, msg: string): never => { throw new RobotError(line, line > 0 ? `Line ${line}: ${msg}` : msg) }

function tokenize(src: string): Tok[] {
  const out: Tok[] = []
  const lines = src.replace(/\r/g, '').split('\n')
  for (let li = 0; li < lines.length; li++) {
    const lineNo = li + 1
    let raw = lines[li]
    raw = raw.replace(/\/\/.*$/, '').replace(/#.*$/, '')
    let indent = 0
    for (const ch of raw) { if (ch === ' ') indent++; else if (ch === '\t') indent += 4; else break }
    const s = raw.toLowerCase().replace(/->|→|=>|⇒|➜/g, ' ').replace(/[·∙•]/g, '*').replace(/[×✕✖]/g, 'x')
    let first = true
    let i = 0
    while (i < s.length) {
      const ch = s[i]
      if (ch === ' ' || ch === '\t' || ch === ',' || ch === ';' || ch === ':' || ch === '.' || ch === ' ' || ch === '"' || ch === "'" || ch === '`') { i++; continue }
      let tk: Tok | null = null
      if (/[0-9]/.test(ch)) {
        let j = i
        while (j < s.length && /[0-9]/.test(s[j])) j++
        tk = { k: 'num', v: s.slice(i, j), line: lineNo, indent, bol: first }
        i = j
      } else if (/[a-z_]/.test(ch)) {
        let j = i
        while (j < s.length && /[a-z_]/.test(s[j])) j++
        tk = { k: 'id', v: s.slice(i, j), line: lineNo, indent, bol: first }
        i = j
      } else if ('()+-*/'.includes(ch)) {
        tk = { k: 'sym', v: ch, line: lineNo, indent, bol: first }; i++
      } else if (ch === '{' || ch === '[') {
        tk = { k: 'sym', v: '(', line: lineNo, indent, bol: first }; i++
      } else if (ch === '}' || ch === ']') {
        tk = { k: 'sym', v: ')', line: lineNo, indent, bol: first }; i++
      } else {
        fail(lineNo, `character "${ch}" is not recognised.`)
      }
      if (tk) { out.push(tk); first = false }
    }
  }
  return out
}

/* ------------------------------------------------------------------ AST + parser */

type Expr = (n: number) => number
type Node =
  | { t: 'cmd'; c: 'U' | 'D' | 'W' | 'F' | 'L' | 'R'; arg?: Expr; line: number }
  | { t: 'rep'; count: Expr; body: Node[]; line: number }

const REPEAT_WORDS = ['repeat', 'ulangi', 'ulang', 'loop', 'rep']
const RODY_CMDS: Record<string, 'U' | 'D' | 'W'> = { up: 'U', down: 'D', walk: 'W', naik: 'U', turun: 'D', jalan: 'W', melangkah: 'W' }
const LADY_FWD = ['forward', 'fwd', 'fd', 'maju', 'foward', 'forwad', 'foreward']
const LADY_LEFT = ['left', 'kiri']
const LADY_RIGHT = ['right', 'kanan']
const SKIP_WORDS = ['times', 'kali', 'time', 'do', 'lakukan', 'end', 'endrepeat', 'done', 'then', 'steps', 'langkah', 'meter', 'unit', 'to', 'the', 'a']

function lev(a: string, b: string): number {
  const d: number[][] = []
  for (let i = 0; i <= a.length; i++) { d[i] = [i]; for (let j = 1; j <= b.length; j++) d[i][j] = i === 0 ? j : 0 }
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[a.length][b.length]
}

function parseProgram(src: string, dialect: Dialect, param: string): { nodes: Node[]; commands: number; usesRepeat: boolean } {
  const toks = tokenize(src)
  const P = param.toLowerCase()
  const allowRody = dialect !== 'ladybug'
  const allowLady = dialect !== 'rody'
  let pos = 0
  let commands = 0
  let usesRepeat = false

  const peek = (o = 0): Tok | undefined => toks[pos + o]
  const known = (): string[] => {
    const l: string[] = []
    if (allowRody) l.push('up', 'down', 'walk')
    if (allowLady) l.push('forward', 'left', 'right')
    l.push('repeat')
    return l
  }

  /* ---------- expressions: n, n-1, 2*n, (n+1)*2, 2n, n div 2 ---------- */
  const isPureParen = (i: number): boolean => {
    // toks[i] is '(' : does it enclose only numbers / the parameter / operators?
    let depth = 0
    for (let j = i; j < toks.length; j++) {
      const t = toks[j]
      if (t.k === 'sym' && t.v === '(') depth++
      else if (t.k === 'sym' && t.v === ')') { depth--; if (depth === 0) return j > i + 1 }
      else if (t.k === 'id' && t.v !== P && t.v !== 'div' && t.v !== 'mod') return false
    }
    return false
  }
  const startsExpr = (t: Tok | undefined, line: number): boolean => {
    if (!t || t.line !== line) return false
    if (t.k === 'sym' && t.v === '(') return isPureParen(toks.indexOf(t))
    if (t.k === 'num') return true
    if (t.k === 'id') return t.v === P
    if (t.k === 'sym' && t.v === '-') return true
    return false
  }
  const parsePrimary = (): Expr => {
    const t = peek()
    if (!t) return fail(toks[toks.length - 1]?.line ?? 1, 'the count expression is incomplete.')
    if (t.k === 'num') { pos++; const v = parseInt(t.v, 10); const e: Expr = () => v; return implicitMul(e, t.line) }
    if (t.k === 'id' && t.v === P) { pos++; const e: Expr = (n) => n; return e }
    if (t.k === 'sym' && t.v === '-') { pos++; const e = parsePrimary(); return (n) => -e(n) }
    if (t.k === 'sym' && t.v === '(') {
      if (!isPureParen(pos)) fail(t.line, 'the parenthesis "(" here is not part of a count; did you mean a repeat command?')
      pos++
      const e = parseSum()
      const c = peek()
      if (!c || c.v !== ')') fail(t.line, 'missing ")" in the count.')
      pos++
      return e
    }
    if (t.k === 'id') return fail(t.line, `"${t.v}" is not a known value; the only variable is "${param}".`)
    return fail(t.line, `invalid expression near "${t.v}".`)
  }
  const implicitMul = (e: Expr, line: number): Expr => {
    const t = peek()
    if (t && t.line === line && t.k === 'id' && t.v === P) { pos++; return (n) => e(n) * n } // 2n
    return e
  }
  const parseTerm = (): Expr => {
    let e = parsePrimary()
    for (;;) {
      const t = peek()
      if (!t) break
      if (t.k === 'sym' && (t.v === '*' || t.v === '/')) {
        const nx = peek(1)
        if (nx && nx.k === 'sym' && nx.v === '(' && !isPureParen(pos + 1)) break // "n * ( walk )": times marker, not arithmetic
        if (!nx || !(nx.k === 'num' || nx.k === 'sym' || (nx.k === 'id' && nx.v === P))) break
        pos++
        const r = parsePrimary(); const l = e
        e = t.v === '*' ? (n) => l(n) * r(n) : (n) => l(n) / r(n)
      } else if (t.k === 'id' && (t.v === 'div' || t.v === 'mod')) {
        pos++
        const r = parsePrimary(); const l = e
        e = t.v === 'div' ? (n) => Math.floor(l(n) / r(n)) : (n) => l(n) % r(n)
      } else break
    }
    return e
  }
  const parseSum = (): Expr => {
    let e = parseTerm()
    for (;;) {
      const t = peek()
      if (t && t.k === 'sym' && (t.v === '+' || t.v === '-') && peek(1) && peek(1)!.line === t.line) {
        pos++
        const r = parseTerm(); const l = e
        e = t.v === '+' ? (n) => l(n) + r(n) : (n) => l(n) - r(n)
      } else break
    }
    return e
  }

  /* ---------- statements ---------- */
  const isTimes = (t: Tok | undefined, line: number): boolean =>
    !!t && t.line === line && ((t.k === 'id' && t.v === 'x') || (t.k === 'sym' && t.v === '*'))

  // statement list; stops at ')', end, or (indentation bodies) a line whose indent <= base
  function parseList(base: number | null, endLine?: number): Node[] {
    const out: Node[] = []
    for (;;) {
      const t = peek()
      if (!t) break
      if (t.k === 'sym' && t.v === ')') break
      if (base !== null && t.bol && t.indent <= base) break
      if (endLine !== undefined && t.line !== endLine) break
      out.push(...parseStatement())
    }
    return out
  }

  function parseBody(rep: Tok): Node[] {
    const n = peek()
    if (n && n.k === 'sym' && n.v === '(') return parseGroup()
    if (n && n.line === rep.line && !n.bol) {
      // same-line body: "repeat 2 walk down"
      return parseList(null, rep.line)
    }
    // indented block on the following lines
    if (n && n.line > rep.line && n.indent > rep.indent) return parseList(rep.indent)
    if (n && n.line > rep.line && n.k === 'sym' && n.v === '(') return parseGroup()
    return fail(rep.line, 'the repeat command has no body. Write the body indented below repeat, or inside parentheses ( ... ).')
  }

  function parseGroup(): Node[] {
    const open = peek()!
    pos++
    const body = parseList(null)
    const c = peek()
    if (!c || c.v !== ')') fail(open.line, '"(" is opened but never closed with ")".')
    pos++
    return body
  }

  // optional postfix "x 3" / "* n" directly after a statement or group
  function postfix(nodes: Node[], line: number, endTok: Tok): Node[] {
    let cur = nodes
    for (;;) {
      const t = peek()
      if (isTimes(t, endTok.line) && startsExpr(peek(1), endTok.line)) {
        pos++
        const cnt = parseSum()
        usesRepeat = true
        cur = [{ t: 'rep', count: cnt, body: cur, line }]
      } else break
    }
    return cur
  }

  function parseStatement(): Node[] {
    const t = peek()!
    if (t.k === 'sym' && t.v === ')') return fail(t.line, '")" has no matching "(".')
    if (t.k === 'sym' && t.v === '(') {
      const startTok = t
      const body = parseGroup()
      const endTok = toks[pos - 1]
      return postfix(body, startTok.line, endTok)
    }
    if (t.k === 'num' || (t.k === 'id' && t.v === P && !isCommandWord(t.v)) || (t.k === 'sym' && t.v === '-')) {
      // prefix repeat: "2 x (...)", "n x walk", "3 * (...)"
      const save = pos
      const cnt = parseSum()
      const nx = peek()
      if (isTimes(nx, t.line) || (nx && nx.line === t.line && nx.k === 'sym' && nx.v === '(')) {
        if (isTimes(nx, t.line)) pos++
        usesRepeat = true
        const body = peek() && peek()!.k === 'sym' && peek()!.v === '(' ? parseGroup() : parseOne()
        return [{ t: 'rep', count: cnt, body, line: t.line }]
      }
      pos = save
      return fail(t.line, `the number/expression "${t.v}" stands alone. Did you mean "Forward ${t.v}" or "repeat ${t.v}"?`)
    }
    if (t.k === 'sym') return fail(t.line, `symbol "${t.v}" is not recognised here.`)
    // id
    if (SKIP_WORDS.includes(t.v)) { pos++; return [] }
    return parseOne()
  }

  function isCommandWord(w: string): boolean {
    return REPEAT_WORDS.includes(w) || !!RODY_CMDS[w] || LADY_FWD.includes(w) || LADY_LEFT.includes(w) || LADY_RIGHT.includes(w)
  }

  function optArg(line: number): Expr | undefined {
    const n = peek()
    if (startsExpr(n, line)) return parseSum()
    if (n && n.line === line && n.k === 'sym' && n.v === '(' && isPureParen(pos)) return parseSum()
    return undefined
  }

  // one simple command or repeat (with its own body), plus postfix "x n"
  function parseOne(): Node[] {
    const t = peek()
    if (!t) return fail(toks[toks.length - 1]?.line ?? 1, 'the command is incomplete.')
    if (t.k === 'sym' && t.v === '(') { const st = t; const b = parseGroup(); return postfix(b, st.line, toks[pos - 1]) }
    if (t.k !== 'id') return parseStatement()
    pos++
    const w = t.v
    let nodes: Node[] | null = null

    if (REPEAT_WORDS.includes(w)) {
      usesRepeat = true
      const cs = peek()
      if (!cs || (cs.line !== t.line)) return fail(t.line, 'repeat needs a repeat count, e.g. "repeat n" or "Repeat N-1 ( ... )".')
      const count = parseSum()
      while (peek() && peek()!.line === t.line && peek()!.k === 'id' && (SKIP_WORDS.includes(peek()!.v) || peek()!.v === 'x')) pos++
      const body = parseBody(t)
      return [{ t: 'rep', count, body, line: t.line }]
    }
    if (allowRody && RODY_CMDS[w]) { commands++; nodes = [{ t: 'cmd', c: RODY_CMDS[w], line: t.line }] }
    else if (!allowRody && RODY_CMDS[w]) return fail(t.line, `"${w}" is a Robot Rody command, but this question uses Ladybug (Forward N, Left, Right, Repeat N).`)
    else if (allowLady && LADY_FWD.includes(w)) { commands++; nodes = [{ t: 'cmd', c: 'F', arg: optArg(t.line), line: t.line }] }
    else if (allowLady && LADY_LEFT.includes(w)) { commands++; nodes = [{ t: 'cmd', c: 'L', line: t.line }] }
    else if (allowLady && LADY_RIGHT.includes(w)) { commands++; nodes = [{ t: 'cmd', c: 'R', line: t.line }] }
    else if (!allowLady && (LADY_FWD.includes(w) || LADY_LEFT.includes(w) || LADY_RIGHT.includes(w))) {
      return fail(t.line, `"${w}" is a Ladybug command, but this question uses Robot Rody (up, down, walk, repeat n).`)
    } else if (allowLady && w === 'f') { commands++; nodes = [{ t: 'cmd', c: 'F', arg: optArg(t.line), line: t.line }] }
    else if (allowLady && /^[frl]+$/.test(w)) {
      // letter shorthand: "FR" = Forward 1, Right ; "FL", "FRFL"
      nodes = []
      for (const ch of w) { commands++; nodes.push({ t: 'cmd', c: ch === 'f' ? 'F' : ch === 'l' ? 'L' : 'R', line: t.line }) }
    } else if (allowRody && /^[udw]+$/.test(w)) {
      nodes = []
      for (const ch of w) { commands++; nodes.push({ t: 'cmd', c: ch === 'u' ? 'U' : ch === 'd' ? 'D' : 'W', line: t.line }) }
    } else {
      let best = ''; let bd = 99
      for (const k of known()) { const d = lev(w, k); if (d < bd) { bd = d; best = k } }
      const hint = bd <= 2 && best ? ` Did you mean "${best}"?` : ''
      return fail(t.line, `unknown command "${w}".${hint} Available commands: ${known().join(', ')}.`)
    }
    return postfix(nodes!, t.line, toks[pos - 1])
  }

  const nodes: Node[] = []
  while (pos < toks.length) nodes.push(...parseStatement())
  return { nodes, commands, usesRepeat }
}

/* ------------------------------------------------------------------ interpreter */

const LEFT_OF: Record<Dir, Dir> = { U: 'L', L: 'D', D: 'R', R: 'U' }
const RIGHT_OF: Record<Dir, Dir> = { U: 'R', R: 'D', D: 'L', L: 'U' }
const DX: Record<Dir, number> = { U: 0, D: 0, L: -1, R: 1 }
const DY: Record<Dir, number> = { U: 1, D: -1, L: 0, R: 0 }
const MAX_MOVES = 4000
const MAX_STEPS = 60000

/**
 * Run a robot program. `param` is the name of the variable the pattern is parameterised by ('n' / 'N'); `n` its value.
 * Never throws: problems come back as `error` (English, with the line).
 */
export function runRobot(dialect: Dialect | string, src: string, param: string, n: number, opts?: { startDir?: Dir }): RobotRun {
  const d: Dialect = dialect === 'rody' || dialect === 'ladybug' ? dialect : 'generic'
  const empty = (error: string, errorLine?: number, usesRepeat = false, commands = 0): RobotRun =>
    ({ path: '', error, errorLine, segments: [], usesRepeat, commands, end: { x: 0, y: 0, dir: opts?.startDir ?? 'U' } })
  if (!src.trim()) return empty('No commands written yet.')
  let prog: { nodes: Node[]; commands: number; usesRepeat: boolean }
  try { prog = parseProgram(src, d, param || 'n') } catch (e) {
    if (e instanceof RobotError) return empty(e.message, e.line)
    return empty(String(e))
  }
  const segs: Seg[] = []
  let x = 0, y = 0
  let dir: Dir = opts?.startDir ?? 'U'
  let steps = 0
  let repId = 0
  const move = (m: Dir, line: number, rep: number, iter: number) => {
    if (segs.length >= MAX_MOVES) throw new RobotError(line, `Line ${line}: too many steps (> ${MAX_MOVES}). Is the repeat count too large?`)
    segs.push({ x1: x, y1: y, x2: x + DX[m], y2: y + DY[m], dir: m, line, rep, iter })
    x += DX[m]; y += DY[m]
  }
  const exec = (nodes: Node[], rep: number, iter: number) => {
    for (const nd of nodes) {
      if (++steps > MAX_STEPS) throw new RobotError(nd.line, `Line ${nd.line}: the program ran too long (endless repeat?).`)
      if (nd.t === 'rep') {
        const cnt = Math.floor(nd.count(n))
        if (!Number.isFinite(cnt)) throw new RobotError(nd.line, `Line ${nd.line}: invalid repeat count.`)
        const rid = rep < 0 ? repId++ : rep
        for (let i = 0; i < cnt; i++) exec(nd.body, rid, rep < 0 ? i : iter)
        continue
      }
      switch (nd.c) {
        case 'U': move('U', nd.line, rep, iter); break
        case 'D': move('D', nd.line, rep, iter); break
        case 'W': move('R', nd.line, rep, iter); break
        case 'L': dir = LEFT_OF[dir]; break
        case 'R': dir = RIGHT_OF[dir]; break
        case 'F': {
          const k = nd.arg ? Math.floor(nd.arg(n)) : 1
          if (!Number.isFinite(k) || k < 0) throw new RobotError(nd.line, `Line ${nd.line}: Forward must move at least 1 step (computed value: ${k}).`)
          for (let i = 0; i < k; i++) move(dir, nd.line, rep, iter)
          break
        }
      }
    }
  }
  try { exec(prog.nodes, -1, 0) } catch (e) {
    if (e instanceof RobotError) return empty(e.message, e.line, prog.usesRepeat, prog.commands)
    return empty(String(e), undefined, prog.usesRepeat, prog.commands)
  }
  return { path: segs.map((s) => s.dir).join(''), segments: segs, usesRepeat: prog.usesRepeat, commands: prog.commands, end: { x, y, dir } }
}

/* ------------------------------------------------------------------ helpers for views / generators */

/** Points visited by a canonical path (y up). length = path.length + 1. */
export function pathPoints(path: string): { x: number; y: number }[] {
  const pts = [{ x: 0, y: 0 }]
  let x = 0, y = 0
  for (const ch of path) {
    if (ch !== 'U' && ch !== 'D' && ch !== 'L' && ch !== 'R') continue
    x += DX[ch as Dir]; y += DY[ch as Dir]
    pts.push({ x, y })
  }
  return pts
}

/** Index (0-based unit move) of the first difference between two paths, or -1 if they are equal. */
export function firstDivergence(got: string, want: string): number {
  const m = Math.min(got.length, want.length)
  for (let i = 0; i < m; i++) if (got[i] !== want[i]) return i
  return got.length === want.length ? -1 : m
}

/** 0..1: how much of `want` the first part of `got` reproduces (common prefix / longer length). */
export function similarity(got: string, want: string): number {
  const L = Math.max(got.length, want.length)
  if (!L) return 1
  const d = firstDivergence(got, want)
  return (d < 0 ? L : d) / L
}

const NAME: Record<Dir, string> = { U: 'naik', D: 'turun', L: 'ke kiri', R: 'ke kanan' }
export const dirWord = (d: string) => NAME[d as Dir] ?? d

/** Compact human description of a path: "R D R D R U R U R" -> "kanan, turun, ..." (for feedback). */
export function describeMove(path: string, i: number): string {
  const c = path[i]
  return c ? dirWord(c) : 'berhenti'
}

/** Run-length view of a path: "RRDDR" -> [['R',2],['D',2],['R',1]] */
export function runs(path: string): [string, number][] {
  const out: [string, number][] = []
  for (const ch of path) { const l = out[out.length - 1]; if (l && l[0] === ch) l[1]++; else out.push([ch, 1]) }
  return out
}

/** Replace command words in a program by ___ but keep repeat headers and layout: the "skeleton" hint. */
export function skeleton(src: string): string {
  return src.replace(/\b(?:forward|fwd|maju)\b(?:[ \t]+[0-9n][0-9n+\-*\/]*)?|\b(?:up|down|walk|left|right)\b/gi, '___')
}
