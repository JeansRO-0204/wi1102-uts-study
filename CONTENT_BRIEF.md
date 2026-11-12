# Brief: transcribe a source into the question bank

A first-year ITB student has the **WI1102 Berpikir Komputasional UTS on Saturday 14 Nov 2026**. It is handwritten, in Indonesian. Every practice, assignment and past-paper question goes into the bank of an interactive study site. You own **one bank file** (named in your task) and write nothing else.

## Read first (short)
- `PLAN.md` §0 (exam archetypes and marking) and §2 (design).
- `app/src/types.ts`: **the contract**. Every field you write must typecheck against it.
- `app/src/bank/samples.ts`: one worked example of every question kind. Copy the *shape*.
- `knowledge/SOURCES.md`: list of sources and which are scans.

## Reading your source
- Text: `knowledge/corpus.md` (sections `## [<src> h<page>]`) or `pdftotext -layout materials/<group>/<src>.pdf -`.
- Page images: `app/public/pages/<src>/NNN.jpg` (1-based, 3 digits). Use the Read tool on them **whenever** text is missing, scrambled, or the page has tables, figures, flowcharts or handwriting. Scanned sources have no text at all.
- Never edit `materials/`, page images, or other agents' files.

## Output: `app/src/bank/<yourfile>.ts`
```ts
import type { BankFile } from '../types'   // ONLY `import type` — the verifier loads this file with plain Node
const r = String.raw                        // use r`...` for anything with backslashes / code
export const bank: BankFile = { problems: [...], papers: [...], flashcards: [...] }
```
- **One `Problem` per numbered Soal / Problem / Exercise**, with its sub-parts (a, b, c…) as `parts`. A standalone question is a Problem with one part.
- **ids**: lowercase, stable, unique, prefixed with your file's short tag. Problem `uts25-s4`, its parts `uts25-s4a`, `uts25-s4b`. For MCQ lists: `uts25-i-03` (Bagian I no. 3).
- **`source`**: `kind`, `src` (the materials file stem), `label` as printed, `pages`, `official`, `year`, and `outOfScope: true` for older-course content outside the WI1102 syllabus.
- **`papers`**: if your source is a whole paper (UTS, mock, guide), add one `Paper` listing its problem ids in order, with minutes and a `note` for caveats.
- **`refs` / `figures`**: cite pages as `{ src, page }`. A figure that is essential to answer (terrain picture, flowchart, data table as an image) goes in `figures`. Prefer transcribing tables as GFM markdown in the stem, and also cite the page.

## Language
- **Main fields hold the source's own language, verbatim.** That covers `stem`, `options`, `intro` and rubric `desc` (fix only obvious OCR glitches). Most sources are Indonesian.
- For Indonesian sources, add English in `en` when it's cheap (`en.stem`, `en.options`, …).
- For English-only sources (practicum, extra exercises, Python module, some slides), keep the English in the main fields and leave `en` empty. The UI falls back gracefully.
- Hints, explanations and `why`: write them in Indonesian (natural, concise), plus `en` versions for Indonesian items when cheap.

## Choosing the kind (most specific that the UI can check)
| Source question | kind | notes |
|---|---|---|
| Bagian I "lingkari yang sesuai, silang yang tidak" | `mcq-multi` | `correct[]` per option; `why[]` per option. Never "all of the above". |
| Single-answer MCQ (mock-ups, older papers) | `mcq` | |
| Fill a value / name / one-line code | `short` | `type: 'number' \| 'text' \| 'code'`; list every acceptable form in `accept`; `wrong` for classic slips. |
| Write a program (Python / pseudocode / flowchart) | `program` | See the program rules below. |
| What is the output / trace the variables / read a flowchart | `trace` | Give `code` (Python), `pseudo`, or `flow`. **Never write the expected output yourself**: the verifier runs it. **`lineNotes` required.** |
| Find the bug | `bug` | |
| Robot / turtle commands with `repeat n` | `robot` | `dialect`: `'rody'` (`up/down/walk/repeat n` with indentation), `'ladybug'` (`Forward N`, `Left`, `Right`, `Repeat N ( … )`), else `'generic'`. Reference `solution` in that dialect; `nValues` e.g. `[1,2,3,4,5]`. |
| Constraint assignment / selection | `constraint` | `check` = Python `def check(ans) -> list[str]` (Indonesian messages, `[]` when valid), plus one valid `solution`. Explanation parts are separate `open` parts. |
| Hierarchical classification + codes | `classify` | The data table in `columns` / `rows`, plus a model answer. Reasoning parts are `open`. |
| Explain / justify / define (essay) | `open` | `answer` = model or alternative answer (say when many answers are valid), `rubric`, `keyPoints`. |

## Program items (`kind: 'program'`)
- `solution.python` follows the **course house style**:
  - `# Program Name`, a spec comment, `# DECLARATIONS` with `# x : int` lines, `# ALGORITHM`
  - `int(input())` / `float(input())`; parenthesised conditions `if (x > 0):`
  - `str()` concatenation in `print`; arrays as `[0 for i in range(N)]`
  - the `found` flag for searches; a spec comment under every `def`

  Match the source's own solution if it has one.
- Add `solution.pseudo` (Liem notation: `Program`, `KAMUS`, `ALGORITMA`, `←`, `input(x)`, `output(x)`, `if … then … else`, `while … do`, `repeat … until`, `i traversal [1..N]`, `{ comments }`) whenever the source gives pseudocode, **or** asks for pseudocode or a flowchart. Add `flow` (a `Flowchart` block tree) when the source shows or asks for a flowchart.
- `reps`: the representations it can be answered in. Default `['python','pseudo','flow']`. Set `required` when the paper demands one (e.g. "Buatlah flowchart" → a separate part with `required: 'flow'`).
- `tests`: 3–6 stdin cases covering the normal case **and edge cases** (N=1, empty / sentinel first, not found, all negative, ties, boundary values from the spec, e.g. selisih exactly 100). Mark edge tests with `edge`.
- `match`:
  - `'lenient'` by default.
  - `'exact'` only if the spec fixes the format exactly.
  - `'numbers'` when only the numbers matter.
  - `'judge'` + `judge(stdin, out, ref_out)` when the source says the output format is free ("Tampilan input dan output bebas"). The judge checks the *meaning*, e.g. the right city name appears.
- `mustUse`: e.g. `['subprogram','array']` when the paper requires them ("wajib membuat subprogram").
- `wrong`: 1–3 classic wrong programs (off-by-one, missing `str()`, init inside loop, print instead of return, sentinel counted, `>=` vs `>`), each with a targeted Indonesian message. The verifier requires each one to fail at least one test, so make the tests strong enough.
- `plan` (pseudocode outline, no Python), `skeleton` (solution with `___` blanks for the hard tokens), `hints` (2–3, nudge → method, **never the answer**), `work` (3–6 steps ending in the solution).
- **`lineNotes` are required** on every program solution, and `pseudoNotes` when there is pseudocode. Explain line by line (or per small block): **what the line does and why**, naming the rule or the trap. Examples:
  - "`range(1, N+1)`: batas atas tidak ikut, jadi +1"
  - "`max = T[0]`, bukan 0: gagal kalau semua negatif"
  - "`str()` wajib saat `+` dengan string"
  - "increment hanya di else agar i menunjuk elemen yang ditemukan"

  Link the matching card with `syntax: '<SyntaxId>'` where one applies. Also set the item-level `syntax: SyntaxId[]`. See `samples.ts`.
- `rubric` for past-paper / guide items (official wording), and `samples` (graded sample answers, see below).

## Rubrics and graded samples
- Use the **official 0–4 format** (`RubricRow { score: 4 | 3.5 | 3 | 2 | 1 | 0, desc }`) **verbatim** when the source has one (the 2024 Petunjuk Penilaian). Otherwise write one in the same style.
- Use part `weight`s from "Cara Penilaian" (e.g. 1a 0.4, 1b 0.6). Weights of a problem's parts must sum to 1, or be omitted for all parts.
- **The 2025 scan is a real student's marked attempt.** Transcribe their answers as `samples` with the marks written on the paper (e.g. a: 4, b: 3.5), plus a short `note` on why they got that mark. **Never write the student's name or NIM anywhere.** For Bagian I, the per-question marks (2, 4, −2, …) show which options were right: use them to infer and double-check `correct[]`.

## Correctness
- **Do not trust unofficial keys** (mock-ups, TUBAY, Gemini mock). Check every answer against the slides (`knowledge/corpus.md`, sources `D01`…`D11`). If the slides disagree with a key, follow the slides and say so in `explanation` with "Catatan: kunci sumber menyebut X; menurut slide …".
- Known slide errata (never teach them as true):
  - D04: `True or False` is shown as False.
  - D05:
    - `Print_Positive` uses `>=` against a `>` spec.
    - `N : float` is read with `int()`.
    - `str(rata)` is undefined.
    - The counter is claimed to end at `hmax+1`.
  - D06: `T[-1]` is called "undefined".
- When the source has no key, solve it yourself, set `explanation` carefully, and (for MCQ) state the reasoning per option in `why`.

## Finish
1. `cd app && npx tsc -b`: no errors in your file (ignore other files still being written).
2. `node build/verify.ts --only <yourPrefix>` from the repo root: must print `OK` for your items. It runs every program, wrong-variant, trace and constraint check in Python. Fix what it reports. Warnings about the robot simulator or the pseudocode/flowchart compiler not being built yet are expected.
3. Do not start a dev server.
4. Final report (≤ 150 words):
   - file and problem/question counts per kind
   - anything illegible or ambiguous you had to guess (with page)
   - keys you disputed
   - items marked out of scope
