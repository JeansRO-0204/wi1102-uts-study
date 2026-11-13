// Flashcards: Leitner boxes (1, 2, 4, 8 days). Space flips, 1–4 grades, Z changes the last grade.
import { useEffect, useMemo, useRef, useState } from 'react'
import { FLASHCARDS } from '../bank'
import { Md, isTyping } from '../lib/kit'
import { DECKS, type DeckId, type Flashcard } from '../types'
import { ItemLangToggle, UI_LANG, useLang } from './Hints'
import { shuffled } from './pool'
import { BOX_DAYS, applyGrade, getStore, gradeCard, isDue, updateStore, usePStore, type CardState, type Grade } from './store'
import { Bar, deckColor, tr } from './ui'
import './practice.css'

const nextLabel = (box: number, g: Grade) => (g === 'again' ? '1 min' : `${BOX_DAYS[applyGrade(box, g) - 1]} d`)

export default function Cards() {
  const lang = UI_LANG
  const [cardLang] = useLang()
  const GRADES: { g: Grade; label: string; key: string }[] = [
    { g: 'again', label: tr(lang, 'Lupa', 'Again'), key: '1' }, { g: 'hard', label: tr(lang, 'Sulit', 'Hard'), key: '2' },
    { g: 'good', label: tr(lang, 'Bisa', 'Good'), key: '3' }, { g: 'easy', label: tr(lang, 'Mudah', 'Easy'), key: '4' },
  ]
  const store = usePStore()
  const [deck, setDeck] = useState<DeckId | 'all'>('all')
  const [topic, setTopic] = useState('all')
  const [ahead, setAhead] = useState(false)
  const decks = DECKS.filter((d) => FLASHCARDS.some((c) => c.decks.includes(d.id)))
  const topics = useMemo(() => [...new Set(FLASHCARDS.filter((c) => deck === 'all' || c.decks.includes(deck)).map((c) => c.topic))], [deck])
  const pool = useMemo(() => FLASHCARDS.filter((c) => (deck === 'all' || c.decks.includes(deck)) && (topic === 'all' || c.topic === topic)), [deck, topic])
  const dueNow = pool.filter((c) => isDue(store.cards[c.id]))
  const [queue, setQueue] = useState<string[]>([])
  const [flipped, setFlipped] = useState(false)
  const [last, setLast] = useState<{ id: string; prev: CardState | undefined } | null>(null)
  const [changing, setChanging] = useState(false)
  const [done, setDone] = useState(0)
  const byId = useMemo(() => new Map(FLASHCARDS.map((c) => [c.id, c])), [])

  const rebuild = () => { setQueue(shuffled((ahead ? pool : dueNow).map((c) => c.id))); setFlipped(false); setLast(null); setDone(0) }
  useEffect(rebuild, [deck, topic, ahead]) // eslint-disable-line react-hooks/exhaustive-deps

  const cur: Flashcard | undefined = byId.get(queue[0])
  const box = (cur ? store.cards[cur.id]?.box : undefined) ?? 1
  const txt = (c: Flashcard, side: 'front' | 'back') => (cardLang === 'en' && c.en?.[side]) || c[side]

  const grade = (g: Grade) => {
    if (changing && last) {
      updateStore((s) => { const cards = { ...s.cards }; if (last.prev) cards[last.id] = last.prev; else delete cards[last.id]; return { ...s, cards } })
      gradeCard(last.id, g)
      setChanging(false)
      return
    }
    if (!cur) return
    setLast({ id: cur.id, prev: getStore().cards[cur.id] })
    gradeCard(cur.id, g)
    setQueue((q) => (g === 'again' ? [...q.slice(1), q[0]] : q.slice(1)))
    if (g !== 'again') setDone((d) => d + 1)
    setFlipped(false)
  }
  const gradeRef = useRef(grade); gradeRef.current = grade
  const st = useRef({ flipped, cur, last }); st.current = { flipped, cur, last }
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (isTyping(e)) return
      if (e.key === ' ' || e.key === 'Enter') { if (t?.tagName === 'BUTTON') return; e.preventDefault(); if (st.current.cur) setFlipped((x) => !x) }
      else if (['1', '2', '3', '4'].includes(e.key) && (st.current.flipped || changing)) gradeRef.current(GRADES[Number(e.key) - 1].g)
      else if (e.key.toLowerCase() === 'z' && st.current.last) setChanging((c) => !c)
    }
    window.addEventListener('keydown', f)
    return () => window.removeEventListener('keydown', f)
  }, [changing]) // eslint-disable-line react-hooks/exhaustive-deps

  const counts = [1, 2, 3, 4].map((b) => pool.filter((c) => store.cards[c.id]?.box === b).length)
  const fresh = pool.filter((c) => !store.cards[c.id]).length
  const lastCard = last ? byId.get(last.id) : undefined
  const dk = (c: Flashcard) => c.decks[0]

  return (
    <div className="pr-page pr-cards">
      <div className="row">
        <h2>{tr(lang, 'Kartu', 'Flashcards')}</h2>
        <span className="grow" />
        {cur?.en && <ItemLangToggle srcLang="id" />}
        <span className="chip warn">{dueNow.length} {tr(lang, 'jatuh tempo', 'due')}</span><span className="chip">{pool.length} {tr(lang, 'kartu', 'cards')}</span>
      </div>
      {!FLASHCARDS.length && <div className="pr-banner">{tr(lang, 'Belum ada kartu di bank.', 'No flashcards in the bank yet.')}</div>}
      <div className="row pr-filters">
        <select value={deck} onChange={(e) => { setDeck(e.target.value as DeckId | 'all'); setTopic('all') }}>
          <option value="all">{tr(lang, 'Semua deck', 'All decks')}</option>{decks.map((d) => <option key={d.id} value={d.id}>{d.id} · {d.short}</option>)}
        </select>
        <select value={topic} onChange={(e) => setTopic(e.target.value)}><option value="all">{tr(lang, 'Semua topik', 'All topics')}</option>{topics.map((t) => <option key={t}>{t}</option>)}</select>
        <label className="pr-check"><input type="checkbox" checked={ahead} onChange={(e) => setAhead(e.target.checked)} /> {tr(lang, 'Belajar lebih awal (termasuk belum jatuh tempo)', 'Study ahead (include not-due)')}</label>
      </div>
      <div className="pr-cards-grid">
        <div>
          {cur ? (
            <>
              <div className="pr-prog"><div style={{ width: `${(done / Math.max(1, done + queue.length)) * 100}%` }} /></div>
              <div className={'pr-card3d' + (flipped ? ' flipped' : '')} onClick={() => setFlipped(!flipped)} role="button" tabIndex={0} aria-label={tr(lang, 'Balik kartu', 'Flip card')}>
                <div className="pr-face front">
                  <div className="pr-face-meta"><span className="pr-lec" style={{ background: deckColor(dk(cur)) }}>{dk(cur)}</span> {cur.topic} <span className="muted">· {tr(lang, 'kotak', 'box')} {box}</span></div>
                  <div className="pr-face-body"><Md>{txt(cur, 'front')}</Md></div>
                  <div className="pr-face-hint">{tr(lang, 'Spasi / ketuk untuk membalik', 'Space / tap to flip')}</div>
                </div>
                <div className="pr-face back">
                  <div className="pr-face-meta"><span className="pr-lec" style={{ background: deckColor(dk(cur)) }}>{dk(cur)}</span> {cur.topic}</div>
                  <div className="pr-face-body"><Md>{txt(cur, 'back')}</Md></div>
                </div>
              </div>
              <div className="pr-grades">
                {GRADES.map((x) => (
                  <button key={x.g} className={'pr-grade ' + x.g} disabled={!flipped && !changing} onClick={() => grade(x.g)}>
                    <b>{x.label}</b><small>{nextLabel(box, x.g)} · {tr(lang, 'tombol', 'key')} {x.key}</small>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="pr-empty"><h3>{pool.length ? tr(lang, 'Semua sudah beres', 'All caught up') : tr(lang, 'Tidak ada kartu di pilihan ini', 'No cards in this selection')}</h3>
              <p className="muted">{pool.length ? tr(lang, `Tidak ada yang jatuh tempo. Kamu mengulas ${done} kartu sesi ini.`, `Nothing is due. You reviewed ${done} cards this session.`) : tr(lang, 'Pilih deck atau topik lain.', 'Pick a different deck or topic.')}</p>
              {pool.length > 0 && <button className="btn primary" onClick={() => setAhead(true)}>{tr(lang, 'Belajar lebih awal', 'Study ahead')}</button>}
              {changing && <div className="pr-grades">{GRADES.map((x) => <button key={x.g} className={'pr-grade ' + x.g} onClick={() => grade(x.g)}><b>{x.label}</b><small>{x.key}</small></button>)}</div>}</div>
          )}
          {last && lastCard && (
            <div className="pr-lastgrade">
              <span>{tr(lang, 'Terakhir', 'Last')}: <b>{txt(lastCard, 'front').replace(/[$*`]/g, '').slice(0, 42)}…</b> → <b>{store.cards[last.id]?.last}</b></span>
              <button className="btn sm" onClick={() => setChanging(!changing)}>{changing ? tr(lang, 'Batal', 'Cancel') : tr(lang, 'Ubah nilai', 'Change grade')} <kbd>Z</kbd></button>
            </div>
          )}
        </div>
        <aside className="pr-card">
          <h3>{tr(lang, 'Kotak Leitner', 'Leitner boxes')}</h3>
          <Bar value={fresh / Math.max(1, pool.length)} color="#94a3b8" label={tr(lang, 'Baru', 'New')} right={fresh} />
          {counts.map((n, i) => <Bar key={i} value={n / Math.max(1, pool.length)} color="var(--accent)" label={`${tr(lang, 'Kotak', 'Box')} ${i + 1} · ${BOX_DAYS[i]} ${tr(lang, 'hr', 'd')}`} right={n} />)}
          <p className="muted pr-small">{tr(lang, 'Lupa → kotak 1 · Sulit → tetap · Bisa → +1 · Mudah → +2.', 'Again → box 1 · Hard → stay · Good → +1 · Easy → +2.')}</p>
        </aside>
      </div>
    </div>
  )
}
