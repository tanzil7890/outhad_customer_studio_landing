import {
  EMPTY_COUNTERS,
  classifySource,
  describeDevice,
  formatElapsed,
  readSession,
  type SessionCounters,
  type SessionRead,
  type SessionSource,
} from './self-read'

/**
 * Client-only tracker behind Concept 3 ("Mirror"). It watches the visitor's own
 * session on this page (pointer, scroll, sections read, CTA hovers, tab
 * switches, exit intent) and publishes an immutable snapshot for React via
 * useSyncExternalStore. Nothing leaves the browser; sessionStorage only holds
 * the anon id, a "freeze already shown" flag and where the visitor stopped.
 */

export type EventKind = 'arrive' | 'scroll' | 'pause' | 'cta' | 'read' | 'tab' | 'back' | 'roi' | 'faq' | 'film' | 'exit' | 'up' | 'click'

export interface SessionEvent {
  id: number
  at: number
  kind: EventKind
  text: string
}

export interface SessionSnapshot {
  anonId: string
  source: SessionSource
  device: string
  counters: SessionCounters
  read: SessionRead
  /** Oldest first, capped. */
  log: SessionEvent[]
  /** Section id → elapsed ms when it was read. */
  readAt: Record<string, number>
  inView: string[]
  rescored: number
  frozen: boolean
}

export type FreezeTrigger = 'exit' | 'button' | 'return'
export interface FreezeInfo {
  trigger: FreezeTrigger
  awayMs?: number
}

export interface PausePoint {
  /** Document coordinates, so marks stay put while the page scrolls. */
  x: number
  y: number
  start: number
  end?: number
  /** What was under the pointer when the pause began. */
  label: string
}

const READ_AFTER_MS = 2500
const PAUSE_AFTER_MS = 1000
const AUTO_FREEZE_AFTER_MS = 8000
const LOG_CAP = 40

const KEYS = { anon: 'mirror_anon', auto: 'mirror_freeze_auto', spot: 'mirror_spot' }

function storage(): Storage | null {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

function getAnonId() {
  const store = storage()
  const existing = store?.getItem(KEYS.anon)
  if (existing) return existing
  const bytes = new Uint8Array(2)
  crypto.getRandomValues(bytes)
  const id = `anon_${Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')}`
  store?.setItem(KEYS.anon, id)
  return id
}

function quoted(text: string, max = 38) {
  const clean = text.replace(/\s+/g, ' ').trim()
  return `“${clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean}”`
}

export class SessionReader {
  readonly startedAt = performance.now()
  readonly finePointer = window.matchMedia('(pointer: fine)').matches

  /** Live pointer, read per frame by the lens overlay (never through React). */
  readonly pointer = { x: -1, y: -1, vx: 0, vy: 0, speed: 0, lastMove: 0, inside: false }
  pause: PausePoint | null = null
  readonly pauses: PausePoint[] = []

  private counters: SessionCounters = { ...EMPTY_COUNTERS, sectionsRead: [] }
  private log: SessionEvent[] = []
  private nextId = 1
  private readAt: Record<string, number> = {}
  private labels: Record<string, string> = {}
  private visibleSince = new Map<string, number>()
  private lastActivity = performance.now()
  private lastScrollY = 0
  private scrollTrail: { t: number; y: number }[] = []
  private milestones = new Set<number>()
  private hiddenAt = 0
  private cta: { el: Element; since: number } | null = null
  private throttles = new Map<string, number>()
  private rescored = 0
  private lastScores = ''
  private frozen = false
  private snapshot: SessionSnapshot
  private listeners = new Set<() => void>()
  private freezeListeners = new Set<(info: FreezeInfo) => void>()
  private publishQueued = false

  readonly anonId = getAnonId()
  readonly source = classifySource(document.referrer, window.location.search, window.location.hostname)
  readonly device = describeDevice(navigator.userAgent)

  constructor() {
    this.push('arrive', `Landed from ${this.source.label.charAt(0).toLowerCase()}${this.source.label.slice(1)}`)
    this.push('arrive', `Opened on ${this.device}`)
    this.snapshot = this.build()
  }

  // ── Store API ──────────────────────────────────────────────────────────────

  subscribe = (listener: () => void) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  getSnapshot = () => this.snapshot

  onFreeze(listener: (info: FreezeInfo) => void) {
    this.freezeListeners.add(listener)
    return () => {
      this.freezeListeners.delete(listener)
    }
  }

  elapsed() {
    return performance.now() - this.startedAt
  }

  /** Stops the page clock while the freeze dialog is open. */
  setFrozen(frozen: boolean) {
    this.frozen = frozen
    this.publish(true)
  }

  requestFreeze(trigger: FreezeTrigger, awayMs?: number) {
    for (const listener of this.freezeListeners) listener({ trigger, awayMs })
  }

  /** Signals from wrapped shared components (ROI calculator, FAQ, film). */
  signal(kind: 'roi' | 'faq' | 'film', detail?: string) {
    this.counters.events++
    this.lastActivity = performance.now()
    if (kind === 'roi') {
      if (!this.counters.roiTouched) this.push('roi', 'Changed the ROI inputs')
      this.counters.roiTouched = true
    } else if (kind === 'faq') {
      this.counters.faqOpened++
      this.push('faq', `Opened ${quoted(detail ?? 'a question', 34)}`)
    } else if (kind === 'film') {
      if (!this.counters.filmPlayed) this.push('film', 'Played the film')
      this.counters.filmPlayed = true
    }
    this.publish()
  }

  saveSpot() {
    const id = this.currentSection()
    if (id) storage()?.setItem(KEYS.spot, JSON.stringify({ id, label: this.labels[id] ?? id }))
  }

  takeSavedSpot(): { id: string; label: string } | null {
    const store = storage()
    const raw = store?.getItem(KEYS.spot)
    if (!raw) return null
    store?.removeItem(KEYS.spot)
    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  start(root: HTMLElement) {
    const opts = { passive: true } as const
    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-read-id]'))
    for (const el of sections) this.labels[el.dataset.readId!] = el.dataset.readLabel ?? el.dataset.readId!

    const io = new IntersectionObserver(
      (entries) => {
        const now = performance.now()
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.readId!
          const needed = Math.min(entry.boundingClientRect.height * 0.5, window.innerHeight * 0.45)
          const visible = entry.isIntersecting && entry.intersectionRect.height >= needed
          if (visible && !this.visibleSince.has(id)) this.visibleSince.set(id, now)
          if (!visible) this.visibleSince.delete(id)
        }
        this.publish()
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    )
    sections.forEach((el) => io.observe(el))

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
      const now = performance.now()
      const p = this.pointer
      const dt = Math.max(1, now - p.lastMove)
      if (p.x >= 0 && dt < 200) {
        const vx = (e.clientX - p.x) / dt
        const vy = (e.clientY - p.y) / dt
        p.vx = p.vx * 0.7 + vx * 0.3
        p.vy = p.vy * 0.7 + vy * 0.3
        p.speed = Math.hypot(p.vx, p.vy)
      }
      const moved = Math.hypot(e.clientX - p.x, e.clientY - p.y)
      p.x = e.clientX
      p.y = e.clientY
      p.inside = true
      if (moved < 3) return
      p.lastMove = now
      this.lastActivity = now
      this.closePause(now)
      if (e.clientY < 160 && p.vy < -0.25) {
        const heading = Math.min(1, -p.vy / 1.4) * (1 - e.clientY / 160)
        this.counters.towardTop = Math.max(this.counters.towardTop, heading)
      }
      if (this.throttle('pointer-event', 120)) this.counters.events++
    }

    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return
      this.pointer.inside = false
      this.closePause(performance.now())
      if (e.clientY > 12) return
      this.counters.towardTop = 1
      if (this.throttle('exit', 4000)) this.push('exit', 'Headed for the tab bar')
      this.publish()
      if (this.elapsed() >= AUTO_FREEZE_AFTER_MS) this.autoFreeze('exit')
    }

    let scrollQueued = false
    const onScroll = () => {
      if (scrollQueued) return
      scrollQueued = true
      requestAnimationFrame(() => {
        scrollQueued = false
        this.handleScroll()
      })
    }

    const onVisibility = () => {
      const now = performance.now()
      if (document.hidden) {
        this.hiddenAt = now
        this.counters.tabSwitches++
        this.push('tab', 'Switched to another tab')
        this.publish()
        return
      }
      if (!this.hiddenAt) return
      const away = now - this.hiddenAt
      this.hiddenAt = 0
      this.lastActivity = now
      this.push('back', `Came back after ${formatElapsed(away)}`)
      this.publish()
      if (away >= 4000) this.autoFreeze('return', away)
    }

    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const el = (e.target as Element | null)?.closest?.('a[href="/demo"]')
      if (!el || this.cta?.el === el) return
      this.cta = { el, since: performance.now() }
      this.counters.ctaHovers++
      this.counters.events++
      if (this.throttle('cta', 1500)) this.push('cta', 'Hovered “Book a demo”')
      this.publish()
    }

    const onPointerOut = (e: PointerEvent) => {
      if (!this.cta) return
      const next = e.relatedTarget as Node | null
      if (next && this.cta.el.contains(next)) return
      this.counters.ctaDwellMs += performance.now() - this.cta.since
      this.cta = null
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      this.lastActivity = performance.now()
      this.counters.events++
      if (target?.closest?.('a[href="/demo"]')) this.push('click', 'Clicked “Book a demo”')
    }

    window.addEventListener('pointermove', onPointerMove, opts)
    window.addEventListener('scroll', onScroll, opts)
    document.addEventListener('mouseout', onMouseOut, opts)
    document.addEventListener('visibilitychange', onVisibility)
    document.addEventListener('pointerover', onPointerOver, opts)
    document.addEventListener('pointerout', onPointerOut, opts)
    document.addEventListener('click', onClick, { capture: true, passive: true })

    this.lastScrollY = window.scrollY
    this.handleScroll()
    const tick = window.setInterval(() => this.tick(), 250)

    return () => {
      window.clearInterval(tick)
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('visibilitychange', onVisibility)
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerout', onPointerOut)
      document.removeEventListener('click', onClick, { capture: true })
      this.listeners.clear()
      this.freezeListeners.clear()
    }
  }

  // ── Internals ──────────────────────────────────────────────────────────────

  private tick() {
    const now = performance.now()
    const c = this.counters
    c.towardTop *= 0.75
    if (c.towardTop < 0.01) c.towardTop = 0

    // Mouse rests become pauses; on touch, a scroll that stops for a while does.
    const p = this.pointer
    if (this.finePointer) {
      if (!this.pause && p.inside && p.lastMove && now - Math.max(p.lastMove, this.lastActivity) >= PAUSE_AFTER_MS && !document.hidden) {
        this.pause = { x: p.x + window.scrollX, y: p.y + window.scrollY, start: Math.max(p.lastMove, this.lastActivity), label: this.labelAt(p.x, p.y) }
      }
    } else if (!this.pause && now - this.lastActivity >= 2500 && !document.hidden && window.scrollY > 40) {
      const x = window.innerWidth / 2
      const y = window.innerHeight / 2
      this.pause = { x, y: window.scrollY + y, start: this.lastActivity, label: this.labelAt(x, y) }
    }

    for (const [id, since] of this.visibleSince) {
      if (this.readAt[id] !== undefined || now - since < READ_AFTER_MS) continue
      this.readAt[id] = this.elapsed()
      c.sectionsRead.push(id)
      c.events++
      this.push('read', `Read ${quoted(this.labels[id] ?? id)}`)
    }
    this.publish(true)
  }

  private closePause(now: number) {
    const pause = this.pause
    if (!pause) return
    this.pause = null
    const duration = now - pause.start
    if (duration < PAUSE_AFTER_MS) return
    pause.end = now
    this.pauses.push(pause)
    if (this.pauses.length > 12) this.pauses.shift()
    this.counters.pauses++
    this.counters.events++
    this.push('pause', `Paused ${(duration / 1000).toFixed(1)} s on ${pause.label}`)
    this.publish()
  }

  private handleScroll() {
    const now = performance.now()
    const y = window.scrollY
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const c = this.counters
    c.depth = Math.min(1, y / max)
    c.maxDepth = Math.max(c.maxDepth, c.depth)
    if (Math.abs(y - this.lastScrollY) > 2) {
      this.lastActivity = now
      this.closePause(now)
      if (this.throttle('scroll-event', 150)) c.events++
    }
    this.lastScrollY = y

    for (const mark of [25, 50, 75, 100]) {
      if (c.maxDepth * 100 >= mark - 0.5 && !this.milestones.has(mark)) {
        this.milestones.add(mark)
        this.push('scroll', mark === 100 ? 'Reached the bottom of the page' : `Scrolled ${mark}% of the page`)
      }
    }

    this.scrollTrail.push({ t: now, y })
    while (this.scrollTrail.length && now - this.scrollTrail[0].t > 700) this.scrollTrail.shift()
    const peak = Math.max(...this.scrollTrail.map((s) => s.y))
    if (peak - y > window.innerHeight * 0.9 && this.throttle('up', 3000)) {
      c.scrollUps++
      this.push('up', 'Scrolled back up')
      this.scrollTrail = [{ t: now, y }]
    }
    this.publish()
  }

  private labelAt(x: number, y: number) {
    const el = document.elementFromPoint(x, y)
    const heading = el?.closest('h1, h2, h3')
    if (heading?.textContent) return quoted(heading.textContent)
    const section = el?.closest<HTMLElement>('[data-read-label]')
    if (section) return `the ${section.dataset.readLabel} section`
    return 'the page'
  }

  private currentSection() {
    const mid = window.innerHeight / 2
    for (const [id] of Object.entries(this.labels)) {
      const el = document.querySelector(`[data-read-id="${id}"]`)
      const rect = el?.getBoundingClientRect()
      if (rect && rect.top <= mid && rect.bottom >= mid) return id
    }
    return null
  }

  private autoFreeze(trigger: FreezeTrigger, awayMs?: number) {
    const store = storage()
    if (this.frozen || store?.getItem(KEYS.auto)) return
    store?.setItem(KEYS.auto, '1')
    this.requestFreeze(trigger, awayMs)
  }

  private throttle(key: string, ms: number) {
    const now = performance.now()
    if (now - (this.throttles.get(key) ?? -Infinity) < ms) return false
    this.throttles.set(key, now)
    return true
  }

  private push(kind: EventKind, text: string) {
    this.log.push({ id: this.nextId++, at: this.elapsed(), kind, text })
    if (this.log.length > LOG_CAP) this.log.shift()
  }

  private build(): SessionSnapshot {
    const counters = {
      ...this.counters,
      sectionsRead: [...this.counters.sectionsRead],
      elapsedMs: this.elapsed(),
      idleMs: performance.now() - this.lastActivity,
      ctaDwellMs: this.counters.ctaDwellMs + (this.cta ? performance.now() - this.cta.since : 0),
    }
    const read = readSession(counters)
    const scores = read.actions.map((a) => `${a.id}:${a.score.toFixed(3)}`).join()
    if (scores !== this.lastScores) {
      this.lastScores = scores
      this.rescored++
    }
    return {
      anonId: this.anonId,
      source: this.source,
      device: this.device,
      counters,
      read,
      log: [...this.log],
      readAt: { ...this.readAt },
      inView: [...this.visibleSince.keys()],
      rescored: this.rescored,
      frozen: this.frozen,
    }
  }

  /** Coalesces bursts of events into one snapshot per frame. The tick publishes immediately. */
  private publish(now = false) {
    if (this.frozen && !now) return
    if (now) {
      if (this.frozen && this.snapshot.frozen) return
      this.snapshot = this.build()
      this.listeners.forEach((l) => l())
      return
    }
    if (this.publishQueued) return
    this.publishQueued = true
    requestAnimationFrame(() => {
      this.publishQueued = false
      if (this.frozen) return
      this.snapshot = this.build()
      this.listeners.forEach((l) => l())
    })
  }
}
