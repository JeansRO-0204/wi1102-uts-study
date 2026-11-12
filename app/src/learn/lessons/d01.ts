import type { Lesson } from '../types'
const r = String.raw
const D = 'D01_ComputationalThinking'

export const lesson: Lesson = {
  deck: 'D01',
  title: 'Computational Thinking',
  summary: 'What computational thinking (CT) is, and its four pillars: problem decomposition, pattern recognition, abstraction & generalization, and algorithmic thinking. The UTS asks you to name the pillar behind a scenario and to apply all four to a concrete task.',
  minutes: 35,
  goals: [
    'State the definition of CT and explain why it does not need a machine.',
    'Define each of the four pillars in one sentence and tell them apart in a scenario.',
    'Decompose a system from at least two perspectives (user, function, time).',
    'Decide which information to keep and which to drop (abstraction) for a given task.',
    'Write a short, structured CT explanation for a constraint or classification task.',
  ],
  examAngle: 'Part I of the UTS is a multiple-correct ○/✗ block (+1 per correct mark, −1 per wrong mark), and statements about CT pillars are fair game. Part II.1 (constraint assignment) and II.2 (hierarchical classification) end with "explain your reasoning using abstraction, decomposition, pattern recognition and algorithmic thinking" (2024 and 2025 papers). Older papers also ask "why is CT important in the 21st century?".',
  sections: [
    {
      id: 'what-is-ct',
      title: 'What is computational thinking?',
      blocks: [
        { t: 'text', refs: [{ src: D, page: 5 }], md: 'The slides define CT as **the thought processes involved in formulating a problem and expressing its solution(s) in such a way that a computer, human or machine, can effectively carry it out.**\n\nTwo halves: (1) *formulate* the problem clearly, (2) *express* the solution so that an executor can follow it without guessing.' },
        { t: 'text', md: 'The executor is "a computer, human or machine". The slide shows the old "human computers": people can compute, and people can learn CT without a machine. CT is a way of thinking, not a programming language.' },
        { t: 'key', md: 'CT = formulate the problem + express the solution so a computer (human **or** machine) can execute it effectively. A machine is **not** required.' },
        { t: 'quiz', q: 'Which statements about computational thinking are correct? (tick all that apply)',
          options: [
            'It is the thought process of formulating a problem and expressing its solution so a computer can carry it out.',
            'It can only be practised while writing code on a computer.',
            'The "computer" that carries out the solution may be a human.',
            'It is a skill only needed by programmers.',
          ],
          correct: [0, 2],
          why: ['This is the definition on the slide.', 'People can learn CT without a machine (p. 5).', 'The definition says "a computer, human or machine".', 'The deck opens with "Computing is everywhere": religion, history, military, politics. CT is for everyone.'] },
      ],
    },
    {
      id: 'why-ct',
      title: 'Why do I need CT?',
      blocks: [
        { t: 'text', refs: [{ src: D, page: 3 }, { src: D, page: 4 }, { src: D, page: 6 }], md: 'The slides first show that **computing is everywhere**: religious studies (search engines on sacred texts), history (digitising manuscripts, AR tours), military (encryption, simulation), politics (vote counting, e-government). The challenge "mention any domain where computing is not useful" is meant to be hard.\n\nThe slides also show the **Data → Information → Knowledge → Wisdom** ladder: raw data only becomes useful once someone structures it, finds meaning in it and decides what to do. Computers do the heavy lifting; the human formulates the problem.' },
        { t: 'text', md: 'A short exam answer to "why is CT important in the 21st century?" has three ingredients:\n\n- **Context**: digital age, lots of data, problems from every field depend on computing.\n- **Link to the pillars**: CT trains you to split problems, spot patterns, ignore noise and write clear steps.\n- **Cross-field benefit**: it is useful beyond programmers, and helps you work with computers and AI.' },
        { t: 'key', md: 'Good "why CT" answer = 21st-century context (data, digital) + the four pillars + usefulness across fields + one concrete example.' },
        { t: 'quiz', q: 'Which arguments are valid for "CT is an important 21st-century skill"? (tick all that apply)',
          options: [
            'Almost every field now depends on data and computing.',
            'CT trains structured problem solving that works on problems that are not about programming.',
            'Computers will do all thinking, so people no longer need to formulate problems.',
            'People who can express a solution clearly can work effectively with computers and AI.',
          ],
          correct: [0, 1, 3],
          why: ['Slide 3: computing is in religion, history, military, politics and more.', 'The pillars apply to any problem, e.g. planning a task or a schedule.', 'The opposite: a computer can only execute what a person has formulated and expressed clearly.', 'This is the "express the solution so a computer can carry it out" half of the definition.'] },
        { t: 'question', id: 'k18-s1a', note: 'An older paper (KU1102 2018) asks exactly this.' },
      ],
    },
    {
      id: 'decomposition',
      title: 'Pillar 1: Problem decomposition',
      blocks: [
        { t: 'text', refs: [{ src: D, page: 8 }, { src: D, page: 9 }], md: '**Problem decomposition** = solving a problem by dividing it into smaller sub-problems, then solving these smaller problems separately. The slide links it to **divide and conquer** (merge sort splits a list in halves, sorts each, merges).' },
        { t: 'text', refs: [{ src: D, page: 10 }, { src: D, page: 11 }, { src: D, page: 13 }], md: 'Slide examples:\n\n| Whole | Decomposed into |\n|---|---|\n| Writing a scientific article | main ideas, each with sub-points, each with sub-sub-points (a tree) |\n| A car (driver\'s view) | steering, brake, lighting, power system, … |\n| Academic information system | FRS, PRS, tuition payment, KSM printing, monitoring |\n\nThe same problem can be decomposed from **different perspectives**: by *type of user*, by *function*, or by *time* at which the function runs. Always give at least two when asked.' },
        { t: 'code', caption: 'Decomposition in code: each sub-problem becomes a small function (a module), and the main program just orders them.',
          python: 'def register():\n    print("register courses (FRS)")\n\ndef pay():\n    print("pay tuition")\n\ndef print_card():\n    print("print KSM")\n\n# ALGORITHM\nregister()\npay()\nprint_card()',
          notes: [
            { line: [1, 8], note: 'Three independent sub-problems, each solved separately.' },
            { line: [11, 13], note: 'The whole problem is the sub-problems in the right order: the KSM can only be printed after the payment.' },
          ] },
        { t: 'trap', md: 'A decomposition that is just a list of things is weak. Say how the parts **relate** (e.g. KSM printing needs the tuition payment first) and keep the parts **separate and complete**.' },
        { t: 'quiz', q: 'An academic system is split into "FRS", "PRS", "payment" and "KSM printing". Which perspectives of decomposition does the slide name? (tick all that apply)',
          options: ['By type of user', 'By function performed', 'By the time the function is executed', 'By the colour of the screen'],
          correct: [0, 1, 2],
          why: ['Student, academic advisor, head of study programme, admin staff.', 'Register, change plan, pay, print.', 'Before the semester, until week 4, start of semester.', 'Not a perspective in the slide, and not meaningful for a system design.'] },
        { t: 'question', id: 'd01-decompose-a', note: 'The slide-13 exercise. Give two perspectives.' },
      ],
    },
    {
      id: 'pattern-recognition',
      title: 'Pillar 2: Pattern recognition',
      blocks: [
        { t: 'text', refs: [{ src: D, page: 14 }, { src: D, page: 15 }, { src: D, page: 16 }], md: '**Pattern recognition** = recognising similarities/differences in the characteristics of problems or phenomena that are different but related.\n\nSlide examples:\n\n- **Matching socks**: compare colour and pattern.\n- **Sequential pattern mining**: from e-commerce records, "customers who buy a smartphone usually also buy a screen protector or casing within three days". From medical records: which treatment sequences give a better chance of recovery.' },
        { t: 'text', refs: [{ src: D, page: 17 }], md: 'Slide 17 asks you to look at telephone numbers such as `+62-811-234567`, `+1888300400`, `0065 7788 9900` and write **rules** that hold for all of them: only digits, `+`, `-`, `(`, `)` and spaces; starts with `+` or `00`; parentheses come in pairs; and so on. Finding the shared features is the pattern; stating them as a rule is what makes it reusable.' },
        { t: 'code', caption: 'One rule from the phone-number pattern, written as code: only allowed characters.',
          python: 'number = input()\nallowed = "0123456789+-() "\nok = True\nfor c in number:\n    if (c not in allowed):\n        ok = False\nprint(ok)',
          stdin: ['+62 (817) 123-456'],
          notes: [
            { line: 2, note: 'Rule 1 from the slide: the characters that may appear.' },
            { line: [4, 6], note: 'Check every character against the rule. One violation is enough to reject.' },
          ] },
        { t: 'predict', prompt: 'Same rule, a different input. What does it print?', code: 'number = input()\nallowed = "0123456789+-() "\nok = True\nfor c in number:\n    if (c not in allowed):\n        ok = False\nprint(ok)', stdin: ['+44 800 98x654'],
          explain: 'One bad character (`x`) breaks the allowed-characters rule, so the flag becomes `False` and stays `False`. A single rule is only a necessary condition; real telephone numbers also need the other rules.' },
        { t: 'quiz', q: 'Which of these is pattern recognition? (tick all that apply)',
          options: [
            'Noticing that customers who buy a phone often buy a casing within three days.',
            'Splitting a system into FRS, PRS, payment and KSM modules.',
            'Finding what all valid telephone-number examples have in common.',
            'Leaving street names off a map of West Java.',
          ],
          correct: [0, 2],
          why: ['Sequential pattern mining (slide 16).', 'That is decomposition.', 'Exercise on slide 17: derive rules from similarities.', 'That is abstraction (dropping unimportant detail).'] },
        { t: 'question', id: 'd01-phone-a', note: 'Slide 17, the full exercise.' },
      ],
    },
    {
      id: 'abstraction',
      title: 'Pillar 3: Abstraction & generalization',
      blocks: [
        { t: 'text', refs: [{ src: D, page: 20 }], md: '**Abstraction** = eliminating the unimportant parts of a problem. **Generalization** = obtaining a general solution that works for similar problems. The slides treat them as one pillar: abstraction & generalization.' },
        { t: 'text', refs: [{ src: D, page: 21 }, { src: D, page: 22 }], md: 'Examples from the slides:\n\n- **Maps**: an ITB map shows buildings and roads, a Bandung map shows main streets, a West Java map shows cities. Putting every street name on the West Java map would make it unreadable.\n- **Student data**: the student system keeps NIM, name, GPA, courses, parents, address; the academic system only NIM, name, GPA, courses; a general system only NIM and name. The right level of detail depends on the **purpose** of the system.\n\nThe question to ask: *what does the decision or the solution actually depend on?* Keep that, drop the rest.' },
        { t: 'code', caption: 'An abstraction as a function: the caller only supplies what matters (the two numbers) and ignores everything else (who, what, why). The same code now solves every similar problem: generalization.',
          python: 'def rectangle_area(p, l):\n    return p * l\n\nprint(rectangle_area(3, 4))\nprint(rectangle_area(10, 2))',
          notes: [{ line: 1, note: 'Parameters = the details that matter. Names, colours, units of the rectangle are abstracted away.' }, { line: [4, 5], note: 'One general solution, two different instances.' }] },
        { t: 'text', refs: [{ src: D, page: 23 }, { src: D, page: 24 }], md: '**Turtle graphics** (slide 23) generalises drawing: a turtle has position, direction and pen, and understands only *move forward*, *rotate*, *change pen*. With those three commands it can draw any 2D vector graphic.\n\n**City travelling robot** (slide 24): at each intersection the robot turns counterclockwise and takes a numbered detour. The instruction "4 1 2" means 4th detour at the first intersection, 1st at the second, 2nd at the third. Road length and map geometry are abstracted away; any trip from any point to any other point is just a **sequence of numbers**.' },
        { t: 'trap', md: 'Abstraction is not "make it vague". You still keep **everything the solution needs** (the constraints, the quantities). You only drop what cannot change the answer. Dropping a relevant detail is as wrong as keeping an irrelevant one.' },
        { t: 'quiz', q: 'A smile detector turns a face photo into two dots and a line, then checks it against red lines and green dots (slides 25 and 26). Which are correct? (tick all that apply)',
          options: [
            'Reducing the photo to eye positions and mouth shape is abstraction.',
            'The red-line/green-dot rule applies to any face: that is generalization.',
            'Hair colour must be kept, because it may change the answer.',
            'This is mostly decomposition, because the tool has two steps.',
          ],
          correct: [0, 1],
          why: ['Only the details the decision depends on are kept.', 'One criterion for all faces: a general solution.', 'Hair colour does not affect whether the mouth is smiling.', 'The two steps are a pipeline. The slide\'s moral is abstraction and generalization.'] },
      ],
    },
    {
      id: 'algorithmic-thinking',
      title: 'Pillar 4: Algorithmic thinking',
      blocks: [
        { t: 'text', refs: [{ src: D, page: 7 }], md: 'The fourth pillar is **algorithmic thinking**: composing an ordered sequence of steps that solves the problem, precise enough for a computer (human or machine) to execute. The slides use the deck on algorithmic thinking (D02) for the details, such as sequence, selection and repetition. Here you only need to recognise it and tell it apart from the other three.' },
        { t: 'text', md: 'Everyday example (cooking potatoes): *if there are no potatoes, buy them; peel them; if fries then fry, else if boiled then boil, else make soup.* Steps in order, with a decision. Anyone can follow it without guessing.' },
        { t: 'code', caption: 'The same idea as a program: ordered steps plus a selection. Input 2 stands for "boiled".',
          python: 'kind = int(input())\nprint("peel the potatoes")\nif (kind == 1):\n    print("fry")\nelif (kind == 2):\n    print("boil")\nelse:\n    print("make soup")',
          pseudo: r`Program Potatoes
KAMUS
  kind : integer
ALGORITMA
  input(kind)
  output("peel the potatoes")
  if kind = 1 then
    output("fry")
  else if kind = 2 then
    output("boil")
  else
    output("make soup")`,
          stdin: ['2'] },
        { t: 'key', md: 'Quick test for the four pillars:\n\n- **Decomposition**: "split it into parts".\n- **Pattern recognition**: "what is shared / what repeats?".\n- **Abstraction & generalization**: "what can I ignore, and can one solution cover all cases?".\n- **Algorithmic thinking**: "what are the ordered steps?".' },
        { t: 'quiz', q: 'Which statements about the four pillars are correct? (tick all that apply)',
          options: [
            'Decomposition divides a problem into sub-problems that are solved separately.',
            'Pattern recognition looks for similarities and differences between related problems.',
            'Abstraction means keeping every detail so nothing is lost.',
            'Algorithmic thinking composes an ordered sequence of steps for the solution.',
          ],
          correct: [0, 1, 3],
          why: ['The slide definition (p. 8).', 'The slide definition (p. 14).', 'The opposite: abstraction removes unimportant detail (p. 20).', 'Ordered steps that can be executed, human or machine.'] },
      ],
    },
    {
      id: 'which-pillar',
      title: 'Spotting the pillar in a scenario',
      blocks: [
        { t: 'text', md: 'The UTS gives a short scenario and asks which pillar (or which statement) fits. Look for the **action verb**:\n\n| Scenario says… | Pillar |\n|---|---|\n| split into modules / sub-problems / parts | decomposition |\n| similar, repeating, shared, regularity | pattern recognition |\n| ignore, irrelevant, only keep, works for all cases | abstraction & generalization |\n| steps, order, if/else, procedure | algorithmic thinking |' },
        { t: 'trap', md: 'A scenario can show **two** pillars. A map without street names is abstraction, but a turtle that draws any 2D shape is *generalization*, which still belongs to the abstraction pillar. Do not call it "pattern recognition" just because one solution covers many cases.' },
        { t: 'question', id: 'd01-pillars-d', note: 'The tricky one: generalization lives under the abstraction pillar.' },
      ],
    },
    {
      id: 'ct-in-tasks',
      title: 'Using all four pillars on a task',
      blocks: [
        { t: 'text', refs: [{ src: D, page: 27 }], md: 'Slide 27 (the all-in-one exercise) shows the order in which the pillars usually work together on a task such as "arrive in class and finish all obligations":\n\n1. **Decompose** your own morning into small steps.\n2. **Pattern recognition**: compare your steps with friends\' steps, find what is similar and what differs.\n3. **Abstraction**: remove steps that are too specific or unimportant.\n4. **Generalization**: formulate general steps that every student can follow.' },
        { t: 'text', md: 'In UTS Part II.1 and II.2 (constraint assignment and hierarchical classification), the final sub-question asks you to justify your answer with the principles. A compact structure that works:\n\n- **Abstraction**: which information matters (the constraints, the attributes), which you ignore (age, names, details).\n- **Decomposition**: split the requirements into separate conditions, per item or per rule.\n- **Pattern recognition**: what repeats (each item is a filter on the same attributes).\n- **Algorithmic thinking**: the order in which you solved it (most constrained first), then a final check of every constraint.' },
        { t: 'key', md: 'Justification template for II.1/II.2: **Abstraction** (keep / ignore), **Decomposition** (separate constraints), **Pattern** (repeated structure), **Algorithm** (order of steps + final check). Use concrete names from the question in each line.' },
        { t: 'question', id: 'uts25-s1b', note: 'UTS 2025: the same, with all four principles.' },
      ],
    },
    {
      id: 'drill',
      title: 'Exam drill and summary',
      blocks: [
        { t: 'text', md: '| Pillar | One-sentence definition | Slide example |\n|---|---|---|\n| Decomposition | Divide a problem into smaller sub-problems and solve them separately | article outline, car systems, academic system modules |\n| Pattern recognition | Recognise similarities/differences in related problems | socks, sequential pattern mining, phone-number rules |\n| Abstraction | Remove the unimportant parts | maps at different levels, student data per system |\n| Generalization | One general solution for similar problems | turtle graphics, city robot "4 1 2", smile detector |\n| Algorithmic thinking | An ordered sequence of executable steps | cooking steps with if/else |' },
        { t: 'key', md: 'CT is the thought process of formulating a problem and expressing its solution so that a computer, **human or machine**, can carry it out.' },
        { t: 'trap', md: '- Saying CT needs a computer. It does not.\n- Calling generalization "pattern recognition". It belongs to the abstraction pillar.\n- Listing parts without saying how they relate, or giving only one perspective.\n- Keeping a detail "just in case" and calling it abstraction.\n- In ○/✗ questions: a wrong mark costs −1, so leave unsure options blank.' },
        { t: 'quiz', q: 'Final check. Which are correct? (tick all that apply)',
          options: [
            'Abstraction removes details that cannot change the solution.',
            'Dividing the academic system into FRS, PRS, payment and KSM modules is decomposition.',
            'Pattern recognition is the pillar that dictates the exact order of steps.',
            'The smiley detector\'s "one criterion for all faces" illustrates generalization.',
          ],
          correct: [0, 1, 3],
          why: ['Yes: relevance to the solution is the test.', 'Yes: modules solved separately.', 'No: the order of steps is algorithmic thinking.', 'Yes: slide 26, the moral of the story.'] },
        { t: 'question', id: 'd01-robot412-b', note: 'Harder: trace the robot, then explain what is abstracted away.' },
      ],
    },
  ],
}
