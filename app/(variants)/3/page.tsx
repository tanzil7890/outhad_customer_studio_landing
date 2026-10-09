import { buildMetadata } from '@/lib/seo'
import ConceptThree from '@/components/landing/v3/concept-three'

export const metadata = buildMetadata({
  title: 'Homepage concept 3 · Mirror',
  description: 'Review concept for the Convertive homepage.',
  path: '/3',
  noIndex: true,
})

export default function ConceptThreePage() {
  return <ConceptThree />
}
