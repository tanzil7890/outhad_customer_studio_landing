import durations from '../../script/ghost/vo-durations.json'
import lines from '../../script/ghost/lines.json'
import { FPS } from '../anim'

export type BeatId = 'hook' | 'ghosts' | 'follow' | 'read' | 'leave' | 'freeze' | 'name' | 'sale' | 'scale' | 'end'

/** Silence (seconds) before each narration line, i.e. room for the picture to breathe. */
const GAP_BEFORE: Record<BeatId, number> = {
  hook: 1.4,
  ghosts: 0.5,
  follow: 0.9,
  read: 1.45,
  leave: 0.6,
  freeze: 0.75,
  name: 0.85,
  sale: 0.5,
  scale: 1.4,
  end: 1.6,
}
const TAIL = 2.6

const voDur = durations as Record<string, number>

/** Narration start (s) and end (s) per beat, laid end to end with the gaps above. */
export const VO: Record<BeatId, { at: number; end: number; text: string }> = {} as never
let cursor = 0
for (const line of lines as { id: BeatId; vo: string }[]) {
  const at = cursor + GAP_BEFORE[line.id]
  const end = at + voDur[line.id]
  VO[line.id] = { at, end, text: line.vo }
  cursor = end
}

export const TOTAL_SECONDS = cursor + TAIL
export const TOTAL_FRAMES = Math.round(TOTAL_SECONDS * FPS)

/** Visual events, all derived from the narration so a re-voiced script re-times itself. */
export const T = {
  single: 0.3,
  crowd: 1.5,
  ghostsFade: VO.ghosts.at + 1.0,
  noName: VO.ghosts.at + 2.0,
  tag: VO.follow.at - 0.7,
  dive: VO.follow.at + 0.85,
  read: VO.read.at - 0.2,
  readEnd: VO.read.end + 0.3,
  leave: VO.leave.at,
  freeze: VO.leave.end + 0.3,
  futures: VO.freeze.at + 0.35,
  ms: VO.freeze.at + 2.4,
  select: VO.freeze.end - 0.55,
  unfreeze: VO.name.at - 0.45,
  typing: VO.name.at + 0.9,
  named: VO.name.end - 1.2,
  whip: VO.sale.at - 0.2,
  money: VO.sale.at + 0.35,
  zoomOut: VO.scale.at - 0.7,
  grid: VO.scale.at + 0.9,
  end: VO.end.at - 0.7,
  total: TOTAL_SECONDS,
}

/** Beats in the shape the capture scripts and caption builder expect. */
export const BEATS = (lines as { id: BeatId; vo: string }[]).map((line, i, all) => {
  const startF = Math.round((i === 0 ? 0 : VO[all[i - 1].id].end) * FPS)
  const endF = Math.round((i === all.length - 1 ? TOTAL_SECONDS : VO[line.id].end) * FPS)
  return {
    id: line.id,
    start: startF,
    dur: endF - startF,
    voAt: VO[line.id].at - startF / FPS,
    voDur: voDur[line.id],
    text: line.vo,
  }
})
