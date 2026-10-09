// Render the film to MP4 with narration.
//   node scripts/render.mjs                 -> out/convertive-demo.mp4 (+ .vtt, poster)
//   node scripts/render.mjs --clean         -> also out/convertive-demo-clean.mp4 (no burned-in subtitles)
//   node scripts/render.mjs --publish       -> copy results to ../public/videos/
import { spawn } from 'node:child_process'
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { build, OUT, ROOT } from './build.mjs'
import { openFilm } from './capture.mjs'

const args = new Set(process.argv.slice(2))
const NAME = 'convertive-demo'

function run(cmd, argv, { input } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, argv, { stdio: [input ? 'pipe' : 'ignore', 'ignore', 'pipe'] })
    let err = ''
    child.stderr.on('data', (d) => (err += d))
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}\n${err.slice(-2000)}`))))
    if (input) input(child.stdin)
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
    if (f % 150 === 0) {
      const rate = (f + 1) / ((Date.now() - started) / 1000)
      process.stdout.write(`\r  frame ${f}/${film.total}  (${rate.toFixed(1)} fps)   `)
    }
  }
  ffmpeg.stdin.end()
  await done
  process.stdout.write('\n')
}

/** Place each narration line at its scene's narration start, then normalise loudness. */
async function mixVoiceover(film, file) {
  const inputs = []
  const filters = []
  film.scenes.forEach((scene, i) => {
    inputs.push('-i', path.join(ROOT, 'public/vo', `${scene.id}.wav`))
    const ms = Math.round((scene.start / film.fps + scene.voAt) * 1000)
    filters.push(`[${i}:a]aresample=48000,adelay=${ms}|${ms}[a${i}]`)
  })
  const total = (film.total / film.fps).toFixed(3)
  filters.push(`${film.scenes.map((_, i) => `[a${i}]`).join('')}amix=inputs=${film.scenes.length}:normalize=0,apad=whole_dur=${total},atrim=0:${total},loudnorm=I=-16:LRA=11:TP=-1.5,aformat=channel_layouts=stereo[out]`)
  await run('ffmpeg', ['-y', ...inputs, '-filter_complex', filters.join(';'), '-map', '[out]', '-ar', '48000', file])
}

await mkdir(OUT, { recursive: true })
await build()
const { film, frame, close } = await openFilm()
console.log(`Rendering ${film.total} frames (${(film.total / film.fps).toFixed(1)}s at ${film.fps} fps)`)

const voMix = path.join(OUT, 'vo-mix.wav')
await mixVoiceover(film, voMix)

const variants = [{ name: NAME, subtitles: true }]
if (args.has('--clean')) variants.push({ name: `${NAME}-clean`, subtitles: false })

for (const variant of variants) {
  console.log(`Video: ${variant.name}`)
  const silent = path.join(OUT, `${variant.name}-silent.mp4`)
  await renderVideo(film, frame, silent, { subtitles: variant.subtitles })
  await run('ffmpeg', ['-y', '-i', silent, '-i', voMix, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', path.join(OUT, `${variant.name}.mp4`)])
  await rm(silent)
}

// Captions and poster (the order-confirmed moment with the copper total).
await writeFile(path.join(OUT, `${NAME}.vtt`), film.vtt)
const convert = film.scenes.find((s) => s.id === 'convert')
const poster = await frame(convert.start + Math.round(convert.dur * 0.7), { subtitles: false })
await writeFile(path.join(OUT, `${NAME}-poster.jpg`), poster)
await close()

if (args.has('--publish')) {
  const dest = path.resolve(ROOT, '../public/videos')
  for (const file of [`${NAME}.mp4`, `${NAME}.vtt`, `${NAME}-poster.jpg`]) {
    await copyFile(path.join(OUT, file), path.join(dest, file))
  }
  console.log(`Published to ${path.relative(process.cwd(), dest)}`)
}

const size = (await readFile(path.join(OUT, `${NAME}.mp4`))).length
console.log(`Done: out/${NAME}.mp4 (${(size / 1024 / 1024).toFixed(1)} MB)`)
