# Brief: build a part of the WI1102 UTS study app (Phase 1b)

A first-year ITB student has the **WI1102 Berpikir Komputasional UTS on Saturday 14 Nov 2026**. It is **handwritten on paper**, in Indonesian. This app is how they prepare.

You build **one area** (named in your task), in parallel with other agents who own other areas and with content agents who are filling `app/src/bank/*.ts` right now.

## Read first
- `PLAN.md` §0 (exam archetypes and the official 0–4 marking) and §2 (design pillars: fidelity, the 3 representations, the progressive hint ladder, study effectiveness).
- `app/src/types.ts`: **the contract** (questions, rubric, `LineNote`, `SyntaxCard`, `Flowchart`, `Expected`).
- `app/src/views/contract.ts`: `QViewProps` / `Outcome`, the interface between the practice engine and every question view.
- `app/src/bank/samples.ts`: one item of each kind. `app/src/bank/index.ts`: `PROBLEMS`, `QUESTIONS`, `EXPECTED` (reference outputs/traces/paths baked by `build/verify.ts`).
- `app/src/py/client.ts`: `py.run / py.trace / py.call / py.static`. All learner code runs in the Pyodide worker through `app/src/py/harness.py`, the same harness the verifier uses. Prompts given to `input()` are not part of stdout. Infinite loops come back as `timeout` with an Indonesian message.
- `app/src/lib/kit.tsx`: UI kit (`Workbench`, `Step`, `Feedback`, `Verdict`, `Md` markdown+KaTeX, `PageChip` source-page citation, `useLocalState`). `app/src/practice/Hints.tsx`: `HintLadder`, `hintCap(n)`, `useLang`, `loc(q, lang)`. `app/src/practice/answerCheck.ts`: `blankOk`, `outputOk`, `outputDiff`, `scoreMulti`. `app/src/practice/store.ts`: `logAttempt`, Leitner, `archetypeStats`, `mcqCalibration`.
- `app/src/styles.css`: design tokens and shared classes (`.btn`, `.seg`, `.chip`, `.md`, `.wb-*`). **Reference implementation** of the previous (chemistry) site, to port patterns from: `ref/chem-src/` (read-only), especially `practice/Session.tsx`, `QuestionView.tsx`, `Practice.tsx`, `Mock.tsx`, `Progress.tsx`, `Cards.tsx`, `Past.tsx`. Its brief: `ref/chem-BRIEF.md`.

## Non-negotiable design rules
1. **Paper mode (`mode: 'test'`) is the default practice mode** and mimics the exam:
   - plain monospace textarea, no syntax colouring, no autocomplete, no Run, no per-step feedback
   - one **Submit**, then the full report
   - only Paper-mode attempts count toward mastery

   **Lab mode (`'learn'`)** has Run, step checks, live feedback, and the tracer.
2. **Progressive hints cap the credit:** `score = raw × hintCap(rungsOpened)`; always report `hints` in the Outcome. Ladder rungs per archetype (PLAN.md §2.3):
   - program: nudge → plan → Parsons → skeleton → worked solution line by line
   - trace: which variables → empty table columns → first row → full trace
   - robot: draw N=1,2,3 → repeating unit → skeleton → solution

   Opening a **syntax card** counts as one rung in Paper mode and is free in Lab mode.
3. **Feedback names the specific mistake and the rule**, never just "salah":
   - match the learner's code/output against `q.wrong[]` variants
   - use `explainError()` for Python errors
   - name failed edge tests via `test.edge`
4. **Execution fidelity:** expected values come from `EXPECTED[q.id]` (baked) or from running the reference through `py`, never hard-coded.
5. **Official marking:** essay-style items show the 0–4 rubric (`RUBRIC_INDEX`: A/AB/B/C/D/E) and weights. Auto-checks pre-select the rubric row where possible, and the learner confirms or self-marks. Graded `samples` are shown after submitting ("contoh jawaban, nilai 3.5 karena …").
6. **Line-by-line explanations everywhere code appears in a solution:** render `lineNotes` with `<CodeNotes>` (from `app/src/content/CodeNotes.tsx`). Syntax chips open syntax cards.
7. **Indonesian UI first** (`lang` 'id'), English via `loc()` / `en`. Short, friendly, precise copy.
8. **Handwriting-friendly layout:** must work at 380 px width (phone) and look great at ~1000 px. Keyboard: ← → between questions, Enter to submit where natural.

## Working in parallel
- **Only create or edit files in your area** (listed per area below) plus your own CSS file, imported from your component, with class names prefixed by your area (e.g. `.prog-…`).
- Never edit `types.ts`, `views/contract.ts`, `lib/kit.tsx`, `styles.css`, `practice/Hints.tsx`, `practice/store.ts`, `practice/answerCheck.ts`, `py/*`, `bank/*`, or other areas' files. If you need a change there, put it in your final report.
- Placeholder files exist for every view and for `code/api.ts`, `content/syntax.ts`, `content/errors.ts`, so everything typechecks now. Replace your own placeholders; import others' modules by their documented exports even while they are still placeholders.
- **No new npm dependencies.**
- Typecheck with `cd app && npx tsc -b`. Fix errors in your files only.
- Do **not** start a dev server or a browser; the lead does browser QA. You may run Python/Node unit checks of your logic in the scratchpad.
- **Final report** (≤ 250 words):
  - files created and their exported API
  - what the lead must wire up
  - known gaps
  - anything you changed in a placeholder's documented API (avoid this)

---

## Areas

### W1 · Practice engine & simple views
**Owns:** `App.tsx`, `pages/*` (keep `BankBrowser` and `Sandbox` as a dev section), `practice/` (new files: `QuestionView.tsx` dispatcher, `Session.tsx`, `Practice.tsx` hub, `Past.tsx` papers, `Mock.tsx`, `Progress.tsx`, `Cards.tsx`, `pool.ts`, `practice.css`), plus `views/McqMulti.tsx`, `views/Mcq.tsx`, `views/Short.tsx`, `views/Open.tsx`, `views/Bug.tsx`.

**Routes / navigation:**
- **Beranda**: archetype cards with mastery rings; "Next up" picks the weakest archetype × misconception.
- **Latihan**: choose by archetype, deck, source or paper; Paper/Lab toggle; interleaved by default.
- **Soal lalu**: every `Paper`, shown in paper order with intro, figures and parts.
- **Ujian (Mock)**:
  - timed, in real exam proportions: Bagian I 10 mcq-multi, then essays, one per archetype
  - **printable**: a print stylesheet with a clean A4 layout and answer space, plus a separate answer key
  - a self-marking entry screen afterwards
- **Kartu**: flashcards, Leitner.
- **Sintaks**: route to `pages/Syntax.tsx`, owned by W6.
- **Progres**:
  - per archetype (Paper-mode mastery vs all) and per deck/topic
  - misconception heat-map
  - **Bagian I calibration** (accuracy of ○/✗ marks, blanks, and the expected-score effect of guessing)
  - Export/Import

**QuestionView:**
- Dispatches `q.kind` to `views/<Kind>.tsx` (lazy).
- Shows problem intro and figures, the source chip ("UTS 2025 · Soal 4", "tidak resmi" for mock/TUBAY), and weight.
- Has a confidence toggle (yakin / ragu) before submit.
- Logs `logAttempt` with archetype, mode, hints, conf, tags, opts.
- Multi-part problems step through their parts and show the weighted 0–4 problem score (official "Cara Penilaian").

**McqMulti** is exactly the exam's format:
- per option, three states ○ / ✗ / blank, `scoreMulti()` (+1 / −1 / 0)
- after submit, per-option verdict with `why`
- a short "kalau ragu, kosongkan" tip with the expected-value maths

**Open:** answer textarea (or "saya menulis di kertas" for hand-written answers), then reveal the model answer, `keyPoints` to tick, official rubric rows to self-mark, and graded `samples`.

**Short / Mcq / Bug:** port the chem patterns; Bug = click the wrong line(s), then show the fix with `lineNotes`.

### W2 · Program & Trace views
**Owns:** `views/Program.tsx`, `views/Trace.tsx`, `code/Editor.tsx`, `code/Parsons.tsx`, `code/Tracer.tsx`, `code/diagnose.ts`, `code/program.css`.

**Program:**
- Representation toggle Python / Pseudocode / Flowchart (from `q.reps`, forced by `q.required`), via `code/api.ts`:
  - `pseudoToPython` for pseudocode
  - `<FlowBuilder>` + `flowToPython` for flowcharts
- **Editor:** line numbers. Lab mode also gets Tab = 4 spaces and auto-indent after `:`. Paper mode is a bare textarea.
- **Lab:** Run with a custom stdin box.
- **Submit:**
  - run all `q.tests` and compare with `EXPECTED[q.id].outputs` using `outputOk(q.match)`, or `py.call(q.judge)`
  - `mustUse` via `py.static`
  - **diagnose** each failure:
    1. matches a `q.wrong[]` variant's output → its `msg` and `tag`
    2. otherwise `explainError()`, a timeout ("Next-Element?"), or `outputDiff` + the test's `edge`
  - report per test (✓/✗, stdin, expected vs got, in Lab or after submit)
  - auto-fill the rubric (all tests + mustUse → 4; most → 3; some → 2; runs but wrong → 1) and let the learner adjust
- **Hint ladder:** `hints` → `plan` → Parsons of `solution.python` (shuffled lines + 1–2 distractors from `wrong[]`; drag or tap to order; indentation buttons) → `skeleton` blanks → worked solution as `<CodeNotes>` with `lineNotes` (pseudo tab with `pseudoNotes`).
- Syntax chips from `q.syntax` open cards (counted as a rung in Paper mode).

**Trace:**
- **Desk-check first:** `ask: 'output'` is a textarea; `'table'` is a table with columns `watch[]` and add-row (compared row-wise with `EXPECTED.table`, tolerant of formatting); `'final'` is one input per variable. Nothing runs before submit.
- After submit, the **Tracer** unlocks: a step-through of `py.trace(code, stdin)` with:
  - highlighted line, variables (changed ones flash), and stdout so far
  - array cells with the index pointer when a list is present
  - call depth for subprograms (frames)
  - ◀ ▶ and a scrubber
  - `lineNotes` beside the active line
- `pseudo`/`flow` listings are shown in that representation (`FlowView` for flow), traced through the compiled Python.

### W3 · Robot
**Owns:** `robot/sim.ts`, `robot/Canvas.tsx`, `robot/generators.ts`, `robot/robot.css`, `views/Robot.tsx`.

**`sim.ts`** exports `runRobot(dialect: 'ladybug' | 'rody' | 'generic', src: string, param: string, n: number): { path: string; error?: string; segments: … }`. It must be pure TS with no React imports; `build/verify.ts` imports it with Node.
- Parse both exam dialects:
  - **rody:** `up` / `down` / `walk` / `repeat n` with **indented** blocks, `n` an expression in the param (`n`, `n-1`, `2*n`), n = 0 means skip
  - **ladybug:** `Forward N` (moves N units), `Left`, `Right` (turn 90° in place), `Repeat N ( … )` with parentheses, nestable, possibly multi-line
  - **generic:** accept either form
- Lenient on case, commas and `x` shorthand (`(FR FL)x2`), as students write on paper.
- Errors in Indonesian with the line.
- `path` is a canonical string of unit moves so two programs that draw the same route compare equal.

**Canvas:** SVG grid drawing of the path, animated, with the target ghosted underneath for comparison per n.

**View:**
- Program textarea, run for every n in `nValues` against `EXPECTED[q.id].paths`, showing per-n ✓/✗ with the first divergence step highlighted.
- Diagnose:
  - works for small n but not large → "jumlah ulang salah (n−1?)"
  - no `repeat` used though correct → rubric 3 ("ditulis berjajar")
- Hint ladder: draw N=1,2,3 → highlight the repeating unit → skeleton → solution.

**`generators.ts`:** produce new RobotQ variants (terrain/stair/zig-zag patterns parameterised by n, with reference solutions) for spaced practice.

### W4 · Pseudocode & flowchart engines
**Owns:** `code/pseudo.ts`, `code/flow.ts`, `code/FlowView.tsx`, `code/FlowBuilder.tsx`, `code/flow.css`. Also **replace** the stubs in `code/api.ts` with re-exports (keep the signatures) and set `ENGINES_READY = true`.

**`pseudo.ts`** (pure TS, Node-importable): Liem notation as taught (see `knowledge/corpus.md` D02, D04, D05, D06, D10 and `materials/practice/D05_ExtraExercises.pdf`, which has pseudocode + flowchart + Python for every exercise). It must handle:
- `Program X`, `{ comments }`, `KAMUS` / `DECLARATIONS`, `ALGORITMA` / `ALGORITHM`
- declarations ignored, but noted for type hints
- `←` (also `<-`)
- `input(a, b)`, `output(x, "teks", y)`, mapped to print with spaces like the slides' `output`
- `if … then … else … endif`/indentation, `depend on`, `while … do`, `repeat … until`, `i traversal [a..b]`
- `div` / `mod`, `and` / `or` / `not`, `=` comparison vs `←` assignment, `≠ ≤ ≥`
- `true` / `false`, arrays `T[i]`, `array [0..N-1] of integer` declarations
- `function F(x: integer) → integer` … `→ value`, `procedure P(input x, output y)`

Output: Python in house style plus line mapping, so errors point at pseudocode lines.
- **Lenient**, as a marker would be: indentation or `endif`-style both work, case-insensitive keywords, Indonesian keyword variants (`jika/maka/selain itu`, `selama/lakukan`, `ulangi/sampai`).
- Unit-test it against every `solution.pseudo` in the bank, and against the D05 extra exercises (their Python must produce the same output).

**`flow.ts`:** `Flowchart` block tree → Python (block texts go through the pseudocode expression and statement translator).

**`FlowView`:** a proper flowchart SVG:
- shapes: terminator, parallelogram I/O, rectangle process, diamond decision with Ya/Tidak labels, loop-back arrows, predefined-process for calls
- auto-layout from the block tree; readable at 380 px; highlight of the active block (`active` id path)

**`FlowBuilder`:** insert, edit or delete blocks (I/O, process, if, while, repeat, call) in the tree, with live `FlowView` preview; touch-friendly.

### W5 · Constraint & Classification views
**Owns:** `views/Constraint.tsx`, `views/Classify.tsx`, `views/essay.css`, `views/constraintGen.ts`.

**Constraint:**
- `shape: 'assign'`: entity → slot picker, tap-friendly, with the data table from the stem visible.
- `shape: 'grid'`: checkmark grid.
- **Live check in Lab mode** via `py.call(q.check, 'check', [ans])`, listing each violated constraint in Indonesian. Paper mode checks on submit.
- Auto-select rubric row: all constraints met → 4; else map the number violated to the official rows, then let the learner confirm.
- Hint ladder:
  1. "tuliskan semua constraint"
  2. constraint list revealed
  3. most-constrained entity first (computed: the entity with the fewest valid slots)
  4. a partial assignment
  5. full solution
- The paired `open` explanation part is handled by W1's Open view.

**`constraintGen.ts`:** generate fresh assignment puzzles (people × projects with division / experience / interest constraints, like UTS 2025 Soal 1), each with a Python `check` and a solution found by brute force in TS. These are RobotQ-style variants for spaced practice.

**Classify:**
- The learner defines hierarchy levels (choose a column, or a derived attribute such as "jenis tanaman dari nama", with its short code) and a code pattern (e.g. `<GENRE>-<TAHUN>-<NO>`).
- The app generates codes for every row and checks them: unique, consistent with the levels, has a sequence number for collisions, extensible to new items.
- It warns on the rubric's "C" trap: level-1 on a near-unique column (title/name).
- Then the reasoning part is self-marked against the official rubric; show the model answer + alternatives + samples.

### W6 · Syntax reference, error explainer, code notes
**Owns:** `content/syntax.ts`, `content/errors.ts`, `content/CodeNotes.tsx`, `content/SyntaxCardView.tsx`, `content/SyntaxDrawer.tsx`, `pages/Syntax.tsx`, `content/content.css`.

**`syntax.ts`:** a `SyntaxCard` for **every `SyntaxId`**, written from the slides (D02 pseudocode, D04 structure, D05 conditionals and repetition, D06 arrays, D10 subprograms; cite `refs`). Each card has:
- the rule in one sentence
- Python in house style
- Liem pseudocode
- the flowchart symbol in words
- a minimal example with output
- 2–4 `slips`: wrong form → why → fix, e.g. `if x = 5:`, `print("Total: " + total)`, `range(1, N)` for 1..N, `max = 0` for all-negative arrays, missing `return`, `def` never called, `input()` used as a number, a `while` without Next-Element, `else if` vs `elif`, `True`/`true`

Plus a compact **Python ⇄ pseudocode ⇄ flowchart cheat table**. Verify every example's output with `python3 -I app/src/py/harness.py` (JSON-lines CLI, see its docstring).

**`errors.ts`:** `explainError(err, line, code)` covers every error the harness can return:
- SyntaxError variants: missing `:`, `=` vs `==`, unclosed brackets/quotes, `else if`
- IndentationError (expected / unexpected / unindent)
- NameError (typo, case, used before assignment, the slides' `rata`)
- TypeError: `str + int`; `'<' not supported`; calling with the wrong argument count
- ValueError from `int('3.5')` / `int('')`
- IndexError, ZeroDivisionError, EOFError "masukan habis", step-limit timeout, UnboundLocalError

Each gets a plain-Indonesian `why` + `fix`, mentioning the offending line's code when given.

**`CodeNotes`:** a code listing with line numbers in which annotated lines/blocks are marked. Tap or hover a line to show its note (all notes expanded on print and on wide screens beside the code). `syntax` ids render as chips that open the card. It must also accept a `highlight` line (used by the Tracer).

**`SyntaxDrawer`:** a slide-over listing given card ids (`onOpen` callback so views can count it as a hint).

**`pages/Syntax.tsx`:** all cards grouped by deck, the cheat table, searchable.
