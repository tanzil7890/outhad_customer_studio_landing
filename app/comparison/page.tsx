import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/toast/button'
import { getPublishedCaseStudiesServer } from '@/lib/blogs-server'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildMetadata({
  title: 'The Comparison: Anonymous Intent Activation vs CDPs, Popups, Retargeting, Session Replay',
  description:
    'Anonymous Intent Activation is a new category. CDPs, popups, retargeting, and session replay each solve a slice. None own the in-session loop. A side-by-side comparison of where each category wins, fails, and where Convertive fits on top.',
  path: '/comparison',
  keywords: [
    'anonymous intent activation',
    'convertive vs cdp',
    'convertive vs popup tools',
    'convertive vs retargeting',
    'convertive vs session replay',
    'in-session personalization comparison',
  ],
  type: 'article',
})

const matrixRows = [
  { capability: 'Sub-100ms decisioning', convertive: true, cdp: false, popup: 'partial', retarget: false, replay: false },
  { capability: 'Anonymous → known stitching in real time', convertive: true, cdp: 'partial', popup: false, retarget: false, replay: false },
  { capability: 'Next-best-action ranking across channels', convertive: true, cdp: false, popup: false, retarget: false, replay: false },
  { capability: 'In-session intervention before bounce', convertive: true, cdp: false, popup: true, retarget: false, replay: false },
  { capability: 'Closed-loop learning from outcomes', convertive: true, cdp: false, popup: false, retarget: 'partial', replay: false },
  { capability: 'Web + email + SMS + ads orchestration', convertive: true, cdp: 'partial', popup: false, retarget: 'partial', replay: false },
  { capability: 'Identity-aware suppression', convertive: true, cdp: 'partial', popup: false, retarget: false, replay: false },
  { capability: 'Holdout-aware lift measurement', convertive: true, cdp: false, popup: false, retarget: 'partial', replay: false },
]

const categories = [
  {
    label: 'CDPs (Customer Data Platforms)',
    examples: 'Segment, mParticle, Adobe RTCDP, Salesforce CDP, Bloomreach, Hightouch, RudderStack',
    does: 'Unify identified-user data. Sync audiences to downstream tools. Build SQL-defined segments.',
    fails: 'Most update on minutes-to-hours, not milliseconds. Identity-only — anonymous behavior often discarded. No decisioning layer; CDPs ship data, they do not act on it. Activation is downstream and slow.',
    fitWith: 'Convertive layers on top: consume identified profiles from the CDP, add real-time anonymous activation the CDP cannot do. The CDP keeps owning the warehouse-side truth.',
  },
  {
    label: 'Popup tools / on-site messaging',
    examples: 'Justuno, Privy, OptinMonster, Wunderkind (Bouncex), Yieldify, Insider',
    does: 'Display popups, banners, and overlays based on rules (exit intent, time on page, cart value).',
    fails: 'Rule-based, not ranked. No learning loop. No cross-channel context — fires the same popup whether the visitor was just emailed or just bought. Identity capture is the only goal; in-session next-best-action is not the model.',
    fitWith: 'Convertive replaces rule-driven popup logic with an NBA-ranked decision over all eligible actions. A popup is one of many candidates, not the default.',
  },
  {
    label: 'Retargeting / paid-media remarketing',
    examples: 'Meta retargeting, Google remarketing, Criteo, AdRoll, Klaviyo + ESP audience syncs',
    does: 'Show ads or send emails after the visitor leaves the site. Recapture them on a different channel later.',
    fails: 'Hours-to-days delay. The bounce window already closed. Pays per impression even when the user already converted. Cannot intervene before the leave.',
    fitWith: 'Convertive runs the in-session play first; retargeting is the fallback for the cohort that left without identity. The split saves spend.',
  },
  {
    label: 'Session replay / behavioral analytics',
    examples: 'Hotjar, FullStory, LogRocket, Microsoft Clarity, Contentsquare',
    does: 'Record sessions. Replay user paths. Heatmap clicks. Diagnose UX issues post-hoc.',
    fails: 'Read-only. No intervention. No identity stitching. Diagnostic, not active. By the time you watch the replay, the visitor has been gone for days.',
    fitWith: 'Replay diagnoses where users get stuck; Convertive intervenes in real time when the same pattern is detected. Replay is the lab, Convertive is the floor.',
  },
]

const faqs = [
  {
    question: 'Is Anonymous Intent Activation actually a new category?',
    answer:
      'Yes. CDPs were defined around identified data unification. Popup tools around rule-driven overlays. Retargeting around post-session media. Session replay around UX diagnostics. None were architected for sub-100ms decisioning over anonymous in-session intent across channels. That gap is the category.',
  },
  {
    question: 'Do I need to replace my CDP / ESP / popup tool?',
    answer:
      'No. Convertive layers on top of the existing stack. CDPs keep owning the warehouse-side data model. ESPs keep owning email delivery. Popup tools can stay or be replaced over time as their rules get absorbed into the NBA ranker. The integration model is additive.',
  },
  {
    question: 'How is this different from Dynamic Yield, Nosto, or Insider?',
    answer:
      'Those tools focus on on-site personalization (recs, banners, A/B). Strong in their slice. Convertive\'s scope is wider: anonymous-to-known stitching, cross-channel orchestration (web + email + SMS + ads), and a closed learning loop that ranks all eligible actions, not just on-site recs.',
  },
  {
    question: 'What about session replay tools like Hotjar or FullStory?',
    answer:
      'Different category entirely. Replay is read-only diagnostics — useful for debugging UX, not for converting visitors. Convertive intervenes in real time when behavior matches a recoverable pattern. The two are complementary, not overlapping.',
  },
  {
    question: 'Where does retargeting still fit?',
    answer:
      'For the cohort that left without identity capture, retargeting is the only remaining play. Convertive\'s job is to shrink that cohort by converting or capturing identity in-session, so retargeting spend goes to a smaller, more recoverable audience. ROAS improves because waste shrinks.',
  },
]

function ComparisonCard({ blog }: { blog: Awaited<ReturnType<typeof getPublishedCaseStudiesServer>>[number] }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block">
      <article className="bg-white border border-[#E8DDD4] rounded-2xl overflow-hidden hover:border-[#1A1410] transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        {blog.coverImage && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-semibold text-[#1A1410] mb-2 group-hover:text-[#C87941] transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-xs text-[#5C4E44] mb-4 line-clamp-3 flex-1 leading-relaxed">
            {blog.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F2ECE6]">
            <div className="flex items-center gap-2">
              {blog.companyLogo && (
                <img
                  src={blog.companyLogo}
                  alt={blog.companyName}
                  className="w-4 h-4 rounded object-contain"
                />
              )}
              <span className="text-[10px] text-[#9C8B7E] uppercase tracking-widest">{blog.companyName}</span>
            </div>
            {blog.industry && (
              <span className="text-[10px] text-[#5C4E44] bg-[#F5EFE8] rounded-full px-2 py-0.5">
                {blog.industry}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1A1410] text-[#FDF0E0] text-xs">
        ✓
      </span>
    )
  }
  if (value === 'partial') {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-[#C87941] text-[#C87941] text-xs">
        ~
      </span>
    )
  }
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-[#E8DDD4] text-[#9C8B7E] text-xs">
      ×
    </span>
  )
}

export default async function ComparisonPage() {
  const blogs = await getPublishedCaseStudiesServer()
  const comparisons = blogs.filter((b) => b.slug.startsWith('convertive-vs-'))

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'The Comparison', url: absoluteUrl('/comparison') },
  ])

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, faqSchema(faqs)]) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 sm:pt-52 pb-16">
        {/* Hero */}
        <section className="text-center lg:text-left mb-16">
          <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">The Comparison</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl text-[#1A1410] font-title leading-[1.05]">
            Anonymous Intent Activation vs CDPs, Popups, Retargeting, Session Replay
          </h1>
          <p className="mt-6 text-lg text-[#5C4E44] max-w-3xl leading-relaxed">
            Each adjacent category solves a slice of the problem. None own the full event-to-action loop in under 100
            milliseconds. The gap between them is what Convertive fills.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/demo">
              <Button className="bg-[#1A1410] text-[#F5F0EB] rounded-lg px-8 hover:bg-[#2D2420] transition-colors">
                Book Demo
              </Button>
            </Link>
            <Link href="/the-mechanism">
              <Button variant="outline" className="rounded-lg px-8 border-[#1A1410] text-[#1A1410] hover:bg-[#F5EFE8]">
                How the mechanism works
              </Button>
            </Link>
          </div>
        </section>

        {/* Master matrix */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">Capability Matrix</p>
            <h2 className="mt-2 text-3xl font-title text-[#1A1410]">Side by side</h2>
            <p className="mt-3 text-sm text-[#5C4E44] max-w-2xl">
              ✓ full · ~ partial · × not in scope. Categories generalized — individual vendors vary.
            </p>
          </div>

          <div className="rounded-xl border border-[#E8DDD4] bg-white overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-[#1A1410] text-[#FDF0E0]">
                <tr>
                  <th className="text-left p-4 text-xs uppercase tracking-widest font-semibold">Capability</th>
                  <th className="text-center p-4 text-xs uppercase tracking-widest font-semibold">Convertive</th>
                  <th className="text-center p-4 text-xs uppercase tracking-widest font-semibold">CDPs</th>
                  <th className="text-center p-4 text-xs uppercase tracking-widest font-semibold">Popups</th>
                  <th className="text-center p-4 text-xs uppercase tracking-widest font-semibold">Retargeting</th>
                  <th className="text-center p-4 text-xs uppercase tracking-widest font-semibold">Replay</th>
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((row, i) => (
                  <tr key={row.capability} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF8]'}>
                    <td className="p-4 text-[#1A1410] border-t border-[#F2ECE6] font-medium">{row.capability}</td>
                    <td className="p-4 text-center border-t border-[#F2ECE6]"><Cell value={row.convertive} /></td>
                    <td className="p-4 text-center border-t border-[#F2ECE6]"><Cell value={row.cdp} /></td>
                    <td className="p-4 text-center border-t border-[#F2ECE6]"><Cell value={row.popup} /></td>
                    <td className="p-4 text-center border-t border-[#F2ECE6]"><Cell value={row.retarget} /></td>
                    <td className="p-4 text-center border-t border-[#F2ECE6]"><Cell value={row.replay} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Per-category deep dive */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">Category Deep Dive</p>
            <h2 className="mt-2 text-3xl font-title text-[#1A1410]">What each category does — and where it stops</h2>
          </div>

          <div className="space-y-5">
            {categories.map((c) => (
              <article key={c.label} className="rounded-2xl border border-[#E8DDD4] bg-white p-6 sm:p-8 hover:border-[#D4C4B8] hover:shadow-sm transition-all">
                <h3 className="text-2xl font-title text-[#1A1410]">{c.label}</h3>
                <p className="mt-1 text-xs text-[#9C8B7E] italic">{c.examples}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#9C8B7E] mb-2">What it does</p>
                    <p className="text-sm text-[#1A1410] leading-relaxed">{c.does}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#C87941] mb-2">Where it fails</p>
                    <p className="text-sm text-[#5C4E44] leading-relaxed">{c.fails}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#9C8B7E] mb-2">Fits with Convertive</p>
                    <p className="text-sm text-[#5C4E44] leading-relaxed">{c.fitWith}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* When to add Convertive */}
        <section className="mb-20 rounded-2xl bg-[#1A1410] text-[#F5F0EB] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-widest text-[#EBBF94] font-bold">When to add Convertive on top</p>
          <h2 className="mt-2 text-3xl font-title">Three signals you have outgrown the slice</h2>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start gap-3 text-sm text-[#FDF0E0]">
              <span className="text-[#EBBF94] font-mono">01</span>
              <span>
                <strong className="text-[#FDF0E0]">Identification rate stuck below 10%.</strong>{' '}
                <span className="text-[#C4A898]">Existing tools are not capturing identity in-session. The leak is upstream of your CDP.</span>
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-[#FDF0E0]">
              <span className="text-[#EBBF94] font-mono">02</span>
              <span>
                <strong className="text-[#FDF0E0]">Retargeting CAC keeps climbing.</strong>{' '}
                <span className="text-[#C4A898]">You are paying paid media to fix what should have been an in-session capture. The play moved off-site too late.</span>
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-[#FDF0E0]">
              <span className="text-[#EBBF94] font-mono">03</span>
              <span>
                <strong className="text-[#FDF0E0]">Channels collide — same offer in popup, email, and ad.</strong>{' '}
                <span className="text-[#C4A898]">No global next-best-action selector. Visitors are getting bombarded, not personalized.</span>
              </span>
            </li>
          </ul>
        </section>

        {/* Per-vendor index — pulled from CMS */}
        {comparisons.length > 0 && (
          <section className="mb-20">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-[#C87941] font-bold">Platform Comparisons</p>
              <h2 className="mt-2 text-3xl font-title text-[#1A1410]">Convertive vs specific tools</h2>
              <p className="mt-3 text-sm text-[#5C4E44] max-w-2xl">
                See how Convertive stacks up against other ecommerce personalization and CDP platforms.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisons.map((blog) => (
                <ComparisonCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-3xl font-title text-[#1A1410] mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-[#F2ECE6] pb-6">
                <h3 className="text-base font-semibold text-[#1A1410] mb-2">{faq.question}</h3>
                <p className="text-sm text-[#5C4E44] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-2xl border border-[#E8DDD4] bg-[#FDF0E0] p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-title text-[#1A1410]">Mapped against your stack</h2>
          <p className="mt-3 text-sm text-[#5C4E44] max-w-xl mx-auto">
            Get a 12-hr ROI audit that benchmarks your store and identifies which slice your existing tools cover — and where the leak still is.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/audit">
              <Button className="bg-[#1A1410] text-[#F5F0EB] rounded-lg px-8 hover:bg-[#2D2420] transition-colors">
                Get free audit
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" className="rounded-lg px-8 border-[#1A1410] text-[#1A1410] hover:bg-white">
                Book demo
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
