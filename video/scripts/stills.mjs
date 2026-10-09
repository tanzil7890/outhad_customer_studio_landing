// Render individual frames for review.
//   node scripts/stills.mjs 3.5 12 40.2        -> seconds
//   node scripts/stills.mjs --scene decide      -> 5 frames across one scene
//   node scripts/stills.mjs --every 2           -> one frame every 2 seconds
//   add --film ghost to review the "Ghosts" film
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { build, OUT } from './build.mjs'
import { openFilm } from './capture.mjs'

const args = process.argv.slice(2)
const filmIdx = args.indexOf('--film')
const filmId = filmIdx > -1 ? args.splice(filmIdx, 2)[1] : 'forty-seven'
await build()
const { film, frame, close } = await openFilm({ film: filmId })
const dir = path.join(OUT, 'stills')
await mkdir(dir, { recursive: true })

let frames = []
const sceneIdx = args.indexOf('--scene')
const everyIdx = args.indexOf('--every')
if (sceneIdx > -1) {
  const scene = film.scenes.find((s) => s.id === args[sceneIdx + 1])
  if (!scene) throw new Error(`Unknown scene ${args[sceneIdx + 1]}`)
  frames = [0.08, 0.3, 0.5, 0.7, 0.92].map((p) => scene.start + Math.round(scene.dur * p))
} else if (everyIdx > -1) {
  const step = Number(args[everyIdx + 1]) * film.fps
  for (let f = 0; f < film.total; f += step) frames.push(Math.round(f))
} else {
  frames = args.map((sec) => Math.round(Number(sec) * film.fps))
}

for (const f of frames) {
  const file = path.join(dir, `f${String(f).padStart(5, '0')}.jpg`)
  await writeFile(file, await frame(Math.min(f, film.total - 1)))
  console.log(`${(f / film.fps).toFixed(2)}s -> ${path.relative(process.cwd(), file)}`)
}
await close()
