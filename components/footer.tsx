import Link from 'next/link'
import { Button } from './ui/button'

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--app-surface))] border-t border-[hsl(var(--app-border))] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Logo/Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-[hsl(var(--app-text))] mb-2 font-title">
              Convertive
            </h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] max-w-xs mx-auto md:mx-0">
              Real-time customer activation and personalization platform
            </p>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h4 className="text-sm font-semibold text-[hsl(var(--app-text))] mb-4 font-title">
              Contact
            </h4>
            <Link 
              href="mailto:info@tryconvertive.com"
              className="text-sm text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300"
            >
              info@tryconvertive.com
            </Link>
          </div>

          {/* Social Links Section */}
          <div className="text-center md:text-right">
            <h4 className="text-sm font-semibold text-[hsl(var(--app-text))] mb-4 font-title">
              Follow Us
            </h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <Link 
                href="https://www.linkedin.com/company/convertiveai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300"
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
                className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300"
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
        <div className="mt-8 pt-8 border-t border-[hsl(var(--app-border))] text-center">
          <p className="text-xs text-[hsl(var(--app-text-muted))]">
            © 2025 Convertive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
