'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getCaseStudyBySlug, CaseStudy } from '@/lib/case-studies'
import Footer from '@/components/footer'

export default function CaseStudyDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getCaseStudyBySlug(slug)
        setCaseStudy(data)
      } catch (err) {
        console.error('Failed to fetch case study:', err)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetch()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--app-background))] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[hsl(var(--app-border))] border-t-[hsl(var(--app-text))] rounded-full animate-spin" />
      </div>
    )
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-[hsl(var(--app-background))] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold text-[hsl(var(--app-text))]">
          Case Study Not Found
        </h1>
        <Link
          href="/case-studies"
          className="text-blue-600 hover:text-blue-700 text-sm underline font-mono"
        >
          ← Back to all case studies
        </Link>
      </div>
    )
  }

  const publishDate = caseStudy.publishedAt
    ? new Date(caseStudy.publishedAt.seconds * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))]">
      {/* Hero */}
      <section className="pt-36 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[hsl(var(--app-text-muted))] mb-8 font-mono">
            <Link href="/" className="hover:text-[hsl(var(--app-text))]">
              Home
            </Link>
            <span>/</span>
            <Link href="/case-studies" className="hover:text-[hsl(var(--app-text))]">
              Case Studies
            </Link>
            <span>/</span>
            <span className="text-[hsl(var(--app-text))]">{caseStudy.companyName}</span>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {caseStudy.industry && (
              <span className="text-xs font-mono text-[hsl(var(--app-text-muted))] bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-full px-3 py-1">
                {caseStudy.industry}
              </span>
            )}
            {caseStudy.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-[hsl(var(--app-text-muted))] bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-[hsl(var(--app-text))] mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-nib-pro)' }}
          >
            {caseStudy.title}
          </h1>

          <p className="text-lg text-[hsl(var(--app-text-muted))] font-mono leading-relaxed mb-8">
            {caseStudy.excerpt}
          </p>

          {/* Company & Date */}
          <div className="flex items-center gap-4 pb-8 border-b border-[hsl(var(--app-border))]">
            <div className="flex items-center gap-3">
              {caseStudy.companyLogo && (
                <img
                  src={caseStudy.companyLogo}
                  alt={caseStudy.companyName}
                  className="w-8 h-8 rounded-lg object-contain border border-[hsl(var(--app-border))]"
                />
              )}
              <div>
                <p className="text-sm font-medium text-[hsl(var(--app-text))]">
                  {caseStudy.companyName}
                </p>
                {publishDate && (
                  <p className="text-xs text-[hsl(var(--app-text-muted))] font-mono">
                    {publishDate}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {caseStudy.metrics.map((metric, i) => (
              <div
                key={i}
                className="bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] rounded-xl p-5 text-center"
              >
                <p
                  className="text-2xl sm:text-3xl font-semibold text-[hsl(var(--app-text))] mb-1"
                  style={{ fontFamily: 'var(--font-nib-pro)' }}
                >
                  {metric.value}
                </p>
                <p className="text-xs text-[hsl(var(--app-text-muted))] font-mono">
                  {metric.label}
                </p>
                {metric.description && (
                  <p className="text-xs text-[hsl(var(--app-text-muted))] mt-1 font-mono opacity-70">
                    {metric.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cover Image */}
      {caseStudy.coverImage && (
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <div className="rounded-2xl overflow-hidden border border-[hsl(var(--app-border))]">
            <img
              src={caseStudy.coverImage}
              alt={caseStudy.title}
              className="w-full h-auto"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <article
          className="case-study-content prose prose-neutral max-w-none
            prose-headings:text-[hsl(var(--app-text))] prose-headings:font-semibold
            prose-p:text-[hsl(var(--app-text-muted))] prose-p:leading-relaxed prose-p:font-mono
            prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-700
            prose-strong:text-[hsl(var(--app-text))]
            prose-li:text-[hsl(var(--app-text-muted))] prose-li:font-mono
            prose-blockquote:border-l-[hsl(var(--app-text))] prose-blockquote:text-[hsl(var(--app-text-muted))]
            prose-code:text-[hsl(var(--app-text))] prose-code:bg-[hsl(var(--app-surface))] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[hsl(var(--app-surface))] prose-pre:border prose-pre:border-[hsl(var(--app-border))]
            prose-img:rounded-xl prose-img:border prose-img:border-[hsl(var(--app-border))]
            prose-table:border-collapse
            prose-th:bg-[hsl(var(--app-surface))] prose-th:border prose-th:border-[hsl(var(--app-border))] prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:text-[hsl(var(--app-text))] prose-th:font-mono prose-th:text-sm
            prose-td:border prose-td:border-[hsl(var(--app-border))] prose-td:px-4 prose-td:py-2 prose-td:text-[hsl(var(--app-text-muted))] prose-td:font-mono prose-td:text-sm
            prose-hr:border-[hsl(var(--app-border))]
          "
          dangerouslySetInnerHTML={{ __html: caseStudy.content }}
        />
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] rounded-2xl p-8 sm:p-12 text-center">
          <h2
            className="text-2xl sm:text-3xl text-[hsl(var(--app-text))] mb-4"
            style={{ fontFamily: 'var(--font-nib-pro)' }}
          >
            Ready for similar results?
          </h2>
          <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono mb-6 max-w-lg mx-auto">
            See how Convertive can transform your customer experience with real-time personalization and AI-driven engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="https://cal.com/tanzil-convertive"
              target="_blank"
              className="inline-flex items-center justify-center bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] rounded-full px-6 py-3 text-sm font-mono font-medium hover:opacity-90 transition-opacity"
            >
              Book a Demo
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center border border-[hsl(var(--app-border))] text-[hsl(var(--app-text))] rounded-full px-6 py-3 text-sm font-mono font-medium hover:bg-[hsl(var(--app-surface))] transition-colors"
            >
              More Case Studies
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
