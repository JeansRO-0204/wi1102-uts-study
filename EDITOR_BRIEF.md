# Brief: LeetCode/Colab-style editor, layout and learning features (W7)

Context: `PLAN.md` §2, `WIDGET_BRIEF.md` (general rules: Paper vs Lab mode, hint caps, execution fidelity, English-first with an ID/EN toggle only on Indonesian-source items), `app/src/types.ts`, `app/src/views/contract.ts`. The app is Vite + React 19 + TS in `app/`. The UTS is **handwritten**, so Paper mode stays exam-faithful. Lab mode should feel like LeetCode, and the Python sandbox like Colab.

CodeMirror 6 is installed: `@codemirror/state`, `view`, `language`, `lang-python`, `commands`, `lint`, `search`, `@lezer/highlight`. No other new dependencies.

## 1. `code/CodeEditor.tsx`: CodeMirror 6 editor (lazy-loaded chunk)
- **Keep the existing `code/Editor.tsx` prop API**: `value onChange mode readOnly errorLine highlightLine onSubmit`. Re-implement `Editor.tsx` as a thin wrapper that lazy-imports `CodeEditor`, falling back to the current textarea while loading.
- New optional props: `language: 'python' | 'pseudo' | 'plain'`, `paperColors?: boolean`, `errorMessage?: string`, `minLines?`.
- **Lab mode:**
  - Python highlighting, line numbers, active-line highlight, bracket matching and auto-close
  - indent on Enter after `:`, Tab/Shift-Tab = 4 spaces, indent guides, search, undo history
  - ⌘/Ctrl+Enter = Run, ⌘/Ctrl+Shift+Enter = Submit
- **Paper mode:**
  - line numbers only: monochrome text, no autocomplete, no bracket auto-close, no auto-indent (Tab still inserts 4 spaces)
  - a small "Colours" toggle (localStorage `bk.paperColors`, default off) with a tooltip: "The exam is on paper: practise without colours"
- **Errors:** `errorLine` gets a red gutter marker + line background + a lint squiggle. The tooltip/panel shows `errorMessage` (views pass `explainError(...)` text). `highlightLine` = tracer's active line (blue).
- **Pseudocode language:** a small `StreamLanguage` highlighting Liem keywords:
  - `Program`, `KAMUS`/`DECLARATIONS`, `ALGORITMA`/`ALGORITHM`
  - `if then else`, `while do`, `repeat until`, `traversal`, `input`, `output`
  - `function`, `procedure`, `←`, `{ comments }`, `div`, `mod`, `and`, `or`, `not`, `true`, `false`, types
- **Theme:** colours from the site tokens (`styles.css`: `--ink`, `--accent`, `--soft`, `--line`, `--mono`) with a LeetCode-like light palette (keywords purple, strings green, numbers orange, comments grey italic, builtins blue). Dark mode via `prefers-color-scheme` if the app supports it.
- Must work with touch/iPad and at 380 px.
- Read-only listings (solutions, trace code): `CodeEditor` with `readOnly`, or keep `CodeNotes` for annotated listings. Do NOT edit `content/CodeNotes.tsx` (another owner). You may style the code inside it with a shared highlighter if CodeNotes exposes no hook; otherwise leave it.

## 2. LeetCode-style Program view layout (`views/Program.tsx`, `code/program.css`)
- **≥ 1000 px:** split pane with a draggable divider (persisted).
  - **Left:** tabs **Description** (stem is rendered by the shell; keep the shell's stem, but move/duplicate nothing: the left tab shows the meta), **Hints** (the ladder), **Editorial** (worked solution with CodeNotes + pseudo/flow tabs; locked until the first submit, or opened via the ladder's last rung) and **Submissions**.
  - **Right:** representation tabs (Python / Pseudocode / Flowchart), the editor, then a bottom **console** with tabs **Testcase** and **Test Result**.
  - Coordinate with how `practice/QuestionView.tsx` renders the stem. If the shell's stem makes a split layout awkward, add an optional `layout?: 'split' | 'stack'` hint in your view and render the stem area yourself only in split mode, telling the lead in your report. Do not change `views/contract.ts`.
- **< 1000 px:** stacked with tabs.
- **Testcase tab:** the visible sample tests (`q.tests` without `edge`, or the first 1–2) as editable stdin boxes. Add or delete custom cases; custom cases show output only (no expected).
- **Run** (Lab only) runs the visible and custom cases. **Submit** runs all hidden tests, as now.
- **Test Result tab:** a verdict banner in LeetCode language, coloured:
  - green **Accepted**
  - red **Wrong Answer**, **Runtime Error**, **Time Limit Exceeded**, **Syntax Error**
  - amber **Structure requirement not met** (`mustUse`)

  Below it: case chips (Case 1 ✓, Case 2 ✗ …). The selected case shows Input / Your output / Expected with **line-level diff highlighting**, then the specific diagnosis (the `wrong[]` match message, `explainError`, or the edge note) and the rubric suggestion.
- Keep every existing behaviour: hint caps, rubric confirm (two-step `onDone`), Paper mode rules (no Run, no Testcase editing, result only after Submit), review mode.

## 3. Submissions history (LeetCode "Submissions")
- `practice/submissions.ts` (new; localStorage `bk.subs`, included in Export/Import because it lives under `bk.`):
  - store per question id a list of `{ t, verdict, passed, total, rep, code, mode, hints }`, capped at about 30 per question
  - a hook to read it
- The Program view's Submissions tab lists them (verdict colour, time ago, passed/total, mode), and clicking one loads its code read-only with a "Restore to editor" button.
- **Drafts:** autosave the editor content per question + rep (`bk.draft.<id>.<rep>`), and add a "Reset to starter" button.
- Trace view: also log verdicts there; a Submissions tab is optional.

## 4. Problem list (LeetCode "Problems")
- New page `practice/Problems.tsx`, route `#/problems` (add it in `App.tsx` and as a nav tab "Problems"):
  - a table of every problem with a status icon (✓ solved = any fully-correct Paper attempt, ◐ attempted, ○ new), title, archetype, decks/topic tags, source chip
  - difficulty from `q.difficulty` (1 Easy / 2 Medium / 3 Hard, colour-coded; unknown = "–")
  - acceptance = your own success rate
- Filters: archetype, deck, difficulty, status, source (official / unofficial), and a search box. Add a "Pick one" random button.
- Clicking a problem opens it in a single-problem session (reuse Session or QuestionView).
- After an Accepted, show **"Similar problems"**: three others sharing a `patterns` entry.

## 5. Colab-style Python sandbox (`pages/Sandbox.tsx`)
- Rename the nav entry to "Playground". It's a notebook of cells:
  - each cell is a CodeEditor in Lab style, with a ▶ run button in the gutter, an execution count `[n]`, a stdin box (collapsible), and output right below
  - stdout in monospace; errors as a styled traceback box with the `explainError` explanation
  - add/delete/move cells, "Run all", notebook saved in localStorage `bk.notebook`
- Cells are independent programs (the harness runs each separately); say so in a small note.
- Starter notebook: 4 cells demonstrating input/conversion, if/elif, for/range with sum, list max with the `found` search.

## 6. Trace view (`views/Trace.tsx`) and Robot view (`views/Robot.tsx`)
Use `CodeEditor readOnly` for listings, with the tracer's active line, and CodeEditor for the robot answer box (plain language, line numbers, Paper rules). Keep their logic.

## Rules
- Edit only: `code/CodeEditor.tsx` (new), `code/Editor.tsx`, `code/program.css`, `code/pseudoLang.ts` (new), `views/Program.tsx`, `views/Trace.tsx`, `views/Robot.tsx` (editor swap only), `practice/submissions.ts` (new), `practice/Problems.tsx` (new), `pages/Sandbox.tsx`, `App.tsx` (route + nav only), `practice/practice.css` (only for the Problems page).
- Never edit bank files, types.ts, contract.ts, kit.tsx, Hints.tsx, store.ts, harness/client, content/*.
- English UI everywhere (`tr(lang, id, en)` style where the file already uses it; English is the default).
- Lazy-load CodeMirror so pages without an editor don't download it. Check with `npm run build` and report the CodeMirror chunk size (gzip).
- `cd app && npx tsc -b` clean; `npm run build` passes. No dev server (the lead does browser QA).
- Final report (≤ 250 words): files, the chunk size, what the lead must wire up, gaps.
