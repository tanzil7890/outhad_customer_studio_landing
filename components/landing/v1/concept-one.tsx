import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CASE_STUDIES,
  CUSTOMER_LOGOS,
  FAQS,
  FINAL,
  HERO,
  INTEGRATIONS,
  PLATFORM,
  PROOF,
  ROI,
  TESTIMONIALS,
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
import HeroTheater from './hero-theater'
import MethodSteps from './method-steps'
import ProblemDots from './problem-dots'
import SpeedRace from './speed-race'

/** Concept 1 — "Live session theater": show the product working in the first screen. */
export default function ConceptOne() {
  return (
    <div className="bg-surface-canvas text-ink">
      {/* Hero */}
      <section className="relative overflow-x-clip pb-16 pt-32 sm:pt-36 lg:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(60%_60%_at_70%_0%,rgb(var(--c-copper-100))_0%,transparent_70%)]"
        />
        <div className={cn(container, 'relative')}>
          <p className="mb-6 animate-fade-up text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted motion-reduce:animate-none">
            {HERO.eyebrow}
          </p>
          <LineReveal
            lines={HERO.lines}
            className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[5.5rem]"
          />
          <div
            className="mt-8 grid animate-fade-up gap-7 motion-reduce:animate-none lg:mt-10 lg:grid-cols-12 lg:items-center lg:gap-12"
            style={{ animationDelay: '0.25s' }}
          >
            <p className="text-lg leading-relaxed text-ink-secondary lg:col-span-7 lg:text-xl">{HERO.lede}</p>
            <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
              <BookDemoButton location="hero" />
              <a
                href={HERO.secondaryCta.href}
                className="group inline-flex h-12 min-h-0 min-w-0 items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-ink ring-1 ring-line-strong transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                {HERO.secondaryCta.label}
                <ArrowDown aria-hidden className="h-4 w-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none" />
              </a>
            </div>
          </div>
          <div className="mt-12 lg:mt-16">
            <HeroTheater />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-line bg-surface-base py-12">
        <div className={cn(container, 'space-y-10')}>
          <TrustRow />
          <LogoStrip logos={CUSTOMER_LOGOS} />
        </div>
      </section>

      <ProblemDots />
      <SpeedRace />
      <MethodSteps />

      {/* Platform + integrations */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className={container}>
          <SectionHeading eyebrow={PLATFORM.eyebrow} lines={PLATFORM.lines} lede={PLATFORM.lede} />
          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <ul className="divide-y divide-line border-y border-line">
              {PLATFORM.modules.map((module) => (
                <li key={module.href}>
                  <Link
                    href={module.href}
                    className="group flex min-h-0 min-w-0 items-start justify-between gap-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    <span>
                      <span className="block text-lg font-semibold text-ink">{module.title}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-ink-secondary">{module.description}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="mt-1 h-5 w-5 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink motion-reduce:transition-none"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Reveal>
              <VideoFacade />
            </Reveal>
          </div>

          <div className="mt-24 grid gap-10 lg:grid-cols-2 lg:items-end">
            <SectionHeading eyebrow={INTEGRATIONS.eyebrow} lines={INTEGRATIONS.lines} />
            <p className="text-lg leading-relaxed text-ink-secondary">{INTEGRATIONS.lede}</p>
          </div>
          <Marquee label="Integrations" className="mt-10">
            {INTEGRATIONS.items.map((item) => (
              <span
                key={item}
                className="mr-3 inline-flex h-14 items-center rounded-full bg-surface-base px-6 text-base font-semibold text-ink-secondary ring-1 ring-line"
              >
                {item}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-surface-warm py-24 sm:py-32">
        <div className={container}>
          <SectionHeading eyebrow={PROOF.eyebrow} lines={PROOF.lines} lede={PROOF.lede} />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {CASE_STUDIES.map((study, i) => (
              <Reveal key={study.company} delay={i * 0.08}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-5">
            <TestimonialCard testimonial={TESTIMONIALS[0]} />
          </Reveal>
        </div>
      </section>

      {/* ROI */}
      <section id="roi" className="scroll-mt-24 py-24 sm:py-32">
        <div className={container}>
          <SectionHeading eyebrow={ROI.eyebrow} lines={ROI.lines} lede={ROI.lede} />
          <RoiCalculator className="mt-14" />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className={cn(container, 'grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]')}>
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="Questions" lines={['What buyers ask first.']} />
          </div>
          <FaqList faqs={FAQS} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-night py-24 text-night-text sm:py-32">
        <div className={cn(container, 'flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between')}>
          <div className="max-w-3xl">
            <SectionHeading tone="dark" lines={FINAL.lines} />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-night-soft">{FINAL.lede}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <BookDemoButton location="final-cta" variant="onDark" size="xl" />
            <a
              href="#roi"
              className="inline-flex h-14 min-h-0 min-w-0 items-center rounded-full px-7 text-base font-semibold text-night-text ring-1 ring-night-line transition-colors hover:bg-night-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
            >
              Run the numbers
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
