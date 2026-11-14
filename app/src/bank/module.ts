// Python module (CT team): Module 1–4 exercises and the worked examples as trace items. English source.
// Reference solutions are Python in the course house style; solution.pseudo is Liem notation.
import type { BankFile, LineNote, Problem, Provenance, SyntaxId } from '../types'

const r = String.raw

/** Build lineNotes by locating each anchor substring in the listing (monotone, so repeated lines work). [from, note, syntax?, to?] */
function notes(code: string, items: [string, string, SyntaxId?, string?][]): LineNote[] {
  const lines = code.split('\n')
  let from = 0
  const out: LineNote[] = []
  for (const [a, note, syntax, b] of items) {
    const i = lines.findIndex((l, k) => k >= from && l.includes(a))
    if (i < 0) throw new Error('lineNotes anchor not found: ' + a)
    let j = i
    if (b) { j = lines.findIndex((l, k) => k >= i && l.includes(b)); if (j < 0) throw new Error('lineNotes end anchor not found: ' + b) }
    out.push({ line: i === j ? i + 1 : [i + 1, j + 1], note, ...(syntax ? { syntax } : {}) })
    from = j + 1
  }
  return out
}

const mod = (label: string, pages: number[]): Provenance => ({ kind: 'module' as const, lang: 'en' as const, src: 'Module_Python', label, pages, official: true, year: 2026 })
const MOD = 'Module_Python'

const problems: Problem[] = []
/* ====================================================== Python module – Module 1 exercises ====================================================== */
{
  const py = r`# Program ChangeBills
# Counts the number of bills of change, largest denomination first
# DECLARATIONS
# p, b, change : int
# n50, n20, n10, n5, n1 : int
# ALGORITHM
p = int(input())
b = int(input())
change = p - b
n50 = change // 50000
change = change % 50000
n20 = change // 20000
change = change % 20000
n10 = change // 10000
change = change % 10000
n5 = change // 5000
change = change % 5000
n1 = change // 1000
print("Ms. Sal needs to give " + str(n50) + " Rp50000 bill(s), " + str(n20) + " Rp20000 bill(s), " + str(n10) + " Rp10000 bill(s), " + str(n5) + " Rp5000 bill(s), and " + str(n1) + " Rp1000 bill(s).")`
  const ps = r`Program ChangeBills
{ Number of bills of change, largest denomination first }
DECLARATIONS
  p, b, change, n50, n20, n10, n5, n1 : integer
ALGORITHM
  input(p)
  input(b)
  change ← p - b
  n50 ← change div 50000
  change ← change mod 50000
  n20 ← change div 20000
  change ← change mod 20000
  n10 ← change div 10000
  change ← change mod 10000
  n5 ← change div 5000
  change ← change mod 5000
  n1 ← change div 1000
  output("Ms. Sal needs to give " + str(n50) + " Rp50000 bill(s), " + str(n20) + " Rp20000 bill(s), " + str(n10) + " Rp10000 bill(s), " + str(n5) + " Rp5000 bill(s), and " + str(n1) + " Rp1000 bill(s).")`
  problems.push({
    id: 'mod-1-1', archetype: 'program', title: 'Module 1 – Practice Problem 1 (2025/2026): Change in bills',
    source: mod('1.5.1 Practice Problem 1 Year 2025/2026', [7]), minutes: 15,
    parts: [{
      id: 'mod-1-1-1', kind: 'program', decks: ['D04'], topic: 'Arithmetic & input', patterns: ['sequence-io', 'operators'], misconceptions: ['int-vs-float-div', 'input-is-str'],
      stem: `Ms. Sal is asked to look after an artist booth at a convention. A customer just arrived and paid p rupiah for an item worth b rupiah. The customer pays with cash, and the booth owner wants the change to be given using the largest possible denominations. Help Ms. Sal calculate how many Rp50,000, Rp20,000, Rp10,000, Rp5,000, and Rp1,000 bills are needed for the customer's change!

**Example 1**
\`\`\`
Input payment amount (rupiah): 180000
Input item price (rupiah): 151000
Ms. Sal needs to give 0 Rp50000 bill(s), 1 Rp20000 bill(s), 0 Rp10000 bill(s), 1 Rp5000 bill(s), and 4 Rp1000 bill(s).
\`\`\`
**Example 2**
\`\`\`
Input payment amount (rupiah): 100000
Input item price (rupiah): 13000
Ms. Sal needs to give 1 Rp50000 bill(s), 1 Rp20000 bill(s), 1 Rp10000 bill(s), 1 Rp5000 bill(s), and 2 Rp1000 bill(s).
\`\`\``,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient',
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['180000', '151000'] }, { stdin: ['100000', '13000'] }, { stdin: ['50000', '50000'], edge: 'no change: all 0' }, { stdin: ['1000000', '1000'], edge: 'large change: many 50000 bills' }, { stdin: ['20000', '19000'], edge: 'only one 1000 bill' }],
      wrong: [
        { code: 'p = int(input())\nb = int(input())\nchange = p - b\nprint("Ms. Sal needs to give " + str(change // 50000) + " Rp50000 bill(s), " + str(change // 20000) + " Rp20000 bill(s), " + str(change // 10000) + " Rp10000 bill(s), " + str(change // 5000) + " Rp5000 bill(s), and " + str(change // 1000) + " Rp1000 bill(s).")', msg: 'Each denomination is computed from the full change, so some money is counted several times. After taking the largest denomination, continue with the **remainder** (`change % 50000`, etc.).', tag: 'constraint-missed' },
      ],
      plan: 'change ← p − b; for each denomination from the largest: count ← change div denomination; change ← change mod denomination; print the five counts',
      skeleton: 'p = int(input())\nb = int(input())\nchange = p - ___\nn50 = change // ___\nchange = change % ___\nn20 = change // ___\nchange = change % ___\n...',
      hints: ['"Largest denomination first": take as many of the largest bills as possible, then continue with the remainder.', '`//` gives the number of bills, `%` gives the money left for the next denomination.'],
      syntax: ['program-template', 'input', 'operators', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header, specification, and declarations.', 'program-template', '# ALGORITHM'],
        ['p = int', 'Two integer inputs.', 'input', 'b = int'],
        ['change = p - b', 'Change = paid − price.', 'operators'],
        ['n50 = change // 50000', '`//`: how many 50,000 bills fit.', 'operators'],
        ['change = change % 50000', '`%`: the money left after the 50,000 bills. The next denomination works on this remainder (trap: using the full change again).', 'operators'],
        ['n20 =', 'The same pattern for the 20,000, 10,000, 5,000 denominations.', 'operators', 'change = change % 5000'],
        ['n1 = change // 1000', 'The smallest denomination: no need to find the remainder anymore.', 'operators'],
        ['print(', '`str()` for each number when using `+`.', 'print-str'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'All integers.', 'declarations'],
        ['input(p)', 'Input.', 'input', 'input(b)'],
        ['change ← p - b', 'The change.', 'assign'],
        ['n50 ←', '`div` and `mod` for each denomination, from the largest.', 'operators', 'n1 ← change div 1000'],
        ['output(', 'One output sentence.', 'print-str'],
      ]),
      explanation: 'A greedy pattern with `//` and `%`: take as many of the largest denomination as possible, continue with the remainder. Example 1: 29,000 = 1×20,000 + 1×5,000 + 4×1,000. Assumption: the change is always a multiple of 1,000.',
      refs: [{ src: MOD, page: 7 }],
    }],
  })
}
{
  const py = r`# Program MirrorSeat
# Mirror seat about the centre point of a theatre of n rows x m columns. No if-else.
# DECLARATIONS
# n, m, k : int
# row, col, mirrorRow, mirrorCol, mirror : int
# ALGORITHM
n = int(input())
m = int(input())
k = int(input())
row = (k - 1) // m           # row (starts at 0)
col = (k - 1) % m            # column (starts at 0)
mirrorRow = n - 1 - row
mirrorCol = m - 1 - col
mirror = mirrorRow * m + mirrorCol + 1
print("Mirror seat number: " + str(mirror))`
  const ps = r`Program MirrorSeat
{ Mirror seat about the centre point of a theatre of n rows x m columns. No if-else }
DECLARATIONS
  n, m, k, row, col, mirrorRow, mirrorCol, mirror : integer
ALGORITHM
  input(n)
  input(m)
  input(k)
  row ← (k - 1) div m
  col ← (k - 1) mod m
  mirrorRow ← n - 1 - row
  mirrorCol ← m - 1 - col
  mirror ← mirrorRow * m + mirrorCol + 1
  output("Mirror seat number: " + str(mirror))`
  problems.push({
    id: 'mod-1-2', archetype: 'program', title: 'Module 1 – Practice Problem 2 (2025/2026): Mirror seat',
    source: mod('1.5.2 Practice Problem 2 Year 2025/2026', [7, 8]), minutes: 20,
    parts: [{
      id: 'mod-1-2-1', kind: 'program', decks: ['D04'], topic: 'Arithmetic & input', patterns: ['sequence-io', 'operators'], misconceptions: ['off-by-one', 'index-range'],
      stem: `Mr. Mik is watching a movie in a theater whose seats are neatly arranged in a rectangle. The theater has n rows and m columns of seats. Seat numbers start from 1 at the leftmost column of the first row, continuing to the right, then to the next row.

Example for n = 4 and m = 5:

| | | | | |
|---|---|---|---|---|
| 1 | 2 | 3 | 4 | 5 |
| 6 | 7 | 8 | 9 | 10 |
| 11 | 12 | 13 | 14 | 15 |
| 16 | 17 | 18 | 19 | 20 |

Mr. Mik is curious to find the mirror seat of a given seat. A mirror seat is defined as the seat whose position is reflected against the center point of the theater's rectangle.

Given three integers n (number of seat rows), m (number of seat columns), and k (the seat number chosen by Mr. Mik), determine the mirror seat number!

**Hint:**
- Use the modulo operator "%" to get the remainder of a division.
- Use the "//" operator to get the integer result of a division.
- If-else is not allowed.

**Assumption:** The seat number chosen by Mr. Mik (k) is always valid, i.e., between 1 and n × m.

**Example 1**
\`\`\`
Input number of seat rows (n): 4
Input number of seat columns (m): 5
Input chosen seat number (k): 9
Mirror seat number: 12
\`\`\`
**Example 2**
\`\`\`
Input number of seat rows (n): 3
Input number of seat columns (m): 5
Input chosen seat number (k): 8
Mirror seat number: 8
\`\`\`
Explanation of Example 2: Since the theater has an odd number of rows and columns, the seat exactly at the center (2, 3) is its own mirror.`,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient',
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['4', '5', '9'] }, { stdin: ['3', '5', '8'] }, { stdin: ['4', '5', '1'], edge: 'first seat ↔ last seat' }, { stdin: ['4', '5', '20'], edge: 'last seat' }, { stdin: ['1', '1', '1'], edge: 'theatre with 1 seat' }, { stdin: ['1', '6', '2'], edge: 'a single row' }, { stdin: ['5', '1', '2'], edge: 'a single column' }],
      wrong: [
        { code: 'n = int(input())\nm = int(input())\nk = int(input())\nrow = k // m\ncol = k % m\nprint("Mirror seat number: " + str(((n - 1 - row) * m + (m - 1 - col)) + 1))', msg: 'The row/column from the seat number must use `k - 1` (numbers start at 1, indices at 0). Without `-1`, a seat at the end of a column (e.g. k = 5) gets the wrong row.', tag: 'off-by-one' },
        { code: 'n = int(input())\nm = int(input())\nk = int(input())\nrow = (k - 1) // m\ncol = (k - 1) % m\nprint("Mirror seat number: " + str(row * m + (m - 1 - col) + 1))', msg: 'Mirroring about the centre point flips **both row and column**. This code only flips the column.', tag: 'constraint-missed' },
      ],
      plan: 'row ← (k−1) div m; column ← (k−1) mod m (starting at 0); mirror row ← n−1−row; mirror column ← m−1−column; number ← mirror row·m + mirror column + 1',
      skeleton: 'row = (k - ___) // m\ncol = (k - ___) % m\nmirrorRow = n - 1 - ___\nmirrorCol = m - 1 - ___\nmirror = mirrorRow * ___ + mirrorCol + ___',
      hints: ['Convert the seat number into coordinates (row, column) with `//` and `%`. Count from 0 to keep the formula tidy.', 'Mirroring about the centre point: row r becomes n−1−r, column c becomes m−1−c.', 'Convert back to a seat number: row × m + column + 1.'],
      syntax: ['program-template', 'input', 'operators', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + specification; "no if-else" is followed.', 'program-template', '# ALGORITHM'],
        ['n = int', 'Three integer inputs.', 'input', 'k = int'],
        ['row = (k - 1) // m', '`k - 1` because seat numbers start at 1 while coordinates start at 0; `//` = the row number.', 'operators'],
        ['col = (k - 1) % m', '`%` = the position within the row (the column).', 'operators'],
        ['mirrorRow', 'The centre-point mirror flips the row AND the column: r → n−1−r, c → m−1−c.', 'operators', 'mirrorCol'],
        ['mirror =', 'Back to a seat number: row·m + column + 1 (the +1 undoes the initial conversion).', 'operators'],
        ['print(', '`str()` to join numbers.', 'print-str'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'All integers.', 'declarations'],
        ['input(n)', 'Input.', 'input', 'input(k)'],
        ['row ←', 'Seat number → (row, column) starting at 0.', 'operators', 'col ←'],
        ['mirrorRow ←', 'The mirroring.', 'operators', 'mirrorCol ←'],
        ['mirror ←', 'Coordinates → seat number.', 'operators'],
        ['output(', 'Output.', 'print-str'],
      ]),
      explanation: 'Because it is a centre-point mirror, seat (r, c) ↔ (n−1−r, m−1−c). In seat numbers the result equals n·m + 1 − k (example 1: 20 + 1 − 9 = 12). The direct formula is also correct; the coordinate version uses `//` and `%` as the problem hints.',
      refs: [{ src: MOD, page: 7 }, { src: MOD, page: 8 }],
    }],
  })
}
{
  const py = r`# Program LatePenalty
# Late penalty: Rp800,000 per full day, Rp25,000 per remaining full hour, Rp1,000 per remaining full 5 minutes
# No if-else
# DECLARATIONS
# d, days, hours, mins, penalty : int
# ALGORITHM
d = int(input())
days = d // 1440
hours = (d % 1440) // 60
mins = d % 60
penalty = days * 800000 + hours * 25000 + (mins // 5) * 1000
print("Total penalty to be paid: Rp " + str(penalty))`
  const ps = r`Program LatePenalty
{ Penalty: Rp800,000 per full day, Rp25,000 per remaining full hour, Rp1,000 per remaining full 5 minutes. No if-else }
DECLARATIONS
  d, days, hours, mins, penalty : integer
ALGORITHM
  input(d)
  days ← d div 1440
  hours ← (d mod 1440) div 60
  mins ← d mod 60
  penalty ← days * 800000 + hours * 25000 + (mins div 5) * 1000
  output("Total penalty to be paid: Rp " + str(penalty))`
  problems.push({
    id: 'mod-1-3', archetype: 'program', title: 'Module 1 – Practice Problem 3 (2025/2026): Late-return penalty',
    source: mod('1.5.3 Practice Problem 3 Year 2025/2026', [8, 9]), minutes: 20,
    parts: [{
      id: 'mod-1-3-1', kind: 'program', decks: ['D04'], topic: 'Arithmetic & input', patterns: ['sequence-io', 'operators'], misconceptions: ['off-by-one'],
      stem: `Mr. Mik runs a very popular electric bike rental business on his campus. To keep customers disciplined, Mr. Mik applies a late-return penalty system with the following rules:

- Every full day of lateness incurs a penalty of Rp 800,000.
- After the full days are accounted for, every remaining full hour incurs an additional penalty of Rp 25,000.
- After the full days and hours are accounted for, every remaining 5 minutes incurs a penalty of Rp 1,000.
- If the remaining minutes are less than 5, no additional penalty is charged.

**Hint:**
- Use the modulo operator "%" to get the remainder of a division.
- Use the "//" operator to get the integer result of a division.
- If-else is not allowed.

Help Mr. Mik calculate the total penalty his customer has to pay!

**Assumption:** The lateness duration is always more than 0 minutes.

**Example 1**
\`\`\`
Input lateness duration (minutes): 45
Total penalty to be paid: Rp 9000
\`\`\`
Explanation of Example 1: 45 minutes of lateness = 45 / 5 x 1000 = Rp 9,000. Since it is less than 1 hour (60 minutes), there is no additional penalty.

**Example 2**
\`\`\`
Input lateness duration (minutes): 75
Total penalty to be paid: Rp 28000
\`\`\``,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient',
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['45'] }, { stdin: ['75'] }, { stdin: ['4'], edge: 'less than 5 minutes: no penalty' }, { stdin: ['1440'], edge: 'exactly 1 day' }, { stdin: ['1500'], edge: '1 day + 1 hour' }, { stdin: ['1439'], edge: '23 hours 59 minutes (the boundary before 1 day)' }],
      wrong: [
        { code: 'd = int(input())\ndays = d // 1440\nhours = d // 60\nmins = d % 60\nprint("Total penalty to be paid: Rp " + str(days * 800000 + hours * 25000 + (mins // 5) * 1000))', msg: 'The hours must be computed from the **remainder after full days**: `(d % 1440) // 60`, not `d // 60` (the hours in full days are already counted in the day penalty).', tag: 'constraint-missed' },
        { code: 'd = int(input())\nprint("Total penalty to be paid: Rp " + str((d // 5) * 1000))', msg: 'This only counts per 5 minutes of the total duration. The penalty is tiered: full days, then remaining full hours, then remaining full 5 minutes.', tag: 'constraint-missed' },
      ],
      plan: 'days ← d div 1440; hours ← (d mod 1440) div 60; minutes ← d mod 60; penalty ← days·800000 + hours·25000 + (minutes div 5)·1000',
      skeleton: 'days = d // ___\nhours = (d % ___) // ___\nmins = d % ___\npenalty = days * ___ + hours * ___ + (mins // ___) * ___',
      hints: ['Split the duration into days, hours, and remaining minutes. One day = 1440 minutes.', 'Remaining hours = (remainder after full days) // 60; remaining minutes = d % 60.', 'Minutes < 5 are not penalised: integer division `// 5` automatically gives 0.'],
      syntax: ['program-template', 'input', 'operators', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + the tiered penalty rule; no if-else.', 'program-template', '# ALGORITHM'],
        ['d = int', 'The duration in minutes.', 'input'],
        ['days = d // 1440', '1 day = 24×60 = 1440 minutes; `//` = full days.', 'operators'],
        ['hours =', 'The remainder after full days (`% 1440`), then full hours (`// 60`).', 'operators'],
        ['mins = d % 60', 'The remaining minutes after full hours. (Since 1440 is a multiple of 60, `d % 60` equals the remaining minutes after days and hours.)', 'operators'],
        ['penalty =', '`mins // 5` gives the number of full 5-minute blocks; less than 5 → 0 (no if needed).', 'operators'],
        ['print(', 'The text follows the sample: "Rp " with a space, then the number.', 'print-str'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'Integers.', 'declarations'],
        ['input(d)', 'Input.', 'input'],
        ['days ←', 'Full days.', 'operators'],
        ['hours ←', 'Full hours from the remainder.', 'operators', 'mins ←'],
        ['penalty ←', 'The sum of the tiered penalty.', 'operators'],
        ['output(', 'Output.', 'print-str'],
      ]),
      explanation: 'A tiered penalty without if-else: compute the full days, the full hours from the remainder, and the 5-minute blocks from the remaining minutes. Example 2: 75 minutes = 1 hour + 15 minutes → 25,000 + 3×1,000 = 28,000.',
      refs: [{ src: MOD, page: 8 }, { src: MOD, page: 9 }],
    }],
  })
}
/* ====================================================== Python module – Module 2 exercises ====================================================== */
{
  const py = r`# Program EvenOddPositive
# Determines whether N is positive/negative/zero and, if positive, odd or even
# DECLARATIONS
# N : int
# ALGORITHM
N = int(input())
if (N > 0):
    if (N % 2 == 0):
        print(str(N) + " is an even positive integer")
    else:  # N odd
        print(str(N) + " is an odd positive integer")
elif (N < 0):
    print(str(N) + " is negative number")
else:  # N == 0
    print(str(N) + " is zero")`
  const ps = r`Program EvenOddPositive
{ N positive (odd/even), negative, or zero }
DECLARATIONS
  N : integer
ALGORITHM
  input(N)
  if (N > 0) then
    if (N mod 2 = 0) then
      output(str(N) + " is an even positive integer")
    else { N odd }
      output(str(N) + " is an odd positive integer")
  else if (N < 0) then
    output(str(N) + " is negative number")
  else { N = 0 }
    output(str(N) + " is zero")`
  problems.push({
    id: 'mod-2-1', archetype: 'program', title: 'Module 2 – Even-Odd Program',
    source: mod('2.2.1 Even-Odd Program', [11]), minutes: 10,
    parts: [{
      id: 'mod-2-1-1', kind: 'program', decks: ['D05'], topic: 'Branching', patterns: ['if-elif', 'nested-if'], misconceptions: ['assign-vs-eq', 'str-concat'],
      stem: `With the program which determines positive and negative numbers above, modify it such that if the number is positive will also tell whether it is odd or even.

(The program above, from section 2.1:)
\`\`\`python
print("Input value of N: ", end="")
N = int(input())
if (N > 0):
    print(str(N) + " is positive number ")
elif (N < 0):
    print(str(N) + " is negative number ")
else: # N == 0
    print(str(N) + " is zero")
\`\`\`

**Example 1**
\`\`\`
Input value of N: 20
20 is an even positive integer
\`\`\``,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient',
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['20'] }, { stdin: ['7'], edge: 'odd positive' }, { stdin: ['0'], edge: 'zero is not positive' }, { stdin: ['-4'], edge: 'negative even: not labelled even' }, { stdin: ['1'], edge: 'smallest positive boundary' }],
      wrong: [
        { code: 'N = int(input())\nif (N % 2 == 0):\n    print(str(N) + " is an even positive integer")\nelse:\n    print(str(N) + " is an odd positive integer")', msg: 'The sign must be checked first: zero and negative numbers must not be labelled "positive". Put the odd/even check **inside** the `N > 0` branch.', tag: 'not-complete' },
        { code: 'N = int(input())\nif (N > 0):\n    if (N % 2 == 1):\n        print(str(N) + " is an odd positive integer")\n    else:\n        print(str(N) + " is an even positive integer")\nelif (N < 0):\n    print(str(N) + " is negative number")\nelse:\n    print(str(N) + " is zero")\nprint(N % 2 == 0)', msg: 'There is an extra `print` line outside the branching, so the output has extra lines.', tag: 'indentation' },
      ],
      plan: 'if N > 0: if N mod 2 = 0 print even, otherwise odd; otherwise if N < 0 print negative; otherwise zero',
      skeleton: 'N = int(input())\nif (N ___ 0):\n    if (N % ___ == 0):\n        print(str(N) + " is an even positive integer")\n    else:\n        print(str(N) + " is an ___ positive integer")\nelif (N < 0):\n    ...\nelse:\n    ...',
      hints: ['A branch inside a branch: the "positive" branch contains another if-else for odd/even.', 'Even if the remainder of division by 2 equals 0 (`==`, not `=`).'],
      syntax: ['if-elif', 'relational-logical', 'operators', 'print-str', 'indentation'],
      lineNotes: notes(py, [
        ['# Program', 'Header + specification.', 'program-template', '# ALGORITHM'],
        ['N = int', 'Integer input.', 'input'],
        ['if (N > 0)', 'The first branch: positive. The nested `if` inside it checks odd/even; indentation shows membership.', 'if-elif'],
        ['if (N % 2 == 0)', '`%` is the remainder, `==` is comparison.', 'relational-logical'],
        ['else:  # N odd', 'The partner of the inner `if`: its complement is odd.', 'if-else'],
        ['elif (N < 0)', 'The negative branch is aligned with `if (N > 0)` (same indentation).', 'if-elif'],
        ['else:  # N == 0', 'The only remaining possibility is zero.', 'if-else'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'One variable.', 'declarations'],
        ['input(N)', 'Input.', 'input'],
        ['if (N > 0)', 'The positive branch with a nested if-else.', 'if'],
        ['else if (N < 0)', 'The negative branch.', 'if-elif'],
        ['else { N = 0 }', 'Zero.', 'if-else'],
      ]),
      explanation: 'Two levels of branching: the sign of the number (positive/negative/zero), then inside positive: odd/even. Note: the handout only gives the example "20 is an even positive integer"; the text for the other cases follows the basic program in section 2.1.',
      refs: [{ src: MOD, page: 11 }, { src: MOD, page: 10 }],
    }],
  })
}
{
  const py = r`# Program ExamTime
# Mr. Riz: 14 short-answer questions (10 min each), 2 essay questions (20 min each); 60 minutes left
# DECLARATIONS
# shortDone, essayDone, needed : int
# ALGORITHM
shortDone = int(input())
essayDone = int(input())
needed = (14 - shortDone) * 10 + (2 - essayDone) * 20
if (needed <= 60):
    print("Mr. Riz will successfully complete all questions")
else:
    print("Mr. Riz will not complete all questions on time")`
  const ps = r`Program ExamTime
{ Mr. Riz: 14 short-answer questions (10 min each), 2 essay questions (20 min each); 60 minutes left }
DECLARATIONS
  shortDone, essayDone, needed : integer
ALGORITHM
  input(shortDone)
  input(essayDone)
  needed ← (14 - shortDone) * 10 + (2 - essayDone) * 20
  if (needed ≤ 60) then
    output("Mr. Riz will successfully complete all questions")
  else { needed > 60 }
    output("Mr. Riz will not complete all questions on time")`
  const judge = r`def judge(stdin, out, ref_out):
    t = out.strip().lower()
    ok = 'success' in t and 'not' not in t
    ref_ok = 'success' in ref_out.lower()
    if ok != ref_ok:
        return 'Wrong conclusion: the answer should say that Mr. Riz ' + ('completes all questions' if ref_ok else 'does not complete all questions in time') + '. The time needed must be ≤ 60 minutes (the time left).'
    return None`
  problems.push({
    id: 'mod-2-2', archetype: 'program', title: 'Module 2 – Practice Problem 1 (2022): Exam time (Mr. Riz)',
    source: mod('2.2.2 Practice Problem 1 Year 2022', [11]), minutes: 10,
    parts: [{
      id: 'mod-2-2-1', kind: 'program', decks: ['D05'], topic: 'Branching', patterns: ['if-else', 'operators'], misconceptions: ['off-by-one', 'constraint-missed'],
      stem: `Mr. Riz is taking an exam consisting of 14 short-answer questions and 2 essay questions. The exam lasts for 2 hours. During the first hour, he focused on solving only a few questions. He is worried that he might not be able to complete all questions on time. Mr. Riz plans to work on 1 remaining short-answer question for 10 minutes and 1 remaining essay question for 20 minutes.

Determine if Mr. Riz manages to complete all questions on time.

**Example 1**
\`\`\`
Enter the number of short-answer questions already completed: 12
Enter the number of essay questions already completed: 1
Mr. Riz will successfully complete all questions
\`\`\``,
      reps: ['python', 'pseudo', 'flow'], match: 'judge', judge,
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['12', '1'] }, { stdin: ['10', '1'], edge: 'exactly 60 minutes: still enough time' }, { stdin: ['9', '1'], edge: '70 minutes: not enough time' }, { stdin: ['0', '0'], edge: 'nothing completed yet (180 minutes)' }, { stdin: ['14', '2'], edge: 'everything is already done' }],
      wrong: [
        { code: 'a = int(input())\nb = int(input())\nneeded = (14 - a) * 10 + (2 - b) * 20\nif (needed < 60):\n    print("Mr. Riz will successfully complete all questions")\nelse:\n    print("Mr. Riz will not complete all questions on time")', msg: 'Exactly 60 minutes is still enough ("on time"): use `<= 60`, not `< 60`.', tag: 'off-by-one' },
        { code: 'a = int(input())\nb = int(input())\nneeded = (14 - a) * 10 + (2 - b) * 20\nif (needed <= 120):\n    print("Mr. Riz will successfully complete all questions")\nelse:\n    print("Mr. Riz will not complete all questions on time")', msg: 'The exam is 2 hours, but the first hour has already been used. The time left is 60 minutes, not 120.', tag: 'constraint-missed' },
      ],
      plan: 'remaining short ← 14 − short done; remaining essay ← 2 − essays done; time ← 10·remaining short + 20·remaining essay; if time ≤ 60 (one hour left) print success, otherwise not',
      skeleton: 'needed = (14 - shortDone) * ___ + (2 - essayDone) * ___\nif (needed ___ 60):\n    print("Mr. Riz will successfully complete all questions")\nelse:\n    print("...")',
      hints: ['Unfinished questions × time per question = time needed.', 'The exam is 2 hours and the first hour has passed: how many minutes are left?', 'Is a time exactly equal to the time left still enough? Think about `<=` vs `<`.'],
      syntax: ['input', 'operators', 'if-else', 'relational-logical', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + the assumption of 60 minutes left (a 2-hour exam, the first hour has passed).', 'program-template', '# ALGORITHM'],
        ['shortDone = int', 'Two inputs: the questions already completed.', 'input', 'essayDone = int'],
        ['needed =', 'Remaining questions × time per question: (14 − done)·10 + (2 − done)·20.', 'operators'],
        ['if (needed <= 60)', '`<=`: exactly 60 minutes is still enough.', 'relational-logical'],
        ['else:', 'The complement branch: not enough time. The text of this branch is not in the handout; the site checker only judges the conclusion "success / not".', 'if-else'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'Integers.', 'declarations'],
        ['input(shortDone)', 'Input.', 'input', 'input(essayDone)'],
        ['needed ←', 'The time needed.', 'operators'],
        ['if (needed', 'Compare with the 60 minutes left.', 'if-else'],
      ]),
      explanation: 'The time left is 60 minutes (a 2-hour exam, the first hour has passed). Time needed = remaining short × 10 + remaining essay × 20. Example 1: 2×10 + 1×20 = 40 ≤ 60 → success. Note: the handout only shows the message for the success case; the failure message here is an assumption.',
      refs: [{ src: MOD, page: 11 }],
    }],
  })
}
{
  const py = r`# Program BravoNumber
# A 4-digit number is called "Bravo" if its digit sum is divisible by each of its digits
# Assumption: digit 0 cannot divide, so a number containing 0 is considered ordinary
# DECLARATIONS
# num, d1, d2, d3, d4, total : int
# bravo : bool
# ALGORITHM
num = int(input())
d1 = num // 1000
d2 = (num // 100) % 10
d3 = (num // 10) % 10
d4 = num % 10
total = d1 + d2 + d3 + d4
if (d1 == 0 or d2 == 0 or d3 == 0 or d4 == 0):
    bravo = False
else:
    bravo = (total % d1 == 0 and total % d2 == 0 and total % d3 == 0 and total % d4 == 0)
if (bravo):
    print("The number is a Bravo number.")
else:
    print("The number is an ordinary number.")`
  const ps = r`Program BravoNumber
{ 4-digit "Bravo" number: the digit sum is divisible by each digit. Digit 0 cannot divide → ordinary }
DECLARATIONS
  num, d1, d2, d3, d4, total : integer
  bravo : boolean
ALGORITHM
  input(num)
  d1 ← num div 1000
  d2 ← (num div 100) mod 10
  d3 ← (num div 10) mod 10
  d4 ← num mod 10
  total ← d1 + d2 + d3 + d4
  if (d1 = 0 or d2 = 0 or d3 = 0 or d4 = 0) then
    bravo ← false
  else
    bravo ← (total mod d1 = 0 and total mod d2 = 0 and total mod d3 = 0 and total mod d4 = 0)
  if (bravo) then
    output("The number is a Bravo number.")
  else
    output("The number is an ordinary number.")`
  problems.push({
    id: 'mod-2-3', archetype: 'program', title: 'Module 2 – Bravo number (Mr. Leo)',
    source: mod('2.2.2 (Bravo number, printed under Practice Problem 1 Year 2022)', [11]), minutes: 15,
    parts: [{
      id: 'mod-2-3-1', kind: 'program', decks: ['D05'], topic: 'Branching', patterns: ['if-else', 'operators', 'game-rules'], misconceptions: ['not-complete'],
      stem: `Mr. Leo refers to a number as a "Bravo" number if the sum of each of its digits is evenly divisible by each of its digits. If a number does not meet this criterion, it is referred to as an ordinary number, and a 4-digit number is provided. Determine the category of the number.

**Hint:** Use division and modulo to get the value of each digit.

**Example 1**
\`\`\`
Enter a number: 4228
The number is a Bravo number.
\`\`\`
Explanation for Example 1: The sum of each digit in the number 4228 is 4 + 2 + 2 + 8 = 16, and 16 is evenly divisible by each of its digits, which are 2, 4, and 8, so it is called a "Bravo" number.

**Example 2**
\`\`\`
Enter a number: 3425
The number is an ordinary number.
\`\`\``,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient',
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['4228'] }, { stdin: ['3425'] }, { stdin: ['1111'], edge: 'all digits 1: digit sum 4 divisible by 1' }, { stdin: ['1236'], edge: 'digit sum 12 divisible by 1,2,3,6' }, { stdin: ['2468'], edge: 'digit sum 20: not divisible by 6 → ordinary' }, { stdin: ['9999'], edge: 'digit sum 36' }],
      wrong: [
        { code: 'num = int(input())\nd1 = num // 1000\nd2 = (num // 100) % 10\nd3 = (num // 10) % 10\nd4 = num % 10\ntotal = d1 + d2 + d3 + d4\nif (total % d1 == 0 or total % d2 == 0 or total % d3 == 0 or total % d4 == 0):\n    print("The number is a Bravo number.")\nelse:\n    print("The number is an ordinary number.")', msg: '"Divisible by **each** digit" means all conditions must hold (`and`), not just one (`or`).', tag: 'not-disjoint' },
        { code: 'num = int(input())\nd1 = num // 1000\nd2 = (num // 100) % 10\nd3 = (num // 10) % 10\nd4 = num % 10\ntotal = d1 + d2 + d3 + d4\nif (d1 % total == 0 and d2 % total == 0 and d3 % total == 0 and d4 % total == 0):\n    print("The number is a Bravo number.")\nelse:\n    print("The number is an ordinary number.")', msg: 'The division direction is reversed: what is checked is the digit sum divided by the digit (`total % digit`), not the digit divided by the sum.', tag: 'assign-vs-eq' },
      ],
      plan: 'separate the 4 digits with div/mod; sum them; Bravo if the sum mod each digit = 0 for all four digits (a digit 0 makes the number ordinary); print the category',
      skeleton: 'd1 = num // ___\nd2 = (num // ___) % 10\nd3 = (num // ___) % 10\nd4 = num % ___\ntotal = d1 + d2 + d3 + d4\nbravo = (total % d1 == 0 ___ total % d2 == 0 ___ ...)',
      hints: ['Take the units digit with `% 10` and drop it with `// 10`; for 4 digits you can use `// 1000`, `// 100 % 10`, etc. directly.', '"Divisible" means the remainder = 0; "each digit" means all four conditions at once.', 'Be careful with the digit 0 (it cannot be a divisor).'],
      syntax: ['input', 'operators', 'relational-logical', 'if-else', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + the assumption about the digit 0 (the handout does not cover it): treated as not Bravo to avoid division by zero.', 'program-template', '# ALGORITHM'],
        ['num = int', 'A 4-digit number.', 'input'],
        ['d1 = num // 1000', 'Thousands.', 'operators'],
        ['d2 =', 'Hundreds, tens: `// 10^k` then `% 10`.', 'operators', 'd4 = num % 10'],
        ['total =', 'The digit sum.', 'operators'],
        ['if (d1 == 0', 'Division-by-zero guard: `total % 0` would raise a ZeroDivisionError.', 'if-else'],
        ['bravo = (total % d1', 'The four conditions with `and`: all must be true ("each digit").', 'relational-logical'],
        ['if (bravo)', 'A boolean variable directly as the condition.', 'if-else'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'Integers and one boolean.', 'declarations'],
        ['input(num)', 'Input.', 'input'],
        ['d1 ←', 'Digit separation.', 'operators', 'd4 ←'],
        ['total ←', 'The sum.', 'operators'],
        ['if (d1 = 0', 'Guard against a zero digit.', 'if-else'],
        ['bravo ← (', 'All digits must divide the sum.', 'relational-logical'],
        ['if (bravo)', 'Category.', 'if-else'],
      ]),
      explanation: 'Separate the digits with `//` and `%`, sum them, then check `sum % digit == 0` for all four digits at once (`and`). Example 4228: sum 16, 16 is divisible by 4, 2, 2, 8 → Bravo. The handout does not cover the digit 0; here such a number is treated as ordinary.',
      refs: [{ src: MOD, page: 11 }],
    }],
  })
}
{
  const py = r`# Program FrogJumps
# Frog on the x-axis: jumps a to the right, b to the left alternately, k times
# Rule for k: negative multiple of 3 -> 2b; other negative -> a*b; even/zero -> a*b; positive odd -> 2a
# DECLARATIONS
# x, a, b, k, pos : int
# ALGORITHM
x = int(input())
a = int(input())
b = int(input())
if (x < 0):
    if (x % 3 == 0):
        k = b * 2
    else:
        k = a * b
elif (x % 2 == 0):      # even (including 0)
    k = a * b
else:                   # positive odd
    k = a * 2
# jumps 1, 3, 5, ... go right (a); jumps 2, 4, ... go left (b)
pos = x + ((k + 1) // 2) * a - (k // 2) * b
print("Current coordinate is " + str(pos))`
  const ps = r`Program FrogJumps
{ Frog on the x-axis: jumps a to the right, b to the left alternately, k times }
DECLARATIONS
  x, a, b, k, pos : integer
ALGORITHM
  input(x)
  input(a)
  input(b)
  if (x < 0) then
    if (x mod 3 = 0) then
      k ← b * 2
    else
      k ← a * b
  else if (x mod 2 = 0) then
    k ← a * b
  else
    k ← a * 2
  pos ← x + ((k + 1) div 2) * a - (k div 2) * b
  output("Current coordinate is " + str(pos))`
  problems.push({
    id: 'mod-2-4', archetype: 'program', title: 'Module 2 – Practice Problem 3 (2022): The frog',
    source: mod('2.2.3 Practice Problem 3 Year 2022', [12]), minutes: 25,
    parts: [{
      id: 'mod-2-4-1', kind: 'program', decks: ['D05'], topic: 'Branching', patterns: ['nested-if', 'if-elif', 'game-rules', 'operators'], misconceptions: ['constraint-missed', 'not-disjoint'],
      stem: `A frog observed by Mr. Riz is on an x-axis. The frog jumps based on a simple pattern. The first jump is a units to the right, the second jump is b units to the left, the third jump is a units to the right, the fourth jump is b units to the left, and so on for k times. The number k is obtained based on the frog's initial position with the following rules:

- If the frog is at an even coordinate, its k value is the frog's ability to jump to the right (a) multiplied by the frog's ability to jump to the left (b).
- If the frog is at an odd coordinate, its k value is a × 2.
- If the frog is at a negative coordinate, it returns to the first rule (a × b).
- However, if the frog is at a negative coordinate that is a multiple of 3, its k value is b × 2.

Determine the current coordinate of the frog.

**Example 1**
\`\`\`
Enter the coordinate: 0
Enter the length of jump to the right: 5
Enter the length of jump to the left: 1
Current coordinate is 13
\`\`\`
Explanation for Example 1: Since 0 falls under the first rule, the frog will jump 5 times. The calculation of the frog's coordinate will be like this: 0 + 5 − 1 + 5 − 1 + 5 = 13

**Example 2**
\`\`\`
Enter the coordinate: -3
Enter the length of jump to the right: 2
Enter the length of jump to the left: 5
Current coordinate is -18
\`\`\``,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient',
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['0', '5', '1'] }, { stdin: ['-3', '2', '5'] }, { stdin: ['3', '2', '4'], edge: 'positive odd: k = 2a' }, { stdin: ['-4', '2', '3'], edge: 'negative, not a multiple of 3: k = a·b' },
        { stdin: ['-6', '3', '2'], edge: 'negative even AND a multiple of 3: the multiple-of-3 rule wins (k = 2b)' }, { stdin: ['4', '3', '1'], edge: 'positive even: k = a·b' }],
      wrong: [
        { code: 'x = int(input())\na = int(input())\nb = int(input())\nif (x % 2 == 0):\n    k = a * b\nelif (x < 0 and x % 3 == 0):\n    k = b * 2\nelif (x < 0):\n    k = a * b\nelse:\n    k = a * 2\nprint("Current coordinate is " + str(x + ((k + 1) // 2) * a - (k // 2) * b))', msg: 'Wrong order of checks: a negative multiple of 3 (e.g. −6) **overrides** the even rule. Check `x < 0` first.', tag: 'not-disjoint' },
        { code: 'x = int(input())\na = int(input())\nb = int(input())\nif (x < 0 and x % 3 == 0):\n    k = b * 2\nelif (x % 2 == 0):\n    k = a * b\nelse:\n    k = a * 2\nprint("Current coordinate is " + str(x + (k // 2) * a - (k // 2) * b))', msg: 'The odd (right) jumps are one more than the even jumps when k is odd: right = (k + 1) // 2, left = k // 2. Also, a negative odd number that is not a multiple of 3 (e.g. −5) must use a·b, not 2a.', tag: 'off-by-one' },
      ],
      plan: 'determine k: if x < 0: (multiple of 3 → 2b, otherwise a·b); otherwise if x is even → a·b, odd → 2a. Final position ← x + (number of right jumps)·a − (number of left jumps)·b with right = (k+1) div 2, left = k div 2',
      skeleton: 'if (x < 0):\n    if (x % 3 == ___):\n        k = b * ___\n    else:\n        k = a * ___\nelif (x % 2 == 0):\n    k = ___\nelse:\n    k = ___\npos = x + ((k + 1) // 2) * ___ - (k // 2) * ___',
      hints: ['First separate the two big cases: x negative (with the sub-case multiple of 3) and x non-negative (even/odd). The order of checking decides which rule wins.', 'In k jumps, jumps 1, 3, 5, … go right and jumps 2, 4, … go left. How many of each for odd and even k?', 'Multiples of 3 for negative numbers: `x % 3 == 0` also works in Python.'],
      syntax: ['input', 'if-elif', 'relational-logical', 'operators', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + a summary of the rules for k.', 'program-template', '# ALGORITHM'],
        ['x = int', 'Three integer inputs.', 'input', 'b = int'],
        ['if (x < 0)', 'The "negative" rule is checked **first** because it overrides the even/odd rule. Only one case applies.', 'if-elif'],
        ['if (x % 3 == 0)', 'Negative multiple of 3 → k = 2b.', 'relational-logical', 'k = b * 2'],
        ['else:', 'Negative, not a multiple of 3 → back to the first rule (a·b).', 'if-else', 'k = a * b'],
        ['elif (x % 2 == 0)', 'x is not negative: even (including 0) → k = a·b.', 'if-elif', 'k = a * b'],
        ['else:                   # positive', 'Positive odd → k = 2a.', 'if-else', 'k = a * 2'],
        ['pos =', 'From k alternating jumps (right first): right = (k+1)//2, left = k//2 (if k is odd, there is one more right jump). Position = x + right·a − left·b.', 'operators'],
        ['print(', '`str(pos)` is required for `+`.', 'print-str'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'Integers.', 'declarations'],
        ['input(x)', 'Input.', 'input', 'input(b)'],
        ['if (x < 0)', 'Negative is checked first; nested: multiple of 3 or not.', 'if', 'k ← a * b'],
        ['else if (x mod 2', 'Not negative: even or odd.', 'if-elif', 'k ← a * 2'],
        ['pos ←', 'The final position formula.', 'operators'],
        ['output(', 'Output.', 'print-str'],
      ]),
      explanation: 'Determine k with branching (negative first, because it overrides the even/odd rule), then compute the position: right jumps = ⌈k/2⌉, left jumps = ⌊k/2⌋. Example 2: x = −3 (a negative multiple of 3) → k = 2·5 = 10 → 5 right (2) and 5 left (5): −3 + 10 − 25 = −18.',
      refs: [{ src: MOD, page: 12 }],
    }],
  })
}
/* ====================================================== Python module – Module 3 exercises ====================================================== */
{
  const py = r`# Program SmallestPowerOf10
# Prints the smallest number 10^x (x >= 0) that is >= N
# DECLARATIONS
# N, p : int
# ALGORITHM
N = int(input())
p = 1
while (p < N):
    p = p * 10
print(p)`
  const ps = r`Program SmallestPowerOf10
{ Smallest number 10^x (x ≥ 0) that is ≥ N }
DECLARATIONS
  N, p : integer
ALGORITHM
  input(N)
  p ← 1
  while (p < N) do
    p ← p * 10
  output(p)`
  problems.push({
    id: 'mod-3-1', archetype: 'program', title: 'Module 3 – Smallest Power of 10',
    source: mod('3.4.1 Smallest Power of 10', [17]), minutes: 10,
    parts: [
      {
        id: 'mod-3-1a', kind: 'program', label: 'a', decks: ['D05'], topic: 'While loop', patterns: ['while-condition'], misconceptions: ['off-by-one', 'while-no-next', 'init-in-loop'],
        stem: `Create a program that receives an integer N and write the smallest integer 10^x that is greater or equal than N.

**Example 1**
\`\`\`
Input N: 5
10
\`\`\`
**Example 2**
\`\`\`
Input N: 1234
10000
\`\`\``,
        reps: ['python', 'pseudo', 'flow'], match: 'lenient',
        solution: { python: py, pseudo: ps },
        tests: [{ stdin: ['5'] }, { stdin: ['1234'] }, { stdin: ['10'], edge: 'N is already a power of 10: the answer is N itself' }, { stdin: ['11'], edge: 'just above a power of 10' }, { stdin: ['100'], edge: 'a larger power of 10' }, { stdin: ['99999'], edge: 'many iterations' }],
        wrong: [
          { code: 'N = int(input())\np = 1\nwhile (p <= N):\n    p = p * 10\nprint(p)', msg: 'The condition "greater **or equal**": if N itself is a power of 10 (e.g. 10) the answer is N. The loop stops when `p >= N`, so the continue condition is `p < N`, not `p <= N`.', tag: 'off-by-one' },
          { code: 'N = int(input())\np = 1\nwhile (p < N):\n    p = 10\nprint(p)', msg: 'The value of `p` never grows beyond 10 (`p = 10` instead of `p = p * 10`), so for large N the loop never stops.', tag: 'while-no-next' },
        ],
        plan: 'p ← 1; while p < N: p ← p × 10; print p',
        skeleton: 'N = int(input())\np = ___\nwhile (p ___ N):\n    p = p * ___\nprint(p)',
        hints: ['The number of repetitions is not known in advance, only the stopping condition. Which loop fits?', 'Start from 1 and multiply by 10 while it is still less than N.'],
        syntax: ['input', 'while', 'operators'],
        lineNotes: notes(py, [
          ['# Program', 'Header + specification (x ≥ 0 so N = 1 gives 1).', 'program-template', '# ALGORITHM'],
          ['N = int', 'Input N.', 'input'],
          ['p = 1', 'The initial candidate 10^0. Initialised before the loop.', 'assign'],
          ['while (p < N)', 'Keeps growing until it reaches N. `<` (not `<=`) because p = N already satisfies "greater or equal".', 'while'],
          ['p = p * 10', 'The loop body advances p; without it the loop never stops.'],
          ['print(p)', 'Not indented: runs once after the loop (termination).', 'indentation'],
        ]),
        pseudoNotes: notes(ps, [
          ['DECLARATIONS', 'Two integers.', 'declarations'],
          ['input(N)', 'Input.', 'input'],
          ['p ← 1', 'Initialisation.', 'assign'],
          ['while (p < N)', 'A loop whose number of repetitions is unknown.', 'while', 'p ← p * 10'],
          ['output(p)', 'Termination.', 'print-str'],
        ]),
        explanation: 'The number of repetitions depends on N and is not known at the start, so `while` fits. Example 1234: p = 1 → 10 → 100 → 1000 → 10000 (stops because 10000 ≥ 1234).',
        refs: [{ src: MOD, page: 17 }],
      },
      {
        id: 'mod-3-1b', kind: 'open', label: 'b', decks: ['D05'], topic: 'While loop', patterns: ['while-condition'],
        stem: 'Which loop is more appropriate for this question?',
        answer: '**A while loop.** The number of repetitions is not known before the program runs (it depends on the value of N); only the *stopping condition* (p ≥ N) is known. A `while` loop repeats as long as the condition is true. `for` fits when the number of iterations is known in advance.',
        keyPoints: ['Chooses while', 'Reason: the number of repetitions is not known at the start, only the stopping condition'],
        rubric: [
          { score: 4, desc: 'Chooses while with the right reason (the number of repetitions is unknown, it depends on a condition)' },
          { score: 3, desc: 'Chooses while, reason incomplete' },
          { score: 2, desc: 'Chooses while without a reason' },
          { score: 1, desc: 'Chooses for, but the reason still contains something correct' },
          { score: 0, desc: 'No answer or completely wrong' },
        ],
        explanation: 'See the model answer.', refs: [{ src: MOD, page: 17 }],
      },
    ],
  })
}
{
  const py = r`# Program NumberTriangle
# Number triangle with base N: row i contains 1 2 ... i
# DECLARATIONS
# N, i, j : int
# ALGORITHM
N = int(input())
for i in range(1, N + 1):
    for j in range(1, i + 1):
        print(str(j) + " ", end="")
    print()`
  const ps = r`Program NumberTriangle
{ Number triangle with base N: row i contains 1 2 ... i }
DECLARATIONS
  N, i, j : integer
  line : string
ALGORITHM
  input(N)
  i traversal [1..N]
    line ← ""
    j traversal [1..i]
      line ← line + str(j) + " "
    output(line)`
  problems.push({
    id: 'mod-3-2', archetype: 'program', title: 'Module 3 – Number Triangle',
    source: mod('3.4.2 Number Triangle', [17]), minutes: 15,
    parts: [
      {
        id: 'mod-3-2a', kind: 'program', label: 'a', decks: ['D05'], topic: 'Nested loops', patterns: ['nested-loop', 'for-count'], misconceptions: ['off-by-one', 'indentation'],
        stem: `Create a program that receives an integer N and create a number triangle with a base of N as in Example below.

**Example 1**
\`\`\`
Input N: 5
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
\`\`\``,
        reps: ['python', 'pseudo', 'flow'], match: 'exact',
        solution: { python: py, pseudo: ps },
        tests: [{ stdin: ['5'] }, { stdin: ['1'], edge: 'N = 1: one row' }, { stdin: ['2'] }, { stdin: ['7'] }, { stdin: ['3'] }],
        wrong: [
          { code: 'N = int(input())\nfor i in range(1, N + 1):\n    for j in range(1, i):\n        print(str(j) + " ", end="")\n    print()', msg: '`range(1, i)` stops at i−1, so row i loses the number i. Use `range(1, i + 1)`.', tag: 'off-by-one' },
          { code: 'N = int(input())\nfor i in range(1, N + 1):\n    for j in range(1, i + 1):\n        print(str(j) + " ", end="")\n', msg: 'There is no `print()` after the inner loop, so all numbers are printed on one line. An empty `print()` (in the outer loop) moves to the next line.', tag: 'indentation' },
          { code: 'N = int(input())\nfor i in range(1, N + 1):\n    for j in range(1, N + 1):\n        print(str(j) + " ", end="")\n    print()', msg: 'The inner loop bound must depend on the row (`i`), not a fixed N: that gives a square, not a triangle.', tag: 'repeat-count' },
        ],
        plan: 'for each row i from 1 to N: for each j from 1 to i print j (without a newline); then move to the next line',
        skeleton: 'N = int(input())\nfor i in range(1, ___):\n    for j in range(1, ___):\n        print(str(j) + " ", end="")\n    ___',
        hints: ['One loop for the rows, one loop inside it for the row contents. How many numbers are on row i?', '`print(x, end="")` does not move to a new line; an empty `print()` does.'],
        syntax: ['for-range', 'print-str', 'indentation'],
        lineNotes: notes(py, [
          ['# Program', 'Header + specification.', 'program-template', '# ALGORITHM'],
          ['N = int', 'Input N.', 'input'],
          ['for i in range(1, N + 1)', 'The outer loop: rows 1..N (`N + 1` because the upper bound is excluded).', 'for-range'],
          ['for j in range(1, i + 1)', 'The inner loop: row i contains 1..i, so the bound depends on `i` (the key to the triangle).', 'for-range'],
          ['print(str(j)', '`end=""` holds back the newline; `str(j) + " "` gives the separator (the trailing space is ignored by the grader).', 'print-str'],
          ['print()', 'Aligned with `for j` (in the outer loop body): runs once per row to move to a new line. If indented deeper, it would break the line after every number.', 'indentation'],
        ]),
        pseudoNotes: notes(ps, [
          ['DECLARATIONS', 'Three integers and a string `line` to build one row.', 'declarations'],
          ['input(N)', 'Input.', 'input'],
          ['i traversal', 'The outer loop: rows.', 'for-range'],
          ['line ← ""', 'A new row starts with an empty string (pseudocode `output` always breaks the line, so the row is built first).', 'assign'],
          ['j traversal', 'The inner loop depends on i.', 'for-range', 'line ← line'],
          ['output(line)', 'Print one complete row; aligned with `j traversal` (inside the outer loop).', 'print-str'],
        ]),
        explanation: 'Two nested `for` loops because the number of iterations is known (N rows; i numbers on row i). Outer loop = rows, inner loop = columns (bound i). Example: N = 5 → 15 numbers printed.',
        refs: [{ src: MOD, page: 17 }],
      },
      {
        id: 'mod-3-2b', kind: 'open', label: 'b', decks: ['D05'], topic: 'For loop', patterns: ['for-count', 'nested-loop'],
        stem: 'Which loop is more appropriate for this question?',
        answer: '**A for loop** (nested). The number of repetitions is known from N: N rows, and row i contains i numbers. `for ... in range(...)` suits repetition with a known number of iterations.',
        keyPoints: ['Chooses for', 'Reason: the number of iterations is known (N rows, i numbers per row)'],
        rubric: [
          { score: 4, desc: 'Chooses for with the right reason (the number of iterations is known)' },
          { score: 3, desc: 'Chooses for, reason incomplete' },
          { score: 2, desc: 'Chooses for without a reason' },
          { score: 1, desc: 'Chooses while with a partly correct reason' },
          { score: 0, desc: 'No answer or completely wrong' },
        ],
        explanation: 'See the model answer.', refs: [{ src: MOD, page: 17 }],
      },
      {
        id: 'mod-3-2c', kind: 'open', label: 'c', decks: ['D05'], topic: 'For loop', patterns: ['for-count', 'while-condition'],
        stem: 'From both of the above, what can we conclude about the characteristics of each loop?',
        answer: '- **for**: used when the number of repetitions is **known** before the loop starts (from N, from the array length, etc.). The counter variable and its bounds are managed by `range`.\n- **while**: used when the number of repetitions is **unknown**, only a **condition** for when to stop. The programmer must initialise the condition variable before the loop and advance it inside the loop body; otherwise the loop never stops.\n- They can replace each other, but choosing the suitable one makes the program shorter and clearer.',
        keyPoints: ['for: the number of iterations is known', 'while: the number of iterations is unknown, depends on a stopping condition', 'while needs manual initialisation and updating of the condition'],
        rubric: [
          { score: 4, desc: 'Correctly explains the characteristics of for (known iterations) and while (iterations depend on a condition)' },
          { score: 3, desc: 'Both characteristics are mentioned, with one small inaccuracy' },
          { score: 2, desc: 'Only one of the loops is explained correctly' },
          { score: 1, desc: 'The explanation is imprecise but still contains something correct' },
          { score: 0, desc: 'No answer or completely wrong' },
        ],
        explanation: 'See the model answer.', refs: [{ src: MOD, page: 17 }],
      },
    ],
  })
}
{
  const py = r`# Program ReverseNumbers
# Reads N integers and prints them in reverse order
# DECLARATIONS
# N, i : int
# A : array [0..N-1] of int
# ALGORITHM
N = int(input())
A = [0 for i in range(N)]
for i in range(N):
    A[i] = int(input())
print("Reversed:")
for i in range(N - 1, -1, -1):
    print(str(A[i]) + " ", end="")
print()`
  const ps = r`Program ReverseNumbers
{ Reads N integers and prints them in reverse order }
DECLARATIONS
  N, i : integer
  A : array [0..N-1] of integer
  line : string
ALGORITHM
  input(N)
  i traversal [0..N-1]
    input(A[i])
  output("Reversed:")
  line ← ""
  i traversal [N-1..0]
    line ← line + str(A[i]) + " "
  output(line)`
  problems.push({
    id: 'mod-3-3', archetype: 'program', title: 'Module 3 – Reverse',
    source: mod('3.4.3 Reverse', [17, 18]), minutes: 10,
    parts: [{
      id: 'mod-3-3-1', kind: 'program', decks: ['D06'], topic: 'Array', patterns: ['array-populate', 'for-backward'], misconceptions: ['index-range', 'off-by-one'],
      stem: `Create a program that accepts N integers and rewrite the integers in reverse.

**Example**
\`\`\`
Input N: 5
5
2
1
6
3
Reversed:
3 6 1 2 5
\`\`\``,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['array'],
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['5', '5', '2', '1', '6', '3'] }, { stdin: ['1', '42'], edge: 'N = 1' }, { stdin: ['2', '-1', '7'], edge: 'negative numbers' }, { stdin: ['4', '1', '2', '3', '4'] }, { stdin: ['3', '0', '0', '9'], edge: 'zeros' }],
      wrong: [
        { code: 'N = int(input())\nA = [0 for i in range(N)]\nfor i in range(N):\n    A[i] = int(input())\nprint("Reversed:")\nfor i in range(N):\n    print(str(A[i]) + " ", end="")\nprint()', msg: 'The elements are printed from index 0 to N−1 (the original order). To reverse, traverse from N−1 down to 0: `range(N - 1, -1, -1)`.', tag: 'index-range' },
        { code: 'N = int(input())\nA = [0 for i in range(N)]\nfor i in range(N):\n    A[i] = int(input())\nprint("Reversed:")\nfor i in range(N - 1, 0, -1):\n    print(str(A[i]) + " ", end="")\nprint()', msg: 'The lower bound of `range(N - 1, 0, -1)` is excluded: the element at index 0 is lost. Use the bound −1.', tag: 'off-by-one' },
      ],
      plan: 'read N; fill array A with N numbers; print "Reversed:"; traverse the indices from N−1 down to 0 and print A[i]',
      skeleton: 'A = [0 for i in range(___)]\nfor i in range(N):\n    A[i] = int(input())\nprint("Reversed:")\nfor i in range(N - 1, ___, ___):\n    print(str(A[i]) + " ", end="")',
      hints: ['Store all the input in an array first; we only know the reversed order after everything has been read.', '`range(start, stop, step)` with step −1 descends; the stop bound is excluded.'],
      syntax: ['list-init', 'list-index', 'for-range', 'for-backward', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + declarations (array A indexed 0..N−1).', 'program-template', '# ALGORITHM'],
        ['N = int', 'The number of data values.', 'input'],
        ['A = [0', 'An array of N elements; valid indices are 0..N−1.', 'list-init'],
        ['for i in range(N)', 'Filling the array from the input.', 'for-range', 'A[i] = int'],
        ['print("Reversed:")', 'The output title as in the sample.', 'print-str'],
        ['for i in range(N - 1, -1, -1)', 'Descending from N−1 to 0: the stop bound is −1 because the `range` stop bound is excluded (with 0, index 0 would be lost).', 'for-backward'],
        ['print(str(A[i])', 'One line, separated by spaces.', 'print-str'],
        ['print()', 'A newline at the end.'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'The array A.', 'declarations'],
        ['input(N)', 'Input N.', 'input'],
        ['i traversal [0..N-1]', 'Fill the array.', 'for-range', 'input(A[i])'],
        ['output("Reversed:")', 'The title.', 'print-str'],
        ['line ← ""', 'Build one row first (pseudocode output always breaks the line).', 'assign'],
        ['i traversal [N-1..0]', 'Descending traversal.', 'for-backward', 'line ← line'],
        ['output(line)', 'Print the resulting row.', 'print-str'],
      ]),
      explanation: 'Store the N numbers in an array, then traverse from the last index (N−1) down to 0. Example: 5 2 1 6 3 → 3 6 1 2 5.',
      refs: [{ src: MOD, page: 17 }, { src: MOD, page: 18 }],
    }],
  })
}
{
  const py = r`# Program Anagram
# Checks whether B is an anagram of A (elements are numbers 1..10) using a frequency array
# DECLARATIONS
# nA, nB, i, x : int
# freqA, freqB : array [1..10] of int
# same : bool
# ALGORITHM
nA = int(input())
freqA = [0 for i in range(11)]       # indices 1..10 are used (index 0 is unused)
for i in range(nA):
    x = int(input())
    freqA[x] = freqA[x] + 1
nB = int(input())
freqB = [0 for i in range(11)]
for i in range(nB):
    x = int(input())
    freqB[x] = freqB[x] + 1
same = (nA == nB)
for i in range(1, 11):
    if (freqA[i] != freqB[i]):
        same = False
if (same):
    print("B is anagram of A")
else:
    print("B is not anagram of A")`
  const ps = r`Program Anagram
{ Checks whether B is an anagram of A (elements 1..10) using a frequency array }
DECLARATIONS
  nA, nB, i, x : integer
  freqA, freqB : array [0..10] of integer
  same : boolean
ALGORITHM
  input(nA)
  i traversal [0..10]
    freqA[i] ← 0
    freqB[i] ← 0
  i traversal [1..nA]
    input(x)
    freqA[x] ← freqA[x] + 1
  input(nB)
  i traversal [1..nB]
    input(x)
    freqB[x] ← freqB[x] + 1
  same ← (nA = nB)
  i traversal [1..10]
    if (freqA[i] ≠ freqB[i]) then
      same ← false
  if (same) then
    output("B is anagram of A")
  else
    output("B is not anagram of A")`
  const rd = (name: string, n: string) => `${n} = int(input())\n${name} = [0 for i in range(11)]\nfor i in range(${n}):\n    x = int(input())\n    ${name}[x] = ${name}[x] + 1\n`
  problems.push({
    id: 'mod-3-4', archetype: 'program', title: 'Module 3 – Anagram',
    source: mod('3.4.4 Anagram', [18]), minutes: 20,
    parts: [{
      id: 'mod-3-4-1', kind: 'program', decks: ['D06'], topic: 'Frequency array', patterns: ['array-populate', 'array-compare', 'count-if'], misconceptions: ['index-range', 'not-complete'],
      stem: `Given two arrays A and B. Create a program that will check whether B is an anagram of A or not. Assume that each element of A and B will always a whole number [1,10].

Array B is an anagram of array A if the elements of A can be rearranged into array B.

**Hint:** make a frequency array, an array whose first element is how many 1s exist in the array, second element is how many number 2s exist in the array, and so on.

**Example 1**
\`\`\`
Input number of elements in A: 3
Input element A number 1: 8
Input element A number 2: 4
Input element A number 3: 3
Input number of elements in B: 3
Input element B number 1: 4
Input element B number 2: 8
Input element B number 3: 3
B is anagram of A
\`\`\`
**Example 2**
\`\`\`
Input number of elements in A: 2
Input element A number 1: 1
Input element A number 2: 4
Input number of elements in B: 2
Input element B number 1: 1
Input element B number 2: 5
B is not anagram of A
\`\`\``,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['array'],
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['3', '8', '4', '3', '3', '4', '8', '3'] }, { stdin: ['2', '1', '4', '2', '1', '5'] }, { stdin: ['2', '1', '4', '2', '2', '3'], edge: 'same number of elements (5) but different content' },
        { stdin: ['2', '1', '2', '3', '1', '2', '2'], edge: 'different lengths' }, { stdin: ['3', '1', '1', '2', '3', '1', '2', '2'], edge: 'same set of values, different frequencies' }, { stdin: ['3', '10', '10', '1', '3', '1', '10', '10'], edge: 'boundary value 10' }, { stdin: ['1', '5', '1', '5'], edge: 'one element' }],
      wrong: [
        { code: rd('freqA', 'nA') + rd('freqB', 'nB') + 'x = 0\nfor i in range(1, 11):\n    x = x + i * freqA[i] - i * freqB[i]\nif (x == 0):\n    print("B is anagram of A")\nelse:\n    print("B is not anagram of A")', msg: 'This only compares the **sum** of the values. [1, 4] and [2, 3] have the same sum but are not anagrams. Compare the frequency of each value.', tag: 'not-complete' },
        { code: rd('freqA', 'nA') + rd('freqB', 'nB') + 'same = True\nfor i in range(1, 11):\n    if (freqA[i] > 0 and freqB[i] == 0):\n        same = False\nif (same):\n    print("B is anagram of A")\nelse:\n    print("B is not anagram of A")', msg: 'This only checks whether each value of A *appears* in B, not **how many times**. [1, 1, 2] and [1, 2, 2] are not anagrams.', tag: 'not-complete' },
      ],
      plan: 'read A, count the frequency of each value 1..10 into freqA; the same for B into freqB; B is an anagram of A if freqA[i] = freqB[i] for all i (and the number of elements is equal)',
      skeleton: 'freqA = [0 for i in range(___)]\nfor i in range(nA):\n    x = int(input())\n    freqA[___] = freqA[x] + 1\n...\nsame = True\nfor i in range(1, ___):\n    if (freqA[i] ___ freqB[i]):\n        same = ___',
      hints: ['Two arrays are anagrams if each value appears the same number of times. How do you record "how many times each value appears"?', 'Frequency array: index = value, content = number of occurrences. Values 1..10 need size 11 if index 0 is left empty.', 'Once both frequency arrays are built, compare them element by element; a single difference is enough for "not an anagram".'],
      syntax: ['input', 'list-init', 'list-index', 'for-range', 'if-else'],
      lineNotes: notes(py, [
        ['# Program', 'Header + the idea: the frequency of each value 1..10.', 'program-template', '# ALGORITHM'],
        ['nA = int', 'The number of elements of A.', 'input'],
        ['freqA = [0', 'Size 11 so that indices 1..10 are valid (index 0 is unused). Size 10 would raise an IndexError for the value 10.', 'list-init'],
        ['for i in range(nA)', 'Read each element and add one to the cell of its value: the value is used as the **index**.', 'list-index', 'freqA[x] = freqA[x] + 1'],
        ['nB = int', 'The same for B.', 'input', 'freqB[x] = freqB[x] + 1'],
        ['same = (nA == nB)', 'The result flag: initially true only if the lengths are equal (different lengths can never be an anagram).', 'assign'],
        ['for i in range(1, 11)', '`range(1, 11)` checks the values 1..10 (11 is excluded).', 'for-range', 'same = False'],
        ['if (same)', 'The final output follows the flag.', 'if-else'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'Two frequency arrays with indices 0..10.', 'declarations'],
        ['input(nA)', 'Input the number of elements of A.', 'input'],
        ['i traversal [0..10]', 'Clear the frequencies.', 'for-range', 'freqB[i] ← 0'],
        ['i traversal [1..nA]', 'Count the frequencies of A.', 'for-range', 'freqA[x] ← freqA[x] + 1'],
        ['input(nB)', 'Count the frequencies of B.', 'input', 'freqB[x] ← freqB[x] + 1'],
        ['same ←', 'Equal length as the initial condition.', 'assign'],
        ['i traversal [1..10]', 'Compare each frequency.', 'for-range', 'same ← false'],
        ['if (same)', 'The result.', 'if-else'],
      ]),
      explanation: 'A frequency array (index = value) makes the comparison simple: B is an anagram of A if all frequencies are equal. The length check makes the different-length case fail immediately. Avoid comparing the sums only.',
      refs: [{ src: MOD, page: 18 }],
    }],
  })
}
{
  const py = r`# Program PalindromeString
# Checks whether a (lowercase) string is a palindrome
# DECLARATIONS
# L, i : int
# s : string
# pal : bool
# ALGORITHM
L = int(input())
s = input()
pal = True
for i in range(L // 2):
    if (s[i] != s[L - 1 - i]):
        pal = False
if (pal):
    print(s + " is a palindrome")
else:
    print(s + " is not a palindrome")`
  const ps = r`Program PalindromeString
{ Checks whether a lowercase string is a palindrome }
DECLARATIONS
  L, i : integer
  s : string
  pal : boolean
ALGORITHM
  input(L)
  input(s)
  pal ← true
  i traversal [0..L div 2 - 1]
    if (s[i] ≠ s[L - 1 - i]) then
      pal ← false
  if (pal) then
    output(s + " is a palindrome")
  else
    output(s + " is not a palindrome")`
  problems.push({
    id: 'mod-3-5', archetype: 'program', title: 'Module 3 – Palindrome',
    source: mod('3.4.5 Palindrome', [18, 19]), minutes: 15,
    parts: [{
      id: 'mod-3-5-1', kind: 'program', decks: ['D06'], topic: 'String', patterns: ['string-processing', 'array-compare'], misconceptions: ['index-range', 'off-by-one'],
      stem: `Create a program that accepts a string and write whether a string is palindrome or not. Assume the string only consists of lowercase characters (a-z).

**Example 1**
\`\`\`
Input string length: 3
Input string: eat
eat is not a palindrome
\`\`\`
**Example 2**
\`\`\`
Input string length: 3
Input string: mom
mom is a palindrome
\`\`\`
**Example 3**
\`\`\`
Input string length: 7
Input string: racecar
racecar is a palindrome
\`\`\``,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient',
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['3', 'eat'] }, { stdin: ['3', 'mom'] }, { stdin: ['7', 'racecar'] }, { stdin: ['1', 'a'], edge: 'a single letter is always a palindrome' }, { stdin: ['4', 'abba'], edge: 'even length' }, { stdin: ['5', 'bacaa'], edge: 'the first pair differs, the second pair is equal' }, { stdin: ['2', 'ab'] }, { stdin: ['4', 'abca'], edge: 'equal ends but a different middle part' }],
      wrong: [
        { code: 'L = int(input())\ns = input()\npal = True\nfor i in range(L // 2):\n    if (s[i] == s[L - 1 - i]):\n        pal = True\n    else:\n        pal = False\nif (pal):\n    print(s + " is a palindrome")\nelse:\n    print(s + " is not a palindrome")', msg: 'The flag `pal` is overwritten at every pair, so only the **last** pair decides. The correct pattern: start with `True`, and only change it to `False` when a mismatch is found (never set it back to True).', tag: 'constraint-missed' },
        { code: 'L = int(input())\ns = input()\nif (s[0] == s[L - 1]):\n    print(s + " is a palindrome")\nelse:\n    print(s + " is not a palindrome")', msg: 'Only the first and last letters are compared. "abca" has equal ends but is not a palindrome: **all** pairs (i, L−1−i) must match.', tag: 'not-complete' },
      ],
      plan: 'pal ← true; for i from 0 to L div 2 − 1: if s[i] ≠ s[L−1−i] then pal ← false; print the result',
      skeleton: 'pal = ___\nfor i in range(L // ___):\n    if (s[i] ___ s[L - 1 - ___]):\n        pal = ___\nif (pal):\n    print(s + " is a palindrome")',
      hints: ['Palindrome: the i-th character from the front equals the i-th character from the back for every i.', 'Checking the first half of the string is enough. The i-th character from the back is at index `L - 1 - i`.', 'Use the flag pattern: start with `True`; one mismatching pair makes it `False` forever.'],
      syntax: ['input', 'list-index', 'for-range', 'if-else', 'relational-logical', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + specification.', 'program-template', '# ALGORITHM'],
        ['L = int', 'The length is given; `s` is read as a string (no `int`).', 'input', 's = input()'],
        ['pal = True', 'The initial guess: a palindrome. The flag will only be changed to False.', 'assign'],
        ['for i in range(L // 2)', 'Only the first half needs to be compared with its partner at the back; the middle (for odd L) is not needed.', 'for-range'],
        ['if (s[i] != s[L - 1 - i])', 'A string can be indexed like an array. The partner of i is `L - 1 - i` (the last index = L − 1).', 'list-index', 'pal = False'],
        ['if (pal)', 'The output follows the flag; `s + "..."` is safe because s is a string.', 'if-else'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'A boolean flag and a string.', 'declarations'],
        ['input(L)', 'Input.', 'input', 'input(s)'],
        ['pal ← true', 'The initial guess.', 'assign'],
        ['i traversal', 'The first half.', 'for-range'],
        ['if (s[i]', 'Compare with the partner.', 'if', 'pal ← false'],
        ['if (pal)', 'The result.', 'if-else'],
      ]),
      explanation: 'A palindrome if s[i] = s[L−1−i] for all i < L/2. Use a flag that starts True and is changed to False at the first mismatch. Example: "racecar": r-r, a-a, c-c match → palindrome.',
      refs: [{ src: MOD, page: 18 }, { src: MOD, page: 19 }],
    }],
  })
}
{
  const py = r`# Program LegoCubes
# Builds the largest possible cube from L Lego pieces, repeats with the rest. No root function.
# DECLARATIONS
# L, c, count : int
# ALGORITHM
L = int(input())
count = 0
while (L > 0):
    c = 1
    while ((c + 1) * (c + 1) * (c + 1) <= L):    # find the largest cube side
        c = c + 1
    L = L - c * c * c
    count = count + 1
print("Mr. Kil can make " + str(count) + " cubes.")`
  const ps = r`Program LegoCubes
{ Largest cube from L Lego pieces, repeat with the rest. No root function }
DECLARATIONS
  L, c, count : integer
ALGORITHM
  input(L)
  count ← 0
  while (L > 0) do
    c ← 1
    while ((c + 1) * (c + 1) * (c + 1) ≤ L) do
      c ← c + 1
    L ← L - c * c * c
    count ← count + 1
  output("Mr. Kil can make " + str(count) + " cubes.")`
  problems.push({
    id: 'mod-3-6', archetype: 'program', title: 'Module 3 – Practice Problem 1 (2021): Lego cubes',
    source: mod('3.4.6 Practice Problem 1 Year 2021', [19]), minutes: 20,
    parts: [{
      id: 'mod-3-6-1', kind: 'program', decks: ['D05'], topic: 'Nested loops (while)', patterns: ['while-condition', 'nested-loop', 'accumulate-sum'], misconceptions: ['off-by-one', 'while-no-next', 'init-in-loop'],
      stem: `Mr. Kil has several Lego pieces with dimensions 1 × 1 × 1. Mr. Kil is tasked with making as few cubes as possible with the Lego pieces he has. The method is to make the largest cube possible with the available Lego, then with the remaining Lego, repeat the same process until there are no more Lego pieces left.

Determine how many cubes Mr. Kil can make.

**Note:** It is prohibited to use built-in functions to find the square root of a number. The use of built-in functions to find the square root of a number will result in a score of 0 for this problem.

**Hint:** Use a loop to find the nearest cubic value to the number of Lego pieces at any given time.

**Example 1**
\`\`\`
Enter the number of Lego pieces: 36
Mr. Kil can make 3 cubes.
\`\`\`
Explanation for Example 1: 36 = 27 + 8 + 1

**Example 2**
\`\`\`
Enter the number of Lego pieces: 11
Mr. Kil can make 4 cubes.
\`\`\`
Explanation for Example 2: 11 = 8 + 1 + 1 + 1`,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['while'],
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['36'] }, { stdin: ['11'] }, { stdin: ['28'], edge: '27 + 1: the exact cube 27 must be used' }, { stdin: ['2'], edge: 'only the 1×1×1 cube' }, { stdin: ['100'] }, { stdin: ['999'], edge: 'several large cubes' }, { stdin: ['7'], edge: '7 small cubes' }],
      wrong: [
        { code: 'L = int(input())\ncount = 0\nwhile (L > 0):\n    c = 1\n    while ((c + 1) * (c + 1) * (c + 1) < L):\n        c = c + 1\n    L = L - c * c * c\n    count = count + 1\nprint("Mr. Kil can make " + str(count) + " cubes.")', msg: 'A cube exactly equal to the remaining Lego pieces may also be built: use `<=` in the comparison `(c+1)^3 <= L`, not `<`.', tag: 'off-by-one' },
        { code: 'L = int(input())\ncount = 0\nc = 1\nwhile (L > 0):\n    while ((c + 1) * (c + 1) * (c + 1) <= L):\n        c = c + 1\n    L = L - c * c * c\n    count = count + 1\nprint("Mr. Kil can make " + str(count) + " cubes.")', msg: '`c = 1` must be **inside** the outer loop: every round searches for the largest cube from the new remaining pieces. If it is outside, `c` does not shrink when the remaining pieces shrink, so L can become negative.', tag: 'init-in-loop' },
      ],
      plan: 'count ← 0; while L > 0: c ← 1; while (c+1)³ ≤ L: c ← c+1; L ← L − c³; count ← count+1; print count',
      skeleton: 'count = 0\nwhile (L ___ 0):\n    c = ___\n    while ((c + 1) * (c + 1) * (c + 1) ___ L):\n        c = c + 1\n    L = L - ___\n    count = count + 1',
      hints: ['Two loops: the outer loop builds one cube per round until the Lego pieces run out; the inner loop finds the largest cube side that still fits.', 'Largest side c: increase c while the next cube (c+1)³ is still ≤ the number of pieces.', 'Do not forget to subtract c³ from the pieces and count the cube.'],
      syntax: ['input', 'while', 'operators', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + the ban on the root function (value 0 if used).', 'program-template', '# ALGORITHM'],
        ['L = int', 'The number of Lego pieces.', 'input'],
        ['count = 0', 'The cube counter, outside all loops.', 'assign'],
        ['while (L > 0)', 'The outer loop: one cube per iteration until the pieces run out. It terminates because L always decreases (by at least 1).', 'while'],
        ['c = 1', 'The cube side is reset every round (inside the outer loop), because the remaining L changes.', 'assign'],
        ['while ((c + 1)', 'The inner loop: find the largest side. An exact fit (`==`) is allowed, so `<=`.', 'while', 'c = c + 1'],
        ['L = L - c * c * c', 'The used pieces are subtracted; the rest is processed in the next round.', 'operators'],
        ['count = count + 1', 'One cube is done.'],
        ['print(', '`str(count)` for `+`.', 'print-str'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'Integers.', 'declarations'],
        ['input(L)', 'Input.', 'input'],
        ['count ← 0', 'The counter.', 'assign'],
        ['while (L > 0)', 'The outer loop.', 'while'],
        ['c ← 1', 'Reset the side.', 'assign'],
        ['while ((c + 1)', 'The inner loop finds the side.', 'while', 'c ← c + 1'],
        ['L ← L - c', 'Subtract the pieces.', 'operators', 'count ← count + 1'],
        ['output(', 'Output.', 'print-str'],
      ]),
      explanation: 'A greedy method: each round find the largest side c with c³ ≤ L without a root (inner loop), subtract c³, count one cube. Example 36: 27 → remainder 9 → 8 → remainder 1 → 1: 3 cubes. Note: a result of 1 cube is printed as "1 cubes" in this solution; the handout does not show a singular form.',
      refs: [{ src: MOD, page: 19 }],
    }],
  })
}
{
  const py = r`# Program HeartShape
# Draws a heart with '*' for -30 <= x <= 30 and -15 <= y <= 15 based on
# (x/2)^2 + (5y/4 - 2*sqrt(|x|))^2 <= 120
# DECLARATIONS
# x, y : int
# line : string
# ALGORITHM
for y in range(15, -16, -1):             # from the top (y = 15) to the bottom (y = -15)
    line = ""
    for x in range(-30, 31):
        if ((x / 2) ** 2 + (5 * y / 4 - 2 * abs(x) ** 0.5) ** 2 <= 120):
            line = line + "*"
        else:
            line = line + " "
    print(line)`
  const ps = r`Program HeartShape
{ Heart of '*' for -30 ≤ x ≤ 30, -15 ≤ y ≤ 15 based on (x/2)^2 + (5y/4 - 2*sqrt(|x|))^2 ≤ 120 }
DECLARATIONS
  x, y : integer
  line : string
ALGORITHM
  y traversal [15..-15]
    line ← ""
    x traversal [-30..30]
      if ((x / 2) ** 2 + (5 * y / 4 - 2 * abs(x) ** 0.5) ** 2 ≤ 120) then
        line ← line + "*"
      else
        line ← line + " "
    output(line)`
  const judge = r`def judge(stdin, out, ref_out):
    import re
    def norm(s):
        rows = [r.rstrip() for r in s.split('\n')]
        while rows and not rows[0].strip():
            rows.pop(0)
        while rows and not rows[-1].strip():
            rows.pop()
        return rows
    g, ref = norm(out), norm(ref_out)
    if len(g) < 12:
        return 'Too few rows: the heart shape needs y from 15 to -15 (about 20 rows or more).'
    if any(re.search(r'[^* ]', r) for r in g):
        return 'Only the characters * and space may be printed.'
    stars = sum(r.count('*') for r in g)
    rstars = sum(r.count('*') for r in ref)
    if abs(stars - rstars) > 0.1 * rstars:
        return 'The number of stars (' + str(stars) + ') differs a lot from the expected (~' + str(rstars) + '): check the inequality, the x range and the y range.'
    first = len(re.findall(r'\*+', g[0]))
    last = len(re.findall(r'\*+', g[-1]))
    if first != 2:
        return 'The top row must contain two bumps (the two upper arcs of the heart). The drawing may be upside down or tilted.'
    if last != 1 or g[-1].count('*') > 8:
        return 'The bottom row must be a small pointed tip (one short bump). The drawing may be upside down or tilted.'
    widest = max(r.count('*') for r in g)
    if widest < 0.8 * max(r.count('*') for r in ref):
        return 'The drawing is too narrow compared to the expected heart.'
    centers = [ (r.index('*') + r.rindex('*')) / 2 for r in g[len(g)//2:] if '*' in r ]
    if max(centers) - min(centers) > 3:
        return 'The heart must be left-right symmetric (not tilted).'
    return None`
  const loop = (ys: string, cond: string) => `for y in ${ys}:\n    line = ""\n    for x in range(-30, 31):\n        if (${cond}):\n            line = line + "*"\n        else:\n            line = line + " "\n    print(line)`
  problems.push({
    id: 'mod-3-7', archetype: 'program', title: 'Module 3 – Practice Problem 2 (2021): Heart shape',
    source: mod('3.4.7 Practice Problem 2 Year 2021', [19, 20]), minutes: 20,
    parts: [{
      id: 'mod-3-7-1', kind: 'program', decks: ['D05'], topic: 'Nested loops (patterns)', patterns: ['nested-loop', 'if-else'], misconceptions: ['indentation', 'repeat-count'],
      stem: `Given a two-variable inequality as follows.

(x/2)² + (5y/4 − 2·√|x|)² ≤ 120

In this problem, Mr. Dip asks you to implement a heart shape using \`*\` with the help of the given inequality on the range −30 ≤ x ≤ 30 and −15 ≤ y ≤ 15. Your answer is considered correct if the heart shape is clearly visible and not inverted or slanted.

**Notes:** Use the abs(x) function to turn the value of x into a positive value.

**Example 1** (the page shows the figure below; see the page image)
\`\`\`
     **************          **************
   ******************      ******************
  ********************* *********************
 ********************** **********************
 *******************************************
 *******************************************
 *******************************************
 *******************************************
  *****************************************
   ***************************************
    *************************************
      *********************************
       *******************************
         ***************************
           ***********************
             *******************
               ***************
                   *********
                     *****
                      ***
\`\`\``,
      figures: [{ src: MOD, page: 20 }],
      reps: ['python', 'pseudo', 'flow'], match: 'judge', judge,
      solution: { python: py, pseudo: ps },
      tests: [{ edge: 'no input: a single drawing output' }],
      wrong: [
        { code: loop('range(-15, 16)', '(x / 2) ** 2 + (5 * y / 4 - 2 * abs(x) ** 0.5) ** 2 <= 120'), msg: 'The drawing is upside down: the first line is printed for y = −15. Traverse y from 15 down to −15 (the screen y-axis points down).', tag: 'repeat-count' },
        { code: loop('range(15, -16, -1)', '(x / 2) ** 2 + (5 * y / 4 - 2 * x ** 0.5 if x >= 0 else 0) ** 2 <= 120'), msg: 'The left side (negative x) is not computed correctly, so the shape is tilted/asymmetric. Use `abs(x)` so both arcs of the heart are symmetric.', tag: 'constraint-missed' },
      ],
      plan: 'for y from 15 down to −15: line ← ""; for x from −30 to 30: if (x/2)² + (5y/4 − 2√|x|)² ≤ 120 append "*" otherwise " "; print line',
      skeleton: 'for y in range(___, ___, -1):\n    line = ""\n    for x in range(___, ___):\n        if ((x / 2) ** 2 + (5 * y / 4 - 2 * abs(x) ** 0.5) ** 2 <= ___):\n            line = line + "*"\n        else:\n            line = line + " "\n    print(line)',
      hints: ['The picture is printed row by row from top to bottom: the outer loop for y (descending), the inner loop for x. Each point (x, y) is tested with the inequality.', 'A point that satisfies it prints `*`, one that does not prints a space. Build a complete row first before `print`.', '√|x| can be written `abs(x) ** 0.5`. Watch the inclusive bounds −30..30 and −15..15.'],
      syntax: ['for-range', 'for-backward', 'if-else', 'operators', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + the inequality.', 'program-template', '# ALGORITHM'],
        ['for y in range(15, -16, -1)', 'The top row = the largest y, so y descends from 15 to −15 (bound −16 because the stop bound is excluded).', 'for-backward'],
        ['line = ""', 'One row is built as a string first and then printed at once.', 'assign'],
        ['for x in range(-30, 31)', 'x from −30 to 30 inclusive (`31`).', 'for-range'],
        ['if ((x / 2)', '`/` gives a float (wanted here). `abs(x) ** 0.5` is √|x|: left-right symmetric.', 'if-else', 'line = line + " "'],
        ['print(line)', 'Aligned with `for x`: runs once per row.', 'indentation'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'Two counters and one row string.', 'declarations'],
        ['y traversal [15..-15]', 'Descending from 15 to −15.', 'for-backward'],
        ['line ← ""', 'A new row.', 'assign'],
        ['x traversal', 'x from −30 to 30.', 'for-range'],
        ['if ((x / 2)', 'Test the heart inequality.', 'if-else', 'line ← line + " "'],
        ['output(line)', 'Print one row.', 'print-str'],
      ]),
      explanation: 'The picture is made with two nested loops (y descending outside, x inside) and the inequality as the condition. The reference output uses the whole range −30..30 × −15..15; its shape is the same as the handout example (line widths differ slightly because the handout probably uses a slightly different scale). The site checker judges the shape (two bumps on top, a pointed tip at the bottom, symmetric), not character by character.',
      refs: [{ src: MOD, page: 19 }, { src: MOD, page: 20 }],
    }],
  })
}
{
  const py = r`# Program PrimeFactors
# Prints the prime factors of N (N > 1), ascending, without repetition
# DECLARATIONS
# N, d, count : int
# result : string
# ALGORITHM
N = int(input())
d = 2
count = 0
result = ""
while (N > 1):
    if (N % d == 0):
        if (count > 0):
            result = result + ", "
        result = result + str(d)
        count = count + 1
        while (N % d == 0):        # remove all factors d
            N = N // d
    d = d + 1
print("The prime factors are " + result + ".")`
  const ps = r`Program PrimeFactors
{ Prime factors of N (N > 1), ascending, without repetition }
DECLARATIONS
  N, d, count : integer
  result : string
ALGORITHM
  input(N)
  d ← 2
  count ← 0
  result ← ""
  while (N > 1) do
    if (N mod d = 0) then
      if (count > 0) then
        result ← result + ", "
      result ← result + str(d)
      count ← count + 1
      while (N mod d = 0) do
        N ← N div d
    d ← d + 1
  output("The prime factors are " + result + ".")`
  problems.push({
    id: 'mod-3-8', archetype: 'program', title: 'Module 3 – Practice Problem 3 (2021): Prime factors',
    source: mod('3.4.8 Practice Problem 3 Year 2021', [20]), minutes: 20,
    parts: [{
      id: 'mod-3-8-1', kind: 'program', decks: ['D05'], topic: 'Nested loops (while)', patterns: ['while-condition', 'nested-loop', 'string-processing'], misconceptions: ['while-no-next', 'off-by-one'],
      stem: `Create a program that accepts a natural number N > 1 and outputs its prime factors. The result must be sorted from the smallest to the largest prime factors.

**Example 1**
\`\`\`
Enter N: 110
The prime factors are 2, 5, 11.
\`\`\`
**Example 2**
\`\`\`
Enter N: 160
The prime factors are 2, 5.
\`\`\``,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient',
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['110'] }, { stdin: ['160'], edge: 'repeated factor (2^5): printed once' }, { stdin: ['2'], edge: 'N is the smallest prime' }, { stdin: ['13'], edge: 'N is prime' }, { stdin: ['36'] }, { stdin: ['1001'], edge: '7·11·13' }, { stdin: ['9973'], edge: 'large prime' }],
      wrong: [
        { code: 'N = int(input())\nd = 2\nresult = ""\nwhile (N > 1):\n    if (N % d == 0):\n        result = result + str(d) + ", "\n        N = N // d\n    else:\n        d = d + 1\nprint("The prime factors are " + result + ".")', msg: 'A repeated factor is printed many times (160 → 2, 2, 2, 2, 2, 5). The problem asks for **distinct** prime factors: remove all multiples of d before moving on (`while N % d == 0`).', tag: 'constraint-missed' },
        { code: 'N = int(input())\nresult = ""\nfor d in range(2, 11):\n    if (N % d == 0):\n        result = result + str(d) + ", "\nprint("The prime factors are " + result + ".")', msg: 'Limiting d to 10 and not filtering non-primes (e.g. 4, 6, 10) gives wrong results. Remove the factor d from N repeatedly so that only primes ever satisfy `N % d == 0`.', tag: 'not-complete' },
      ],
      plan: 'd ← 2; while N > 1: if d divides N: record d, then divide N by d repeatedly while it divides; d ← d+1; print the list',
      skeleton: 'd = ___\nwhile (N > ___):\n    if (N % d == 0):\n        # record d (the comma separator only between elements)\n        while (N % d == ___):\n            N = N // d\n    d = d + ___',
      hints: ['Try divisors starting from 2, increasing one by one. The first divisor that divides N is always prime (why?).', 'After finding a factor d, remove all d from N with a small loop; that way d does not appear again and no non-prime factor gets through.', 'The main loop stops when N becomes 1. Note that commas go only between elements.'],
      syntax: ['input', 'while', 'if', 'operators', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + specification.', 'program-template', '# ALGORITHM'],
        ['N = int', 'Input N > 1.', 'input'],
        ['d = 2', 'The divisor candidate starts at 2 (the smallest prime).', 'assign', 'result = ""'],
        ['while (N > 1)', 'N decreases every time a factor is removed; done when it is used up (1).', 'while'],
        ['if (N % d == 0)', 'd divides N → d is a prime factor (all smaller factors have already been removed).', 'if'],
        ['if (count > 0)', 'A comma only before the second and later elements.', 'if', 'count = count + 1'],
        ['while (N % d == 0)', 'Remove **all** powers of d from N so d is recorded only once. The body advances N, so the loop stops.', 'while', 'N = N // d'],
        ['d = d + 1', 'Move to the next candidate; aligned with the `if`, so it runs every iteration (trap: the indentation position).', 'indentation'],
        ['print(', 'The period at the end follows the sample ("... 11.").', 'print-str'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'Three integers and the result string.', 'declarations'],
        ['input(N)', 'Input.', 'input'],
        ['d ← 2', 'Initialisation.', 'assign', 'result ← ""'],
        ['while (N > 1)', 'The main loop.', 'while'],
        ['if (N mod d = 0)', 'A factor is found.', 'if', 'count ← count + 1'],
        ['while (N mod d = 0)', 'Remove all powers of d.', 'while', 'N ← N div d'],
        ['d ← d + 1', 'The next candidate.', 'assign'],
        ['output(', 'Output.', 'print-str'],
      ]),
      explanation: 'Factorisation with an ascending divisor: every divisor d that divides N is prime because the smaller factors have already been removed. Remove all powers of d, record it once. 160 = 2⁵·5 → "2, 5". Example 110 → "2, 5, 11".',
      refs: [{ src: MOD, page: 20 }],
    }],
  })
}
{
  const py = r`# Program EvenSumSublists
# Counts the sublists (consecutive indices) with an even sum
# DECLARATIONS
# N, i, j, s, count : int
# A : array [0..N-1] of int
# ALGORITHM
N = int(input())
A = [0 for i in range(N)]
for i in range(N):
    A[i] = int(input())
count = 0
for i in range(N):
    s = 0                       # sum of the sublist starting at i
    for j in range(i, N):
        s = s + A[j]
        if (s % 2 == 0):
            count = count + 1
print("There are " + str(count) + " sublists with an even sum.")`
  const ps = r`Program EvenSumSublists
{ Number of sublists (consecutive indices) with an even sum }
DECLARATIONS
  N, i, j, s, count : integer
  A : array [0..N-1] of integer
ALGORITHM
  input(N)
  i traversal [0..N-1]
    input(A[i])
  count ← 0
  i traversal [0..N-1]
    s ← 0
    j traversal [i..N-1]
      s ← s + A[j]
      if (s mod 2 = 0) then
        count ← count + 1
  output("There are " + str(count) + " sublists with an even sum.")`
  problems.push({
    id: 'mod-3-9', archetype: 'program', title: 'Module 3 – Practice Problem 1 (2022): Even-sum sublists',
    source: mod('3.4.9 Practice Problem 1 Year 2022', [20, 21]), minutes: 20,
    parts: [{
      id: 'mod-3-9-1', kind: 'program', decks: ['D06'], topic: 'Sublist', patterns: ['nested-loop', 'count-if', 'accumulate-sum', 'array-populate'], misconceptions: ['init-in-loop', 'index-range'],
      stem: `Mr. Leo is given a list consisting of N elements. Help Mr. Leo to determine the number of sublist (a sublist is the result of selecting several consecutive indices in the list) that has an even sum.

**Test Case 1**
\`\`\`
Enter the value of N: 5
Enter the number for index 1: 1
Enter the number for index 2: 2
Enter the number for index 3: 3
Enter the number for index 4: 4
Enter the number for index 5: 5
There are 6 sublists with an even sum.
\`\`\`
Explanation for Example 1: The sublists with an even sum are [1, 2, 3], [1, 2, 3, 4], [2], [2, 3, 4, 5], [3, 4, 5], and [4].`,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['array'],
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['5', '1', '2', '3', '4', '5'] }, { stdin: ['2', '2', '2'], edge: 'all even: 3 sublists' }, { stdin: ['1', '1'], edge: 'N = 1, odd: 0 sublists' }, { stdin: ['4', '1', '1', '1', '1'], edge: 'all odd' }, { stdin: ['3', '-1', '2', '-3'], edge: 'negative numbers' }, { stdin: ['2', '0', '0'], edge: 'zeros' }],
      wrong: [
        { code: 'N = int(input())\nA = [0 for i in range(N)]\nfor i in range(N):\n    A[i] = int(input())\ncount = 0\nfor i in range(N):\n    for j in range(i, N):\n        s = 0\n        s = s + A[j]\n        if (s % 2 == 0):\n            count = count + 1\nprint("There are " + str(count) + " sublists with an even sum.")', msg: '`s = 0` is inside the `j` loop, so the sum is reset at every step and only single elements are counted. Initialise `s` once per sublist start (between the two loops).', tag: 'init-in-loop' },
        { code: 'N = int(input())\nA = [0 for i in range(N)]\nfor i in range(N):\n    A[i] = int(input())\ncount = 0\nfor i in range(N):\n    s = 0\n    for j in range(i + 1, N):\n        s = s + A[j]\n        if (s % 2 == 0):\n            count = count + 1\nprint("There are " + str(count) + " sublists with an even sum.")', msg: 'The inner loop starts from `i + 1`, so the sublist starting at i (including A[i]) is never counted. Start from `j = i`.', tag: 'off-by-one' },
      ],
      plan: 'read A; count ← 0; for each start i: s ← 0; for each end j from i: s ← s + A[j]; if s is even count ← count+1; print count',
      skeleton: 'count = 0\nfor i in range(N):\n    s = ___\n    for j in range(___, N):\n        s = s + A[___]\n        if (s % ___ == 0):\n            count = count + 1',
      hints: ['A sublist is determined by a start index i and an end index j (i ≤ j). Nested loops traverse all pairs.', 'Add A[j] to a running sum instead of recomputing from the start. When must the running sum go back to 0?', 'Even: `s % 2 == 0` (also works for negatives in Python).'],
      syntax: ['input', 'list-init', 'list-index', 'for-range', 'if', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + specification.', 'program-template', '# ALGORITHM'],
        ['N = int', 'The number of elements.', 'input'],
        ['A = [0', 'An array of N elements.', 'list-init', 'A[i] = int'],
        ['count = 0', 'The counter outside the loops.', 'assign'],
        ['for i in range(N)', 'The outer loop: the start index of the sublist.', 'for-range'],
        ['s = 0', 'The running sum is reset for **each new start i**, outside the inner loop.', 'assign'],
        ['for j in range(i, N)', 'The end index j ≥ i (starting at `i` so 1-element sublists count). `N` as the upper bound because it is excluded.', 'for-range'],
        ['s = s + A[j]', 'The sum of the sublist [i..j] is updated incrementally.', 'list-index'],
        ['if (s % 2 == 0)', 'This sublist has an even sum → count it.', 'if', 'count = count + 1'],
        ['print(', 'Output.', 'print-str'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'The array A.', 'declarations'],
        ['input(N)', 'Input.', 'input'],
        ['i traversal [0..N-1]', 'Fill the array.', 'for-range', 'input(A[i])'],
        ['count ← 0', 'The counter.', 'assign'],
        ['i traversal [0..N-1]', 'The start index of the sublist.', 'for-range'],
        ['s ← 0', 'Reset the sum per start.', 'assign'],
        ['j traversal [i..N-1]', 'The end index j ≥ i.', 'for-range'],
        ['s ← s + A[j]', 'Incremental sum.', 'assign'],
        ['if (s mod 2', 'Even → count.', 'if', 'count ← count + 1'],
        ['output(', 'Output.', 'print-str'],
      ]),
      explanation: 'All sublists = all (start, end) pairs. The sum is computed incrementally and reset per start. Example 1: 6 sublists have an even sum. Note: the handout words the example explanation with "an even number of elements" (a typo); what is meant is an even sum.',
      refs: [{ src: MOD, page: 20 }, { src: MOD, page: 21 }],
    }],
  })
}
{
  const py = r`# Program SortedGroups
# Counts the sorted groups (ranges of consecutive values without gaps) from distinct data 1..1000
# DECLARATIONS
# N, i, x, groups : int
# present : array [0..1001] of int
# ALGORITHM
N = int(input())
present = [0 for i in range(1002)]     # present[v] = 1 if the value v exists
for i in range(N):
    x = int(input())
    present[x] = 1
groups = 0
for i in range(1, 1001):
    if (present[i] == 1 and present[i - 1] == 0):     # i starts a new group
        groups = groups + 1
print("The number of sorted number groups is " + str(groups) + ".")`
  const ps = r`Program SortedGroups
{ Number of sorted groups (ranges of consecutive values without gaps) from distinct data 1..1000 }
DECLARATIONS
  N, i, x, groups : integer
  present : array [0..1001] of integer
ALGORITHM
  input(N)
  i traversal [0..1001]
    present[i] ← 0
  i traversal [1..N]
    input(x)
    present[x] ← 1
  groups ← 0
  i traversal [1..1000]
    if (present[i] = 1 and present[i - 1] = 0) then
      groups ← groups + 1
  output("The number of sorted number groups is " + str(groups) + ".")`
  problems.push({
    id: 'mod-3-10', archetype: 'program', title: 'Module 3 – Practice Problem 2 (2022): Sorted number groups',
    source: mod('3.4.10 Practice Problem 2 Year 2022', [21]), minutes: 25,
    parts: [{
      id: 'mod-3-10-1', kind: 'program', decks: ['D06'], topic: 'Frequency array', patterns: ['array-populate', 'count-if', 'array-compare'], misconceptions: ['index-range', 'constraint-missed'],
      stem: `Mr. Kil has an unsorted collection of numbers, determine how many sorted number groups can be formed from the array. Data is always distinct (different values).

The input data is in the range of 1-1000.

**Example 1**
\`\`\`
Enter the number of data: 5
Enter data for index 1: 2
Enter data for index 2: 1
Enter data for index 3: 3
Enter data for index 4: 6
Enter data for index 5: 5
The number of sorted number groups is 2.
\`\`\`
Explanation for Example 1: Ordered groups: [1,3] and [5,6]

**Example 2**
\`\`\`
Enter the number of data: 6
Enter data for index 1: 7
Enter data for index 2: 12
Enter data for index 3: 35
Enter data for index 4: 6
Enter data for index 5: 10
Enter data for index 6: 9
The number of sorted number groups is 4.
\`\`\`
Explanation for Example 2: Ordered groups: [6,7], [9,10], [12,12], [35,35]`,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['array'],
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['5', '2', '1', '3', '6', '5'] }, { stdin: ['6', '7', '12', '35', '6', '10', '9'] }, { stdin: ['1', '500'], edge: 'N = 1' }, { stdin: ['5', '5', '4', '3', '2', '1'], edge: 'input order descending but values consecutive: 1 group' }, { stdin: ['2', '1000', '1'], edge: 'boundary values 1 and 1000' }, { stdin: ['3', '10', '30', '20'], edge: 'all separate (gaps)' }],
      wrong: [
        { code: 'N = int(input())\nA = [0 for i in range(N)]\nfor i in range(N):\n    A[i] = int(input())\ngroups = 1\nfor i in range(1, N):\n    if (A[i] < A[i - 1]):\n        groups = groups + 1\nprint("The number of sorted number groups is " + str(groups) + ".")', msg: 'The problem counts groups of consecutive **values** (no gaps), not the number of decreases in the input order. Example 1 gives [1,3] and [5,6] even though the input is 2, 1, 3, 6, 5.', tag: 'constraint-missed' },
        { code: 'N = int(input())\npresent = [0 for i in range(1002)]\nfor i in range(N):\n    x = int(input())\n    present[x] = 1\ngroups = 0\nfor i in range(1, 1001):\n    if (present[i] == 1):\n        groups = groups + 1\nprint("The number of sorted number groups is " + str(groups) + ".")', msg: 'This counts the number of **values**, not groups. Count only the values that are the *start* of a group: it exists, and the previous value does not.', tag: 'not-complete' },
      ],
      plan: 'mark the existing values in the array present[1..1000]; count the values v with present[v] = 1 and present[v−1] = 0 (the start of a group); print',
      skeleton: 'present = [0 for i in range(___)]\nfor i in range(N):\n    x = int(input())\n    present[___] = 1\ngroups = 0\nfor i in range(1, ___):\n    if (present[i] == 1 and present[___] == 0):\n        groups = groups + 1',
      hints: ['The handout does not define "group" explicitly: look at Example 1 (2,1,3,6,5 → [1,3] and [5,6]) and Example 2. What binds 1, 2, 3 together?', 'One group = a range of consecutive values without gaps (1,2,3 | 5,6). The value range 1..1000 invites a marker array (index = value).', 'Count the group starts: a value that exists while the value right below it does not.'],
      syntax: ['input', 'list-init', 'list-index', 'for-range', 'if', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + the interpretation of "group" (inferred from both examples).', 'program-template', '# ALGORITHM'],
        ['N = int', 'The number of data values.', 'input'],
        ['present = [0', 'A marker array of size 1002: indices 0..1001. Index 0 acts as a guard for `present[i - 1]` when i = 1.', 'list-init'],
        ['for i in range(N)', 'Read each data value and mark it (the value is used as the index).', 'list-index', 'present[x] = 1'],
        ['groups = 0', 'The group counter.', 'assign'],
        ['for i in range(1, 1001)', 'Check all possible values 1..1000 (`1001` so that 1000 is included).', 'for-range'],
        ['if (present[i] == 1', 'The value i exists **and** i − 1 does not → i starts a new group. Counting only the starts prevents counting one group per value.', 'if', 'groups = groups + 1'],
        ['print(', 'Output.', 'print-str'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'The marker array.', 'declarations'],
        ['input(N)', 'Input.', 'input'],
        ['i traversal [0..1001]', 'Clear the markers.', 'for-range', 'present[i] ← 0'],
        ['i traversal [1..N]', 'Mark each value.', 'for-range', 'present[x] ← 1'],
        ['groups ← 0', 'The counter.', 'assign'],
        ['i traversal [1..1000]', 'Traverse the values 1..1000.', 'for-range'],
        ['if (present[i]', 'The start of a group.', 'if', 'groups ← groups + 1'],
        ['output(', 'Output.', 'print-str'],
      ]),
      explanation: 'From both examples, a group = a range of consecutive values without gaps ([1,3] means 1, 2, 3). With a marker array (values 1..1000), the number of groups = the number of values v that exist while v−1 does not. Example 1: starts 1 and 5 → 2; Example 2: starts 6, 9, 12, 35 → 4. (This is an interpretation from the examples; the handout does not state the definition.)',
      refs: [{ src: MOD, page: 21 }],
    }],
  })
}
/* ====================================================== Python module – Module 4 exercises ====================================================== */
{
  const py = r`# Program QuadraticValues
# Prints f(A), f(A+1), ..., f(B) with f(x) = x^2 - 2x + 5
# DECLARATIONS
# A, B, i : int
# Function f (x : int) -> int
# ALGORITHM
def f(x):
    # returns x^2 - 2x + 5
    return x * x - 2 * x + 5

# MAIN PROGRAM
A = int(input())
B = int(input())
for i in range(A, B + 1):
    print("f(" + str(i) + ") = " + str(f(i)))`
  const ps = r`Program QuadraticValues
{ Prints f(A), f(A+1), ..., f(B) with f(x) = x^2 - 2x + 5 }
DECLARATIONS
  A, B, i : integer
  function f (x : integer) → integer

function f (x : integer) → integer
  { x^2 - 2x + 5 }
  ALGORITHM
    → x * x - 2 * x + 5

ALGORITHM
  input(A)
  input(B)
  i traversal [A..B]
    output("f(" + str(i) + ") = " + str(f(i)))`
  problems.push({
    id: 'mod-4-1', archetype: 'program', title: 'Module 4 – Quadratic Function',
    source: mod('4.3.1 Quadratic Function', [24]), minutes: 10,
    parts: [{
      id: 'mod-4-1-1', kind: 'program', decks: ['D10'], topic: 'Function', patterns: ['function-def-call', 'for-count'], misconceptions: ['return-vs-print', 'off-by-one'],
      stem: `You have a function defined as:

f(x) = x² − 2x + 5

Create a program that will accept A and B, then writes f(A), f(A + 1), …, f(B)!

**Note:** You have to write a function in your program that accepts a parameter x and returns the value of f(x).

**Example**
\`\`\`
Input A: 3
Input B: 6
f(3) = 8
f(4) = 13
f(5) = 20
f(6) = 29
\`\`\``,
      reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['function'],
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['3', '6'] }, { stdin: ['0', '0'], edge: 'A = B' }, { stdin: ['-2', '2'], edge: 'negative values' }, { stdin: ['1', '1'] }, { stdin: ['5', '8'] }],
      wrong: [
        { code: 'def f(x):\n    print(x * x - 2 * x + 5)\n\nA = int(input())\nB = int(input())\nfor i in range(A, B + 1):\n    print("f(" + str(i) + ") = " + str(f(i)))', msg: 'This function uses `print` but does not `return`, so `f(i)` is `None`. A function must return a value with `return`.', tag: 'return-vs-print' },
        { code: 'def f(x):\n    return x * x - 2 * x + 5\n\nA = int(input())\nB = int(input())\nfor i in range(A, B):\n    print("f(" + str(i) + ") = " + str(f(i)))', msg: '`range(A, B)` does not include B. Use `range(A, B + 1)` so that f(B) is printed too.', tag: 'off-by-one' },
      ],
      plan: 'define f(x) returning x·x − 2x + 5; read A and B; for i from A to B print "f(i) = " + f(i)',
      skeleton: 'def f(x):\n    return x * x - ___ * x + ___\n\nA = int(input())\nB = int(input())\nfor i in range(A, ___):\n    print("f(" + str(i) + ") = " + str(___(i)))',
      hints: ['A function returns a value (`return`) rather than printing it; the printing is done in the main program.', 'Call the function for each i from A to B inclusive.'],
      syntax: ['def-function', 'return', 'call', 'for-range', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + the definition of function f (domain int, range int) in the declarations.', 'program-template', '# ALGORITHM'],
        ['def f(x)', 'A function definition with one parameter; the specification right below it.', 'def-function', '# returns'],
        ['return x * x', '`return` sends the value to the caller. `x * x` is safer than `x ** 2` in lecture notation.', 'return'],
        ['# MAIN PROGRAM', 'The main program starts.', 'comment', 'B = int'],
        ['for i in range(A, B + 1)', '`B + 1` so that f(B) is included.', 'for-range'],
        ['print("f("', 'The function result is used in an expression; `str(...)` on every number.', 'call'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'The variables and the function signature.', 'declarations', 'function f (x : integer) → integer'],
        ['function f (x : integer) → integer', 'The function definition.', 'def-function', '→ x * x'],
        ['input(A)', 'Input.', 'input', 'input(B)'],
        ['i traversal [A..B]', 'Inclusive.', 'for-range'],
        ['output(', 'Call f in the output.', 'call'],
      ]),
      explanation: 'The function `f` only computes and `return`s; the main program does the printing. Example: f(3) = 9 − 6 + 5 = 8.',
      refs: [{ src: MOD, page: 24 }],
    }],
  })
}
{
  const py = r`# Program PascalMatrix
# N x N matrix: the first row and first column are 1; every other element = above + left
# DECLARATIONS
# N, i, j : int
# M : array [0..N-1][0..N-1] of int
# line : string
# ALGORITHM
N = int(input())
M = [[0 for j in range(N)] for i in range(N)]
for i in range(N):
    for j in range(N):
        if (i == 0 or j == 0):
            M[i][j] = 1
        else:
            M[i][j] = M[i - 1][j] + M[i][j - 1]
for i in range(N):
    line = ""
    for j in range(N):
        line = line + str(M[i][j]) + " "
    print(line)`
  problems.push({
    id: 'mod-4-2', archetype: 'program', title: 'Module 4 – Pascal Triangle',
    source: mod('4.3.2 Pascal Triangle', [24]), minutes: 20,
    parts: [{
      id: 'mod-4-2-1', kind: 'program', decks: ['D06'], topic: 'Matrix (2D array)', patterns: ['nested-loop', 'array-map', 'array-populate'], misconceptions: ['index-range', 'off-by-one'],
      stem: `Pascal triangle can be made using a matrix. Matrix will be initialized by filling all the elements in the first row and the first column with 1. Then, every empty elements will be defined as the sum of element from previous row (but the same column) and the sum of element from previous column (but the same row). Make a program that accepts an integer N and writes a pascal triangle of size N × N

**Example**
\`\`\`
Input N: 4
1 1 1 1
1 2 3 4
1 3 6 10
1 4 10 20
\`\`\``,
      reps: ['python'], match: 'exact',
      solution: { python: py },
      tests: [{ stdin: ['4'] }, { stdin: ['1'], edge: 'N = 1' }, { stdin: ['2'] }, { stdin: ['5'] }, { stdin: ['3'] }],
      wrong: [
        { code: 'N = int(input())\nM = [[0 for j in range(N)] for i in range(N)]\nfor i in range(N):\n    for j in range(N):\n        M[i][j] = M[i - 1][j] + M[i][j - 1]\nfor i in range(N):\n    line = ""\n    for j in range(N):\n        line = line + str(M[i][j]) + " "\n    print(line)', msg: 'The first row and column must be 1 (the base case). Without that, M[−1][j] / M[i][−1] use negative indices (the last element) and everything is 0.', tag: 'index-range' },
        { code: 'N = int(input())\nM = [[1 for j in range(N)] for i in range(N)]\nfor i in range(1, N):\n    for j in range(1, N):\n        M[i][j] = M[i - 1][j] + M[i - 1][j - 1]\nfor i in range(N):\n    line = ""\n    for j in range(N):\n        line = line + str(M[i][j]) + " "\n    print(line)', msg: 'The formula is wrong: element = (above) + (**left**, same row) = `M[i-1][j] + M[i][j-1]`, not above + upper-left.', tag: 'constraint-missed' },
      ],
      plan: 'create an N×N matrix; for each (i, j): if i = 0 or j = 0 fill 1, otherwise fill above + left; print each row separated by spaces',
      skeleton: 'M = [[0 for j in range(___)] for i in range(___)]\nfor i in range(N):\n    for j in range(N):\n        if (i == ___ or j == ___):\n            M[i][j] = ___\n        else:\n            M[i][j] = M[i - 1][___] + M[___][j - 1]',
      hints: ['A matrix = an array of arrays: `M[i][j]` is row i column j. Fill it with two nested loops.', 'The base cases (first row/column) differ from the general case: use an `if`.', 'The general formula uses two neighbours that are already filled: above `M[i-1][j]` and left `M[i][j-1]`.'],
      syntax: ['list-init', 'list-index', 'for-range', 'if-else', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + the definition of the filling rule.', 'program-template', '# ALGORITHM'],
        ['N = int', 'The matrix size.', 'input'],
        ['M = [[0', 'An N×N matrix as a list inside a list (rows built by the outer comprehension). Do not use `[[0]*N]*N`: all rows would share the same object.', 'list-init'],
        ['for i in range(N)', 'Two nested loops fill every cell row by row, so the above and left cells are already filled.', 'for-range', 'for j in range(N)'],
        ['if (i == 0 or j == 0)', 'Base case: the first row or column = 1 (avoids index −1).', 'if-else', 'M[i][j] = 1'],
        ['M[i][j] = M[i - 1][j]', 'General case: above + left (both already computed).', 'list-index'],
        ['for i in range(N):', 'The printing loop: one row is built first, then printed.', 'for-range', 'print(line)'],
      ]),
      explanation: 'Fill each cell from two already-filled neighbours (above and left) with the base case of the first row/column. Example N = 4 gives 1 4 10 20 as the last row. Note: matrices (2D arrays) are not taught on the slides; in the handout it appears as an optional exercise. The answer is limited to Python (standard pseudocode for matrices is not covered in the lecture).',
      refs: [{ src: MOD, page: 24 }],
    }],
  })
}
{
  const py = r`# Program PaymentPattern
# Fuel payment pattern: pattern n = pattern (n-1) followed by its complement (character 1 <-> character 2)
# DECLARATIONS
# c1, c2 : char
# n : int
# Function Complement (p : char, c1 : char, c2 : char) -> char
# Function Pattern (c1 : char, c2 : char, n : int) -> array of char
# ALGORITHM
def Complement(p, c1, c2):
    # swaps c1 with c2 (and vice versa)
    if (p == c1):
        return c2
    else:
        return c1

def Pattern(c1, c2, n):
    # returns the character array of pattern n (length 2^n)
    size = 1
    arr = [c1]                       # pattern 0
    for k in range(n):
        new = [c1 for i in range(2 * size)]    # a new array twice the previous size
        for i in range(size):
            new[i] = arr[i]                    # first part: the previous pattern
            new[size + i] = Complement(arr[i], c1, c2)   # second part: its complement
        arr = new
        size = size * 2
    return arr

# MAIN PROGRAM
c1 = input()
c2 = input()
n = int(input())
result = Pattern(c1, c2, n)
print("The obtained pattern: " + "".join(result))`
  const ps = r`Program PaymentPattern
{ Pattern n = pattern (n-1) followed by its complement (character 1 <-> character 2) }
DECLARATIONS
  c1, c2, text : string
  n, i : integer
  function Complement (p : string, c1 : string, c2 : string) → string
  function Pattern (c1 : string, c2 : string, n : integer) → string

function Complement (p : string, c1 : string, c2 : string) → string
  { swaps c1 with c2 (and vice versa) }
  ALGORITHM
    if (p = c1) then
      → c2
    else
      → c1

function Pattern (c1 : string, c2 : string, n : integer) → string
  { pattern n as a string (length 2^n) }
  LOCAL DECLARATIONS
    k, i : integer
    cur, comp : string
  ALGORITHM
    cur ← c1
    k traversal [1..n]
      comp ← ""
      i traversal [0..len(cur)-1]
        comp ← comp + Complement(cur[i], c1, c2)
      cur ← cur + comp
    → cur

ALGORITHM
  input(c1)
  input(c2)
  input(n)
  text ← Pattern(c1, c2, n)
  output("The obtained pattern: " + text)`
  problems.push({
    id: 'mod-4-3', archetype: 'program', title: 'Module 4 – Practice Problem 1 (2021): Payment pattern (Mr. Ric and Mr. Dip)',
    source: mod('4.3.3 Practice Problem 1 Year 2021', [24, 25]), minutes: 25,
    parts: [{
      id: 'mod-4-3-1', kind: 'program', decks: ['D10'], topic: 'Function', patterns: ['function-def-call', 'function-composition', 'string-processing', 'array-map'], misconceptions: ['return-vs-print', 'scope-local', 'index-range'],
      stem: `Mr. Ric and Mr. Dip often go to ITB together by motor vehicle. However, Mr. Ric feels that alternating the schedule for paying for gasoline only disadvantages him. So Mr. Dip proposed a way to divide the payment schedule. For every 2^n, they will change the pattern by swapping the order (complement) of the payment in the pattern 2^(n−1). Here is the pattern proposed by Dip:

| n | Pattern |
|---|---|
| 0 | A |
| 1 | AR |
| 2 | ARRA |
| 3 | ARRARAAR |

As can be seen, the text in bold is the opposite of the non-bold part of a pattern. Mr. Ric really likes this idea. Help Mr. Ric create a program to generate this pattern.

Use Functions or Procedures in solving this problem. **Clue:** The sequence is the addition of complements from the previous sequence as shown in the example. Prepare an array of characters with a size of 2 times the previous sequence.

**Example 1**
\`\`\`
Enter character 1: A
Enter character 2: R
Enter the value of n: 2
The obtained pattern: ARRA
\`\`\`
**Example 2**
\`\`\`
Enter character 1: U
Enter character 2: W
Enter the value of n: 4
The obtained pattern: UWWUWUUWWUUWUWWU
\`\`\``,
      figures: [{ src: MOD, page: 25 }],
      reps: ['python', 'pseudo'], match: 'lenient', mustUse: ['function'],
      solution: { python: py, pseudo: ps },
      tests: [{ stdin: ['A', 'R', '2'] }, { stdin: ['U', 'W', '4'] }, { stdin: ['A', 'R', '0'], edge: 'n = 0: the pattern is just character 1' }, { stdin: ['A', 'R', '1'] }, { stdin: ['A', 'R', '3'] }, { stdin: ['x', 'y', '5'], edge: 'larger n' }],
      wrong: [
        { code: 'def Pattern(c1, c2, n):\n    arr = [c1]\n    for k in range(n):\n        arr = arr + arr\n    return arr\n\nc1 = input()\nc2 = input()\nn = int(input())\nprint("The obtained pattern: " + "".join(Pattern(c1, c2, n)))', msg: 'The second part must be the **complement** (character 1 ↔ character 2) of the previous pattern, not a copy of it.', tag: 'constraint-missed' },
        { code: 'def Pattern(c1, c2, n):\n    arr = [c1]\n    for k in range(n):\n        comp = []\n        for x in arr:\n            if (x == c1):\n                comp.append(c2)\n            else:\n                comp.append(c1)\n        arr = comp + arr\n    return arr\n\nc1 = input()\nc2 = input()\nn = int(input())\nprint("The obtained pattern: " + "".join(Pattern(c1, c2, n)))', msg: 'The order of the parts is reversed: the complement must be **appended after** the previous pattern (ARRA for n = 2 comes from AR + RA).', tag: 'constraint-missed' },
        { code: 'def Pattern(c1, c2, n):\n    arr = [c1]\n    for k in range(n):\n        comp = []\n        for x in arr:\n            if (x == c1):\n                comp.append(c2)\n            else:\n                comp.append(c1)\n        arr = arr + comp\n    print("The obtained pattern: " + "".join(arr))\n\nc1 = input()\nc2 = input()\nn = int(input())\nprint(Pattern(c1, c2, n))', msg: 'The function `Pattern` prints but does not `return`, so the main program prints an extra `None`. Return the value with `return`.', tag: 'return-vs-print' },
      ],
      plan: 'Complement(p): c1 → c2, otherwise → c1. Pattern(c1,c2,n): arr ← [c1]; repeat n times: build an array of twice the size holding arr followed by the complement of each element of arr; return arr. Main: read c1, c2, n; print the joined characters',
      skeleton: 'def Complement(p, c1, c2):\n    if (p == ___):\n        return ___\n    else:\n        return ___\n\ndef Pattern(c1, c2, n):\n    arr = [___]\n    size = 1\n    for k in range(n):\n        new = [c1 for i in range(2 * size)]\n        for i in range(size):\n            new[i] = arr[i]\n            new[size + i] = Complement(arr[___], c1, c2)\n        arr = new\n        size = size * ___\n    return arr',
      hints: ['Pattern n = pattern (n−1) then its complement. Which small part can become its own function? (The complement of one character.)', 'Start from pattern 0 = `[c1]`, then repeat n times: the length doubles (as the problem hints).', 'The function must `return` the result array; the printing is done in the main program.'],
      syntax: ['def-function', 'return', 'call', 'for-range', 'list-init', 'list-index', 'print-str'],
      lineNotes: notes(py, [
        ['# Program', 'Header + the declarations of the two functions (Complement and Pattern).', 'program-template', '# ALGORITHM'],
        ['def Complement', 'A small function: swaps c1 ↔ c2. Kept separate so it is easy to test and reuse.', 'def-function', 'return c1'],
        ['def Pattern', 'The main function returns the character array of pattern n.', 'def-function', '# returns'],
        ['size = 1', 'The current pattern length (pattern 0 has 1 character).', 'assign', 'arr = [c1]'],
        ['for k in range(n)', 'Each round produces the next pattern; exactly n rounds.', 'for-range'],
        ['new = [c1', 'A new array of 2 × the previous size (as the problem hints).', 'list-init'],
        ['for i in range(size)', 'Copy the first half and fill the second half with the complements, pointing at the index `size + i`.', 'list-index', 'new[size + i]'],
        ['arr = new', 'The new pattern replaces the old one; the length is doubled.', 'assign', 'size = size * 2'],
        ['return arr', '`return` (not `print`) so the result can be used by the caller.', 'return'],
        ['# MAIN PROGRAM', 'The main program: read two characters and n.', 'comment', 'n = int'],
        ['result = Pattern', 'Call the function and store the result.', 'call'],
        ['print(', '`"".join(list)` joins the characters. (In lecture notation this can also be done with a loop and `+`.)', 'print-str'],
      ]),
      pseudoNotes: notes(ps, [
        ['DECLARATIONS', 'The variables and the signatures of both functions. In pseudocode the pattern is held as a string to keep it simple.', 'declarations', 'function Pattern (c1 : string, c2 : string, n : integer) → string'],
        ['function Complement', 'The complement function of one character.', 'def-function', '→ c1'],
        ['function Pattern', 'Pattern n as a string.', 'def-function', '→ cur'],
        ['input(c1)', 'Input.', 'input', 'input(n)'],
        ['text ← Pattern', 'Call the function.', 'call'],
        ['output(', 'Output.', 'print-str'],
      ]),
      explanation: 'Pattern n = pattern (n−1) + its complement. Turn it into two functions: `Complement` (one character) and `Pattern` (repeat n times, doubling the array). n = 2 from A,R: A → AR → ARRA. Example: "A" + complement "R" = "AR"; "AR" + complement "RA" = "ARRA".',
      refs: [{ src: MOD, page: 24 }, { src: MOD, page: 25 }],
    }],
  })
}
/* ====================================================== Python module – worked examples as trace items ====================================================== */
const tr = (id: string, title: string, label: string, pages: number[], q: Omit<Extract<Problem['parts'][number], { kind: 'trace' }>, 'id' | 'kind' | 'refs'>): Problem => ({
  id, archetype: 'trace', title, source: mod(label, pages), minutes: 5,
  parts: [{ ...q, id: id + '-1', kind: 'trace', refs: pages.map((page) => ({ src: MOD, page })) }],
})

problems.push(
  tr('mod-t-print', 'Module 1.2 – print variants', 'Section 1.2 Input and Output (example program)', [4], {
    decks: ['D04'], topic: 'Input & output', patterns: ['sequence-io'], misconceptions: ['str-concat'], ask: 'output',
    stem: 'Write the exact output of this program (from the module, section 1.2). Pay attention to `end=""`, the comma, `+` and the f-string.',
    code: r`print("Hello , World!")
print("This is", end="")
print(" my first program ")
print("Using","Comma")
print("Using"+"Plus")
variable = "some value"
print(f"Using format : {variable}")`,
    lineNotes: [
      { line: 1, note: '`print` writes the text and then **moves to a new line** automatically.', syntax: 'print-str' },
      { line: [2, 3], note: '`end=""` replaces the newline with an empty string, so line 3 continues line 2 on the same output line.', syntax: 'print-str' },
      { line: 4, note: 'The comma in `print` separates the arguments with a **space**: `Using Comma`.', syntax: 'print-str' },
      { line: 5, note: '`+` joins strings **without a space**: `UsingPlus`. Only works for strings (numbers need `str()` first).', syntax: 'print-str' },
      { line: [6, 7], note: 'An f-string: `{variable}` is replaced by its value. (The module writes `{ variabel }`, a typo; the variable name is corrected here.)', syntax: 'print-str' },
    ],
    syntax: ['print-str', 'comment'],
    explanation: 'Output: `Hello , World!`, then `This is my first program ` (two prints joined), `Using Comma`, `UsingPlus`, `Using format : some value`. Note: the quoted text in the module contains extra spaces.',
  }),
  tr('mod-t-input', 'Module 1.2 – input and int()', 'Section 1.2 Input and Output (input example)', [5], {
    decks: ['D04'], topic: 'Input & output', patterns: ['sequence-io', 'type-conversion'], misconceptions: ['input-is-str', 'str-concat'], ask: 'output',
    stdin: ['hello world', '7'],
    stem: 'Trace the program (module section 1.2) with the user typing `hello world` and then `7`. What is printed?',
    code: r`S = input("Input some words: ")
print("You inputted " + S)
N = int(input("Input an integer : "))
print("If your number added with 5, th result is " + str(N + 5))`,
    lineNotes: [
      { line: 1, note: '`input()` reads one line as a **string**. The prompt text is not part of the program output that is checked.', syntax: 'input' },
      { line: 2, note: '`S` is already a string, so `+` can be used directly.', syntax: 'print-str' },
      { line: 3, note: '`int(...)` turns the string "7" into the number 7. Without `int`, `N + 5` is a TypeError.', syntax: 'type-conversion' },
      { line: 4, note: '`N + 5` is computed first (12), then `str(...)` so it can be joined with a string. (The text "th result" is as in the module.)', syntax: 'print-str' },
    ],
    syntax: ['input', 'type-conversion', 'print-str'],
    explanation: 'Output: `You inputted hello world` and `If your number added with 5, th result is 12`.',
  }),
  tr('mod-t-cond1', 'Module 2.1 – if / elif / else', 'Section 2.1 Control (positive / negative / zero)', [10], {
    decks: ['D05'], topic: 'Branching', patterns: ['if-elif'], ask: 'output', stdin: ['-5'],
    stem: 'Trace the program (module section 2.1) with input `-5`. Which branch runs and what is printed?',
    code: r`N = int(input())
if (N > 0):
    print(str(N) + " is positive number ")
elif (N < 0):
    print(str(N) + " is negative number ")
else: # N == 0
    print(str(N) + " is zero")`,
    lineNotes: [
      { line: 1, note: 'N = −5 (already an `int`).', syntax: 'input' },
      { line: 2, note: 'The first condition is false (−5 > 0 is false), skip the if body.', syntax: 'if' },
      { line: 4, note: 'The `elif` condition is true (−5 < 0): its body runs and the other branches are skipped.', syntax: 'if-elif' },
      { line: [6, 7], note: '`else` only runs when all the conditions above it are false.', syntax: 'if-else' },
    ],
    syntax: ['if-elif', 'relational-logical'],
    explanation: 'Only the `elif (N < 0)` branch runs: `-5 is negative number `.',
  }),
  tr('mod-t-cond2', 'Module 2.1 – nested if', 'Section 2.1 Control (nested if)', [10], {
    decks: ['D05'], topic: 'Branching', patterns: ['nested-if'], ask: 'output', stdin: ['0'],
    stem: 'The module shows that an `if` can be placed inside an `if`. Trace the program with input `0`.',
    code: r`N = int(input())
if (N >= 0):
    if (N > 0):
        print(str(N) + " is positive number ")
    else: # N == 0
        print(str(N) + " is zero")
else: # N < 0
    print(str(N) + " is negative number ")`,
    lineNotes: [
      { line: 2, note: 'The outer check: `0 >= 0` is true, enter the inner if.', syntax: 'if' },
      { line: 3, note: 'The inner check: `0 > 0` is false, so move to the inner `else`.', syntax: 'if-else' },
      { line: [5, 6], note: 'This `else` belongs to `if (N > 0)` (same indentation), not to the outer if. Output: "0 is zero".', syntax: 'indentation' },
      { line: [7, 8], note: 'The outer `else` (aligned with `if (N >= 0)`): only for N < 0.', syntax: 'if-else' },
    ],
    syntax: ['if', 'if-else', 'indentation'],
    explanation: 'Output `0 is zero`: the outer if is true, the inner if is false → the inner else.',
  }),
  tr('mod-t-while', 'Module 3.1.1 – while loop a..b', 'Section 3.1.1 While Loop', [13], {
    decks: ['D05'], topic: 'While loop', patterns: ['while-counter'], misconceptions: ['while-no-next'], ask: 'table', watch: ['i'], stdin: ['3', '6'],
    stem: 'Trace the while-loop program (module 3.1.1) with `a = 3`, `b = 6`. Fill the value of `i` each time it changes and give the output.',
    code: r`a = int(input())
b = int(input())
i = a
while (i <= b):
    print(i)
    i += 1`,
    lineNotes: [
      { line: [1, 2], note: 'Reads a = 3 and b = 6.', syntax: 'input' },
      { line: 3, note: 'Initialise the counter **before** the loop.', syntax: 'assign' },
      { line: 4, note: 'The condition is checked at the start of every iteration; the loop stops when `i > b` (i = 7).', syntax: 'while' },
      { line: 5, note: 'Action: print i.' },
      { line: 6, note: '`i += 1` advances the counter; without it the condition never becomes false (the loop never stops).', syntax: 'operators' },
    ],
    syntax: ['while', 'operators'],
    explanation: 'i takes the values 3, 4, 5, 6 (then 7, which stops the loop). Output: 3, 4, 5, 6 (one per line).',
  }),
  tr('mod-t-for', 'Module 3.1.2 – for loop a..b', 'Section 3.1.2 For Loop', [13], {
    decks: ['D05'], topic: 'For loop', patterns: ['for-count'], ask: 'table', watch: ['i'], stdin: ['3', '6'],
    stem: 'Trace the for-loop program (module 3.1.2) with `a = 3`, `b = 6`. How does the value of `i` change, and what is printed?',
    code: r`a = int(input())
b = int(input())
for i in range(a, b+1):
    print(i)`,
    lineNotes: [
      { line: [1, 2], note: 'Reads a = 3 and b = 6.', syntax: 'input' },
      { line: 3, note: '`range(3, 7)` produces 3, 4, 5, 6: the upper bound is excluded, so `b+1` so that b is included. `for` manages the counter itself (no `i += 1`).', syntax: 'for-range' },
      { line: 4, note: 'The loop body (indented): print i on each iteration.', syntax: 'indentation' },
    ],
    syntax: ['for-range'],
    explanation: 'The same as the while version: 3, 4, 5, 6. For a known number of iterations, `for` is more concise.',
  }),
  tr('mod-t-range', 'Module 3.1.2 – range() with 1, 2, 3 arguments', 'Section 3.1.2 For Loop (range examples)', [14], {
    decks: ['D05'], topic: 'For loop', patterns: ['for-count', 'for-backward'], misconceptions: ['off-by-one'], ask: 'output',
    stem: 'The module lists what `range` produces (as comments). Print them as lists and write the output.',
    code: r`print(list(range(10)))
print(list(range(2, 5)))
print(list(range(7, 2, -1)))
print(list(range(2, 8, 2)))`,
    lineNotes: [
      { line: 1, note: 'One argument: 0 to n−1 → 0..9.', syntax: 'for-range' },
      { line: 2, note: 'Two arguments: from 2 to 4 (the upper bound is excluded).', syntax: 'for-range' },
      { line: 3, note: 'Three arguments with step −1: descending 7, 6, 5, 4, 3 (2 is excluded).', syntax: 'for-backward' },
      { line: 4, note: 'Step 2: 2, 4, 6 (8 is excluded).', syntax: 'for-range' },
    ],
    syntax: ['for-range', 'for-backward'],
    explanation: 'Output: `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`, `[2, 3, 4]`, `[7, 6, 5, 4, 3]`, `[2, 4, 6]`. (The module writes them as comments; `list(...)` was added so they can be printed.)',
  }),
  tr('mod-t-nested', 'Module 3.2 – nested loop: square of asterisks', 'Section 3.2 Nested Loop', [14], {
    decks: ['D05'], topic: 'Nested loops', patterns: ['nested-loop'], misconceptions: ['indentation'], ask: 'output', stdin: ['3'],
    stem: 'Trace the nested-loop program (module 3.2) with `n = 3`. What pattern is printed?',
    code: r`n = int(input())
for i in range(n):
    for j in range(n):
        print('*', end='') # Executed n * n times
    print() # Executed n times`,
    lineNotes: [
      { line: 2, note: 'The outer loop: n rows (i = 0, 1, 2).', syntax: 'for-range' },
      { line: 3, note: 'The inner loop runs fully (n times) for **every** i, so n × n times in total.', syntax: 'for-range' },
      { line: 4, note: '`end=\'\'` holds back the newline, so the n stars stay on one line.', syntax: 'print-str' },
      { line: 5, note: 'Aligned with `for j`: once per row, moving to the next line.', syntax: 'indentation' },
    ],
    syntax: ['for-range', 'indentation', 'print-str'],
    explanation: 'Output: three lines of `***` (a 3 × 3 square).',
  }),
  tr('mod-t-array', 'Module 3.3.2 – filling an array in a loop', 'Section 3.3.2 Array and Variable', [15], {
    decks: ['D06'], topic: 'Array', patterns: ['array-populate'], ask: 'output', stdin: ['4', '8', '15', '16', '23'],
    stem: 'Trace the program based on module 3.3.2 (a `print(arr)` was added at the end to show the result). The user types 4, 8, 15, 16, 23. What is printed?',
    code: r`arr = [0 for i in range(10)]
for i in range(5):
    arr[i] = int(input('Input value index ' + str(i) + ': '))
print(arr)`,
    lineNotes: [
      { line: 1, note: 'An array of 10 elements holding 0: indices 0..9.', syntax: 'list-init' },
      { line: 2, note: 'Only the first 5 elements are filled (`range(5)` = 0..4).', syntax: 'for-range' },
      { line: 3, note: '`arr[i]` uses the counter as the index. `int(...)` on the `input` result. The prompt text is not part of the output.', syntax: 'list-index' },
      { line: 4, note: 'The elements at indices 5..9 keep the initial value 0.' },
    ],
    syntax: ['list-init', 'list-index', 'for-range', 'input'],
    explanation: 'Output: `[4, 8, 15, 16, 23, 0, 0, 0, 0, 0]`.',
  }),
  tr('mod-t-string', 'Module 3.3.3 – string vs array of characters', 'Section 3.3.3 String', [15, 16], {
    decks: ['D06'], topic: 'String & array', patterns: ['string-processing'], ask: 'output',
    stem: 'The module says a string can be indexed like an array but is immutable, while a list of characters is mutable. Trace this program.',
    code: r`s1 = 'Hello'
print(s1[0])
s2 = ['H', 'e', 'l', 'l', 'o']
s2[1] = 'a'
print(s2)`,
    lineNotes: [
      { line: 2, note: 'A string can be indexed like an array: `s1[0]` is the first character "H".', syntax: 'list-index' },
      { line: 3, note: 'A character array: each element is one character, and it **can be changed**.', syntax: 'list-init' },
      { line: 4, note: 'Changing element 1 to "a" is legal for the array. For a string, `s1[1] = \'a\'` would raise a TypeError because strings are immutable.', syntax: 'list-index' },
    ],
    syntax: ['list-init', 'list-index'],
    explanation: 'Output: `H` and `[\'H\', \'a\', \'l\', \'l\', \'o\']`.',
  }),
  tr('mod-t-square', 'Module 4.1 – function Square', 'Section 4.1 Function (square example)', [22], {
    decks: ['D10'], topic: 'Function', patterns: ['function-def-call'], misconceptions: ['scope-local', 'return-vs-print'], ask: 'table', watch: ['n', 'n2'], stdin: ['5'],
    stem: 'Trace the complete program from module 4.1 with input 5. (The module\'s first listing returns `x` by mistake; this is the corrected version it prints afterwards.) Show `n` and `n2` and the output.',
    code: r`def square (x):
    x2 = x * x
    return x2

n = int(input())
n2 = square (n)
print(n2)`,
    lineNotes: [
      { line: 1, note: '`x` is a **parameter**: a local name inside the function, different from `n` in the main program.', syntax: 'def-function' },
      { line: 2, note: '`x2` is a local variable; it exists only while the function runs.', syntax: 'def-function' },
      { line: 3, note: '`return x2` returns the value to the caller (the first version in the module is wrong: `return x`).', syntax: 'return' },
      { line: 5, note: 'The main program starts here; the function definition above does not run anything yet.', syntax: 'input' },
      { line: 6, note: 'The call: the value of `n` (5) is copied into the parameter `x`. Changing `x` does not change `n`.', syntax: 'call' },
      { line: 7, note: 'Prints the result, 25.' },
    ],
    syntax: ['def-function', 'return', 'call'],
    explanation: 'n = 5, n2 = 25; output `25`. Note: in the module\'s first listing (`return x`), the result is 5 (not the square); that is a typo.',
  }),
  tr('mod-t-power', 'Module 4.1 – function power(a, b)', 'Section 4.1 Function (power example)', [22], {
    decks: ['D10'], topic: 'Function', patterns: ['function-def-call', 'accumulate-sum'], ask: 'table', watch: ['i', 'c'],
    stem: 'Trace the module function `power` called as `power(2, 4)` (a main program line was added). Show `i` and `c` for each loop iteration and the output.',
    code: r`def power(a, b):
    # assume b >= 0
    c = 1
    for i in range(b):
        c *= a
    return c

print(power(2, 4))`,
    lineNotes: [
      { line: 1, note: 'Two parameters: a (the base) and b (the exponent, b ≥ 0).', syntax: 'def-function' },
      { line: 3, note: 'The result starts at 1 (the neutral element of multiplication), initialised before the loop.', syntax: 'assign' },
      { line: 4, note: '`range(b)` repeats exactly b times.', syntax: 'for-range' },
      { line: 5, note: '`c *= a` is the same as `c = c * a` (an assignment operator).', syntax: 'operators' },
      { line: 6, note: 'The value is returned after the loop finishes: aligned with `for` (not inside the loop).', syntax: 'return' },
      { line: 8, note: 'The main program calls the function with a = 2, b = 4.', syntax: 'call' },
    ],
    syntax: ['def-function', 'return', 'for-range', 'operators'],
    explanation: 'c goes 1 → 2 → 4 → 8 → 16 (4 iterations). Output `16`.',
  }),
  tr('mod-t-menu', 'Module 4.2 – procedure write_menu', 'Section 4.2 Procedure', [23], {
    decks: ['D10'], topic: 'Procedure', patterns: ['procedure'], misconceptions: ['return-vs-print'], ask: 'output',
    stem: 'Trace the procedure from module 4.2 (the module defines `write_menu` but calls `tulis_menu`; the call is corrected here, and the `input` lines are left out). What is printed?',
    code: r`def write_menu (opt1 , opt2 , opt3):
    print("Menu:")
    print("1. " + str(opt1))
    print("2. " + str(opt2))
    print("3. " + str(opt3))
    print("Enter your choice : ")

write_menu ("Burger", "Fried Chicken", "Instant Noodle")
write_menu ("Avocado Juice", "Thai Tea", "Milk Tea")`,
    lineNotes: [
      { line: 1, note: 'A procedure: a function **without `return`**; it only performs an action (here printing). Three parameters.', syntax: 'def-procedure' },
      { line: [2, 6], note: 'The procedure body: runs every time the procedure is called. `str()` on the parameters is safe even though they are already strings.', syntax: 'print-str' },
      { line: 8, note: 'A procedure call stands alone as a statement (its value is not used).', syntax: 'call' },
      { line: 9, note: 'The second call with other arguments: the benefit of a procedure is less rewriting.', syntax: 'call' },
    ],
    syntax: ['def-procedure', 'call', 'print-str'],
    explanation: 'Two menu blocks are printed in order: "Menu:", three numbered items, then "Enter your choice : ", first for food and then for drinks.',
  }),
)


const papers = [
  { id: 'module', title: 'Python Module – exercises & examples', year: 2026, kind: 'module' as const, lang: 'en' as const, note: 'All module exercises (Module 1–4) and the trace-type examples.', problems: problems.filter((p) => p.id.startsWith('mod-')).map((p) => p.id) },
]

export const bank: BankFile = { problems, papers, flashcards: [] }
