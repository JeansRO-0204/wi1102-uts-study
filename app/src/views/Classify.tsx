// Hierarchical classification + unique codes (UTS 2025 Soal 2 "Katalog Acara Drama" (drama catalogue) · 2024 Soal 2 "Taman Botani" (botanical garden)).
// The learner defines levels (a column, or a derived attribute with their own short codes) and a code pattern; the app
// generates the code for every row and checks: unique, consistent, sequence number, extensible, and the rubric's
// "C" trap (level 1 on a near-unique column). The reasoning is self-marked against the official rubric.
import { useMemo, useState } from 'react'
import { Feedback, Md, Verdict, type Note } from '../lib/kit'
import { HintLadder, hintCap, loc } from '../practice/Hints'
import type { ClassifyQ, RubricRow, RubricScore } from '../types'
import type { QViewProps } from './contract'
import { RubricPicker, SampleList } from './Constraint'
import { analyzeClassify, columnProfile, levelName, type ClsCfg, type ClsLevel, type ColFmt } from './constraintGen'
import './essay.css'

const CLASSIFY_RUBRIC: RubricRow[] = [
  { score: 4, desc: 'Sistem klasifikasi hierarkis benar: ada beberapa tingkat yang jelas, kode unik, dan mengikuti pola yang ditetapkan', descEn: 'A correct hierarchical classification: several clear levels, unique codes, following the stated pattern' },
  { score: 3, desc: 'Sistem klasifikasi hierarkis secara umum benar, tetapi ada satu aspek yang salah', descEn: 'A hierarchical classification that is mostly correct, but one aspect is wrong' },
  { score: 2, desc: 'Klasifikasi berdasarkan satu kolom tanpa hierarki, atau hierarkis tetapi tingkat 1 memakai kolom yang nilainya sangat berbeda-beda (mis. judul)', descEn: 'Classification by a single column with no hierarchy, or hierarchical but level 1 uses a column whose values are all different (e.g. the title)' },
  { score: 1, desc: 'Masih ada aspek yang tepat, tetapi secara umum jawaban tidak tepat', descEn: 'Some aspect is right, but overall the answer is not correct' },
  { score: 0, desc: 'Tidak menjawab atau jawaban salah total', descEn: 'No answer, or entirely wrong' },
]

interface Saved { cfg: ClsCfg; explain: string; rub: RubricScore | null }
const FMTS: { v: ColFmt; id: string }[] = [{ v: 'full', id: 'Full value' }, { v: 'a3', id: 'First 3 letters (Thr)' }, { v: 'A3', id: '3 letters UPPERCASE (THR)' }, { v: 'a2', id: 'First 2 letters (Th)' }, { v: 'A2', id: '2 letters UPPERCASE (TH)' }]
const SEPS = [{ v: '-', id: '–  (hyphen)' }, { v: '_', id: '_  (underscore)' }, { v: '.', id: '.  (dot)' }, { v: '', id: '(no separator)' }]

const T = {
  id: {
    levels: 'Tingkat hierarki', levelsTip: 'Tingkat 1 = kelompok terluas, tingkat berikutnya di dalamnya.', add: '+ Tambah tingkat', remove: 'Hapus', up: 'Naik', down: 'Turun',
    source: 'Dasar pengelompokan', derived: 'Atribut turunan (saya buat sendiri)…', fmt: 'Bentuk kode', dname: 'Nama atribut', dtip: 'Beri kode singkat untuk tiap baris (baris yang sekelompok diberi kode yang sama).',
    pattern: 'Pola kode', sep: 'Pemisah', seq: 'No. urut di akhir', digits: 'Digit', scope: 'Penomoran', perGroup: 'per kelompok', global: 'global', patternIs: 'Pola',
    preview: 'Kode yang dihasilkan', code: 'Kode Anda', model: 'Kode model', explain: 'Penalaran Anda (2.b)', explainPh: 'Mengapa tingkat ini? Mengapa urutannya begini? Bagaimana item baru ditambahkan?…',
    submit: 'Kumpulkan jawaban', edit: 'Ubah jawaban', report: 'Hasil pemeriksaan', mark: 'Nilai (rubrik resmi 0–4)', markNote: 'Pemeriksaan otomatis hanya menilai sifat umum kode. Pilih baris rubrik yang menurut Anda sesuai, termasuk mutu penalaran Anda.',
    save: 'Simpan nilai', saved: 'Nilai tersimpan', modelTitle: 'Jawaban model', alt: 'Banyak sistem klasifikasi lain yang juga benar, asal tingkatnya berulang nilainya (bukan kolom unik) dan ada nomor urut.', samples: 'Contoh jawaban bernilai',
    none: 'Belum ada tingkat. Tambahkan minimal dua tingkat.', pick: '— pilih —', paperTip: 'Mode kertas: pemeriksaan baru muncul setelah Anda mengumpulkan.', live: 'Pemeriksaan langsung', cap: 'maks', okAll: 'Sistem klasifikasi Anda memenuhi semua pemeriksaan otomatis.',
    nIssues: (n: number) => `${n} hal perlu diperbaiki`, hint: 'Petunjuk',
  },
  en: {
    levels: 'Hierarchy levels', levelsTip: 'Level 1 = the broadest group; later levels sit inside it.', add: '+ Add level', remove: 'Remove', up: 'Up', down: 'Down',
    source: 'Grouping basis', derived: 'Derived attribute (my own)…', fmt: 'Code form', dname: 'Attribute name', dtip: 'Give each row a short code (rows in the same group get the same code).',
    pattern: 'Code pattern', sep: 'Separator', seq: 'Sequence no. at the end', digits: 'Digits', scope: 'Numbering', perGroup: 'per group', global: 'global', patternIs: 'Pattern',
    preview: 'Generated codes', code: 'Your code', model: 'Model code', explain: 'Your reasoning (2.b)', explainPh: 'Why these levels? Why this order? How is a new item added?…',
    submit: 'Submit answer', edit: 'Edit answer', report: 'Check result', mark: 'Mark (official 0–4 rubric)', markNote: 'The automatic check only judges general properties of the codes. Pick the rubric row you think fits, including the quality of your reasoning.',
    save: 'Save mark', saved: 'Mark saved', modelTitle: 'Model answer', alt: 'Many other classifications are also right, as long as the levels use repeating values (not a unique column) and there is a sequence number.', samples: 'Graded samples',
    none: 'No levels yet. Add at least two.', pick: '— choose —', paperTip: 'Paper mode: checks appear only after you submit.', live: 'Live check', cap: 'max', okAll: 'Your classification passes every automatic check.',
    nIssues: (n: number) => `${n} thing(s) to fix`, hint: 'Hint',
  },
}

export default function ClassifyView(p: QViewProps<ClassifyQ>) { return <Inner key={p.q.id} {...p} /> }

function Inner({ q, mode, lang, onDone, review, compact }: QViewProps<ClassifyQ>) {
  const t = T[lang]
  const L = loc(q, lang)
  const saved = review?.answer as Saved | undefined
  const n = q.rows.length
  const codeIdx = q.columns.indexOf(q.codeColumn)
  const usable = q.columns.map((name, col) => ({ name, col })).filter((c) => c.name !== q.codeColumn)
  const labelCol = Math.max(0, q.columns.findIndex((c, i) => i !== codeIdx && q.rows.some((r) => typeof r[i] === 'string')))
  const rowLabel = (r: number) => String(q.rows[r][labelCol]) + (q.columns.length > 2 && labelCol + 1 !== codeIdx && q.rows[r][labelCol + 1] != null ? ` · ${q.rows[r][labelCol + 1]}` : '')

  const [cfg, setCfg] = useState<ClsCfg>(() => saved?.cfg ?? { levels: [], sep: '-', seq: true, digits: 3, scope: 'group' })
  const [explain, setExplain] = useState(saved?.explain ?? '')
  const [submitted, setSubmitted] = useState(!!review)
  const [hints, setHints] = useState(review?.hints ?? 0)
  const [rub, setRub] = useState<RubricScore | null>(saved?.rub ?? review?.rubricScore ?? null)
  const [done, setDone] = useState(!!review)
  const rubric = q.rubric?.length ? q.rubric : CLASSIFY_RUBRIC
  const locked = submitted

  const res = useMemo(() => analyzeClassify(q.columns, q.rows, cfg), [q, cfg])
  const showChecks = submitted || mode === 'learn'
  const patternText = cfg.levels.map((lv) => `<${levelName(q.columns, lv)}>`).concat(cfg.seq ? ['<No>'] : []).join(cfg.sep)

  const setLevel = (i: number, lv: ClsLevel) => setCfg((c) => ({ ...c, levels: c.levels.map((x, j) => (j === i ? lv : x)) }))
  const move = (i: number, d: -1 | 1) => setCfg((c) => {
    const a = [...c.levels]; const j = i + d
    if (j < 0 || j >= a.length) return c
    ;[a[i], a[j]] = [a[j], a[i]]
    return { ...c, levels: a }
  })
  const addLevel = () => setCfg((c) => (c.levels.length >= 4 ? c : { ...c, levels: [...c.levels, { kind: 'col', col: (usable.find((u) => !c.levels.some((l) => l.kind === 'col' && l.col === u.col)) ?? usable[0]).col, fmt: 'full' }] }))

  /* ----- hint ladder ----- */
  const ladder = useMemo(() => {
    const prof = columnProfile(q.columns, q.rows, [q.codeColumn])
    const rep = prof.filter((c) => c.kind === 'repeat')
    const uni = prof.filter((c) => c.kind === 'unique')
    const r1 = L.hints[0] ?? 'Look at each column: which values repeat (they can become groups) and which are nearly unique? A nearly unique column does not work as level 1.'
    const r2 = L.hints[1] ?? `Level-1 candidates (repeating values): ${rep.map((c) => `**${c.name}** (${c.distinct} values / ${n} rows)`).join(', ') || '—'}.\n\nAvoid as level 1: ${uni.map((c) => `**${c.name}** (${c.distinct} values / ${n} rows)`).join(', ') || '—'}. An attribute that has no column (e.g. the type, derived from the name) can be derived by you.`
    const m = q.model
    const r3 = `One example code: row "${rowLabel(0)}" → **${m.codes[0]}**. Model pattern: \`${m.pattern}\`.`
    const r4 = `Model levels: ${m.levels.map((l, i) => `${i + 1}. **${l.attr}**`).join(' → ')}.\n\n${q.rows.slice(0, 3).map((_, r) => `- ${rowLabel(r)} → **${m.codes[r]}**`).join('\n')}`
    const r5 = `**Model answer**\n\nLevels: ${m.levels.map((l, i) => `${i + 1}. ${l.attr}${l.codes ? ' (' + Object.entries(l.codes).map(([k, v]) => `${k}=${v}`).join(', ') + ')' : ''}`).join('; ')}\n\nPattern: \`${m.pattern}\`\n\n${q.rows.map((_, r) => `- ${rowLabel(r)} → ${m.codes[r]}`).join('\n')}\n\n${L.explanation}`
    return [r1, r2, r3, r4, r5]
  }, [q, L.hints, L.explanation, lang])

  const issues = res.issues
  const errs = issues.filter((i) => i.level === 'err').length
  const notes: Note[] = issues.map((i) => ({ level: i.level, msg: i.msg }))
  const canSubmit = cfg.levels.length > 0

  const submit = () => { setSubmitted(true); setRub(res.suggested) }
  const trapped = issues.some((i) => i.trap)
  const finish = () => {
    if (rub == null || done) return
    setDone(true)
    onDone({
      correct: rub === 4, score: (rub / 4) * hintCap(hints), rubricScore: rub, hints,
      tags: trapped ? ['unique-column-class'] : [],
      summary: trapped ? 'level 1 uses a nearly unique column (rubric C)' : errs ? `${errs} problem(s) in the codes/hierarchy · mark ${rub}` : `hierarchy & codes pass the checks · mark ${rub}`,
      answer: { cfg, explain, rub } satisfies Saved,
    })
  }

  const codeCell = (r: number) => {
    const c = res.codes[r]
    return <td className={'code' + (showChecks && res.dup.has(c) ? ' dup' : '')}>{c || '—'}</td>
  }

  return (
    <div className={'ess' + (compact ? ' ess-compact' : '')}>

      <section className="ess-sec">
        <h4>{t.levels}<span className="chip">{t.levelsTip}</span></h4>
        {cfg.levels.length === 0 && <p className="ess-note">{t.none}</p>}
        {cfg.levels.map((lv, i) => (
          <div key={i} className="ess-lv">
            <div className="ess-lv-head">
              <span className="ess-lv-n">{i + 1}</span>
              <label className="ess-note" htmlFor={`lv-${i}`}>{t.source}</label>
              <select id={`lv-${i}`} className="ess-sel" disabled={locked} value={lv.kind === 'col' ? String(lv.col) : 'd'}
                onChange={(e) => setLevel(i, e.target.value === 'd' ? { kind: 'derived', name: '', codes: Array(n).fill('') } : { kind: 'col', col: Number(e.target.value), fmt: lv.kind === 'col' ? lv.fmt : 'full' })}>
                {usable.map((u) => <option key={u.col} value={u.col}>{u.name}</option>)}
                <option value="d">{t.derived}</option>
              </select>
              {lv.kind === 'col' && (
                <select className="ess-sel" aria-label={t.fmt} disabled={locked} value={lv.fmt} onChange={(e) => setLevel(i, { ...lv, fmt: e.target.value as ColFmt })}>
                  {FMTS.map((f) => <option key={f.v} value={f.v}>{f.id}</option>)}
                </select>
              )}
              <span className="grow" style={{ flex: 1 }} />
              {!locked && <>
                <button className="btn sm ghost" onClick={() => move(i, -1)} disabled={i === 0} aria-label={t.up}>↑</button>
                <button className="btn sm ghost" onClick={() => move(i, 1)} disabled={i === cfg.levels.length - 1} aria-label={t.down}>↓</button>
                <button className="btn sm ghost" onClick={() => setCfg((c) => ({ ...c, levels: c.levels.filter((_, j) => j !== i) }))}>{t.remove}</button>
              </>}
            </div>
            {lv.kind === 'derived' && (
              <>
                <input className="ess-in" placeholder={t.dname} aria-label={t.dname} disabled={locked} value={lv.name} onChange={(e) => setLevel(i, { ...lv, name: e.target.value })} />
                <p className="ess-note">{t.dtip}</p>
                <div className="ess-derived">
                  {q.rows.map((_, r) => (
                    <label key={r} className="ess-derived-row"><span>{rowLabel(r)}</span>
                      <input className="ess-in code" aria-label={rowLabel(r)} disabled={locked} value={lv.codes[r] ?? ''} maxLength={12}
                        onChange={(e) => setLevel(i, { ...lv, codes: lv.codes.map((c, k) => (k === r ? e.target.value : c)) })} />
                    </label>
                  ))}
                </div>
              </>
            )}
            {showChecks && issues.filter((x) => x.msg.startsWith(`Level ${i + 1} `)).length > 0 && <Feedback notes={notes.filter((_, k) => issues[k].msg.startsWith(`Level ${i + 1} `))} />}
          </div>
        ))}
        {!locked && cfg.levels.length < 4 && <div className="ess-bar"><button className="btn" onClick={addLevel}>{t.add}</button></div>}
      </section>

      <section className="ess-sec">
        <h4>{t.pattern}</h4>
        <div className="ess-opts">
          <label>{t.sep}
            <select className="ess-sel" disabled={locked} value={cfg.sep} onChange={(e) => setCfg((c) => ({ ...c, sep: e.target.value }))}>{SEPS.map((s) => <option key={s.v} value={s.v}>{s.id}</option>)}</select>
          </label>
          <label><input type="checkbox" disabled={locked} checked={cfg.seq} onChange={(e) => setCfg((c) => ({ ...c, seq: e.target.checked }))} />{t.seq}</label>
          {cfg.seq && <>
            <label>{t.digits}
              <select className="ess-sel" disabled={locked} value={cfg.digits} onChange={(e) => setCfg((c) => ({ ...c, digits: Number(e.target.value) }))}>{[1, 2, 3, 4].map((d) => <option key={d} value={d}>{d}</option>)}</select>
            </label>
            <label>{t.scope}
              <select className="ess-sel" disabled={locked} value={cfg.scope} onChange={(e) => setCfg((c) => ({ ...c, scope: e.target.value as 'group' | 'global' }))}><option value="group">{t.perGroup}</option><option value="global">{t.global}</option></select>
            </label>
          </>}
        </div>
        {cfg.levels.length > 0 && <div className="ess-pattern">{t.patternIs}: {patternText}</div>}
      </section>

      <section className="ess-sec">
        <h4>{t.preview}</h4>
        <div className="ess-tablewrap">
          <table className="ess-table">
            <thead><tr>{usable.map((u) => <th key={u.col}>{u.name}</th>)}<th>{t.code}</th>{submitted && <th>{t.model}</th>}</tr></thead>
            <tbody>
              {q.rows.map((row, r) => (
                <tr key={r}>
                  {usable.map((u) => <td key={u.col}>{String(row[u.col] ?? '')}</td>)}
                  {codeCell(r)}
                  {submitted && <td className="model">{q.model.codes[r]}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {mode === 'learn' && !submitted && !review && <><div className="ess-spin">{t.live}</div><Feedback notes={notes.filter((_, k) => !issues[k].msg.startsWith('Level '))} /></>}
        {mode === 'test' && !submitted && <span className="ess-note">{t.paperTip}</span>}
      </section>

      <section className="ess-sec">
        <h4>{t.explain}</h4>
        <textarea className="ess-ta" value={explain} disabled={locked} placeholder={t.explainPh} onChange={(e) => setExplain(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !submitted && canSubmit) submit() }} />
        <div className="ess-bar">
          {!submitted && <button className="btn primary" disabled={!canSubmit} onClick={submit}>{t.submit}</button>}
          {submitted && !done && <button className="btn" onClick={() => setSubmitted(false)}>{t.edit}</button>}
        </div>
      </section>

      {!review && <HintLadder hints={ladder} work={[]} lang={lang} resetKey={q.id} onUse={setHints} />}

      {submitted && (
        <section className="ess-sec">
          <h4>{t.report}{hints > 0 && <span className="chip warn">{t.cap} {Math.round(hintCap(hints) * 100)}%</span>}</h4>
          <Verdict correct={errs === 0 && !trapped && cfg.levels.length > 1 ? true : res.suggested >= 3 ? 'partial' : false} title={errs === 0 && !trapped && cfg.levels.length > 1 ? t.okAll : t.nIssues(Math.max(errs, 1))} />
          <Feedback notes={notes} />
          <h4>{t.mark}</h4>
          <p className="ess-note">{t.markNote}</p>
          <RubricPicker rows={rubric} value={rub} onChange={(s) => !done && setRub(s)} suggested={res.suggested} disabled={done} lang={lang} />
          {!review && !done && <div className="ess-bar"><button className="btn primary" disabled={rub == null} onClick={finish}>{t.save}</button></div>}
          {done && !review && <span className="chip ok">{t.saved}</span>}
          <h4>{t.modelTitle}</h4>
          <div className="ess-model">
            <div className="chips">{q.model.levels.map((l, i) => <span key={i} className="chip">{i + 1}. {l.attr}{l.codes ? ': ' + Object.entries(l.codes).map(([k, v]) => `${k}=${v}`).join(', ') : ''}</span>)}</div>
            <div className="ess-pattern">{t.patternIs}: {q.model.pattern}</div>
            <Md>{L.explanation}</Md>
            <span className="ess-note">{t.alt}</span>
          </div>
          {!!q.samples?.length && <><h4>{t.samples}</h4><SampleList samples={q.samples} lang={lang} /></>}
        </section>
      )}
    </div>
  )
}
