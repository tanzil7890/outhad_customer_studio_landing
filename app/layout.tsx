import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import './globals.css'
import Header from '../components/header'

export const metadata: Metadata = {
  title: 'Convertive - Real-Time Customer Activation & Personalization Platform',
  description: 'Transform every click, scroll, and pause into instant revenue. Convertive delivers real-time personalization, cart recovery, and unified customer profiles to boost conversions by 15-30% and reduce cart abandonment.',
  keywords: [
    'real-time personalization',
    'customer activation platform',
    'cart abandonment recovery',
    'AI personalization',
    'conversion optimization',
    'unified customer profiles',
    'behavioral analytics',
    'e-commerce AI',
    'session orchestration',
    'real-time marketing automation',
    'customer journey optimization',
    'intent recognition',
    'mobile commerce optimization',
    'social commerce',
    'autonomous experimentation',
    'CDP alternative',
    'Shopify Plus optimization',
    'BigCommerce enhancement',
    'commerce intelligence'
  ],
  authors: [{ name: 'Convertive' }],
  creator: 'Convertive',
  publisher: 'Convertive',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tryconvertive.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Convertive - Real-Time Customer Activation & Personalization Platform',
    description: 'Transform every click, scroll, and pause into instant revenue. Boost conversions by 15-30% with real-time AI personalization and cart recovery.',
    url: 'https://tryconvertive.com',
    siteName: 'Convertive',
    images: [
      {
        url: '/images/convertive-customer-activation-platform/hero-home.png',
        width: 1200,
        height: 630,
        alt: 'Convertive - Real-Time Customer Activation Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convertive - Real-Time Customer Activation & Personalization Platform',
    description: 'Transform every click, scroll, and pause into instant revenue. Boost conversions by 15-30% with real-time AI personalization.',
    images: ['/images/convertive-customer-activation-platform/hero-home.png'],
    creator: '@convertive',
  },
  robots: {
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
  verification: {
    // Add verification codes when you have them
    // google: 'google-site-verification-code',
    // bing: 'bing-verification-code',
  },
  generator: 'Convertive',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/logo-black.ico" />
        <link rel="icon" href="/logo-black.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/logo-black.ico" />
        <link rel="apple-touch-icon" href="/logo-black.ico" />
        <link rel="stylesheet" href="/fonts/stylesheet.css" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  --font-nib-pro: 'Nib Pro', ui-sans-serif, system-ui, sans-serif;
  --font-labil-grotesk: 'Labil Grotesk', ui-sans-serif, system-ui, sans-serif;
}
        `}</style>
      </head>
      <body className="h-full bg-[hsl(var(--app-background))] text-[hsl(var(--app-text))] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Convertive',
              description: 'Real-time customer activation and personalization platform that transforms every click, scroll, and pause into instant revenue.',
              url: 'https://tryconvertive.com',
              logo: 'https://tryconvertive.com/logo-black.png',
              foundingDate: '2024',
              industry: 'Software',
              category: 'E-commerce Technology',
              keywords: ['AI personalization', 'real-time customer activation', 'cart abandonment recovery', 'conversion optimization', 'behavioral analytics', 'e-commerce AI'],
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
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '150',
                bestRating: '5'
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Convertive Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Real-Time Personalization',
                      description: 'AI-powered real-time personalization that adapts to customer behavior instantly'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Cart Recovery Automation',
                      description: 'Intelligent cart abandonment recovery with behavioral triggers'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Unified Customer Profiles',
                      description: 'Unified customer data across all touchpoints and devices'
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Google Analytics - Using Next.js Script component for proper loading */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-T5GM4GLEPM`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T5GM4GLEPM', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        <Header />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}
