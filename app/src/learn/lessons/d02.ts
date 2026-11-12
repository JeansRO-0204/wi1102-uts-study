import type { Lesson } from '../types'
const r = String.raw
const D02 = 'D02_AlgorithmicThinking'

export const lesson: Lesson = {
  deck: 'D02',
  title: 'Algorithmic Thinking',
  summary: 'What an algorithm is, the three control structures (sequence, selection, repetition), how to write one as pseudocode or a flowchart, and how to command a robot with `repeat n`. This is the vocabulary every later deck and the UTS robot question build on.',
  minutes: 40,
  goals: [
    'State the four steps of problem solving with programming and where the algorithm fits.',
    'Name the control structures and spot each one in a flowchart or pseudocode.',
    'Translate a small algorithm between plain steps, pseudocode and a flowchart (and read it back).',
    'Judge whether an algorithm handles every case (the clock example: "what is wrong with this solution?").',
    'Write robot commands with `repeat n` for a pattern that depends on n.',
  ],
  examAngle: 'D02 shows up in the UTS in two places. Part I has short concept items (control structures, reading a small flowchart or pseudocode, what an algorithm is). Part II always has a robot question: write commands with `repeat n` that draw a pattern for any n (UTS 2025 Soal 3, UTS 2024 Soal 3). Flowchart-reading items (UTS 2024 Soal 5) also lean on this deck\'s symbols and loop shapes.',
  sections: [
    {
      id: 'software-to-algorithm',
      title: 'From problem to algorithm',
      blocks: [
        { t: 'text', refs: [{ src: D02, page: 4 }, { src: D02, page: 5 }], md: 'Software is what lets a user tell a computer a problem and get a solution back. The slides define it as **software = program + data + documentation**. Without software a computer is a dumb machine.' },
        { t: 'text', refs: [{ src: D02, page: 5 }, { src: D02, page: 6 }], md: 'Programming is problem solving where both the problem and its solution are written in a form a computer can process. The four steps:\n\n1. Understand the problem.\n2. Formulate a plan, which is an **algorithm**.\n3. Develop the solution from the plan, which is a **computer program**.\n4. Evaluate the solution.\n\nTo get the plan, use **top-down design**: start from the big problem, split it into sub-problems, and keep refining until each piece is a step-by-step solution. Each sub-problem can become a module, and in this course modules are written as subprograms.' },
        { t: 'text', refs: [{ src: D02, page: 7 }], md: 'An **algorithm** is a set of step-by-step procedures to solve a (sub)problem. Good algorithms in this deck share these properties:\n\n- **Clear steps**: each step is something the executor (human or machine) can actually do.\n- **Finite**: it ends, with a clear initial state and final state.\n- **Ordered**: the order of steps matters, and it is built from control structures.\n- **Complete**: every case the problem can produce is handled (the clock example later shows what happens when it is not).' },
        { t: 'key', md: 'Plan = **algorithm** (pseudocode text or flowchart diagram). Solution = **program** (source code in a language such as Python). You design the algorithm first, then do the coding.' },
        { t: 'quiz', q: 'Step 2 of problem solving with programming produces:', options: ['An algorithm', 'A computer program', 'The documentation', 'Machine code'], correct: [0], why: ['Yes: "formulating a plan to solve the problem -> algorithm".', 'That is step 3, developing a solution based on the plan.', 'Documentation is part of software, not a step output here.', 'Machine code is produced later by a compiler/interpreter.'] },
        { t: 'question', id: 'd02-concepts-b', note: 'The four steps in order.' },
      ],
    },
    {
      id: 'potatoes-selection',
      title: 'Selection: cooking potatoes',
      blocks: [
        { t: 'text', refs: [{ src: D02, page: 10 }, { src: D02, page: 11 }, { src: D02, page: 12 }, { src: D02, page: 13 }], md: 'Example 3 in the slides. **Initial state**: a bag of potatoes in the kitchen, and it is unclear whether there are enough. **Final state**: a potato dish ready for dinner.\n\nThe plan: if there are no potatoes, buy some. Then always peel. Then choose one of three dishes. The slide writes each condition as a question ("Potatoes available?", "What to cook?"); below they are read as input so the program can run.' },
        { t: 'code', caption: 'CookPotatoes: one single `if` (no else) followed by a three-way choice.', stdin: ['no', 'soup'],
          python: r`# Program CookPotatoes
# Prepares a potato dish
# DECLARATIONS
# potatoes, choice : str
# ALGORITHM
potatoes = input()
choice = input()
if (potatoes == "no"):
    print("Buy potatoes")
# potatoes are available here
print("Peel potatoes")
if (choice == "fries"):
    print("Fry potatoes")
elif (choice == "boiled"):
    print("Boil potatoes")
else:
    print("Make soup")`,
          pseudo: r`Program CookPotatoes
{ Prepares a potato dish }
KAMUS
  potatoes, choice : string
ALGORITMA
  input(potatoes)
  input(choice)
  if (potatoes = "no") then
    output("Buy potatoes")
  { potatoes are available here }
  output("Peel potatoes")
  if (choice = "fries") then
    output("Fry potatoes")
  else if (choice = "boiled") then
    output("Boil potatoes")
  else
    output("Make soup")`,
          flow: { title: 'CookPotatoes', blocks: [
            { t: 'io', dir: 'in', text: 'input(potatoes)' },
            { t: 'io', dir: 'in', text: 'input(choice)' },
            { t: 'if', cond: 'potatoes = "no"', then: [{ t: 'io', dir: 'out', text: 'output("Buy potatoes")' }] },
            { t: 'io', dir: 'out', text: 'output("Peel potatoes")' },
            { t: 'if', cond: 'choice = "fries"', then: [{ t: 'io', dir: 'out', text: 'output("Fry potatoes")' }], else: [
              { t: 'if', cond: 'choice = "boiled"', then: [{ t: 'io', dir: 'out', text: 'output("Boil potatoes")' }], else: [{ t: 'io', dir: 'out', text: 'output("Make soup")' }] },
            ] },
          ] },
          notes: [
            { line: [8, 9], note: 'One-way selection: buy only if there are none. No else is needed, because "potatoes available" is already fine.' },
            { line: 11, note: 'Outside the if, so it always runs: a sequence step after the branch.' },
            { line: [12, 17], note: 'A three-way choice written as if / elif / else. The final `else` is the "soup" case, a comment in the slide.' },
          ] },
        { t: 'key', md: '**Selection** picks which steps run. A diamond in the flowchart has two exits (Yes / No). When both outcomes lead on to the same next step, the branches **merge** again (peeling happens either way).' },
        { t: 'predict', prompt: 'What is printed for potatoes = yes and choice = boiled?', stdin: ['yes', 'boiled'],
          code: r`potatoes = input()
choice = input()
if (potatoes == "no"):
    print("Buy potatoes")
print("Peel potatoes")
if (choice == "fries"):
    print("Fry potatoes")
elif (choice == "boiled"):
    print("Boil potatoes")
else:
    print("Make soup")`,
          explain: 'The buy step is skipped, but "Peel potatoes" sits outside the if so it always runs. The choice then falls into the elif. Selection decides which steps run; steps outside it always run.' },
        { t: 'question', id: 'd02-potatoes-a', note: 'Trace the pseudocode with potatoes = no.' },
      ],
    },
    {
      id: 'three-structures',
      title: 'Sequence, selection, repetition',
      blocks: [
        { t: 'text', refs: [{ src: D02, page: 7 }], md: 'The slides build every algorithm from three **control structures** (they decide the order in which steps run):\n\n| Structure | Meaning | Python | Pseudocode | Flowchart |\n|---|---|---|---|---|\n| Sequence | steps run in order | lines one after another | lines one after another | arrows in a chain |\n| Conditional (selection, branching) | a choice of steps | `if / elif / else` | `if … then … else` | diamond with Yes/No exits |\n| Repetition (loop, iteration) | repeat steps | `while`, `for` | `while … do`, `repeat … until`, `i traversal` | a diamond with an arrow back |' },
        { t: 'text', md: 'Repetition is where algorithms become powerful. Here is "sum of 1 to N", using all three together: a sequence of input / initialise / print, a loop in the middle.' },
        { t: 'code', caption: 'Sum of 1..N with a `while` loop (test at the top).', stdin: ['5'],
          python: r`# Program SumToN
# Adds 1 + 2 + ... + N
# DECLARATIONS
# N, i, total : int
# ALGORITHM
N = int(input())
total = 0
i = 1
while (i <= N):
    total = total + i
    i = i + 1
print("Sum =", total)`,
          pseudo: r`Program SumToN
{ Adds 1 + 2 + ... + N }
KAMUS
  N, i, total : integer
ALGORITMA
  input(N)
  total ← 0
  i ← 1
  while (i <= N) do
    total ← total + i
    i ← i + 1
  output("Sum =", total)`,
          flow: { title: 'SumToN', blocks: [
            { t: 'io', dir: 'in', text: 'input(N)' },
            { t: 'process', text: 'total ← 0' },
            { t: 'process', text: 'i ← 1' },
            { t: 'while', cond: 'i <= N', body: [
              { t: 'process', text: 'total ← total + i' },
              { t: 'process', text: 'i ← i + 1' },
            ] },
            { t: 'io', dir: 'out', text: 'output("Sum =", total)' },
          ] },
          notes: [
            { line: [6, 8], note: 'Sequence: read N, then initialise the accumulator and the counter. Initialise outside the loop.' },
            { line: 9, note: 'Repetition: the condition is tested first. If N were 0 the body would never run.' },
            { line: 11, note: 'Without this line the condition never changes and the loop never ends.' },
          ] },
        { t: 'trap', md: '**Initialising inside the loop** (`total = 0` as the first body line) resets the sum every round. **Forgetting the update** (`i = i + 1`) makes an endless loop. Both are classic exam bugs.' },
        { t: 'quiz', q: 'Which of these is NOT one of the three control structures of the slides?', options: ['Sequence', 'Repetition', 'Selection', 'Compilation'], correct: [3], why: ['A control structure: steps in order.', 'A control structure: loop.', 'A control structure: choosing between steps (if).', 'Compilation translates source code into machine form. It is not a way to order steps.'] },
        { t: 'question', id: 'k19-s2a-06', note: 'Read a small while-loop: what is Sum after the loop? Mind that i is incremented before it is added.' },
      ],
    },
    {
      id: 'clock-repeat',
      title: 'Repetition and evaluating an algorithm: the wall clock',
      blocks: [
        { t: 'text', refs: [{ src: D02, page: 14 }, { src: D02, page: 15 }, { src: D02, page: 16 }, { src: D02, page: 17 }], md: 'Example 4. **Initial state**: the wall clock shows the wrong time. **Final state**: the wall clock shows the correct time. If the hands do not move, replace the battery. If they move, the battery is alive, so just move the hands to the right position.\n\nThe slides improve the flowchart three times, and each question teaches a lesson about checking an algorithm:' },
        { t: 'text', md: '- **Flowchart-1** (`moved?` yes → fix hands, no → change batteries → finish). *What is wrong with this solution?* After changing the batteries the hands are **never fixed**: the "No" branch ends without setting the time.\n- **Flowchart-2** fixes the hands after both branches. *What if after two days the clock goes back to a wrong position?* There is no re-check, so the algorithm can end with the clock still wrong.\n- **Flowchart-3** adds "check after 2 days" with a loop back: if the time is not correct, change the batteries and fix the hands again.' },
        { t: 'key', md: 'An algorithm is only good if it reaches the **final state in every case**. Always ask "what if this branch ends here?" and "what if the fix does not hold?". A loop with a check at the end is the answer to the second question.' },
        { t: 'code', caption: 'Flowchart-3 as code. `repeat ... until` tests at the **bottom**, so the body runs at least once.', stdin: ['no', 'no', 'yes'],
          python: r`# Program FixClock
# Fixes the wall clock until it shows the correct time
# DECLARATIONS
# moved, correct : str
# ALGORITHM
moved = input()
if (moved == "no"):
    print("Change batteries")
# the hand is moving now
while True:
    print("Fix clock hand")
    print("Check after 2 days")
    correct = input()
    if (correct == "no"):
        print("Change batteries")
    if (correct == "yes"):
        break`,
          pseudo: r`Program FixClock
{ Fixes the wall clock until it shows the correct time }
KAMUS
  moved, correct : string
ALGORITMA
  input(moved)
  if (moved = "no") then
    output("Change batteries")
  { the hand is moving now }
  repeat
    output("Fix clock hand")
    output("Check after 2 days")
    input(correct)
    if (correct = "no") then
      output("Change batteries")
  until (correct = "yes")`,
          flow: { title: 'Flowchart-3', blocks: [
            { t: 'io', dir: 'in', text: 'input(moved)' },
            { t: 'if', cond: 'moved = "no"', then: [{ t: 'io', dir: 'out', text: 'output("Change batteries")' }] },
            { t: 'repeat', body: [
              { t: 'io', dir: 'out', text: 'output("Fix clock hand")' },
              { t: 'io', dir: 'out', text: 'output("Check after 2 days")' },
              { t: 'io', dir: 'in', text: 'input(correct)' },
              { t: 'if', cond: 'correct = "no"', then: [{ t: 'io', dir: 'out', text: 'output("Change batteries")' }] },
            ], until: 'correct = "yes"' },
          ] },
          notes: [
            { line: [10, 17], note: 'Python has no `repeat ... until`, so use `while True` with a `break` on the stop condition.' },
            { line: [16, 17], note: 'The `until` condition is the **stop** condition, the opposite of a `while` condition.' },
          ] },
        { t: 'trap', md: '`repeat … until (c)` stops when `c` is **true**; `while (c)` keeps going while `c` is **true**. Converting one to the other means negating the condition. Also: `repeat` always runs its body once; `while` may run zero times.' },
        { t: 'quiz', q: 'In the clock example, why is `repeat … until` a better fit than `while`?', options: ['The hands must be fixed at least once, before any check is possible', 'It runs faster than `while`', 'It never needs a stop condition', 'It tests the condition before the body'], correct: [0], why: ['Right: the test (is the time correct?) only makes sense after fixing, so the body must run first.', 'Speed is not the point.', 'It needs a stop condition (`until`).', 'That describes `while`. `repeat` tests at the end.'] },
        { t: 'question', id: 'd02-clock-c', note: 'Walk the flowchart with the given inputs.' },
      ],
    },
    {
      id: 'photo-search',
      title: 'Search with a loop: which photo?',
      blocks: [
        { t: 'text', refs: [{ src: D02, page: 19 }, { src: D02, page: 20 }, { src: D02, page: 21 }], md: 'Example 5 (Bebras). Johnny has 8 photos. Bella answers questions: umbrella? yes. Something on the head? no. Can you see the sea? yes. Which photo?\n\nThe algorithm: take the first photo, test the three conditions, and if they do not all hold, check the next photo. Stop when a photo fits **or** all photos were checked. Afterwards, tell the two outcomes apart: print the photo, or "not found".' },
        { t: 'code', caption: 'Search loop with a "found" flag. The slide uses nested ifs; `and` says the same in one test.', stdin: ['3', 'yes', 'yes', 'no', 'yes', 'no', 'no', 'yes', 'no', 'yes'],
          python: r`# Program WhichPhoto
# Finds the first photo with umbrella, nothing on head, and the sea visible
# DECLARATIONS
# n, k : int
# umbrella, head, sea : str
# found : bool
# ALGORITHM
n = int(input())
k = 0
found = False
while (k < n) and (not found):
    k = k + 1
    umbrella = input()
    head = input()
    sea = input()
    if (umbrella == "yes") and (head == "no") and (sea == "yes"):
        found = True
if (found):
    print("Photo", k)
else:
    print("Photo not found")`,
          pseudo: r`Program WhichPhoto
{ Finds the first photo with umbrella, nothing on head, and the sea visible }
KAMUS
  n, k : integer
  umbrella, head, sea : string
  found : boolean
ALGORITMA
  input(n)
  k ← 0
  found ← false
  while (k < n) and (not found) do
    k ← k + 1
    input(umbrella)
    input(head)
    input(sea)
    if (umbrella = "yes") and (head = "no") and (sea = "yes") then
      found ← true
  if (found) then
    output("Photo", k)
  else
    output("Photo not found")`,
          flow: { title: 'WhichPhoto', blocks: [
            { t: 'io', dir: 'in', text: 'input(n)' },
            { t: 'process', text: 'k ← 0' },
            { t: 'process', text: 'found ← false' },
            { t: 'while', cond: '(k < n) and (not found)', body: [
              { t: 'process', text: 'k ← k + 1' },
              { t: 'io', dir: 'in', text: 'input(umbrella)' },
              { t: 'io', dir: 'in', text: 'input(head)' },
              { t: 'io', dir: 'in', text: 'input(sea)' },
              { t: 'if', cond: '(umbrella = "yes") and (head = "no") and (sea = "yes")', then: [{ t: 'process', text: 'found ← true' }] },
            ] },
            { t: 'if', cond: 'found', then: [{ t: 'io', dir: 'out', text: 'output("Photo", k)' }], else: [{ t: 'io', dir: 'out', text: 'output("Photo not found")' }] },
          ] },
          notes: [
            { line: [9, 10], note: 'Start before the first photo (k = 0) and assume nothing has been found.' },
            { line: 11, note: 'Two stop reasons combined: out of photos, or found. The slide writes this as `until all_photos_checked or correct_photo_found`.' },
            { line: [18, 21], note: 'After the loop the flag says which of the two reasons ended it.' },
          ] },
        { t: 'key', md: 'A loop with two ways to stop needs a **flag** (`found`) so that the code after the loop can tell them apart.' },
        { t: 'question', id: 'd02-photo-a', note: 'Trace the photo search from the slides.' },
      ],
    },
    {
      id: 'representations',
      title: 'Writing algorithms down: text, pseudocode, flowchart',
      blocks: [
        { t: 'text', refs: [{ src: D02, page: 7 }], md: 'The slides give two ways to write an algorithm beyond plain sentences:\n\n- **Pseudocode**: text, a cross between human language and a programming language. This course uses the Liem notation: `KAMUS` / `ALGORITMA`, `←` for assignment, `input(x)`, `output(x)`, `if … then … else`, `while … do`, `repeat … until`.\n- **Flowchart**: a diagram. The symbols:\n\n| Symbol | Meaning |\n|---|---|\n| Oval | Start / End |\n| Parallelogram | input / output |\n| Rectangle | process / assignment (`x ← x + 1`) |\n| Diamond | decision, with Yes / No exits |\n| Arrow | the order of steps; an arrow back up makes a loop |\n| Predefined process (rectangle with double sides) | call a subprogram |' },
        { t: 'syntax', ids: ['program-template', 'if-else', 'while'] },
        { t: 'text', refs: [{ src: D02, page: 13 }, { src: D02, page: 17 }], md: 'Tips for reading and drawing flowcharts:\n\n- Follow the arrows, never the position on the page.\n- Every diamond has exactly two exits; write Yes / No on them.\n- A loop is a diamond whose branch leads **back** to a step above it.\n- Every path ends at the End oval (see Flowchart-1: a path that stops without reaching the goal is a bug, not a style choice).' },
        { t: 'quiz', q: 'Tick everything that is true about flowcharts.', options: ['A diamond has a Yes exit and a No exit', 'A parallelogram is used for input and output', 'A rectangle is used for an assignment such as `i ← i + 1`', 'A loop is drawn as an arrow back to an earlier step', 'An oval is a decision'], correct: [0, 1, 2, 3], why: ['Yes: a decision.', 'Yes: input / output.', 'Yes: a process.', 'Yes: the arrow returns to the test that decides whether to repeat.', 'No: an oval is Start / End; a decision is a diamond.'] },
        { t: 'question', id: 'g24-s5a', note: 'A real UTS flowchart with two counters. Read it exactly as drawn.' },
      ],
    },
    {
      id: 'robot-repeat',
      title: 'Robot commands and `repeat n`',
      blocks: [
        { t: 'text', md: 'Every UTS has a **robot question**. You are given a few commands and a picture, and you write a command list that works for **any n**. The idea is the same as a loop: find the part that repeats n times and write it once inside `repeat n`.\n\nTwo dialects have appeared so far:\n\n- **Rody**: `walk`, `up`, `down`, and `repeat n` with the repeated commands indented below it.\n- **Ladybug**: `Forward 1`, `Left`, `Right`, and `Repeat N ( … )`.' },
        { t: 'text', md: 'A reliable method:\n\n1. Draw the path for n = 1, 2, 3.\n2. Spot the unit that grows by one each time. That is the body of the `repeat`.\n3. Write the parts that do **not** repeat (the start, the bottom, the final step) outside the loop, in the right order.\n4. Test your answer by expanding `repeat n` for n = 1 and n = 2 by hand.' },
        { t: 'key', md: '`repeat n` with commands indented below it means "run those commands n times". `repeat n-1` with n = 1 runs **zero** times (the rule allows n = 0). Check the smallest n: that is where most answers break.' },
        { t: 'predict', prompt: 'Expanding `repeat n (walk, down)` then `walk` then `repeat n-1 (up, walk)` for n = 2. What is the command list, one line per command?', code: r`n = 2
for i in range(n):
    print("walk")
    print("down")
print("walk")
for i in range(n - 1):
    print("up")
    print("walk")`,
          explain: 'The first loop gives walk, down twice, then one walk, then the second loop runs n−1 = 1 time. Expanding by hand like this is how you test a robot answer. Note the order inside a loop body: `walk, down` is not `down, walk`.' },
        { t: 'trap', md: 'Mixing the order inside the repeat (`down, walk` when the path is `walk, down`), forgetting the single step at the bottom, and using `repeat n` where the correct count is `n-1` (one step too far). Always check n = 1.' },
        { t: 'question', id: 'sample-robot-1', note: 'The classic Rody terrain: down n steps, cross, up n steps.' },
        { t: 'question', id: 'lat2-s3a', note: 'A terrain with a peak: up on one side, down on the other. Look at where the counts differ by one.' },
        { t: 'question', id: 'uts25-s3a', note: 'The real UTS 2025 robot item (Ladybug).' },
      ],
    },
    {
      id: 'constraints-and-routes',
      title: 'Reasoning with constraints and routes',
      blocks: [
        { t: 'text', refs: [{ src: D02, page: 8 }, { src: D02, page: 9 }, { src: D02, page: 22 }], md: 'The slides end their examples with Bebras puzzles. They are all "follow the rule exactly" problems:\n\n- **Example 1, the maze**: Mira can only use the four moves A, B, C, D, and repeats a block of them **twice**. Simulate one pass of the block, then a second pass starting from where (and facing which way) the first pass ended.\n- **Example 2, book sharing club**: lend the book to the youngest unvisited friend, and if none is left, pass it back to whoever lent it. This is a rule with a repetition and a fall-back (selection) inside.\n- **Example 6, invitations**: invite a friend only if the distance is at most 20 km, and arrange transport if it is more than 17 km. Then generalise: loop over all friends and test each one.' },
        { t: 'code', caption: 'The invitation rule, generalised: one loop, two selections. Distances are the input.', stdin: ['4', '12', '18', '25', '17'],
          python: r`# Program Invitations
# Invites friends within 20 km; arranges transport beyond 17 km
# DECLARATIONS
# n, i, d : int
# ALGORITHM
n = int(input())
for i in range(1, n + 1):
    d = int(input())
    if (d <= 20):
        if (d > 17):
            print("Invite with transport")
        else:
            print("Invite")
    else:
        print("Do not invite")`,
          pseudo: r`Program Invitations
{ Invites friends within 20 km; arranges transport beyond 17 km }
KAMUS
  n, i, d : integer
ALGORITMA
  input(n)
  i traversal [1..n]
    input(d)
    if (d <= 20) then
      if (d > 17) then
        output("Invite with transport")
      else
        output("Invite")
    else
      output("Do not invite")`,
          flow: { title: 'Invitations', blocks: [
            { t: 'io', dir: 'in', text: 'input(n)' },
            { t: 'process', text: 'i ← 1' },
            { t: 'while', cond: 'i <= n', body: [
              { t: 'io', dir: 'in', text: 'input(d)' },
              { t: 'if', cond: 'd <= 20', then: [
                { t: 'if', cond: 'd > 17', then: [{ t: 'io', dir: 'out', text: 'output("Invite with transport")' }], else: [{ t: 'io', dir: 'out', text: 'output("Invite")' }] },
              ], else: [{ t: 'io', dir: 'out', text: 'output("Do not invite")' }] },
              { t: 'process', text: 'i ← i + 1' },
            ] },
          ] },
          notes: [
            { line: 7, note: 'One pass per friend: this loop is what "generalise to other maps" means.' },
            { line: [9, 14], note: 'Nested selection: first the invitation limit (20 km), and only inside it the transport limit (17 km).' },
          ] },
        { t: 'trap', md: 'Check **boundaries** in the rule wording: "no more than 20 km" is `<= 20`, "more than 17 km" is `> 17`. A friend at exactly 17 km walks; a friend at exactly 20 km is invited, with transport.' },
        { t: 'text', md: 'The UTS question on constraints (a grid or a table of items with rules) and on routes with forbidden cells all work this way: list the rules, then test each candidate against **every** rule. Missing one rule is the misconception tagged `constraint-missed`.' },
        { t: 'question', id: 'ctl-arabot-a', note: 'Choose L or R at each junction so that every start reaches the charging station.' },
        { t: 'question', id: 'd02-maze-a', note: 'Repeat the block of moves twice, tracking position and direction.' },
      ],
    },
    {
      id: 'exam-drill',
      title: 'Exam drill and summary',
      blocks: [
        { t: 'text', refs: [{ src: D02, page: 24 }, { src: D02, page: 26 }, { src: D02, page: 27 }], md: 'The last slides cover how an algorithm becomes a program. **Coding** is writing program code from an algorithm; the file is the **source code**. A **compiler** reads the whole program and translates it at once (C/C++, Pascal, Fortran). An **interpreter** reads and runs it line by line (Python, MATLAB). The procedural (imperative) paradigm: **Program = Algorithm + Data Structure**.' },
        { t: 'text', md: '| Idea | Python | Pseudocode | Flowchart |\n|---|---|---|---|\n| Sequence | lines in order | lines in order | chain of arrows |\n| Selection | `if / elif / else` | `if … then … else` | diamond, Yes/No |\n| Loop, test first | `while (c):` | `while (c) do` | diamond, arrow back |\n| Loop, test last | `while True: … break` | `repeat … until (c)` | body, then diamond that loops back |\n| Counting loop | `for i in range(a, b + 1)` | `i traversal [a..b]` | `i ← a`, test, `i ← i + 1` |\n| Assignment | `x = x + 1` | `x ← x + 1` | rectangle |\n| Input / output | `input()` / `print()` | `input(x)` / `output(x)` | parallelogram |\n| Robot repetition | n/a | `repeat n` + indent | n/a |' },
        { t: 'trap', md: '1. Stop condition vs continue condition: `until (c)` stops on true, `while (c)` continues on true.\n2. Initialising a counter or total inside the loop body.\n3. Forgetting the update step (`i ← i + 1`), so the loop never ends.\n4. A branch that ends without reaching the goal (the clock example).\n5. A robot answer that is right for n = 3 but wrong for n = 1 (check the smallest n).' },
        { t: 'quiz', q: 'Tick every statement that is true.', options: ['`repeat … until` always runs its body at least once', '`while` may run its body zero times', 'A compiler reads and runs a program line by line', 'Python programs are normally run by an interpreter', 'A flowchart is a text form of an algorithm'], correct: [0, 1, 3], why: ['Yes: the test is at the end.', 'Yes: the test is at the start.', 'No: that is the interpreter. A compiler translates the whole program at once.', 'Yes: Python and MATLAB are interpreted.', 'No: a flowchart is a diagram. Pseudocode is the text form.'] },
        { t: 'question', id: 'd02-concepts-d', note: 'Mark each option, the exam way.' },
        { t: 'question', id: 'g24-s3a', note: 'Official UTS 2024 robot question (Rody terrain with depth n).' },
        { t: 'question', id: 'ku23-s4a', note: 'Harder: a stepped diamond. Find the unit that repeats.' },
      ],
    },
  ],
}
