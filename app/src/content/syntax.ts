// Syntax reference cards, written from the course slides (D02 Liem pseudocode, D04 structure, D05 conditionals/loops,
// D06 arrays, D10 subprograms). Every `example` is executed through py/harness.py by the checks in the W6 report;
// do not hand-write outputs here: the card view runs the example live (py.run) and shows the real output.
// Slide errata (PLAN.md §7) are corrected here: we teach what Python really does.
// All learner-facing text is English (the site default); pseudocode follows the Liem notation of the English slides.
import type { SyntaxCard, SyntaxId } from '../types'

const r = (src: string, ...pages: number[]) => pages.map((page) => ({ src, page }))
const D02 = 'D02_AlgorithmicThinking', D04 = 'D04_BasicStructure', D05 = 'D05_Conditionals_Repetition', D06 = 'D06_Array', D10 = 'D10_Subprogram'

export const SYNTAX: SyntaxCard[] = [
  /* ============================ D02 / D04 : structure ============================ */
  {
    id: 'program-template',
    title: 'Program template',
    rule: 'Every program has a title + specification, a DECLARATIONS section written as comments, then the ALGORITHM section holding the real instructions.',
    python: `# Program <Title>
# <specification: what is computed / printed>
# DECLARATIONS
# A, B : int
# ALGORITHM
A = int(input())
B = int(input())
A = A + B
print(A)
print(B)`,
    pseudo: `Program <Title>
{ program specification }
DECLARATIONS
   A, B : integer
ALGORITHM
   input(A)
   input(B)
   A ← A + B
   output(A)
   output(B)`,
    flow: 'Start (oval terminator) → parallelogram for input → rectangle for process → parallelogram for output → End (oval). One-way arrows from top to bottom.',
    example: { code: `# Program Sum
# Adds two numbers
# DECLARATIONS
# A, B : int
# ALGORITHM
A = int(input())
B = int(input())
A = A + B
print(A)
print(B)`, stdin: ['3', '4'], note: 'The order is Input → Process → Output. A becomes 7, B stays 4.' },
    slips: [
      { wrong: '# ALGORITHM left out, code written with no title/DECLARATIONS', why: 'Python still runs, but on the exam paper the template and the DECLARATIONS are graded too (course notation).', fix: 'Write the title, the specification, `# DECLARATIONS` (name : type) and `# ALGORITHM` as comments.' },
      { wrong: 'DECLARATIONS written without `#`', why: 'In Python the DECLARATIONS are only documentation; without `#` they are read as code and cause a SyntaxError/NameError.', fix: 'Start every title, specification, DECLARATIONS and ALGORITHM line with `#`.' },
      { wrong: 'Swapping `A = A + B` with `print(A)`', why: 'The order of instructions decides the result when data depends on earlier steps (printing before the process prints the old value).', fix: 'Keep the order Input → Process → Output.' },
    ],
    decks: ['D02', 'D04'],
    refs: [...r(D04, 4, 5, 11, 12), ...r(D02, 7)],
  },
  {
    id: 'comment',
    title: 'Comments',
    rule: 'A comment starts with `#` and runs to the end of the line. It is not executed; use it to explain a step, a formula or a condition (e.g. `# else: x <= 50`).',
    python: `# this is a one-line comment
x = 5      # comment at the end of a line`,
    pseudo: `{ this is a comment }
x ← 5      { comment at the end of a line }`,
    flow: 'No symbol of its own. Notes are written next to a symbol or as text on an arrow (e.g. Yes / No).',
    example: { code: `# Program Comment
x = 5      # initial value
# print(99) is not executed
print(x)   # only 5 is shown`, note: 'Lines that start with # are ignored by Python.' },
    slips: [
      { wrong: '{ comment } in Python', why: 'Curly braces are the pseudocode comment notation, not Python.', fix: 'In Python use `# comment`; in pseudocode use `{ comment }`.' },
      { wrong: '// comment', why: 'That is C/Java style. Python reads `//` as the integer-division operator and reports an error.', fix: 'Use `#`.' },
    ],
    decks: ['D04'],
    refs: r(D04, 13),
  },
  {
    id: 'declarations',
    title: 'Declarations: names, types and constants',
    rule: 'A variable has a name (letters/digits/_, not starting with a digit, upper case ≠ lower case) and a type (int, float, bool, char, string). Python does not force declarations, so write `# name : type` in the DECLARATIONS as documentation.',
    python: `# DECLARATIONS
# age : int
# temp : float
# city : string
# passed : bool
age = 25
temp = 37.5
city = "Bandung"
passed = True`,
    pseudo: `DECLARATIONS
   age : integer
   temp : real
   city : string
   passed : boolean`,
    flow: 'Declarations are not drawn in a flowchart; the data type shows in the values that are read or computed.',
    example: { code: `# DECLARATIONS
# age : int
# temp : float
# passed : bool
age = 25
temp = 37.5
passed = True
print(age + 1)
print(temp * 2)
print(not passed)`, note: 'The type is set by the initial value (Python is dynamically typed): an int can be added to, a float multiplied, a bool flipped with not. Booleans are written True/False.' },
    slips: [
      { wrong: 'Total = 5 then using total', why: 'Python is case-sensitive: `Total` and `total` are two different names, so you get a NameError.', fix: 'Pick one spelling and use it consistently.' },
      { wrong: '2nd_value = 3 / total value = 3', why: 'A name may not start with a digit or contain spaces.', fix: '`second_value = 3`.' },
      { wrong: 'x = true', why: 'Python boolean constants are `True` / `False` (capital first letter). `true` is read as a variable name that does not exist.', fix: '`x = True`. (Lower-case `true`/`false` exist only in pseudocode.)' },
      { wrong: 'FA = 4.5; FB = "text"; FB = IA  # type mismatch', why: 'The stored value must match the declared type; putting a string into a variable meant to be an int breaks later operations.', fix: 'Make sure the right-hand side has the same type as written in the DECLARATIONS.' },
    ],
    decks: ['D04'],
    refs: r(D04, 18, 19, 20, 22, 23),
  },
  {
    id: 'assign',
    title: 'Assignment',
    rule: 'The left side must be a variable and the right side a value/expression: `x = x + 1` means evaluate the right side first, then store it in x. The `=` sign is not a comparison.',
    python: `i = 10
name = "Maya"
X = i + 10
a += 5      # same as a = a + 5`,
    pseudo: `i ← 10
name ← "Maya"
X ← i + 10`,
    flow: 'Rectangle (process) containing `X ← i + 10`. The arrow ← means "is assigned".',
    example: { code: `i = 10
X = i + 10
i = i + 1
a = 31
a += 5
print(X, i, a)`, note: 'X is computed from the value i has at that moment (10), so 20; i becomes 11; a += 5 → 36.' },
    slips: [
      { wrong: '10 = i', why: 'The left side must be a variable name, not a value.', fix: '`i = 10`.' },
      { wrong: 'x + 1 = x', why: 'The left side is not a variable; Python raises a SyntaxError.', fix: '`x = x + 1`.' },
      { wrong: 'if x = 5:', why: '`=` is assignment. Comparison uses `==`.', fix: '`if x == 5:`' },
      { wrong: 'i++', why: 'Python has no `++`/`--`.', fix: '`i = i + 1` or `i += 1`.' },
    ],
    decks: ['D04'],
    refs: r(D04, 25, 26, 37),
  },
  {
    id: 'input',
    title: 'Input: input()',
    rule: '`input()` reads one line and the result is ALWAYS a string. Wrap it in `int(...)` or `float(...)` when it is used as a number.',
    python: `A = input()                       # string
B = int(input())                  # integer
C = float(input("Enter = "))      # real number`,
    pseudo: `input(A)
input(A, B)`,
    flow: 'Parallelogram containing `input(A)`.',
    example: { code: `A = input()
B = int(input())
print(A + A)
print(B + B)`, stdin: ['12', '12'], note: 'String "12" + "12" → 1212 (joined); int 12 + 12 → 24.' },
    slips: [
      { wrong: 'N = input()\nfor i in range(N):', why: '`input()` returns a string and `range` needs an int: TypeError.', fix: '`N = int(input())`.' },
      { wrong: 'x = input()\nprint(x + 1)', why: 'A string and an int cannot be added (TypeError).', fix: '`x = int(input())`.' },
      { wrong: 'x = int(input())  # input is "3.5"', why: '`int()` on a string with a decimal point raises a ValueError.', fix: 'Use `float(input())` when the input can be a decimal.' },
      { wrong: 'N : float but read with int(input())  # slide D05 error', why: 'The type in the DECLARATIONS and the conversion function must match; the D05 slide writes them mismatched.', fix: 'float → `float(input())`, int → `int(input())`.' },
    ],
    decks: ['D04'],
    refs: r(D04, 7, 27),
  },
  {
    id: 'type-conversion',
    title: 'Type conversion',
    rule: '`int(x)`, `float(x)`, `str(x)` change the type; `chr(n)` turns a number into a character, `ord(c)` a character into a number. `int(3.9)` truncates to 3 (it does not round).',
    python: `int("42")     # 42
float("3.5")  # 3.5
str(7)        # "7"
chr(65)       # "A"
ord("A")      # 65`,
    pseudo: `{ conversion is written as typename(x) }
x ← integer(s)`,
    flow: 'The conversion is written inside the process rectangle or the input parallelogram, e.g. `A ← int(A)`.',
    example: { code: `print(int(3.9))
print(float("3.5") + 1)
print(str(7) + "1")
print(ord("A"))
print(chr(66))`, note: 'int(3.9) = 3 (truncated). str(7)+"1" = "71" because both are strings.' },
    slips: [
      { wrong: 'int("3.5")', why: 'A decimal string cannot be turned straight into an int (ValueError).', fix: '`int(float("3.5"))` or just `float("3.5")`.' },
      { wrong: 'int("")', why: 'An empty string contains no number (ValueError), usually because the input is empty.', fix: 'Make sure the input data exists before converting.' },
      { wrong: 'thinking round equals int: int(2.9) = 3', why: '`int()` drops the fraction, so the result is 2.', fix: 'Use `round(2.9)` when you want rounding.' },
    ],
    decks: ['D04'],
    refs: r(D04, 28),
  },
  {
    id: 'print-str',
    title: 'Output: print() and str()',
    rule: '`print(...)` shows a value. To join text with a number use `str()` so the types match, or separate them with a comma (a space is added automatically).',
    python: `print(A)
print("Hello", A)                 # comma: automatic space
print("Total: " + str(total))     # + only for string + string`,
    pseudo: `output(A)
output("Total: ", total)`,
    flow: 'Parallelogram containing `output(...)`.',
    example: { code: `total = 15
print("Total: " + str(total))
print("Total:", total)
print(total * 4)`, note: 'Two ways to join: str() with +, or a comma. Notice the space in the comma version.' },
    slips: [
      { wrong: 'print("Total: " + total)', why: 'Adding a string and an int raises a TypeError.', fix: '`print("Total: " + str(total))`.' },
      { wrong: 'print("Average = " + str(rata))  # but the variable is avg', why: 'The name must match the one that was assigned. The D05 slide writes `str(rata)` while the variable is `avg` (NameError).', fix: '`print("Average = " + str(avg))`.' },
      { wrong: 'print "Hello"', why: 'That is Python 2 syntax. In Python 3 print is a function.', fix: '`print("Hello")`.' },
      { wrong: 'print("x")  # inside a function that should return', why: 'print only displays; the caller does not receive the value.', fix: 'If the result is used again, `return` the value.' },
    ],
    decks: ['D04'],
    refs: r(D04, 29),
  },
  {
    id: 'operators',
    title: 'Arithmetic operators',
    rule: '`+ - * /` as usual; `//` integer division; `%` remainder (mod); `**` power. `/` always gives a float.',
    python: `a = 10; b = 21
a + b    # 31
b // a   # 2   (div)
b % a    # 1   (mod)
b / a    # 2.1
a ** 2   # 100`,
    pseudo: `b div a    { integer division }
b mod a    { remainder }`,
    flow: 'Written in the process rectangle or inside the diamond, e.g. `N mod 2 = 0`.',
    example: { code: `a = 10
b = 21
print(a + b)
print(b // a)
print(b % a)
print(b / a)
print(a ** 2)
print(7 / 2, 7 // 2)`, note: '`7 / 2` = 3.5 while `7 // 2` = 3. Even/odd test: x % 2 == 0.' },
    slips: [
      { wrong: 'average = total // n', why: '`//` drops the fraction, so the average can be wrong.', fix: '`average = total / n`.' },
      { wrong: 'if N / 2 == 0:  # to test for even', why: '`/` gives a float (5 / 2 = 2.5); the remainder is not tested.', fix: '`if N % 2 == 0:`' },
      { wrong: '2^3', why: '`^` in Python is XOR, not power.', fix: '`2 ** 3`.' },
      { wrong: 'x = 5 ÷ 2', why: 'The character ÷ is not known to Python (SyntaxError).', fix: 'Use `/` or `//`.' },
    ],
    decks: ['D04'],
    refs: r(D04, 34, 37),
  },
  {
    id: 'relational-logical',
    title: 'Relational & logical operators',
    rule: 'Relational: `== != > < >= <=` give True/False. Logical: `and`, `or`, `not`. There is no `&&`, `||`, `!`. `A or B` is False only when both are False.',
    python: `a == b    a != b    a > b
a <= b    (a > 0) and (a < 10)
not (found)`,
    pseudo: `a = b     a ≠ b     a ≥ b
(a > 0) and (a < 10)
not (found)`,
    flow: 'Diamond (decision) containing the condition; two arrows leave it labelled Yes/No (true/false).',
    example: { code: `a = 10
b = 21
print(a == b)
print(a != b)
print(a < b and b < 30)
print(True or False)
print(not (a > b))`, note: '`True or False` is True (the D04 slide says False: that is an error).' },
    slips: [
      { wrong: 'if x = 5:', why: '`=` is assignment, not comparison (SyntaxError).', fix: '`if x == 5:`' },
      { wrong: 'if x > 0 && x < 5:', why: '`&&` is not Python.', fix: '`if x > 0 and x < 5:`' },
      { wrong: 'if 0 < x < 5 and y == 1 or 2:', why: '`y == 1 or 2` is always True (because `2` counts as True).', fix: '`y == 1 or y == 2`.' },
      { wrong: 'x = True or False  # then assuming False', why: 'OR is True when either side is True.', fix: 'Evaluate with a truth table: only `False or False` = False.' },
    ],
    decks: ['D04', 'D05'],
    refs: r(D04, 35, 36),
  },
  {
    id: 'indentation',
    title: 'Blocks & indentation',
    rule: 'Python marks blocks by indentation (4 spaces). All lines in one block must be indented equally; after a `:` the next line must be indented. Indenting less means leaving the block.',
    python: `if (a > 50):
    print("Hello")     # if block
    print("bye")
else:
    print("Hello Dear")
print("done")          # outside the block`,
    pseudo: `if (a > 50) then
    output("Hello")
    output("bye")
else
    output("Hello Dear")
output("done")`,
    flow: 'One block = one sequence of symbols on the same path. Branch paths are drawn separately and merge again before the next step.',
    example: { code: `a = 40
if (a > 50):
    print("Hello")
    print("bye")
else:
    print("Hello Dear")
    print("bye bye")
print("done")`, note: 'Only the else block runs; "done" is not indented, so it is always shown.' },
    slips: [
      { wrong: 'if (a > 50):\nprint("Hello")', why: 'After `:` the block must be indented (IndentationError: expected an indented block).', fix: 'Indent the body by 4 spaces.' },
      { wrong: 'if (a > 50):\n    print("Hello")\n  print("bye")', why: 'Lines in the same block must line up; inconsistent indentation is an error.', fix: 'Use the same number of spaces for every line of one block.' },
      { wrong: 'sum = sum + i  # aligned with for, not inside it', why: 'That line is outside the loop: it runs only once.', fix: 'Indent it into the loop if it must repeat.' },
      { wrong: 'print(sum)  # indented inside the loop', why: 'Printing the total is repeated on every iteration.', fix: 'Align it with `for` if it should print only once (Termination).' },
    ],
    decks: ['D04', 'D05'],
    refs: r(D04, 43, 44),
  },

  /* ============================ D05 : conditionals ============================ */
  {
    id: 'if',
    title: 'if (single case)',
    rule: 'The action runs only when the condition is True; when it is False nothing happens. The condition must be a relational/logical expression and ends with `:`.',
    python: `if (condition):
    action
# condition = False: no action`,
    pseudo: `if (condition) then
    action
{ else: do nothing }`,
    flow: 'Diamond containing the condition. The "true" arrow goes to the action box and then rejoins; the "false" arrow goes straight to the next step.',
    example: { code: `A = int(input())
if (A > 0):
    print("positive")
print("done")`, stdin: ['5'], note: 'If A = -2, only "done" is shown.' },
    slips: [
      { wrong: 'if (A >= 0):  # the specification says "positive"', why: '0 is not positive. The D05 slide (Print_Positive) uses `>=` although the specification is `A > 0`: an error.', fix: 'Match the operator to the specification: `if (A > 0):`' },
      { wrong: 'if (A > 0)\n    print("positive")', why: 'The `:` is missing: SyntaxError: expected \':\'.', fix: 'Add `:` at the end of the `if` line.' },
      { wrong: 'if A = 0:', why: 'Comparison uses `==`.', fix: '`if A == 0:`' },
    ],
    decks: ['D05'],
    refs: r(D05, 11, 12, 14, 15, 16, 17),
  },
  {
    id: 'if-else',
    title: 'if – else (two complementary cases)',
    rule: 'Exactly one of two actions runs: action-1 when the condition is True, action-2 when it is False. The two cases are complete and do not overlap.',
    python: `if (condition):
    action_1
else:  # condition = False
    action_2`,
    pseudo: `if (condition) then
    action_1
else { condition = false }
    action_2`,
    flow: 'Diamond with two outgoing arrows, true and false, each to one action box; both merge into the next step.',
    example: { code: `N = int(input())
if (N % 2 == 0):
    print("even")
else:  # N % 2 == 1
    print("odd")`, stdin: ['7'], note: 'Odd and even are complete + mutually exclusive, so if-else is enough.' },
    slips: [
      { wrong: 'if (N % 2 == 0):\n    ...\nelse (N % 2 == 1):', why: '`else` has no condition.', fix: 'Just `else:`; its condition is automatically the opposite of the if.' },
      { wrong: 'if (x > 5):\n    a\nif (x <= 5):\n    b', why: 'Two separate `if`s are both always tested; if the first action changes x, the second one may run too.', fix: 'Use `else` so exactly one branch runs.' },
      { wrong: 'else:\naction not indented', why: 'The else body must be indented.', fix: 'Indent by 4 spaces.' },
    ],
    decks: ['D05'],
    refs: r(D05, 13, 18, 19, 20),
  },
  {
    id: 'if-elif',
    title: 'if – elif – else (many cases)',
    rule: 'The chain of conditions is tested from the top; only the first True branch runs. The cases must be COMPLETE (every value is covered) and DISJOINT (no overlap). Python writes `elif`, not `else if`.',
    python: `if (condition_1):
    action_1
elif (condition_2):
    action_2
else:  # any other condition
    action_n`,
    pseudo: `if (condition_1) then
    action_1
else if (condition_2) then
    action_2
else { any other condition }
    action_n`,
    flow: 'Chained diamonds: the false answer of one decision enters the next decision; each true goes to its action box; all meet at the end.',
    example: { code: `N = int(input())
if (N > 0):
    print("positive")
elif (N < 0):
    print("negative")
else:  # N = 0
    print("zero")`, stdin: ['0'], note: 'N > 0, N < 0, N = 0: complete and mutually exclusive.' },
    slips: [
      { wrong: 'else if (N < 0):', why: 'Python has no `else if`; that is pseudocode writing (SyntaxError).', fix: '`elif (N < 0):`' },
      { wrong: 'if (n >= 60): "B"\nelif (n >= 80): "A"', why: 'Not disjoint: 85 always enters the first branch because of the order. The result depends on the order.', fix: 'Order from the strictest condition (`>= 80` first) or make non-overlapping ranges.' },
      { wrong: 'if N > 0 ... elif N < 0 ... (no else, then relying on N = 0)', why: 'The case N = 0 is not handled: not complete.', fix: 'Add `else:` for the remaining cases.' },
      { wrong: 'if x == 1:\n    ...\nif x == 2:\n    ...  # but you meant to pick one', why: 'A row of `if`s is not a chain; all of them are tested.', fix: 'Use `elif`.' },
    ],
    decks: ['D05', 'D02'],
    refs: [...r(D05, 12, 14, 21, 22, 23), ...r(D02, 12)],
  },

  /* ============================ D05 : repetition ============================ */
  {
    id: 'for-range',
    title: 'for … in range(hmin, hmax+1)',
    rule: 'Repeats for i = hmin, hmin+1, …, hmax. The upper bound of `range` is NOT processed, so write hmax+1 for hmax to be processed. To repeat N times from 0: `range(N)`.',
    python: `# Initialization-action
for i in range(hmin, hmax+1):
    action
# Termination`,
    pseudo: `Initialization-action
i traversal [hmin..hmax]
    action
Termination`,
    flow: 'Loop symbol: `i ← hmin`, diamond `i <= hmax`; true → action → `i ← i + 1` back to the test; false → exit to Termination.',
    example: { code: `N = int(input())
sum = 0
for i in range(1, N+1):
    print(i)
    sum = sum + i
print(sum)
print(i)`, stdin: ['5'], note: 'After the loop, i equals N (= hmax) in Python; it does NOT become hmax+1 as the D05 slide claims.' },
    slips: [
      { wrong: 'for i in range(1, N):  # for 1..N', why: 'The upper bound is excluded: it only reaches N−1 (off-by-one).', fix: '`range(1, N+1)`.' },
      { wrong: 'for i in range(N):  # for 1..N', why: '`range(N)` produces 0..N−1, not 1..N.', fix: '`range(1, N+1)`.' },
      { wrong: 'sum = 0 inside the loop', why: 'The accumulator is reset every iteration; the final result is only the last element.', fix: 'Initialize before the loop.' },
      { wrong: 'for i in range(1, N+1)\n    ...', why: 'The `:` is missing (SyntaxError).', fix: 'Add `:`.' },
    ],
    decks: ['D05', 'D06'],
    refs: r(D05, 34, 36, 37, 38, 45, 46),
  },
  {
    id: 'for-backward',
    title: 'Counting down: range(hmax, hmin-1, -1)',
    rule: 'Repeats i = hmax, hmax−1, …, hmin. The step is −1 and the lower bound is written hmin−1 (the bound is excluded).',
    python: `for i in range(hmax, hmin-1, -1):
    action`,
    pseudo: `i traversal [hmax..hmin]
    action`,
    flow: 'Like the for loop, but `i ← hmax`, the test is `i >= hmin`, and the update is `i ← i − 1`.',
    example: { code: `for i in range(5, 0, -1):
    print(i)`, note: 'hmax = 5, hmin = 1 → range(5, 0, -1) = 5, 4, 3, 2, 1.' },
    slips: [
      { wrong: 'for i in range(5, 1, -1):  # want 5..1', why: '1 is not included because the lower bound (hmin−1 = 0) was written wrongly.', fix: '`range(5, 0, -1)`.' },
      { wrong: 'for i in range(5, 1):', why: 'Without a negative step the range is empty: no iterations.', fix: 'Add `-1` as the step.' },
      { wrong: 'for i in range(0, 5, -1)', why: 'A negative step with start < stop is also empty.', fix: 'The start must be hmax: `range(4, -1, -1)`.' },
    ],
    decks: ['D05'],
    refs: r(D05, 39),
  },
  {
    id: 'while',
    title: 'while (First-Element … Next-Element)',
    rule: 'Repeats while the condition is True. The skeleton: Initialization → First-Element → `while (condition):` action → Next-Element. Without a Next-Element (changing the condition variable) the loop never stops. The body may not run at all (empty case).',
    python: `# Initialization-action
# First-Element
while (repeat_condition):
    action
    # Next-Element
# repeat_condition = False
# Termination`,
    pseudo: `Initialization-action
First-Element
while (repeat-condition) do
    action
    Next-Element
{ repeat-condition = false }
Termination`,
    flow: 'Diamond test at the top. true → action → Next-Element → back to the test (loop-back arrow); false → exit to Termination.',
    example: { code: `N = int(input())
sum = 0
i = 1                # First-Element
while (i <= N):
    print(i)
    sum = sum + i
    i = i + 1        # Next-Element
print(sum)
print(i)`, stdin: ['5'], note: 'After the loop stops, i = N+1: different from for, because the Next-Element is run manually.' },
    slips: [
      { wrong: 'while (i <= N):\n    sum = sum + i  # forgot i = i + 1', why: 'The condition never changes → the loop never ends (the program is stopped for exceeding the step limit).', fix: 'Add the Next-Element at the end of the body.' },
      { wrong: 'i = 1 inside the while', why: 'The First-Element is placed in the loop: i always goes back to 1.', fix: 'Put it before the `while`.' },
      { wrong: 'while (i < N):  # for 1..N', why: 'Off-by-one: N is not processed.', fix: '`while (i <= N):`' },
      { wrong: 'for used although the number of repeats is unknown', why: '`for` fits when the repeat count is known. When it depends on data (search, sentinel), use `while`.', fix: 'Choose `while` + Next-Element.' },
    ],
    decks: ['D05', 'D06'],
    refs: [...r(D05, 34, 40, 41, 42, 46), ...r(D02, 18)],
  },
  {
    id: 'sentinel',
    title: 'Sentinel: stop at a marker value',
    rule: 'Read the first element OUTSIDE the loop, `while (X != marker):` process X, then read the next element AT THE END of the body. The marker (e.g. −999) is not processed. After the loop, check the empty case (count = 0).',
    python: `X = int(input())          # First-Element
while (X != -999):
    count = count + 1
    sum = sum + X
    X = int(input())      # Next-Element
# X = -999
if (count > 0):
    ...`,
    pseudo: `input(X)                  { First-Elmt }
while (X ≠ -999) do
    count ← count + 1
    sum ← sum + X
    input(X)              { Next-Elmt }
{ X = -999 }`,
    flow: 'First input before the diamond `X ≠ -999`; true → process + next input → back to the test; false → exit to Termination (check count > 0).',
    example: { code: `sum = 0
count = 0
X = int(input())
while (X != -999):
    count = count + 1
    sum = sum + X
    X = int(input())
if (count > 0):
    avg = sum / count
    print("Number of numbers = " + str(count))
    print("Total number = " + str(sum))
    print("Average = " + str(avg))
else:
    print("No data processed")`, stdin: ['-1', '12', '-6', '10', '2', '-999'], note: '-999 is not counted. If the first input is -999: "No data processed".' },
    slips: [
      { wrong: 'while (X != -999):\n    X = int(input())\n    sum = sum + X', why: 'Reading first and processing after: −999 gets added (the sentinel is counted) and the first element is skipped.', fix: 'Read the first one outside the loop; read the next one at the end of the body.' },
      { wrong: 'avg = sum / count without checking count', why: 'With no data, count = 0 → ZeroDivisionError.', fix: '`if (count > 0): ...  else: print("No data processed")`' },
      { wrong: 'print("Average = " + str(rata))  # slide D05', why: 'The variable that was assigned is `avg`, not `rata`: NameError. An error in the D05 slide.', fix: 'Use the same name: `str(avg)`.' },
      { wrong: 'for used to read until a sentinel', why: 'The amount of data is unknown; `for` does not fit.', fix: 'Use `while`.' },
    ],
    decks: ['D05'],
    refs: r(D05, 47, 48, 49, 50, 51),
  },

  /* ============================ D06 : array ============================ */
  {
    id: 'list-init',
    title: 'Array (list): creating and filling',
    rule: 'An array is a collection of elements of the same type, indexed 0 to N−1. Create it with `[0 for i in range(N)]` (N elements with initial value 0) or write it directly `[9, 8, 7]`. Fill it with a loop `for i in range(0, N)`.',
    python: `TabInt = [0 for i in range(10)]
T = [9, 8, 7, 6]
for i in range(0, 10):
    TabInt[i] = int(input())`,
    pseudo: `TabInt : array [0..9] of integer
i traversal [0..9]
    input(TabInt[i])`,
    flow: 'Loop with `i ← 0`, test `i < 10`, action `input(TabInt[i])`, `i ← i + 1`. Array elements are accessed by index.',
    example: { code: `N = 5
T = [0 for i in range(N)]
for i in range(0, N):
    T[i] = int(input())
print(T)
print(len(T))`, stdin: ['4', '1', '3', '4', '5'], note: 'Indices 0..4; N = 5 elements.' },
    slips: [
      { wrong: 'T = [0 for i in range(1, N)]', why: 'Only N−1 elements (indices 1..N−1 are counted as iterations).', fix: '`range(N)` or `range(0, N)`.' },
      { wrong: 'T = []\nT[0] = int(input())', why: 'An empty list has no index 0: IndexError.', fix: 'Create it first with `[0 for i in range(N)]`.' },
      { wrong: 'for i in range(1, N+1):\n    T[i] = ...', why: 'Index N does not exist (IndexError: list assignment index out of range).', fix: '`range(0, N)`: the last index is N−1.' },
    ],
    decks: ['D06'],
    refs: r(D06, 6, 7, 9, 10, 17, 18),
  },
  {
    id: 'list-index',
    title: 'Accessing elements: T[i]',
    rule: '`T[i]` reads/changes the element at index i. Valid indices: 0 to N−1. Anything outside raises an IndexError. Sequential processing = a loop with `i` from 0 to N−1.',
    python: `print(T[5])
x = T[1] + T[6]
T[9] = 9
for i in range(0, N):
    sum = sum + T[i]`,
    pseudo: `T[5]
i traversal [0..N-1]
    sum ← sum + T[i]`,
    flow: 'In a process symbol: `sum ← sum + T[i]`. The loop runs with i up to i < N.',
    example: { code: `T = [1, 2, 4, -1, 100, 2, 0, -1, 3, 9]
print(T[5])
x = T[1] + T[6]
print(x)
T[9] = 9
print(T[9])
print(len(T))`, note: 'Valid indices are 0..9. `T[10]` raises an IndexError.' },
    slips: [
      { wrong: 'T[10]  # array of 10 elements', why: 'The last index is 9 (IndexError: list index out of range).', fix: 'Loop upper bound `range(0, N)`.' },
      { wrong: 'max = 0   # to find the maximum', why: 'If all elements are negative, 0 is taken as the maximum (wrong).', fix: '`max = T[0]` then start from index 1.' },
      { wrong: 'for i in range(1, N):  # for all elements', why: 'Element T[0] is skipped.', fix: '`range(0, N)` (unless you start at 1 on purpose because T[0] is already the initial value).' },
      { wrong: 'T[-1] treated as "undefined" (slide D06)', why: 'In Python `T[-1]` is valid = the last element. But in exam questions, treat only 0..N−1 as valid indices and do not use negative indices.', fix: 'Use `T[N-1]`.' },
    ],
    decks: ['D06'],
    refs: r(D06, 12, 14, 16, 21, 27, 28),
  },

  /* ============================ D10 : subprogram ============================ */
  {
    id: 'def-function',
    title: 'Defining a function',
    rule: '`def Name(param):` + specification as a comment + (LOCAL DECLARATIONS) + an ALGORITHM that ends with `return value`. A function produces ONE value of a clear type; it is called as part of an expression.',
    python: `def Square(X):
    # returns the square of X
    # LOCAL DECLARATIONS
    # result : int
    # ALGORITHM
    result = X * X
    return result`,
    pseudo: `function Square(X : integer) → integer
{ returns the square of X }
LOCAL DECLARATIONS
    result : integer
ALGORITHM
    result ← X * X
    → result`,
    flow: 'A separate flowchart: a terminator named `Square(X)`, the steps, then a terminator `return (result)`. The caller uses the subprogram call symbol.',
    example: { code: `def Max2(A, B):
    # returns the larger of A and B
    if (A >= B):
        return A
    else:  # A < B
        return B

print(Max2(45, 50))
print(Max2(7, 3) + 10)`, note: 'Max2 can be called directly inside an expression: Max2(7, 3) + 10 = 17.' },
    slips: [
      { wrong: 'def Square(X)\n    return X * X', why: 'The `:` is missing on the def line (SyntaxError).', fix: '`def Square(X):`' },
      { wrong: 'def Square(X):\n    result = X * X  # no return', why: 'Without `return` the result is None; `Square(5) + 10` → TypeError.', fix: 'Add `return result`.' },
      { wrong: 'def Square(X):\n    print(X * X)', why: 'print only displays; the value is not returned to the caller.', fix: '`return X * X`.' },
      { wrong: 'def Max2 ... but never called in the main program', why: 'A definition only creates the function; without a call nothing happens and there is no output.', fix: 'Call it from the main program: `print(Max2(a, b))`.' },
    ],
    decks: ['D10'],
    refs: r(D10, 9, 13, 15, 16, 18, 19, 20),
  },
  {
    id: 'def-procedure',
    title: 'Defining a procedure',
    rule: 'A procedure = a subprogram with no result value: in Python a `def` that ends with a bare `return` (or no return). It is called as a statement of its own, not inside an expression.',
    python: `def PrintName(name):
    # prints Hello + name
    print("Hello, " + name + "!!")
    return`,
    pseudo: `procedure PrintName(input name : string)
{ prints "Hello" + name }
ALGORITHM
    output("Hello, ", name)`,
    flow: 'A separate flowchart with the procedure name in the start terminator and a `return` without a value at the end; the caller uses the subprogram symbol (rectangle with double lines).',
    example: { code: `def PrintName(name):
    print("Hello, " + name + "!!")
    return

PrintName("Budi")
x = PrintName("Ani")
print(x)`, note: 'A procedure returns None, so `x = PrintName(...)` is useless.' },
    slips: [
      { wrong: 'result = PrintName("Budi") + 1', why: 'A procedure produces no value (None): TypeError when used inside an expression.', fix: 'Call it as a statement: `PrintName("Budi")`.' },
      { wrong: 'return "Hello"  # then expecting it to print', why: 'return does not print.', fix: 'Use print inside the procedure, or print the function result in the caller.' },
      { wrong: 'PrintName  # without parentheses', why: 'Without `()` the procedure is not called.', fix: '`PrintName("Budi")`.' },
    ],
    decks: ['D10'],
    refs: r(D10, 28, 29, 30, 31),
  },
  {
    id: 'return',
    title: 'return',
    rule: '`return value` ends the function and hands the value to the caller; lines after it are not run. Every execution path of a function must reach a `return`. A bare `return` = procedure.',
    python: `def Max2(A, B):
    if (A >= B):
        return A
    else:
        return B`,
    pseudo: `if (A ≥ B) then
    → A
else
    → B`,
    flow: 'A `return (value)` terminator at the end of the function flowchart (every branch ends in a return).',
    example: { code: `def Pick(x):
    if (x > 0):
        return "positive"
    return "not positive"
    print("never reached")

print(Pick(3))
print(Pick(-2))`, note: 'Lines after return are not executed.' },
    slips: [
      { wrong: 'def f(x):\n    if x > 0:\n        r = 1\n    return r', why: 'If x ≤ 0, r is never assigned: UnboundLocalError.', fix: 'Assign in every branch (`else: r = 0`) or initialize before the if.' },
      { wrong: 'def f(x):\n    x + 1', why: 'It computes without storing/returning; the result is None.', fix: '`return x + 1`.' },
      { wrong: 'for ...:\n    return T[i]  # return inside a loop with no condition', why: 'The function stops at the first iteration.', fix: 'Return after the loop (e.g. `return max`).' },
    ],
    decks: ['D10'],
    refs: r(D10, 16, 18, 20, 28),
  },
  {
    id: 'call',
    title: 'Calling a subprogram',
    rule: 'The name must match; the number and types of arguments must match the parameters one to one; a function is called as an expression, a procedure as a statement of its own. Variables inside a subprogram are local.',
    python: `result = Square(y)        # function: part of an expression
PrintName(name)           # procedure: a statement of its own`,
    pseudo: `result ← Square(y)
PrintName(name)`,
    flow: 'A rectangle with double vertical lines on the left and right (predefined process) containing the call; the returned value is used in the next step.',
    example: { code: `def Square(x):
    return x * x

y = int(input())
result = Square(y)
print("The square of " + str(y) + " = " + str(result))`, stdin: ['6'], note: 'y is the actual argument, x the formal parameter; both are int.' },
    slips: [
      { wrong: 'Square()', why: 'Missing argument: TypeError (missing 1 required positional argument).', fix: 'Give all arguments: `Square(y)`.' },
      { wrong: 'Max2(1, 2, 3)', why: 'Too many arguments: TypeError (takes 2 positional arguments but 3 were given).', fix: 'Match the number of parameters, or use Max3.' },
      { wrong: 'def f():\n    s = s + 1  # s defined outside the function', why: 'Inside a function, assigning to s makes it local; reading it before it is assigned: UnboundLocalError.', fix: 'Pass it as a parameter and return the result: `s = f(s)`.' },
      { wrong: 'print(Square)  # without arguments', why: 'That prints the function object, not the result of a call.', fix: '`print(Square(5))`.' },
    ],
    decks: ['D10'],
    refs: r(D10, 9, 22, 23, 25, 30, 31),
  },
  {
    id: 'math-import',
    title: 'The math library',
    rule: 'Standard functions such as `sqrt`, `sin`, `cos`, `pow` live in the `math` library. Write `from math import *` at the start of the program, before using them.',
    python: `from math import *
print(sqrt(16))`,
    pseudo: `{ sqrt(x) is available as a standard function }`,
    flow: 'A call to a standard function is drawn as a process/subprogram symbol: `r ← sqrt(N)`.',
    example: { code: `from math import *
N = float(input())
print("Square root of " + str(N) + " = " + str(sqrt(N)))`, stdin: ['4'], note: 'sqrt always returns a float: 2.0.' },
    slips: [
      { wrong: 'print(sqrt(16))  # without import', why: '`sqrt` is not known yet: NameError.', fix: 'Add `from math import *` on the first line.' },
      { wrong: 'sqrt(-1)', why: 'The root of a negative number is undefined: ValueError (math domain error).', fix: 'Make sure the argument is ≥ 0.' },
      { wrong: 'x = 2^3', why: '`^` is not power.', fix: '`2 ** 3` or `pow(2, 3)`.' },
    ],
    decks: ['D10'],
    refs: r(D10, 32, 33),
  },
]

export const SYNTAX_BY_ID = new Map<SyntaxId, SyntaxCard>(SYNTAX.map((c) => [c.id, c]))

/** Compact Python ⇄ pseudocode ⇄ flowchart cheat table (rendered by pages/Syntax.tsx). */
export interface CheatRow { what: string; python: string; pseudo: string; flow: string; id?: SyntaxId }
export const CHEAT: CheatRow[] = [
  { what: 'Start / end', python: '# ALGORITHM … (end of file)', pseudo: 'ALGORITHM … ', flow: 'Oval: Start / End', id: 'program-template' },
  { what: 'Assignment', python: 'x = x + 1', pseudo: 'x ← x + 1', flow: 'Rectangle', id: 'assign' },
  { what: 'Input', python: 'x = int(input())', pseudo: 'input(x)', flow: 'Parallelogram', id: 'input' },
  { what: 'Output', python: 'print("T: " + str(x))', pseudo: 'output("T: ", x)', flow: 'Parallelogram', id: 'print-str' },
  { what: 'Integer division / remainder', python: 'a // b    a % b', pseudo: 'a div b    a mod b', flow: 'inside a process / condition', id: 'operators' },
  { what: 'Comparison', python: '==  !=  >=  <=', pseudo: '=  ≠  ≥  ≤', flow: 'Diamond', id: 'relational-logical' },
  { what: 'Logic', python: 'and  or  not', pseudo: 'and  or  not', flow: 'Diamond', id: 'relational-logical' },
  { what: 'if', python: 'if (k):', pseudo: 'if (k) then', flow: 'Diamond, true/false arrows', id: 'if' },
  { what: 'if–else', python: 'if (k):  …  else:', pseudo: 'if (k) then … else …', flow: 'Diamond, two branches merge', id: 'if-else' },
  { what: 'Many cases', python: 'if … elif … else', pseudo: 'if … else if … else …', flow: 'Chained diamonds', id: 'if-elif' },
  { what: 'Counting loop', python: 'for i in range(a, b+1):', pseudo: 'i traversal [a..b]', flow: 'i ← a; i <= b; i ← i + 1', id: 'for-range' },
  { what: 'Backward loop', python: 'for i in range(b, a-1, -1):', pseudo: 'i traversal [b..a]', flow: 'i ← b; i >= a; i ← i − 1', id: 'for-backward' },
  { what: 'Condition loop', python: 'while (k):  … Next-Element', pseudo: 'while (k) do … ', flow: 'Diamond + loop-back arrow', id: 'while' },
  { what: 'Repeat–until', python: 'while True:  … if (k): break', pseudo: 'repeat … until (k)', flow: 'Test at the bottom, arrow back to the top', id: 'while' },
  { what: 'Array', python: 'T = [0 for i in range(N)]', pseudo: 'T : array [0..N-1] of int', flow: 'Loop with T[i]', id: 'list-init' },
  { what: 'Array element', python: 'T[i]  (0..N-1)', pseudo: 'T[i]', flow: 'inside a process', id: 'list-index' },
  { what: 'Function', python: 'def F(x):  … return v', pseudo: 'function F(x) → v', flow: 'Separate flowchart + return', id: 'def-function' },
  { what: 'Procedure', python: 'def P(x):  … return', pseudo: 'procedure P(input x)', flow: 'Separate flowchart', id: 'def-procedure' },
  { what: 'Call', python: 'y = F(x)   P(x)', pseudo: 'y ← F(x)   P(x)', flow: 'Double-line rectangle', id: 'call' },
  { what: 'Library', python: 'from math import *', pseudo: 'sqrt(x)', flow: 'process', id: 'math-import' },
]
