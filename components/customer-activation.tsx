'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function CustomerActivation() {
  // Animation variants
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, duration: 0.5 }
    }
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }



  // New, concise feature set (What we do)
  const featuresNew = [
    {
      title: 'In-Session Orchestration',
      subtitle: 'Act before they leave.',
      description:
        'Trigger the perfect offer in milliseconds—while they\'re still shopping, before they bounce. Real-time intervention at the moment of intent.',
      visual: 'Real-time nudge decisioning overlay on PDP/checkout.',
      image: '/images/convertive-customer-activation-platform/convertive-insession-orchestration.png',
      alt: 'Convertive in-session orchestration visualization',
    },
    {
      title: 'Live Unified Profiles',
      subtitle: 'Understand intent as it happens.',
      description:
        'Even anonymous visitors get real-time profiles. Stitch anonymous and known activity across devices and channels into a single live profile—treat first-time browsers like returning customers.',
      visual: 'Live profile stitching across sessions, devices, and channels.',
      image: '/images/convertive-customer-activation-platform/convertive-unifiedprofile.png',
      alt: 'Convertive unified profile visualization',
    },
    {
      title: 'Anonymous Visitor Conversion',
      subtitle: 'Capture before they\'re gone.',
      description:
        'Capture identity and convert anonymous traffic before they leave—using friction-free prompts at the perfect moment. Recover carts even without email using in-session intervention.',
      visual: 'Exit intent popup + SMS/email recovery flow.',
    },
    {
      title: "Convertive Data Platform",
      subtitle: "Data done right.",
      description: "Start building stronger first-party relationships. Customers are giving you their data. What are you giving them in return? How about highly personalized, customized experiences? With Convertive, you can.",
      visual: "A phone display an IAM simple survey.",
    },
    {
      title: 'Mobile & Social Continuity',
      subtitle: 'Keep context across platforms.',
      description:
        'Preserve context from QR, Instagram, and external links so shoppers continue seamlessly through checkout.',
      visual: 'IG → PDP → Checkout continuity path.',
    },
    {
      title: 'Auto‑Experimentation',
      subtitle: 'Always‑on learning.',
      description:
        'Replace slow, manual A/B testing with continuous learning loops that test, deploy, and improve without analyst drag.',
      visual: 'Loop of test → learn → deploy with metrics.',
      image: '/images/auto-experimentation-flywheel.svg',
      alt: 'Auto-experimentation flywheel cycle diagram',
    },
    {
      title: 'Command Center',
      subtitle: 'One place to run growth.',
      description:
        'Unified control for checkout, analytics, journeys, notifications, and marketing—no more dashboard sprawl.',
      visual: 'Single dashboard with journeys, alerts, KPIs.',
      image: '/images/auto-experimentation-flywheel.svg',
      alt: 'Command Center unified dashboard visualization',
    },
  ]

  const features = [
    {
      title: "Convertive Data Platform",
      subtitle: "Data done right.",
      description: "Start building stronger first-party relationships. Customers are giving you their data. What are you giving them in return? How about highly personalized, customized experiences? With Convertive, you can.",
      visual: "A phone display an IAM simple survey."
    },
    {
      title: "Live Unified Profiles",
      subtitle: "Understand intent as it happens.",
      description: "Stitch anonymous and known activity across devices and channels into a single live profile that updates in real time.",
      visual: "Live profile stitching across sessions, devices, and channels."
    },
    {
      title: "Convertive AI™",
      subtitle: "AI for Growth.",
      description: "Employ convertiveAI™, the world's smartest marketing advisor. As you learn Convertive, convertiveAI™ learns your brand, helping you to create on-brand content and creative, personalize journeys, and double down on winning strategies that multiply returns.",
      visual: "Elements from the the Convertive Sage AI interface connected to parts a push notification they control."
    },
    {
      title: "Journey Orchestration",
      subtitle: "Build a Better Path.",
      description: "Manage campaigns. Move to journey orchestration. No matter where you are today, highly-intelligent, always-on journey orchestration is where you'll want to be tomorrow. See how Convertive is helping brands of all sizes modernize their marketing approach.",
      visual: "An example of an engagement campaign built with Canvas Flow."
    },
    {
      title: "Cross-Channel Messaging",
      subtitle: "Cross-Channel Your Creativity.",
      description: "Never be on fewer channels than your customers. Whether you start with email or another channel, you'll want to keep expanding to keep up with customers. See how cross-channel marketing on a single platform can drive revenue and steer your team toward the future.",
      visual: "A list of messaging channels supported by Convertive"
    },
    {
      title: "Real-time Execution",
      subtitle: "As Real Time As It Gets.",
      description: "Understand the real price of not operating in real time. It's a simple fact: Batch-and-blast campaigns leave money on the table. Discover the ROI-generating power of just-in-time, just-for-you messaging. Delivered with sub-second speed.",
      visual: "An example back-in-stock alert push notification"
    },
    {
      title: "Scale Without Fail",
      subtitle: "Growth. Simply and Securely Delivered.",
      description: "Secure in the now, steeled for what comes next. Whether it's advancements in global privacy and security regulations, or your own influx of data, we take pride in keeping you safe as you create, test and grow. Learn more about how we keep our customers ahead of the compliance and scalability curves.",
      visual: "Security and scalability visualization"
    }
  ]

  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [segmentVh, setSegmentVh] = useState(120)

  useEffect(() => {
    const updateSegment = () => {
      setSegmentVh(window.innerWidth < 768 ? 80 : 120)
    }
    updateSegment()
    window.addEventListener('resize', updateSegment)
    return () => window.removeEventListener('resize', updateSegment)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
      const relativeScroll = window.scrollY - sectionTop
      const segmentHeight = window.innerHeight * (segmentVh / 100)
      let idx = Math.floor(relativeScroll / segmentHeight)
      idx = Math.max(0, Math.min(idx, featuresNew.length - 1))
      setActiveIndex(idx)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [featuresNew.length, segmentVh])

  return (
    <div className="bg-[hsl(var(--app-background))] relative z-10">
      {/* Soft background decorations */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full blur-3xl bg-[radial-gradient(closest-side,_hsl(var(--app-secondary))/20,_transparent)]" />
        <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full blur-3xl bg-[radial-gradient(closest-side,_hsl(var(--app-primary))/15,_transparent)]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl mb-8 font-title bg-clip-text text-black bg-[linear-gradient(90deg,_hsl(var(--app-primary)),_hsl(var(--app-secondary)))]"
            variants={item}
          >
            Activate Customers, Not Campaigns
          </motion.h2>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-6 sm:mb-8">
            
            <motion.p
              className="text-lg sm:text-xl text-[hsl(var(--app-text-muted))] leading-relaxed lg:flex-1 text-left"
              variants={item}
            >
              Customers want experiences, not campaigns. Here's how Convertive turns every session into a personalized journey.
            </motion.p>
            
            <motion.div
              className="lg:flex-1 lg:max-w-md flex justify-center lg:justify-end"
              variants={item}
            >
              <Image
                src="/images/convertive-customer-activation-platform/convertive-features.avif"
                alt="Customer activation features visualization"
                width={300}
                height={250}
                sizes="(max-width: 1024px) 300px, 500px"
                className="w-auto h-32 md:h-60 opacity-90"
                priority={false}
              />
            </motion.div>
          </div>
          
          <motion.div
            className="mx-auto mt-3 h-[2px] w-28 rounded-full bg-[hsl(var(--app-border))]"
            variants={item}
          />
          
          {/* <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12"
            variants={container}
          >
            {['Live Unified Profiles', 'In‑Session Orchestration', 'Recovery', 'Mobile & Social', 'Auto‑Experimentation', 'Command Center'].map((chip, index) => (
              <motion.span
                key={index}
                className="text-xs sm:text-sm text-[hsl(var(--app-text))] bg-[hsl(var(--app-card))] px-3 py-1.5 rounded-full border border-[hsl(var(--app-border))] shadow-[0_0_0_0_hsl(var(--app-primary)/0%)] hover:shadow-[0_0_0_4px_hsl(var(--app-primary)/10%)] transition-shadow"
                variants={item}
                whileHover={{ y: -2 }}
              >
                {chip}
              </motion.span>
            ))}
          </motion.div> */}
        </motion.div>
      </div>

      {/* Features Section — Sticky Scroll Tabs */}
      <div ref={sectionRef} className="relative  ">
        {/* Tall scroll space — each feature gets segmentVh of scroll distance */}
        <div style={{ height: `${featuresNew.length * segmentVh}vh` }}>
          {/* Sticky viewport — stays pinned while parent scrolls */}
          <div className="sticky top-[4vh] h-[88vh] overflow-hidden mx-2 sm:mx-8 lg:mx-16 rounded-2xl shadow-md bg-[hsl(var(--app-background))]">
            <div
              className="h-full grid gap-2 md:gap-3 lg:gap-4 px-3 sm:px-4 lg:px-6 py-3 grid-rows-[2fr_3fr] md:grid-rows-1 grid-cols-1 md:grid-cols-[0.32fr_1fr]"
            >
              {/* LEFT: stacked text panels, one visible at a time */}
              <div className="relative rounded-2xl bg-[hsl(var(--app-surface))] p-4 sm:p-6 flex flex-col h-full">
                <div className="relative flex-1 overflow-hidden">
                  {featuresNew.map((feature, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 flex flex-col py-4 transition-opacity duration-500"
                      style={{ opacity: activeIndex === i ? 1 : 0 }}
                    >
                      <p className="text-xs font-semibold text-[hsl(var(--app-primary))] tracking-[3px] uppercase mb-5">
                        {String(i + 1).padStart(2, '0')} / {String(featuresNew.length).padStart(2, '0')}
                      </p>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[hsl(var(--app-text))] leading-tight mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-base text-[hsl(var(--app-primary))] font-semibold mb-4">{feature.subtitle}</p>
                      <div className="h-px w-full bg-[hsl(var(--app-border))] mb-4" />
                      <p className="text-sm text-[hsl(var(--app-text-muted))] leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
                {/* Step indicator dots */}
                <div className="flex items-center gap-2 mt-4">
                  {featuresNew.map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === activeIndex ? '2rem' : '0.6rem',
                        height: '0.6rem',
                        backgroundColor: i === activeIndex
                          ? 'hsl(var(--app-primary))'
                          : 'hsl(var(--app-text-muted))',
                        opacity: i === activeIndex ? 1 : 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT: stacked visual panels, one visible at a time */}
              <div className="relative rounded-2xl overflow-hidden bg-[hsl(var(--app-card))]">
                {featuresNew.map((feature, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 p-2 overflow-hidden transition-opacity duration-500"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      pointerEvents: activeIndex === index ? 'auto' : 'none',
                    }}
                  >
                {feature.title === 'Convertive Data Platform' ? (
                  // Clean flex-column layout for Convertive Data Platform
                  <motion.div
                    className="w-full h-full rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-3 overflow-auto"
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    {/* Row 1: Data Sources + First-Party Quality stats side by side */}
                    <div className="flex gap-3 items-stretch">
                      {/* Data Sources panel */}
                      <div className="flex-1 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-3">
                        <p className="text-[8px] font-semibold text-[hsl(var(--app-text-muted))] uppercase tracking-wide mb-2.5">Data Ingestion</p>
                        <div className="space-y-2">
                          {[
                            { label: 'Web Session', color: 'bg-blue-500', textColor: 'text-blue-500', val: 'Live' },
                            { label: 'Mobile App', color: 'bg-purple-500', textColor: 'text-purple-500', val: 'Active' },
                            { label: 'Email Events', color: 'bg-amber-500', textColor: 'text-amber-500', val: '12 events' },
                            { label: 'POS / Store', color: 'bg-emerald-500', textColor: 'text-emerald-500', val: 'Syncing' },
                          ].map((src, i) => (
                            <div key={src.label} className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <motion.div
                                  className={`w-1.5 h-1.5 rounded-full ${src.color}`}
                                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.35 }}
                                />
                                <span className="text-[9px] text-[hsl(var(--app-text))]">{src.label}</span>
                              </div>
                              <span className={`text-[8px] font-semibold ${src.textColor}`}>{src.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* First-Party Quality Stats */}
                      <div className="w-28 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-3 flex flex-col justify-between">
                        <p className="text-[8px] font-semibold text-[hsl(var(--app-text-muted))] uppercase tracking-wide mb-1">1st-Party</p>
                        <div className="space-y-2.5">
                          <div>
                            <p className="text-[8px] text-[hsl(var(--app-text-muted))]">Accuracy</p>
                            <p className="text-base font-bold text-emerald-500 leading-none">97%</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-[hsl(var(--app-text-muted))]">Profiles</p>
                            <p className="text-base font-bold text-[hsl(var(--app-primary))] leading-none">1.8M</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-[hsl(var(--app-text-muted))]">ROI vs 3rd</p>
                            <p className="text-base font-bold text-purple-500 leading-none">8.3x</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Processing indicator pill */}
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-emerald-500"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        />
                        <span className="text-[9px] text-emerald-700 font-semibold">Building unified profiles in real-time…</span>
                      </motion.div>
                    </div>

                    {/* Row 3: Unified Profile Hero Card */}
                    <div className="rounded-xl border border-[hsl(var(--app-primary))]/30 bg-gradient-to-br from-[hsl(var(--app-primary))]/5 to-[hsl(var(--app-secondary))]/5 p-3.5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-[8px] text-[hsl(var(--app-text-muted))] uppercase tracking-wide">Unified Profile</p>
                          <p className="text-[11px] font-bold text-[hsl(var(--app-text))] mt-0.5">customer_7f3d → sarah.k@gmail.com</p>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[8px] text-emerald-700 font-semibold">Resolved</span>
                        </div>
                      </div>
                      {/* Attribute badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {[
                          { label: 'Identity Resolved', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                          { label: 'Cross-Channel', cls: 'bg-blue-100 text-blue-700 border-blue-200' },
                          { label: 'Privacy-Compliant', cls: 'bg-purple-100 text-purple-700 border-purple-200' },
                          { label: 'Real-Time', cls: 'bg-amber-100 text-amber-700 border-amber-200' },
                        ].map((badge) => (
                          <span key={badge.label} className={`text-[7px] font-semibold px-1.5 py-0.5 rounded-full border ${badge.cls}`}>
                            {badge.label}
                          </span>
                        ))}
                      </div>
                      {/* Profile completeness bar */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-[8px] text-[hsl(var(--app-text-muted))]">Profile Completeness</span>
                          <span className="text-[8px] font-bold text-emerald-500">94%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[hsl(var(--app-border))] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[hsl(var(--app-primary))]"
                            initial={{ width: 0 }}
                            whileInView={{ width: '94%' }}
                            transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Platform health status bar */}
                    <div className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] px-3 py-2.5 flex items-center justify-between">
                      <span className="text-[9px] font-semibold text-[hsl(var(--app-text))]">First-Party Foundation</span>
                      <div className="flex items-center gap-3">
                        {[
                          { label: 'Sync', color: 'bg-emerald-500' },
                          { label: 'Privacy', color: 'bg-blue-500' },
                          { label: 'Match', color: 'bg-purple-500' },
                        ].map((stat, i) => (
                          <div key={stat.label} className="flex items-center gap-1">
                            <motion.div
                              className={`w-1.5 h-1.5 rounded-full ${stat.color}`}
                              animate={{ opacity: [1, 0.4, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                            />
                            <span className="text-[7px] text-[hsl(var(--app-text-muted))]">{stat.label}</span>
                          </div>
                        ))}
                        <span className="text-[8px] font-semibold text-emerald-500">Excellent</span>
                      </div>
                    </div>
                  </motion.div>
                ) : feature.title === 'Live Unified Profiles' ? (
                  // Clean flex-column layout for Live Unified Profiles
                  <motion.div
                    className="rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-3"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    {/* Row 1: Data Sources + Anonymous Profile card side by side */}
                    <div className="flex gap-3 items-stretch">
                      {/* Data Sources panel */}
                      <div className="flex-1 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-3">
                        <p className="text-[8px] font-semibold text-[hsl(var(--app-text-muted))] uppercase tracking-wide mb-2.5">Data Sources</p>
                        <div className="space-y-2">
                          {[
                            { label: 'Web Session', color: 'bg-blue-500', val: 'Live' },
                            { label: 'Mobile App', color: 'bg-purple-500', val: 'Active' },
                            { label: 'Email Clicks', color: 'bg-amber-500', val: '3 events' },
                            { label: 'Social', color: 'bg-pink-500', val: 'Linked' },
                          ].map((src, i) => (
                            <motion.div
                              key={src.label}
                              className="flex items-center justify-between"
                              initial={{ opacity: 0, x: -8 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + i * 0.08 }}
                              viewport={{ once: true }}
                            >
                              <div className="flex items-center gap-1.5">
                                <motion.div
                                  className={`w-1.5 h-1.5 rounded-full ${src.color}`}
                                  animate={{ scale: [1, 1.4, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                                />
                                <span className="text-[9px] text-[hsl(var(--app-text-muted))]">{src.label}</span>
                              </div>
                              <span className="text-[8px] font-medium text-[hsl(var(--app-text))]">{src.val}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Anonymous visitor partial profile */}
                      <div className="w-28 flex-shrink-0 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-3 flex flex-col items-center gap-2">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-[hsl(var(--app-primary))]/15 border-2 border-[hsl(var(--app-primary))]/30 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[hsl(var(--app-primary))]/50" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                            </svg>
                          </div>
                          <motion.div
                            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-[hsl(var(--app-background))] flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <span className="text-[5px] text-amber-900 font-bold">?</span>
                          </motion.div>
                        </div>
                        <p className="text-[8px] text-[hsl(var(--app-text-muted))]">anon_7f3d</p>
                        <div className="w-full space-y-1">
                          <div className="h-1.5 rounded bg-[hsl(var(--app-border))] overflow-hidden">
                            <motion.div
                              className="h-full bg-[hsl(var(--app-primary))]/50 rounded"
                              initial={{ width: '0%' }}
                              whileInView={{ width: '65%' }}
                              transition={{ duration: 1.2, delay: 0.4 }}
                              viewport={{ once: true }}
                            />
                          </div>
                          <p className="text-[7px] text-[hsl(var(--app-text-muted))] text-center">Building…</p>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Stitching indicator */}
                    <motion.div
                      className="flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-1.5 rounded-full border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] px-3 py-1">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--app-primary))]"
                          animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                          transition={{ duration: 0.9, repeat: Infinity }}
                        />
                        <span className="text-[9px] text-[hsl(var(--app-text-muted))]">Stitching across devices &amp; sessions…</span>
                      </div>
                    </motion.div>

                    {/* Row 3: Resolved unified profile (hero) */}
                    <motion.div
                      className="rounded-xl border border-[hsl(var(--app-primary))]/30 bg-[hsl(var(--app-primary))]/5 p-3"
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.85 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-[hsl(var(--app-primary))]/20 border-2 border-[hsl(var(--app-primary))]/50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[hsl(var(--app-primary))]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                            </svg>
                          </div>
                          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[hsl(var(--app-background))]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-[10px] font-semibold text-[hsl(var(--app-text))]">Unified Profile</p>
                            <span className="text-[7px] text-emerald-500 bg-emerald-500/10 rounded px-1.5 py-0.5">Live</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                            {[
                              { k: 'Intent', v: 'High' },
                              { k: 'Device', v: 'Mobile' },
                              { k: 'Category', v: 'Footwear' },
                              { k: 'LTV est.', v: '$340' },
                            ].map(attr => (
                              <div key={attr.k} className="flex justify-between items-center">
                                <span className="text-[8px] text-[hsl(var(--app-text-muted))]">{attr.k}</span>
                                <span className="text-[8px] font-medium text-[hsl(var(--app-text))]">{attr.v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Row 4: Anonymous → Known progress bar */}
                    <motion.div
                      className="flex items-center gap-2 px-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="text-[8px] text-[hsl(var(--app-text-muted))]">Anonymous</span>
                      </div>
                      <div className="flex-1 h-px bg-[hsl(var(--app-border))] relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-[hsl(var(--app-primary))]"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 1.0, delay: 1.2 }}
                          viewport={{ once: true }}
                          style={{ transformOrigin: 'left' }}
                        />
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[8px] font-medium text-[hsl(var(--app-text))]">Known</span>
                      </div>
                    </motion.div>

                  </motion.div>
                ) : feature.title === 'In‑Session Orchestration' ? (
                  // Special live orchestration layout for In‑Session Orchestration
                  <div className="relative h-[300px] md:h-[600px] overflow-visible">
                    {/* Main container background */}
                    <motion.div
                      className="absolute inset-4 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      <div className="absolute inset-px rounded-2xl bg-[linear-gradient(135deg,_hsl(var(--app-card))_,_hsl(var(--app-card-hover)))]" />
                    </motion.div>

                    {/* Signals & Intent (Top Left) */}
                    <motion.div
                      className="absolute top-4 left-8 md:left-12 w-36 h-28 md:w-44 md:h-36 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: -20, rotate: -5 }}
                      whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="h-full w-full bg-gradient-to-br from-[hsl(var(--app-primary))]/10 to-[hsl(var(--app-secondary))]/10 p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-semibold text-[hsl(var(--app-text))]">Signals & Intent</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                className="w-2 h-2 bg-emerald-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Intent Score</span>
                            </div>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">94%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                className="w-2 h-2 bg-orange-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                              />
                              <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">AI Triggers</span>
                            </div>
                            <span className="text-[8px] md:text-[10px] font-bold text-orange-500">Active</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                className="w-2 h-2 bg-sky-500 rounded-full"
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                              />
                              <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Time on PDP</span>
                            </div>
                            <span className="text-[8px] md:text-[10px] font-bold text-sky-500">1:42</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))] mb-1">
                              <span>Confidence</span>
                              <span>89%</span>
                            </div>
                            <div className="h-1 bg-[hsl(var(--app-border))] rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))]"
                                initial={{ width: 0 }}
                                whileInView={{ width: '89%' }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* In‑Session Nudge (Top Right) */}
                    <motion.div
                      className="absolute top-2 right-4 md:right-8 w-32 h-36 md:w-40 md:h-44 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: -20, rotate: 8 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 5 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 h-full bg-gradient-to-br from-[hsl(var(--app-secondary))]/10 to-[hsl(var(--app-primary))]/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-semibold text-[hsl(var(--app-text))]">In‑Session Nudge</div>
                        </div>
                        
                        {/* Pop-up mockup */}
                        <div className="w-full h-20 md:h-24 rounded-lg bg-[hsl(var(--app-card))] border-2 border-[hsl(var(--app-border))] relative overflow-hidden">
                          <div className="absolute inset-2 rounded grid grid-cols-[auto_1fr] gap-2 items-center">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded bg-gradient-to-br from-[hsl(var(--app-primary))]/30 to-[hsl(var(--app-secondary))]/30 border border-[hsl(var(--app-border))]" />
                            <div className="flex flex-col">
                              <div className="text-[6px] md:text-[8px] font-bold text-[hsl(var(--app-text))] leading-tight">Buy Together & Save 15%</div>
                              <div className="text-[5px] md:text-[6px] text-[hsl(var(--app-text-muted))]">Add charger + case for instant savings</div>
                              <div className="mt-1 flex items-center space-x-1">
                                <motion.span className="inline-block h-3 px-2 rounded-full text-[5px] md:text-[6px] bg-[hsl(var(--app-primary))]/15 text-[hsl(var(--app-primary))] border border-[hsl(var(--app-primary))]/30"
                                  animate={{ opacity: [0.7, 1, 0.7] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >Add Bundle</motion.span>
                                <span className="text-[5px] md:text-[6px] text-[hsl(var(--app-text-muted))]">or</span>
                                <span className="text-[5px] md:text-[6px] underline decoration-dotted">Maybe later</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Overlay targeting & metrics */}
                        <div className="space-y-1 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Target</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-text))]">PDP &gt; 2min • Abandoned once</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Variant</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-blue-500">A</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">CTR</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-purple-500">12.4%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Expected Lift</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">+8.7%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Decision Path (Bottom Left) */}
                    <motion.div
                      className="absolute bottom-8 left-4 md:left-8 w-40 h-36 md:w-48 md:h-40 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: 20, rotate: -8 }}
                      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 h-full bg-gradient-to-br from-[hsl(var(--app-primary))]/5 to-[hsl(var(--app-secondary))]/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-semibold text-[hsl(var(--app-text))]">Decision Path</div>
                        </div>

                        <div className="flex items-center justify-center mb-3">
                          <div className="relative w-full">
                            <svg viewBox="0 0 200 70" className="w-full h-20 hidden md:block" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id={`dpGradA-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="hsl(var(--app-primary))" stopOpacity="0.7" />
                                  <stop offset="100%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.4" />
                                </linearGradient>
                                <linearGradient id={`dpGradB-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.7" />
                                  <stop offset="100%" stopColor="hsl(var(--app-primary))" stopOpacity="0.4" />
                                </linearGradient>
                                <mask id={`dpMask-${index}`}>
                                  <rect x="0" y="0" width="200" height="70" fill="white" />
                                </mask>
                              </defs>

                              <g mask={`url(#dpMask-${index})`}>
                                <motion.path
                                  d="M 10 55 Q 70 10 130 35 T 190 35"
                                  stroke={`url(#dpGradA-${index})`}
                                  strokeWidth="2"
                                  fill="none"
                                  strokeDasharray="4 3"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  whileInView={{ pathLength: 1, opacity: 0.9 }}
                                  transition={{ duration: 1.8 }}
                                  viewport={{ once: true }}
                                />
                                <motion.path
                                  d="M 130 35 Q 150 55 170 60"
                                  stroke={`url(#dpGradB-${index})`}
                                  strokeWidth="2"
                                  fill="none"
                                  strokeDasharray="4 3"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  whileInView={{ pathLength: 1, opacity: 0.7 }}
                                  transition={{ duration: 1.2, delay: 0.4 }}
                                  viewport={{ once: true }}
                                />
                              </g>

                              <circle cx="10" cy="55" r="4" fill="hsl(var(--app-primary))" />
                              <circle cx="130" cy="35" r="4" fill="hsl(var(--app-secondary))" />
                              <circle cx="190" cy="35" r="4" fill="rgb(16,185,129)" />
                              <circle cx="170" cy="60" r="3.5" fill="rgb(248,113,113)" />

                              <motion.circle r="2.5" fill="hsl(var(--app-primary))">
                                <animateMotion dur="2.5s" repeatCount="indefinite" path="M 10 55 Q 70 10 130 35 T 190 35" />
                              </motion.circle>
                            </svg>
                            <div className="flex justify-between mt-1 text-[5px] md:text-[6px] text-[hsl(var(--app-text-muted))] px-1">
                              <span>Visitor</span>
                              <span>Evaluate</span>
                              <span>Offer</span>
                              <span>Recovery</span>
                            </div>
                          </div>
                        </div>

                        {/* Journey metrics */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Branches</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-pink-500">3</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Latency</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-rose-500">120ms</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Decision Stack (Bottom Right) */}
                    <motion.div
                      className="absolute bottom-4 right-8 md:right-12 w-36 h-32 md:w-44 md:h-36 rounded-lg border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: 20, rotate: 12 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 4 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 h-full bg-gradient-to-br from-[hsl(var(--app-secondary))]/5 to-[hsl(var(--app-primary))]/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-semibold text-[hsl(var(--app-text))]">Decision Stack</div>
                        </div>

                        <div className="flex items-center justify-center mb-3">
                          <motion.div
                            className="relative"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            {/* Stacked layers visualization with labels */}
                            <motion.div
                              className="w-16 h-10 md:w-20 md:h-12 rounded-lg bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] absolute flex items-center justify-center"
                              animate={{ y: [0, -2, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <div className="text-[6px] md:text-[8px] text-[hsl(var(--app-text))] flex items-center space-x-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--app-primary))]" />
                                <span>Data</span>
                              </div>
                            </motion.div>
                            <motion.div
                              className="w-16 h-10 md:w-20 md:h-12 rounded-lg bg-gradient-to-br from-[hsl(var(--app-primary))]/20 to-[hsl(var(--app-secondary))]/20 border border-[hsl(var(--app-primary))]/30 relative flex items-center justify-center"
                              style={{ transform: 'translate(4px, -4px)' }}
                              animate={{ y: [0, -1, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                            >
                              <div className="text-[6px] md:text-[8px] text-[hsl(var(--app-text))] flex items-center space-x-1">
                                <span className="w-1.5 h-1.5 rounded bg-[hsl(var(--app-secondary))]" />
                                <span>Decisioning</span>
                              </div>
                            </motion.div>
                            <motion.div
                              className="w-16 h-10 md:w-20 md:h-12 rounded-lg bg-gradient-to-br from-[hsl(var(--app-secondary))]/30 to-[hsl(var(--app-primary))]/30 border border-[hsl(var(--app-secondary))]/40 relative z-10 flex items-center justify-center"
                              style={{ transform: 'translate(8px, -8px)' }}
                              animate={{ y: [0, 1, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                            >
                              <div className="text-[6px] md:text-[8px] text-[hsl(var(--app-text))] flex items-center space-x-1">
                                <span className="w-1.5 h-1.5 rounded-sm bg-emerald-500" />
                                <span>Delivery</span>
                              </div>
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Stack status */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Eligibility</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">On</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Priority</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-yellow-500">High</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Rate Limit</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-sky-500">Safe</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Central Orchestration Hub */}
                    <div className="absolute z-30 pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                      <div className="text-center">
                        <div className="text-[hsl(var(--app-text-muted))] text-xs mb-3">
                          In‑Session Orchestration
                        </div>
                        <motion.div
                          className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                          viewport={{ once: true }}
                        >
                          <Image
                            src="/images/convertive-customer-activation-platform/in-session.avif"
                            alt="Convertive In-Session Orchestration"
                            fill
                            sizes="(max-width: 768px) 96px, 128px"
                            className="object-contain"
                            priority={true}
                          />
                        </motion.div>
                        <div className="text-[hsl(var(--app-text-muted))] text-[8px] md:text-xs mt-2">
                          Real-time Decisioning
                        </div>
                      </div>
                    </div>

                    {/* Connection Lines (masked under the center hub) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block" style={{ overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="orchestrationGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-primary))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="orchestrationGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--app-primary))" stopOpacity="0.3" />
                        </linearGradient>
                        {/* Mask to hide lines beneath the central hub */}
                        <mask id={`orchestrationCenterMask-${index}`}>
                          <rect x="0" y="0" width="100%" height="100%" fill="white" />
                          {/* Hub approximate radius */}
                          <circle cx="300" cy="300" r="64" fill="black" />
                        </mask>
                      </defs>
                      <g mask={`url(#orchestrationCenterMask-${index})`}>
                        {/* Lines from corners to center */}
                        <motion.path
                          d="M150 80 Q250 150 300 300"
                          stroke="url(#orchestrationGradient1)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                        <motion.path
                          d="M450 100 Q375 200 300 300"
                          stroke="url(#orchestrationGradient2)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 0.7 }}
                          viewport={{ once: true }}
                        />
                        <motion.path
                          d="M200 450 Q250 375 300 300"
                          stroke="url(#orchestrationGradient1)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 0.9 }}
                          viewport={{ once: true }}
                        />
                        <motion.path
                          d="M450 420 Q375 360 300 300"
                          stroke="url(#orchestrationGradient2)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 1.1 }}
                          viewport={{ once: true }}
                        />
                      </g>
                    </svg>
                  </div>
                ) : feature.title === 'In-Session Orchestration' ? (
                  // In-Session Orchestration: clean flow layout
                  <motion.div
                    className="rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-3"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    {/* Row 1: Browser PDP + Intent Signals side-by-side */}
                    <div className="flex gap-3 items-stretch">
                      {/* PDP Browser Mock */}
                      <motion.div
                        className="flex-1 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] overflow-hidden shadow-sm"
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <div className="h-5 bg-[hsl(var(--app-surface))] border-b border-[hsl(var(--app-border))] flex items-center px-2 gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          <div className="ml-1.5 h-2 flex-1 bg-[hsl(var(--app-border))]/50 rounded-sm" />
                        </div>
                        <div className="p-2.5">
                          <div className="w-full h-14 rounded-md bg-gradient-to-br from-blue-100/70 to-purple-100/70 mb-2 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[hsl(var(--app-text-muted))]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                          <div className="space-y-1">
                            <div className="h-2 w-4/5 bg-[hsl(var(--app-text))]/20 rounded-sm" />
                            <div className="h-1.5 w-1/2 bg-[hsl(var(--app-text))]/10 rounded-sm" />
                            <div className="flex items-center gap-2 pt-0.5">
                              <div className="h-2.5 w-8 bg-[hsl(var(--app-primary))]/50 rounded-sm" />
                              <div className="h-2 w-6 bg-red-300/50 rounded-sm" />
                            </div>
                          </div>
                          <motion.div
                            className="mt-2 h-5 w-full rounded bg-[hsl(var(--app-primary))]/80 flex items-center justify-center"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          >
                            <span className="text-[7px] text-white font-bold tracking-wide">ADD TO CART</span>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Intent Signals panel */}
                      <motion.div
                        className="w-36 sm:w-40 flex-shrink-0 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] overflow-hidden shadow-sm"
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <div className="p-2.5">
                          <div className="flex items-center gap-1.5 mb-2.5">
                            <motion.div
                              className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"
                              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                              transition={{ duration: 1.4, repeat: Infinity }}
                            />
                            <span className="text-[8px] font-semibold text-[hsl(var(--app-text))]">Live Signals</span>
                          </div>
                          {[
                            { label: 'Scroll depth', value: '78%', color: 'text-blue-500' },
                            { label: 'Time on page', value: '1m 12s', color: 'text-purple-500' },
                            { label: 'Exit risk', value: 'HIGH', color: 'text-orange-500' },
                            { label: 'Price sensitivity', value: 'YES', color: 'text-red-500' },
                          ].map((sig, si) => (
                            <motion.div
                              key={sig.label}
                              className="flex items-center justify-between py-1 border-b border-[hsl(var(--app-border))]/40 last:border-0"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.3 + si * 0.08 }}
                              viewport={{ once: true }}
                            >
                              <span className="text-[7px] text-[hsl(var(--app-text-muted))]">{sig.label}</span>
                              <span className={`text-[8px] font-bold ${sig.color}`}>{sig.value}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Row 2: AI decision arrow */}
                    <motion.div
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring', stiffness: 260 }}
                      viewport={{ once: true }}
                    >
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[hsl(var(--app-primary))]/30" />
                      <motion.div
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[hsl(var(--app-primary))]/40 bg-[hsl(var(--app-primary))]/8"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <svg className="w-3 h-3 text-[hsl(var(--app-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-[9px] font-bold text-[hsl(var(--app-primary))]">AI deciding — &lt;100ms</span>
                      </motion.div>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[hsl(var(--app-primary))]/30" />
                    </motion.div>

                    {/* Row 3: Nudge popup — hero element */}
                    <motion.div
                      className="rounded-xl border border-[hsl(var(--app-primary))]/40 bg-[hsl(var(--app-background))] shadow-lg overflow-hidden"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, type: 'spring', stiffness: 220 }}
                      viewport={{ once: true }}
                    >
                      <div className="h-0.5 w-full bg-gradient-to-r from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))]" />
                      <div className="p-3 flex items-start gap-3">
                        <div className="flex-1">
                          <p className="text-[8px] uppercase tracking-widest text-[hsl(var(--app-text-muted))] mb-0.5">Convertive AI — in session</p>
                          <p className="text-xs sm:text-sm font-title text-[hsl(var(--app-text))] mb-1.5">Complete your order &amp; save 10%</p>
                          <p className="text-[9px] text-[hsl(var(--app-text-muted))] mb-2.5">Enter your email to unlock — today only.</p>
                          <div className="flex items-center gap-2">
                            <motion.div
                              className="flex-1 h-6 rounded-lg bg-black flex items-center justify-center cursor-pointer"
                              whileHover={{ scale: 1.03 }}
                            >
                              <span className="text-[8px] text-white font-bold">Claim Offer</span>
                            </motion.div>
                            <div className="h-6 px-2.5 rounded-lg border border-[hsl(var(--app-border))] flex items-center justify-center">
                              <span className="text-[8px] text-[hsl(var(--app-text-muted))]">Later</span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          className="w-5 h-5 rounded-full bg-[hsl(var(--app-primary))]/15 flex items-center justify-center flex-shrink-0 mt-0.5"
                          animate={{ scale: [1, 1.25, 1] }}
                          transition={{ duration: 1.6, repeat: Infinity }}
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--app-primary))]" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Row 4: Timeline strip */}
                    <motion.div
                      className="flex items-center pt-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.0 }}
                      viewport={{ once: true }}
                    >
                      {[
                        { t: '0:00', label: 'Arrives', done: true },
                        { t: '0:15', label: 'Intent', done: true },
                        { t: '0:18', label: 'Nudge', done: true },
                        { t: '0:47', label: 'Converted', done: false },
                      ].map((ev, ei, arr) => (
                        <React.Fragment key={ev.t}>
                          <motion.div
                            className="flex flex-col items-center gap-0.5"
                            initial={{ opacity: 0, y: 4 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 + ei * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {ev.done ? (
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            ) : (
                              <motion.div
                                className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--app-primary))]"
                                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.2, repeat: Infinity }}
                              />
                            )}
                            <span className="text-[7px] font-bold text-[hsl(var(--app-text-muted))]">{ev.t}</span>
                            <span className="text-[6px] text-[hsl(var(--app-text-muted))]/70">{ev.label}</span>
                          </motion.div>
                          {ei < arr.length - 1 && (
                            <div className="flex-1 h-px bg-[hsl(var(--app-border))] mx-1 mb-4" />
                          )}
                        </React.Fragment>
                      ))}
                    </motion.div>

                  </motion.div>
                ) : feature.title === 'Anonymous Visitor Conversion' ? (
                  // Clean flex-column layout for Anonymous Visitor Conversion
                  <motion.div
                    className="rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-3"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    {/* Row 1: Visitor state + Trigger signals side by side */}
                    <div className="flex gap-3 items-stretch">
                      {/* Left: Browser with visitor about to exit */}
                      <motion.div
                        className="flex-1 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] overflow-hidden"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        {/* Browser chrome */}
                        <div className="h-5 bg-[hsl(var(--app-surface))] border-b border-[hsl(var(--app-border))] flex items-center px-2 gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          <div className="ml-1.5 h-2 flex-1 bg-[hsl(var(--app-border))]/50 rounded-sm" />
                        </div>
                        {/* Page content mockup */}
                        <div className="p-2 space-y-1.5">
                          <div className="h-8 w-full rounded bg-[hsl(var(--app-border))]/30" />
                          <div className="h-1.5 w-4/5 rounded bg-[hsl(var(--app-border))]/20" />
                          <div className="h-1.5 w-3/5 rounded bg-[hsl(var(--app-border))]/20" />
                          <div className="flex gap-1.5 pt-1">
                            <div className="h-5 flex-1 rounded bg-[hsl(var(--app-primary))]/20 border border-[hsl(var(--app-primary))]/30" />
                          </div>
                        </div>
                        {/* Exit cursor indicator */}
                        <motion.div
                          className="flex items-center gap-1 px-2 pb-2"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span className="text-[7px] text-red-500">Exit intent detected</span>
                        </motion.div>
                      </motion.div>

                      {/* Right: Trigger signals */}
                      <div className="w-28 flex-shrink-0 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-2.5 flex flex-col gap-1.5">
                        <p className="text-[7px] font-semibold text-[hsl(var(--app-text-muted))] uppercase tracking-wide">Signals</p>
                        {[
                          { label: 'Exit risk', value: 'High', color: 'text-red-500' },
                          { label: 'Price sens.', value: 'High', color: 'text-amber-500' },
                          { label: 'Time on page', value: '2:34', color: 'text-[hsl(var(--app-text))]' },
                          { label: 'Cart value', value: '$129', color: 'text-[hsl(var(--app-text))]' },
                        ].map((sig, i) => (
                          <motion.div
                            key={sig.label}
                            className="flex flex-col"
                            initial={{ opacity: 0, x: 6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.07 }}
                            viewport={{ once: true }}
                          >
                            <span className="text-[7px] text-[hsl(var(--app-text-muted))]">{sig.label}</span>
                            <span className={`text-[8px] font-semibold ${sig.color}`}>{sig.value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Row 2: Exit-intent capture popup (hero) */}
                    <motion.div
                      className="rounded-xl border border-[hsl(var(--app-primary))]/40 bg-[hsl(var(--app-primary))]/5 p-3"
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.55, type: 'spring', stiffness: 180, damping: 20 }}
                      viewport={{ once: true }}
                    >
                      {/* Popup header strip */}
                      <div className="h-1 w-full rounded-t-sm bg-gradient-to-r from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] mb-2 -mx-3 -mt-3 w-[calc(100%+1.5rem)] rounded-t-xl" style={{ width: 'calc(100% + 1.5rem)', marginLeft: '-0.75rem', marginRight: '-0.75rem', marginTop: '-0.75rem', borderRadius: '0.75rem 0.75rem 0 0' }} />
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="text-[10px] font-bold text-[hsl(var(--app-text))] leading-tight">Wait! Complete your order</p>
                          <p className="text-[8px] text-[hsl(var(--app-text-muted))]">Get 10% off — enter email to claim</p>
                        </div>
                        <motion.div
                          className="w-5 h-5 rounded-full bg-[hsl(var(--app-primary))]/15 flex items-center justify-center flex-shrink-0"
                          animate={{ scale: [1, 1.25, 1] }}
                          transition={{ duration: 1.6, repeat: Infinity }}
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--app-primary))]" />
                        </motion.div>
                      </div>
                      {/* Capture form */}
                      <div className="flex gap-1.5 mb-2">
                        <div className="flex-1 h-6 rounded-lg border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] flex items-center px-2">
                          <span className="text-[8px] text-[hsl(var(--app-text-muted))]">email or phone…</span>
                        </div>
                        <motion.div
                          className="h-6 px-2.5 rounded-lg bg-[hsl(var(--app-primary))] flex items-center justify-center cursor-pointer"
                          whileHover={{ scale: 1.03 }}
                        >
                          <span className="text-[8px] text-white font-bold">Claim</span>
                        </motion.div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-[7px] text-[hsl(var(--app-text-muted))]">No credit card · Instant discount</span>
                      </div>
                    </motion.div>

                    {/* Row 3: Identity captured → profile created */}
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.85 }}
                      viewport={{ once: true }}
                    >
                      {/* Before */}
                      <div className="flex items-center gap-1.5 rounded-lg border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] px-2 py-1.5 flex-1">
                        <div className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-[6px] text-amber-600 font-bold">?</span>
                        </div>
                        <div>
                          <p className="text-[7px] font-semibold text-[hsl(var(--app-text-muted))]">Anonymous</p>
                          <p className="text-[6px] text-[hsl(var(--app-text-muted))]/60">anon_7f3d</p>
                        </div>
                      </div>
                      {/* Arrow */}
                      <motion.div
                        className="text-[hsl(var(--app-primary))] flex-shrink-0"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                      {/* After */}
                      <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-2 py-1.5 flex-1">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-[7px] font-semibold text-emerald-600">Identified</p>
                          <p className="text-[6px] text-[hsl(var(--app-text-muted))]/60">sarah@…</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Row 4: Recovery flow triggered */}
                    <motion.div
                      className="flex items-center gap-1.5"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-[7px] text-[hsl(var(--app-text-muted))] flex-shrink-0">Recovery:</span>
                      {[
                        { label: 'Email ✓', color: 'bg-blue-500/10 border-blue-500/30 text-blue-600' },
                        { label: 'SMS ✓', color: 'bg-purple-500/10 border-purple-500/30 text-purple-600' },
                        { label: 'Retarget ✓', color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600' },
                      ].map((pill, i) => (
                        <motion.span
                          key={pill.label}
                          className={`text-[7px] rounded-full border px-1.5 py-0.5 ${pill.color}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.15 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {pill.label}
                        </motion.span>
                      ))}
                    </motion.div>

                  </motion.div>
                ) : feature.title === 'Cart & Browse Recovery' ? (
                  // Special cart & browse recovery visualization
                  <div className="relative h-[300px] md:h-[600px] overflow-visible">
                    {/* Main container background */}
                    <motion.div
                      className="absolute inset-4 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      <div className="absolute inset-px rounded-2xl bg-[linear-gradient(135deg,_hsl(var(--app-card))_,_hsl(var(--app-card-hover)))]" />
                    </motion.div>

                    {/* Exit-Intent Popup (Top Left) */}
                    <motion.div
                      className="absolute top-4 left-8 md:left-12 w-40 h-32 md:w-48 md:h-40 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: -20, rotate: -5 }}
                      whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="h-full w-full bg-gradient-to-br from-[hsl(var(--app-primary))]/10 to-[hsl(var(--app-secondary))]/10 p-3 relative">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-semibold text-[hsl(var(--app-text))]">Exit-Intent Detection</div>
                        </div>

                        {/* Exit popup mockup */}
                        <div className="relative bg-[hsl(var(--app-card))] border-2 border-[hsl(var(--app-primary))]/30 rounded-lg p-2 shadow-lg">
                          <div className="text-[6px] md:text-[8px] font-bold text-[hsl(var(--app-text))] mb-1">Wait! Complete your purchase</div>
                          <div className="text-[5px] md:text-[6px] text-[hsl(var(--app-text-muted))] mb-2">Save 15% on your cart items</div>
                          
                          {/* Email capture form */}
                          <div className="space-y-1">
                            <div className="h-2 bg-[hsl(var(--app-background))] rounded border border-[hsl(var(--app-border))] text-[4px] flex items-center px-1">
                              <span className="text-[hsl(var(--app-text-muted))]">Enter email for discount</span>
                            </div>
                            <motion.div 
                              className="h-2 bg-[hsl(var(--app-primary))] rounded text-white text-[4px] flex items-center justify-center"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              Claim Discount
                            </motion.div>
                          </div>
                        </div>

                        {/* Detection metrics */}
                        <div className="space-y-1 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Detection Rate</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-primary))]">94.2%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Conversion</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-secondary))]">31.4%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Session Flow Diagram (Top Right) */}
                    <motion.div
                      className="absolute top-2 right-4 md:right-8 w-36 h-36 md:w-44 md:h-44 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: -20, rotate: 8 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 5 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 h-full bg-gradient-to-br from-[hsl(var(--app-secondary))]/10 to-[hsl(var(--app-primary))]/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-semibold text-[hsl(var(--app-text))]">Session Flow</div>
                        </div>
                        
                        {/* Flow visualization */}
                        <div className="relative h-16 md:h-20 w-full mb-2">
                          <svg viewBox="0 0 120 60" className="w-full h-full">
                            {/* Flow steps */}
                            <circle cx="15" cy="30" r="4" fill="hsl(var(--app-primary))" />
                            <text x="15" y="48" fontSize="4" fill="hsl(var(--app-text-muted))" textAnchor="middle">Visit</text>
                            
                            <circle cx="45" cy="30" r="4" fill="hsl(var(--app-secondary))" />
                            <text x="45" y="48" fontSize="4" fill="hsl(var(--app-text-muted))" textAnchor="middle">Browse</text>
                            
                            <circle cx="75" cy="30" r="4" fill="hsl(var(--app-text-muted))" />
                            <text x="75" y="48" fontSize="4" fill="hsl(var(--app-text-muted))" textAnchor="middle">Exit</text>
                            
                            <circle cx="105" cy="30" r="4" fill="hsl(var(--app-primary))" />
                            <text x="105" y="48" fontSize="4" fill="hsl(var(--app-text-muted))" textAnchor="middle">Recover</text>

                            {/* Flow arrows */}
                            <motion.path
                              d="M 23 30 L 37 30"
                              stroke="hsl(var(--app-primary))"
                              strokeWidth="2"
                              markerEnd="url(#arrowhead)"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                            <motion.path
                              d="M 53 30 L 67 30"
                              stroke="hsl(var(--app-secondary))"
                              strokeWidth="2"
                              markerEnd="url(#arrowhead)"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              transition={{ duration: 1, delay: 0.8 }}
                            />
                            <motion.path
                              d="M 83 30 L 97 30"
                              stroke="hsl(var(--app-primary))"
                              strokeWidth="2"
                              markerEnd="url(#arrowhead)"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              transition={{ duration: 1, delay: 1.1 }}
                            />

                            <defs>
                              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                              </marker>
                            </defs>
                          </svg>
                        </div>

                        {/* Flow metrics */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Recovery Rate</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-primary))]">28.4%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Avg Response</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-secondary))]">2.4min</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Live UI Mockup (Bottom Left) */}
                    <motion.div
                      className="absolute bottom-8 left-4 md:left-8 w-40 h-36 md:w-48 md:h-40 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: 20, rotate: -8 }}
                      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 h-full bg-gradient-to-br from-[hsl(var(--app-primary))]/5 to-[hsl(var(--app-secondary))]/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-semibold text-[hsl(var(--app-text))]">Live UI Experience</div>
                        </div>

                        {/* Phone mockup showing cart recovery */}
                        <div className="w-16 h-24 md:w-20 md:h-28 rounded-lg bg-[hsl(var(--app-card))] border-2 border-[hsl(var(--app-border))] mx-auto mb-2 relative overflow-hidden">
                          <div className="absolute top-1 left-1 right-1 h-3 bg-gradient-to-r from-[hsl(var(--app-primary))]/20 to-[hsl(var(--app-secondary))]/20 rounded flex items-center justify-center">
                            <div className="text-[4px] md:text-[5px] text-[hsl(var(--app-text))]">Shopping Cart (2)</div>
                          </div>
                          
                          <div className="absolute top-5 left-1 right-1 bottom-1 flex flex-col">
                            {/* Cart items */}
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-[hsl(var(--app-primary))] rounded"></div>
                                <div className="text-[3px] md:text-[4px] text-[hsl(var(--app-text))]">Premium Case</div>
                                <div className="text-[3px] md:text-[4px] text-[hsl(var(--app-text-muted))] ml-auto">$29</div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-[hsl(var(--app-secondary))] rounded"></div>
                                <div className="text-[3px] md:text-[4px] text-[hsl(var(--app-text))]">Fast Charger</div>
                                <div className="text-[3px] md:text-[4px] text-[hsl(var(--app-text-muted))] ml-auto">$35</div>
                              </div>
                            </div>
                            
                            {/* Recovery notification */}
                            <motion.div 
                              className="h-4 bg-[hsl(var(--app-primary))]/10 border border-[hsl(var(--app-primary))]/30 rounded text-[3px] md:text-[4px] text-[hsl(var(--app-primary))] flex items-center justify-center"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                              Save 15% - Complete Now
                            </motion.div>
                          </div>
                        </div>

                        {/* UX metrics */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Click Rate</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-primary))]">76%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Avg Return</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-secondary))]">2.1h</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Multi-Channel Journey (Bottom Right) */}
                    <motion.div
                      className="absolute bottom-4 right-8 md:right-12 w-36 h-32 md:w-44 md:h-36 rounded-lg border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: 20, rotate: 12 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 4 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 h-full bg-gradient-to-br from-[hsl(var(--app-secondary))]/5 to-[hsl(var(--app-primary))]/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-4 h-4 rounded bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-semibold text-[hsl(var(--app-text))]">Multi-Channel</div>
                        </div>

                        <div className="flex items-center justify-center mb-3">
                          <div className="relative">
                            {/* Central user hub */}
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] flex items-center justify-center relative z-10">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            
                            {/* Channel indicators */}
                            {[
                              { angle: 0, label: 'Email' },
                              { angle: 90, label: 'SMS' },
                              { angle: 180, label: 'Push' },
                              { angle: 270, label: 'Web' }
                            ].map((channel, idx) => (
                              <motion.div
                                key={idx}
                                className="absolute bg-[hsl(var(--app-primary))] w-3 h-3 rounded-sm flex items-center justify-center"
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  transform: `translate(-50%, -50%) translate(${Math.cos(channel.angle * Math.PI / 180) * 20}px, ${Math.sin(channel.angle * Math.PI / 180) * 20}px)`,
                                  opacity: 0.5 + (idx * 0.1)
                                }}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 + idx * 0.2 }}
                              >
                                <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Channel metrics */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Active Channels</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-primary))]">4</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Success Rate</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-secondary))]">31.2%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Central Recovery Hub */}
                    <div className="absolute z-30 pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                      <div className="text-center">
                        <div className="text-[hsl(var(--app-text-muted))] text-xs mb-3">
                          Cart & Browse Recovery
                        </div>
                        <motion.div
                          className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-black font-bold text-xs md:text-sm" style={{marginLeft: '50px'}}>CART</div>
                          <motion.div
                            className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_40%,_rgba(255,255,255,0.2)_50%,_transparent_60%)]"
                            animate={{ x: [-100, 100] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </motion.div>
                        <div className="text-[hsl(var(--app-text-muted))] text-[8px] md:text-xs mt-2">
                          Smart Recovery Engine
                        </div>
                      </div>
                    </div>

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" style={{ overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="recoveryGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-primary))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="recoveryGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--app-primary))" stopOpacity="0.3" />
                        </linearGradient>
                        <mask id={`recoveryCenterMask-${index}`}>
                          <rect x="0" y="0" width="100%" height="100%" fill="white" />
                          <circle cx="300" cy="300" r="64" fill="black" />
                        </mask>
                      </defs>
                      <g mask={`url(#recoveryCenterMask-${index})`}>
                        <motion.path
                          d="M160 80 Q230 150 300 300"
                          stroke="url(#recoveryGradient1)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                        <motion.path
                          d="M440 100 Q370 200 300 300"
                          stroke="url(#recoveryGradient2)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 0.7 }}
                          viewport={{ once: true }}
                        />
                        <motion.path
                          d="M180 450 Q240 375 300 300"
                          stroke="url(#recoveryGradient1)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 0.9 }}
                          viewport={{ once: true }}
                        />
                        <motion.path
                          d="M440 420 Q370 360 300 300"
                          stroke="url(#recoveryGradient2)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 1.1 }}
                          viewport={{ once: true }}
                        />
                      </g>
                    </svg>
                  </div>
                ) : feature.title === 'Mobile & Social Continuity' ? (
                  // Clean flex-column layout for Mobile & Social Continuity
                  <motion.div
                    className="rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-3"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    {/* Row 1: Entry Points + Context Carried panel side by side */}
                    <div className="flex gap-3 items-stretch">
                      {/* Entry Points panel */}
                      <div className="flex-1 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-3">
                        <p className="text-[8px] font-semibold text-[hsl(var(--app-text-muted))] uppercase tracking-wide mb-2.5">Entry Points</p>
                        <div className="space-y-2">
                          {[
                            { label: 'Instagram Story', icon: '📸', color: 'bg-pink-500', textColor: 'text-pink-500', val: 'Tapped' },
                            { label: 'QR Code Scan', icon: '📷', color: 'bg-purple-500', textColor: 'text-purple-500', val: 'Scanned' },
                            { label: 'External Link', icon: '🔗', color: 'bg-blue-500', textColor: 'text-blue-500', val: 'Clicked' },
                          ].map((entry, i) => (
                            <div key={entry.label} className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <motion.div
                                  className={`w-1.5 h-1.5 rounded-full ${entry.color}`}
                                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
                                />
                                <span className="text-[9px] text-[hsl(var(--app-text))]">{entry.label}</span>
                              </div>
                              <span className={`text-[8px] font-semibold ${entry.textColor}`}>{entry.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Context Preserved stats */}
                      <div className="w-28 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-3 flex flex-col justify-between">
                        <p className="text-[8px] font-semibold text-[hsl(var(--app-text-muted))] uppercase tracking-wide mb-1">Context</p>
                        <div className="space-y-2.5">
                          <div>
                            <p className="text-[8px] text-[hsl(var(--app-text-muted))]">Kept</p>
                            <p className="text-base font-bold text-emerald-500 leading-none">100%</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-[hsl(var(--app-text-muted))]">Drop-off</p>
                            <p className="text-base font-bold text-[hsl(var(--app-primary))] leading-none">−68%</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-[hsl(var(--app-text-muted))]">Load</p>
                            <p className="text-base font-bold text-purple-500 leading-none">0.8s</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Stitching indicator */}
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-purple-500"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        />
                        <span className="text-[9px] text-purple-700 font-semibold">Stitching context across channels…</span>
                      </motion.div>
                    </div>

                    {/* Row 3: PDP Continuity Hero Card */}
                    <div className="rounded-xl border border-[hsl(var(--app-primary))]/30 bg-gradient-to-br from-[hsl(var(--app-primary))]/5 to-[hsl(var(--app-secondary))]/5 p-3.5">
                      <div className="flex items-start justify-between mb-2.5">
                        <div>
                          <p className="text-[8px] text-[hsl(var(--app-text-muted))] uppercase tracking-wide">Product Page</p>
                          <p className="text-[11px] font-bold text-[hsl(var(--app-text))] mt-0.5">Trail Runner Pro — Size 10 (pre-selected)</p>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[8px] text-emerald-700 font-semibold">Context kept</span>
                        </div>
                      </div>
                      {/* Context badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {[
                          { label: 'From Instagram', cls: 'bg-pink-100 text-pink-700 border-pink-200' },
                          { label: 'Cart pre-filled', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                          { label: 'No re-auth', cls: 'bg-blue-100 text-blue-700 border-blue-200' },
                          { label: 'Offer applied', cls: 'bg-purple-100 text-purple-700 border-purple-200' },
                        ].map((badge) => (
                          <span key={badge.label} className={`text-[7px] font-semibold px-1.5 py-0.5 rounded-full border ${badge.cls}`}>
                            {badge.label}
                          </span>
                        ))}
                      </div>
                      {/* Checkout readiness bar */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-[8px] text-[hsl(var(--app-text-muted))]">Checkout Readiness</span>
                          <span className="text-[8px] font-bold text-emerald-500">Ready</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[hsl(var(--app-border))] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-emerald-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Journey timeline */}
                    <div className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] px-3 py-2.5">
                      <div className="flex items-center justify-between gap-1">
                        {[
                          { label: 'Instagram', color: 'bg-pink-500', done: true },
                          { label: 'QR Scan', color: 'bg-purple-500', done: true },
                          { label: 'PDP', color: 'bg-blue-500', done: true },
                          { label: 'Checkout', color: 'bg-emerald-500', done: false },
                        ].map((step, i) => (
                          <React.Fragment key={step.label}>
                            <div className="flex flex-col items-center gap-0.5">
                              <motion.div
                                className={`w-2 h-2 rounded-full ${step.color}`}
                                animate={step.done ? {} : { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span className="text-[7px] text-[hsl(var(--app-text-muted))] whitespace-nowrap">{step.label}</span>
                            </div>
                            {i < 3 && (
                              <motion.div
                                className="flex-1 h-px bg-gradient-to-r from-[hsl(var(--app-primary))]/40 to-[hsl(var(--app-primary))]/10 mb-2.5"
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                                viewport={{ once: true }}
                              />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : feature.title === 'Auto‑Experimentation' ? (
                  // Clean flex-column layout for Auto-Experimentation
                  <motion.div
                    className="rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-3"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    {/* Row 1: Active Tests panel + Live Results panel side by side */}
                    <div className="flex gap-3 items-stretch">
                      {/* Active Tests */}
                      <div className="flex-1 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-3">
                        <p className="text-[8px] font-semibold text-[hsl(var(--app-text-muted))] uppercase tracking-wide mb-2.5">Active Tests</p>
                        <div className="space-y-2">
                          {[
                            { label: 'CTA Color', variants: 'A/B/C', traffic: '33%', color: 'bg-purple-500', textColor: 'text-purple-500' },
                            { label: 'Headline Copy', variants: 'A/B', traffic: '50%', color: 'bg-blue-500', textColor: 'text-blue-500' },
                            { label: 'Offer Timing', variants: 'A/B/C', traffic: '20%', color: 'bg-violet-500', textColor: 'text-violet-500' },
                          ].map((test, i) => (
                            <div key={test.label} className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <motion.div
                                  className={`w-1.5 h-1.5 rounded-full ${test.color}`}
                                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
                                />
                                <span className="text-[9px] text-[hsl(var(--app-text))]">{test.label}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[8px] font-semibold ${test.textColor}`}>{test.variants}</span>
                                <span className="text-[7px] text-[hsl(var(--app-text-muted))]">{test.traffic}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Live Results */}
                      <div className="w-28 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-3 flex flex-col justify-between">
                        <p className="text-[8px] font-semibold text-[hsl(var(--app-text-muted))] uppercase tracking-wide mb-1">Results</p>
                        <div className="space-y-2.5">
                          <div>
                            <p className="text-[8px] text-[hsl(var(--app-text-muted))]">Winner</p>
                            <p className="text-[11px] font-bold text-emerald-500 leading-none">Variant B</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-[hsl(var(--app-text-muted))]">CVR Lift</p>
                            <p className="text-base font-bold text-[hsl(var(--app-primary))] leading-none">+12.4%</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-[hsl(var(--app-text-muted))]">Confidence</p>
                            <p className="text-base font-bold text-purple-500 leading-none">94%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: AI auto-deploy indicator */}
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-violet-500"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        />
                        <span className="text-[9px] text-violet-700 font-semibold">AI detected winner — deploying automatically…</span>
                      </motion.div>
                    </div>

                    {/* Row 3: Deployed Winner Hero Card */}
                    <div className="rounded-xl border border-[hsl(var(--app-primary))]/30 bg-gradient-to-br from-[hsl(var(--app-primary))]/5 to-[hsl(var(--app-secondary))]/5 p-3.5">
                      <div className="flex items-start justify-between mb-2.5">
                        <div>
                          <p className="text-[8px] text-[hsl(var(--app-text-muted))] uppercase tracking-wide">Deployed Winner</p>
                          <p className="text-[11px] font-bold text-[hsl(var(--app-text))] mt-0.5">Variant B — Blue CTA + Urgency Copy</p>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <span className="text-[8px] text-emerald-700 font-semibold">Live</span>
                        </div>
                      </div>
                      {/* Impact badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {[
                          { label: '+12.4% CVR', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                          { label: '+$2.4K/day', cls: 'bg-blue-100 text-blue-700 border-blue-200' },
                          { label: '100% Traffic', cls: 'bg-purple-100 text-purple-700 border-purple-200' },
                          { label: 'No analyst', cls: 'bg-amber-100 text-amber-700 border-amber-200' },
                        ].map((badge) => (
                          <span key={badge.label} className={`text-[7px] font-semibold px-1.5 py-0.5 rounded-full border ${badge.cls}`}>
                            {badge.label}
                          </span>
                        ))}
                      </div>
                      {/* Revenue impact bar */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-[8px] text-[hsl(var(--app-text-muted))]">Revenue Impact</span>
                          <span className="text-[8px] font-bold text-emerald-500">+$2.4K/day</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[hsl(var(--app-border))] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: '78%' }}
                            transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Flywheel status bar */}
                    <div className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] px-3 py-2.5">
                      <div className="flex items-center justify-between gap-1">
                        {[
                          { label: 'Test', color: 'bg-purple-500', done: true },
                          { label: 'Learn', color: 'bg-blue-500', done: true },
                          { label: 'Deploy', color: 'bg-emerald-500', done: true },
                          { label: 'Improve', color: 'bg-violet-500', done: false },
                        ].map((phase, i) => (
                          <React.Fragment key={phase.label}>
                            <div className="flex flex-col items-center gap-0.5">
                              <motion.div
                                className={`w-2 h-2 rounded-full ${phase.color}`}
                                animate={phase.done ? {} : { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span className="text-[7px] text-[hsl(var(--app-text-muted))]">{phase.label}</span>
                            </div>
                            {i < 3 && (
                              <motion.div
                                className="flex-1 h-px bg-gradient-to-r from-[hsl(var(--app-primary))]/40 to-[hsl(var(--app-primary))]/10 mb-2.5"
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
                                viewport={{ once: true }}
                              />
                            )}
                          </React.Fragment>
                        ))}
                        <span className="text-[8px] font-semibold text-violet-500 ml-1">Always-On</span>
                      </div>
                    </div>
                  </motion.div>
                ) : feature.title === 'Command Center' ? (
                  // Clean flex-column layout for Command Center
                  <motion.div
                    className="rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-3"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    {/* Row 1: Live KPIs panel + Alerts panel side by side */}
                    <div className="flex gap-3 items-stretch">
                      {/* Live KPIs */}
                      <div className="flex-1 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-3">
                        <p className="text-[8px] font-semibold text-[hsl(var(--app-text-muted))] uppercase tracking-wide mb-2.5">Live KPIs</p>
                        <div className="space-y-2">
                          {[
                            { label: 'Revenue Today', val: '$48.2K', color: 'bg-emerald-500', textColor: 'text-emerald-500' },
                            { label: 'Active Sessions', val: '2,847', color: 'bg-blue-500', textColor: 'text-blue-500' },
                            { label: 'CVR', val: '4.7%', color: 'bg-purple-500', textColor: 'text-purple-500' },
                            { label: 'ROAS', val: '6.2x', color: 'bg-amber-500', textColor: 'text-amber-500' },
                          ].map((kpi, i) => (
                            <div key={kpi.label} className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <motion.div
                                  className={`w-1.5 h-1.5 rounded-full ${kpi.color}`}
                                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.35 }}
                                />
                                <span className="text-[9px] text-[hsl(var(--app-text))]">{kpi.label}</span>
                              </div>
                              <span className={`text-[9px] font-bold ${kpi.textColor}`}>{kpi.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Smart Alerts */}
                      <div className="w-28 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] p-3 flex flex-col gap-2">
                        <p className="text-[8px] font-semibold text-[hsl(var(--app-text-muted))] uppercase tracking-wide">Alerts</p>
                        {[
                          { msg: 'Journey live', color: 'bg-emerald-500', dot: 'text-emerald-600' },
                          { msg: 'Test winner', color: 'bg-blue-500', dot: 'text-blue-600' },
                          { msg: 'ROAS spike', color: 'bg-purple-500', dot: 'text-purple-600' },
                        ].map((alert, i) => (
                          <motion.div
                            key={alert.msg}
                            className="flex items-center gap-1.5 px-1.5 py-1 rounded-lg bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))]"
                            initial={{ opacity: 0, x: 8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.2 }}
                            viewport={{ once: true }}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${alert.color} flex-shrink-0`} />
                            <span className="text-[7px] text-[hsl(var(--app-text))]">{alert.msg}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Row 2: Unified control indicator */}
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-blue-500"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        />
                        <span className="text-[9px] text-blue-700 font-semibold">All channels unified in one place</span>
                      </motion.div>
                    </div>

                    {/* Row 3: Unified Dashboard Hero Card */}
                    <div className="rounded-xl border border-[hsl(var(--app-primary))]/30 bg-gradient-to-br from-[hsl(var(--app-primary))]/5 to-[hsl(var(--app-secondary))]/5 p-3.5">
                      <div className="flex items-start justify-between mb-2.5">
                        <div>
                          <p className="text-[8px] text-[hsl(var(--app-text-muted))] uppercase tracking-wide">Convertive Command Center</p>
                          <p className="text-[11px] font-bold text-[hsl(var(--app-text))] mt-0.5">No more dashboard sprawl — one view</p>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <span className="text-[8px] text-emerald-700 font-semibold">All Live</span>
                        </div>
                      </div>
                      {/* Module badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {[
                          { label: 'Journeys', cls: 'bg-blue-100 text-blue-700 border-blue-200' },
                          { label: 'Analytics', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                          { label: 'Checkout', cls: 'bg-purple-100 text-purple-700 border-purple-200' },
                          { label: 'Notifications', cls: 'bg-amber-100 text-amber-700 border-amber-200' },
                          { label: 'Experiments', cls: 'bg-pink-100 text-pink-700 border-pink-200' },
                        ].map((badge) => (
                          <span key={badge.label} className={`text-[7px] font-semibold px-1.5 py-0.5 rounded-full border ${badge.cls}`}>
                            {badge.label}
                          </span>
                        ))}
                      </div>
                      {/* Stack consolidation bar */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-[8px] text-[hsl(var(--app-text-muted))]">Tools Replaced</span>
                          <span className="text-[8px] font-bold text-[hsl(var(--app-primary))]">7 tools → 1</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[hsl(var(--app-border))] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--app-primary))] to-emerald-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: '85%' }}
                            transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Module status bar */}
                    <div className="rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] px-3 py-2.5 flex items-center justify-between">
                      <span className="text-[9px] font-semibold text-[hsl(var(--app-text))]">Growth Control Center</span>
                      <div className="flex items-center gap-3">
                        {[
                          { label: 'Data', color: 'bg-emerald-500' },
                          { label: 'AI', color: 'bg-blue-500' },
                          { label: 'Ops', color: 'bg-purple-500' },
                        ].map((mod, i) => (
                          <div key={mod.label} className="flex items-center gap-1">
                            <motion.div
                              className={`w-1.5 h-1.5 rounded-full ${mod.color}`}
                              animate={{ opacity: [1, 0.4, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                            />
                            <span className="text-[7px] text-[hsl(var(--app-text-muted))]">{mod.label}</span>
                          </div>
                        ))}
                        <span className="text-[8px] font-semibold text-emerald-500">Online</span>
                      </div>
                    </div>
                  </motion.div>
                ) : ('image' in feature && (feature as any).image) || ('video' in feature && (feature as any).video) ? (
                  // Full image/video display without aspect ratio constraints
                    <motion.div
                      className="relative w-full h-full rounded-xl border border-[hsl(var(--app-border))] overflow-hidden bg-[hsl(var(--app-card))]"
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      <div className="relative w-full h-full">
                        {('video' in feature && (feature as any).video) ? (
                          <video
                            src={(feature as any).video}
                            className="absolute inset-0 w-full h-full object-cover"
                            playsInline
                            muted
                            loop
                            autoPlay
                          />
                        ) : (
                          <Image
                            src={(feature as any).image}
                            alt={(feature as any).alt || feature.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 60vw"
                            className="object-cover"
                            priority={true}
                          />
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    // Mock visual layout for features without images/videos
                    <motion.div
                      className="relative w-full h-full rounded-xl border border-[hsl(var(--app-border))] overflow-hidden bg-[hsl(var(--app-card))]"
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      {/* Glow border */}
                      <div className="pointer-events-none absolute inset-px rounded-2xl bg-[linear-gradient(135deg,_hsl(var(--app-card))_,_hsl(var(--app-card-hover)))]" />
                      <div className="absolute inset-0">
                        {/* Animated grid */}
                        <svg className="absolute inset-0 w-full h-full opacity-30 hidden md:block" preserveAspectRatio="none">
                          <defs>
                            <pattern id={`grid-${index}`} width="24" height="24" patternUnits="userSpaceOnUse">
                              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#grid-${index})`} className="text-[hsl(var(--app-border))]" />
                        </svg>
                        {/* Floating label */}
                        <motion.div className="absolute left-4 top-4 px-3 py-1 rounded-full text-xs bg-[hsl(var(--app-background))]/70 border border-[hsl(var(--app-border))] text-[hsl(var(--app-text))]"
                          initial={{ opacity: 0, y: -8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          viewport={{ once: true }}
                        >
                          Mock Visual
                        </motion.div>
                        {/* Orbs */}
                        <motion.div className="absolute right-6 bottom-6 w-28 h-28 rounded-full bg-[radial-gradient(circle_at_30%_30%,_hsl(var(--app-primary))/25,_transparent_60%)]"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                        />
                        <motion.div className="absolute left-10 bottom-8 w-16 h-16 rounded-full bg-[radial-gradient(circle_at_70%_70%,_hsl(var(--app-secondary))/25,_transparent_60%)]"
                          animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                        />
                      </div>
                      <div className="relative z-10 flex h-full items-center justify-center p-2 sm:p-4 md:p-6">
                        <div className="text-[hsl(var(--app-text-muted))] text-sm text-center">
                          {feature.visual}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
