import type { Metadata } from 'next'
import Footer from '../../components/footer'
import { buildMetadata, serializeJsonLd, absoluteUrl } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'Read the Convertive Privacy Policy to understand how we collect, use, and protect your personal data in compliance with GDPR, CCPA, and applicable privacy laws.',
  path: '/privacy-policy',
  keywords: [
    'Convertive privacy policy',
    'data privacy',
    'GDPR compliance',
    'CCPA compliance',
    'personal data protection',
  ],
})

export default function PrivacyPolicyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Privacy Policy', url: absoluteUrl('/privacy-policy') },
  ])

  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--app-text-muted))] mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-title text-[hsl(var(--app-text))]">Privacy Policy</h1>
          <p className="mt-4 text-sm text-[hsl(var(--app-text-muted))]">
            Last updated: March 29, 2026
          </p>
        </header>

        <div className="prose prose-neutral max-w-none space-y-8 text-[hsl(var(--app-text-muted))] leading-relaxed">

          <section>
            <p>
              Convertive (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website at tryconvertive.com and provides
              the Convertive customer activation platform (&quot;Service&quot;). This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you visit our website or use our Service.
            </p>
            <p className="mt-4">
              By accessing or using the Service, you agree to the collection and use of information in accordance with
              this policy. If you do not agree with the terms of this policy, please do not access the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">1. Information We Collect</h2>
            <h3 className="text-base font-semibold text-[hsl(var(--app-text))] mb-2">1.1 Information You Provide</h3>
            <p>We collect information you voluntarily provide when you:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Request a demo or contact us through our website forms</li>
              <li>Subscribe to communications or marketing materials</li>
              <li>Correspond with us by phone, email, or other channels</li>
              <li>Create an account or engage with our platform</li>
            </ul>
            <p className="mt-3">This information may include your name, email address, phone number, company name, job title, and any other information you choose to provide.</p>

            <h3 className="text-base font-semibold text-[hsl(var(--app-text))] mt-5 mb-2">1.2 Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect certain information about your device and browsing activity, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>IP address and approximate geographic location</li>
              <li>Browser type, version, and operating system</li>
              <li>Pages visited, time spent, and navigation paths</li>
              <li>Referring URLs and exit pages</li>
              <li>Device identifiers and session data</li>
            </ul>

            <h3 className="text-base font-semibold text-[hsl(var(--app-text))] mt-5 mb-2">1.3 Cookies and Tracking Technologies</h3>
            <p>
              We use cookies, web beacons, and similar tracking technologies to enhance your experience, analyze usage,
              and support our marketing activities. You can control cookie settings through your browser preferences.
              Note that disabling cookies may affect certain features of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide, operate, and improve our Service</li>
              <li>Respond to your inquiries and fulfill your requests</li>
              <li>Send you administrative information, product updates, and marketing communications (with your consent where required)</li>
              <li>Analyze usage patterns to improve our website and platform</li>
              <li>Detect, prevent, and address technical issues and fraud</li>
              <li>Comply with legal obligations</li>
              <li>Enforce our Terms of Service and protect the rights and safety of our users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">3. Legal Basis for Processing (GDPR)</h2>
            <p>If you are located in the European Economic Area (EEA), we process your personal data under the following legal bases:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Contract:</strong> Processing necessary to fulfill a contract with you or take steps at your request</li>
              <li><strong>Legitimate Interests:</strong> Processing for our legitimate business interests, such as improving our Service and communicating with prospects</li>
              <li><strong>Consent:</strong> Processing based on your explicit consent, which you may withdraw at any time</li>
              <li><strong>Legal Obligation:</strong> Processing necessary to comply with applicable laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">4. How We Share Your Information</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our website and delivering our Service (e.g., cloud hosting, analytics, email delivery)</li>
              <li><strong>Business Partners:</strong> Trusted partners with whom we jointly offer products or services, with your consent</li>
              <li><strong>Legal Requirements:</strong> When required by law, legal process, or to protect the rights and safety of our users or the public</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with notice to affected users</li>
            </ul>
            <p className="mt-3">All third-party service providers are contractually obligated to protect your information and use it only for the purposes for which it was shared.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes for which it was
              collected, including to satisfy legal, accounting, or reporting requirements. When we no longer need your
              information, we will securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">6. Data Security</h2>
            <p>
              We implement industry-standard technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. These measures include encryption
              of data in transit (TLS) and at rest, access controls, and regular security reviews.
            </p>
            <p className="mt-3">
              While we strive to protect your personal information, no method of transmission over the Internet or
              electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information, subject to certain exceptions</li>
              <li><strong>Portability:</strong> Request transfer of your data to another organization in a machine-readable format</li>
              <li><strong>Objection:</strong> Object to processing of your personal information for certain purposes</li>
              <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              <li><strong>Opt-Out (CCPA):</strong> California residents may opt out of the &quot;sale&quot; of personal information</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:info@tryconvertive.com" className="text-[hsl(var(--app-text))] underline">
                info@tryconvertive.com
              </a>
              . We will respond to your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">8. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence.
              These countries may have data protection laws that differ from those of your country. When we transfer
              personal data from the EEA, we use appropriate safeguards such as Standard Contractual Clauses approved
              by the European Commission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">9. Children&apos;s Privacy</h2>
            <p>
              Our Service is not directed to individuals under the age of 16. We do not knowingly collect personal
              information from children. If you become aware that a child has provided us with personal information,
              please contact us and we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices
              of those websites and encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by
              posting the new policy on this page with an updated &quot;Last updated&quot; date and, where appropriate,
              by sending you a notification. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-3">12. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
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
