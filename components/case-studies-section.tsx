'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCaseStudies, CaseStudy } from '@/lib/case-studies'

export default function CaseStudiesSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getCaseStudies('published')
        setCaseStudies(data.slice(0, 3))
      } catch (err) {
        console.error('Failed to fetch case studies:', err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  if (loading) {
    return (
      <section className="bg-[hsl(var(--app-background))] py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-[hsl(var(--app-border))] border-t-[hsl(var(--app-text))] rounded-full animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  if (caseStudies.length === 0) return null

  return (
    <section className="bg-[hsl(var(--app-background))] py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs sm:text-sm text-[hsl(var(--app-text-muted))] tracking-widest uppercase mb-4">
            Customer Stories
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-[hsl(var(--app-text))] mb-5 leading-tight"
          >
            Real results, real brands
          </h2>
          <p className="text-base sm:text-lg text-[hsl(var(--app-text-muted))] max-w-2xl mx-auto">
            See how leading companies use Convertive to transform their customer experience and drive measurable growth.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {caseStudies.map((cs) => (
            <Link
              key={cs.id}
              href={`/case-studies/${cs.slug}`}
              className="group block w-full md:w-[calc(33.333%-1rem)] md:max-w-sm"
            >
              <article className="bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] rounded-2xl overflow-hidden hover:border-[hsl(var(--app-text))]/30 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                {cs.coverImage && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={cs.coverImage}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  {cs.industry && (
                    <span className="text-xs text-[hsl(var(--app-text-muted))] bg-[hsl(var(--app-surface))] border border-[hsl(var(--app-border))] rounded-full px-3 py-1 w-fit mb-4">
                      {cs.industry}
                    </span>
                  )}
                  <h3
                    className="text-lg font-semibold text-[hsl(var(--app-text))] mb-3 group-hover:text-blue-600 transition-colors line-clamp-2"
                  >
                    {cs.title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--app-text-muted))] leading-relaxed line-clamp-3 flex-1">
                    {cs.excerpt}
                  </p>

                  {/* Metrics preview */}
                  {cs.metrics && cs.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-[hsl(var(--app-border))]">
                      {cs.metrics.slice(0, 2).map((m, i) => (
                        <div key={i} className="flex-1 min-w-0">
                          <p
                            className="text-xl font-semibold text-[hsl(var(--app-text))]"
                          >
                            {m.value}
                          </p>
                          <p className="text-xs text-[hsl(var(--app-text-muted))] truncate">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 border border-[hsl(var(--app-border))] text-[hsl(var(--app-text))] rounded-full px-6 py-3 text-sm font-medium hover:bg-[hsl(var(--app-surface))] hover:border-[hsl(var(--app-text))]/30 transition-all duration-200"
          >
            View all case studies
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
