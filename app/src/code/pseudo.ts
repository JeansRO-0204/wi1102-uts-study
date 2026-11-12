// Liem-notation pseudocode → Python (house style).  PURE TypeScript: no React, only `import type`, so build/verify.ts
// can load it with plain Node type stripping.
//
// Lenient on purpose, like a marker: indentation OR `endif`-style blocks, case-insensitive keywords, Indonesian keyword
// variants (jika/maka/selain itu, selama/lakukan, ulangi/sampai), `←` / `<-` / `:=`, `{ comments }`, `KAMUS`/`ALGORITMA`.
// Result: Python source + `map` (python line index → pseudocode line, 1-based, 0 = generated) + errors pointing at pseudocode lines.

export interface PseudoResult {
  code: string
  errors: { line: number; msg: string }[]
  /** map[i] = pseudocode line (1-based) that produced Python line i+1; 0 for generated lines */
  map: number[]
}

/* ============================== low-level text helpers ============================== */

const PY_RESERVED = new Set(['pass', 'lambda', 'class', 'def', 'del', 'from', 'global', 'import', 'is', 'raise', 'with', 'yield', 'try', 'except', 'finally', 'assert', 'async', 'await', 'break', 'continue', 'nonlocal', 'as', 'elif', 'None'])
const MATH_NAMES = new Set(['sqrt', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'log10', 'exp', 'floor', 'ceil', 'pi', 'fabs', 'radians', 'degrees', 'hypot', 'factorial', 'gcd', 'trunc'])

/** same-length copy of `s` with the insides of string literals replaced by `_` (so searches never hit text in strings) */
function mask(s: string): string {
  let out = ''
  let q = ''
  for (const ch of s) {
    if (q) { if (ch === q) { q = ''; out += ch } else out += '_' } else if (ch === '"' || ch === "'") { q = ch; out += ch } else out += ch
  }
  return out
}
function unterminated(s: string): boolean {
  let q = ''
  for (const ch of s) { if (q) { if (ch === q) q = '' } else if (ch === '"' || ch === "'") q = ch }
  return q !== ''
}
function balanced(m: string): boolean {
  let d = 0
  for (const ch of m) { if (ch === '(' || ch === '[') d++; else if (ch === ')' || ch === ']') { d--; if (d < 0) return false } }
  return d === 0
}
function depthAt(m: string): number[] {
  const out: number[] = []
  let d = 0
  for (const ch of m) { if (ch === ')' || ch === ']') d--; out.push(d); if (ch === '(' || ch === '[') d++ }
  return out
}
/** split `s` at top-level (depth 0, outside strings) occurrences of the separator character */
function splitTop(s: string, sep: string): string[] {
  const m = mask(s), dp = depthAt(m)
  const parts: string[] = []
  let last = 0
  for (let i = 0; i < s.length; i++) if (m[i] === sep && dp[i] === 0) { parts.push(s.slice(last, i)); last = i + 1 }
  parts.push(s.slice(last))
  return parts
}
/** index of the first top-level match of `re` (regex without g flag) in masked text, with its length */
function findTop(s: string, re: RegExp): { i: number; len: number } | null {
  const m = mask(s), dp = depthAt(m)
  const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')
  let x: RegExpExecArray | null
  while ((x = g.exec(m))) { if (dp[x.index] === 0) return { i: x.index, len: x[0].length }; if (x[0].length === 0) g.lastIndex++ }
  return null
}

/** remove `{ … }` (multi-line), `#` and `//` comments; keep line structure. Returns one string per source line. */
function stripComments(src: string): string[] {
  const out: string[] = []
  let depth = 0
  for (const raw of src.split('\n')) {
    let line = ''
    let q = ''
    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i]
      if (depth > 0) { if (ch === '{') depth++; else if (ch === '}') depth--; continue }
      if (q) { line += ch; if (ch === q) q = ''; continue }
      if (ch === '"' || ch === "'") { q = ch; line += ch; continue }
      if (ch === '{') { depth = 1; continue }
      if (ch === '#') break
      if (ch === '/' && raw[i + 1] === '/' && (i === 0 || /\s/.test(raw[i - 1]))) break
      line += ch
    }
    out.push(line)
  }
  return out
}

function normalize(src: string): string {
  return src.replace(/\r\n?/g, '\n').replace(/[“”„‟«»]/g, '"').replace(/[‘’‛]/g, "'").replace(/ /g, ' ').replace(/[⟵⇐🡐]/g, '←').replace(/[⟶⇒]/g, '→').replace(/−/g, '-')
}

/* ============================== expression translation ============================== */

const TOKEN = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\s+)|([A-Za-z_][A-Za-z_0-9]*)|(\d+(?:\.\d+)?)|(<=|>=|!=|==|<>|≤|≥|≠|\*\*|&&|\|\||←|→|\.\.|[\s\S])/g

/** Liem expression → Python expression. Throws Error(msg in English) when it cannot make sense of it. */
export function exprToPython(s: string): string {
  const src = s.trim()
  if (!src) throw new Error('Empty expression')
  if (unterminated(src)) throw new Error('Quote is not closed')
  if (!balanced(mask(src))) throw new Error('Unbalanced parentheses')
  let out = ''
  let prev = ''   // previous significant token
  TOKEN.lastIndex = 0
  let m: RegExpExecArray | null
  const toks: { t: string; k: 'str' | 'ws' | 'id' | 'num' | 'op' }[] = []
  while ((m = TOKEN.exec(src))) {
    if (m[1]) toks.push({ t: m[1], k: 'str' })
    else if (m[2]) toks.push({ t: m[2], k: 'ws' })
    else if (m[3]) toks.push({ t: m[3], k: 'id' })
    else if (m[4]) toks.push({ t: m[4], k: 'num' })
    else toks.push({ t: m[5], k: 'op' })
  }
  for (let i = 0; i < toks.length; i++) {
    const { t, k } = toks[i]
    if (k === 'str' || k === 'ws' || k === 'num') { out += t; if (k !== 'ws') prev = t; continue }
    if (k === 'id') {
      const lo = t.toLowerCase()
      let r = t
      if (lo === 'mod') r = '%'
      else if (lo === 'div') r = '//'
      else if (lo === 'and' || lo === 'dan') r = 'and'
      else if (lo === 'or' || lo === 'atau') r = 'or'
      else if (lo === 'not' || lo === 'bukan') r = 'not'
      else if (lo === 'true') r = 'True'
      else if (lo === 'false') r = 'False'
      else if (PY_RESERVED.has(t)) r = t + '_'
      out += r; prev = r; continue
    }
    // operators
    let r = t
    if (t === '=') r = '=='
    else if (t === '≤') r = '<='
    else if (t === '≥') r = '>='
    else if (t === '≠' || t === '<>') r = '!='
    else if (t === '&&') r = 'and'
    else if (t === '||') r = 'or'
    else if (t === '^') r = '**'
    else if (t === '!') r = 'not '
    else if (t === '←' || t === '→') throw new Error(`The symbol "${t}" cannot appear inside an expression`)
    else if (t === '{' || t === '}') throw new Error('Curly braces { } are only for comments')
    else if (t === '..') throw new Error('".." is only used in "i traversal [a..b]"')
    // a lone "=" directly after a comparison-ish token stays; "==" already ok
    out += r; prev = r
  }
  void prev
  return out
}

function paren(c: string): string {
  const t = c.trim()
  if (t.startsWith('(')) {
    const m = mask(t); let d = 0
    for (let i = 0; i < m.length; i++) { if (m[i] === '(') d++; else if (m[i] === ')') { d--; if (d === 0) { if (i === m.length - 1) return t; break } } }
  }
  return `(${t})`
}

/** In an output argument "teks" + x → "teks" + str(x): the marker would accept it, Python would raise TypeError. */
function fixConcat(py: string): string {
  const parts = splitTop(py, '+')
  if (parts.length < 2) return py
  const isLit = (p: string) => /^\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')\s*$/.test(p)
  if (!parts.some(isLit)) return py
  return parts.map((p) => (isLit(p) || /^\s*str\(/.test(p) ? p.trim() : `str(${p.trim()})`)).join(' + ')
}

/* ============================== declarations & types ============================== */

type Kind = 'int' | 'float' | 'str' | 'bool'
const TYPE_WORDS: Record<string, Kind> = {
  integer: 'int', int: 'int', bilangan: 'int', bulat: 'int', natural: 'int',
  real: 'float', float: 'float', double: 'float', desimal: 'float', pecahan: 'float',
  string: 'str', char: 'str', character: 'str', karakter: 'str', teks: 'str', text: 'str', kalimat: 'str',
  boolean: 'bool', bool: 'bool', logika: 'bool',
}
interface ArrDecl { lo: string; hi: string; elem: Kind | undefined }
interface TypeInfo { scalar?: Kind; arr?: ArrDecl }
const ARR_RE = /^(?:array|larik|tabel|list)\s*\[\s*(.+?)\s*\.\.\s*(.+?)\s*\]\s*(?:of|dari)\s+([A-Za-z_]\w*)/i
const ARR_PLAIN_RE = /^(?:array|larik|tabel|list)\b/i

class Scope {
  types = new Map<string, Kind>()
  arrays = new Map<string, ArrDecl>()
  arrayParams = new Set<string>()
  inited = new Set<string>()
  declOrder: { names: string[]; text: string; line: number }[] = []
}

function parseTypeInfo(t: string, aliases: Map<string, TypeInfo>): TypeInfo | null {
  const s = t.trim()
  const a = ARR_RE.exec(s)
  if (a) return { arr: { lo: a[1], hi: a[2], elem: TYPE_WORDS[a[3].toLowerCase()] } }
  if (ARR_PLAIN_RE.test(s)) return { arr: { lo: '0', hi: '', elem: undefined } }
  const w = s.split(/\s+/)[0].toLowerCase()
  if (TYPE_WORDS[w]) return { scalar: TYPE_WORDS[w] }
  const al = aliases.get(s) ?? aliases.get(w)
  if (al) return al
  return null
}
const DECL_LIKE = /^[A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)*\s*:\s*(?:integer|int|real|float|double|string|char|character|boolean|bool|array|larik|tabel|list|bilangan|karakter|teks|text|desimal|kalimat|logika)\b/i

/* ============================== AST ============================== */

interface Param { name: string; mode: 'in' | 'out' | 'inout'; arr: boolean }
interface Def { name: string; kind: 'function' | 'procedure'; params: Param[]; body: Node[]; line: number; scope: Scope; fromDecl?: boolean; hasKamus?: boolean }
type Node =
  | { k: 's'; code: string; line: number }
  | { k: 'in'; targets: string[]; line: number; scope: Scope }
  | { k: 'call'; name: string; args: string[]; line: number }
  | { k: 'ret'; expr: string; line: number }
  | { k: 'if'; branches: { cond: string; body: Node[]; line: number }[]; els?: Node[]; line: number }
  | { k: 'while'; cond: string; body: Node[]; line: number }
  | { k: 'repeat'; body: Node[]; until?: string; line: number; untilLine?: number }
  | { k: 'for'; head: string; body: Node[]; line: number }

interface Block {
  kind: 'root' | 'if' | 'while' | 'repeat' | 'for' | 'def' | 'depend' | 'clause'
  indent: number
  body: Node[]
  inline?: boolean
  node?: Node
  hasElse?: boolean
  def?: Def
  deeper?: boolean
  subject?: string
}

const END_RE = /^(?:end\s*[-_]?\s*(if|while|for|repeat|procedure|prosedur|function|fungsi|program|depend|case|traversal|loop|do)?|endif|endwhile|endfor|endrepeat|endprocedure|endfunction|endprogram|endcase|enddepend|endloop|fi|selesai|akhir\s*(?:jika|selama|untuk|fungsi|prosedur|ulangi)?)\s*\.?$/i
const FUNC_RE = /^(function|fungsi|procedure|prosedur)\s+([A-Za-z_]\w*)\s*(?:\((.*)\))?\s*(?:(?:→|->|:|returns?|mengembalikan)\s*([\s\S]*?))?\s*:?$/i

/* ============================== the transpiler ============================== */

export function pseudoToPython(source: string): PseudoResult {
  try { return transpile(String(source ?? '')) } catch (e) { return { code: '', errors: [{ line: 0, msg: 'Penerjemah gagal: ' + (e as Error).message }], map: [] } }
}

function transpile(source: string): PseudoResult {
  const errors: { line: number; msg: string }[] = []
  const err = (line: number, msg: string) => errors.push({ line, msg })
  const src = normalize(source)

  /* ----- logical lines ----- */
  interface LL { n: number; ind: number; text: string }
  const stripped = stripComments(src)
  const raw: LL[] = []
  stripped.forEach((l, i) => {
    if (!l.trim()) return
    let ind = 0
    for (const ch of l) { if (ch === ' ') ind++; else if (ch === '\t') ind += 4; else break }
    raw.push({ n: i + 1, ind, text: l.trim() })
  })
  // continuation lines (unbalanced brackets or trailing operator)
  const joined: LL[] = []
  for (let i = 0; i < raw.length; i++) {
    let cur = { ...raw[i] }
    while (i + 1 < raw.length && (!balanced(mask(cur.text)) || /(?:\b(?:and|or|dan|atau)|[+\-*/%&|])\s*$/i.test(mask(cur.text)))) {
      cur = { n: cur.n, ind: cur.ind, text: cur.text + ' ' + raw[i + 1].text }
      i++
    }
    joined.push(cur)
  }
  // split on ';' at top level
  const lines: LL[] = []
  for (const l of joined) for (const p of splitTop(l.text, ';')) if (p.trim()) lines.push({ n: l.n, ind: l.ind, text: p.trim() })

  const isEnd = (t: string) => END_RE.test(t.trim())
  let explicitEnd = false
  lines.forEach((l, i) => { if (isEnd(l.text) && !(i === lines.length - 1 && /^(end|end\s+program|endprogram|selesai)\s*\.?$/i.test(l.text))) explicitEnd = true })

  /* ----- state ----- */
  const global = new Scope()
  const aliases = new Map<string, TypeInfo>()
  const consts: { name: string; value: string; line: number }[] = []
  const main: Node[] = []
  const defs: Def[] = []
  const sigs = new Map<string, Def>()
  const stack: Block[] = [{ kind: 'root', indent: -2, body: main }]
  let declMode = false
  let globalDecl = false   // inside the global KAMUS section (subprogram headers there are signatures)
  let programName = ''
  let programLine = 0
  let curDef: Def | null = null
  let defSawAlgo = false
  const top = () => stack[stack.length - 1]
  const scope = () => curDef?.scope ?? global
  const add = (n: Node) => top().body.push(n)

  const exprOrErr = (s: string, line: number): string => {
    try { return exprToPython(s) } catch (e) { err(line, (e as Error).message + (s.length < 60 ? `: "${s.trim()}"` : '')); return 'None' }
  }

  /* ----- declarations ----- */
  const parseDecl = (text: string, line: number): boolean => {
    const sc = scope()
    let m = /^(?:constant|konstanta|const)\s+([A-Za-z_]\w*)\s*(?::\s*([A-Za-z_ ]+?))?\s*(?:=|←|<-|:=)\s*(.+)$/i.exec(text)
    if (m) {
      const ty = m[2] ? TYPE_WORDS[m[2].trim().split(/\s+/)[0].toLowerCase()] : undefined
      if (ty) sc.types.set(m[1], ty)
      consts.push({ name: m[1], value: exprOrErr(m[3], line), line })
      return true
    }
    m = /^(?:type|tipe)\s+([A-Za-z_]\w*)\s*(?::|=)\s*(.+)$/i.exec(text)
    if (m) { const ti = parseTypeInfo(m[2], aliases); if (ti) aliases.set(m[1], ti); return true }
    m = /^([A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)*)\s*:\s*(.+)$/.exec(text)
    if (!m) return false
    const ti = parseTypeInfo(m[2], aliases)
    if (!ti) return false
    const names = m[1].split(',').map((x) => x.trim())
    for (const nm of names) { if (ti.arr) sc.arrays.set(nm, ti.arr); else if (ti.scalar) sc.types.set(nm, ti.scalar) }
    sc.declOrder.push({ names, text: m[2].trim(), line })
    return true
  }

  /* ----- subprogram headers ----- */
  const parseParams = (list: string, line: number): Param[] => {
    const items = list.trim() ? list.split(/[,;]/).map((x) => x.trim()).filter(Boolean) : []
    // re-join array types that contain commas inside [..] — rare; ignore
    const out: Param[] = []
    const pending: Param[] = []
    for (const it of items) {
      const mm = /^(?:(input\s*\/\s*output|input\s*output|in\s*out|inout|input|output|in|out|masukan|keluaran|masukan\/keluaran)\s+)?([A-Za-z_]\w*)\s*(?::\s*(.+))?$/i.exec(it)
      if (!mm) { err(line, `Unrecognised parameter: "${it}"`); continue }
      const mw = (mm[1] ?? 'in').toLowerCase().replace(/\s+/g, '')
      const mode: Param['mode'] = /\/|inout|output.*input|input.*output|masukan\/keluaran/.test(mw) && mw !== 'output' ? 'inout' : /^(output|out|keluaran)$/.test(mw) ? 'out' : 'in'
      const p: Param = { name: mm[2], mode, arr: false }
      pending.push(p)
      if (mm[3]) { const ti = parseTypeInfo(mm[3], aliases); for (const q of pending) q.arr = !!ti?.arr; pending.length = 0 }
      out.push(p)
    }
    return out
  }

  /* ----- statement parsing ----- */
  const addSimple = (code: string, line: number) => add({ k: 's', code, line })

  const parseSimple = (text: string, line: number): void => {
    const t = text.trim()
    if (!t) return
    const m = mask(t)
    // assignment (top-level ← / <- / :=)
    const ar = findTop(t, /←|<-|:=/)
    if (ar && !/^(?:if|jika|while|selama|until|sampai|hingga)\b/i.test(t)) {
      const lhs = t.slice(0, ar.i).trim(), rhs = t.slice(ar.i + ar.len).trim()
      const lhsParts = splitTop(lhs, ','), rhsParts = splitTop(rhs, ',')
      if (!lhs || !rhs) { err(line, 'Incomplete assignment: the left or right side of ← is empty'); return }
      if (!lhsParts.every((p) => /^[A-Za-z_]\w*(?:\s*\[.*\])*$/.test(p.trim()))) { err(line, `The left side of an assignment must be a variable name or an array element: "${lhs}"`); return }
      if (lhsParts.length !== rhsParts.length) { err(line, `The number of values (${rhsParts.length}) differs from the number of variables (${lhsParts.length}) in the assignment`); return }
      addSimple(`${lhsParts.map((p) => exprOrErr(p, line)).join(', ')} = ${rhsParts.map((p) => exprOrErr(p, line)).join(', ')}`, line)
      return
    }
    // return
    let r = /^(?:→|->)\s*([\s\S]*)$/.exec(t) ?? /^(?:return|kembalikan|kembali)\b\s*([\s\S]*)$/i.exec(t)
    if (r) { add({ k: 'ret', expr: r[1].trim() ? exprOrErr(r[1], line) : '', line }); return }
    // input / output
    const io = /^(input|read|baca|masukan|scan)\b\s*([\s\S]*)$/i.exec(t)
    if (io) {
      let a = io[2].trim()
      if (a.startsWith('(') && paren(a) === a) a = a.slice(1, -1)
      else if (a.startsWith('(')) { err(line, `Parentheses in input(...) do not match: "${t}"`); return }
      const targets = a ? splitTop(a, ',').map((x) => x.trim()).filter(Boolean) : []
      if (!targets.length) { err(line, 'input(...) must contain a variable name, e.g. input(N)'); return }
      const bad = targets.find((x) => !/^[A-Za-z_]\w*(?:\s*\[.*\])*$/.test(x))
      if (bad) { err(line, `input(...) may only contain variables or array elements, not "${bad}"`); return }
      add({ k: 'in', targets: targets.map((x) => exprOrErr(x, line)), line, scope: scope() })
      return
    }
    const oo = /^(output|print|write|writeln|tulis|cetak|tampilkan|display|show)\b\s*([\s\S]*)$/i.exec(t)
    if (oo) {
      let a = oo[2].trim()
      if (a.startsWith('(') && paren(a) === a) a = a.slice(1, -1)
      else if (a.startsWith('(')) { err(line, `Parentheses in output(...) do not match: "${t}"`); return }
      if (!a.trim()) { addSimple('print()', line); return }
      const args = splitTop(a, ',').map((x) => fixConcat(exprOrErr(x, line)))
      addSimple(`print(${args.join(', ')})`, line)
      return
    }
    // x++ / x += 1
    let mm = /^([A-Za-z_]\w*(?:\s*\[.*\])*)\s*(\+\+|--)$/.exec(t)
    if (mm) { addSimple(`${exprOrErr(mm[1], line)} ${mm[2] === '++' ? '+=' : '-='} 1`, line); return }
    mm = /^([A-Za-z_]\w*(?:\s*\[.*\])*)\s*(\+|-|\*|\/\/|\/|%)=\s*(.+)$/.exec(t)
    if (mm) { addSimple(`${exprOrErr(mm[1], line)} ${mm[2]}= ${exprOrErr(mm[3], line)}`, line); return }
    // lenient "x = expr"
    mm = /^([A-Za-z_]\w*(?:\s*\[[^\]]*\])*)\s*=(?!=)\s*(.+)$/.exec(t)
    if (mm && !/[<>!]=?$/.test(mm[1])) { addSimple(`${exprOrErr(mm[1], line)} = ${exprOrErr(mm[2], line)}`, line); return }
    // call
    const cm = /^(?:(?:call|panggil)\s+)?([A-Za-z_]\w*)\s*\(([\s\S]*)\)$/i.exec(t)
    if (cm && balanced(m)) {
      const args = cm[2].trim() ? splitTop(cm[2], ',').map((x) => x.trim()) : []
      add({ k: 'call', name: cm[1], args, line })
      return
    }
    if (/^(?:call|panggil)\s+([A-Za-z_]\w*)\s*$/i.test(t)) { add({ k: 'call', name: t.split(/\s+/)[1], args: [], line }); return }
    if (/^(?:break|continue|pass)$/.test(t)) { addSimple(t, line); return }
    err(line, `Unrecognised statement: "${t.length > 50 ? t.slice(0, 50) + '…' : t}". Use "x ← expression", "input(x)", "output(x)", if/while/repeat, or a call "Name(arguments)".`)
  }

  /** after a header: inline remainder (statement on the same line) */
  const inlineRest = (rest: string, line: number, blk: Block): void => {
    const r = rest.trim().replace(/^:\s*/, '')
    if (!r) return
    blk.inline = true
    parseStatement(r, line, blk.indent + 1)
  }

  const pushBlock = (b: Block) => { stack.push(b) }
  const popBlock = () => { const b = stack.pop()!; if (b.kind === 'def') { curDef = null; defSawAlgo = false; declMode = false } return b }

  const looksClause = (t: string) => !!findTop(t, /:/) && !DECL_LIKE.test(t)

  const shouldPop = (b: Block, ind: number, t: string): boolean => {
    if (b.inline) return true
    switch (b.kind) {
      case 'repeat': return ind < b.indent
      case 'def': return explicitEnd ? ind < b.indent : (b.deeper ? ind <= b.indent : ind < b.indent)
      case 'depend': return ind < b.indent || (ind === b.indent && !explicitEnd && !looksClause(t))
      default: return explicitEnd ? ind < b.indent : ind <= b.indent
    }
  }

  const parseStatement = (t: string, line: number, ind: number): void => {
    let m: RegExpExecArray | null
    // while / selama
    if ((m = /^(?:while|selama)\b\s*([\s\S]*)$/i.exec(t))) {
      let rest = m[1], inl = ''
      const d = findTop(rest, /\b(?:do|lakukan)\b/i)
      if (d) { inl = rest.slice(d.i + d.len); rest = rest.slice(0, d.i) }
      rest = rest.trim().replace(/:$/, '').trim()
      if (!rest) { err(line, 'The while condition is empty'); rest = 'False' }
      const node: Node = { k: 'while', cond: paren(exprOrErr(rest, line)), body: [], line }
      add(node)
      const b: Block = { kind: 'while', indent: ind, body: node.body }
      pushBlock(b); inlineRest(inl, line, b); return
    }
    // repeat N times / repeat … until
    if ((m = /^(?:repeat|ulangi|ulang)\b\s*([\s\S]*)$/i.exec(t))) {
      const rest = m[1].trim().replace(/:$/, '').trim()
      const times = /^(.+?)\s+(?:times|kali|x)\s*(?:do|lakukan)?\s*(.*)$/i.exec(rest)
      if (times) {
        const node: Node = { k: 'for', head: `for _ in range(${exprOrErr(times[1], line)}):`, body: [], line }
        add(node)
        const b: Block = { kind: 'for', indent: ind, body: node.body }
        pushBlock(b); inlineRest(times[2], line, b); return
      }
      const node: Node = { k: 'repeat', body: [], line }
      add(node)
      const b: Block = { kind: 'repeat', indent: ind, body: node.body, node }
      pushBlock(b)
      if (rest) parseStatement(rest, line, ind + 1)   // statement after "repeat" on the same line
      return
    }
    // i traversal [a..b]
    if ((m = /^([A-Za-z_]\w*)\s+(?:traversal|traverse|iterasi|iterate)\s*\[([\s\S]*)\]\s*(?:step\s+([^\s]+))?\s*(?:do|lakukan)?\s*([\s\S]*)$/i.exec(t))) {
      const rng = splitTop(m[2], '.').join('.').split('..')
      if (rng.length !== 2 || !rng[0].trim() || !rng[1].trim()) { err(line, 'A traversal must look like "i traversal [start..end]"'); return }
      const v = PY_RESERVED.has(m[1]) ? m[1] + '_' : m[1]
      const a = exprOrErr(rng[0], line), b2 = exprOrErr(rng[1], line)
      const node: Node = { k: 'for', head: forHead(v, a, b2, backward(rng[0].trim(), rng[1].trim()), m[3]), body: [], line }
      add(node)
      const b: Block = { kind: 'for', indent: ind, body: node.body }
      pushBlock(b); inlineRest(m[4], line, b); return
    }
    // for i ← a to b do
    if ((m = /^(?:for|untuk)\s+([A-Za-z_]\w*)\s*(?:←|<-|:=|=|dari|from)\s*(.+?)\s+(downto|to|sampai|hingga|s\.d\.?|turun sampai)\s+(.+?)(?:\s+step\s+(\S+))?\s*(?:do|lakukan)?\s*:?$/i.exec(t))) {
      const back = /downto|turun/i.test(m[3])
      const v = PY_RESERVED.has(m[1]) ? m[1] + '_' : m[1]
      const node: Node = { k: 'for', head: forHead(v, exprOrErr(m[2], line), exprOrErr(m[4], line), back, m[5]), body: [], line }
      add(node)
      pushBlock({ kind: 'for', indent: ind, body: node.body }); return
    }
    // python-ish for
    if ((m = /^for\s+([A-Za-z_]\w*)\s+in\s+(.+?)\s*:?$/i.exec(t))) {
      const node: Node = { k: 'for', head: `for ${m[1]} in ${exprOrErr(m[2], line)}:`, body: [], line }
      add(node)
      pushBlock({ kind: 'for', indent: ind, body: node.body }); return
    }
    // else-if / else  (the structural pop happened in the caller)
    // if / jika
    if ((m = /^(?:if|jika)\b\s*([\s\S]*)$/i.exec(t))) {
      let cond = m[1], inl = ''
      const th = findTop(cond, /\b(?:then|maka)\b/i)
      if (th) { inl = cond.slice(th.i + th.len); cond = cond.slice(0, th.i) }
      cond = cond.trim().replace(/:$/, '').trim()
      if (!cond) { err(line, 'The if condition is empty'); cond = 'False' }
      const node: Node = { k: 'if', branches: [{ cond: paren(exprOrErr(cond, line)), body: [], line }], line }
      add(node)
      const b: Block = { kind: 'if', indent: ind, body: node.branches[0].body, node }
      const el = findTop(inl, /\b(?:else|selain\s+itu)\b/i)
      if (el && inl.slice(0, el.i).trim()) {
        // one-liner:  if c then A else B
        pushBlock(b); inlineRest(inl.slice(0, el.i), line, b)
        popBlock()
        node.els = []
        const eb: Block = { kind: 'if', indent: ind, body: node.els, node, hasElse: true }
        pushBlock(eb); inlineRest(inl.slice(el.i + el.len), line, eb)
        return
      }
      pushBlock(b); inlineRest(inl, line, b); return
    }
    // depend on
    if ((m = /^(?:depend\s+on|dependon|bergantung\s+pada|case)\b\s*([\s\S]*)$/i.exec(t))) {
      const subj = m[1].trim().replace(/:$/, '').replace(/\b(?:do|lakukan)\b$/i, '').trim()
      const node: Node = { k: 'if', branches: [], line }
      add(node)
      pushBlock({ kind: 'depend', indent: ind, body: [], node, subject: subj }); return
    }
    parseSimple(t, line)
  }

  function backward(a: string, b: string): boolean {
    const num = (s: string) => /^-?\d+$/.test(s) ? Number(s) : null
    const na = num(a), nb = num(b)
    if (na !== null && nb !== null) return na > nb
    if (nb !== null && na === null && nb <= 1) return !/^\w*\+\s*1$/.test(a) && !/^(?:0|1)$/.test(a)
    if (na === null && nb === null) return /^(?:hmax|max|last|hi|high|akhir|terakhir|top|N|n|last-index|lastindex)\b/i.test(a) && /^(?:hmin|min|first|lo|low|awal|pertama|bottom|first-index|firstindex)\b/i.test(b)
    return false
  }
  function forHead(v: string, a: string, b: string, back: boolean, step?: string): string {
    const s = step ? `, ${exprOrErr(step, 0)}` : ''
    const plus = (x: string, d: 1 | -1) => {
      if (/^-?\d+$/.test(x)) return String(Number(x) + d)
      const mm = /^(.+?)\s*([+-])\s*(\d+)$/.exec(x)
      if (mm && !/[*/(]/.test(mm[1] + mm[3])) { const k = (mm[2] === '+' ? 1 : -1) * Number(mm[3]) + d; return k === 0 ? mm[1] : k > 0 ? `${mm[1]} + ${k}` : `${mm[1]} - ${-k}` }
      return d === 1 ? `${x} + 1` : `${x} - 1`
    }
    if (back) return `for ${v} in range(${a}, ${plus(b, -1)}, ${step ? exprOrErr(step, 0).replace(/^-?/, '-') : '-1'}):`
    return `for ${v} in range(${a}, ${plus(b, 1)}${s}):`
  }

  /* ----- main loop over logical lines ----- */
  for (const L of lines) {
    const { n, ind } = L
    const t = L.text
    let m: RegExpExecArray | null

    // ignorable markers
    if (/^(?:mulai|start|begin|finish|stop)\s*\.?$/i.test(t)) continue
    // program header
    if ((m = /^program\b\s*:?\s*([\s\S]*)$/i.exec(t)) && !findTop(t, /←|<-/) && !/^program\s*\(/i.test(t)) { while (stack.length > 1) popBlock(); declMode = false; globalDecl = false; programName = m[1].trim(); programLine = n; continue }
    // KAMUS / DECLARATIONS
    // also "LOCAL DECLARATIONS" / "KAMUS LOKAL" / "GLOBAL DECLARATIONS" (D10 slides use the prefix form)
    if ((m = /^(?:(?:lokal|local|global)\s+)?(kamus|deklarasi|declarations?|variabel|variables?|dictionary)(\s+(?:lokal|local|global))?\s*:?\s*([\s\S]*)$/i.exec(t))) {
      if (!/[←]/.test(t) && !/^\w+\s*[=(]/.test(m[3] ?? '') ) {
        if (curDef && !defSawAlgo && !curDef.body.length && !curDef.hasKamus) { declMode = true; curDef.hasKamus = true }
        else { while (stack.length > 1) popBlock(); declMode = true; globalDecl = true }
        if (m[3] && m[3].trim()) parseDecl(m[3].trim(), n)
        continue
      }
    }
    // ALGORITMA
    if (/^(?:algoritma|algorithm|algoritme)\s*:?\s*$/i.test(t)) {
      declMode = false
      if (curDef) {
        const own = !defSawAlgo && stack[stack.length - 1].kind === 'def' && (ind > stack[stack.length - 1].indent || curDef.hasKamus || !curDef.fromDecl)
        if (own) defSawAlgo = true
        else { while (stack.length > 1) popBlock(); globalDecl = false }    // main ALGORITMA closes any open subprogram
      } else { while (stack.length > 1) popBlock(); globalDecl = false }
      continue
    }

    // ----- structural pops -----
    const elseM = /^(?:else\s*if|elseif|elif|selain\s+itu\s+jika|selainnya\s+jika|jika\s+tidak\s+jika|lainnya\s+jika)\b\s*([\s\S]*)$/i.exec(t)
    const elseOnly = !elseM && /^(?:else|selain\s+itu|selainnya|lainnya|otherwise|jika\s+tidak(?=\s*(?:maka|then|:|$)))\b\s*(?:maka|then)?\s*:?\s*([\s\S]*)$/i.exec(t)
    const endM = isEnd(t)
    const untilM = /^(?:until|sampai|hingga)\b\s*([\s\S]*)$/i.exec(t)
    const defM = FUNC_RE.exec(t)

    if (defM && !findTop(t, /←|<-|:=/) && /^(function|fungsi|procedure|prosedur)\b/i.test(t) && /^(function|fungsi|procedure|prosedur)\s+[A-Za-z_]/i.test(t)) {
      // subprogram header: closes everything first
      while (stack.length > 1) popBlock()
      const kind = /^(function|fungsi)$/i.test(defM[1]) ? 'function' : 'procedure'
      const def: Def = { name: defM[2], kind, params: parseParams(defM[3] ?? '', n), body: [], line: n, scope: new Scope() }
      for (const p of def.params) if (p.arr) def.scope.arrayParams.add(p.name)
      defs.push(def); sigs.set(def.name, def)
      def.fromDecl = globalDecl
      curDef = def; defSawAlgo = false; declMode = false
      pushBlock({ kind: 'def', indent: ind, body: def.body, def })
      continue
    }

    if (endM) {
      const w = (END_RE.exec(t)![1] ?? '').toLowerCase()
      const want = !w || w === 'do' ? null : /^(if)$/.test(w) ? 'if' : /^(while|loop)$/.test(w) ? 'while' : /^(for|traversal)$/.test(w) ? 'for' : w === 'repeat' ? 'repeat' : /^(procedure|prosedur|function|fungsi)$/.test(w) ? 'def' : /^(depend|case)$/.test(w) ? 'depend' : 'all'
      if (want === 'all') { while (stack.length > 1) popBlock(); continue }
      if (stack.length > 1) {
        let idx = stack.length - 1
        if (want) { while (idx > 0 && stack[idx].kind !== want && !(want === 'depend' && stack[idx].kind === 'clause')) idx--; if (idx === 0) idx = -1 }
        if (idx > 0) { const stopAt = stack[idx].kind === 'clause' ? idx - 1 : idx; while (stack.length > stopAt && stack.length > 1) popBlock() }
        else if (want) err(n, `"${t}" has no open block to close`)
      }
      continue
    }

    if (elseM || elseOnly) {
      let idx = -1
      for (let i = stack.length - 1; i > 0; i--) { const b = stack[i]; if (b.kind === 'if' && !b.hasElse && b.indent <= ind) { idx = i; break } }
      if (idx < 0) for (let i = stack.length - 1; i > 0; i--) { const b = stack[i]; if (b.kind === 'if' && !b.hasElse) { idx = i; break } }
      // depend / clause "else :"  → handled below as clause
      const topB = stack[stack.length - 1]
      const inDepend = (topB.kind === 'depend' || topB.kind === 'clause') && /^(?:else|otherwise|lainnya|selain\s+itu)\s*:/i.test(t)
      if (!inDepend) {
        if (idx < 0) { err(n, `"${t.split(/\s+/)[0]}" without a matching "if" above it`); continue }
        while (stack.length > idx + 1) popBlock()
        const ifb = stack[idx], node = ifb.node as Extract<Node, { k: 'if' }>
        ifb.inline = false
        if (elseM) {
          let cond = elseM[1], inl = ''
          const th = findTop(cond, /\b(?:then|maka)\b/i)
          if (th) { inl = cond.slice(th.i + th.len); cond = cond.slice(0, th.i) }
          cond = cond.trim().replace(/:$/, '').trim()
          if (!cond) { err(n, '"else if" without a condition'); cond = 'False' }
          const br = { cond: paren(exprOrErr(cond, n)), body: [] as Node[], line: n }
          node.branches.push(br)
          ifb.body = br.body
          if (inl.trim()) { ifb.inline = true; parseStatement(inl.trim(), n, ifb.indent + 1) }
        } else {
          node.els = []
          ifb.hasElse = true
          ifb.body = node.els
          const rest = (elseOnly as RegExpExecArray)[1] ?? ''
          if (rest.trim()) { ifb.inline = true; parseStatement(rest.trim(), n, ifb.indent + 1) }
        }
        continue
      }
    }

    if (untilM && !findTop(t, /←|<-/)) {
      let idx = -1
      for (let i = stack.length - 1; i > 0; i--) if (stack[i].kind === 'repeat') { idx = i; break }
      if (idx < 0) { err(n, '"until" without a "repeat" above it'); continue }
      while (stack.length > idx + 1) popBlock()
      const b = stack[idx], node = b.node as Extract<Node, { k: 'repeat' }>
      node.until = untilM[1].trim() ? paren(exprOrErr(untilM[1].replace(/:$/, ''), n)) : (err(n, 'The until condition is empty'), 'True')
      node.untilLine = n
      popBlock()
      continue
    }

    // ----- generic: pop by indentation, then dispatch -----
    for (const b of stack) if (b.kind === 'def' && ind > b.indent) b.deeper = true
    if (top().kind === 'def' && top().def!.fromDecl && !top().def!.body.length && !top().def!.hasKamus && ind <= top().indent && (DECL_LIKE.test(t) || /^(?:constant|konstanta|const|type|tipe)\b/i.test(t))) { popBlock(); declMode = true }
    while (stack.length > 1 && shouldPop(top(), ind, t)) popBlock()

    const tb = top()
    // depend clause
    if (tb.kind === 'depend') {
      const c = findTop(t, /:/)
      if (!c) { err(n, 'Inside "depend on", every line must look like "condition : action"'); continue }
      let cond = t.slice(0, c.i).trim(), rest = t.slice(c.i + 1).trim()
      const node = tb.node as Extract<Node, { k: 'if' }>
      const isElse = /^(?:else|otherwise|lainnya|selain\s+itu|other)$/i.test(cond)
      let body: Node[]
      if (isElse) { node.els = []; body = node.els }
      else {
        let py = exprOrErr(cond, n)
        const subj = tb.subject ?? ''
        const relational = /[<>≤≥≠]|==|!=|\b(?:and|or|not)\b/.test(mask(py)) || /(?:^|[^=<>!])=(?!=)/.test(mask(cond))
        if (subj && !findTop(subj, /,/) && !relational) py = `${paren(exprOrErr(subj.replace(/^\((.*)\)$/, '$1'), n))} == ${py}`
        const br = { cond: paren(py), body: [] as Node[], line: n }
        node.branches.push(br); body = br.body
      }
      const cb: Block = { kind: 'clause', indent: ind, body }
      pushBlock(cb)
      if (rest) { cb.inline = true; parseStatement(rest, n, ind + 1) }
      continue
    }
    if (declMode) {
      if (parseDecl(t, n)) continue
      // lenient: a non-declaration line ends the declaration part
      declMode = false; if (!curDef) globalDecl = false
    } else if (DECL_LIKE.test(t) && !findTop(t, /←|<-/) && tb.kind === 'root') {
      if (parseDecl(t, n)) continue
    }
    parseStatement(t, n, ind)
  }
  while (stack.length > 1) {
    const b = popBlock()
    if (b.kind === 'repeat') err((b.node as { line: number }).line, '"repeat" has no "until" (stop condition)')
  }

  /* ============================== emit Python ============================== */
  const outLines: string[] = []
  const map: number[] = []
  const push = (s: string, line: number) => { outLines.push(s); map.push(line) }
  const I = (d: number) => '    '.repeat(d)

  const allText = src
  const inferStr = (name: string) => new RegExp(`\\b${name}\\s*(?:=|≠|<>|!=|←|<-|:=)\\s*["']|["']\\s*(?:=|≠|<>|!=)\\s*${name}\\b`).test(allText)
  let needReader = false
  const typeOf = (name: string, sc: Scope): Kind | undefined => sc.types.get(name) ?? global.types.get(name)
  const readExpr = (target: string, sc: Scope): string => {
    const base = /^([A-Za-z_]\w*)\s*\[/.exec(target)
    let kind: Kind | undefined
    if (base) { const a = sc.arrays.get(base[1]) ?? global.arrays.get(base[1]); kind = a?.elem }
    else kind = typeOf(target, sc)
    if (!kind) { if (inferStr(base ? base[1] : target)) kind = 'str' }
    if (kind === 'int') return 'int(input())'
    if (kind === 'float') return 'float(input())'
    if (kind === 'str') return 'input()'
    if (kind === 'bool') return 'input().strip().lower() in ("true", "t", "1", "benar", "ya", "yes")'
    needReader = true
    return '_in()'
  }
  const initVal = (k?: Kind) => (k === 'float' ? '0.0' : k === 'str' ? '""' : k === 'bool' ? 'False' : '0')
  const sizeExpr = (a: ArrDecl): string | null => {
    if (!a.hi.trim()) return null
    try {
      const lo = a.lo.trim(), hi = exprToPython(a.hi).trim()
      if (/^-?\d+$/.test(hi) && /^-?\d+$/.test(lo)) return String(Number(hi) - Number(lo) + 1)
      if (lo === '0' || lo === '1') {
        if (lo === '1') return /^-?\d+$/.test(hi) ? String(Number(hi) + 1) : `${hi} + 1`
        const mm = /^(.+?)\s*-\s*1$/.exec(hi)
        if (mm && !/[+\-]/.test(mm[1].replace(/^\(|\)$/g, '')) ) return mm[1].replace(/^\((.*)\)$/, '$1')
        if (mm) return mm[1]
        return /^-?\d+$/.test(hi) ? String(Number(hi) + 1) : `${hi} + 1`
      }
      return `${hi} - (${exprToPython(lo)}) + 1`
    } catch { return null }
  }
  const sigFor = (name: string): Def | undefined => sigs.get(name) ?? [...sigs.values()].find((d) => d.name.toLowerCase() === name.toLowerCase())

  let curDefEmit: Def | null = null
  const emitNodes = (nodes: Node[], d: number, sc: Scope, topLevel = false): void => {
    if (!nodes.length) { push(I(d) + 'pass', 0); return }
    for (const nd of nodes) {
      if (topLevel) {
        // lazily create declared arrays right before their first use
        const tmp: string[] = [], tmpMap: number[] = []
        const saveL = outLines.length
        emitNode(nd, d, sc)
        tmp.push(...outLines.splice(saveL)); tmpMap.push(...map.splice(saveL))
        const body = tmp.join('\n')
        for (const [name, a] of sc.arrays) {
          if (sc.inited.has(name) || sc.arrayParams.has(name)) continue
          if (new RegExp(`\\b${name}\\b`).test(body)) {
            sc.inited.add(name)
            const sz = sizeExpr(a)
            if (sz) push(`${I(d)}${PY_RESERVED.has(name) ? name + '_' : name} = [${initVal(a.elem)}] * ${/[+\-]/.test(sz) && !/^\(.*\)$/.test(sz) ? `(${sz})` : sz}`, nodeLine(nd))
          }
        }
        for (let i = 0; i < tmp.length; i++) { outLines.push(tmp[i]); map.push(tmpMap[i]) }
      } else emitNode(nd, d, sc)
    }
  }
  const nodeLine = (n: Node): number => n.line
  const emitNode = (nd: Node, d: number, sc: Scope): void => {
    switch (nd.k) {
      case 's': push(I(d) + nd.code, nd.line); break
      case 'in': for (const t of nd.targets) push(`${I(d)}${t} = ${readExpr(t, nd.scope)}`, nd.line); break
      case 'ret': {
        const def = curDefEmit
        const outs = def ? def.params.filter((p) => p.mode !== 'in' && !p.arr).map((p) => PY_RESERVED.has(p.name) ? p.name + '_' : p.name) : []
        if (def?.kind === 'procedure' && outs.length) push(`${I(d)}return ${outs.join(', ')}`, nd.line)
        else push(I(d) + (nd.expr ? `return ${nd.expr}` : 'return'), nd.line)
        break
      }
      case 'call': {
        const sig = sigFor(nd.name)
        const args = nd.args.map((a) => exprOrErr(a, nd.line))
        if (sig && sig.params.length !== nd.args.length) err(nd.line, `${sig.kind === 'function' ? 'Function' : 'Procedure'} ${sig.name} needs ${sig.params.length} argument(s) but was called with ${nd.args.length}`)
        if (!sig || sig.kind === 'function') { push(`${I(d)}${nd.name}(${args.join(', ')})`, nd.line); break }
        const targets: string[] = [], pass: string[] = []
        sig.params.forEach((p, i) => {
          const a = args[i]; if (a === undefined) return
          if (p.mode !== 'in' && !p.arr) targets.push(a)
          if (p.mode !== 'out' || p.arr) pass.push(a)
        })
        push(`${I(d)}${targets.length ? targets.join(', ') + ' = ' : ''}${sig.name}(${pass.join(', ')})`, nd.line)
        break
      }
      case 'if': {
        nd.branches.forEach((br, i) => { push(`${I(d)}${i ? 'elif' : 'if'} ${br.cond}:`, br.line); emitNodes(br.body, d + 1, sc) })
        if (nd.els) { push(`${I(d)}else:`, nd.els.length ? ((nd.els[0] as { line: number }).line ?? nd.line) : nd.line); emitNodes(nd.els, d + 1, sc) }
        if (!nd.branches.length) push(I(d) + 'pass', nd.line)
        break
      }
      case 'while': push(`${I(d)}while ${nd.cond}:`, nd.line); emitNodes(nd.body, d + 1, sc); break
      case 'for': push(I(d) + nd.head, nd.line); emitNodes(nd.body, d + 1, sc); break
      case 'repeat':
        push(`${I(d)}while True:`, nd.line)
        for (const x of nd.body) emitNode(x, d + 1, sc)
        push(`${I(d + 1)}if ${nd.until ?? 'True'}:`, nd.untilLine ?? nd.line)
        push(`${I(d + 2)}break`, nd.untilLine ?? nd.line)
        break
    }
  }

  // header
  const headerStart = outLines.length
  void headerStart
  const usesMath = [...allText.matchAll(/[A-Za-z_]\w*/g)].some((x) => MATH_NAMES.has(x[0]) && new RegExp(`\\b${x[0]}\\s*\\(|\\bpi\\b`).test(allText))
  const bodyStart = outLines.length
  if (programName || programLine) push(`# Program ${programName}`.trimEnd(), programLine)
  if (global.declOrder.length) {
    push('# DECLARATIONS', global.declOrder[0].line)
    for (const dcl of global.declOrder) push(`# ${dcl.names.join(', ')} : ${pyTypeName(dcl.text)}`, dcl.line)
    push('# ALGORITHM', global.declOrder[global.declOrder.length - 1].line)
  }
  function pyTypeName(t: string): string {
    const a = ARR_RE.exec(t)
    if (a) return `array [${a[1]}..${a[2]}] of ${pyTypeName(a[3])}`
    const w = t.trim().split(/\s+/)[0].toLowerCase()
    return TYPE_WORDS[w] ?? t.trim()
  }
  const bodyHeaderEnd = outLines.length
  for (const c of consts) push(`${c.name} = ${c.value}`, c.line)

  // subprograms (hoisted; a signature-only declaration is dropped when a full definition exists)
  const bestDef = new Map<string, Def>()
  for (const df of defs) { const prev = bestDef.get(df.name); if (!prev || (!prev.body.length && df.body.length)) bestDef.set(df.name, df) }
  const defStart = outLines.length
  for (const df of bestDef.values()) if (!df.body.length) err(df.line, `${df.kind === 'function' ? 'Function' : 'Procedure'} ${df.name} is only declared and has no body yet. Write its definition (local ALGORITHM) after the main program or before "Program".`)
  for (const df of bestDef.values()) {
    if (outLines.length > bodyStart) push('', 0)
    const pass = df.params.filter((p) => p.mode !== 'out' || p.arr).map((p) => (PY_RESERVED.has(p.name) ? p.name + '_' : p.name))
    push(`def ${df.name}(${pass.join(', ')}):`, df.line)
    curDefEmit = df
    const before = outLines.length
    emitNodes(df.body, 1, df.scope, true)
    if (outLines.length === before) push(I(1) + 'pass', df.line)
    const outs = df.params.filter((p) => p.mode !== 'in' && !p.arr)
    const last = df.body[df.body.length - 1]
    if (df.kind === 'procedure' && outs.length && !(last && last.k === 'ret')) push(`${I(1)}return ${outs.map((p) => (PY_RESERVED.has(p.name) ? p.name + '_' : p.name)).join(', ')}`, df.line)
    curDefEmit = null
  }
  if (outLines.length > defStart) push('', 0)
  const mainStart = outLines.length
  emitNodes(main, 0, global, true)
  void mainStart
  void bodyHeaderEnd

  // prelude
  const pre: string[] = []
  if (usesMath) pre.push('from math import *')
  if (needReader) pre.push('def _in():', '    s = input()', '    try:', '        return int(s)', '    except ValueError:', '        try:', '            return float(s)', '        except ValueError:', '            return s', '')
  if (pre.length) { outLines.splice(0, 0, ...pre); map.splice(0, 0, ...pre.map(() => 0)) }

  return { code: outLines.join('\n') + (outLines.length ? '\n' : ''), errors, map }
}
