import { buildMetadata } from '@/lib/seo'
import ConceptFour from '@/components/landing/v4/concept-four'

export const metadata = buildMetadata({
  title: 'Homepage concept 4 · Ember',
  description: 'Review concept for the Convertive homepage.',
  path: '/4',
  noIndex: true,
})

export default function ConceptFourPage() {
  return <ConceptFour />
}
