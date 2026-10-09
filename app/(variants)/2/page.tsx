import type { Viewport } from 'next'
import { buildMetadata } from '@/lib/seo'
import ConceptTwo from '@/components/landing/v2/concept-two'

export const metadata = buildMetadata({
  title: 'Homepage concept 2 · Ghosts',
  description: 'Review concept for the Convertive homepage.',
  path: '/2',
  noIndex: true,
})

export const viewport: Viewport = {
  themeColor: '#1A1410',
}

export default function ConceptTwoPage() {
  return <ConceptTwo />
}
