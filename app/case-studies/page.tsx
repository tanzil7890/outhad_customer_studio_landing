import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import { getPublishedCaseStudiesServer } from '@/lib/case-studies-server'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Convertive Case Studies - Real Results From Real-Time Personalization',
  description:
    'See how brands use Convertive to drive real-time personalization, reduce cart abandonment, and grow conversions with measurable results.',
  alternates: {
    canonical: '/case-studies',
  },
}

export default async function CaseStudiesPage() {
  const caseStudies = await getPublishedCaseStudiesServer()

  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))]">
      <section className="pt-40 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-[hsl(var(--app-text))] mb-6 leading-tight"
          >
            Customer Success Stories
          </h1>
          <p className="text-base sm:text-lg text-[hsl(var(--app-text-muted))] max-w-2xl mx-auto">
            See how leading brands use Convertive to drive real-time personalization, reduce cart abandonment, and
            lift conversions.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {caseStudies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[hsl(var(--app-text-muted))]">
              No case studies available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((caseStudy) => (
              <Link key={caseStudy.id} href={`/case-studies/${caseStudy.slug}`} className="group block">
                <article className="bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] rounded-2xl overflow-hidden hover:border-[hsl(var(--app-text))] transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                  {caseStudy.coverImage && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={caseStudy.coverImage}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h2
                      className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2 group-hover:text-blue-600 transition-colors line-clamp-2"
                    >
                      {caseStudy.title}
                    </h2>
                    <p className="text-sm text-[hsl(var(--app-text-muted))] mb-4 line-clamp-3 flex-1">
                      {caseStudy.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[hsl(var(--app-border))]">
                      <div className="flex items-center gap-2">
                        {caseStudy.companyLogo && (
                          <img
                            src={caseStudy.companyLogo}
                            alt={caseStudy.companyName}
                            className="w-5 h-5 rounded object-contain"
                          />
                        )}
                        <span className="text-xs text-[hsl(var(--app-text-muted))]">
                          {caseStudy.companyName}
                        </span>
                      </div>
                      {caseStudy.industry && (
                        <span className="text-xs text-[hsl(var(--app-text-muted))] bg-[hsl(var(--app-surface))] rounded-full px-2 py-0.5">
                          {caseStudy.industry}
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
