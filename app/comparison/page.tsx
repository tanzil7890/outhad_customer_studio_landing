import type { Metadata } from 'next'
import Footer from '@/components/footer'
import Comparison from '@/components/landing/insights/comparison'
import LandingShell from '@/components/landing/shared/landing-shell'
import { getPublishedCaseStudiesServer } from '@/lib/blogs-server'
import { COMPARISON } from '@/lib/landing/insights'
import { absoluteUrl, buildMetadata, serializeJsonLd } from '@/lib/seo'
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

export default async function ComparisonPage() {
  const blogs = await getPublishedCaseStudiesServer()
  const vendors = blogs.filter((b) => b.slug.startsWith('convertive-vs-'))
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'The Comparison', url: absoluteUrl('/comparison') },
  ])
  return (
    <LandingShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, faqSchema(COMPARISON.faqs)]) }} />
      <Comparison vendors={vendors} />
      <Footer />
    </LandingShell>
  )
}
