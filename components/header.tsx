'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import OuthadLogo from './outhad-logo'

const navLinks = [
  { href: 'https://www.tryconvertive.com/', label: 'Convertive' },
  { href: '/outhad-studio', label: 'Outhad Studio' },
  { href: '/careers', label: 'Careers' },
]

const isExternal = (href: string) => /^https?:\/\//.test(href)

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--app-background))]/85 backdrop-blur-md border-b border-[hsl(var(--app-border))]">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          <OuthadLogo />

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={isExternal(link.href) ? '_blank' : undefined}
                rel={isExternal(link.href) ? 'noopener noreferrer' : undefined}
                className="text-sm text-[hsl(var(--app-text-muted))] hover:text-[#1A1410] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/demo"
              className="text-sm text-[#1A1410] border-b border-[#1A1410]/20 hover:border-[#C87941] hover:text-[#C87941] transition-colors duration-200 pb-0.5"
            >
              Talk to us
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="md:hidden -mr-2 p-2 text-[#1A1410]"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              {isMobileMenuOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[hsl(var(--app-border))] py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={isExternal(link.href) ? '_blank' : undefined}
                rel={isExternal(link.href) ? 'noopener noreferrer' : undefined}
                onClick={closeMobileMenu}
                className="py-2.5 text-base text-[#1A1410]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/demo"
              onClick={closeMobileMenu}
              className="py-2.5 text-base text-[#C87941]"
            >
              Talk to us
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
