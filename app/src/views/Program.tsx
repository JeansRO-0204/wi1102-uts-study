// Program view, LeetCode-style: write a program in Python / pseudocode / flowchart.
//  * >= 1000 px: split pane (draggable, persisted): left tabs Description / Hints / Editorial / Submissions, right = representation
//    tabs + editor + console (Testcase / Test Result). < 1000 px (or compact / review): stacked.
//  * Paper mode ('test') keeps the exam rules: bare editor, no Run, no Testcase editing, result only after Submit.
//  * Lab mode ('learn'): Run (visible + custom cases), hints, tracer. Submit runs all hidden tests; rubric confirm is two-step.
// All learner code runs through the Pyodide harness; failures are diagnosed by code/diagnose.ts.
import { useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from 'react'
import { Feedback, Md, PageChip } from '../lib/kit'
import { py } from '../py/client'
import { EXPECTED } from '../bank'
import { outputDiff, outputOk } from '../practice/answerCheck'
import { hintCap, loc } from '../practice/Hints'
import { clearDraft, loadDraft, logSubmission, saveDraft, similarProblems, timeAgo, useSubmissions, verdictFromCases, verdictTone, type SubVerdict, type Submission } from '../practice/submissions'
import { explainError } from '../content/errors'
import { SYNTAX_BY_ID } from '../content/syntax'
import CodeNotes from '../content/CodeNotes'
import SyntaxDrawer from '../content/SyntaxDrawer'
import { ENGINES_READY, FlowBuilder, FlowView, flowToPython, pseudoToPython } from '../code/api'
import Editor from '../code/Editor'
import Parsons, { buildParsons } from '../code/Parsons'
import Tracer from '../code/Tracer'
import { failedReport, nearestRow, runReport, type DiagDeps, type MustCheck, type Report } from '../code/diagnose'
import { DECKS, RUBRIC_INDEX, type Flowchart, type MisTag, type ProgramQ, type Rep, type RubricRow, type RubricScore, type SyntaxId } from '../types'
import type { Outcome, QViewProps } from './contract'
import '../code/program.css'
import { diffOfQ } from '../practice/difficulty'

const depsFor = (lang: 'id' | 'en'): DiagDeps => ({
  run: (c, s) => py.run(c, s),
  call: (c, f, a) => py.call(c, f, a),
  static: (c) => py.static(c),
  outputOk, outputDiff,
  explain: (e, l, c) => explainError(e, l, c, lang),
})

const REP_LABEL: Record<Rep, string> = { python: 'Python', pseudo: 'Pseudocode', flow: 'Flowchart' }
const DEFAULT_RUBRIC: RubricRow[] = [
  { score: 4, desc: 'Program benar untuk semua kasus uji dan memenuhi semua syarat soal.', descEn: 'The program is correct for every test case and meets every requirement of the task.' },
  { score: 3, desc: 'Hampir benar: sebagian besar kasus uji lulus, atau ada syarat soal (mis. subprogram) yang belum dipenuhi.', descEn: 'Nearly correct: most test cases pass, or a requirement of the task (e.g. a subprogram) is not met.' },
  { score: 2, desc: 'Sebagian logika benar; hanya sebagian kasus uji yang lulus.', descEn: 'Part of the logic is right; only some test cases pass.' },
  { score: 1, desc: 'Ada usaha dan program dapat dibaca, tetapi keluarannya salah.', descEn: 'An honest attempt and readable, but the output is wrong.' },
  { score: 0, desc: 'Tidak ada jawaban atau tidak relevan.', descEn: 'No answer, or irrelevant.' },
]
const RUNGS = ['nudge', 'plan', 'parsons', 'skeleton', 'solution'] as const
type Rung = typeof RUNGS[number]
const RUNG_LABEL: Record<Rung, [string, string]> = {
  nudge: ['Petunjuk: pola apa ini?', 'Hint: which pattern?'], plan: ['Rencana (pseudocode)', 'Plan (pseudocode)'],
  parsons: ['Susun barisnya (Parsons)', 'Arrange the lines (Parsons)'], skeleton: ['Kerangka dengan isian', 'Skeleton with blanks'], solution: ['Solusi baris demi baris', 'Worked solution'],
}

const T = {
  id: {
    answer: 'Jawabanmu', rep: 'Bentuk jawaban', required: 'wajib', practice: 'latihan', paperTip: 'Mode Kertas: tulis seperti di lembar ujian, tanpa Run. Ctrl/Cmd + Enter untuk mengumpulkan.',
    run: 'Jalankan', submit: 'Kumpulkan', stdin: 'Masukan (satu baris per input())', out: 'Keluaran', noOut: '(tidak ada keluaran)', promptNote: 'Teks di dalam input("…") tidak ikut tercetak.',
    trace: 'Telusuri langkah', tests: 'Hasil per tes', input: 'Masukan', want: 'Seharusnya', got: 'Keluaranmu', must: 'Syarat struktur', rubric: 'Nilai (rubrik resmi 0–4)', suggested: 'saran otomatis',
    confirm: 'Konfirmasi nilai', conf2: 'Nilai terkunci. Lanjut ke soal berikutnya.', retry: 'Perbaiki & uji lagi (tidak dihitung)', solution: 'Pembahasan', samples: 'Contoh jawaban bernilai', note: 'Alasan',
    syntax: 'Kartu sintaks', hintsOpen: 'Petunjuk dibuka', cap: 'nilai maks', next: 'Buka berikutnya', allOpen: 'Semua petunjuk sudah dibuka.', insert: 'Pindahkan ke editor', overwrite: 'Ganti isi editor dengan ini?',
    noEngine: 'Penerjemah untuk bentuk ini belum tersedia.', compileErr: 'Jawabanmu belum bisa diterjemahkan ke Python', running: 'Memeriksa…', blank: 'Tulis jawabanmu dulu.', line: 'baris', after: 'Keluaran dan jawaban kunci dibuka setelah dikumpulkan.',
    err: 'Galat', translated: '(nomor baris merujuk ke Python hasil terjemahan)', fill: 'Isi bagian ___', tryBlanks: 'Uji isian',
    descTab: 'Deskripsi', hintsTab: 'Petunjuk', editorialTab: 'Pembahasan', subsTab: 'Riwayat', caseTab: 'Kasus uji', resultTab: 'Hasil uji', traceTab: 'Jejak',
    caseN: 'Kasus', custom: 'kustom', addCase: 'Tambah kasus', delCase: 'Hapus kasus', caseNote: 'Kasus contoh bisa diubah. Kasus kustom hanya menampilkan keluaran (tanpa kunci).', resetCase: 'Kembalikan masukan awal',
    yourOut: 'Keluaranmu', expected: 'Seharusnya', outOnly: 'Kasus kustom: hanya keluaran, tidak ada pembanding.', noRes: 'Jalankan programmu (Run) atau kumpulkan untuk melihat hasil di sini.',
    runNote: 'Run (hanya kasus yang terlihat)', subNote: 'Kumpul (semua tes)', testcases: 'tes lulus', hiddenCase: 'kasus tersembunyi',
    reset: 'Kembalikan ke awal', resetAsk: 'Ganti isi editor dengan kerangka awal? Jawabanmu saat ini hilang.', draft: 'Draf tersimpan otomatis di perangkat ini.',
    locked: 'Pembahasan terkunci sampai kamu mengumpulkan jawaban sekali, atau membuka petunjuk terakhir.', reveal: 'Buka sekarang (hitung sebagai petunjuk terakhir: nilai maks 0%)', solInEd: 'Solusi baris demi baris ada di tab Pembahasan.', openEd: 'Buka Pembahasan',
    noSubs: 'Belum ada kiriman untuk soal ini.', restore: 'Pulihkan ke editor', subCode: 'Kode kiriman', similar: 'Soal serupa', accepted: 'Bagus! Latihan pola yang sama:',
    meta: 'Pola', structure: 'Wajib memakai', difficulty: 'Tingkat', easy: 'Mudah', medium: 'Sedang', hard: 'Sulit', stemHere: 'Soal', sample: 'Contoh', ok: 'lulus',
  },
  en: {
    answer: 'Your answer', rep: 'Answer as', required: 'required', practice: 'practice', paperTip: 'Paper mode: write as on the exam sheet, no Run. Ctrl/Cmd + Enter submits.',
    run: 'Run', submit: 'Submit', stdin: 'Input (one line per input())', out: 'Output', noOut: '(no output)', promptNote: 'Text inside input("…") is not printed.',
    trace: 'Step through', tests: 'Result per test', input: 'Input', want: 'Expected', got: 'Your output', must: 'Structure requirements', rubric: 'Mark (official rubric 0–4)', suggested: 'auto suggestion',
    confirm: 'Confirm mark', conf2: 'Mark locked. Continue to the next question.', retry: 'Fix & test again (not counted)', solution: 'Worked solution', samples: 'Graded sample answers', note: 'Why',
    syntax: 'Syntax cards', hintsOpen: 'Hints opened', cap: 'max credit', next: 'Open next', allOpen: 'All hints are open.', insert: 'Move to editor', overwrite: 'Replace the editor content with this?',
    noEngine: 'The translator for this form is not available yet.', compileErr: 'Your answer could not be translated to Python', running: 'Checking…', blank: 'Write your answer first.', line: 'line',
    after: 'Output and the model answer open after submitting.', err: 'Error', translated: '(line numbers refer to the translated Python)', fill: 'Fill the ___ parts', tryBlanks: 'Test blanks',
    descTab: 'Description', hintsTab: 'Hints', editorialTab: 'Editorial', subsTab: 'Submissions', caseTab: 'Testcase', resultTab: 'Test Result', traceTab: 'Trace',
    caseN: 'Case', custom: 'custom', addCase: 'Add case', delCase: 'Delete case', caseNote: 'Sample cases are editable. Custom cases show the output only (no expected value).', resetCase: 'Restore original input',
    yourOut: 'Your output', expected: 'Expected', outOnly: 'Custom case: output only, nothing to compare with.', noRes: 'Run your program (or submit) to see the results here.',
    runNote: 'Run (visible cases only)', subNote: 'Submit (all tests)', testcases: 'tests passed', hiddenCase: 'hidden case',
    reset: 'Reset to starter', resetAsk: 'Replace the editor with the starter? Your current answer will be lost.', draft: 'Draft is saved automatically on this device.',
    locked: 'The editorial is locked until you submit once, or open the last hint rung.', reveal: 'Open it now (counts as the last hint rung: max credit 0%)', solInEd: 'The line-by-line solution is in the Editorial tab.', openEd: 'Open Editorial',
    noSubs: 'No submissions for this problem yet.', restore: 'Restore to editor', subCode: 'Submitted code', similar: 'Similar problems', accepted: 'Nice! Practise the same pattern:',
    meta: 'Patterns', structure: 'Must use', difficulty: 'Difficulty', easy: 'Easy', medium: 'Medium', hard: 'Hard', stemHere: 'Problem', sample: 'Sample', ok: 'passed',
  },
}

const STARTER = { python: '# Program Solution\n# DECLARATIONS\n# ALGORITHM\n', pseudo: 'Program Solution\nDECLARATIONS\n\nALGORITHM\n' }
const isBlankText = (s: string, starter: string) => !s.trim() || s.trim() === starter.trim()

interface Saved { rep: Rep; py: string; ps: string; flow: Flowchart }
const emptyFlow = (): Flowchart => ({ blocks: [] })
const asSaved = (a: unknown): Saved | null => (a && typeof a === 'object' && 'rep' in a ? (a as Saved) : null)
const stdinLines = (s: string) => s.split('\n').filter((_, i, a) => !(i === a.length - 1 && a[i] === ''))

function compile(rep: Rep, s: { py: string; ps: string; flow: Flowchart }, starter: { py: string; ps: string }): { code: string; errors: string[]; blank: boolean } {
  if (rep === 'python') return { code: s.py, errors: [], blank: isBlankText(s.py, starter.py) }
  if (rep === 'pseudo') {
    if (isBlankText(s.ps, starter.ps)) return { code: '', errors: [], blank: true }
    const r = pseudoToPython(s.ps)
    return { code: r.code, errors: r.errors.map((e) => (e.line ? `Line ${e.line}: ${e.msg}` : e.msg)), blank: false }
  }
  if (!s.flow.blocks.length) return { code: '', errors: [], blank: true }
  const r = flowToPython(s.flow)
  return { code: r.code, errors: r.errors, blank: false }
}

/* ---------- viewport helpers ---------- */
function useWide(px: number) {
  const q = `(min-width: ${px}px)`
  const [w, setW] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(q).matches)
  useEffect(() => {
    const m = matchMedia(q)
    const f = () => setW(m.matches)
    f(); m.addEventListener('change', f)
    return () => m.removeEventListener('change', f)
  }, [q])
  return w
}
const SPLIT_KEY = 'bk.progSplit'
const loadSplit = () => { try { const n = Number(localStorage.getItem(SPLIT_KEY)); return n >= 25 && n <= 70 ? n : 42 } catch { return 42 } }

/* ---------- per-case results (Run and Submit share this shape) ---------- */
interface CaseRes {
  name: string; stdin: string[]; custom?: boolean
  /** null = nothing to compare with (custom case) */
  ok: boolean | null
  got: string; ref?: string
  error?: string; errorLine?: number | null; timeout?: boolean
  /** diagnosis text (markdown) */
  msg?: string; edge?: string
}
interface ResultSet {
  kind: 'run' | 'submit'; verdict: SubVerdict | 'Finished'; cases: CaseRes[]; passed: number; total: number
  notes: string[]; must: MustCheck[]
}
const fromReport = (r: Report): CaseRes[] => r.tests.map((x) => ({ name: x.name, stdin: x.stdin, ok: x.ok, got: x.got, ref: x.ref, error: x.error, errorLine: x.errorLine, timeout: x.timeout, msg: x.diag?.msg, edge: x.edge }))
const trimEnd = (s: string) => s.replace(/\r/g, '').replace(/\s+$/g, '')

/* ---------- skeleton (faded blanks) ---------- */
function Skeleton({ q, lab, t, lang, onInsert }: { q: ProgramQ; lab: boolean; t: typeof T.id; lang: 'id' | 'en'; onInsert: (code: string) => void }) {
  const src = q.skeleton!
  const parts = useMemo(() => src.split('\n').map((l) => l.split('___')), [src])
  const [vals, setVals] = useState<string[]>(() => new Array(src.split('___').length - 1).fill(''))
  const [res, setRes] = useState<string | null>(null)
  const build = () => { let k = 0; return parts.map((p) => p.reduce((a, s, i) => a + (i ? (vals[k++] || '___') : '') + s, '')).join('\n') }
  const test = async () => {
    setRes(t.running)
    const r = await runReport(q, build(), EXPECTED[q.id]?.outputs, depsFor(lang), lang)
    setRes(`${r.passed}/${r.total} tests passed`)
  }
  let k = 0
  return (
    <div className="prog-skel">
      <div className="muted prog-small">{t.fill}</div>
      <pre className="prog-skel-code">
        {parts.map((p, li) => (
          <div key={li}>{p.map((seg, si) => {
            const idx = si ? k++ : -1
            return <span key={si}>{si > 0 && <input className="prog-blank" aria-label={`blank ${idx + 1}`} value={vals[idx]} size={Math.max(4, vals[idx].length + 1)} onChange={(e) => setVals((v) => v.map((x, j) => (j === idx ? e.target.value : x)))} spellCheck={false} />}{seg}</span>
          })}</div>
        ))}
      </pre>
      <div className="prog-row">
        <button className="btn sm" onClick={() => onInsert(build())}>{t.insert}</button>
        {lab && <button className="btn sm" onClick={test}>{t.tryBlanks}</button>}
        {res && <span className="chip">{res}</span>}
      </div>
    </div>
  )
}

/* ---------- worked solution ---------- */
function Solution({ q, lang, onSyntax }: { q: ProgramQ; lang: 'id' | 'en'; onSyntax: (id: SyntaxId) => void }) {
  const tabs = (['python', 'pseudo', 'flow'] as Rep[]).filter((r) => (r === 'python' ? true : r === 'pseudo' ? !!q.solution.pseudo : !!q.solution.flow))
  const [tab, setTab] = useState<Rep>('python')
  return (
    <div className="prog-sol">
      {tabs.length > 1 && <div className="seg">{tabs.map((r) => <button key={r} className={tab === r ? 'on' : ''} onClick={() => setTab(r)}>{REP_LABEL[r]}</button>)}</div>}
      {tab === 'python' && <CodeNotes code={q.solution.python} notes={q.lineNotes} lang={lang} onSyntax={(id) => onSyntax(id as SyntaxId)} />}
      {tab === 'pseudo' && q.solution.pseudo && <CodeNotes code={q.solution.pseudo} notes={q.pseudoNotes} lang={lang} onSyntax={(id) => onSyntax(id as SyntaxId)} />}
      {tab === 'flow' && q.solution.flow && <FlowView flow={q.solution.flow} />}
    </div>
  )
}

/* ---------- line-level diff blocks ---------- */
function DiffBlock({ text, other, side }: { text: string; other: string; side: 'got' | 'want' }) {
  const a = trimEnd(text), b = trimEnd(other)
  if (!a) return <pre className="prog-diff"><div className="dl dim">∅</div></pre>
  const al = a.split('\n'), bl = b ? b.split('\n') : []
  return (
    <pre className="prog-diff">
      {al.map((l, i) => {
        const diff = bl[i] === undefined || bl[i].replace(/\s+$/, '') !== l.replace(/\s+$/, '')
        return <div key={i} className={'dl' + (diff ? (side === 'got' ? ' bad' : ' miss') : '')}>{l || ' '}</div>
      })}
    </pre>
  )
}

function CaseDetail({ c, t, translated }: { c: CaseRes; t: typeof T.id; translated: boolean }) {
  const bad = c.ok === false
  return (
    <div className="prog-case">
      <div className="prog-case-h">
        <b>{c.name}</b>{c.edge && <span className="chip warn">{c.edge}</span>}{c.custom && <span className="chip">{t.custom}</span>}
      </div>
      <small className="prog-lbl">{t.input}</small>
      <pre className="prog-diff">{c.stdin.length ? c.stdin.map((l, i) => <div key={i} className="dl">{l || ' '}</div>) : <div className="dl dim">∅</div>}</pre>
      <div className="prog-io">
        <div><small className="prog-lbl">{t.yourOut}</small><DiffBlock text={c.got} other={c.ref ?? ''} side="got" />
          {c.ref === undefined && c.ok === null && !c.error && <div className="muted prog-small">{t.outOnly}</div>}</div>
        {c.ref !== undefined && <div><small className="prog-lbl">{t.expected}</small>{bad ? <DiffBlock text={c.ref} other={c.got} side="want" /> : <pre className="prog-diff">{trimEnd(c.ref).split('\n').map((l, i) => <div key={i} className="dl">{l || ' '}</div>)}</pre>}</div>}
      </div>
      {c.error && translated && <div className="muted prog-small">{t.translated}</div>}
      {c.msg && <Feedback notes={[{ level: c.ok ? 'ok' : 'err', msg: c.msg }]} />}
    </div>
  )
}

/** Verdict banner + case chips + selected case (shared by Run and Submit). */
function ResultView({ res, sel, onSel, t, translated, children }: { res: ResultSet; sel: number; onSel: (i: number) => void; t: typeof T.id; translated: boolean; children?: ReactNode }) {
  const tone = verdictTone(res.verdict)
  const cur = res.cases[Math.min(sel, res.cases.length - 1)]
  return (
    <div className="prog-resv">
      <div className={'prog-vbanner prog-tone-' + tone}>
        <b>{res.verdict}</b>
        <span className="prog-vsub">{res.total > 0 && `${res.passed} / ${res.total} ${t.testcases} · `}{res.kind === 'run' ? t.runNote : t.subNote}</span>
      </div>
      {res.notes.length > 0 && <Feedback notes={res.notes.map((msg) => ({ level: 'err' as const, msg }))} />}
      {res.cases.length > 0 && (
        <div className="prog-chips" role="tablist" aria-label="Cases">
          {res.cases.map((c, i) => (
            <button key={i} role="tab" aria-selected={i === sel} className={'prog-cchip ' + (c.ok === true ? 'ok' : c.ok === false || c.error ? 'err' : 'na') + (i === sel ? ' on' : '')} onClick={() => onSel(i)}>
              {c.custom ? t.custom : c.name} {c.ok === true ? '✓' : c.ok === false || c.error ? '✗' : '·'}
            </button>
          ))}
        </div>
      )}
      {cur && <CaseDetail c={cur} t={t} translated={translated} />}
      {res.must.length > 0 && <div className="prog-must"><b>{t.must}</b><Feedback notes={res.must.map((m) => ({ level: m.ok ? 'ok' as const : 'err' as const, msg: m.msg }))} /></div>}
      {children}
    </div>
  )
}

interface Case { id: number; name: string; stdin: string; testIdx?: number }
const initCases = (q: ProgramQ): Case[] => {
  let idx = q.tests.map((x, i) => (x.edge ? -1 : i)).filter((i) => i >= 0).slice(0, 2)
  if (!idx.length) idx = q.tests.map((_, i) => i).slice(0, 2)
  return idx.map((i, k) => ({ id: k + 1, name: `${T.en.caseN} ${k + 1}`, stdin: (q.tests[i].stdin ?? []).join('\n'), testIdx: i }))
}
const origStdin = (q: ProgramQ, c: Case) => (c.testIdx != null ? (q.tests[c.testIdx].stdin ?? []).join('\n') : null)
const pretty = (s: string) => s.replace(/-/g, ' ')

type LTab = 'desc' | 'hints' | 'editorial' | 'subs'
type CTab = 'case' | 'result' | 'trace'

export default function ProgramView({ q, problem, mode, lang, onDone, review, compact }: QViewProps<ProgramQ>) {
  const t = T[lang]
  const L = loc(q, lang)
  const lab = mode === 'learn'
  const deps = useMemo(() => depsFor(lang), [lang])
  const starter = useMemo(() => ({ py: lab ? STARTER.python : '', ps: lab ? STARTER.pseudo : '' }), [lab])
  const reps = useMemo<Rep[]>(() => (q.required ? [q.required] : q.reps.length ? q.reps : ['python']), [q])
  const saved = asSaved(review?.answer)
  const wide = useWide(1000)
  const split = wide && !compact && !review
  const subs = useSubmissions(q.id)

  const [rep, setRep] = useState<Rep>(saved?.rep ?? reps[0])
  const [pyText, setPy] = useState(() => saved?.py ?? (review ? '' : loadDraft(q.id, 'python')) ?? starter.py)
  const [psText, setPs] = useState(() => saved?.ps ?? (review ? '' : loadDraft(q.id, 'pseudo')) ?? starter.ps)
  const [flow, setFlow] = useState<Flowchart>(saved?.flow ?? emptyFlow())
  const [phase, setPhase] = useState<'edit' | 'report' | 'final'>(review ? 'final' : 'edit')
  const [busy, setBusy] = useState(false)
  const [report, setReport] = useState<Report | null>(null)
  const [res, setRes] = useState<ResultSet | null>(null)
  const [sel, setSel] = useState(0)
  const [mark, setMark] = useState<RubricScore>(review?.rubricScore ?? 0)
  const [counted, setCounted] = useState(!!review)
  const [everSubmitted, setEver] = useState(!!review)
  const [cases, setCases] = useState<Case[]>(() => initCases(q))
  const [caseSel, setCaseSel] = useState(0)
  const [con, setCon] = useState<CTab>('case')
  const [errAt, setErrAt] = useState<{ line: number; msg: string } | null>(null)
  const [traceKey, setTraceKey] = useState<{ n: number; code: string; stdin: string[] } | null>(null)
  const [opened, setOpened] = useState<Rung[]>([])
  const [synUsed, setSynUsed] = useState(false)
  const [drawer, setDrawer] = useState<{ ids: SyntaxId[] } | null>(null)
  const [lt, setLt] = useState<LTab>('desc')
  const [subSel, setSubSel] = useState<number | null>(null)
  const [pct, setPct] = useState(loadSplit)
  const doneRef = useRef(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const caseId = useRef(10)

  // reset when the question changes
  useEffect(() => {
    if (review) return
    setRep(reps[0]); setPy(loadDraft(q.id, 'python') ?? starter.py); setPs(loadDraft(q.id, 'pseudo') ?? starter.ps); setFlow(emptyFlow())
    setPhase('edit'); setReport(null); setRes(null); setSel(0); setMark(0); setCounted(false); setEver(false)
    setCases(initCases(q)); setCaseSel(0); setCon('case'); setErrAt(null); setTraceKey(null); setOpened([]); setSynUsed(false); setSubSel(null); doneRef.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id])
  // review: recompute the report read-only
  useEffect(() => {
    if (!review) return
    const s = asSaved(review.answer)
    if (!s) return
    void evaluate(s.rep, { py: s.py, ps: s.ps, flow: s.flow }).then(({ report: r, fail }) => {
      setReport(r); setMark(review.rubricScore ?? r.suggested)
      const rs = toRes(r, fail, 'submit'); setRes(rs); setSel(Math.max(0, rs.cases.findIndex((c) => c.ok === false))); setCon('result')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review, q.id])
  // drafts: autosave the editor text per question + representation
  useEffect(() => {
    if (review || phase !== 'edit') return
    const id = setTimeout(() => {
      saveDraft(q.id, 'python', pyText === starter.py ? '' : pyText)
      saveDraft(q.id, 'pseudo', psText === starter.ps ? '' : psText)
    }, 500)
    return () => clearTimeout(id)
  }, [pyText, psText, q.id, phase, review, starter])
  useEffect(() => { try { localStorage.setItem(SPLIT_KEY, String(Math.round(pct))) } catch { /* ignore */ } }, [pct])

  const sol = opened.includes('solution')
  const hints = sol ? 5 : opened.length + (synUsed && !lab ? 1 : 0)
  const cap = hintCap(hints)
  const unlocked = !!review || everSubmitted || sol
  const readOnly = phase !== 'edit' || !!review

  const available = useMemo<Rung[]>(() => RUNGS.filter((r) => {
    if (r === 'nudge') return !!q.hints?.length
    if (r === 'plan') return !!q.plan
    if (r === 'parsons') return rep === 'pseudo' ? !!q.solution.pseudo : rep === 'python'
    if (r === 'skeleton') return !!q.skeleton && rep === 'python'
    return true
  }), [q, rep])
  const nextRung = available.find((r) => !opened.includes(r))
  const openNext = () => { if (!nextRung) return; setOpened((o) => [...o, nextRung]); if (nextRung === 'solution') setLt('editorial') }
  const revealSolution = () => { if (!sol) setOpened((o) => [...o.filter((r) => r !== 'solution'), 'solution']); setLt('editorial') }

  const parsons = useMemo(() => {
    if (rep === 'pseudo' && q.solution.pseudo) return buildParsons(q.solution.pseudo, [], q.id + ':ps', { pseudo: true })
    return buildParsons(q.solution.python, q.wrong ?? [], q.id, { lang })
  }, [q, rep, lang])

  const cur = { py: pyText, ps: psText, flow }
  const curText = rep === 'python' ? pyText : rep === 'pseudo' ? psText : JSON.stringify(flow)
  const insertInto = (code: string) => {
    const has = rep === 'python' ? !isBlankText(pyText, starter.py) : rep === 'pseudo' ? !isBlankText(psText, starter.ps) : false
    if (has && !window.confirm(t.overwrite)) return
    if (rep === 'pseudo') setPs(code); else { setRep('python'); setPy(code) }
  }
  const resetStarter = () => {
    const has = rep === 'python' ? !isBlankText(pyText, starter.py) : rep === 'pseudo' ? !isBlankText(psText, starter.ps) : false
    if (has && !window.confirm(t.resetAsk)) return
    if (rep === 'pseudo') { setPs(starter.ps); clearDraft(q.id, 'pseudo') } else { setPy(starter.py); clearDraft(q.id, 'python') }
    setErrAt(null)
  }

  async function evaluate(r: Rep, s: { py: string; ps: string; flow: Flowchart }): Promise<{ report: Report; fail: boolean }> {
    const c = compile(r, s, starter)
    if (c.blank) return { report: failedReport(q, [], true), fail: false }
    if (r !== 'python' && !ENGINES_READY && !c.code) return { report: failedReport(q, [t.noEngine], false), fail: true }
    if (!c.code || (c.errors.length && !c.code.trim())) return { report: failedReport(q, c.errors.length ? [`**${t.compileErr}:** ` + c.errors.join('; ')] : [t.compileErr], false), fail: true }
    const rep0 = await runReport(q, c.code, EXPECTED[q.id]?.outputs, deps, lang)
    if (c.errors.length) rep0.notes.push(...c.errors.map((e) => `Translator warning: ${e}`))
    return { report: rep0, fail: false }
  }
  function toRes(r: Report, fail: boolean, kind: 'run' | 'submit'): ResultSet {
    const cs = fromReport(r)
    return { kind, verdict: verdictFromCases(cs, r.mustOk, fail), cases: cs, passed: r.passed, total: r.total, notes: r.notes, must: r.mustUse }
  }
  const errFrom = (cs: CaseRes[], code: string) => {
    if (rep !== 'python') return null
    const c = cs.find((x) => x.error && x.errorLine)
    if (!c) return null
    const ex = explainError(c.error!, c.errorLine, code, lang)
    return { line: c.errorLine!, msg: ex ? `**${ex.title}.** ${ex.why} ${ex.fix}` : c.error! }
  }

  /** Lab Run: the visible sample cases (with expected output) and the custom ones (output only). */
  const doRun = async () => {
    if (busy || readOnly) return
    const c = compile(rep, cur, starter)
    setCon('result'); setErrAt(null)
    if (c.blank) { setRes({ kind: 'run', verdict: 'Finished', cases: [], passed: 0, total: 0, notes: [t.blank], must: [] }); return }
    if (!c.code) { setRes({ kind: 'run', verdict: 'Syntax Error', cases: [], passed: 0, total: 0, notes: c.errors.length ? c.errors : [t.noEngine], must: [] }); return }
    setBusy(true)
    const samples = cases.filter((x) => x.testIdx != null && x.stdin === origStdin(q, x))
    const out: Record<number, CaseRes> = {}
    let notes: string[] = []
    if (samples.length) {
      const idx = samples.map((x) => x.testIdx!)
      const baked = EXPECTED[q.id]?.outputs
      const sub: ProgramQ = { ...q, mustUse: undefined, tests: idx.map((i) => q.tests[i]) }
      const r = await runReport(sub, c.code, baked && idx.every((i) => baked[i] !== undefined) ? idx.map((i) => baked[i]) : undefined, deps, lang)
      notes = r.notes
      samples.forEach((x, k) => { out[x.id] = { ...fromReport(r)[k], name: x.name } })
    }
    for (const x of cases) {
      if (out[x.id]) continue
      const r = await py.run(c.code, stdinLines(x.stdin))
      let msg: string | undefined
      if (r.error) {
        const ex = explainError(r.error, r.error_line, c.code, lang)
        msg = ex ? `**${ex.title}.** ${ex.why} ${ex.fix}` : r.error + (r.error_line ? ` (${t.line} ${r.error_line})` : '')
      }
      out[x.id] = { name: x.name, stdin: stdinLines(x.stdin), custom: true, ok: null, got: r.stdout, error: r.error, errorLine: r.error_line, timeout: r.timeout, msg }
    }
    const cs = cases.map((x) => out[x.id])
    const cmp = cs.filter((x) => x.ok !== null)
    setBusy(false)
    setRes({ kind: 'run', verdict: verdictFromCases(cs, true), cases: cs, passed: cmp.filter((x) => x.ok).length, total: cmp.length, notes, must: [] })
    setSel(Math.max(0, cs.findIndex((x) => x.ok === false || x.error)))
    setErrAt(errFrom(cs, c.code))
  }
  const doTrace = () => {
    const c = compile(rep, cur, starter)
    if (!c.code) return
    setTraceKey({ n: (traceKey?.n ?? 0) + 1, code: c.code, stdin: stdinLines(cases[Math.min(caseSel, cases.length - 1)]?.stdin ?? '') })
    setCon('trace')
  }
  const doSubmit = async () => {
    if (busy || phase !== 'edit' || review) return
    setBusy(true)
    const { report: r, fail } = await evaluate(rep, cur)
    setBusy(false)
    const rs = toRes(r, fail, 'submit')
    setReport(r); setRes(rs); setCon('result'); setEver(true)
    setSel(Math.max(0, rs.cases.findIndex((c) => c.ok === false || c.error)))
    setMark(nearestRow(q.rubric ?? DEFAULT_RUBRIC, r.suggested))
    setErrAt(errFrom(rs.cases, compile(rep, cur, starter).code))
    setPhase('report')
    if (!compile(rep, cur, starter).blank && rs.verdict !== 'Finished') {
      logSubmission(q.id, { verdict: rs.verdict, passed: r.passed, total: r.total, rep, code: curText, mode, hints })
    }
  }
  const confirm = () => {
    if (!report || doneRef.current) return
    if (counted) { setPhase('final'); return }
    doneRef.current = true; setCounted(true)
    const tags = [...new Set<MisTag>(report.tags)]
    const o: Outcome = {
      correct: mark === 4, score: (mark / 4) * cap, rubricScore: mark, hints, tags: tags.length ? tags : undefined,
      summary: `${report.headline}${mark !== report.suggested ? ` (mark adjusted: ${RUBRIC_INDEX[mark]})` : ''}`,
      answer: { rep, py: pyText, ps: psText, flow } satisfies Saved,
    }
    clearDraft(q.id, 'python'); clearDraft(q.id, 'pseudo')
    setPhase('final')
    onDone(o)
  }
  const retry = () => { setPhase('edit'); setReport(null); setCon('case') }
  const restoreSub = (s: Submission) => {
    if (readOnly) return
    const has = rep === 'flow' ? flow.blocks.length > 0 : !isBlankText(rep === 'python' ? pyText : psText, rep === 'python' ? starter.py : starter.ps)
    if (has && !window.confirm(t.overwrite)) return
    if (s.rep === 'flow') { try { setFlow(JSON.parse(s.code) as Flowchart); setRep('flow') } catch { /* ignore */ } return }
    if (s.rep === 'pseudo') setPs(s.code); else setPy(s.code)
    if (reps.includes(s.rep)) setRep(s.rep)
    setErrAt(null)
  }

  const openSyn = (ids: SyntaxId[]) => { setDrawer({ ids }) }
  const cardOpened = () => setSynUsed(true)
  const rubric = q.rubric ?? DEFAULT_RUBRIC
  const translated = rep !== 'python'

  /* ---------- case editing (Lab) ---------- */
  const cc = cases[Math.min(caseSel, cases.length - 1)]
  const setStdin = (v: string) => setCases((cs) => cs.map((x) => (x.id === cc.id ? { ...x, stdin: v } : x)))
  const addCase = () => {
    const id = ++caseId.current
    setCases((cs) => [...cs, { id, name: `${t.caseN} ${cs.length + 1}`, stdin: '' }])
    setCaseSel(cases.length)
  }
  const delCase = () => {
    if (cc.testIdx != null || cases.length <= 1) return
    setCases((cs) => cs.filter((x) => x.id !== cc.id).map((x, i) => ({ ...x, name: `${t.caseN} ${i + 1}` })))
    setCaseSel(Math.max(0, caseSel - 1))
  }

  /* ---------- pieces ---------- */
  const rubricBlock = res?.kind === 'submit' && report && phase !== 'edit' ? (
    <div className="prog-rubwrap">
      <h4>{t.rubric}</h4>
      <div className="prog-rubric" role="radiogroup">
        {rubric.map((row) => (
          <button key={row.score} role="radio" aria-checked={mark === row.score} className={'prog-rub' + (mark === row.score ? ' on' : '')} disabled={phase === 'final'} onClick={() => setMark(row.score)}>
            <span className="prog-rub-sc">{row.score}<small>{RUBRIC_INDEX[row.score]}</small></span>
            <span className="prog-rub-d">{lang === 'en' ? row.descEn ?? row.desc : row.desc}{nearestRow(rubric, report.suggested) === row.score && <em> · {t.suggested}</em>}</span>
          </button>
        ))}
      </div>
      {hints > 0 && <div className="muted prog-small">{t.hintsOpen}: {hints} → {t.cap} {Math.round(cap * 100)}%</div>}
      {phase === 'report' && (
        <div className="prog-row">
          <button className="btn primary" onClick={confirm}>{t.confirm}: {mark}/4 ({RUBRIC_INDEX[mark]})</button>
          {lab && !review && <button className="btn" onClick={retry}>{t.retry}</button>}
        </div>
      )}
      {phase === 'final' && !review && <div className="muted prog-small">{t.conf2}</div>}
    </div>
  ) : null

  const similar = useMemo(() => (res?.verdict === 'Accepted' && res.kind === 'submit' ? similarProblems(q, problem) : []), [res, q, problem])
  const similarBlock = similar.length ? (
    <div className="prog-similar">
      <h4>{t.similar}</h4>
      <div className="muted prog-small">{t.accepted}</div>
      <ul>{similar.map((p) => <li key={p.id}><a href={`#/problems/${p.id}`}>{(lang === 'en' && p.en?.title) || p.title}</a> <small className="muted">{(p.parts[0]?.patterns ?? []).slice(0, 2).map(pretty).join(' · ')}</small></li>)}</ul>
    </div>
  ) : null

  const consoleTabs: CTab[] = (lab && !review && phase === 'edit' ? ['case', 'result'] : ['result']).concat(traceKey || phase === 'final' ? ['trace'] : []) as CTab[]
  const conNow: CTab = consoleTabs.includes(con) ? con : consoleTabs[0]
  const finalTrace = phase === 'final' && !traceKey ? (() => { const c = compile(rep, cur, starter); return c.code ? { n: 0, code: c.code, stdin: q.tests[0]?.stdin ?? [] } : null })() : null
  const tk = traceKey ?? finalTrace
  const showConsole = (lab && !review && phase === 'edit') || !!res

  const consoleEl = showConsole ? (
    <div className="prog-console">
      <div className="prog-tabs" role="tablist">
        {consoleTabs.map((k) => <button key={k} role="tab" aria-selected={conNow === k} className={conNow === k ? 'on' : ''} onClick={() => setCon(k)}>{k === 'case' ? t.caseTab : k === 'result' ? t.resultTab : t.traceTab}</button>)}
      </div>
      <div className="prog-conbody">
        {conNow === 'case' && cc && (
          <div className="prog-casebox">
            <div className="prog-chips">
              {cases.map((x, i) => <button key={x.id} className={'prog-cchip na' + (i === caseSel ? ' on' : '')} onClick={() => setCaseSel(i)}>{x.name}{x.testIdx == null ? ` · ${t.custom}` : ''}</button>)}
              <button className="prog-cchip add" onClick={addCase} title={t.addCase} aria-label={t.addCase}>+</button>
            </div>
            <label className="prog-stdin-box"><small>{t.stdin}</small>
              <textarea rows={3} value={cc.stdin} onChange={(e) => setStdin(e.target.value)} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off" /></label>
            <div className="prog-row">
              {cc.testIdx == null && cases.length > 1 && <button className="btn sm" onClick={delCase}>{t.delCase}</button>}
              {cc.testIdx != null && cc.stdin !== origStdin(q, cc) && <button className="btn sm" onClick={() => setStdin(origStdin(q, cc) ?? '')}>{t.resetCase}</button>}
            </div>
            <div className="muted prog-small">{t.caseNote} {t.promptNote}</div>
          </div>
        )}
        {conNow === 'result' && (res
          ? <ResultView res={res} sel={sel} onSel={setSel} t={t} translated={translated}>{similarBlock}{rubricBlock}</ResultView>
          : <div className="muted prog-small">{t.noRes}</div>)}
        {conNow === 'trace' && tk && <Tracer key={tk.n} code={tk.code} stdin={tk.stdin} lang={lang} compact />}
      </div>
    </div>
  ) : null

  const bar = (
    <div className="prog-bar">
      <div className="prog-reps" role="tablist" aria-label={t.rep}>
        {reps.map((r) => (
          <button key={r} role="tab" aria-selected={rep === r} className={'chip prog-rep' + (rep === r ? ' on' : '')} disabled={readOnly && rep !== r} onClick={() => setRep(r)}>
            {REP_LABEL[r]}{q.required === r && <small> · {t.required}</small>}
          </button>
        ))}
      </div>
      {q.syntax?.length ? (
        <div className="prog-syn">
          <span className="muted prog-small">{t.syntax}{lab ? ' · free' : ' · −1 rung'}:</span>
          {q.syntax.map((id) => <button key={id} className="chip prog-chip" onClick={() => { openSyn([id]); cardOpened() }}>{SYNTAX_BY_ID.get(id)?.title ?? id}</button>)}
        </div>
      ) : null}
    </div>
  )

  const answer = (
    <div className="prog-answer">
      {rep === 'python' && <Editor value={pyText} onChange={(v) => { setPy(v); setErrAt(null) }} mode={mode} readOnly={readOnly} language="python" onRun={lab ? doRun : undefined} onSubmit={doSubmit}
        errorLine={errAt?.line ?? null} errorMessage={errAt?.msg} placeholder={lab ? '# write your program here' : ''} minLines={split ? 14 : 8} maxLines={split ? 26 : 28} />}
      {rep === 'pseudo' && <Editor value={psText} onChange={setPs} mode={mode} readOnly={readOnly} language="pseudo" onRun={lab ? doRun : undefined} onSubmit={doSubmit} ariaLabel="Pseudocode answer"
        placeholder={lab ? 'Program …\nDECLARATIONS\nALGORITHM' : ''} minLines={split ? 14 : 8} maxLines={split ? 26 : 28} />}
      {rep === 'flow' && (ENGINES_READY ? <FlowBuilder value={flow} onChange={setFlow} readOnly={readOnly} /> : <div className="muted">{t.noEngine}</div>)}
      {!readOnly && rep !== 'flow' && (
        <div className="prog-edtools"><button className="btn sm ghost" onClick={resetStarter}>↺ {t.reset}</button><span className="muted prog-small">{t.draft}</span></div>
      )}
    </div>
  )

  const actions = phase === 'edit' && !review ? (
    <div className="prog-row prog-submit">
      {lab && <button className="btn" onClick={doRun} disabled={busy}>▶ {t.run} <kbd>⌘↵</kbd></button>}
      <button className="btn primary" onClick={doSubmit} disabled={busy}>{busy ? t.running : t.submit} {!busy && <kbd>{lab ? '⌘⇧↵' : '⌘↵'}</kbd>}</button>
      {lab && <button className="btn" onClick={doTrace} disabled={busy}>{t.trace}</button>}
      {!lab && <span className="muted prog-small">{t.after}</span>}
      {hints > 0 && <span className="chip warn" title={t.cap}>{t.hintsOpen}: {hints} · {t.cap} {Math.round(cap * 100)}%</span>}
    </div>
  ) : null

  /* ---------- left / lower tabs ---------- */
  const { d: diff, est: diffEst } = diffOfQ(q)
  const desc = (
    <div className="prog-desc">
      <div className="prog-desc-meta">
        {diff && <span className={'prog-diffchip d' + diff} title={diffEst ? 'Estimated from the content' : undefined}>{diffEst ? '≈ ' : ''}{diff === 1 ? t.easy : diff === 2 ? t.medium : t.hard}</span>}
        <span className="chip">{q.topic}</span>
        {q.decks.map((d) => <span key={d} className="chip" style={{ borderColor: DECKS.find((x) => x.id === d)?.color }}>{d}</span>)}
        {q.required && <span className="chip warn">{t.required}: {REP_LABEL[q.required]}</span>}
        {q.mustUse?.length ? <span className="chip warn">{t.structure}: {q.mustUse.join(', ')}</span> : null}
        {q.weight != null && problem.parts.length > 1 && <span className="chip">{Math.round(q.weight * 100)}%</span>}
      </div>
      {((lang === 'en' && problem.en?.intro) || problem.intro) && <div className="prog-intro"><Md>{(lang === 'en' && problem.en?.intro) || problem.intro!}</Md></div>}
      <div className="pq-stem prog-stem"><Md>{L.stem}</Md></div>
      {q.patterns?.length ? <div className="prog-small muted">{t.meta}: {q.patterns.map(pretty).join(' · ')}</div> : null}
      {q.refs?.length ? <div className="prog-row">{q.refs.map((r) => <PageChip key={r.src + r.page} r={r} />)}</div> : null}
    </div>
  )

  const ladder = (
    <div className="prog-ladder">
      {opened.filter((r) => r !== 'solution').map((r) => (
        <details key={r} className="prog-rung" open={r === opened[opened.length - 1] || opened.length === 1}>
          <summary>{RUNG_LABEL[r][lang === 'en' ? 1 : 0]}</summary>
          {r === 'nudge' && <ul>{L.hints.map((h, i) => <li key={i}><Md inline>{h}</Md></li>)}</ul>}
          {r === 'plan' && <pre className="prog-plan">{(L.plan ?? q.plan ?? '').replace(/;\s*/g, '\n')}</pre>}
          {r === 'parsons' && <Parsons key={rep} set={parsons} lang={lang} pseudo={rep === 'pseudo'} onInsert={insertInto} />}
          {r === 'skeleton' && <Skeleton q={q} lab={lab} t={t} lang={lang} onInsert={insertInto} />}
        </details>
      ))}
      {sol && <div className="prog-rung prog-rung-sol">{t.solInEd} <button className="btn sm" onClick={() => setLt('editorial')}>{t.openEd}</button></div>}
      <div className="prog-row">
        {phase === 'edit' && !review && (nextRung ? (
          <button className="btn sm" onClick={openNext}>💡 {t.next}: {RUNG_LABEL[nextRung][lang === 'en' ? 1 : 0]} <small>({t.cap} {Math.round(hintCap(nextRung === 'solution' ? 5 : hints + 1) * 100)}%)</small></button>
        ) : <span className="muted prog-small">{t.allOpen}</span>)}
        {hints > 0 && <span className="chip warn" title={t.cap}>{t.hintsOpen}: {hints} · {t.cap} {Math.round(cap * 100)}%</span>}
      </div>
    </div>
  )

  const editorial = unlocked ? (
    <div className="prog-editorial">
      <h4>{t.solution}</h4>
      <Solution q={q} lang={lang} onSyntax={(id) => openSyn([id])} />
      <Md>{L.explanation}</Md>
      {q.samples?.length ? (
        <div className="prog-samples">
          <h4>{t.samples}</h4>
          {q.samples.map((s, i) => (
            <div key={i} className="prog-sample">
              <pre>{s.answer}</pre>
              <div><span className="chip">{s.score}/4 · {RUBRIC_INDEX[s.score]}</span> <Md inline>{lang === 'en' ? s.noteEn ?? s.note : s.note}</Md></div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  ) : (
    <div className="prog-locked">
      <div className="prog-lock-ic" aria-hidden>🔒</div>
      <p>{t.locked}</p>
      {!review && <button className="btn sm" onClick={revealSolution}>{t.reveal}</button>}
    </div>
  )

  const subSelected = subSel != null ? subs[subSel] : null
  const subsEl = !subs.length ? <div className="muted prog-small">{t.noSubs}</div> : (
    <div className="prog-subs">
      <ul className="prog-sublist">
        {subs.map((s, i) => (
          <li key={s.t + ':' + i}>
            <button className={'prog-subrow' + (subSel === i ? ' on' : '')} onClick={() => setSubSel(subSel === i ? null : i)}>
              <b className={'prog-tone-txt prog-tone-' + verdictTone(s.verdict)}>{s.verdict}</b>
              <span className="muted">{s.passed}/{s.total}</span>
              <span className="chip">{s.mode === 'test' ? 'Paper' : 'Lab'}</span>
              <span className="chip">{REP_LABEL[s.rep]}</span>
              {s.hints > 0 && <span className="chip warn">{s.hints} 💡</span>}
              <span className="muted prog-time">{timeAgo(s.t)}</span>
            </button>
          </li>
        ))}
      </ul>
      {subSelected && (
        <div className="prog-subview">
          <div className="prog-row"><b>{t.subCode}</b><span className="grow" />{!readOnly && <button className="btn sm primary" onClick={() => restoreSub(subSelected)}>{t.restore}</button>}</div>
          <Editor value={subSelected.code} mode={mode} readOnly language={subSelected.rep === 'pseudo' ? 'pseudo' : subSelected.rep === 'python' ? 'python' : 'plain'} minLines={3} maxLines={18} ariaLabel={t.subCode} />
        </div>
      )}
    </div>
  )

  const ltNow: LTab = !split && lt === 'desc' ? 'hints' : lt
  const tabIds: LTab[] = split ? ['desc', 'hints', 'editorial', 'subs'] : ['hints', 'editorial', 'subs']
  const tabLabel = (k: LTab) => k === 'desc' ? t.descTab : k === 'hints' ? `${t.hintsTab}${hints ? ` (${hints})` : ''}` : k === 'editorial' ? `${unlocked ? '' : '🔒 '}${t.editorialTab}` : `${t.subsTab}${subs.length ? ` (${subs.length})` : ''}`
  const side = (
    <div className="prog-side">
      <div className="prog-tabs" role="tablist">
        {tabIds.map((k) => <button key={k} role="tab" aria-selected={ltNow === k} className={ltNow === k ? 'on' : ''} onClick={() => setLt(k)}>{tabLabel(k)}</button>)}
      </div>
      <div className="prog-tabbody">
        {ltNow === 'desc' && desc}
        {ltNow === 'hints' && ladder}
        {ltNow === 'editorial' && editorial}
        {ltNow === 'subs' && subsEl}
      </div>
    </div>
  )

  const work = (
    <div className="prog-work">
      {bar}
      {!lab && !readOnly && <div className="prog-tip muted">{t.paperTip}</div>}
      {answer}
      {actions}
      {consoleEl}
    </div>
  )

  const onDivider = (e: RPointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    const root = rootRef.current
    if (!root) return
    const move = (ev: PointerEvent) => { const r = root.getBoundingClientRect(); setPct(Math.max(25, Math.min(70, ((ev.clientX - r.left) / r.width) * 100))) }
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up)
  }

  return (
    <div ref={rootRef} className={'prog' + (compact ? ' prog-compact' : '') + (split ? ' prog-split' : ' prog-stack')}>
      {split ? (
        <>
          <div className="prog-left" style={{ flexBasis: pct + '%' }}>{side}</div>
          <div className="prog-divider" role="separator" aria-orientation="vertical" aria-label="Resize panes" tabIndex={0} onPointerDown={onDivider}
            onKeyDown={(e) => { if (e.key === 'ArrowLeft') setPct((p) => Math.max(25, p - 2)); if (e.key === 'ArrowRight') setPct((p) => Math.min(70, p + 2)) }} />
          <div className="prog-right">{work}</div>
        </>
      ) : <>{work}{side}</>}
      {drawer && <SyntaxDrawer ids={drawer.ids} open onClose={() => setDrawer(null)} onOpenCard={cardOpened} lang={lang} />}
    </div>
  )
}
