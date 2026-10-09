import { AUDIT } from '@/lib/landing/insights'
import InsightShell, { InsightSection } from './insight-shell'
import { AuditScorecard, AuditStepper } from './audit-widgets'

export default function Audit() {
  const a = AUDIT
  return (
    <InsightShell
      insight="audit"
      title={a.title}
      lede={a.lede}
      secondary={{ label: 'Start the 7 steps', href: '#steps' }}
      faqs={a.faqs}
      closing={{ title: 'Or skip the spreadsheet.', body: 'We run this exact framework on your store and deliver a 2-slide breakdown in 12 hours. Free. No card. No call required.' }}
    >
      {/* Tools */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-night-muted">What you need</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {a.tools.map((t) => (
              <li key={t.name} className="rounded-2xl bg-night-raised/60 px-4 py-3 ring-1 ring-night-line">
                <span className="block text-[15px] font-semibold text-night-text">{t.name}</span>
                <span className="block text-[13px] text-night-soft">{t.use}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InsightSection id="steps" eyebrow="The 7 steps" title="Run them in order" intro={a.stepsIntro}>
        <AuditStepper />
      </InsightSection>

      <InsightSection id="scorecard" eyebrow="What good looks like" title="Score your store against the benchmarks" intro={a.goodIntro}>
        <AuditScorecard />
      </InsightSection>
    </InsightShell>
  )
}
