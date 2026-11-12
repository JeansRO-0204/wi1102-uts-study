// node build/flowops.test.ts  — unit tests for app/src/code/flowOps.ts + D05 "sum 1..N" flowchart via the Python harness
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import type { FlowBlock } from '../app/src/types.ts'
import * as O from '../app/src/code/flowOps.ts'
import { flowToPython } from '../app/src/code/flow.ts'

const proc = (text: string): FlowBlock => ({ t: 'process', text })
// move into own subtree rejected
const tree: FlowBlock[] = [proc('a'), { t: 'if', cond: 'x > 0', then: [proc('t1'), proc('t2')], else: [proc('e1')] }, proc('z')]
assert.equal(O.moveBlock(tree, '1', '1.then', 0), null)
assert.equal(O.moveBlock(tree, '1', '1.else', 1), null)
assert.equal(O.slotValid('1', '1.then', 0), false)
assert.equal(O.slotValid('1', '', 2), false) // no-op
assert.equal(O.slotValid('1', '', 3), true)
// moving an if keeps its branches
const m = O.moveBlock(tree, '1', '', 3)!
assert.deepEqual(m.map((b) => b.t), ['process', 'process', 'if'])
const mi = m[2] as Extract<FlowBlock, { t: 'if' }>
assert.deepEqual(mi.then.map((b) => (b as any).text), ['t1', 't2'])
assert.deepEqual(mi.else!.map((b) => (b as any).text), ['e1'])
// move a later top-level block into an earlier-sibling's branch / shifted path
const m2 = O.moveBlock(tree, '0', '1.then', 1)!   // 'a' into the if (a later sibling): path shifts
assert.deepEqual(m2.map((b) => b.t), ['if', 'process'])
assert.deepEqual(((m2[0] as any).then).map((b: any) => b.text), ['t1', 'a', 't2'])
// move within a list, forward and backward
assert.deepEqual(O.moveBlock([proc('a'), proc('b'), proc('c')], '0', '', 3)!.map((b: any) => b.text), ['b', 'c', 'a'])
assert.deepEqual(O.moveBlock([proc('a'), proc('b'), proc('c')], '2', '', 0)!.map((b: any) => b.text), ['c', 'a', 'b'])
// delete subtree, insert into undefined else
assert.equal(O.deleteAt(tree, '1').length, 2)
const ins = O.insertAt([{ t: 'if', cond: 'c', then: [] }], '0.else', 0, proc('q'))
assert.equal((ins[0] as any).else[0].text, 'q')
assert.ok(O.isAncestor('1', '1.then.0') && !O.isAncestor('1', '10.then.0') && !O.isAncestor('1', '1'))
assert.equal(O.errorId('block 2 › Yes branch › block 1: empty box'), '1.then.0')
assert.equal(O.errorId('block 3: x'), '2')
// original not mutated
assert.equal(tree.length, 3)

// D05 sum 1..N built purely by operations
let b: FlowBlock[] = []
b = O.insertAt(b, '', 0, O.makeBlock('in')); b = O.replaceBlock(b, '0', (x) => O.withText(x, 'N'))
b = O.insertAt(b, '', 1, O.makeBlock('process')); b = O.replaceBlock(b, '1', (x) => O.withText(x, 'total ← 0'))
b = O.insertAt(b, '', 2, O.makeBlock('process')); b = O.replaceBlock(b, '2', (x) => O.withText(x, 'i ← 1'))
b = O.insertAt(b, '', 3, O.makeBlock('while')); b = O.replaceBlock(b, '3', (x) => O.withText(x, 'i <= N'))
b = O.insertAt(b, '3.body', 0, O.makeBlock('process')); b = O.replaceBlock(b, '3.body.0', (x) => O.withText(x, 'i ← i + 1'))
b = O.insertAt(b, '3.body', 0, O.makeBlock('process')); b = O.replaceBlock(b, '3.body.0', (x) => O.withText(x, 'total ← total + i'))
b = O.insertAt(b, '', 4, O.makeBlock('out')); b = O.replaceBlock(b, '4', (x) => O.withText(x, 'total'))
// accidentally put the output inside the loop, then drag it out
b = O.moveBlock(b, '4', '3.body', 2)!; b = O.moveBlock(b, '3.body.2', '', 4)!
const r = flowToPython({ blocks: b })
assert.deepEqual(r.errors, [])
console.log(r.code)
const py = spawnSync('python3', ['-I', 'app/src/py/harness.py'], { input: JSON.stringify({ op: 'run', code: r.code, stdin: ['10'] }) + '\n', encoding: 'utf8' })
const res = JSON.parse(py.stdout.trim().split('\n')[0])
console.log(res)
assert.equal(String(res.stdout ?? res.out).trim(), '55')
console.log('OK')
