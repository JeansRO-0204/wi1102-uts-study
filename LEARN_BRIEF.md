# Brief: write one guided lesson (Learn tab)

A first-year ITB student sits the **WI1102 Computational Thinking UTS on Saturday 14 Nov 2026** (handwritten, Indonesian paper). The study site gets a **Learn** tab: one guided lesson per slide deck, read section by section, with interactive bits along the way. You write **one lesson file** for one deck. Write nothing else.

## Read first
- `app/src/learn/types.ts`: **the contract** (Lesson, Section, Block kinds). Every field must typecheck.
- Your deck's slides: `knowledge/corpus.md`, sections `## [<src> hN]` (e.g. `D05_Conditionals_Repetition`). Read page images `app/public/pages/<src>/NNN.jpg` for diagrams, flowcharts and tables.
- `PLAN.md` §0: the exam archetypes, so you know what the UTS asks.
- `app/src/content/syntax.ts`: the syntax card ids, for `syntax` blocks.
- House style for code: see the "Program items" section of `CONTENT_BRIEF.md`, and copy `solution.python` / `solution.pseudo` from `app/src/bank/samples.ts`.
  - Python: `# DECLARATIONS` / `# ALGORITHM`, `int(input())`, parenthesised conditions, `str()` in `print`.
  - Pseudocode: Liem notation with `KAMUS` / `ALGORITMA`, `←`, `input(x)`, `output(x)`, `if … then … else`, `while … do`, `repeat … until`, `i traversal [1..N]`.

## Output: `app/src/learn/lessons/<deck lowercase>.ts`
```ts
import type { Lesson } from '../types'   // ONLY `import type`
const r = String.raw
export const lesson: Lesson = { deck: 'D05', title: '…', summary: '…', minutes: 35, goals: [...], examAngle: '…', sections: [...] }
```

## How to teach (this is the point)
- **Follow the deck's own order and terms**, faithfully: the slides are the source of truth (First-Element/Next-Element, sentinel, KAMUS/ALGORITMA, procedure vs function…). Cite pages with `refs` on `text` blocks.
- **Short sections (5–9 per lesson), each one idea.** In each:
  1. explain it plainly (2–5 short paragraphs or a table; no walls of text);
  2. show it (`code` with Python + pseudocode, and a `flow` flowchart where the slides use one; or a `trace` to step through);
  3. make the learner do something (`predict`, `quiz`, or an embedded bank `question`).

  Every section needs at least one interactive block; the verifier warns otherwise.
- **`key` boxes** hold the rules to remember. **`trap` boxes** hold the classic mistakes:
  - off-by-one in `range`
  - `max = 0` instead of the first element
  - a sentinel that gets counted
  - `print` instead of `return`
  - forgetting `str()`
  - `=` vs `==`
  - init inside the loop
  - `int()` on a float input
- **`predict` blocks** are short programs (≤ 12 lines) where the output is surprising enough to teach something (loop bounds, integer division, nested ifs…). Give the `explain` that's shown after the reveal. Never write the expected output: the site runs it.
- **`quiz`**:
  - 1 correct answer = single choice; several = "tick all that apply" (mirrors the exam's ○/✗ part).
  - `why[]` has one line per option, saying why that option is right or wrong.
  - Make distractors the real misconceptions.
- **`question` blocks** embed real exam/practice items from the bank (Lab mode, with hints).
  - Use 2–5 per lesson, placed where the theory they need has just been taught. Prefer official items: UTS, guide, tahun lalu, practicum, slides exercises.
  - Ids are **part ids**. Find them with `grep -n "decks: \['D05'" app/src/bank/*.ts`, or grep `id: '` near your topic. Check the item really fits the section.
- **Last section: "Exam drill / Summary"**. A recap table of the whole deck (Python ⇄ pseudocode ⇄ flowchart where relevant), the 3–5 traps, and 1–2 harder bank questions.
- `examAngle`: 2–4 sentences on how this deck shows up in the UTS (from PLAN.md §0 and the past papers).
- **Language: English** (the slides are English). Pseudocode keywords stay as in the slides. Don't translate code identifiers that come from the slides.
- **Known slide errata** (never teach them as true; mention the correct version if the slide is famous for it):
  - D04: `True or False` is shown as False.
  - D05:
    - `Print_Positive` uses `>=` against a `>` spec.
    - `N : float` is read with `int()`.
    - `str(rata)` is undefined.
    - The counter is claimed to end at `hmax+1`.
  - D06: `T[-1]` is called "undefined".

## Code blocks are verified
- `code.python` runs with `stdin` (one value per line; give realistic inputs so the example prints something meaningful).
- `code.pseudo` and `code.flow` are compiled by the site and **must print exactly the same output** as the Python for the same stdin. So keep output statements identical in all three; e.g. `output("Sum = ", s)` vs `print("Sum = " + str(s))` don't match on spacing. Use the same text. Check `samples.ts` for how pseudo `output(a, b)` prints (it joins with spaces, like Python's `print(a, b)`).
- `flow` is the block tree in `types.ts` (`FlowBlock`). Block text uses the pseudocode dialect.
- `notes` / `pseudoNotes` = `LineNote[]` (line numbers in range).
- `trace` code must run with its `stdin`.

## Finish
1. `cd app && npx tsc -b`: no errors in your file.
2. From the repo root: `node build/verify-learn.ts --only <DECK>`. Must end with `OK`. Fix every ✗, and fix ⚠ warnings unless there's a good reason.
3. Don't start a dev server or edit any other file.
4. Report (≤ 120 words): sections (titles), counts of code / trace / predict / quiz / question blocks, bank ids embedded, anything in the slides you found wrong or unclear (with page).
