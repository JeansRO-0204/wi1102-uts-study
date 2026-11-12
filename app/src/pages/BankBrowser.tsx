// Raw bank browser (Phase 0 / QA tool): every problem with its parts, answers, rubric and baked expectations.
// Not the learner UI: archetype views replace this for practice. Useful to proof-read transcriptions.
import { useMemo, useState } from 'react'
import { Md, PageChip } from '../lib/kit'
import { EXPECTED, PROBLEMS } from '../bank'
import { ARCHETYPES, RUBRIC_INDEX, type Archetype, type PageRef, type Question } from '../types'
import { LangSwitch, loc, pick, useLang } from '../practice/Hints'
import './pages.css'

const fig = (f: PageRef | string, i: number) =>
  typeof f === 'string' ? <img key={i} className="pg-fig" src={f} alt="" /> : <PageChip key={i} r={f} />

function Answer({ q }: { q: Question }) {
  const exp = EXPECTED[q.id]
  switch (q.kind) {
    case 'mcq-multi': return <ul className="pg-opts">{q.options.map((o, i) => <li key={i} className={q.correct[i] ? 'ok' : 'no'}><b>{q.correct[i] ? '○' : '✗'}</b> <Md inline>{o}</Md>{q.why?.[i] && <small> · <Md inline>{q.why[i]}</Md></small>}</li>)}</ul>
    case 'mcq': return <ul className="pg-opts">{q.options.map((o, i) => <li key={i} className={q.answer.includes(i) ? 'ok' : 'no'}><Md inline>{o}</Md></li>)}</ul>
    case 'short': return <ul>{q.blanks.map((b, i) => <li key={i}>{b.label}: <code>{b.accept.join(' | ')}</code></li>)}</ul>
    case 'open': return <Md>{q.answer}</Md>
    case 'program': return <><pre className="pg-code">{q.solution.python}</pre>{q.solution.pseudo && <pre className="pg-code">{q.solution.pseudo}</pre>}<small className="muted">{q.tests.length} tests · match: {q.match}{q.mustUse ? ` · required: ${q.mustUse.join(', ')}` : ''} · {q.wrong?.length ?? 0} wrong variants</small>{exp?.outputs && <pre className="pg-code out">{exp.outputs[0]}</pre>}</>
    case 'trace': return <><pre className="pg-code">{q.code ?? q.pseudo ?? JSON.stringify(q.flow, null, 1)}</pre>{exp?.output != null && <pre className="pg-code out">{exp.output}</pre>}{exp?.table && <small className="muted">{exp.table.length} table rows</small>}</>
    case 'robot': return <><pre className="pg-code">{q.solution}</pre><small className="muted">{q.dialect} · {q.param} ∈ {q.nValues.join(', ')}{exp?.paths ? ' · paths computed' : ''}</small></>
    case 'constraint': return <><code>{JSON.stringify(q.solution)}</code><pre className="pg-code">{q.check}</pre></>
    case 'classify': return <><div>{q.model.pattern}</div><code>{q.model.codes.join(', ')}</code></>
    case 'bug': return <pre className="pg-code">{q.fixed}</pre>
  }
}

export default function BankBrowser({ id }: { id?: string }) {
  const [lang, setLang] = useLang()
  const initialA = new URLSearchParams(location.hash.split('?')[1] ?? '').get('a') as Archetype | null
  const [arch, setArch] = useState<Archetype | 'all'>(initialA ?? 'all')
  const [q, setQ] = useState('')
  const list = useMemo(() => PROBLEMS.filter((p) => (arch === 'all' || p.archetype === arch) && (!id || p.id === id)
    && (!q || JSON.stringify(p).toLowerCase().includes(q.toLowerCase()))), [arch, q, id])
  return (
    <div className="pg">
      <div className="row-wrap pg-filter">
        <div className="seg">
          <button className={arch === 'all' ? 'on' : ''} onClick={() => setArch('all')}>All</button>
          {ARCHETYPES.map((a) => <button key={a.id} className={arch === a.id ? 'on' : ''} onClick={() => setArch(a.id)}>{lang === 'en' ? a.titleEn : a.title}</button>)}
        </div>
        <input className="pg-search" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
        <span className="muted">{list.length} problems</span>
        <LangSwitch lang={lang} setLang={setLang} />
      </div>
      {list.map((p) => (
        <article key={p.id} className="pg-prob">
          <header><b>{(lang === 'en' && p.en?.title) || p.title}</b> <span className="chip">{p.source.kind}{p.source.year ? ' ' + p.source.year : ''}{p.source.label ? ' · ' + p.source.label : ''}</span>{!p.source.official && <span className="chip warn">unofficial</span>}{p.source.outOfScope && <span className="chip err">out of scope</span>} <code className="muted">{p.id}</code></header>
          {p.intro && <Md>{(lang === 'en' && p.en?.intro) || p.intro}</Md>}
          {p.figures && <div className="row-wrap">{p.figures.map(fig)}</div>}
          {p.parts.map((qq) => {
            const t = loc(qq, lang)
            return (
              <section key={qq.id} className="pg-part">
                <div className="row-wrap"><b>{qq.label ?? ''}</b><span className="chip">{qq.kind}</span><span className="chip">{qq.decks.join(' ')} · {qq.topic}</span>{qq.weight != null && <span className="chip">weight {Math.round(qq.weight * 100)}%</span>}<code className="muted">{qq.id}</code></div>
                <Md>{t.stem}</Md>
                {qq.figures && <div className="row-wrap">{qq.figures.map(fig)}</div>}
                <details><summary>Answer / key</summary><Answer q={qq} />
                  {'rubric' in qq && qq.rubric && <table className="pg-rubric"><tbody>{qq.rubric.map((r) => <tr key={r.score}><td>{r.score}</td><td>{RUBRIC_INDEX[r.score]}</td><td>{pick(lang, r.desc, r.descEn)}</td></tr>)}</tbody></table>}
                  {t.hints.length > 0 && <ol className="muted">{t.hints.map((h, i) => <li key={i}><Md inline>{h}</Md></li>)}</ol>}
                  <Md>{t.explanation}</Md>
                  {qq.refs && <div className="row-wrap">{qq.refs.map((r, i) => <PageChip key={i} r={r} />)}</div>}
                </details>
              </section>
            )
          })}
        </article>
      ))}
    </div>
  )
}
