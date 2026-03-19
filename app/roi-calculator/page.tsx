import { Suspense } from 'react'
import { Metadata } from 'next'
import RoiCalculatorClient from './RoiCalculatorClient'

export const metadata: Metadata = {
  title: 'ROI Calculator — See How Much Anonymous Visitors Cost You | Convertive',
  description:
    'Calculate exactly how much revenue you\'re leaving on the table from anonymous visitors who leave without converting. Get your personalized ROI estimate and see what recovering even a fraction means for your store.',
  openGraph: {
    title: 'ROI Calculator — Convertive',
    description:
      'See how much anonymous visitor loss is costing your Shopify store every month. Free, personalized estimate in 30 seconds.',
    url: 'https://tryconvertive.com/roi-calculator',
    siteName: 'Convertive',
  },
}

export default function RoiCalculatorPage() {
  return (
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
  )
}
