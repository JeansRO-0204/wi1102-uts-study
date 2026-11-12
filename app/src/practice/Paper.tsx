// Printable renderings of a question (for the paper mock) and of its answer key. Static: no inputs, no execution.
import { EXPECTED } from '../bank'
import { FlowView } from '../code/api'
import { Md } from '../lib/kit'
import { RUBRIC_INDEX, type Problem, type Question } from '../types'
import { loc, pick, type Lang } from './Hints'

const SPACE: Record<Question['kind'], number> = { 'mcq-multi': 0, mcq: 0, short: 0, open: 42, constraint: 70, classify: 90, robot: 55, program: 120, trace: 60, bug: 30 }

function Code({ children, numbered }: { children: string; numbered?: boolean }) {
  const lines = children.replace(/\n+$/, '').split('\n')
  return <pre className="mk-code">{lines.map((l, i) => <div key={i}>{numbered && <i>{i + 1}</i>}{l || ' '}</div>)}</pre>
}

/** The question as it appears on the exam sheet, with blank answer space. */
export function PaperQuestion({ q, p, n, lang = 'en' }: { q: Question; p: Problem; n?: string | number; lang?: Lang }) {
  const multi = p.parts.length > 1
  const L = loc(q, lang)
  return (
    <div className="mk-q">
      <div className="mk-q-h">{n != null && <b className="mk-n">{n}.</b>}{q.label && multi && <b>({q.label})</b>}{q.weight != null && multi && <span className="mk-w">[{Math.round(q.weight * 100)}%]</span>}</div>
      <Md>{L.stem}</Md>
      {q.kind === 'mcq-multi' && (
        <table className="mk-opts"><tbody>
          {(L.options ?? q.options).map((o, i) => <tr key={i}><td className="mk-box">○ / ✗</td><td><b>{String.fromCharCode(97 + i)}.</b> <Md inline>{o}</Md></td></tr>)}
        </tbody></table>
      )}
      {q.kind === 'mcq' && <ol type="A" className="mk-ol">{(L.options ?? q.options).map((o, i) => <li key={i}><Md inline>{o}</Md></li>)}</ol>}
      {q.kind === 'short' && <ul className="mk-blanks">{q.blanks.map((b, i) => <li key={i}>{L.labels?.[i] ?? b.label}: <span className="mk-line" /></li>)}</ul>}
      {q.kind === 'trace' && (
        <>
          {q.code && <Code numbered>{q.code}</Code>}
          {q.pseudo && <Code numbered>{q.pseudo}</Code>}
          {q.flow && <div className="mk-flow"><FlowView flow={q.flow} compact /></div>}
          {q.stdin && <p><b>Input:</b> {q.stdin.join(', ')}</p>}
          {q.ask === 'table' && q.watch && <table className="mk-table"><thead><tr>{q.watch.map((w) => <th key={w}>{w}</th>)}</tr></thead><tbody>{[0, 1, 2, 3, 4, 5].map((r) => <tr key={r}>{q.watch!.map((w) => <td key={w}>&nbsp;</td>)}</tr>)}</tbody></table>}
        </>
      )}
      {q.kind === 'bug' && <Code numbered>{q.code}</Code>}
      {q.kind === 'classify' && (
        <table className="mk-table"><thead><tr>{q.columns.map((c) => <th key={c}>{c}</th>)}<th>{q.codeColumn}</th></tr></thead>
          <tbody>{q.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{String(c)}</td>)}<td>&nbsp;</td></tr>)}</tbody></table>
      )}
      {q.kind === 'constraint' && (
        <p className="mk-ent"><b>{q.shape === 'grid' ? 'Rows' : 'Entities'}:</b> {q.entities.join(', ')}<br /><b>{q.shape === 'grid' ? 'Columns' : 'Slots'}:</b> {q.slots.join(', ')}</p>
      )}
      {q.kind === 'robot' && <p className="mk-ent">Write a program in the robot language ({q.dialect === 'rody' ? 'up / down / walk / repeat n' : q.dialect === 'ladybug' ? 'Forward / Left / Right / Repeat' : 'free notation'}) with parameter <b>{q.param}</b>.</p>}
      {SPACE[q.kind] > 0 && <div className="mk-space" style={{ height: SPACE[q.kind] + 'mm' }} aria-label="answer space" />}
    </div>
  )
}

/** The key for one question. */
export function AnswerKey({ q, lang = 'en' }: { q: Question; lang?: Lang }) {
  const L = loc(q, lang)
  const ex = EXPECTED[q.id]
  const rub = 'rubric' in q ? q.rubric : undefined
  return (
    <div className="mk-key">
      {q.kind === 'mcq-multi' && <p className="mk-keyline">{q.correct.map((c, i) => `${String.fromCharCode(97 + i)}: ${c ? '○' : '✗'}`).join('   ')}</p>}
      {q.kind === 'mcq' && <p className="mk-keyline">{q.answer.map((i) => String.fromCharCode(65 + i)).join(', ')}</p>}
      {q.kind === 'short' && <ul>{q.blanks.map((b, i) => <li key={i}>{L.labels?.[i] ?? b.label}: <code>{b.accept[0]}</code></li>)}</ul>}
      {q.kind === 'open' && <><Md>{L.answer ?? q.answer}</Md>{L.keyPoints && <ul>{L.keyPoints.map((k, i) => <li key={i}><Md inline>{k}</Md></li>)}</ul>}</>}
      {q.kind === 'constraint' && <Solution v={q.solution} />}
      {q.kind === 'classify' && <><p><b>Pattern:</b> <code>{q.model.pattern}</code> · <b>Level:</b> {q.model.levels.map((l) => l.attr).join(' → ')}</p><p className="mk-codes">{q.model.codes.join('  ·  ')}</p></>}
      {q.kind === 'robot' && <><Code>{q.solution}</Code>{ex?.paths && <p className="muted">Path computed for n = {Object.keys(ex.paths).join(', ')}</p>}</>}
      {q.kind === 'program' && <><Code>{q.solution.python}</Code>{ex?.outputs?.[0] != null && <p><b>Output of test 1{q.tests[0]?.stdin?.length ? ` (input: ${q.tests[0].stdin.join(', ')})` : ''}:</b></p>}{ex?.outputs?.[0] != null && <Code>{ex.outputs[0]}</Code>}</>}
      {q.kind === 'trace' && <>{ex?.output != null && <Code>{ex.output}</Code>}{ex?.final && <p>{Object.entries(ex.final).map(([k, v]) => `${k} = ${v}`).join(', ')}</p>}
        {ex?.table && q.watch && <table className="mk-table"><thead><tr>{q.watch.map((w) => <th key={w}>{w}</th>)}</tr></thead><tbody>{ex.table.map((r, i) => <tr key={i}>{q.watch!.map((w) => <td key={w}>{r[w]}</td>)}</tr>)}</tbody></table>}</>}
      {q.kind === 'bug' && <><p>Bug lines: <b>{q.badLines.join(', ')}</b></p><Code numbered>{q.fixed}</Code></>}
      {rub && rub.length > 0 && <table className="mk-table mk-rub"><tbody>{[...rub].sort((a, b) => b.score - a.score).map((r) => <tr key={r.score}><td>{r.score} ({RUBRIC_INDEX[r.score]})</td><td>{pick(lang, r.desc, r.descEn)}</td></tr>)}</tbody></table>}
    </div>
  )
}

function Solution({ v }: { v: unknown }) {
  if (Array.isArray(v)) return <p className="mk-codes">{v.map((x) => JSON.stringify(x)).join('  ')}</p>
  if (v && typeof v === 'object') return <ul>{Object.entries(v as Record<string, unknown>).map(([k, x]) => <li key={k}><b>{k}</b> → {Array.isArray(x) ? x.join(', ') : String(x)}</li>)}</ul>
  return <code>{JSON.stringify(v)}</code>
}
