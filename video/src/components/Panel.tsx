import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { formatClock, type StorySignal } from '../../../lib/landing/story'
import { C, font, mono } from '../theme'

/** Warm-black "what Convertive sees" panel. */
export function Panel({
  x,
  y,
  w,
  h,
  live = true,
  identity,
  known = 0,
  risk,
  intent,
  children,
}: {
  x: number
  y: number
  w: number
  h: number
  live?: boolean
  identity: string
  known?: number
  risk: number
  intent: number
  children?: ReactNode
}) {
  const arc = 157 // length of the semicircle path below
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 36,
        background: C.raised,
        boxShadow: `0 0 0 1.5px ${C.line}, 0 60px 120px -50px rgba(0,0,0,0.85)`,
        padding: 36,
        fontFamily: font,
        color: C.text,
        display: 'flex',
        flexDirection: 'column',
        gap: 26,
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 700 }}>
          <span style={{ width: 14, height: 14, borderRadius: 7, background: live ? C.successSoft : C.muted, boxShadow: live ? `0 0 0 6px rgba(168,223,200,0.15)` : undefined }} />
          {live ? 'Convertive · live' : 'Your current stack'}
        </div>
        <div
          style={{
            fontFamily: mono,
            fontSize: 21,
            padding: '8px 16px',
            borderRadius: 999,
            background: known > 0.5 ? 'rgba(26,92,64,0.45)' : C.night,
            color: known > 0.5 ? C.successSoft : C.soft,
            transform: `scale(${1 + Math.sin(Math.min(1, known) * Math.PI) * 0.08})`,
          }}
        >
          {identity}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div style={{ borderRadius: 22, background: C.night, padding: '20px 22px' }}>
          <div style={{ fontSize: 18, color: C.soft }}>Exit risk</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 6 }}>
            <svg viewBox="0 0 120 66" style={{ width: 118, height: 66 }}>
              <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke={C.line} strokeWidth="11" strokeLinecap="round" />
              <path
                d="M10 60 A50 50 0 0 1 110 60"
                fill="none"
                stroke={C.amber}
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={`${arc * risk} ${arc}`}
              />
            </svg>
            <div style={{ fontSize: 48, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: risk > 0.6 ? C.amber : C.text }}>
              {Math.round(risk * 100)}%
            </div>
          </div>
        </div>
        <div style={{ borderRadius: 22, background: C.night, padding: '20px 22px' }}>
          <div style={{ fontSize: 18, color: C.soft }}>Purchase intent</div>
          <div style={{ fontSize: 48, fontWeight: 800, fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>{intent.toFixed(2)}</div>
          <div style={{ height: 10, borderRadius: 5, background: C.line, marginTop: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${intent * 100}%`, background: C.text, borderRadius: 5 }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  )
}

export function SignalList({ signals, appear, highlight }: { signals: StorySignal[]; appear: (s: StorySignal) => number; highlight?: string }) {
  const visible = signals.filter((sig) => appear(sig) > 0).slice(-6)
  return (
    <div>
      <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.18em', color: C.muted, marginBottom: 14 }}>LIVE SIGNALS</div>
      {visible.map((sig) => {
        const p = appear(sig)
        const hot = sig.id === highlight
        return (
          <div
            key={sig.id}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 18,
              fontSize: 23,
              padding: '9px 12px',
              margin: '0 -12px',
              borderRadius: 12,
              background: hot ? 'rgba(240,204,136,0.12)' : 'transparent',
              opacity: p,
              transform: `translateX(${(1 - p) * -24}px)`,
            }}
          >
            <span style={{ width: 52, fontFamily: mono, fontSize: 18, color: C.muted }}>{formatClock(sig.at)}</span>
            <span style={{ width: 170, color: C.soft }}>{sig.label}</span>
            <span style={{ fontWeight: 600, color: hot ? C.amber : sig.id === 'order' ? C.copper : sig.level === 'high' ? C.text : C.soft }}>{sig.value}</span>
          </div>
        )
      })}
    </div>
  )
}

export function DecisionCard({
  options,
  bars,
  chosen,
  ms,
}: {
  options: { action: string; score: number; chosen?: boolean }[]
  bars: number
  chosen: number
  ms: number
}) {
  return (
    <div style={{ borderRadius: 24, background: C.night, padding: '24px 26px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.18em', color: C.muted }}>NEXT BEST ACTION</span>
        <span style={{ fontFamily: mono, fontSize: 30, fontWeight: 700, color: C.text }}>{Math.round(ms)} ms</span>
      </div>
      {options.map((option, i) => {
        const isChosen = option.chosen && chosen > 0
        return (
          <div key={option.action} style={{ marginTop: i ? 18 : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, fontWeight: isChosen ? 700 : 500, color: isChosen ? C.text : C.soft }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {isChosen && <Check size={24} color={C.successSoft} style={{ opacity: chosen }} />}
                {option.action}
              </span>
              <span style={{ fontFamily: mono, fontSize: 21 }}>{(option.score * Math.min(1, bars * (1 + i * 0.2))).toFixed(2)}</span>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: C.line, marginTop: 8, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${option.score * 100 * Math.min(1, bars * (1 + i * 0.2))}%`,
                  background: isChosen ? C.text : C.muted,
                  borderRadius: 5,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Clock({ seconds, label = 'Session time', total, color = C.text }: { seconds: number; label?: string; total?: number; color?: string }) {
  return (
    <div style={{ fontFamily: font }}>
      <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '0.2em', color: C.muted, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 6 }}>
        <span style={{ fontSize: 132, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color }}>
          {formatClock(seconds)}
        </span>
        {total !== undefined && <span style={{ fontSize: 34, fontWeight: 600, color: C.muted }}>/ {formatClock(total)}</span>}
      </div>
    </div>
  )
}
