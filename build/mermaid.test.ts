// node build/mermaid.test.ts  — Mermaid text ⇄ flowchart blocks (app/src/code/mermaid.ts): structure recovery + round trip
import assert from 'node:assert/strict'
import { flowToMermaid, mermaidToFlow } from '../app/src/code/mermaid.ts'
import { flowToPython } from '../app/src/code/flow.ts'

const py = (src: string) => {
  const r = mermaidToFlow(src)
  assert.deepEqual(r.errors, [], src)
  const back = mermaidToFlow(flowToMermaid(r.flow!))
  assert.deepEqual(back.flow, r.flow, 'round trip changes the chart')
  const c = flowToPython(r.flow!)
  assert.deepEqual(c.errors, [])
  return c.code.slice(c.code.indexOf('\n\n') + 2)
}

// if / else with a shared join
assert.match(py(`flowchart TD
  A([Start]) --> B[/input x/]
  B --> C{x > 0?}
  C -->|Yes| D[/output "positif"/]
  C -->|No| E[/output "bukan"/]
  D --> F([End])
  E --> F`), /if \(x > 0\):\n {4}print\("positif"\)\nelse:\n {4}print\("bukan"\)/)

// one-armed if with Indonesian labels, chained arrows, <- arrow
assert.match(py(`graph TD
  S([Mulai]) --> I[/baca(n)/] --> D{n < 0} -->|ya| P[n <- -n]
  P --> O[/tulis(n)/]
  D -->|tidak| O --> E([Selesai])`), /if \(n < 0\):\n {4}n = -n\nprint\(n\)/)

// while (test at top), <br> = two statements
assert.match(py(`flowchart TD
  S([Start]) --> A[/input(N)/] --> B[i ← 1<br>sum ← 0] --> C{i <= N}
  C -->|Yes| D[sum ← sum + i] --> E[i ← i + 1] --> C
  C -->|No| F[/output(sum)/] --> G([End])`), /while \(i <= N\):\n {4}sum = sum \+ i\n {4}i = i \+ 1\nprint\(sum\)/)

// while whose loop arrow is No → negated condition
assert.match(py(`flowchart TD
  S([Start]) --> A[i ← 0] --> C{i = 3}
  C -->|No| D[i ← i + 1] --> C
  C -->|Yes| E([End])`), /while \(not \(i == 3\)\):/)

// repeat-until (test at bottom)
assert.match(py(`flowchart TD
  S([Start]) --> A[x ← 0]
  A --> B[/input(y)/]
  B --> C[x ← x + y]
  C --> D{y = 0}
  D -->|No| B
  D -->|Yes| E[/output(x)/]
  E --> F([End])`), /while True:\n {4}y = _in\(\)\n {4}x = x \+ y\n {4}if \(y == 0\):\n {8}break/)

// if nested in a while
assert.match(py(`flowchart TD
  S([Start]) --> A[/input(N)/] --> B[i ← 1] --> W{i ≤ N}
  W -->|Yes| C{i mod 2 = 0}
  C -->|Yes| P[/output(i)/] --> K[i ← i + 1]
  C -->|No| K
  K --> W
  W -->|No| E([End])`), /while \(i <= N\):\n {4}if \(i % 2 == 0\):\n {8}print\(i\)\n {4}i = i \+ 1/)

// errors point at a line
const bad = mermaidToFlow('flowchart TD\n  A[x ← 1] --> B[y ← 2]\n  A --> C[z ← 3]')
assert.equal(bad.flow, null)
assert.equal(bad.errors[0].line, 2)
assert.match(bad.errors[0].msg, /Only a decision/)
assert.match(mermaidToFlow('flowchart TD\n  A --> ').errors[0].msg, /doesn't point at a node/)
assert.match(mermaidToFlow('flowchart TD\n  S([Start]) --> D{x > 0}\n  D --> E([End])').errors[0].msg, /exactly 2 arrows/)

console.log('mermaid: OK')
