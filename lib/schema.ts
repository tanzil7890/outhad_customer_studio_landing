export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Convertive',
  description: 'Real-time customer activation and personalization platform that transforms every click, scroll, and pause into instant revenue.',
  url: 'https://tryconvertive.com',
  logo: 'https://tryconvertive.com/logo-black.png',
  foundingDate: '2024',
  industry: 'Software',
  category: 'E-commerce Technology',
  keywords: [
    'AI personalization', 
    'real-time customer activation', 
    'cart abandonment recovery', 
    'conversion optimization', 
    'behavioral analytics', 
    'e-commerce AI'
  ],
  serviceArea: {
    '@type': 'Place',
    name: 'Global'
  },
  offers: {
    '@type': 'Service',
    name: 'Real-Time Customer Activation Platform',
    description: 'AI-powered platform that delivers real-time personalization, cart recovery, and unified customer profiles to boost e-commerce conversions.',
    category: 'Software as a Service',
    audience: {
      '@type': 'Audience',
      audienceType: 'E-commerce Businesses'
    }
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    url: 'https://cal.com/tanzil-meeting'
  },
  sameAs: [
    'https://cloud.tryconvertive.com'
  ]
}

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Convertive Platform',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web-based',
  description: 'Real-time customer activation and personalization platform for e-commerce businesses.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free demo available',
    url: 'https://cal.com/tanzil-meeting'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150',
    bestRating: '5'
  },
  features: [
    'Real-time personalization',
    'Cart abandonment recovery',
    'Unified customer profiles',
    'Behavioral analytics',
    'AI-powered recommendations',
    'Multi-channel orchestration'
  ]
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Convertive',
  url: 'https://tryconvertive.com',
  description: 'Real-time customer activation and personalization platform',
  publisher: {
    '@type': 'Organization',
    name: 'Convertive',
    logo: {
      '@type': 'ImageObject',
      url: 'https://tryconvertive.com/logo-black.png'
    }
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://tryconvertive.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
}

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
})