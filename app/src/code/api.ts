// Representation engines used by the Program/Trace views: re-exports of the real implementations.
export type { PseudoResult } from './pseudo.ts'
export type { FlowResult } from './flow.ts'
/** Liem-notation pseudocode → Python (house style). Lenient; errors point at pseudocode lines (1-based); `map[i]` = pseudo line of Python line i+1. */
export { pseudoToPython } from './pseudo.ts'
/** Flowchart block tree → Python. `map[i]` = block id (see flow.ts `blockPathLabel`) of Python line i+1, usable as FlowView `active`. */
export { flowToPython, blockPathLabel } from './flow.ts'
/** Read-only flowchart renderer (SVG). `active` = block id ("2", "3.body.1", "1.then.0") to highlight while walking an input. */
export { FlowView } from './FlowView'
/** Block-based flowchart editor with live preview. */
export { FlowBuilder } from './FlowBuilder'
export const ENGINES_READY = true
