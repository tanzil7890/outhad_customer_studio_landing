import Link from 'next/link'
import { siteConfig } from '@/lib/seo'
import { COMPANY_NAV, INSIGHTS_NAV, LEGAL_NAV, PLATFORM_NAV, type NavLink } from '@/lib/site-nav'
import BookDemoButton from './landing/shared/book-demo-button'

const groups: { title: string; links: NavLink[] }[] = [
  { title: 'Platform', links: PLATFORM_NAV },
  { title: 'Insights', links: INSIGHTS_NAV },
  { title: 'Company', links: COMPANY_NAV },
  { title: 'Legal', links: LEGAL_NAV },
]

const linkClass =
  'text-sm text-night-soft transition-colors duration-300 hover:text-night-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text rounded'

const Footer = () => {
  return (
    <footer className="border-t border-night-line bg-night py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-night-line pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-title text-xl font-black uppercase tracking-[0.12em] text-night-text">Convertive</p>
            <p className="mt-2 text-sm text-night-soft">Turn anonymous visitors into buyers</p>
          </div>
          <BookDemoButton location="footer" variant="onDark" className="self-start sm:self-auto" />
        </div>

        <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-4 font-title text-xs font-bold uppercase tracking-widest text-night-muted">{group.title}</h2>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-night-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-night-muted">© {new Date().getFullYear()} Convertive. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href={`mailto:${siteConfig.contactEmail}`} className={linkClass}>
              {siteConfig.contactEmail}
            </Link>
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded text-night-muted transition-colors duration-300 hover:text-night-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href={siteConfig.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded text-night-muted transition-colors duration-300 hover:text-night-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-night-text"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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
