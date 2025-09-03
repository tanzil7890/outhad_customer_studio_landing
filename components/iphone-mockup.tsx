'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function IPhoneMockup() {
  const [currentView, setCurrentView] = useState('home')
  const [animateTransition, setAnimateTransition] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateTransition(true)
      setTimeout(() => {
        setCurrentView(prev => prev === 'home' ? 'product' : 'home')
        setAnimateTransition(false)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="ml-auto mr-auto flex items-center justify-center">
      <div className="relative aspect-[1950/3958] h-[500px] sm:h-[650px] lg:h-[800px] w-auto max-w-full">
        <div className="absolute inset-0 px-[5%] py-[4%]">
          <div className="bg-white relative h-full w-full overflow-hidden [border-radius:10%/5%]">
            {/* Layer 1 - Home View */}
            <div className={`absolute inset-0 transition-all duration-300 ${currentView === 'home' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'} ${animateTransition ? 'scale-95' : 'scale-100'}`}>
              <div className="relative w-full h-full">
                <Image
                  src="/images/main1.png"
                  alt="Boot Store Home Page"
                  fill
                  className="z-10 w-full object-cover"
                />
              </div>
              {/* User Avatar Overlay */}
              <div className="absolute top-4 right-16 w-8 h-8 rounded-full border-2 border-white shadow-lg overflow-hidden z-20">
                <Image
                  src="/images/Avatar.png"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Layer 2 - Product Detail View */}
            <div 
              className={`absolute inset-0 transition-all duration-300 ${currentView === 'product' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'} ${animateTransition ? 'scale-95' : 'scale-100'}`}
              style={{ willChange: 'transform', transform: 'translateY(0%)' }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/main2.png"
                  alt="Boot Product Detail Page"
                  fill
                  className="w-full object-cover"
                />
              </div>
              {/* Cart Badge Overlay */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center shadow-lg z-20">
                <span className="text-sm">🛒</span>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[hsl(72,100%,50%)] rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">1</span>
                </div>
              </div>
            </div>
            
            {/* Overlay Effects */}
            <div className="absolute inset-0 z-20 bg-black transition-opacity duration-1000 opacity-25"></div>
            
            {/* Outhad AI Overlay */}
            <div className="absolute top-8 right-6 bg-gradient-to-r from-[hsl(252,100%,37%)] to-[hsl(231,73%,58%)] text-white px-3 py-2 rounded-full z-30 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[hsl(72,100%,50%)] rounded-full animate-pulse"></div>
                <span className="text-sm font-mono font-bold">AI: 0.89</span>
              </div>
            </div>

            {/* Floating Personalization Indicator */}
            <div className="absolute bottom-10 right-6 w-12 h-12 bg-gradient-to-r from-[hsl(72,100%,50%)] to-yellow-400 rounded-full shadow-lg flex items-center justify-center z-30 animate-pulse">
              <span className="text-lg">🎯</span>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full">
          <Image
            src="/phone-screen-frame.png"
            alt="iPhone Frame"
            fill
            className="z-30 object-contain"
          />
        </div>
      </div>
    </div>
  )
}