import { buildMetadata } from '@/lib/seo'
import ConceptOne from '@/components/landing/v1/concept-one'

export const metadata = buildMetadata({
  title: 'Homepage concept 1 · Live session theater',
  description: 'Review concept for the Convertive homepage.',
  path: '/1',
  noIndex: true,
})

export default function ConceptOnePage() {
  return <ConceptOne />
}
