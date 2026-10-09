'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import {
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { beatIndexAt, buildPacing, formatClock, totalWeight, type Timeline } from './story'

export type TimelineDriver =
  | {
      type: 'clock'
      /** Element whose visibility gates playback (no rAF work while offscreen). */
      inViewRef: RefObject<Element | null>
      autoplay?: boolean
      loop?: boolean
      /** Real seconds of playback per beat (scaled by beat weight). */
      beatSeconds?: number
      /** Seconds to hold the final state before looping. */
      endHoldSeconds?: number
    }
  | {
      type: 'scroll'
      /** 0..1 progress, e.g. from framer-motion useScroll().scrollYProgress. */
      progress: MotionValue<number>
    }

interface Options {
  timeline: Timeline
  driver: TimelineDriver
  /** Story second to start from (used when switching between with/without). */
  initialTime?: number
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

function cursorForTime(stops: number[], times: number[], t: number): number {
  for (let i = 0; i < times.length - 1; i++) {
    const [t0, t1] = [times[i], times[i + 1]]
    if (t >= t0 && t <= t1) {
      if (t1 === t0) return stops[i]
      return stops[i] + ((t - t0) / (t1 - t0)) * (stops[i + 1] - stops[i])
    }
  }
  return t <= times[0] ? 0 : 1
}

function countSignals(timeline: Timeline, t: number) {
  let count = 0
  for (const signal of timeline.signals) if (signal.at <= t + 1e-6) count++
  return count
}

export function useSessionTimeline({ timeline, driver, initialTime = 0 }: Options) {
  const reducedMotion = useReducedMotion() ?? false
  const { stops, times, beatStops } = useMemo(() => buildPacing(timeline), [timeline])

  // Playback position 0..1. All per-frame values derive from it as MotionValues,
  // so playback never re-renders React; only beat/signal boundaries do.
  const cursor = useMotionValue(cursorForTime(stops, times, initialTime))
  const time = useTransform(cursor, stops, times)
  const clock = useTransform(time, (t) => formatClock(t))
  const exitRisk = useTransform(time, timeline.tracks.exitRisk.at, timeline.tracks.exitRisk.value)
  const intent = useTransform(time, timeline.tracks.intent.at, timeline.tracks.intent.value)

  const [index, setIndex] = useState(() => beatIndexAt(timeline.beats, time.get()))
  const [signalCount, setSignalCount] = useState(() => countSignals(timeline, time.get()))
  useMotionValueEvent(time, 'change', (t) => {
    setIndex(beatIndexAt(timeline.beats, t))
    setSignalCount(countSignals(timeline, t))
  })

  // ── Clock driver ──────────────────────────────────────────────────────────
  const isClock = driver.type === 'clock'
  const autoplay = isClock ? (driver.autoplay ?? true) : false
  const loop = isClock ? (driver.loop ?? true) : false
  const beatSeconds = isClock ? (driver.beatSeconds ?? 3) : 3
  const endHoldSeconds = isClock ? (driver.endHoldSeconds ?? 4) : 0

  const [playing, setPlaying] = useState(autoplay)
  const fallbackRef = useRef<Element | null>(null)
  const inView = useInView(isClock ? driver.inViewRef : fallbackRef, { amount: 0.25 })
  const [pageVisible, setPageVisible] = useState(true)

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden)
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (!isClock || !playing || !inView || !pageVisible) return
    const cycleSeconds = totalWeight(timeline) * beatSeconds
    let raf = 0
    let last = performance.now()
    let held = 0
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      const current = cursor.get()
      if (current >= 1) {
        held += dt
        if (held >= endHoldSeconds) {
          if (!loop) {
            setPlaying(false)
            return
          }
          held = 0
          cursor.set(0)
        }
      } else {
        cursor.set(Math.min(1, current + dt / cycleSeconds))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isClock, playing, inView, pageVisible, timeline, beatSeconds, endHoldSeconds, loop, cursor])

  // ── Scroll driver ─────────────────────────────────────────────────────────
  const idleProgress = useMotionValue(0)
  const progress = driver.type === 'scroll' ? driver.progress : idleProgress
  useMotionValueEvent(progress, 'change', (value) => {
    if (driver.type === 'scroll' && !reducedMotion) cursor.set(clamp01(value))
  })
  useEffect(() => {
    if (driver.type === 'scroll' && !reducedMotion) cursor.set(clamp01(progress.get()))
  }, [driver.type, progress, reducedMotion, cursor])

  // ── Reduced motion: no autoplay; show the finished story as a storyboard ──
  useEffect(() => {
    if (!reducedMotion) return
    setPlaying(false)
    cursor.set(1)
  }, [reducedMotion, cursor])

  // ── Controls ──────────────────────────────────────────────────────────────
  const play = useCallback(() => {
    if (cursor.get() >= 1) cursor.set(0)
    setPlaying(true)
  }, [cursor])
  const pause = useCallback(() => setPlaying(false), [])
  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play])
  const seek = useCallback(
    (value: number) => {
      setPlaying(false)
      cursor.set(clamp01(value))
    },
    [cursor],
  )
  const seekToBeat = useCallback(
    (beatIndex: number) => seek((beatStops[beatIndex] ?? 0) + 1e-4),
    [beatStops, seek],
  )

  return {
    timeline,
    cursor,
    time,
    clock,
    exitRisk,
    intent,
    index,
    beat: timeline.beats[index],
    visibleSignals: timeline.signals.slice(0, signalCount),
    beatStops,
    playing,
    play,
    pause,
    toggle,
    seek,
    seekToBeat,
    reducedMotion,
  }
}

export type SessionTimeline = ReturnType<typeof useSessionTimeline>
