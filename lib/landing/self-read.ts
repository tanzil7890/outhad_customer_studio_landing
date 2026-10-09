/**
 * Concept 3 ("Mirror") reads the visitor's own session in their browser and
 * explains it with this model. It is a deliberately simple, explainable toy:
 * counters in, intent / exit risk / ranked next actions (with reasons) out.
 * Nothing here is stored or sent anywhere.
 */

export type SourceKind = 'direct' | 'search' | 'social' | 'email' | 'campaign' | 'internal' | 'referral'

export interface SessionSource {
  kind: SourceKind
  label: string
}

/** Raw counters kept by the in-browser tracker (see use-self-session.ts). */
export interface SessionCounters {
  elapsedMs: number
  maxDepth: number
  depth: number
  pauses: number
  ctaHovers: number
  ctaDwellMs: number
  sectionsRead: string[]
  tabSwitches: number
  roiTouched: boolean
  faqOpened: number
  filmPlayed: boolean
  scrollUps: number
  /** 0..1, how hard the pointer is heading for the tab bar right now. */
  towardTop: number
  idleMs: number
  events: number
}

export type ActionId = 'demo' | 'roi' | 'film' | 'save'

export interface RankedAction {
  id: ActionId
  label: string
  score: number
  reasons: string[]
}

export interface SessionRead {
  intent: number
  exitRisk: number
  segment: string
  actions: RankedAction[]
}

export const EMPTY_COUNTERS: SessionCounters = {
  elapsedMs: 0,
  maxDepth: 0,
  depth: 0,
  pauses: 0,
  ctaHovers: 0,
  ctaDwellMs: 0,
  sectionsRead: [],
  tabSwitches: 0,
  roiTouched: false,
  faqOpened: 0,
  filmPlayed: false,
  scrollUps: 0,
  towardTop: 0,
  idleMs: 0,
  events: 0,
}

export const ACTION_LABELS: Record<ActionId, string> = {
  demo: 'Offer a 15-minute demo',
  roi: 'Show what a lift is worth on your traffic',
  film: 'Play the 48-second film',
  save: 'Do nothing, and remember where you stopped',
}

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n))
const sat = (n: number, full: number) => clamp(n / full)

export function times(n: number) {
  return n === 1 ? 'once' : n === 2 ? 'twice' : `${n} times`
}

export function formatElapsed(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function formatElapsedPrecise(ms: number) {
  return `${formatElapsed(ms)}.${String(Math.floor(Math.max(0, ms) % 1000)).padStart(3, '0')}`
}

export function readSession(c: SessionCounters): SessionRead {
  const read = new Set(c.sectionsRead)
  const seconds = c.elapsedMs / 1000

  const intent = clamp(
    0.08 +
      0.3 * c.maxDepth +
      0.12 * sat(seconds, 90) +
      0.12 * sat(c.ctaHovers, 2) +
      0.08 * sat(c.ctaDwellMs, 2500) +
      0.08 * sat(read.size, 4) +
      (c.roiTouched ? 0.12 : 0) +
      (c.faqOpened > 0 ? 0.05 : 0) +
      (c.filmPlayed ? 0.05 : 0),
    0.02,
    0.97,
  )

  const exitRisk = clamp(
    0.14 +
      0.5 * c.towardTop +
      0.18 * sat(c.idleMs - 8000, 30000) +
      0.1 * sat(c.tabSwitches, 3) +
      0.08 * sat(c.scrollUps, 4) -
      0.08 * sat(c.ctaDwellMs, 3000),
    0.03,
    0.98,
  )

  const segment =
    c.roiTouched || c.ctaHovers >= 2
      ? 'High-intent evaluator'
      : read.size >= 3 || c.maxDepth > 0.5
        ? 'Deep reader'
        : seconds < 20
          ? 'Just arrived'
          : c.pauses >= 2
            ? 'Careful reader'
            : 'Skimmer'

  return { intent, exitRisk, segment, actions: rankActions(c) }
}

/** Scores every eligible next action for this visitor and says why. */
export function rankActions(c: SessionCounters): RankedAction[] {
  const read = new Set(c.sectionsRead)
  const seconds = c.elapsedMs / 1000
  const actions: RankedAction[] = []

  {
    const reasons: string[] = []
    let score = 0.22
    if (c.ctaHovers > 0) {
      score += 0.25 * sat(c.ctaHovers, 2) + 0.12 * sat(c.ctaDwellMs, 2000)
      reasons.push(`You hovered “Book a demo” ${times(c.ctaHovers)} without clicking.`)
    }
    if (c.roiTouched) {
      score += 0.14
      reasons.push('You ran the numbers on your own traffic.')
    }
    if (read.has('method') || read.has('platform')) {
      score += 0.12
      reasons.push('You read how it works.')
    }
    if (seconds > 60) {
      score += 0.1 * sat(seconds - 60, 120)
      reasons.push(`You’ve stayed ${formatElapsed(c.elapsedMs)}, longer than most.`)
    }
    if (!reasons.length) reasons.push('A demo is the default next step for a new visitor.')
    actions.push({ id: 'demo', label: ACTION_LABELS.demo, score, reasons })
  }

  {
    const reasons: string[] = []
    let score = 0.18
    if (c.roiTouched) {
      score -= 0.12
      reasons.push('You already ran the numbers.')
    } else {
      if (c.maxDepth > 0.3) {
        score += 0.2
        reasons.push(`You’ve read ${Math.round(c.maxDepth * 100)}% of the page but haven’t run the numbers.`)
      }
      if (read.has('window') || read.has('known')) {
        score += 0.12
        reasons.push('You read about the window where sales are won or lost.')
      }
    }
    if (!reasons.length) reasons.push('Numbers land better once you know what the product does.')
    actions.push({ id: 'roi', label: ACTION_LABELS.roi, score, reasons })
  }

  {
    const reasons: string[] = []
    let score = 0.16
    if (c.filmPlayed) {
      score -= 0.12
      reasons.push('You already watched it.')
    } else {
      if (c.maxDepth < 0.3) {
        score += 0.2
        reasons.push('You’ve only seen the top of the page.')
      }
      if (c.pauses >= 2) {
        score += 0.08
        reasons.push(`You paused to read ${times(c.pauses)}. A short film is faster.`)
      }
    }
    if (!reasons.length) reasons.push('Forty-eight seconds is a small ask.')
    actions.push({ id: 'film', label: ACTION_LABELS.film, score, reasons })
  }

  {
    const reasons: string[] = []
    let score = 0.1
    if (c.tabSwitches > 0) {
      score += 0.15 * sat(c.tabSwitches, 2)
      reasons.push(`You switched tabs ${times(c.tabSwitches)}. You may just be busy.`)
    }
    if (seconds < 15) {
      score += 0.12
      reasons.push('You only just arrived. An offer now would be noise.')
    }
    if (!reasons.length) reasons.push('Always eligible. Sometimes the best move is no move.')
    actions.push({ id: 'save', label: ACTION_LABELS.save, score, reasons })
  }

  for (const action of actions) action.score = clamp(action.score, 0.03, 0.95)
  return actions.sort((a, b) => b.score - a.score)
}

// ── Environment readers (client only) ───────────────────────────────────────

const SEARCH = ['google.', 'bing.', 'duckduckgo.', 'yahoo.', 'ecosia.', 'search.brave', 'baidu.', 'yandex.', 'perplexity.', 'chatgpt.']
const SOCIAL: [string, string][] = [
  ['linkedin.', 'LinkedIn'],
  ['lnkd.in', 'LinkedIn'],
  ['t.co', 'X'],
  ['twitter.', 'X'],
  ['x.com', 'X'],
  ['facebook.', 'Facebook'],
  ['instagram.', 'Instagram'],
  ['reddit.', 'Reddit'],
  ['youtube.', 'YouTube'],
  ['news.ycombinator', 'Hacker News'],
]
const MAIL = ['mail.', 'outlook.', 'gmail.']

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export function classifySource(referrer: string, search: string, ownHost: string): SessionSource {
  const utm = new URLSearchParams(search).get('utm_source')
  if (utm) return { kind: 'campaign', label: `${capitalize(utm)} campaign` }
  if (!referrer) return { kind: 'direct', label: 'A direct visit' }
  let host = ''
  try {
    host = new URL(referrer).hostname.replace(/^www\./, '')
  } catch {
    return { kind: 'direct', label: 'A direct visit' }
  }
  if (host === ownHost.replace(/^www\./, '')) return { kind: 'internal', label: 'Another page on this site' }
  const engine = SEARCH.find((s) => host.includes(s))
  if (engine) return { kind: 'search', label: `${capitalize(engine.replace(/^search\./, '').split('.')[0])} search` }
  const social = SOCIAL.find(([s]) => host === s || host.includes(s))
  if (social) return { kind: 'social', label: social[1] }
  if (MAIL.some((s) => host.includes(s))) return { kind: 'email', label: 'An email link' }
  return { kind: 'referral', label: host }
}

export function describeDevice(ua: string): string {
  const os = /iPhone/.test(ua)
    ? 'iPhone'
    : /iPad/.test(ua)
      ? 'iPad'
      : /Android/.test(ua)
        ? 'Android'
        : /Mac OS X|Macintosh/.test(ua)
          ? 'Mac'
          : /Windows/.test(ua)
            ? 'Windows'
            : /CrOS/.test(ua)
              ? 'Chromebook'
              : /Linux/.test(ua)
                ? 'Linux'
                : 'Unknown device'
  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /OPR\/|Opera/.test(ua)
      ? 'Opera'
      : /Firefox\/|FxiOS/.test(ua)
        ? 'Firefox'
        : /CriOS|Chrome\//.test(ua)
          ? 'Chrome'
          : /Safari\//.test(ua)
            ? 'Safari'
            : 'a browser'
  return `${os} · ${browser}`
}
