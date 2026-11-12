// Learn: guided lessons, one per deck. #/learn = the course map; #/learn/<DECK>[/<section>] = the lesson reader,
// one section at a time with a table of contents, "Mark done & continue", and a finish card that hands off to practice.
import { useEffect, useMemo, useRef } from 'react'
import { Md } from '../lib/kit'
import { DECKS, type DeckId } from '../types'
import { LESSON, LESSONS } from '../learn'
import type { Block, Lesson } from '../learn/types'
import { BlockView, QuestionList } from '../learn/Blocks'
import { finishLesson, markSection, resetLesson, setLast, useLearn, type LessonProgress } from '../learn/progress'
import { Ring, deckColor, setPreset } from '../practice/ui'
import '../learn/learn.css'

/** Two or more bank questions in a row render as one compact list. */
type Group = { kind: 'b'; b: Block } | { kind: 'qs'; items: { id: string; note?: string }[] }
function group(blocks: Block[]): Group[] {
  const out: Group[] = []
  for (const b of blocks) {
    const last = out[out.length - 1]
    if (b.t === 'question') {
      if (last?.kind === 'qs') last.items.push({ id: b.id, note: b.note })
      else out.push({ kind: 'qs', items: [{ id: b.id, note: b.note }] })
    } else out.push({ kind: 'b', b })
  }
  // a lone question keeps the roomier single card
  return out.map((g) => (g.kind === 'qs' && g.items.length === 1 ? { kind: 'b', b: { t: 'question', ...g.items[0] } } : g))
}
const go = (deck?: string, sec?: string) => { location.hash = '#/learn' + (deck ? '/' + deck + (sec ? '/' + sec : '') : '') }
const pct = (l: Lesson, p?: LessonProgress) => (p ? l.sections.filter((s) => p.done.includes(s.id)).length / l.sections.length : 0)

export default function Learn({ deck, section }: { deck?: string; section?: string }) {
  const lesson = deck ? LESSON.get(deck as DeckId) : undefined
  if (deck && !lesson) return <div className="pr-page"><p className="muted">No lesson for {deck} yet.</p><a className="btn" href="#/learn">← All lessons</a></div>
  return lesson ? <Reader lesson={lesson} section={section} /> : <CourseMap />
}

/* ---------------- course map ---------------- */

function CourseMap() {
  const prog = useLearn()
  const totalSecs = LESSONS.reduce((s, l) => s + l.sections.length, 0)
  const doneSecs = LESSONS.reduce((s, l) => s + l.sections.filter((x) => prog[l.deck]?.done.includes(x.id)).length, 0)
  const next = LESSONS.find((l) => pct(l, prog[l.deck]) < 1)
  return (
    <div className="pr-page ln">
      <div className="ln-head">
        <div>
          <h2>Learn</h2>
          <p className="muted">Guided lessons for every deck: short sections of theory, worked examples in Python, pseudocode and flowchart, things to run and predict, and real exam questions where they fit. Work through them in order, or jump to the deck you're weakest in.</p>
        </div>
        <div className="ln-overall"><Ring value={totalSecs ? doneSecs / totalSecs : 0} size={64} /><span className="muted">{doneSecs} / {totalSecs} sections</span></div>
      </div>
      {next && <button className="btn primary ln-next" onClick={() => go(next.deck, prog[next.deck]?.last)}>{prog[next.deck]?.done.length ? 'Continue' : 'Start'}: {next.deck} {next.title} →</button>}
      <ol className="ln-map">
        {DECKS.map((d) => {
          const l = LESSON.get(d.id)
          if (!l) return (
            <li key={d.id} className="ln-item missing" style={{ ['--c' as string]: d.color }}>
              <span className="ln-dot">{d.id.slice(1)}</span>
              <div className="ln-body"><b>{d.titleEn}</b><small className="muted">No slides for this deck in the library yet, so there's no lesson.</small></div>
            </li>
          )
          const p = prog[d.id], v = pct(l, p)
          return (
            <li key={d.id} className={'ln-item' + (v >= 1 ? ' done' : '')} style={{ ['--c' as string]: deckColor(d.id) }}>
              <span className="ln-dot">{v >= 1 ? '✓' : d.id.slice(1)}</span>
              <a className="ln-body" href={`#/learn/${d.id}${p?.last ? '/' + p.last : ''}`}>
                <b>{l.title}</b>
                <span className="ln-sum"><Md inline>{l.summary}</Md></span>
                <small className="muted">{l.sections.length} sections · ~{l.minutes} min{p?.done.length ? ` · ${Math.round(v * 100)}% done` : ''}</small>
                <span className="ln-bar"><i style={{ width: `${v * 100}%` }} /></span>
              </a>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ---------------- reader ---------------- */

function Reader({ lesson, section }: { lesson: Lesson; section?: string }) {
  const prog = useLearn()[lesson.deck]
  const idx = Math.max(0, lesson.sections.findIndex((s) => s.id === section))
  const atFinish = section === 'finish'
  const sec = lesson.sections[idx]
  const top = useRef<HTMLDivElement>(null)
  useEffect(() => { if (!atFinish && sec) setLast(lesson.deck, sec.id) }, [lesson.deck, sec, atFinish])
  useEffect(() => { top.current?.scrollIntoView({ block: 'start' }); document.getElementById('scroller')?.scrollTo({ top: 0 }) }, [section, lesson.deck])
  const done = useMemo(() => new Set(prog?.done ?? []), [prog])
  const v = pct(lesson, prog)
  const isLast = idx === lesson.sections.length - 1

  const next = () => {
    markSection(lesson.deck, sec.id)
    if (isLast) { finishLesson(lesson.deck); go(lesson.deck, 'finish') } else go(lesson.deck, lesson.sections[idx + 1].id)
  }

  return (
    <div className="lr" style={{ ['--c' as string]: deckColor(lesson.deck) }} ref={top}>
      <aside className="lr-toc" aria-label="Lesson contents">
        <a className="lr-back" href="#/learn">← All lessons</a>
        <div className="lr-toc-h"><span className="lr-deck">{lesson.deck}</span><b>{lesson.title}</b></div>
        <div className="ln-bar"><i style={{ width: `${v * 100}%` }} /></div>
        <ol>
          {lesson.sections.map((s, i) => (
            <li key={s.id}><a href={`#/learn/${lesson.deck}/${s.id}`} className={(!atFinish && i === idx ? 'on ' : '') + (done.has(s.id) ? 'done' : '')} aria-current={!atFinish && i === idx ? 'step' : undefined}>
              <span className="lr-n">{done.has(s.id) ? '✓' : i + 1}</span>{s.title}</a></li>
          ))}
          <li><a href={`#/learn/${lesson.deck}/finish`} className={atFinish ? 'on' : ''}><span className="lr-n">★</span>Wrap-up &amp; practice</a></li>
        </ol>
        {prog?.done.length ? <button className="btn sm ghost lr-reset" onClick={() => { if (confirm('Clear your progress for this lesson?')) resetLesson(lesson.deck) }}>Reset progress</button> : null}
      </aside>

      <article className="lr-main">
        {atFinish ? <Finish lesson={lesson} /> : (
          <>
            {idx === 0 && (
              <header className="lr-intro">
                <span className="lr-deck">{lesson.deck} · ~{lesson.minutes} min</span>
                <h1>{lesson.title}</h1>
                <p className="lr-sum"><Md inline>{lesson.summary}</Md></p>
                <div className="lr-goals"><b>By the end you can</b><ul>{lesson.goals.map((g, i) => <li key={i}><Md inline>{g}</Md></li>)}</ul></div>
                {lesson.examAngle && <div className="lr-exam"><b>On the exam</b><Md>{lesson.examAngle}</Md></div>}
              </header>
            )}
            <div className="lr-sec-h"><span className="muted">Section {idx + 1} of {lesson.sections.length}</span><h2>{sec.title}</h2></div>
            <div className="lr-blocks">{group(sec.blocks).map((g, i) => (g.kind === 'qs'
              ? <QuestionList key={`${sec.id}:${i}`} items={g.items} />
              : <BlockView key={`${sec.id}:${i}`} b={g.b} />))}</div>
            <nav className="lr-nav">
              {idx > 0 ? <a className="btn ghost" href={`#/learn/${lesson.deck}/${lesson.sections[idx - 1].id}`}>← {lesson.sections[idx - 1].title}</a> : <span />}
              <button className="btn primary" onClick={next}>{isLast ? 'Finish lesson ✓' : `Mark done & continue →`}</button>
            </nav>
            {!isLast && <p className="muted lr-upnext">Up next: {lesson.sections[idx + 1].title}</p>}
          </>
        )}
      </article>
    </div>
  )
}

function Finish({ lesson }: { lesson: Lesson }) {
  const nextL = LESSONS[LESSONS.findIndex((l) => l.deck === lesson.deck) + 1]
  const practice = (mode: 'learn' | 'test') => { setPreset({ deck: lesson.deck, mode, autostart: true }); location.hash = '#/latihan' }
  return (
    <div className="lr-finish">
      <div className="lr-finish-badge">★</div>
      <h1>{lesson.title}: done</h1>
      <p className="muted">Lock it in while it's fresh. Practise this deck's questions, then come back to any section from the contents.</p>
      <div className="lr-goals"><b>You should now be able to</b><ul>{lesson.goals.map((g, i) => <li key={i}><Md inline>{g}</Md></li>)}</ul></div>
      <div className="lr-finish-btns">
        <button className="btn primary" onClick={() => practice('learn')}>Practise {lesson.deck} with hints (Lab)</button>
        <button className="btn" onClick={() => practice('test')}>Practise {lesson.deck} exam-style (Paper)</button>
        <a className="btn ghost" href="#/kartu">Flashcards</a>
        {nextL && <a className="btn ghost" href={`#/learn/${nextL.deck}`}>Next lesson: {nextL.title} →</a>}
      </div>
    </div>
  )
}
