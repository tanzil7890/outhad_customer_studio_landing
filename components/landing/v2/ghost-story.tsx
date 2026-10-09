'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GHOSTS, SESSION } from '@/lib/landing/content'
import { DECISION_PIPELINE, STORY, formatClock, type Track } from '@/lib/landing/story'
import StoryTranscript from '../shared/story-transcript'
import { container } from '../shared/layout'
import DesktopStore, { STORE_H, STORE_W, type StoreState } from './desktop-store'

/**
 * Sarah's session as one continuous take, directed by scroll: follow her ghost
 * through the store as signals pin to the page, stop the clock at 0:32 and
 * scrub through the 41 ms decision, watch the ghost get a name, then the order.
 * The film's narration is the caption track. Reduced motion gets a storyboard.
 */

const timeline = STORY.timelines.with
const decision = timeline.decision!
const LATENCY = decision.latencyMs
const EASE = [0.22, 1, 0.36, 1] as const
const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const lerp = (a: number, b: number, u: number) => a + (b - a) * clamp01(u)
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))
const EMAIL = 'sarah.k@gmail.com'

// Window-local cursor path, keyed by story second (see desktop-store.tsx for the layout).
const PATH: [number, number, number][] = [
  [0, 700, 720],
  [3, 184, 430],
  [6, 461, 430],
  [8.5, 184, 430],
  [10.5, 184, 430],
  [12.5, 330, 420],
  [14, 766, 414],
  [15, 900, 520],
  [18, 1000, 227],
  [21, 700, 464],
  [24, 1010, 359],
  [25.5, 1100, 227],
  [27, 1010, 359],
  [29, 760, 240],
  [32, 330, 32],
  [33, 520, 300],
  [34.5, 600, 412],
  [37, 606, 414],
  [38, 600, 476],
  [40, 620, 560],
  [47, 640, 560],
]

const PINS: { at: number; text: string; dx: number; dy: number; warn?: boolean }[] = [
  { at: 0.4, text: 'via Instagram ad', dx: 24, dy: -56 },
  { at: 4.5, text: 'Hiking boots', dx: -60, dy: 64 },
  { at: 7.2, text: 'Compared 2 styles', dx: 20, dy: 70 },
  { at: 15.3, text: `$${STORY.product.price} in cart`, dx: -200, dy: -40 },
  { at: 21.3, text: 'Opened the size guide', dx: -260, dy: 40 },
  { at: 27.2, text: 'Checked shipping twice', dx: -300, dy: 70, warn: true },
  { at: 31, text: 'Exit intent', dx: 30, dy: 50, warn: true },
]

function catmull(p0: number, p1: number, p2: number, p3: number, u: number) {
  const u2 = u * u
  const u3 = u2 * u
  return 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3)
}

function cursorAt(s: number): [number, number] {
  if (s <= PATH[0][0]) return [PATH[0][1], PATH[0][2]]
  for (let i = 0; i < PATH.length - 1; i++) {
    if (s <= PATH[i + 1][0]) {
      const u = (s - PATH[i][0]) / (PATH[i + 1][0] - PATH[i][0])
      const a = PATH[Math.max(0, i - 1)]
      const b = PATH[i]
      const c = PATH[i + 1]
      const d = PATH[Math.min(PATH.length - 1, i + 2)]
      return [catmull(a[1], b[1], c[1], d[1], u), catmull(a[2], b[2], c[2], d[2], u)]
    }
  }
  const last = PATH[PATH.length - 1]
  return [last[1], last[2]]
}

function lookup(track: Track, s: number) {
  const { at, value } = track
  if (s <= at[0]) return value[0]
  for (let i = 0; i < at.length - 1; i++) {
    if (s <= at[i + 1]) return lerp(value[i], value[i + 1], (s - at[i]) / (at[i + 1] - at[i]))
  }
  return value[value.length - 1]
}

const screenAt = (s: number): StoreState['screen'] => (s < 12 ? 'collection' : s < 40 ? 'product' : 'confirmed')

type Caption = keyof typeof GHOSTS.story

interface Frame {
  p: number
  s: number
  caption: Caption
  /** 0..1 desaturation of the store while the clock is stopped. */
  frozen: number
  ms: number
  branch: number
  decided: boolean
  named: boolean
  money: number
  store: StoreState
}

function frameAt(p: number): Frame {
  let s: number
  if (p < 0.44) s = lerp(0, 31, p / 0.44)
  else if (p < 0.5) s = lerp(31, 32, range(p, 0.44, 0.49))
  else if (p < 0.72) s = 32
  else if (p < 0.87) s = lerp(32, 38, range(p, 0.73, 0.84))
  else s = lerp(38, 47, range(p, 0.88, 0.95))

  const ms = p < 0.5 ? 0 : p < 0.72 ? LATENCY * range(p, 0.51, 0.7) : LATENCY
  const frozen = p < 0.5 ? 0 : p < 0.72 ? range(p, 0.5, 0.512) : 1 - range(p, 0.72, 0.74)
  const caption: Caption = p < 0.08 ? 'follow' : p < 0.44 ? 'read' : p < 0.5 ? 'leave' : p < 0.72 ? 'freeze' : p < 0.87 ? 'name' : 'order'
  const screen = screenAt(s)
  const typed = Math.round(EMAIL.length * clamp01((s - 34.5) / 2.5))

  return {
    p,
    s,
    caption,
    frozen,
    ms,
    branch: clamp01((ms - 19) / 14),
    decided: ms >= 33,
    named: s >= 37.5,
    money: range(p, 0.9, 0.96),
    store: {
      screen,
      hoverTile: s >= 2.5 && s < 5 ? 0 : s >= 5 && s < 7.5 ? 1 : s >= 7.5 && s < 12 ? 0 : -1,
      sizePicked: s >= 14,
      inCart: s >= 15,
      drawer: screen === 'product' ? clamp01((s - 15.1) / 0.8) : 0,
      shippingWarn: (s >= 23.5 && s < 25) || (s >= 26.5 && s < 29.5),
      closeHot: p >= 0.72 ? 0 : clamp01((s - 30) / 2),
      offer: screen === 'product' ? clamp01((s - 33) / 0.6) * (1 - clamp01((s - 39.2) / 0.6)) : 0,
      email: EMAIL.slice(0, typed),
      applied: s >= 38,
    },
  }
}

// ── Pieces ─────────────────────────────────────────────────────────────────

function GhostCursor({ solid }: { solid: boolean }) {
  return (
    <svg width="26" height="30" viewBox="0 0 14 20" className="overflow-visible">
      {!solid && <circle cx="5" cy="8" r="11" fill="rgba(26,20,16,0.08)" />}
      <path
        d="M0 0 L0 16 L4.4 12.2 L7.4 18.4 L10 17.2 L7.1 11.2 L12.4 11.2 Z"
        fill={solid ? 'rgb(26,20,16)' : 'rgba(26,20,16,0.38)'}
        stroke="white"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Pin({ x, y, text, warn }: { x: number; y: number; text: string; warn?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="absolute flex items-center gap-2 whitespace-nowrap rounded-full bg-night px-4 py-2 text-[17px] font-semibold text-night-text shadow-lg"
      style={{ left: x, top: y }}
    >
      <span className={cn('h-2 w-2 rounded-full', warn ? 'bg-warning-soft' : 'bg-night-soft')} />
      {text}
    </motion.div>
  )
}

/** The store window, the ghost cursor, its trail and pins, and the freeze overlay, in window coordinates. */
function Stage({ f, scale }: { f: Frame; scale: number }) {
  const [cx, cy] = cursorAt(f.s)
  const screen = f.store.screen
  const trail: [number, number][] = []
  for (let k = 1; k <= 14; k++) {
    const t = f.s - k * 0.14
    if (t < 0 || screenAt(t) !== screen) break
    trail.push(cursorAt(t))
  }
  // Pins clear when the clock stops, except the one that triggered the decision.
  const pins = PINS.filter((pin) => pin.at <= f.s && screenAt(pin.at) === screen && f.p < 0.72 && (f.frozen === 0 || pin.at >= 31))
  const tag = f.named ? `${STORY.persona} K. · s•••@gmail.com` : 'anon_7f3d'
  const [ox, oy] = cursorAt(32)

  return (
    <div className="relative" style={{ width: STORE_W * scale, height: STORE_H * scale }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: STORE_W, height: STORE_H, transform: `scale(${scale})` }}>
        <div style={{ filter: f.frozen > 0 ? `grayscale(${f.frozen}) brightness(${1 - 0.5 * f.frozen})` : undefined }}>
          <DesktopStore state={f.store} />
        </div>

        {/* Trail */}
        <svg className="pointer-events-none absolute inset-0" width={STORE_W} height={STORE_H}>
          {trail.map(([x, y], i) => (
            <circle key={i} cx={x + 4} cy={y + 6} r={5 - i * 0.3} fill={`rgba(26,20,16,${0.14 * (1 - i / trail.length)})`} />
          ))}
        </svg>

        {/* Pins */}
        <AnimatePresence>
          {pins.map((pin) => {
            const [px, py] = cursorAt(pin.at)
            const x = Math.max(12, Math.min(STORE_W - pin.text.length * 10 - 50, px + pin.dx))
            return <Pin key={pin.text} x={x} y={py + pin.dy} text={pin.text} warn={pin.warn} />
          })}
        </AnimatePresence>

        {/* Three futures, drawn from the cursor while the clock is stopped */}
        {f.frozen > 0 && f.p < 0.74 && (
          <svg className="pointer-events-none absolute inset-0 overflow-visible" width={STORE_W} height={STORE_H} style={{ opacity: f.frozen }}>
            {decision.options.map((option, i) => {
              const ex = 640 + (i === 1 ? 70 : 0)
              const ey = 210 + i * 150
              const chosen = !!option.chosen
              const strong = f.decided && chosen
              return (
                <g key={option.action}>
                  <path
                    d={`M ${ox + 8} ${oy + 12} C ${ox + 160} ${oy + 20}, ${ex - 200} ${ey}, ${ex} ${ey}`}
                    fill="none"
                    stroke={strong ? 'rgb(245,240,235)' : 'rgb(196,168,152)'}
                    strokeWidth={strong ? 4 : 2}
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray="1 1"
                    strokeDashoffset={1 - f.branch}
                    opacity={f.decided && !chosen ? 0.35 : 0.9}
                  />
                  {f.branch >= 0.999 && (
                    <foreignObject x={ex + 14} y={ey - 30} width={460} height={64}>
                      <div
                        className={cn(
                          'inline-flex items-center gap-3 rounded-2xl px-5 py-3 text-[22px] font-semibold',
                          strong ? 'bg-night-text text-night' : 'bg-night/85 text-night-soft',
                          f.decided && !chosen && 'opacity-50',
                        )}
                      >
                        {strong && <Check className="h-5 w-5" />}
                        {option.action}
                        <span className="font-mono text-[18px] font-medium opacity-80">{option.score.toFixed(2)}</span>
                      </div>
                    </foreignObject>
                  )}
                </g>
              )
            })}
          </svg>
        )}

        {/* Ghost cursor + tag */}
        <div className="pointer-events-none absolute" style={{ left: cx, top: cy }}>
          <GhostCursor solid={f.named} />
          <span
            className={cn(
              'absolute left-8 top-8 whitespace-nowrap rounded-full px-3 py-1 font-mono text-[15px] shadow',
              f.named ? 'bg-ink text-night-text' : 'bg-night/80 text-night-soft',
            )}
          >
            {tag}
          </span>
        </div>
      </div>
    </div>
  )
}

function SidePanel({ f, compact = false }: { f: Frame; compact?: boolean }) {
  const risk = lookup(timeline.tracks.exitRisk, f.s)
  const intent = lookup(timeline.tracks.intent, f.s)
  const signals = timeline.signals.filter((sig) => sig.at <= f.s && sig.id !== 'device').slice(-4)
  const freezing = f.caption === 'freeze' || (f.caption === 'leave' && f.p >= 0.5)

  return (
    <div className={cn('rounded-3xl bg-night-raised/90 p-5 ring-1 ring-night-line backdrop-blur', !compact && 'sm:p-6')}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-3xl font-semibold tabular-nums tracking-tight text-night-text sm:text-4xl">
          {freezing ? `0:32.${String(Math.floor(f.ms)).padStart(3, '0')}` : formatClock(f.s)}
        </p>
        <span
          className={cn(
            'rounded-full px-2.5 py-1 font-mono text-[12.5px]',
            f.named ? 'bg-success/30 text-success-soft' : 'bg-night text-night-soft',
          )}
        >
          {f.named ? 's•••@gmail.com' : 'anon_7f3d'}
        </span>
      </div>

      {f.caption === 'freeze' ? (
        <div className="mt-5">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Decision · illustrative</p>
          <ol className={cn('space-y-2', compact && 'hidden sm:block')}>
            {DECISION_PIPELINE.map((stage) => {
              const done = f.ms >= stage.ms
              return (
                <li key={stage.label} className={cn('flex gap-3 text-[14px] transition-opacity duration-200', done ? 'opacity-100' : 'opacity-35')}>
                  <span className="w-14 shrink-0 whitespace-nowrap font-mono tabular-nums text-night-muted">+{stage.ms} ms</span>
                  <span>
                    <span className="block font-semibold text-night-text">{stage.label}</span>
                    {!compact && <span className="block text-[13px] leading-snug text-night-soft">{stage.detail}</span>}
                  </span>
                </li>
              )
            })}
          </ol>
          {compact && <p className="text-[14px] text-night-soft sm:hidden">{[...DECISION_PIPELINE].reverse().find((st) => f.ms >= st.ms)?.label}</p>}
        </div>
      ) : f.caption === 'name' ? (
        <div className="mt-5 space-y-2">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-night-muted">Profile stitched</p>
          {['6 page views', `$${STORY.product.price} cart`, 'Source: Instagram ad', 'Synced to your ESP'].map((item, i) => (
            <p
              key={item}
              className={cn(
                'rounded-xl bg-night px-3.5 py-2 text-[14px] text-night-soft transition-opacity duration-300',
                f.named || f.s > 35 + i * 0.6 ? 'opacity-100' : 'opacity-0',
                compact && i > 1 && 'hidden sm:block',
              )}
            >
              {item}
            </p>
          ))}
        </div>
      ) : f.caption === 'order' ? (
        <div className="mt-5">
          <p className="text-[13px] text-night-soft">Captured this session</p>
          <p className="text-5xl font-extrabold tracking-tight text-night-copper">{timeline.outcome.headline}</p>
          <p className={cn('mt-3 text-[14px] leading-snug text-night-soft', compact && 'hidden sm:block')}>{timeline.outcome.summary}</p>
        </div>
      ) : (
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[12.5px] text-night-muted">Purchase intent</p>
              <p className="text-2xl font-bold tabular-nums text-night-text">{intent.toFixed(2)}</p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-night-line">
                <div className="h-full origin-left rounded-full bg-night-text" style={{ transform: `scaleX(${intent})` }} />
              </div>
            </div>
            <div>
              <p className="text-[12.5px] text-night-muted">Exit risk</p>
              <p className="text-2xl font-bold tabular-nums text-warning-soft">{Math.round(risk * 100)}%</p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-night-line">
                <div className="h-full origin-left rounded-full bg-warning-soft" style={{ transform: `scaleX(${risk})` }} />
              </div>
            </div>
          </div>
          <ul className={cn('mt-5 space-y-1.5', compact && 'hidden sm:block')}>
            {signals.map((sig) => (
              <li key={sig.id} className="flex items-baseline gap-3 text-[14px]">
                <span className="w-9 shrink-0 font-mono text-[12.5px] text-night-muted">{formatClock(sig.at)}</span>
                <span className="w-24 shrink-0 text-night-soft">{sig.label}</span>
                <span className={cn('min-w-0 truncate font-medium', sig.level === 'high' ? 'text-night-text' : 'text-night-soft')}>{sig.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function CaptionBlock({ caption, as: Tag = 'p' }: { caption: Caption; as?: 'p' | 'h3' }) {
  const copy = GHOSTS.story[caption]
  return (
    <div className="min-h-[7.5rem] sm:min-h-[9rem]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={caption}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <Tag className="max-w-4xl text-[1.7rem] font-semibold leading-[1.1] tracking-tight text-night-text sm:text-5xl">{copy.title}</Tag>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-night-soft sm:text-lg">{copy.sub}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/** Fits the 1200×760 store into the space available. */
function useFit(maxHeight: (vh: number) => number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const width = el.getBoundingClientRect().width
      setScale(Math.max(0.2, Math.min(width / STORE_W, maxHeight(window.innerHeight) / STORE_H)))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [maxHeight])
  return { ref, scale }
}

const pinnedHeight = (vh: number) => (vh < 700 ? vh - 330 : vh - 380)

function Pinned() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [p, setP] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(Math.round(v * 4000) / 4000))
  const f = frameAt(p)
  const fit = useFit(pinnedHeight)

  return (
    <div ref={ref} className="relative" style={{ height: '640svh' }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-6 pt-24 sm:pt-28">
        <div className={cn(container, 'flex flex-col gap-5 lg:gap-6')}>
          <CaptionBlock caption={f.caption} />
          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-8">
            <div ref={fit.ref} className="flex min-w-0 justify-center lg:justify-start">
              <Stage f={f} scale={fit.scale} />
            </div>
            <SidePanel f={f} compact />
          </div>
          <div aria-hidden className="flex gap-1.5">
            {(['read', 'leave', 'freeze', 'name', 'order'] as Caption[]).map((key, i) => {
              const starts = [0, 0.44, 0.5, 0.72, 0.87, 1]
              return (
                <span key={key} className="h-1 flex-1 overflow-hidden rounded-full bg-night-line">
                  <span className="block h-full origin-left bg-night-text" style={{ transform: `scaleX(${range(p, starts[i], starts[i + 1])})` }} />
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const BOARD: number[] = [0.3, 0.705, 0.85, 0.99]

function Storyboard() {
  const fit = useFit(() => 640)
  return (
    <div className={cn(container, 'space-y-20 py-16')}>
      {BOARD.map((p) => {
        const f = frameAt(p)
        return (
          <div key={p} className="space-y-6">
            <CaptionBlock caption={f.caption} as="h3" />
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-8">
              <div ref={p === BOARD[0] ? fit.ref : undefined} className="min-w-0">
                <Stage f={f} scale={fit.scale} />
              </div>
              <SidePanel f={f} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function GhostStory() {
  return (
    <div id="session" className="scroll-mt-0">
      <StoryTranscript timeline={timeline} title="Sarah’s session with Convertive" />
      <div aria-hidden className="motion-reduce:hidden">
        <Pinned />
      </div>
      <div aria-hidden className="hidden motion-reduce:block">
        <Storyboard />
      </div>
      <p className={cn(container, 'pb-4 text-[13px] text-night-muted')}>{SESSION.disclaimer}</p>
    </div>
  )
}

