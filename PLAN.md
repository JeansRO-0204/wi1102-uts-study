# WI1102 Berpikir Komputasional — UTS study site (plan v2)

**UTS: Saturday 14 Nov 2026, handwritten on paper.** Plan written Wed 11 Nov evening, so there are about 2.5 build days. Sibling of `WI1103-Sustainability-UTSmindmap` (MCQ bank, Leitner, bilingual) and `ki1101-quiz2-study` (workbenches, Learn/Test, hint ladder, past papers, tolerant checker). We fork the chem repo as the base.

---

## 0. What the exam actually is (from the 2025 paper + the official 2024 grading guide)

The format is **stable across years**, so the site is organised around these archetypes.

| Part | Archetype | 2025 (29 Nov 2025) | 2024 (16 Nov 2024, official guide) | Skill / deck |
|---|---|---|---|---|
| **I** | **Multiple-correct MCQ**: circle ○ every correct option, cross ✗ every wrong one; **+1 per correct mark, −1 per wrong mark, 0 if left blank**; 4 options × 10 Qs | Computing impact (cyber violence, ethics/netiquette, privacy, UU ITE/PDP, work, AI definitions, AI impact) | (separate part, not in the guide) | 11 |
| **II.1** | **Constraint assignment**: find one valid configuration + explain using CT principles | Assign 8 staff to P1–P5 | Choose 6 books (genre × packaging) | 01/02 + abstraction, decomposition |
| **II.2** | **Hierarchical classification + unique codes**: design levels, justify, fill the code column | Drama catalogue (`Thr-2023-2-001`) | Botanical garden (`HIAS-1859-001`) | 01/03 abstraction, pattern recognition |
| **II.3** | **Robot command DSL with `repeat n`**: write commands for a pattern parameterised by N | Ladybug (`Forward N`, `Left`, `Right`, `Repeat N (...)`) | Robot Rody (`up`, `down`, `walk`, `repeat n`) | 02 algorithmic thinking, pattern generalisation |
| **II.4** | **Flowchart + Python for a stated program** | Rock-paper-scissors, 5 non-draw rounds, max 10 | Air-temperature data (2024 S4) | 02/04/05 |
| **II.5** | **Python with arrays + mandatory subprogram** | Ticket sales SBY vs BDG over 12 months | — | 06/10 |
| **II.x** | **Read a flowchart / read a Python program** (trace, state output) | — | S5 read flowchart, S6 read Python | 02/04/05 |

**Marking.** Every essay part is scored on a **0–4 rubric (E…A, with an AB = 3.5 step)** with written level descriptors, then weighted per sub-part. For example, S1 = a·40% + b·60%; S2 = a·30% + b·40% + c·30%. In 2024 the overall weights were S1 20%, S2 20%, S3–S6 15% each.

**Language: Indonesian.** The site is ID-first with an EN toggle.

---

## 1. Sources to fold into the bank (everything, as requested)

| Source | Where | Type | Notes |
|---|---|---|---|
| UTS 2025/26 (scanned, a student's marked attempt) | `~/Downloads/UTS Berkom Berkas.pdf` (9 pp; page 1 cover missing) | MCQ ×10 + essays S1–S5 | The marks are visible, so these become **graded sample answers** ("this got 3.5/4, here's why"). **Strip the student's name and NIM.** |
| Official grading guide UTS 2024/25 Part II | `List Soal Latihan/Petunjuk Penilaian…pdf` (12 pp, text) | S1–S6 + alternative answers + **official rubrics** | **This is the rubric template for every essay item on the site.** |
| "UTS CT tahun lalu" | `List Soal Latihan/UTS CT TAHUN LALU.pdf` (28 pp) | Bebras-style CT tasks | Many items |
| Latihan-1, Latihan-2 | `List Soal Latihan/` | Bebras-style + UTS-style (Rody, Perpustakaan Mini, Hidangan Pembuka, Tiket Taman Hiburan) | |
| Mock-ups ×3 | Acads FTI 25, Gemini-based, "Pengkom" (scanned) | MCQ + essays | Student-made: tagged `unofficial`, keys checked against the slides |
| TUBAY (Tutor Sebaya STEI'25) | 7 pp, scanned | ? | Read as images |
| Older papers KU1102 2018/2019/2021 + KU1102 Latihan Soal 2019 | `List Soal Latihan/` | Older course (Pengenalan Komputasi) | Keep only in-scope items (CT, algorithms, Python); the rest is tagged `out-of-scope` and hidden by default |
| Practicum #1–#4 (Basic structure, Conditionals, Looping+Array, Subprogram) | `~/Downloads/1.3.1-python-en*.pdf` | 3 problems each = 12 | **Assignments.** Python write-from-spec |
| Python module | `~/Downloads/python-en.pdf` (25 pp) | Exercises | |
| Deck 05 extra exercises | `~/Downloads/en WI1102_05_…ExtraExercises.pdf` (39 pp) | Pseudocode + flowchart + Python per exercise | **Already solved in all 3 representations**, so they seed the flowchart/pseudocode checkers |
| Slide decks 01, 02, 04, 05, 06, 10, 11 | Drive folder | Slide examples + "Exercise" slides | Already inventoried (see §7) |
| **Decks 03, 07, 08, 09** | **Not found yet** | | **In scope. Needed from you.** |

Rough yield: about 40 official/past items, 60+ practice/mock items, 30+ slide/practicum exercises, plus generated variants.

---

## 2. Design pillars

### 2.1 Fidelity (paper exam)
1. **Format fidelity.** Every archetype gets a workbench that mimics the paper task exactly. That includes the **○/✗ per-option MCQ with +1/−1/0 scoring**, where leaving an option blank is a legal and sometimes optimal move.
2. **Marking fidelity.** Essays are marked on the **official 0–4 A–E rubric format with the official sub-part weights**. Auto-checkable parts (Is the configuration valid? Does the robot path match? Does the program pass the tests?) fill the rubric rows automatically. Explanation parts are self-marked against the rubric descriptors, with graded sample answers next to them.
3. **Execution fidelity.** Every expected output, trace and robot path is computed by running it (Pyodide in a Web Worker in the browser; CPython in the build validator). Nothing is hand-computed.
4. **Notation fidelity.** House style: `# Program`, `# DECLARATIONS` / `# KAMUS`, `# ALGORITHM`, `int(input())`, `if (x > 0):`, `str()` concatenation, `found` flag, Liem pseudocode, the standard flowchart symbols. The six slide errors are turned into bug-hunt items and are never taught as fact.
5. **Paper conditions.** Paper mode (plain textarea, no run, submit once) is the default and the only mode that counts toward mastery. Desk-check first; the tracer is revealed only after you submit. There is an optional iPad ink path with rubric self-marking. Mocks are printable and timed.

### 2.2 Answer in any of the 3 representations (Python / pseudocode / flowchart)
For every *program* task, past or generated, a toggle chooses how you answer. All three are graded by the **same hidden tests**:
- **Python** runs directly.
- **Pseudocode (Liem notation)** goes through a small, lenient transpiler to Python, then runs. It handles: `←`, `input(x)`, `output(x)`, `if…then…else`, `while…do`, `repeat…until`, `for i traversal [a..b]`, `{ }` comments, and `KAMUS`/`ALGORITMA` headers. Parse errors point at the line and suggest the fix.
- **Flowchart** uses a block builder (Start/End, I/O parallelogram, process box, decision diamond with yes/no branches, loop-back arrows). It renders a real flowchart SVG and compiles to Python for testing. The test inputs can then be "walked" through the chart and the path highlighted.

When a past paper asks for a specific representation (2025 S4a flowchart, S4b Python "consistent with the flowchart"), that representation is required. The other modes are labelled practice.

### 2.3 Progressive hints (one ladder, adapted per archetype)
Each rung reveals more and caps the credit: **100 → 85 → 70 → 50 → 30 → 0%**.

| Archetype | Rung 1: nudge | Rung 2: plan | Rung 3: structure | Rung 4: partial | Rung 5: solution |
|---|---|---|---|---|---|
| Program (Py/pseudo/flow) | Which pattern + slide ref | Liem pseudocode outline | Parsons scramble (+ distractors) | Faded skeleton with blanks | Line-by-line worked solution |
| Constraint assignment | "List the constraints. Which are hard?" | Constraint table (rows × columns, as in the official guide) | Most-constrained item first (who has only one option?) | One valid partial assignment | Full solution + rubric-level explanation |
| Classification | "Which columns repeat values and which are unique?" | Candidate level-1 attributes | One example code built | Hierarchy filled in for 3 rows | Model answer + 2 alternatives (the guide says many are valid) |
| Robot DSL | "Draw N=1,2,3; what repeats?" | The repeating unit highlighted on the picture | Skeleton `repeat N-1 ( … )` | Unit filled in, tail missing | Full program + why it generalises |
| Trace / read program | "Which variables change each iteration?" | Empty trace table with the right columns | First row filled in | Rows up to the loop exit | Full trace + animated tracer |
| MCQ (multi-correct) | Slide ref for the topic | Per option: "true / false / unsure?" calibration | — | — | Per-option explanation |

**Failure-driven feedback** instead of just "wrong":
- Program tasks: off-by-one in `range`, missing `str()`, print vs return, sentinel counted, `while` never advances, failing edge cases (N=1, empty, not found, last index).
- Robot tasks: "works for N=1–2, breaks at N=3: your repeat count should be N−1".
- Constraint tasks: names the violated constraint.
- Classification tasks: "level 1 uses a unique column (title), which is the rubric's 'C' case".

### 2.4 Study effectiveness
- **Archetype paths, fading:** for each archetype, worked example (with official alternative answer + rubric) → completion → independent → timed independent. Each later session starts one rung less scaffolded.
- **Predict before run, with confidence ratings.** Confident-but-wrong items come back first (hypercorrection).
- **MCQ calibration training.** The ○/✗/blank format rewards knowing when *not* to mark, so Progress shows per-option calibration (accuracy when sure vs unsure) and the expected-score effect of guessing.
- **Retrieval + spacing** (Leitner from `store.ts`) over items and patterns. Due items return as **new generated variants** (robot patterns, constraint puzzles, classification tables, arrays/N), so you can't memorise outputs.
- **Interleaving** by default in Practice; blocked practice only inside the Learn path.
- **Self-explanation** after worked solutions, plus **rubric self-marking with annotated graded samples** to calibrate your own marking.
- **Weakness-driven "Next up"**, by archetype × misconception tag.
- **Minimal templates** per pattern/archetype drilled as flashcards (handwriting is slow).

---

## 3. Workbenches (by priority)

| P | Workbench | Auto-checked? |
|---|---|---|
| P0 | **Multi-correct MCQ** (○/✗/blank per option, +1/−1/0, per-option explanation, EN/ID) | yes |
| P0 | **Program task**: Python textarea (Paper / Lab), hidden tests, diagnoser, hint ladder, rubric auto-fill | yes |
| P0 | **Trace / read-program**: trace table and output prediction; tracer revealed after submit | yes |
| P0 | **Robot DSL**: parser for both dialects (`Forward N / Left / Right / Repeat N (…)` and `up / down / walk / repeat n` with indentation), SVG grid simulation, run against target patterns for N = 1…6, pattern generator | yes |
| P0 | **Essay rubric marker**: official 0–4 rubric rows, sub-part weights, graded sample answers, self-tick | self |
| P1 | **Constraint assignment**: table/drag UI, live constraint checker naming violations, puzzle generator | yes (config) + self (explanation) |
| P1 | **Classification builder**: define levels + code template, auto-generate codes, checks (unique, consistent, extensible, not keyed on a unique column) | partly + self |
| P1 | **Pseudocode mode** (Liem → Python transpiler) | yes |
| P1 | **Flowchart**: read (walk an input through a rendered chart) and build (block builder → SVG + Python) | yes |
| P1 | **Printable timed mock** in real exam proportions (Part I + 5 essays) + self-marking entry | self |
| P2 | Bug hunt (slide errata), range visualiser, complete/disjoint checker, call-stack view | yes |
| — | Dropped for this deadline: CodeMirror, multi-panel Workspace | |

---

## 4. Content model

```ts
type Archetype = 'mcq-multi' | 'constraint' | 'classify' | 'robot' | 'program' | 'trace' | 'read-flow' | 'concept'
type Rep = 'python' | 'pseudo' | 'flow'
interface Provenance { kind: 'uts' | 'guide' | 'mock' | 'latihan' | 'practicum' | 'slide' | 'module' | 'older' | 'generated';
                       paper?: string; label?: string; official: boolean; outOfScope?: boolean }
interface RubricRow { score: 0|1|2|3|3.5|4; index: 'E'|'D'|'C'|'B'|'AB'|'A'; desc: string; descEn?: string }
interface EssayPart { label: string; weight: number; rubric: RubricRow[]; auto?: AutoCheck; sample?: { text: string; score: number; note: string }[] }

MCQMulti  { kind:'mcq-multi'; stem; options[]; correct: boolean[]; why: string[] }                   // +1/−1/0 per option
Program   { kind:'program'; spec; reps: Rep[]; required?: Rep; tests; edge; solution: Record<Rep,string>; wrong?; ladder; rubric }
Trace     { kind:'trace'; code | flow; stdin?; watch: string[] }                                     // expected = executed
Robot     { kind:'robot'; dialect: 'ladybug'|'rody'; target: (n)=>Path; nRange; solution; rubric }
Constraint{ kind:'constraint'; entities; slots; constraints: Check[]; parts: EssayPart[] }
Classify  { kind:'classify'; table; parts: EssayPart[] }
// + Flashcard, simple MCQ/Short reused from chem
```

All item text is **ID verbatim from the source + an EN translation** (`indo`/`en` pair as in both earlier sites). Expected outputs, trace rows and robot paths are filled in by `build/verify_bank.py`, never by hand.

---

## 5. Build plan: 2.5 days, Sonnet agents fanned out

| When | Phase | Work | Agents |
|---|---|---|---|
| **Wed night** | 0 Ingest + scaffold | Fork the chem app, strip chem content; copy all sources into `materials/`; render scanned PDFs to page images; extract text; `types.ts` contracts; Pyodide worker; `verify_bank.py` skeleton | Lead + 1 Sonnet |
| **Wed night → Thu midday** | 1a Transcribe (parallel) | One agent per source group, each writing its own `bank/<source>.ts`, ID verbatim + EN + rubric + hints:<br>① UTS 2025 + official guide 2024<br>② UTS CT tahun lalu + Latihan 1–2<br>③ Mock-ups ×3 + TUBAY<br>④ Practicum 1–4 + python-en module<br>⑤ Deck 05 extra exercises (3 representations)<br>⑥ Older KU1102 papers (filter scope)<br>⑦ Slide exercises + deck 11 MCQ/flashcards<br>⑧ Decks 03, 07–09 once you send them | 7–8 Sonnet |
| **Thu** | 1b Workbenches (parallel) | MCQ-multi + essay rubric marker · Program + Trace + Pyodide runner + diagnoser · Robot DSL + generator · Constraint + Classification · Pseudocode transpiler + Flowchart read/build | 5 Sonnet, one folder each (chem `BRIEF.md` rules) |
| **Thu night** | 2 Verify | `verify_bank.py` green (CPython runs every solution/trace/robot path; wrong-variants fail; rubric weights sum to 1; no PII; hints don't leak answers); one adversarial review agent per archetype | 2–3 Sonnet + lead spot-check |
| **Fri** | 3 Integrate + QA + deploy | Archetype Learn paths, interleaved Practice, printable Mock, Progress (archetype × misconception, MCQ calibration); browser QA in the preview pane; GitHub Pages | Lead |
| **Fri evening / Sat morning** | Use it | Full timed mock on paper → self-mark → targeted review of the weakest archetype | You |

**Cut order if behind:** flowchart *builder* (keep flowchart reading), then classification builder (keep rubric self-marking), then pseudocode mode, then generators (keep past/practice items).

**Never cut:** Part I MCQ, robot DSL, program + trace, rubric marker, past papers.

---

## 6. Acceptance checklist
- [ ] Every past/official/practice/practicum/slide-exercise item is in the bank (count per source reported), ID verbatim + EN, with provenance.
- [ ] `verify_bank.py` exits 0: all executed answers match CPython; robot solutions reproduce the target for N=1…6; every wrong-variant fails; rubric weights correct; student PII stripped.
- [ ] Part I MCQ scores +1/−1/0 per option exactly as on the paper.
- [ ] Every program task can be answered in Python, pseudocode or flowchart, checked by the same tests.
- [ ] Paper mode has no syntax help and no run; infinite loops are killed in under 2 s with a targeted message.
- [ ] A printable mock in the real proportions, plus self-marking.
- [ ] Works offline after the first load; progress Export/Import.

---

## 7. Slide-deck notes (from the inventory agents)
- **01 CT (27 slides):** 4 pillars, FRS/PRS/KSM, car decomposition, phone patterns, turtle, city robot "4 1 2", smiley detection.
- **02 Algorithmic Thinking (28):** software = program + data + docs, 4 programming steps, top-down design, sequence/selection/repetition, Liem pseudocode, flowcharts (potatoes, wall clock ×3, maze, book club DFS, pickups), compiler vs interpreter.
- **04 Basic Structure (54):**
  - template; types incl. `char`; naming
  - `input`/conversion; `print` + `str()`
  - operators `// / % **`, `op=`; order-sensitivity; blocks
  - exercises: distance, triangle area, marble shop
- **05 Conditionals & Repetition (51):** complete & disjoint, if/elif/else, `for range(hmin,hmax+1)`, backward range, `while` with First/Next-Element, sentinel −999.
- **06 Array (34):** `[0 for i in range(N)]`, populate, print, average, max/min, search with `found` flag, last index, vector add.
- **10 Subprogram (36):** function vs procedure, spec comment, LOCAL DECLARATIONS, formal/actual parameters + call conditions, Max2→Max3, MaxArray, PrintArray, `from math import *`.
- **11 Computing Impact (~68):** cyberbullying/grooming/cyberviolence, addiction stats, identity theft, UU PDP 27/2022, ethics (8), netiquette (9), UU ITE 11/2008 · 19/2016 · 1/2024 (Pasal 27(3), 28(1–2), 45), automation, AI 4 approaches, generative/agentic AI.

**Slide errata** (used as bug hunts):
- 04: `True or False` shown as False.
- 05:
  - `Print_Positive` uses `>=` against a `>` spec.
  - `N : float` is read with `int()`.
  - `str(rata)` is undefined.
  - The counter is claimed to end at `hmax+1`.
- 06: `T[-1]` is called "undefined".

## 8. Still open
1. **Decks 03, 07, 08, 09**: send the PDFs (or a Drive link).
2. **Privacy:** the 2025 paper is someone's marked attempt. OK to use the answers as anonymised graded samples? Should the site's GitHub repo be **private** (the earlier ones were public, and these are course materials)?
