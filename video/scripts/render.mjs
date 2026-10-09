// Render a film to MP4 with narration (and, for films that have one, a score).
//   node scripts/render.mjs                       -> "47 seconds" film: out/convertive-demo.mp4 (+ .vtt, poster)
//   node scripts/render.mjs --film ghost          -> "Ghosts" film:     out/convertive-film.mp4 (+ .vtt, poster)
//   --clean       also render a variant without burned-in subtitles (47 seconds)
//   --captioned   also render a variant with burned-in subtitles (Ghosts)
//   --no-music    narration only (Ghosts)
//   --publish     copy the web MP4 (CRF 25), VTT and poster to ../public/videos/
import { spawn } from 'node:child_process'
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { build, OUT, ROOT } from './build.mjs'
import { openFilm } from './capture.mjs'

const argv = process.argv.slice(2)
const args = new Set(argv)
const filmId = argv.includes('--film') ? argv[argv.indexOf('--film') + 1] : 'forty-seven'
const NAME = filmId === 'ghost' ? 'convertive-film' : 'convertive-demo'
const VO_DIR = filmId === 'ghost' ? path.join(ROOT, 'public/vo/ghost') : path.join(ROOT, 'public/vo')
const PYTHON = process.env.PYTHON || 'python3'

function run(cmd, list) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, list, { stdio: ['ignore', 'inherit', 'pipe'] })
    let err = ''
    child.stderr.on('data', (d) => (err += d))
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}\n${err.slice(-2000)}`))))
  })
}

async function renderVideo(film, frame, file, opts) {
  const ffmpeg = spawn('ffmpeg', [
    '-y', '-f', 'image2pipe', '-framerate', String(film.fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-tune', 'animation',
    '-movflags', '+faststart', file,
  ], { stdio: ['pipe', 'ignore', 'pipe'] })
  let err = ''
  ffmpeg.stderr.on('data', (d) => (err += d))
  const done = new Promise((resolve, reject) => ffmpeg.on('close', (c) => (c === 0 ? resolve() : reject(new Error(err.slice(-2000))))))
  const started = Date.now()
  for (let f = 0; f < film.total; f++) {
    const jpg = await frame(f, opts)
    if (!ffmpeg.stdin.write(jpg)) await new Promise((r) => ffmpeg.stdin.once('drain', r))
    if (f % 150 === 0) process.stdout.write(`\r  frame ${f}/${film.total}  (${((f + 1) / ((Date.now() - started) / 1000)).toFixed(1)} fps)   `)
  }
  ffmpeg.stdin.end()
  await done
  process.stdout.write('\n')
}

/** Place each narration line at its beat's narration start and normalise loudness. */
async function mixVoiceover(film, file) {
  const inputs = []
  const filters = []
  film.scenes.forEach((scene, i) => {
    inputs.push('-i', path.join(VO_DIR, `${scene.id}.wav`))
    const ms = Math.round((scene.start / film.fps + scene.voAt) * 1000)
    filters.push(`[${i}:a]aresample=48000,adelay=${ms}|${ms}[a${i}]`)
  })
  const total = (film.total / film.fps).toFixed(3)
  filters.push(`${film.scenes.map((_, i) => `[a${i}]`).join('')}amix=inputs=${film.scenes.length}:normalize=0,apad=whole_dur=${total},atrim=0:${total},loudnorm=I=-16:LRA=11:TP=-1.5,aformat=channel_layouts=stereo[out]`)
  await run('ffmpeg', ['-v', 'error', '-y', ...inputs, '-filter_complex', filters.join(';'), '-map', '[out]', '-ar', '48000', file])
}

/** Synthesise the score from the film's timing, then duck it under the narration. */
async function mixWithScore(film, voFile, file) {
  const cues = path.join(OUT, `${filmId}-cues.json`)
  const score = path.join(OUT, `${filmId}-score.wav`)
  await writeFile(cues, JSON.stringify({ ...film.score, total: film.total / film.fps }, null, 2))
  await run(PYTHON, [path.join(ROOT, 'script/score.py'), cues, score])
  await run('ffmpeg', [
    '-v', 'error', '-y', '-i', voFile, '-i', score, '-filter_complex',
    // loudnorm resamples to 192 kHz internally; bring everything back to 48 kHz before
    // ducking, or sidechaincompress ends early and drops the score's final chord.
    '[1:a]loudnorm=I=-23:LRA=9:TP=-3,aresample=48000[music];[0:a]aresample=48000,asplit[vo][key];' +
      '[music][key]sidechaincompress=threshold=0.02:ratio=5:attack=20:release=420:makeup=1[ducked];' +
      '[vo][ducked]amix=inputs=2:duration=longest:normalize=0,loudnorm=I=-16:LRA=11:TP=-1.5,aresample=48000[out]',
    '-map', '[out]', '-ar', '48000', file,
  ])
}

await mkdir(OUT, { recursive: true })
await build()
const { film, frame, close } = await openFilm({ film: filmId })
console.log(`Rendering "${filmId}": ${film.total} frames (${(film.total / film.fps).toFixed(1)}s at ${film.fps} fps)`)

const voOnly = path.join(OUT, `${filmId === 'ghost' ? 'ghost-vo' : 'vo-mix'}.wav`)
await mixVoiceover(film, voOnly)
let audio = voOnly
if (film.score && !args.has('--no-music')) {
  audio = path.join(OUT, 'ghost-mix.wav')
  await mixWithScore(film, voOnly, audio)
}

const variants = [{ name: NAME, subtitles: film.subtitles }]
if (args.has('--clean')) variants.push({ name: `${NAME}-clean`, subtitles: false })
if (args.has('--captioned')) variants.push({ name: `${NAME}-captioned`, subtitles: true })

for (const variant of variants) {
  console.log(`Video: ${variant.name}`)
  const silent = path.join(OUT, `${variant.name}-silent.mp4`)
  await renderVideo(film, frame, silent, { subtitles: variant.subtitles })
  await run('ffmpeg', ['-v', 'error', '-y', '-i', silent, '-i', audio, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', path.join(OUT, `${variant.name}.mp4`)])
  await rm(silent)
}

// Lighter encode for the website; the CRF 20 master is kept for uploads to social platforms.
await run('ffmpeg', ['-v', 'error', '-y', '-i', path.join(OUT, `${NAME}.mp4`), '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-tune', 'animation', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', path.join(OUT, `${NAME}-web.mp4`)])

await writeFile(path.join(OUT, `${NAME}.vtt`), film.vtt)
// Poster: the money moment.
const posterSec = filmId === 'ghost' ? film.score.T.money + 1.4 : (() => {
  const convert = film.scenes.find((s) => s.id === 'convert')
  return (convert.start + convert.dur * 0.7) / film.fps
})()
await writeFile(path.join(OUT, `${NAME}-poster.jpg`), await frame(Math.round(posterSec * film.fps), { subtitles: false }))
await close()

if (args.has('--publish')) {
  const dest = path.resolve(ROOT, '../public/videos')
  await copyFile(path.join(OUT, `${NAME}-web.mp4`), path.join(dest, `${NAME}.mp4`))
  for (const file of [`${NAME}.vtt`, `${NAME}-poster.jpg`]) await copyFile(path.join(OUT, file), path.join(dest, file))
  console.log(`Published to ${path.relative(process.cwd(), dest)}`)
}

const size = (await readFile(path.join(OUT, `${NAME}.mp4`))).length
console.log(`Done: out/${NAME}.mp4 (${(size / 1024 / 1024).toFixed(1)} MB)`)
