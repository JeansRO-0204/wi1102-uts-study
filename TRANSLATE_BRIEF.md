# Brief: make the question bank English-first

The study site is **English by default**. Read `app/src/types.ts` (header comment, `Provenance.lang`, `En`, `LineNote`, `RubricRow.descEn`, `Sample.noteEn`, the `msgEn` fields, `ConstraintQ.check`) and `app/src/bank/samples.ts` for shapes.

Every problem has `source.lang`:
- **`lang: 'id'`**: the source is Indonesian (UTS papers, grading guide, tahun lalu, Latihan, mocks, older KU1102, TUBAY, the Computing-Impact bank).
  - Keep every main field **as is**. It is the verbatim Indonesian, which the learner can toggle to (the exam is in Indonesian).
  - Add **complete, natural English** for every learner-facing field:
    - `en.stem`, `en.options`, `en.why`, `en.explanation`, `en.hints`, `en.work`, `en.answer`, `en.keyPoints`, `en.plan`, `en.labels`
    - problem `en.title`, `en.intro`
    - `rubric[].descEn`, `samples[].noteEn`, `lineNotes[].en`, `pseudoNotes[].en`
    - `wrong[].msgEn` (program) and `blanks[].wrong[].msgEn`
    - flashcards `en.front` / `en.back`
    - `Paper.note` in English (move the Indonesian to `noteId`)
  - Constraint `check` functions: return **pairs** `[indonesian, english]` instead of plain strings.
  - Code stays code. Translate only comments inside a code listing **if** they are not part of the verbatim source; if the listing is from the paper, leave it verbatim.
  - Keep proper nouns, names and data values unchanged (Asep, P1, "Pemain 1", "Seri"…). When an expected *program output* string is Indonesian because the paper specifies it, keep it in the code, and mention the meaning in English in the explanation.
- **`lang: 'en'`**: the source is English (slides D01–D11, Praktikum, Python module, D05 extra exercises).
  - Everything the site shows must be **English in the main fields**: stem, explanation, hints, work, plan, `lineNotes[].note`, `pseudoNotes[].note`, `wrong[].msg`, rubric `desc`, sample `note`, open `answer` / `keyPoints`, flashcards `front` / `back`, paper `note`.
  - Earlier agents wrote many of these in Indonesian: **rewrite them in English in place** and delete any now-unneeded `en` mirror.
  - Do not add an `en` mirror for these items.
  - Code comments the site added (house-style `# DECLARATIONS` etc. are fine) should be English.

**Quality bar:** clear, natural, exam-precise English for a first-year student; the same technical terms as the English slides (array, procedure, sentinel, First-Element / Next-Element, DECLARATIONS / ALGORITHM, flowchart, pseudocode). Keep meaning exactly: numbers, laws and pasal, edge cases. Rubric `descEn` must translate the official rubric faithfully; don't paraphrase away a criterion. Keep markdown and code formatting intact. Don't change ids, answers, keys, tests, solutions or anything the verifier checks.

## Check your work
- `cd app && npx tsc -b`: no errors in your file(s).
- From the repo root: `node build/verify.ts --only <yourPrefix> --lang`. It prints every remaining language issue for problems matching the prefix (missing `en.*` for Indonesian sources; "looks Indonesian" for English sources). **Get your file(s) to zero issues**, then run once more without `--lang` to confirm `OK`.
- The detector is a heuristic. If something is a genuine false positive (an Indonesian proper name or a verbatim output string), leave it and list it in your report.

Edit **only** the bank file(s) named in your task. Final report (≤ 120 words): files, issues before → after, anything left on purpose.
