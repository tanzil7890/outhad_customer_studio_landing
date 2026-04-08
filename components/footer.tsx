import Link from 'next/link'

const footerLinks = [
  { href: '/convertive-data-platform', label: 'Data Platform' },
  { href: '/convertive-audiences', label: 'Audiences' },
  { href: '/convertive-ai-engine', label: 'Decisioning' },
  { href: '/convertive-journey-orchestration', label: 'Journey Orchestration' },
  { href: '/convertive-reporting', label: 'Reporting' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/roi-calculator', label: 'ROI Calculator' },
  { href: '/manifesto', label: 'Manifesto' },
]

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

const Footer = () => {
  return (
    <footer className="bg-[#1A1410] border-t border-[#3D3028] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">

          {/* Logo/Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-black text-[#F5F0EB] mb-2 font-title tracking-widest uppercase">
              Convertive
            </h3>
            <p className="text-sm text-[#C4A898] max-w-xs mx-auto md:mx-0">
              Turn anonymous visitors into buyers
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-xs font-bold text-[#7A6558] mb-4 font-title uppercase tracking-widest">
              Explore
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#C4A898] hover:text-[#F5F0EB] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Section */}
          <div className="text-center md:text-left">
            <h4 className="text-xs font-bold text-[#7A6558] mb-4 font-title uppercase tracking-widest">
              Legal
            </h4>
            <div className="flex flex-col gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#C4A898] hover:text-[#F5F0EB] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h4 className="text-xs font-bold text-[#7A6558] mb-4 font-title uppercase tracking-widest">
              Contact
            </h4>
            <Link
              href="mailto:info@tryconvertive.com"
              className="text-sm text-[#C4A898] hover:text-[#F5F0EB] transition-colors duration-300"
            >
              info@tryconvertive.com
            </Link>
          </div>

          {/* Social Links Section */}
          <div className="text-center md:text-right">
            <h4 className="text-xs font-bold text-[#7A6558] mb-4 font-title uppercase tracking-widest">
              Follow Us
            </h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <Link
                href="https://www.linkedin.com/company/tryconvertive/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7A6558] hover:text-[#C87941] transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>

              <Link
                href="https://x.com/convertiveai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7A6558] hover:text-[#C87941] transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M15.751 2.75h2.812l-6.148 7.024L19 17.25h-5.657l-4.436-5.8L4.218 17.25H1.404l6.575-7.514L1.75 2.75h5.8l4.01 5.297L15.751 2.75zm-.986 12.98h1.557L5.95 4.334H4.29l10.475 11.396z"/>
                </svg>
                <span className="sr-only">X (Twitter)</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-[#3D3028] text-center">
          <p className="text-xs text-[#7A6558]">
            © 2025 Convertive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
