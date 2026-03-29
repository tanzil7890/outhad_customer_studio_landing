import type { Metadata } from 'next'
import Footer from '../../components/footer'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description:
    'Review the Convertive Terms of Service governing your use of the Convertive customer activation platform, website, and related services.',
  path: '/terms',
  keywords: [
    'Convertive terms of service',
    'terms and conditions',
    'user agreement',
    'acceptable use policy',
    'platform terms',
  ],
})

export default function TermsPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Terms of Service', url: absoluteUrl('/terms') },
  ])

  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--app-text-muted))] mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-title text-[hsl(var(--app-text))]">Terms of Service</h1>
          <p className="mt-4 text-sm text-[hsl(var(--app-text-muted))]">
            Last updated: March 29, 2026
          </p>
        </header>

        <div className="prose prose-neutral max-w-none space-y-8 text-[hsl(var(--app-text-muted))] leading-relaxed">

          <section>
            <p>
              Please read these Terms of Service (&quot;Terms&quot;) carefully before using the Convertive website at
              tryconvertive.com and the Convertive customer activation platform (&quot;Service&quot;) operated by
              Convertive (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
            </p>
            <p className="mt-4">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part
              of these Terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing the Service, you confirm that you are at least 18 years of age, have read and understood
              these Terms, and have the authority to enter into this agreement on behalf of yourself or your organization.
              If you are using the Service on behalf of an organization, you represent that you have the authority to
              bind that organization to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">2. Description of Service</h2>
            <p>
              Convertive provides a real-time customer activation platform for ecommerce businesses, including
              anonymous visitor identification, session-aware audience segmentation, AI-powered decisioning,
              journey orchestration, and conversion analytics (&quot;Service&quot;). The Service is provided on a
              subscription basis as described in your order or agreement with Convertive.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">3. Accounts and Registration</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information.
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
              <li>Ensuring that your account information remains accurate and up to date</li>
            </ul>
            <p className="mt-3">
              We reserve the right to suspend or terminate accounts that provide inaccurate information or violate
              these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">4. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe the intellectual property rights of any third party</li>
              <li>Transmit any harmful, offensive, or unlawful content</li>
              <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Collect or harvest personal information without appropriate consent</li>
              <li>Use the Service for any fraudulent or deceptive purposes</li>
              <li>Reverse-engineer, decompile, or otherwise attempt to derive source code from the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">5. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive
              property of Convertive and its licensors. Our trademarks and trade dress may not be used in connection
              with any product or service without the prior written consent of Convertive.
            </p>
            <p className="mt-3">
              You retain all rights to data you upload or generate through the Service (&quot;Customer Data&quot;).
              By using the Service, you grant Convertive a limited, non-exclusive license to process Customer Data
              solely to provide and improve the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">6. Payment and Billing</h2>
            <p>
              Subscription fees are billed in advance on a monthly or annual basis as agreed in your order.
              All fees are non-refundable except as expressly stated in a separate agreement or as required by
              applicable law.
            </p>
            <p className="mt-3">
              We reserve the right to modify pricing with 30 days&apos; advance notice. Continued use of the Service
              after a price change constitutes acceptance of the new pricing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">7. Confidentiality</h2>
            <p>
              Each party agrees to keep confidential any non-public information disclosed by the other party that
              is designated as confidential or that reasonably should be understood to be confidential given the
              nature of the information and circumstances of disclosure. This obligation does not apply to
              information that is publicly available, independently developed, or disclosed with prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">8. Disclaimers</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
              ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CONVERTIVE, ITS DIRECTORS,
              EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR
              IN CONNECTION WITH YOUR USE OF THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER
              LEGAL THEORY.
            </p>
            <p className="mt-3">
              OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THE SERVICE SHALL NOT EXCEED
              THE FEES YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Convertive and its officers, directors, employees,
              and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs,
              expenses, or fees arising out of or relating to your violation of these Terms or your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">11. Termination</h2>
            <p>
              We may terminate or suspend your access to the Service immediately, without prior notice or liability,
              for any reason, including if you breach these Terms. Upon termination, your right to use the Service
              will immediately cease.
            </p>
            <p className="mt-3">
              You may terminate your account at any time by contacting us at{' '}
              <a href="mailto:info@tryconvertive.com" className="text-[hsl(var(--app-text))] underline">
                info@tryconvertive.com
              </a>
              . Termination does not entitle you to any refund of prepaid fees.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States,
              without regard to its conflict of law provisions. Any disputes arising under these Terms shall be
              subject to the exclusive jurisdiction of the courts located in the United States.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes
              by updating the &quot;Last updated&quot; date at the top of this page and, where appropriate, by notifying
              you via email. Your continued use of the Service after changes become effective constitutes acceptance
              of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">14. Contact Us</h2>
            <p>If you have questions about these Terms, please contact us:</p>
            <div className="mt-3 space-y-1">
              <p><strong className="text-[hsl(var(--app-text))]">Convertive</strong></p>
              <p>
                Email:{' '}
                <a href="mailto:info@tryconvertive.com" className="text-[hsl(var(--app-text))] underline">
                  info@tryconvertive.com
                </a>
              </p>
              <p>Website: <a href="https://tryconvertive.com" className="text-[hsl(var(--app-text))] underline">tryconvertive.com</a></p>
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  )
}
