// Problems: a LeetCode-style table of every problem (status, title, archetype, tags, difficulty, your acceptance rate, source),
// filters + search + "Pick one". Route #/problems lists; #/problems/<id> opens one problem in a single-problem Session.
import { useMemo, useState } from 'react'
import { useLocalState } from '../lib/kit'
import { ARCHETYPES, DECKS, type Archetype, type DeckId, type Mode, type Problem } from '../types'
import { POOL, sourceText } from './pool'
import Session from './Session'
import { usePStore } from './store'
import { problemStatus } from './submissions'
import { deckColor } from './ui'
import './practice.css'

type Status = 'solved' | 'attempted' | 'new'
const STATUS_ICON: Record<Status, string> = { solved: '✓', attempted: '◐', new: '○' }
const STATUS_LABEL: Record<Status, string> = { solved: 'Solved', attempted: 'Attempted', new: 'New' }
const DIFF = ['–', 'Easy', 'Medium', 'Hard']
import { diffOfP } from './difficulty'
const diffOf = (p: Problem) => diffOfP(p)
const titleOf = (p: Problem) => p.en?.title ?? p.title
const go = (id?: string) => { location.hash = '#/problems' + (id ? '/' + id : '') }

export default function Problems({ id }: { id?: string }) {
  const [mode, setMode] = useLocalState<Mode>('bk.pmode', 'test')
  const store = usePStore()
  const [q, setQ] = useState('')
  const [arch, setArch] = useState<'' | Archetype>('')
  const [deck, setDeck] = useState<'' | DeckId>('')
  const [diff, setDiff] = useState<'' | '0' | '1' | '2' | '3'>('')
  const [status, setStatus] = useState<'' | Status>('')
  const [official, setOfficial] = useState<'' | 'official' | 'unofficial'>('')
  const [oos, setOos] = useState(false)
  const [retry, setRetry] = useState(0)

  const rows = useMemo(() => POOL.map((p) => {
    const ids = new Set(p.parts.map((x) => x.id))
    const mine = store.attempts.filter((a) => ids.has(a.id))
    const ok = mine.filter((a) => a.correct).length
    return {
      p, status: problemStatus(p, store.attempts), diff: diffOf(p).d, diffEst: diffOf(p).est, rate: mine.length ? ok / mine.length : null, n: mine.length,
      decks: [...new Set(p.parts.flatMap((x) => x.decks))] as DeckId[], topics: [...new Set(p.parts.map((x) => x.topic))],
    }
  }), [store.attempts])

  const archIn = ARCHETYPES.filter((a) => POOL.some((p) => p.archetype === a.id))
  const decksIn = DECKS.filter((d) => rows.some((r) => r.decks.includes(d.id)))
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return rows.filter((r) => {
      const p = r.p
      if (!oos && p.source.outOfScope) return false
      if (arch && p.archetype !== arch) return false
      if (deck && !r.decks.includes(deck)) return false
      if (diff && String(r.diff) !== diff) return false
      if (status && r.status !== status) return false
      if (official && (official === 'official') !== p.source.official) return false
      if (needle && !(`${p.title} ${p.en?.title ?? ''} ${p.id} ${r.topics.join(' ')} ${sourceText(p)}`).toLowerCase().includes(needle)) return false
      return true
    })
  }, [rows, q, arch, deck, diff, status, official, oos])

  const open = id ? POOL.find((p) => p.id === id) : undefined
  if (id) {
    if (!open) return <div className="pr-page"><h2>Problems</h2><p className="muted">No problem with id <code>{id}</code>.</p><button className="btn" onClick={() => go()}>← Back to the list</button></div>
    return <Session key={open.id + ':' + retry} title={titleOf(open)} problems={[open]} mode={mode} src="quiz" onExit={() => go()} onRetry={() => setRetry((n) => n + 1)} />
  }

  const pick = () => {
    const pool = shown.filter((r) => r.status !== 'solved')
    const from = pool.length ? pool : shown
    if (from.length) go(from[Math.floor(Math.random() * from.length)].p.id)
  }
  const solved = rows.filter((r) => r.status === 'solved').length
  const reset = () => { setQ(''); setArch(''); setDeck(''); setDiff(''); setStatus(''); setOfficial('') }
  const filtered = q || arch || deck || diff || status || official

  return (
    <div className="pr-page pb">
      <div className="pb-head">
        <div>
          <h2>Problems</h2>
          <p className="muted pb-sub">{solved} / {rows.length} solved · solved = a fully-correct Paper-mode attempt</p>
        </div>
        <div className="pb-mode">
          <div className="seg" role="group" aria-label="Mode">
            <button className={mode === 'test' ? 'on' : ''} onClick={() => setMode('test')}>Paper</button>
            <button className={mode === 'learn' ? 'on' : ''} onClick={() => setMode('learn')}>Lab</button>
          </div>
          <button className="btn primary" onClick={pick} disabled={!shown.length}>Pick one</button>
        </div>
      </div>

      <div className="pb-filters">
        <input className="pb-search" type="search" placeholder="Search title, topic or source…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search problems" />
        <select value={arch} onChange={(e) => setArch(e.target.value as '' | Archetype)} aria-label="Archetype"><option value="">All archetypes</option>{archIn.map((a) => <option key={a.id} value={a.id}>{a.titleEn}</option>)}</select>
        <select value={deck} onChange={(e) => setDeck(e.target.value as '' | DeckId)} aria-label="Deck"><option value="">All decks</option>{decksIn.map((d) => <option key={d.id} value={d.id}>{d.id} {d.titleEn}</option>)}</select>
        <select value={diff} onChange={(e) => setDiff(e.target.value as typeof diff)} aria-label="Difficulty"><option value="">Any difficulty</option><option value="1">Easy</option><option value="2">Medium</option><option value="3">Hard</option><option value="0">Unrated</option></select>
        <select value={status} onChange={(e) => setStatus(e.target.value as '' | Status)} aria-label="Status"><option value="">Any status</option><option value="new">New</option><option value="attempted">Attempted</option><option value="solved">Solved</option></select>
        <select value={official} onChange={(e) => setOfficial(e.target.value as typeof official)} aria-label="Source"><option value="">Official + unofficial</option><option value="official">Official only</option><option value="unofficial">Unofficial only</option></select>
        <label className="pr-check"><input type="checkbox" checked={oos} onChange={(e) => setOos(e.target.checked)} /> Out-of-scope (old KU1102)</label>
        {filtered ? <button className="btn sm ghost" onClick={reset}>Clear filters</button> : null}
      </div>
      <div className="muted pb-count">{shown.length} problem{shown.length === 1 ? '' : 's'}</div>

      <div className="pb-table" role="table" aria-label="Problems">
        <div className="pb-row pb-th" role="row">
          <span role="columnheader">Status</span><span role="columnheader">Title</span><span role="columnheader" className="pb-c-arch">Archetype</span>
          <span role="columnheader" className="pb-c-tags">Tags</span><span role="columnheader">Difficulty</span><span role="columnheader" className="pb-c-acc">Acceptance</span><span role="columnheader" className="pb-c-src">Source</span>
        </div>
        {shown.map((r) => (
          <a key={r.p.id} className="pb-row" role="row" href={`#/problems/${r.p.id}`}>
            <span className={'pb-st ' + r.status} title={STATUS_LABEL[r.status]} aria-label={STATUS_LABEL[r.status]}>{STATUS_ICON[r.status]}</span>
            <span className="pb-title"><b>{titleOf(r.p)}</b><small className="muted">{r.p.parts.length > 1 ? `${r.p.parts.length} parts` : r.p.parts[0]?.topic}</small></span>
            <span className="pb-c-arch muted">{ARCHETYPES.find((a) => a.id === r.p.archetype)?.titleEn}</span>
            <span className="pb-c-tags">{r.decks.map((d) => <i key={d} className="pb-deck" style={{ ['--c' as string]: deckColor(d) }}>{d}</i>)}{r.topics.slice(0, 2).map((t) => <span key={t} className="chip pb-topic">{t}</span>)}</span>
            <span className={'pb-diff d' + r.diff} title={r.diffEst ? 'Estimated from the content' : undefined}>{r.diffEst ? '≈ ' : ''}{DIFF[r.diff]}</span>
            <span className="pb-c-acc muted">{r.rate == null ? '–' : `${Math.round(r.rate * 100)}%`}{r.n ? <small> ({r.n})</small> : null}</span>
            <span className="pb-c-src"><span className="chip">{sourceText(r.p)}</span>{!r.p.source.official && <span className="chip warn">unofficial</span>}</span>
          </a>
        ))}
        {!shown.length && <div className="pb-empty muted">No problems match these filters.</div>}
      </div>
    </div>
  )
}
