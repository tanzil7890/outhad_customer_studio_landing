import { MetadataRoute } from 'next'
import { getPublishedCaseStudiesServer } from '@/lib/case-studies-server'
import { absoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date()
  const publicRoutes = [
    '',
    '/manifesto',
    '/case-studies',
    '/roi-calculator',
    '/convertive-data-platform',
    '/convertive-journey-orchestration',
    '/convertive-audiences',
    '/convertive-ai-engine',
    '/convertive-reporting',
    '/convertive-history',
  ] as const
  const caseStudies = await getPublishedCaseStudiesServer()
  const staticEntries = publicRoutes.map((route) => ({
    url: route ? absoluteUrl(route) : absoluteUrl('/'),
    lastModified: currentDate,
    changeFrequency:
      route === '/manifesto' || route === '/convertive-history'
        ? 'monthly'
        : 'weekly',
    priority:
      route === ''
        ? 1
        : route === '/convertive-history'
          ? 0.6
          : route === '/manifesto'
            ? 0.7
            : route === '/case-studies' || route === '/roi-calculator'
              ? 0.8
              : 0.9,
  }))
  const caseStudyEntries = caseStudies.map((caseStudy) => ({
    url: absoluteUrl(`/case-studies/${caseStudy.slug}`),
    lastModified: new Date(caseStudy.updatedAt ?? caseStudy.publishedAt ?? caseStudy.createdAt ?? currentDate),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticEntries, ...caseStudyEntries]
}
