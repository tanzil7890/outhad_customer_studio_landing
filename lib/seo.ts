import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Convertive',
  url: 'https://tryconvertive.com',
  ogImage: '/images/convertive-customer-activation-platform/hero-home.png',
  description:
    'Convertive helps ecommerce teams convert anonymous visitors with real-time customer activation, session-aware decisioning, and in-session personalization.',
  contactEmail: 'info@tryconvertive.com',
  social: {
    linkedin: 'https://www.linkedin.com/company/tryconvertive/',
    x: 'https://x.com/convertiveai',
  },
} as const

type MetadataInput = {
  title: string
  description: string
  path?: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString()
}

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image = siteConfig.ogImage,
  type = 'website',
  noIndex = false,
}: MetadataInput): Metadata {
  const url = absoluteUrl(path)
  const fullTitle = `${title} | ${siteConfig.name}`
  const imageUrl = absoluteUrl(image)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'en_US',
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  }
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
