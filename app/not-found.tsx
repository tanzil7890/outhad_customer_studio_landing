import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Page Not Found | Convertive',
  robots: { index: false, follow: false },
}

const internalLinks = [
  { href: '/', label: 'Home' },
  { href: '/convertive-data-platform', label: 'Data Platform' },
  { href: '/convertive-audiences', label: 'Audiences' },
  { href: '/convertive-ai-engine', label: 'AI Decisioning' },
  { href: '/convertive-journey-orchestration', label: 'Journey Orchestration' },
  { href: '/convertive-reporting', label: 'Reporting' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/roi-calculator', label: 'ROI Calculator' },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--app-text-muted))] mb-4">404</p>
        <h1 className="text-4xl sm:text-5xl font-title text-[hsl(var(--app-text))] mb-4">Page Not Found</h1>
        <p className="text-base text-[hsl(var(--app-text-muted))] max-w-md mb-12">
          This page doesn&apos;t exist. Here are some places to get you back on track.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full">
          {internalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] rounded-xl px-4 py-3 text-sm text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] hover:border-[hsl(var(--app-text))] transition-all duration-200 text-center"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="https://tryconvertive.com/demo"
          target="_blank"
          className="mt-10 inline-flex items-center justify-center bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] rounded-full px-8 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Book a Demo
        </Link>
      </div>
      <Footer />
    </div>
  )
}
