import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import {
  CASE_STUDIES,
  CUSTOMER_LOGOS,
  FAQS,
  FINAL,
  HERO,
  INTEGRATIONS,
  MIRROR,
  PLATFORM,
  PROBLEM,
  PROOF,
  ROI,
  TESTIMONIALS,
  WINDOW,
} from '@/lib/landing/content'
import { STORY } from '@/lib/landing/story'
import BookDemoButton from '../shared/book-demo-button'
import CaseStudyCard from '../shared/case-study-card'
import FaqList from '../shared/faq-list'
import LineReveal from '../shared/line-reveal'
import LogoStrip from '../shared/logo-strip'
import Marquee from '../shared/marquee'
import { Reveal } from '../shared/reveal'
import RoiCalculator from '../shared/roi-calculator'
import SectionHeading from '../shared/section-heading'
import StoryTranscript from '../shared/story-transcript'
import TestimonialCard from '../shared/testimonial-card'
import TrustRow from '../shared/trust-row'
import VideoFacade from '../shared/video-facade'
import { container } from '../shared/layout'
import Dossier from './dossier'
import FreezeDialog from './freeze-dialog'
import LensOverlay from './lens-overlay'
import LiveMethod from './live-method'
import LivePlatform from './live-platform'
import LiveWindow from './live-window'
import { FinalHeading, HeroLede, KnownSentence, LeaveButton, TrailStrip } from './live-copy'
import SessionPill from './session-pill'
import SessionProvider from './session-provider'
import SessionStrip from './session-strip'
import SignalCapture from './signal-capture'
import { ReadTag } from './ui'

/** A section the reader tracks: it counts as read after a few seconds in view. */
function Tracked({ id, label, className, children }: { id: string; label: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} data-read-id={id} data-read-label={label} className={cn('scroll-mt-24', className)}>
      {children}
    </section>
  )
}

/** Concept 3: "Mirror". The page reads the visitor's own anonymous session and explains Convertive with it. */
export default function ConceptThree() {
  return (
    <SessionProvider>
      <div className="bg-surface-warm text-ink">
        {/* Hero */}
        <Tracked id="top" label="Right now, you’re anonymous" className="relative overflow-x-clip pb-20 pt-32 sm:pt-36 lg:pb-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(var(--c-ink)/0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(75%_65%_at_60%_35%,black,transparent)]"
          />
          <div className={cn(container, 'relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10')}>
            <div className="lg:col-span-7">
              <p className="mb-6 animate-fade-up text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted motion-reduce:animate-none">
                {HERO.eyebrow}
              </p>
              <LineReveal
                lines={MIRROR.hero.lines}
                className="text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]"
              />
              <div className="animate-fade-up motion-reduce:animate-none" style={{ animationDelay: '0.25s' }}>
                <HeroLede className="mt-8 max-w-xl text-lg leading-relaxed text-ink-secondary lg:text-xl" />
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <BookDemoButton location="hero" />
                  <LeaveButton />
                </div>
                <p className="mt-6 hidden text-[13px] text-ink-muted lg:block">Or just move your cursor toward the tab bar.</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Dossier />
            </div>
          </div>
        </Tracked>

        {/* Trust */}
        <section className="border-y border-line bg-surface-base py-12">
          <div className={cn(container, 'space-y-10')}>
            <TrustRow />
            <LogoStrip logos={CUSTOMER_LOGOS} />
          </div>
        </section>

        {/* What we know without your name */}
        <Tracked id="known" label="What we know" className="py-24 sm:py-32">
          <div className={container}>
            <SectionHeading eyebrow={MIRROR.known.eyebrow} lines={MIRROR.known.lines} badge={<ReadTag id="known" />} />
            <KnownSentence className="mt-10 max-w-5xl text-2xl font-semibold leading-[1.6] tracking-tight text-ink-secondary sm:text-[2rem]" />
            <TrailStrip className="mt-12" />
            <div className="mt-20 grid gap-12 border-t border-line pt-14 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h3 className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                  {PROBLEM.lines[0]} <span className="text-ink-secondary">{PROBLEM.lines[1]}</span>
                </h3>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-secondary">{PROBLEM.body}</p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="text-6xl font-extrabold tracking-tight text-ink">{PROBLEM.stat.display}</p>
                <p className="mt-2 text-lg text-ink-secondary">{PROBLEM.stat.label}</p>
                <p className="mt-6 border-t border-line pt-6 text-base leading-relaxed text-ink-secondary">{MIRROR.known.bridge}</p>
              </div>
            </div>
          </div>
        </Tracked>

        {/* The window, measured on you */}
        <Tracked id="window" label="The window" className="border-y border-line bg-surface-base py-24 sm:py-32">
          <div className={container}>
            <SectionHeading eyebrow={MIRROR.window.eyebrow} lines={MIRROR.window.lines} lede={MIRROR.window.lede} badge={<ReadTag id="window" />} />
            <div className="mt-16">
              <LiveWindow />
            </div>
            <blockquote className="mt-20 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              “{WINDOW.quote}”
            </blockquote>
          </div>
        </Tracked>

        {/* How it works, on you */}
        <Tracked id="method" label="How it works" className="py-24 sm:py-32">
          <div className={container}>
            <SectionHeading eyebrow={MIRROR.method.eyebrow} lines={MIRROR.method.lines} lede={MIRROR.method.lede} badge={<ReadTag id="method" />} />
            <div className="mt-10">
              <LiveMethod />
            </div>
          </div>
        </Tracked>

        {/* From you to Sarah */}
        <Tracked id="sarah" label="Sarah’s session" className="border-y border-line bg-surface-base py-24 sm:py-32">
          <div className={container}>
            <StoryTranscript timeline={STORY.timelines.with} title="Sarah’s session with Convertive" />
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
              <SectionHeading eyebrow={MIRROR.sarah.eyebrow} lines={MIRROR.sarah.lines} badge={<ReadTag id="sarah" />} />
              <p className="text-lg leading-relaxed text-ink-secondary">{MIRROR.sarah.lede}</p>
            </div>
            <div aria-hidden className="mt-14">
              <SessionStrip />
            </div>
            <Reveal className="mt-16">
              <SignalCapture kind="film" id="film" className="scroll-mt-28">
                <VideoFacade />
              </SignalCapture>
            </Reveal>
          </div>
        </Tracked>

        {/* Platform + integrations */}
        <Tracked id="platform" label="The platform" className="py-24 sm:py-32">
          <div className={container}>
            <SectionHeading eyebrow={PLATFORM.eyebrow} lines={PLATFORM.lines} lede={MIRROR.platform.lede} badge={<ReadTag id="platform" />} />
            <div className="mt-14">
              <LivePlatform />
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
        </Tracked>

        {/* Proof */}
        <Tracked id="proof" label="Evidence" className="border-y border-line bg-surface-base py-24 sm:py-32">
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
        </Tracked>

        {/* ROI */}
        <Tracked id="roi" label="The arithmetic" className="py-24 sm:py-32">
          <div className={container}>
            <SectionHeading eyebrow={ROI.eyebrow} lines={ROI.lines} lede={ROI.lede} badge={<ReadTag id="roi" />} />
            <SignalCapture kind="roi" className="mt-14">
              <RoiCalculator />
            </SignalCapture>
          </div>
        </Tracked>

        {/* FAQ */}
        <Tracked id="faq" label="Questions" className="border-t border-line py-24 sm:py-32">
          <div className={cn(container, 'grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]')}>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading eyebrow="Questions" lines={['What buyers ask first.']} />
            </div>
            <SignalCapture kind="faq">
              <FaqList faqs={FAQS} />
            </SignalCapture>
          </div>
        </Tracked>

        {/* Final CTA */}
        <section data-lens-tone="dark" className="bg-night py-24 text-night-text sm:py-32">
          <div className={cn(container, 'flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between')}>
            <div className="max-w-3xl">
              <FinalHeading className="text-3xl font-semibold leading-[1.08] tracking-tight text-night-text sm:text-4xl lg:text-5xl" />
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-night-soft">{FINAL.lede}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <BookDemoButton location="final-cta" variant="onDark" size="xl" />
              <LeaveButton tone="dark" className="h-14 px-7 text-base" />
            </div>
          </div>
        </section>
      </div>

      <LensOverlay />
      <FreezeDialog />
      <SessionPill />
    </SessionProvider>
  )
}
