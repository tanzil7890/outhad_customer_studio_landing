import { Suspense } from 'react'
import { Metadata } from 'next'
import RoiCalculatorClient from './RoiCalculatorClient'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'ROI Calculator',
  description:
    "Calculate how much revenue anonymous visitors are costing your store and estimate the upside of recovering more in-session conversions.",
  path: '/roi-calculator',
  keywords: [
    'ecommerce ROI calculator',
    'anonymous visitor revenue calculator',
    'cart recovery ROI',
    'conversion lift calculator',
  ],
})

export default function RoiCalculatorPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'ROI Calculator', url: absoluteUrl('/roi-calculator') },
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }} />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-3 border-[#3652AE] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#667085] text-sm">Loading calculator…</p>
            </div>
          </div>
        }
      >
        <RoiCalculatorClient />
      </Suspense>
    </>
  )
}
