'use client'

import { useRef } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SESSION } from '@/lib/landing/content'
import { STORY, formatClock } from '@/lib/landing/story'
import { useSessionTimeline } from '@/lib/landing/use-session-timeline'
import CountUp from '../shared/count-up'
import PhoneFrame from '../shared/phone-frame'
import StoreMock from '../shared/store-mock'
import StoryTranscript from '../shared/story-transcript'
import { container } from '../shared/layout'

const withTimeline = STORY.timelines.with
const withoutTimeline = STORY.timelines.without
const closed = withoutTimeline.beats[withoutTimeline.beats.length - 1]
const EASE = [0.22, 1, 0.36, 1] as const

/** The 47 seconds: pinned and scroll-driven on desktop, stacked on mobile or with reduced motion. */
export default function StoryChapters() {
  return (
    <div id="session" className="scroll-mt-0">
      <StoryTranscript timeline={withTimeline} title="Session with Convertive" />
      <div aria-hidden className="hidden motion-safe:md:block">
        <PinnedChapters />
      </div>
      <div aria-hidden className="block motion-safe:md:hidden">
        <StackedChapters />
      </div>
      <WithoutCoda />
    </div>
  )
}

function PinnedChapters() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const tl = useSessionTimeline({ timeline: withTimeline, driver: { type: 'scroll', progress: scrollYProgress } })
  const risk = useTransform(tl.exitRisk, (v) => `${Math.round(v * 100)}%`)
  const intent = useTransform(tl.intent, (v) => v.toFixed(2))
  const last = withTimeline.beats.length - 1

  return (
    <div ref={ref} className="relative" style={{ height: `${withTimeline.beats.length * 80}svh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className={cn(container, 'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-16 pt-20')}>
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-night-muted">{SESSION.eyebrow}</p>
            <p className="mt-2 flex items-baseline gap-4 tabular-nums">
              <motion.span className="text-[8rem] font-semibold leading-none tracking-[-0.05em] text-night-text lg:text-[11rem]">
                {tl.clock}
              </motion.span>
              <span className="text-2xl font-medium text-night-muted">/ {formatClock(withTimeline.duration)}</span>
            </p>
            <div className="mt-6 min-h-[12rem] max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tl.beat.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <h3 className="text-3xl font-semibold leading-tight text-night-text lg:text-4xl">{tl.beat.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-night-soft">{tl.beat.shopper}</p>
                  <p className="mt-5 border-l-2 border-night-line pl-4 text-base leading-relaxed text-night-soft">
                    <span className="font-semibold text-night-text">Convertive: </span>
                    {tl.beat.engine}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex items-center gap-8">
              <p className="text-sm text-night-muted">
                Exit risk <motion.span className="ml-2 text-2xl font-bold tabular-nums text-warning-soft">{risk}</motion.span>
              </p>
              <p className="text-sm text-night-muted">
                Intent <motion.span className="ml-2 text-2xl font-bold tabular-nums text-night-text">{intent}</motion.span>
              </p>
            </div>
            <ol className="mt-8 flex max-w-xl gap-1.5">
              {withTimeline.beats.map((beat, i) => (
                <li
                  key={beat.id}
                  className={cn('h-1 flex-1 rounded-full transition-colors duration-300', i <= tl.index ? 'bg-night-text' : 'bg-night-line')}
                />
              ))}
            </ol>
          </div>
          <div className="relative w-[270px] lg:w-[300px]">
            <PhoneFrame className="ring-night-text/15">
              <StoreMock screen={tl.beat.screen} />
            </PhoneFrame>
            <AnimatePresence>
              {tl.index === last && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute bottom-24 right-full mr-8 whitespace-nowrap rounded-2xl bg-night-raised px-6 py-4 shadow-2xl ring-1 ring-night-line"
                >
                  <p className="text-[13px] text-night-soft">Captured this session</p>
                  <CountUp
                    value={withTimeline.outcome.revenue}
                    format={(n) => `+$${n.toFixed(2)}`}
                    className="text-4xl font-extrabold tracking-tight text-night-copper"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

const PHONE_BEATS = new Set(['land', 'offer', 'order'])

function StackedChapters() {
  return (
    <div className="py-10">
      <div className={container}>
        <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-night-muted">{SESSION.eyebrow}</p>
        <p className="mt-3 text-3xl font-semibold leading-tight text-night-text">{SESSION.lines.join(' ')}</p>
      </div>
    <ol className={cn(container, 'mt-12 space-y-16')}>
      {withTimeline.beats.map((beat) => (
        <li key={beat.id} className="border-t border-night-line pt-8">
          <p className="text-6xl font-semibold tabular-nums tracking-tight text-night-text">{formatClock(beat.at)}</p>
          <h3 className="mt-4 text-2xl font-semibold text-night-text">{beat.title}</h3>
          <p className="mt-2 text-lg leading-relaxed text-night-soft">{beat.shopper}</p>
          <p className="mt-4 border-l-2 border-night-line pl-4 text-base leading-relaxed text-night-soft">
            <span className="font-semibold text-night-text">Convertive: </span>
            {beat.engine}
          </p>
          {PHONE_BEATS.has(beat.id) && (
            <div className="mx-auto mt-8 w-[220px]">
              <PhoneFrame className="ring-night-text/15">
                <StoreMock screen={beat.screen} />
              </PhoneFrame>
            </div>
          )}
          {beat.id === 'order' && (
            <p className="mt-8 text-center text-5xl font-extrabold tracking-tight text-night-copper">
              +${withTimeline.outcome.revenue.toFixed(2)}
            </p>
          )}
        </li>
      ))}
    </ol>
    </div>
  )
}

function WithoutCoda() {
  return (
    <div className={cn(container, 'py-24 text-center sm:py-32')}>
      <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-night-muted">The same session, without Convertive</p>
      <p className="mt-6 text-5xl font-semibold tracking-tight text-night-soft sm:text-7xl">
        {formatClock(closed.at)} · {closed.title}.
      </p>
      <p className="mt-6 text-[7rem] font-extrabold leading-none tracking-tighter text-night-muted sm:text-[10rem]">$0</p>
      <p className="mx-auto mt-6 max-w-xl text-lg text-night-soft">{withoutTimeline.outcome.summary}</p>
      <p className="mt-10 text-[13px] text-night-muted">{SESSION.disclaimer}</p>
    </div>
  )
}
