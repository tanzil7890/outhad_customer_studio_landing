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
        {/* Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MGZL5X3R');`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="alternate" type="application/rss+xml" title="Convertive Blog" href="https://tryconvertive.com/feed.xml" />
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MGZL5X3R"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

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
          src="https://t.contentsquare.net/uxa/9c510e7e809cb.js"
          strategy="afterInteractive"
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
        {/* <EngagementModals /> */}
        <main className="relative overflow-x-clip">
          {children}
        </main>

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "w9bwc2wdi5");
            `,
          }}
        />

        {/* LinkedIn Insight Tag */}
        <Script
          id="linkedin-insight"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "9119580";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: 'none' }} alt="" src="https://px.ads.linkedin.com/collect/?pid=9119580&fmt=gif" />
        </noscript>
      </body>
    </html>
  )
}
