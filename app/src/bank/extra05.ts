// Deck 05 Extra Exercises (D05_ExtraExercises): conditionals + repetitions, each as Pseudocode + Flowchart + Python.
// Pseudocode/flowchart printed in the deck: Cond 1-3 and Rep 1. All other pseudo/flow were written for this site
// in the same notation (marked "written for this site" in the explanation). Rep 5 and Rep 6 have no deck solution.
import type { BankFile } from '../types'

const r = String.raw
const SRC = 'D05_ExtraExercises'
const src = (label: string, pages: number[]) => ({ kind: 'extra' as const, lang: 'en' as const, src: SRC, label, pages, official: true })
const ref = (...pages: number[]) => pages.map((page) => ({ src: SRC, page }))

// BMKG test data: pairs 20+d / 20-d so the average is exactly 20 (clean float output)
const pairs = (d: number[]) => d.flatMap((x) => [20 + x, 20 - x])
const D14 = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 5]
const asc = pairs(D14).sort((a, b) => a - b).map(String)
const mixed31 = [...pairs([5, 1, 4, 2, 3, 1, 5, 2, 4, 3, 1, 2, 3, 4, 5]).map(String), '20']
const flat28 = Array.from({ length: 28 }, () => '22')

export const bank: BankFile = {
  problems: [
    /* ============================== CONDITIONALS ============================== */
    {
      id: 'x05-c1', archetype: 'program', title: 'Conditionals Exercise 1. Largest of Two Numbers',
      source: src('Conditionals Exercise 1', [4, 9, 10, 11]),
      intro: 'Write a program that reads two integers, for example A and B, and writes down which of the two numbers is the largest.\n\n- If A > B, then the largest number = A\n- If A < B, then the largest number = B\n- If A = B, then the largest number is A or B (meaning the output will be the same as one of the 2 cases above)\n\nAre these 3 cases or only 2 cases?',
      parts: [
        {
          id: 'x05-c1a', kind: 'program', label: 'a', decks: ['D05'], topic: 'If-else', patterns: ['if-else'], misconceptions: ['input-is-str', 'assign-vs-eq'],
          stem: 'Write a program that reads two integers, for example A and B, and writes down which of the two numbers is the largest.',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient',
          solution: {
            python: r`# Program Max2Integer
# Print the largest value of the input 2 integers

# DECLARATIONS
# A, B : int

# ALGORITHM
A = int(input())
B = int(input())

if (A >= B):
    print(A)
else: # A < B
    print(B)`,
            pseudo: r`input(A, B)
if (A >= B) then
    output(A)
else { A < B }
    output(B)`,
            flow: { title: 'Exercise 1. Largest of Two Numbers', blocks: [
              { t: 'io', dir: 'in', text: 'input(A,B)' },
              { t: 'if', cond: 'A >= B', then: [{ t: 'io', dir: 'out', text: 'output (A)' }], else: [{ t: 'io', dir: 'out', text: 'output (B)' }] },
            ] },
          },
          tests: [
            { name: 'A > B', stdin: ['5', '3'] }, { name: 'A < B', stdin: ['3', '5'] }, { name: 'A = B', stdin: ['4', '4'], edge: 'A = B' },
            { name: '2-digit vs 1-digit number', stdin: ['10', '9'], edge: '10 vs 9 (string comparison is wrong)' }, { name: 'negative', stdin: ['-2', '-7'], edge: 'negative' },
          ],
          wrong: [
            { code: 'A = input()\nB = input()\nif (A >= B):\n    print(A)\nelse:\n    print(B)', msg: '`input()` returns a string, so "10" < "9". Wrap it in `int(...)` before comparing.', tag: 'input-is-str' },
            { code: 'A = int(input())\nB = int(input())\nif (A >= B):\n    print(A)', msg: 'There is no `else`: if A < B nothing is printed at all. Both cases must be handled.' },
          ],
          plan: 'read A and B; if A >= B print A, otherwise print B (A = B may go into either branch)',
          skeleton: 'A = int(input())\nB = int(input())\nif (A ___ B):\n    print(___)\nelse: # A < B\n    print(___)',
          hints: ['The problem lists three cases, but does each one need its own branch? Look at the output for A = B.', 'The case A = B gives the same output as one of the other cases, so two complementary branches are enough.'],
          work: ['Read the two integers with `int(input())`.', 'The case A = B can be merged into A > B (or into A < B): two cases are enough.', 'Choose the condition `A >= B` → print A; its complement A < B → print B.'],
          syntax: ['program-template', 'input', 'type-conversion', 'if-else', 'relational-logical'],
          lineNotes: [
            { line: [1, 5], note: 'Lecture-style skeleton: program name, specification, then the DECLARATIONS as comments `# name : type`.', syntax: 'program-template' },
            { line: 7, note: 'The ALGORITHM part starts here.' },
            { line: [8, 9], note: '`int(input())`: `input()` always returns a string, so it must be converted for a numeric comparison ("10" > "9" is false as strings).', syntax: 'type-conversion' },
            { line: 11, note: 'The condition `A >= B` uses `>=` so the case A = B also enters the first branch (the output is the same). The condition is written in parentheses, lecture style.', syntax: 'if-else' },
            { line: 12, note: 'Indented by 4 spaces: the body of the `if` branch.', syntax: 'indentation' },
            { line: [13, 14], note: '`else` is the complement of `A >= B`, i.e. A < B; the comment `# A < B` marks the implied condition.' },
          ],
          pseudoNotes: [
            { line: 1, note: '`input(A, B)`: reads two values at once; no type conversion is needed in pseudocode.' },
            { line: 2, note: '`if (A >= B) then`: a two-way branch; `>=` takes care of the equal case.' },
            { line: 3, note: 'Action of the true branch, indented under `then`.' },
            { line: [4, 5], note: '`else { A < B }`: the `{ }` comment records the implied complementary condition.' },
          ],
          explanation: 'There are only **2 cases**, not 3: if A = B the output equals that of one of the other cases, so it is merged into `A >= B` (the slide alternative: first branch `A >= B` → print A, complement `A < B` → print B). Note: slide 9 writes "If A >= B, then the largest number is B", which is a typo and should read A; the pseudocode and Python on slides 10-11 are correct. The pseudocode and flowchart are on slide 10 (flowchart: start → input(A,B) → diamond `A >= B` → output(A) / output(B) → end).',
          refs: ref(4, 9, 10, 11),
        },
        {
          id: 'x05-c1b', kind: 'open', label: 'b', decks: ['D05'], topic: 'If-else', patterns: ['if-else'],
          stem: 'Exercise 1 asks: "Are these 3 cases or only 2 cases?" Explain, and give the condition you would use for each case.',
          answer: 'Only **2 cases**. The case A = B does not need its own branch because its output is the same as one of the other cases. So: if `A >= B` print A (A = B falls here), otherwise (`A < B`, the complement of the first condition) print B. `A > B` → A, otherwise → B also works. The cases must be disjoint and complete.',
          keyPoints: ['States that there are 2 cases', 'A = B is merged into one branch because the output is the same', 'The second condition is the complement of the first'],
          explanation: 'Slide 4 asks whether it is 3 or 2 cases; slide 9 gives the answer: 2 cases with complementary conditions.',
          refs: ref(4, 9),
        },
      ],
    },
    {
      id: 'x05-c2', archetype: 'program', title: 'Conditionals Exercise 2. Form of Water',
      source: src('Conditionals Exercise 2', [5, 12, 13]),
      intro: 'Write a program that receives the temperature of water (in degrees Celsius) and prints the form of the water to the screen, whether it is "frozen", "liquid", or "steam".\n\n- If the water temperature is <= 0 degrees, then print "frozen"\n- If the water temperature is > 0 and < 100 degrees, then print "liquid"\n- If the water temperature is >= 100, then print "steam"',
      parts: [
        {
          id: 'x05-c2a', kind: 'program', label: 'a', decks: ['D05'], topic: 'If-elif', patterns: ['if-elif', 'nested-if'], misconceptions: ['input-is-str'],
          stem: 'Write a program that receives the temperature of water (in degrees Celsius) and prints the form of the water to the screen, whether it is "frozen", "liquid", or "steam".',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient',
          solution: {
            python: r`# Program WaterForm
# Print the form of water depending on the temperature input

# DECLARATIONS
# T : float

# ALGORITHM
T = float(input())

if (T <= 0):
    print ("frozen")
elif (T > 0 and T < 100):
    print ("liquid")
else: # T >= 100
    print ("steam")`,
            pseudo: r`input(T)   { T is water temperature }
if (T <= 0) then
    output("frozen")
else if (T > 0 and T < 100) then
    output("liquid")
else { T >= 100 }
    output("steam")`,
            flow: { title: 'Exercise 2. Form of Water', blocks: [
              { t: 'io', dir: 'in', text: 'input(T)' },
              { t: 'if', cond: 'T<=0', then: [{ t: 'io', dir: 'out', text: 'output("frozen")' }], else: [
                { t: 'if', cond: 'T > 0 and T < 100', then: [{ t: 'io', dir: 'out', text: 'output("liquid")' }], else: [{ t: 'io', dir: 'out', text: 'output("steam")' }] },
              ] },
            ] },
          },
          tests: [
            { name: 'frozen', stdin: ['-5'] }, { name: 'boundary 0', stdin: ['0'], edge: 'T = 0 → frozen' }, { name: 'liquid', stdin: ['50'] },
            { name: 'decimal', stdin: ['99.5'], edge: 'decimal < 100 → liquid (needs float)' }, { name: 'boundary 100', stdin: ['100'], edge: 'T = 100 → steam' }, { name: 'steam', stdin: ['150'] },
          ],
          wrong: [
            { code: 'T = float(input())\nif (T < 0):\n    print("frozen")\nelif (T > 0 and T < 100):\n    print("liquid")\nelse:\n    print("steam")', msg: 'Wrong boundary at 0: the specification says `<= 0` for frozen. With `T < 0`, T = 0 falls into `else` and prints "steam".' },
            { code: 'T = float(input())\nif (T <= 0):\n    print("frozen")\nelif (T > 0 and T <= 100):\n    print("liquid")\nelse:\n    print("steam")', msg: 'Wrong boundary at 100: `T <= 100` makes 100 liquid, but the specification says `>= 100` is steam.' },
            { code: 'T = int(input())\nif (T <= 0):\n    print("frozen")\nelif (T > 0 and T < 100):\n    print("liquid")\nelse:\n    print("steam")', msg: 'The temperature can be a decimal (e.g. 99.5); `int(input())` raises an error for decimal input. Use `float(input())`.', tag: 'input-is-str' },
          ],
          plan: 'read T; if T <= 0 → "frozen"; otherwise, if T > 0 and T < 100 → "liquid"; otherwise (T >= 100) → "steam"',
          skeleton: 'T = float(input())\nif (T ___ 0):\n    print("frozen")\nelif (T > 0 ___ T < ___):\n    print("liquid")\nelse: # T >= 100\n    print(___)',
          hints: ['There are three disjoint cases. Draw a number line with the points 0 and 100; which case does each boundary point belong to?', 'In an `if / elif / else` chain the first true case is chosen, and the last case (`else`) is the complement of the rest.'],
          work: ['Read the temperature as a `float` because it can be a decimal.', 'Case 1: `T <= 0` → "frozen".', 'Case 2: `T > 0 and T < 100` → "liquid" (both conditions must hold at once: `and`).', 'Case 3 = the rest, i.e. `T >= 100` → "steam".'],
          syntax: ['type-conversion', 'if-elif', 'relational-logical'],
          lineNotes: [
            { line: [1, 5], note: 'Title + specification + DECLARATIONS; `T : float` because the temperature can be a decimal.', syntax: 'program-template' },
            { line: 8, note: '`float(input())`: the water temperature need not be a whole number; `int()` would raise an error for "99.5".', syntax: 'type-conversion' },
            { line: [10, 11], note: 'Case 1: `<= 0` (0 counts as frozen).', syntax: 'if-elif' },
            { line: [12, 13], note: 'Case 2: two conditions joined by `and`; 0 is already caught by case 1 and 100 does not pass `T < 100`.', syntax: 'relational-logical' },
            { line: [14, 15], note: '`else` = the complement of the two previous cases, i.e. `T >= 100` (written as a comment).' },
          ],
          pseudoNotes: [
            { line: 1, note: '`input(T)` with a `{ }` comment explaining what T means.' },
            { line: [2, 3], note: 'Case 1: T <= 0.' },
            { line: [4, 5], note: '`else if (...) then`: case 2 with `and`.' },
            { line: [6, 7], note: '`else { T >= 100 }`: the remaining case; the comment records the condition.' },
          ],
          explanation: 'The three cases are disjoint and complete: `T <= 0`, `0 < T < 100`, `T >= 100`. Python uses an `if/elif/else` chain. The flowchart on slide 12 uses one diamond with three branches labelled `T<=0`, `T > 0 and T < 100`, `T >= 100`; in the tree blocks it is written as nested `if` (equivalent). The curly quotes on the slide were replaced by straight quotes.',
          refs: ref(5, 12, 13),
        },
        {
          id: 'x05-c2b', kind: 'trace', label: 'b', decks: ['D05'], topic: 'Reading a flowchart', patterns: ['if-elif'],
          stem: 'Trace the flowchart below (slide 12) for the input `100`. What is the output?',
          flow: { title: 'Form of Water', blocks: [
            { t: 'io', dir: 'in', text: 'input(T)' },
            { t: 'if', cond: 'T<=0', then: [{ t: 'io', dir: 'out', text: 'output("frozen")' }], else: [
              { t: 'if', cond: 'T > 0 and T < 100', then: [{ t: 'io', dir: 'out', text: 'output("liquid")' }], else: [{ t: 'io', dir: 'out', text: 'output("steam")' }] },
            ] },
          ] },
          stdin: ['100'], ask: 'output', syntax: ['if-elif'],
          lineNotes: [
            { line: 1, note: 'Parallelogram `input(T)`: T = 100.' },
            { line: 2, note: 'First diamond: `T<=0` is false for 100, follow the false branch.' },
            { line: 3, note: 'Second diamond: `T > 0 and T < 100`; `T < 100` is false, so take the false branch.' },
            { line: 4, note: 'Remaining branch (T >= 100) → output("steam").' },
          ],
          explanation: '100 is not <= 0 and not < 100, so it falls into the last branch: `steam`. The boundary value 100 is always steam.',
          refs: ref(12),
        },
      ],
    },
    {
      id: 'x05-c3', archetype: 'program', title: 'Conditionals Exercise 3. Total of Serial Resistance',
      source: src('Conditionals Exercise 3', [6, 14, 15, 16]),
      intro: 'Write a program that accepts 3 resistances (R1, R2, R3) and produces a total resistance (RT) if connected in series.\n\nRT = R1 + R2 + R3\n\nR1, R2, and R3 cannot be negative. If just one resistance is negative, then the total resistance cannot be calculated and the error message "Total resistance cannot be calculated" will appear on the screen.',
      parts: [{
        id: 'x05-c3a', kind: 'program', label: 'a', decks: ['D05'], topic: 'Branching with compound conditions', patterns: ['if-else', 'game-rules'], misconceptions: ['int-vs-float-div'],
        stem: 'Write a program that accepts 3 resistances (R1, R2, R3) and produces a total resistance (RT) if connected in series, RT = R1 + R2 + R3. If just one resistance is negative, print the error message "Total resistance cannot be calculated".',
        reps: ['python', 'pseudo', 'flow'], match: 'lenient',
        solution: {
          python: r`# Program SerialResistance
# Calculate total of serial resistance based on resistance R1, R2, R3

# DECLARATIONS
# R1, R2, R3 : float

# ALGORITHM
R1 = float(input()); R2 = float(input()); R3 = float(input())

if ((R1 >= 0) and (R2 >= 0) and (R3 >= 0)):
    print (R1 + R2 + R3)
else: # R1 < 0 atau R2 < 0 atau R3 < 0
    print("Total resistance cannot be calculated")`,
          pseudo: r`input (R1, R2, R3)
if (R1 >= 0) and (R2 >= 0) and (R3 >= 0) then
    output(R1+R2+R3)
else {R1 < 0 or R2 < 0 or R3 < 0}
    output("Total resistance cannot be calculated")`,
          flow: { title: 'Exercise 3. Total of Serial Resistance', blocks: [
            { t: 'io', dir: 'in', text: 'input(R1,R2,R3)' },
            { t: 'if', cond: 'R1>=0 and R2>=0 and R3>=0', then: [{ t: 'io', dir: 'out', text: 'output(R1+R2+R3)' }], else: [{ t: 'io', dir: 'out', text: 'output("Total resistance cannot be calculated")' }] },
          ] },
        },
        tests: [
          { name: 'all positive', stdin: ['10', '20', '30'] }, { name: 'zero allowed', stdin: ['5', '0', '5'], edge: 'R2 = 0 (not negative)' },
          { name: 'R1 negative', stdin: ['-1', '2', '3'] }, { name: 'R3 negative', stdin: ['1', '2', '-3'], edge: 'only R3 negative' },
          { name: 'decimal', stdin: ['1.5', '2.5', '3'] }, { name: 'all zero', stdin: ['0', '0', '0'], edge: 'all zero' },
        ],
        wrong: [
          { code: 'R1 = float(input()); R2 = float(input()); R3 = float(input())\nif ((R1 > 0) and (R2 > 0) and (R3 > 0)):\n    print(R1 + R2 + R3)\nelse:\n    print("Total resistance cannot be calculated")', msg: 'A resistance of 0 is not negative, so it is valid. The valid condition is `>= 0`, not `> 0`.' },
          { code: 'R1 = float(input()); R2 = float(input()); R3 = float(input())\nif ((R1 >= 0) or (R2 >= 0) or (R3 >= 0)):\n    print(R1 + R2 + R3)\nelse:\n    print("Total resistance cannot be calculated")', msg: '`or` only rejects when ALL are negative. The problem rejects if even one is negative, so the three conditions must be joined with `and`.' },
          { code: 'R1 = float(input()); R2 = float(input()); R3 = float(input())\nif (R1 >= 0 and R2 >= 0):\n    print(R1 + R2 + R3)\nelse:\n    print("Total resistance cannot be calculated")', msg: 'R3 is not checked: a negative R3 still produces a sum. Check all three resistances.' },
        ],
        plan: 'read R1, R2, R3; if all three are >= 0 print R1+R2+R3; otherwise print the error message',
        skeleton: 'R1 = float(input()); R2 = float(input()); R3 = float(input())\nif ((R1 >= ___) ___ (R2 >= ___) ___ (R3 >= ___)):\n    print(___)\nelse:\n    print("Total resistance cannot be calculated")',
        hints: ['When can the sum be computed? Write the valid condition for one resistance, then combine it for three.', 'All must be valid at once: the logical operator that requires all conditions to hold is `and`. Its complement is "at least one is negative".'],
        work: ['Read the three resistances as `float`.', 'Valid condition per resistance: `>= 0` (zero is valid).', 'Join them with `and`; the true branch prints the sum.', 'The else branch = at least one is negative → error message.'],
        syntax: ['input', 'type-conversion', 'if-else', 'relational-logical'],
        lineNotes: [
          { line: [1, 5], note: 'Program header; all three resistances are of type `float`.', syntax: 'program-template' },
          { line: 8, note: 'Three `float(input())` on one line separated by `;` (allowed in Python). The input is still three separate lines.', syntax: 'input' },
          { line: 10, note: '`and` between the three conditions: valid only if all three are `>= 0`. Zero is valid, so `>=` and not `>`.', syntax: 'relational-logical' },
          { line: 11, note: 'The series result = the sum; since it is a float it prints e.g. `60.0`.' },
          { line: [12, 13], note: '`else` = the complement (De Morgan): at least one resistance is negative.' },
        ],
        pseudoNotes: [
          { line: 1, note: 'One `input` for three values.' },
          { line: 2, note: 'Three conditions with `and`.' },
          { line: 3, note: 'Valid branch: output the expression directly.' },
          { line: [4, 5], note: 'Complement comment. The slide writes `{R1 < 0 or R2 < 0 or R3 >= 0}` (a typo); the correct one is `R3 < 0`, fixed here.' },
        ],
        explanation: 'The valid condition is that all three resistances are `>= 0` (joined by `and`); its complement (De Morgan) is "R1 < 0 or R2 < 0 or R3 < 0". Typos on the slides: slide 14 writes "R1 <= 0 or R2 < 0 or R3 < 0", and the pseudocode comment on slide 15 has "R3 >= 0"; the condition used in the code (`>= 0` for all three) is correct and the comment is fixed here. Flowchart on slide 15: a single diamond `R1>=0 and R2>=0 and R3>=0`.',
        refs: ref(6, 14, 15, 16),
      }],
    },
    {
      id: 'x05-c4', archetype: 'program', title: 'Conditionals Exercise 4. Rank of 3 Numbers',
      source: src('Conditionals Exercise 4', [7, 17, 18, 19]),
      intro: 'Given 3 integers that are read from the keyboard, for example A, B, C. Assume that these three numbers are different. Print on the screen the three numbers in order from largest to smallest.\n\nExample: A = 1, B = -1, C = 2 → displays on the screen: 2 1 -1',
      parts: [
        {
          id: 'x05-c4a', kind: 'program', label: 'a', decks: ['D05'], topic: 'Nested branching / enumeration', patterns: ['if-elif', 'nested-if'], misconceptions: ['constraint-missed'],
          stem: 'Given 3 different integers A, B, C read from the keyboard, print the three numbers in order from largest to smallest (e.g. A = 1, B = -1, C = 2 → `2 1 -1`).',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient',
          solution: {
            python: r`# Program Rank3Numbers
# Accepts input of 3 numbers: A, B, C
# Print all three numbers in descending order
# Assumptions A, B, C are different

# DECLARATIONS
# A, B, C : int

# ALGORITHM
A = int(input()); B = int(input()); C = int(input())

if (A > B) and (B > C):
    print (A, " ", B, " ", C)
elif (A > C) and (C > B):
    print (A, " ", C, " ", B)
elif (B > A) and (A > C):
    print (B, " ", A, " ", C)
elif (B > C) and (C > A):
    print (B, " ", C, " ", A)
elif (C > A) and (A > B):
    print (C, " ", A, " ", B)
else: # C > B > A
    print (C, " ", B, " ", A)`,
            pseudo: r`input(A, B, C)
if (A > B) and (B > C) then
    output(A, " ", B, " ", C)
else if (A > C) and (C > B) then
    output(A, " ", C, " ", B)
else if (B > A) and (A > C) then
    output(B, " ", A, " ", C)
else if (B > C) and (C > A) then
    output(B, " ", C, " ", A)
else if (C > A) and (A > B) then
    output(C, " ", A, " ", B)
else { C > B > A }
    output(C, " ", B, " ", A)`,
            flow: { title: 'Rank of 3 Numbers (alternative 1)', blocks: [
              { t: 'io', dir: 'in', text: 'input(A,B,C)' },
              { t: 'if', cond: 'A > B and B > C', then: [{ t: 'io', dir: 'out', text: 'output(A, " ", B, " ", C)' }], else: [
                { t: 'if', cond: 'A > C and C > B', then: [{ t: 'io', dir: 'out', text: 'output(A, " ", C, " ", B)' }], else: [
                  { t: 'if', cond: 'B > A and A > C', then: [{ t: 'io', dir: 'out', text: 'output(B, " ", A, " ", C)' }], else: [
                    { t: 'if', cond: 'B > C and C > A', then: [{ t: 'io', dir: 'out', text: 'output(B, " ", C, " ", A)' }], else: [
                      { t: 'if', cond: 'C > A and A > B', then: [{ t: 'io', dir: 'out', text: 'output(C, " ", A, " ", B)' }], else: [{ t: 'io', dir: 'out', text: 'output(C, " ", B, " ", A)' }] },
                    ] },
                  ] },
                ] },
              ] },
            ] },
          },
          tests: [
            { name: 'example from the problem', stdin: ['1', '-1', '2'] }, { name: 'A > B > C', stdin: ['3', '2', '1'] }, { name: 'C > B > A', stdin: ['1', '2', '3'], edge: 'reversed (else branch)' },
            { name: 'A > C > B', stdin: ['3', '1', '2'], edge: 'A largest, C in the middle' }, { name: 'B > A > C', stdin: ['2', '3', '1'] }, { name: 'B > C > A', stdin: ['1', '3', '2'] }, { name: 'C > A > B', stdin: ['2', '1', '3'] },
          ],
          wrong: [
            { code: 'A = int(input()); B = int(input()); C = int(input())\nif (A > B) and (B > C):\n    print(A, B, C)\nelif (A > C) and (C > B):\n    print(A, C, B)\nelif (B > A) and (A > C):\n    print(B, A, C)\nelif (B > C) and (C > A):\n    print(B, A, C)\nelif (C > A) and (A > B):\n    print(C, A, B)\nelse:\n    print(C, B, A)', msg: 'One branch prints a wrong order (B > C > A must print B C A). Check each case against the 6 permutations.' },
            { code: 'A = int(input()); B = int(input()); C = int(input())\nif (A > B) and (A > C):\n    print(A, B, C)\nelif (B > A) and (B > C):\n    print(B, A, C)\nelse:\n    print(C, A, B)', msg: 'It only finds the largest and then orders the rest arbitrarily. The two remaining numbers must also be compared (6 cases, or nested branches).' },
          ],
          plan: 'read A, B, C; enumerate the 6 orderings: for each permutation (X > Y > Z) print X Y Z; the last case uses else',
          skeleton: 'A = int(input()); B = int(input()); C = int(input())\nif (A > B) and (B > C):\n    print(A, " ", B, " ", C)\nelif (A > C) and (C > ___):\n    print(A, " ", C, " ", ___)\nelif (B > A) and (A > ___):\n    print(___, " ", ___, " ", ___)\n# ... three more cases\nelse: # C > B > A\n    print(C, " ", B, " ", A)',
          hints: ['How many orderings are possible for 3 different numbers? Write them all as X > Y > Z.', 'Another option: find the largest first, then compare the remaining two (nested branches).'],
          work: ['There are 3! = 6 permutations.', 'Each case is written as two comparisons joined by `and` (X > Y and Y > Z).', 'The first five cases use `if/elif`; the sixth need not be tested: it is the complement, so `else`.'],
          syntax: ['input', 'if-elif', 'relational-logical', 'print-str'],
          lineNotes: [
            { line: [1, 7], note: 'Header; the three numbers are `int`, assumed different (no equal case).', syntax: 'program-template' },
            { line: 10, note: 'Three inputs are read in sequence, separated by `;`.', syntax: 'input' },
            { line: [12, 13], note: 'Case 1: A > B > C → print A B C.', syntax: 'if-elif' },
            { line: [14, 21], note: 'Cases 2-5: each `elif` is one permutation (X > Y) and (Y > Z). The print order follows the descending order of values.' },
            { line: [22, 23], note: '`else`: the only remaining permutation, C > B > A, so it need not be tested again.' },
            { line: 13, note: '`print(A, " ", B, " ", C)` uses commas, so Python inserts a space between the arguments (a double space appears; the slide writes it exactly that way).' },
          ],
          pseudoNotes: [
            { line: 1, note: 'Read three numbers.' },
            { line: [2, 11], note: 'An `if ... else if ...` chain: one permutation per case.' },
            { line: [12, 13], note: 'The last case as `else` (complement) with a comment of its condition.' },
          ],
          explanation: 'Slides 17-18 give several alternatives: (1) enumerate the 6 relations of A, B, C; (2) compare two numbers, then determine the position of the third; (3) find the largest, then the positions of the other two. Slide 19 has alternative 1 in Python, and its short form `if (A > B > C):`. The pseudocode and flowchart were written for this site following alternative 1 (not printed in the deck). Note: `print(A, " ", B, " ", C)` produces a double space; lenient output matching ignores that.',
          refs: ref(7, 17, 18, 19),
        },
        {
          id: 'x05-c4b', kind: 'open', label: 'b', decks: ['D05'], topic: 'Branching strategy', patterns: ['nested-if'],
          stem: 'Slide 17-18 give several alternative strategies for ranking 3 numbers. Describe at least two different strategies, and say how many cases each one needs.',
          answer: 'Example answer (many answers are valid): (1) **Enumeration** of all relations of A, B, C: 6 permutations, one branch each. (2) **Compare two numbers first**, then determine the position of the third: if A > B then A is left of B, and C remains to be placed (C < B → A B C; C in between → A C B; C > A → C A B); then the case A < B. (3) **Find the largest** of A, B, C, then order the remaining two with one comparison (3 possible largest × 2 orders = 6 results). All of them produce the 6 possible outputs; they differ only in the number of comparisons and the depth of branching.',
          keyPoints: ['Enumerate the 6 permutations', 'Compare two first, then insert the third', 'Find the largest, then order the other two', 'All still produce the same 6 possible outputs'],
          explanation: 'See slides 17-18. This discussion shows that one problem can be broken down with different branching strategies.',
          refs: ref(17, 18),
        },
      ],
    },

    /* ============================== REPETITIONS ============================== */
    {
      id: 'x05-r1', archetype: 'program', title: 'Repetition Exercise 1. Sum of Multiples of 5',
      source: src('Repetition Exercise 1', [22, 31, 32]),
      intro: 'Create a program that reads a positive integer value, for example N, and adds (and displays) all multiples of 5 between 1 and N.\n\n| No | Input N | Output | Note |\n|---|---|---|---|\n| 1 | 5 | 5 | There is only 1 multiple of 5 between 1 and 5, namely 5 |\n| 2 | 26 | 75 | Multiples of 5 between 1 and 26 are 5, 10, 15, 20, 25; 5+10+15+20+25 = 75 |\n| 3 | 4 | 0 | There are no multiples of 5 between 1 and 4 |',
      parts: [
        {
          id: 'x05-r1a', kind: 'program', label: 'a', decks: ['D05'], topic: 'for + if (conditional accumulation)', patterns: ['for-count', 'accumulate-sum', 'count-if'], misconceptions: ['off-by-one', 'init-in-loop'],
          stem: 'Create a program that reads a positive integer value N, and adds (and displays) all multiples of 5 between 1 and N. (N = 5 → 5; N = 26 → 75; N = 4 → 0.)',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient',
          solution: {
            python: r`# Program SumKelipatan5
# Menerima masukan N bilangan integer positif
# dan menampilkan penjumlahan bilangan kelipatan 5 dari 1 s.d. N

# DECLARATIONS
# N, i, sum : int

# ALGORITHM
# Masukan grade N
N = int(input())

# Menghitung penjumlahan bilangan kelipatan 5 antara 1 s.d. N
sum = 0
for i in range(1,N+1):
    if (i % 5 == 0):
        sum = sum + i

# Terminasi
print(sum)`,
            pseudo: r`input(N) { Initialization }
sum ← 0 { Initialization }
i traversal [1..N]
    { aksi }
    if (i mod 5 = 0) then {cek kelipatan 5}
        sum ← sum + i
output(sum) { terminasi }`,
            flow: { title: 'Exercise 1', blocks: [
              { t: 'io', dir: 'in', text: 'input(N)' },
              { t: 'process', text: 'sum ← 0' },
              { t: 'process', text: 'i ← 1' },
              { t: 'while', cond: 'i <= N', body: [
                { t: 'if', cond: 'i mod 5 = 0', then: [{ t: 'process', text: 'sum ← sum + i' }] },
                { t: 'process', text: 'i ← i + 1' },
              ] },
              { t: 'io', dir: 'out', text: 'output(sum)' },
            ] },
          },
          tests: [
            { name: 'N = 5', stdin: ['5'], edge: 'N is a multiple of 5 and is included in the sum' }, { name: 'N = 26', stdin: ['26'] }, { name: 'N = 4', stdin: ['4'], edge: 'no multiple of 5 → 0' },
            { name: 'N = 5', stdin: ['1'], edge: 'N = 1' }, { name: 'N = 10', stdin: ['10'] }, { name: 'N = 100', stdin: ['100'] },
          ],
          wrong: [
            { code: 'N = int(input())\nsum = 0\nfor i in range(1, N):\n    if (i % 5 == 0):\n        sum = sum + i\nprint(sum)', msg: '`range(1, N)` stops at N-1, so N = 5 is not included. Use `range(1, N+1)`.', tag: 'off-by-one' },
            { code: 'N = int(input())\nfor i in range(1, N+1):\n    sum = 0\n    if (i % 5 == 0):\n        sum = sum + i\nprint(sum)', msg: '`sum = 0` inside the loop resets the total on every iteration; the result is only the last multiple of 5 (or 0). Initialise before the loop.', tag: 'init-in-loop' },
            { code: 'N = int(input())\nsum = 0\nfor i in range(1, N+1):\n    sum = sum + i\nprint(sum)', msg: 'All numbers are summed; there is no check for a multiple of 5 (`i % 5 == 0`).' },
          ],
          plan: 'read N; sum ← 0; for i from 1 to N: if i is divisible by 5, sum ← sum + i; print sum',
          skeleton: 'N = int(input())\nsum = ___\nfor i in range(___, ___):\n    if (i % ___ == 0):\n        sum = ___\nprint(sum)',
          hints: ['The number of iterations is known (1 to N): which kind of loop fits best?', 'How do you know i is a multiple of 5? Use the remainder `%`.', 'The accumulator is initialised before the loop; the upper bound of `range` is not included.'],
          work: ['Read N and initialise `sum = 0`.', 'Traverse i = 1..N with `for i in range(1, N+1)`.', 'Inside the loop, `if (i % 5 == 0)` adds i to sum.', 'After the loop (termination), print sum.'],
          syntax: ['program-template', 'input', 'for-range', 'if', 'operators'],
          lineNotes: [
            { line: [1, 6], note: 'Header, specification, DECLARATIONS. `sum` is used as a variable name (it shadows the built-in function `sum`; the lecture still uses it).', syntax: 'program-template' },
            { line: [8, 10], note: 'The input part (Initialization): the slide comment "Masukan grade N" is left over from another slide; what is read is N.' },
            { line: [12, 13], note: 'Initialise the accumulator **before** the loop; inside the loop its value would be reset.' },
            { line: 14, note: '`range(1,N+1)`: 1, 2, …, N. The upper bound is excluded, so N+1 so that N (e.g. 5) is also checked.', syntax: 'for-range' },
            { line: [15, 16], note: '`i % 5 == 0`: remainder 0 means a multiple of 5. `==` is comparison, not `=`. Only multiples of 5 are added.', syntax: 'if' },
            { line: [18, 19], note: 'Termination: not indented, so it prints once after the loop finishes. N < 5 gives 0 (the loop runs but the `if` is never true).' },
          ],
          pseudoNotes: [
            { line: [1, 2], note: 'Initialization: read N and `sum ← 0`.' },
            { line: 3, note: '`i traversal [1..N]`: i goes through 1 to N (both bounds included), equivalent to `for i in range(1,N+1)`.', syntax: 'for-range' },
            { line: 4, note: 'The `{ aksi }` comment ("action") marks the action part of the initialization-action-termination pattern.' },
            { line: [5, 6], note: '`mod` is the remainder; `=` in pseudocode means comparison (`==` in Python). The action happens only for multiples of 5.' },
            { line: 7, note: 'Termination: aligned with `traversal`, so it is outside the loop.' },
          ],
          explanation: 'The most appropriate loop is `for` because the iteration range is known exactly, 1 to N (slide 31). Pattern: initialization (`input`, `sum ← 0`), action per element (check multiple of 5, add), termination (`output(sum)`). Flowchart on slide 31: box `input(N); sum ← 0`, box `i ← 1`, diamond `i <= N` (true → continue, false → output), diamond `i mod 5 = 0`, box `sum ← sum + i`, box `i ← i + 1` back to diamond `i <= N`. Because the tree blocks have no for, the loop is drawn as a `while` with explicit `i ← 1` and `i ← i + 1`, exactly as in the chart; the combined box `input(N); sum ← 0` is split into two blocks.',
          refs: ref(22, 31, 32),
        },
        {
          id: 'x05-r1b', kind: 'open', label: 'b', decks: ['D05'], topic: 'Choosing a loop type', patterns: ['for-count'],
          stem: 'Which loop notation (for / while) is most appropriate for Repetition Exercise 1, and why?',
          answer: '**for**, because the range of iteration values is known exactly, from 1 to N (the number of repetitions is known before the loop starts). `while` also works but is longer: you must initialise and increment i yourself.',
          keyPoints: ['Chooses for', 'Reason: the iteration bounds (1..N) are known exactly'],
          explanation: 'Slide 31: "The most appropriate loop is the for loop, because the range of values for the iteration is known precisely, namely from 1 to N."',
          refs: ref(31),
        },
      ],
    },
    {
      id: 'x05-r2', archetype: 'program', title: 'Repetition Exercise 2. WI1102 Assignment Grades',
      source: src('Repetition Exercise 2', [23, 24, 33, 34]),
      intro: 'Write a program that reads how many students are in the class, for example N (Assumption: N > 0, no need to check).\n\nNext, read the N characters that represent the grades of the WI1102 assignment. Possible assignment grades are: \'A\', \'B\', \'C\', \'D\', \'E\', \'F\'. Assume the input value is always true.\n\nIf a student gets a grade \'A\', \'B\', \'C\', or \'D\', then the student is declared to have passed; whereas if you get an \'E\' or \'F\' then the student is declared not to have passed.\n\nWrite on the screen how many students passed and how many did not pass.\n\n| No | Input N | Input of WI1102 grades | Output |\n|---|---|---|---|\n| 1 | 7 | A, B, C, A, A, E, D | Pass = 6, Not pass = 1 |\n| 2 | 5 | A, B, B, A, A | Pass = 5, Not pass = 0 |\n| 3 | 5 | E, E, E, E, E | Pass = 0, Not pass = 5 |',
      parts: [
        {
          id: 'x05-r2a', kind: 'program', label: 'a', decks: ['D05'], topic: 'For + counting cases (count-if)', patterns: ['for-count', 'count-if'], misconceptions: ['init-in-loop', 'off-by-one'],
          stem: 'Read N, then N grade characters (A–F). A–D = passed, E–F = not passed. Print the number of passed and not-passed students ("Pass = …", "Not pass = …").',
          reps: ['python', 'pseudo', 'flow'], match: 'numbers',
          solution: {
            python: r`# Program Tugas
# Accepts N assignment grades (A through F) as input
# and outputs the number of passing and not passing (failing) grades.

# DECLARATIONS
# N, i : int
# grade : char
# passed, notpassed : int

# ALGORITHM
# Entry N
N = int(input("Number of students = "))

# Enter the scores and simultaneously calculate pass/not pass status.
passed = 0; notpassed = 0
print("Enter each student's grade..")
for i in range(1,N+1):
    grade = input("Student-" + str(i) + " = ")
    if (grade == 'A' or grade == 'B' or grade == 'C' or grade == 'D'):
        passed = passed + 1
    else: # grade == 'E' atau 'F'
        notpassed = notpassed + 1

# Termination
print("Pass = " + str(passed))
print("Not pass = " + str(notpassed))`,
            pseudo: r`Program Tugas
{ Accepts N assignment grades (A through F) as input and outputs the number of passing and not passing grades }
DECLARATIONS
    N, i, passed, notpassed : integer
    grade : character
ALGORITHM
    input(N)
    passed ← 0
    notpassed ← 0
    i traversal [1..N]
        input(grade)
        if (grade = 'A' or grade = 'B' or grade = 'C' or grade = 'D') then
            passed ← passed + 1
        else { grade = 'E' or 'F' }
            notpassed ← notpassed + 1
    output("Pass = ", passed)
    output("Not pass = ", notpassed)`,
            flow: { title: 'WI1102 Assignment Grades', blocks: [
              { t: 'io', dir: 'in', text: 'input(N)' },
              { t: 'process', text: 'passed ← 0' },
              { t: 'process', text: 'notpassed ← 0' },
              { t: 'process', text: 'i ← 1' },
              { t: 'while', cond: 'i <= N', body: [
                { t: 'io', dir: 'in', text: 'input(grade)' },
                { t: 'if', cond: "grade = 'A' or grade = 'B' or grade = 'C' or grade = 'D'", then: [{ t: 'process', text: 'passed ← passed + 1' }], else: [{ t: 'process', text: 'notpassed ← notpassed + 1' }] },
                { t: 'process', text: 'i ← i + 1' },
              ] },
              { t: 'io', dir: 'out', text: 'output("Pass = ", passed)' },
              { t: 'io', dir: 'out', text: 'output("Not pass = ", notpassed)' },
            ] },
          },
          tests: [
            { name: 'table 1', stdin: ['7', 'A', 'B', 'C', 'A', 'A', 'E', 'D'] }, { name: 'table 2 (all pass)', stdin: ['5', 'A', 'B', 'B', 'A', 'A'] },
            { name: 'table 3 (none pass)', stdin: ['5', 'E', 'E', 'E', 'E', 'E'] }, { name: 'N = 1', stdin: ['1', 'F'], edge: 'N = 1 (F)' },
            { name: 'boundary D', stdin: ['2', 'D', 'E'], edge: 'D passes, E does not' },
          ],
          wrong: [
            { code: 'N = int(input())\npassed = 0\nnotpassed = 0\nfor i in range(1, N+1):\n    grade = input()\n    if (grade == "A" or grade == "B" or grade == "C"):\n        passed = passed + 1\n    else:\n        notpassed = notpassed + 1\nprint("Pass = " + str(passed))\nprint("Not pass = " + str(notpassed))', msg: 'Grade D also passes. The condition only covers A, B, C so D is counted as not passed.' },
            { code: 'N = int(input())\nfor i in range(1, N+1):\n    passed = 0\n    notpassed = 0\n    grade = input()\n    if (grade == "A" or grade == "B" or grade == "C" or grade == "D"):\n        passed = passed + 1\n    else:\n        notpassed = notpassed + 1\nprint("Pass = " + str(passed))\nprint("Not pass = " + str(notpassed))', msg: 'The counters are reset inside the loop, so only the last student is counted. Initialise before the loop.', tag: 'init-in-loop' },
            { code: 'N = int(input())\npassed = 0\nnotpassed = 0\nfor i in range(1, N):\n    grade = input()\n    if (grade == "A" or grade == "B" or grade == "C" or grade == "D"):\n        passed = passed + 1\n    else:\n        notpassed = notpassed + 1\nprint("Pass = " + str(passed))\nprint("Not pass = " + str(notpassed))', msg: '`range(1, N)` reads only N-1 grades; one student is skipped. Use `range(1, N+1)`.', tag: 'off-by-one' },
          ],
          plan: 'read N; passed ← 0, notpassed ← 0; repeat N times: read grade, if A/B/C/D passed ← passed + 1 else notpassed ← notpassed + 1; print both',
          skeleton: 'N = int(input())\npassed = ___; notpassed = ___\nfor i in range(1, ___):\n    grade = input()\n    if (grade == "A" or ___ or ___ or ___):\n        passed = passed + 1\n    else: # E atau F\n        notpassed = ___\nprint("Pass = " + str(___))\nprint("Not pass = " + str(___))',
          hints: ['How many times does the loop run, and is that number known before the loop starts?', 'Two counters are initialised before the loop; inside the loop each grade increments exactly one counter.', 'Test A, B, C, D (pass) in the `if`; the rest, E or F, do not pass.'],
          work: ['Read N, two counters = 0.', '`for i in range(1,N+1)` because there are exactly N students.', 'Read one grade per iteration; an `if` with four conditions joined by `or` → `passed`, `else` → `notpassed`.', 'Print both counters after the loop.'],
          syntax: ['input', 'for-range', 'if-else', 'relational-logical', 'print-str'],
          lineNotes: [
            { line: [1, 9], note: 'Header and DECLARATIONS: `grade : char`; the variable `pass` on the slide is renamed `passed` because `pass` is a Python keyword.', syntax: 'program-template' },
            { line: [11, 12], note: '`int(input("..."))`: the prompt text inside `input` is not part of the standard output; N is converted to int.', syntax: 'input' },
            { line: [14, 15], note: 'The two counters are initialised **before** the loop (inside the loop they would be reset).' },
            { line: 16, note: 'A guiding message; printed before the loop.' },
            { line: 17, note: '`range(1,N+1)`: exactly N iterations (the upper bound is excluded).', syntax: 'for-range' },
            { line: 18, note: 'A grade is a character, read as a string; no `int` is needed. The prompt text uses `str(i)` because it is joined with `+`.', syntax: 'print-str' },
            { line: [19, 20], note: 'Four `==` conditions joined by `or`: pass if any one is true.', syntax: 'relational-logical' },
            { line: [21, 22], note: '`else` = E or F (assuming the input is always valid), so it need not be tested again.' },
            { line: [24, 26], note: 'Termination: printed once after the loop; `str()` is required to join with a string.' },
          ],
          pseudoNotes: [
            { line: [1, 6], note: 'Header, DECLARATIONS and the `character` type for grade; the ALGORITHM starts at line 6.' },
            { line: [7, 9], note: 'Initialization: read N, two counters 0.' },
            { line: 10, note: '`i traversal [1..N]`: N iterations.' },
            { line: [11, 15], note: 'One `input` per iteration; `if … or … then` for A–D, `else` for E/F.' },
            { line: [16, 17], note: 'Termination: outside the `traversal`; `output` with several arguments prints the text and then the value.' },
          ],
          explanation: 'Pattern: for, because N is known (slide 33: there is no "empty" case, so `while` fits less well), and two counters (count-if) for pass/not pass. Typo fix note: the code on slide 34 uses the variables `pass` and `notpass`, but `pass` is a Python keyword (SyntaxError); they were renamed `passed`/`notpassed`. The curly quotes in `print(“Pass = ")` were replaced by straight quotes. The pseudocode and flowchart were written for this site. Output matching compares only numbers because the slide code prints extra guiding messages.',
          refs: ref(23, 24, 33, 34),
        },
        {
          id: 'x05-r2b', kind: 'open', label: 'b', decks: ['D05'], topic: 'Choosing a loop type', patterns: ['for-count'],
          stem: 'Which loop is most appropriate for Repetition Exercise 2, a `for` or a `while`? Explain why.',
          answer: '**for**: the iteration range is known exactly (1 to N). `while` fits less well because there is no possible "empty" case here (N > 0, so the action always runs at least once), so the advantage of `while` (handling zero iterations) is not needed.',
          keyPoints: ['Chooses for', 'Exactly N iterations, known at the start', 'There is no empty case, so while fits less well'],
          explanation: 'Slide 33.',
          refs: ref(33),
        },
      ],
    },
    {
      id: 'x05-r3', archetype: 'program', title: 'Repetition Exercise 3. Count Even and Odd (Sentinel)',
      source: src('Repetition Exercise 3', [25, 35, 36]),
      intro: 'Write a program to read a set of positive integers. Data reading is terminated if the user enters a negative value. Next, print out how many even and odd numbers there are. 0 is an even number.\n\n| No | Input | Output | Note |\n|---|---|---|---|\n| 1 | 7, 8, 0, 9, 10, -1 | Even = 3, Odd = 2 | |\n| 2 | 4, 10, 6, -111 | Even = 3, Odd = 0 | |\n| 3 | 5, 17, -234 | Even = 0, Odd = 2 | |\n| 4 | -99 | Even = 0, Odd = 0 | No positive numbers are entered |\n\nAll negative number input ends data reading.',
      parts: [
        {
          id: 'x05-r3a', kind: 'program', label: 'a', decks: ['D05'], topic: 'While with sentinel', patterns: ['while-sentinel', 'count-if'], misconceptions: ['sentinel-counted', 'while-no-next', 'init-in-loop'],
          stem: 'Write a program to read a set of positive integers, terminated by a negative value. Print how many even and odd numbers there are (0 is even).',
          reps: ['python', 'pseudo', 'flow'], match: 'numbers',
          solution: {
            python: r`# Program EvenOdd
# Accept a series of integers until the user enters a negative value,
# then display the count of even and odd numbers.


# DECLARATIONS
# X, countEven, countOdd : int

# ALGORITHM
countEven = 0                             # Initialization
countOdd = 0                              # Initialization

X = int(input())                  # First-Elmt
while (X >= 0):
    # cek Odd atau Even
    if (X % 2 == 0): # X is even
        countEven = countEven + 1
    else: # X is odd
        countOdd = countOdd + 1
    X = int(input())             # Next-Elmt

# Terminasi
print("Number of even numbers = " + str(countEven))
print("Number of odd numbers = " + str(countOdd))`,
            pseudo: r`Program EvenOdd
{ Reads integers until a negative value is entered, then outputs the count of even and odd numbers }
DECLARATIONS
    X, countEven, countOdd : integer
ALGORITHM
    countEven ← 0    { Initialization }
    countOdd ← 0     { Initialization }
    input(X)         { First-Elmt }
    while (X >= 0) do
        if (X mod 2 = 0) then { X is even }
            countEven ← countEven + 1
        else { X is odd }
            countOdd ← countOdd + 1
        input(X)     { Next-Elmt }
    output("Number of even numbers = ", countEven)
    output("Number of odd numbers = ", countOdd)`,
            flow: { title: 'EvenOdd', blocks: [
              { t: 'process', text: 'countEven ← 0' },
              { t: 'process', text: 'countOdd ← 0' },
              { t: 'io', dir: 'in', text: 'input(X)' },
              { t: 'while', cond: 'X >= 0', body: [
                { t: 'if', cond: 'X mod 2 = 0', then: [{ t: 'process', text: 'countEven ← countEven + 1' }], else: [{ t: 'process', text: 'countOdd ← countOdd + 1' }] },
                { t: 'io', dir: 'in', text: 'input(X)' },
              ] },
              { t: 'io', dir: 'out', text: 'output("Number of even numbers = ", countEven)' },
              { t: 'io', dir: 'out', text: 'output("Number of odd numbers = ", countOdd)' },
            ] },
          },
          tests: [
            { name: 'table 1 (contains 0)', stdin: ['7', '8', '0', '9', '10', '-1'], edge: '0 is counted as even' }, { name: 'table 2', stdin: ['4', '10', '6', '-111'] },
            { name: 'table 3', stdin: ['5', '17', '-234'] }, { name: 'table 4 (empty)', stdin: ['-99'], edge: 'sentinel immediately: 0 and 0' },
            { name: '0 then sentinel', stdin: ['0', '-5'], edge: '0 is not the sentinel' }, { name: 'one odd', stdin: ['3', '-1'] },
          ],
          wrong: [
            { code: 'countEven = 0\ncountOdd = 0\nX = int(input())\nwhile (X > 0):\n    if (X % 2 == 0):\n        countEven = countEven + 1\n    else:\n        countOdd = countOdd + 1\n    X = int(input())\nprint("Even = " + str(countEven))\nprint("Odd = " + str(countOdd))', msg: 'The condition `X > 0` stops the loop at 0, although 0 is a valid even number. The sentinel is only a negative value: `X >= 0`.' },
            { code: 'countEven = 0\ncountOdd = 0\nX = 0\nwhile (X >= 0):\n    X = int(input())\n    if (X % 2 == 0):\n        countEven = countEven + 1\n    else:\n        countOdd = countOdd + 1\nprint("Even = " + str(countEven))\nprint("Odd = " + str(countOdd))', msg: 'The sentinel value (negative) is also counted because the reading happens at the start of the loop, before the test. Use the First-Elmt pattern before the loop and Next-Elmt at the end of the loop body.', tag: 'sentinel-counted' },
            { code: 'countEven = 0\ncountOdd = 0\nX = int(input())\nwhile (X >= 0):\n    if (X % 2 == 0):\n        countEven = countEven + 1\n    else:\n        countOdd = countOdd + 1\nprint("Even = " + str(countEven))\nprint("Odd = " + str(countOdd))', msg: 'There is no next reading at the end of the loop (Next-Elmt), so X never changes: the loop never stops.', tag: 'while-no-next' },
          ],
          plan: 'countEven, countOdd ← 0; read X (First-Elmt); while X >= 0: if X is even countEven + 1, otherwise countOdd + 1; read the next X (Next-Elmt); print both',
          skeleton: 'countEven = 0\ncountOdd = 0\nX = int(input()) # First-Elmt\nwhile (X ___ 0):\n    if (X % 2 == ___):\n        countEven = ___\n    else:\n        countOdd = ___\n    X = ___ # Next-Elmt\nprint("Number of even numbers = " + str(countEven))\nprint("Number of odd numbers = " + str(countOdd))',
          hints: ['How many times does the loop run? Is it known in advance or determined by the data? What happens if the first input is already negative?', 'Sentinel pattern: read the first element before the loop, test, process, then read the next element at the end of the loop body.', 'Zero is even, so the correct sentinel is not `X > 0` but "negative".'],
          work: ['Two counters = 0.', 'Read the first X (First-Elmt).', '`while (X >= 0)`: sentinel = a negative value.', 'Inside: even (`X % 2 == 0`) / odd.', 'End of the loop body: read the next X (Next-Elmt).', 'After the loop, print both counters.'],
          syntax: ['input', 'while', 'sentinel', 'if-else', 'operators', 'print-str'],
          lineNotes: [
            { line: [1, 7], note: 'Header and DECLARATIONS.', syntax: 'program-template' },
            { line: [10, 11], note: 'Initialise the counters before the loop.' },
            { line: 13, note: 'First-Elmt: the first element is read **before** the loop so it can be tested. If it is negative right away, the loop does not run (empty case).', syntax: 'sentinel' },
            { line: 14, note: '`X >= 0`: stops only when negative; 0 is valid data (even), so `>=` and not `>`.', syntax: 'while' },
            { line: [16, 19], note: '`X % 2 == 0` is even; `else` is odd (for X >= 0 the remainder is only 0 or 1).', syntax: 'if-else' },
            { line: 20, note: 'Next-Elmt: the next reading at the end of the loop body. Without this line X never changes and the loop never stops; placed at the start, the sentinel would be counted.' },
            { line: [22, 24], note: 'Termination outside the loop; `str()` is required when using `+` with a string.', syntax: 'print-str' },
          ],
          pseudoNotes: [
            { line: [6, 7], note: 'Initialise the two counters.' },
            { line: 8, note: 'First-Elmt before the `while`.' },
            { line: 9, note: '`while (X >= 0) do`: the loop is tested at the start, so it can have zero iterations.', syntax: 'while' },
            { line: [10, 13], note: '`mod` is the remainder; `=` is comparison in pseudocode.' },
            { line: 14, note: 'Next-Elmt at the end of the loop body.' },
            { line: [15, 16], note: 'Termination outside the loop.' },
          ],
          explanation: 'The most appropriate loop is `while` (slide 35): the action may never run at all (empty case, first input negative) and the iteration range is unknown, so `for` does not fit. Pattern: First-Elmt, `while (X >= 0)`, process, Next-Elmt. Note: the slide code prints "Number of even numbers = …", while the table writes "Even = 3"; the two are equivalent, and the check compares only numbers. The pseudocode and flowchart were written for this site.',
          refs: ref(25, 35, 36),
        },
        {
          id: 'x05-r3b', kind: 'trace', label: 'b', decks: ['D05'], topic: 'Tracing a sentinel while', patterns: ['while-sentinel'],
          stem: 'Trace the Exercise 3 program for the input `7, 8, 0, 9, 10, -1`. Fill in the values of `X`, `countEven`, `countOdd` each time they change and write the output.',
          code: r`countEven = 0
countOdd = 0
X = int(input())
while (X >= 0):
    if (X % 2 == 0):
        countEven = countEven + 1
    else:
        countOdd = countOdd + 1
    X = int(input())
print("Number of even numbers = " + str(countEven))
print("Number of odd numbers = " + str(countOdd))`,
          stdin: ['7', '8', '0', '9', '10', '-1'], ask: 'table', watch: ['X', 'countEven', 'countOdd'], syntax: ['while', 'sentinel'],
          lineNotes: [
            { line: [1, 2], note: 'The counters start at 0.' },
            { line: 3, note: 'First-Elmt: X = 7.' },
            { line: 4, note: 'Test at the start: 7 >= 0 is true, enter the loop. The loop stops when X is negative (-1); that value is not processed.' },
            { line: [5, 8], note: '7 is odd → countOdd = 1. The value 0 counts as even (0 % 2 == 0).' },
            { line: 9, note: 'Next-Elmt at the end of the loop body; X changes on every iteration.' },
            { line: [10, 11], note: 'After the loop: Even = 3 (8, 0, 10), Odd = 2 (7, 9).' },
          ],
          explanation: 'Elements processed: 7 (odd), 8 (even), 0 (even), 9 (odd), 10 (even). The value -1 stops the loop and is not counted. Result Even = 3, Odd = 2 (matches table row 1).',
          refs: ref(25, 36),
        },
        {
          id: 'x05-r3c', kind: 'open', label: 'c', decks: ['D05'], topic: 'Choosing a loop type', patterns: ['while-sentinel'],
          stem: 'Which loop is most appropriate for Repetition Exercise 3, `for` or `while`? Explain, including the case of the first input being negative.',
          answer: '**while**. The action may never be performed (empty case): if the first value entered is negative. `while` tests the condition at the start, so it handles zero iterations correctly. `for` does not fit because the range of values is unknown (the amount of data is determined by the sentinel).',
          keyPoints: ['Chooses while', 'Empty case: the first input is negative', 'The iteration range is unknown, so for does not fit'],
          explanation: 'Slide 35.',
          refs: ref(35),
        },
      ],
    },
    {
      id: 'x05-r4', archetype: 'program', title: 'Repetition Exercise 4. Lagu Anak Ayam',
      source: src('Repetition Exercise 4', [26, 37, 38, 39]),
      intro: 'Do you still remember the song Anak Ayam??\n\n```\nAnak ayam turunlah 5\nMati satu tinggallah 4\nMati satu tinggallah 3\nMati satu tinggallah 2\nMati satu tinggallah 1\nMati satu tinggal induknya\n```\n\n```\nAnak ayam turunlah 1\nMati satu tinggal induknya\n```\n\nGeneralization:\n\n```\nAnak ayam turunlah N\nMati satu tinggallah N-1\nMati satu tinggallah N-2\n….\nMati satu tinggallah 1\nMati satu tinggal induknya\n```',
      parts: [
        {
          id: 'x05-r4a', kind: 'program', label: 'a', decks: ['D05'], topic: 'Counting down (backward for / while)', patterns: ['for-backward', 'while-counter'], misconceptions: ['off-by-one', 'while-no-next'],
          stem: 'Create a program that accepts as input a positive integer N (assuming N > 0), and writes the lyrics to the Anak Ayam song above.',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient',
          solution: {
            python: r`# Program AnakAyam-1
# Write Anak Ayam song based on input number of
# chicks
# Version using for

# DECLARATIONS
# N, i : int

# ALGORITHM
N = int(input("Enter the number of chicks = "))

print("Anak ayam turunlah " + str(N))
if (N > 1):
    for i in range(N-1,0,-1):
        print("Mati satu tinggallah " + str(i))

print("Mati satu tinggal induknya")`,
            pseudo: r`Program AnakAyam
{ Writes the Anak Ayam song based on the input number of chicks (while version) }
DECLARATIONS
    N, i : integer
ALGORITHM
    input(N)
    output("Anak ayam turunlah ", N)
    i ← N - 1
    while (i >= 1) do
        output("Mati satu tinggallah ", i)
        i ← i - 1
    { i < 1 }
    output("Mati satu tinggal induknya")`,
            flow: { title: 'Anak Ayam (while)', blocks: [
              { t: 'io', dir: 'in', text: 'input(N)' },
              { t: 'io', dir: 'out', text: 'output("Anak ayam turunlah ", N)' },
              { t: 'process', text: 'i ← N - 1' },
              { t: 'while', cond: 'i >= 1', body: [
                { t: 'io', dir: 'out', text: 'output("Mati satu tinggallah ", i)' },
                { t: 'process', text: 'i ← i - 1' },
              ] },
              { t: 'io', dir: 'out', text: 'output("Mati satu tinggal induknya")' },
            ] },
          },
          tests: [
            { name: 'N = 5', stdin: ['5'] }, { name: 'N = 1', stdin: ['1'], edge: 'N = 1: empty case, no "Mati satu tinggallah" line' },
            { name: 'N = 2', stdin: ['2'], edge: 'exactly one "tinggallah 1" line' }, { name: 'N = 3', stdin: ['3'] },
          ],
          wrong: [
            { code: 'N = int(input())\nprint("Anak ayam turunlah " + str(N))\nfor i in range(N-1, 1, -1):\n    print("Mati satu tinggallah " + str(i))\nprint("Mati satu tinggal induknya")', msg: '`range(N-1, 1, -1)` stops at 2: the lower bound is excluded, so "tinggallah 1" is missing. To count down to 1 use `range(N-1, 0, -1)`.', tag: 'off-by-one' },
            { code: 'N = int(input())\nprint("Anak ayam turunlah " + str(N))\nfor i in range(N, 0, -1):\n    print("Mati satu tinggallah " + str(i))\nprint("Mati satu tinggal induknya")', msg: 'The loop starts from N, but the first line already shows N and the first "Mati satu" line must show N-1. Start from N-1.', tag: 'off-by-one' },
            { code: 'N = int(input())\nprint("Anak ayam turunlah " + str(N))\ni = N - 1\nwhile (i >= 1):\n    print("Mati satu tinggallah " + str(i))\nprint("Mati satu tinggal induknya")', msg: 'i is never decreased inside the loop, so the loop never stops. Add `i = i - 1`.', tag: 'while-no-next' },
          ],
          plan: 'read N; print "Anak ayam turunlah N"; repeat for i from N-1 down to 1: print "Mati satu tinggallah i"; print "Mati satu tinggal induknya"',
          skeleton: 'N = int(input())\nprint("Anak ayam turunlah " + str(___))\ni = ___\nwhile (i >= ___):\n    print("Mati satu tinggallah " + str(___))\n    i = ___\nprint("Mati satu tinggal induknya")',
          hints: ['Which part repeats, and from which number to which? Write it out for N = 5 and N = 1.', 'Count down from N-1 to 1. What happens for N = 1: is the "Mati satu tinggallah" line printed?', 'A backward `for`: `range(start, stop, -1)`; the stop bound is excluded. `while`: the condition at the start handles the empty case safely.'],
          work: ['The first and last lines are printed once each, outside the loop.', 'The loop prints "Mati satu tinggallah i" with i going down from N-1 to 1.', 'For version: `range(N-1, 0, -1)` (0 is excluded) with `if (N > 1)` as on the slide.', 'While version: `i = N-1`, `while (i >= 1)`, `i = i - 1`.'],
          syntax: ['input', 'for-backward', 'while', 'print-str'],
          lineNotes: [
            { line: [1, 4], note: 'Program name (for version), specification.', syntax: 'program-template' },
            { line: 10, note: 'The text inside `input(...)` is only a prompt and is not part of the output.', syntax: 'input' },
            { line: 12, note: 'The opening line is printed once outside the loop; `str(N)` is required so it can be joined.', syntax: 'print-str' },
            { line: 13, note: 'The slide prevents the empty case with `if (N > 1)`. In Python `range(0,0,-1)` is already empty, so it is not strictly needed; it is kept as on the slide.' },
            { line: 14, note: '`range(N-1, 0, -1)`: from N-1 down to 1; 0 is excluded (the stop bound is excluded). The step -1 makes it descend.', syntax: 'for-backward' },
            { line: 15, note: 'Loop body, indented: "Mati satu tinggallah" + i.' },
            { line: 17, note: 'The closing line is printed once after the loop, always (including N = 1).' },
          ],
          pseudoNotes: [
            { line: [6, 7], note: 'Read N and print the opening line (outside the repetition).' },
            { line: 8, note: 'Initialise the counter i with N-1 (the largest value that needs printing).' },
            { line: 9, note: '`while (i >= 1) do`: tested at the start; for N = 1 the initial i = 0 so the loop does not run.', syntax: 'while' },
            { line: [10, 11], note: 'The action, then the counter is decreased by 1; without the decrease the loop never stops.' },
            { line: 12, note: 'Post-condition comment: i < 1 when the loop finishes.' },
            { line: 13, note: 'The closing line, outside the loop.' },
          ],
          explanation: 'The loop prints "Mati satu tinggallah …", counting down from N-1 to 1. If N = 1 that phrase is never printed: the empty case. Slide 37: with `for` the empty case must be prevented with `if-else`; with `while` the empty case is safe because the condition is tested at the start (the safest). The while version from slide 39 (`i = N-1; while (i >= 1): ...; i -= 1`) is used for the pseudocode and flowchart (written for this site). Slide errors: none. Note: `i-=1` is equivalent to `i = i - 1`.',
          refs: ref(26, 37, 38, 39),
        },
        {
          id: 'x05-r4b', kind: 'trace', label: 'b', decks: ['D05'], topic: 'Tracing a backward while', patterns: ['while-counter'],
          stem: 'Trace the `while` version of Anak Ayam (slide 39) for the input `3`. Fill in the value of `i` each time it changes and write the output.',
          code: r`N = int(input("Enter the number of chicks = "))

print("Anak ayam turunlah " + str(N))
i = N-1
while (i >= 1):
    print("Mati satu tinggallah " + str(i))
    i-=1 # i=i-1
# i < 1

print("Mati satu tinggal induknya")`,
          stdin: ['3'], ask: 'table', watch: ['i'], syntax: ['while', 'print-str'],
          lineNotes: [
            { line: 1, note: 'N = 3; the prompt is not part of the output.' },
            { line: 3, note: 'The opening line is printed once.' },
            { line: 4, note: 'i is initialised to N-1 = 2.' },
            { line: 5, note: 'The condition is tested at the start of every iteration: i = 2, 1 true; i = 0 false.' },
            { line: 6, note: 'Prints the current value of i.' },
            { line: 7, note: '`i-=1` is the same as `i = i - 1`: required for the loop to stop.' },
            { line: 8, note: 'Post-condition comment: i < 1 after the loop.' },
            { line: 10, note: 'The closing line is always printed.' },
          ],
          explanation: 'i = 2 → "tinggallah 2", i becomes 1; i = 1 → "tinggallah 1", i becomes 0; i = 0 stops the loop. Output: turunlah 3, tinggallah 2, tinggallah 1, tinggal induknya.',
          refs: ref(39),
        },
        {
          id: 'x05-r4c', kind: 'open', label: 'c', decks: ['D05'], topic: 'Empty case in for vs while', patterns: ['for-backward', 'while-counter'],
          stem: 'In Exercise 4, if N = 1 the phrase "Mati satu tinggallah ..." is never printed (an empty case). How do `for` and `while` each handle this case, and which is the safest?',
          answer: 'The loop prints "Mati satu tinggallah …" with the number of chicks going down from N-1 to 1; for N = 1 that phrase is never printed (empty case). With **for**, the empty case must be kept out of the loop with `if-else` (`if (N > 1)` on the slide). With **while**, the empty case is safe because the condition `i >= 1` is tested at the start. The safest choice: **while**.',
          keyPoints: ['Empty case N = 1', 'for: needs if-else to avoid entering the loop', 'while: safe because the condition is tested at the start', 'while is chosen as the safest'],
          explanation: 'Slide 37. Note: in Python `range(0,0,-1)` is already empty by itself, but in general for notation (e.g. pseudocode or a flowchart with fixed bounds) preventing the empty case is necessary.',
          refs: ref(37),
        },
      ],
    },
    {
      id: 'x05-r5', archetype: 'program', title: 'Repetition Exercise 5. Area under the Curve',
      source: src('Repetition Exercise 5', [27, 28]),
      intro: 'To calculate the area of a curve formed by a formula, it can be done using an integral using a numerical approach. The numerical approach will cut the area at certain intervals, then calculate the area of each piece of the area using the trapezoid formula repeatedly.\n\nTo calculate the area under the curve defined by the function f(x) = x³ + x + 1 from x = 1 to x = 4, we can divide the range into intervals (e.g., 0.25). The smaller the interval, the more detailed the result. The total area is obtained by calculating the area of all the trapezoids formed by these intervals.\n\nTask: Write a program to calculate the area under the curve defined by the function f(x) = x³ + x + 1 from x = a to x = b using a specified interval (delta), where a, b, and delta are user inputs.\n\nAssumptions: a < b; a ≥ 0; b > 0; delta > 0',
      figures: [{ src: SRC, page: 28 }],
      parts: [{
        id: 'x05-r5a', kind: 'program', label: 'a', decks: ['D05'], topic: 'Accumulation with while (trapezoid)', patterns: ['while-counter', 'accumulate-sum'], misconceptions: ['off-by-one', 'int-vs-float-div'],
        stem: 'Write a program to calculate the area under the curve f(x) = x³ + x + 1 from x = a to x = b using trapezoids of width delta; a, b and delta are user inputs (a < b, a ≥ 0, b > 0, delta > 0). The last interval is shortened if delta does not divide b − a. Print the total area.',
        reps: ['python', 'pseudo', 'flow'], match: 'judge',
        judge: r`import re
def judge(stdin, out, ref_out):
    pat = r'-?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?'
    got = re.findall(pat, out)
    ref = re.findall(pat, ref_out)
    if not got:
        return "No number in the output: print the total area."
    v = float(got[-1]); w = float(ref[-1])
    if abs(v - w) > 1e-6 * max(1.0, abs(w)):
        return "The printed area (" + str(v) + ") differs from the expected one (" + str(w) + ")."
    return None`,
        solution: {
          python: r`# Program AreaUnderCurve
# Calculates the area under f(x) = x**3 + x + 1 from x = a to x = b using trapezoids of width delta
# Assumptions: a < b; a >= 0; b > 0; delta > 0

# DECLARATIONS
# a, b, delta : float
# x, x2, y1, y2, area : float

# ALGORITHM
a = float(input())
b = float(input())
delta = float(input())

area = 0
x = a
while (x < b):
    x2 = x + delta
    if (x2 > b):          # the last piece may be shorter than delta
        x2 = b
    y1 = x**3 + x + 1
    y2 = x2**3 + x2 + 1
    area = area + (y1 + y2) / 2 * (x2 - x)
    x = x2

print(area)`,
          pseudo: r`Program AreaUnderCurve
{ Area under f(x) = x^3 + x + 1 from a to b by trapezoids of width delta }
DECLARATIONS
    a, b, delta, x, x2, y1, y2, area : real
ALGORITHM
    input(a, b, delta)
    area ← 0
    x ← a
    while (x < b) do
        x2 ← x + delta
        if (x2 > b) then { the last piece may be shorter than delta }
            x2 ← b
        y1 ← x*x*x + x + 1
        y2 ← x2*x2*x2 + x2 + 1
        area ← area + (y1 + y2) / 2 * (x2 - x)
        x ← x2
    output(area)`,
          flow: { title: 'Area under the Curve', blocks: [
            { t: 'io', dir: 'in', text: 'input(a, b, delta)' },
            { t: 'process', text: 'area ← 0' },
            { t: 'process', text: 'x ← a' },
            { t: 'while', cond: 'x < b', body: [
              { t: 'process', text: 'x2 ← x + delta' },
              { t: 'if', cond: 'x2 > b', then: [{ t: 'process', text: 'x2 ← b' }] },
              { t: 'process', text: 'y1 ← x*x*x + x + 1' },
              { t: 'process', text: 'y2 ← x2*x2*x2 + x2 + 1' },
              { t: 'process', text: 'area ← area + (y1 + y2) / 2 * (x2 - x)' },
              { t: 'process', text: 'x ← x2' },
            ] },
            { t: 'io', dir: 'out', text: 'output(area)' },
          ] },
        },
        tests: [
          { name: 'slide example: 1 to 4, delta 0.25', stdin: ['1', '4', '0.25'] }, { name: 'delta 1', stdin: ['0', '3', '1'] }, { name: 'one trapezoid', stdin: ['2', '3', '1'], edge: 'exactly one interval' },
          { name: 'delta larger than b - a', stdin: ['0', '1', '2'], edge: 'the last interval is shortened' }, { name: 'a > 0, delta 0.5', stdin: ['1', '2', '0.5'] },
        ],
        wrong: [
          { code: 'a = float(input())\nb = float(input())\ndelta = float(input())\narea = 0\nx = a\nwhile (x < b):\n    y1 = x**3 + x + 1\n    area = area + y1 * delta\n    x = x + delta\nprint(area)', msg: 'This is a sum of rectangles (left side), not trapezoids. Trapezoid area = (f(x) + f(x+delta)) / 2 × delta.' },
          { code: 'a = float(input())\nb = float(input())\ndelta = float(input())\narea = 0\nx = a\nwhile (x < b):\n    x2 = x + delta\n    y1 = x**3 + x + 1\n    y2 = x2**3 + x2 + 1\n    area = area + (y1 + y2) * (x2 - x)\n    x = x2\nprint(area)', msg: 'Forgot to halve: trapezoid area = (parallel side 1 + parallel side 2) / 2 × height.' },
          { code: 'a = float(input())\nb = float(input())\ndelta = float(input())\narea = 0\nx = a\nwhile (x < b):\n    x2 = x + delta\n    y1 = x**3 + x + 1\n    y2 = x2**3 + x2 + 1\n    area = area + (y1 + y2) / 2 * delta\n    x = x2\nprint(area)', msg: 'The last interval can be shorter than delta (e.g. a = 0, b = 1, delta = 2): move x2 to b and use the width `x2 - x`, not `delta`.', tag: 'off-by-one' },
        ],
        plan: 'read a, b, delta; area ← 0; x ← a; while x < b: x2 ← min(x + delta, b); area ← area + (f(x) + f(x2)) / 2 × (x2 − x); x ← x2; print area',
        skeleton: 'a = float(input()); b = float(input()); delta = float(input())\narea = ___\nx = ___\nwhile (x ___ b):\n    x2 = x + ___\n    if (x2 > b):\n        x2 = ___\n    y1 = x**3 + x + 1\n    y2 = ___\n    area = area + (y1 + y2) / ___ * (___ - x)\n    x = ___\nprint(area)',
        hints: ['Sketch one slice: what shape is it, and what are its two parallel sides and its height?', 'The loop runs from x = a in steps of delta until it reaches b. What should happen if the last slice goes past b?', 'Accumulate the area of each trapezoid into `area`, which is initialised before the loop.'],
        work: ['Read a, b, delta as float.', 'Initialise `area = 0`, `x = a`.', 'While `x < b`: the right end of the slice is `x2 = x + delta`, cut at b if it goes past it.', 'Trapezoid area = (f(x) + f(x2)) / 2 × (x2 − x); add it to area; advance x ← x2.', 'Print area outside the loop.'],
        syntax: ['input', 'type-conversion', 'while', 'assign', 'operators'],
        lineNotes: [
          { line: [1, 3], note: 'Program specification and the assumptions a < b, a >= 0, b > 0, delta > 0.', syntax: 'program-template' },
          { line: [5, 7], note: 'DECLARATIONS: all float because the values are decimals.', syntax: 'declarations' },
          { line: [10, 12], note: 'Three inputs are read as `float(input())`.', syntax: 'type-conversion' },
          { line: [14, 15], note: 'Initialise the accumulator `area` and the starting position x = a **before** the loop.' },
          { line: 16, note: '`while (x < b)`: the number of slices is not determined by an integer count (delta may not divide b − a), so it is safer to test with the position x; `x < b`, not `<=`, so there is no slice of width 0.', syntax: 'while' },
          { line: [17, 19], note: 'The right end x2 is cut at b if it goes past b: the last slice may be shorter than delta.' },
          { line: [20, 21], note: 'The heights of the two parallel sides of the trapezoid: f(x) and f(x2); `**` is the power operator.' },
          { line: 22, note: 'Trapezoid area = (side1 + side2) / 2 × width. `/ 2` is float division (correct); width = `x2 - x`, not `delta`.' },
          { line: 23, note: 'x must be advanced (`x = x2`); without it the loop never stops.' },
          { line: 25, note: 'Termination: print the total outside the loop.' },
        ],
        pseudoNotes: [
          { line: 4, note: 'All variables are of type real.' },
          { line: [6, 8], note: 'Initialization: input, area ← 0, x ← a.' },
          { line: [9, 12], note: '`while (x < b) do`; `x2` is cut at b for the last slice.' },
          { line: [13, 14], note: 'The function values at the two ends: `x*x*x` is x³.' },
          { line: [15, 16], note: 'Add the trapezoid area; advance x.' },
          { line: 17, note: 'Termination outside the loop.' },
        ],
        explanation: 'Slides 27-28 contain only the problem (no answer); this answer was written for this site (Python, pseudocode, flowchart). Formula: area of one trapezoid = (f(x) + f(x+δ)) / 2 × δ. Extra assumption we chose: if delta does not divide b − a, the last slice is shortened to end at b. Note that the code does not use `for` because the number of slices is not always an integer. Output is checked with a judge (last number, relative tolerance 1e-6) because the output format is free; avoid deltas such as 0.1 in manual tests (float rounding error adds a tiny extra slice).',
        refs: ref(27, 28),
      }],
    },
    {
      id: 'x05-r6', archetype: 'program', title: 'Repetition Exercise 6. Air Temperature Statistics (BMKG)',
      source: src('Repetition Exercise 6', [29]),
      intro: 'The BMKG (Badan Meteorologi, Klimatologi, dan Geofisika, Meteorology, Climatology, and Geophysics Agency) of Bandung City requires a program to calculate several basic statistics regarding air temperature in Bandung City over the course of a month, specifically:\n\n- Average temperature\n- Highest temperature\n- Lowest temperature\n\nCreate a program that accepts the number of days in the month, denoted as N (where N can be 28, 29, 30, or 31; assume the input is valid), then accepts the air temperatures from day 1 through day N of that month and outputs the aforementioned statistics.',
      parts: [{
        id: 'x05-r6a', kind: 'program', label: 'a', decks: ['D05'], topic: 'Statistics: average, max, min', patterns: ['for-count', 'average', 'max-min', 'accumulate-sum'], misconceptions: ['max-init-zero', 'off-by-one', 'init-in-loop'],
        stem: 'Read N (28–31), then N daily temperatures. Print the average, the highest and the lowest temperature (in that order).',
        reps: ['python', 'pseudo', 'flow'], match: 'numbers',
        solution: {
          python: r`# Program TemperatureStats
# Reads N (days in month) and N daily temperatures; prints the average,
# highest, and lowest temperature. Assumption: N in {28, 29, 30, 31}

# DECLARATIONS
# N, i : int
# T, total, highest, lowest, average : float

# ALGORITHM
N = int(input())
T = float(input())          # day 1 (N >= 28, so there is always a first element)
total = T
highest = T
lowest = T
for i in range(2, N+1):
    T = float(input())
    total = total + T
    if (T > highest):
        highest = T
    if (T < lowest):
        lowest = T
average = total / N

print("Average temperature = " + str(average))
print("Highest temperature = " + str(highest))
print("Lowest temperature = " + str(lowest))`,
          pseudo: r`Program TemperatureStats
{ Reads N (days in month) and N daily temperatures; outputs the average, highest, and lowest temperature }
DECLARATIONS
    N, i : integer
    T, total, highest, lowest, average : real
ALGORITHM
    input(N)
    input(T)    { day 1 }
    total ← T
    highest ← T
    lowest ← T
    i traversal [2..N]
        input(T)
        total ← total + T
        if (T > highest) then
            highest ← T
        if (T < lowest) then
            lowest ← T
    average ← total / N
    output("Average temperature = ", average)
    output("Highest temperature = ", highest)
    output("Lowest temperature = ", lowest)`,
          flow: { title: 'Temperature statistics', blocks: [
            { t: 'io', dir: 'in', text: 'input(N)' },
            { t: 'io', dir: 'in', text: 'input(T)' },
            { t: 'process', text: 'total ← T' },
            { t: 'process', text: 'highest ← T' },
            { t: 'process', text: 'lowest ← T' },
            { t: 'process', text: 'i ← 2' },
            { t: 'while', cond: 'i <= N', body: [
              { t: 'io', dir: 'in', text: 'input(T)' },
              { t: 'process', text: 'total ← total + T' },
              { t: 'if', cond: 'T > highest', then: [{ t: 'process', text: 'highest ← T' }] },
              { t: 'if', cond: 'T < lowest', then: [{ t: 'process', text: 'lowest ← T' }] },
              { t: 'process', text: 'i ← i + 1' },
            ] },
            { t: 'process', text: 'average ← total / N' },
            { t: 'io', dir: 'out', text: 'output("Average temperature = ", average)' },
            { t: 'io', dir: 'out', text: 'output("Highest temperature = ", highest)' },
            { t: 'io', dir: 'out', text: 'output("Lowest temperature = ", lowest)' },
          ] },
        },
        tests: [
          { name: 'N = 28, ascending (max on the last day)', stdin: ['28', ...asc], edge: 'max on day N, min on day 1' },
          { name: 'N = 30, descending', stdin: ['30', ...pairs([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]).sort((a, b) => b - a).map(String)], edge: 'max on day 1, min on day N' },
          { name: 'N = 31, random order', stdin: ['31', ...mixed31] },
          { name: 'all equal', stdin: ['28', ...flat28], edge: 'all temperatures equal: average = max = min' },
          { name: 'N = 29', stdin: ['29', ...pairs([2, 4, 6, 1, 3, 5, 2, 4, 1, 3, 5, 2, 6, 4]).map(String), '20'] },
        ],
        wrong: [
          { code: 'N = int(input())\ntotal = 0\nhighest = 0\nlowest = 0\nfor i in range(1, N+1):\n    T = float(input())\n    total = total + T\n    if (T > highest):\n        highest = T\n    if (T < lowest):\n        lowest = T\nprint(total / N)\nprint(highest)\nprint(lowest)', msg: '`lowest = 0` as the initial value: all temperatures are greater than 0, so the minimum is never updated (the result is 0). Initialise max/min with the first data value, not 0.', tag: 'max-init-zero' },
          { code: 'N = int(input())\nT = float(input())\ntotal = T\nhighest = T\nlowest = T\nfor i in range(2, N):\n    T = float(input())\n    total = total + T\n    if (T > highest):\n        highest = T\n    if (T < lowest):\n        lowest = T\nprint(total / N)\nprint(highest)\nprint(lowest)', msg: '`range(2, N)` stops at N-1, so the last day is not read (the average, max or min is wrong). Use `range(2, N+1)`.', tag: 'off-by-one' },
          { code: 'N = int(input())\nT = float(input())\ntotal = T\nhighest = T\nlowest = T\nfor i in range(2, N+1):\n    T = float(input())\n    total = total + T\n    if (T > highest):\n        highest = T\n    if (T < lowest):\n        lowest = T\nprint(total / (N - 1))\nprint(highest)\nprint(lowest)', msg: 'The average is divided by N-1; the divisor must be N, the number of days summed.' },
        ],
        plan: 'read N and the day-1 T; total, highest, lowest ← T; for days 2..N: read T, total ← total + T, update highest and lowest; average ← total / N; print average, highest, lowest',
        skeleton: 'N = int(input())\nT = float(input())\ntotal = ___\nhighest = ___\nlowest = ___\nfor i in range(___, N+1):\n    T = float(input())\n    total = total + ___\n    if (T ___ highest):\n        highest = T\n    if (T ___ lowest):\n        lowest = T\naverage = total / ___\nprint(average); print(highest); print(lowest)',
        hints: ['Three statistics, a single pass over the data: what must be kept while the loop runs?', 'The initial values of max and min are not 0. Use the first data value.', 'The divisor of the average is the number of data values (N). The loop runs from day 2 to N because day 1 has already been read.'],
        work: ['Read N and the day-1 temperature; `total`, `highest`, `lowest` = the day-1 temperature.', '`for i in range(2, N+1)`: day 2 to N.', 'Each iteration read T, add it to total, and update `highest` and `lowest` with two separate `if`s.', 'After the loop, `average = total / N`, then print the three statistics.'],
        syntax: ['input', 'type-conversion', 'for-range', 'if', 'print-str'],
        lineNotes: [
          { line: [1, 3], note: 'Specification and assumption: N is between 28 and 31, so there is at least one data value.', syntax: 'program-template' },
          { line: [5, 7], note: 'DECLARATIONS: temperatures are float; N and i are integers.', syntax: 'declarations' },
          { line: [10, 11], note: 'N is int; the day-1 temperature is read separately as a `float`. Since N >= 28, there is no empty case.', syntax: 'type-conversion' },
          { line: [12, 14], note: 'Initialise total, highest and lowest with the first data value, **not 0**: `lowest = 0` is never updated if all temperatures are > 0.' },
          { line: 15, note: '`range(2, N+1)`: days 2, …, N; the upper bound is excluded, hence N+1.', syntax: 'for-range' },
          { line: 16, note: 'One new data value per iteration.' },
          { line: 17, note: 'Accumulation for the average.' },
          { line: [18, 21], note: 'Two separate `if`s (not `elif`): one value may update only one of them, but each statistic is checked on its own.', syntax: 'if' },
          { line: 22, note: 'Average = total / N (N = number of days, including day 1). Outside the loop, after everything has been read.' },
          { line: [24, 26], note: '`str()` is required when using `+` with a string. The output order follows the problem: average, highest, lowest.', syntax: 'print-str' },
        ],
        pseudoNotes: [
          { line: [7, 11], note: 'Input and initialization with the day-1 data.' },
          { line: 12, note: '`i traversal [2..N]`: day 2 to N (both ends included).', syntax: 'for-range' },
          { line: [13, 18], note: 'Action per data value: accumulate the total, update the highest and lowest.' },
          { line: [19, 22], note: 'Termination: the average and three outputs, aligned with `traversal` (outside the loop).' },
        ],
        explanation: 'Slide 29 contains only the problem; the answer was written for this site. Combined pattern: accumulation (sum), average (sum / N) and extreme values (max-min) in a single loop. Key points: initialise max/min with the first data value and compute the average after the loop. Output matching compares only numbers, in the order average, highest, lowest.',
        refs: ref(29),
      }],
    },
  ],
  papers: [
    {
      id: 'extra05', title: 'Deck 05 Extra Exercises: Conditionals & Repetitions', kind: 'extra' as const, lang: 'en' as const, minutes: 150,
      note: 'Official exercises from the teaching team. Pseudocode + flowchart are printed on the slides only for Conditionals 1-3 and Repetition 1; the rest were written for this site. Repetition 5 and 6 have no key in the deck.',
      problems: ['x05-c1', 'x05-c2', 'x05-c3', 'x05-c4', 'x05-r1', 'x05-r2', 'x05-r3', 'x05-r4', 'x05-r5', 'x05-r6'],
    },
  ],
  flashcards: [],
}
