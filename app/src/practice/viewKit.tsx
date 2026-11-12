// Small pieces shared by W1's views (Open, Bug, Short, Mcq, McqMulti) and the mock self-marking screen.
import { Md } from '../lib/kit'
import { RUBRIC_INDEX, type RubricRow, type RubricScore, type Sample } from '../types'
import type { Lang } from './Hints'
import { tr } from './ui'

/** Used when an item has no rubric of its own (generic wording, same 0–4 scale as the official guide). */
export const DEFAULT_RUBRIC: RubricRow[] = [
  { score: 4, desc: 'Jawaban benar, lengkap, dan disertai alasan yang tepat.', descEn: 'Correct, complete, and properly justified.' },
  { score: 3.5, desc: 'Hampir sempurna: benar dengan sedikit kekurangan kecil.', descEn: 'Nearly perfect: correct with a small gap.' },
  { score: 3, desc: 'Benar, tetapi alasan atau kelengkapan kurang.', descEn: 'Correct, but the reasoning or completeness is lacking.' },
  { score: 2, desc: 'Sebagian benar; ada bagian penting yang salah atau hilang.', descEn: 'Partly correct; an important part is wrong or missing.' },
  { score: 1, desc: 'Hanya sedikit yang relevan.', descEn: 'Only a little is relevant.' },
  { score: 0, desc: 'Tidak menjawab atau salah total.', descEn: 'No answer or entirely wrong.' },
]

/** Official-style rubric rows as a radio list, with weights shown by the caller. `value` = chosen score. */
export function RubricPicker({ rows, value, onChange, disabled, lang = 'en', suggested }: {
  rows?: RubricRow[]; value: RubricScore | null; onChange?: (s: RubricScore) => void; disabled?: boolean; lang?: Lang; suggested?: RubricScore | null
}) {
  const list = [...(rows?.length ? rows : DEFAULT_RUBRIC)].sort((a, b) => b.score - a.score)
  return (
    <fieldset className="pq-rubric" disabled={disabled}>
      <legend>{tr(lang, 'Rubrik penilaian resmi (0–4)', 'Official marking rubric (0–4)')}</legend>
      {list.map((r) => (
        <label key={r.score} className={'pq-rub' + (value === r.score ? ' on' : '')}>
          <input type="radio" name={'rub-' + list.map((x) => x.score).join('')} checked={value === r.score} onChange={() => onChange?.(r.score)} />
          <span className="pq-rub-sc"><b>{r.score}</b><small>{RUBRIC_INDEX[r.score]}</small></span>
          <span className="pq-rub-d"><Md inline>{(lang === 'en' && r.descEn) || r.desc}</Md>{suggested === r.score && value !== r.score && <em className="chip warn">{tr(lang, 'saran', 'suggested')}</em>}</span>
        </label>
      ))}
    </fieldset>
  )
}

/** Graded sample answers ("sample answer, scored 3.5 because …"). */
export function SamplesList({ samples, lang = 'en' }: { samples?: Sample[]; lang?: Lang }) {
  if (!samples?.length) return null
  return (
    <div className="pq-samples">
      <h4>{tr(lang, 'Contoh jawaban bernilai', 'Graded sample answers')}</h4>
      {samples.map((s, i) => (
        <div key={i} className="pq-sample">
          <div className="pq-sample-h"><span className="chip ok">{tr(lang, 'nilai', 'score')} {s.score} · {RUBRIC_INDEX[s.score]}</span></div>
          <blockquote><Md>{s.answer}</Md></blockquote>
          <p className="pq-sample-n"><Md inline>{(lang === 'en' && s.noteEn) || s.note}</Md></p>
        </div>
      ))}
    </div>
  )
}

/** The labelled "Explanation" box. */
export function Explanation({ children, lang = 'en' }: { children: string; lang?: Lang }) {
  return <div className="pq-expl"><h4>{tr(lang, 'Pembahasan', 'Explanation')}</h4><Md>{children}</Md></div>
}
