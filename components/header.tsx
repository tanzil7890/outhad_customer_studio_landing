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
              
              {/* Products Dropdown */}
              <div className={`absolute top-full left-0 mt-2 w-[960px] bg-[hsl(var(--app-background))] border border-[hsl(var(--app-border))] rounded-lg shadow-lg transition-all duration-200 ${isProductsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-4">
                    <Link href="/outhad-data-platform" className="group/item block rounded-md p-3 border border-transparent transition-all duration-200 hover:bg-[hsl(var(--app-surface))]/60 hover:border-[hsl(var(--app-border))] hover:shadow-sm hover:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-text))]/20">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7M4 7l8-4 8 4M4 7l8 4 8-4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-[hsl(var(--app-text))] text-sm mb-1">Outhad Data Platform</h4>
                          <p className="text-xs text-[hsl(var(--app-text-muted))]">Unify customer data across all touchpoints</p>
                        </div>
                      </div>
                    </Link>
                    
                    <Link href="/outhad-journey-orchestration" className="group/item block rounded-md p-3 border border-transparent transition-all duration-200 hover:bg-[hsl(var(--app-surface))]/60 hover:border-[hsl(var(--app-border))] hover:shadow-sm hover:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-text))]/20">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-[hsl(var(--app-text))] text-sm mb-1">Outhad Journey Orchestration</h4>
                          <p className="text-xs text-[hsl(var(--app-text-muted))]">Design and automate customer journeys</p>
                        </div>
                      </div>
                    </Link>
                    
                    <Link href="/outhad-audiences" className="group/item block rounded-md p-3 border border-transparent transition-all duration-200 hover:bg-[hsl(var(--app-surface))]/60 hover:border-[hsl(var(--app-border))] hover:shadow-sm hover:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-text))]/20">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-[hsl(var(--app-text))] text-sm mb-1">Outhad Audiences</h4>
                          <p className="text-xs text-[hsl(var(--app-text-muted))]">Build and manage customer segments</p>
                        </div>
                      </div>
                    </Link>
                    
                    <Link href="/outhad-ai-engine" className="group/item block rounded-md p-3 border border-transparent transition-all duration-200 hover:bg-[hsl(var(--app-surface))]/60 hover:border-[hsl(var(--app-border))] hover:shadow-sm hover:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-text))]/20 col-start-2">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-[hsl(var(--app-text))] text-sm mb-1">Outhad AI Engine</h4>
                          <p className="text-xs text-[hsl(var(--app-text-muted))]">AI-powered customer insights and predictions</p>
                        </div>
                      </div>
                    </Link>
                    
                    <Link href="/outhad-reporting" className="group/item block rounded-md p-3 border border-transparent transition-all duration-200 hover:bg-[hsl(var(--app-surface))]/60 hover:border-[hsl(var(--app-border))] hover:shadow-sm hover:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-text))]/20 col-start-3">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-[hsl(var(--app-text))] text-sm mb-1">Outhad Reporting</h4>
                          <p className="text-xs text-[hsl(var(--app-text-muted))]">Advanced analytics and reporting dashboard</p>
                        </div>
                      </div>
                    </Link>
                    
                    {/* Fourth Column - Outhad AI Decisioning */}
                    <div className="group/item rounded-md p-3 border border-transparent col-start-4 row-start-1 row-span-2 border-l border-[hsl(var(--app-border))] pl-4">
                      <div className="flex flex-col text-left gap-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <h4 className="font-medium text-[hsl(var(--app-text))] text-sm">Outhad AI Decisioning</h4>
                        </div>
                        
                        <div className="space-y-3">
                          <Link href="#" className="group block p-2 rounded-md border border-transparent hover:bg-[hsl(var(--app-surface))]/50 hover:border-[hsl(var(--app-border))] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-text))]/20">
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center mt-0.5 group-hover:bg-purple-200 transition-colors">
                                <svg className="w-3 h-3 text-purple-600 group-hover:text-purple-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div className="transition-colors">
                                <p className="text-xs font-medium text-[hsl(var(--app-text))] group-hover:text-[hsl(var(--app-text))]">AI Agents</p>
                                <p className="text-xs text-[hsl(var(--app-text-muted))] mt-0.5 group-hover:text-[hsl(var(--app-text))]/80">Deliver 1:1 experiences at scale</p>
                              </div>
                            </div>
                          </Link>
                          
                          <Link href="#" className="group block p-2 rounded-md border border-transparent hover:bg-[hsl(var(--app-surface))]/50 hover:border-[hsl(var(--app-border))] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-text))]/20">
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center mt-0.5 group-hover:bg-green-200 transition-colors">
                                <svg className="w-3 h-3 text-green-600 group-hover:text-green-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              </div>
                              <div className="transition-colors">
                                <p className="text-xs font-medium text-[hsl(var(--app-text))] group-hover:text-[hsl(var(--app-text))]">Outhad AI Stream & Reinforcement Learning</p>
                                <p className="text-xs text-[hsl(var(--app-text-muted))] mt-0.5 group-hover:text-[hsl(var(--app-text))]/80">Continuous optimization</p>
                              </div>
                            </div>
                          </Link>
                          
                          <Link href="#" className="group block p-2 rounded-md border border-transparent hover:bg-[hsl(var(--app-surface))]/50 hover:border-[hsl(var(--app-border))] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--app-text))]/20">
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mt-0.5 group-hover:bg-blue-200 transition-colors">
                                <svg className="w-3 h-3 text-blue-600 group-hover:text-blue-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 00-2 2v2m0 0V9a2 2 0 012-2h14a2 2 0 012 2v2M7 7h10" />
                                </svg>
                              </div>
                              <div className="transition-colors">
                                <p className="text-xs font-medium text-[hsl(var(--app-text))] group-hover:text-[hsl(var(--app-text))]">Outhad Memory Layer</p>
                                <p className="text-xs text-[hsl(var(--app-text-muted))] mt-0.5 group-hover:text-[hsl(var(--app-text))]/80">Persistent context and learning storage</p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              <Link href="/outhad-data-platform" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))] hover:bg-[hsl(var(--app-card-hover))]">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Outhad Data Platform</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Unify customer data across all touchpoints</div>
              </Link>
              <Link href="/outhad-journey-orchestration" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))] hover:bg-[hsl(var(--app-card-hover))]">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Outhad Journey Orchestration</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Design and automate customer journeys</div>
              </Link>
              <Link href="/outhad-audiences" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))] hover:bg-[hsl(var(--app-card-hover))]">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Outhad Audiences</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Build and manage customer segments</div>
              </Link>
              <Link href="/outhad-ai-engine" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))] hover:bg-[hsl(var(--app-card-hover))]">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Outhad AI Engine</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">AI-powered customer insights and predictions</div>
              </Link>
              <Link href="/outhad-reporting" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))] hover:bg-[hsl(var(--app-card-hover))]">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Outhad Reporting</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Advanced analytics and reporting dashboard</div>
              </Link>

              {/* AI side items in mobile list */}
              <div className="mt-2 pt-2 border-t border-[hsl(var(--app-border))]" />
              <div className="px-2 text-xs font-mono text-[hsl(var(--app-text-muted))]">AI</div>
              <Link href="#" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md hover:bg-[hsl(var(--app-surface))]/50">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">AI Agents</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Deliver 1:1 experiences at scale</div>
              </Link>
              <Link href="#" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md hover:bg-[hsl(var(--app-surface))]/50">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Outhad AI Stream & Reinforcement Learning</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Continuous optimization</div>
              </Link>
              <Link href="#" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md hover:bg-[hsl(var(--app-surface))]/50">
                <div className="text-sm font-medium text-[hsl(var(--app-text))]">Outhad Memory Layer</div>
                <div className="text-xs text-[hsl(var(--app-text-muted))]">Persistent context and learning storage</div>
              </Link>
            </div>
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
