import { STORY } from '../../../lib/landing/story'
import { clamp, ease, lookup, type Easing } from '../anim'
import { H, W } from '../theme'
import { T } from './timeline'

/** The store, laid out as a map: three browser windows the camera travels across. */
export const PAGE = { w: 1200, h: 760 }
export const ORIGIN = {
  coll: { x: 0, y: 0 },
  prod: { x: 1560, y: 380 },
  conf: { x: 3120, y: 0 },
}
export const MAP = { cx: 2160, cy: 570, w: 4320, h: 1140 }

// ── Story time (session seconds) as a function of film time ────────────────

type Key = [number, number, Easing?]
const STORY_KEYS: Key[] = [
  [T.read, 0],
  [T.read + 2.0, 9],
  [T.read + 2.8, 10.5],
  [T.read + 3.8, 12.5],
  [T.read + 5.0, 15],
  [T.read + 6.0, 21],
  [T.read + 6.8, 25],
  [T.readEnd, 28],
  [T.freeze, 32, ease.in], // she accelerates toward the close button
  [T.unfreeze, 32],
  [T.whip - 0.1, 38],
  [T.whip + 1.4, 47, ease.out],
]

function keyed(t: number, keys: Key[]) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, v0] = keys[i]
    const [t1, v1, e] = keys[i + 1]
    if (t <= t1) return v0 + (v1 - v0) * (e ?? ease.linear)(clamp((t - t0) / (t1 - t0)))
  }
  return keys[keys.length - 1][1]
}

export const storyAt = (t: number) => keyed(t, STORY_KEYS)

// ── Cursor path (world coordinates) keyed by story time ────────────────────

const at = (o: { x: number; y: number }, x: number, y: number): [number, number] => [o.x + x, o.y + y]
const C = ORIGIN.coll
const R = ORIGIN.prod
const F = ORIGIN.conf

const PATH: [number, [number, number]][] = [
  // Positions are window-local (see Pages.tsx): tiles, size 8, Add to cart, drawer, tab close, modal.
  [0, at(C, 600, 470)],
  [3, at(C, 184, 404)],
  [6, at(C, 461, 404)],
  [8.5, at(C, 190, 410)],
  [10.5, at(C, 190, 410)],
  [12.5, at(R, 330, 330)],
  [14, at(R, 766, 394)],
  [15, at(R, 900, 472)],
  [18, at(R, 700, 531)],
  [21, at(R, 760, 560)],
  [24, at(R, 960, 330)],
  [25, at(R, 1000, 396)],
  [27, at(R, 1015, 400)],
  [29, at(R, 800, 240)],
  [32, at(R, 330, 70)],
  [33, at(R, 600, 467)],
  [37, at(R, 610, 469)],
  [38, at(R, 600, 540)],
  [40, at(F, 600, 520)],
  [47, at(F, 620, 520)],
]

function catmull(p0: number, p1: number, p2: number, p3: number, u: number) {
  const u2 = u * u
  const u3 = u2 * u
  return 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3)
}

/** Smooth (Catmull-Rom) cursor position for a story second. */
export function cursorWorld(story: number): [number, number] {
  if (story <= PATH[0][0]) return PATH[0][1]
  for (let i = 0; i < PATH.length - 1; i++) {
    if (story <= PATH[i + 1][0]) {
      const u = (story - PATH[i][0]) / (PATH[i + 1][0] - PATH[i][0])
      const p0 = PATH[Math.max(0, i - 1)][1]
      const p1 = PATH[i][1]
      const p2 = PATH[i + 1][1]
      const p3 = PATH[Math.min(PATH.length - 1, i + 2)][1]
      return [catmull(p0[0], p1[0], p2[0], p3[0], u), catmull(p0[1], p1[1], p2[1], p3[1], u)]
    }
  }
  return PATH[PATH.length - 1][1]
}

/** Signals pinned to the trail at the story second they happened. */
export const PINS: { at: number; text: string; dx: number; dy: number; warn?: boolean }[] = [
  { at: 0.4, text: 'via Instagram ad', dx: 30, dy: -70 },
  { at: 4.5, text: 'Hiking boots', dx: -40, dy: 60 },
  { at: 7.2, text: 'Compared 2 styles', dx: 30, dy: 60 },
  { at: 15.3, text: `$${STORY.product.price} in cart`, dx: 34, dy: -70 },
  { at: 18.3, text: 'Opened the size guide', dx: -60, dy: 64 },
  { at: 27.2, text: 'Checked shipping twice', dx: 40, dy: 64, warn: true },
  { at: 30.6, text: 'Exit intent', dx: 40, dy: 34, warn: true },
]

// ── Camera ─────────────────────────────────────────────────────────────────

const CAM: [number, number, number, number][] = [
  // [film t, world x, world y, scale]
  [T.dive, 600, 470, 4.2],
  [T.read, 600, 440, 1.3],
  [T.read + 2.0, 420, 410, 1.4],
  [T.read + 2.8, 380, 400, 1.35],
  [T.read + 3.3, 1300, 560, 0.85],
  [T.read + 3.9, 2080, 700, 1.25],
  [T.read + 5.0, 2300, 740, 1.35],
  [T.read + 6.0, 2330, 800, 1.35],
  [T.readEnd, 2480, 760, 1.45],
  [T.freeze, 1890, 470, 2.2],
  [T.unfreeze, 1900, 480, 2.3],
  [T.unfreeze + 0.9, 2160, 790, 1.4],
  [T.whip, 2160, 800, 1.45],
  [T.whip + 0.55, 3720, 400, 1.2],
  [T.zoomOut, 3720, 400, 1.28],
  [T.zoomOut + 1.6, MAP.cx, MAP.cy, 0.36],
  [T.grid + 1.8, MAP.cx, MAP.cy, 200 / MAP.w],
]

export interface Cam {
  x: number
  y: number
  s: number
}

export function camAt(t: number): Cam {
  if (t <= CAM[0][0]) return { x: CAM[0][1], y: CAM[0][2], s: CAM[0][3] }
  for (let i = 0; i < CAM.length - 1; i++) {
    const [t0, x0, y0, s0] = CAM[i]
    const [t1, x1, y1, s1] = CAM[i + 1]
    if (t <= t1) {
      const u = ease.inOut(clamp((t - t0) / (t1 - t0)))
      // Zoom in log space so scale changes feel uniform.
      return { x: x0 + (x1 - x0) * u, y: y0 + (y1 - y0) * u, s: Math.exp(Math.log(s0) + (Math.log(s1) - Math.log(s0)) * u) }
    }
  }
  const last = CAM[CAM.length - 1]
  return { x: last[1], y: last[2], s: last[3] }
}

export function project(cam: Cam, wx: number, wy: number): [number, number] {
  return [W / 2 + (wx - cam.x) * cam.s, H / 2 + (wy - cam.y) * cam.s]
}

/** Camera speed in screen pixels per second (drives the whip-pan motion blur). */
export function camSpeed(t: number) {
  const a = camAt(t - 1 / 60)
  const b = camAt(t + 1 / 60)
  const scale = (a.s + b.s) / 2
  return Math.hypot(b.x - a.x, b.y - a.y) * scale * 30
}

export const exitRiskAt = (story: number) =>
  lookup(story, STORY.timelines.with.tracks.exitRisk.at, STORY.timelines.with.tracks.exitRisk.value)
export const intentAt = (story: number) =>
  lookup(story, STORY.timelines.with.tracks.intent.at, STORY.timelines.with.tracks.intent.value)
