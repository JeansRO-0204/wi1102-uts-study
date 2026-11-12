// Trace view: desk-check first (output / table / final values), nothing runs before Submit; afterwards the Tracer unlocks.
import { useEffect, useMemo, useRef, useState } from 'react'
import { Feedback, Md, PageChip, Verdict, type Note } from '../lib/kit'
import { py, type PyTrace } from '../py/client'
import { EXPECTED } from '../bank'
import { outputDiff, outputOk } from '../practice/answerCheck'
import { hintCap, loc } from '../practice/Hints'
import { SYNTAX_BY_ID } from '../content/syntax'
import CodeNotes from '../content/CodeNotes'
import SyntaxDrawer from '../content/SyntaxDrawer'
import { FlowView, flowToPython, pseudoToPython } from '../code/api'
import Tracer from '../code/Tracer'
import Editor from '../code/Editor'
import { logSubmission } from '../practice/submissions'
import { changingVars, compareFinal, compareTable, normVal, tableFromTrace } from '../code/diagnose'
import type { Expected, SyntaxId, TraceQ } from '../types'
import type { Outcome, QViewProps } from './contract'
import '../code/program.css'

interface Ans { out: string; rows: string[][]; fin: Record<string, string> }
const asAns = (a: unknown): Ans | null => (a && typeof a === 'object' && 'rows' in a ? (a as Ans) : null)
const blankRows = (n: number, c: number) => Array.from({ length: n }, () => new Array<string>(c).fill(''))

const RUNGS = ['vars', 'cols', 'first', 'full'] as const
type Rung = typeof RUNGS[number]
const RL: Record<Rung, [string, string]> = {
  vars: ['Variabel mana yang berubah?', 'Which variables change?'], cols: ['Kolom tabel kosong', 'Empty table columns'],
  first: ['Baris pertama', 'First row'], full: ['Jejak lengkap + penelusur', 'Full trace + tracer'],
}
const T = {
  id: {
    listing: 'Program', stdin: 'Masukan', ask: { output: 'Tuliskan keluaran program (tepat seperti tercetak).', table: 'Isi tabel nilai variabel setiap kali berubah. Satu baris per keadaan.', final: 'Tuliskan nilai akhir tiap variabel setelah program selesai.' },
    out: 'Keluaran', addRow: '+ baris', rmRow: 'Hapus baris', submit: 'Kumpulkan', check: 'Periksa (tidak dikumpulkan)', paperTip: 'Mode Kertas: telusuri di kepala/kertas dulu. Tidak ada yang dijalankan sebelum dikumpulkan.',
    result: 'Hasil', tracer: 'Penelusur langkah demi langkah', tracerNote: 'Gunakan ◀ ▶ atau gesek penggeser untuk melihat tiap baris dijalankan.', explanation: 'Pembahasan',
    right: 'Benar.', ladder: 'Bantuan', next: 'Buka berikutnya', cap: 'nilai maks', opened: 'Petunjuk dibuka', all: 'Semua bantuan sudah dibuka.', compiled: 'Hasil terjemahan ke Python (dilacak oleh penelusur)', want: 'seharusnya', loading: 'Menyiapkan…', empty: 'Isi jawabanmu dulu.', row: 'Baris',
  },
  en: {
    listing: 'Program', stdin: 'Input', ask: { output: 'Write the program output (exactly as printed).', table: 'Fill the table with the variables each time they change. One row per state.', final: 'Write the final value of each variable once the program ends.' },
    out: 'Output', addRow: '+ row', rmRow: 'Delete row', submit: 'Submit', check: 'Check (not submitted)', paperTip: 'Paper mode: desk-check first. Nothing runs before you submit.',
    result: 'Result', tracer: 'Step-through tracer', tracerNote: 'Use ◀ ▶ or the slider to watch each line run.', explanation: 'Worked solution',
    right: 'Correct.', ladder: 'Help', next: 'Open next', cap: 'max credit', opened: 'Hints opened', all: 'All help is open.', compiled: 'Compiled Python (what the tracer follows)', want: 'expected', loading: 'Preparing…', empty: 'Fill in your answer first.', row: 'Row',
  },
}

interface Checked { correct: boolean; score: number; notes: Note[]; rowOk?: (boolean | null)[]; finOk?: Record<string, boolean> }

export default function TraceView({ q, mode, lang, onDone, review, compact }: QViewProps<TraceQ>) {
  const t = T[lang]
  const L = loc(q, lang)
  const lab = mode === 'learn'
  const cols = useMemo(() => q.watch ?? [], [q])
  const saved = asAns(review?.answer)

  const [out, setOut] = useState(saved?.out ?? '')
  const [rows, setRows] = useState<string[][]>(saved?.rows ?? blankRows(3, cols.length))
  const [fin, setFin] = useState<Record<string, string>>(saved?.fin ?? {})
  const [phase, setPhase] = useState<'edit' | 'done'>(review ? 'done' : 'edit')
  const [res, setRes] = useState<Checked | null>(null)
  const [opened, setOpened] = useState<Rung[]>([])
  const [synUsed, setSynUsed] = useState(false)
  const [drawer, setDrawer] = useState<SyntaxId[] | null>(null)
  const [ref, setRef] = useState<PyTrace | null>(null)
  const doneRef = useRef(false)

  // Python of the listing (pseudo / flow are compiled)
  const comp = useMemo(() => {
    if (q.code != null) return { code: q.code, errors: [] as string[] }
    if (q.pseudo) { const r = pseudoToPython(q.pseudo); return { code: r.code, errors: r.errors.map((e) => `Line ${e.line}: ${e.msg}`) } }
    if (q.flow) { const r = flowToPython(q.flow); return { code: r.code, errors: r.errors } }
    return { code: '', errors: ['This question has no program.'] }
  }, [q])

  useEffect(() => {
    if (review) return
    setOut(''); setRows(blankRows(3, cols.length)); setFin({}); setPhase('edit'); setRes(null); setOpened([]); setSynUsed(false); doneRef.current = false
  }, [q.id, cols.length, review])

  // reference run (invisible): baked values win, otherwise this is the fallback
  useEffect(() => {
    let live = true
    setRef(null)
    if (comp.code) void py.trace(comp.code, q.stdin ?? []).then((r) => { if (live) setRef(r) })
    return () => { live = false }
  }, [comp.code, q.id, q.stdin])

  const exp: Expected | null = useMemo(() => {
    const b = EXPECTED[q.id]
    if (b && (b.output != null || b.table || b.final)) return b
    if (!ref) return null
    const last = ref.trace.at(-1)
    const fl = last ? Object.fromEntries(Object.entries(last.vars).filter(([k]) => !cols.length || cols.includes(k))) : undefined
    return { output: ref.stdout, final: fl, table: cols.length ? tableFromTrace(ref.trace.map((s) => ({ vars: Object.fromEntries(Object.entries(s.vars).filter(([k]) => cols.includes(k))) })), cols) : undefined }
  }, [q.id, ref, cols])

  const full = opened.includes('full')
  const hints = full ? 5 : opened.length + (synUsed && !lab ? 1 : 0)
  const cap = hintCap(hints)
  const nextRung = RUNGS.find((r) => !opened.includes(r))
  const changing = useMemo(() => (ref ? changingVars(ref.trace) : []), [ref])
  const hintVars = cols.length ? cols : changing

  const check = (): Checked | null => {
    if (!exp) return null
    if (q.ask === 'output') {
      const want = exp.output ?? ''
      const gl = out.replace(/\r/g, '').split('\n'), wl = want.replace(/\s+$/, '').split('\n')
      const ok = outputOk('lenient', out, want)
      const m = wl.filter((l, i) => outputOk('lenient', gl[i] ?? '', l)).length
      const notes: Note[] = []
      if (ok) notes.push({ level: 'ok', msg: t.right })
      else if (!out.trim()) notes.push({ level: 'err', msg: t.empty })
      else {
        notes.push({ level: 'err', msg: outputDiff(out, want) || `The output should be:\n\n\`${want.trim()}\`` })
        if (outputOk('numbers', out, want)) notes.push({ level: 'warn', msg: 'The numbers are right; check the text/format of the output (spaces, letters, punctuation).' })
      }
      return { correct: ok, score: ok ? 1 : (m / Math.max(1, wl.length)) * 0.8, notes }
    }
    if (q.ask === 'table') {
      const r = compareTable(rows, cols, exp.table ?? [])
      const notes: Note[] = r.correct ? [{ level: 'ok', msg: t.right }] : r.msgs.map((m) => ({ level: 'err' as const, msg: m }))
      return { correct: r.correct, score: r.score, notes, rowOk: r.rowOk }
    }
    const r = compareFinal(fin, exp.final ?? {}, cols)
    const notes: Note[] = r.correct ? [{ level: 'ok', msg: t.right }] : r.per.filter((p) => !p.ok).map((p) => ({ level: 'err' as const, msg: `\`${p.name}\`: ${fin[p.name]?.trim() ? `your answer \`${fin[p.name]}\`, ` : ''}${t.want} \`${p.want}\`` }))
    return { correct: r.correct, score: r.score, notes, finOk: Object.fromEntries(r.per.map((p) => [p.name, p.ok])) }
  }

  useEffect(() => { if (review && exp && !res) setRes(check()) /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [review, exp])

  const hasAnswer = q.ask === 'output' ? !!out.trim() : q.ask === 'table' ? rows.some((r) => r.some((c) => c.trim())) : cols.some((c) => fin[c]?.trim())
  const submit = () => {
    if (phase !== 'edit' || !exp) return
    const r = check()!
    setRes(r); setPhase('done')
    if (doneRef.current) return
    doneRef.current = true
    const o: Outcome = {
      correct: r.correct, score: r.score * cap, hints, tags: r.correct ? undefined : q.misconceptions,
      summary: r.correct ? 'Trace correct' : `Trace ${Math.round(r.score * 100)}% correct`,
      answer: { out, rows, fin } satisfies Ans,
    }
    logSubmission(q.id, {
      verdict: r.correct ? 'Accepted' : 'Wrong Answer', passed: r.correct ? 1 : 0, total: 1, rep: q.flow ? 'flow' : q.pseudo ? 'pseudo' : 'python', mode, hints,
      code: q.ask === 'output' ? out : JSON.stringify(q.ask === 'table' ? rows : fin),
    })
    onDone(o)
  }
  const labCheck = () => setRes(check())
  const openNext = () => {
    if (!nextRung) return
    setOpened((o) => [...o, nextRung])
    if (nextRung === 'first' && q.ask === 'table' && exp?.table?.[0] && rows.every((r) => r.every((c) => !c.trim()))) {
      setRows((rs) => rs.map((r, i) => (i === 0 ? cols.map((c) => exp.table![0][c] ?? '') : r)))
    }
  }

  const setCell = (i: number, j: number, v: string) => setRows((rs) => rs.map((r, a) => (a === i ? r.map((c, b) => (b === j ? v : c)) : r)))
  const readOnly = phase === 'done'
  const showMarks = (phase === 'done' || (lab && res)) && res

  const firstState = exp?.table?.[0] ?? (exp?.final ?? {})
  const distinct = (c: string) => (ref ? new Set(ref.trace.map((s) => s.vars[c]).filter((v) => v != null)).size : 0)

  const listing = q.code != null ? q.code : q.pseudo
  return (
    <div className={'trace' + (compact ? ' prog-compact' : '')}>
      <div className="trace-listing">
        <small className="muted">{t.listing}{q.flow ? ' (flowchart)' : q.pseudo ? ' (pseudocode)' : ''}</small>
        {q.flow ? <FlowView flow={q.flow} />
          : phase === 'done' && q.lineNotes?.length ? <CodeNotes code={listing ?? ''} notes={q.lineNotes} lang={lang} onSyntax={(id) => setDrawer([id as SyntaxId])} />
          : <Editor value={(listing ?? '').replace(/\n$/, '')} mode={mode} readOnly language={q.pseudo ? 'pseudo' : 'python'} minLines={3} maxLines={30} ariaLabel={t.listing} />}
        {q.stdin?.length ? <div className="trace-stdin"><small className="muted">{t.stdin}:</small> <code>{q.stdin.join(' ⏎ ')}</code></div> : null}
        {comp.errors.length > 0 && <Feedback notes={comp.errors.map((m) => ({ level: 'warn' as const, msg: m }))} />}
        {q.syntax?.length ? (
          <div className="prog-syn">
            {q.syntax.map((id) => <button key={id} className="chip prog-chip" onClick={() => { setDrawer([id]); setSynUsed(true) }}>{SYNTAX_BY_ID.get(id)?.title ?? id}</button>)}
          </div>
        ) : null}
      </div>

      {/* ---------- desk-check ---------- */}
      <div className="trace-ask">
        <b>{t.ask[q.ask]}</b>
        {!lab && !readOnly && <div className="muted prog-small">{t.paperTip}</div>}
        {q.ask === 'output' && (
          <textarea className="trace-out" rows={5} value={out} onChange={(e) => setOut(e.target.value)} readOnly={readOnly} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" aria-label={t.out} placeholder={t.out}
            onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); submit() } }} />
        )}
        {q.ask === 'table' && (
          <div className="trace-tbl-wrap">
            <table className="trace-tbl">
              <thead><tr><th>#</th>{cols.map((c) => <th key={c}><code>{c}</code></th>)}<th /></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={showMarks && res!.rowOk ? (res!.rowOk[i] === true ? 'ok' : res!.rowOk[i] === false ? 'err' : '') : ''}>
                    <td className="muted">{i + 1}</td>
                    {cols.map((c, j) => (
                      <td key={c}>
                        <input value={r[j]} readOnly={readOnly} onChange={(e) => setCell(i, j, e.target.value)} spellCheck={false} autoComplete="off" aria-label={`${t.row} ${i + 1} ${c}`}
                          onKeyDown={(e) => { if (e.key === 'Enter' && !readOnly) { e.preventDefault(); if (i === rows.length - 1 && j === cols.length - 1) setRows((rs) => [...rs, new Array<string>(cols.length).fill('')]) } }} />
                      </td>
                    ))}
                    <td>{!readOnly && rows.length > 1 && <button className="btn sm ghost" aria-label={t.rmRow} title={t.rmRow} onClick={() => setRows((rs) => rs.filter((_, k) => k !== i))}>✕</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!readOnly && <button className="btn sm" onClick={() => setRows((rs) => [...rs, new Array<string>(cols.length).fill('')])}>{t.addRow}</button>}
          </div>
        )}
        {q.ask === 'final' && (
          <div className="trace-final">
            {cols.map((c) => (
              <label key={c} className={'trace-fin' + (showMarks && res!.finOk ? (res!.finOk[c] ? ' ok' : ' err') : '')}>
                <code>{c}</code> =
                <input value={fin[c] ?? ''} readOnly={readOnly} onChange={(e) => setFin((f) => ({ ...f, [c]: e.target.value }))} spellCheck={false} autoComplete="off" />
              </label>
            ))}
          </div>
        )}
      </div>

      {phase === 'edit' && !review && (
        <div className="prog-row prog-submit">
          <button className="btn primary" onClick={submit} disabled={!hasAnswer || !exp}>{!exp ? t.loading : t.submit}</button>
          {lab && <button className="btn" onClick={labCheck} disabled={!hasAnswer || !exp}>{t.check}</button>}
        </div>
      )}
      {lab && phase === 'edit' && res && <Feedback notes={res.notes} />}

      {/* ---------- hint ladder ---------- */}
      {phase === 'edit' && !review && (
        <div className="prog-ladder">
          {opened.map((r) => (
            <details key={r} className="prog-rung" open={r === opened[opened.length - 1]}>
              <summary>{RL[r][lang === 'en' ? 1 : 0]}</summary>
              {r === 'vars' && (
                <div>
                  {L.hints.length > 0 && <ul>{L.hints.map((h, i) => <li key={i}><Md inline>{h}</Md></li>)}</ul>}
                  <p>Variables whose value changes while the program runs: {hintVars.map((v) => <code key={v} className="prog-vchip">{v}</code>)}</p>
                </div>
              )}
              {r === 'cols' && (
                <div className="trace-tbl-wrap">
                  <table className="trace-tbl trace-empty">
                    <thead><tr>{hintVars.map((c) => <th key={c}><code>{c}</code></th>)}{q.ask !== 'final' && <th>output</th>}</tr></thead>
                    <tbody>{[0, 1, 2].map((i) => <tr key={i}>{hintVars.map((c) => <td key={c} />)}{q.ask !== 'final' && <td />}</tr>)}</tbody>
                  </table>
                  <div className="muted prog-small">{hintVars.map((c) => `${c}: ${distinct(c)} distinct values`).join(' · ')}</div>
                </div>
              )}
              {r === 'first' && (
                <div>
                  <p>The first recorded state:</p>
                  <div className="prog-vchips">{Object.entries(firstState).map(([k, v]) => <code key={k} className="prog-vchip">{k} = {v === '' ? '(none yet)' : v}</code>)}</div>
                  {q.ask === 'table' && <p className="muted prog-small">Filled into row 1 of your table.</p>}
                </div>
              )}
              {r === 'full' && comp.code && <Tracer code={comp.code} stdin={q.stdin ?? []} notes={q.code != null ? q.lineNotes : undefined} lang={lang} onSyntax={(id) => setDrawer([id])} />}
            </details>
          ))}
          <div className="prog-row">
            {nextRung ? <button className="btn sm" onClick={openNext}>💡 {t.next}: {RL[nextRung][lang === 'en' ? 1 : 0]} <small>({t.cap} {Math.round(hintCap(nextRung === 'full' ? 5 : hints + 1) * 100)}%)</small></button> : <span className="muted prog-small">{t.all}</span>}
            {hints > 0 && <span className="chip warn">{t.opened}: {hints} · {t.cap} {Math.round(cap * 100)}%</span>}
            {q.refs?.map((r) => <PageChip key={r.src + r.page} r={r} />)}
          </div>
        </div>
      )}

      {/* ---------- result + tracer ---------- */}
      {phase === 'done' && res && (
        <div className="prog-result">
          <Verdict correct={res.correct ? true : res.score >= 0.5 ? 'partial' : false} title={res.correct ? t.right : `${Math.round(res.score * 100)}%`}>
            {hints > 0 && <span className="muted"> {t.opened}: {hints} → {t.cap} {Math.round(cap * 100)}%</span>}
          </Verdict>
          <Feedback notes={res.notes} />
          <h4>{t.tracer}</h4>
          <div className="muted prog-small">{t.tracerNote}</div>
          {q.code == null && comp.code && <details className="prog-rung"><summary>{t.compiled}</summary><CodeNotes code={comp.code} lang={lang} /></details>}
          {comp.code && <Tracer code={comp.code} stdin={q.stdin ?? []} notes={q.code != null ? q.lineNotes : undefined} lang={lang} onSyntax={(id) => setDrawer([id])} />}
          {q.code == null && q.lineNotes?.length ? <div><b>{t.listing}</b><CodeNotes code={listing ?? ''} notes={q.lineNotes} lang={lang} onSyntax={(id) => setDrawer([id as SyntaxId])} /></div> : null}
          <h4>{t.explanation}</h4>
          <Md>{L.explanation}</Md>
          {exp && q.ask !== 'output' && (
            <details className="prog-rung"><summary>{t.want}</summary>
              {q.ask === 'table'
                ? <div className="trace-tbl-wrap"><table className="trace-tbl"><thead><tr>{cols.map((c) => <th key={c}><code>{c}</code></th>)}</tr></thead><tbody>{(exp.table ?? []).map((r, i) => <tr key={i}>{cols.map((c) => <td key={c}>{normVal(r[c]) === '' ? '' : r[c]}</td>)}</tr>)}</tbody></table></div>
                : <div className="prog-vchips">{cols.map((c) => <code key={c} className="prog-vchip">{c} = {exp.final?.[c]}</code>)}</div>}
            </details>
          )}
          {exp?.output != null && <div><small className="muted">{t.out}</small><pre className="prog-plan">{exp.output || '∅'}</pre></div>}
        </div>
      )}

      {drawer && <SyntaxDrawer ids={drawer} open onClose={() => setDrawer(null)} onOpenCard={() => setSynUsed(true)} lang={lang} />}
    </div>
  )
}
