import durations from '../script/vo-durations.json'
import lines from '../script/lines.json'
import { FPS } from './anim'

export type SceneId =
  | 'problem'
  | 'meet'
  | 'detect'
  | 'decide'
  | 'deliver'
  | 'convert'
  | 'without'
  | 'why'
  | 'platform'
  | 'end'

/** Seconds of picture before the narration starts (`pre`) and after it ends (`post`). */
const PADS: Record<SceneId, { pre: number; post: number }> = {
  problem: { pre: 0.6, post: 1.0 },
  meet: { pre: 0.5, post: 0.8 },
  detect: { pre: 0.4, post: 0.8 },
  decide: { pre: 0.4, post: 0.9 },
  deliver: { pre: 0.4, post: 0.9 },
  convert: { pre: 0.3, post: 1.3 },
  without: { pre: 1.0, post: 1.0 },
  why: { pre: 0.4, post: 0.9 },
  platform: { pre: 0.4, post: 0.9 },
  end: { pre: 0.5, post: 2.2 },
}

/** Frames each scene overlaps the previous one (the incoming scene fades in on top). */
export const OVERLAP = 12

export interface SceneSpec {
  id: SceneId
  /** First global frame. */
  start: number
  /** Length in frames. */
  dur: number
  /** Narration start, in seconds from the scene start. */
  voAt: number
  /** Narration length in seconds. */
  voDur: number
  text: string
}

const voDurations = durations as Record<string, number>

let cursor = 0
export const SCENES: SceneSpec[] = (lines as { id: SceneId; vo: string }[]).map((line) => {
  const pad = PADS[line.id]
  const voDur = voDurations[line.id]
  const dur = Math.round((pad.pre + voDur + pad.post) * FPS)
  const spec: SceneSpec = { id: line.id, start: cursor, dur, voAt: pad.pre, voDur, text: line.vo }
  cursor += dur - OVERLAP
  return spec
})

export const TOTAL_FRAMES = SCENES[SCENES.length - 1].start + SCENES[SCENES.length - 1].dur

export function sceneById(id: SceneId) {
  return SCENES.find((s) => s.id === id)!
}
