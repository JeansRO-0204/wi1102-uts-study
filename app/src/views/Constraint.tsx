// Constraint assignment view (UTS 2025 Soal 1 "Penugasan Proyek" / project assignment · 2024 Soal 1 "Koleksi Buku" / book collection).
// shape 'assign': entity → slot picker. shape 'grid': checkmark grid. Validation = the bank item's Python `check(ans)`.
// Paper mode: check on Submit only. Lab mode: live check, listing each violated constraint.
import { useEffect, useMemo, useRef, useState } from 'react'
import { Feedback, Md, Verdict, type Note } from '../lib/kit'
import { py } from '../py/client'
import { HintLadder, hintCap, loc, msgOf } from '../practice/Hints'
import { RUBRIC_INDEX, type ConstraintQ, type RubricRow, type RubricScore, type Sample } from '../types'
import type { QViewProps } from './contract'
import { CONSTRAINT_RUBRIC } from './constraintGen'
import './essay.css'

/* ---------------- shared by Classify ---------------- */

/** Pick one official rubric row (0–4, letter index). `suggested` is the auto-selected row, tagged. */
export function RubricPicker({ rows, value, onChange, suggested, disabled, lang }: {
  rows: RubricRow[]; value: RubricScore | null; onChange: (s: RubricScore) => void; suggested?: RubricScore | null; disabled?: boolean; lang: 'id' | 'en'
}) {
  return (
    <div className="ess-rub" role="radiogroup" aria-label="Marking rubric">
      {[...rows].sort((a, b) => b.score - a.score).map((r) => (
        <button key={r.score} type="button" role="radio" aria-checked={value === r.score} disabled={disabled}
          className={'ess-rub-row' + (value === r.score ? ' on' : '')} onClick={() => onChange(r.score)}>
          <span className="ess-rub-score">{r.score}<small>{RUBRIC_INDEX[r.score]}</small></span>
          <span>{lang === 'en' && r.descEn ? r.descEn : r.desc}{suggested === r.score && <span className="ess-rub-tag">{lang === 'en' ? 'auto' : 'saran otomatis'}</span>}</span>
        </button>
      ))}
    </div>
  )
}

/** Graded sample answers ("sample answer, score 3.5 because …"). */
export function SampleList({ samples, lang }: { samples?: Sample[]; lang: 'id' | 'en' }) {
  if (!samples?.length) return null
  return (
    <div className="ess-samples">
      {samples.map((s, i) => (
        <div key={i} className="ess-sample">
          <div className="ess-sample-head"><span className="chip">{lang === 'en' ? 'Sample' : 'Contoh jawaban'} {i + 1}</span><span>{lang === 'en' ? 'score' : 'nilai'} {s.score} ({RUBRIC_INDEX[s.score]})</span></div>
          <pre>{s.answer}</pre>
          <Md>{lang === 'en' && s.noteEn ? s.noteEn : s.note}</Md>
        </div>
      ))}
    </div>
  )
}

/* ---------------- helpers ---------------- */

type Msg = string | [string, string]
type AssignAns = Record<string, string | string[] | null>
type Cell = [number, number]
interface Saved { assign: AssignAns; cells: Cell[]; rub: RubricScore | null }

const isAssignObj = (x: unknown): x is AssignAns => !!x && typeof x === 'object' && !Array.isArray(x)
const asCells = (x: unknown): Cell[] => (Array.isArray(x) ? (x as Cell[]).filter((c) => Array.isArray(c) && c.length === 2) : [])

/** violations → official rubric row. T = number of constraint messages an empty answer triggers (≈ size of the rule set). */
export function suggestFromViolations(v: number, total: number, any: boolean): RubricScore {
  if (v === 0) return 4
  if (!any) return 0
  const T = Math.max(total, v, 3)
  const sat = 1 - v / T
  return sat >= 0.66 ? 3 : sat >= 0.33 ? 2 : 1
}

const T = {
  id: {
    title: 'Jawaban Anda', pick: 'Pilih tepat satu', pickMulti: 'Boleh lebih dari satu', recap: 'Rekap per kelompok', format: 'Format jawaban', none: '(kosong)', live: 'Pemeriksaan langsung', checking: 'memeriksa…',
    allOk: 'Semua constraint terpenuhi.', submit: 'Kumpulkan jawaban', edit: 'Ubah jawaban', report: 'Hasil pemeriksaan', mark: 'Nilai (rubrik resmi 0–4)', markNote: 'Saran otomatis sudah dipilih; ubah bila menurut Anda berbeda.',
    save: 'Simpan nilai', saved: 'Nilai tersimpan', solution: 'Contoh konfigurasi yang valid', many: 'Soal ini tidak punya jawaban tunggal; jawaban Anda tetap benar bila semua constraint terpenuhi.',
    samples: 'Contoh jawaban bernilai', empty: 'Belum ada jawaban.', pyFail: 'Pemeriksa gagal berjalan', total: 'Σ', gridTip: 'Centang sel yang dipilih.', clear: 'Kosongkan', paperTip: 'Mode kertas: hasil baru diperiksa setelah Anda mengumpulkan.',
    viol: (n: number) => `${n} constraint dilanggar`, hint3: 'Entitas paling terbatas', cap: 'maks',
  },
  en: {
    title: 'Your answer', pick: 'Pick exactly one', pickMulti: 'You may pick several', recap: 'Recap by group', format: 'Answer format', none: '(empty)', live: 'Live check', checking: 'checking…',
    allOk: 'Every constraint is satisfied.', submit: 'Submit answer', edit: 'Edit answer', report: 'Check result', mark: 'Mark (official 0–4 rubric)', markNote: 'The suggested row is pre-selected; change it if you disagree.',
    save: 'Save mark', saved: 'Mark saved', solution: 'A valid configuration', many: 'There is no single answer: yours is right if every constraint holds.',
    samples: 'Graded samples', empty: 'No answer yet.', pyFail: 'The checker failed', total: 'Σ', gridTip: 'Tick the cells you choose.', clear: 'Clear', paperTip: 'Paper mode: your answer is only checked on submit.',
    viol: (n: number) => `${n} constraint(s) violated`, hint3: 'Most constrained', cap: 'max',
  },
}

export default function ConstraintView(p: QViewProps<ConstraintQ>) { return <Inner key={p.q.id} {...p} /> }

function Inner({ q, mode, lang, onDone, review, compact }: QViewProps<ConstraintQ>) {
  const t = T[lang]
  const L = loc(q, lang)
  const saved = review?.answer as Saved | undefined
  const isGrid = q.shape === 'grid'
  const [assign, setAssign] = useState<AssignAns>(() => (isAssignObj(saved?.assign) ? saved!.assign : {}))
  const [cells, setCells] = useState<Cell[]>(() => asCells(saved?.cells))
  const [submitted, setSubmitted] = useState(!!review)
  const [viol, setViol] = useState<Msg[] | null>(null)
  const [pending, setPending] = useState(false)
  const [pyErr, setPyErr] = useState<string | null>(null)
  const [emptyMsgs, setEmptyMsgs] = useState<Msg[]>([])
  const [elig, setElig] = useState<Record<string, string[]> | null>(null)
  const [hints, setHints] = useState(review?.hints ?? 0)
  const [rub, setRub] = useState<RubricScore | null>(saved?.rub ?? review?.rubricScore ?? null)
  const [done, setDone] = useState(!!review)
  const seq = useRef(0)
  const rubric = q.rubric?.length ? q.rubric : CONSTRAINT_RUBRIC
  const locked = submitted

  const answer: unknown = isGrid ? cells : assign
  const emptyAnswer: unknown = isGrid ? [] : {}
  const nAnswered = isGrid ? cells.length : Object.values(assign).filter((v) => (Array.isArray(v) ? v.length : !!v)).length

  /** raw check() results: each message is a string or an [indonesian, english] pair; shown via txt() in the current language */
  const runCheck = async (a: unknown): Promise<Msg[]> => {
    const r = await py.call<Msg[]>(q.check, 'check', [a])
    if (r.error) throw new Error(r.error)
    return Array.isArray(r.value) ? r.value.map((m) => (Array.isArray(m) ? ([String(m[0]), String(m[1] ?? m[0])] as [string, string]) : String(m))) : []
  }
  const txt = (m: Msg) => msgOf(m, lang)
  const names = (m: Msg, e: string) => (Array.isArray(m) ? m.some((x) => x.includes(e)) : m.includes(e))

  useEffect(() => {
    py.warm()
    let live = true
    runCheck(emptyAnswer).then((m) => live && setEmptyMsgs(m)).catch(() => {})
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id])

  // Lab mode: debounced live check on every change (also fills the report when the answer is locked)
  useEffect(() => {
    if (review) {
      const id = ++seq.current
      runCheck(answer).then((m) => seq.current === id && setViol(m)).catch((e: Error) => setPyErr(e.message))
      return
    }
    if (mode !== 'learn' || submitted) return
    const id = ++seq.current
    setPending(true)
    const h = setTimeout(() => {
      runCheck(answer).then((m) => { if (seq.current === id) { setViol(m); setPyErr(null); setPending(false) } })
        .catch((e: Error) => { if (seq.current === id) { setPyErr(e.message); setPending(false) } })
    }, 220)
    return () => clearTimeout(h)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assign, cells, mode, submitted, q.id])

  /* ----- hint ladder ----- */
  const sol = q.solution
  const solA: AssignAns = isAssignObj(sol) ? sol : {}
  const solG: Cell[] = asCells(sol)
  const fmtSol = (a: AssignAns, only?: string[]) => q.entities.filter((e) => a[e] && (!only || only.includes(e))).map((e) => `- ${e} – ${Array.isArray(a[e]) ? (a[e] as string[]).join(', ') : a[e]}`).join('\n')
  const fmtCells = (cs: Cell[]) => cs.map(([r, c]) => `- ${q.entities[r]} – ${q.slots[c]}`).join('\n')

  useEffect(() => {
    // rung 3 needs per-entity options: move each entity to each slot in the known solution and read the messages that name it
    if (hints < 2 || isGrid || elig || !isAssignObj(sol) || q.multi) return
    let live = true
    ;(async () => {
      const res: Record<string, string[]> = {}
      for (const e of q.entities) {
        const ok: string[] = []
        const ms = await Promise.all(q.slots.map((s) => runCheck({ ...solA, [e]: s }).catch(() => ['?'] as Msg[])))
        q.slots.forEach((s, i) => { if (!ms[i].some((m) => names(m, e))) ok.push(s) })
        res[e] = ok
      }
      if (live) setElig(res)
    })()
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hints, q.id])

  const ladder = useMemo(() => {
    const r1 = L.hints[0] ?? 'First write all the constraints in your own words. Which ones are mandatory (hard)? Which information is not used (abstraction)?'
    const msgs = [...new Set(emptyMsgs.map(txt))].slice(0, 8)
    const r2 = L.hints[1] ?? (msgs.length ? `List of constraints (from the checker):\n\n${msgs.map((m) => `- ${m}`).join('\n')}` : 'Build a constraint table: rows = entities, columns = requirements. Mark which ones are met.')
    let r3 = 'Find the entity whose requirements leave the fewest options, and place it first.'
    let r4: string
    let order = q.entities
    if (isGrid) {
      const perRow = q.entities.map((e, r) => ({ e, n: solG.filter((c) => c[0] === r).length }))
      const perCol = q.slots.map((s, c) => ({ s, n: solG.filter((x) => x[1] === c).length }))
      r3 = `Start from the most certain limits. Ticks needed: per column ${perCol.map((x) => `${x.s} = ${x.n}`).join(', ')}; per row ${perRow.map((x) => `${x.e} = ${x.n}`).join(', ')}. Fill the tightest row/column first.`
      r4 = `Part of a valid answer:\n\n${fmtCells(solG.slice(0, Math.max(1, Math.ceil(solG.length / 2))))}`
    } else {
      if (elig) {
        order = [...q.entities].sort((a, b) => elig[a].length - elig[b].length)
        const min = elig[order[0]].length
        const tied = order.filter((e) => elig[e].length === min)
        if (min < q.slots.length) {
          r3 = `**${t.hint3}**: ${tied.map((e) => `**${e}** (only fits ${elig[e].join(', ') || 'none'})`).join('; ')}. Place ${tied.length > 1 ? 'them' : 'this one'} first, then move on to the next most constrained entity${order.length > tied.length ? `: ${order.slice(tied.length, tied.length + 2).map((e) => `${e} (${elig[e].length} options)`).join(', ')}` : ''}.`
        }
      } else if (hints >= 2) r3 = 'Working out the most constrained entities…'
      r4 = `Part of a valid answer:\n\n${fmtSol(solA, order.slice(0, Math.max(1, Math.floor(order.length / 2))))}`
    }
    const full = isGrid ? fmtCells(solG) : fmtSol(solA)
    const r5 = `**One complete valid answer:**\n\n${full}\n\n${L.explanation}`
    return [r1, r2, r3, r4, r5]
  }, [L.hints, L.explanation, emptyMsgs, elig, hints >= 2, q.id, lang])

  /* ----- answer editing ----- */
  const setSlot = (e: string, s: string) => {
    if (locked) return
    setAssign((a) => {
      if (q.multi) { const cur = Array.isArray(a[e]) ? (a[e] as string[]) : []; return { ...a, [e]: cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s] } }
      return { ...a, [e]: a[e] === s ? null : s }
    })
  }
  const toggleCell = (r: number, c: number) => {
    if (locked) return
    setCells((cs) => (cs.some((x) => x[0] === r && x[1] === c) ? cs.filter((x) => !(x[0] === r && x[1] === c)) : [...cs, [r, c]]))
  }
  const has = (e: string, s: string) => { const v = assign[e]; return Array.isArray(v) ? v.includes(s) : v === s }
  const bad = (e: string) => !!(viol && (submitted || mode === 'learn') && viol.some((m) => names(m, e)))

  const submit = async () => {
    setPending(true); setPyErr(null)
    try {
      const m = await runCheck(answer)
      setViol(m); setSubmitted(true)
      setRub(suggestFromViolations(m.length, emptyMsgs.length, nAnswered > 0))
    } catch (e) { setPyErr((e as Error).message) }
    setPending(false)
  }
  const suggested = viol ? suggestFromViolations(viol.length, emptyMsgs.length, nAnswered > 0) : null
  const finish = () => {
    if (rub == null || done) return
    setDone(true)
    onDone({
      correct: rub === 4, score: (rub / 4) * hintCap(hints), rubricScore: rub, hints,
      tags: viol && viol.length ? ['constraint-missed'] : [],
      summary: viol && viol.length ? `${viol.length} constraint(s) violated · mark ${rub}` : `all constraints satisfied · mark ${rub}`,
      answer: { assign, cells, rub } satisfies Saved,
    })
  }

  const showLive = mode === 'learn' && !submitted && !review
  const notes: Note[] = viol ? (viol.length ? viol.map((m) => ({ level: 'err' as const, msg: txt(m) })) : [{ level: 'ok', msg: t.allOk }]) : []

  const answerLines = isGrid
    ? q.entities.map((e, r) => `${e}: ${cells.filter((c) => c[0] === r).map((c) => q.slots[c[1]]).join(', ') || '—'}`).join('\n')
    : q.entities.filter((e) => assign[e] && (!Array.isArray(assign[e]) || (assign[e] as string[]).length)).map((e) => `${e} – ${Array.isArray(assign[e]) ? (assign[e] as string[]).join(', ') : assign[e]}`).join('\n')

  return (
    <div className={'ess' + (compact ? ' ess-compact' : '')}>

      <section className="ess-sec">
        <h4>{t.title}<span className="chip">{isGrid ? t.gridTip : q.multi ? t.pickMulti : t.pick}</span></h4>
        {isGrid ? (
          <div className="ess-gridwrap">
            <table className="ess-grid">
              <thead><tr><th />{q.slots.map((s) => <th key={s}>{s}</th>)}{mode === 'learn' && <th>{t.total}</th>}</tr></thead>
              <tbody>
                {q.entities.map((e, r) => (
                  <tr key={e}>
                    <th className="rowh">{e}</th>
                    {q.slots.map((s, c) => {
                      const on = cells.some((x) => x[0] === r && x[1] === c)
                      return <td key={s}><button type="button" className={'ess-cell' + (on ? ' on' : '')} aria-pressed={on} aria-label={`${e} – ${s}`} disabled={locked} onClick={() => toggleCell(r, c)}>✔</button></td>
                    })}
                    {mode === 'learn' && <td className="sum">{cells.filter((x) => x[0] === r).length}</td>}
                  </tr>
                ))}
                {mode === 'learn' && <tr><th className="rowh">{t.total}</th>{q.slots.map((s, c) => <td key={s} className="sum">{cells.filter((x) => x[1] === c).length}</td>)}<td className="sum">{cells.length}</td></tr>}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="ess-ents">
            {q.entities.map((e) => (
              <div key={e} className={'ess-ent' + (bad(e) ? ' bad' : '')}>
                <span className="ess-ent-name">{e}</span>
                <div className="ess-slots" role={q.multi ? 'group' : 'radiogroup'} aria-label={e}>
                  {q.slots.map((s) => <button key={s} type="button" className={'ess-slot' + (has(e, s) ? ' on' : '')} aria-pressed={has(e, s)} disabled={locked} onClick={() => setSlot(e, s)}>{s}</button>)}
                </div>
              </div>
            ))}
          </div>
        )}
        {!isGrid && (
          <div className="ess-recap" aria-label={t.recap}>
            {q.slots.map((s) => {
              const names = q.entities.filter((e) => has(e, s))
              return <span key={s} style={{ display: 'contents' }}><b>{s}</b><span>{names.join(', ') || <span className="muted">—</span>}{mode === 'learn' && <span className="cnt">({names.length})</span>}</span></span>
            })}
          </div>
        )}
        {nAnswered > 0 && <pre className="ess-lines" aria-label={t.format}>{answerLines}</pre>}
        {showLive && (
          <div className="ess-live" aria-live="polite">
            <div className="ess-spin">{t.live}{pending ? ` · ${t.checking}` : ''}</div>
            {pyErr ? <Feedback notes={[{ level: 'warn', msg: `${t.pyFail}: ${pyErr}` }]} /> : nAnswered === 0 ? null : <Feedback notes={notes} />}
          </div>
        )}
        {mode === 'test' && !submitted && <span className="ess-note">{t.paperTip}</span>}
        <div className="ess-bar">
          {!submitted && <button className="btn primary" disabled={pending} onClick={submit}>{t.submit}</button>}
          {submitted && !done && <button className="btn" onClick={() => { setSubmitted(false); setViol(null) }}>{t.edit}</button>}
          {!submitted && nAnswered > 0 && <button className="btn ghost" onClick={() => { setAssign({}); setCells([]) }}>{t.clear}</button>}
          {pyErr && !showLive && <span className="ess-note">{t.pyFail}: {pyErr}</span>}
        </div>
      </section>

      {!review && <HintLadder hints={ladder} work={[]} lang={lang} resetKey={q.id} onUse={setHints} />}

      {submitted && viol && (
        <section className="ess-sec">
          <h4>{t.report}{hints > 0 && <span className="chip warn">{t.cap} {Math.round(hintCap(hints) * 100)}%</span>}</h4>
          <Verdict correct={viol.length === 0 ? true : suggested && suggested >= 3 ? 'partial' : false} title={viol.length === 0 ? t.allOk : t.viol(viol.length)} />
          <Feedback notes={notes} />
          <h4>{t.mark}</h4>
          <p className="ess-note">{t.markNote}</p>
          <RubricPicker rows={rubric} value={rub} onChange={(s) => !done && setRub(s)} suggested={suggested} disabled={done} lang={lang} />
          {!review && !done && <div className="ess-bar"><button className="btn primary" disabled={rub == null} onClick={finish}>{t.save}</button></div>}
          {done && !review && <span className="chip ok">{t.saved}</span>}
          <h4>{t.solution}</h4>
          <div className="ess-sol">
            <pre className="ess-lines">{isGrid ? fmtCells(solG) : fmtSol(solA)}</pre>
            <Md>{L.explanation}</Md>
            <span className="ess-note">{t.many}</span>
          </div>
          {!!q.samples?.length && <><h4>{t.samples}</h4><SampleList samples={q.samples} lang={lang} /></>}
        </section>
      )}
    </div>
  )
}
