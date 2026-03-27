import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'History',
  description:
    'Discover the story behind Convertive and the products that shaped its approach to real-time customer activation and ecommerce AI.',
  path: '/convertive-history',
  keywords: [
    'company history',
    'Convertive story',
    'ecommerce AI company journey',
    'customer activation innovation',
  ],
  type: 'article',
})

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
