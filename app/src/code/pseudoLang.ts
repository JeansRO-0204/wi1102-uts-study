// Liem-notation pseudocode as a small CodeMirror StreamLanguage (highlighting only; no indentation rules).
// Only imported by CodeEditor (lazy chunk).
import { StreamLanguage, type StringStream } from '@codemirror/language'

const HEAD = new Set(['program', 'kamus', 'deklarasi', 'declaration', 'declarations', 'algoritma', 'algorithm'])
const KEYWORDS = new Set([
  'if', 'then', 'else', 'elif', 'endif', 'while', 'do', 'endwhile', 'repeat', 'until', 'for', 'endfor', 'traversal', 'in', 'to', 'downto', 'step',
  'input', 'output', 'function', 'procedure', 'return', 'depend', 'on', 'case', 'of', 'constant', 'type', 'array', 'end',
  'div', 'mod', 'and', 'or', 'not', 'xor',
])
const ATOMS = new Set(['true', 'false', 'null', 'none'])
const TYPES = new Set(['integer', 'real', 'boolean', 'string', 'char', 'int', 'float', 'bool', 'str', 'list', 'array'])

interface St { inBrace: boolean }

function token(stream: StringStream, st: St): string | null {
  if (st.inBrace) {
    while (!stream.eol()) { if (stream.next() === '}') { st.inBrace = false; break } }
    return 'comment'
  }
  if (stream.eatSpace()) return null
  if (stream.match('{')) { st.inBrace = true; while (!stream.eol()) { if (stream.next() === '}') { st.inBrace = false; break } } return 'comment' }
  if (stream.peek() === '#') { stream.skipToEnd(); return 'comment' }
  if (stream.match(/^"(?:[^"\\]|\\.)*"?/) || stream.match(/^'(?:[^'\\]|\\.)*'?/)) return 'string'
  if (stream.match(/^\d+(?:\.\d+)?/)) return 'number'
  if (stream.match(/^(?:←|<-|:=|<=|>=|<>|!=|==|[-+*/%<>=])/)) return 'operator'
  const m = stream.match(/^[A-Za-z_][A-Za-z0-9_]*/) as RegExpMatchArray | null
  if (m) {
    const w = m[0].toLowerCase()
    if (HEAD.has(w)) return 'meta'
    if (KEYWORDS.has(w)) return 'keyword'
    if (ATOMS.has(w)) return 'atom'
    if (TYPES.has(w)) return 'typeName'
    return stream.match(/^\s*\(/, false) ? 'variableName.function' : 'variableName'
  }
  stream.next()
  return null
}

export const pseudoLanguage = StreamLanguage.define<St>({
  name: 'pseudocode',
  startState: () => ({ inBrace: false }),
  copyState: (s) => ({ inBrace: s.inBrace }),
  token,
  languageData: { commentTokens: { block: { open: '{', close: '}' } } },
})
