import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  CASE_STUDIES,
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
  SESSION,
  TESTIMONIALS,
  WINDOW,
} from '@/lib/landing/content'
import BookDemoButton from '../shared/book-demo-button'
import CaseStudyCard from '../shared/case-study-card'
import FaqList from '../shared/faq-list'
import LineReveal from '../shared/line-reveal'
import LogoStrip from '../shared/logo-strip'
import { Reveal } from '../shared/reveal'
import RoiCalculator from '../shared/roi-calculator'
import SectionHeading from '../shared/section-heading'
import TestimonialCard from '../shared/testimonial-card'
import TrustRow from '../shared/trust-row'
import VideoFacade from '../shared/video-facade'
import { container } from '../shared/layout'
import EventTicker from './event-ticker'
import { nib } from './fonts'
import StoryLedger from './story-ledger'

const ROMAN = ['i', 'ii', 'iii', 'iv']

function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn('border-t border-ink/80 py-20 sm:py-28', className)}>
      <div className={container}>{children}</div>
    </section>
  )
}

/** Concept 3 — "Editorial": a calm, typographic long read. */
export default function ConceptThree() {
  return (
    <div className={cn(nib.variable, 'bg-surface-warm text-ink')}>
      {/* Masthead + hero */}
      <section className="pb-14 pt-32 sm:pt-36">
        <div className={container}>
          <div className="flex items-center justify-between border-b border-ink/80 pb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-secondary">
            <span>Convertive</span>
            <span className="hidden sm:inline">{HERO.eyebrow}</span>
            <span>N°00</span>
          </div>
          <LineReveal
            lines={HERO.lines}
            className="mt-12 font-display text-[3.1rem] font-normal leading-[0.98] tracking-[-0.02em] text-ink sm:text-7xl lg:text-[7.25rem]"
          />
          <div
            className="mt-12 grid animate-fade-up gap-10 motion-reduce:animate-none lg:grid-cols-12"
            style={{ animationDelay: '0.3s' }}
          >
            <p className="text-xl leading-relaxed text-ink-secondary lg:col-span-6 lg:text-[1.375rem]">{HERO.lede}</p>
            <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:col-start-8">
              <BookDemoButton location="hero" variant="editorial" size="xl" />
              <a
                href="#arithmetic"
                className="min-h-0 min-w-0 text-base text-ink underline decoration-ink/30 underline-offset-[6px] transition-colors hover:decoration-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                Estimate your upside →
              </a>
            </div>
          </div>
          <div className="mt-16">
            <EventTicker />
          </div>
          <div className="mt-10">
            <TrustRow tone="editorial" />
          </div>
        </div>
      </section>

      {/* N°01 The problem */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading tone="editorial" number="01" eyebrow={PROBLEM.eyebrow} lines={PROBLEM.lines} />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-secondary first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-ink">
              {PROBLEM.body}
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-20">
            <p className="font-display text-[9rem] font-light leading-none tracking-tight text-ink sm:text-[11rem]">97</p>
            <p className="mt-2 border-t border-ink/80 pt-4 text-lg text-ink-secondary">
              of every 100 visitors {PROBLEM.stat.label.replace('visitors ', '')}.
            </p>
          </div>
        </div>
      </Section>

      {/* N°02 Forty-seven seconds */}
      <Section id="session">
        <SectionHeading tone="editorial" number="02" eyebrow={SESSION.eyebrow} lines={SESSION.lines} lede="One illustrative session, read top to bottom." />
        <div className="mt-14">
          <StoryLedger />
        </div>
      </Section>

      {/* N°03 The window */}
      <Section>
        <SectionHeading tone="editorial" number="03" eyebrow={WINDOW.eyebrow} lines={WINDOW.lines} lede={WINDOW.lede} />
        <dl className="mt-14 grid border-t border-ink/80 md:grid-cols-3">
          {WINDOW.rows.map((row, i) => (
            <div
              key={row.key}
              className={cn('flex flex-col-reverse gap-3 py-8 md:px-8', i > 0 && 'border-t border-ink/15 md:border-l md:border-t-0', i === 0 && 'md:pl-0')}
            >
              <dt className="text-base leading-relaxed text-ink-secondary">{row.label}</dt>
              <dd className={cn('font-display text-5xl leading-none sm:text-6xl', row.key === 'convertive' ? 'text-ink' : 'text-ink-muted')}>
                {row.short}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-[13px] text-ink-muted">Bounce-window and batch-latency figures are industry ranges.</p>
        <blockquote className="mx-auto mt-20 max-w-4xl text-center font-display text-4xl italic leading-tight text-ink sm:text-5xl">
          “{WINDOW.quote}”
        </blockquote>
      </Section>

      {/* N°04 The method */}
      <Section>
        <SectionHeading tone="editorial" number="04" eyebrow={METHOD.eyebrow} lines={METHOD.lines} lede={METHOD.lede} />
        <ol className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {METHOD.steps.map((step, i) => (
            <Reveal key={step.key} delay={i * 0.06}>
              <li className="border-t border-ink/15 pt-6">
                <p className="font-display text-3xl text-ink">
                  <span className="mr-3 italic text-ink-muted">{ROMAN[i]}.</span>
                  {step.title}
                </p>
                <p className="mt-3 text-lg leading-relaxed text-ink-secondary">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* N°05 Evidence */}
      <Section>
        <SectionHeading tone="editorial" number="05" eyebrow={PROOF.eyebrow} lines={PROOF.lines} lede={PROOF.lede} />
        <Reveal className="mt-14">
          <TestimonialCard testimonial={TESTIMONIALS[0]} tone="editorial" />
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.company} study={study} tone="editorial" />
          ))}
        </div>
        <LogoStrip logos={CUSTOMER_LOGOS} tone="editorial" className="mt-16" />
      </Section>

      {/* N°06 The arithmetic */}
      <Section id="arithmetic" className="scroll-mt-24">
        <SectionHeading tone="editorial" number="06" eyebrow={ROI.eyebrow} lines={ROI.lines} lede={ROI.lede} />
        <RoiCalculator tone="editorial" className="mt-14" />
      </Section>

      {/* N°07 The platform */}
      <Section>
        <SectionHeading tone="editorial" number="07" eyebrow={PLATFORM.eyebrow} lines={PLATFORM.lines} lede={PLATFORM.lede} />
        <div className="mt-14 grid gap-14 lg:grid-cols-2">
          <ol className="space-y-6">
            {PLATFORM.modules.map((module, i) => (
              <li key={module.href}>
                <Link
                  href={module.href}
                  className="group block min-h-0 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-display text-2xl text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                      {module.title}
                    </span>
                    <span aria-hidden className="mb-1.5 flex-1 border-b border-dotted border-ink/40" />
                    <span className="font-display text-xl tabular-nums text-ink-secondary">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <span className="mt-1 block max-w-md text-base leading-relaxed text-ink-secondary">{module.description}</span>
                </Link>
              </li>
            ))}
          </ol>
          <div>
            <VideoFacade tone="editorial" />
            <p className="mt-10 font-display text-3xl leading-snug text-ink">
              {INTEGRATIONS.lines[0]} <span className="italic text-ink-secondary">{INTEGRATIONS.lines[1]}</span>
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">{INTEGRATIONS.lede}</p>
            <p className="mt-6 text-base leading-loose text-ink">{INTEGRATIONS.items.join(' · ')}</p>
          </div>
        </div>
      </Section>

      {/* N°08 Questions */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading tone="editorial" number="08" eyebrow="Questions" lines={['Asked and answered.']} />
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={FAQS} tone="editorial" />
          </div>
        </div>
      </Section>

      {/* Colophon */}
      <section className="border-t-4 border-double border-ink bg-surface-canvas py-24 sm:py-32">
        <div className={cn(container, 'text-center')}>
          <SectionHeading tone="editorial" lines={FINAL.lines} align="center" className="max-w-5xl" />
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-secondary">{FINAL.lede}</p>
          <div className="mt-10 flex justify-center">
            <BookDemoButton location="final-cta" variant="editorial" size="xl" />
          </div>
          <p className="mt-20 text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            Set in Nib Pro and Manrope · Convertive, {new Date().getFullYear()}
          </p>
        </div>
      </section>
    </div>
  )
}
