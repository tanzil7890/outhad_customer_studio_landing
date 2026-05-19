import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/toast/button'
import CareersApplyDialog from '@/components/careers-apply-dialog'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import {
  careerRoles,
  getRoleBySlug,
  idealCandidate,
  perks,
  whatYoullDo,
} from '../roles'

type RoutePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return careerRoles.map((role) => ({ slug: role.slug }))
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { slug } = await params
  const role = getRoleBySlug(slug)

  if (!role) {
    return {
      title: 'Role not found',
      robots: { index: false, follow: false },
    }
  }

  return buildMetadata({
    title: `${role.title} — ${role.city}`,
    description: `Part-time ${role.title} at Convertive in ${role.city}. Help connect with DTC brands and Shopify agencies. ${role.compensation}, ${role.hours}. Remote with occasional in-person meetings.`,
    path: `/careers/${role.slug}`,
    image: '/images/careers_og_convertive.png',
    keywords: [
      `${role.title} ${role.city}`,
      `growth partnerships intern ${role.shortCity}`,
      'ecommerce startup internship',
      'dtc sales internship',
      'convertive careers',
    ],
    type: 'article',
  })
}

export default async function RoleDetailPage({ params }: RoutePageProps) {
  const { slug } = await params
  const role = getRoleBySlug(slug)

  if (!role) {
    notFound()
  }

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Careers', url: absoluteUrl('/careers') },
    { name: `${role.title} — ${role.city}`, url: absoluteUrl(`/careers/${role.slug}`) },
  ])

  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: `${role.title} — ${role.city}`,
    description: `Part-time Growth & Partnerships Intern at Convertive helping connect with DTC brands and Shopify agencies in ${role.city}.`,
    datePosted: new Date().toISOString().split('T')[0],
    employmentType: 'INTERN',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Convertive',
      sameAs: 'https://tryconvertive.com',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: role.city,
        addressCountry: 'US',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        minValue: 18,
        maxValue: 25,
        unitText: 'HOUR',
      },
    },
    applicantLocationRequirements: { '@type': 'Country', name: 'US' },
    url: absoluteUrl(`/careers/${role.slug}`),
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbs, jobPostingSchema]) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-44 lg:pt-52 pb-12 sm:pb-16">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#5C4E44] flex-wrap">
          <Link href="/" className="hover:text-[#1A1410]">Home</Link>
          <span>/</span>
          <Link href="/careers" className="hover:text-[#1A1410]">Careers</Link>
          <span>/</span>
          <span className="text-[#1A1410] truncate">{role.city}</span>
        </nav>

        {/* Role header */}
        <section className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-[#F2ECE6]">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C87941] font-bold">{role.city}</p>
          <h1 className="mt-2 sm:mt-3 text-2xl sm:text-4xl lg:text-5xl text-[#1A1410] font-title leading-[1.1]">
            {role.title}: {role.city}
          </h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#5C4E44]">
            Convertive (By Outhad) · {role.location}
          </p>

          <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest bg-[#FDF0E0] border border-[#EBBF94] text-[#1A1410] rounded-full px-2.5 sm:px-3 py-1 font-semibold">
              {role.compensation}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest bg-[#FDF0E0] border border-[#EBBF94] text-[#1A1410] rounded-full px-2.5 sm:px-3 py-1 font-semibold">
              {role.hours}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest bg-[#FDF0E0] border border-[#EBBF94] text-[#1A1410] rounded-full px-2.5 sm:px-3 py-1 font-semibold">
              Remote
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest bg-[#FDF0E0] border border-[#EBBF94] text-[#1A1410] rounded-full px-2.5 sm:px-3 py-1 font-semibold">
              Part-time / Intern
            </span>
          </div>

          <div className="mt-5 sm:mt-6">
            <CareersApplyDialog
              roleSlug={role.applySource}
              roleTitle={`${role.title} — ${role.city}`}
              location={role.city}
            />
          </div>
        </section>

        {/* About Convertive */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-base sm:text-lg font-semibold text-[#1A1410] mb-3">About Convertive</h2>
          <p className="text-sm text-[#1A1410] leading-relaxed">
            Convertive is an in-session AI engine that helps ecommerce brands convert anonymous website traffic into
            buyers in real time. Most marketing tools chase shoppers after they leave. Convertive helps brands act
            while the shopper is still on the site by using live behavioral data to predict intent, personalize the
            session, and trigger the next best action across web, checkout, email, SMS, and ads.
          </p>
          <p className="mt-3 text-sm text-[#1A1410] leading-relaxed">
            We are currently expanding our ecommerce network in Los Angeles and New York and are looking for a
            part-time student/operator to help us connect with DTC brands, Shopify agencies, ecommerce operators, and
            growth leaders.
          </p>
          <p className="mt-3 text-sm text-[#1A1410] leading-relaxed">
            Backed by gener8tor, Gateway Capital Partners, and industry experts from Amazon, Clorox, and more,
            Convertive is a growing player in ecommerce innovation. Our solutions are designed to deliver seamless,
            data-driven interventions for maximizing revenue and enhancing the customer experience.
          </p>
        </section>

        {/* Role Overview */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-base sm:text-lg font-semibold text-[#1A1410] mb-3">Role Overview</h2>
          <p className="text-sm text-[#1A1410] leading-relaxed">
            We are hiring a part-time Growth & Partnerships Intern to help Convertive build relationships with
            ecommerce brands and agencies in {role.shortCity === 'LA' ? 'LA' : 'NYC'}.
          </p>
          <p className="mt-3 text-sm text-[#1A1410] leading-relaxed">
            This is not a traditional door-to-door sales role. Your job is to help us identify the right ecommerce
            companies, find the right decision-makers, start conversations, validate interest in private ecommerce
            roundtables, and book short discovery calls.
          </p>
          <p className="mt-3 text-sm text-[#1A1410] leading-relaxed">
            You will work directly with the founder on early go-to-market, outbound strategy, event development, and
            customer discovery.
          </p>
          <p className="mt-3 text-sm text-[#1A1410] leading-relaxed">
            Strong fit for students interested in startups, ecommerce, sales, growth, venture-backed companies,
            marketing technology, or AI.
          </p>
        </section>

        {/* What You'll Do */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-base sm:text-lg font-semibold text-[#1A1410] mb-3">What You&apos;ll Do</h2>
          <ul className="space-y-2">
            {whatYoullDo(role.shortCity).map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#1A1410] leading-relaxed">
                <span className="text-[#C87941] mt-0.5 shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ideal Candidate */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-base sm:text-lg font-semibold text-[#1A1410] mb-3">Ideal Candidate</h2>
          <ul className="space-y-2">
            {idealCandidate(role).map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#1A1410] leading-relaxed">
                <span className="text-[#C87941] mt-0.5 shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Compensation */}
        <section className="mb-8 sm:mb-10 rounded-xl bg-[#FDF0E0] border border-[#EBBF94] p-5 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-[#1A1410] mb-3">Compensation</h2>
          <p className="text-sm text-[#1A1410]">$18–$25/hour depending on experience.</p>
          <p className="mt-4 text-[10px] sm:text-xs uppercase tracking-widest text-[#C87941] font-semibold">Perks</p>
          <ul className="mt-2 space-y-1.5">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-[#1A1410]">
                <span className="text-[#C87941] mt-0.5 shrink-0">+</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[#5C4E44]">
            Expected hours: 10–15 per week. Initial paid 2-week trial, with option to extend.
          </p>
        </section>

        {/* Pre-application questions */}
        <section className="mb-8 sm:mb-10 rounded-xl border border-[#E8DDD4] bg-white p-5 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-[#1A1410] mb-3">Pre-Application Questions</h2>
          <p className="text-xs text-[#5C4E44] mb-4 leading-relaxed">
            Prepare written answers — include them when you submit the Apply form, or email along with your resume to{' '}
            <a href="mailto:careers@tryconvertive.com" className="text-[#C87941] underline break-all">careers@tryconvertive.com</a>.
          </p>
          <ol className="space-y-3 list-decimal pl-5">
            <li className="text-sm text-[#1A1410] leading-relaxed">
              Find 3 ecommerce/DTC brands in {role.shortCity === 'LA' ? 'LA' : 'NY'} that you think Convertive should
              talk to. For each, explain why. (You can use AI for research.)
            </li>
            <li className="text-sm text-[#1A1410] leading-relaxed">
              Write a short LinkedIn message inviting a Head of Ecommerce to a 15-minute conversation about anonymous
              traffic and conversion (for Convertive).
            </li>
          </ol>
        </section>

        {/* Apply CTA */}
        <section className="mb-8 sm:mb-10 rounded-2xl border border-[#1A1410] bg-[#1A1410] text-[#F5F0EB] p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-title text-[#FDF0E0]">Ready to apply?</h2>
          <p className="mt-3 text-xs sm:text-sm text-[#C4A898] max-w-md mx-auto leading-relaxed">
            Submit the form below or email <a href="mailto:careers@tryconvertive.com" className="text-[#EBBF94] underline break-all">careers@tryconvertive.com</a> directly.
          </p>
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <CareersApplyDialog
              roleSlug={role.applySource}
              roleTitle={`${role.title} — ${role.city}`}
              location={role.city}
            />
            <Link href="/careers" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto rounded-lg px-6 border-[#FDF0E0] text-[#000] hover:bg-[#2D2420] hover:text-[#FDF0E0]">
                ← All roles
              </Button>
            </Link>
          </div>
        </section>

        {/* Other roles */}
        <section className="mb-12">
          <h2 className="text-base sm:text-lg font-semibold text-[#1A1410] mb-4">Other open roles</h2>
          <div className="rounded-xl border border-[#E8DDD4] bg-white overflow-hidden">
            {careerRoles
              .filter((r) => r.slug !== role.slug)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/careers/${r.slug}`}
                  className="flex items-start sm:grid sm:grid-cols-[140px_1fr_40px] gap-3 sm:gap-6 sm:items-center p-4 sm:p-5 hover:bg-[#FAFAF8] active:bg-[#F2ECE6] transition-colors"
                >
                  <div className="hidden sm:block text-[10px] uppercase tracking-widest text-[#C87941] font-bold">{r.team}</div>
                  <div className="flex-1 min-w-0">
                    <div className="sm:hidden text-[10px] uppercase tracking-widest text-[#C87941] font-bold mb-1">{r.team}</div>
                    <div className="text-sm sm:text-base font-semibold text-[#1A1410] leading-snug">{r.title}: {r.city}</div>
                    <div className="text-xs text-[#5C4E44] mt-1">{r.compensation} · {r.hours}</div>
                  </div>
                  <div className="text-xl text-[#C87941] sm:text-right shrink-0 self-center">→</div>
                </Link>
              ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
