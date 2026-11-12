// SVG grid drawing of a robot route, animated, with the target ghosted underneath for comparison.
import { useEffect, useMemo, useState } from 'react'
import './robot.css'
import { firstDivergence, pathPoints, type Seg } from './sim'

export interface RobotCanvasProps {
  /** reference route (canonical U/D/L/R string): drawn as a pale ghost */
  target?: string
  /** learner's route: drawn on top, green while it matches the target, red from the first divergence on */
  got?: string
  /** colour the route by repeat iteration (the "repeating unit" hint); uses these segments of the reference run */
  unit?: Seg[]
  /** animate the drawing (replay with the ▶ button). Default true; reduced-motion users get it static */
  animate?: boolean
  /** caption, e.g. "n = 3" */
  label?: string
  /** mark the first divergence step (default true) */
  showDiff?: boolean
  /** smaller tile */
  small?: boolean
  /** the unit move (0-based) to highlight, e.g. the clicked line's first move */
  focusStep?: number
}

const UNIT_HUES = [212, 28, 280, 160, 340, 48]
const reduceMotion = () => { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false } }

export default function RobotCanvas({ target, got, unit, animate = true, label, showDiff = true, small, focusStep }: RobotCanvasProps) {
  const S = 36 // px per unit in viewBox space
  const geom = useMemo(() => {
    const tp = pathPoints(target ?? '')
    const gp = pathPoints(got ?? '')
    const all = [...tp, ...gp, ...(unit ?? []).flatMap((s) => [{ x: s.x1, y: s.y1 }, { x: s.x2, y: s.y2 }])]
    let minX = Math.min(...all.map((p) => p.x)), maxX = Math.max(...all.map((p) => p.x))
    let minY = Math.min(...all.map((p) => p.y)), maxY = Math.max(...all.map((p) => p.y))
    minX -= 1; maxX += 1; minY -= 1; maxY += 1
    if (maxX - minX < 3) { maxX += 1; minX -= 1 }
    if (maxY - minY < 3) { maxY += 1; minY -= 1 }
    return { tp, gp, minX, maxX, minY, maxY, W: (maxX - minX) * S, H: (maxY - minY) * S }
  }, [target, got, unit])
  const X = (x: number) => (x - geom.minX) * S
  const Y = (y: number) => (geom.maxY - y) * S

  const total = unit ? unit.length : (got ?? '').length
  const [shown, setShown] = useState(total)
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!animate || reduceMotion() || total === 0) { setShown(total); return }
    setShown(0)
    let i = 0
    const dt = Math.max(35, Math.min(110, 1800 / Math.max(total, 1)))
    const id = window.setInterval(() => { i++; setShown(i); if (i >= total) window.clearInterval(id) }, dt)
    return () => window.clearInterval(id)
  }, [got, unit, animate, total, tick])

  const div = target !== undefined && got !== undefined ? firstDivergence(got, target) : -1
  const pts = (arr: { x: number; y: number }[], from: number, to: number) =>
    arr.slice(from, to + 1).map((p) => `${X(p.x)},${Y(p.y)}`).join(' ')

  // grid
  const vLines: number[] = [], hLines: number[] = []
  for (let x = Math.ceil(geom.minX); x <= geom.maxX; x++) vLines.push(x)
  for (let y = Math.ceil(geom.minY); y <= geom.maxY; y++) hLines.push(y)

  const nGot = Math.min(shown, got?.length ?? 0)
  const okTo = div < 0 ? nGot : Math.min(nGot, div)
  const cur = unit ? (shown > 0 ? { x: unit[Math.min(shown, unit.length) - 1].x2, y: unit[Math.min(shown, unit.length) - 1].y2 } : { x: 0, y: 0 }) : geom.gp[nGot] ?? { x: 0, y: 0 }
  const maxPx = small ? 170 : 300
  const widthPx = Math.min(geom.W * (small ? 0.62 : 0.8), maxPx * (geom.W / Math.max(geom.W, geom.H)) + 40)
  const aria = `Robot route drawing${label ? ' ' + label : ''}: ${target ? 'target ' + target.length + ' steps' : ''}${got !== undefined ? ', your answer ' + got.length + ' steps' : ''}`

  return (
    <figure className={'robot-cv' + (small ? ' sm' : '')}>
      <svg viewBox={`0 0 ${geom.W} ${geom.H}`} style={{ width: '100%', maxWidth: Math.max(widthPx, 120) }} role="img" aria-label={aria}>
        <g className="robot-cv-grid">
          {vLines.map((x) => <line key={'v' + x} x1={X(x)} y1={0} x2={X(x)} y2={geom.H} />)}
          {hLines.map((y) => <line key={'h' + y} x1={0} y1={Y(y)} x2={geom.W} y2={Y(y)} />)}
        </g>
        {target && geom.tp.length > 1 && <polyline className="robot-cv-ghost" points={pts(geom.tp, 0, geom.tp.length - 1)} />}
        {unit
          ? unit.slice(0, shown).map((s, i) => {
              const h = UNIT_HUES[Math.max(s.rep, 0) % UNIT_HUES.length]
              const col = s.rep < 0 ? 'var(--muted)' : `hsl(${h} 70% ${s.iter % 2 ? 62 : 40}%)`
              return <line key={i} className="robot-cv-unit" x1={X(s.x1)} y1={Y(s.y1)} x2={X(s.x2)} y2={Y(s.y2)} stroke={col} />
            })
          : got !== undefined && geom.gp.length > 1 && (
            <>
              {okTo > 0 && <polyline className="robot-cv-ok" points={pts(geom.gp, 0, okTo)} />}
              {div >= 0 && nGot > div && <polyline className="robot-cv-bad" points={pts(geom.gp, div, nGot)} />}
            </>
          )}
        {focusStep !== undefined && geom.gp[focusStep] && geom.gp[focusStep + 1] && (
          <line className="robot-cv-focus" x1={X(geom.gp[focusStep].x)} y1={Y(geom.gp[focusStep].y)} x2={X(geom.gp[focusStep + 1].x)} y2={Y(geom.gp[focusStep + 1].y)} />
        )}
        {showDiff && div >= 0 && geom.gp[div] && nGot >= div && (
          <g className="robot-cv-div">
            <circle cx={X(geom.gp[div].x)} cy={Y(geom.gp[div].y)} r={S * 0.3} />
            <text x={X(geom.gp[div].x)} y={Y(geom.gp[div].y) - S * 0.42} textAnchor="middle">step {div + 1}</text>
          </g>
        )}
        <circle className="robot-cv-start" cx={X(0)} cy={Y(0)} r={S * 0.2} />
        <circle className="robot-cv-bot" cx={X(cur.x)} cy={Y(cur.y)} r={S * 0.16} />
      </svg>
      <figcaption>
        {label && <b>{label}</b>}
        {animate && total > 1 && <button className="btn sm ghost" onClick={() => setTick((t) => t + 1)} aria-label="Replay the animation" title="Replay">▶</button>}
      </figcaption>
    </figure>
  )
}
