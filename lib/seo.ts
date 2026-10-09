import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Outhad AI',
  tagline: 'Applied intelligence for the live session.',
  url: 'https://www.outhad.com',
  ogImage: '/images/convertive-customer-activation-platform/hero-home.png',
  description:
    'Outhad AI is a research and product lab building systems that decide in milliseconds — and the orchestration layer that puts them to work. Makers of Convertive, Outhad Studio, KoraCode, and ContextKit.',
  products: {
    convertive: 'Convertive',
    studio: 'Outhad Studio',
    koracode: 'KoraCode',
    contextkit: 'Outhad ContextKit',
  },
  contactEmail: 'info@outhad.com',
  careersEmail: 'careers@outhad.com',
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
  /**
   * Social titles are suffixed with the site name by default. Set false when
   * `title` already carries the brand — e.g. the root page, which Next does not
   * apply the layout's title template to.
   */
  appendSiteName?: boolean
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
  appendSiteName = true,
}: MetadataInput): Metadata {
  const url = absoluteUrl(path)
  const fullTitle = appendSiteName ? `${title} | ${siteConfig.name}` : title
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
