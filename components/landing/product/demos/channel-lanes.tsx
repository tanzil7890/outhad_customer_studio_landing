'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Ban, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STORY } from '@/lib/landing/story'

/**
 * Journey Orchestration demo: one shopper, four channels, two set-ups.
 * Separate tools fire on their own timers; one orchestration layer picks a
 * single action, suppresses the rest and cancels what goes stale.
 */

type Lane = 'On-site' | 'Email' | 'SMS' | 'Ads'
type Kind = 'win' | 'money' | 'sent' | 'conflict' | 'blocked' | 'suppressed' | 'cancelled' | 'spend' | 'end'
interface Ev {
  lane: Lane
  at: number
  /** Session or wall-clock time, for the list view. */
  time: string
  title: string
  note: string
  kind: Kind
  /** Label above (0) or below (1) the lane line, to keep neighbours apart. */
  row?: 0 | 1
}
type Mode = 'separate' | 'orchestrated'

const LANES: Lane[] = ['On-site', 'Email', 'SMS', 'Ads']
const TICKS = [
  { at: 0.03, label: '0:00' },
  { at: 0.22, label: '0:32' },
  { at: 0.42, label: '0:47' },
  { at: 0.6, label: '+1 h' },
  { at: 0.78, label: '+6 h' },
  { at: 0.95, label: '+24 h' },
]
const SESSION_END = 0.46
const usd = (n: number) => `$${n.toFixed(2)}`

const SCENES: Record<Mode, { events: Ev[]; stats: { label: string; value: string; tone?: 'bad' | 'good' | 'money' }[] }> = {
  separate: {
    events: [
      { lane: 'On-site', at: 0.05, time: '0:05', title: 'Newsletter popup', note: 'Fires on every first visit', kind: 'conflict', row: 0 },
      { lane: 'On-site', at: 0.22, time: '0:32', title: '“Wait! 15% off”', note: 'A second offer, from another tool', kind: 'conflict', row: 1 },
      { lane: 'On-site', at: 0.3, time: '0:41', title: 'Tab closed', note: `$${STORY.product.price} cart, still anonymous`, kind: 'end', row: 0 },
      { lane: 'Email', at: 0.6, time: '+1 h', title: 'Abandoned-cart email', note: 'No address on file', kind: 'blocked', row: 0 },
      { lane: 'Ads', at: 0.78, time: '+6 h', title: 'Retargeting campaign', note: 'Paying to bring her back', kind: 'spend', row: 0 },
      { lane: 'SMS', at: 0.95, time: '+24 h', title: 'Promo SMS', note: 'No number on file', kind: 'blocked', row: 0 },
    ],
    stats: [
      { label: 'Offers that collided', value: '2', tone: 'bad' },
      { label: 'Sends with no one to reach', value: '2', tone: 'bad' },
      { label: 'Paid re-acquisition', value: 'Yes', tone: 'bad' },
      { label: 'Outcome', value: '$0' },
    ],
  },
  orchestrated: {
    events: [
      { lane: 'On-site', at: 0.22, time: '0:32', title: '10% off, today only', note: `Chosen in ${STORY.timelines.with.decision!.latencyMs} ms. Popup suppressed.`, kind: 'win', row: 0 },
      { lane: 'On-site', at: 0.31, time: '0:38', title: 'Email captured', note: 'History stitched', kind: 'win', row: 1 },
      { lane: 'On-site', at: 0.42, time: '0:47', title: `Order · ${usd(STORY.captured)}`, note: 'Before she left', kind: 'money', row: 0 },
      { lane: 'SMS', at: 0.23, time: '0:33', title: 'Promo SMS', note: 'Suppressed: on-site offer active', kind: 'suppressed', row: 0 },
      { lane: 'Ads', at: 0.43, time: '0:47', title: 'Retargeting', note: 'Removed from audiences at 0:47', kind: 'suppressed', row: 0 },
      { lane: 'Email', at: 0.6, time: '+1 h', title: 'Abandoned-cart flow', note: 'Cancelled: she converted', kind: 'cancelled', row: 0 },
      { lane: 'Email', at: 0.82, time: '+6 h', title: 'Post-purchase welcome', note: 'Sent with her whole session', kind: 'sent', row: 1 },
    ],
    stats: [
      { label: 'Offers that collided', value: '0', tone: 'good' },
      { label: 'Sends with no one to reach', value: '0', tone: 'good' },
      { label: 'Paid re-acquisition', value: 'No', tone: 'good' },
      { label: 'Outcome', value: `+${usd(STORY.captured)}`, tone: 'money' },
    ],
  },
}

const DOT: Record<Kind, string> = {
  win: 'bg-night-text ring-4 ring-night-text/20',
  money: 'bg-night-copper ring-4 ring-night-copper/25',
  sent: 'bg-night-soft',
  conflict: 'bg-warning-soft ring-4 ring-warning-soft/20',
  spend: 'bg-warning-soft',
  blocked: 'bg-night border border-night-muted',
  suppressed: 'bg-night border border-dashed border-night-soft',
  cancelled: 'bg-night border border-night-muted',
  end: 'bg-night-muted',
}

function Marker({ kind }: { kind: Kind }) {
  return (
    <span className={cn('relative flex h-3.5 w-3.5 items-center justify-center rounded-full', DOT[kind])}>
      {(kind === 'blocked' || kind === 'cancelled') && <X className="h-2.5 w-2.5 text-night-muted" strokeWidth={3} />}
    </span>
  )
}

function Label({ ev }: { ev: Ev }) {
  const struck = ev.kind === 'blocked' || ev.kind === 'cancelled' || ev.kind === 'suppressed'
  return (
    <span
      className={cn(
        'block w-max max-w-[11.5rem] rounded-lg px-2.5 py-1.5 text-left',
        ev.kind === 'win' ? 'bg-night-text text-night' : 'bg-night-raised ring-1 ring-night-line',
      )}
    >
      <span
        className={cn(
          'block text-[12.5px] font-semibold leading-tight',
          ev.kind === 'money' && 'text-night-copper',
          (ev.kind === 'conflict' || ev.kind === 'spend') && 'text-warning-soft',
          struck && 'text-night-muted line-through decoration-night-muted',
          (ev.kind === 'sent' || ev.kind === 'end') && 'text-night-text',
        )}
      >
        {ev.title}
      </span>
      <span className={cn('mt-0.5 block text-[11.5px] leading-snug', ev.kind === 'win' ? 'text-night/70' : 'text-night-soft')}>{ev.note}</span>
    </span>
  )
}

export default function ChannelLanes() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduced = useReducedMotion()
  const [mode, setMode] = useState<Mode>('separate')
  const [progress, setProgress] = useState(0)
  const touched = useRef(false)

  // Sweep the playhead across the day whenever the scene changes (or comes into view).
  useEffect(() => {
    if (reduced) {
      setProgress(1)
      return
    }
    if (!inView) return
    setProgress(0)
    let raf = 0
    const start = performance.now()
    const run = (now: number) => {
      const p = Math.min(1, (now - start) / 5200)
      setProgress(p)
      if (p < 1) raf = requestAnimationFrame(run)
    }
    raf = requestAnimationFrame(run)
    return () => cancelAnimationFrame(raf)
  }, [mode, inView, reduced])

  // After the first run, show the orchestrated version unless the visitor already chose.
  useEffect(() => {
    if (progress < 1 || touched.current || mode !== 'separate' || reduced) return
    const id = window.setTimeout(() => !touched.current && setMode('orchestrated'), 2200)
    return () => window.clearTimeout(id)
  }, [progress, mode, reduced])

  const scene = SCENES[mode]
  const choose = (m: Mode) => {
    touched.current = true
    setMode(m)
  }

  return (
    <div ref={ref}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="radiogroup" aria-label="Choose the set-up" className="inline-flex self-start rounded-full bg-night p-1 ring-1 ring-night-line">
          {(
            [
              ['separate', 'Separate tools'],
              ['orchestrated', 'With Convertive'],
            ] as [Mode, string][]
          ).map(([value, label]) => {
            const active = value === mode
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => choose(value)}
                className={cn(
                  'relative h-10 min-h-0 min-w-0 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
                  active ? 'text-night' : 'text-night-soft hover:text-night-text',
                )}
              >
                {active && <motion.span layoutId="lanes-pill" className="absolute inset-0 rounded-full bg-night-text" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="relative">{label}</span>
              </button>
            )
          })}
        </div>
        <p className="text-[13px] text-night-soft">
          {mode === 'separate' ? 'Each tool fires on its own rules and timers.' : 'One layer decides, suppresses and cancels.'}
        </p>
      </div>

      {/* Lanes (tablet and up) */}
      <div aria-hidden className="mt-8 hidden md:block">
        <div className="relative ml-24">
          {/* Live-session band and playhead */}
          <div className="absolute inset-y-0 left-0 rounded-xl bg-night-text/[0.04]" style={{ width: `${SESSION_END * 100}%` }} />
          <span className="absolute -top-6 left-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-night-muted">Live session</span>
          <div className="absolute inset-y-0 w-px bg-night-text/70" style={{ left: `${progress * 100}%` }} />
          {LANES.map((lane) => (
            <div key={lane} className="relative h-[6.5rem] border-b border-night-line last:border-0">
              <span className="absolute -left-24 top-1/2 w-20 -translate-y-1/2 text-[13px] font-semibold text-night-soft">{lane}</span>
              <span className="absolute inset-x-0 top-1/2 h-px bg-night-line" />
              {scene.events
                .filter((ev) => ev.lane === lane)
                .map((ev) => {
                  const shown = progress >= ev.at
                  return (
                    <div
                      key={`${mode}-${ev.title}`}
                      className={cn('absolute top-1/2 transition-[opacity,transform] duration-500 motion-reduce:transition-none', shown ? 'opacity-100' : 'opacity-0')}
                      style={{ left: `${ev.at * 100}%` }}
                    >
                      <span className="absolute -translate-x-1/2 -translate-y-1/2">
                        <Marker kind={ev.kind} />
                      </span>
                      <span
                        className={cn(
                          'absolute',
                          ev.at > 0.8 ? 'right-2' : 'left-2',
                          ev.row === 1 ? 'top-2' : 'bottom-2',
                          shown ? 'translate-y-0' : ev.row === 1 ? '-translate-y-1' : 'translate-y-1',
                        )}
                      >
                        <Label ev={ev} />
                      </span>
                    </div>
                  )
                })}
            </div>
          ))}
          <div className="relative mt-3 h-5">
            {TICKS.map((tick) => (
              <span key={tick.label} className="absolute -translate-x-1/2 font-mono text-[11.5px] text-night-muted" style={{ left: `${tick.at * 100}%` }}>
                {tick.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* The same story as a list (phones and screen readers) */}
      <ol className="mt-6 space-y-2.5 md:sr-only">
        {[...scene.events]
          .sort((a, b) => a.at - b.at)
          .map((ev) => (
            <li key={`${mode}-${ev.title}`} className="flex gap-3 rounded-xl bg-night p-3 ring-1 ring-night-line">
              <span className="mt-1">
                <Marker kind={ev.kind} />
              </span>
              <span>
                <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-night-muted">
                  {ev.lane} · {ev.time}
                </span>
                <span className="mt-0.5 block text-[14px] font-semibold text-night-text">{ev.title}</span>
                <span className="block text-[13px] text-night-soft">{ev.note}</span>
              </span>
            </li>
          ))}
      </ol>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-night-line lg:grid-cols-4">
        {scene.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-1 bg-night p-5">
            <dt className="text-[13px] text-night-soft">{stat.label}</dt>
            <dd
              className={cn(
                'flex items-center gap-2 text-3xl font-semibold tracking-tight',
                stat.tone === 'bad' && 'text-warning-soft',
                stat.tone === 'good' && 'text-success-soft',
                stat.tone === 'money' && 'text-night-copper',
                !stat.tone && 'text-night-muted',
              )}
            >
              {stat.tone === 'good' && <Check aria-hidden className="h-6 w-6" />}
              {stat.tone === 'bad' && <Ban aria-hidden className="h-5 w-5" />}
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
