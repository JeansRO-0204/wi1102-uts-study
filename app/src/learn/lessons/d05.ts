import type { Lesson } from '../types'
const r = String.raw
const D05 = 'D05_Conditionals_Repetition'

export const lesson: Lesson = {
  deck: 'D05',
  title: 'Conditionals & Repetition',
  summary: 'Branching (one, two and many cases) and looping (for, while, sentinel, repeat-until), plus the four loop patterns every UTS program question is built from: sum, count-if, average and max/min.',
  minutes: 60,
  goals: [
    'Decide whether a set of cases is complete and disjoint, and write it as if / if-else / if-elif-else.',
    'Write a for loop (forward and backward) with the right range bounds, and a while loop with First-Element / Next-Element.',
    'Write a sentinel loop that does not count or add the sentinel, and handles the empty case.',
    'Choose between for, while and repeat-until, and say why.',
    'Write sum, count-if, average and max/min loops with correct initialization.',
  ],
  examAngle: 'This is the most exam-heavy deck. Almost every UTS has a "write the program" question (Python, pseudocode or flowchart) that combines a multi-case if-elif with a for or sentinel-while loop and one pattern (sum, count, average, max/min). The other staple is a trace question on a loop (table of i and sum, final value, or output), and a tick-all-that-apply on complete and disjoint cases. Marks go to initialization, the loop bounds, the position of Next-Element and the final output.',
  sections: [
    {
      id: 'case-analysis',
      title: 'Case analysis: complete and disjoint',
      blocks: [
        {
          t: 'text',
          md: 'A **conditional** (branching) lets the same code behave differently. It has two parts:\n\n- **Condition**: an expression that is `True` or `False`.\n- **Action**: what runs when its condition holds.\n\nBefore you write any `if`, list the **cases**. A proper set of cases must be:\n\n- **Complete**: every possible input falls in at least one case.\n- **Disjoint**: no input falls in two cases.\n\nExample from the slides: for an integer `A`, the cases `A > 0`, `A < 0`, `A = 0` are complete and disjoint. There is nothing else, and no overlap.',
          refs: [{ src: D05, page: 11 }, { src: D05, page: 12 }],
        },
        {
          t: 'key',
          md: '**Complete** = nothing is left out. **Disjoint** = nothing is counted twice. Two complementary cases (`k` and not `k`) are always both, which is why `else` needs no condition.',
        },
        {
          t: 'quiz',
          q: 'For an integer `A`, which sets of cases are complete AND disjoint? (tick all that apply)',
          options: ['A > 0, A < 0, A = 0', 'A > 0, A < 0', 'A >= 0, A <= 0', 'A >= 0, A < 0'],
          correct: [0, 3],
          why: [
            'Covers every integer, no overlap.',
            'Not complete: A = 0 is in no case.',
            'Not disjoint: A = 0 satisfies both.',
            'Two cases, and every integer is in exactly one (zero goes to A >= 0).',
          ],
        },
        { t: 'question', id: 'd05-complete-a', note: 'The same check as the exam: mark each set of cases.' },
      ],
    },
    {
      id: 'one-two-case',
      title: 'One case and two cases',
      blocks: [
        {
          t: 'text',
          md: 'Three shapes, all from the slides:\n\n| Shape | Python | Pseudocode |\n|---|---|---|\n| one case | `if (k):` | `if (k) then` |\n| two (complementary) cases | `if (k): … else:` | `if (k) then … else` |\n| many cases | `if … elif … else` | `if … else if … else` |\n\nIn a **one-case** `if` the "else" is simply "do nothing". In a **two-case** `if`, write the second case as a comment (`# N % 2 == 1`) so the reader sees that it is the complement. Indentation (4 spaces) shows what belongs to the branch.',
          refs: [{ src: D05, page: 13 }, { src: D05, page: 14 }],
        },
        {
          t: 'code',
          caption: 'Example 3: one case, Print_Positive',
          python: r`# Program Print_Positive
# Input A; if A > 0, print "Positive"
# DECLARATIONS
# A : int
# ALGORITHM
A = int(input())
if (A > 0):
    print("Positive")
# else: do nothing`,
          pseudo: r`Program Print_Positive
{ Input A; if A > 0, print "Positive" }
KAMUS
  A : integer
ALGORITMA
  input(A)
  if (A > 0) then
    output("Positive")
  { else: do nothing }`,
          flow: { title: 'Print_Positive', blocks: [{ t: 'io', dir: 'in', text: 'input(A)' }, { t: 'if', cond: 'A > 0', then: [{ t: 'io', dir: 'out', text: 'output("Positive")' }] }] },
          stdin: ['5'],
          notes: [{ line: 7, note: 'The condition is `A > 0`, as the specification says. Parentheses are optional in Python but are the house style.' }],
        },
        {
          t: 'text',
          md: '**Slide erratum (p17):** the slide\'s Python uses `A >= 0` and prints `"positif"`, but the specification (p15) says "positive" means `A > 0`. With `>=` zero would be called positive. Use the version above.',
          refs: [{ src: D05, page: 15 }, { src: D05, page: 17 }],
        },
        {
          t: 'code',
          caption: 'Example 4: two complementary cases, Odd_Even',
          python: r`# Program Odd_Even
# Input N>0. If N is even, print "even", else "odd"
# DECLARATIONS
# N : int
# ALGORITHM
N = int(input())   # Assume: N > 0
if (N % 2 == 0):
    print("even")
else:              # N % 2 == 1
    print("odd")`,
          pseudo: r`Program Odd_Even
{ Input N>0. If N is even, print "even", else "odd" }
KAMUS
  N : integer
ALGORITMA
  input(N)
  if (N mod 2 = 0) then
    output("even")
  else { N mod 2 = 1 }
    output("odd")`,
          flow: { title: 'Odd_Even', blocks: [{ t: 'io', dir: 'in', text: 'input(N)' }, { t: 'if', cond: 'N mod 2 = 0', then: [{ t: 'io', dir: 'out', text: 'output("even")' }], else: [{ t: 'io', dir: 'out', text: 'output("odd")' }] }] },
          stdin: ['7'],
          notes: [{ line: 7, note: '`%` is the remainder (`mod` in pseudocode). `==` compares; a single `=` would be an assignment.' }],
          pseudoNotes: [{ line: 7, note: 'In pseudocode comparison is a single `=` and the remainder is `mod`.' }],
        },
        {
          t: 'trap',
          md: '**`=` vs `==`.** `if (N % 2 = 0):` is a syntax error in Python. In pseudocode `=` *is* the comparison, in Python it must be `==`. Also, `N / 2 == 0` is not a remainder test: `/` is real division.',
        },
        {
          t: 'predict',
          prompt: 'Two separate `if`s, then an `if-else`. What is printed for x = 7?',
          code: r`x = 7
if (x > 0):
    print("A")
if (x > 5):
    print("B")
else:
    print("C")`,
          explain: 'The first `if` stands alone; the `if-else` is a second, independent decision. Both fire, so A and B are printed. Joining them with `elif` would make the cases disjoint and print only A.',
        },
      ],
    },
    {
      id: 'many-cases',
      title: 'Many cases and nested conditions',
      blocks: [
        {
          t: 'text',
          md: 'With three or more cases use a chain: `if … elif … elif … else`. Python tests the conditions **top to bottom** and runs only the **first** one that is true, so the order matters when the cases overlap, and the last `else` catches "everything else".\n\nA flowchart for many cases is a chain of diamonds: each "false" arrow leads to the next test.',
          refs: [{ src: D05, page: 14 }, { src: D05, page: 22 }],
        },
        {
          t: 'code',
          caption: 'Example 5: Print_Number (positive, negative or zero)',
          python: r`# Program Print_Number
# Input N. Print whether N is positive, negative, or zero
# DECLARATIONS
# N : int
# ALGORITHM
N = int(input())
if (N > 0):
    print("positive")
elif (N < 0):
    print("negative")
else:               # N = 0
    print("zero")`,
          pseudo: r`Program Print_Number
{ Input N. Print whether N is positive, negative, or zero }
KAMUS
  N : integer
ALGORITMA
  input(N)
  if (N > 0) then
    output("positive")
  else if (N < 0) then
    output("negative")
  else { N = 0 }
    output("zero")`,
          flow: { title: 'Print_Number', blocks: [{ t: 'io', dir: 'in', text: 'input(N)' }, { t: 'if', cond: 'N > 0', then: [{ t: 'io', dir: 'out', text: 'output("positive")' }], else: [{ t: 'if', cond: 'N < 0', then: [{ t: 'io', dir: 'out', text: 'output("negative")' }], else: [{ t: 'io', dir: 'out', text: 'output("zero")' }] }] }] },
          stdin: ['-4'],
          notes: [{ line: 8, note: 'Tested first.' }, { line: 10, note: 'Only reached when `N > 0` was false.' }, { line: 12, note: 'No condition: the remaining case is N = 0, noted in a comment.' }],
        },
        {
          t: 'text',
          md: 'The slide declares `N : float` but reads it with `int(input())`. That is inconsistent: either declare `N : int`, or read with `float(input())`. In your own answers, make the declared type and the conversion agree.',
          refs: [{ src: D05, page: 23 }],
        },
        {
          t: 'predict',
          prompt: 'The thresholds overlap. What is printed for a score of 85?',
          code: r`score = int(input())
if (score >= 60):
    print("pass")
elif (score >= 80):
    print("excellent")
else:
    print("fail")`,
          stdin: ['85'],
          explain: 'The first true condition wins. 85 >= 60 is true, so "pass" is printed and the `elif` is never looked at. The cases are not disjoint, so the order decides. Fix: test the most restrictive case (`>= 80`) first, or write ranges with both bounds.',
        },
        {
          t: 'text',
          md: '**Compound and nested conditions.** Combine tests with `and`, `or`, `not`, or nest an `if` inside a branch. Extra exercise 3 (series resistance): if **any** resistance is negative the total cannot be computed.',
          refs: [{ src: 'D05_ExtraExercises', page: 6 }],
        },
        {
          t: 'code',
          caption: 'Exercise 3: total series resistance',
          python: r`# Program Resistance
# DECLARATIONS
# R1, R2, R3 : int
# ALGORITHM
R1 = int(input())
R2 = int(input())
R3 = int(input())
if (R1 < 0 or R2 < 0 or R3 < 0):
    print("Total resistance cannot be calculated")
else:
    print("RT = " + str(R1 + R2 + R3))`,
          pseudo: r`Program Resistance
KAMUS
  R1, R2, R3 : integer
ALGORITMA
  input(R1)
  input(R2)
  input(R3)
  if (R1 < 0 or R2 < 0 or R3 < 0) then
    output("Total resistance cannot be calculated")
  else
    output("RT =", R1 + R2 + R3)`,
          flow: { title: 'Resistance', blocks: [{ t: 'io', dir: 'in', text: 'input(R1)' }, { t: 'io', dir: 'in', text: 'input(R2)' }, { t: 'io', dir: 'in', text: 'input(R3)' }, { t: 'if', cond: 'R1 < 0 or R2 < 0 or R3 < 0', then: [{ t: 'io', dir: 'out', text: 'output("Total resistance cannot be calculated")' }], else: [{ t: 'io', dir: 'out', text: 'output("RT =", R1 + R2 + R3)' }] }] },
          stdin: ['10', '20', '30'],
        },
        {
          t: 'quiz',
          q: 'The exercise asks for the largest of two integers A and B, and lists three cases (A > B, A < B, A = B). How many cases do you really need?',
          options: ['Three, because the spec lists three', 'Two: `if (A >= B)` prints A, else prints B', 'One: just print A', 'Two, but they must be `A > B` and `A < B`'],
          correct: [1],
          why: [
            'When A = B the answer is the same as one of the others, so the third case can be merged.',
            'Complementary cases: complete and disjoint, with an `else` that needs no condition.',
            'Wrong when B is larger.',
            'That pair is not complete: A = B falls in neither, so nothing would be printed.',
          ],
        },
        { t: 'question', id: 'd05-number-c', note: 'Write Print_Number yourself in Python, pseudocode and a flowchart.' },
      ],
    },
    {
      id: 'for-loops',
      title: 'Repetition with a counter: for',
      blocks: [
        {
          t: 'text',
          md: 'Printing 1 to 3 by hand is fine, 1 to 1,000,000 is not. A **loop** repeats an action; a computer never gets bored. A loop has a **repetition-condition** (logical expression) and a **repetition-body** (the action repeated).\n\nThe slides give two Python loops. First, **based on a counter**: `for` runs the body once for each value of the counter from `hmin` to `hmax`.',
          refs: [{ src: D05, page: 33 }, { src: D05, page: 34 }, { src: D05, page: 36 }],
        },
        {
          t: 'code',
          caption: 'Example 1 (for): print 1..N and their sum',
          python: r`# Program AddingUp_Numbers
# Calculate 1+2+...+N. Assumption: N > 0
# DECLARATIONS
# N : int
# i, sum : int
# ALGORITHM
N = int(input())          # initialization
sum = 0                   # initialization
for i in range(1, N+1):
    print(i)              # action
    sum = sum + i         # action
print(sum)                # Termination`,
          pseudo: r`Program AddingUp_Numbers
KAMUS
  N, i, sum : integer
ALGORITMA
  input(N)
  sum ← 0
  i traversal [1..N]
    output(i)
    sum ← sum + i
  output(sum)`,
          flow: { title: 'AddingUp_Numbers', blocks: [{ t: 'io', dir: 'in', text: 'input(N)' }, { t: 'process', text: 'sum ← 0' }, { t: 'process', text: 'i ← 1' }, { t: 'while', cond: 'i <= N', body: [{ t: 'io', dir: 'out', text: 'output(i)' }, { t: 'process', text: 'sum ← sum + i' }, { t: 'process', text: 'i ← i + 1' }] }, { t: 'io', dir: 'out', text: 'output(sum)' }] },
          stdin: ['5'],
          notes: [
            { line: 8, note: 'The accumulator starts at 0 **before** the loop. Inside the loop it would be reset every time.' },
            { line: 9, note: '`range(1, N+1)` gives 1, 2, …, N. The upper bound of `range` is excluded, so write hmax + 1.' },
            { line: [10, 11], note: 'The body is indented.' },
            { line: 12, note: 'Not indented: runs once, after the loop (Termination).' },
          ],
        },
        {
          t: 'key',
          md: 'Template: `Initialization-action`, then `for i in range(hmin, hmax+1):` with the body indented, then `Termination`. The counter goes up by 1 each time, so the range is **hmax + 1**.',
        },
        { t: 'trace', caption: 'Trace it: watch i and sum change (N = 3)', code: r`N = int(input())
sum = 0
for i in range(1, N+1):
    print(i)
    sum = sum + i
print(sum)`, stdin: ['3'] },
        {
          t: 'predict',
          prompt: 'The classic off-by-one. What is printed for N = 4?',
          code: r`N = int(input())
sum = 0
for i in range(1, N):
    sum = sum + i
print(sum)`,
          stdin: ['4'],
          explain: '`range(1, N)` stops at N-1 = 3, so only 1 + 2 + 3 = 6 is added, not 10. Write `range(1, N+1)`.',
        },
        {
          t: 'predict',
          prompt: 'Where is the accumulator initialised? Try it with N = 3.',
          code: r`N = int(input())
for i in range(1, N+1):
    sum = 0
    sum = sum + i
print(sum)`,
          stdin: ['3'],
          explain: '`sum = 0` inside the loop resets the total on every pass, so only the last i survives: the output is 3, not 6. Initialise before the loop.',
        },
        {
          t: 'text',
          md: '**Counting backward.** Start at `hmax`, stop at `hmin`, step -1: `for i in range(hmax, hmin-1, -1):`. In pseudocode `i traversal [hmax..hmin]`. Here the stop value is **hmin - 1** (excluded), mirroring the forward case.',
          refs: [{ src: D05, page: 39 }],
        },
        {
          t: 'code',
          caption: 'Counting down from N to 1',
          python: r`# DECLARATIONS
# N, i : int
# ALGORITHM
N = int(input())
for i in range(N, 0, -1):
    print(i)
print("Liftoff")`,
          pseudo: r`KAMUS
  N, i : integer
ALGORITMA
  input(N)
  i traversal [N..1]
    output(i)
  output("Liftoff")`,
          flow: { title: 'Countdown', blocks: [{ t: 'io', dir: 'in', text: 'input(N)' }, { t: 'process', text: 'i ← N' }, { t: 'while', cond: 'i >= 1', body: [{ t: 'io', dir: 'out', text: 'output(i)' }, { t: 'process', text: 'i ← i - 1' }] }, { t: 'io', dir: 'out', text: 'output("Liftoff")' }] },
          stdin: ['3'],
        },
        {
          t: 'trap',
          md: '**Slide erratum (p37):** the slide says the counter is `hmax+1` after the loop. That describes the *conceptual* loop; in real Python, `i` keeps its **last processed value** `hmax`. Likewise backward: the last value is `hmin`, not `hmin-1`. Do not write final-value answers from the slide wording; trace the code.',
        },
        { t: 'question', id: 'd05-counter-d', note: 'What really happens to i after the loop in Python.' },
      ],
    },
    {
      id: 'while-loops',
      title: 'Repetition with a condition: while',
      blocks: [
        {
          t: 'text',
          md: '`while` repeats the body **as long as the condition is true**, testing it at the **top**. You manage the counter yourself, in three steps:\n\n1. **First-Element**: give the loop variable its first value (before the loop).\n2. **Body**: the action.\n3. **Next-Element**: move on (inside the loop, last).\n\nBecause the test comes first, a `while` may run **zero times** (the *empty case*): if the condition is false the first time, the body is never entered.',
          refs: [{ src: D05, page: 40 }, { src: D05, page: 41 }],
        },
        {
          t: 'code',
          caption: 'Example 1 (while): the same sum, with a hand-made counter',
          python: r`# Program AddUpNumbers
# DECLARATIONS
# N, i, sum : int
# ALGORITHM
N = int(input())          # initialization
sum = 0                   # initialization
i = 1                     # First-Element
while (i <= N):           # repetition-condition
    print(i)              # action
    sum = sum + i         # action
    i = i + 1             # Next-Element
# i > N
print(sum)                # Termination`,
          pseudo: r`Program AddUpNumbers
KAMUS
  N, i, sum : integer
ALGORITMA
  input(N)
  sum ← 0
  i ← 1
  while (i <= N) do
    output(i)
    sum ← sum + i
    i ← i + 1
  { i > N }
  output(sum)`,
          flow: { title: 'AddUpNumbers', blocks: [{ t: 'io', dir: 'in', text: 'input(N)' }, { t: 'process', text: 'sum ← 0' }, { t: 'process', text: 'i ← 1' }, { t: 'while', cond: 'i <= N', body: [{ t: 'io', dir: 'out', text: 'output(i)' }, { t: 'process', text: 'sum ← sum + i' }, { t: 'process', text: 'i ← i + 1' }] }, { t: 'io', dir: 'out', text: 'output(sum)' }] },
          stdin: ['4'],
          notes: [
            { line: 7, note: 'First-Element: forgetting it gives a NameError (or a stale value).' },
            { line: 8, note: 'Repetition-condition, tested before every pass, including the first.' },
            { line: 11, note: 'Next-Element: forget this and the condition never becomes false, an infinite loop.' },
          ],
        },
        {
          t: 'trap',
          md: '**Missing Next-Element.** `while (i <= N):` without `i = i + 1` never ends. In a `for` Python advances the counter for you; in a `while` you must. Also check that Next-Element moves *towards* the stop condition (`+ 1` for `<=`, `- 1` for `>=`).',
        },
        {
          t: 'predict',
          prompt: 'The empty case. What is printed?',
          code: r`i = 10
while (i < 5):
    print(i)
    i = i + 1
print("done", i)`,
          explain: 'The condition 10 < 5 is false the first time, so the body never runs and only `done 10` is printed. This is why `while` is the safe choice when the action may never happen.',
        },
        {
          t: 'quiz',
          q: 'Which statements are true? (tick all that apply)',
          options: [
            'A `while` body can run zero times',
            'A `for i in range(1, N+1)` with N = 0 runs once',
            'In a `while`, the condition is tested before each pass',
            'Next-Element belongs before the loop',
          ],
          correct: [0, 2],
          why: [
            'True: if the condition is false at the first test the body is skipped.',
            'False: range(1, 1) is empty, so the loop runs zero times.',
            'True: test at the top, before the body.',
            'False: First-Element is before the loop; Next-Element is the last statement inside it.',
          ],
        },
      ],
    },
    {
      id: 'sentinel',
      title: 'Sentinel loops: read until a stop value',
      blocks: [
        {
          t: 'text',
          md: 'When you do not know how many data items there are, the input itself says "stop": a special value called the **sentinel** (here `-999`). It is **not data**, so it must not be added, counted or averaged.\n\nThe pattern uses First-Element / Next-Element on the input:\n\n1. Initialise `sum`, `count`.\n2. **Read the first value before the loop** (First-Element).\n3. `while (X != sentinel):` process X, then **read the next value** (Next-Element) as the **last** line of the body.\n4. After the loop: check `count > 0` before dividing.\n\nThe slide\'s spec: if the very first input is the sentinel, print `No data processed`.',
          refs: [{ src: D05, page: 47 }, { src: D05, page: 48 }, { src: D05, page: 49 }],
        },
        {
          t: 'code',
          caption: 'Example 3: AvgNumbers',
          python: r`# Program AvgNumbers
# DECLARATIONS
# X, count, sum : int
# avg : float
# ALGORITHM
sum = 0
count = 0
X = int(input())             # First-Element
while (X != -999):
    count = count + 1
    sum = sum + X
    X = int(input())         # Next-Element
# X = -999
if (count > 0):
    avg = sum / count
    print("Number of numbers = " + str(count))
    print("Total number = " + str(sum))
    print("Average = " + str(avg))
else:
    print("No data processed")`,
          pseudo: r`Program AvgNumbers
KAMUS
  X, count, sum : integer
  avg : real
ALGORITMA
  sum ← 0
  count ← 0
  input(X)
  while (X ≠ -999) do
    count ← count + 1
    sum ← sum + X
    input(X)
  { X = -999 }
  if (count > 0) then
    avg ← sum / count
    output("Number of numbers =", count)
    output("Total number =", sum)
    output("Average =", avg)
  else { count = 0 }
    output("No data processed")`,
          flow: { title: 'AvgNumbers', blocks: [{ t: 'process', text: 'sum ← 0' }, { t: 'process', text: 'count ← 0' }, { t: 'io', dir: 'in', text: 'input(X)' }, { t: 'while', cond: 'X ≠ -999', body: [{ t: 'process', text: 'count ← count + 1' }, { t: 'process', text: 'sum ← sum + X' }, { t: 'io', dir: 'in', text: 'input(X)' }] }, { t: 'if', cond: 'count > 0', then: [{ t: 'process', text: 'avg ← sum / count' }, { t: 'io', dir: 'out', text: 'output("Number of numbers =", count)' }, { t: 'io', dir: 'out', text: 'output("Total number =", sum)' }, { t: 'io', dir: 'out', text: 'output("Average =", avg)' }], else: [{ t: 'io', dir: 'out', text: 'output("No data processed")' }] }] },
          stdin: ['-1', '12', '-6', '10', '2', '-999'],
          notes: [
            { line: 9, note: 'First-Element: the first value is read before the loop, so the test has something to look at.' },
            { line: 13, note: 'Next-Element: the **last** statement of the body.' },
            { line: 15, note: 'Guard against count = 0: otherwise `sum / count` divides by zero when the first input is the sentinel.' },
          ],
        },
        {
          t: 'text',
          md: '**Slide errata (p48, p50):** the pseudocode outputs `rata` and the Python prints `str(rata)`, but the variable is `avg`, so `rata` is undefined. Use `avg`. The slide\'s sample output shows `3.40`, but `print(str(avg))` prints `3.4`; formatting is not part of the slide code.',
          refs: [{ src: D05, page: 48 }, { src: D05, page: 50 }],
        },
        { t: 'trace', caption: 'Trace the sentinel loop; note that -999 is never added', code: r`sum = 0
count = 0
X = int(input())
while (X != -999):
    count = count + 1
    sum = sum + X
    X = int(input())
print(count, sum)`, stdin: ['4', '6', '-999'] },
        {
          t: 'predict',
          prompt: 'Read-before-test is gone. What does this print?',
          code: r`count = 0
X = 0
while (X != -999):
    X = int(input())
    count = count + 1
print(count)`,
          stdin: ['4', '5', '-999'],
          explain: 'Reading at the top of the body means the sentinel is read, *counted*, and only then does the test stop the loop: 3, not 2. The fix is the standard pattern: read once before the loop and read again as the last line of the body.',
        },
        {
          t: 'trap',
          md: '**Sentinel counted.** Order inside the body matters: process X first, read the next value last. Reading first and processing after processes the sentinel (a wrong count, wrong sum, wrong average).',
        },
        { t: 'question', id: 'd05-avg-d', note: 'Write the full sentinel program (while is required).' },
      ],
    },
    {
      id: 'choose-loop',
      title: 'Choosing the loop type, and repeat-until',
      blocks: [
        {
          t: 'text',
          md: 'The slides justify the choice every time. The deciding question: *do I know the number of repetitions, and can the body run zero times?*\n\n| Situation | Use | Why |\n|---|---|---|\n| Number of repetitions known (N, or 10) | **for** | counter range 1..N is known |\n| Stops on a condition or sentinel, may never run | **while** | the empty case is possible |\n| Must run at least once, tests afterwards | **repeat-until** | test at the bottom |\n\n- Example 2 (10 integers): `for`, because exactly 10 repetitions and never empty.\n- Example 3 (sentinel): `while`, because there is no fixed range and the first value may be the sentinel.',
          refs: [{ src: D05, page: 46 }, { src: D05, page: 51 }],
        },
        {
          t: 'text',
          md: '**Repeat-until** is in the pseudocode toolbox (flowchart: the test sits *below* the body, and the arrow goes back to the top). Python has no `repeat`; write `while True:` and `break` when the stop condition holds. The body always runs at least once.',
        },
        {
          t: 'code',
          caption: 'Read until the value is positive (at least one read)',
          python: r`# DECLARATIONS
# N : int
# ALGORITHM
while True:
    N = int(input())
    if (N > 0):
        break
print("Accepted " + str(N))`,
          pseudo: r`KAMUS
  N : integer
ALGORITMA
  repeat
    input(N)
  until (N > 0)
  output("Accepted", N)`,
          flow: { title: 'ReadPositive', blocks: [{ t: 'repeat', body: [{ t: 'io', dir: 'in', text: 'input(N)' }], until: 'N > 0' }, { t: 'io', dir: 'out', text: 'output("Accepted", N)' }] },
          stdin: ['-3', '0', '7'],
          notes: [{ line: 6, note: 'The stop condition is the `until` condition; `break` leaves the loop.' }],
        },
        {
          t: 'quiz',
          q: 'Which problems fit a `for` loop best? (tick all that apply)',
          options: [
            'Read exactly 10 integers and print their total',
            'Read integers until -999 and print the average',
            'Print 1 to N, then their sum',
            'Keep asking until the user types a valid password',
          ],
          correct: [0, 2],
          why: [
            'The number of repetitions is fixed (10).',
            'No known count; this is a sentinel `while`.',
            'Known range 1..N.',
            'Unknown count and must ask at least once: `while` / repeat-until.',
          ],
        },
      ],
    },
    {
      id: 'patterns',
      title: 'Loop patterns: sum, count-if, average, max/min',
      blocks: [
        {
          t: 'text',
          md: 'Most programming questions are one of these patterns inside a loop. Each has a correct **initial value**:\n\n| Pattern | Before the loop | In the loop |\n|---|---|---|\n| sum | `sum = 0` | `sum = sum + X` |\n| count-if | `count = 0` | `if (cond): count = count + 1` |\n| average | sum and count (or N) | after the loop: `sum / count`, guard `count > 0` |\n| max / min | `max = first element` | `if (X > max): max = X` |',
        },
        {
          t: 'code',
          caption: 'Sum, count-if and average over N inputs (extra exercise style)',
          python: r`# DECLARATIONS
# N, i, X, sum, pos : int
# ALGORITHM
N = int(input())
sum = 0
pos = 0
for i in range(1, N+1):
    X = int(input())
    sum = sum + X
    if (X > 0):
        pos = pos + 1
print("Sum = " + str(sum))
print("Positives = " + str(pos))
print("Average = " + str(sum / N))`,
          pseudo: r`KAMUS
  N, i, X, sum, pos : integer
ALGORITMA
  input(N)
  sum ← 0
  pos ← 0
  i traversal [1..N]
    input(X)
    sum ← sum + X
    if (X > 0) then
      pos ← pos + 1
  output("Sum =", sum)
  output("Positives =", pos)
  output("Average =", sum / N)`,
          flow: { title: 'SumCountAvg', blocks: [{ t: 'io', dir: 'in', text: 'input(N)' }, { t: 'process', text: 'sum ← 0' }, { t: 'process', text: 'pos ← 0' }, { t: 'process', text: 'i ← 1' }, { t: 'while', cond: 'i <= N', body: [{ t: 'io', dir: 'in', text: 'input(X)' }, { t: 'process', text: 'sum ← sum + X' }, { t: 'if', cond: 'X > 0', then: [{ t: 'process', text: 'pos ← pos + 1' }] }, { t: 'process', text: 'i ← i + 1' }] }, { t: 'io', dir: 'out', text: 'output("Sum =", sum)' }, { t: 'io', dir: 'out', text: 'output("Positives =", pos)' }, { t: 'io', dir: 'out', text: 'output("Average =", sum / N)' }] },
          stdin: ['5', '3', '-2', '8', '0', '5'],
          notes: [{ line: [5, 6], note: 'Both accumulators are initialised before the loop.' }, { line: [10, 11], note: 'count-if: a conditional inside the loop body.' }],
        },
        {
          t: 'code',
          caption: 'Maximum and minimum: start from the first element',
          python: r`# DECLARATIONS
# N, i, X, max, min : int
# ALGORITHM
N = int(input())
X = int(input())
max = X
min = X
for i in range(2, N+1):
    X = int(input())
    if (X > max):
        max = X
    if (X < min):
        min = X
print("Max = " + str(max))
print("Min = " + str(min))`,
          pseudo: r`KAMUS
  N, i, X, max, min : integer
ALGORITMA
  input(N)
  input(X)
  max ← X
  min ← X
  i traversal [2..N]
    input(X)
    if (X > max) then
      max ← X
    if (X < min) then
      min ← X
  output("Max =", max)
  output("Min =", min)`,
          flow: { title: 'MaxMin', blocks: [{ t: 'io', dir: 'in', text: 'input(N)' }, { t: 'io', dir: 'in', text: 'input(X)' }, { t: 'process', text: 'max ← X' }, { t: 'process', text: 'min ← X' }, { t: 'process', text: 'i ← 2' }, { t: 'while', cond: 'i <= N', body: [{ t: 'io', dir: 'in', text: 'input(X)' }, { t: 'if', cond: 'X > max', then: [{ t: 'process', text: 'max ← X' }] }, { t: 'if', cond: 'X < min', then: [{ t: 'process', text: 'min ← X' }] }, { t: 'process', text: 'i ← i + 1' }] }, { t: 'io', dir: 'out', text: 'output("Max =", max)' }, { t: 'io', dir: 'out', text: 'output("Min =", min)' }] },
          stdin: ['4', '-5', '-2', '-9', '-7'],
          notes: [{ line: [5, 7], note: 'The first element is the starting max and min. The loop then starts at 2 because element 1 is already used.' }],
        },
        {
          t: 'predict',
          prompt: 'The max = 0 trap, with only negative data.',
          code: r`max = 0
for i in range(3):
    X = int(input())
    if (X > max):
        max = X
print(max)`,
          stdin: ['-5', '-2', '-9'],
          explain: 'Nothing is greater than 0, so `max` stays 0, a value that was never in the data. Start from the first element instead.',
        },
        {
          t: 'trap',
          md: '**`max = 0` / `min = 0`** is wrong whenever all data can be negative (or all above 0 for a min). **Dividing by `N` or `count`** without checking it is nonzero crashes on empty data. **Integer input:** `int(input())` on a decimal like `3.5` raises an error; use `float(input())` for real numbers.',
        },
        { t: 'question', id: 'x05-r6a', note: 'Average, highest and lowest of N temperatures.' },
      ],
    },
    {
      id: 'drill',
      title: 'Exam drill and summary',
      blocks: [
        {
          t: 'text',
          md: '**Whole deck at a glance**\n\n| Idea | Python | Pseudocode | Flowchart |\n|---|---|---|---|\n| one case | `if (k):` | `if (k) then` | diamond, false arrow skips |\n| two cases | `if … else:` | `if … else` | diamond, two branches merge |\n| many cases | `if … elif … else` | `if … else if … else` | chained diamonds |\n| counting loop | `for i in range(a, b+1):` | `i traversal [a..b]` | `i ← a`, `i <= b`, `i ← i + 1` |\n| backward loop | `for i in range(b, a-1, -1):` | `i traversal [b..a]` | `i >= a`, `i ← i - 1` |\n| condition loop | `while (k):` … Next-Element | `while (k) do` | diamond at top, arrow back |\n| until loop | `while True: … break` | `repeat … until (k)` | test at the bottom |\n| sentinel | read first, `while (X != s):` … read last | same | same |',
        },
        {
          t: 'key',
          md: '**Checklist before you hand in a loop:** (1) initialised **before** the loop, (2) `range` bounds: upper + 1, (3) Next-Element present and last, (4) sentinel not processed, (5) empty case handled (`count > 0`), (6) `max`/`min` start from the first element, (7) output after the loop, not inside it.',
        },
        {
          t: 'trap',
          md: 'The five classic mistakes: **off-by-one in `range`**, **`init` inside the loop**, **sentinel counted/added**, **non-disjoint `if`/`elif` order**, **`=` instead of `==`** in a condition. Also keep the declared type in line with the conversion (`int` vs `float`), and `str()` in every `print` that joins text and a number.',
        },
        {
          t: 'quiz',
          q: 'What is the value of i after `for i in range(1, 6): pass` finishes in Python?',
          options: ['5', '6', '1', 'undefined'],
          correct: [0],
          why: ['The last processed value (hmax).', 'That is what the slide wording suggests, but Python does not increment after the last pass.', 'The initial value.', 'The variable still exists after the loop.'],
        },
        { t: 'question', id: 'k18-s3a', note: 'Past UTS: average with a sentinel and a validity filter.' },
      ],
    },
  ],
}
