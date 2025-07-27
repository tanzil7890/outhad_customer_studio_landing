import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import Header from '../components/header'

export const metadata: Metadata = {
  title: 'Outhad - Customer Activation Platform',
  description: 'Building Customer Activation Platform with data and AI',
  generator: 'Outhad',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
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
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="h-full bg-[hsl(var(--app-background))] text-[hsl(var(--app-text))] antialiased">
        <Header />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}
