import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { buildMetadata } from '@/lib/seo'
import styles from './theme.module.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = buildMetadata({
  title: 'Outhad Mark',
  description:
    'The O-monogram logo for Outhad AI — specimens on both grounds, a true-size ladder, construction spec, and the two alternates considered.',
  path: '/theme',
  noIndex: true,
})

const RING =
  'M27 20 A7 7 0 0 1 20 27 L12 27 A7 7 0 0 1 5 20 L5 12 A7 7 0 0 1 12 5 L20 5 A7 7 0 0 1 27 12'

type MarkProps = {
  size: number
  stroke?: string
  label?: string
}

/** The mark itself. `stroke` defaults to currentColor so lockups can tint it. */
function Mark({ size, stroke = 'currentColor', label }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path d={RING} fill="none" stroke={stroke} strokeWidth="4.2" />
      <rect x="24.9" y="11.6" width="4.2" height="8.8" fill="#C87941" />
    </svg>
  )
}

/** Favicon variant: the mark inset into a solid warm-black tile. */
function FaviconTile({ size, label }: { size: number; label?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <rect width="32" height="32" rx="7" fill="#1A1410" />
      <g transform="translate(3.8 3.8) scale(0.763)">
        <path d={RING} fill="none" stroke="#FDF0E0" strokeWidth="4.2" />
        <rect x="24.9" y="11.6" width="4.2" height="8.8" fill="#C87941" />
      </g>
    </svg>
  )
}

function GridAlt({ size, label }: { size: number; label?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <rect x="4" y="4" width="11" height="11" rx="2" fill="#1A1410" />
      <rect x="17" y="4" width="11" height="11" rx="2" fill="#C87941" />
      <rect x="4" y="17" width="11" height="11" rx="2" fill="#1A1410" />
      <rect x="17" y="17" width="11" height="11" rx="2" fill="#1A1410" />
    </svg>
  )
}

function SessionAlt({ size, label }: { size: number; label?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <rect x="5.7" y="5.7" width="20.6" height="20.6" rx="6" fill="none" stroke="#1A1410" strokeWidth="3.4" />
      <rect x="18.3" y="11" width="3.4" height="10" rx="1.7" fill="#C87941" />
    </svg>
  )
}

const ladder = [
  { size: 16, use: 'favicon' },
  { size: 20, use: 'inline' },
  { size: 26, use: 'header, mobile' },
  { size: 28, use: 'header' },
  { size: 48, use: 'social avatar' },
]

const construction = [
  ['Canvas', '32 × 32'],
  ['Ring path', '22 × 22, inset 5'],
  ['Corner radius', '7'],
  ['Stroke weight', '4.2'],
  ['Live segment', '4.2 × 8.8'],
  ['Join overlap', '0.4 each end'],
  ['Optical bounds', '2.9 → 29.1'],
  ['Minimum size', '16px'],
  ['Clear space', '≥ 4 units all sides'],
]

export default function ThemePage() {
  return (
    <div className={`${styles.sheet} ${jetbrainsMono.variable}`}>
      {/* Masthead */}
      <header className={styles.masthead}>
        <div className={styles.lockup}>
          <Mark size={34} />
          <span className={styles.wordmark}>
            <span className={styles.name}>Outhad</span>
            <span className={styles.sub}>AI Research Lab</span>
          </span>
        </div>

        <h1 className={styles.title}>An O whose live segment is copper.</h1>
        <p className={styles.lede}>
          The mark is a squared ring — the O of Outhad, and a closed loop. One segment of that loop is copper:
          the moment something is decided. It keeps the corner radius and stroke weight of the previous
          Convertive mark, so the two read as relatives, but drops the illustration for a single accent.
        </p>
      </header>

      <hr className={styles.rule} />

      {/* The mark */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>The mark</p>
          <h2 className={styles.h2}>On light and on warm black</h2>
          <p className={styles.note}>
            The ring is drawn with <code className={styles.code}>currentColor</code>, so one component serves
            the off-white header and the warm-black footer. Only the copper segment is fixed.
          </p>
        </div>
        <div className={styles.heroSpecimen}>
          <div className={styles.specLight}>
            <Mark size={132} stroke="#1A1410" label="Outhad AI mark on light" />
          </div>
          <div className={styles.specDark}>
            <Mark size={132} stroke="#F5F0EB" label="Outhad AI mark on warm black" />
          </div>
        </div>
      </section>

      {/* Size ladder */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Size ladder</p>
          <h2 className={styles.h2}>Rendered at true pixel sizes</h2>
          <p className={styles.note}>
            Not scaled for display — each of these is the size it ships at. The copper segment survives to
            16px, which is where a favicon lives.
          </p>
        </div>
        <div className={`${styles.ladder} ${styles.specLight}`}>
          {ladder.map((rung) => (
            <div key={rung.size} className={styles.rung}>
              <Mark size={rung.size} stroke="#1A1410" />
              <span className={styles.px}>{rung.size}px</span>
              <span className={styles.use}>{rung.use}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Lockups */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Lockups</p>
          <h2 className={styles.h2}>How it sits with the wordmark</h2>
          <p className={styles.note}>
            Both grounds are live in the site today: the header lockup on off-white, the footer lockup on warm
            black. The favicon adds a solid tile so the mark keeps its contrast against browser chrome of
            either polarity.
          </p>
        </div>
        <div className={styles.heroSpecimen}>
          <div className={styles.specLight}>
            <div className={styles.lockup}>
              <Mark size={28} />
              <span className={styles.wordmark}>
                <span className={styles.nameSm}>Outhad</span>
                <span className={styles.sub}>AI Research Lab</span>
              </span>
            </div>
          </div>
          <div className={styles.specDark}>
            <div className={styles.lockup} style={{ color: '#F5F0EB' }}>
              <Mark size={28} />
              <span className={styles.wordmark}>
                <span className={styles.nameSm}>Outhad</span>
                <span className={styles.subOnDark}>AI Research Lab</span>
              </span>
            </div>
          </div>
          <div className={styles.specCream}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <FaviconTile size={56} label="Favicon tile" />
              <FaviconTile size={16} />
            </div>
          </div>
          <div className={styles.specLight}>
            <Mark size={56} stroke="#1A1410" label="Mark alone" />
          </div>
        </div>
      </section>

      {/* Construction */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Construction</p>
          <h2 className={styles.h2}>Drawn on a 32-unit grid</h2>
          <p className={styles.note}>
            Every value lands on a half-unit or better, so the mark stays crisp when it is scaled to any even
            pixel size. The copper segment overlaps the ring&apos;s flat ends by 0.4 units — without that
            overlap a hairline of ground shows through the join at small sizes.
          </p>
        </div>
        <div className={styles.build}>
          <div className={styles.buildFrame}>
            <svg viewBox="0 0 32 32" className={styles.buildSvg} role="img" aria-label="Construction grid">
              <g stroke="#E8DDD4" strokeWidth="0.15">
                <path d="M4 0V32M8 0V32M12 0V32M16 0V32M20 0V32M24 0V32M28 0V32" />
                <path d="M0 4H32M0 8H32M0 12H32M0 16H32M0 20H32M0 24H32M0 28H32" />
              </g>
              <rect
                x="5"
                y="5"
                width="22"
                height="22"
                rx="7"
                fill="none"
                stroke="#C87941"
                strokeWidth="0.2"
                strokeDasharray="1 1"
              />
              <path d={RING} fill="none" stroke="#1A1410" strokeWidth="4.2" />
              <rect x="24.9" y="11.6" width="4.2" height="8.8" fill="#C87941" />
            </svg>
          </div>
          <dl className={styles.spec}>
            {construction.map(([label, value]) => (
              <div key={label} style={{ display: 'contents' }}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Alternates */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Alternates</p>
          <h2 className={styles.h2}>Two others worth a look</h2>
          <p className={styles.note}>
            The monogram is what shipped. These two were the other directions that fit the homepage&apos;s
            language — say which and I will swap it in; it is one component and three files.
          </p>
        </div>
        <div className={styles.alts}>
          <div className={styles.alt}>
            <div className={styles.stage}>
              <Mark size={64} stroke="#1A1410" label="Monogram, shipped" />
              <Mark size={20} stroke="#1A1410" />
            </div>
            <h3>
              Monogram <span className={styles.tag}>Shipped</span>
            </h3>
            <p>
              The O as a closed loop with one live segment. Carries the letter, so it works as an avatar with
              no wordmark.
            </p>
          </div>

          <div className={styles.alt}>
            <div className={styles.stage}>
              <GridAlt size={64} label="Grid alternate" />
              <GridAlt size={20} />
            </div>
            <h3>Four cells</h3>
            <p>
              Mirrors the homepage&apos;s 2×2 grid, one cell live. The most legible of the three, and the most
              anonymous — it could belong to any product.
            </p>
          </div>

          <div className={styles.alt}>
            <div className={styles.stage}>
              <SessionAlt size={64} label="Session alternate" />
              <SessionAlt size={20} />
            </div>
            <h3>The session</h3>
            <p>
              A window with one decisive moment inside it. Closest to the thesis, but the interior detail
              thins out below 20px.
            </p>
          </div>
        </div>
      </section>

      {/* Shipped files */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Shipped files</p>
          <h2 className={styles.h2}>What is in the repo</h2>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>File</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.path}>components/outhad-mark.tsx</td>
                <td>
                  <span className={styles.what}>
                    Inline SVG, ring on <code className={styles.codeSm}>currentColor</code>. Used by the header
                    and footer lockups.
                  </span>
                </td>
              </tr>
              <tr>
                <td className={styles.path}>public/outhad-mark.svg</td>
                <td>
                  <span className={styles.what}>
                    Warm-black ring on transparent. Organization schema logo, blog publisher logo, Cal button
                    avatar.
                  </span>
                </td>
              </tr>
              <tr>
                <td className={styles.path}>public/outhad-mark-light.svg</td>
                <td>
                  <span className={styles.what}>Cream ring, for warm-black surfaces and dark decks.</span>
                </td>
              </tr>
              <tr>
                <td className={styles.path}>public/favicon.svg</td>
                <td>
                  <span className={styles.what}>
                    Solid tile. Browser tab, shortcut, apple-touch-icon, PWA manifest.
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className={styles.rule} />

      <footer className={styles.close}>
        <p className={styles.eyebrow}>One thing left</p>
        <p>
          Icons ship as SVG only. That covers every current browser, but a 512px PNG and a multi-size{' '}
          <span className={styles.code}>.ico</span> exported from the favicon would cover older clients and
          give PWA install prompts something richer to show. No rasteriser was available in the session, so
          those two exports are still open.
        </p>
      </footer>
    </div>
  )
}
