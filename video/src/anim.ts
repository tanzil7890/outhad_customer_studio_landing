/** Frame-based animation helpers. Everything is a pure function of time, so any frame renders identically. */

export const FPS = 30

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))

export const ease = {
  linear: (t: number) => t,
  out: (t: number) => 1 - Math.pow(1 - t, 3),
  outQuint: (t: number) => 1 - Math.pow(1 - t, 5),
  in: (t: number) => t * t * t,
  inOut: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
}

export type Easing = (t: number) => number

/** Tween between `from` and `to` while `s` (seconds) moves from `a` to `b`. */
export function tw(s: number, a: number, b: number, from = 0, to = 1, easing: Easing = ease.out) {
  if (b <= a) return s >= b ? to : from
  return from + (to - from) * easing(clamp((s - a) / (b - a)))
}

/** Damped spring settling from 0 to 1, starting at second `a`. */
export function spring(s: number, a: number, { stiffness = 140, damping = 16 } = {}) {
  const t = s - a
  if (t <= 0) return 0
  const w0 = Math.sqrt(stiffness)
  const zeta = damping / (2 * w0)
  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta)
    return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t))
  }
  return 1 - Math.exp(-w0 * t) * (1 + w0 * t)
}

/** Piecewise-linear lookup (for story tracks like exit risk). */
export function lookup(x: number, xs: number[], ys: number[]) {
  if (x <= xs[0]) return ys[0]
  for (let i = 0; i < xs.length - 1; i++) {
    if (x <= xs[i + 1]) return ys[i] + ((x - xs[i]) / (xs[i + 1] - xs[i])) * (ys[i + 1] - ys[i])
  }
  return ys[ys.length - 1]
}

/** Entrance helper: opacity + upward offset, returns a style object. */
export function rise(s: number, at: number, { dist = 28, dur = 0.7 } = {}) {
  const p = tw(s, at, at + dur, 0, 1, ease.outQuint)
  return { opacity: p, transform: `translateY(${(1 - p) * dist}px)` }
}

/** Deterministic pseudo-random in [0, 1) for index `i`. */
export function rand(i: number, seed = 1) {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}
