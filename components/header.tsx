'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/toast/button'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-0 md:p-4">
      <nav className="w-full md:max-w-7xl mx-auto bg-[hsl(var(--app-surface))]/75 backdrop-blur-lg border border-[hsl(var(--app-border))] shadow-sm rounded-none md:rounded-full px-3 sm:px-4 py-2 sm:py-1">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo-black.png"
              alt="Outhad Logo"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            <span className="text-[hsl(var(--app-text))] font-semibold font-mono text-lg sm:text-md hover:text-[hsl(var(--app-text-muted))] transition-colors duration-300">outhad</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex font-mono items-center space-x-6 lg:space-x-8 rounded-full px-4 py-2 border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))]/40">
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
              href="/outhad-history" 
              target="_blank"
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-sm"
            >
              Products
              
            </Link>
            <Link 
              href="/outhad-history" 
              target="_blank"
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-sm"
            >
              Our History
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

          {/* Desktop CTA Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link href="https://cal.com/tanzilouthad" target="_blank">
              <Button 
                variant="outline"
                size="sm"
                className="font-mono bg-transparent border border-[hsl(var(--app-text))]/10 text-[hsl(var(--app-text))] hover:bg-[hsl(var(--app-text))] hover:text-[hsl(var(--app-background))] rounded-full transition-colors duration-200 text-xs sm:text-sm"
              >
                Book Demo
              </Button>
            </Link>
          </div>
          

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-[hsl(var(--app-text))] p-2 rounded-xl bg-[hsl(var(--app-surface))]/60 backdrop-blur-sm border border-[hsl(var(--app-border))] hover:bg-[hsl(var(--app-surface))]/80 transition-all duration-200"
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
          <div className="flex flex-col space-y-4 pb-4 pt-2 border-t border-[hsl(var(--app-border))]">
           {/*  <Link 
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
            </Link> */}
            <Link 
              href="/manifesto" 
              onClick={closeMobileMenu}
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-base px-2 py-1"
            >
              Manifesto
            </Link>
            {/* <Link 
              href="/use-cases" 
              onClick={closeMobileMenu}
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-base px-2 py-1"
            >
              Use Cases
            </Link> */}
            
            <Link href="https://cal.com/tanzilouthad" target="_blank" onClick={closeMobileMenu}>
              <Button 
                variant="outline"
                size="sm"
                className="bg-transparent hover:bg-[hsl(var(--app-text))] text-[hsl(var(--app-text))] hover:text-[hsl(var(--app-background))] border border-[hsl(var(--app-text))]/70 rounded-full font-medium transition-colors duration-200 text-sm mt-2 mx-2"
              >
                Book Demo
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
