import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CASE_STUDIES,
  CONTRAST,
  CUSTOMER_LOGOS,
  FAQS,
  FINAL,
  HERO,
  INTEGRATIONS,
  METHOD,
  PLATFORM,
  PROBLEM,
  PROOF,
  ROI,
  TESTIMONIALS,
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
import ParticleField from './particle-field'
import StoryChapters from './story-chapters'

const BIG_ORDER = ['bounce', 'legacy', 'convertive'] as const

/** Concept 2 — "Cinematic": warm-black, scroll-driven storytelling. */
export default function ConceptTwo() {
  return (
    <div data-page-tone="dark" className="bg-night text-night-text">
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32">
        <ParticleField />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_20%_50%,rgb(var(--c-night))_20%,transparent_75%)]"
        />
        <div className={cn(container, 'relative')}>
          <p className="mb-6 animate-fade-up text-xs font-semibold uppercase tracking-[0.18em] text-night-muted motion-reduce:animate-none">
            {HERO.eyebrow}
          </p>
          <LineReveal
            lines={HERO.lines}
            className="text-[2.75rem] font-semibold leading-[1] tracking-[-0.035em] text-night-text sm:text-7xl lg:text-[5.4rem]"
          />
          <div className="animate-fade-up motion-reduce:animate-none" style={{ animationDelay: '0.3s' }}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-night-soft lg:text-xl">{HERO.lede}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookDemoButton location="hero" variant="onDark" />
              <a
                href="#session"
                className="group inline-flex h-12 min-h-0 min-w-0 items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-night-text ring-1 ring-night-line transition-colors hover:bg-night-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
              >
                Watch the 47 seconds
                <ArrowDown aria-hidden className="h-4 w-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none" />
              </a>
            </div>
            <p className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-night-muted">
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-full bg-night-soft/70" /> Each dot is a visitor
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-full bg-night-copper" /> Caught in-session
              </span>
            </p>
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

      {/* Statement */}
      <section className="py-28 sm:py-40">
        <div className={cn(container, 'text-center')}>
          <SectionHeading tone="dark" align="center" eyebrow={PROBLEM.eyebrow} lines={PROBLEM.lines} className="max-w-5xl" />
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-night-soft">{PROBLEM.body}</p>
        </div>
      </section>

      <StoryChapters />

      {/* The window, in huge type */}
      <section className="border-t border-night-line py-28 sm:py-40">
        <div className={container}>
          <SectionHeading tone="dark" eyebrow={WINDOW.eyebrow} lines={WINDOW.lines} lede={WINDOW.lede} />
          <dl className="mt-20 space-y-16 sm:space-y-24">
            {BIG_ORDER.map((key, i) => {
              const row = WINDOW.rows.find((r) => r.key === key)!
              const convertive = key === 'convertive'
              return (
                <Reveal key={key} delay={i * 0.05} className="flex flex-col-reverse gap-3">
                    <dt className={cn('text-lg', convertive ? 'text-night-text' : 'text-night-soft')}>{row.label}</dt>
                    <dd
                      className={cn(
                        'text-[clamp(3rem,10vw,9.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]',
                        convertive ? 'text-night-text' : 'text-night-muted',
                      )}
                    >
                      {row.display}.
                    </dd>
                </Reveal>
              )
            })}
          </dl>
          <p className="mt-10 text-[13px] text-night-muted">Bounce-window and batch-latency figures are industry ranges.</p>
        </div>
      </section>

      {/* Triggers vs decisioning */}
      <section className="pb-28 sm:pb-40">
        <div className={container}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-night-muted">{CONTRAST.eyebrow}</p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-3xl bg-night-line md:grid-cols-2">
            {CONTRAST.columns.map((column, i) => (
              <div key={column.title} className={cn('p-8 sm:p-12', i === 0 ? 'bg-night' : 'bg-night-raised')}>
                <p className={cn('text-4xl font-semibold tracking-tight', i === 0 ? 'text-night-muted' : 'text-night-text')}>
                  {column.title}
                </p>
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
        </div>
      </section>

      {/* Method + platform rail */}
      <section className="border-t border-night-line py-28 sm:py-36">
        <div className={container}>
          <SectionHeading tone="dark" eyebrow={METHOD.eyebrow} lines={METHOD.lines} lede={METHOD.lede} />
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {METHOD.steps.map((step, i) => (
              <li key={step.key} className="border-t border-night-text/60 pt-6">
                <Reveal delay={i * 0.06}>
                  <p className="text-sm tabular-nums text-night-muted">0{i + 1}</p>
                  <p className="mt-2 text-2xl font-semibold text-night-text">{step.title}</p>
                  <p className="mt-3 text-base leading-relaxed text-night-soft">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-28">
            <SectionHeading tone="dark" eyebrow={PLATFORM.eyebrow} lines={PLATFORM.lines} lede={PLATFORM.lede} />
          </div>
        </div>
        <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))] [scrollbar-width:thin]">
          {PLATFORM.modules.map((module, i) => (
            <li key={module.href} className="w-[78vw] max-w-[22rem] shrink-0 snap-start">
              <Link
                href={module.href}
                className="group flex h-full min-h-[15rem] min-w-0 flex-col justify-between rounded-3xl bg-night-raised p-7 ring-1 ring-night-line transition-colors hover:bg-night-line/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
              >
                <span className="flex items-center justify-between text-sm tabular-nums text-night-muted">
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
        <div className={cn(container, 'mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center')}>
          <Reveal>
            <VideoFacade tone="dark" />
          </Reveal>
          <div>
            <p className="text-3xl font-semibold leading-tight tracking-tight text-night-text">
              {INTEGRATIONS.lines[0]} <span className="text-night-soft">{INTEGRATIONS.lines[1]}</span>
            </p>
            <p className="mt-4 text-base leading-relaxed text-night-soft">{INTEGRATIONS.lede}</p>
          </div>
        </div>
        <div className={cn(container, 'mt-12')}>
          <Marquee label="Integrations" tone="dark" duration={45}>
            {INTEGRATIONS.items.map((item) => (
              <span key={item} className="mr-3 inline-flex h-12 items-center rounded-full px-6 text-base font-semibold text-night-soft ring-1 ring-night-line">
                {item}
              </span>
            ))}
          </Marquee>
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

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-night-line py-32 sm:py-44">
        <ParticleField density={0.45} caughtRate={0.08} sink={{ x: 0.5, y: 0.82 }} controlsClassName="right-6 top-6" />
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
