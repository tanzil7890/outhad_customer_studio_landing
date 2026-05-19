import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/toast/button'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { careerRoles } from './roles'

export const metadata: Metadata = buildMetadata({
  title: 'Careers — Growth & Partnerships Internships in LA and NYC',
  description:
    'Join Convertive as a part-time Growth & Partnerships Intern in Los Angeles or New York. Work directly with the founder on early go-to-market, connect with DTC brands and Shopify agencies. $18–$25/hr plus meeting bonuses.',
  path: '/careers',
  image: '/images/careers_og_convertive.png',
  keywords: [
    'convertive careers',
    'growth partnerships intern los angeles',
    'growth partnerships intern new york',
    'ecommerce startup internship',
    'dtc sales internship',
    'shopify agency partnerships',
  ],
  type: 'website',
})

const faqs = [
  {
    question: 'Is this a remote role?',
    answer:
      'Yes, primarily remote with occasional in-person meetings at local ecommerce events, brand showrooms, or roundtables when useful. You should be based in or able to regularly meet ecommerce operators in your target city.',
  },
  {
    question: 'What is the compensation structure?',
    answer:
      '$18–$25 per hour depending on experience, with bonuses per qualified meeting booked, per serious pilot conversation, and per company that becomes a paid pilot/customer. Initial paid 2-week trial, then ongoing with option to extend.',
  },
  {
    question: 'How many hours per week?',
    answer: '10–15 hours per week. Designed to fit alongside school or another part-time commitment.',
  },
  {
    question: 'Is prior sales experience required?',
    answer:
      'No. Strong written communication and genuine interest in startups / ecommerce / AI matter most. Experience in sales, campus ambassador work, ecommerce, retail, or event organizing is a bonus, not a requirement.',
  },
  {
    question: 'What is the application process?',
    answer:
      'Open the role page, submit the Apply form (or email careers@tryconvertive.com). Include your resume plus answers to: (1) Three ecommerce/DTC brands in your city that Convertive should talk to — and why. (2) A short LinkedIn message inviting a Head of Ecommerce to a 15-minute conversation about anonymous traffic and conversion.',
  },
]

export default function CareersPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Careers', url: absoluteUrl('/careers') },
  ])

  const jobPostingSchemas = careerRoles.map((role) => ({
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
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'US',
    },
    url: absoluteUrl(`/careers/${role.slug}`),
  }))

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([breadcrumbs, faqSchema(faqs), ...jobPostingSchemas]),
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-44 lg:pt-52 pb-12 sm:pb-16">
        {/* Hero */}
        <section className="text-center lg:text-left mb-10 sm:mb-16">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C87941] font-bold">Careers</p>
          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-5xl lg:text-6xl text-[#1A1410] font-title leading-[1.1]">
            Help us build the ecommerce network in LA and NYC.
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-[#5C4E44] max-w-3xl leading-relaxed mx-auto lg:mx-0">
            Convertive is an in-session AI engine that helps ecommerce brands convert anonymous website traffic into
            buyers in real time. We are hiring two part-time Growth & Partnerships Interns — one in Los Angeles, one in
            New York — to help us connect with DTC brands, Shopify agencies, and ecommerce operators.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <Link href="#open-roles" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#1A1410] text-[#F5F0EB] rounded-lg px-6 sm:px-8 hover:bg-[#2D2420] transition-colors">
                See open roles
              </Button>
            </Link>
            <Link href="mailto:careers@tryconvertive.com" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto rounded-lg px-6 sm:px-8 border-[#1A1410] text-[#1A1410] hover:bg-[#F5EFE8] break-all">
                careers@tryconvertive.com
              </Button>
            </Link>
          </div>
        </section>

        {/* About Convertive */}
        <section className="mb-12 sm:mb-16 rounded-2xl border border-[#E8DDD4] bg-[#1A1410] text-[#F5F0EB] p-6 sm:p-8 lg:p-10">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#EBBF94] font-bold">About Convertive</p>
          <h2 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-title">In-session AI for ecommerce</h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#C4A898] leading-relaxed max-w-3xl">
            Most marketing tools chase shoppers after they leave. Convertive helps brands act while the shopper is still
            on the site by using live behavioral data to predict intent, personalize the session, and trigger the next
            best action across web, checkout, email, SMS, and ads.
          </p>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#C4A898] leading-relaxed max-w-3xl">
            Backed by gener8tor, Gateway Capital Partners, and industry experts from Amazon, Clorox, and more.
          </p>
        </section>

        {/* Open Roles table */}
        <section id="open-roles" className="mb-12 sm:mb-20 scroll-mt-24 sm:scroll-mt-32">
          <div className="mb-6 sm:mb-8">
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C87941] font-bold">Open Roles</p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-title text-[#1A1410]">Currently hiring</h2>
            <p className="mt-3 sm:mt-4 text-sm text-[#5C4E44] max-w-2xl">
              Tap a role to see the full description and apply.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8DDD4] bg-white overflow-hidden">
            {careerRoles.map((role, i) => (
              <Link
                key={role.slug}
                href={`/careers/${role.slug}`}
                className={`flex items-start sm:grid sm:grid-cols-[140px_1fr_180px_40px] gap-3 sm:gap-6 sm:items-center p-4 sm:p-6 hover:bg-[#FAFAF8] active:bg-[#F2ECE6] transition-colors ${
                  i > 0 ? 'border-t border-[#F2ECE6]' : ''
                }`}
              >
                {/* Mobile-only team pill */}
                <div className="hidden sm:block text-[10px] uppercase tracking-widest text-[#C87941] font-bold">{role.team}</div>
                <div className="flex-1 min-w-0">
                  <div className="sm:hidden text-[10px] uppercase tracking-widest text-[#C87941] font-bold mb-1">{role.team}</div>
                  <div className="text-sm sm:text-base font-semibold text-[#1A1410] leading-snug">
                    {role.title}: {role.city}
                  </div>
                  <div className="text-xs text-[#5C4E44] mt-1">
                    {role.compensation} · {role.hours}
                  </div>
                  <div className="sm:hidden text-xs text-[#5C4E44] mt-1">{role.location}</div>
                </div>
                <div className="hidden sm:block text-xs text-[#5C4E44]">{role.location}</div>
                <div className="text-xl text-[#C87941] sm:text-right shrink-0 self-center">→</div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        {/* <section className="mb-12">
          <h2 className="text-3xl font-title text-[#1A1410] mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-[#F2ECE6] pb-6">
                <h3 className="text-base font-semibold text-[#1A1410] mb-2">{faq.question}</h3>
                <p className="text-sm text-[#5C4E44] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section> */}

        {/* Final CTA */}
        <section className="rounded-2xl border border-[#1A1410] bg-[#1A1410] text-[#F5F0EB] p-6 sm:p-8 lg:p-12 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-title text-[#FDF0E0]">Questions before applying?</h2>
          <p className="mt-3 text-xs sm:text-sm text-[#C4A898] max-w-xl mx-auto leading-relaxed">
            Email <a href="mailto:careers@tryconvertive.com" className="text-[#EBBF94] underline break-all">careers@tryconvertive.com</a> — short notes get faster replies than long ones.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  )
}
