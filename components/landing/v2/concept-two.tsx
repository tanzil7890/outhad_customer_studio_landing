import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CASE_STUDIES,
  CONTRAST,
  CUSTOMER_LOGOS,
  FAQS,
  FINAL,
  GHOSTS,
  HERO,
  INTEGRATIONS,
  METHOD,
  PLATFORM,
  PROBLEM,
  PROOF,
  ROI,
  TESTIMONIALS,
  VIDEO,
  WINDOW,
} from '@/lib/landing/content'
import BookDemoButton from '../shared/book-demo-button'
import CaseStudyCard from '../shared/case-study-card'
import FaqList from '../shared/faq-list'
import LineReveal from '../shared/line-reveal'
import LogoStrip from '../shared/logo-strip'
import Marquee from '../shared/marquee'
import { Reveal } from '../shared/reveal'
import RoiCalculator from '../shared/roi-calculator'
import SectionHeading from '../shared/section-heading'
import TestimonialCard from '../shared/testimonial-card'
import TrustRow from '../shared/trust-row'
import VideoFacade from '../shared/video-facade'
import { container } from '../shared/layout'
import GhostFloor from './ghost-floor'
import GhostStory from './ghost-story'
import GhostWindow from './ghost-window'
import SessionGrid from './session-grid'

const CURSOR = 'M0 0 L0 16 L4.4 12.2 L7.4 18.4 L10 17.2 L7.1 11.2 L12.4 11.2 Z'

/** Small line drawings for Detect / Decide / Deliver / Capture, in the ghost language. */
function MethodGlyph({ step }: { step: (typeof METHOD.steps)[number]['key'] }) {
  const stroke = 'rgb(var(--c-night-soft))'
  const strong = 'rgb(var(--c-night-text))'
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-auto" aria-hidden fill="none">
      {step === 'detect' && (
        <>
          {[14, 24, 34].map((r) => (
            <circle key={r} cx="40" cy="32" r={r} stroke={stroke} strokeOpacity={0.9 - r / 50} strokeDasharray="2 4" />
          ))}
          <path d={CURSOR} transform="translate(36 24) scale(0.9)" fill={stroke} fillOpacity="0.6" />
          <path d="M70 18 h40 M70 32 h30 M70 46 h36" stroke={stroke} strokeLinecap="round" strokeOpacity="0.6" />
        </>
      )}
      {step === 'decide' && (
        <>
          <path d={CURSOR} transform="translate(6 24) scale(0.9)" fill={stroke} fillOpacity="0.6" />
          <path d="M22 32 C 50 32, 60 10, 96 10" stroke={strong} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M22 32 C 50 32, 60 32, 96 32" stroke={stroke} strokeOpacity="0.5" strokeLinecap="round" />
          <path d="M22 32 C 50 32, 60 54, 96 54" stroke={stroke} strokeOpacity="0.5" strokeLinecap="round" />
          <circle cx="100" cy="10" r="4" fill={strong} />
          <circle cx="100" cy="32" r="3" stroke={stroke} strokeOpacity="0.6" />
          <circle cx="100" cy="54" r="3" stroke={stroke} strokeOpacity="0.6" />
        </>
      )}
      {step === 'deliver' && (
        <>
          <rect x="18" y="6" width="70" height="52" rx="8" stroke={stroke} strokeOpacity="0.7" />
          <path d="M28 20 h40 M28 30 h28" stroke={strong} strokeLinecap="round" strokeWidth="2" />
          <rect x="28" y="40" width="50" height="10" rx="5" fill={strong} />
          <path d={CURSOR} transform="translate(80 36) scale(0.9)" fill={stroke} fillOpacity="0.6" />
        </>
      )}
      {step === 'capture' && (
        <>
          <path d={CURSOR} transform="translate(10 18) scale(1.1)" fill={strong} stroke="rgb(var(--c-night))" strokeWidth="0.8" />
          <rect x="34" y="34" width="76" height="20" rx="10" stroke={strong} />
          <path d="M44 44 h44" stroke={strong} strokeLinecap="round" strokeWidth="2" />
        </>
      )}
    </svg>
  )
}

/** Concept 2: "Ghosts". Anonymous shoppers are ghosts; the page lets you read one, catch one, and follow one. */
export default function ConceptTwo() {
  return (
    <div data-page-tone="dark" className="bg-night text-night-text">
      {/* Hero: the ghost floor */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <GhostFloor controlsClassName="inset-x-0 bottom-8 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(52%_62%_at_18%_46%,rgb(var(--c-night)/0.92)_30%,transparent_78%)]"
        />
        <div className={cn(container, 'pointer-events-none relative flex min-h-[100svh] flex-col justify-center pb-32 pt-32')}>
          <div className="pointer-events-auto max-w-2xl">
            <p className="mb-6 animate-fade-up text-xs font-semibold uppercase tracking-[0.18em] text-night-muted motion-reduce:animate-none">
              {HERO.eyebrow}
            </p>
            <LineReveal
              lines={GHOSTS.hero.lines}
              className="text-[2.75rem] font-semibold leading-[1] tracking-[-0.035em] text-night-text sm:text-7xl lg:text-[5.2rem]"
            />
            <div className="animate-fade-up motion-reduce:animate-none" style={{ animationDelay: '0.3s' }}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-night-soft lg:text-xl">{GHOSTS.hero.lede}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <BookDemoButton location="hero" variant="onDark" />
                <a
                  href="#session"
                  className="group inline-flex h-12 min-h-0 min-w-0 items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-night-text ring-1 ring-night-line transition-colors hover:bg-night-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
                >
                  Follow one ghost
                  <ArrowDown aria-hidden className="h-4 w-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-night-line py-12">
        <div className={cn(container, 'space-y-10')}>
          <TrustRow tone="dark" />
          <LogoStrip logos={CUSTOMER_LOGOS} tone="dark" />
        </div>
      </section>

      {/* The problem */}
      <section className="py-28 sm:py-36">
        <div className={cn(container, 'grid gap-12 lg:grid-cols-12 lg:items-end')}>
          <div className="lg:col-span-7">
            <SectionHeading tone="dark" eyebrow={PROBLEM.eyebrow} lines={PROBLEM.lines} />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-night-soft">{PROBLEM.body}</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-7xl font-extrabold tracking-tight text-night-text sm:text-8xl">{PROBLEM.stat.display}</p>
            <p className="mt-3 text-lg text-night-soft">{PROBLEM.stat.label}. Most of them leave like ghosts.</p>
          </div>
        </div>
      </section>

      {/* One take: follow one ghost */}
      <GhostStory />

      {/* Every session */}
      <section className="border-t border-night-line py-28 sm:py-36">
        <div className={container}>
          <SectionHeading tone="dark" eyebrow={GHOSTS.grid.eyebrow} lines={GHOSTS.grid.lines} lede={GHOSTS.grid.lede} />
          <div className="mt-14">
            <SessionGrid />
          </div>
        </div>
      </section>

      {/* The window, in real time */}
      <section className="border-t border-night-line py-28 sm:py-36">
        <div className={container}>
          <SectionHeading tone="dark" eyebrow={GHOSTS.window.eyebrow} lines={GHOSTS.window.lines} lede={GHOSTS.window.lede} />
          <div className="mt-14">
            <GhostWindow />
          </div>
          <p className="mt-4 text-[13px] text-night-muted">Bounce-window and batch-latency figures are industry ranges; the 2:00 am sync is illustrative.</p>

          <div className="mt-24 grid gap-px overflow-hidden rounded-3xl bg-night-line md:grid-cols-2">
            {CONTRAST.columns.map((column, i) => (
              <div key={column.title} className={cn('p-8 sm:p-12', i === 0 ? 'bg-night' : 'bg-night-raised')}>
                <p className={cn('text-4xl font-semibold tracking-tight', i === 0 ? 'text-night-muted' : 'text-night-text')}>{column.title}</p>
                <p className="mt-1 text-lg text-night-soft">{column.subtitle}</p>
                <ul className="mt-8 space-y-4">
                  {column.points.map((point) => (
                    <li key={point} className={cn('border-t border-night-line pt-4 text-base leading-relaxed', i === 0 ? 'text-night-soft' : 'text-night-text')}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <blockquote className="mt-20 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-night-text sm:text-4xl">“{WINDOW.quote}”</blockquote>
        </div>
      </section>

      {/* Method */}
      <section className="border-t border-night-line py-28 sm:py-36">
        <div className={container}>
          <SectionHeading tone="dark" eyebrow={GHOSTS.method.eyebrow} lines={GHOSTS.method.lines} lede={GHOSTS.method.lede} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-night-line sm:grid-cols-2 lg:grid-cols-4">
            {METHOD.steps.map((step, i) => (
              <li key={step.key} className="flex flex-col bg-night-raised p-7">
                <Reveal delay={i * 0.06}>
                  <MethodGlyph step={step.key} />
                  <p className="mt-8 font-mono text-sm tabular-nums text-night-muted">0{i + 1}</p>
                  <p className="mt-1 text-2xl font-semibold text-night-text">{step.title}</p>
                  <p className="mt-3 text-base leading-relaxed text-night-soft">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Platform + integrations */}
      <section className="border-t border-night-line py-28 sm:py-36">
        <div className={container}>
          <SectionHeading tone="dark" eyebrow={GHOSTS.machinery.eyebrow} lines={GHOSTS.machinery.lines} lede={PLATFORM.lede} />
          <ul className="mt-14 grid gap-4 md:grid-cols-6">
            {PLATFORM.modules.map((module, i) => (
              <li key={module.href} className={i < 3 ? 'md:col-span-2' : 'md:col-span-3'}>
                <Link
                  href={module.href}
                  className="group flex h-full min-h-[13rem] min-w-0 flex-col justify-between rounded-3xl bg-night-raised p-7 ring-1 ring-night-line transition-colors hover:bg-night-line/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
                >
                  <span className="flex items-center justify-between font-mono text-sm tabular-nums text-night-muted">
                    0{i + 1}
                    <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                  </span>
                  <span>
                    <span className="block text-2xl font-semibold text-night-text">{module.title}</span>
                    <span className="mt-2 block text-base leading-relaxed text-night-soft">{module.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-20 grid gap-6 lg:grid-cols-2 lg:items-end">
            <p className="text-3xl font-semibold leading-tight tracking-tight text-night-text">
              {INTEGRATIONS.lines[0]} <span className="text-night-soft">{INTEGRATIONS.lines[1]}</span>
            </p>
            <p className="text-base leading-relaxed text-night-soft">{INTEGRATIONS.lede}</p>
          </div>
          <Marquee label="Integrations" tone="dark" duration={45} className="mt-10">
            {INTEGRATIONS.items.map((item) => (
              <span key={item} className="mr-3 inline-flex h-12 items-center rounded-full px-6 text-base font-semibold text-night-soft ring-1 ring-night-line">
                {item}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Film */}
      <section id="film" className="scroll-mt-24 border-t border-night-line py-28 sm:py-36">
        <div className={cn(container, 'grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center')}>
          <div>
            <SectionHeading tone="dark" eyebrow={GHOSTS.film.eyebrow} lines={GHOSTS.film.lines} lede={GHOSTS.film.lede} />
            <p className="mt-6 font-mono text-[13px] text-night-muted">{VIDEO.duration} · captions available</p>
          </div>
          <Reveal>
            <VideoFacade tone="dark" />
          </Reveal>
        </div>
      </section>

      {/* Proof */}
      <section className="border-t border-night-line py-28 sm:py-36">
        <div className={container}>
          <SectionHeading tone="dark" eyebrow={PROOF.eyebrow} lines={PROOF.lines} lede={PROOF.lede} />
          <Reveal className="mt-14">
            <TestimonialCard testimonial={TESTIMONIALS[0]} tone="dark" />
          </Reveal>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {CASE_STUDIES.map((study, i) => (
              <Reveal key={study.company} delay={i * 0.08}>
                <CaseStudyCard study={study} tone="dark" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section id="roi" className="scroll-mt-24 border-t border-night-line py-28 sm:py-36">
        <div className={container}>
          <SectionHeading tone="dark" eyebrow={ROI.eyebrow} lines={ROI.lines} lede={ROI.lede} />
          <RoiCalculator tone="dark" className="mt-14" />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-night-line py-28 sm:py-36">
        <div className={cn(container, 'grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]')}>
          <SectionHeading tone="dark" eyebrow="Questions" lines={['What buyers ask first.']} />
          <FaqList faqs={FAQS} tone="dark" />
        </div>
      </section>

      {/* Final CTA: the floor again, still catching ghosts */}
      <section className="relative overflow-hidden border-t border-night-line py-32 sm:py-44">
        <GhostFloor density={0.5} pages={false} interactive={false} autoCatchMs={3500} controls={false} />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_50%,rgb(var(--c-night)/0.9)_35%,transparent_80%)]" />
        <div className={cn(container, 'relative text-center')}>
          <SectionHeading tone="dark" align="center" lines={FINAL.lines} className="max-w-5xl" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-night-soft">{FINAL.lede}</p>
          <div className="mt-10 flex justify-center">
            <BookDemoButton location="final-cta" variant="onDark" size="xl" />
          </div>
        </div>
      </section>
    </div>
  )
}
