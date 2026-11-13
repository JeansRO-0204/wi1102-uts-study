// Material library: copies the course PDFs into app/public/materials (gitignored; served next to the page images)
// and writes app/public/library.json, a per-page text index for the Library search. Runs before dev/build.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'app/public/materials')
mkdirSync(out, { recursive: true })
const pdfs = {}
for (const g of readdirSync(join(root, 'materials'))) {
  for (const f of readdirSync(join(root, 'materials', g))) {
    if (!f.endsWith('.pdf') || f.includes('attempt_scan')) continue // the original scan has a student's name: never served
    copyFileSync(join(root, 'materials', g, f), join(out, f))
    pdfs[f.replace(/\.pdf$/, '')] = true
  }
}
const chunks = join(root, 'knowledge/chunks.jsonl')
const localChunks = join(root, 'knowledge/local/chunks.jsonl') // local-only sources (gitignored), e.g. the practicum sheets
if (existsSync(chunks)) {
  const read = (f) => (existsSync(f) ? readFileSync(f, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)) : [])
  const pages = [...read(chunks), ...read(localChunks)]
    .filter((c) => existsSync(join(root, 'app/public/pages', c.src, '001.jpg'))) // no page images (e.g. the local-only practicum sheets in CI) → not indexed
    .map((c) => [c.src, c.page, c.text.replace(/[ \t]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim()])
  // page counts and the first page's pixel size (so the reader can reserve space before lazy images load)
  const counts = {}, dims = {}
  for (const [src] of pages) counts[src] = (counts[src] ?? 0) + 1
  for (const src of Object.keys(counts)) dims[src] = jpegSize(join(root, 'app/public/pages', src, '001.jpg'))
  writeFileSync(join(root, 'app/public/library.json'), JSON.stringify({ pdfs: Object.keys(pdfs), counts, dims, pages }))
}
console.log(`library: ${Object.keys(pdfs).length} PDFs`)

/** [width, height] from a JPEG's SOF marker. */
function jpegSize(file) {
  if (!existsSync(file)) return null
  const b = readFileSync(file)
  let i = 2
  while (i < b.length) {
    const m = b[i + 1], len = b.readUInt16BE(i + 2)
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]
    i += 2 + len
  }
  return null
}
