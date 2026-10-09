'use client'

import { useRef } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useTransform } from 'framer-motion'
import { ArrowRight, Check, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STORY } from '@/lib/landing/story'
import { useSessionTimeline, type SessionTimeline } from '@/lib/landing/use-session-timeline'
import StoryTranscript from '../../shared/story-transcript'

const timeline = STORY.timelines.with
const EASE = [0.22, 1, 0.36, 1] as const
const usd = (n: number) => `$${n.toFixed(2)}`

/** The raw events behind each story signal, as the pipeline would receive them. */
const RAW: Record<string, { name: string; props: string }> = {
  source: { name: 'session_start', props: 'source: "instagram_ad"' },
  device: { name: 'device', props: 'ua: "iPhone · Safari"' },
  category: { name: 'view_collection', props: 'handle: "hiking-boots"' },
  cart: { name: 'add_to_cart', props: `sku: "ridgeline-walnut-8", value: ${STORY.product.price}` },
  size: { name: 'open_size_guide', props: 'size: "8"' },
  shipping: { name: 'view_shipping', props: 'count: 2' },
  exit: { name: 'exit_intent', props: 'target: "tab_bar"' },
  decision: { name: 'decision', props: `action: "10_off_today", ms: ${timeline.decision!.latencyMs}` },
  identity: { name: 'identify', props: 'email: "s•••@gmail.com"' },
  order: { name: 'order', props: `total: ${STORY.captured.toFixed(2)}` },
}

function Field({ label, value, live = false }: { label: string; value: React.ReactNode; live?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-night-line py-2.5 text-[14px] last:border-0">
      <dt className="text-night-muted">{label}</dt>
      <dd className={cn('text-right font-medium', live ? 'text-night-text' : 'text-night-soft')}>{value}</dd>
    </div>
  )
}

function Controls({ tl }: { tl: SessionTimeline }) {
  const inputRef = useRef<HTMLInputElement>(null)
  useMotionValueEvent(tl.cursor, 'change', (v) => {
    if (inputRef.current) inputRef.current.value = String(Math.round(v * 1000))
  })
  useMotionValueEvent(tl.clock, 'change', (clock) => inputRef.current?.setAttribute('aria-valuetext', clock))
  return (
    <div className="mt-6 flex items-center gap-4 border-t border-night-line pt-5">
      <button
        type="button"
        onClick={tl.toggle}
        aria-label={tl.playing ? 'Pause the session' : 'Play the session'}
        className="flex h-11 w-11 min-h-0 min-w-0 shrink-0 items-center justify-center rounded-full bg-night-text text-night transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text focus-visible:ring-offset-2 focus-visible:ring-offset-night"
      >
        {tl.playing ? <Pause className="h-4 w-4 fill-current" aria-hidden /> : <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden />}
      </button>
      <div className="relative h-11 flex-1 rounded-full has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-night-text">
        <div aria-hidden className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-night-line">
          <motion.div className="h-full origin-left bg-night-text" style={{ scaleX: tl.cursor }} />
        </div>
        {tl.beatStops.map((stop, i) => (
          <span key={i} aria-hidden className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-night-soft/40" style={{ left: `${stop * 100}%` }} />
        ))}
        <input
          ref={inputRef}
          type="range"
          min={0}
          max={1000}
          step={1}
          defaultValue={Math.round(tl.cursor.get() * 1000)}
          onChange={(e) => tl.seek(Number(e.currentTarget.value) / 1000)}
          aria-label="Session timeline"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
      <motion.span className="w-12 shrink-0 text-right font-mono text-sm tabular-nums text-night-soft">{tl.clock}</motion.span>
    </div>
  )
}

/** Data Platform demo: raw events stream in on the left and fill a live profile on the right. */
export default function ProfileBuilder() {
  const stageRef = useRef<HTMLDivElement>(null)
  const tl = useSessionTimeline({
    timeline,
    driver: { type: 'clock', inViewRef: stageRef, beatSeconds: 2.8, endHoldSeconds: 5 },
  })
  const seen = new Set(tl.visibleSignals.map((s) => s.id))
  const known = seen.has('identity')
  const ordered = seen.has('order')
  const intent = useTransform(tl.intent, (v) => v.toFixed(2))
  const risk = useTransform(tl.exitRisk, (v) => `${Math.round(v * 100)}%`)
  const audiences = [
    seen.has('cart') && 'High intent',
    seen.has('shipping') && 'Price-sensitive',
    seen.has('exit') && !known && 'About to leave',
    known && 'Known customer',
  ].filter(Boolean) as string[]
  const events = [...tl.visibleSignals].reverse()

  return (
    <div ref={stageRef}>
      <StoryTranscript timeline={timeline} title="The session behind this profile" />
      <div aria-hidden className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
        {/* Raw events */}
        <div className="flex min-h-[23rem] flex-col rounded-2xl bg-night p-5 ring-1 ring-night-line">
          <p className="mb-4 flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">
            Event stream
            <span className="font-mono normal-case tracking-normal">{tl.visibleSignals.length} events</span>
          </p>
          <ol className="space-y-2 overflow-hidden font-mono text-[12.5px] leading-snug">
            <AnimatePresence initial={false}>
              {events.slice(0, 8).map((signal, i) => {
                const raw = RAW[signal.id]
                return (
                  <motion.li
                    key={signal.id}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: i === 0 ? 1 : 0.62, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="rounded-lg bg-night-raised/70 px-3 py-2"
                  >
                    <span className="text-night-muted">{`{ `}</span>
                    <span className="text-night-text">&quot;{raw?.name ?? signal.id}&quot;</span>
                    <span className="text-night-muted">, </span>
                    <span className="text-night-soft">{raw?.props}</span>
                    <span className="text-night-muted">{` }`}</span>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ol>
        </div>

        {/* Pipeline */}
        <div className="flex items-center justify-center lg:flex-col">
          <div className="flex items-center gap-2 rounded-full bg-night px-4 py-2 text-[12px] text-night-soft ring-1 ring-night-line lg:flex-col lg:px-2 lg:py-4">
            <span className="relative block h-1.5 w-16 overflow-hidden rounded-full bg-night-line lg:h-16 lg:w-1.5">
              <span
                className={cn(
                  'absolute h-full w-1/3 rounded-full bg-night-text/80 lg:h-1/3 lg:w-full',
                  tl.playing ? 'animate-[pipe-x_1.1s_linear_infinite] lg:animate-[pipe-y_1.1s_linear_infinite]' : 'left-1/3 lg:top-1/3',
                  'motion-reduce:animate-none',
                )}
              />
            </span>
            <span className="whitespace-nowrap font-mono">&lt; 1 s</span>
            <ArrowRight className="h-4 w-4 text-night-muted lg:rotate-90" />
          </div>
        </div>

        {/* Live profile */}
        <div className="flex min-h-[23rem] flex-col rounded-2xl bg-night p-5 ring-1 ring-night-line">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Live profile</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={known ? 'known' : 'anon'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[12.5px]',
                  known ? 'bg-success/30 text-success-soft' : 'bg-night-raised text-night-soft',
                )}
              >
                {known && <Check className="h-3.5 w-3.5" />}
                {known ? 's•••@gmail.com' : 'anon_7f3d'}
              </motion.span>
            </AnimatePresence>
          </div>
          <dl>
            <Field label="Status" value={known ? 'Known customer' : 'Anonymous'} live={known} />
            <Field label="Source" value={seen.has('source') ? 'Instagram ad' : '—'} live={seen.has('source')} />
            <Field label="Device" value={seen.has('device') ? 'iPhone · Safari' : '—'} live={seen.has('device')} />
            <Field label="Interested in" value={seen.has('category') ? 'Hiking boots' : '—'} live={seen.has('category')} />
            <Field
              label="Cart"
              value={ordered ? <span className="text-night-copper">Ordered {usd(STORY.captured)}</span> : seen.has('cart') ? usd(STORY.product.price) : '—'}
              live={seen.has('cart')}
            />
            <Field label="Purchase intent" value={<motion.span className="tabular-nums">{intent}</motion.span>} live />
            <Field label="Exit risk" value={<motion.span className="tabular-nums text-warning-soft">{risk}</motion.span>} live />
          </dl>
          <div className="mt-4 flex min-h-[1.75rem] flex-wrap gap-1.5">
            <AnimatePresence initial={false}>
              {audiences.map((a) => (
                <motion.span
                  key={a}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="rounded-full bg-night-raised px-2.5 py-1 text-[12px] font-medium text-night-text ring-1 ring-night-line"
                >
                  {a}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
          <p className={cn('mt-auto pt-4 text-[13px] leading-snug transition-colors', known ? 'text-success-soft' : 'text-night-muted')}>
            {known ? 'Anonymous history stitched: 6 page views, the cart and the source. Synced to your ESP.' : 'No name yet. Every event still lands on this profile.'}
          </p>
        </div>
      </div>
      <Controls tl={tl} />
    </div>
  )
}
