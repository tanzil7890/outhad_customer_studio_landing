import { METRICS } from '@/lib/landing/insights'
import InsightShell, { InsightSection } from './insight-shell'
import MetricsExplorer from './metrics-explorer'

export default function Metrics() {
  const m = METRICS
  return (
    <InsightShell
      insight="metrics"
      title={m.title}
      lede={m.lede}
      secondary={{ label: 'See the measurement methodology', href: '/the-methodology' }}
      faqs={m.faqs}
      closing={{ title: 'Want these numbers on your store?', body: 'Free 12-hr ROI audit benchmarks your store on identification rate, leakage, and recoverable revenue.' }}
    >
      <InsightSection id="kpis" eyebrow="The hierarchy" title="Three layers, eight metrics" intro={m.hierarchy} className="border-t-0 pt-0 sm:pt-0">
        <MetricsExplorer />
      </InsightSection>
    </InsightShell>
  )
}
