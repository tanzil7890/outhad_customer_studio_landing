/**
 * The 47-second session story, as data. Every concept renders it differently
 * (V1 plays it on a clock, V2 drives it with scroll, V3 lays it out as a ledger),
 * but they all read these timelines so the numbers can never drift apart.
 */

export type ScreenState = 'browse' | 'cart' | 'hesitate' | 'offer' | 'capture' | 'confirmed' | 'closed'

export type SignalLevel = 'low' | 'mid' | 'high'

export interface StorySignal {
  id: string
  at: number
  label: string
  value: string
  level?: SignalLevel
}

export interface StoryBeat {
  id: string
  /** Story time in seconds. */
  at: number
  screen: ScreenState
  title: string
  /** What the shopper experiences. */
  shopper: string
  /** What the engine (or the legacy stack, in the `without` timeline) is doing. */
  engine: string
  /** Relative screen time in `beats` pacing. Defaults to 1. */
  weight?: number
}

export interface Track {
  at: number[]
  value: number[]
}

export interface Decision {
  latencyMs: number
  options: { action: string; score: number; chosen?: boolean }[]
}

export interface Timeline {
  mode: 'with' | 'without'
  duration: number
  beats: StoryBeat[]
  signals: StorySignal[]
  tracks: { exitRisk: Track; intent: Track }
  decision?: Decision
  outcome: {
    revenue: number
    identity: 'known' | 'anonymous'
    headline: string
    summary: string
  }
}

const round2 = (n: number) => Math.round(n * 100) / 100

const PRODUCT = { name: 'Ridgeline Trail Boot', variant: 'Walnut · Size 8', price: 129 }
const OFFER = { discount: 0.1, copy: 'Complete your order today and get 10% off.' }
const CAPTURED = round2(PRODUCT.price * (1 - OFFER.discount)) // 116.10

const sharedBeats: StoryBeat[] = [
  {
    id: 'land',
    at: 0,
    screen: 'browse',
    title: 'Lands from Instagram',
    shopper: 'Sarah taps an Instagram ad and lands on a collection page. No account, no email, no history.',
    engine: 'Anonymous profile anon_7f3d opened. Source, device and landing context recorded.',
  },
  {
    id: 'cart',
    at: 15,
    screen: 'cart',
    title: `Adds a $${PRODUCT.price} boot to her cart`,
    shopper: `She compares two trail boots, checks the size guide, and adds the ${PRODUCT.name} to her cart.`,
    engine: 'Intent climbs with every product view. The add-to-cart pushes it past 0.7.',
  },
]

const sharedSignals: StorySignal[] = [
  { id: 'source', at: 0, label: 'Source', value: 'Instagram ad' },
  { id: 'device', at: 2, label: 'Device', value: 'iPhone · Safari' },
  { id: 'category', at: 8, label: 'Browsing', value: 'Hiking boots', level: 'mid' },
  { id: 'cart', at: 15, label: 'Cart', value: `$${PRODUCT.price.toFixed(2)}`, level: 'high' },
  { id: 'size', at: 21, label: 'Size guide', value: 'Opened', level: 'mid' },
  { id: 'shipping', at: 27, label: 'Shipping cost', value: 'Checked twice', level: 'high' },
  { id: 'exit', at: 32, label: 'Exit intent', value: 'Heading for the tab bar', level: 'high' },
]

const sharedRisk: Track = { at: [0, 8, 15, 21, 27, 32], value: [0.2, 0.24, 0.16, 0.32, 0.58, 0.82] }
const sharedIntent: Track = { at: [0, 8, 15, 21, 32], value: [0.1, 0.34, 0.72, 0.76, 0.81] }

const withTimeline: Timeline = {
  mode: 'with',
  duration: 47,
  beats: [
    ...sharedBeats,
    {
      id: 'hesitate',
      at: 32,
      screen: 'hesitate',
      title: 'Hesitates at checkout',
      shopper: 'She checks the shipping cost again, scrolls back up to the price, and drifts toward the tab bar.',
      engine: 'High intent, price-sensitive, exit risk 82%. Decision requested.',
    },
    {
      id: 'offer',
      at: 33,
      screen: 'offer',
      title: 'Gets the right offer',
      shopper: `“${OFFER.copy}”`,
      engine: 'Three eligible actions ranked in 41 ms. A 10% today-only offer wins on expected lift.',
      weight: 1.2,
    },
    {
      id: 'capture',
      at: 38,
      screen: 'capture',
      title: 'Unlocks it with her email',
      shopper: 'She enters her email to claim the discount.',
      engine: 'anon_7f3d becomes a known profile. Six page views and her cart are stitched and synced to your ESP.',
    },
    {
      id: 'order',
      at: 47,
      screen: 'confirmed',
      title: 'Buys before she leaves',
      shopper: `Order placed: $${CAPTURED.toFixed(2)}.`,
      engine: 'Revenue attributed to the intervention. The outcome feeds back into the model.',
      weight: 1.4,
    },
  ],
  signals: [
    ...sharedSignals,
    { id: 'decision', at: 33, label: 'Decision', value: '10% off today · 41 ms', level: 'high' },
    { id: 'identity', at: 38, label: 'Identity', value: 'anon_7f3d → s•••@gmail.com', level: 'high' },
    { id: 'order', at: 47, label: 'Order', value: `$${CAPTURED.toFixed(2)}`, level: 'high' },
  ],
  tracks: {
    exitRisk: { at: [...sharedRisk.at, 33, 38, 47], value: [...sharedRisk.value, 0.84, 0.2, 0.04] },
    intent: { at: [...sharedIntent.at, 38, 47], value: [...sharedIntent.value, 0.9, 0.97] },
  },
  decision: {
    latencyMs: 41,
    options: [
      { action: '10% off, today only', score: 0.82, chosen: true },
      { action: 'Free shipping over $150', score: 0.61 },
      { action: 'Do nothing', score: 0.12 },
    ],
  },
  outcome: {
    revenue: CAPTURED,
    identity: 'known',
    headline: `+$${CAPTURED.toFixed(2)}`,
    summary: 'Anonymous visitor to known customer to order, in under a minute.',
  },
}

const withoutTimeline: Timeline = {
  mode: 'without',
  duration: 41,
  beats: [
    ...sharedBeats.map((beat) =>
      beat.id === 'cart'
        ? { ...beat, engine: 'Nothing is listening yet. The session will not reach your warehouse until tonight’s sync.' }
        : beat.id === 'land'
          ? { ...beat, engine: 'An anonymous session. Your stack has no profile and no email for it.' }
          : beat,
    ),
    {
      id: 'hesitate',
      at: 32,
      screen: 'hesitate',
      title: 'Hesitates at checkout',
      shopper: 'She checks the shipping cost again, scrolls back up to the price, and drifts toward the tab bar.',
      engine: 'No trigger fires. Exit risk is visible in the clickstream, but nothing is reading it.',
    },
    {
      id: 'closed',
      at: 41,
      screen: 'closed',
      title: 'Closes the tab',
      shopper: 'She leaves to think about it. She does not come back.',
      engine: 'Cart abandoned by an anonymous visitor. The abandoned-cart email cannot send: there is no address on file.',
      weight: 1.6,
    },
  ],
  signals: [...sharedSignals, { id: 'ended', at: 41, label: 'Session', value: 'Ended · still anonymous', level: 'high' }],
  tracks: {
    exitRisk: { at: [...sharedRisk.at, 41], value: [...sharedRisk.value, 1] },
    intent: { at: [...sharedIntent.at, 41], value: [...sharedIntent.value, 0.81] },
  },
  outcome: {
    revenue: 0,
    identity: 'anonymous',
    headline: '$0',
    summary: `A $${PRODUCT.price} cart, no email, and no way to reach her again.`,
  },
}

export const STORY = {
  persona: 'Sarah',
  storeDomain: 'yourstore.com',
  product: PRODUCT,
  offer: OFFER,
  captured: CAPTURED,
  /** Last story second the two timelines share; switching modes rewinds to here at most. */
  divergeAt: 16,
  timelines: { with: withTimeline, without: withoutTimeline },
} as const

/**
 * Illustrative breakdown of the 41 ms decision at 0:32, used by the bullet-time
 * scene in Concept 2. Stage times are milliseconds after the exit-intent event
 * and end at `decision.latencyMs`.
 */
export const DECISION_PIPELINE: { ms: number; label: string; detail: string }[] = [
  { ms: 0, label: 'Event received', detail: 'Cursor heading for the tab bar' },
  { ms: 4, label: 'Profile updated', detail: `anon_7f3d · 6 page views · $${PRODUCT.price} cart` },
  { ms: 11, label: 'Features computed', detail: 'Intent 0.81 · price-sensitive · exit risk 82%' },
  { ms: 19, label: 'Eligible actions', detail: 'Frequency caps and suppression applied' },
  { ms: 33, label: 'Scored by expected lift', detail: '0.82 · 0.61 · 0.12' },
  { ms: withTimeline.decision!.latencyMs, label: 'Rendered', detail: `“${OFFER.copy}”` },
]

export function beatIndexAt(beats: StoryBeat[], t: number): number {
  let index = 0
  for (let i = 0; i < beats.length; i++) {
    if (beats[i].at <= t + 1e-6) index = i
  }
  return index
}

export function formatClock(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds + 1e-6))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/**
 * `beats` pacing: each beat gets an equal (weighted) share of playback, so a
 * one-second story step like 0:32 → 0:33 still gets real screen time.
 * Returns cursor stops (0..1) and the story times they map to.
 */
export function buildPacing(timeline: Timeline): { stops: number[]; times: number[]; beatStops: number[] } {
  const weights = timeline.beats.map((beat) => beat.weight ?? 1)
  const total = weights.reduce((sum, w) => sum + w, 0)
  const beatStops: number[] = []
  let acc = 0
  for (const w of weights) {
    beatStops.push(acc / total)
    acc += w
  }
  // Each beat segment interpolates from its own time to the next beat's time;
  // the last segment holds on the final beat.
  const stops = [...beatStops, 1]
  const times = [...timeline.beats.map((beat) => beat.at), timeline.duration]
  return { stops, times, beatStops }
}

export function totalWeight(timeline: Timeline): number {
  return timeline.beats.reduce((sum, beat) => sum + (beat.weight ?? 1), 0)
}
