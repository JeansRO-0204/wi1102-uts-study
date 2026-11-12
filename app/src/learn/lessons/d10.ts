import type { Lesson } from '../types'
const r = String.raw
const D10 = 'D10_Subprogram'

export const lesson: Lesson = {
  deck: 'D10',
  title: 'Subprogram in Python',
  summary: 'Functions and procedures: how to cut a program into named pieces, pass values in with parameters, get values out with return, and keep variables local. The UTS Python problem can say "you must write a subprogram", and then skipping it costs marks.',
  minutes: 40,
  goals: [
    'Explain why a program is split into subprograms (reuse, decomposition, testing each piece alone).',
    'Write a function (def ... return value) and a procedure (def ... return, no value) with a spec comment, and call each the right way.',
    'Tell formal from actual parameters, and say whether a given call is valid.',
    'Predict output when a function prints instead of returning (the None trap) and when a variable is local.',
    'Write MaxArray, PrintArray and an array-comparison subprogram, and use them from a main program.',
  ],
  examAngle: 'The UTS has one Python problem with arrays where the paper says "wajib membuat subprogram" (the 2025 paper: ticket sales SBY vs BDG, subprogram required for at least one of the tasks). The marker looks for a real def that is called from the main program, so a def that is never called, or a program with no def at all, loses marks even if the output is right. Subprograms also appear in read-the-Python trace questions (what does this print?) and in the Praktikum 4 problems.',
  sections: [
    {
      id: 'why-subprograms',
      title: 'Why subprograms?',
      blocks: [
        { t: 'text', refs: [{ src: D10, page: 3 }, { src: D10, page: 4 }, { src: D10, page: 12 }], md: "As programs grow, the same lines get typed again and again, with only the numbers changed. Copy-paste does not fix that: when you spot a bug you must fix every copy.\n\nA **subprogram** is a named set of instructions for an operation you use often. You write it once and use it as many times as you like. There are two kinds:\n\n- **Function**: maps an input (the *domain*) to exactly one output value (the *range*) of a clear data type.\n- **Procedure**: a sequence of instructions with a defined start and end state. It is like a small program and does not give back a value." },
        { t: 'text', md: "Why this is more than saving typing:\n\n- **Decomposition**: break a big problem into smaller named parts (read data, compare one month, decide the winner). Each part is one subprogram.\n- **Abstraction**: the caller only needs to know *what* `Max2(a, b)` returns, not *how*. The spec comment states the what.\n- **Reuse**: Max3 is built from Max2.\n- **Independent testing**: a function can be tried alone, and several people can write different functions of one program." },
        { t: 'code', caption: 'Without a subprogram the same formula is typed three times; with one it is typed once.', python: r`# without a subprogram
a = 3
print(a * a + 1)
b = 7
print(b * b + 1)
c = 10
print(c * c + 1)

# with a subprogram
def F(x):
    # returns x squared plus 1
    return x * x + 1
print(F(3))
print(F(7))
print(F(10))`, notes: [
          { line: [9, 11], note: 'The definition: written once. Nothing is printed when it is only defined.' },
          { line: [12, 14], note: 'Three calls to the same code with different inputs.' },
        ] },
        { t: 'quiz', q: 'Which of these are real benefits of using subprograms? (tick all that apply)', options: [
          'The same code is written once and reused',
          'A function can be tested on its own, without the whole program',
          'The program always runs faster',
          'A big problem can be cut into small named parts (decomposition)',
        ], correct: [0, 1, 3], why: [
          'Right: reuse instead of rewriting (slide 12).',
          'Right: for example you can try Max2 alone in the interpreter.',
          'Wrong: subprograms are about structure and reuse, not speed.',
          'Right: this is decomposition, and it also lets a team share the work.',
        ] },
      ],
    },
    {
      id: 'function-anatomy',
      title: 'A function: definition and call',
      blocks: [
        { t: 'text', refs: [{ src: D10, page: 13 }, { src: D10, page: 15 }, { src: D10, page: 16 }], md: "Using a function has three phases: **define** it (name, spec, domain, range), **implement** it (the body), **call** it from the main program or from another function.\n\nIn Python the **definition** is `def Name(params):`. Right under it comes the **specification** as a comment, then an optional LOCAL DECLARATIONS comment, then the ALGORITHM. It must contain at least one `return`. The input and output types are not written: they follow from the parameters and from what is returned.\n\nA `def` only *creates* the function. Nothing runs until a **call** like `Square(A)`." },
        { t: 'code', caption: 'Function Square: f(x) = x squared. The call is part of an expression.', python: r`# Program Test
# Tests the function Square
# DECLARATIONS
# A, B : int
# Function Square
def Square(X):
    # returns the square of X
    # LOCAL DECLARATIONS
    # result : int
    # ALGORITHM
    result = X * X
    return result
# MAIN PROGRAM ALGORITHM
A = 5
B = Square(A) + 10
print(B)`, pseudo: `Program Test
{ Tests the function Square }
DECLARATIONS
  A, B : integer
  function Square (X : integer) → integer

function Square (X : integer) → integer
  { returns the square of X }
  LOCAL DECLARATIONS
    result : integer
  ALGORITHM
    result ← X * X
    → result

ALGORITHM
  A ← 5
  B ← Square(A) + 10
  output(B)`, notes: [
          { line: 6, note: 'The header: keyword `def`, the name, the formal parameter `X`, and the colon.' },
          { line: 7, note: 'The specification: what is returned, not how.' },
          { line: 12, note: '`result` is a local variable.' },
          { line: 13, note: '`return` ends the function and hands the value to the caller.' },
          { line: 16, note: 'The call: the function is used as an expression, so its value is added to 10.' },
        ], pseudoNotes: [
          { line: 5, note: 'The function is declared with its input and output type (domain and range).' },
          { line: 14, note: 'In the course notation the arrow → returns a value.' },
        ] },
        { t: 'text', md: "**Flow of control** when the call `B = Square(A) + 10` runs: the main program pauses, jumps into `Square` (X gets the value of A), runs it down to `return`, then comes back to the same spot with the returned value substituted: `B = 25 + 10`. Step through it below and watch X and result appear and disappear." },
        { t: 'trace', caption: 'The call jumps into Square and comes back.', code: r`def Square(X):
    result = X * X
    return result
A = 5
B = Square(A) + 10
print(B)`, notes: [
          { line: 2, note: 'Inside the function: X is 5 here. `result` exists only during this call.' },
          { line: 5, note: 'After the function returns 25, the line finishes as B = 25 + 10.' },
        ] },
        { t: 'slide', ref: { src: D10, page: 9 }, caption: 'The slide that shows the flow of control of a call.' },
        { t: 'key', md: "**Definition** = `def`, written once, before use. **Call** = the name with arguments, written where you need the value. A function that is defined but never called does nothing." },
        { t: 'question', id: 'd10-circle-b', note: 'Your first full function: Area(r) returns the area; the main program reads and prints.' },
      ],
    },
    {
      id: 'parameters',
      title: 'Parameters: formal vs actual',
      blocks: [
        { t: 'text', refs: [{ src: D10, page: 22 }, { src: D10, page: 23 }], md: "The names in the `def` line are the **formal parameters**. The values you give in a call are the **actual parameters** (arguments). When the call happens each argument is matched to a parameter **one to one, by position**.\n\nA call is valid when:\n\n1. the function **name** matches;\n2. the **number** of arguments matches and the **types** fit;\n3. the result fits where it is used (the output type);\n4. a function is called **as part of an expression**, never as a lone statement whose value is thrown away." },
        { t: 'code', caption: 'Formal parameters A, B. Actual parameters x and 7.', python: r`def Max2(A, B):
    # returns the larger of A and B
    if (A >= B):
        return A
    else:  # A < B
        return B
x = 3
print(Max2(x, 7))
print(Max2(7, x) + 10)`, pseudo: `Program TryMax2
DECLARATIONS
  x : integer
  function Max2 (A, B : integer) → integer

function Max2 (A, B : integer) → integer
  { returns the larger of A and B }
  ALGORITHM
    if (A >= B) then
      → A
    else { A < B }
      → B

ALGORITHM
  x ← 3
  output(Max2(x, 7))
  output(Max2(7, x) + 10)`, notes: [
          { line: 1, note: 'A and B are formal parameters.' },
          { line: 8, note: 'x and 7 are actual parameters: A gets the value of x (3), B gets 7.' },
          { line: 9, note: 'The same function used inside a bigger expression.' },
        ] },
        { t: 'predict', prompt: 'The order of arguments matters, because they are matched by position.', code: r`def Diff(a, b):
    return a - b
print(Diff(10, 4))
print(Diff(4, 10))
x = 6
y = 2
print(Diff(y, x))`, explain: 'a is the first argument and b the second, whatever the variable names are in the caller. So Diff(y, x) is 2 - 6. The names x, y in the main program have nothing to do with a, b.' },
        { t: 'question', id: 'd10-concepts-b', note: 'Which calls are valid? The ○/✗ exam format.' },
        { t: 'question', id: 'd10-concepts-d' },
      ],
    },
    {
      id: 'return-vs-print',
      title: 'return vs print: the None trap',
      blocks: [
        { t: 'text', refs: [{ src: D10, page: 16 }, { src: D10, page: 28 }], md: "`return` **sends a value back** to the caller, who decides what to do with it (store it, add it, print it). `print` only **shows** text on the screen; the function still returns nothing.\n\nA function without `return` quietly returns the special value `None`. So if a function that should give a value only prints it, the caller receives `None`." },
        { t: 'predict', code: r`def Double(x):
    print(x * 2)
def Triple(x):
    return x * 3
y = Double(4)
z = Triple(4)
print(y)
print(z)`, explain: 'Double prints 8 at the call (line 5), but returns None, so y is None. Triple returns 12, which is stored in z, and printing z shows 12. The 8 appears only because of the print inside Double.' },
        { t: 'trap', md: "**print instead of return.** `def Max2(A, B): ... print(A)` then `result = 0.1 * Max2(A, B)` fails with a TypeError (`None` times a number). Even when it does not crash, the value is printed in the wrong place and the caller gets `None`. A function that is meant to compute something must `return` it. The **main program** prints." },
        { t: 'code', caption: 'Right: the function returns, the main program prints.', python: r`def Area(r):
    # returns the area of a circle of radius r
    return 3.14 * r * r
r = 2.0
A = Area(r)
print(A)`, pseudo: `Program CircleArea
DECLARATIONS
  r, A : real
  function Area (r : real) → real

function Area (r : real) → real
  { returns the area of a circle of radius r }
  ALGORITHM
    → 3.14 * r * r

ALGORITHM
  r ← 2.0
  A ← Area(r)
  output(A)` },
        { t: 'quiz', q: 'A function Max2 contains `print(A)` and `print(B)` in its branches and has no return. What does `x = Max2(3, 9)` leave in x?', options: ['9', '3', 'None', 'An error is raised at the def line'], correct: [2], why: [
          'Wrong: 9 is printed on the screen, but not returned.',
          'Wrong: the larger value would be 9 anyway, and nothing is returned.',
          'Right: with no return, Python returns None; x is None.',
          'Wrong: the def is fine; the problem only shows when the result is used.',
        ] },
        { t: 'question', id: 'd10-concepts-a' },
        { t: 'question', id: 'd10-max2-c', note: 'Max2 must return; the main program computes 10% and prints.' },
      ],
    },
    {
      id: 'procedures',
      title: 'Procedures',
      blocks: [
        { t: 'text', refs: [{ src: D10, page: 28 }, { src: D10, page: 29 }, { src: D10, page: 30 }], md: "A **procedure** groups instructions that you use often, but it **does not give back a value**. You can think of it as a function that returns nothing. In Python it is a `def` ending with a bare `return` (no value).\n\nBecause it has no value, it is called as a **statement of its own**, not inside an expression. A procedure is the right tool when the job is *doing* something (print a menu, print an array), and a function when the job is *computing* something." },
        { t: 'code', caption: 'Procedure PrintName: prints N greetings. The call is a statement.', python: r`# Definition of Procedure PrintName
def PrintName(name):
    # prints Hello + name
    print("Hello, " + name + "!")
    return
# MAIN PROGRAM
name = "Ani"
N = 2
for i in range(N):
    PrintName(name)`, pseudo: `Program HelloName
DECLARATIONS
  i, N : integer
  name : string
  procedure PrintName (input name : string)

procedure PrintName (input name : string)
  { prints Hello + name }
  ALGORITHM
    output("Hello, " + name + "!")

ALGORITHM
  name ← "Ani"
  N ← 2
  i traversal [1..N]
    PrintName(name)`, notes: [
          { line: 5, note: 'A bare `return` marks a procedure: no value is sent back.' },
          { line: 10, note: 'The call is a standalone statement, repeated N times by the loop.' },
        ] },
        { t: 'predict', prompt: 'A procedure has no value. What does y hold?', code: r`def Hello(name):
    print("Hello, " + name)
    return
y = Hello("Budi")
print(y)`, explain: 'The call prints the greeting. The procedure returns nothing, so y is None, and print(y) shows None. Using a procedure call as a value is almost always a mistake.' },
        { t: 'text', md: "| | Function | Procedure |\n|---|---|---|\n| Purpose | compute one value | do a job (print, change) |\n| Ends with | `return value` | bare `return` (or nothing) |\n| Pseudocode | `function F(x : integer) → integer` | `procedure P(input x : integer)` |\n| Called as | part of an expression: `y = F(x)` | a statement: `P(x)` |\n| If you print inside | the caller gets `None` (trap) | normal: printing is its job |" },
        { t: 'question', id: 'd10-concepts-e' },
        { t: 'question', id: 'd10-procedure-b', note: 'Write the procedure and call it N times.' },
      ],
    },
    {
      id: 'scope',
      title: 'Local vs global variables',
      blocks: [
        { t: 'text', refs: [{ src: D10, page: 16 }], md: "A variable made **inside** a function is **local**: it exists only while the function runs, and the main program (or another function) cannot see it. That is what the LOCAL DECLARATIONS comment lists. The main program's variables are the **global** ones.\n\nSo a parameter `r` in a function and a variable `r` in the main program are **two different variables** that happen to share a name. The only way for a function to give something to the outside is `return`, and the only way in is a parameter." },
        { t: 'predict', code: r`def Change():
    x = 99
    print(x)
x = 10
Change()
print(x)`, explain: 'The x inside Change is a new local variable; assigning to it does not touch the global x. The function prints its own 99 and the main program still has 10.' },
        { t: 'trap', md: "**Using a local variable outside.** Calling `Square(A)` and then `print(result)`, where `result` was created inside Square, raises a NameError. Fix: store the returned value, `result = Square(A)`. Also: calling `Square(A)` alone and ignoring its value throws the answer away." },
        { t: 'question', id: 'd10-concepts-c', note: 'Find the lines that cause the NameError.' },
      ],
    },
    {
      id: 'function-calls-function',
      title: 'Functions calling functions',
      blocks: [
        { t: 'text', refs: [{ src: D10, page: 24 }, { src: D10, page: 25 }, { src: D10, page: 26 }], md: "A function may be called from the main program **or from inside another function**. That is how you build bigger pieces from small, trusted ones. The largest of three numbers is just the larger of (the larger of A and B) and C:\n\n`Max3(A, B, C) = Max2(Max2(A, B), C)`\n\nDefine the callee (Max2) **before** it is called, as the slides do." },
        { t: 'code', caption: 'Max3 built from Max2, then 10 percent of the largest (Example 3 style).', python: r`# Function Max2
def Max2(A, B):
    # returns the larger of A and B
    if (A >= B):
        return A
    else:  # A < B
        return B
# Function Max3
def Max3(A, B, C):
    # returns the largest of A, B, C using Max2
    return Max2(Max2(A, B), C)
# MAIN PROGRAM ALGORITHM
A = int(input())
B = int(input())
C = int(input())
print(Max3(A, B, C))
print(0.1 * Max3(A, B, C))`, stdin: ['1', '-10', '5'], pseudo: `Program Max3_ViaMax2
{ Max3 built from Max2 }
DECLARATIONS
  A, B, C : integer
  function Max2 (A, B : integer) → integer
  function Max3 (A, B, C : integer) → integer

function Max2 (A, B : integer) → integer
  { returns the larger of A and B }
  ALGORITHM
    if (A >= B) then
      → A
    else { A < B }
      → B

function Max3 (A, B, C : integer) → integer
  { returns the largest of A, B, C; uses Max2 }
  ALGORITHM
    → Max2(Max2(A, B), C)

ALGORITHM
  input(A)
  input(B)
  input(C)
  output(Max3(A, B, C))
  output(0.1 * Max3(A, B, C))`, notes: [
          { line: 11, note: 'Max3 calls Max2 twice. The inner call runs first.' },
          { line: 17, note: 'A function call can sit inside a larger arithmetic expression.' },
        ] },
        { t: 'trace', caption: 'Watch the inner call Max2(1, -10) finish, then the outer one.', code: r`def Max2(A, B):
    if (A >= B):
        return A
    else:
        return B
def Max3(A, B, C):
    return Max2(Max2(A, B), C)
x = Max3(1, -10, 5)
print(x)`, notes: [
          { line: 7, note: 'First Max2(1, -10) gives 1, then Max2(1, 5) gives 5.' },
        ] },
        { t: 'quiz', q: 'In `Max3(A, B, C) = Max2(Max2(A, B), C)` with A=4, B=9, C=6, which call is evaluated first and what does it return?', options: ['Max2(9, 6) returns 9', 'Max2(4, 9) returns 9', 'Max2(Max2(4, 9), 6) returns 9', 'Max2(4, 6) returns 6'], correct: [1], why: [
          'Wrong: the arguments of the outer call must be known first, and 6 is only the second argument.',
          'Right: the inner call is evaluated first (9), then Max2(9, 6) gives 9.',
          'Wrong: that is the whole expression, not the first call to be evaluated.',
          'Wrong: A and C are never compared directly.',
        ] },
        { t: 'question', id: 'd10-ex2-b', note: 'Max3 must call Max2.' },
      ],
    },
    {
      id: 'subprograms-arrays',
      title: 'Subprograms with arrays (and "wajib subprogram")',
      blocks: [
        { t: 'text', refs: [{ src: D10, page: 35 }, { src: D10, page: 36 }], md: "An array goes into a subprogram as a **parameter**, usually with its length: `MaxArray(T, N)`, `PrintArray(T, N)`. The subprogram does **not** read the input itself; the main program reads and passes the data in. That is why one MaxArray serves any array.\n\n- **MaxArray**: a **function**. It computes one value, so it `return`s it. Start from `max = T[0]`, never `0`.\n- **PrintArray**: a **procedure**. Its job is to print, so it prints and ends with a bare `return`." },
        { t: 'code', caption: 'Function MaxArray (the array-maximum pattern inside a function).', python: r`def MaxArray(T, N):
    # returns the largest element of T (N elements, N > 0)
    # LOCAL DECLARATIONS
    # i, max : int
    # ALGORITHM
    max = T[0]
    for i in range(1, N):
        if (T[i] > max):
            max = T[i]
    return max
# MAIN PROGRAM ALGORITHM
N = int(input())
T = [0 for i in range(N)]
for i in range(0, N):
    T[i] = int(input())
print(MaxArray(T, N))`, stdin: ['5', '5', '4', '3', '2', '1'], pseudo: `Program MaxArray_Test
{ Largest element of an array using function MaxArray. N > 0 }
DECLARATIONS
  N, i : integer
  T : array [0..N-1] of integer
  function MaxArray (T : array of integer, N : integer) → integer

function MaxArray (T : array of integer, N : integer) → integer
  { returns the largest element of T }
  LOCAL DECLARATIONS
    i, max : integer
  ALGORITHM
    max ← T[0]
    i traversal [1..N-1]
      if (T[i] > max) then
        max ← T[i]
    → max

ALGORITHM
  input(N)
  i traversal [0..N-1]
    input(T[i])
  output(MaxArray(T, N))`, notes: [
          { line: 6, note: '`max = T[0]`, not 0: correct even when all elements are negative.' },
          { line: 7, note: 'Start at index 1; `range(1, N)` stops at index N-1, the last element.' },
          { line: 10, note: '`return max`: the value goes back to the caller.' },
          { line: 16, note: 'The main program reads the data and passes T and N.' },
        ] },
        { t: 'code', caption: 'Procedure PrintArray: prints "[i] element" per line, or "Empty array" when N = 0.', python: r`def PrintArray(T, N):
    # prints each element as "[i] element", or "Empty array" if N = 0
    # LOCAL DECLARATIONS
    # i : int
    # ALGORITHM
    if (N == 0):
        print("Empty array")
    else:
        for i in range(0, N):
            print("[" + str(i) + "] " + str(T[i]))
    return
# MAIN PROGRAM ALGORITHM
N = int(input())
T = [0 for i in range(N)]
for i in range(0, N):
    T[i] = int(input())
PrintArray(T, N)`, stdin: ['3', '5', '4', '3'], pseudo: `Program PrintArray_Test
{ Prints an array using procedure PrintArray. N >= 0 }
DECLARATIONS
  N, i : integer
  T : array [0..N-1] of integer
  procedure PrintArray (T : array of integer, N : integer)

procedure PrintArray (T : array of integer, N : integer)
  { prints [i] element per line; "Empty array" if N = 0 }
  LOCAL DECLARATIONS
    i : integer
  ALGORITHM
    if (N = 0) then
      output("Empty array")
    else
      i traversal [0..N-1]
        output("[" + i + "] " + T[i])

ALGORITHM
  input(N)
  i traversal [0..N-1]
    input(T[i])
  PrintArray(T, N)`, notes: [
          { line: 6, note: 'The special case N = 0 is checked first.' },
          { line: 9, note: '`str()` is needed to join numbers to text; the index shown starts at 0.' },
          { line: 11, note: 'A bare `return` marks a procedure.' },
          { line: 17, note: 'Called as a statement of its own.' },
        ] },
        { t: 'text', md: "**How the UTS asks for this.** In the 2025 paper the array problem says you *must* create and use a subprogram (at least for one of the tasks). Reading the data, comparing one pair, counting how many are bigger, picking the winner: any of these is a natural subprogram. Write at least one real `def`, make sure the main program **calls** it, and keep reading/printing in the main program unless the subprogram is a procedure." },
        { t: 'trap', md: "**Writing the def but not calling it** (or writing no def at all). The output may be right but the \"wajib subprogram\" requirement is not met. Also: do not put `input()` calls for the whole data inside MaxArray, and do not `print` the maximum inside a function that should return it." },
        { t: 'code', caption: 'Comparing two arrays with a function that returns True or False (search for a differing pair).', python: r`def Same(A, B, N):
    # returns True if A[i] = B[i] for all i in 0..N-1
    i = 0
    result = True
    while (i < N and result):
        if (A[i] != B[i]):
            result = False
        else:
            i = i + 1
    return result
# MAIN PROGRAM ALGORITHM
T1 = [3, 1, 4]
T2 = [3, 1, 5]
if (Same(T1, T2, 3)):
    print("Array sama")
else:
    print("Array tidak sama")`, pseudo: `Program CompareArrays
DECLARATIONS
  T1, T2 : array [0..2] of integer
  function Same (A, B : array of integer, N : integer) → boolean

function Same (A, B : array of integer, N : integer) → boolean
  { returns true if A[i] = B[i] for all i in 0..N-1 }
  LOCAL DECLARATIONS
    i : integer
    result : boolean
  ALGORITHM
    i ← 0
    result ← true
    while i < N and result do
      if A[i] <> B[i] then
        result ← false
      else
        i ← i + 1
    → result

ALGORITHM
  T1 ← [3, 1, 4]
  T2 ← [3, 1, 5]
  if Same(T1, T2, 3) then
    output("Array sama")
  else
    output("Array tidak sama")`, notes: [
          { line: 4, note: 'The flag starts True: assume equal until a differing pair is found.' },
          { line: 5, note: 'The loop stops at the first difference or at the end.' },
          { line: 8, note: 'i only advances while the pairs are equal.' },
          { line: 14, note: 'A boolean function can be used directly as the if condition.' },
        ] },
        { t: 'question', id: 'd10-ex4-a', note: 'MaxArray as a full program.' },
        { t: 'question', id: 'd10-ex5-a', note: 'PrintArray, including the empty array.' },
      ],
    },
    {
      id: 'exam-drill',
      title: 'Exam drill and summary',
      blocks: [
        { t: 'text', md: "| Idea | Python | Pseudocode (slides) |\n|---|---|---|\n| Define a function | `def F(x):` ... `return v` | `function F(x : integer) → integer` ... `→ v` |\n| Define a procedure | `def P(x):` ... `return` | `procedure P(input x : integer)` |\n| Spec | comment under the `def` | `{ ... }` under the header |\n| Local variables | `# LOCAL DECLARATIONS` comment | `LOCAL DECLARATIONS` |\n| Call a function | `y = F(x)` (in an expression) | `y ← F(x)` |\n| Call a procedure | `P(x)` (a statement) | `P(x)` |\n| Standard library | `from math import *` then `sqrt(x)` | `sqrt(x)` |\n| Array parameter | `def MaxArray(T, N):` | `T : array of integer, N : integer` |" },
        { t: 'text', refs: [{ src: D10, page: 32 }, { src: D10, page: 33 }], md: "Standard functions such as `sqrt`, `sin`, `cos`, `pow` live in the **math** library: put `from math import *` at the top, then call them like your own functions." },
        { t: 'key', md: "A function **returns** (`return`) and is used inside an expression. A procedure **does** something and is called as a statement. Data comes in by **parameters**, goes out by **return**, and local variables stay inside. In the UTS: write a real `def`, **call it** from the main program." },
        { t: 'trap', md: "**The five slips to check before you hand in:**\n\n1. `print` instead of `return` in a function (the caller gets `None`).\n2. Using a procedure call as a value, or ignoring a function's result.\n3. Using a local variable outside its function.\n4. Wrong number or order of arguments in a call.\n5. A def that is never called, or no subprogram when the question says \"wajib\"." },
        { t: 'quiz', q: 'Which statements are correct? (tick all that apply)', options: [
          'A function that is defined but never called produces no output',
          'A variable created inside a function can be used in the main program after the call',
          'The call of a function is part of an expression',
          'MaxArray(T, N) should read the N numbers itself with input()',
        ], correct: [0, 2], why: [
          'Right: a definition only creates the function.',
          'Wrong: it is local. Use return and store the value.',
          'Right: for example B = Square(A) + 10.',
          'Wrong: the main program reads the data and passes the array in; MaxArray only computes the maximum.',
        ] },
        { t: 'question', id: 'uts25-s5a', note: 'The real UTS 2025 problem with "wajib membuat subprogram".' },
        { t: 'question', id: 'kls-s8b', note: 'Compare two arrays using a BacaArray subprogram.' },
      ],
    },
  ],
}
