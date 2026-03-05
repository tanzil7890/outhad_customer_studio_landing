'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/toast/button'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleProductsMouseEnter = () => {
    setIsProductsDropdownOpen(true)
  }

  const handleProductsMouseLeave = () => {
    setIsProductsDropdownOpen(false)
  }

  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen)
  }

  const toggleMobileProducts = () => {
    setIsMobileProductsOpen((v) => !v)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-0 md:p-4">
      <nav className="w-full md:max-w-7xl mx-auto bg-[hsl(var(--app-surface))]/75 backdrop-blur-lg border border-[hsl(var(--app-border))] shadow-sm rounded-none md:rounded-full px-3 sm:px-4 py-2 sm:py-1">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo-black.png"
              alt="Convertive Logo"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            <span className="font-title font-bold sm:text-md hover:text-[hsl(var(--app-text-muted))] transition-colors duration-300">Convertive</span>
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
            <div className="relative group" onMouseEnter={handleProductsMouseEnter} onMouseLeave={handleProductsMouseLeave}>
              <button 
                onClick={toggleProductsDropdown}
                className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-sm flex items-center gap-1"
              >
                Products
                <svg className={`w-3 h-3 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Products Dropdown — Mega Menu */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[780px] bg-[hsl(var(--app-background))] border border-[hsl(var(--app-border))] rounded-2xl shadow-xl transition-all duration-200 ${isProductsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <div className="p-5 flex gap-5">

                  {/* Left — Platform Products */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-mono font-semibold text-[hsl(var(--app-text-muted))] uppercase tracking-widest mb-3 px-1">Platform</p>
                    <div className="grid grid-cols-2 gap-1">
                      {[
                        {
                          href: '/convertive-data-platform',
                          iconBg: 'bg-blue-100',
                          iconColor: 'text-blue-600',
                          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7M4 7l8-4 8 4M4 7l8 4 8-4" />,
                          name: 'Data Platform',
                          desc: 'First-party profiles for every anonymous visitor',
                        },
                        {
                          href: '/convertive-journey-orchestration',
                          iconBg: 'bg-purple-100',
                          iconColor: 'text-purple-600',
                          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />,
                          name: 'Journey Orchestration',
                          desc: 'In-session intervention before visitors leave',
                        },
                        {
                          href: '/convertive-audiences',
                          iconBg: 'bg-emerald-100',
                          iconColor: 'text-emerald-600',
                          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />,
                          name: 'Audiences',
                          desc: 'Live segments that update in milliseconds',
                        },
                        {
                          href: '/convertive-ai-engine',
                          iconBg: 'bg-orange-100',
                          iconColor: 'text-orange-600',
                          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
                          name: 'AI Engine',
                          desc: 'Predict intent and act before they leave',
                        },
                        {
                          href: '/convertive-reporting',
                          iconBg: 'bg-rose-100',
                          iconColor: 'text-rose-600',
                          icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />,
                          name: 'Reporting',
                          desc: 'Track in-session lift and anonymous conversion',
                        },
                      ].map((product) => (
                        <Link
                          key={product.href}
                          href={product.href}
                          className="group flex items-start gap-3 p-3 rounded-xl border border-transparent hover:bg-[hsl(var(--app-surface))]/60 hover:border-[hsl(var(--app-border))] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-text))]/20"
                        >
                          <div className={`w-9 h-9 ${product.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <svg className={`w-4.5 h-4.5 ${product.iconColor}`} style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {product.icon}
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-[hsl(var(--app-text))] leading-snug">{product.name}</p>
                            <p className="text-[11px] text-[hsl(var(--app-text-muted))] leading-snug mt-0.5">{product.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="w-px bg-[hsl(var(--app-border))] self-stretch" />

                  {/* Right — Intelligence + CTA */}
                  <div className="w-[200px] flex flex-col gap-4 flex-shrink-0">
                    <div>
                      <p className="text-[10px] font-mono font-semibold text-[hsl(var(--app-text-muted))] uppercase tracking-widest mb-3 px-1">Intelligence</p>
                      <div className="space-y-0.5">
                        {[
                          {
                            iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600',
                            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
                            name: 'AI Agents',
                            desc: '1:1 experiences at scale',
                          },
                          {
                            iconBg: 'bg-teal-100', iconColor: 'text-teal-600',
                            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                            name: 'Stream & RL',
                            desc: 'Continuous optimization loop',
                          },
                          {
                            iconBg: 'bg-violet-100', iconColor: 'text-violet-600',
                            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 00-2 2v2m0 0V9a2 2 0 012-2h14a2 2 0 012 2v2M7 7h10" />,
                            name: 'Memory Layer',
                            desc: 'Persistent context & learning',
                          },
                        ].map((item) => (
                          <Link
                            key={item.name}
                            href="#"
                            className="group flex items-start gap-2.5 p-2.5 rounded-xl border border-transparent hover:bg-[hsl(var(--app-surface))]/60 hover:border-[hsl(var(--app-border))] transition-all duration-150"
                          >
                            <div className={`w-7 h-7 ${item.iconBg} rounded-md flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <svg className={item.iconColor} style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {item.icon}
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-[hsl(var(--app-text))] leading-snug">{item.name}</p>
                              <p className="text-[10px] text-[hsl(var(--app-text-muted))] leading-snug mt-0.5">{item.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* CTA Box */}
                    <div className="mt-auto rounded-xl bg-gradient-to-br from-[hsl(var(--app-primary))]/10 to-[hsl(var(--app-secondary))]/10 border border-[hsl(var(--app-primary))]/20 p-3.5">
                      <p className="text-xs font-semibold text-[hsl(var(--app-text))] mb-1">See it live</p>
                      <p className="text-[10px] text-[hsl(var(--app-text-muted))] leading-snug mb-3">Watch Convertive convert anonymous visitors in real-time.</p>
                      <Link
                        href="https://cal.com/tanzil-convertive"
                        target="_blank"
                        className="block w-full text-center text-[11px] font-mono font-semibold bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] rounded-lg py-2 hover:opacity-80 transition-opacity"
                      >
                        Book Demo →
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            {/* <Link 
              href="/convertive-history" 
              target="_blank"
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-sm"
            >
              Our History
            </Link> */}
            <Link
              href="/#storylines"
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-sm"
            >
              How it works
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
            <Link href="https://cal.com/tanzil-convertive" target="_blank">
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
          isMobileMenuOpen ? 'max-h-[85vh] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col space-y-4 pb-4 pt-2 border-t border-[hsl(var(--app-border))] overflow-y-auto">
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

            {/* Mobile Products collapsible */}
            <button
              onClick={toggleMobileProducts}
              className="flex items-center justify-between px-2 py-2 rounded-lg text-[hsl(var(--app-text))] bg-[hsl(var(--app-surface))]/50 border border-[hsl(var(--app-border))]"
              aria-expanded={isMobileProductsOpen}
              aria-controls="mobile-products-panel"
            >
              <span className="font-mono font-medium">Products</span>
              <svg className={`w-4 h-4 transition-transform ${isMobileProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id="mobile-products-panel"
              className={`grid grid-cols-1 gap-2 px-1 transition-[grid-template-rows,opacity] duration-300 ${isMobileProductsOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
            >
              <Link href="/convertive-data-platform" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))] hover:bg-[hsl(var(--app-card-hover))]">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Convertive Data Platform</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Real-time profiles for anonymous and known visitors</div>
              </Link>
              <Link href="/convertive-journey-orchestration" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))] hover:bg-[hsl(var(--app-card-hover))]">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Convertive Journey Orchestration</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">In-session intervention and real-time orchestration</div>
              </Link>
              <Link href="/convertive-audiences" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))] hover:bg-[hsl(var(--app-card-hover))]">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Convertive Audiences</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Live segments updated in milliseconds</div>
              </Link>
              <Link href="/convertive-ai-engine" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))] hover:bg-[hsl(var(--app-card-hover))]">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Convertive Engine</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Predict intent and act before they leave</div>
              </Link>
              <Link href="/convertive-reporting" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))] hover:bg-[hsl(var(--app-card-hover))]">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Convertive Reporting</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Track in-session impact and anonymous conversion</div>
              </Link>

              {/* AI side items in mobile list */}
              <div className="mt-2 pt-2 border-t border-[hsl(var(--app-border))]" />
              <div className="px-2 text-xs font-mono text-[hsl(var(--app-text-muted))]">AI</div>
              <Link href="#" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md hover:bg-[hsl(var(--app-surface))]/50">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">AI Agents</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Deliver 1:1 experiences at scale</div>
              </Link>
              <Link href="#" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md hover:bg-[hsl(var(--app-surface))]/50">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Convertive Stream & Reinforcement Learning</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Continuous optimization</div>
              </Link>
              <Link href="#" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md hover:bg-[hsl(var(--app-surface))]/50">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Convertive Memory Layer</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Persistent context and learning storage</div>
              </Link>
            </div>
            <Link
              href="/#storylines"
              onClick={closeMobileMenu}
              className="text-[hsl(var(--app-text-muted))] hover:text-[hsl(var(--app-text))] transition-colors duration-300 font-medium text-base px-2 py-1"
            >
              How it works
            </Link>
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
            
            <Link href="https://cal.com/tanzil-convertive" target="_blank" onClick={closeMobileMenu}>
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
