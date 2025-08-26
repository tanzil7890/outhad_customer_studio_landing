'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/toast/button'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState('dark')

  // Initialize theme on component mount
  React.useEffect(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    let initialTheme = 'dark' // Default to dark
    if (savedTheme) {
      initialTheme = savedTheme
    } else if (systemPrefersDark) {
      initialTheme = 'dark'
    } else {
      initialTheme = 'light'
    }
    
    setTheme(initialTheme)
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark')
    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-4">
      <nav className="max-w-7xl mx-auto bg-black/30 backdrop-blur-lg rounded-full sm:rounded-full px-3 sm:px-4 py-2 sm:py-1">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src={theme === 'dark' ? "/logo-white.png" : "/logo-black.png"}
              alt="Outhad Logo"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            <span className="text-[hsl(var(--app-text))] font-semibold font-mono text-lg sm:text-md hover:text-[hsl(var(--app-text-muted))] transition-colors duration-300">outhad</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex font-mono items-center space-x-6 lg:space-x-8 border-2 border-white/50 border-[0.5px] rounded-full px-4 py-2">
            {/* <Link 
              href="/agent-studio" 
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-sm"
            >
              Agent Studio
            </Link>
            <Link 
              href="/workflow-studio" 
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-sm"
            >
              Workflow Studio
            </Link> */}
            <Link 
              href="https://cloud.outhad.com/signin" 
              target="_blank"
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-sm"
            >
              Outhad Studios
            </Link>
            <Link 
              href="/manifesto" 
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-sm"
            >
              Manifesto
            </Link>
            {/* <Link 
              href="/use-cases" 
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-sm"
            >
              Use Cases
            </Link> */}
          </div>

          {/* Desktop Theme Toggle & CTA Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white transition-all duration-300 shadow-lg hover:shadow-white/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            <Link href="https://cal.com/tanzilouthad" target="_blank">
              <Button 
                variant="outline"
                size="sm"
                className="font-mono bg-white/10 hover:bg-white backdrop-blur-sm border border-white/30 hover:border-white/50 text-white hover:text-black rounded-full transition-all duration-300 shadow-lg hover:shadow-white/10 text-xs sm:text-sm"
              >
                Join Waitlist
              </Button>
            </Link>
          </div>
          

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
            aria-label="Toggle mobile menu"
          >
            <svg 
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col space-y-4 pb-4 pt-2 border-t border-white/10">
            <Link 
              href="/agent-studio" 
              onClick={closeMobileMenu}
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-base px-2 py-1"
            >
              Agent Studio
            </Link>
            <Link 
              href="/workflow-studio" 
              onClick={closeMobileMenu}
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-base px-2 py-1"
            >
              Workflow Studio
            </Link>
            <Link 
              href="/manifesto" 
              onClick={closeMobileMenu}
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-base px-2 py-1"
            >
              Manifesto
            </Link>
            <Link 
              href="/use-cases" 
              onClick={closeMobileMenu}
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-base px-2 py-1"
            >
              Use Cases
            </Link>
            
            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between mt-2 mx-2">
              <span className="text-[hsl(var(--app-text-muted))] text-sm">Theme</span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
            <Link href="https://cal.com/tanzilouthad" target="_blank" onClick={closeMobileMenu}>
              <Button 
                variant="outline"
                size="sm"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-white/10 text-sm mt-2 mx-2"
              >
                Join Waitlist
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}