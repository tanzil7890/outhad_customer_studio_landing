import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tryconvertive.com'
  const currentDate = new Date().toISOString()
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
    '/demo',
  ] as const

  return publicRoutes.map((route) => ({
    url: route ? `${baseUrl}${route}` : baseUrl,
    lastModified: currentDate,
    changeFrequency:
      route === '/manifesto' || route === '/convertive-history' || route === '/demo'
        ? 'monthly'
        : 'weekly',
    priority:
      route === ''
        ? 1
        : route === '/convertive-history'
          ? 0.6
          : route === '/manifesto' || route === '/demo'
            ? 0.7
            : route === '/case-studies' || route === '/roi-calculator'
              ? 0.8
              : 0.9,
  }))
}
