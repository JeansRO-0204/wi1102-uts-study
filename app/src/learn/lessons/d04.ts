import type { Lesson } from '../types'
const r = String.raw
const D04 = 'D04_BasicStructure'

export const lesson: Lesson = {
  deck: 'D04',
  title: 'Basic Structure of a Procedural Program (Python)',
  summary: 'Every UTS program starts here: the title / DECLARATIONS / ALGORITHM template, variables and types, assignment, input with conversion, output with str(), operators, and the Input-Process-Output habit. Get these right and the later decks only add if/loops on top.',
  minutes: 40,
  goals: [
    'Write a program in the course template: title + specification, DECLARATIONS as comments, then ALGORITHM.',
    'Choose the right type for a variable and convert input with int() / float(); join text and numbers with str().',
    'Evaluate expressions with / // % ** and, or, not by hand, including precedence, without slipping on int vs float.',
    'Turn a word problem into Input, Process, Output and write it as Python, pseudocode and a flowchart.',
  ],
  examAngle: 'D04 is the foundation of the "program" archetype: the easiest UTS problems are a pure Input-Process-Output formula (Pythagoras, sphere volume, marbles, electricity bill, time conversion) where the marks go to correct int()/float() conversion, correct arithmetic, and a clean template. The concept part (Bagian I) likes O/X statements on operators, `//` vs `/`, and string concatenation. Expect one or two of these on every paper.',
  sections: [
    {
      id: 'program-structure',
      title: 'Program structure and comments',
      blocks: [
        { t: 'text', refs: [{ src: D04, page: 4 }, { src: D04, page: 5 }, { src: D04, page: 13 }], md:
          'A procedural program in this course has three parts, always in this order:\n\n' +
          '| Part | What goes there | In Python |\n|---|---|---|\n' +
          '| **Title + specification** | the program name and what it computes | `# Program Name` and `# Specification: ...` |\n' +
          '| **DECLARATIONS** (KAMUS) | the names and types of variables and constants | written as **comments**: `# A : int` |\n' +
          '| **ALGORITHM** (ALGORITMA) | the real instructions | ordinary code |\n\n' +
          'Python does not need declarations, but we write them as comments anyway: they document the type of each variable, and the exam paper grades them.' },
        { t: 'code', caption: 'My first program (slide 6) and the same shape in pseudocode and flowchart.',
          python: r`# Program HelloWorld
# Print Hello, World! to the screen

# DECLARATIONS
# not needed yet

# ALGORITHM
print('Hello, World!')`,
          pseudo: r`Program HelloWorld
{ Print Hello, World! to the screen }
KAMUS
  { not needed yet }
ALGORITMA
  output('Hello, World!')`,
          flow: { blocks: [{ t: 'io', dir: 'out', text: "output('Hello, World!')" }] },
          notes: [
            { line: 1, note: 'Title line. Starts with `#`, so Python ignores it.' },
            { line: 2, note: 'Specification: one sentence saying what the program does.' },
            { line: 4, note: 'DECLARATIONS are only comments in Python.' },
            { line: 7, note: '`print` is the output command. Text goes in quotes.' },
          ] },
        { t: 'text', refs: [{ src: D04, page: 7 }, { src: D04, page: 11 }, { src: D04, page: 12 }], md:
          'Almost every beginner program has the shape **Input, Process, Output**. Here is slide 11/12: add A and B, then print both.' },
        { t: 'code', caption: 'Input, Process, Output (slides 7, 11, 12). Inputs 3 and 4.',
          stdin: ['3', '4'],
          python: r`# Program Test
# Specification: Calculate value of A and B

# DECLARATIONS
# A : int
# B : int

# ALGORITHM
A = int(input())    # input
B = int(input())
A = A + B           # process
print(A)            # output
print(B)`,
          pseudo: r`Program Test
{ Calculate A + B }
KAMUS
  A, B : integer
ALGORITMA
  input(A)
  input(B)
  A ← A + B
  output(A)
  output(B)`,
          flow: { blocks: [
            { t: 'io', dir: 'in', text: 'input(A)' },
            { t: 'io', dir: 'in', text: 'input(B)' },
            { t: 'process', text: 'A ← A + B' },
            { t: 'io', dir: 'out', text: 'output(A)' },
            { t: 'io', dir: 'out', text: 'output(B)' },
          ] },
          notes: [
            { line: 9, note: 'Input: read A. `int(...)` because the declaration says `int`.' },
            { line: 11, note: 'Process: the old A is replaced by A + B (3 + 4 = 7).' },
            { line: 12, note: 'Output: prints 7.' },
            { line: 13, note: 'B was never changed, so it still prints 4.' },
          ] },
        { t: 'key', md: '**Comments.** `#` starts a comment that runs to the end of the line. It is not executed. In pseudocode a comment is written `{ like this }`. `//` is **not** a comment in Python (it is integer division).' },
        { t: 'syntax', ids: ['program-template', 'comment'] },
        { t: 'question', id: 'd04-sum-a', note: 'Fill the table of A and B line by line.' },
      ],
    },
    {
      id: 'data-types-variables',
      title: 'Data, types, and variable names',
      blocks: [
        { t: 'text', refs: [{ src: D04, page: 15 }, { src: D04, page: 17 }, { src: D04, page: 19 }, { src: D04, page: 20 }], md:
          '**Data abstraction** means reading a number in context: 90 could be a water temperature, a body weight or a vehicle speed. Each kind of data has an allowed set of values, called its **data type**.\n\n' +
          '| Python type | Values | Examples |\n|---|---|---|\n' +
          '| `bool` | `True`, `False` | `True` |\n' +
          '| `int` | whole numbers | `1`, `-144`, `0` |\n' +
          '| `float` | real numbers | `3.14`, `4.01E+1` |\n' +
          '| char | one character, in quotes | `\'A\'`, `\'#\'` |\n' +
          '| `str` | sequence of characters, single or double quotes | `"Jakarta"` |\n\n' +
          'Choose the type from the meaning: Age is `int`, City is `str`, Temperature and Area are `float` (they can have decimals). A student number like 15812001 is a judgement call; it is an identifier, not something you add up.' },
        { t: 'text', refs: [{ src: D04, page: 21 }, { src: D04, page: 23 }], md:
          'A **variable** is a named place that holds one value of a declared type. Declare it in DECLARATIONS (name and type), give it a value in ALGORITHM.\n\n' +
          '**Rules for a valid name:** start with a letter (or `_`), then letters, digits and `_` only, no spaces. Python is **case sensitive**: `Weight` and `weight` are different variables. Pick meaningful names: `sum` should hold a number, never a string.' },
        { t: 'predict', prompt: 'Two names that differ only in case. What is printed?', code: r`weight = 60
Weight = 75
weight = weight + 5
print(weight)
print(Weight)`,
          explain: '`weight` and `Weight` are two separate variables. Only `weight` is changed to 65; `Weight` stays 75.' },
        { t: 'quiz', q: 'Which of these are valid variable names? Tick all that apply.',
          options: ['total_price', '2nd_value', 'Total Price', 'x1', 'sum-of-n'],
          correct: [0, 3],
          why: ['Letters and underscore: valid.', 'Starts with a digit: invalid.', 'Contains a space: invalid.', 'Starts with a letter, then a digit: valid.', 'The `-` is the minus operator, not allowed in a name.'] },
        { t: 'question', id: 'd04-names-a', note: 'The slide-exercise version of the same idea.' },
        { t: 'trap', md: '**Strong, dynamic typing.** Python lets a variable change type when you assign again (`x = 5` then `x = "five"`), but you can never mix types in one operation (`"5" + 3` is a TypeError). In the exam, keep each variable to its declared type.' },
      ],
    },
    {
      id: 'assignment',
      title: 'Assignment',
      blocks: [
        { t: 'text', refs: [{ src: D04, page: 25 }, { src: D04, page: 26 }], md:
          'Assignment has the form `<left-hand side> = <right-hand side>`.\n\n' +
          '- The **left** side must be a variable.\n- The **right** side can be a value, another variable, or an expression (whose variables already have values).\n\n' +
          'It is **not** an equation. The right side is evaluated first, and the result is stored in the left variable, replacing whatever was there. In pseudocode the arrow is `←`.' },
        { t: 'predict', prompt: 'Read slowly: the right side uses the OLD value.', code: r`a = 4
b = 9
a = a + b
b = a - b
print(a, b)`,
          explain: 'a becomes 4 + 9 = 13. Then b = 13 - 9 = 4 (the new a, the old b). Output "13 4".' },
        { t: 'predict', prompt: 'Does this swap a and b?', code: r`a = 3
b = 8
a = b
b = a
print(a, b)`,
          explain: 'No. After `a = b`, a is 8 and the old 3 is gone, so `b = a` copies 8 again: both are 8. A real swap needs a third variable (`t = a; a = b; b = t`).' },
        { t: 'text', refs: [{ src: D04, page: 37 }], md:
          '**Shorthand:** `a += b` means `a = a + b`; the same works for `-=  *=  /=  %=`. A type must match what the variable declares: assigning a `float` value to an `int` variable, or text to a `bool`, breaks the declaration.' },
        { t: 'question', id: 'd04-assign-types-a', note: 'Which of the ten assignments break the declared types?' },
        { t: 'trap', md: '`=` is assignment, `==` is comparison. Writing `x == 5` as a statement does nothing; writing `if (x = 5)` is a syntax error.' },
      ],
    },
    {
      id: 'input-output',
      title: 'Input, type conversion and output',
      blocks: [
        { t: 'text', refs: [{ src: D04, page: 27 }, { src: D04, page: 28 }], md:
          '`input()` reads a line from the keyboard and **always returns a string**, even if the user types digits. If the variable is a number, convert it straight away:\n\n' +
          '| Declared type | Read with |\n|---|---|\n| `str` | `A = input()` |\n| `int` | `C = int(input())` |\n| `float` | `D = float(input())` |\n\n' +
          'Other conversions: `str(x)` (to text), `chr(n)` (code to character), `ord(c)` (character to code). The pseudocode `input(x)` hides the conversion; the declared type of `x` decides it.' },
        { t: 'predict', prompt: 'The user types 5 then 3.', stdin: ['5', '3'], code: r`a = input()
b = input()
print(a + b)
print(int(a) + int(b))`,
          explain: 'Without conversion, `a` and `b` are strings and `+` joins them: "53". After `int(...)` they add: 8.' },
        { t: 'text', refs: [{ src: D04, page: 29 }], md:
          '`print(...)` writes a value to the screen. To join text and a number into one message, convert the number with `str()` and use `+` (**string concatenation**). With commas, `print("Total", 7)` prints with a space and needs no conversion; with `+` you must add the space yourself.' },
        { t: 'code', caption: 'Output with str(). Input 3.', stdin: ['3'],
          python: r`# DECLARATIONS
# a : int
# ALGORITHM
a = int(input())
print("Hello World! " + str(a))
print("Double = " + str(a * 2))
print(a * 4)`,
          pseudo: r`KAMUS
  a : integer
ALGORITMA
  input(a)
  output("Hello World! " + str(a))
  output("Double = " + str(a * 2))
  output(a * 4)`,
          flow: { blocks: [
            { t: 'io', dir: 'in', text: 'input(a)' },
            { t: 'io', dir: 'out', text: 'output("Hello World! " + str(a))' },
            { t: 'io', dir: 'out', text: 'output("Double = " + str(a * 2))' },
            { t: 'io', dir: 'out', text: 'output(a * 4)' },
          ] },
          notes: [
            { line: 4, note: 'Input converted to `int` because `a` is declared `int`.' },
            { line: 5, note: '`str(a)` turns 3 into "3" so `+` can join it to the text.' },
            { line: 7, note: 'A pure number needs no `str()`: `print` handles it.' },
          ] },
        { t: 'trap', md: '**Forgetting `str()`.** `print("Total: " + total)` with an int `total` crashes with a TypeError. Use `str(total)`, or a comma: `print("Total:", total)`.' },
        { t: 'trap', md: '**`int()` on decimal input.** `int(input())` on "3.5" raises a ValueError. If the value may have decimals (price, height, radius), read it with `float(input())`.' },
        { t: 'question', id: 'd04-input-str-a', note: 'The user types 5: what do the two prints show?' },
        { t: 'question', id: 'd04-print-str-a', note: 'Find the line that crashes.' },
        { t: 'syntax', ids: ['input', 'type-conversion', 'print-str'] },
      ],
    },
    {
      id: 'arithmetic',
      title: 'Arithmetic operators and int vs float',
      blocks: [
        { t: 'text', refs: [{ src: D04, page: 32 }, { src: D04, page: 33 }, { src: D04, page: 34 }], md:
          'An **expression** combines values, variables and operators and yields a value; its type depends on the operand types. With `a = 10`, `b = 21`:\n\n' +
          '| Operator | Meaning | Example | Result |\n|---|---|---|---|\n' +
          '| `+` `-` `*` | add, subtract, multiply | `a * b` | 210 |\n' +
          '| `/` | **real** division (always a float) | `b / a` | 2.1 |\n' +
          '| `//` | **integer** division (rounds down) | `b // a` | 2 |\n' +
          '| `%` | modulo: remainder of integer division | `b % a` | 1 |\n' +
          '| `**` | power | `2 ** 10` | 1024 |\n\n' +
          '`//` and `%` go together: `b == (b // a) * a + b % a`. Typical uses: `n % 2 == 0` (is it even?), `n % 10` (last digit), `n // 10` (drop last digit), seconds to minutes and seconds.' },
        { t: 'predict', prompt: 'int vs float division.', code: r`print(7 / 2)
print(7 // 2)
print(7 % 2)
print(8 / 2)
print(2 ** 3)`,
          explain: '`/` always gives a float, even when the result is whole: 8 / 2 is 4.0, not 4. `//` drops the fraction (3) and `%` is the remainder (1).' },
        { t: 'predict', prompt: 'Negative numbers: `//` rounds DOWN, not toward zero.', code: r`print(-7 // 2)
print(-7 % 3)
print(7 // -2)`,
          explain: '`//` is floor division: -3.5 rounds down to -4, and 7 // -2 is also -4. The remainder follows the divisor: -7 % 3 is 2, because -7 = 3 * (-3) + 2.' },
        { t: 'predict', prompt: 'Seconds to hours, minutes, seconds.', code: r`t = 6330
h = t // 3600
m = (t % 3600) // 60
s = t % 60
print(h, m, s)`,
          explain: '6330 // 3600 = 1 hour. The remainder 2730 holds 45 whole minutes, and 6330 % 60 = 30 seconds. `//` and `%` split a quantity into units.' },
        { t: 'trap', md: '**Integer vs real division in averages.** `(a + b) / 2` is right for the average. `(a + b) // 2` throws the fraction away. And `a/b` works fine in Python 3 even with ints, but `//` is the one you pick only when you really want a whole number.' },
        { t: 'question', id: 'd04-arith-a', note: 'Evaluate each operator by hand.' },
        { t: 'question', id: 'd04-arith-b', note: 'Floor division and modulo with negatives.' },
        { t: 'syntax', ids: ['operators'] },
      ],
    },
    {
      id: 'relational-logical',
      title: 'Relational, logical operators and precedence',
      blocks: [
        { t: 'text', refs: [{ src: D04, page: 35 }, { src: D04, page: 36 }], md:
          '**Relational operators** compare two values and give a `bool`: `==  !=  >  <  >=  <=`. (Avoid `==` on floats: 0.1 + 0.2 is not exactly 0.3.)\n\n' +
          '**Logical operators** combine bools:\n\n' +
          '| a | b | `a and b` | `a or b` | `not a` |\n|---|---|---|---|---|\n' +
          '| True | True | True | True | False |\n| True | False | False | **True** | False |\n| False | True | False | True | True |\n| False | False | False | False | True |\n\n' +
          '`and` needs both True; `or` needs at least one True; `not` flips.' },
        { t: 'trap', md: '**Slide erratum (page 36).** The slide says `(a or b)` equals False when a = True and b = False. That is wrong: `True or False` is **True**. Only `False or False` is False. Run it yourself below.' },
        { t: 'predict', prompt: 'Check the slide against Python.', code: r`a = True
b = False
print(a and b)
print(a or b)
print(not a)
print(not (a and b))`,
          explain: 'False, True, False, True. `a or b` is True because a is True; the slide has it wrong.' },
        { t: 'question', id: 'd04-arith-e', note: 'The erratum, as a question.' },
        { t: 'text', md:
          '**Precedence** (high to low): `**`, then unary `-`, then `* / // %`, then `+ -`, then relational `== != < > <= >=`, then `not`, then `and`, then `or`. Equal-precedence operators go left to right (except `**`). Use parentheses whenever you are not sure; they cost nothing.' },
        { t: 'predict', prompt: 'Precedence of arithmetic.', code: r`print(2 + 3 * 4)
print((2 + 3) * 4)
print(2 ** 3 ** 2)
print(10 - 4 - 3)
print(20 / 4 * 5)
print(-3 ** 2)`,
          explain: '14 (`*` before `+`), 20, 512 (`**` goes right to left: 3**2 = 9, then 2**9), 3 (left to right), 25.0 (20/4 = 5.0, times 5), and -9 (`**` binds tighter than the unary minus).' },
        { t: 'predict', prompt: '`not` > `and` > `or`.', code: r`x = 7
print(x > 5 or x < 0 and x == 3)
print((x > 5 or x < 0) and x == 3)
print(not x > 5)
print(x % 2 == 1 and x // 2 == 3)`,
          explain: '`and` binds tighter than `or`, so the first line is True or (False and False) = True; with parentheses the second becomes True and False = False. `not x > 5` is not (x > 5) = False. The last: 7 % 2 == 1 and 7 // 2 == 3, both True.' },
        { t: 'quiz', q: 'For x = 12, which expressions are True? Tick all that apply.',
          options: ['x % 4 == 0', 'x // 5 == 2.4', 'x > 10 and x < 12', 'not (x == 12) or x != 11', 'x / 4 == 3'],
          correct: [0, 3, 4],
          why: ['12 is a multiple of 4: True.', '`//` gives the integer 2, never 2.4: False.', 'x < 12 is False, so `and` is False.', 'not (True) is False, but x != 11 is True, and `or` needs one: True.', '12 / 4 is 3.0 and 3.0 == 3 is True.'] },
        { t: 'question', id: 'd04-arith-c' },
        { t: 'question', id: 'd04-arith-d' },
        { t: 'syntax', ids: ['relational-logical'] },
      ],
    },
    {
      id: 'sequence-blocks',
      title: 'Sequence: order of instructions and blocks',
      blocks: [
        { t: 'text', refs: [{ src: D04, page: 39 }, { src: D04, page: 40 }, { src: D04, page: 41 }, { src: D04, page: 42 }], md:
          'The ALGORITHM is a **sequence**: the computer runs the lines in the order written, one after another. Each line changes the program state, and a program must start and eventually end.\n\n' +
          'Swapping two lines **sometimes** changes the result and sometimes not. The rule: it matters when one line uses (or overwrites) something another line produces.' },
        { t: 'predict', prompt: 'Order does not matter here (independent lines). The input is 4.', stdin: ['4'], code: r`i = int(input())
x = 100.75
print(x)
print(i * 2)`,
          explain: 'Swapping `i = ...` and `x = ...` changes nothing: neither uses the other. Prints 100.75 then 8. But swapping the two `print` lines would change the output order.' },
        { t: 'predict', prompt: 'Order matters here.', code: r`a = 5
b = a * 2
a = 1
print(a, b)`,
          explain: '`b` is computed while a is still 5, so b = 10. Changing `a` afterwards does not update b (a variable is not a formula). Output "1 10". Move `a = 1` above `b = a * 2` and b becomes 2.' },
        { t: 'text', refs: [{ src: D04, page: 43 }, { src: D04, page: 44 }], md:
          'Python marks a **block** (a group of lines that belong together) by **indentation**. Lines in the same block must be indented consistently; otherwise Python raises an `IndentationError`. You will meet blocks properly with `if` and loops in D05.' },
        { t: 'code', caption: 'A first look at a block: the indented lines belong to the branch. Input 60.', stdin: ['60'],
          python: r`a = int(input())
if (a > 50):
    print("Hello World!")
    print("bye")
else:    # a <= 50
    print("Hello Darling!")
    print("bye bye")`,
          pseudo: r`KAMUS
  a : integer
ALGORITMA
  input(a)
  if (a > 50) then
    output("Hello World!")
    output("bye")
  else
    output("Hello Darling!")
    output("bye bye")`,
          flow: { blocks: [
            { t: 'io', dir: 'in', text: 'input(a)' },
            { t: 'if', cond: 'a > 50',
              then: [{ t: 'io', dir: 'out', text: 'output("Hello World!")' }, { t: 'io', dir: 'out', text: 'output("bye")' }],
              else: [{ t: 'io', dir: 'out', text: 'output("Hello Darling!")' }, { t: 'io', dir: 'out', text: 'output("bye bye")' }] },
          ] },
          notes: [
            { line: 2, note: 'The condition ends with `:` and the block is indented.' },
            { line: 3, note: 'Lines 3-4 are one inner block: they run together, or not at all.' },
            { line: 5, note: '`else` aligns with `if`. A comment records the condition it stands for.' },
          ] },
        { t: 'question', id: 'd04-order-a', note: 'Trace one version of the program.' },
        { t: 'question', id: 'd04-order-c', note: 'Which rewrites keep the output unchanged?' },
        { t: 'syntax', ids: ['indentation'] },
      ],
    },
    {
      id: 'problem-to-program',
      title: 'From problem to program: Input, Process, Output',
      blocks: [
        { t: 'text', refs: [{ src: D04, page: 45 }, { src: D04, page: 46 }, { src: D04, page: 47 }], md:
          'A reliable recipe for any formula problem:\n\n' +
          '1. **Input.** What data comes in, and which type is each (whole or decimal)?\n' +
          '2. **Process.** Write the formula as an expression. Watch units and `/` vs `//`.\n' +
          '3. **Output.** What must be printed, and in what format?\n' +
          '4. Write DECLARATIONS from steps 1-2, then the ALGORITHM in the same order.\n\n' +
          '**Example 1, Pak Pit\'s wheels:** read the radius R, compute the circumference 2πr, print it.' },
        { t: 'code', caption: 'Circle circumference (slides 46-47). Radius 2.', stdin: ['2'],
          python: r`# Program Circle_Circumference
# Calculates the circumference of a circle based on the input radius

# DECLARATIONS
# R : float
# Circumference : float

# ALGORITHM
R = float(input())
Circumference = 2 * 3.14 * R
print(Circumference)`,
          pseudo: r`Program Circle_Circumference
{ Calculates the circumference of a circle based on the input radius }
KAMUS
  R : real
  Circumference : real
ALGORITMA
  input(R)
  Circumference ← 2 * 3.14 * R
  output(Circumference)`,
          flow: { blocks: [
            { t: 'io', dir: 'in', text: 'input(R)' },
            { t: 'process', text: 'Circumference ← 2 * 3.14 * R' },
            { t: 'io', dir: 'out', text: 'output(Circumference)' },
          ] },
          notes: [
            { line: 9, note: 'The radius may have decimals, so `float`.' },
            { line: 10, note: 'The formula 2πr with π = 3.14.' },
          ] },
        { t: 'text', refs: [{ src: D04, page: 48 }, { src: D04, page: 49 }, { src: D04, page: 50 }], md:
          '**Example 2, average height of five students.** Five inputs, one process, one output. Note the parentheses: without them only `t5` is divided by 5.' },
        { t: 'code', caption: 'Average height (slides 49-50).', stdin: ['160', '170', '165', '175', '180'],
          python: r`# Program AverageHeight
# Accepts the heights of 5 students and calculates the average

# DECLARATIONS
# t1, t2, t3, t4, t5 : float
# avg : float

# ALGORITHM
t1 = float(input())
t2 = float(input())
t3 = float(input())
t4 = float(input())
t5 = float(input())
avg = (t1 + t2 + t3 + t4 + t5) / 5
print(avg)`,
          pseudo: r`Program AverageHeight
{ Accepts the heights of 5 students and calculates the average }
KAMUS
  t1, t2, t3, t4, t5 : real
  avg : real
ALGORITMA
  input(t1, t2, t3, t4, t5)
  avg ← (t1 + t2 + t3 + t4 + t5) / 5
  output(avg)`,
          flow: { blocks: [
            { t: 'io', dir: 'in', text: 'input(t1, t2, t3, t4, t5)' },
            { t: 'process', text: 'avg ← (t1 + t2 + t3 + t4 + t5) / 5' },
            { t: 'io', dir: 'out', text: 'output(avg)' },
          ] },
          notes: [
            { line: 14, note: 'Parentheses first, then divide by 5. `/` gives a float.' },
          ] },
        { t: 'predict', prompt: 'Forgot the parentheses. Inputs 10, 20, 30.', stdin: ['10', '20', '30'], code: r`a = int(input())
b = int(input())
c = int(input())
print(a + b + c / 3)
print((a + b + c) / 3)
print((a + b + c) // 3)`,
          explain: 'Division binds tighter than `+`, so the first line is 10 + 20 + 10.0 = 40.0. The correct average is 20.0 (second line); `//` gives 20 without the ".0".' },
        { t: 'text', refs: [{ src: D04, page: 54 }], md:
          '**Exercise 3, the marble shop.** Prices (hundred rupiah): red 10, green 15, yellow 20. Read m, h, k and print the total. Quantities are whole numbers, so `int`; the process is a weighted sum `10*m + 15*h + 20*k`.' },
        { t: 'question', id: 'd04-ex3-a', note: 'Write it as a program.' },
        { t: 'question', id: 'w04-s1a', note: 'The same marble problem as it appeared on a UTS-style sheet.' },
        { t: 'question', id: 'd04-ex1-a' },
        { t: 'question', id: 'd04-ex2-a', note: 'Mind ½ * base * height: `1/2` is fine in Python 3, but `1//2` would be 0.' },
      ],
    },
    {
      id: 'exam-drill',
      title: 'Exam drill / Summary',
      blocks: [
        { t: 'text', md:
          '| Idea | Python | Pseudocode | Flowchart |\n|---|---|---|---|\n' +
          '| Title / spec | `# Program X` / `# ...` | `Program X` / `{ ... }` | Start / End ovals |\n' +
          '| Declarations | `# A : int` | `KAMUS  A : integer` | not drawn |\n' +
          '| Algorithm | code lines | `ALGORITMA` | boxes in order |\n' +
          '| Assignment | `x = x + 1` | `x ← x + 1` | rectangle |\n' +
          '| Input | `x = int(input())` | `input(x)` | parallelogram |\n' +
          '| Output | `print("a" + str(x))` | `output("a" + str(x))` | parallelogram |\n' +
          '| Integer / real division, remainder | `//`, `/`, `%` | `div`, `/`, `mod` | in the rectangle |\n' +
          '| Compare / combine | `== != < > <= >=`, `and or not` | same | in the diamond (later) |' },
        { t: 'key', md: 'Input is always a string: convert with `int()` / `float()`. Join text and numbers with `str()`. `/` is a float, `//` floors, `%` is the remainder. `True or False` is **True** (the slide table is wrong). Precedence: `**` > `* / // %` > `+ -` > comparisons > `not` > `and` > `or`.' },
        { t: 'trap', md: '1. Using the input without conversion (`"5" + "3"` is "53").\n2. `int(input())` for a value that can have decimals.\n3. `print("x = " + x)` with a number: missing `str()`.\n4. `a + b / 2` when you meant `(a + b) / 2`.\n5. `//` where `/` is needed (an average that loses its fraction).' },
        { t: 'predict', prompt: 'Final check mixing everything. Input 17.', stdin: ['17'], code: r`n = int(input())
print("n = " + str(n))
print(n // 5, n % 5)
print(n / 5)
print(n % 2 == 1 and n > 10)
print("1" + "2" * 3)`,
          explain: '"n = 17", then 3 and 2, then 3.4 (real division), then True and True = True, and finally "1" + "222" = "1222": `*` repeats a string, then `+` concatenates.' },
        { t: 'question', id: 'w04-s2a', note: 'Electricity bill: watch the decimals.' },
        { t: 'question', id: 'w04-s3a', note: 'Time conversion with // and %.' },
        { t: 'question', id: 'mgem-b-3a', note: 'Debugging: find the data-type slips.' },
      ],
    },
  ],
}
