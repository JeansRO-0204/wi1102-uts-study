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
import { TOPIC_GROUPS, TOPIC_LABEL, groupsOfP } from './topics'
const diffOf = (p: Problem) => diffOfP(p)
const titleOf = (p: Problem) => p.en?.title ?? p.title
type SortKey = 'default' | 'title' | 'difficulty' | 'acceptance' | 'status' | 'deck' | 'topic'
const SORTS: { k: SortKey; label: string }[] = [
  { k: 'default', label: 'Source order' }, { k: 'title', label: 'Title' }, { k: 'difficulty', label: 'Difficulty' },
  { k: 'acceptance', label: 'Acceptance' }, { k: 'status', label: 'Status' }, { k: 'deck', label: 'Deck' }, { k: 'topic', label: 'Topic' },
]
const STATUS_ORDER: Record<Status, number> = { new: 0, attempted: 1, solved: 2 }
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
  const [topicRaw, setTopic] = useLocalState<string>('bk.pb.topic', '')
  const [sort, setSort] = useLocalState<{ k: SortKey; dir: 1 | -1 }>('bk.pb.sort', { k: 'default', dir: 1 })
  const sortBy = (k: SortKey) => setSort((s) => (s.k === k ? { k, dir: s.dir === 1 ? -1 : 1 } : { k, dir: 1 }))
  const [retry, setRetry] = useState(0)

  const rows = useMemo(() => POOL.map((p) => {
    const ids = new Set(p.parts.map((x) => x.id))
    const mine = store.attempts.filter((a) => ids.has(a.id))
    const ok = mine.filter((a) => a.correct).length
    return {
      p, status: problemStatus(p, store.attempts), diff: diffOf(p).d, diffEst: diffOf(p).est, rate: mine.length ? ok / mine.length : null, n: mine.length,
      decks: [...new Set(p.parts.flatMap((x) => x.decks))] as DeckId[], topics: [...new Set(p.parts.map((x) => x.topic))], groups: groupsOfP(p),
    }
  }), [store.attempts])

  // a remembered topic that no longer has problems (taxonomy changed) is ignored
  const topic = topicRaw && rows.some((r) => (oos || !r.p.source.outOfScope) && r.groups.includes(topicRaw)) ? topicRaw : ''
  const archIn = ARCHETYPES.filter((a) => POOL.some((p) => p.archetype === a.id))
  const decksIn = DECKS.filter((d) => rows.some((r) => r.decks.includes(d.id)))
  const topicCount = useMemo(() => {
    const c: Record<string, number> = {}
    for (const r of rows) if (oos || !r.p.source.outOfScope) for (const g of r.groups) c[g] = (c[g] ?? 0) + 1
    return c
  }, [rows, oos])
  const topicsIn = [...TOPIC_GROUPS.map((g) => g.id), 'other'].filter((id) => topicCount[id])
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const list = rows.filter((r) => {
      const p = r.p
      if (!oos && p.source.outOfScope) return false
      if (arch && p.archetype !== arch) return false
      if (deck && !r.decks.includes(deck)) return false
      if (topic && !r.groups.includes(topic)) return false
      if (diff && String(r.diff) !== diff) return false
      if (status && r.status !== status) return false
      if (official && (official === 'official') !== p.source.official) return false
      if (needle && !(`${p.title} ${p.en?.title ?? ''} ${p.id} ${r.topics.join(' ')} ${sourceText(p)}`).toLowerCase().includes(needle)) return false
      return true
    })
    if (sort.k === 'default') return sort.dir === 1 ? list : [...list].reverse()
    const deckIx = (r: (typeof rows)[number]) => Math.min(...r.decks.map((d) => DECKS.findIndex((x) => x.id === d)))
    const topicIx = (r: (typeof rows)[number]) => { const i = TOPIC_GROUPS.findIndex((g) => g.id === r.groups[0]); return i < 0 ? 99 : i }
    const key = (r: (typeof rows)[number]): number | string => {
      switch (sort.k) {
        case 'title': return titleOf(r.p).replace(/^[^\p{L}]+/u, '').toLowerCase() // ignore leading numbering
        case 'difficulty': return r.diff
        case 'status': return STATUS_ORDER[r.status]
        case 'deck': return deckIx(r)
        case 'topic': return topicIx(r)
        default: return 0
      }
    }
    return list.map((r, i) => ({ r, i })).sort((a, b) => {
      if (sort.k === 'acceptance') { // never-tried rows always last
        if (a.r.rate == null || b.r.rate == null) return (a.r.rate == null ? 1 : 0) - (b.r.rate == null ? 1 : 0) || a.i - b.i
        return (a.r.rate - b.r.rate) * sort.dir || a.i - b.i
      }
      const x = key(a.r), y = key(b.r)
      const c = typeof x === 'string' && typeof y === 'string' ? x.localeCompare(y, 'en', { numeric: true }) : x < y ? -1 : x > y ? 1 : 0
      return c * sort.dir || a.i - b.i
    }).map((x) => x.r)
  }, [rows, q, arch, deck, topic, diff, status, official, oos, sort])

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
  const reset = () => { setQ(''); setArch(''); setDeck(''); setTopic(''); setDiff(''); setStatus(''); setOfficial('') }
  const filtered = q || arch || deck || topic || diff || status || official

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
        <select value={topic} onChange={(e) => setTopic(e.target.value)} aria-label="Topic"><option value="">All topics</option>{topicsIn.map((t) => <option key={t} value={t}>{TOPIC_LABEL[t]} ({topicCount[t]})</option>)}</select>
        <select value={deck} onChange={(e) => setDeck(e.target.value as '' | DeckId)} aria-label="Deck"><option value="">All decks</option>{decksIn.map((d) => <option key={d.id} value={d.id}>{d.id} {d.titleEn}</option>)}</select>
        <select value={diff} onChange={(e) => setDiff(e.target.value as typeof diff)} aria-label="Difficulty"><option value="">Any difficulty</option><option value="1">Easy</option><option value="2">Medium</option><option value="3">Hard</option><option value="0">Unrated</option></select>
        <select value={status} onChange={(e) => setStatus(e.target.value as '' | Status)} aria-label="Status"><option value="">Any status</option><option value="new">New</option><option value="attempted">Attempted</option><option value="solved">Solved</option></select>
        <select value={official} onChange={(e) => setOfficial(e.target.value as typeof official)} aria-label="Source"><option value="">Official + unofficial</option><option value="official">Official only</option><option value="unofficial">Unofficial only</option></select>
        <label className="pr-check"><input type="checkbox" checked={oos} onChange={(e) => setOos(e.target.checked)} /> Out-of-scope (old KU1102)</label>
        {filtered ? <button className="btn sm ghost" onClick={reset}>Clear filters</button> : null}
      </div>
      <div className="pb-count">
        <span className="muted">{shown.length} problem{shown.length === 1 ? '' : 's'}{topic ? <> in <b>{TOPIC_LABEL[topic]}</b></> : null}</span>
        <span className="pb-sort">
          <label className="muted" htmlFor="pb-sort">Sort by</label>
          <select id="pb-sort" value={sort.k} onChange={(e) => setSort({ k: e.target.value as SortKey, dir: 1 })}>{SORTS.map((s) => <option key={s.k} value={s.k}>{s.label}</option>)}</select>
          <button className="btn sm ghost" onClick={() => setSort((s) => ({ ...s, dir: s.dir === 1 ? -1 : 1 }))} aria-label={sort.dir === 1 ? 'Ascending; switch to descending' : 'Descending; switch to ascending'} title="Reverse order">{sort.dir === 1 ? '↑' : '↓'}</button>
        </span>
      </div>

      <div className="pb-table" role="table" aria-label="Problems">
        <div className="pb-row pb-th" role="row">
          <SortHead k="status" sort={sort} on={sortBy}>Status</SortHead><SortHead k="title" sort={sort} on={sortBy}>Title</SortHead><span role="columnheader" className="pb-c-arch">Archetype</span>
          <SortHead k="topic" sort={sort} on={sortBy} className="pb-c-tags">Topics</SortHead><SortHead k="difficulty" sort={sort} on={sortBy}>Difficulty</SortHead><SortHead k="acceptance" sort={sort} on={sortBy} className="pb-c-acc">Acceptance</SortHead><SortHead k="deck" sort={sort} on={sortBy} className="pb-c-src">Source</SortHead>
        </div>
        {shown.map((r) => (
          <a key={r.p.id} className="pb-row" role="row" href={`#/problems/${r.p.id}`}>
            <span className={'pb-st ' + r.status} title={STATUS_LABEL[r.status]} aria-label={STATUS_LABEL[r.status]}>{STATUS_ICON[r.status]}</span>
            <span className="pb-title"><b>{titleOf(r.p)}</b><small className="muted">{r.p.parts.length > 1 ? `${r.p.parts.length} parts` : r.p.parts[0]?.topic}</small></span>
            <span className="pb-c-arch muted">{ARCHETYPES.find((a) => a.id === r.p.archetype)?.titleEn}</span>
            <span className="pb-c-tags">{r.decks.map((d) => <i key={d} className="pb-deck" style={{ ['--c' as string]: deckColor(d) }}>{d}</i>)}{r.groups.slice(0, 3).map((g) => <button key={g} type="button" className={'chip pb-topic' + (g === topic ? ' on' : '')} title={`Show only ${TOPIC_LABEL[g]}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setTopic(g === topic ? '' : g) }}>{TOPIC_LABEL[g]}</button>)}</span>
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

function SortHead({ k, sort, on, className, children }: { k: SortKey; sort: { k: SortKey; dir: 1 | -1 }; on: (k: SortKey) => void; className?: string; children: string }) {
  const active = sort.k === k
  return (
    <span role="columnheader" className={className} aria-sort={active ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>
      <button type="button" className={'pb-sorth' + (active ? ' on' : '')} onClick={() => on(k)}>{children}<i aria-hidden>{active ? (sort.dir === 1 ? '▲' : '▼') : '↕'}</i></button>
    </span>
  )
}
