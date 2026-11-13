// "Copy for AI": a problem (or one part of it) as self-contained Markdown, ready to paste into a chat with an AI tutor.
// Tables stay GFM, code stays fenced, flowcharts become Mermaid, figures become numbered links (their images can be
// copied separately as one PNG, see copyFiguresImage). `withAnswer` appends the key, model answer and explanation.
import type { PageRef, Problem, Question } from '../types'
import { flowToMermaid } from '../code/mermaid'
import { pageSrc } from '../lib/kit'
import { loc, pick, type Lang } from './Hints'
import { sourceText } from './pool'
import { KIND_LABEL } from './QuestionView'

type Fig = PageRef | string
const figUrl = (f: Fig) => new URL(typeof f === 'string' ? f : pageSrc(f.src, f.page), location.href).href
const figName = (f: Fig) => (typeof f === 'string' ? f.split('/').pop() ?? f : `${f.src.replace(/_/g, ' ')}, page ${f.page}`)
const L = (lang: Lang, id: string, en: string) => (lang === 'en' ? en : id)
const letter = (i: number) => String.fromCharCode(65 + i)
const fence = (code: string, info = '') => '```' + info + '\n' + code.replace(/\n+$/, '') + '\n```'
const numbered = (code: string) => code.replace(/\n+$/, '').split('\n').map((l, i) => `${String(i + 1).padStart(2)}| ${l}`).join('\n')
const mdTable = (cols: string[], rows: (string | number)[][]) =>
  [`| ${cols.join(' | ')} |`, `|${cols.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.map((c) => String(c).replace(/\|/g, '\\|')).join(' | ')} |`)].join('\n')

/** The data columns plus the code column the learner fills in (appended when the data has none). */
const codeCols = (q: Extract<Question, { kind: 'classify' }>) => (q.columns.includes(q.codeColumn) ? q.columns : [...q.columns, q.codeColumn])

/** Every figure of the problem and the given parts, in reading order (problem first). */
export function figuresOf(problem: Problem, parts: Question[] = problem.parts): Fig[] {
  return [...(problem.figures ?? []), ...parts.flatMap((q) => q.figures ?? [])]
}

export function problemMarkdown(problem: Problem, lang: Lang, opts: { parts?: Question[]; withAnswer?: boolean } = {}): string {
  const parts = opts.parts ?? problem.parts
  const figs = figuresOf(problem, parts)
  const figRef = (f: Fig) => `[Figure ${figs.indexOf(f) + 1}: ${figName(f)}](${figUrl(f)})`
  const out: string[] = []
  const title = (lang === 'en' && problem.en?.title) || problem.title
  out.push(`# ${title}`)
  out.push(`*${L(lang, 'Sumber', 'Source')}: ${sourceText(problem)}${problem.source.official ? '' : L(lang, ' (tidak resmi)', ' (unofficial)')} · WI1102 ${L(lang, 'Berpikir Komputasional', 'Computational Thinking')}, ITB*`)
  const intro = (lang === 'en' && problem.en?.intro) || problem.intro
  if (intro) out.push(intro)
  if (problem.figures?.length) out.push(problem.figures.map(figRef).join('\n'))
  const multi = problem.parts.length > 1
  for (const q of parts) {
    out.push(...partMarkdown(q, lang, { multi, withAnswer: !!opts.withAnswer, figRef, tableShown: /^\s*\|.*\|\s*$/m.test(intro ?? '') }))
  }
  if (figs.length) out.push(`> ${L(lang, 'Gambar ditempel terpisah sebagai gambar (atau buka tautannya).', 'The figures are pasted separately as an image (or open the links).')}`)
  return out.join('\n\n').replace(/\n{3,}/g, '\n\n') + '\n'
}

function partMarkdown(q: Question, lang: Lang, c: { multi: boolean; withAnswer: boolean; figRef: (f: Fig) => string; tableShown: boolean }): string[] {
  const t = loc(q, lang)
  const out: string[] = []
  const head = [c.multi && q.label ? `${L(lang, 'Bagian', 'Part')} ${q.label}` : '', KIND_LABEL[q.kind], q.weight != null && c.multi ? `${L(lang, 'bobot', 'weight')} ${Math.round(q.weight * 100)}%` : '']
  out.push(`## ${head.filter(Boolean).join(' · ')}`)
  out.push(t.stem)
  if (q.figures?.length) out.push(q.figures.map(c.figRef).join('\n'))

  // the material the learner works on, per kind
  switch (q.kind) {
    case 'mcq-multi':
      out.push(L(lang, 'Tandai setiap pernyataan ○ (benar) atau ✗ (salah):', 'Mark each statement ○ (true) or ✗ (false):'))
      out.push(t.options!.map((o, i) => `${i + 1}. ${o}`).join('\n'))
      break
    case 'mcq':
      out.push(t.options!.map((o, i) => `${letter(i)}. ${o}`).join('\n'))
      break
    case 'short':
      out.push(t.labels!.map((l) => `- ${l}: ______`).join('\n'))
      break
    case 'constraint':
      out.push(q.shape === 'grid'
        ? `${L(lang, 'Baris', 'Rows')}: ${q.entities.join(', ')}\n${L(lang, 'Kolom', 'Columns')}: ${q.slots.join(', ')}`
        : `${L(lang, 'Yang ditugaskan', 'To assign')}: ${q.entities.join(', ')}\n${L(lang, 'Ke', 'To')}: ${q.slots.join(', ')}${q.multi ? L(lang, ' (boleh lebih dari satu)', ' (more than one allowed)') : ''}`)
      break
    case 'classify':
      // the data table, unless the intro or stem already shows it (it usually does, translated)
      if (!c.tableShown && !/^\s*\|.*\|\s*$/m.test(t.stem)) out.push(mdTable(codeCols(q), q.rows.map((r) => codeCols(q).map((col, i) => (col === q.codeColumn ? '' : r[i] ?? '')))))
      break
    case 'robot':
      out.push(`${L(lang, 'Bahasa perintah robot', 'Robot command language')}: ${q.dialect} · ${L(lang, 'parameter', 'parameter')} ${q.param} (${L(lang, 'diuji untuk', 'tested for')} ${q.param} = ${q.nValues.join(', ')})`)
      break
    case 'program':
      out.push(`${L(lang, 'Jawab dalam', 'Answer in')}: ${q.required ? q.required : q.reps.join(' / ')}${q.mustUse?.length ? ` · ${L(lang, 'wajib memakai', 'must use')}: ${q.mustUse.join(', ')}` : ''}`)
      break
    case 'trace': {
      if (q.code) out.push(fence(q.code, 'python'))
      if (q.pseudo) out.push(fence(q.pseudo, 'text'))
      if (q.flow) out.push(fence(flowToMermaid(q.flow), 'mermaid'))
      if (q.stdin?.length) out.push(`${L(lang, 'Masukan', 'Input')} (${L(lang, 'satu per baris', 'one per line')}):\n${fence(q.stdin.join('\n'))}`)
      const what = q.ask === 'output' ? L(lang, 'Tuliskan keluarannya.', 'Write down the output.')
        : q.ask === 'table' ? L(lang, `Isi tabel nilai ${q.watch?.join(', ')} di setiap iterasi.`, `Fill in a table of ${q.watch?.join(', ')} at every iteration.`)
        : L(lang, `Berapa nilai akhir ${q.watch?.join(', ')}?`, `What are the final values of ${q.watch?.join(', ')}?`)
      out.push(`*${what}*`)
      break
    }
    case 'bug':
      out.push(fence(numbered(q.code), 'python'))
      break
    case 'open':
      break
  }

  if (!c.withAnswer) return out
  // ---- answer key ----
  const key: string[] = []
  switch (q.kind) {
    case 'mcq-multi':
      key.push(t.options!.map((_, i) => `${i + 1}. ${q.correct[i] ? '○' : '✗'}${t.why?.[i] ? ` — ${t.why[i]}` : ''}`).join('\n'))
      break
    case 'mcq':
      key.push(`${L(lang, 'Jawaban', 'Answer')}: ${q.answer.map(letter).join(', ')}`)
      if (t.why) key.push(t.why.map((w, i) => `${letter(i)}. ${w}`).join('\n'))
      break
    case 'short':
      key.push(q.blanks.map((b, i) => `- ${t.labels![i]}: ${b.accept[0]}`).join('\n'))
      break
    case 'open':
      if (t.answer) key.push(t.answer)
      if (t.keyPoints?.length) key.push(`${L(lang, 'Poin kunci', 'Key points')}:\n${t.keyPoints.map((k) => `- ${k}`).join('\n')}`)
      break
    case 'constraint':
      key.push(`${L(lang, 'Satu jawaban yang valid', 'One valid answer')}:\n${fence(JSON.stringify(q.solution, null, 1), 'json')}`)
      break
    case 'classify':
      key.push(`${L(lang, 'Tingkatan', 'Levels')}: ${q.model.levels.map((l) => l.attr).join(' → ')} · ${L(lang, 'pola kode', 'code pattern')}: \`${q.model.pattern}\``)
      key.push(mdTable(codeCols(q), q.rows.map((r, j) => codeCols(q).map((col, i) => (col === q.codeColumn ? q.model.codes[j] : r[i] ?? '')))))
      break
    case 'robot':
      key.push(fence(q.solution, 'text'))
      break
    case 'program':
      key.push(fence(q.solution.python, 'python'))
      if (q.solution.pseudo) key.push(fence(q.solution.pseudo, 'text'))
      break
    case 'bug':
      key.push(`${L(lang, 'Baris yang salah', 'Wrong lines')}: ${q.badLines.join(', ')}`)
      key.push(fence(q.fixed, 'python'))
      break
    case 'trace':
      key.push(L(lang, '(jalankan programnya untuk keluaran yang tepat)', '(run the program for the exact output)'))
      break
  }
  if ('rubric' in q && q.rubric?.length) key.push(`${L(lang, 'Rubrik', 'Rubric')} (0–4):\n${q.rubric.map((r) => `- **${r.score}**: ${pick(lang, r.desc, r.descEn)}`).join('\n')}`)
  if (t.explanation) key.push(`**${L(lang, 'Pembahasan', 'Explanation')}**\n\n${t.explanation}`)
  out.push(`### ${L(lang, 'Kunci & pembahasan', 'Answer & explanation')}`, ...key)
  return out
}

/* ---------------- figures as one image ---------------- */

const loadImg = (src: string) => new Promise<HTMLImageElement | null>((res) => {
  const im = new Image(); im.crossOrigin = 'anonymous'
  im.onload = () => res(im); im.onerror = () => res(null); im.src = src
})

/** All figures stacked into one PNG (chat inputs take one pasted image at a time), each labelled "Figure n". */
export async function figuresPng(figs: Fig[]): Promise<Blob> {
  const imgs = (await Promise.all(figs.map((f) => loadImg(figUrl(f))))).map((im, i) => ({ im, f: figs[i] })).filter((x) => x.im) as { im: HTMLImageElement; f: Fig }[]
  if (!imgs.length) throw new Error('no figure loaded')
  const W = Math.min(1400, Math.max(...imgs.map((x) => x.im.naturalWidth)))
  const LBL = imgs.length > 1 ? 44 : 0, GAP = 16
  const hs = imgs.map((x) => Math.round(x.im.naturalHeight * (W / x.im.naturalWidth)))
  const H = hs.reduce((s, h) => s + h + LBL + GAP, 0) - GAP
  const cv = Object.assign(document.createElement('canvas'), { width: W, height: H })
  const g = cv.getContext('2d')!
  g.fillStyle = '#fff'; g.fillRect(0, 0, W, H)
  let y = 0
  imgs.forEach((x, i) => {
    if (LBL) { g.fillStyle = '#111'; g.font = 'bold 26px system-ui, sans-serif'; g.fillText(`Figure ${figs.indexOf(x.f) + 1}: ${figName(x.f)}`, 8, y + 32); y += LBL }
    g.drawImage(x.im, 0, y, W, hs[i]); y += hs[i] + GAP
  })
  return new Promise((res, rej) => cv.toBlob((b) => (b ? res(b) : rej(new Error('toBlob failed'))), 'image/png'))
}
