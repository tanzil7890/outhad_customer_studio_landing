import type { CSSProperties, ReactNode } from 'react'
import { ease, tw } from '../anim'
import { C, font } from '../theme'

/** Headline whose words rise in one after another, and optionally leave together. */
export function Headline({
  s,
  at,
  out,
  text,
  size = 64,
  color = C.text,
  weight = 650,
  style,
  align = 'left',
  stagger = 0.045,
}: {
  s: number
  at: number
  out?: number
  text: string
  size?: number
  color?: string
  weight?: number
  style?: CSSProperties
  align?: 'left' | 'center'
  stagger?: number
}) {
  const words = text.split(' ')
  const exit = out === undefined ? 0 : tw(s, out, out + 0.45, 0, 1, ease.in)
  return (
    <div
      style={{
        fontFamily: font,
        fontSize: size,
        fontWeight: weight,
        lineHeight: 1.06,
        letterSpacing: '-0.025em',
        color,
        textAlign: align,
        opacity: 1 - exit,
        transform: `translateY(${-exit * 24}px)`,
        ...style,
      }}
    >
      {words.map((word, i) => {
        const p = tw(s, at + i * stagger, at + i * stagger + 0.7, 0, 1, ease.outQuint)
        return (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em' }}>
            <span style={{ display: 'inline-block', transform: `translateY(${(1 - p) * 105}%)`, opacity: p > 0 ? 1 : 0 }}>
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          </span>
        )
      })}
    </div>
  )
}

export function Eyebrow({ s, at, children, style }: { s: number; at: number; children: ReactNode; style?: CSSProperties }) {
  const p = tw(s, at, at + 0.6)
  return (
    <div
      style={{
        fontFamily: font,
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: C.muted,
        opacity: p,
        transform: `translateX(${(1 - p) * -12}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function Fade({ s, at, out, dur = 0.5, children, style }: { s: number; at: number; out?: number; dur?: number; children: ReactNode; style?: CSSProperties }) {
  const inP = tw(s, at, at + dur)
  const outP = out === undefined ? 0 : tw(s, out, out + dur)
  return <div style={{ opacity: inP * (1 - outP), ...style }}>{children}</div>
}
