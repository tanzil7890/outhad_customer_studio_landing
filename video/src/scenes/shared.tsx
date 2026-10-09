import type { ReactNode } from 'react'
import type { SceneSpec } from '../timeline'
import { C, H, W } from '../theme'

export interface SceneProps {
  /** Local frame within the scene. */
  f: number
  /** Local time in seconds. */
  s: number
  spec: SceneSpec
}

/** Three-column layout used by the product scenes. */
export const L = {
  left: 120,
  colW: 450,
  eyebrowY: 132,
  headlineY: 176,
  clockY: 640,
  phoneX: 640,
  phoneY: 120,
  panelX: 1100,
  panelY: 120,
  panelW: 700,
  panelH: 820,
}

export function Backdrop({ children, glow = { x: 70, y: 35 } }: { children: ReactNode; glow?: { x: number; y: number } }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: W,
        height: H,
        overflow: 'hidden',
        background: `radial-gradient(1400px 900px at ${glow.x}% ${glow.y}%, #2b211b 0%, ${C.night} 62%)`,
      }}
    >
      {children}
    </div>
  )
}

export function Abs({ x, y, w, children, style }: { x: number; y: number; w?: number; children: ReactNode; style?: React.CSSProperties }) {
  return <div style={{ position: 'absolute', left: x, top: y, width: w, ...style }}>{children}</div>
}
