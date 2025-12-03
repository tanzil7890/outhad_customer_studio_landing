'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { AWS_LOGO_PATH } from './convertive-logo-path'
/* import { Button } from '../ui/toast/button' */

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      // Use container dimensions instead of window dimensions
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      setIsMobile(window.innerWidth < 768) // Set mobile breakpoint
    }

    updateCanvasSize()

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
      isAWS: boolean
    }[] = []

    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvas) return 0

      ctx.fillStyle = 'black'
      ctx.save()
      
      // Improved responsive logo sizing - much smaller for mobile
      const logoHeight = isMobile ? 
        Math.min(120, canvas.height * 0.18) : // Mobile: max 120px or 18% of container height
        Math.min(300, canvas.height * 0.35)   // Desktop: max 300px or 35% of container height
      
      // AWS logo actual dimensions from the path coordinates
      const awsActualWidth = 177 // Based on path coordinates
      const awsActualHeight = 61 // Based on path coordinates
      const awsScale = logoHeight / awsActualHeight
      const awsDisplayWidth = awsActualWidth * awsScale
      
      // Center the logo properly with better mobile positioning
      const verticalOffset = isMobile ? -30 : 0
      const horizontalOffset = isMobile ? 0 : 0 // Keep centered horizontally
      ctx.translate(
        canvas.width / 2 - awsDisplayWidth / 2 + horizontalOffset, 
        canvas.height / 2 - logoHeight / 2 + verticalOffset
      )

      // Draw AWS logo
      ctx.save()
      ctx.scale(awsScale, awsScale)
      const path = new Path2D(AWS_LOGO_PATH)
      ctx.fill(path)
      ctx.restore()

      ctx.restore()

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      return awsScale
    }

    function createParticle(scale: number) {
      if (!ctx || !canvas || !textImageData) return null

      const data = textImageData.data
      const particleGap = 2

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: 'black', 
            scatteredColor: '#FF9900', // All particles use AWS orange color
            isAWS: true,
            life: Math.random() * 100 + 50
          }
        }
      }

      return null
    }

    function createInitialParticles(scale: number) {
      if (!canvas) return // Added null check to fix linter error
      
      // Responsive particle count - fewer particles for smaller mobile logo
      const baseParticleCount = isMobile ? 2500 : 6000 // Further reduced for mobile performance and smaller logo
      const screenSizeMultiplier = Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
      const particleCount = Math.floor(baseParticleCount * screenSizeMultiplier)
      
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(scale)
        if (particle) particles.push(particle)
      }
    }

    let animationFrameId: number

    function animate(scale: number) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Use specific light background color
      ctx.fillStyle = '#f5f4f2'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      // Responsive interaction distance
      const maxDistance = isMobile ? 180 : 240

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !('ontouchstart' in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveForce = isMobile ? 40 : 60 // Reduced force on mobile for better UX
          const moveX = Math.cos(angle) * force * moveForce
          const moveY = Math.sin(angle) * force * moveForce
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY
          
          ctx.fillStyle = p.scatteredColor
        } else {
          p.x += (p.baseX - p.x) * 0.1
          p.y += (p.baseY - p.y) * 0.1
          ctx.fillStyle = 'black'
        }

        ctx.fillRect(p.x, p.y, p.size, p.size)

        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle(scale)
          if (newParticle) {
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      // Maintain particle count - consistent with creation
      const baseParticleCount = isMobile ? 2500 : 6000
      const screenSizeMultiplier = Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
      const targetParticleCount = Math.floor(baseParticleCount * screenSizeMultiplier)
      
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle(scale)
        if (newParticle) particles.push(newParticle)
      }

      animationFrameId = requestAnimationFrame(() => animate(scale))
    }

    const scale = createTextImage()
    createInitialParticles(scale)
    animate(scale)

    const handleResize = () => {
      updateCanvasSize()
      const newScale = createTextImage()
      particles = []
      createInitialParticles(newScale)
    }

    const handleMove = (x: number, y: number) => {
      // Adjust mouse coordinates relative to canvas position
      const rect = canvas.getBoundingClientRect()
      mousePositionRef.current = { 
        x: x - rect.left, 
        y: y - rect.top 
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }

    const handleMouseLeave = () => {
      if (!('ontouchstart' in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchstart', handleTouchStart)
    canvas.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchend', handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  return (
    <div 
      ref={containerRef}
      className=" relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#f5f4f2' }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full absolute top-0 left-0 touch-none mt-[-100px]"
        aria-label="Interactive particle effect with Convertive logo"
      />
      {/* <div className={`absolute z-10 text-center px-4 sm:px-8 md:px-12 lg:px-16 w-full ${
        isMobile ? 'bottom-[60px]' : 'bottom-[100px]'
      }`}>
        <p className={`font-mono text-[hsl(var(--app-text-muted))] leading-relaxed ${
          isMobile 
            ? 'text-xs sm:text-sm px-2 max-w-sm sm:max-w-md mx-auto mt-[-350px]' 
            : 'text-base md:text-lg max-w-xl lg:max-w-4xl mx-auto mt-[-200px]'
        }`}>
         Transform every{' '}
          <a 
            href="https://vercel.fyi/v0-reinvent"
            target="_blank"
            rel="noopener noreferrer"
            className="invite-link text-[hsl(var(--app-text-muted))] hover:text-cyan-400 transition-colors duration-300 underline-offset-4 hover:underline"
          >
            click, scroll, and pause 
          </a>{' '}
          <span>into instant revenue.</span>
          <span className="transition-colors duration-300">
            {' '}  Convertive delivers real-time personalization, cart recovery, and unified customer profiles to boost conversions by 15-30% and eliminate cart abandonment.
          </span> 
          
          <style>{`
            a.invite-link:hover + span + span {
              color: #FF9900;
            }
          `}</style>
        </p>
        <div className='pt-5'></div>
        <p className={`font-mono text-[hsl(var(--app-text-muted))] transition-colors  ${
            isMobile ? 'text-xs' : 'text-sm md:text-base'
          }`}>
            ✓ Live Unified Profiles • ✓ In-Session Orchestration • ✓ Autonomous Experimentation
          </p> */}
       {/*  <Button 
              variant="outline"
              size="sm"
              className="font-mono bg-white/10 hover:bg-white backdrop-blur-sm border border-white/30 hover:border-white/50 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-white/10 text-xs sm:text-sm"
            >
              Book Demo
            </Button> */}
      {/* </div> */}
    </div>
  )
}
