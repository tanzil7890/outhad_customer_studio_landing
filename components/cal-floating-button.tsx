'use client'

import Link from 'next/link'

export default function CalFloatingButton() {
  return (
    <Link
      href="https://tryconvertive.com/demo"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center gap-2 rounded-full bg-[#10182B] text-white shadow-2xl hover:opacity-90 transition-opacity
        w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-3"
      aria-label="Book a Demo"
    >
      {/* Mobile: calendar icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 md:hidden"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      {/* Desktop: text */}
      <span className="hidden md:inline text-sm font-bold">Book a Demo</span>
    </Link>
  )
}
