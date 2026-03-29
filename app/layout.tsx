import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import Header from '../components/header'
import CalFloatingButton from '../components/cal-floating-button'
import EngagementModals from '../components/engagement-modals'
import './globals.css'
import { siteConfig, serializeJsonLd } from '@/lib/seo'
import { organizationSchema, softwareApplicationSchema, websiteSchema } from '@/lib/schema'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Real-Time Customer Activation Platform`,
    template: '%s | Convertive',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'real-time personalization',
    'customer activation platform',
    'ecommerce personalization software',
    'anonymous visitor conversion',
    'in-session personalization',
    'journey orchestration',
    'predictive ecommerce decisioning',
    'customer data platform alternative',
    'real-time audience segmentation',
    'identity stitching for ecommerce',
  ],
  authors: [{ name: 'Convertive' }],
  creator: 'Convertive',
  publisher: 'Convertive',
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/logo-black.ico', type: 'image/x-icon' },
      { url: '/logo-black.png', type: 'image/png' },
    ],
    shortcut: '/logo-black.ico',
    apple: '/logo-black.ico',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: `${siteConfig.name} | Real-Time Customer Activation Platform`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: 'Convertive',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Convertive real-time customer activation platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Real-Time Customer Activation Platform`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@convertiveai',
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
    // Add verification codes here when available.
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4efe7',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`h-full overflow-x-clip ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/fonts/stylesheet.css" />
        <style>{`
html {
  font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-manrope);
  --: ${GeistMono.variable};
  --font-manrope: 'Manrope', ui-sans-serif, system-ui, sans-serif;
}
        `}</style>
      </head>
      <body
        className="h-full overflow-x-clip bg-[hsl(var(--app-background))] text-[hsl(var(--app-text))] antialiased"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd([
              organizationSchema,
              websiteSchema,
              softwareApplicationSchema,
            ]),
          }}
        />

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
        <CalFloatingButton />
        <EngagementModals />
        <main className="relative overflow-x-clip">
          {children}
        </main>
      </body>
    </html>
  )
}
