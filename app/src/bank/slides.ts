// Lecture-slide exercises and code examples: D01 CT, D02 Algorithmic Thinking, D04 Basic Structure,
// D05 Conditionals & Repetition, D06 Array, D10 Subprogram. All official (slides), plus minimal-template flashcards.
// Slide errata handled on purpose (never taught as true): D04 `True or False`; D05 `>=` in Print_Positive, `N : float`
// read with int(), `str(rata)`, counter "ends at hmax+1"; D06 `T[-1]` "undefined".
import type { BankFile, DeckId, Flashcard } from '../types'

const r = String.raw
const slide = (src: string, label: string, pages: number[]) => ({ kind: 'slide' as const, lang: 'en' as const, src, label, pages, official: true })
const D01 = 'D01_ComputationalThinking'
const D02 = 'D02_AlgorithmicThinking'
const D04 = 'D04_BasicStructure'
const D05 = 'D05_Conditionals_Repetition'
const D06 = 'D06_Array'
const D10 = 'D10_Subprogram'

const c = (id: string, decks: DeckId[], topic: string, front: string, back: string, ref?: [string, number]): Flashcard =>
  ({ id, decks, topic, front, back, ...(ref ? { refs: [{ src: ref[0], page: ref[1] }] } : {}) })

const cards: Flashcard[] = [
  /* ---------- D01 ---------- */
  c('d01-fc-ct', ['D01'], 'Definition of CT', 'Definition of computational thinking?', 'The thought process of formulating a problem and expressing its solution so that a computer (human or machine) can carry it out effectively. No machine is required.', [D01, 5]),
  c('d01-fc-pillars', ['D01'], 'Four pillars', 'Name the 4 pillars of CT.', 'Problem decomposition, pattern recognition, abstraction (& generalization), algorithmic thinking.', [D01, 7]),
  c('d01-fc-decomp', ['D01'], 'Decomposition', 'Problem decomposition?', 'Splitting a problem into smaller sub-problems and solving them separately (divide and conquer). It can follow user type, function, or time. Example: an academic system -> FRS, PRS, payment, KSM.', [D01, 8]),
  c('d01-fc-pattern', ['D01'], 'Pattern recognition', 'Pattern recognition?', 'Recognizing similarities/differences in the characteristics of different but related problems or phenomena. Examples: matching socks; *sequential pattern mining* on transactions.', [D01, 14]),
  c('d01-fc-abstraction', ['D01'], 'Abstraction', 'Abstraction vs generalization?', 'Abstraction: discarding the unimportant parts of a problem. Generalization: formulating a general solution for similar problems. Examples: maps per level, turtle graphics, the "4 1 2" robot.', [D01, 20]),
  c('d01-fc-algo', ['D01', 'D02'], 'Algorithmic thinking', 'Algorithmic thinking?', 'Composing an ordered sequence of solution steps (sequence, selection, repetition) that the executor can carry out.', [D02, 7]),
  c('d01-fc-which', ['D01'], 'Linking pillars', 'How to answer "which pillar is used?"', 'Write: (1) the pillar, (2) the evidence in the case (what is split / what pattern / what detail is dropped / what steps), (3) its benefit. Abstraction pillar = only what matters; decomposition = modules/sub-problems.', [D01, 7]),
  c('d01-fc-turtle', ['D01'], 'Generalization', 'What is generalized in turtle graphics?', 'One general procedure for drawing any 2D graphic: the robot has a position, a direction, and a pen; three commands (move forward, turn, change pen).', [D01, 23]),

  /* ---------- D02 ---------- */
  c('d02-fc-software', ['D02'], 'Software', 'Software = ?', 'program + data + documentation. Without software a computer is just a dumb machine.', [D02, 4]),
  c('d02-fc-steps', ['D02'], '4 programming steps', 'The four steps of problem solving with programming?', '1) Understand the problem, 2) formulate a plan -> algorithm, 3) develop the solution -> computer program, 4) evaluate the solution.', [D02, 5]),
  c('d02-fc-algorithm', ['D02'], 'Algorithm', 'Definition of an algorithm and how to write it?', 'A set of procedural steps for solving a (sub)problem. Written as pseudocode (text) or a flowchart (diagram).', [D02, 7]),
  c('d02-fc-control', ['D02'], 'Control structures', 'The three control structures?', 'Sequence (in order), conditional/branching (choice), repetition/loop (iteration).', [D02, 7]),
  c('d02-fc-topdown', ['D02'], 'Top-down design', 'Top-down design?', 'Start from the big problem and refine it into sub-problems until they become algorithm steps; each sub-problem can become a module (subprogram).', [D02, 6]),
  c('d02-fc-coding', ['D02'], 'Coding', 'Coding and source code?', 'Coding: writing program code from the algorithm. The result is source code, which is then translated by a compiler/interpreter.', [D02, 24]),
  c('d02-fc-compiler', ['D02'], 'Compiler vs interpreter', 'Compiler vs interpreter?', 'A compiler reads the whole program and translates it all at once (C/C++, Pascal, Fortran). An interpreter reads and runs it line by line (Python, MATLAB).', [D02, 26]),
  c('d02-fc-paradigm', ['D02'], 'Paradigm', 'The procedural paradigm and its formula?', 'A program is built from information structures in memory that are manipulated: Program = Algorithm + Data Structure. Other paradigms: object-oriented, declarative.', [D02, 27]),
  c('d02-fc-flowsym', ['D02'], 'Flowchart symbols', 'Basic flowchart symbols?', 'Start/End (oval), input/output (parallelogram), process/assignment (rectangle), decision (diamond, Yes/No paths), loop-back arrow, subprogram (predefined process).', [D02, 13]),
  c('d02-fc-repeat', ['D02', 'D05'], 'Repeat-until', 'Difference between repeat-until and while?', 'repeat-until: test at the **end**, the body runs at least once, stops when the condition is true. while: test at the **start**, the body may never run, stops when the condition is false.', [D02, 18]),

  /* ---------- D04 ---------- */
  c('d04-fc-python', ['D04'], 'Python', 'Properties of Python that matter in this course?', 'Interpreted, blocks marked by indentation, case-sensitive, strongly typed and dynamically typed (a variable\'s type follows its latest value).', [D04, 3]),
  c('d04-fc-template', ['D04'], 'Program template', 'The course-style Python program template?', '```python\n# Program <Title>\n# <specification>\n# DECLARATIONS\n# x : int\n# ALGORITHM\nx = int(input())\nprint(x)\n```\nThe title, specification, and DECLARATIONS are written as `#` comments.', [D04, 5]),
  c('d04-fc-comment', ['D04'], 'Comments', 'Comments in Python?', 'Start with `#`, per line, not executed; used for the title, specification, declarations, and explanations.', [D04, 13]),
  c('d04-fc-types', ['D04'], 'Basic types', 'Basic types and example values?', 'bool: True/False; int: 1, -144, 0; float: 3.14, 4.01E+1; char: \'A\' (one character, single quotes); string: "xcxcx" (single/double quotes). complex is not used.', [D04, 19]),
  c('d04-fc-varname', ['D04'], 'Variable names', 'Rules for variable names?', 'Start with a letter, followed by letters/digits/underscores; no spaces; meaningful, short; case-sensitive (Weight ≠ weight).', [D04, 23]),
  c('d04-fc-assign', ['D04'], 'Assignment', 'Rules of assignment?', '`<variable> = <value/expression>`: the left side must be a variable; the right side is evaluated first. A variable on the right side must already have a value. `=` assigns, `==` compares.', [D04, 26]),
  c('d04-fc-input', ['D04'], 'Input', 'Behavior of input()?', '`input()` always returns a **string**. Convert with `int(input())` or `float(input())`. The text inside `input("...")` is only a prompt.', [D04, 27]),
  c('d04-fc-convert', ['D04'], 'Type conversion', 'Type conversion functions?', 'int(x), float(x), str(x), chr(x) (number -> character), ord(x) (character -> number).', [D04, 28]),
  c('d04-fc-print', ['D04'], 'Output', 'Printing text + a number?', '`print("Total = " + str(n))`. `+` on strings concatenates; string + int without `str()` -> TypeError. Alternative: `print("Total =", n)`.', [D04, 29]),
  c('d04-fc-arith', ['D04'], 'Arithmetic operators', 'Arithmetic operators with examples (a=10, b=21)?', '+ - * ; `//` integer division (b//a = 2); `/` real division (b/a = 2.1); `%` remainder (b%a = 1); `**` power. In Python `//` rounds down: -7 // 2 = -4.', [D04, 34]),
  c('d04-fc-rel', ['D04'], 'Relational operators', 'Relational operators?', '== != > < >= <=; the result is bool. `==` means equal to (not `=`). Do not use `==` to compare floats exactly.', [D04, 35]),
  c('d04-fc-logic', ['D04'], 'Logical operators', 'and, or, not with a=True, b=False?', 'a and b = False; **a or b = True** (the slide says False: an error); not a = False. `or` is False only if both are False; `and` is True only if both are True.', [D04, 36]),
  c('d04-fc-augassign', ['D04'], 'Assignment operators', 'a += b is equivalent to?', '`a = a + b`; also `-= *= /= %=`. With a=10, b=21: a += b -> 31; a *= b -> 210.', [D04, 37]),
  c('d04-fc-expr', ['D04'], 'Expressions', 'Kinds of expressions?', 'By number of operands: unary (not x) and binary (a + 5). By result: arithmetic (numeric), relational (bool from numbers), logical (bool from bools).', [D04, 33]),
  c('d04-fc-order', ['D04'], 'Sequence', 'When does instruction order matter?', 'Instruction order = execution order; swapping two instructions is safe only if they do not depend on each other (same variable, output order). A program must have a start and an end.', [D04, 40]),
  c('d04-fc-block', ['D04'], 'Block', 'Blocks and indentation?', 'Consecutive instructions are grouped into a block marked by indentation (4 spaces); one block must be consistent, otherwise IndentationError. Blocks may be nested.', [D04, 43]),
  c('d04-fc-float', ['D04'], 'Float vs int', 'When to use float(input()) vs int(input())?', 'int for whole-number counts (quantity, index, N); float for real quantities (height, speed, radius). `int("2.5")` is an error.', [D04, 27]),
  c('d04-fc-tpl-sum', ['D04', 'D05'], 'Template: sum/average', 'Minimal template for the average of two numbers?', '```python\na = float(input())\nb = float(input())\navg = (a + b) / 2\nprint(avg)\n```\nParentheses are required: `a + b / 2` is wrong.', [D04, 50]),

  /* ---------- D05 ---------- */
  c('d05-fc-cond', ['D05'], 'Branching', 'What makes a good branching condition set?', '**Complete** (all cases covered) and **disjoint** (no overlap). Example for an integer A: A>0, A<0, A=0.', [D05, 12]),
  c('d05-fc-if1', ['D05'], 'Template: if', 'Template for a single-case if?', '```python\nif (A > 0):\n    print("Positive")\n# else: no action\n```\nWithout else: condition False -> no action.', [D05, 14]),
  c('d05-fc-if2', ['D05'], 'Template: if-else', 'Template for if-else (two complementary cases)?', '```python\nif (N % 2 == 0):\n    print("even")\nelse:  # N % 2 == 1\n    print("odd")\n```', [D05, 13]),
  c('d05-fc-ifn', ['D05'], 'Template: if-elif', 'Template for many cases?', '```python\nif (N > 0):\n    ...\nelif (N < 0):\n    ...\nelse:  # N = 0\n    ...\n```\nOnly the first true block runs; `else` guarantees completeness.', [D05, 14]),
  c('d05-fc-elif-vs-if', ['D05'], 'elif vs if', 'Difference between an elif chain and several separate ifs?', 'elif: stops at the first true case. Separate ifs: each condition is evaluated on its own, so overlapping conditions run several blocks.', [D05, 14]),
  c('d05-fc-oddeven', ['D05'], 'Even/odd', 'Even/odd test and notation?', '`N % 2 == 0` even, `N % 2 == 1` odd. Pseudocode: `N mod 2 = 0`. Not `N / 2 == 0`.', [D05, 18]),
  c('d05-fc-positive', ['D05'], 'Positive', 'Positive, negative, zero?', 'Positive: A > 0; negative: A < 0; zero is not positive (the Print_Positive slide wrongly uses >=).', [D05, 17]),
  c('d05-fc-loop', ['D05'], 'Repetition', 'Parts of a loop and its kinds?', 'Repetition-condition (logical expression) and repetition-body (the repeated action). Kinds: counter-based (`for`), condition-at-start (`while`).', [D05, 34]),
  c('d05-fc-for', ['D05'], 'Template: for', 'Template for i = 1..N?', '```python\nfor i in range(1, N+1):\n    ...\n```\nThe upper bound is excluded, hence N+1. Pseudocode: `i traversal [1..N]`.', [D05, 37]),
  c('d05-fc-for0', ['D05', 'D06'], 'Template: for index', 'for over N elements / N times?', '`for i in range(N):` or `range(0, N)` -> i = 0..N-1 (N iterations).', [D05, 37]),
  c('d05-fc-back', ['D05'], 'Template: backward', 'Template for counting down hmax..hmin?', '```python\nfor i in range(hmax, hmin-1, -1):\n    ...\n```\nThe lower bound is excluded: hmin-1. Pseudocode `i traversal [hmax..hmin]`.', [D05, 39]),
  c('d05-fc-counter', ['D05'], 'Counter value', 'Value of i after a for ends (real Python)?', 'The last value processed: `range(1, N+1)` -> i = N (not N+1); an empty range -> i is unchanged. The slide says hmax+1: that is wrong for Python.', [D05, 37]),
  c('d05-fc-while', ['D05'], 'Template: while', 'Template for while with a counter?', '```python\ni = 1                 # First-Element\nwhile (i <= N):       # condition\n    ...               # action\n    i = i + 1         # Next-Element\n```\nForgetting Next-Element = the loop never ends.', [D05, 41]),
  c('d05-fc-forwhile', ['D05'], 'for or while', 'When for, when while?', 'for: the exact number of iterations is known (10 times, N times). while: may never run (empty case) or stops because of a condition/sentinel.', [D05, 46]),
  c('d05-fc-sentinel', ['D05'], 'Template: sentinel', 'Minimal sentinel loop template?', '```python\nsum = 0; count = 0\nX = int(input())          # first read\nwhile (X != -999):\n    count = count + 1\n    sum = sum + X\n    X = int(input())      # next read\n```\nThe sentinel is not processed; the next read is at the end of the body.', [D05, 50]),
  c('d05-fc-sum', ['D05'], 'Template: sum', 'Minimal template for accumulating a sum?', '```python\nsum = 0\nfor i in range(N):\n    x = int(input())\n    sum = sum + x\n```\nInitialize **before** the loop.', [D05, 45]),
  c('d05-fc-countif', ['D05'], 'Template: count-if', 'Minimal template for conditional counting?', '```python\ncount = 0\nfor i in range(N):\n    x = int(input())\n    if (x > 0):\n        count = count + 1\nprint(count)\n```', [D05, 50]),
  c('d05-fc-avg', ['D05'], 'Average', 'Average with an unknown amount of data?', '`if (count > 0): avg = sum/count` else an empty-data message. Prevents division by zero. Use `str(avg)` (same variable name; the slide wrongly has `str(rata)`).', [D05, 50]),
  c('d05-fc-types', ['D05', 'D04'], 'Declaration vs conversion', 'Must the type declaration and conversion be consistent?', '`N : int` -> `int(input())`; `N : float` -> `float(input())`. The Print_Number slide declares float but reads int (an error).', [D05, 23]),

  /* ---------- D06 ---------- */
  c('d06-fc-array', ['D06'], 'Array', 'Definition of an array?', 'A collection of elements of the same type, arranged in order, accessed by index (0..N-1). In Python a `list` is used.', [D06, 6]),
  c('d06-fc-decl', ['D06'], 'Array declaration', 'Two ways to declare an array?', '`T = [9, 8, 7]` (direct values) and `T = [0 for i in range(N)]` (N elements with a default).', [D06, 7]),
  c('d06-fc-access', ['D06'], 'Element access', 'Access and index bounds?', '`T[i]`, valid 0..N-1; `T[N]` -> IndexError. `T[-1]` in Python = the last element (the slide says "undefined"); do not rely on it in the exam.', [D06, 12]),
  c('d06-fc-trav', ['D06'], 'Traversal', 'Sequential processing of an array?', 'From the lowest index to the highest with a loop; the array is assumed non-empty (N > 0). Pattern: populate -> process -> print.', [D06, 14]),
  c('d06-fc-pop', ['D06'], 'Template: fill array', 'Template to read N then N elements into an array?', '```python\nN = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\n```', [D06, 17]),
  c('d06-fc-print', ['D06'], 'Template: print array', 'Template to print all elements?', '```python\nfor i in range(0, N):\n    print(T[i])\n```', [D06, 19]),
  c('d06-fc-sumavg', ['D06'], 'Template: array sum/average', 'Minimal template for the sum and average of an array?', '```python\nsum = 0\nfor i in range(0, N):\n    sum = sum + T[i]\navg = sum / N\n```', [D06, 21]),
  c('d06-fc-max', ['D06'], 'Template: array maximum', 'Minimal max-of-array template?', '```python\nmax = T[0]\nfor i in range(1, N):\n    if (T[i] > max):\n        max = T[i]\n```\nInitialize with `T[0]`, not 0.', [D06, 28]),
  c('d06-fc-min', ['D06'], 'Template: array minimum', 'Array minimum template?', 'Same as the maximum, but `min = T[0]` and `if (T[i] < min):`.', [D06, 29]),
  c('d06-fc-search', ['D06'], 'Template: search', 'Linear search template with a found flag?', '```python\ni = 0\nfound = False\nwhile (i < N and found == False):\n    if (T[i] == X):\n        found = True\n    else:\n        i = i + 1\nif (found == True):\n    print(i)\nelse:\n    print("not found")\n```\n`i < N` comes first; increment only in the else.', [D06, 32]),
  c('d06-fc-searchlast', ['D06'], 'Template: last index', 'Modify the search to find the last index?', 'Start at `i = N - 1`, condition `i >= 0 and found == False`, `i = i - 1` in the else.', [D06, 33]),
  c('d06-fc-vector', ['D06'], 'Template: vector addition', 'Vector addition W = U + V?', '```python\nfor i in range(0, 5):\n    W[i] = V[i] + U[i]\n```\nPer element, with the same index i.', [D06, 34]),
  c('d06-fc-mult', ['D06'], 'Template: multiply all elements', 'Multiply all elements by X?', '```python\nfor i in range(0, N):\n    T[i] = T[i] * X\n```\n`T[i] * X` alone does not store the result.', [D06, 24]),
  c('d06-fc-pf', ['D06'], 'Template: pass/fail', 'Count passed (A, B, C) and failed?', '```python\npassed = 0; failed = 0\nfor i in range(0, N):\n    if (G[i] == \'A\' or G[i] == \'B\' or G[i] == \'C\'):\n        passed = passed + 1\n    else:\n        failed = failed + 1\n```\nWrite the full comparison on each `or`.', [D06, 25]),

  /* ---------- D10 ---------- */
  c('d10-fc-sub', ['D10'], 'Subprogram', 'What is a subprogram and what are its kinds?', 'A set of instructions for an operation that is used often. Two kinds: **function** (a mapping domain -> range, with an explicitly typed result) and **procedure** (a sequence of instructions with an initial and a final state, no return value).', [D10, 4]),
  c('d10-fc-uses', ['D10'], 'Benefits', 'Benefits of subprograms?', 'Break a program into small parts; reuse (instead of rewriting); can be tested on their own; make it easier to divide the work.', [D10, 12]),
  c('d10-fc-func', ['D10'], 'Template: function', 'Template for a function with return?', '```python\ndef Max2(A, B):\n    # returns the larger of A and B\n    if (A >= B):\n        return A\n    else:\n        return B\n```\nThe specification is a comment under `def`; at least one `return` with a value.', [D10, 20]),
  c('d10-fc-proc', ['D10'], 'Template: procedure', 'Template for a procedure?', '```python\ndef PrintName(name):\n    # prints Hello + name\n    print("Hello, " + name + "!")\n    return\n```\nNo return value; called as a statement: `PrintName(x)`.', [D10, 29]),
  c('d10-fc-local', ['D10'], 'Local variable', 'LOCAL DECLARATIONS?', 'Variables known only inside the subprogram; not visible in the main program or other subprograms. Send results out with `return`.', [D10, 16]),
  c('d10-fc-param', ['D10'], 'Parameters', 'Formal vs actual parameters?', 'Formal: the names in the definition (`def Square(X)`). Actual: the values/variables at the call (`Square(A)`). Matched one to one by order.', [D10, 22]),
  c('d10-fc-call', ['D10'], 'Call requirements', 'Requirements for calling a function?', 'Same name; number and types of parameters match; the result fits the output type; the function is called as part of an expression (not a standalone statement).', [D10, 22]),
  c('d10-fc-flow', ['D10'], 'Control flow', 'Control flow of a function call?', '1) The caller line calls the function, 2) the program jumps to the function and runs it until `return` (actual -> formal parameters), 3) it returns to the call point, the value is substituted into the expression, 4) continues with the next instruction.', [D10, 9]),
  c('d10-fc-retprint', ['D10'], 'Return vs print', 'Difference between return and print?', '`return` sends a value to the caller (it can be stored/used in an expression); `print` only displays, and the function returns None. Computing function -> return; printing procedure -> print.', [D10, 15]),
  c('d10-fc-max3', ['D10'], 'Max3 via Max2', 'Max3 using Max2?', '`return Max2(Max2(A, B), C)`: the innermost call is evaluated first. A function may call another function.', [D10, 26]),
  c('d10-fc-maxarr', ['D10'], 'Template: MaxArray', 'Template for function MaxArray(T, N)?', '```python\ndef MaxArray(T, N):\n    max = T[0]\n    for i in range(1, N):\n        if (T[i] > max):\n            max = T[i]\n    return max\n```', [D10, 35]),
  c('d10-fc-printarr', ['D10'], 'Template: PrintArray', 'Template for procedure PrintArray(T, N)?', '```python\ndef PrintArray(T, N):\n    if (N == 0):\n        print("Empty array")\n    else:\n        for i in range(0, N):\n            print("[" + str(i) + "] " + str(T[i]))\n    return\n```', [D10, 36]),
  c('d10-fc-math', ['D10'], 'math library', 'Using sqrt, sin, cos, pow?', '`from math import *` at the top of the program, then `sqrt(N)`. Library functions are called like your own functions.', [D10, 32]),
  c('d10-fc-dist', ['D10'], 'Template: single-formula function', 'Template for a function from a formula (Distance)?', '```python\ndef Distance(v, t):\n    return v * t\n```\nMain program: read v, t; `print(Distance(v, t))`.', [D10, 34]),
]

export const bank: BankFile = {
  problems: [
    /* ======================================================= D01 ======================================================= */
    {
      id: 'd01-pillars', archetype: 'concept', title: 'Which pillar of computational thinking?',
      source: slide(D01, 'Pillars (scenarios)', [8, 14, 16, 20, 21, 23]),
      intro: 'The four pillars of CT: problem decomposition, pattern recognition, abstraction & generalization, algorithmic thinking. Choose the pillar that the scenario mainly illustrates.',
      parts: [
        {
          id: 'd01-pillars-a', kind: 'mcq', label: 'a', decks: ['D01'], topic: 'CT pillars',
          stem: 'A university designs its academic information system by splitting it into modules: course registration (FRS), study-plan changes (PRS), tuition payment, and KSM printing.',
          options: ['Problem decomposition', 'Pattern recognition', 'Abstraction and generalization', 'Algorithmic thinking'], answer: [0],
          why: ['The big problem is split into sub-problems/modules that are solved separately.', 'No similarities between cases are being searched for.', 'No details are dropped and no general solution is stated.', 'There are no ordered steps yet; this is only a split into modules.'],
          explanation: 'Splitting the system into FRS, PRS, payment, and KSM modules is **problem decomposition** (divide and conquer).', refs: [{ src: D01, page: 13 }],
        },
        {
          id: 'd01-pillars-b', kind: 'mcq', label: 'b', decks: ['D01'], topic: 'CT pillars',
          stem: 'From e-commerce transaction records we find that customers who buy a smartphone usually also buy a screen protector or casing within three days.',
          options: ['Problem decomposition', 'Pattern recognition', 'Abstraction and generalization', 'Algorithmic thinking'], answer: [1],
          why: ['The data is not split into sub-problems.', 'Finding a sequence of events that often repeats in data is pattern recognition.', 'No details are simplified.', 'No step-by-step procedure is designed.'],
          explanation: '*Sequential pattern mining* looks for similarities/regularities among different but related data: **pattern recognition**.', refs: [{ src: D01, page: 16 }],
        },
        {
          id: 'd01-pillars-c', kind: 'mcq', label: 'c', decks: ['D01'], topic: 'CT pillars',
          stem: 'A map of Jawa Barat does not show street names, but a map of ITB does.',
          options: ['Problem decomposition', 'Pattern recognition', 'Abstraction and generalization', 'Algorithmic thinking'], answer: [2],
          why: ['The map is not split into sub-problems.', 'No pattern is being searched for.', 'Details that are unimportant at that level are dropped: abstraction of information.', 'There are no ordered steps.'],
          explanation: 'The information shown fits the level of the map; unimportant details are left out: **abstraction**.', refs: [{ src: D01, page: 21 }],
        },
        {
          id: 'd01-pillars-d', kind: 'mcq', label: 'd', decks: ['D01'], topic: 'CT pillars',
          stem: 'A turtle robot with only three commands (move forward, rotate, change pen) can draw any 2D vector graphic.',
          options: ['Problem decomposition', 'Pattern recognition', 'Abstraction and generalization', 'Algorithmic thinking'], answer: [2],
          why: ['There is no split into sub-problems.', 'It is not about finding similarities in data.', 'One general procedure (generalization) for all 2D drawings, with the attributes abstracted.', 'The commands themselves are not a specific sequence of solution steps.'],
          explanation: 'One general procedure that applies to many similar problems is **generalization** (part of the abstraction pillar).', refs: [{ src: D01, page: 23 }],
        },
        {
          id: 'd01-pillars-e', kind: 'mcq', label: 'e', decks: ['D01'], topic: 'CT pillars',
          stem: 'Cooking potatoes: "If no potatoes, buy them. Peel them. If fries then fry, else if boiled then boil, else make soup."',
          options: ['Problem decomposition', 'Pattern recognition', 'Abstraction and generalization', 'Algorithmic thinking'], answer: [3],
          why: ['Not a split of the problem.', 'Not a search for patterns.', 'Not a simplification of details.', 'Steps with branching so that it can be executed: algorithmic thinking.'],
          explanation: 'Writing down steps (sequence + selection) that an executor, human or machine, can carry out is **algorithmic thinking**.', refs: [{ src: D02, page: 12 }],
        },
        {
          id: 'd01-pillars-f', kind: 'mcq', label: 'f', decks: ['D01'], topic: 'CT pillars',
          stem: 'Finding matching socks in a pile by comparing colour and pattern.',
          options: ['Problem decomposition', 'Pattern recognition', 'Abstraction and generalization', 'Algorithmic thinking'], answer: [1],
          why: ['Not split into sub-problems.', 'Recognizing shared characteristics: pattern recognition.', 'There is no generalization.', 'There is no formal sequence of steps.'],
          explanation: 'Recognizing similarities/differences in characteristics = **pattern recognition**.', refs: [{ src: D01, page: 15 }],
        },
      ],
    },
    {
      id: 'd01-define', archetype: 'concept', title: 'Define computational thinking and its pillars',
      source: slide(D01, 'Concepts', [5, 8, 14, 20]),
      parts: [
        {
          id: 'd01-define-a', kind: 'open', label: 'a', decks: ['D01'], topic: 'Definition of CT', stem: 'Define computational thinking. Must it involve a machine?',
          answer: 'Computational thinking is the thought process of formulating a problem and expressing its solution in such a way that a computer, human or machine, can carry it out effectively. It does not have to involve a machine: humans can compute ("human computers") and people can learn CT without a machine.',
          keyPoints: ['formulate the problem + express the solution', 'can be carried out effectively by a computer (human or machine)', 'does not require a machine'],
          explanation: 'Definisi slide: *thought processes involved in formulating a problem and expressing its solution(s) in such a way that a computer — human or machine — can effectively carry out.*', refs: [{ src: D01, page: 5 }],
        },
        {
          id: 'd01-define-b', kind: 'open', label: 'b', decks: ['D01'], topic: 'CT pillars', stem: 'State the four pillars of CT and define each in one sentence.',
          answer: '1) Problem decomposition: splitting a problem into smaller sub-problems and solving them separately. 2) Pattern recognition: recognizing similarities/differences in the characteristics of different but related problems or phenomena. 3) Abstraction & generalization: removing the unimportant parts of a problem (abstraction) to obtain a general solution for similar problems (generalization). 4) Algorithmic thinking: composing an ordered sequence of solution steps.',
          keyPoints: ['decomposition = split into sub-problems', 'pattern = similarities/differences', 'abstraction = drop what is unimportant; generalization = general solution', 'algorithmic = step by step'],
          explanation: 'Memorize a one-sentence definition of each pillar; the exam usually asks you to link a pillar to a case (see UTS question II.1).', refs: [{ src: D01, page: 7 }, { src: D01, page: 8 }, { src: D01, page: 14 }, { src: D01, page: 20 }],
        },
      ],
    },
    {
      id: 'd01-decompose', archetype: 'concept', title: 'Decomposing an academic information system',
      source: slide(D01, 'Problem Decomposition Exercise', [13]),
      intro: 'Before the semester, students register by completing a Study Plan Form (FRS) approved by the academic advisor. Changes (PRS) are allowed until four weeks after the semester begins, also approved by the advisor. Tuition is paid through a bank account and recorded automatically; afterwards students can print the Student Study Card (KSM). Advisors, Heads of Study Programs and administrative staff can monitor enrollment and KSM printing status.',
      parts: [{
        id: 'd01-decompose-a', kind: 'open', decks: ['D01'], topic: 'Decomposition', stem: 'Decompose the modules (and their functions) needed to implement this system. Give at least two different perspectives for decomposing.',
        answer: 'Many answers are valid. Example by function: (1) FRS module: fill in and advisor approval; (2) PRS module: change the study plan until week 4 + approval; (3) payment module: record tuition (UKT) payment automatically; (4) KSM module: print after payment; (5) status monitoring module. By user type: student, academic advisor, head of study program, administrative staff. By time: before the semester, until week 4, start of the semester.',
        keyPoints: ['clear, separate modules', 'each module has a function', 'at least two perspectives (user, function, time)', 'relation: KSM only after payment'],
        explanation: 'The slide says decomposition can follow user type, function, or execution time. Make sure the ordering constraint (pay first, then print KSM) is captured.', refs: [{ src: D01, page: 13 }],
      }],
    },
    {
      id: 'd01-phone', archetype: 'concept', title: 'International telephone number pattern',
      source: slide(D01, 'Pattern Recognition Exercise (1)', [17]),
      intro: 'Examples: +62-811-234567, +62 (817) 123-456, +1-888-300400, +1888300400, +44 (800) 987654, 0065 7788 9900, 0043-6543210, +966-200-300.',
      parts: [{
        id: 'd01-phone-a', kind: 'open', decks: ['D01'], topic: 'Pattern recognition', stem: 'Develop a list of rules that declares any string to be an international telephone number with the correct pattern.',
        answer: 'Example rules: 1) may contain only digits, +, -, (, ), and spaces; 2) starts with + or 00 followed by the country code; 3) country code of 1-3 digits, then the local number; 4) parentheses, if any, are paired and enclose the area code; 5) separators (- or space) are not at the ends and not consecutive; 6) total number of digits in a reasonable range (e.g. 8-15). Many answers are valid.',
        keyPoints: ['allowed character set', 'prefix + or 00', 'paired parentheses', 'number of digits'],
        explanation: 'A *pattern recognition* exercise: from varied examples, find the shared features and then state them as a general rule (generalization).', refs: [{ src: D01, page: 17 }],
      }],
    },
    {
      id: 'd01-robot412', archetype: 'concept', title: 'City traveling robot ("4 1 2")',
      source: slide(D01, 'Abstraction Exercise - Generalization', [24]), figures: [{ src: D01, page: 24 }],
      intro: 'A robot travels along roads. At every intersection it turns counterclockwise and takes a detour according to the instructions. The instructions are numbers giving the detour at each intersection: "4 1 2" means first intersection: 4th detour, second: 1st detour, third: 2nd detour. (Bebras I-2017-Sl-02)',
      parts: [
        {
          id: 'd01-robot412-a', kind: 'short', label: 'a', decks: ['D01'], topic: 'Generalization', stem: 'How many intersections does the instruction "4 1 2" cover, and which detour does the robot take at the second one?',
          blanks: [{ label: 'intersections', accept: ['3'], type: 'number' }, { label: 'detour at 2nd', accept: ['1'], type: 'number' }],
          explanation: 'One number = one intersection, so "4 1 2" covers **3** intersections; at the second intersection the robot takes the **1**st detour.', hints: ['One number per intersection.'],
        },
        {
          id: 'd01-robot412-b', kind: 'open', label: 'b', decks: ['D01'], topic: 'Generalization', stem: 'Challenge from the slide: if the robot starts at A, which instruction leads it to C? Work it out on the figure (trace the counterclockwise rule), then explain which details are abstracted away and why the idea generalises to any pair of points.',
          answer: 'Tracing the figure by hand gives the instruction (the slide does not print the key: follow the green example for "4 1 2" on page 24 first, then repeat for A→C). What is abstracted away: road length, geometric shape, absolute position; only the sequence of turn numbers matters. Because every intersection uses the same rule, a trip from any point to any point can be expressed as a sequence of numbers: that is generalization.',
          keyPoints: ['geometry/distance details are abstracted', 'only the sequence of turn numbers matters', 'same rule at every intersection -> generally applicable'],
          explanation: 'Note: the slide does not print the A→C answer; trace it yourself on the figure (p. 24). The point is generalization: one way of expressing a route for all pairs of points.', refs: [{ src: D01, page: 24 }],
        },
      ],
    },
    {
      id: 'd01-smiley', archetype: 'concept', title: 'Smiling face recognition',
      source: slide(D01, 'Generalization and Pattern Recognition Exercises', [25, 26]), figures: [{ src: D01, page: 25 }],
      parts: [{
        id: 'd01-smiley-a', kind: 'mcq', decks: ['D01'], topic: 'Abstraction', stem: 'A tool turns a face photo into a simple smiley (two dots and a line) and checks it against a pattern of red lines and green dots. Reducing the photo to the eye positions and mouth shape is an example of:',
        options: ['Problem decomposition', 'Abstraction', 'Compiling', 'Evaluating the solution'], answer: [1],
        why: ['It does not split the problem.', 'Only the eye positions and mouth shape are kept; other details are dropped.', 'Compiling is code translation, not a CT pillar.', 'Evaluating the solution is programming step 4, not what is done here.'],
        explanation: 'The slide\'s moral: smile detection relies only on eye positions and mouth shape (**abstraction**); the red-line/green-dot criterion applies to all faces (**generalization**).', refs: [{ src: D01, page: 26 }],
      }],
    },

    /* ======================================================= D02 ======================================================= */
    {
      id: 'd02-concepts', archetype: 'concept', title: 'Software, programming steps, control structures',
      source: slide(D02, 'Concepts', [4, 5, 6, 7]),
      parts: [
        {
          id: 'd02-concepts-a', kind: 'mcq', label: 'a', decks: ['D02'], topic: 'Software', stem: 'According to the slides, software equals:',
          options: ['program + data + documentation', 'program + hardware', 'algorithm + compiler', 'data + user'], answer: [0],
          why: ['The slide\'s definition.', 'Hardware is not part of software.', 'A compiler is a tool, not a software component in this definition.', 'The user is not a software component.'],
          explanation: 'Software = program + data + documentation. Without software, a computer is just a dumb machine.', refs: [{ src: D02, page: 4 }],
        },
        {
          id: 'd02-concepts-b', kind: 'mcq', label: 'b', decks: ['D02'], topic: 'Programming steps', stem: 'The four general steps of problem solving with programming, in order, are:',
          options: ['Understand the problem, formulate a plan (algorithm), develop a solution (program), evaluate the solution', 'Write the program, understand the problem, evaluate, formulate a plan', 'Formulate a plan, understand the problem, evaluate, write the program', 'Understand the problem, write the program, formulate a plan, evaluate'], answer: [0],
          why: ['Correct order.', 'The program is written before the problem is understood.', 'The plan comes before understanding.', 'The program is written before there is a plan (algorithm).'],
          explanation: '1) understand the problem, 2) formulate a plan -> algorithm, 3) develop the solution -> computer program, 4) evaluate the solution.', refs: [{ src: D02, page: 5 }],
        },
        {
          id: 'd02-concepts-c', kind: 'short', label: 'c', decks: ['D02'], topic: 'Programming steps', stem: 'Step 2 (formulating a plan) produces an ______ ; step 3 (developing the solution) produces a computer ______ .',
          blanks: [{ label: 'step 2', accept: ['algorithm', 'algoritma'], type: 'text' }, { label: 'step 3', accept: ['program', 'computer program', 'program komputer'], type: 'text' }],
          explanation: 'The plan = algorithm; the solution built from the plan = computer program.', refs: [{ src: D02, page: 5 }],
        },
        {
          id: 'd02-concepts-d', kind: 'mcq-multi', label: 'd', decks: ['D02'], topic: 'Control structures', stem: 'Mark each statement: algorithms are built using these control structures.',
          options: ['Sequence: steps executed in order', 'Conditional (branching): a choice of steps', 'Repetition (loop): repeating steps', 'Compilation: translating source code to machine code'],
          correct: [true, true, true, false],
          why: ['A basic control structure.', 'A basic control structure.', 'A basic control structure.', 'Compilation is a code translation process, not a control structure.'],
          explanation: 'Three control structures: sequence, conditional, repetition. (A subprogram is a control abstraction.)', refs: [{ src: D02, page: 7 }],
        },
        {
          id: 'd02-concepts-e', kind: 'mcq', label: 'e', decks: ['D02'], topic: 'Top-down design', stem: 'In top-down design, you:',
          options: ['start from the big problem and refine it into sub-problems until step-by-step solutions appear', 'start from small functions and combine them into the main program', 'write the main program first without considering sub-problems', 'only draw the flowchart and skip the pseudocode'], answer: [0],
          why: ['The slide\'s definition.', 'That is the bottom-up approach.', 'It ignores decomposition.', 'Unrelated.'],
          explanation: 'Top-down: start from the big problem and refine it until it becomes steps (an algorithm); each sub-problem can become a module/subprogram.', refs: [{ src: D02, page: 6 }],
        },
      ],
    },
    {
      id: 'd02-compiler', archetype: 'concept', title: 'Compiler vs interpreter',
      source: slide(D02, 'Compiler vs Interpreter', [24, 25, 26]),
      parts: [{
        id: 'd02-compiler-a', kind: 'mcq-multi', decks: ['D02'], topic: 'Compiler vs interpreter', stem: 'Mark each statement as correct (O) or wrong (X).',
        options: ['A compiler reads the entire program and translates it at once into code the machine understands', 'An interpreter reads and executes the code line by line', 'Python is normally run with an interpreter', 'C/C++, Pascal and Fortran are interpreted languages'],
        correct: [true, true, true, false],
        why: ['The definition of a compiler.', 'The definition of an interpreter.', 'Python and MATLAB are interpreted.', 'C/C++, Pascal, Fortran are examples of compiled languages.'],
        explanation: 'Compiler: source -> object code -> machine (C/C++, Pascal, Fortran). Interpreter: source -> intermediate code -> the interpreter runs it line by line (MATLAB, Python). Source code = the file produced by *coding* the algorithm.', refs: [{ src: D02, page: 26 }],
      }],
    },
    {
      id: 'd02-potatoes', archetype: 'trace', title: 'Cooking potatoes for dinner (pseudocode and flowchart)',
      source: slide(D02, 'Example-3', [10, 11, 12, 13]), figures: [{ src: D02, page: 13 }],
      intro: 'The slide writes the conditions as questions. Here they are read as input: `potatoes` is "yes" or "no"; `choice` is "fries", "boiled" or "soup".',
      parts: [
        {
          id: 'd02-potatoes-a', kind: 'trace', label: 'a', decks: ['D02'], topic: 'Pseudocode', patterns: ['nested-if'], ask: 'output', stdin: ['no', 'soup'],
          stem: 'Run the pseudocode with potatoes = no and choice = soup. What is printed, in order?',
          pseudo: `Program CookPotatoes
{ Prepares a potato dish }
DECLARATIONS
  potatoes, choice : string
ALGORITHM
  input(potatoes)
  input(choice)
  if potatoes = "no" then
    output("Buy potatoes")
  { potatoes available }
  output("Peel potatoes")
  if choice = "fries" then
    output("Fry potatoes")
  else if choice = "boiled" then
    output("Boil potatoes")
  else { choice = soup }
    output("Make soup")`,
          lineNotes: [
            { line: [6, 7], note: 'The two inputs are read first: the slide\'s conditions ("Potatoes available?", "What to cook?") are turned into data.' },
            { line: [8, 10], note: 'A single case (no else): potatoes are bought only if there are none. After this block the potatoes are guaranteed to be available (an invariant in the slide\'s comment).' },
            { line: 11, note: '"Peel" is outside the if, so it always runs: a sequence step after the branch.' },
            { line: [12, 17], note: 'Three complete, disjoint cases (fries / boiled / soup); `else` catches the rest, which is soup.' },
          ],
          explanation: 'Since potatoes = no, the buy step runs; peel always runs; choice = soup falls into the `else`.', refs: [{ src: D02, page: 12 }],
        },
        {
          id: 'd02-potatoes-b', kind: 'trace', label: 'b', decks: ['D02'], topic: 'Flowchart', patterns: ['nested-if'], ask: 'output', stdin: ['yes', 'boiled'],
          stem: 'The same algorithm as a flowchart. Walk it with potatoes = yes and choice = boiled. What is printed?',
          flow: {
            title: 'CookPotatoes', blocks: [
              { t: 'io', dir: 'in', text: 'input(potatoes)' },
              { t: 'io', dir: 'in', text: 'input(choice)' },
              { t: 'if', cond: 'potatoes = "no"', then: [{ t: 'io', dir: 'out', text: 'output("Buy potatoes")' }] },
              { t: 'io', dir: 'out', text: 'output("Peel potatoes")' },
              { t: 'if', cond: 'choice = "fries"', then: [{ t: 'io', dir: 'out', text: 'output("Fry potatoes")' }], else: [
                { t: 'if', cond: 'choice = "boiled"', then: [{ t: 'io', dir: 'out', text: 'output("Boil potatoes")' }], else: [{ t: 'io', dir: 'out', text: 'output("Make soup")' }] },
              ] },
            ],
          },
          explanation: 'Since potatoes = yes, the "No" branch (buy) is skipped; it goes straight to peel, then to the "boiled" path at the cooking choice.', refs: [{ src: D02, page: 13 }],
        },
      ],
    },
    {
      id: 'd02-clock', archetype: 'trace', title: 'Fixing the wall clock (three flowcharts)',
      source: slide(D02, 'Example-4', [14, 15, 16, 17, 18]), figures: [{ src: D02, page: 17 }],
      intro: 'Initial state: the clock shows the wrong time. If the hands do not move, replace the battery; if they move, only adjust the hands. Final state: the clock shows the correct time.',
      parts: [
        {
          id: 'd02-clock-a', kind: 'mcq', label: 'a', decks: ['D02'], topic: 'Evaluating algorithms', stem: 'Flowchart-1: "Clock hand moved?" Yes -> fix the hand to the correct position. No -> change batteries -> Finish. What is wrong with this solution?',
          figures: [{ src: D02, page: 15 }],
          options: ['After changing the batteries the hands are never set to the correct time, so the final state is not reached', 'The flowchart has no Start symbol', 'It repeats forever', 'Changing batteries is never needed'], answer: [0],
          why: ['The No path ends at Finish without fixing the hand position.', 'Start is there.', 'There is no loop.', 'The question actually says the batteries are changed if the hand is stopped.'],
          explanation: 'On the "No" path, after the batteries are changed the hand still shows the wrong time. A solution must end in the *final state*: the clock shows the correct time. Fix: from "Change batteries" continue to "Fix clock hand" (Flowchart-2).', refs: [{ src: D02, page: 15 }],
        },
        {
          id: 'd02-clock-b', kind: 'mcq', label: 'b', decks: ['D02'], topic: 'Evaluating algorithms', stem: 'Flowchart-2 fixes the hands after both branches, then finishes. What if after two days the clock returns to an incorrect position?',
          figures: [{ src: D02, page: 16 }],
          options: ['The solution has no check afterwards, so the problem would go unnoticed; we need a check and a repetition', 'Nothing: the clock will be fine forever', 'The Start symbol must be removed', 'Only the batteries need removal'], answer: [0],
          why: ['It needs verification + repetition (Flowchart-3).', 'There is no guarantee.', 'Not relevant.', 'Not relevant.'],
          explanation: 'The algorithm does not yet verify the result. Flowchart-3 adds "Check after 2 days" and a loop: if it is still wrong, change the batteries and fix again (the **repeat-until** structure).', refs: [{ src: D02, page: 16 }],
        },
        {
          id: 'd02-clock-c', kind: 'trace', label: 'c', decks: ['D02'], topic: 'Flowchart', patterns: ['while-condition'], ask: 'output', stdin: ['no', 'no', 'yes'],
          stem: 'Flowchart-3 as a block tree. Inputs: hands moved = no; after the first check the clock is correct = no; after the second check correct = yes. What is printed?',
          figures: [{ src: D02, page: 17 }],
          flow: {
            title: 'Flowchart-3', blocks: [
              { t: 'io', dir: 'in', text: 'input(moved)' },
              { t: 'if', cond: 'moved = "no"', then: [{ t: 'io', dir: 'out', text: 'output("Change batteries")' }] },
              { t: 'repeat', body: [
                { t: 'io', dir: 'out', text: 'output("Fix clock hand")' },
                { t: 'io', dir: 'out', text: 'output("Check after 2 days")' },
                { t: 'io', dir: 'in', text: 'input(correct)' },
                { t: 'if', cond: 'correct = "no"', then: [{ t: 'io', dir: 'out', text: 'output("Change batteries")' }] },
              ], until: 'correct = "yes"' },
            ],
          },
          explanation: 'The batteries are changed at the start; the loop runs twice: the first check fails (change batteries again), the second check is correct so the `until` is satisfied.', refs: [{ src: D02, page: 17 }],
        },
        {
          id: 'd02-clock-d', kind: 'trace', label: 'd', decks: ['D02'], topic: 'Pseudocode', patterns: ['while-condition'], ask: 'output', stdin: ['yes', 'yes'],
          stem: 'The pseudocode of Flowchart-3. Inputs: moved = yes; the first check says correct = yes. What is printed?',
          pseudo: `Program FixClock
{ Fixes the wall clock until it shows the correct time }
DECLARATIONS
  moved, correct : string
ALGORITHM
  input(moved)
  if moved = "no" then
    output("Change batteries")
  { the hand is now moving }
  repeat
    output("Fix clock hand")
    output("Check after 2 days")
    input(correct)
    if correct = "no" then
      output("Change batteries")
  until correct = "yes"`,
          lineNotes: [
            { line: [6, 8], note: 'A single case: the batteries are changed only if the hand is not moving.' },
            { line: [10, 16], note: '`repeat ... until`: the loop body runs **at least once** (test at the end). That fits: the hand position must be fixed at least once.' },
            { line: 15, note: 'If the check fails, change the batteries, then the loop repeats the position fix.' },
            { line: 16, note: 'Stop condition: the time is correct. The loop repeats while `correct = "no"`.' },
          ],
          explanation: 'The hand is moving so the batteries are not changed; the loop runs once and stops immediately because correct = yes.', refs: [{ src: D02, page: 18 }],
        },
      ],
    },
    {
      id: 'd02-photo', archetype: 'trace', title: 'Which photo do you want?',
      source: slide(D02, 'Example-5', [19, 20, 21]), figures: [{ src: D02, page: 20 }],
      intro: 'Bella wants a photo with a beach umbrella, with nothing on the head, and where the sea is visible. The pseudocode below scans the photos one by one. Input: N, then for each photo three answers (umbrella, something on head, sees ocean).',
      parts: [{
        id: 'd02-photo-a', kind: 'trace', decks: ['D02'], topic: 'Searching', patterns: ['search-flag', 'nested-if'], ask: 'output', stdin: ['3', 'yes', 'yes', 'yes', 'no', 'no', 'yes', 'yes', 'no', 'yes'],
        stem: 'Run the pseudocode on 3 photos: photo 1 = (yes, yes, yes), photo 2 = (no, no, yes), photo 3 = (yes, no, yes). What is printed?',
        pseudo: `Program WhichPhoto
{ Finds the first photo that meets all three criteria }
DECLARATIONS
  N, i, found : integer
  umbrella, head, ocean : string
ALGORITHM
  input(N)
  i ← 1
  found ← 0
  repeat
    input(umbrella)
    input(head)
    input(ocean)
    if umbrella = "yes" then
      if head = "no" then
        if ocean = "yes" then
          found ← 1
        else
          i ← i + 1
      else
        i ← i + 1
    else
      i ← i + 1
  until (i > N) or (found = 1)
  if found = 1 then
    output("Photo found")
    output(i)
  else
    output("Photo not found")`,
        lineNotes: [
          { line: [8, 9], note: 'Initialization: start from the first photo, `found` (the flag) is false/0.' },
          { line: [10, 13], note: 'Each iteration checks one photo, so the three answers are read at the start of the loop body.' },
          { line: [14, 23], note: 'Three nested conditions; in every failing branch, move on to the next photo (`i ← i + 1`, "Check next photo"). `i` increases only if the photo is rejected, so when a photo is found `i` points to the right one.' },
          { line: 24, note: 'Two stop conditions joined by `or`: all photos checked or a photo found (slide: "all photos checked or correct photo found").' },
          { line: [25, 29], note: 'After the loop: report the result based on the `found` flag, the search-with-flag pattern.' },
        ],
        explanation: 'Photo 1 is rejected because there is something on the head (head = yes), photo 2 is rejected because there is no umbrella, photo 3 meets all three.', refs: [{ src: D02, page: 21 }],
      }],
    },
    {
      id: 'd02-maze', archetype: 'trace', title: 'Exiting the maze: the four moves A-D repeated',
      source: slide(D02, 'Example-1', [8]), figures: [{ src: D02, page: 8 }],
      intro: 'Mira remembers only four moves: A = one step forward then face left; B = one step forward then face right; C = two steps forward then face left; D = two steps forward then face right. A move sequence may be repeated. The slide asks for the sequence that, repeated twice, leads out of the maze: find it on the figure (page 8).',
      parts: [{
        id: 'd02-maze-a', kind: 'trace', decks: ['D02'], topic: 'Repetition', patterns: ['for-count', 'nested-if'], ask: 'output',
        stem: 'This simulator starts at (0, 0) facing north (up). Which position and heading are printed after the sequence "CB" is repeated twice?',
        code: r`seq = "CB"
x = 0
y = 0
d = 0              # 0=N, 1=E, 2=S, 3=W
dx = [0, 1, 0, -1]
dy = [1, 0, -1, 0]
for k in range(2):
    for m in seq:
        if (m == "A" or m == "B"):
            steps = 1
        else:
            steps = 2
        x = x + dx[d] * steps
        y = y + dy[d] * steps
        if (m == "A" or m == "C"):
            d = (d + 3) % 4      # turn left
        else:
            d = (d + 1) % 4      # turn right
print(x, y, d)`,
        lineNotes: [
          { line: [1, 6], note: 'Data: the move sequence to repeat, the start position, the direction (0=north) and the position offset per direction.' },
          { line: 7, note: 'The whole sequence is repeated 2 times (outer loop): this is the "repeated twice" in the question.' },
          { line: 8, note: 'The inner loop processes each move letter in order (sequence).' },
          { line: [9, 12], note: 'A and B move forward 1 step; C and D move forward 2 steps.' },
          { line: [13, 14], note: 'Move `steps` steps in the current direction.' },
          { line: [15, 18], note: 'After moving, turn: A and C to the left (direction +3 mod 4), B and D to the right (+1 mod 4).' },
        ],
        explanation: 'Trace step by step: the direction changes with every move, so the direction is no longer north in the second round. The program computes the result.', refs: [{ src: D02, page: 8 }],
      }],
    },
    {
      id: 'd02-bookclub', archetype: 'trace', title: 'Book sharing club (depth-first lending)',
      source: slide(D02, 'Example-2', [9]), figures: [{ src: D02, page: 9 }],
      intro: 'Rule: a student lends the book to the youngest friend who has not borrowed it yet; if every friend has borrowed it, the book goes back to the student who lent it. Ben (11) starts. Friends: Ben-Tom, Ben-Ted, Ben-Kim, Tom-Bill, Bill-Ted, Bill-Anna, Ted-Anna, Ted-Sara, Ted-Kim, Anna-Sara. Ages: Ben 11, Tom 17, Ted 10, Bill 10, Anna 9, Kim 12, Sara 18.',
      parts: [{
        id: 'd02-bookclub-a', kind: 'trace', decks: ['D02'], topic: 'Algorithms on graphs', patterns: ['while-condition', 'search-flag'], ask: 'output',
        stem: 'The program simulates the rule. What does it print: the order in which the students read the book? Who is the last reader?',
        code: r`age = {"Ben": 11, "Tom": 17, "Ted": 10, "Bill": 10, "Anna": 9, "Kim": 12, "Sara": 18}
friends = {
    "Ben": ["Tom", "Ted", "Kim"],
    "Tom": ["Ben", "Bill"],
    "Ted": ["Ben", "Bill", "Anna", "Sara", "Kim"],
    "Bill": ["Tom", "Ted", "Anna"],
    "Anna": ["Bill", "Ted", "Sara"],
    "Kim": ["Ben", "Ted"],
    "Sara": ["Ted", "Anna"]}
readers = ["Ben"]
path = ["Ben"]
while (len(path) > 0):
    cur = path[-1]
    best = ""
    for f in friends[cur]:
        if (f not in readers):
            if (best == "" or age[f] < age[best]):
                best = f
    if (best == ""):
        path.pop()
    else:
        readers.append(best)
        path.append(best)
print(" ".join(readers))
print(readers[-1])`,
        lineNotes: [
          { line: [1, 9], note: 'Abstracted data: only the ages and the friendship relations matter (other names, faces, etc. are dropped).' },
          { line: [10, 11], note: '`readers` records who has already read; `path` is the trail of book holders (a stack), going back to whoever lent it = pop.' },
          { line: 12, note: 'Stop when the book has returned to Ben and no one else can be lent it.' },
          { line: [13, 18], note: 'The current holder = the end of the trail. Pick the **youngest** friend who has not read: a minimum-search-with-condition pattern.' },
          { line: [19, 20], note: 'All friends have read: return the book to the previous lender (`pop`).' },
          { line: [21, 23], note: 'There is a friend: the book is lent, and that friend becomes the new holder.' },
          { line: [24, 25], note: 'Output: the order of readers; the last reader is the answer to the Bebras question.' },
        ],
        explanation: 'This is a *depth-first* traversal: from Ben to the youngest friend, going deeper, and backing up at a dead end. The last reader is the last element of the order.', refs: [{ src: D02, page: 9 }],
      }],
    },
    {
      id: 'd02-pickups', archetype: 'program', title: 'Invitation pickups (generalised)',
      source: slide(D02, 'Example-6', [22]), figures: [{ src: D02, page: 22 }],
      intro: 'Patra invites only friends who live no more than 20 km from his house. Invited friends who live more than 17 km away are picked up. The slide asks us to generalise the steps so they work on other maps: a list of distances is all that is needed.',
      parts: [
        {
          id: 'd02-pickups-a', kind: 'trace', label: 'a', decks: ['D02'], topic: 'Nested branching', patterns: ['for-count', 'nested-if'], ask: 'output',
          stem: 'The program applies the rule to 8 friends (illustrative distances in km). What does it print? Pay attention to the friend at exactly 17 km.',
          code: r`names = ["Wells", "Bath", "Ranby", "Rand", "Saron", "Mold", "Bilby", "Weir"]
dist = [2, 8, 12, 13, 16, 17, 21, 25]
for i in range(8):
    if (dist[i] <= 20):
        if (dist[i] > 17):
            print(names[i] + ": invited, pickup")
        else:
            print(names[i] + ": invited")
    else:
        print(names[i] + ": not invited")`,
          lineNotes: [
            { line: [1, 2], note: 'The map data is abstracted into two parallel arrays: names and distances (details of roads, trees, lakes are dropped).' },
            { line: 3, note: 'One iteration per friend: the same algorithm for any map (generalization).' },
            { line: 4, note: '`<= 20`: exactly 20 km is still invited (the bound is included).' },
            { line: 5, note: '`> 17` (not `>=`): exactly 17 km is **not** picked up. The conditions are nested because pickup is only for those who are invited.' },
            { line: [9, 10], note: 'Everyone else (> 20 km) is not invited.' },
          ],
          explanation: 'Mold (17 km) is invited but not picked up because the pickup condition is more than 17 km. The distances in the table are illustrative, not all the numbers on the map.', refs: [{ src: D02, page: 22 }],
        },
        {
          id: 'd02-pickups-b', kind: 'program', label: 'b', decks: ['D02', 'D05'], topic: 'Conditional counting', patterns: ['count-if', 'for-count', 'nested-if'], misconceptions: ['off-by-one'],
          stem: 'Generalise: read N, then N distances (km) one per line. Print the number of invited friends, then the number of friends who must be picked up (distance > 17 and <= 20).',
          reps: ['python', 'pseudo', 'flow'], match: 'numbers',
          solution: {
            python: r`# Program Pickups
# Counts invited friends (distance <= 20) and pickups (17 < distance <= 20)
# DECLARATIONS
# N, i, d : int
# invited, pickup : int
# ALGORITHM
N = int(input())
invited = 0
pickup = 0
for i in range(N):
    d = int(input())
    if (d <= 20):
        invited = invited + 1
        if (d > 17):
            pickup = pickup + 1
print(invited)
print(pickup)`,
            pseudo: `Program Pickups
{ Counts invited friends (<= 20 km) and picked-up friends (> 17 km) }
DECLARATIONS
  N, i, d, invited, pickup : integer
ALGORITHM
  input(N)
  invited ← 0
  pickup ← 0
  i traversal [1..N]
    input(d)
    if (d <= 20) then
      invited ← invited + 1
      if (d > 17) then
        pickup ← pickup + 1
  output(invited)
  output(pickup)`,
          },
          tests: [{ stdin: ['8', '2', '8', '12', '13', '16', '17', '21', '25'] }, { stdin: ['3', '17', '18', '20'], edge: 'bounds 17 and 20' }, { stdin: ['2', '21', '40'], edge: 'nobody invited' }, { stdin: ['1', '19'], edge: 'N = 1' }],
          wrong: [
            { code: 'N = int(input())\ninvited = 0\npickup = 0\nfor i in range(N):\n    d = int(input())\n    if (d < 20):\n        invited = invited + 1\n        if (d > 17):\n            pickup = pickup + 1\nprint(invited)\nprint(pickup)', msg: 'The 20 km limit is included ("no more than 20"), so use `<= 20`, not `< 20`.', tag: 'off-by-one' },
            { code: 'N = int(input())\ninvited = 0\npickup = 0\nfor i in range(N):\n    d = int(input())\n    if (d <= 20):\n        invited = invited + 1\n    if (d >= 17):\n        pickup = pickup + 1\nprint(invited)\nprint(pickup)', msg: 'Pickup is only for those who are invited and the condition is "more than 17" (`> 17`), not `>= 17`; friends > 20 km are not picked up.', tag: 'off-by-one' },
          ],
          plan: 'read N; invited ← 0; pickup ← 0; repeat N times: read d; if d ≤ 20 then increase invited, and if d > 17 increase pickup; print both',
          hints: ['Which pattern? Count-if inside a traversal.', 'Pickup is a sub-case of invited: put it inside the same if.', 'Note the difference between `<=` and `<` at exactly 20 km.'],
          work: ['Read N and set up two counters at 0 before the loop.', 'Repeat N times: read one distance.', 'If the distance <= 20: increase invited.', 'Inside that case, if the distance > 17: increase pickup.', 'After the loop, print invited then pickup.'],
          syntax: ['input', 'for-range', 'if'],
          lineNotes: [
            { line: [1, 6], note: 'The course-style program skeleton: title, specification, DECLARATIONS as comments.', syntax: 'program-template' },
            { line: 7, note: '`int(input())`: input is always a string, convert it to int before using it in `range` and comparisons.', syntax: 'input' },
            { line: [8, 9], note: 'Both counters are initialized **before** the loop (inside the loop they would be reset).' },
            { line: 10, note: '`range(N)` gives exactly N iterations (0..N-1): one iteration per friend.', syntax: 'for-range' },
            { line: 11, note: 'One input is read per iteration, not all at the start.' },
            { line: [12, 13], note: '`<= 20`: the 20 km bound is included. Only invited friends are counted.' },
            { line: [14, 15], note: '`> 17` is nested inside invited: pickup only for those who are invited and more than 17 away (exactly 17 is not picked up).' },
            { line: [16, 17], note: 'Print after the loop finishes (Termination): invited first, then pickup.' },
          ],
          pseudoNotes: [
            { line: [7, 8], note: 'Initialize the counters before the traversal.' },
            { line: 9, note: '`i traversal [1..N]`: N iterations, the upper bound is included (no +1 as in `range`).' },
            { line: [11, 14], note: 'Nested cases: invited first, then picked up if > 17.' },
          ],
          explanation: 'Two counters are initialized before the loop; inside the loop `if d <= 20` increases invited and, inside it, `if d > 17` increases pickup.', refs: [{ src: D02, page: 22 }],
        },
      ],
    },

    /* ======================================================= D04 ======================================================= */
    {
      id: 'd04-sum', archetype: 'trace', title: 'Program Test: A + B',
      source: slide(D04, 'Example program', [11, 12]), figures: [{ src: D04, page: 12 }],
      parts: [{
        id: 'd04-sum-a', kind: 'trace', decks: ['D04'], topic: 'Program structure', patterns: ['sequence-io'], ask: 'table', watch: ['A', 'B'], stdin: ['3', '4'],
        stem: 'Trace the program with input 3 then 4. Fill the table of A and B, then give the output.',
        code: r`# Program Test
# Specification: Calculate value of A and B
# DECLARATIONS
# A : int
# B : int
# ALGORITHM
A = int(input())          # input
B = int(input())
A = A + B                 # process
print(A)                  # output
print(B)`,
        syntax: ['program-template', 'input', 'assign'],
        lineNotes: [
          { line: [1, 2], note: 'The title and specification are written as comments (`#`): they are not executed, but they are graded in the exam.', syntax: 'comment' },
          { line: [3, 5], note: 'DECLARATIONS: variable names and types are written as comments for documentation.', syntax: 'declarations' },
          { line: [7, 8], note: '`int(input())`: input is always a string, so it must be converted to int to be added.', syntax: 'input' },
          { line: 9, note: 'Assignment: the right side is evaluated first (3 + 4), and the result is stored into A. The old value of A is lost, B stays.', syntax: 'assign' },
          { line: [10, 11], note: 'Output: A has become 7, B is still 4. The order of the prints determines the order of the output.' },
        ],
        explanation: 'A = 3, B = 4; after `A = A + B`, A becomes 7 and B stays 4, so A is printed, then B. The pseudocode and flowchart are equivalent (slide 11).', refs: [{ src: D04, page: 12 }],
      }],
    },
    {
      id: 'd04-order', archetype: 'trace', title: 'Does the order of instructions matter?',
      source: slide(D04, 'Sequential Action', [40, 41, 42]), figures: [{ src: D04, page: 42 }],
      parts: [
        {
          id: 'd04-order-a', kind: 'trace', label: 'a', decks: ['D04'], topic: 'Instruction order', patterns: ['sequence-io'], ask: 'output', stdin: ['5'],
          stem: 'Input 5. What is printed?',
          code: r`# Program Test
# DECLARATIONS
# i : int
# x : float
# ALGORITHM
i = int(input())
x = 100.75
print(x)
print(i*2)`,
          lineNotes: [
            { line: [6, 7], note: 'Two assignments that do not depend on each other: they can be swapped without changing the result.' },
            { line: [8, 9], note: 'Print order = output order: x first, then i*2. `i*2` is an expression; i itself does not change.' },
          ],
          explanation: 'Output: 100.75 then 10.', refs: [{ src: D04, page: 41 }],
        },
        {
          id: 'd04-order-b', kind: 'trace', label: 'b', decks: ['D04'], topic: 'Instruction order', patterns: ['sequence-io'], ask: 'output', stdin: ['5'],
          stem: 'The two print lines are swapped. Input 5. What is printed now?',
          code: r`# Program Test
# DECLARATIONS
# i : int
# x : float
# ALGORITHM
i = int(input())
x = 100.75
print(i*2)
print(x)`,
          lineNotes: [{ line: [8, 9], note: 'The prints are swapped so the output order changes: the order of sequential instructions determines the result.' }],
          explanation: 'The output becomes 10 then 100.75: swapping two output statements changes the execution result.', refs: [{ src: D04, page: 42 }],
        },
        {
          id: 'd04-order-c', kind: 'mcq-multi', label: 'c', decks: ['D04'], topic: 'Instruction order', stem: 'In Program Test (A = int(input()); B = int(input()); A = A + B; print(A); print(B)) for inputs 3 and 4: which modifications keep the output unchanged? (O = unchanged, X = changed)',
          options: ['Swap the two input lines', 'Swap `A = A + B` with `print(A)`', 'Swap `print(A)` with `print(B)`', 'Insert an unused assignment `C = 0` between the two input lines'],
          correct: [false, false, false, true],
          why: ['The input values 3 and 4 are swapped between A and B, so A + B is still 7 but B becomes 3, not 4: the output changes.', 'print(A) would print 3 (before the sum) instead of 7.', 'The output order changes (4 then 7).', 'Variable C is not read by any instruction and does not change A or B, so the output stays 7 then 4.'],
          explanation: 'Two instructions may be swapped only if they do not depend on each other (they do not write/read the same variable and do not change the output order); swapping the inputs changes the contents of A and B.', refs: [{ src: D04, page: 40 }],
        },
      ],
    },
    {
      id: 'd04-block', archetype: 'trace', title: 'Program blocks and indentation',
      source: slide(D04, 'Program Block', [43, 44]), figures: [{ src: D04, page: 44 }],
      parts: [
        {
          id: 'd04-block-a', kind: 'trace', label: 'a', decks: ['D04'], topic: 'Blocks and indentation', patterns: ['if-else'], ask: 'output', stdin: ['60'],
          stem: 'Input 60. What is printed?',
          code: r`# Program Test
# DECLARATIONS
# a : int
# ALGORITHM
a = int(input("Enter a number = "))
if (a > 50):
    print("Hello World!")
    print("bye")
else: # a <= 50
    print("Hello Darling!")
    print("bye bye")`,
          syntax: ['if-else', 'indentation'],
          lineNotes: [
            { line: 5, note: 'The text inside `input(...)` is only a prompt; it is not part of the program output.' },
            { line: [6, 8], note: 'Two lines indented by 4 spaces = one block that runs together when a > 50.', syntax: 'indentation' },
            { line: [9, 11], note: '`else` pairs with `if`; the second block runs only if a <= 50. Only one of the blocks runs.', syntax: 'if-else' },
          ],
          explanation: 'a = 60 > 50, so the `if` block runs: two output lines from the first block.', refs: [{ src: D04, page: 44 }],
        },
        {
          id: 'd04-block-b', kind: 'trace', label: 'b', decks: ['D04'], topic: 'Blocks and indentation', patterns: ['if-else'], ask: 'output', stdin: ['50'],
          stem: 'Same program, input 50 (the boundary). What is printed?',
          code: r`# Program Test
# DECLARATIONS
# a : int
# ALGORITHM
a = int(input("Enter a number = "))
if (a > 50):
    print("Hello World!")
    print("bye")
else: # a <= 50
    print("Hello Darling!")
    print("bye bye")`,
          lineNotes: [{ line: 6, note: '50 > 50 is False, so the boundary case falls into the `else` (slide comment: a <= 50).' }],
          explanation: 'Exactly 50 is not greater than 50, so the `else` block runs.', refs: [{ src: D04, page: 44 }],
        },
        {
          id: 'd04-block-c', kind: 'bug', label: 'c', decks: ['D04'], topic: 'Blocks and indentation', misconceptions: ['indentation'],
          stem: 'The slide marks this program "Error!". Which lines break the indentation rule (instructions of the same block must be indented consistently)?',
          code: `a = int(input("Enter a number = "))
if (a > 50):
    print("Hello World!")
  print("bye")
else: # a <= 50
    print("Hello Darling!")
      print("bye bye")`,
          badLines: [4, 7],
          fixed: `a = int(input("Enter a number = "))
if (a > 50):
    print("Hello World!")
    print("bye")
else: # a <= 50
    print("Hello Darling!")
    print("bye bye")`,
          lineNotes: [{ line: 4, note: 'Indented 2 spaces, although the same block (line 3) is indented 4: Python raises an IndentationError.' }, { line: 7, note: 'Indented 6 spaces with no new block opener: "unexpected indent". All lines of a block must be aligned.' }],
          syntax: ['indentation'],
          explanation: 'In Python, blocks are marked by indentation; all instructions in the same block must be indented equally. Lines 4 and 7 are indented differently from their neighbors.', refs: [{ src: D04, page: 44 }],
        },
      ],
    },
    {
      id: 'd04-circle', archetype: 'trace', title: "Pak Pit's wheels: circumference",
      source: slide(D04, 'Example 1', [45, 46, 47]), figures: [{ src: D04, page: 46 }],
      parts: [{
        id: 'd04-circle-a', kind: 'trace', decks: ['D04'], topic: 'Input-process-output', patterns: ['sequence-io', 'type-conversion'], ask: 'final', watch: ['R', 'Circumference'], stdin: ['10'],
        stem: 'Input R = 10. What is printed, and what are the final values of R and Circumference?',
        code: r`# Program Circle_Circumference
# Calculates the circumference of a circle based on the input radius
# DECLARATIONS
# R : float
# Circumference : float
# ALGORITHM
R = float(input())
Circumference = 2 * 3.14 * R
print(Circumference)`,
        syntax: ['input', 'type-conversion'],
        lineNotes: [
          { line: [4, 5], note: 'Radius and circumference are float because they can be real numbers.' },
          { line: 7, note: '`float(input())`: the radius can be a fraction, so float. `int(...)` would error on "2.5".', syntax: 'type-conversion' },
          { line: 8, note: 'The formula 2πr with π ≈ 3.14. The right side is computed then stored; there is no division so no `/` vs `//` trap.' },
          { line: 9, note: 'The float result is displayed as is; number formatting follows Python.' },
        ],
        explanation: 'R = 10.0 (float); circumference = 2 × 3.14 × 10.0 = 62.8.', refs: [{ src: D04, page: 47 }],
      }],
    },
    {
      id: 'd04-avgheight', archetype: 'trace', title: 'Average height of five students',
      source: slide(D04, 'Example 2', [48, 49, 50]), figures: [{ src: D04, page: 49 }],
      parts: [{
        id: 'd04-avgheight-a', kind: 'trace', decks: ['D04'], topic: 'Input-process-output', patterns: ['sequence-io', 'average'], ask: 'output', stdin: ['160', '170', '165', '175', '180'],
        stem: 'Inputs 160, 170, 165, 175, 180. What is printed?',
        code: r`# Program AverageHeight
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
avg = (t1 + t2 + t3 + t4 + t5)/5
print (avg)`,
        syntax: ['input', 'operators'],
        lineNotes: [
          { line: [7, 11], note: 'Five separate variables, one per input. This is enough for 5 data points but does not scale: for lots of data use a loop/array (D05, D06).' },
          { line: 12, note: 'The parentheses are required: without them only t5 is divided by 5 (`/` has higher precedence than `+`). `/` produces a float.', syntax: 'operators' },
          { line: 13, note: 'Prints the average (float).' },
        ],
        explanation: 'Sum = 850, divided by 5 = 170.0.', refs: [{ src: D04, page: 50 }],
      }],
    },
    {
      id: 'd04-input-str', archetype: 'trace', title: 'input() returns a string',
      source: slide(D04, 'Input and Type Conversion', [27, 28]),
      parts: [{
        id: 'd04-input-str-a', kind: 'trace', decks: ['D04'], topic: 'Input type', patterns: ['type-conversion'], misconceptions: ['input-is-str'], ask: 'output', stdin: ['5'],
        stem: 'The user types 5. What is printed by the two print statements?',
        code: r`A = input()
C = int(A)
print(A + A)
print(C + C)`,
        syntax: ['input', 'type-conversion'],
        lineNotes: [
          { line: 1, note: '`input()` always returns a **string**, whatever is typed: A is "5", not the number 5.', syntax: 'input' },
          { line: 2, note: '`int(A)` turns the string "5" into the number 5; the new variable C has type int.', syntax: 'type-conversion' },
          { line: 3, note: '`+` on strings is concatenation: "5" + "5" becomes "55".' },
          { line: 4, note: '`+` on numbers is addition: 5 + 5 becomes 10.' },
        ],
        explanation: 'The classic trap: forgetting `int()`. With strings, `+` concatenates; with ints, `+` adds.', refs: [{ src: D04, page: 27 }],
      }],
    },
    {
      id: 'd04-print-str', archetype: 'concept', title: 'print() with str()',
      source: slide(D04, 'Output', [29]),
      parts: [{
        id: 'd04-print-str-a', kind: 'bug', decks: ['D04'], topic: 'Output', patterns: ['sequence-io'], misconceptions: ['str-concat'],
        stem: 'The program should print "Hello World! 3" when the input is 3, but it crashes with a TypeError. Find the line.',
        code: `a = int(input())
print("Hello World! " + a)`,
        badLines: [2],
        fixed: `a = int(input())
print("Hello World! " + str(a))`,
        lineNotes: [{ line: 2, note: '`+` between a string and an int is not allowed (TypeError). Wrap the number in `str(a)` so that two strings are joined.' }],
        syntax: ['print-str'],
        explanation: '`str(a)` turns the value of a into a string; `+` on strings is concatenation. Alternative: `print("Hello World!", a)`.', refs: [{ src: D04, page: 29 }],
      }],
    },
    {
      id: 'd04-assign-types', archetype: 'concept', title: 'Assignment and declared types',
      source: slide(D04, 'Exercise (assignment correctness)', [30]), figures: [{ src: D04, page: 30 }],
      intro: 'Variables are declared: IA : int; FA, FB : float; SA, SB : string; BA : bool; CA, CB : char. For each numbered assignment, decide whether it is correct for the declared type.',
      parts: [
        {
          id: 'd04-assign-types-a', kind: 'short', label: 'a', decks: ['D04'], topic: 'Assignment', patterns: ['sequence-io'], stem: 'Which numbered assignments are incorrect? Lines: (1) IA = 10 (2) FA = 3.45 (3) FB = 4.567 (4) FB = IA (5) SA = "ITBJAYA" (6) SA = SB (7) CA = \'C\' (8) CA = "MAJUTERUS" (9) BA = True (10) BA = "#". List the numbers separated by commas.',
          blanks: [{ label: 'incorrect', accept: ['6,8,10', '6, 8, 10', '6 8 10', '6 and 8 and 10', '6, 8 and 10', '(6),(8),(10)'], type: 'text', placeholder: 'mis. 1, 2' }],
          explanation: 'Wrong: **(6)** `SB` has never been given a value, so it cannot be used on the right side; **(8)** a char is a single character, "MAJUTERUS" is a string; **(10)** "#" is a string/character, not a bool. (4) `FB = IA` is usually considered correct because an int can be used as a real value. Note: the key is not printed on the slide; Python itself does not check declared types, but in the exam follow the declared types.',
          hints: ['The right side must be a value/variable that already has a value, with a type matching the left side.'], refs: [{ src: D04, page: 30 }],
        },
        {
          id: 'd04-assign-types-b', kind: 'bug', label: 'b', decks: ['D04'], topic: 'Assignment',
          stem: 'Mark the lines that violate the declared types or use a variable before it has a value.',
          code: `# Program Exercise
# DECLARATIONS
# IA : int
# FA, FB : float
# SA, SB : string
# BA : bool
# CA, CB : char
# ALGORITHM
IA = 10          # (1)
FA = 3.45        # (2)
FB = 4.567       # (3)
FB = IA          # (4)
SA = "ITBJAYA"   # (5)
SA = SB          # (6)
CA = 'C'         # (7)
CA = "MAJUTERUS" # (8)
BA = True        # (9)
BA = "#"         # (10)`,
          badLines: [14, 16, 18],
          fixed: `SB = "ITBJAYA"
SA = SB
CA = 'M'
BA = False`,
          lineNotes: [
            { line: 14, note: 'SB has not been given a value: using it on the right side raises a NameError.' },
            { line: 16, note: 'CA has type char (a single character in single quotes); "MAJUTERUS" is a string.' },
            { line: 18, note: 'BA has type bool; only True/False are valid, "#" is text.' },
          ],
          syntax: ['assign', 'declarations'],
          explanation: 'Lines 14, 16, 18 (items 6, 8, 10).', refs: [{ src: D04, page: 30 }],
        },
      ],
    },
    {
      id: 'd04-names', archetype: 'concept', title: 'Valid variable names',
      source: slide(D04, 'Variable names', [23]),
      parts: [{
        id: 'd04-names-a', kind: 'mcq-multi', decks: ['D04'], topic: 'Variable names', stem: 'Mark each as a valid variable name (O) or invalid (X).',
        options: ['sum_weight', '2nd_value', 'my weight', 'Weight'], correct: [true, false, false, true],
        why: ['Letters, digits, and underscores are allowed.', 'A name must start with a letter.', 'Spaces are not allowed.', 'Valid; and Weight differs from weight because Python is case-sensitive.'],
        explanation: 'A variable name starts with a letter, followed by letters/digits/underscores, with no spaces; Python distinguishes upper and lower case.', refs: [{ src: D04, page: 23 }],
      }],
    },
    {
      id: 'd04-arith', archetype: 'concept', title: 'Arithmetic, relational and logical operators',
      source: slide(D04, 'Operators', [34, 35, 36, 37]), figures: [{ src: D04, page: 34 }],
      intro: 'Let a = 10 and b = 21 (arithmetic and relational parts), a = True and b = False (logical part).',
      parts: [
        {
          id: 'd04-arith-a', kind: 'short', label: 'a', decks: ['D04'], topic: 'Arithmetic operators', patterns: ['operators'], misconceptions: ['int-vs-float-div'],
          stem: 'With a = 10, b = 21 in Python, evaluate: b // a, b / a, b % a, a - b, 2 ** 10.',
          blanks: [{ label: 'b // a', accept: ['2'], type: 'number' }, { label: 'b / a', accept: ['2.1'], type: 'number' }, { label: 'b % a', accept: ['1'], type: 'number' }, { label: 'a - b', accept: ['-11'], type: 'number' }, { label: '2 ** 10', accept: ['1024'], type: 'number' }],
          explanation: '`//` is integer division (result 2), `/` is real division (2.1), `%` is the remainder (1), `**` is power (1024).', hints: ['Integer division drops the fractional part; modulo is the remainder of integer division.'], refs: [{ src: D04, page: 34 }],
        },
        {
          id: 'd04-arith-b', kind: 'short', label: 'b', decks: ['D04'], topic: 'Arithmetic operators', patterns: ['operators'], misconceptions: ['int-vs-float-div'],
          stem: 'Real Python behaviour with negative numbers: evaluate 7 // 2, -7 // 2, 7 % 2, -7 % 3.',
          blanks: [{ label: '7 // 2', accept: ['3'], type: 'number' }, { label: '-7 // 2', accept: ['-4'], type: 'number' }, { label: '7 % 2', accept: ['1'], type: 'number' }, { label: '-7 % 3', accept: ['2'], type: 'number' }],
          explanation: '`//` rounds down (toward minus infinity): -7 // 2 = -4, not -3. The remainder `%` follows the divisor so -7 % 3 = 2 (because -7 = 3 × (-3) + 2).', refs: [{ src: D04, page: 34 }],
        },
        {
          id: 'd04-arith-c', kind: 'short', label: 'c', decks: ['D04'], topic: 'Relational operators', patterns: ['operators'],
          stem: 'With a = 10, b = 21: give True or False for (a == b), (a != b), (a >= b), (a <= b).',
          blanks: [{ label: 'a == b', accept: ['false'], type: 'text' }, { label: 'a != b', accept: ['true'], type: 'text' }, { label: 'a >= b', accept: ['false'], type: 'text' }, { label: 'a <= b', accept: ['true'], type: 'text' }],
          explanation: '10 != 21 and 10 <= 21 are true; 10 == 21 and 10 >= 21 are false. The result of a relational operator is always a bool.', refs: [{ src: D04, page: 35 }],
        },
        {
          id: 'd04-arith-d', kind: 'short', label: 'd', decks: ['D04'], topic: 'Logical operators', patterns: ['operators'],
          stem: 'With a = True and b = False: evaluate (a and b), (a or b), (not a), not (a and b).',
          blanks: [{ label: 'a and b', accept: ['false'], type: 'text' }, { label: 'a or b', accept: ['true'], type: 'text' }, { label: 'not a', accept: ['false'], type: 'text' }, { label: 'not (a and b)', accept: ['true'], type: 'text' }],
          explanation: '`and` is True only if both are True; `or` is True if at least one is True; `not` flips the value. (a or b) = True because a = True.', refs: [{ src: D04, page: 36 }],
        },
        {
          id: 'd04-arith-e', kind: 'mcq', label: 'e', decks: ['D04'], topic: 'Logical operators', patterns: ['operators'],
          stem: 'The slide table says: "If a = true and b = false, then (a or b) equals false". Which statement is correct?',
          options: ['(a or b) equals True, because at least one operand is True', '(a or b) equals False, as the slide says', '(a or b) is an error for booleans', '(a or b) equals False only when a = b'], answer: [0],
          why: ['`or` is True if at least one operand is True; a = True.', 'That is the error on the slide.', '`or` is valid for bool.', 'Wrong: `or` is False only if both operands are False.'],
          explanation: 'Note: the slide writes (a or b) = false; the correct value is **True**. Truth table of `or`: only False or False is False. Check it in (f).', refs: [{ src: D04, page: 36 }],
        },
        {
          id: 'd04-arith-f', kind: 'trace', label: 'f', decks: ['D04'], topic: 'Logical operators', patterns: ['operators'], ask: 'output',
          stem: 'Check with Python: what is printed?',
          code: r`a = True
b = False
print(a and b)
print(a or b)
print(not a)`,
          lineNotes: [
            { line: 3, note: '`and`: True and False gives False.' },
            { line: 4, note: '`or`: True or False gives **True**; this is what the D04 slide gets wrong (it says False).' },
            { line: 5, note: '`not` flips a bool: not True = False.' },
          ],
          explanation: 'Python runs it: False, True, False. The slide that says (a or b) = False is wrong.', refs: [{ src: D04, page: 36 }],
        },
        {
          id: 'd04-arith-g', kind: 'short', label: 'g', decks: ['D04'], topic: 'Assignment operators', patterns: ['operators'],
          stem: 'Assignment operators. Starting from a = 10 and b = 21 each time: what is a after `a += b`, and what is a after `a *= b`?',
          blanks: [{ label: 'a after a += b', accept: ['31'], type: 'number' }, { label: 'a after a *= b', accept: ['210'], type: 'number' }],
          explanation: '`a += b` is equivalent to `a = a + b` (31); `a *= b` is equivalent to `a = a * b` (210).', refs: [{ src: D04, page: 37 }],
        },
      ],
    },
    {
      id: 'd04-ex1', archetype: 'program', title: 'Exercise 1: Calculate Distance',
      source: slide(D04, 'Exercise 1', [52]),
      parts: [{
        id: 'd04-ex1-a', kind: 'program', decks: ['D04'], topic: 'Input-process-output', patterns: ['sequence-io', 'type-conversion'], misconceptions: ['input-is-str'],
        stem: 'Write a program to calculate distance (in meters) from speed (m/s) and time (seconds), s = v * t. Input: v on the first line, t on the second line (both real numbers). Output: s.',
        reps: ['python', 'pseudo', 'flow'], match: 'numbers',
        solution: {
          python: r`# Program Distance
# Calculates distance s = v * t from speed v (m/s) and time t (s)
# DECLARATIONS
# v, t, s : float
# ALGORITHM
v = float(input())
t = float(input())
s = v * t
print(s)`,
          pseudo: `Program Distance
{ Computes the distance s = v * t }
DECLARATIONS
  v, t, s : real
ALGORITHM
  input(v)
  input(t)
  s ← v * t
  output(s)`,
        },
        tests: [{ stdin: ['10', '5'] }, { stdin: ['2.5', '4'], edge: 'decimal input' }, { stdin: ['0', '10'], edge: 'speed 0' }, { stdin: ['3.5', '2.5'] }],
        wrong: [
          { code: 'v = float(input())\nt = float(input())\ns = v + t\nprint(s)', msg: 'The formula is a product, s = v * t, not a sum.' },
          { code: 'v = int(input())\nt = int(input())\ns = v * t\nprint(s)', msg: 'Speed and time can be decimals; `int(input())` errors on "2.5". Use `float(input())`.', tag: 'input-is-str' },
          { code: 'v = input()\nt = input()\ns = v * t\nprint(s)', msg: 'input() returns a string; multiply only after converting with float().', tag: 'input-is-str' },
        ],
        plan: 'read v, read t, s ← v × t, print s',
        skeleton: 'v = ___(input())\nt = ___(input())\ns = ___\nprint(___)',
        hints: ['Input, process, output: three steps in order.', 'Speed and time can be fractions: which type fits?'],
        work: ['Declare v, t, s as float.', 'Read v and t with `float(input())`.', 'Compute s = v * t.', 'Print s.'],
        syntax: ['program-template', 'input', 'type-conversion'],
        lineNotes: [
          { line: [1, 5], note: 'Skeleton: title + specification (the formula), DECLARATIONS typed float because the inputs are real.', syntax: 'program-template' },
          { line: [6, 7], note: '`float(input())`: the input string is converted to real; `int` would error if 2.5 is typed.', syntax: 'type-conversion' },
          { line: 8, note: 'Process: a single assignment of the formula s = v * t; the result variable is kept separate from the inputs for clarity.' },
          { line: 9, note: 'The output is printed as is (float).' },
        ],
        explanation: 'Sequential order: input v, input t, compute s = v * t, print s.', refs: [{ src: D04, page: 52 }],
      }],
    },
    {
      id: 'd04-ex2', archetype: 'program', title: 'Exercise 2: Triangular Banners',
      source: slide(D04, 'Exercise 2', [53]),
      parts: [{
        id: 'd04-ex2-a', kind: 'program', decks: ['D04'], topic: 'Input-process-output', patterns: ['sequence-io', 'operators'], misconceptions: ['int-vs-float-div'],
        stem: 'Create a program that accepts the height (first line) and the base (second line) of a triangular banner (real numbers) and prints its area, area = 1/2 * base * height.',
        reps: ['python', 'pseudo', 'flow'], match: 'numbers',
        solution: {
          python: r`# Program Triangle_Area
# Calculates the area of a triangle: 1/2 * base * height
# DECLARATIONS
# height, base, area : float
# ALGORITHM
height = float(input())
base = float(input())
area = 0.5 * base * height
print(area)`,
          pseudo: `Program Triangle_Area
{ Area of a triangle = 1/2 * base * height }
DECLARATIONS
  height, base, area : real
ALGORITHM
  input(height)
  input(base)
  area ← 0.5 * base * height
  output(area)`,
        },
        tests: [{ stdin: ['4', '6'] }, { stdin: ['3.5', '2'] }, { stdin: ['0', '5'], edge: 'tinggi 0' }, { stdin: ['7', '1'], edge: 'luas pecahan' }],
        wrong: [
          { code: 'height = float(input())\nbase = float(input())\narea = 1 // 2 * base * height\nprint(area)', msg: '`1 // 2` is integer division = 0, so the area is always 0. Use 0.5 or 1 / 2.', tag: 'int-vs-float-div' },
          { code: 'height = float(input())\nbase = float(input())\narea = base * height\nprint(area)', msg: 'The area of a triangle is half of base × height; the 1/2 factor is missing.' },
        ],
        plan: 'read height, read base, area ← 1/2 × base × height, print area',
        skeleton: 'height = float(input())\nbase = ___\narea = ___ * base * height\nprint(area)',
        hints: ['There are two inputs; the read order follows the question (height first).', 'Be careful writing 1/2: `//` gives 0.'],
        work: ['Read height and base as float.', 'Compute area = 0.5 * base * height.', 'Print area.'],
        syntax: ['input', 'operators'],
        lineNotes: [
          { line: [1, 5], note: 'The specification states the formula; all three variables are float.', syntax: 'program-template' },
          { line: [6, 7], note: 'The read order must match the order in the question (height then base); `float` so decimals are accepted.' },
          { line: 8, note: '`0.5 *` (or `1 / 2 *`): `/` produces a real. Not `1 // 2`, which gives 0.', syntax: 'operators' },
          { line: 9, note: 'Print the area.' },
        ],
        explanation: 'Area = 0.5 × base × height. Beware of integer division `//` for the 1/2 factor.', refs: [{ src: D04, page: 53 }],
      }],
    },
    {
      id: 'd04-ex3', archetype: 'program', title: 'Exercise 3: The Marble Shop',
      source: slide(D04, 'Exercise 3', [54]),
      intro: 'Prices per marble (in hundred rupiah): red 10, green 15, yellow 20. A child buys m red, h green and k yellow marbles (m, h, k >= 0, integers).',
      parts: [{
        id: 'd04-ex3-a', kind: 'program', decks: ['D04'], topic: 'Input-process-output', patterns: ['sequence-io', 'operators'],
        stem: 'Read m, h, k (one per line, in this order). Print the total amount to pay, in hundred rupiah (the unit of the price table).',
        reps: ['python', 'pseudo', 'flow'], match: 'numbers',
        solution: {
          python: r`# Program Marble_Shop
# Total price (in hundred rupiah) of m red (10), h green (15), k yellow (20) marbles
# DECLARATIONS
# m, h, k : int
# total : int
# ALGORITHM
m = int(input())
h = int(input())
k = int(input())
total = 10 * m + 15 * h + 20 * k
print(total)`,
          pseudo: `Program Marble_Shop
{ Total price of the marbles, in hundreds of rupiah }
DECLARATIONS
  m, h, k, total : integer
ALGORITHM
  input(m)
  input(h)
  input(k)
  total ← 10 * m + 15 * h + 20 * k
  output(total)`,
        },
        tests: [{ stdin: ['1', '1', '1'] }, { stdin: ['0', '0', '0'], edge: 'buys nothing' }, { stdin: ['3', '0', '2'] }, { stdin: ['2', '5', '1'] }],
        wrong: [
          { code: 'm = int(input())\nh = int(input())\nk = int(input())\ntotal = 10 * m + 15 * k + 20 * h\nprint(total)', msg: 'The prices are swapped: green is 15, yellow is 20. Match each price with the right color\'s count.' },
          { code: 'm = int(input())\nh = int(input())\nk = int(input())\ntotal = (10 + 15 + 20) * (m + h + k)\nprint(total)', msg: 'Each color has its own price; add up price × quantity per color.' },
        ],
        plan: 'read m, h, k; total ← 10m + 15h + 20k; print total',
        hints: ['Compute the subtotal of each color first: price × quantity.', 'Add the three subtotals.'],
        work: ['Read m, h, k as int.', 'total = 10*m + 15*h + 20*k.', 'Print total.'],
        syntax: ['input', 'operators'],
        lineNotes: [
          { line: [1, 6], note: 'Specification + DECLARATIONS: all int because the number of marbles is a whole number.', syntax: 'program-template' },
          { line: [7, 9], note: 'Read order follows the question: red (m), green (h), yellow (k).' },
          { line: 10, note: 'A single expression: price per color times its count. `*` has higher precedence than `+`, so no parentheses are needed.', syntax: 'operators' },
          { line: 11, note: 'The result is in hundreds of rupiah, following the price table.' },
        ],
        explanation: 'total = 10m + 15h + 20k (hundreds of rupiah). Multiply by 100 if rupiah are asked for.', refs: [{ src: D04, page: 54 }],
      }],
    },

    /* ======================================================= D05 ======================================================= */
    {
      id: 'd05-positive', archetype: 'program', title: 'Print_Positive (one case)',
      source: slide(D05, 'Example 3', [15, 16, 17]), figures: [{ src: D05, page: 17 }],
      intro: 'Given an integer A, state whether it is positive. If A > 0 print "Positive"; otherwise do nothing.',
      parts: [
        {
          id: 'd05-positive-a', kind: 'trace', label: 'a', decks: ['D05'], topic: 'Single-case branching', patterns: ['if-single'], ask: 'output', stdin: ['0'],
          stem: 'The slide implements this spec with the code below. What does it print for input 0? Is that what the spec wants?',
          code: r`# Program Print_Positive
# Input A; If A >= 0, print "positive"
# DECLARATIONS
# A : int
# ALGORITHM
A = int(input())
if (A >= 0):
    print("positif")
# else: no action`,
          syntax: ['if'],
          lineNotes: [
            { line: 2, note: 'The specification in the slide comment writes `>= 0`, although the question asks for A > 0 (positive): an inconsistency in the slide.' },
            { line: 7, note: '`>=` also lets 0 through, although 0 is not a positive number. Boundary cases must be tested.' },
            { line: 8, note: 'A single case without `else`: if the condition is False there is no action at all.', syntax: 'if' },
          ],
          explanation: 'For 0 the program prints "positif", although 0 is not positive. Note: this is an error in the D05 slide (its pseudocode uses `A > 0`).', refs: [{ src: D05, page: 17 }],
        },
        {
          id: 'd05-positive-b', kind: 'bug', label: 'b', decks: ['D05'], topic: 'Single-case branching', patterns: ['if-single'], misconceptions: ['off-by-one'],
          stem: 'Spec: print "Positive" only when A > 0. Find the line that is wrong.',
          code: `# Program Print_Positive
# Input A; If A > 0, print "Positive"
# DECLARATIONS
# A : int
# ALGORITHM
A = int(input())
if (A >= 0):
    print("Positive")`,
          badLines: [7],
          fixed: `# Program Print_Positive
# Input A; If A > 0, print "Positive"
# DECLARATIONS
# A : int
# ALGORITHM
A = int(input())
if (A > 0):
    print("Positive")`,
          lineNotes: [{ line: 7, note: '`>=` is wrong for "positive": zero gets through. Use `>`. Test the boundary value 0 every time.' }],
          explanation: 'Positive means A > 0 (zero is not positive).', refs: [{ src: D05, page: 17 }],
        },
        {
          id: 'd05-positive-c', kind: 'program', label: 'c', decks: ['D05'], topic: 'Single-case branching', patterns: ['if-single'], misconceptions: ['off-by-one'],
          stem: 'Write the program: read an integer A; print "Positive" if A > 0, otherwise print nothing.',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient',
          solution: {
            python: r`# Program Print_Positive
# Input A; If A > 0, print "Positive"
# DECLARATIONS
# A : int
# ALGORITHM
A = int(input())
if (A > 0):
    print("Positive")
# else: no action`,
            pseudo: `Program Print_Positive
{ Input A; if A > 0 write "Positive" }
DECLARATIONS
  A : integer
ALGORITHM
  input(A)
  if (A > 0) then
    output("Positive")
  { else: do nothing }`,
            flow: { title: 'Print_Positive', blocks: [{ t: 'io', dir: 'in', text: 'input(A)' }, { t: 'if', cond: 'A > 0', then: [{ t: 'io', dir: 'out', text: 'output("Positive")' }] }] },
          },
          tests: [{ stdin: ['5'] }, { stdin: ['0'], edge: 'zero is not positive' }, { stdin: ['-3'] }, { stdin: ['1'], edge: 'smallest positive' }],
          wrong: [{ code: 'A = int(input())\nif (A >= 0):\n    print("Positive")', msg: '`>=` also treats 0 as positive. Positive means `A > 0`.', tag: 'off-by-one' }],
          plan: 'read A; if A > 0 then print "Positive"; otherwise do nothing',
          hints: ['One case: no else needed.', 'What about A = 0?'],
          syntax: ['input', 'if'],
          lineNotes: [
            { line: [1, 5], note: 'Title, specification, DECLARATIONS (A : int).', syntax: 'program-template' },
            { line: 6, note: '`int(input())`: the string input is converted to int.', syntax: 'input' },
            { line: 7, note: '`A > 0` (not `>=`): 0 is not a positive number.', syntax: 'if' },
            { line: 8, note: 'The action runs only if the condition is True; the indented line = part of the `if` block.' },
            { line: 9, note: 'One case: no action for a False condition, a comment is enough.' },
          ],
          pseudoNotes: [{ line: 7, note: '`if ... then` without `else`: a single case.' }],
          explanation: 'One condition, one action, no else: there is no output when A <= 0.', refs: [{ src: D05, page: 16 }],
        },
      ],
    },
    {
      id: 'd05-oddeven', archetype: 'program', title: 'Odd_Even (two complementary cases)',
      source: slide(D05, 'Example 4', [18, 19, 20]), figures: [{ src: D05, page: 19 }],
      parts: [
        {
          id: 'd05-oddeven-a', kind: 'trace', label: 'a', decks: ['D05'], topic: 'Two-case branching', patterns: ['if-else'], ask: 'output', stdin: ['7'],
          stem: 'Input 7. What is printed?',
          code: r`# Program Odd_Even
# Input N>0. If N is even, print "even"
# If not, print "odd"
# DECLARATIONS
# N : int
# ALGORITHM
N = int(input()) # Assume: N > 0
if (N % 2 == 0):
    print("even")
else: # N % 2 == 1
    print("odd")`,
          syntax: ['if-else', 'operators'],
          lineNotes: [
            { line: 8, note: '`%` is the remainder; `==` is comparison (not `=`, which assigns). N is even if the remainder of division by 2 is 0.', syntax: 'operators' },
            { line: [9, 11], note: 'The two cases are complementary: `else` catches N % 2 == 1, so the cases are complete and disjoint.', syntax: 'if-else' },
          ],
          explanation: '7 % 2 = 1 ≠ 0, so the `else` branch: odd.', refs: [{ src: D05, page: 20 }],
        },
        {
          id: 'd05-oddeven-b', kind: 'program', label: 'b', decks: ['D05'], topic: 'Two-case branching', patterns: ['if-else'], misconceptions: ['assign-vs-eq', 'int-vs-float-div'],
          stem: 'Read a positive integer N. Print "even" if N is even, otherwise "odd".',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient',
          solution: {
            python: r`# Program Odd_Even
# Input N>0. If N is even, print "even", else print "odd"
# DECLARATIONS
# N : int
# ALGORITHM
N = int(input())          # Assume: N > 0
if (N % 2 == 0):
    print("even")
else:                     # N % 2 == 1
    print("odd")`,
            pseudo: `Program Odd_Even
{ Input N>0. Write "even" if even, otherwise "odd" }
DECLARATIONS
  N : integer
ALGORITHM
  input(N)
  if (N mod 2 = 0) then
    output("even")
  else { N mod 2 = 1 }
    output("odd")`,
            flow: { title: 'Odd_Even', blocks: [{ t: 'io', dir: 'in', text: 'input(N)' }, { t: 'if', cond: 'N mod 2 = 0', then: [{ t: 'io', dir: 'out', text: 'output("even")' }], else: [{ t: 'io', dir: 'out', text: 'output("odd")' }] }] },
          },
          tests: [{ stdin: ['7'] }, { stdin: ['4'] }, { stdin: ['1'], edge: 'N = 1' }, { stdin: ['2'], edge: 'smallest even' }],
          wrong: [
            { code: 'N = int(input())\nif (N % 2 == 1):\n    print("even")\nelse:\n    print("odd")', msg: 'Reversed: remainder 1 means odd, remainder 0 means even.' },
            { code: 'N = int(input())\nif (N / 2 == 0):\n    print("even")\nelse:\n    print("odd")', msg: '`N / 2` is real division (4 / 2 = 2.0), not the remainder. Use `N % 2 == 0`.', tag: 'int-vs-float-div' },
          ],
          plan: 'read N; if the remainder of N divided by 2 equals 0 then "even"; otherwise "odd"',
          hints: ['Two complementary cases: a plain if-else is enough.', 'Which operator gives the remainder?'],
          syntax: ['if-else', 'operators'],
          lineNotes: [
            { line: 6, note: 'The assumption N > 0 is noted in the comment, so no other case needs to be handled.', syntax: 'input' },
            { line: 7, note: '`N % 2 == 0`: `%` remainder, `==` comparison. Do not write `=` (assignment) in a condition.', syntax: 'operators' },
            { line: [9, 10], note: '`else` catches the rest (remainder 1). No new condition because the two cases are complementary.', syntax: 'if-else' },
          ],
          pseudoNotes: [{ line: 7, note: 'In pseudocode the remainder is written `mod` and comparison is `=`.' }],
          explanation: 'if-else with N % 2 == 0: even, otherwise odd.', refs: [{ src: D05, page: 20 }],
        },
      ],
    },
    {
      id: 'd05-number', archetype: 'program', title: 'Print_Number (many cases)',
      source: slide(D05, 'Example 5', [21, 22, 23]), figures: [{ src: D05, page: 22 }],
      parts: [
        {
          id: 'd05-number-a', kind: 'trace', label: 'a', decks: ['D05'], topic: 'Multi-case branching', patterns: ['if-elif'], ask: 'output', stdin: ['0'],
          stem: 'Input 0. What is printed?',
          code: r`# Program Print_Number
# Input N. Print whether N is positive, negative, or zero
# DECLARATIONS
# N : int
# ALGORITHM
N = int(input())
if (N > 0):
    print("positive")
elif (N < 0):
    print("negative")
else: # N = 0
    print("zero")`,
          syntax: ['if-elif'],
          lineNotes: [
            { line: [7, 12], note: 'An `if / elif / else` chain: conditions are checked from the top, **only the first block that is True** runs; the rest are skipped.', syntax: 'if-elif' },
            { line: 11, note: '`else` catches the rest: N = 0. The three cases (A>0, A<0, A=0) are complete and disjoint.' },
          ],
          explanation: '0 > 0 is False, 0 < 0 is False, so it falls into the `else`: zero.', refs: [{ src: D05, page: 23 }],
        },
        {
          id: 'd05-number-b', kind: 'bug', label: 'b', decks: ['D05'], topic: 'Multi-case branching', misconceptions: ['input-is-str'],
          stem: 'The slide declares N : float but reads it with int(). Which lines are inconsistent? (One of them must change so that the declared type matches the conversion.)',
          code: `# Program Print_Number
# Input N. Print whether N is positive, negative, or zero
# DECLARATIONS
# N : float
# ALGORITHM
N = int(input())
if (N > 0):
    print("positive")`,
          badLines: [4, 6],
          fixed: `# Program Print_Number
# Input N. Print whether N is positive, negative, or zero
# DECLARATIONS
# N : int
# ALGORITHM
N = int(input())
if (N > 0):
    print("positive")`,
          lineNotes: [
            { line: 4, note: 'Declared as float, although the question says an integer ("integer N").' },
            { line: 6, note: '`int(input())` produces an int; the declaration and the conversion must match. Fix: declare `int` (or, for real numbers, `float(input())`).' },
          ],
          syntax: ['declarations', 'type-conversion'],
          explanation: 'Note: this is an error in the D05 slide (`N : float` but read with `int()`). The declared type and the conversion function must be consistent.', refs: [{ src: D05, page: 23 }],
        },
        {
          id: 'd05-number-c', kind: 'program', label: 'c', decks: ['D05'], topic: 'Multi-case branching', patterns: ['if-elif'], misconceptions: ['not-complete'],
          stem: 'Read an integer N. Print "positive" if N > 0, "negative" if N < 0, and "zero" if N = 0.',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient',
          solution: {
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
else: # N = 0
    print("zero")`,
            pseudo: `Program Print_Number
{ Determines whether N is positive, negative, or zero }
DECLARATIONS
  N : integer
ALGORITHM
  input(N)
  if (N > 0) then
    output("positive")
  else if (N < 0) then
    output("negative")
  else { N = 0 }
    output("zero")`,
            flow: { title: 'Print_Number', blocks: [{ t: 'io', dir: 'in', text: 'input(N)' }, { t: 'if', cond: 'N > 0', then: [{ t: 'io', dir: 'out', text: 'output("positive")' }], else: [{ t: 'if', cond: 'N < 0', then: [{ t: 'io', dir: 'out', text: 'output("negative")' }], else: [{ t: 'io', dir: 'out', text: 'output("zero")' }] }] }] },
          },
          tests: [{ stdin: ['5'] }, { stdin: ['-4'] }, { stdin: ['0'], edge: 'nol' }, { stdin: ['1'], edge: 'batas' }],
          wrong: [
            { code: 'N = int(input())\nif (N >= 0):\n    print("positive")\nelif (N < 0):\n    print("negative")\nelse:\n    print("zero")', msg: '`>= 0` catches zero as positive, so the zero case is never reached: the conditions are not disjoint.', tag: 'not-disjoint' },
            { code: 'N = int(input())\nif (N > 0):\n    print("positive")\nelif (N < 0):\n    print("negative")', msg: 'The case N = 0 is not handled (not complete): add an `else` for zero.', tag: 'not-complete' },
          ],
          plan: 'read N; if N > 0 "positive"; otherwise if N < 0 "negative"; otherwise "zero"',
          hints: ['Three cases: use if / elif / else.', 'Test N = 0: which condition catches it?'],
          syntax: ['if-elif'],
          lineNotes: [
            { line: 6, note: '`int(input())`; the declaration `N : int` matches its conversion (unlike the slide).', syntax: 'type-conversion' },
            { line: [7, 8], note: 'First case: positive, a strict `> 0`.', syntax: 'if-elif' },
            { line: [9, 10], note: '`elif`: checked only if the previous condition is False; there is no need to write `N <= 0 and N < 0`.' },
            { line: [11, 12], note: '`else` = the remaining case (N = 0): guarantees completeness without writing an extra condition.' },
          ],
          pseudoNotes: [{ line: [7, 12], note: 'An `else if` chain: same as if/elif; the final `else` is annotated with the comment { N = 0 }.' }],
          explanation: 'Three complete, disjoint cases: N > 0, N < 0, N = 0 (else).', refs: [{ src: D05, page: 22 }],
        },
      ],
    },
    {
      id: 'd05-complete', archetype: 'concept', title: 'Complete and disjoint conditions',
      source: slide(D05, 'Conditionals (2)', [12, 14]),
      intro: 'A proper set of conditions must be COMPLETE (every case is covered) and DISJOINT (no overlap).',
      parts: [
        {
          id: 'd05-complete-a', kind: 'mcq-multi', label: 'a', decks: ['D05'], topic: 'Complete & disjoint', misconceptions: ['not-complete', 'not-disjoint'],
          stem: 'For an integer A, mark each set of cases as complete and disjoint (O) or not (X).',
          options: ['A > 0, A < 0, A = 0', 'A > 0, A < 0', 'A >= 0, A <= 0', 'A >= 0, A < 0'],
          correct: [true, false, false, true],
          why: ['All numbers are covered and none is in two cases.', 'Not complete: A = 0 is not covered.', 'Not disjoint: A = 0 satisfies both.', 'Two cases: every number falls in exactly one case (zero goes into "A >= 0").'],
          explanation: 'Complete = no value is left out; disjoint = no value falls into two cases.', refs: [{ src: D05, page: 12 }],
        },
        {
          id: 'd05-complete-b', kind: 'trace', label: 'b', decks: ['D05'], topic: 'Complete & disjoint', patterns: ['if-elif'], misconceptions: ['not-disjoint'], ask: 'output', stdin: ['7'],
          stem: 'The conditions below overlap (7 > 5 and 7 > 3), but they are written as an if/elif chain. Input 7. What is printed?',
          code: r`x = int(input())
if (x > 5):
    print("big")
elif (x > 3):
    print("medium")
else:
    print("small")`,
          lineNotes: [
            { line: [2, 5], note: '`elif` is checked only if the previous condition is False, so overlapping conditions still produce just one action.' },
            { line: 6, note: '`else` guarantees completeness.' },
          ],
          explanation: 'Only "big": the elif chain stops at the first true case. Compare with (c).', refs: [{ src: D05, page: 14 }],
        },
        {
          id: 'd05-complete-c', kind: 'trace', label: 'c', decks: ['D05'], topic: 'Complete & disjoint', patterns: ['if-single'], misconceptions: ['not-disjoint'], ask: 'output', stdin: ['7'],
          stem: 'Now the same thresholds written as separate if statements. Input 7. What is printed?',
          code: r`x = int(input())
if (x > 5):
    print("big")
if (x > 3):
    print("medium")
if (x <= 3):
    print("small")`,
          lineNotes: [
            { line: [2, 5], note: 'Two separate `if`s are evaluated independently: overlapping conditions (7 > 5 and 7 > 3) run **both** actions.' },
            { line: [6, 7], note: 'The third case is made disjoint from the others only for `small`; "big" and "medium" still overlap.' },
          ],
          explanation: 'Prints "big" and "medium": the conditions are not disjoint. Use `elif` or disjoint conditions (e.g. 3 < x <= 5).', refs: [{ src: D05, page: 12 }],
        },
      ],
    },
    {
      id: 'd05-addingup', archetype: 'program', title: 'AddingUp_Numbers (for and while)',
      source: slide(D05, 'Example 1', [35, 36, 37, 38, 41, 42]), figures: [{ src: D05, page: 38 }],
      intro: 'Read N (N > 0). Print 1, 2, ..., N (one per line), then print 1 + 2 + ... + N.',
      parts: [
        {
          id: 'd05-addingup-a', kind: 'trace', label: 'a', decks: ['D05'], topic: 'for loops', patterns: ['for-count', 'accumulate-sum'], ask: 'table', watch: ['i', 'sum'], stdin: ['3'],
          stem: 'Trace the for-loop version with N = 3: table of i and sum, then the output.',
          code: r`# Program AddingUp_Numbers
# Calculate 1+2+3+...+N and print the result.
# Assumption: N > 0
# DECLARATIONS
# N : int
# i, sum : int
# ALGORITHM
N = int(input())               # initialization
sum = 0                        # initialization
for i in range(1,N+1):
    print(i)                   # action
    sum = sum + i              # action
print(sum)                     # Termination`,
          syntax: ['for-range'],
          lineNotes: [
            { line: [8, 9], note: 'Initialization before the loop: read N and zero the accumulator `sum`.' },
            { line: 10, note: '`range(1, N+1)`: the upper bound is excluded, so N+1 is written so that N is processed. The counter `i` automatically increases by 1 each iteration.', syntax: 'for-range' },
            { line: [11, 12], note: 'Repeated action: print i, add it to sum. The number of iterations is known exactly (N), which suits `for`.' },
            { line: 13, note: 'Not indented: Termination, run once after the loop finishes.' },
          ],
          explanation: 'Iterations: i = 1 (sum 1), i = 2 (sum 3), i = 3 (sum 6). Output: 1, 2, 3, 6.', refs: [{ src: D05, page: 38 }],
        },
        {
          id: 'd05-addingup-b', kind: 'trace', label: 'b', decks: ['D05'], topic: 'while loops', patterns: ['while-counter', 'accumulate-sum'], ask: 'table', watch: ['i', 'sum'], stdin: ['3'],
          stem: 'The while-loop version with N = 3: table of i and sum, then the output.',
          code: r`# Program AddUpNumbers
# Calculate 1+2+3+...+N. Assumption: N > 0
# DECLARATIONS
# N : int
# i, sum : int
# ALGORITHM
N = int(input())                       # initialization
sum = 0                                # initialization
i = 1                                  # First-Element
while (i <= N):                        # repetition-condition
    print(i)                           # action
    sum = sum + i                      # action
    i = i + 1                          # Next-Element
# i > N
print(sum)                             # Termination`,
          syntax: ['while'],
          lineNotes: [
            { line: 9, note: 'First-Element: the counter is started manually (in a `for` this is automatic).' },
            { line: 10, note: 'The condition is tested **before** every iteration; if it is False right away, the loop body never runs (the empty case).', syntax: 'while' },
            { line: [11, 12], note: 'Action: print and accumulate.' },
            { line: 13, note: 'Next-Element: you **must** increase i; without this line the condition never becomes False (the loop never ends).' },
            { line: [14, 15], note: 'After leaving the loop i > N (here i = N+1); Termination prints sum.' },
          ],
          explanation: 'Same result as the for version. In a while, i = N+1 after the loop (unlike for, see the counter question).', refs: [{ src: D05, page: 42 }],
        },
        {
          id: 'd05-addingup-c', kind: 'program', label: 'c', decks: ['D05'], topic: 'for loops', patterns: ['for-count', 'accumulate-sum'], misconceptions: ['off-by-one', 'init-in-loop'],
          stem: 'Write it with a for loop: read N (N > 0); print 1..N one per line, then the sum 1 + ... + N.',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['for'],
          solution: {
            python: r`# Program AddingUp_Numbers
# Calculate 1+2+3+...+N and print the result. Assumption: N > 0
# DECLARATIONS
# N : int
# i, sum : int
# ALGORITHM
N = int(input())               # initialization
sum = 0                        # initialization
for i in range(1, N+1):
    print(i)                   # action
    sum = sum + i              # action
print(sum)                     # Termination`,
            pseudo: `Program AddingUp_Numbers
{ Computes 1+2+...+N. Assumption: N > 0 }
DECLARATIONS
  N, i, sum : integer
ALGORITHM
  input(N)
  sum ← 0
  i traversal [1..N]
    output(i)
    sum ← sum + i
  output(sum)`,
            flow: { title: 'AddingUp_Numbers', blocks: [{ t: 'io', dir: 'in', text: 'input(N)' }, { t: 'process', text: 'sum ← 0' }, { t: 'process', text: 'i ← 1' }, { t: 'while', cond: 'i <= N', body: [{ t: 'io', dir: 'out', text: 'output(i)' }, { t: 'process', text: 'sum ← sum + i' }, { t: 'process', text: 'i ← i + 1' }] }, { t: 'io', dir: 'out', text: 'output(sum)' }] },
          },
          tests: [{ stdin: ['5'] }, { stdin: ['1'], edge: 'N = 1' }, { stdin: ['10'] }],
          wrong: [
            { code: 'N = int(input())\nsum = 0\nfor i in range(1, N):\n    print(i)\n    sum = sum + i\nprint(sum)', msg: '`range(1, N)` stops at N-1: N is not included. Write `range(1, N+1)`.', tag: 'off-by-one' },
            { code: 'N = int(input())\nfor i in range(1, N+1):\n    sum = 0\n    print(i)\n    sum = sum + i\nprint(sum)', msg: '`sum = 0` inside the loop resets the sum every iteration. Initialize before the loop.', tag: 'init-in-loop' },
          ],
          plan: 'read N; sum ← 0; for i from 1 to N: print i, sum ← sum + i; print sum',
          skeleton: 'N = int(input())\nsum = ___\nfor i in range(___, ___):\n    print(i)\n    sum = ___\nprint(sum)',
          hints: ['The number of iterations is known: a counter-based loop.', 'The upper bound of range is excluded.'],
          syntax: ['program-template', 'input', 'for-range'],
          lineNotes: [
            { line: 7, note: '`int(input())` so that N can be used in `range`.', syntax: 'input' },
            { line: 8, note: 'The accumulator is initialized before the loop.' },
            { line: 9, note: '`range(1, N+1)`: 1 to N; N+1 because the upper bound is excluded.', syntax: 'for-range' },
            { line: [10, 11], note: 'The loop body is indented: print, then accumulate.' },
            { line: 12, note: 'Not indented = after the loop finishes.' },
          ],
          pseudoNotes: [{ line: 8, note: '`i traversal [1..N]`: in pseudocode the upper bound is included, there is no +1.' }],
          explanation: 'Initialize before the loop, for from 1 to N+1 (exclusive), accumulate inside, print at the end.', refs: [{ src: D05, page: 38 }],
        },
        {
          id: 'd05-addingup-d', kind: 'program', label: 'd', decks: ['D05'], topic: 'while loops', patterns: ['while-counter', 'accumulate-sum'], misconceptions: ['while-no-next', 'init-in-loop'],
          stem: 'Same task, but you must use a while loop with an explicit counter (First-Element, repetition-condition, Next-Element).',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['while'],
          solution: {
            python: r`# Program AddUpNumbers
# Calculate 1+2+3+...+N. Assumption: N > 0
# DECLARATIONS
# N : int
# i, sum : int
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
            pseudo: `Program AddUpNumbers
{ Computes 1+2+...+N. Assumption: N > 0 }
DECLARATIONS
  N, i, sum : integer
ALGORITHM
  input(N)
  sum ← 0
  i ← 1
  while (i <= N) do
    output(i)
    sum ← sum + i
    i ← i + 1
  { i > N }
  output(sum)`,
          },
          tests: [{ stdin: ['5'] }, { stdin: ['1'], edge: 'N = 1' }, { stdin: ['4'] }],
          wrong: [
            { code: 'N = int(input())\nsum = 0\ni = 0\nwhile (i <= N):\n    print(i)\n    sum = sum + i\n    i = i + 1\nprint(sum)', msg: 'The counter must start at 1 (First-Element). Starting at 0 prints a 0 that was not asked for.', tag: 'off-by-one' },
            { code: 'N = int(input())\nsum = 0\ni = 1\nwhile (i < N):\n    print(i)\n    sum = sum + i\n    i = i + 1\nprint(sum)', msg: '`i < N` means N is not processed; use `i <= N`.', tag: 'off-by-one' },
          ],
          plan: 'read N; sum ← 0; i ← 1; while i ≤ N: print i, sum ← sum + i, i ← i + 1; print sum',
          hints: ['Three elements: counter initialization, the condition, and the step to the next element.', 'What happens if i is never increased?'],
          syntax: ['while'],
          lineNotes: [
            { line: [7, 9], note: 'Initialization: the input, the accumulator, and the First-Element (i = 1) all **before** the loop.' },
            { line: 10, note: '`i <= N` (not `<`): N is processed too. The condition is tested before every iteration.', syntax: 'while' },
            { line: [11, 12], note: 'Action.' },
            { line: 13, note: 'Next-Element: forgetting this line makes the loop never end (while-no-next).' },
            { line: 15, note: 'After the loop: print the sum.' },
          ],
          pseudoNotes: [{ line: 9, note: '`while ... do`: the condition is at the start; `i ← i + 1` must be in the loop body.' }],
          explanation: 'The while pattern: init, condition, action, next-element.', refs: [{ src: D05, page: 42 }],
        },
      ],
    },
    {
      id: 'd05-counter', archetype: 'trace', title: 'Counter value after a for loop',
      source: slide(D05, 'Looping Based on Counter (for)', [37, 39]),
      intro: 'The slide says: "The value of i when exiting the loop is hmax+1" (and hmin-1 when counting backward). Real Python behaves differently: the loop variable keeps the last value it took.',
      parts: [
        {
          id: 'd05-counter-a', kind: 'trace', label: 'a', decks: ['D05'], topic: 'for counter', patterns: ['for-count'], ask: 'final', watch: ['i', 'sum'],
          stem: 'What are the final values of i and sum after this loop?',
          code: r`N = 5
sum = 0
for i in range(1, N+1):
    sum = sum + i`,
          lineNotes: [{ line: 3, note: 'In Python, after a `for` loop finishes, `i` keeps the value of the **last element processed** (N = 5), not N+1. (The slide says hmax+1; that applies to the algorithmic/flowchart notation.)' }, { line: 4, note: 'Accumulates 1 + 2 + 3 + 4 + 5.' }],
          explanation: 'i = 5, sum = 15. Note: the D05 slide says the counter ends at hmax+1; in real Python, `i` ends at hmax. Do not use the value of i after a `for` loop as N+1.', refs: [{ src: D05, page: 37 }],
        },
        {
          id: 'd05-counter-b', kind: 'trace', label: 'b', decks: ['D05'], topic: 'for counter', patterns: ['for-count'], ask: 'output',
          stem: 'The range is empty. What is printed?',
          code: r`i = 99
for i in range(1, 1):
    print("never printed")
print(i)`,
          lineNotes: [{ line: 2, note: '`range(1, 1)` is empty: the loop body does not run and the variable `i` is not touched.' }, { line: 4, note: 'i stays 99. (If i had never been assigned, this line would raise a NameError.)' }],
          explanation: 'Prints 99: on an empty range, i is never changed by the loop.', refs: [{ src: D05, page: 37 }],
        },
        {
          id: 'd05-counter-c', kind: 'trace', label: 'c', decks: ['D05'], topic: 'Counting backward', patterns: ['for-backward'], ask: 'final', watch: ['i', 'x'],
          stem: 'Counting backward. What are the final values of i and x?',
          code: r`x = 0
for i in range(5, 0, -1):
    x = x + i`,
          syntax: ['for-backward'],
          lineNotes: [{ line: 2, note: '`range(hmax, hmin-1, -1)`: starts at 5, goes down 1 each iteration, stops before 0 (the bound is excluded). The last value of i = hmin = 1, not hmin-1.', syntax: 'for-backward' }, { line: 3, note: 'x = 5 + 4 + 3 + 2 + 1.' }],
          explanation: 'i = 1 and x = 15.', refs: [{ src: D05, page: 39 }],
        },
        {
          id: 'd05-counter-d', kind: 'mcq', label: 'd', decks: ['D05'], topic: 'for counter', patterns: ['for-count'],
          stem: 'In real Python, after `for i in range(1, 6): pass` finishes, what is the value of i?',
          options: ['5', '6', '1', 'i is undefined'], answer: [0],
          why: ['The last value taken by the counter.', 'The slide says hmax+1, but Python does not increment the counter after the last iteration.', 'That is the initial value.', 'The loop variable still exists after the loop.'],
          explanation: 'Note: the slide writes "The value of i when exiting the loop is hmax+1"; in Python the result is hmax = 5.', refs: [{ src: D05, page: 37 }],
        },
      ],
    },
    {
      id: 'd05-backward', archetype: 'program', title: 'Counting backward (for with step -1)',
      source: slide(D05, 'Counting Backward', [39]),
      parts: [{
        id: 'd05-backward-a', kind: 'program', decks: ['D05'], topic: 'Counting backward', patterns: ['for-backward'], misconceptions: ['off-by-one'],
        stem: 'Read N (N > 0). Print N, N-1, ..., 1, one per line, using a for loop.',
        reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['for'],
        solution: {
          python: r`# Program CountDown
# Prints N, N-1, ..., 1. Assumption: N > 0
# DECLARATIONS
# N, i : int
# ALGORITHM
N = int(input())
for i in range(N, 0, -1):
    print(i)`,
          pseudo: `Program CountDown
{ Prints N, N-1, ..., 1. Assumption: N > 0 }
DECLARATIONS
  N, i : integer
ALGORITHM
  input(N)
  i traversal [N..1]
    output(i)`,
        },
        tests: [{ stdin: ['5'] }, { stdin: ['1'], edge: 'N = 1' }, { stdin: ['3'] }],
        wrong: [
          { code: 'N = int(input())\nfor i in range(N, 0):\n    print(i)', msg: '`range(N, 0)` without a step of -1 counts up and so is empty. Add the step `-1`.', tag: 'off-by-one' },
          { code: 'N = int(input())\nfor i in range(N, 1, -1):\n    print(i)', msg: 'The lower bound is excluded: to stop at 1 write `range(N, 0, -1)` (hmin-1).', tag: 'off-by-one' },
        ],
        plan: 'read N; for i from N down to 1: print i',
        skeleton: 'N = int(input())\nfor i in range(___, ___, ___):\n    print(i)',
        hints: ['Three arguments of range: start, bound (excluded), step.', 'For a countdown the "excluded" bound lies below the last value.'],
        syntax: ['for-backward'],
        lineNotes: [
          { line: 6, note: 'The input N is converted to int.', syntax: 'input' },
          { line: 7, note: '`range(hmax, hmin-1, -1)`: starts at N, step -1, bound 0 is excluded so the last value is 1.', syntax: 'for-backward' },
          { line: 8, note: 'Print the counter every iteration.' },
        ],
        pseudoNotes: [{ line: 7, note: '`i traversal [N..1]`: pseudocode writes the descending range with the bound included.' }],
        explanation: '`range(N, 0, -1)`.', refs: [{ src: D05, page: 39 }],
      }],
    },
    {
      id: 'd05-addup10', archetype: 'program', title: 'AddUp10Number',
      source: slide(D05, 'Example 2', [43, 44, 45, 46]), figures: [{ src: D05, page: 45 }],
      parts: [
        {
          id: 'd05-addup10-a', kind: 'trace', label: 'a', decks: ['D05'], topic: 'for loops', patterns: ['for-count', 'accumulate-sum'], ask: 'table', watch: ['i', 'N', 'sum'], stdin: ['2', '1', '0', '-9', '7', '13', '2', '2', '1', '-1'],
          stem: 'Trace with the slide inputs (2, 1, 0, -9, 7, 13, 2, 2, 1, -1). Fill i, N and sum per iteration. What is printed?',
          code: r`# Program AddUp10Number
# Accepts input of 10 integers and
# print the total number of the 10 integers
# DECLARATIONS
# N, i, sum : int
# ALGORITHM
sum = 0                               # initialization
for i in range(1, 11):
    N = int(input())                  # action
    sum = sum + N                     # action
print(sum)                            # termination`,
          syntax: ['for-range'],
          lineNotes: [
            { line: 7, note: 'The accumulator is initialized outside the loop.' },
            { line: 8, note: '`range(1, 11)` = 10 iterations (i = 1..10): the number of iterations is known, so `for` fits; while is not needed because there is no empty case.', syntax: 'for-range' },
            { line: 9, note: 'The input is read **inside** the loop, one number per iteration; N is only a holding variable, not the number of data items.' },
            { line: 10, note: 'Add the number just read to sum.' },
            { line: 11, note: 'Termination: print the total after the loop.' },
          ],
          explanation: 'Total: 2+1+0-9+7+13+2+2+1-1 = 18 (slide: 18).', refs: [{ src: D05, page: 43 }],
        },
        {
          id: 'd05-addup10-b', kind: 'program', label: 'b', decks: ['D05'], topic: 'for loops', patterns: ['for-count', 'accumulate-sum'], misconceptions: ['off-by-one', 'init-in-loop'],
          stem: 'Write a program that reads 10 integers (one per line) and prints their total.',
          reps: ['python', 'pseudo', 'flow'], match: 'numbers', mustUse: ['for'],
          solution: {
            python: r`# Program AddUp10Number
# Accepts input of 10 integers and prints their total
# DECLARATIONS
# N, i, sum : int
# ALGORITHM
sum = 0                         # initialization
for i in range(1, 11):
    N = int(input())            # action
    sum = sum + N               # action
print(sum)                      # termination`,
            pseudo: `Program AddUp10Number
{ Adds up 10 integers }
DECLARATIONS
  N, i, sum : integer
ALGORITHM
  sum ← 0
  i traversal [1..10]
    input(N)
    sum ← sum + N
  output(sum)`,
            flow: { title: 'AddUp10Number', blocks: [{ t: 'process', text: 'sum ← 0' }, { t: 'process', text: 'i ← 1' }, { t: 'while', cond: 'i <= 10', body: [{ t: 'io', dir: 'in', text: 'input(N)' }, { t: 'process', text: 'sum ← sum + N' }, { t: 'process', text: 'i ← i + 1' }] }, { t: 'io', dir: 'out', text: 'output(sum)' }] },
          },
          tests: [{ stdin: ['2', '1', '0', '-9', '7', '13', '2', '2', '1', '-1'] }, { stdin: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1'] }, { stdin: ['-5', '-5', '-5', '-5', '-5', '-5', '-5', '-5', '-5', '-5'], edge: 'all negative' }, { stdin: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '5'], edge: 'last number' }],
          wrong: [
            { code: 'sum = 0\nfor i in range(1, 10):\n    N = int(input())\n    sum = sum + N\nprint(sum)', msg: '`range(1, 10)` is only 9 iterations; the 10th number is not read. Use `range(1, 11)` or `range(10)`.', tag: 'off-by-one' },
            { code: 'for i in range(1, 11):\n    sum = 0\n    N = int(input())\n    sum = sum + N\nprint(sum)', msg: '`sum = 0` inside the loop resets the total every iteration so only the last number remains.', tag: 'init-in-loop' },
          ],
          plan: 'sum ← 0; repeat 10 times: read N, sum ← sum + N; print sum',
          hints: ['How many times must the action run? Exactly 10: choose the matching loop type.', 'Where must the total be zeroed?'],
          syntax: ['for-range'],
          lineNotes: [
            { line: 6, note: 'The total is zeroed once before the loop.' },
            { line: 7, note: '`range(1, 11)` = 10 times (1..10). The counter i itself is not used in the body.', syntax: 'for-range' },
            { line: 8, note: '`int(input())` inside the loop: each iteration reads one number.', syntax: 'input' },
            { line: 9, note: 'Accumulate.' },
            { line: 10, note: 'Print after the loop (Termination).' },
          ],
          pseudoNotes: [{ line: 7, note: 'The range `[1..10]` in the traversal already includes 10.' }],
          explanation: 'The "sum of N data items" pattern: an accumulator + a for loop with a fixed number of iterations.', refs: [{ src: D05, page: 45 }],
        },
        {
          id: 'd05-addup10-c', kind: 'mcq', label: 'c', decks: ['D05'], topic: 'Choosing for or while',
          stem: 'Why is `for` the appropriate loop for AddUp10Number?',
          options: ['The number of repetitions (10) is known for certain, so the counter range is known and the body surely runs', 'The body might never run at all, so the condition is tested first', 'The loop stops when a sentinel value is entered', 'for is always faster than while'], answer: [0],
          why: ['The reason from the discussion slide.', 'That is a feature of cases that suit while (the empty case).', 'That is the sentinel pattern, which uses while.', 'Not a reason for choosing.'],
          explanation: '`for`: the number of repetitions is known exactly. `while`: may never run (the empty case) or stops because of a condition (sentinel).', refs: [{ src: D05, page: 46 }],
        },
      ],
    },
    {
      id: 'd05-avg', archetype: 'program', title: 'AvgNumbers (sentinel -999)',
      source: slide(D05, 'Example 3', [47, 48, 49, 50, 51]), figures: [{ src: D05, page: 50 }],
      intro: 'Read integers until the user enters -999 (not processed). Print how many numbers were entered, their total, and the average. If the first input is -999, print "No data processed".',
      parts: [
        {
          id: 'd05-avg-a', kind: 'trace', label: 'a', decks: ['D05'], topic: 'Sentinel', patterns: ['while-sentinel', 'average'], ask: 'output', stdin: ['-1', '12', '-6', '10', '2', '-999'],
          stem: 'Inputs -1, 12, -6, 10, 2, -999. What is printed?',
          code: r`# Program AvgNumbers
# Accepts input of an integer number until the user enters -999
# and displays the number of numbers, the total, and the average
# DECLARATIONS
# X, count, sum : int
# avg : float
# ALGORITHM
sum = 0; count = 0           # initialization
X = int(input())             # First-Elmt
while (X != -999):
    count = count + 1        # action
    sum = sum + X
    X = int(input())         # Next-Elmt
# X = -999
# Termination
if (count > 0):
    print("Number of numbers = " + str(count))
    print("Total number = " + str(sum))
    avg = sum/count
    print("Average = " + str(avg))
else:
    print("No data processed")`,
          syntax: ['sentinel', 'while'],
          lineNotes: [
            { line: 8, note: 'Two initializations on one line (`;`): the total and the count are zeroed **before** the loop.' },
            { line: 9, note: 'First-Elmt: read the **first** element **before** the loop (read-ahead) so the condition has a value to test.' },
            { line: 10, note: '`X != -999`: the sentinel (the stop marker value) is not processed; if the first element is already -999, the loop body does not run (the empty case).', syntax: 'sentinel' },
            { line: [11, 12], note: 'Action for a valid element: count and add. The sentinel never gets here.' },
            { line: 13, note: 'Next-Elmt: read the next element at the **end** of the loop body. The reverse order would process the sentinel.' },
            { line: [16, 20], note: '`if (count > 0)` guards against division by zero: `avg = sum/count` only if there is data. `str(avg)`: the variable is avg (the slide wrongly writes `str(rata)`).' },
            { line: [21, 22], note: 'The empty case: no data other than the sentinel.' },
          ],
          explanation: 'Five numbers are processed (the sentinel is not counted): total 17 and average 3.4. Python shows 3.4, the slide writes 3.40. Note: the slide uses `str(rata)`, which is undefined; it should be `str(avg)`.', refs: [{ src: D05, page: 50 }],
        },
        {
          id: 'd05-avg-b', kind: 'trace', label: 'b', decks: ['D05'], topic: 'Sentinel', patterns: ['while-sentinel'], ask: 'output', stdin: ['-999'],
          stem: 'The first input is -999. What is printed?',
          code: r`sum = 0; count = 0
X = int(input())
while (X != -999):
    count = count + 1
    sum = sum + X
    X = int(input())
if (count > 0):
    avg = sum/count
    print("Average = " + str(avg))
else:
    print("No data processed")`,
          lineNotes: [{ line: 3, note: 'The condition is False right away: the loop body never runs.' }, { line: [7, 11], note: 'count stays 0, so the `else` is chosen and no division by zero happens.' }],
          explanation: 'The empty case: the output is only the message "No data processed".', refs: [{ src: D05, page: 47 }],
        },
        {
          id: 'd05-avg-c', kind: 'bug', label: 'c', decks: ['D05'], topic: 'Sentinel', misconceptions: ['str-concat'],
          stem: 'This termination block raises a NameError. Which line is wrong?',
          code: `if (count > 0):
    print("Number of numbers = " + str(count))
    print("Total number = " + str(sum))
    avg = sum/count
    print("Average = " + str(rata))
else:
    print("No data processed")`,
          badLines: [5],
          fixed: `if (count > 0):
    print("Number of numbers = " + str(count))
    print("Total number = " + str(sum))
    avg = sum/count
    print("Average = " + str(avg))
else:
    print("No data processed")`,
          lineNotes: [{ line: 5, note: 'The variable `rata` is never declared or assigned; the result of the division is stored in `avg` on line 4. Print `str(avg)`.' }],
          explanation: 'Note: this is an error on the D05 slide (`str(rata)`); the variable name on the print line must be the same as the variable that was assigned.', refs: [{ src: D05, page: 50 }],
        },
        {
          id: 'd05-avg-d', kind: 'program', label: 'd', decks: ['D05'], topic: 'Sentinel', patterns: ['while-sentinel', 'average', 'count-if'], misconceptions: ['sentinel-counted', 'while-no-next', 'init-in-loop'],
          stem: 'Write the program: read integers until -999 (not processed). Print "Number of numbers = <count>", "Total number = <sum>" and "Average = <avg>"; if there is no data, print "No data processed".',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['while'],
          solution: {
            python: r`# Program AvgNumbers
# Accepts integers until -999 and displays count, total and average
# DECLARATIONS
# X, count, sum : int
# avg : float
# ALGORITHM
sum = 0; count = 0           # initialization
X = int(input())             # First-Elmt
while (X != -999):
    count = count + 1        # action
    sum = sum + X
    X = int(input())         # Next-Elmt
# X = -999
if (count > 0):
    print("Number of numbers = " + str(count))
    print("Total number = " + str(sum))
    avg = sum/count
    print("Average = " + str(avg))
else:
    print("No data processed")`,
            pseudo: `Program AvgNumbers
{ Accepts numbers until -999; writes the count, the sum, and the average }
DECLARATIONS
  X, count, sum : integer
  avg : real
ALGORITHM
  sum ← 0
  count ← 0
  input(X)
  while (X ≠ -999) do
    sum ← sum + X
    count ← count + 1
    input(X)
  { X = -999 }
  if (count > 0) then
    avg ← sum / count
    output("Number of numbers = ", count)
    output("Total number = ", sum)
    output("Average = ", avg)
  else { count = 0 }
    output("No data processed")`,
          },
          tests: [{ stdin: ['-1', '12', '-6', '10', '2', '-999'] }, { stdin: ['-999'], edge: 'empty data' }, { stdin: ['7', '-999'], edge: 'one data item' }, { stdin: ['0', '0', '-999'], edge: 'sum 0, count 2' }, { stdin: ['5', '-999', '8'], edge: 'input after the sentinel is ignored' }],
          wrong: [
            { code: 'sum = 0\ncount = 0\nX = 0\nwhile (X != -999):\n    X = int(input())\n    count = count + 1\n    sum = sum + X\nif (count > 0):\n    print("Number of numbers = " + str(count))\n    print("Total number = " + str(sum))\n    print("Average = " + str(sum/count))\nelse:\n    print("No data processed")', msg: 'The sentinel -999 is counted and added because it is read and then processed right away. Read the first element before the loop and the next element at the end of the loop body.', tag: 'sentinel-counted' },
            { code: 'sum = 0\ncount = 0\nX = int(input())\nwhile (X != -999):\n    count = count + 1\n    sum = sum + X\n    X = int(input())\nprint("Number of numbers = " + str(count))\nprint("Total number = " + str(sum))\nprint("Average = " + str(sum/count))', msg: 'For empty data `sum/count` divides by zero. Check `if (count > 0)` before computing the average.', tag: 'sentinel-counted' },
          ],
          plan: 'sum ← 0; count ← 0; read X; while X ≠ −999: add to sum and count, read X again; if count > 0 print count, sum, average; otherwise "No data processed"',
          skeleton: 'sum = 0; count = 0\nX = int(input())\nwhile (X != ___):\n    count = count + 1\n    sum = ___\n    X = ___\nif (count > 0):\n    avg = ___\n    print("Average = " + str(avg))\nelse:\n    print("No data processed")',
          hints: ['How many times does the loop run? Unknown: use while with a sentinel.', 'Read the first element before the loop and the next element at the end of the loop body.', 'The average is computed only if there is data.'],
          work: ['Initialize sum = 0 and count = 0.', 'Read the first X (First-Elmt).', 'while X != -999: count + 1, sum + X, read the next X.', 'After the loop: if count > 0 compute avg = sum / count and print the three results.', 'Otherwise print "No data processed".'],
          syntax: ['sentinel', 'while', 'print-str'],
          lineNotes: [
            { line: 7, note: 'The total and the count are initialized before the loop.' },
            { line: 8, note: 'Read the first element before the loop (read-ahead).' },
            { line: 9, note: '`X != -999`: the stop condition. while is chosen because there may be no data (the empty case); `for` has no fixed range.', syntax: 'sentinel' },
            { line: [10, 11], note: 'The action is only for valid data: the sentinel is not counted.' },
            { line: 12, note: 'Next-Elmt at the end of the body: read the next one after processing the current one.' },
            { line: 14, note: '`if (count > 0)` guards against division by zero and distinguishes the empty case.' },
            { line: [15, 18], note: '`str()` is required to join a number to text. `sum/count` produces a float.', syntax: 'print-str' },
            { line: [19, 20], note: 'The empty case.' },
          ],
          pseudoNotes: [{ line: 9, note: 'Same as Python: read the first element first (`input(X)`), then `while (X ≠ -999) do`.' }, { line: 15, note: 'The count > 0 guard before dividing.' }],
          explanation: 'The sentinel pattern: read-first, while (X ≠ sentinel), read-next at the end of the body, a count > 0 guard before the average.', refs: [{ src: D05, page: 50 }],
        },
        {
          id: 'd05-avg-e', kind: 'mcq', label: 'e', decks: ['D05'], topic: 'Choosing for or while',
          stem: 'Why is `while` (and not `for`) appropriate for AvgNumbers?',
          options: ['The action might never run (first input is -999) and there is no known range of values for a counter', 'The numbers must be stored in an array', 'while loops are the only loops that can read input', 'The average needs a decimal point'], answer: [0],
          why: ['The slide\'s reason: the empty case and no fixed counter range.', 'There is no array in this question.', 'for can also read input.', 'Not related to the choice of loop.'],
          explanation: 'while fits when the action may never run or stops because of a condition (sentinel).', refs: [{ src: D05, page: 51 }],
        },
      ],
    },

    /* ======================================================= D06 ======================================================= */
    {
      id: 'd06-basics', archetype: 'concept', title: 'Array declaration and element access',
      source: slide(D06, 'Array declaration & access', [6, 7, 9, 10, 12]), figures: [{ src: D06, page: 12 }],
      parts: [
        {
          id: 'd06-basics-a', kind: 'short', label: 'a', decks: ['D06'], topic: 'Array declaration', patterns: ['array-populate'],
          stem: 'Write the Python statement that declares an array T of 8 integers, all initialised to 0 (default-value method).',
          blanks: [{ label: 'declaration', type: 'code', accept: ['T = [0 for i in range(8)]', 'T=[0 for i in range(8)]', 'T = [0 for _ in range(8)]', 'T = [0] * 8'], placeholder: 'T = ...' }],
          explanation: '`T = [0 for i in range(8)]` creates 8 elements with value 0, indices 0 to 7. General form: `[<default> for i in range(<n>)]`.', hints: ['General form: [default-value for i in range(count)].'], refs: [{ src: D06, page: 9 }],
        },
        {
          id: 'd06-basics-b', kind: 'trace', label: 'b', decks: ['D06'], topic: 'Element access', patterns: ['array-populate'], ask: 'output',
          stem: 'What is printed? (Note the last line.)',
          code: r`TabInt = [1, 2, 4, -1, 100, 2, 0, -1, 3, 9]
print(TabInt[5])
x = TabInt[1] + TabInt[6]
TabInt[9] = 9
print(x)
print(TabInt[9])
print(TabInt[-1])`,
          syntax: ['list-index'],
          lineNotes: [
            { line: 1, note: 'A 10-element array, valid indices 0..9 (the first index is 0, not 1).', syntax: 'list-init' },
            { line: 2, note: '`TabInt[5]` is the **sixth** element: indices count from 0.' },
            { line: 3, note: 'An element used as a value in an expression: 2 + 0.' },
            { line: 4, note: 'The element at index 9 is overwritten with 9 (its previous value was also 9, so you cannot see the difference).' },
            { line: 7, note: '`TabInt[-1]` in Python is **valid**: the last element. The slide calls it undefined; that is the rule of the algorithmic notation. In the exam do not rely on negative indices; use indices 0..N-1.' },
          ],
          explanation: 'Output: 2, 2, 9, 9. Note: the D06 slide calls TabInt[-1] "undefined", but in real Python the result is the last element; meanwhile TabInt[10] on a 10-element array raises an IndexError.', refs: [{ src: D06, page: 12 }],
        },
        {
          id: 'd06-basics-c', kind: 'mcq', label: 'c', decks: ['D06'], topic: 'Element access', patterns: ['array-populate'], misconceptions: ['index-range'],
          stem: 'T has 10 elements (T = [0 for i in range(10)]). Which statement raises IndexError (access outside 0..9)?',
          options: ['print(T[10])', 'print(T[9])', 'print(T[0])', 'T[9] = 5'], answer: [0],
          why: ['Index 10 is outside 0..9: IndexError. This is the most common off-by-one trap.', 'The last valid element.', 'The first element.', 'Assigning to the last element is valid.'],
          explanation: 'An array of size N has indices 0..N-1. Accessing index N goes out of bounds.', refs: [{ src: D06, page: 12 }],
        },
      ],
    },
    {
      id: 'd06-populate', archetype: 'trace', title: 'Populating and displaying an array',
      source: slide(D06, 'Populating / Displaying', [17, 18, 19, 20]), figures: [{ src: D06, page: 19 }],
      parts: [{
        id: 'd06-populate-a', kind: 'trace', decks: ['D06'], topic: 'Filling and printing arrays', patterns: ['array-populate'], ask: 'output', stdin: ['3', '1', '4', '1', '5', '9', '2', '6', '5', '3'],
        stem: 'Ten numbers are typed: 3 1 4 1 5 9 2 6 5 3. What is printed?',
        code: r`# Program DisplayArray
# Populates an array with values from the user and displays its contents
# DECLARATIONS
# TabInt : array [0..9] of int
# i : int
# ALGORITHM
TabInt = [0 for i in range(10)]
for i in range(0,10):
    TabInt[i] = int(input())
for i in range(0,10):
    print(TabInt[i])`,
        syntax: ['list-init', 'list-index', 'for-range'],
        lineNotes: [
          { line: 7, note: 'The array is created first with the default value 0; without this `TabInt[i] = ...` gives an error because the elements do not exist yet.', syntax: 'list-init' },
          { line: [8, 9], note: '`range(0,10)` gives indices 0..9 (the upper bound is excluded), exactly as many as there are elements; each iteration fills one element from the keyboard. Be careful not to go out of bounds.', syntax: 'for-range' },
          { line: [10, 11], note: 'A second, separate loop prints each element in order from the lowest index to the highest (sequential traversal).' },
        ],
        explanation: 'Fill first (`input` into `TabInt[i]`), then print: ten lines in the same order as the input.', refs: [{ src: D06, page: 19 }],
      }],
    },
    {
      id: 'd06-average', archetype: 'program', title: 'AverageArray',
      source: slide(D06, 'Calculating the Average', [21, 22]), figures: [{ src: D06, page: 21 }],
      parts: [
        {
          id: 'd06-average-a', kind: 'trace', label: 'a', decks: ['D06'], topic: 'Array average', patterns: ['array-populate', 'accumulate-sum', 'average'], ask: 'output', stdin: ['4', '8', '6', '2', '10', '4', '6', '8', '2', '10'],
          stem: 'Ten numbers are typed: 4 8 6 2 10 4 6 8 2 10. What is printed?',
          code: r`# Program AverageArray
# Calculates the average value of array elements
# DECLARATIONS
# TabInt : array [0..9] of int
# i, sum : int
# avg : float
# ALGORITHM
TabInt = [0 for i in range(10)]
for i in range(0,10):
    TabInt[i] = int(input())
sum = 0
for i in range(0,10):
    sum = sum + TabInt[i]
avg = sum/10
print ("Nilai rata-rata = " + str(avg))`,
          lineNotes: [
            { line: [8, 10], note: 'Fill the array from the keyboard (see PopulatingArray).' },
            { line: 11, note: '`sum = 0` **before** the summing loop, not inside it.' },
            { line: [12, 13], note: 'Traversal: add every element to sum.' },
            { line: 14, note: '`/` produces a float (60/10 = 6.0). Divide by the number of elements; here 10 (better N).' },
            { line: 15, note: '`str(avg)` is required to join it to text.' },
          ],
          explanation: 'Sum = 60, average = 6.0.', refs: [{ src: D06, page: 21 }],
        },
        {
          id: 'd06-average-b', kind: 'program', label: 'b', decks: ['D06'], topic: 'Array average', patterns: ['array-populate', 'accumulate-sum', 'average'], misconceptions: ['int-vs-float-div', 'init-in-loop'],
          stem: 'Read N (N > 0), then N integers (one per line) into an array. Print the average of the elements.',
          reps: ['python', 'pseudo', 'flow'], match: 'numbers', mustUse: ['array'],
          solution: {
            python: r`# Program AverageArray
# Reads N integers into an array and prints their average. Assumption: N > 0
# DECLARATIONS
# N, i, sum : int
# T : array [0..N-1] of int
# avg : float
# ALGORITHM
N = int(input())
T = [0 for i in range(N)]
for i in range(0, N):
    T[i] = int(input())
sum = 0
for i in range(0, N):
    sum = sum + T[i]
avg = sum / N
print(avg)`,
            pseudo: `Program AverageArray
{ Average of the array elements. Assumption: N > 0 }
DECLARATIONS
  N, i, sum : integer
  T : array [0..N-1] of integer
  avg : real
ALGORITHM
  input(N)
  i traversal [0..N-1]
    input(T[i])
  sum ← 0
  i traversal [0..N-1]
    sum ← sum + T[i]
  avg ← sum / N
  output(avg)`,
          },
          tests: [{ stdin: ['3', '1', '2', '4'] }, { stdin: ['1', '7'], edge: 'N = 1' }, { stdin: ['4', '-2', '-4', '-6', '-8'], edge: 'all negative' }, { stdin: ['2', '5', '6'], edge: 'fractional result' }],
          wrong: [
            { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nsum = 0\nfor i in range(0, N):\n    sum = sum + T[i]\nprint(sum // N)', msg: '`//` rounds down so a fractional average is wrong. Use `/`.', tag: 'int-vs-float-div' },
            { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nfor i in range(0, N):\n    sum = 0\n    sum = sum + T[i]\nprint(sum / N)', msg: '`sum = 0` inside the loop resets the sum; only the last element remains.', tag: 'init-in-loop' },
          ],
          plan: 'read N; fill T with N numbers; sum ← 0; add each element to sum; avg ← sum / N; print avg',
          hints: ['Three stages: fill the array, sum, divide.', 'Divide by N (the number of elements), not by the last index.'],
          syntax: ['list-init', 'list-index', 'for-range'],
          lineNotes: [
            { line: 8, note: 'N is read first because it determines the size of the array.' },
            { line: 9, note: '`[0 for i in range(N)]`: an N-element array filled with 0 (indices 0..N-1).', syntax: 'list-init' },
            { line: [10, 11], note: 'Populate: `range(0, N)` = indices 0..N-1, exactly all the elements.', syntax: 'for-range' },
            { line: 12, note: 'Initialize the accumulator before the loop.' },
            { line: [13, 14], note: 'Traversal: access elements with `T[i]`, not `i` (sum the values, not the indices).' },
            { line: 15, note: '`/` is real division; not `//`. N > 0 so there is no division by zero.' },
          ],
          pseudoNotes: [{ line: 9, note: 'Traversal of indices 0..N-1 (the bound is included).' }, { line: 14, note: 'Divide by the number of elements N.' }],
          explanation: 'Fill the array, accumulate, then sum / N.', refs: [{ src: D06, page: 21 }],
        },
      ],
    },
    {
      id: 'd06-max', archetype: 'trace', title: 'MaxArray (largest element)',
      source: slide(D06, 'Finding Extreme Values', [26, 27, 28]), figures: [{ src: D06, page: 28 }],
      parts: [
        {
          id: 'd06-max-a', kind: 'trace', label: 'a', decks: ['D06'], topic: 'Array max/min', patterns: ['max-min'], ask: 'table', watch: ['i', 'max'],
          stem: 'Trace with T = [9, 12, 30, -1, 0, 4, -1, 3, 30, 14]. Fill i and max every time they change. What is printed?',
          code: r`# Program MaxArray
# Find the largest element of an array
# DECLARATIONS
# N : int
# T : array [0..N-1] of int
# i : int
# max : int
# ALGORITHM
T = [9, 12, 30, -1, 0, 4, -1, 3, 30, 14]
N = 10
max = T[0]   # init max with first elmt.
# Starting from 2-nd element
for i in range(1,N):
    # replace max if curr elmt > max
    if (T[i] > max):
        max = T[i]
# Print the largest element
print ("Largest element = " + str(max))`,
          syntax: ['list-index', 'for-range'],
          lineNotes: [
            { line: 11, note: '`max = T[0]`, not 0: if all elements are negative, 0 would wrongly become the maximum. The array is guaranteed to be non-empty.' },
            { line: 13, note: 'Start from index 1 because index 0 is already the initial value; `range(1, N)` stops at N-1 (the last index).', syntax: 'for-range' },
            { line: [15, 16], note: '`>` (strict): an element equal to max does not replace it, the result is the same. Replace only if greater.' },
            { line: 18, note: '`str(max)` is required for `+` with text.' },
          ],
          explanation: 'max: 9 -> 12 (i=1) -> 30 (i=2); the rest are not greater (the second 30 does not replace because of `>`). Output: Largest element = 30.', refs: [{ src: D06, page: 28 }],
        },
        {
          id: 'd06-max-b', kind: 'bug', label: 'b', decks: ['D06'], topic: 'Array max/min', patterns: ['max-min'], misconceptions: ['max-init-zero'],
          stem: 'With T = [-5, -2, -9] the program prints "Largest element = 0". Which line is wrong?',
          code: `T = [-5, -2, -9]
N = 3
max = 0
for i in range(0, N):
    if (T[i] > max):
        max = T[i]
print("Largest element = " + str(max))`,
          badLines: [3],
          fixed: `T = [-5, -2, -9]
N = 3
max = T[0]
for i in range(1, N):
    if (T[i] > max):
        max = T[i]
print("Largest element = " + str(max))`,
          lineNotes: [{ line: 3, note: 'Initializing to 0 assumes there is a positive element. For all-negative data, 0 is never replaced. Always initialize with the first element `T[0]`.' }],
          explanation: 'Initialize the maximum with T[0], not with 0 (or another "small" value).', refs: [{ src: D06, page: 28 }],
        },
      ],
    },
    {
      id: 'd06-search', archetype: 'program', title: 'SearchArray (first index with a found flag)',
      source: slide(D06, 'Searching', [30, 31, 32]), figures: [{ src: D06, page: 32 }],
      parts: [
        {
          id: 'd06-search-a', kind: 'trace', label: 'a', decks: ['D06'], topic: 'Searching', patterns: ['search-flag'], ask: 'table', watch: ['i', 'found'], stdin: ['-1'],
          stem: 'T = [9, 12, 30, -1, 0, 4, -1, 3, 30, 14], X = -1. Trace i and found and give the output.',
          code: r`# Program SearchArray
# Find the index where X is first found in T
# DECLARATIONS
# N : int; size of T
# T : array [0..N-1] of int
# i, X : int
# found : bool
# ALGORITHM
T = [9, 12, 30, -1, 0, 4, -1, 3, 30, 14]
N = 10
X = int(input())
i = 0
found = False
while (i < N and found == False):
    if (T[i] == X):
        found = True
    else:
        i = i + 1
if (found == True):
    print(str(X) + " is found at index " + str(i))
else:
    print(str(X) + " is not found")`,
          syntax: ['while', 'list-index'],
          lineNotes: [
            { line: [12, 13], note: 'Start from index 0 with the flag `found = False` (not found yet).' },
            { line: 14, note: 'Stop when the indices run out **or** the value has been found. `i < N` is written first so `T[i]` is never accessed out of bounds (the `and` evaluation stops at the first operand that is False).' },
            { line: [15, 16], note: 'Found: set `found = True`, and do **not** increase i.' },
            { line: [17, 18], note: 'Increment only in the `else` so that when the value is found `i` keeps pointing to the element found (the first index).' },
            { line: [19, 22], note: 'After the loop, check `found` (not i) to tell "found" from "not present". Without a flag, i = N is ambiguous.' },
          ],
          explanation: 'The first -1 is at index 3: i runs 0, 1, 2, 3 and found becomes True at i = 3. Output: "-1 is found at index 3".', refs: [{ src: D06, page: 32 }],
        },
        {
          id: 'd06-search-b', kind: 'trace', label: 'b', decks: ['D06'], topic: 'Searching', patterns: ['search-flag'], ask: 'output', stdin: ['7'],
          stem: 'The same program with X = 7 (not in T). What is printed? What is the final value of i?',
          code: r`T = [9, 12, 30, -1, 0, 4, -1, 3, 30, 14]
N = 10
X = int(input())
i = 0
found = False
while (i < N and found == False):
    if (T[i] == X):
        found = True
    else:
        i = i + 1
if (found == True):
    print(str(X) + " is found at index " + str(i))
else:
    print(str(X) + " is not found")`,
          lineNotes: [{ line: [6, 10], note: 'Never found: i increases up to N = 10 and the condition `i < N` stops the loop.' }, { line: [11, 14], note: '`found` is still False, so the "is not found" branch. The value of i (= N) must not be printed as an index.' }],
          explanation: 'Output: "7 is not found"; i ends at 10 (= N).', refs: [{ src: D06, page: 32 }],
        },
        {
          id: 'd06-search-c', kind: 'program', label: 'c', decks: ['D06'], topic: 'Searching', patterns: ['search-flag', 'array-populate'], misconceptions: ['index-range'],
          stem: 'Read N (N > 0), then N integers (one per line), then X. Print "X is found at index i" for the FIRST index of X, or "X is not found" (X replaced by its value).',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['array', 'while'],
          solution: {
            python: r`# Program SearchArray
# Reads N integers into T and X; prints the first index where X is found
# DECLARATIONS
# N, X, i : int
# T : array [0..N-1] of int
# found : bool
# ALGORITHM
N = int(input())
T = [0 for i in range(N)]
for i in range(0, N):
    T[i] = int(input())
X = int(input())
i = 0
found = False                       # X is not yet found
while (i < N and found == False):
    if (T[i] == X):
        found = True                # X is found
    else:
        i = i + 1                   # increment only when not found
# i = N or found = True
if (found == True):
    print(str(X) + " is found at index " + str(i))
else:
    print(str(X) + " is not found")`,
            pseudo: `Program SearchArray
{ Finds the first index of X in T }
DECLARATIONS
  N, X, i : integer
  T : array [0..N-1] of integer
  found : boolean
ALGORITHM
  input(N)
  i traversal [0..N-1]
    input(T[i])
  input(X)
  i ← 0
  found ← false
  while (i < N) and (found = false) do
    if (T[i] = X) then
      found ← true
    else { T[i] ≠ X }
      i ← i + 1
  { i >= N or found = true }
  if (found = true) then
    output(X, " is found at index ", i)
  else
    output(X, " is not found")`,
          },
          tests: [{ stdin: ['5', '9', '12', '30', '-1', '0', '-1'] }, { stdin: ['3', '1', '2', '3', '7'], edge: 'not found' }, { stdin: ['4', '8', '2', '2', '5', '2'], edge: 'duplicate: first index' }, { stdin: ['1', '4', '4'], edge: 'N = 1, found' }, { stdin: ['4', '1', '2', '3', '9', '9'], edge: 'at the last index' }],
          wrong: [
            { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nX = int(input())\ni = 0\nfound = False\nwhile (i < N and found == False):\n    i = i + 1\n    if (T[i - 1] == X):\n        found = True\nif (found == True):\n    print(str(X) + " is found at index " + str(i))\nelse:\n    print(str(X) + " is not found")', msg: 'The index is shifted by one because i is also incremented when the value is found. Increment i only in the `else`.', tag: 'off-by-one' },
            { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nX = int(input())\nres = -1\nfor i in range(0, N):\n    if (T[i] == X):\n        res = i\nif (res >= 0):\n    print(str(X) + " is found at index " + str(res))\nelse:\n    print(str(X) + " is not found")', msg: 'This produces the **last** index; the first index is asked for (stop at the first occurrence).' },
          ],
          plan: 'fill T; read X; i ← 0, found ← false; while i < N and not found: if T[i] = X then found ← true, otherwise i ← i + 1; if found print i, otherwise not found',
          skeleton: 'i = 0\nfound = ___\nwhile (i < N and found == ___):\n    if (T[i] == X):\n        found = ___\n    else:\n        i = ___\nif (found == True):\n    print(str(X) + " is found at index " + str(i))\nelse:\n    print(str(X) + " is not found")',
          hints: ['Use a flag to tell found from not found.', 'When may i be incremented?', 'The order `i < N and ...` matters so that T[i] does not go out of bounds.'],
          work: ['Read N, fill T, read X.', 'i = 0; found = False.', 'While i < N and found == False: if T[i] == X set found True; otherwise i increases.', 'After the loop: if found print the index i; otherwise print not found.'],
          syntax: ['while', 'list-index'],
          lineNotes: [
            { line: [8, 11], note: 'Read the size, build the array, fill it from the keyboard (traversal 0..N-1).', syntax: 'list-init' },
            { line: 12, note: 'The X to search for is read after the array is filled, following the input order.' },
            { line: [13, 14], note: 'Search initialization: start index 0 and the flag `found = False`.' },
            { line: 15, note: '`i < N` comes before `found == False` so `T[i]` is never accessed out of bounds.', syntax: 'while' },
            { line: [16, 17], note: 'Found: set the flag; i does not change so it points to the first occurrence.' },
            { line: [18, 19], note: 'Increment only in the `else`: when the value is found, i keeps pointing to the element found.' },
            { line: [21, 24], note: 'Use `found`, not the value of i, to choose the output; `str()` to join text.', syntax: 'print-str' },
          ],
          pseudoNotes: [{ line: 6, note: 'The found flag is declared boolean.' }, { line: [14, 18], note: '`while ... do` with two conditions; `i ← i + 1` only in the `else`.' }],
          explanation: 'The search pattern: a found flag, the loop stops when found or the indices run out, increment in the else, and the final decision based on the flag.', refs: [{ src: D06, page: 32 }],
        },
      ],
    },
    {
      id: 'd06-ex1', archetype: 'program', title: 'Exercise 1: Multiply all elements by X',
      source: slide(D06, 'Exercise-1', [24]),
      parts: [{
        id: 'd06-ex1-a', kind: 'program', decks: ['D06'], topic: 'Processing arrays', patterns: ['array-map', 'array-populate'], misconceptions: ['index-range'],
        stem: 'Read N, then N integers into an array T (one per line), then an integer X. Multiply every element of T by X and print the new elements, one per line.',
        reps: ['python', 'pseudo', 'flow'], match: 'numbers', mustUse: ['array'],
        solution: {
          python: r`# Program MultiplyArray
# Reads N integers into T, then X; multiplies every element by X and prints them
# DECLARATIONS
# N, X, i : int
# T : array [0..N-1] of int
# ALGORITHM
N = int(input())
T = [0 for i in range(N)]
for i in range(0, N):
    T[i] = int(input())
X = int(input())
for i in range(0, N):
    T[i] = T[i] * X
for i in range(0, N):
    print(T[i])`,
          pseudo: `Program MultiplyArray
{ Multiplies every element of T by X }
DECLARATIONS
  N, X, i : integer
  T : array [0..N-1] of integer
ALGORITHM
  input(N)
  i traversal [0..N-1]
    input(T[i])
  input(X)
  i traversal [0..N-1]
    T[i] ← T[i] * X
  i traversal [0..N-1]
    output(T[i])`,
        },
        tests: [{ stdin: ['3', '1', '2', '3', '2'] }, { stdin: ['1', '5', '4'], edge: 'N = 1' }, { stdin: ['4', '4', '-1', '0', '7', '3'], edge: 'contains zero and negative' }, { stdin: ['3', '2', '3', '4', '0'], edge: 'X = 0' }],
        wrong: [
          { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nX = int(input())\nfor i in range(0, N-1):\n    T[i] = T[i] * X\nfor i in range(0, N):\n    print(T[i])', msg: '`range(0, N-1)` skips the last element. `range(0, N)` already covers indices 0..N-1.', tag: 'off-by-one' },
          { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nX = int(input())\nfor i in range(0, N):\n    print(T[i] * X)\nprint(X)', msg: 'The output is only the multiplied elements; do not print an extra X.' },
          { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nX = int(input())\nfor i in range(0, N):\n    T[i] * X\nfor i in range(0, N):\n    print(T[i])', msg: '`T[i] * X` computes but does not store the result. Write `T[i] = T[i] * X`.' },
        ],
        plan: 'read N, fill T, read X; for each index T[i] ← T[i] × X; print all elements of T',
        hints: ['Three steps: fill, multiply, print.', 'Assigning to an element: the left side is also T[i].'],
        syntax: ['list-init', 'list-index', 'for-range'],
        lineNotes: [
          { line: [7, 10], note: 'Read N, create an N-element array, fill it by traversing indices 0..N-1.', syntax: 'list-init' },
          { line: 11, note: 'X is read after the array is filled (input order follows the question).' },
          { line: [12, 13], note: '`T[i] = T[i] * X`: the result is stored back into the same element. `range(0, N)` covers all valid indices.', syntax: 'list-index' },
          { line: [14, 15], note: 'A separate loop prints the new elements, one per line.' },
        ],
        pseudoNotes: [{ line: 12, note: 'Element assignment: `T[i] ← T[i] * X`.' }],
        explanation: 'Fill the array, multiply every element by X (stored back), then print.', refs: [{ src: D06, page: 24 }],
      }],
    },
    {
      id: 'd06-ex2', archetype: 'program', title: 'Exercise 2: Pass / fail count',
      source: slide(D06, 'Exercise-2', [25]),
      parts: [{
        id: 'd06-ex2-a', kind: 'program', decks: ['D06'], topic: 'Processing arrays', patterns: ['count-if', 'array-populate'], misconceptions: ['init-in-loop'],
        stem: 'Read N, then N letter grades (A, B, C, D or E, one per line) into an array of characters. A student passes with A, B or C. Print the number of students who passed, then the number who did not pass (one number per line).',
        reps: ['python', 'pseudo', 'flow'], match: 'numbers', mustUse: ['array'],
        solution: {
          python: r`# Program PassFail
# Reads N letter grades into an array and counts passed (A, B, C) and failed (D, E)
# DECLARATIONS
# N, i, passed, failed : int
# G : array [0..N-1] of char
# ALGORITHM
N = int(input())
G = ['*' for i in range(N)]
for i in range(0, N):
    G[i] = input()
passed = 0
failed = 0
for i in range(0, N):
    if (G[i] == 'A' or G[i] == 'B' or G[i] == 'C'):
        passed = passed + 1
    else:
        failed = failed + 1
print(passed)
print(failed)`,
          pseudo: `Program PassFail
{ Counts students who passed (A,B,C) and failed }
DECLARATIONS
  N, i, passed, failed : integer
  G : array [0..N-1] of character
ALGORITHM
  input(N)
  i traversal [0..N-1]
    input(G[i])
  passed ← 0
  failed ← 0
  i traversal [0..N-1]
    if (G[i] = 'A') or (G[i] = 'B') or (G[i] = 'C') then
      passed ← passed + 1
    else
      failed ← failed + 1
  output(passed)
  output(failed)`,
        },
        tests: [{ stdin: ['5', 'A', 'B', 'C', 'D', 'E'] }, { stdin: ['1', 'E'], edge: 'N = 1, failed' }, { stdin: ['4', 'A', 'A', 'A', 'A'], edge: 'all passed' }, { stdin: ['6', 'D', 'D', 'E', 'B', 'C', 'A'] }],
        wrong: [
          { code: 'N = int(input())\nG = [\'*\' for i in range(N)]\nfor i in range(0, N):\n    G[i] = input()\npassed = 0\nfailed = 0\nfor i in range(0, N):\n    if (G[i] == \'A\' or G[i] == \'B\'):\n        passed = passed + 1\n    else:\n        failed = failed + 1\nprint(passed)\nprint(failed)', msg: 'A grade of C is also a pass. Add `G[i] == \'C\'` to the condition.' },
          { code: 'N = int(input())\nG = [\'*\' for i in range(N)]\nfor i in range(0, N):\n    G[i] = input()\nfor i in range(0, N):\n    passed = 0\n    failed = 0\n    if (G[i] == \'A\' or G[i] == \'B\' or G[i] == \'C\'):\n        passed = passed + 1\n    else:\n        failed = failed + 1\nprint(passed)\nprint(failed)', msg: 'The counters are initialized inside the loop so they are reset for every element. Zero them before the loop.', tag: 'init-in-loop' },
        ],
        plan: 'read N and N letter grades; passed ← 0, failed ← 0; for each grade: if A/B/C then passed increases, otherwise failed increases; print both',
        hints: ['The count-if pattern: two counters and one loop.', 'The pass condition has three letters; use or.'],
        syntax: ['list-init', 'if-else', 'for-range'],
        lineNotes: [
          { line: [7, 10], note: 'A character array: default `\'*\'`, then filled from the input (input() is already a one-letter string).', syntax: 'list-init' },
          { line: [11, 12], note: 'Two counters are initialized **before** the loop.' },
          { line: [13, 14], note: 'Pass if A **or** B **or** C; each comparison is written in full (`G[i] == \'A\' or ...`), not `G[i] == \'A\' or \'B\'`.' },
          { line: [15, 17], note: '`else` covers D and E (complementary): every student is counted exactly once.' },
          { line: [18, 19], note: 'Print after the loop: passed first, then failed.' },
        ],
        pseudoNotes: [{ line: 13, note: 'A combined condition with `or`; each term is compared in full.' }],
        explanation: 'Conditional counting: passed + failed = N.', refs: [{ src: D06, page: 25 }],
      }],
    },
    {
      id: 'd06-ex3', archetype: 'program', title: 'Exercise 3: Minimum of an array',
      source: slide(D06, 'Exercise-3', [29]),
      parts: [{
        id: 'd06-ex3-a', kind: 'program', decks: ['D06'], topic: 'Array max/min', patterns: ['max-min', 'array-populate'], misconceptions: ['max-init-zero'],
        stem: 'Read N (N > 0), then N integers into an array T (one per line). Print the smallest element.',
        reps: ['python', 'pseudo', 'flow'], match: 'numbers', mustUse: ['array'],
        solution: {
          python: r`# Program MinArray
# Reads N integers into T and prints the smallest element. Assumption: N > 0
# DECLARATIONS
# N, i, min : int
# T : array [0..N-1] of int
# ALGORITHM
N = int(input())
T = [0 for i in range(N)]
for i in range(0, N):
    T[i] = int(input())
min = T[0]                      # init with first element
for i in range(1, N):
    if (T[i] < min):
        min = T[i]
print(min)`,
          pseudo: `Program MinArray
{ The smallest element of an array. Assumption: N > 0 }
DECLARATIONS
  N, i, min : integer
  T : array [0..N-1] of integer
ALGORITHM
  input(N)
  i traversal [0..N-1]
    input(T[i])
  min ← T[0]
  i traversal [1..N-1]
    if (T[i] < min) then
      min ← T[i]
  output(min)`,
        },
        tests: [{ stdin: ['5', '4', '2', '9', '1', '7'] }, { stdin: ['1', '3'], edge: 'N = 1' }, { stdin: ['3', '5', '6', '7'], edge: 'all positive (min is not 0)' }, { stdin: ['3', '-5', '-2', '-9'], edge: 'all negative' }, { stdin: ['4', '2', '2', '2', '2'], edge: 'all equal' }],
        wrong: [
          { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nmin = 0\nfor i in range(0, N):\n    if (T[i] < min):\n        min = T[i]\nprint(min)', msg: 'Initializing `min = 0` is wrong if all elements are positive (the result becomes 0). Start from `T[0]`.', tag: 'max-init-zero' },
          { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nmin = T[0]\nfor i in range(1, N):\n    if (T[i] > min):\n        min = T[i]\nprint(min)', msg: 'The comparison sign is reversed: that finds the maximum. For the minimum use `<`.' },
        ],
        plan: 'fill T; min ← T[0]; for i from 1 to N-1: if T[i] < min then min ← T[i]; print min',
        skeleton: 'min = ___\nfor i in range(___, N):\n    if (T[i] ___ min):\n        min = ___\nprint(min)',
        hints: ['The twin of the maximum search.', 'What initial value must min start with?'],
        syntax: ['list-index', 'for-range'],
        lineNotes: [
          { line: [7, 10], note: 'Fill the array: N is read first for the size, then N elements.', syntax: 'list-init' },
          { line: 11, note: '`min = T[0]`, not 0 and not a made-up large number: the initial value must be an array element so it is correct for any data.' },
          { line: 12, note: 'Start from index 1 because index 0 is already used; `range(1, N)` stops at N-1.', syntax: 'for-range' },
          { line: [13, 14], note: '`<` for the minimum (the opposite of max). Replace only if the element is smaller.' },
          { line: 15, note: 'Print after the loop finishes.' },
        ],
        pseudoNotes: [{ line: 11, note: 'The traversal starts from 1 because T[0] is already the initial value.' }],
        explanation: 'Same as MaxArray, but using `<`.', refs: [{ src: D06, page: 29 }],
      }],
    },
    {
      id: 'd06-ex4', archetype: 'program', title: 'Exercise 4: Last index of X',
      source: slide(D06, 'Exercise-4', [33]),
      parts: [{
        id: 'd06-ex4-a', kind: 'program', decks: ['D06'], topic: 'Searching', patterns: ['search-last', 'search-flag'], misconceptions: ['index-range'],
        stem: 'Read N (N > 0), then N integers into an array T, then X. Search BACKWARDS (from the last index) and print "X is found at index i" for the last index where X appears, or "X is not found".',
        reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['array', 'while'],
        solution: {
          python: r`# Program SearchLast
# Reads N integers into T and X; prints the LAST index where X is found
# DECLARATIONS
# N, X, i : int
# T : array [0..N-1] of int
# found : bool
# ALGORITHM
N = int(input())
T = [0 for i in range(N)]
for i in range(0, N):
    T[i] = int(input())
X = int(input())
i = N - 1                      # start from the last element
found = False
while (i >= 0 and found == False):
    if (T[i] == X):
        found = True
    else:
        i = i - 1              # decrement only when not found
if (found == True):
    print(str(X) + " is found at index " + str(i))
else:
    print(str(X) + " is not found")`,
          pseudo: `Program SearchLast
{ Finds the last index of X in T by scanning backward }
DECLARATIONS
  N, X, i : integer
  T : array [0..N-1] of integer
  found : boolean
ALGORITHM
  input(N)
  i traversal [0..N-1]
    input(T[i])
  input(X)
  i ← N - 1
  found ← false
  while (i >= 0) and (found = false) do
    if (T[i] = X) then
      found ← true
    else
      i ← i - 1
  if (found = true) then
    output(X, " is found at index ", i)
  else
    output(X, " is not found")`,
        },
        tests: [{ stdin: ['10', '9', '12', '30', '-1', '0', '4', '-1', '3', '30', '14', '-1'] }, { stdin: ['3', '1', '2', '3', '7'], edge: 'not found' }, { stdin: ['4', '5', '1', '2', '3', '5'], edge: 'only at index 0' }, { stdin: ['4', '2', '2', '2', '2', '2'], edge: 'all equal: last index' }, { stdin: ['1', '4', '4'], edge: 'N = 1' }],
        wrong: [
          { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nX = int(input())\ni = 0\nfound = False\nwhile (i < N and found == False):\n    if (T[i] == X):\n        found = True\n    else:\n        i = i + 1\nif (found == True):\n    print(str(X) + " is found at index " + str(i))\nelse:\n    print(str(X) + " is not found")', msg: 'This finds the **first** index. Start from `N - 1` and go down to 0 for the last index.' },
          { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nX = int(input())\ni = N\nfound = False\nwhile (i >= 0 and found == False):\n    if (T[i] == X):\n        found = True\n    else:\n        i = i - 1\nif (found == True):\n    print(str(X) + " is found at index " + str(i))\nelse:\n    print(str(X) + " is not found")', msg: 'The last index is `N - 1`, not `N` (IndexError).', tag: 'index-range' },
        ],
        plan: 'fill T, read X; i ← N-1, found ← false; while i ≥ 0 and not found: if T[i] = X then found ← true, otherwise i ← i - 1; print the result based on found',
        skeleton: 'i = ___\nfound = False\nwhile (i ___ 0 and found == False):\n    if (T[i] == X):\n        found = True\n    else:\n        i = ___',
        hints: ['How can SearchArray be changed to start from the back?', 'The last index of an N-element array?', 'Stop condition: the index goes below 0.'],
        syntax: ['while', 'list-index'],
        lineNotes: [
          { line: [8, 12], note: 'Fill the array then read X, as in SearchArray.' },
          { line: 13, note: 'The search starts at the last index `N - 1` (not `N`: that would be an IndexError).' },
          { line: 14, note: 'The found flag starts as False.' },
          { line: 15, note: '`i >= 0` replaces `i < N`; it is written first so `T[i]` is never accessed with a negative index (in Python index -1 is silently valid and hides bugs).', syntax: 'while' },
          { line: [16, 19], note: 'The first hit from the back = the last index of the occurrence. `i` is decreased only in the `else`.' },
          { line: [20, 23], note: 'Choose the output based on the found flag.' },
        ],
        pseudoNotes: [{ line: 12, note: 'The start index N - 1 and the condition i >= 0 replace 0 and i < N.' }],
        explanation: 'A modification of SearchArray: start from N-1, decrease i, stop when i < 0 or found.', refs: [{ src: D06, page: 33 }],
      }],
    },
    {
      id: 'd06-ex5', archetype: 'program', title: 'Exercise 5: Vector addition',
      source: slide(D06, 'Exercise-5', [34]),
      parts: [{
        id: 'd06-ex5-a', kind: 'program', decks: ['D06'], topic: 'Processing arrays', patterns: ['array-map', 'array-compare'], misconceptions: ['index-range'],
        stem: 'Vectors V and U have 5 integer elements each. Read the 5 elements of V (one per line), then the 5 elements of U. Print W = V + U (W[i] = V[i] + U[i]), one element per line.',
        reps: ['python', 'pseudo', 'flow'], match: 'numbers', mustUse: ['array'],
        solution: {
          python: r`# Program VectorAdd
# Reads two vectors V and U (5 integers each) and prints W = V + U
# DECLARATIONS
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
    print(W[i])`,
          pseudo: `Program VectorAdd
{ W = V + U for 5-element vectors }
DECLARATIONS
  V, U, W : array [0..4] of integer
  i : integer
ALGORITHM
  i traversal [0..4]
    input(V[i])
  i traversal [0..4]
    input(U[i])
  i traversal [0..4]
    W[i] ← V[i] + U[i]
  i traversal [0..4]
    output(W[i])`,
        },
        tests: [{ stdin: ['1', '2', '3', '4', '5', '5', '4', '3', '2', '1'] }, { stdin: ['0', '0', '0', '0', '0', '7', '8', '9', '1', '2'], edge: 'V is zero' }, { stdin: ['-1', '-2', '-3', '-4', '-5', '1', '2', '3', '4', '5'], edge: 'zero sums, negatives' }, { stdin: ['10', '20', '30', '40', '50', '1', '1', '1', '1', '1'] }],
        wrong: [
          { code: 'V = [0 for i in range(5)]\nU = [0 for i in range(5)]\nfor i in range(0, 5):\n    V[i] = int(input())\nfor i in range(0, 5):\n    U[i] = int(input())\nfor i in range(0, 4):\n    print(V[i] + U[i])', msg: '`range(0, 4)` is only 4 elements; the 5th element (index 4) is skipped. Use `range(0, 5)`.', tag: 'off-by-one' },
          { code: 'V = [0 for i in range(5)]\nU = [0 for i in range(5)]\nfor i in range(0, 5):\n    V[i] = int(input())\nfor i in range(0, 5):\n    U[i] = int(input())\nprint(sum(V) + sum(U))', msg: 'Vector addition works per element (W[i] = V[i] + U[i]), not as a single total. The result is a 5-element vector.' },
        ],
        plan: 'fill V and U; for i = 0..4: W[i] ← V[i] + U[i]; print W',
        hints: ['Three arrays of size 5; an operation on the same index.', 'One loop can add them all.'],
        syntax: ['list-init', 'list-index', 'for-range'],
        lineNotes: [
          { line: [7, 9], note: 'Three 5-element arrays are created with the default value 0 (indices 0..4).', syntax: 'list-init' },
          { line: [10, 13], note: 'Populate: V first, then U; the same order as the input.' },
          { line: [14, 15], note: '`W[i] = V[i] + U[i]`: the same index i in all three arrays; `range(0, 5)` covers 0..4.', syntax: 'list-index' },
          { line: [16, 17], note: 'Print W as the result vector, one element per line.' },
        ],
        pseudoNotes: [{ line: 12, note: 'An operation per element with the same index.' }],
        explanation: 'Vector addition = traversal of indices 0..4 with W[i] = V[i] + U[i].', refs: [{ src: D06, page: 34 }],
      }],
    },

    /* ======================================================= D10 ======================================================= */
    {
      id: 'd10-square', archetype: 'trace', title: 'Function Square: flow of control',
      source: slide(D10, 'Functions in Programming', [9, 13, 15, 16, 17, 18]), figures: [{ src: D10, page: 9 }],
      parts: [{
        id: 'd10-square-a', kind: 'trace', decks: ['D10'], topic: 'Function control flow', patterns: ['function-def-call'], ask: 'output',
        stem: 'Follow the flow of control. In which order are the lines printed, and what is the last value?',
        code: r`# Program Test
# Testing the Square function
# DECLARATIONS
# A : int
# B : int
# Function Square
def Square(X):
    # returns the square of X
    print("inside Square, X = " + str(X))
    result = X * X
    return result
# MAIN PROGRAM ALGORITHM
A = 5
print("before call")
B = Square(A) + 10
print("after call")
print(B)`,
        syntax: ['def-function', 'return', 'call'],
        lineNotes: [
          { line: [7, 11], note: 'This is only a **definition**: nothing is printed when the definition is read. Its body only runs when the function is called.', syntax: 'def-function' },
          { line: 7, note: '`X` is a formal parameter; when called it is associated with the value of the actual parameter (A = 5).' },
          { line: 10, note: '`result` is a **local** variable: it exists only inside Square, not visible in the main program.' },
          { line: 11, note: '`return` ends the function and sends a value (25) to the call point.', syntax: 'return' },
          { line: 13, note: 'The main program starts here, not at `def`.' },
          { line: 15, note: 'Flow: (1) jump to Square with X = 5, (2) run its body until `return`, (3) come back here, the call\'s value (25) is substituted into the expression, then B = 25 + 10. A function call is part of an expression.', syntax: 'call' },
          { line: [16, 17], note: 'After returning, execution continues with the next instruction.' },
        ],
        explanation: 'Order: "before call", then the call enters Square (printing "inside Square, X = 5"), returns, "after call", and finally B = 35.', refs: [{ src: D10, page: 9 }],
      }],
    },
    {
      id: 'd10-circle', archetype: 'program', title: 'CircleArea with function Area',
      source: slide(D10, 'Example (1)', [10, 11]), figures: [{ src: D10, page: 10 }],
      parts: [
        {
          id: 'd10-circle-a', kind: 'trace', label: 'a', decks: ['D10'], topic: 'Functions with return', patterns: ['function-def-call'], ask: 'output', stdin: ['2'],
          stem: 'Input 2. What is printed?',
          code: r`# Program CircleArea
# calculate area of a circle based on the radius
# DECLARATIONS
# r, A : float
# Definition and Realization of Function Area
def Area(r):
    # returns area of a circle based on the radius r
    return (3.14 * r * r)
# MAIN PROGRAM
r = float(input())
A = Area(r)         # call Function Area
print(A)`,
          syntax: ['def-function', 'call', 'return'],
          lineNotes: [
            { line: [6, 8], note: 'The specification is a comment right under `def`: what is returned, not how.' },
            { line: 8, note: 'The function **returns** a value (`return`), it does not print it: the caller decides how to use the value (print, store, etc.).', syntax: 'return' },
            { line: 10, note: 'The variable `r` in the main program and the parameter `r` in the function are two different variables (local vs global) even though the names are the same.' },
            { line: 11, note: 'A call as an expression: the return value is stored in A.', syntax: 'call' },
          ],
          explanation: '3.14 × 2.0 × 2.0 = 12.56.', refs: [{ src: D10, page: 10 }],
        },
        {
          id: 'd10-circle-b', kind: 'program', label: 'b', decks: ['D10'], topic: 'Functions with return', patterns: ['function-def-call'], misconceptions: ['return-vs-print'],
          stem: 'Write a program that reads a radius r (real) and prints the circle area. The area must be computed by a function Area(r) that RETURNS the value (use 3.14 for pi).',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['function'],
          solution: {
            python: r`# Program CircleArea
# calculate area of a circle based on the radius
# DECLARATIONS
# r, A : float
# Definition and Realization of Function Area
def Area(r):
    # returns area of a circle based on the radius r
    return (3.14 * r * r)
# MAIN PROGRAM
r = float(input())
A = Area(r)         # call Function Area
print(A)`,
            pseudo: `Program CircleArea
{ Area of a circle using function Area }
DECLARATIONS
  r, A : real
  function Area (r : real) → real

function Area (r : real) → real
  { returns the area of a circle of radius r }
  ALGORITHM
    → 3.14 * r * r

ALGORITHM
  input(r)
  A ← Area(r)
  output(A)`,
          },
          tests: [{ stdin: ['2'] }, { stdin: ['1.5'] }, { stdin: ['0'], edge: 'r = 0' }, { stdin: ['10'] }],
          wrong: [
            { code: 'def Area(r):\n    print(3.14 * r * r)\nr = float(input())\nA = Area(r)\nprint(A)', msg: 'The function prints instead of returning a value: `A` becomes None and two outputs appear. Use `return`.', tag: 'return-vs-print' },
            { code: 'def Area(r):\n    return 3.14 * r\nr = float(input())\nA = Area(r)\nprint(A)', msg: 'The area of a circle is π r², not π r.' },
          ],
          plan: 'define Area(r) that returns 3.14 × r × r; in the main program read r, A ← Area(r), print A',
          hints: ['The function returns a value; the main program prints.'],
          syntax: ['def-function', 'return', 'call'],
          lineNotes: [
            { line: [5, 8], note: 'The function definition comes before its use; the specification is in a comment.', syntax: 'def-function' },
            { line: 8, note: '`return` sends the result to the caller; there is no `print` inside the function.', syntax: 'return' },
            { line: 10, note: 'The input is read in the main program, not inside the function: a function only maps input to output.' },
            { line: 11, note: 'The call result is held in A.', syntax: 'call' },
            { line: 12, note: 'Printing is done by the main program.' },
          ],
          pseudoNotes: [{ line: 5, note: 'The function is declared in the DECLARATIONS with its input and output types (domain and range).' }],
          explanation: 'The function maps r to the area; the call is used as an expression.', refs: [{ src: D10, page: 10 }],
        },
      ],
    },
    {
      id: 'd10-max2', archetype: 'trace', title: 'Max2 and 10% of the largest',
      source: slide(D10, 'Example-2 and Example-3', [19, 20, 24, 25]), figures: [{ src: D10, page: 25 }],
      parts: [
        {
          id: 'd10-max2-a', kind: 'trace', label: 'a', decks: ['D10'], topic: 'Function Max2', patterns: ['function-def-call', 'if-else'], ask: 'output',
          stem: 'What is printed?',
          code: r`# Function Max2
def Max2(A, B):
    # returns the largest integer between A and B
    # LOCAL DECLARATIONS
    # max : int
    # ALGORITHM
    if (A >= B):
        max = A
    else: # A < B
        max = B
    return max
print(Max2(3, 8))
print(Max2(-4, -9))
print(Max2(5, 5))`,
          syntax: ['def-function', 'return'],
          lineNotes: [
            { line: [4, 5], note: 'LOCAL DECLARATIONS: `max` lives only inside the function.' },
            { line: [7, 10], note: 'Two complete, disjoint cases (A >= B / A < B). When A = B, `>=` picks A, which gives the same result.' },
            { line: 11, note: '`return max`: a single exit point at the end; the alternative is `return A` / `return B` directly in each branch.', syntax: 'return' },
            { line: [12, 14], note: 'Each call is an expression that is evaluated to a single value and then printed.' },
          ],
          explanation: 'Three calls: 8, -4, and 5.', refs: [{ src: D10, page: 19 }],
        },
        {
          id: 'd10-max2-b', kind: 'trace', label: 'b', decks: ['D10'], topic: 'Function Max2', patterns: ['function-def-call'], ask: 'output', stdin: ['45', '50'],
          stem: 'Input 45 and 50. What is printed?',
          code: r`# Program 10percent_of_largest
# Accepts two integers as input
# Displays 10% of the larger of the two numbers
# DECLARATIONS
# A, B : int
# result : float
# Function Definition: Max2
def Max2(A, B):
    # returns the larger number between A and B
    # ALGORITHM
    if (A >= B):
        return A
    else: # A < B
        return B
# MAIN PROGRAM ALGORITHM
A = int(input("Enter the first number = "))
B = int(input("Enter the second number = "))
result = 0.1 * Max2(A, B)
print("10% of the largest number = " + str(result))`,
          lineNotes: [
            { line: [11, 14], note: 'The version without a local variable: `return` directly in each branch.' },
            { line: 18, note: 'The function call is used inside an expression: Max2(45, 50) yields 50 first, then it is multiplied by 0.1. Result type: int * float = float.' },
            { line: 19, note: '`str(result)` is required when joining to text.' },
          ],
          explanation: 'Max2(45, 50) = 50, 0.1 × 50 = 5.0. Output: "10% of the largest number = 5.0".', refs: [{ src: D10, page: 25 }],
        },
        {
          id: 'd10-max2-c', kind: 'program', label: 'c', decks: ['D10'], topic: 'Function Max2', patterns: ['function-def-call'], misconceptions: ['return-vs-print'],
          stem: 'Read two integers A and B. Print 10% of the larger one. Use a function Max2(A, B) that returns the larger value.',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['function'],
          solution: {
            python: r`# Program 10percent_of_largest
# Accepts two integers; displays 10% of the larger of the two
# DECLARATIONS
# A, B : int
# result : float
# Function Max2
def Max2(A, B):
    # returns the larger number between A and B
    if (A >= B):
        return A
    else: # A < B
        return B
# MAIN PROGRAM ALGORITHM
A = int(input())
B = int(input())
result = 0.1 * Max2(A, B)
print(result)`,
            pseudo: `Program TenPercentOfLargest
{ 10% of the larger of A and B }
DECLARATIONS
  A, B : integer
  result : real
  function Max2 (A, B : integer) → integer

function Max2 (A, B : integer) → integer
  { returns the larger of A and B }
  ALGORITHM
    if (A >= B) then
      → A
    else { A < B }
      → B

ALGORITHM
  input(A)
  input(B)
  result ← 0.1 * Max2(A, B)
  output(result)`,
          },
          tests: [{ stdin: ['45', '50'] }, { stdin: ['50', '45'], edge: 'reversed order' }, { stdin: ['-20', '-40'], edge: 'negative' }, { stdin: ['30', '30'], edge: 'equal' }],
          wrong: [
            { code: 'def Max2(A, B):\n    if (A >= B):\n        print(A)\n    else:\n        print(B)\nA = int(input())\nB = int(input())\nresult = 0.1 * Max2(A, B)\nprint(result)', msg: 'Max2 must `return`, not `print`: with `print` the function returns None and `0.1 * None` errors.', tag: 'return-vs-print' },
            { code: 'def Max2(A, B):\n    if (A >= B):\n        return B\n    else:\n        return A\nA = int(input())\nB = int(input())\nprint(0.1 * Max2(A, B))', msg: 'Max2 returns the smaller one: the A >= B branch should return A.' },
          ],
          plan: 'define Max2(A, B): if A ≥ B return A, otherwise B; read A, B; result ← 0.1 × Max2(A, B); print result',
          hints: ['The function returns the larger value, not 10% of the larger.', 'Use the Max2 call inside an expression.'],
          syntax: ['def-function', 'return', 'call'],
          lineNotes: [
            { line: [7, 12], note: 'Max2 purely maps (A, B) to the maximum; the 10% factor is not the function\'s job (one function, one task, reusable).', syntax: 'def-function' },
            { line: [9, 12], note: '`return` in each branch of the if-else; only one of them runs. There is no `print` inside the function.', syntax: 'return' },
            { line: [14, 15], note: 'Input in the main program.' },
            { line: 16, note: 'A call as part of an expression: evaluated first, then multiplied by 0.1.', syntax: 'call' },
          ],
          pseudoNotes: [{ line: 19, note: 'The function call appears on the right side of the assignment.' }],
          explanation: 'Max2 returns the larger one; the result is used in an expression.', refs: [{ src: D10, page: 24 }],
        },
      ],
    },
    {
      id: 'd10-ex1', archetype: 'program', title: 'Exercise 1: Max3',
      source: slide(D10, 'Exercise-1', [21]),
      parts: [{
        id: 'd10-ex1-a', kind: 'program', decks: ['D10'], topic: 'Function Max3', patterns: ['function-def-call', 'nested-if'], misconceptions: ['return-vs-print'],
        stem: 'Define and implement the function Max3 that returns the maximum of three numbers A, B, C (using the three cases A >= B and A >= C, B >= A and B >= C, C >= A and C >= B). The main program reads A, B, C (one per line) and prints Max3(A, B, C). Example: 1, -10, 5 gives 5.',
        reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['function'],
        solution: {
          python: r`# Program Max3_Test
# Reads three integers and prints the largest, using function Max3
# DECLARATIONS
# A, B, C : int
# Function Max3
def Max3(A, B, C):
    # returns the largest of A, B and C
    # LOCAL DECLARATIONS
    # max : int
    # ALGORITHM
    if (A >= B and A >= C):
        max = A
    elif (B >= A and B >= C):
        max = B
    else: # C >= A and C >= B
        max = C
    return max
# MAIN PROGRAM ALGORITHM
A = int(input())
B = int(input())
C = int(input())
print(Max3(A, B, C))`,
          pseudo: `Program Max3_Test
{ Maximum of three numbers using function Max3 }
DECLARATIONS
  A, B, C : integer
  function Max3 (A, B, C : integer) → integer

function Max3 (A, B, C : integer) → integer
  { returns the largest of A, B, C }
  LOCAL DECLARATIONS
    max : integer
  ALGORITHM
    if (A >= B) and (A >= C) then
      max ← A
    else if (B >= A) and (B >= C) then
      max ← B
    else { C >= A and C >= B }
      max ← C
    → max

ALGORITHM
  input(A)
  input(B)
  input(C)
  output(Max3(A, B, C))`,
        },
        tests: [{ stdin: ['1', '-10', '5'] }, { stdin: ['9', '2', '4'], edge: 'largest first' }, { stdin: ['2', '9', '4'], edge: 'largest second' }, { stdin: ['-5', '-2', '-9'], edge: 'all negative' }, { stdin: ['3', '3', '3'], edge: 'all equal' }],
        wrong: [
          { code: 'def Max3(A, B, C):\n    if (A >= B):\n        return A\n    else:\n        return B\nA = int(input())\nB = int(input())\nC = int(input())\nprint(Max3(A, B, C))', msg: 'C is never compared. All three numbers must be compared (three cases).' },
          { code: 'def Max3(A, B, C):\n    if (A >= B and A >= C):\n        print(A)\n    elif (B >= A and B >= C):\n        print(B)\n    else:\n        print(C)\nA = int(input())\nB = int(input())\nC = int(input())\nprint(Max3(A, B, C))', msg: 'The function must `return`, not `print`; with `print` the output is doubled and `None` appears.', tag: 'return-vs-print' },
        ],
        plan: 'if A ≥ B and A ≥ C then A; otherwise if B ≥ A and B ≥ C then B; otherwise C. Main program: read A, B, C; print Max3(A, B, C)',
        skeleton: 'def Max3(A, B, C):\n    if (A >= B and A >= ___):\n        max = ___\n    elif (B >= A and B >= ___):\n        max = B\n    else:\n        max = ___\n    return max',
        hints: ['Three cases: who is the largest? A, B, or C.', 'Each case compares one number with the other two.', 'The function `return`s, the main program `print`s.'],
        syntax: ['def-function', 'return', 'if-elif'],
        lineNotes: [
          { line: [5, 17], note: 'The function definition comes before the main program; formal parameters A, B, C.', syntax: 'def-function' },
          { line: [8, 9], note: 'LOCAL DECLARATIONS: `max` exists only inside Max3 (not visible in the main program).' },
          { line: [11, 16], note: 'The three cases from the slide: A is largest, B is largest, C is largest. `>=` (not `>`) so ties are still caught; `else` covers the third case so the set is complete.', syntax: 'if-elif' },
          { line: 17, note: '`return max`: sends the result to the caller, does not print.', syntax: 'return' },
          { line: [19, 21], note: 'The main program reads three inputs (the actual parameters).' },
          { line: 22, note: '`Max3(A, B, C)` is called as an expression inside `print`: the number and order of parameters must match the definition.', syntax: 'call' },
        ],
        pseudoNotes: [{ line: 5, note: 'The function is declared in the DECLARATIONS: domain (three integers) and range (integer).' }],
        explanation: 'Three complete, disjoint cases (with `>=`), `return` in the function.', refs: [{ src: D10, page: 21 }],
      }],
    },
    {
      id: 'd10-ex2', archetype: 'program', title: 'Exercise 2: Max3 via Max2',
      source: slide(D10, 'Exercise-2', [26]),
      parts: [
        {
          id: 'd10-ex2-a', kind: 'trace', label: 'a', decks: ['D10'], topic: 'Functions calling functions', patterns: ['function-composition'], ask: 'output',
          stem: 'The prints inside Max2 reveal the order of evaluation. What is printed?',
          code: r`def Max2(A, B):
    print("Max2(" + str(A) + ", " + str(B) + ")")
    if (A >= B):
        return A
    else:
        return B
def Max3(A, B, C):
    return Max2(Max2(A, B), C)
print(Max3(1, -10, 5))`,
          syntax: ['call'],
          lineNotes: [
            { line: 2, note: 'A diagnostic print to see the execution order (not part of the real function).' },
            { line: 8, note: 'A function can be called from another function. The **innermost** call is evaluated first: `Max2(A, B)`; its result becomes the first actual parameter of the outer call.' },
            { line: 9, note: 'The main program calls Max3, which calls Max2 twice.' },
          ],
          explanation: 'Max2(1, -10) first (result 1), then Max2(1, 5) (result 5); finally 5 is printed.', refs: [{ src: D10, page: 26 }],
        },
        {
          id: 'd10-ex2-b', kind: 'program', label: 'b', decks: ['D10'], topic: 'Functions calling functions', patterns: ['function-composition', 'function-def-call'], misconceptions: ['return-vs-print'],
          stem: 'Implement Max3(A, B, C) by creating and using Max2 (Max3 must call Max2). The main program reads A, B, C (one per line) and prints Max3(A, B, C).',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['function'],
          solution: {
            python: r`# Program Max3_ViaMax2
# Reads three integers; Max3 is built from Max2
# DECLARATIONS
# A, B, C : int
# Function Max2
def Max2(A, B):
    # returns the larger of A and B
    if (A >= B):
        return A
    else: # A < B
        return B
# Function Max3
def Max3(A, B, C):
    # returns the largest of A, B and C, using Max2
    return Max2(Max2(A, B), C)
# MAIN PROGRAM ALGORITHM
A = int(input())
B = int(input())
C = int(input())
print(Max3(A, B, C))`,
            pseudo: `Program Max3_ViaMax2
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
  output(Max3(A, B, C))`,
          },
          tests: [{ stdin: ['1', '-10', '5'] }, { stdin: ['9', '2', '4'] }, { stdin: ['2', '4', '9'], edge: 'largest last' }, { stdin: ['-5', '-2', '-9'], edge: 'all negative' }, { stdin: ['3', '3', '3'], edge: 'all equal' }],
          wrong: [
            { code: 'def Max2(A, B):\n    if (A >= B):\n        return A\n    else:\n        return B\ndef Max3(A, B, C):\n    return Max2(A, B)\nA = int(input())\nB = int(input())\nC = int(input())\nprint(Max3(A, B, C))', msg: 'C is ignored. Compare the result of Max2(A, B) with C: `Max2(Max2(A, B), C)`.' },
            { code: 'def Max2(A, B):\n    if (A >= B):\n        return A\n    else:\n        return B\ndef Max3(A, B, C):\n    return Max2(A, Max2(B, A))\nA = int(input())\nB = int(input())\nC = int(input())\nprint(Max3(A, B, C))', msg: 'The parameter C is not used; A and B are compared again.' },
          ],
          plan: 'Max3(A, B, C) = Max2(Max2(A, B), C); the main program reads three numbers and prints Max3',
          hints: ['The maximum of three numbers = the maximum of (the maximum of the first two) and the third.', 'A function call may be an actual parameter of another call.'],
          syntax: ['def-function', 'call', 'return'],
          lineNotes: [
            { line: [6, 11], note: 'Max2 already exists and is tested: reuse it, do not rewrite it inside Max3 (reuse).', syntax: 'def-function' },
            { line: [12, 15], note: 'Max3 is built from Max2: problem decomposition. Max2 must be defined before it is called when the program runs.' },
            { line: 15, note: '`Max2(Max2(A, B), C)`: inner first (the maximum of A and B), then compare with C. A single `return` with an expression.', syntax: 'return' },
            { line: [17, 19], note: 'Three inputs in the main program.' },
            { line: 20, note: 'The result of Max3 is printed by the main program.' },
          ],
          pseudoNotes: [{ line: [5, 6], note: 'Max3 depends on Max2: both are declared in the DECLARATIONS, with their definitions following after the program.' }],
          explanation: 'Max3(A, B, C) = Max2(Max2(A, B), C).', refs: [{ src: D10, page: 26 }],
        },
      ],
    },
    {
      id: 'd10-procedure', archetype: 'trace', title: 'Procedure PrintName and Hello Name v2',
      source: slide(D10, 'Example-4 and Example-5', [28, 29, 30, 31]), figures: [{ src: D10, page: 31 }],
      parts: [
        {
          id: 'd10-procedure-a', kind: 'trace', label: 'a', decks: ['D10'], topic: 'Procedures', patterns: ['procedure'], ask: 'output', stdin: ['Ani', '2'],
          stem: 'Input: name = Ani, N = 2. What is printed?',
          code: r`# program HelloName
# Accepts an integer N > 0 and a string name
# and prints "Hello, " + name, N times
# DECLARATIONS
# i, N : int
# name : string
# Definition of Procedure PrintName
def PrintName(name):
    # Prints "Hello, " + name to the screen
    # ALGORITHM
    print("Hello, " + name + "!")
    return
# MAIN PROGRAM ALGORITHM
name = input("Enter name = ")
N = int(input("How many times to repeat? "))
for i in range(N):
    PrintName(name)`,
          syntax: ['def-procedure', 'call'],
          lineNotes: [
            { line: [8, 12], note: 'A procedure: a subprogram that **does not return a value**; its result is an effect (printing). It ends with a `return` without a value.', syntax: 'def-procedure' },
            { line: 11, note: 'The procedure prints by itself; this differs from a function, which returns a value to the caller.' },
            { line: 12, note: 'A bare `return`: optional in Python, written to make clear this is a procedure (no value).', syntax: 'return' },
            { line: [16, 17], note: '`range(N)` = N iterations (0..N-1).', syntax: 'for-range' },
            { line: 17, note: 'A procedure is called as a **statement on its own**, not as part of an expression (there is no value to use).', syntax: 'call' },
          ],
          explanation: 'Two times "Hello, Ani!".', refs: [{ src: D10, page: 31 }],
        },
        {
          id: 'd10-procedure-b', kind: 'program', label: 'b', decks: ['D10'], topic: 'Procedures', patterns: ['procedure'], misconceptions: ['return-vs-print'],
          stem: 'Create a procedure PrintName(name) that prints "Hello, " + name + "!". The main program reads a name, then an integer N (N > 0), and calls the procedure N times.',
          reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['procedure', 'for'],
          solution: {
            python: r`# Program HelloName
# Reads a name and N > 0; prints "Hello, name!" N times using procedure PrintName
# DECLARATIONS
# i, N : int
# name : string
# Procedure PrintName
def PrintName(name):
    # Prints "Hello, " + name + "!" to the screen
    # ALGORITHM
    print("Hello, " + name + "!")
    return
# MAIN PROGRAM ALGORITHM
name = input()
N = int(input())
for i in range(N):
    PrintName(name)`,
            pseudo: `Program HelloName
{ Prints "Hello, name!" N times using the procedure PrintName }
DECLARATIONS
  i, N : integer
  name : string
  procedure PrintName (name : string)

procedure PrintName (name : string)
  { prints "Hello, " + name + "!" }
  ALGORITHM
    output("Hello, " + name + "!")

ALGORITHM
  input(name)
  input(N)
  i traversal [1..N]
    PrintName(name)`,
          },
          tests: [{ stdin: ['Ani', '2'] }, { stdin: ['Budi', '1'], edge: 'N = 1' }, { stdin: ['Citra', '4'] }],
          wrong: [
            { code: 'def PrintName(name):\n    return "Hello, " + name + "!"\nname = input()\nN = int(input())\nfor i in range(N):\n    PrintName(name)', msg: 'A procedure must print by itself; `return`ing a string that is not used shows nothing.', tag: 'return-vs-print' },
            { code: 'def PrintName(name):\n    print("Hello, " + name + "!")\n    return\nname = input()\nN = int(input())\nPrintName(name)', msg: 'The procedure is called only once; it must be called inside the loop N times.' },
          ],
          plan: 'procedure PrintName(name): print "Hello, " + name + "!"; main: read name and N; repeat N times call PrintName(name)',
          hints: ['A procedure: no return value, its result is the printout.', 'Call the procedure as a statement inside the loop.'],
          syntax: ['def-procedure', 'call', 'for-range'],
          lineNotes: [
            { line: [7, 11], note: 'A procedure with one formal parameter `name`.', syntax: 'def-procedure' },
            { line: 10, note: 'Printing inside the procedure: that is its job.' },
            { line: 11, note: '`return` without a value marks a procedure.', syntax: 'return' },
            { line: [13, 14], note: 'Input the name (a string, no conversion) then N (int).' },
            { line: [15, 16], note: 'The procedure call as a statement, repeated N times by `for`.', syntax: 'call' },
          ],
          pseudoNotes: [{ line: 6, note: 'The procedure is declared without an output type.' }],
          explanation: 'Procedure = a subprogram with no return value, called as a statement.', refs: [{ src: D10, page: 31 }],
        },
      ],
    },
    {
      id: 'd10-sqrt', archetype: 'trace', title: 'Square root with math library',
      source: slide(D10, 'Example-6', [32, 33]),
      parts: [{
        id: 'd10-sqrt-a', kind: 'trace', decks: ['D10'], topic: 'Standard library', patterns: ['function-def-call'], ask: 'output', stdin: ['4'],
        stem: 'Input 4. What is printed?',
        code: r`# Program Square_Root_Calculation
# Accepts a real number as input
# Outputs the square root of that number
from math import *
# DECLARATIONS
# N : float
# ALGORITHM
N = float(input("Enter a number = "))
print("Square root of " + str(N) + " = " + str(sqrt(N)))`,
        syntax: ['math-import', 'call'],
        lineNotes: [
          { line: 4, note: '`from math import *` at the top of the program opens the library functions (sqrt, sin, cos, pow). Without this line `sqrt` gives a NameError.', syntax: 'math-import' },
          { line: 8, note: '`float(input())`: sqrt accepts a real number.' },
          { line: 9, note: '`sqrt(N)` is a standard function called in an expression; the result is a float so `str()` is needed to join it. The value 4 is read as the float 4.0, so 4.0 is printed.' },
        ],
        explanation: 'A library function is used like one you wrote yourself: name, parameters, and return value. Output: "Square root of 4.0 = 2.0".', refs: [{ src: D10, page: 33 }],
      }],
    },
    {
      id: 'd10-concepts', archetype: 'concept', title: 'Subprogram concepts: return vs print, calls, scope',
      source: slide(D10, 'Using Function', [4, 15, 16, 22, 23, 28, 30]),
      parts: [
        {
          id: 'd10-concepts-a', kind: 'trace', label: 'a', decks: ['D10'], topic: 'Return vs print', misconceptions: ['return-vs-print'], patterns: ['function-def-call'], ask: 'output',
          stem: 'What is printed? Pay attention to the value of y.',
          code: r`def Double(x):
    print(x * 2)
def Triple(x):
    return x * 3
y = Double(4)
z = Triple(4)
print(y)
print(z)`,
          lineNotes: [
            { line: [1, 2], note: '`Double` only prints: there is no `return`, so it implicitly returns `None`. This is procedure behavior.' },
            { line: [3, 4], note: '`Triple` returns a value: it can be stored and reused.', syntax: 'return' },
            { line: 5, note: 'Prints 8 **at the call**; y becomes None (not 8).' },
            { line: [7, 8], note: 'y is None, z = 12.' },
          ],
          explanation: 'Output: 8, None, 12. Do not write `print` in a function that should return a value (return vs print).', refs: [{ src: D10, page: 28 }],
        },
        {
          id: 'd10-concepts-b', kind: 'mcq-multi', label: 'b', decks: ['D10'], topic: 'Call validity', patterns: ['function-def-call', 'procedure'],
          stem: 'Given `def Max2(A, B): ... return` (a function returning an int) and `def PrintName(name): print(...)` (a procedure). Mark each call as valid and meaningful (O) or not (X).',
          options: ['r = Max2(5, 9)', 'r = Max2(5)', 'r = PrintName("Ani") + 1', 'PrintName("Ani")'], correct: [true, false, false, true],
          why: ['The name matches, two parameters, the int result is stored in an expression.', 'The number of parameters must match: Max2 needs two (TypeError).', 'A procedure does not return a value (None); it cannot be used in an expression.', 'A procedure is called as a statement on its own.'],
          explanation: 'Requirements for calling a function: the same name, matching number and types of parameters, a result that fits the output type, and the call is part of an expression. A procedure is called as a statement on its own.', refs: [{ src: D10, page: 22 }, { src: D10, page: 30 }],
        },
        {
          id: 'd10-concepts-c', kind: 'bug', label: 'c', decks: ['D10'], topic: 'Local variables', patterns: ['function-def-call'], misconceptions: ['scope-local'],
          stem: 'The program crashes with NameError on the last line. Which lines are responsible?',
          code: `def Square(X):
    result = X * X
    return result
A = 5
Square(A)
print(result)`,
          badLines: [5, 6],
          fixed: `def Square(X):
    result = X * X
    return result
A = 5
result = Square(A)
print(result)`,
          lineNotes: [
            { line: 2, note: '`result` here is a **local** variable: it vanishes when the function finishes.' },
            { line: 5, note: 'The return value is discarded: the function is called but its result is not stored. Store it with `result = Square(A)`.' },
            { line: 6, note: '`result` in the main program was never created; a function\'s local variable is not visible outside.' },
          ],
          syntax: ['call', 'return'],
          explanation: 'A local variable lives only inside the function; send the result out with `return` and store it in the caller.', refs: [{ src: D10, page: 16 }],
        },
        {
          id: 'd10-concepts-d', kind: 'short', label: 'd', decks: ['D10'], topic: 'Parameters', patterns: ['function-def-call'],
          stem: 'In `def Max2(A, B)` the names A and B are called ______ parameters; in the call `Max2(x, 7)` the values x and 7 are called ______ parameters.',
          blanks: [{ label: 'in the def', accept: ['formal'], type: 'text' }, { label: 'in the call', accept: ['actual', 'aktual'], type: 'text' }],
          explanation: 'A **formal** parameter is in the definition; an **actual** parameter is given at the call and matched one to one by order.', refs: [{ src: D10, page: 22 }],
        },
        {
          id: 'd10-concepts-e', kind: 'mcq', label: 'e', decks: ['D10'], topic: 'Functions vs procedures',
          stem: 'Which statement about function vs procedure is correct?',
          options: ['A function maps input values (domain) to one output value (range) and uses return; a procedure has no return value and is called as a standalone statement', 'A procedure must have at least one return statement with a value', 'A function is called as a standalone statement, never inside an expression', 'Functions can only be called from the main program, never from another function'], answer: [0],
          why: ['The definition from the slide.', 'A procedure does not return a value.', 'A function is called as part of an expression.', 'A function may be called from another function (Max3 calls Max2).'],
          explanation: 'A function: a mapping from domain to range, an explicitly typed result, at least one `return`. A procedure: a sequence of instructions with an initial and a final state, no return value.', refs: [{ src: D10, page: 4 }, { src: D10, page: 28 }],
        },
      ],
    },
    {
      id: 'd10-ex3', archetype: 'program', title: 'Exercise 3: Distance function',
      source: slide(D10, 'Exercise-3', [34]),
      parts: [{
        id: 'd10-ex3-a', kind: 'program', decks: ['D10'], topic: 'Function Distance', patterns: ['function-def-call'], misconceptions: ['return-vs-print'],
        stem: 'Create a function Distance(v, t) that returns the distance s = v * t (v in m/s, t in s, real numbers; t >= 0). The main program reads v (first line) and t (second line), and prints the distance using Distance.',
        reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['function'],
        solution: {
          python: r`# Program Distance_Test
# Reads speed v and time t; prints distance using function Distance
# DECLARATIONS
# v, t, s : float
# Function Distance
def Distance(v, t):
    # returns the distance travelled, s = v * t (t >= 0)
    return v * t
# MAIN PROGRAM ALGORITHM
v = float(input())
t = float(input())
s = Distance(v, t)
print(s)`,
          pseudo: `Program Distance_Test
{ Distance s = v * t using function Distance }
DECLARATIONS
  v, t, s : real
  function Distance (v, t : real) → real

function Distance (v, t : real) → real
  { returns the distance travelled, v * t }
  ALGORITHM
    → v * t

ALGORITHM
  input(v)
  input(t)
  s ← Distance(v, t)
  output(s)`,
        },
        tests: [{ stdin: ['10', '5'] }, { stdin: ['2.5', '4'] }, { stdin: ['0', '7'], edge: 'v = 0' }, { stdin: ['3', '0'], edge: 't = 0' }],
        wrong: [
          { code: 'def Distance(v, t):\n    print(v * t)\nv = float(input())\nt = float(input())\ns = Distance(v, t)\nprint(s)', msg: 'The function prints instead of using `return`; s becomes None and two outputs appear.', tag: 'return-vs-print' },
          { code: 'def Distance(v, t):\n    return v + t\nv = float(input())\nt = float(input())\nprint(Distance(v, t))', msg: 'The distance formula is v × t, not v + t.' },
        ],
        plan: 'function Distance(v, t): return v × t; main: read v and t, s ← Distance(v, t), print s',
        hints: ['The function only computes and returns; read/print in the main program.'],
        syntax: ['def-function', 'return', 'call'],
        lineNotes: [
          { line: [5, 8], note: 'A function with two formal parameters and a specification; a single expression in `return` is enough (no local variable).', syntax: 'def-function' },
          { line: 8, note: '`return v * t`: sends the result out, does not print.', syntax: 'return' },
          { line: [10, 11], note: 'Float input in the main program (v then t, following the question); actual parameters are matched by order.' },
          { line: 12, note: 'The function result is stored in s.', syntax: 'call' },
          { line: 13, note: 'Printing is done by the main program.' },
        ],
        pseudoNotes: [{ line: 5, note: 'The domain (two reals) and range (real) are stated in the function declaration.' }],
        explanation: 'A pure function: Distance(v, t) = v * t.', refs: [{ src: D10, page: 34 }],
      }],
    },
    {
      id: 'd10-ex4', archetype: 'program', title: 'Exercise 4: MaxArray function',
      source: slide(D10, 'Exercise-4', [35]),
      parts: [{
        id: 'd10-ex4-a', kind: 'program', decks: ['D10', 'D06'], topic: 'Function MaxArray', patterns: ['function-def-call', 'max-min', 'array-populate'], misconceptions: ['max-init-zero', 'return-vs-print'],
        stem: 'Create a function MaxArray(T, N) that takes an array of integers T and its length N (N > 0) and returns the largest element. The main program reads N, then N integers into T, and prints MaxArray(T, N). Example: T = [5, 4, 3, 2, 1] gives 5.',
        reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['function', 'array'],
        solution: {
          python: r`# Program MaxArray_Test
# Reads N (N>0) and N integers into T; prints the largest using function MaxArray
# DECLARATIONS
# N, i : int
# T : array [0..N-1] of int
# Function MaxArray
def MaxArray(T, N):
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
print(MaxArray(T, N))`,
          pseudo: `Program MaxArray_Test
{ Largest element of an array using function MaxArray. Assumption: N > 0 }
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
  output(MaxArray(T, N))`,
        },
        tests: [{ stdin: ['5', '5', '4', '3', '2', '1'] }, { stdin: ['1', '-8'], edge: 'N = 1 negative' }, { stdin: ['4', '-5', '-2', '-9', '-7'], edge: 'all negative' }, { stdin: ['5', '1', '2', '3', '4', '9'], edge: 'largest at the end' }, { stdin: ['3', '6', '6', '6'], edge: 'all equal' }],
        wrong: [
          { code: 'def MaxArray(T, N):\n    max = 0\n    for i in range(0, N):\n        if (T[i] > max):\n            max = T[i]\n    return max\nN = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nprint(MaxArray(T, N))', msg: 'Initializing `max = 0` is wrong for an array whose elements are all negative. Start from `T[0]`.', tag: 'max-init-zero' },
          { code: 'def MaxArray(T, N):\n    max = T[0]\n    for i in range(1, N - 1):\n        if (T[i] > max):\n            max = T[i]\n    return max\nN = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nprint(MaxArray(T, N))', msg: '`range(1, N-1)` skips the last element (index N-1). Use `range(1, N)`.', tag: 'off-by-one' },
          { code: 'def MaxArray(T, N):\n    max = T[0]\n    for i in range(1, N):\n        if (T[i] > max):\n            max = T[i]\n    print(max)\nN = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nprint(MaxArray(T, N))', msg: 'The function must `return max`, not `print(max)`: now the result is printed twice (the number and None).', tag: 'return-vs-print' },
        ],
        plan: 'MaxArray(T, N): max ← T[0]; for i = 1..N-1 if T[i] > max then max ← T[i]; return max',
        skeleton: 'def MaxArray(T, N):\n    max = ___\n    for i in range(___, N):\n        if (T[i] ___ max):\n            max = ___\n    return ___',
        hints: ['Remember the array maximum program from Deck 06; now it is wrapped in a function.', 'The array and its size are parameters of the function.', 'The initial value of max?'],
        syntax: ['def-function', 'return', 'list-index'],
        lineNotes: [
          { line: [6, 16], note: 'The function takes the array and its size as parameters: it does not read input itself, so it can be used for any array.', syntax: 'def-function' },
          { line: 12, note: '`max = T[0]`, not 0: correct for an all-negative array. N > 0 is guaranteed so T[0] exists.' },
          { line: 13, note: 'Start from index 1; `range(1, N)` stops at N-1 (the last index).', syntax: 'for-range' },
          { line: [14, 15], note: 'Replace only if the element is greater.' },
          { line: 16, note: '`return max`: the result is sent to the caller; `i` and `max` are local.', syntax: 'return' },
          { line: [18, 21], note: 'Main program: read the size, build the array, fill it.' },
          { line: 22, note: 'A call as an expression inside `print`.', syntax: 'call' },
        ],
        pseudoNotes: [{ line: 6, note: 'The array and size parameters are declared; the output type is integer.' }],
        explanation: 'MaxArray = the array-maximum pattern inside a function with `return`.', refs: [{ src: D10, page: 35 }],
      }],
    },
    {
      id: 'd10-ex5', archetype: 'program', title: 'Exercise 5: PrintArray procedure',
      source: slide(D10, 'Exercise-5', [36]),
      parts: [{
        id: 'd10-ex5-a', kind: 'program', decks: ['D10', 'D06'], topic: 'Procedure PrintArray', patterns: ['procedure', 'array-populate'], misconceptions: ['index-range'],
        stem: 'Create a procedure PrintArray(T, N) that prints every element of an integer array of length N >= 0, each on its own line in the format `[i] element` (e.g. `[0] 5`). If N = 0 print "Empty array". The main program reads N, then N integers into T, and calls PrintArray. Example: T = [5, 4, 3, 2, 1] prints [0] 5, [1] 4, [2] 3, [3] 2, [4] 1.',
        reps: ['python', 'pseudo', 'flow'], match: 'exact', mustUse: ['procedure', 'array'],
        solution: {
          python: r`# Program PrintArray_Test
# Reads N (N >= 0) and N integers into T; prints them with procedure PrintArray
# DECLARATIONS
# N, i : int
# T : array [0..N-1] of int
# Procedure PrintArray
def PrintArray(T, N):
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
PrintArray(T, N)`,
          pseudo: `Program PrintArray_Test
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
  PrintArray(T, N)`,
        },
        tests: [{ stdin: ['5', '5', '4', '3', '2', '1'] }, { stdin: ['0'], edge: 'N = 0: Empty array' }, { stdin: ['1', '7'], edge: 'N = 1' }, { stdin: ['3', '-1', '0', '-3'] }],
        wrong: [
          { code: 'def PrintArray(T, N):\n    for i in range(0, N):\n        print("[" + str(i) + "] " + str(T[i]))\n    return\nN = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nPrintArray(T, N)', msg: 'The case N = 0 is not handled: it must print "Empty array".' },
          { code: 'def PrintArray(T, N):\n    if (N == 0):\n        print("Empty array")\n    else:\n        for i in range(1, N + 1):\n            print("[" + str(i) + "] " + str(T[i - 1]))\n    return\nN = int(input())\nT = [0 for i in range(N)]\nfor i in range(0, N):\n    T[i] = int(input())\nPrintArray(T, N)', msg: 'The displayed index must start from 0: `[0] 5` for the first element.', tag: 'index-range' },
        ],
        plan: 'PrintArray(T, N): if N = 0 print "Empty array"; otherwise for i = 0..N-1 print "[i] T[i]"; main: read N, fill T, call PrintArray',
        hints: ['A procedure: it prints, it does not return a value.', 'There is a special case when the array is empty.', 'The format "[" + str(i) + "] " + ... joins numbers to text.'],
        syntax: ['def-procedure', 'call', 'print-str'],
        lineNotes: [
          { line: [7, 17], note: 'A procedure with an array and a size parameter; no return value.', syntax: 'def-procedure' },
          { line: [12, 13], note: 'The special case N = 0 is checked **first**: the empty array. Without it the loop prints nothing and "Empty array" does not appear.' },
          { line: [14, 16], note: 'The normal case: traversal 0..N-1. `range(0, N)`: N is excluded so there is no out-of-bounds access.', syntax: 'for-range' },
          { line: 16, note: '`str(i)` and `str(T[i])` are required to join numbers to text; the index is shown starting from 0.', syntax: 'print-str' },
          { line: 17, note: '`return` without a value marks a procedure.', syntax: 'return' },
          { line: [19, 22], note: 'Main program: read N, build the array (N can be 0: an empty array), fill it.' },
          { line: 23, note: 'The procedure is called as a statement on its own (not inside an expression).', syntax: 'call' },
        ],
        pseudoNotes: [{ line: 6, note: 'The procedure is declared without an output type.' }],
        explanation: 'Check N = 0 for "Empty array"; otherwise traverse 0..N-1 with the format `[i] element`.', refs: [{ src: D10, page: 36 }],
      }],
    },
  ],
  flashcards: cards,
}
