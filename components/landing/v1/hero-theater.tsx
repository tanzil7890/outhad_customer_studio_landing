'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useTransform } from 'framer-motion'
import { Check, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SESSION } from '@/lib/landing/content'
import { STORY, formatClock } from '@/lib/landing/story'
import { useSessionTimeline, type SessionTimeline } from '@/lib/landing/use-session-timeline'
import PhoneFrame from '../shared/phone-frame'
import StoreMock from '../shared/store-mock'
import StoryTranscript from '../shared/story-transcript'
import BrainPanel from './brain-panel'

type Mode = 'with' | 'without'

/** Interactive 47-second session: shopper view, Convertive's view, and playback controls. */
export default function HeroTheater() {
  const [mode, setMode] = useState<Mode>('with')
  const [startAt, setStartAt] = useState(0)
  const lastTime = useRef(0)

  const switchMode = (next: Mode) => {
    if (next === mode) return
    setStartAt(Math.min(lastTime.current, STORY.divergeAt))
    setMode(next)
  }

  return (
    <TheaterStage
      key={mode}
      mode={mode}
      initialTime={startAt}
      onTime={(t) => (lastTime.current = t)}
      onModeChange={switchMode}
    />
  )
}

function TheaterStage({
  mode,
  initialTime,
  onTime,
  onModeChange,
}: {
  mode: Mode
  initialTime: number
  onTime: (t: number) => void
  onModeChange: (mode: Mode) => void
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const tl = useSessionTimeline({
    timeline: STORY.timelines[mode],
    driver: { type: 'clock', inViewRef: stageRef, beatSeconds: 3.4, endHoldSeconds: 5 },
    initialTime,
  })
  useMotionValueEvent(tl.time, 'change', onTime)

  return (
    <div
      ref={stageRef}
      id="session"
      className="scroll-mt-28 rounded-[2rem] bg-surface-base p-4 shadow-[0_40px_100px_-50px_rgba(26,20,16,0.35)] ring-1 ring-line sm:p-6 lg:p-8"
    >
      <StoryTranscript
        timeline={tl.timeline}
        title={mode === 'with' ? 'Session with Convertive' : 'The same session without Convertive'}
      />

      <div className="flex flex-col items-center justify-between gap-4 border-b border-line pb-5 sm:flex-row">
        <ModeToggle mode={mode} onChange={onModeChange} />
        <p className="text-center text-[13px] text-ink-muted sm:text-right">{SESSION.disclaimer}</p>
      </div>

      <div className="grid gap-6 pt-6 lg:grid-cols-[minmax(0,1fr)_280px_minmax(0,1.1fr)] lg:gap-8 lg:pt-8">
        <Narrative tl={tl} />
        <div aria-hidden className="mx-auto w-[230px] sm:w-[260px] lg:w-[280px]">
          <PhoneFrame>
            <StoreMock screen={tl.beat.screen} />
          </PhoneFrame>
        </div>
        <div aria-hidden className="lg:min-h-[34rem]">
          <BrainPanel tl={tl} />
        </div>
      </div>

      <Controls tl={tl} />
    </div>
  )
}

function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) {
  const options: { value: Mode; label: string }[] = [
    { value: 'with', label: 'With Convertive' },
    { value: 'without', label: 'Without' },
  ]
  return (
    <div role="radiogroup" aria-label="Show the session" className="inline-flex rounded-full bg-surface-sunken p-1">
      {options.map((option) => {
        const active = option.value === mode
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative h-10 min-h-0 min-w-0 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
              active ? 'text-night-text' : 'text-ink-secondary hover:text-ink',
            )}
          >
            {active && (
              <motion.span
                layoutId="mode-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function Narrative({ tl }: { tl: SessionTimeline }) {
  const { timeline, index, beat } = tl
  return (
    <div className="flex flex-col">
      <p className="flex items-baseline gap-2 tabular-nums">
        <motion.span className="text-5xl font-semibold tracking-tight text-ink sm:text-6xl">{tl.clock}</motion.span>
        <span className="text-lg font-medium text-ink-muted">/ {formatClock(timeline.duration)}</span>
      </p>
      <div aria-live="off" className="mt-4 min-h-[8.5rem]">
        <motion.h3
          key={`${timeline.mode}-${beat.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-semibold leading-tight text-ink"
        >
          {beat.title}
        </motion.h3>
        <motion.p
          key={`${timeline.mode}-${beat.id}-shopper`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 text-base leading-relaxed text-ink-secondary"
        >
          {beat.shopper}
        </motion.p>
      </div>

      <ol className="mt-6 hidden space-y-1 border-l border-line lg:block" aria-label="Jump to a moment">
        {timeline.beats.map((b, i) => {
          const state = i < index ? 'past' : i === index ? 'current' : 'future'
          return (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => tl.seekToBeat(i)}
                aria-current={state === 'current' ? 'step' : undefined}
                className={cn(
                  '-ml-px flex w-full min-h-0 min-w-0 items-baseline gap-3 border-l-2 py-1.5 pl-4 text-left text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
                  state === 'current' ? 'border-ink font-semibold text-ink' : 'border-transparent hover:text-ink',
                  state === 'past' ? 'text-ink-secondary' : state === 'future' ? 'text-ink-muted' : '',
                )}
              >
                <span className="w-9 shrink-0 text-[13px] tabular-nums">{formatClock(b.at)}</span>
                <span className="flex-1">{b.title}</span>
                {state === 'past' && <Check aria-hidden className="h-3.5 w-3.5 shrink-0 text-ink-muted" />}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Controls({ tl }: { tl: SessionTimeline }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const thumbLeft = useTransform(tl.cursor, (v) => `${v * 100}%`)

  useMotionValueEvent(tl.cursor, 'change', (v) => {
    if (inputRef.current) inputRef.current.value = String(Math.round(v * 1000))
  })
  // Derived values settle on the next frame, so read the clock from its own event.
  useMotionValueEvent(tl.clock, 'change', (clock) => {
    inputRef.current?.setAttribute('aria-valuetext', clock)
  })

  return (
    <div className="mt-6 flex items-center gap-4 border-t border-line pt-5">
      <button
        type="button"
        onClick={tl.toggle}
        aria-label={tl.playing ? 'Pause session' : 'Play session'}
        className="flex h-11 w-11 min-h-0 min-w-0 shrink-0 items-center justify-center rounded-full bg-ink text-night-text transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
      >
        {tl.playing ? <Pause className="h-4 w-4 fill-current" aria-hidden /> : <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden />}
      </button>
      <div className="relative h-11 flex-1 rounded-full has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ink">
        <div aria-hidden className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-surface-sunken">
          <motion.div className="h-full origin-left bg-ink" style={{ scaleX: tl.cursor }} />
        </div>
        {tl.beatStops.map((stop, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-line-strong"
            style={{ left: `${stop * 100}%` }}
          />
        ))}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink ring-4 ring-white"
          style={{ left: thumbLeft }}
        />
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
      <motion.span className="w-12 shrink-0 text-right text-sm font-medium tabular-nums text-ink-secondary">{tl.clock}</motion.span>
    </div>
  )
}
