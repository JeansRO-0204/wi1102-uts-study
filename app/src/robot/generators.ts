// Generators of new RobotQ variants (Rody terrains, Ladybug stairs / waves / frames) for spaced practice.
// Pure TS, `import type` only (Node-importable). Deterministic in `seed`, so a variant can be re-created from its id.
// Every reference solution is run through robot/sim.ts by the caller (build/verify.ts bakes paths for banked items;
// the view computes them on the fly for generated ones), so nothing here hard-codes a path.
import type { Problem, RobotQ, RubricRow } from '../types'

/** Official-style 0–4 rubric (UTS 2024 Soal 3 wording, in English), used when a question has no rubric of its own. */
export const ROBOT_RUBRIC: RubricRow[] = [
  { score: 4, desc: 'The command sequence draws exactly the required shape.' },
  { score: 3.5, desc: 'A small slip makes the solution imperfect.' },
  { score: 3, desc: 'Steps are incomplete but the shape is broadly right; or commands that could be repeated are written out in a row, yet the result is correct.' },
  { score: 2, desc: 'Only part of the steps produce part of the shape (including one wrong step that spoils the drawing but still heads the right way).' },
  { score: 1, desc: 'Only a small part of the sequence is right.' },
  { score: 0, desc: 'Completely wrong, or not attempted.' },
]

interface Pattern {
  id: string
  dialect: 'rody' | 'ladybug'
  title: string
  /** how the shape is described (English) */
  shape: (v: number) => string
  /** `v` = small variant knob (1 or 2) */
  solution: (v: number, P: string) => string
  nValues: number[]
  /** idea of the repeating unit (for the explanation / hints) */
  unit: (v: number) => string
  nudge: string
  difficulty: 1 | 2 | 3
  variants: number
}

const walks = (k: number, ind = '  ') => Array(k).fill(ind + 'walk').join('\n')

export const ROBOT_PATTERNS: Pattern[] = [
  {
    id: 'rody-valley', dialect: 'rody', title: 'Stepped valley', difficulty: 1, variants: 2, nValues: [1, 2, 3, 4],
    shape: (v) => `a valley (*terrain*) n steps deep; each step is ${v} walk(s) wide, there are ${v} flat walk(s) at the bottom, then n steps up to the right side`,
    solution: (v, P) => `repeat ${P}\n${walks(v)}\n  down\n${walks(v, '')}\nrepeat ${P}\n  up\n${walks(v)}`,
    unit: (v) => `one step down = ${v} × walk + down; one step up = up + ${v} × walk`,
    nudge: 'Draw n = 1, 2, 3. Going down and going up each happen n times; what stays fixed (at the bottom)?',
  },
  {
    id: 'rody-hill', dialect: 'rody', title: 'Stepped hill', difficulty: 1, variants: 2, nValues: [1, 2, 3, 4],
    shape: (v) => `a hill n steps high; climb n steps (each step ${v} walk(s) wide), a flat top of ${v} walk(s), then descend n steps`,
    solution: (v, P) => `repeat ${P}\n  up\n${walks(v)}\n${walks(v, '')}\nrepeat ${P}\n${walks(v)}\n  down`,
    unit: () => 'up: up + walk; down: walk + down; separated by a flat top',
    nudge: 'Picture the mirror image of the valley in the exam example. Which part is repeated n times?',
  },
  {
    id: 'rody-stairs', dialect: 'rody', title: 'Rising stairs', difficulty: 1, variants: 2, nValues: [1, 2, 3, 5],
    shape: (v) => `stairs rising n steps; each step: ${v} walk(s) forward, then up 1`,
    solution: (v, P) => `repeat ${P}\n${walks(v)}\n  up`,
    unit: (v) => `one step: ${v} × walk, then up`,
    nudge: 'Find just one step. How many times is it repeated?',
  },
  {
    id: 'rody-zigzag', dialect: 'rody', title: 'Zig-zag', difficulty: 1, variants: 2, nValues: [1, 2, 3, 4],
    shape: (v) => `a zig-zag wave of n teeth; each tooth: ${v} walk(s) forward, up 1, ${v} walk(s) forward, down 1`,
    solution: (v, P) => `repeat ${P}\n${walks(v)}\n  up\n${walks(v)}\n  down`,
    unit: (v) => `one tooth: ${v} × walk, up, ${v} × walk, down`,
    nudge: 'What does one zig-zag tooth consist of? Repeat it n times.',
  },
  {
    id: 'rody-ditch', dialect: 'rody', title: 'Square ditch', difficulty: 2, variants: 1, nValues: [1, 2, 3, 4],
    shape: () => 'a square ditch: down n steps, walk n steps to the right along the bottom, then up n steps (depth and width are both n)',
    solution: (_v, P) => `repeat ${P}\n  down\nrepeat ${P}\n  walk\nrepeat ${P}\n  up`,
    unit: () => 'three consecutive repeat blocks, all n times',
    nudge: 'Here n appears three times: the depth, the width, and the climb back up. Write three repeats.',
  },
  {
    id: 'rody-two-valleys', dialect: 'rody', title: 'Two valleys (nested repeat)', difficulty: 3, variants: 1, nValues: [1, 2, 3],
    shape: () => 'two valleys in a row, each n steps deep like the exam example, separated by 1 flat step',
    solution: (_v, P) => `repeat 2\n  repeat ${P}\n    walk\n    down\n  walk\n  repeat ${P}\n    up\n    walk\n  walk`,
    unit: () => 'one whole valley repeated 2 times; inside it a repeat n for going down and a repeat n for going up',
    nudge: 'First write a single valley (the exam problem). Then wrap it in repeat 2. Watch the separator step in between.',
  },
  {
    id: 'lady-stairs', dialect: 'ladybug', title: 'Ladybug stairs', difficulty: 1, variants: 2, nValues: [1, 2, 3, 4],
    shape: (v) => `stairs of N steps going up and to the right; each step: forward ${v}, turn right, forward ${v}, turn left (the Ladybug initially faces up)`,
    solution: (v, P) => `Repeat ${P} ( Forward ${v} Right Forward ${v} Left )`,
    unit: (v) => `Forward ${v}, Right, Forward ${v}, Left: facing up again`,
    nudge: 'Draw N = 1, 2, 3 and find one step. After one step, which way is the Ladybug facing?',
  },
  {
    id: 'lady-pyramid', dialect: 'ladybug', title: 'Pyramid (UTS 2025)', difficulty: 3, variants: 1, nValues: [1, 2, 3, 4],
    shape: () => 'a stepped pyramid of height N (like Soal 3 of UTS 2025): climb N steps, 1 flat step at the top, descend N steps; N = 1 is just the shape "∩"',
    solution: (_v, P) => `Repeat ${P}-1 ( Forward 1 Right Forward 1 Left )\nForward 1 Right Forward 1 Right\nRepeat ${P}-1 ( Forward 1 Left Forward 1 Right )\nForward 1`,
    unit: () => 'rising side: (Forward 1, Right, Forward 1, Left) × (N−1); top; falling side: (Forward 1, Left, Forward 1, Right) × (N−1)',
    nudge: 'Look at N = 1: just "∩" (Forward 1 Right Forward 1 Right Forward 1). Each time N grows by 1, what is added on the rising side and on the falling side?',
  },
  {
    id: 'lady-square', dialect: 'ladybug', title: 'Square frame', difficulty: 1, variants: 1, nValues: [1, 2, 3, 4],
    shape: () => 'a square with side N drawn clockwise, starting facing up and returning to the starting point',
    solution: (_v, P) => `Repeat 4 ( Forward ${P} Right )`,
    unit: () => 'one side: Forward N then Right; repeated 4 times',
    nudge: 'The side length depends on N, but how many times is the side repeated?',
  },
  {
    id: 'lady-L', dialect: 'ladybug', title: 'The letter L', difficulty: 1, variants: 1, nValues: [1, 2, 3, 4],
    shape: () => 'an upside-down "L": up 2N steps, then right N steps',
    solution: (_v, P) => `Forward 2*${P}\nRight\nForward ${P}`,
    unit: () => 'no repeat needed: Forward can take an expression in N',
    nudge: 'Not every pattern needs Repeat. Forward accepts numbers, so write the distance in terms of N.',
  },
  {
    id: 'lady-wave', dialect: 'ladybug', title: 'Square wave', difficulty: 2, variants: 2, nValues: [1, 2, 3, 4],
    shape: (v) => `a square wave of N periods; each period: up ${v}, right 1, down ${v}, right 1 (the Ladybug initially faces up and ends facing up)`,
    solution: (v, P) => `Repeat ${P} ( Forward ${v} Right Forward 1 Right Forward ${v} Left Forward 1 Left )`,
    unit: (v) => `one period: Forward ${v}, Right, Forward 1, Right, Forward ${v}, Left, Forward 1, Left`,
    nudge: 'Draw just one period and note the facing direction at its end. It must equal the start so the period can be repeated.',
  },
  {
    id: 'lady-spiral-steps', dialect: 'ladybug', title: 'Stairs then tower', difficulty: 2, variants: 1, nValues: [1, 2, 3, 4],
    shape: () => 'stairs going up N steps (forward 1, right, forward 1, left) and then straight up N steps',
    solution: (_v, P) => `Repeat ${P} ( Forward 1 Right Forward 1 Left )\nForward ${P}`,
    unit: () => 'a part repeated N times, followed by a single Forward N',
    nudge: 'Some parts repeat and some happen only once. Separate the two.',
  },
]

function pick(seed: number) {
  const s = Math.abs(Math.floor(seed))
  const pat = ROBOT_PATTERNS[s % ROBOT_PATTERNS.length]
  const v = 1 + (Math.floor(s / ROBOT_PATTERNS.length) % pat.variants)
  return { pat, v }
}

/** Question id of the variant for a seed: 'gen-robot-<seed>'. */
export const robotGenId = (seed: number) => `gen-robot-${Math.abs(Math.floor(seed))}`

/** One generated RobotQ. Same seed → same question. */
export function generateRobotQ(seed: number): RobotQ {
  const { pat, v } = pick(seed)
  const P = pat.dialect === 'rody' ? 'n' : 'N'
  const solution = pat.solution(v, P)
  const cmds = pat.dialect === 'rody'
    ? 'Commands: `up` (climb 1), `down` (descend 1), `walk` (move 1 to the right), `repeat n` + indented commands (repeated n times).'
    : 'Commands: `Forward N` (move N), `Left` / `Right` (turn 90° on the spot), `Repeat N ( ... )` (repeat N times). The Ladybug initially faces up.'
  return {
    id: robotGenId(seed), kind: 'robot', decks: ['D02'], topic: 'Robot repeat', dialect: pat.dialect, param: P,
    nValues: pat.nValues, difficulty: pat.difficulty, misconceptions: ['repeat-count'],
    stem: `${cmds}\n\nWrite the commands so that the robot draws **${pat.shape(v)}**, for any ${P} ≥ 1. The target drawings for a few values of ${P} are shown below.`,
    solution, rubric: ROBOT_RUBRIC,
    hints: [pat.nudge],
    explanation: `The repeating part: ${pat.unit(v)}.\n\nReference program:\n\n\`\`\`\n${solution}\n\`\`\``,
    work: [`Draw ${P} = 1, 2, 3 and find the part that grows.`, `One unit: ${pat.unit(v)}.`, `Write the unit inside a repeat whose count depends on ${P}, and put any part that occurs only once outside the repeat.`],
  }
}

/** The same variant wrapped as a one-part Problem, ready for a practice pool. */
export function generateRobotProblem(seed: number): Problem {
  const q = generateRobotQ(seed)
  const { pat } = pick(seed)
  return {
    id: q.id, archetype: 'robot', source: { kind: 'generated' as const, lang: 'en' as const, label: 'Robot variant', official: false },
    title: `Robot: ${pat.title}`, parts: [q],
  }
}

/** Generator registry for pools ("gens" in the practice preset): produce `count` fresh variants. */
export const ROBOT_GENERATOR = {
  id: 'robot', title: 'Robot (repeat n)',
  make: (count: number, startSeed = 1): Problem[] => Array.from({ length: count }, (_, i) => generateRobotProblem(startSeed + i)),
}
