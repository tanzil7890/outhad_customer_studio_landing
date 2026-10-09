import { moduleByKey, type ModuleKey } from '@/lib/landing/modules'
import { absoluteUrl, serializeJsonLd } from '@/lib/seo'
import { breadcrumbSchema, faqSchema, featureProductSchema } from '@/lib/schema'

/** Breadcrumb, Product and FAQ structured data for a platform page (same shapes the pages always shipped). */
export default function ProductJsonLd({ module: key }: { module: ModuleKey }) {
  const m = moduleByKey(key)
  const json = serializeJsonLd([
    breadcrumbSchema([
      { name: 'Home', url: absoluteUrl('/') },
      { name: m.crumb, url: absoluteUrl(m.href) },
    ]),
    featureProductSchema({ ...m.schema, url: absoluteUrl(m.href) }),
    faqSchema(m.faqs),
  ])
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
