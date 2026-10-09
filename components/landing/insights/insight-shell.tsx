import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { INSIGHTS, insightByKey, nextInsight, type Faq, type InsightKey } from '@/lib/landing/insights'
import BookDemoButton from '../shared/book-demo-button'
import FaqList from '../shared/faq-list'
import SectionHeading from '../shared/section-heading'
import { container } from '../shared/layout'
import GhostFloor from '../v2/ghost-floor'

const pill =
  'inline-flex h-12 min-h-0 min-w-0 items-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text'

function InsightsNav({ current }: { current: InsightKey }) {
  return (
    <nav aria-label="Insights" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ol className="flex w-max gap-2">
        {INSIGHTS.map((item) => {
          const active = item.key === current
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-10 min-h-0 min-w-0 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text',
                  active ? 'bg-night-text text-night' : 'text-night-soft ring-1 ring-night-line hover:bg-night-raised hover:text-night-text',
                )}
              >
                <span className={cn('font-mono text-[12px]', active ? 'text-night/60' : 'text-night-muted')}>{item.index}</span>
                {item.name}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** A full-width article section with the standard eyebrow / heading / intro. */
export function InsightSection({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id?: string
  eyebrow?: string
  title?: string
  intro?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('scroll-mt-24 border-t border-night-line py-24 sm:py-28', className)}>
      <div className={container}>
        {title && <SectionHeading tone="dark" eyebrow={eyebrow} lines={[title]} lede={intro} />}
        <div className={title ? 'mt-12' : ''}>{children}</div>
      </div>
    </section>
  )
}

export interface InsightCta {
  label: string
  href: string
}

/** One layout for the six Insights articles, in the homepage's "Ghosts" language. */
export default function InsightShell({
  insight: key,
  title,
  lede,
  secondary,
  children,
  faqs,
  closing,
}: {
  insight: InsightKey
  title: string
  lede: string
  /** Second hero button (the first is always "Book a demo"). */
  secondary?: InsightCta
  children: ReactNode
  faqs?: Faq[]
  closing: { title: string; body: string }
}) {
  const meta = insightByKey(key)
  const next = nextInsight(key)
  return (
    <div data-page-tone="dark" className="bg-night text-night-text">
      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32">
        <GhostFloor density={0.3} pages={false} interactive={false} autoCatchMs={7000} controls={false} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_85%_at_25%_45%,rgb(var(--c-night)/0.95)_35%,transparent_85%)]"
        />
        <div className={cn(container, 'relative')}>
          <InsightsNav current={key} />
          <div className="mt-14 max-w-5xl sm:mt-20">
            <p className="flex animate-fade-up items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-night-muted motion-reduce:animate-none">
              <span className="font-mono normal-case tracking-normal">{meta.index}</span>
              <span aria-hidden className="h-px w-8 bg-night-line" />
              Insights · {meta.name}
            </p>
            <h1 className="mt-6 animate-fade-up text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] text-night-text motion-reduce:animate-none sm:text-6xl lg:text-[4.2rem]">
              {title}
            </h1>
            <div className="animate-fade-up motion-reduce:animate-none" style={{ animationDelay: '0.2s' }}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-night-soft lg:text-xl">{lede}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <BookDemoButton location={`${key}-hero`} variant="onDark" />
                {secondary && (
                  <Link href={secondary.href} className={cn(pill, 'text-night-text ring-1 ring-night-line hover:bg-night-raised')}>
                    {secondary.label}
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {children}

      {faqs && (
        <InsightSection>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
            <SectionHeading tone="dark" eyebrow="Questions" lines={['Asked often.']} />
            <FaqList faqs={faqs} tone="dark" />
          </div>
        </InsightSection>
      )}

      {/* Next article + closing CTA */}
      <section className="border-t border-night-line py-24 sm:py-28">
        <div className={container}>
          <Link
            href={next.href}
            className="group flex min-h-0 min-w-0 flex-col gap-6 rounded-[2rem] bg-night-raised p-8 ring-1 ring-night-line transition-colors hover:bg-night-line/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text sm:p-12 lg:flex-row lg:items-end lg:justify-between"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-night-muted">
                Next read · <span className="font-mono normal-case tracking-normal">{next.index}</span>
              </span>
              <span className="mt-4 block text-4xl font-semibold tracking-tight text-night-text sm:text-5xl">{next.name}</span>
              <span className="mt-3 block text-lg text-night-soft">{next.desc}</span>
            </span>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-night-text text-night transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
              <ArrowRight aria-hidden className="h-6 w-6" />
            </span>
          </Link>

          <div className="mt-24 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <SectionHeading tone="dark" lines={[closing.title]} />
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-night-soft">{closing.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/audit" className={cn(pill, 'h-14 bg-night-text px-7 text-base text-night hover:bg-white')}>
                Get free audit
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
              <BookDemoButton location={`${key}-final`} variant="onDarkOutline" size="xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
