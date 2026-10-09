import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MODULES, moduleByKey, nextModule, type ModuleKey } from '@/lib/landing/modules'
import BookDemoButton from '../shared/book-demo-button'
import FaqList from '../shared/faq-list'
import { Reveal } from '../shared/reveal'
import SectionHeading from '../shared/section-heading'
import { container } from '../shared/layout'
import GhostFloor from '../v2/ghost-floor'
import ChannelLanes from './demos/channel-lanes'
import DecisionPlayground from './demos/decision-playground'
import LiftLab from './demos/lift-lab'
import ProfileBuilder from './demos/profile-builder'
import SegmentLab from './demos/segment-lab'

const DEMOS: Record<ModuleKey, () => ReactNode> = {
  'data-platform': () => <ProfileBuilder />,
  audiences: () => <SegmentLab />,
  'ai-engine': () => <DecisionPlayground />,
  'journey-orchestration': () => <ChannelLanes />,
  reporting: () => <LiftLab />,
}

const CURSOR = 'M0 0 L0 16 L4.4 12.2 L7.4 18.4 L10 17.2 L7.1 11.2 L12.4 11.2 Z'

/** 01 Data Platform · 02 Audiences · … The five modules as one row, current one lit. */
function ModuleNav({ current }: { current: ModuleKey }) {
  return (
    <nav aria-label="Platform modules" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ol className="flex w-max gap-2">
        {MODULES.map((m) => {
          const active = m.key === current
          return (
            <li key={m.key}>
              <Link
                href={m.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-10 min-h-0 min-w-0 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
                  active ? 'bg-night-text text-night' : 'text-night-soft ring-1 ring-night-line hover:bg-night-raised hover:text-night-text',
                )}
              >
                <span className={cn('font-mono text-[12px]', active ? 'text-night/60' : 'text-night-muted')}>{m.index}</span>
                {m.name}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** One template for the five platform pages, in the homepage's "Ghosts" language. */
export default function ProductPage({ module: key }: { module: ModuleKey }) {
  const m = moduleByKey(key)
  const next = nextModule(key)
  const Demo = DEMOS[key]

  return (
    <div data-page-tone="dark" className="bg-night text-night-text">
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
        <GhostFloor density={0.35} pages={false} interactive={false} autoCatchMs={6000} controls={false} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_25%_45%,rgb(var(--c-night)/0.94)_35%,transparent_85%)]"
        />
        <div className={cn(container, 'relative')}>
          <ModuleNav current={key} />
          <div className="mt-14 max-w-4xl sm:mt-20">
            <h1>
              <span className="flex animate-fade-up items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-night-muted motion-reduce:animate-none">
                <span className="font-mono normal-case tracking-normal">{m.index}</span>
                <span aria-hidden className="h-px w-8 bg-night-line" />
                {m.product}
              </span>
              <span className="mt-6 block text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.035em] text-night-text sm:text-6xl lg:text-[4.4rem]">
                {m.headline.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.08em]">
                    <span className="block animate-line-rise motion-reduce:animate-none" style={{ animationDelay: `${0.05 + i * 0.09}s` }}>
                      {line}
                    </span>
                  </span>
                ))}
              </span>
            </h1>
            <div className="animate-fade-up motion-reduce:animate-none" style={{ animationDelay: '0.25s' }}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-night-soft lg:text-xl">{m.lede}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <BookDemoButton location={`${key}-hero`} variant="onDark" />
                <a
                  href="#demo"
                  className="group inline-flex h-12 min-h-0 min-w-0 items-center gap-2 rounded-full px-5 text-[15px] font-semibold text-night-text ring-1 ring-night-line transition-colors hover:bg-night-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
                >
                  See it live
                  <ArrowDown aria-hidden className="h-4 w-4 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The demo */}
      <section id="demo" className="scroll-mt-24 pb-24 sm:pb-32">
        <div className={container}>
          <div className="rounded-[2rem] bg-night-raised/60 p-4 ring-1 ring-night-line sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-2 border-b border-night-line pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-night-muted">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-soft/60 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success-soft" />
                  </span>
                  {m.demo.eyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-night-text sm:text-3xl">{m.demo.title}</h2>
              </div>
              <p className="text-[13px] text-night-muted">{m.demo.note}</p>
            </div>
            <Demo />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-night-line py-24 sm:py-32">
        <div className={container}>
          <SectionHeading tone="dark" eyebrow="How it works" lines={[m.pillarsHeading]} />
          <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            <span aria-hidden className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-gradient-to-r from-night-line via-night-soft/50 to-night-line md:block" />
            {m.pillars.map((pillar, i) => (
              <li key={pillar.title} className="relative">
                <Reveal delay={i * 0.1}>
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-night ring-1 ring-night-soft/40">
                    <svg viewBox="0 0 14 20" className="h-4 w-auto" aria-hidden>
                      <path d={CURSOR} fill="rgb(var(--c-night-text))" fillOpacity={0.35 + i * 0.3} />
                    </svg>
                  </span>
                  <p className="mt-6 font-mono text-sm text-night-muted">0{i + 1}</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight text-night-text">{pillar.title}</h3>
                  <p className="mt-3 max-w-sm text-base leading-relaxed text-night-soft">{pillar.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-night-line py-24 sm:py-32">
        <div className={cn(container, 'grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]')}>
          <SectionHeading tone="dark" eyebrow="What’s inside" lines={['Under the hood.']} />
          <ul className="grid gap-px overflow-hidden rounded-3xl bg-night-line sm:grid-cols-2">
            {m.capabilities.map((capability, i) => (
              <li key={capability} className="flex gap-4 bg-night p-6">
                <span className="font-mono text-[13px] text-night-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-base leading-snug text-night-text">{capability}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-night-line py-24 sm:py-32">
        <div className={cn(container, 'grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]')}>
          <SectionHeading tone="dark" eyebrow="Questions" lines={[`${m.name}, answered.`]} />
          <FaqList faqs={m.faqs} tone="dark" />
        </div>
      </section>

      {/* Next module + CTA */}
      <section className="border-t border-night-line py-24 sm:py-32">
        <div className={container}>
          <Link
            href={next.href}
            className="group flex min-h-0 min-w-0 flex-col gap-6 rounded-[2rem] bg-night-raised p-8 ring-1 ring-night-line transition-colors hover:bg-night-line/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text sm:p-12 lg:flex-row lg:items-end lg:justify-between"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-night-muted">
                Next in the platform · <span className="font-mono normal-case tracking-normal">{next.index}</span>
              </span>
              <span className="mt-4 block text-4xl font-semibold tracking-tight text-night-text sm:text-5xl">{next.name}</span>
              <span className="mt-3 block max-w-xl text-lg leading-relaxed text-night-soft">{next.teaser}</span>
            </span>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-night-text text-night transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
              <ArrowRight aria-hidden className="h-6 w-6" />
            </span>
          </Link>

          <div className="mt-24 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <SectionHeading tone="dark" lines={[`See ${m.name} on your own traffic.`]} />
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-night-soft">
                A 15-minute demo, using your store and your shoppers. Days to go live, not months.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <BookDemoButton location={`${key}-final`} variant="onDark" size="xl" />
              <Link
                href="/#roi"
                className="group inline-flex h-14 min-h-0 min-w-0 items-center gap-2 rounded-full px-7 text-base font-semibold text-night-text ring-1 ring-night-line transition-colors hover:bg-night-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
              >
                Run the numbers
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
