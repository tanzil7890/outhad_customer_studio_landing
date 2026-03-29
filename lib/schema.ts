import { absoluteUrl, siteConfig } from './seo'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl('/logo-black.png'),
  description: siteConfig.description,
  email: siteConfig.contactEmail,
  sameAs: [siteConfig.social.linkedin, siteConfig.social.x],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: siteConfig.contactEmail,
    url: 'https://tryconvertive.com/demo',
  },
}

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: `${siteConfig.name} Platform`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: siteConfig.description,
  url: siteConfig.url,
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  featureList: [
    'Real-time customer activation',
    'Anonymous-to-known identity progression',
    'Session-aware audience segmentation',
    'Journey orchestration across channels',
    'Predictive decisioning for next-best action',
    'Reporting for lift and conversion diagnostics',
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: {
    '@id': `${siteConfig.url}#organization`,
  },
}

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

export const videoObjectSchema = ({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  duration,
}: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  contentUrl: string
  duration: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  duration,
  publisher: {
    '@id': `${siteConfig.url}#organization`,
  },
})

export const howToSchema = (steps: Array<{ name: string; text: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Convertive Converts Anonymous Visitors in Real Time',
  description:
    'The 4-step process Convertive uses to detect intent, decide the best action, deliver in-session, and capture anonymous visitor identity.',
  step: steps.map((step, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: step.name,
    text: step.text,
  })),
})

export const featureProductSchema = ({
  name,
  description,
  url,
  featureList,
}: {
  name: string
  description: string
  url: string
  featureList: string[]
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  url,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  isPartOf: {
    '@type': 'SoftwareApplication',
    name: `${siteConfig.name} Platform`,
    url: siteConfig.url,
  },
  featureList,
  provider: {
    '@id': `${siteConfig.url}#organization`,
  },
})
