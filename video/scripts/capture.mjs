import { chromium } from 'playwright-core'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { BUILD } from './build.mjs'

const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

/** Open the built film in headless Chrome, ready for frame-by-frame capture. */
export async function openFilm({ film = 'forty-seven' } = {}) {
  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--force-color-profile=srgb', '--font-render-hinting=none', '--hide-scrollbars'],
  })
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(pathToFileURL(path.join(BUILD, 'index.html')).href + `?render=1&film=${film}`)
  await page.evaluate(async () => {
    await document.fonts.load('700 40px "Manrope Variable"')
    await document.fonts.ready
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))))
  })
  if (errors.length) throw new Error(`Film page errors:\n${errors.join('\n')}`)
  const filmInfo = await page.evaluate(() => window.FILM)

  async function frame(n, opts = {}) {
    await page.evaluate(([f, o]) => window.renderFrame(f, o), [n, opts])
    // Make sure images in newly mounted scenes have decoded before capture.
    await page.evaluate(() => Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r))))))
    return page.screenshot({ type: 'jpeg', quality: 95 })
  }

  return { page, film: filmInfo, frame, errors, close: () => browser.close() }
}
