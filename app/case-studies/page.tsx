'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCaseStudies, CaseStudy } from '@/lib/case-studies'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getCaseStudies('published')
        setCaseStudies(data)
      } catch (err) {
        console.error('Failed to fetch case studies:', err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const industries = ['all', ...new Set(caseStudies.map((cs) => cs.industry).filter(Boolean))]
  const filtered =
    selectedIndustry === 'all'
      ? caseStudies
      : caseStudies.filter((cs) => cs.industry === selectedIndustry)

  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))]">
      {/* Hero */}
      <section className="pt-40 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-[hsl(var(--app-text))] mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-nib-pro)' }}
          >
            Customer Success Stories
          </h1>
          <p className="text-base sm:text-lg text-[hsl(var(--app-text-muted))] max-w-2xl mx-auto font-mono">
            See how leading brands use Convertive to drive real-time personalization, reduce cart abandonment, and lift conversions.
          </p>
        </div>
      </section>

      {/* Filters */}
      {industries.length > 2 && (
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-colors capitalize ${
                  selectedIndustry === ind
                    ? 'bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))]'
                    : 'border border-[hsl(var(--app-border))] text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] hover:border-[hsl(var(--app-text))]'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[hsl(var(--app-border))] border-t-[hsl(var(--app-text))] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[hsl(var(--app-text-muted))] font-mono">
              No case studies available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cs) => (
              <Link
                key={cs.id}
                href={`/case-studies/${cs.slug}`}
                className="group block"
              >
                <article className="bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] rounded-2xl overflow-hidden hover:border-[hsl(var(--app-text))] transition-all duration-300 hover:shadow-lg h-full flex flex-col">
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
                    <h2 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2 group-hover:text-blue-600 transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-nib-pro)' }}>
                      {cs.title}
                    </h2>
                    <p className="text-sm text-[hsl(var(--app-text-muted))] mb-4 line-clamp-3 font-mono flex-1">
                      {cs.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[hsl(var(--app-border))]">
                      <div className="flex items-center gap-2">
                        {cs.companyLogo && (
                          <img
                            src={cs.companyLogo}
                            alt={cs.companyName}
                            className="w-5 h-5 rounded object-contain"
                          />
                        )}
                        <span className="text-xs text-[hsl(var(--app-text-muted))] font-mono">
                          {cs.companyName}
                        </span>
                      </div>
                      {cs.industry && (
                        <span className="text-xs text-[hsl(var(--app-text-muted))] bg-[hsl(var(--app-surface))] rounded-full px-2 py-0.5 font-mono">
                          {cs.industry}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
