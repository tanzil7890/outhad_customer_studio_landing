import type { CSSProperties, ReactNode } from 'react'
import { C } from '../theme'

export const PHONE_H = 820
export const PHONE_W = Math.round((PHONE_H * 9) / 19)

/** Warm-black phone body with a soft halo so it separates from the dark stage. */
export function Phone({ x, y, children, style, scale = 1 }: { x: number; y: number; children: ReactNode; style?: CSSProperties; scale?: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: PHONE_W,
        height: PHONE_H,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -120,
          background: 'radial-gradient(closest-side, rgba(224,154,104,0.10), rgba(26,20,16,0) 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 64,
          background: '#120d0a',
          boxShadow: `0 0 0 2px ${C.line}, 0 0 0 3px rgba(245,240,235,0.06), 0 60px 120px -40px rgba(0,0,0,0.8)`,
          padding: 12,
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 52, overflow: 'hidden', background: '#fff' }}>
          {children}
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: '50%',
              width: 118,
              height: 34,
              marginLeft: -59,
              borderRadius: 20,
              background: '#0b0806',
              zIndex: 50,
            }}
          />
        </div>
      </div>
    </div>
  )
}
