import type { Lesson } from '../types'
const r = String.raw
const D06 = 'D06_Array'

export const lesson: Lesson = {
  deck: 'D06',
  title: 'Array and Its Processing',
  summary: 'One name, many values: declare a Python list as an array, reach elements by index, and process it with a loop. Fill, print, sum, average, max/min, count and search are the building blocks of almost every UTS program question.',
  minutes: 45,
  goals: [
    'Declare an array in pseudocode and in Python, including `[0 for i in range(N)]`, and say which indices are valid.',
    'Fill, print, sum and average an array with a traversal loop.',
    'Find the maximum or minimum by initialising with the first element, `T[0]`.',
    'Search for the first (or last) index of X with a `found` flag, and report "not found" correctly.',
    'Count elements that meet a condition and combine two arrays index by index.',
  ],
  examAngle: 'Arrays are the backbone of the "program" archetype: almost every written UTS asks you to read N values into an array and then sum, count, find the max/min or search. Past papers add comparing two arrays index by index (observation vs prediction, two cities, two matrices). Marks are lost on `max = 0`, wrong loop bounds, counters initialised inside the loop, and not handling the "not found" case.',
  sections: [
    {
      id: 'why-arrays',
      title: 'Why arrays?',
      blocks: [
        { t: 'text', md: 'The deck opens with a problem: read three names and print every pair. With `name1`, `name2`, `name3` you write each `print` by hand. With 10 names you need 10 variables and 10 `input` lines. With 1,000,000 names it is impossible.', refs: [{ src: D06, page: 3 }, { src: D06, page: 4 }, { src: D06, page: 5 }] },
        { t: 'text', md: 'The fix is an **array** (also called vector or table): a collection of elements of the **same type**, stored one after another, and each reached through an **index**. One name, a loop, any size.', refs: [{ src: D06, page: 6 }] },
        { t: 'key', md: 'Array = many values of one type under **one name**. The index picks one element, and a **loop over the index** processes them all.' },
        { t: 'text', md: 'In Python the deck builds arrays from the `list` type. Every array program has the same shape (slide 13): **populate** the array, **process** it, **output** the result.', refs: [{ src: D06, page: 13 }] },
        { t: 'quiz', q: 'Which statements about an array are true? (tick all that apply)', options: [
          'All its elements have the same type.',
          'An element is reached by its index.',
          'A loop can process all its elements without one variable per element.',
          'Different elements of one array may be different types in the deck\'s model.',
        ], correct: [0, 1, 2], why: [
          'True: an array is homogeneous (slide 6).',
          'True: `T[i]`.',
          'True: this is the whole point, and why 10,000 names are no harder than 3.',
          'False: the array model is homogeneous (Python lists can mix, but we do not use that).',
        ] },
      ],
    },
    {
      id: 'declare',
      title: 'Declaring an array',
      blocks: [
        { t: 'text', md: 'There are two ways in Python (slides 7 to 11):\n\n1. **Give the contents:** `T = [9, 8, 7, 6]`: size 4, indices 0 to 3.\n2. **Fill with a default value** when the values are not known yet: `T = [0 for i in range(N)]`: N elements, all 0. The element type follows the default (`0` int, `\'*\'` char).', refs: [{ src: D06, page: 7 }, { src: D06, page: 9 }, { src: D06, page: 11 }] },
        { t: 'text', md: 'In the **pseudocode** (KAMUS) you declare size and bounds: `T : array [0..9] of integer`. In Python the same line is only a comment in `# DECLARATIONS`; the real creation is the list expression.' },
        { t: 'code', caption: 'Declare, then read the second option in action', python: r`# DECLARATIONS
# T : array [0..4] of int
# ALGORITHM
T = [0 for i in range(5)]
print(T[0], T[4])
T[2] = 7
print(T[2])`, pseudo: r`Program Declare
KAMUS
  T : array [0..4] of integer
ALGORITMA
  T[0] ← 0
  T[1] ← 0
  T[2] ← 0
  T[3] ← 0
  T[4] ← 0
  output(T[0], T[4])
  T[2] ← 7
  output(T[2])`, notes: [
          { line: 1, note: 'Pseudocode-style declaration, as a comment. Bounds `0..4` mean size 5.' },
          { line: 4, note: '5 elements, all initialised to 0, indices 0 to 4.', syntax: 'list-init' },
          { line: 6, note: 'Assign to one element by its index.', syntax: 'list-index' },
        ] },
        { t: 'syntax', ids: ['list-init'] },
        { t: 'predict', prompt: 'How many elements does T have, and what does each print show?', code: r`T = [5 for i in range(4)]
T[2] = 1
print(T)
print(len(T))
print(T[3])`, explain: '`range(4)` gives 4 elements (indices 0 to 3), each 5. Only index 2 was changed. The size is the number in `range(...)`, and the last index is one less.' },
        { t: 'question', id: 'd06-basics-a', note: 'Practise the exact declaration line.' },
      ],
    },
    {
      id: 'indexing',
      title: 'Indexing: 0-based, and what is out of range',
      blocks: [
        { t: 'text', md: 'Read an element as `T[index]`. The deck example uses `TabInt = [1, 2, 4, -1, 100, 2, 0, -1, 3, 9]`: `TabInt[5]` is **2**, not 100, because counting starts at **0**.', refs: [{ src: D06, page: 12 }] },
        { t: 'slide', ref: { src: D06, page: 12 }, caption: 'Slide 12: element access.' },
        { t: 'text', md: 'Pseudocode and Python can use different bounds. The lesson here is to **read the declaration**: `array [0..9]` means ten elements indexed 0 to 9. A declaration written `[1..N]` would start at 1, and then N elements run 1 to N. A Python list always starts at 0, so N elements run **0 to N-1**.' },
        { t: 'key', md: 'Python: N elements, valid indices **0 to N-1**. `T[N]` raises an `IndexError`.' },
        { t: 'trap', md: '**Erratum (slide 12):** the slide calls `TabInt[-1]` "out of range, undefined". In real Python a negative index counts from the end, so **`T[-1]` is the last element** and `T[-2]` the one before it. It is only truly out of range when you go beyond the size (`T[10]`, `T[-11]`). Do not *rely* on it in the exam: write the explicit `T[N-1]` instead.' },
        { t: 'predict', prompt: 'Which elements do these read?', code: r`T = [1, 2, 4, -1, 100, 2, 0, -1, 3, 9]
print(T[5])
print(T[1] + T[6])
print(T[-1])
print(T[len(T) - 1])
print(T[-2])`, explain: '`T[5]` is 2 (sixth element). `T[1] + T[6]` is 2 + 0. `T[-1]` and `T[len(T)-1]` are both 9, the last element. `T[-2]` is 3.' },
        { t: 'trace', caption: 'Watch one element change; the others stay put.', code: r`T = [4, 8, 15, 16]
T[0] = T[3]
T[3] = T[1] + 1
T[1] = T[-1]
print(T)`, notes: [
          { line: 2, note: 'Index 0 gets a copy of the value at index 3.' },
          { line: 4, note: '`T[-1]` is the last element (index 3), which has just changed.' },
        ] },
        { t: 'quiz', q: 'T = [0 for i in range(10)]. Which accesses are valid? (tick all that apply)', options: ['T[0]', 'T[9]', 'T[10]', 'T[-1]'], correct: [0, 1, 3], why: [
          'Valid: first element.',
          'Valid: last element.',
          'Invalid: index 10 is outside 0..9, an `IndexError`.',
          'Valid in Python (last element) even though the slide says "undefined".',
        ] },
        { t: 'question', id: 'd06-basics-c', note: 'The classic off-by-one.' },
      ],
    },
    {
      id: 'traversal',
      title: 'Traversal: fill and print',
      blocks: [
        { t: 'text', md: '**Sequential processing** visits every element from the lowest index to the highest, using a loop. The deck frames it as First-Element (`i` = first index), then Next-Element (`i ← i + 1`), until `i` passes the last index (slide 14). The general shape:', refs: [{ src: D06, page: 14 }, { src: D06, page: 16 }] },
        { t: 'code', caption: 'Slides 17 to 20: populate, then display (5 elements)', stdin: ['3', '1', '4', '1', '5'], python: r`# DECLARATIONS
# T : array [0..4] of int
# i : int
# ALGORITHM
T = [0 for i in range(5)]
for i in range(0, 5):
    T[i] = int(input())
for i in range(0, 5):
    print(T[i])`, pseudo: r`Program DisplayArray
KAMUS
  T : array [0..4] of integer
  i : integer
ALGORITMA
  i traversal [0..4]
    input(T[i])
  i traversal [0..4]
    output(T[i])`, flow: { title: 'Populate and display', blocks: [
          { t: 'process', text: 'T ← [0 for i in range(5)]' },
          { t: 'process', text: 'i ← 0' },
          { t: 'while', cond: 'i < 5', body: [{ t: 'io', dir: 'in', text: 'T[i]' }, { t: 'process', text: 'i ← i + 1' }] },
          { t: 'process', text: 'i ← 0' },
          { t: 'while', cond: 'i < 5', body: [{ t: 'io', dir: 'out', text: 'T[i]' }, { t: 'process', text: 'i ← i + 1' }] },
        ] }, notes: [
          { line: 5, note: 'Create the array first with a default value.' },
          { line: 6, note: '`range(0, 5)` gives i = 0, 1, 2, 3, 4: never 5.', syntax: 'for-range' },
          { line: 7, note: 'Each input line fills one element; always convert with `int()`.' },
          { line: 9, note: 'A second, separate traversal prints the contents.' },
        ] },
        { t: 'trap', md: '**Loop bounds.** `for i in range(0, N)` already stops at N-1. Writing `range(0, N+1)` reads one element too many (`IndexError`); writing `range(1, N)` skips element 0.' },
        { t: 'trace', caption: 'Watch i and T during the fill.', stdin: ['7', '2', '9'], code: r`T = [0 for i in range(3)]
for i in range(0, 3):
    T[i] = int(input())
print(T)`, notes: [{ line: 3, note: 'On each pass one default 0 is replaced by the typed value.' }] },
        { t: 'question', id: 'd06-populate-a', note: 'Trace populate-and-print on 10 values.' },
      ],
    },
    {
      id: 'sum-average',
      title: 'Sum and average',
      blocks: [
        { t: 'text', md: 'To sum the elements: start an accumulator at 0 **once**, then add `T[i]` on every pass. The average is the sum divided by the number of elements, and `/` always gives a float (slide 21).', refs: [{ src: D06, page: 21 }, { src: D06, page: 22 }] },
        { t: 'code', caption: 'Slides 21 and 22: average of 5 values', stdin: ['1', '2', '3', '4', '6'], python: r`# DECLARATIONS
# T : array [0..4] of int
# i, sum : int
# avg : float
# ALGORITHM
T = [0 for i in range(5)]
for i in range(0, 5):
    T[i] = int(input())
sum = 0
for i in range(0, 5):
    sum = sum + T[i]
avg = sum / 5
print("Sum =", sum)
print("Average =", avg)`, pseudo: r`Program AverageArray
KAMUS
  T : array [0..4] of integer
  i, sum : integer
  avg : real
ALGORITMA
  i traversal [0..4]
    input(T[i])
  sum ← 0
  i traversal [0..4]
    sum ← sum + T[i]
  avg ← sum / 5
  output("Sum =", sum)
  output("Average =", avg)`, flow: { title: 'Sum and average', blocks: [
          { t: 'process', text: 'T ← [0 for i in range(5)]' },
          { t: 'process', text: 'i ← 0' },
          { t: 'while', cond: 'i < 5', body: [{ t: 'io', dir: 'in', text: 'T[i]' }, { t: 'process', text: 'i ← i + 1' }] },
          { t: 'process', text: 'sum ← 0' },
          { t: 'process', text: 'i ← 0' },
          { t: 'while', cond: 'i < 5', body: [{ t: 'process', text: 'sum ← sum + T[i]' }, { t: 'process', text: 'i ← i + 1' }] },
          { t: 'process', text: 'avg ← sum / 5' },
          { t: 'io', dir: 'out', text: '"Sum =", sum' },
          { t: 'io', dir: 'out', text: '"Average =", avg' },
        ] }, notes: [
          { line: 10, note: 'The accumulator is set to 0 once, before the loop.' },
          { line: 12, note: 'Add the i-th element on each pass.' },
          { line: 13, note: 'Divide after the loop. `/` gives a float even when the sum divides evenly.' },
        ] },
        { t: 'trap', md: '**Init inside the loop.** Putting `sum = 0` inside the `for` resets the total on every element, so you get only the last value.' },
        { t: 'predict', prompt: 'What is printed? Where is the bug?', code: r`T = [3, 5, 2]
total = 0
for i in range(0, 3):
    total = 0
    total = total + T[i]
print(total)`, explain: 'The `total = 0` inside the loop wipes the sum each pass, so only the last element (2) survives. Initialise before the loop.' },
        { t: 'question', id: 'd06-average-a', note: 'Trace sum and average on 10 values.' },
      ],
    },
    {
      id: 'max-min',
      title: 'Maximum and minimum',
      blocks: [
        { t: 'text', md: 'Assume the array is not empty. **Initialise `max` with the first element `T[0]`**, then scan from index 1 and replace `max` whenever `T[i] > max` (slides 26 to 28). Minimum is the same with `<`.', refs: [{ src: D06, page: 26 }, { src: D06, page: 27 }, { src: D06, page: 28 }] },
        { t: 'code', caption: 'Slides 27 and 28: largest element', stdin: ['9', '12', '30', '-1', '0', '4'], python: r`# DECLARATIONS
# T : array [0..5] of int
# i, max : int
# ALGORITHM
T = [0 for i in range(6)]
for i in range(0, 6):
    T[i] = int(input())
max = T[0]
for i in range(1, 6):
    if (T[i] > max):
        max = T[i]
print("Largest element =", max)`, pseudo: r`Program MaxArray
KAMUS
  T : array [0..5] of integer
  i, max : integer
ALGORITMA
  i traversal [0..5]
    input(T[i])
  max ← T[0]
  i traversal [1..5]
    if (T[i] > max) then
      max ← T[i]
  output("Largest element =", max)`, flow: { title: 'Largest element', blocks: [
          { t: 'process', text: 'T ← [0 for i in range(6)]' },
          { t: 'process', text: 'i ← 0' },
          { t: 'while', cond: 'i < 6', body: [{ t: 'io', dir: 'in', text: 'T[i]' }, { t: 'process', text: 'i ← i + 1' }] },
          { t: 'process', text: 'max ← T[0]' },
          { t: 'process', text: 'i ← 1' },
          { t: 'while', cond: 'i < 6', body: [{ t: 'if', cond: 'T[i] > max', then: [{ t: 'process', text: 'max ← T[i]' }] }, { t: 'process', text: 'i ← i + 1' }] },
          { t: 'io', dir: 'out', text: '"Largest element =", max' },
        ] }, notes: [
          { line: 8, note: 'Initialise with the first element, never with 0.' },
          { line: 9, note: 'Start from index 1: element 0 is already in `max`.' },
          { line: [10, 11], note: 'Replace only when strictly greater.' },
        ] },
        { t: 'trace', caption: 'Step through: max only ever grows.', code: r`T = [9, 12, 30, -1, 0, 4]
max = T[0]
for i in range(1, 6):
    if (T[i] > max):
        max = T[i]
print(max)` },
        { t: 'trap', md: '**`max = 0`.** If every element is negative, 0 is never replaced and you print 0, which is not even in the array. The same trap with `min = 0` fails on all-positive data. Always start from `T[0]`.' },
        { t: 'predict', prompt: 'The "obvious" version. What does it print for all-negative data?', code: r`T = [-5, -2, -9]
max = 0
for i in range(0, 3):
    if (T[i] > max):
        max = T[i]
print(max)`, explain: 'It prints 0, a value that is not in T. Initialise with `T[0]` and start the loop at index 1.' },
        { t: 'question', id: 'd06-max-b', note: 'Find the faulty line.' },
      ],
    },
    {
      id: 'count-transform-compare',
      title: 'Counting, transforming and comparing',
      blocks: [
        { t: 'text', md: 'The same traversal does many jobs. **Counting** keeps one or two counters, initialised before the loop, and adds 1 when a condition holds (Exercise 2, grades A to E: A, B, C pass). **Transforming** assigns back into the array (Exercise 1: multiply every element by X). **Combining two arrays** walks one index through both (Exercise 5: `W[i] = V[i] + U[i]`).', refs: [{ src: D06, page: 24 }, { src: D06, page: 25 }, { src: D06, page: 34 }] },
        { t: 'code', caption: 'Exercise 2: count passed and failed', stdin: ['A', 'D', 'C', 'E', 'B'], python: r`# DECLARATIONS
# G : array [0..4] of char
# i, passed, failed : int
# ALGORITHM
G = ['*' for i in range(5)]
for i in range(0, 5):
    G[i] = input()
passed = 0
failed = 0
for i in range(0, 5):
    if (G[i] == 'A' or G[i] == 'B' or G[i] == 'C'):
        passed = passed + 1
    else:
        failed = failed + 1
print("Passed =", passed)
print("Failed =", failed)`, pseudo: r`Program PassFail
KAMUS
  G : array [0..4] of character
  i, passed, failed : integer
ALGORITMA
  i traversal [0..4]
    input(G[i])
  passed ← 0
  failed ← 0
  i traversal [0..4]
    if (G[i] = 'A') or (G[i] = 'B') or (G[i] = 'C') then
      passed ← passed + 1
    else
      failed ← failed + 1
  output("Passed =", passed)
  output("Failed =", failed)`, notes: [
          { line: [9, 10], note: 'Both counters start at 0, outside the loop.' },
          { line: 12, note: 'Each comparison is written in full: not `G[i] == \'A\' or \'B\'`.' },
        ] },
        { t: 'code', caption: 'Exercise 5: vector addition W = U + V', stdin: ['1', '2', '3', '4', '5', '10', '20', '30', '40', '50'], python: r`# DECLARATIONS
# V, U, W : array [0..4] of int
# i : int
# ALGORITHM
V = [0 for i in range(5)]
U = [0 for i in range(5)]
W = [0 for i in range(5)]
for i in range(0, 5):
    V[i] = int(input())
for i in range(0, 5):
    U[i] = int(input())
for i in range(0, 5):
    W[i] = V[i] + U[i]
for i in range(0, 5):
    print(W[i])`, pseudo: r`Program VectorAdd
KAMUS
  V, U, W : array [0..4] of integer
  i : integer
ALGORITMA
  i traversal [0..4]
    input(V[i])
  i traversal [0..4]
    input(U[i])
  i traversal [0..4]
    W[i] ← V[i] + U[i]
  i traversal [0..4]
    output(W[i])`, notes: [{ line: 13, note: 'The same index `i` is used in all three arrays: element i meets element i.' }] },
        { t: 'predict', prompt: 'Compare two arrays at the same index. How many positions match?', code: r`A = [1, 2, 3, 4, 5]
B = [1, 0, 3, 0, 5]
same = 0
for i in range(0, 5):
    if (A[i] == B[i]):
        same = same + 1
print(same)`, explain: 'Positions 0, 2 and 4 hold equal values, so `same` is 3. Comparing arrays means comparing element i with element i; the counter is initialised once, before the loop.' },
        { t: 'question', id: 'd06-ex2-a', note: 'Count passed and failed, with the array.' },
        { t: 'question', id: 'ku22-s7a', note: 'Observation vs prediction: comparing two arrays index by index (an exam-style version).' },
      ],
    },
    {
      id: 'search',
      title: 'Searching with a found flag',
      blocks: [
        { t: 'text', md: 'To find the **first index** where X appears, you must stop at the first hit, so a `for` over everything is not ideal. The deck uses a `while` with a **found flag** (slides 30 to 32): First-Element `i = 0`, `found = False`; keep going while `i < N` **and** the value has not been found; if `T[i] == X` set the flag, **else** move on with `i = i + 1`.', refs: [{ src: D06, page: 30 }, { src: D06, page: 31 }, { src: D06, page: 32 }] },
        { t: 'code', caption: 'SearchArray: first index of X', stdin: ['9', '12', '30', '-1', '0', '-1', '-1'], python: r`# DECLARATIONS
# T : array [0..5] of int
# i, X : int
# found : bool
# ALGORITHM
T = [0 for i in range(6)]
for i in range(0, 6):
    T[i] = int(input())
X = int(input())
i = 0
found = False
while (i < 6 and found == False):
    if (T[i] == X):
        found = True
    else:
        i = i + 1
if (found == True):
    print(X, "is found at index", i)
else:
    print(X, "is not found")`, pseudo: r`Program SearchArray
KAMUS
  T : array [0..5] of integer
  i, X : integer
  found : boolean
ALGORITMA
  i traversal [0..5]
    input(T[i])
  input(X)
  i ← 0
  found ← false
  while (i < 6) and (found = false) do
    if (T[i] = X) then
      found ← true
    else
      i ← i + 1
  if (found = true) then
    output(X, "is found at index", i)
  else
    output(X, "is not found")`, flow: { title: 'SearchArray', blocks: [
          { t: 'process', text: 'T ← [0 for i in range(6)]' },
          { t: 'process', text: 'i ← 0' },
          { t: 'while', cond: 'i < 6', body: [{ t: 'io', dir: 'in', text: 'T[i]' }, { t: 'process', text: 'i ← i + 1' }] },
          { t: 'io', dir: 'in', text: 'X' },
          { t: 'process', text: 'i ← 0' },
          { t: 'process', text: 'found ← false' },
          { t: 'while', cond: '(i < 6) and (found = false)', body: [
            { t: 'if', cond: 'T[i] = X', then: [{ t: 'process', text: 'found ← true' }], else: [{ t: 'process', text: 'i ← i + 1' }] },
          ] },
          { t: 'if', cond: 'found = true', then: [{ t: 'io', dir: 'out', text: 'X, "is found at index", i' }], else: [{ t: 'io', dir: 'out', text: 'X, "is not found"' }] },
        ] }, notes: [
          { line: 11, note: 'The flag starts false: nothing found yet.' },
          { line: 12, note: 'Two conditions. Keep `i < N` first so `T[i]` is never read out of range.', syntax: 'while' },
          { line: [13, 16], note: 'Hit: set the flag, and `i` stays on the element found. Miss: `i` moves on, only in the `else`.' },
          { line: [17, 20], note: 'Decide the message from `found`, not from `i`.' },
        ] },
        { t: 'trace', caption: 'Watch i and found. Duplicates: the loop stops at the first hit.', stdin: ['4'], code: r`T = [7, 4, 9, 4]
X = int(input())
i = 0
found = False
while (i < 4 and found == False):
    if (T[i] == X):
        found = True
    else:
        i = i + 1
print(i, found)` },
        { t: 'trap', md: '**Incrementing `i` also when found** (`i = i + 1` outside the `else`) reports an index one too high. And after the loop, never test `i == N` to see "not found" if you may stop for another reason: use `found`.' },
        { t: 'text', md: '**Search for the last index (Exercise 4).** Go **backwards**: start at the last index `N-1`, with `found = False`, loop `while (i >= 0 and found == False)`, and use `i = i - 1` in the `else`. The first hit from the end is the last occurrence.', refs: [{ src: D06, page: 33 }] },
        { t: 'predict', prompt: 'Same array, X = 4. First index forward, last index backward.', code: r`T = [4, 7, 4, 9]
X = 4
i = 0
found = False
while (i < 4 and found == False):
    if (T[i] == X):
        found = True
    else:
        i = i + 1
print(i)
i = 3
found = False
while (i >= 0 and found == False):
    if (T[i] == X):
        found = True
    else:
        i = i - 1
print(i)`, explain: 'Forward stops at index 0, backward stops at index 2. The two searches differ only in the start index, the direction of the step, and the bound.' },
        { t: 'question', id: 'd06-search-c', note: 'First index with a found flag, from stdin.' },
        { t: 'question', id: 'd06-ex4-a', note: 'Exercise 4: search the last index.' },
      ],
    },
    {
      id: 'drill',
      title: 'Exam drill and summary',
      blocks: [
        { t: 'text', md: 'The deck in one table. Notice how little changes: only the loop **bounds**, the **initialisation** and the **action**.' },
        { t: 'text', md: '| Task | Python | Pseudocode | Init / bound |\n|---|---|---|---|\n| Declare | `T = [0 for i in range(N)]` | `T : array [0..N-1] of integer` | indices 0..N-1 |\n| Element | `T[i]` | `T[i]` | `T[N]` is out of range |\n| Fill | `T[i] = int(input())` | `input(T[i])` | `i traversal [0..N-1]` |\n| Print | `print(T[i])` | `output(T[i])` | same loop |\n| Sum | `sum = sum + T[i]` | `sum ← sum + T[i]` | `sum = 0` **before** |\n| Average | `sum / N` | `sum / N` | after the loop |\n| Max | `if (T[i] > max): max = T[i]` | `if (T[i] > max) then max ← T[i]` | `max = T[0]`, i from 1 |\n| Count | `c = c + 1` under an `if` | same | `c = 0` before |\n| Search | `while (i < N and found == False)` | `while (i < N) and (found = false) do` | `i = 0`, `found = False` |\n| Search last | same, `i = N-1`, `i = i - 1`, `i >= 0` | same | go backwards |' },
        { t: 'key', md: 'Traps to avoid: (1) `range(0, N+1)` or `T[N]`: out of range. (2) `max = 0` / `min = 0` instead of `T[0]`. (3) accumulator or counter initialised **inside** the loop. (4) incrementing `i` when the value is found, or no "not found" branch. (5) forgetting `int()` on input, or `str()` when joining text with `+`.' },
        { t: 'quiz', q: 'You must find the largest of N integers (N >= 1) in T. Which program is correct?', options: [
          'max = 0, then for i in range(0, N): if T[i] > max: max = T[i]',
          'max = T[0], then for i in range(1, N): if T[i] > max: max = T[i]',
          'max = T[0], then for i in range(1, N+1): if T[i] > max: max = T[i]',
          'for i in range(0, N): max = 0; if T[i] > max: max = T[i]',
        ], correct: [1], why: [
          'Fails on all-negative data: 0 is never replaced.',
          'Correct: first element as the start, scan the rest.',
          '`range(1, N+1)` reaches index N: an `IndexError`.',
          '`max = 0` inside the loop resets it every pass.',
        ] },
        { t: 'question', id: 'k18-s3b', note: 'Harder: maximum, count and display in one program.' },
      ],
    },
  ],
}
