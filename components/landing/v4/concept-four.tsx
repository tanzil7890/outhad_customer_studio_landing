import type { ReactNode } from 'react'
import Link from 'next/link'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CASE_STUDIES,
  CUSTOMER_LOGOS,
  EMBER,
  FAQS,
  FINAL,
  HERO,
  INTEGRATIONS,
  METHOD,
  PLATFORM,
  PROOF,
  ROI,
  TESTIMONIALS,
  TRUST,
} from '@/lib/landing/content'
import BookDemoButton from '../shared/book-demo-button'
import FaqList from '../shared/faq-list'
import Marquee from '../shared/marquee'
import { Reveal } from '../shared/reveal'
import RoiCalculator from '../shared/roi-calculator'
import { container } from '../shared/layout'
import EmailCta from './email-cta'
import FilmAnnouncement from './film-announcement'
import MomentWall from './moment-wall'
import { DecisionMock, IdentityMock, LearnMock, ReadingMock, StitchMock } from './product-mocks'

const eyebrow = 'text-[13px] font-medium uppercase tracking-[0.14em] text-ink-secondary'
const h2 = 'text-[2.1rem] font-[450] leading-[1.06] tracking-[-0.03em] text-ink sm:text-5xl'
const body = 'text-[17px] leading-relaxed text-ink-secondary'

const step = (key: (typeof METHOD.steps)[number]['key']) => METHOD.steps.find((s) => s.key === key)!

/** Ember gradient rule used to frame the loop, like a lit fuse. */
function FlowLine({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'h-1 rounded-full bg-[linear-gradient(90deg,transparent,#FF5B1F,#FFD84D,#FF5B1F,transparent)] bg-[length:200%_100%] animate-ember-flow motion-reduce:animate-none',
        className,
      )}
    />
  )
}

function MomentCard({
  tone,
  tag,
  cta,
  href,
  title,
  text,
  children,
}: {
  tone: string
  tag: string
  cta: string
  href: string
  title: string
  text: string
  children: ReactNode
}) {
  return (
    <Reveal>
      <article>
        <div className={cn('relative h-[31rem] overflow-hidden rounded-[1.75rem] p-6 sm:h-[33rem] sm:p-8', tone)}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[2rem] font-[450] tracking-[-0.03em] text-ink">{tag}</p>
            <Link
              href={href}
              className="group inline-flex min-h-0 min-w-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[15px] font-medium text-ink shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              {cta}
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </Link>
          </div>
          <div aria-hidden className="absolute inset-x-6 bottom-0 top-[9.5rem] sm:inset-x-8 sm:top-28">
            {children}
          </div>
        </div>
        <h3 className="mt-7 text-2xl font-[450] leading-snug tracking-[-0.02em] text-ink sm:text-[1.75rem]">{title}</h3>
        <p className={cn(body, 'mt-3 max-w-xl')}>{text}</p>
      </article>
    </Reveal>
  )
}

const PANEL: Record<string, string> = { decide: 'bg-pastel-sky', profile: 'bg-pastel-lilac', learn: 'bg-pastel-mint' }
const MOCK: Record<string, ReactNode> = { decide: <ReadingMock />, profile: <StitchMock />, learn: <LearnMock /> }

/** Concept 4: "Ember". A bright, Flint-style product page: white canvas, ember accent, pastel panels with real UI. */
export default function ConceptFour() {
  const tiles: ReactNode[] = [
    ...TRUST.backers.map((backer) => (
      <div key={backer.name} className="mr-3 flex h-36 w-56 items-center justify-center rounded-2xl bg-white ring-1 ring-pastel-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={backer.src} alt={backer.name} className="max-h-10 w-auto max-w-[70%] object-contain grayscale" />
      </div>
    )),
    ...CASE_STUDIES.map((study) => (
      <div key={study.company} className="mr-3 flex h-36 w-[22rem] flex-col justify-between rounded-2xl bg-white p-5 ring-1 ring-pastel-line">
        <p className="text-[15px] font-semibold leading-snug text-ink">{study.headline}</p>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[17px] font-semibold text-ink">{study.company}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-ember px-3 py-1 text-[13px] font-semibold text-ink">
            Case study <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    )),
    ...CUSTOMER_LOGOS.slice(0, 3).map((logo) => (
      <div key={logo.name} className="mr-3 flex h-36 w-56 items-center justify-center rounded-2xl border border-dashed border-pastel-line bg-white text-[14px] font-medium text-ink-muted">
        {logo.name}
      </div>
    )),
    <div key="quote" className="mr-3 flex h-36 w-[26rem] flex-col justify-between rounded-2xl bg-white p-5 ring-1 ring-pastel-line">
      <p className="line-clamp-3 text-[14px] leading-snug text-ink-secondary">{TESTIMONIALS[0].quote}</p>
      <p className="text-[13px] font-semibold text-ink">
        {TESTIMONIALS[0].name}, {TESTIMONIALS[0].company}
      </p>
    </div>,
  ]

  return (
    <div
      data-concept="ember"
      className={cn(GeistSans.variable, GeistMono.variable, 'bg-white font-[family-name:var(--font-geist-sans)] text-ink antialiased')}
    >
      {/* Hero */}
      <section className="relative overflow-x-clip pt-32 sm:pt-40">
        <div className={cn(container, 'text-center')}>
          <h1 className="mx-auto max-w-5xl animate-fade-up text-[2.7rem] font-[450] leading-[1.02] tracking-[-0.045em] text-ink motion-reduce:animate-none sm:text-6xl lg:text-[5.4rem]">
            Convert anonymous visitors{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span
                aria-hidden
                className="absolute inset-x-[-0.04em] bottom-[0.02em] h-[0.2em] origin-left animate-marker rounded-full bg-ember motion-reduce:animate-none"
              />
              <span className="relative">before they leave.</span>
            </span>
          </h1>
          <p
            className="mx-auto mt-7 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink-secondary motion-reduce:animate-none sm:text-xl"
            style={{ animationDelay: '0.15s' }}
          >
            {HERO.lede}
          </p>
          <div
            className="mt-9 flex animate-fade-up flex-wrap items-center justify-center gap-3 motion-reduce:animate-none"
            style={{ animationDelay: '0.25s' }}
          >
            <BookDemoButton location="hero" className="rounded-xl" />
            <a
              href="#moments"
              className="inline-flex h-12 min-h-0 min-w-0 items-center rounded-xl px-5 text-[15px] font-semibold text-ink ring-1 ring-pastel-line transition-colors hover:bg-pastel-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              {EMBER.hero.secondary}
            </a>
          </div>
        </div>
        <div className="relative mt-12 sm:mt-14">
          <MomentWall>
            <div className="absolute inset-x-0 top-[24%] z-10 flex justify-center px-4">
              <FilmAnnouncement />
            </div>
          </MomentWall>
        </div>
      </section>

      {/* Proof strip */}
      <section aria-label="Backers and customers" className="border-b border-pastel-line bg-pastel-paper">
        <FlowLine className="rounded-none" />
        <div className="py-6">
          <Marquee label="Backers and customers" duration={60} className="px-4 sm:px-6">
            {tiles}
          </Marquee>
        </div>
      </section>

      {/* Two moments */}
      <section id="moments" className="scroll-mt-24 py-24 sm:py-32">
        <div className={container}>
          <h2 className={cn(h2, 'mx-auto max-w-3xl text-center')}>{EMBER.moments.heading}</h2>
          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-8">
            <MomentCard
              tone="bg-pastel-apricot"
              tag={EMBER.moments.decide.tag}
              cta={EMBER.moments.decide.cta}
              href={EMBER.moments.decide.href}
              title={EMBER.moments.decide.title}
              text={EMBER.moments.decide.body}
            >
              <DecisionMock />
            </MomentCard>
            <MomentCard
              tone="bg-pastel-teal"
              tag={EMBER.moments.identity.tag}
              cta={EMBER.moments.identity.cta}
              href={EMBER.moments.identity.href}
              title={EMBER.moments.identity.title}
              text={INTEGRATIONS.lede}
            >
              <IdentityMock />
            </MomentCard>
          </div>
        </div>
      </section>

      {/* Meet Convertive */}
      <section className="bg-pastel-paper py-24 sm:py-32">
        <div className={container}>
          <p className={cn(eyebrow, 'text-center')}>{EMBER.meet.eyebrow}</p>
          <h2 className={cn(h2, 'mx-auto mt-4 max-w-3xl text-center text-[1.9rem] leading-[1.12] sm:text-[2.6rem] sm:leading-[1.12]')}>{EMBER.meet.statement}</h2>
          <div className="mt-20 space-y-20 sm:space-y-28">
            {EMBER.meet.rows.map((row) => (
              <div key={row.key} className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
                <div className="flex flex-col justify-between gap-6 lg:py-2">
                  <h3 className="text-[2rem] font-[450] leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.5rem]">{row.title}</h3>
                  <p className={cn(body, 'max-w-sm')}>{row.body}</p>
                </div>
                <Reveal>
                  <div aria-hidden className={cn('rounded-[1.75rem] px-5 pb-6 pt-10 sm:px-10 sm:pb-10 sm:pt-14', PANEL[row.key])}>
                    {MOCK[row.key]}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works: the loop */}
      <section className="py-24 sm:py-32">
        <div className={container}>
          <p className={cn(eyebrow, 'text-center')}>{EMBER.loop.eyebrow}</p>
          <h2 className={cn(h2, 'mx-auto mt-4 max-w-3xl text-center')}>{EMBER.loop.heading}</h2>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {[EMBER.loop.connect, { title: step('detect').title, body: step('detect').body }].map((item) => (
              <Reveal key={item.title}>
                <div className="h-full rounded-[1.75rem] bg-pastel-paper p-8 sm:p-10">
                  <p className="text-[2.2rem] font-[450] tracking-[-0.03em] text-ink">{item.title}</p>
                  <p className={cn(body, 'mt-5')}>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="relative mx-auto mt-6 max-w-6xl">
            <FlowLine className="mx-auto w-[80%]" />
            <ol className="grid md:grid-cols-3">
              {(['decide', 'deliver', 'capture'] as const).map((key, i) => (
                <li key={key} className={cn('px-6 py-10 sm:px-10', i > 0 && 'border-t border-pastel-line md:border-l md:border-t-0')}>
                  <p className="font-[family-name:var(--font-geist-mono)] text-sm text-ink-muted">0{i + 2}</p>
                  <p className="mt-2 text-[2rem] font-[450] tracking-[-0.03em] text-ink">{step(key).title}</p>
                  <p className={cn(body, 'mt-4')}>{step(key).body}</p>
                </li>
              ))}
            </ol>
            <FlowLine className="mx-auto w-[80%]" />
            <div className="-mt-1 flex justify-center">
              <span className="rounded-b-lg bg-ember px-5 py-2 text-[15px] font-medium text-ink">{EMBER.loop.pill}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Platform */}
      <section className="border-t border-pastel-line py-24 sm:py-32">
        <div className={container}>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 className={h2}>{PLATFORM.lines[0]}</h2>
            <p className={body}>{PLATFORM.lede}</p>
          </div>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {PLATFORM.modules.map((module, i) => (
              <li key={module.href}>
                <Link
                  href={module.href}
                  className={cn(
                    'group flex h-full min-h-[15rem] min-w-0 flex-col justify-between rounded-[1.5rem] p-6 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink motion-reduce:transition-none',
                    ['bg-pastel-apricot', 'bg-pastel-butter', 'bg-ember', 'bg-pastel-sky', 'bg-pastel-mint'][i],
                  )}
                >
                  <span className="flex items-center justify-between font-[family-name:var(--font-geist-mono)] text-sm text-ink">
                    0{i + 1}
                    <ArrowUpRight aria-hidden className="h-5 w-5 text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                  </span>
                  <span>
                    <span className="block text-[1.4rem] font-[450] leading-tight tracking-[-0.02em] text-ink">{module.title}</span>
                    <span className="mt-2 block text-[14.5px] leading-relaxed text-ink/85">{module.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-16 flex flex-col gap-6 border-t border-pastel-line pt-10 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-xl text-2xl font-[450] leading-snug tracking-[-0.02em] text-ink">
              {INTEGRATIONS.lines[0]} <span className="text-ink-secondary">{INTEGRATIONS.lines[1]}</span>
            </p>
            <ul className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
              {INTEGRATIONS.items.map((item) => (
                <li key={item} className="rounded-full bg-pastel-paper px-4 py-2 text-[14px] font-medium text-ink ring-1 ring-pastel-line">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Evidence */}
      <section className="border-t border-pastel-line py-24 sm:py-32">
        <div className={container}>
          <h2 className={h2}>{PROOF.lines[0]}</h2>
          <p className={cn(body, 'mt-4 max-w-2xl')}>{PROOF.lede}</p>
          <div className="mt-12 grid overflow-hidden rounded-[1.5rem] ring-1 ring-pastel-line md:grid-cols-3">
            {CASE_STUDIES.map((study, i) => (
              <article key={study.company} className={cn('flex flex-col gap-6 p-7', i > 0 && 'border-t border-pastel-line md:border-l md:border-t-0')}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[15px] font-semibold text-ink">{study.company}</p>
                  {study.placeholder && <span className="rounded-full bg-pastel-paper px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Placeholder</span>}
                </div>
                <p className="text-[17px] leading-snug text-ink">{study.headline}</p>
                <dl className="mt-auto grid grid-cols-2 gap-4">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col-reverse gap-1">
                      <dt className="text-[13px] text-ink-secondary">{metric.label}</dt>
                      <dd className="text-3xl font-[550] tracking-[-0.03em] text-ember-deep">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ROI on butter */}
      <section id="roi" className="scroll-mt-24 bg-pastel-butter py-24 sm:py-32">
        <div className={container}>
          <p className={eyebrow}>{ROI.eyebrow}</p>
          <h2 className={cn(h2, 'mt-4 max-w-3xl')}>{ROI.lines[0]}</h2>
          <p className={cn(body, 'mt-4 max-w-2xl')}>{ROI.lede}</p>
          <RoiCalculator className="mt-12 shadow-[0_30px_80px_-50px_rgba(26,20,16,0.45)]" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <div className={cn(container, 'grid gap-12 lg:grid-cols-2 lg:gap-16')}>
          <div className="relative flex min-h-[18rem] items-center justify-center lg:min-h-[26rem]">
            <div aria-hidden className="absolute inset-0 overflow-hidden">
              <span className="absolute left-[8%] top-[10%] h-64 w-64 rounded-full bg-ember-glow/45 blur-3xl" />
              <span className="absolute right-[10%] top-[20%] h-56 w-56 rounded-full bg-pastel-butter blur-3xl" />
              <span className="absolute bottom-[8%] left-[35%] h-48 w-48 rounded-full bg-pastel-teal/45 blur-3xl" />
            </div>
            <h2 className="relative text-[2.4rem] font-[450] leading-[1.05] tracking-[-0.03em] text-ink sm:text-[3.4rem]">
              Frequently
              <br />
              asked questions
            </h2>
          </div>
          <FaqList faqs={FAQS} className="self-center" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-pastel-paper py-24 sm:py-32">
        <div className={container}>
          <h2 className="max-w-4xl text-[2.3rem] font-[450] leading-[1.04] tracking-[-0.035em] text-ink sm:text-6xl">
            {FINAL.lines[0]} <span className="text-ember-deep">{FINAL.lines[1]}</span>
          </h2>
          <p className={cn(body, 'mt-5 max-w-2xl')}>{FINAL.lede}</p>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-end">
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {EMBER.final.checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[17px] text-ink">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ember text-ink">
                    <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <EmailCta />
          </div>
        </div>
      </section>
    </div>
  )
}
