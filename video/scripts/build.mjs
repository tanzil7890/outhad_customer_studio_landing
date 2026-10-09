import { build as esbuild } from 'esbuild'
import { execFileSync } from 'node:child_process'
import { access, cp, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const BUILD = path.join(ROOT, '.build')
export const OUT = path.join(ROOT, 'out')

/** Bundle the film into .build/ as a static page (index.html + bundle.js + assets). */
export async function build() {
  await mkdir(BUILD, { recursive: true })
  await esbuild({
    entryPoints: [path.join(ROOT, 'src/main.tsx')],
    bundle: true,
    outfile: path.join(BUILD, 'bundle.js'),
    format: 'iife',
    jsx: 'automatic',
    target: 'chrome120',
    define: { 'process.env.NODE_ENV': '"production"' },
    minify: true,
    logLevel: 'warning',
  })
  await cp(path.join(ROOT, 'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2'), path.join(BUILD, 'manrope.woff2'))
  await cp(path.join(ROOT, 'public/logo-mark.png'), path.join(BUILD, 'logo-mark.png'))
  await cp(path.join(OUT, 'vo-mix.wav'), path.join(BUILD, 'vo-mix.wav')).catch(() => {})
  await cp(path.join(OUT, 'ghost-mix.wav'), path.join(BUILD, 'ghost-mix.wav')).catch(() => {})
  // Static film-grain texture (offset per frame in the film for animated grain).
  const noise = path.join(BUILD, 'noise.png')
  await access(noise).catch(() =>
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', 'nullsrc=s=256x256,geq=lum=random(1)*255:cb=128:cr=128', '-frames:v', '1', '-pix_fmt', 'gray', noise]),
  )
  await writeFile(
    path.join(BUILD, 'index.html'),
    `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Convertive demo film</title>
<style>
@font-face { font-family: 'Manrope Variable'; src: url(manrope.woff2) format('woff2'); font-weight: 200 800; font-display: block; }
html, body { margin: 0; background: #1A1410; }
* { box-sizing: border-box; }
</style>
</head>
<body>
<div id="root"></div>
<script src="bundle.js"></script>
</body>
</html>
`,
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await build()
  console.log(`Built ${path.relative(process.cwd(), BUILD)}/index.html`)
}
