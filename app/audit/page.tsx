import type { Metadata } from 'next'
import AuditClient from './AuditClient'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Free 12-hr ROI Audit Report',
  description:
    'Get a custom ROI audit report from Convertive in 12 hours. We model anonymous-traffic loss, recoverable revenue, and projected lift on your store — delivered as a 2-slide breakdown to your inbox.',
  path: '/audit',
  keywords: [
    'ecommerce ROI audit report',
    'anonymous traffic ROI audit',
    'conversion lift analysis',
    'free ROI audit',
    'in-session conversion ROI',
    'shopify ROI audit report',
    'klaviyo ROI audit',
  ],
})

const auditFaqs = [
  {
    question: 'What is the 12-hr ROI Audit Report?',
    answer:
      'A 2-slide ROI audit report modeled on your store: how much of your traffic is anonymous and bouncing, the dollar value at risk each month, and the lift Convertive projects on top of your existing stack. Delivered to your inbox within 12 hours of submission.',
  },
  {
    question: 'Do I need to take a sales call?',
    answer:
      'No. The ROI audit report is yours to read on your own time. You only book a follow-up if the numbers earn the conversation — there is no requirement and no commitment.',
  },
  {
    question: 'Is the audit report really free?',
    answer:
      'Yes. No card, no obligation. We do this because once you see the recoverable revenue modeled on your store, the case for Convertive is self-evident.',
  },
  {
    question: 'What do I need to provide?',
    answer:
      'Your store URL and rough monthly traffic. That is enough for us to pull live signals, profile coverage, and build the ROI audit. The optional challenge field helps us tailor the report to what you care about most.',
  },
  {
    question: 'Does this work alongside Klaviyo, Rebuy, or my existing tools?',
    answer:
      'Yes — that is the point. Most stacks (Klaviyo, Rebuy, Shopify flows) only act once a visitor is identified. The ROI audit report shows where Convertive fills the gap by acting on anonymous, in-session intent before the bounce, making the rest of your stack measurably more effective.',
  },
]

export default function AuditPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Free 12-hr ROI Audit Report', url: absoluteUrl('/audit') },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([breadcrumbs, faqSchema(auditFaqs)]),
        }}
      />
      <AuditClient faqs={auditFaqs} />
    </>
  )
}
