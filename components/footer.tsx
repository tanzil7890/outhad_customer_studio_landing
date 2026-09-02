import Link from 'next/link'
import { siteConfig } from '@/lib/seo'
import OuthadMark from './outhad-mark'

const productLinks = [
  { href: '/convertive', label: 'Convertive' },
  { href: '/outhad-studio', label: 'Outhad Studio' },
]

const companyLinks = [
  { href: '/careers', label: 'Careers' },
  { href: '/demo', label: 'Talk to us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

const linkColumns = [
  { heading: 'Products', links: productLinks },
  { heading: 'Company', links: companyLinks },
]

const Footer = () => {
  return (
    <footer className="bg-[#1A1410] border-t border-[#3D3028] py-14 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4 text-[#F5F0EB]">
              <OuthadMark className="w-6 h-6 shrink-0" />
              <span className="flex flex-col">
                <span className="text-sm font-bold tracking-[0.18em] uppercase leading-tight">Outhad</span>
                <span className="text-[9px] tracking-[0.18em] uppercase text-[#7A6558] leading-tight">
                  AI Research Lab
                </span>
              </span>
            </div>
            <p className="text-sm text-[#C4A898] max-w-[22ch] leading-relaxed">
              Applied intelligence for the live session.
            </p>
            <Link
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-block mt-4 text-sm text-[#C4A898] hover:text-[#F5F0EB] transition-colors duration-200"
            >
              {siteConfig.contactEmail}
            </Link>
          </div>

          {/* Link columns */}
          {linkColumns.map((column) => (
            <div key={column.heading}>
              <h2 className="text-[10px] font-bold text-[#7A6558] mb-4 uppercase tracking-[0.18em]">
                {column.heading}
              </h2>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#C4A898] hover:text-[#F5F0EB] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#3D3028] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#7A6558]">
            © {new Date().getFullYear()} Outhad AI. Applied intelligence for the live session.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7A6558] hover:text-[#C87941] transition-colors duration-200"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href={siteConfig.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7A6558] hover:text-[#C87941] transition-colors duration-200"
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M15.751 2.75h2.812l-6.148 7.024L19 17.25h-5.657l-4.436-5.8L4.218 17.25H1.404l6.575-7.514L1.75 2.75h5.8l4.01 5.297L15.751 2.75zm-.986 12.98h1.557L5.95 4.334H4.29l10.475 11.396z" />
              </svg>
              <span className="sr-only">X (Twitter)</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
