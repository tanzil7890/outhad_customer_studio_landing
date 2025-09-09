'use client'

import React from 'react'
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
      title: "Outhad Data Platform",
      subtitle: "Data done right.",
      description: "Start building stronger first-party relationships. Customers are giving you their data. What are you giving them in return? How about highly personalized, customized experiences? With Outhad, you can.",
      visual: "A phone display an IAM simple survey.",
    },
    {
      title: 'Live Unified Profiles',
      subtitle: 'Understand intent as it happens.',
      description:
        'Stitch anonymous and known activity across devices and channels into a single live profile that updates in real time.',
      visual: 'Live profile stitching across sessions, devices, and channels.',
      image: '/images/outhad-customer-activation-platform/outhad-unifiedprofile.png',
      alt: 'Outhad unified profile visualization',
    },
    {
      title: 'In‑Session Orchestration',
      subtitle: 'Nudge at the moment of intent.',
      description:
        'Trigger the right bundles, upsells, reminders, or incentives during the session—before the shopper bounces.',
      visual: 'Real‑time nudge decisioning overlay on PDP/checkout.',
      image: '/images/outhad-customer-activation-platform/outhad-insession-orchestration.png',
      alt: 'Outhad in-session orchestration visualization',
    },
    {
      title: 'Cart & Browse Recovery',
      subtitle: 'Recover even without email.',
      description:
        'Re‑engage abandoners (including anonymous) using friction‑free identity capture and smart follow‑ups across channels.',
      visual: 'Exit intent popup + SMS/email recovery flow.',
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
      title: "Outhad Data Platform",
      subtitle: "Data done right.",
      description: "Start building stronger first-party relationships. Customers are giving you their data. What are you giving them in return? How about highly personalized, customized experiences? With Outhad, you can.",
      visual: "A phone display an IAM simple survey."
    },
    {
      title: "Live Unified Profiles",
      subtitle: "Understand intent as it happens.",
      description: "Stitch anonymous and known activity across devices and channels into a single live profile that updates in real time.",
      visual: "Live profile stitching across sessions, devices, and channels."
    },
    {
      title: "outhadAI™",
      subtitle: "AI for Growth.",
      description: "Employ outhadAI™, the world's smartest marketing advisor. As you learn Outhad, outhadAI™ learns your brand, helping you to create on-brand content and creative, personalize journeys, and double down on winning strategies that multiply returns.",
      visual: "Elements from the the Outhad Sage AI interface connected to parts a push notification they control."
    },
    {
      title: "Journey Orchestration",
      subtitle: "Build a Better Path.",
      description: "Manage campaigns. Move to journey orchestration. No matter where you are today, highly-intelligent, always-on journey orchestration is where you'll want to be tomorrow. See how Outhad is helping brands of all sizes modernize their marketing approach.",
      visual: "An example of an engagement campaign built with Canvas Flow."
    },
    {
      title: "Cross-Channel Messaging",
      subtitle: "Cross-Channel Your Creativity.",
      description: "Never be on fewer channels than your customers. Whether you start with email or another channel, you'll want to keep expanding to keep up with customers. See how cross-channel marketing on a single platform can drive revenue and steer your team toward the future.",
      visual: "A list of messaging channels supported by Outhad"
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

  return (
    <div className="bg-[hsl(var(--app-background))] relative z-10 py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Soft background decorations */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full blur-3xl bg-[radial-gradient(closest-side,_hsl(var(--app-secondary))/20,_transparent)]" />
        <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full blur-3xl bg-[radial-gradient(closest-side,_hsl(var(--app-primary))/15,_transparent)]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="text-lg sm:text-xl text-[hsl(var(--app-text-muted))] font-mono leading-relaxed lg:flex-1 text-left"
              variants={item}
            >
              Customers don't have campaigns, they have conversations. A majority of customers want personalized experiences from companies. Absolutely none of them want to be sold to. That's why the move from totally-siloed campaigns to fully-orchestrated journeys is so darn important. Here's how we're helping organizations on their journey.
            </motion.p>
            
            <motion.div
              className="lg:flex-1 lg:max-w-md flex justify-center lg:justify-end"
              variants={item}
            >
              <Image
                src="/images/outhad-customer-activation-platform/outhad-features.avif"
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
          
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12"
            variants={container}
          >
            {['Live Unified Profiles', 'In‑Session Orchestration', 'Recovery', 'Mobile & Social', 'Auto‑Experimentation', 'Command Center'].map((chip, index) => (
              <motion.span
                key={index}
                className="text-xs sm:text-sm font-mono text-[hsl(var(--app-text))] bg-[hsl(var(--app-card))] px-3 py-1.5 rounded-full border border-[hsl(var(--app-border))] shadow-[0_0_0_0_hsl(var(--app-primary)/0%)] hover:shadow-[0_0_0_4px_hsl(var(--app-primary)/10%)] transition-shadow"
                variants={item}
                whileHover={{ y: -2 }}
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <div id="features" className="space-y-20 sm:space-y-24">
          {featuresNew.map((feature, index) => (
            <motion.div
              key={index}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <h3 className="text-2xl sm:text-3xl text-[hsl(var(--app-primary))] mb-2 font-title">
                  {feature.title}
                </h3>
                <h4 className="text-xl sm:text-2xl text-[hsl(var(--app-text))] mb-6 font-title">
                  {feature.subtitle}
                </h4>
                <p className="text-base sm:text-lg text-[hsl(var(--app-text-muted))] font-mono leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6 h-[1px] w-24 bg-[linear-gradient(90deg,_hsl(var(--app-primary)),_transparent)]" />
              </div>

              {/* Visual */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {feature.title === 'Outhad Data Platform' ? (
                  // Special dashboard visualization for Outhad Data Platform
                  <div className="relative h-[300px] md:h-[600px] overflow-visible">
                    {/* Main container background */}
                    <motion.div
                      className="absolute inset-4 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      <div className="absolute inset-px rounded-2xl bg-[linear-gradient(135deg,_hsl(var(--app-card))_,_hsl(var(--app-card-hover)))]" />
                    </motion.div>

                    {/* Dashboard UI (Top Left) */}
                    <motion.div
                      className="absolute top-4 left-8 md:left-12 w-40 h-32 md:w-48 md:h-40 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: -20, rotate: -5 }}
                      whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="h-full w-full bg-gradient-to-br from-[hsl(var(--app-primary))]/10 to-[hsl(var(--app-secondary))]/10 p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Real-time Dashboard</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                className="w-2 h-2 bg-emerald-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Active Users</span>
                            </div>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">24.7k</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                className="w-2 h-2 bg-blue-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                              />
                              <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Data Quality</span>
                            </div>
                            <span className="text-[8px] md:text-[10px] font-bold text-blue-500">97.2%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                className="w-2 h-2 bg-purple-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                              />
                              <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Profiles</span>
                            </div>
                            <span className="text-[8px] md:text-[10px] font-bold text-purple-500">1.8M</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))] mb-1">
                              <span>Engagement</span>
                              <span>94%</span>
                            </div>
                            <div className="h-1 bg-[hsl(var(--app-border))] rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
                                initial={{ width: 0 }}
                                whileInView={{ width: '94%' }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Quality vs Reach Chart (Top Right) */}
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
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Quality vs Reach</div>
                        </div>
                        
                        {/* Chart visualization */}
                        <div className="relative h-16 md:h-20 w-full mb-2">
                        <svg viewBox="0 0 100 60" className="w-full h-full hidden md:block">
                            {/* Chart grid */}
                            <defs>
                              <pattern id="chartGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--app-border))" strokeWidth="0.5" opacity="0.3"/>
                              </pattern>
                            </defs>
                            <rect width="100" height="60" fill="url(#chartGrid)" />
                            
                            {/* Third-party data point (low quality, high reach) */}
                            <motion.circle 
                              cx="75" cy="45" r="3" 
                              fill="#ef4444" opacity="0.7"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.5 }}
                            />
                            <text x="78" y="48" fontSize="4" fill="hsl(var(--app-text-muted))">3rd Party</text>
                            
                            {/* First-party data point (high quality, good reach) */}
                            <motion.circle 
                              cx="25" cy="15" r="4" 
                              fill="hsl(var(--app-primary))" opacity="0.9"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.8 }}
                            >
                              <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite"/>
                            </motion.circle>
                            <text x="8" y="12" fontSize="4" fill="hsl(var(--app-primary))">1st Party</text>
                            
                            {/* Axis labels */}
                            <text x="50" y="58" fontSize="3" fill="hsl(var(--app-text-muted))" textAnchor="middle">Reach →</text>
                            <text x="2" y="30" fontSize="3" fill="hsl(var(--app-text-muted))" transform="rotate(-90 2 30)">Quality ↑</text>
                          </svg>
                        </div>

                        {/* Chart metrics */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">1st Party ROI</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-primary))]">8.3x</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Data Accuracy</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">97%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Checklist UI (Bottom Left) */}
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
                          <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Key Capabilities</div>
                        </div>

                        <div className="space-y-2">
                          {[
                            { label: 'Identity Resolution', delay: 0.5 },
                            { label: 'Real-time Sync', delay: 0.7 },
                            { label: 'Privacy Compliance', delay: 0.9 },
                            { label: 'Cross-channel Unity', delay: 1.1 }
                          ].map((item, idx) => (
                            <motion.div 
                              key={item.label}
                              className="flex items-center space-x-2"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: item.delay }}
                              viewport={{ once: true }}
                            >
                              <motion.div 
                                className="w-2 h-2 rounded-sm bg-emerald-500 flex items-center justify-center"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: item.delay + 0.2 }}
                              >
                                <div className="w-1 h-1 bg-white rounded-sm"></div>
                              </motion.div>
                              <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text))]">{item.label}</span>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-3 pt-2 border-t border-[hsl(var(--app-border))]/30">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Platform Health</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">Excellent</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Identity Stitching Diagram (Bottom Right) */}
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
                          <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Identity Stitching</div>
                        </div>

                        <div className="flex items-center justify-center mb-3">
                          <div className="relative">
                            {/* Central identity hub */}
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] flex items-center justify-center relative z-10">
                              <div className="text-[6px] md:text-[8px] font-mono font-bold text-white">ID</div>
                            </div>
                            
                            {/* Orbiting data sources */}
                            {[
                              { angle: 0, color: 'bg-blue-500', size: 'w-2 h-2' },
                              { angle: 120, color: 'bg-green-500', size: 'w-2 h-2' },
                              { angle: 240, color: 'bg-purple-500', size: 'w-2 h-2' }
                            ].map((source, idx) => (
                              <motion.div
                                key={idx}
                                className={`absolute ${source.color} ${source.size} rounded-full`}
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  transformOrigin: '0 0'
                                }}
                                animate={{ 
                                  rotate: 360,
                                  x: Math.cos((source.angle + 360) * Math.PI / 180) * 16 - 4,
                                  y: Math.sin((source.angle + 360) * Math.PI / 180) * 16 - 4
                                }}
                                transition={{
                                  rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                                  x: { duration: 0 },
                                  y: { duration: 0 }
                                }}
                              />
                            ))}
                            
                            {/* Connection lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ transform: 'scale(2)' }}>
                              <motion.circle
                                cx="20" cy="20"
                                r="12"
                                fill="none"
                                stroke="hsl(var(--app-primary))"
                                strokeWidth="0.5"
                                strokeDasharray="2 2"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.5 }}
                                transition={{ duration: 2, delay: 0.5 }}
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Stitching metrics */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Match Rate</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-purple-500">94.2%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Sources</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-indigo-500">12+</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Central Data Platform Hub */}
                    <div className="absolute z-30 pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                      <div className="text-center">
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-xs mb-3">
                          Outhad Data Platform
                        </div>
                        <motion.div
                          className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-black font-mono font-bold text-xs md:text-sm" style={{ marginLeft: '50px' }}>DATA</div>
                          <motion.div
                            className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_40%,_rgba(255,255,255,0.2)_50%,_transparent_60%)]"
                            animate={{ x: [-100, 100] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </motion.div>
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-[8px] md:text-xs mt-2">
                          First-Party Foundation
                        </div>
                      </div>
                    </div>

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 hidden md:block" style={{ overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="dataGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-primary))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="dataGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--app-primary))" stopOpacity="0.3" />
                        </linearGradient>
                        <mask id={`dataCenterMask-${index}`}>
                          <rect x="0" y="0" width="100%" height="100%" fill="white" />
                          <circle cx="300" cy="300" r="64" fill="black" />
                        </mask>
                      </defs>
                      <g mask={`url(#dataCenterMask-${index})`}>
                        <motion.path
                          d="M160 80 Q230 150 300 300"
                          stroke="url(#dataGradient1)"
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
                          stroke="url(#dataGradient2)"
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
                          stroke="url(#dataGradient1)"
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
                          stroke="url(#dataGradient2)"
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
                ) : feature.title === 'Live Unified Profiles' ? (
                  // Special floating images layout for Live Unified Profiles
                  <div className="relative h-[300px] md:h-[600px] overflow-visible">
                    {/* Main container background */}
                    <motion.div
                      className="absolute inset-4 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      <div className="absolute inset-px rounded-2xl bg-[linear-gradient(135deg,_hsl(var(--app-card))_,_hsl(var(--app-card-hover)))]" />
                    </motion.div>

                    {/* Connection Lines (kept behind the center hub) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block" style={{ overflow: 'visible' }}>
                      <g mask={`url(#centerMask-${index})`}>
                        {/* Connection from Web Data to Central Hub */}
                      <motion.path
                        d="M140 80 Q200 180 300 300"
                        stroke="url(#gradient1)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="6 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                      
                        {/* Connection from Mobile Data to Central Hub */}
                      <motion.path
                        d="M420 100 Q380 200 300 300"
                        stroke="url(#gradient2)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="6 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 2, delay: 0.7 }}
                        viewport={{ once: true }}
                      />
                      
                        {/* Connection from Social Data to Central Hub */}
                      <motion.path
                        d="M180 420 Q240 360 300 300"
                        stroke="url(#gradient3)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="6 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 2, delay: 0.9 }}
                        viewport={{ once: true }}
                      />
                      
                        {/* Connection from AI Processing to Central Hub */}
                      <motion.path
                        d="M460 440 Q380 370 300 300"
                        stroke="url(#gradient4)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="6 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 2, delay: 1.1 }}
                        viewport={{ once: true }}
                      />
                      </g>

                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-primary))" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="hsl(var(--app-primary))" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-primary))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.4" />
                        </linearGradient>
                        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--app-primary))" stopOpacity="0.4" />
                        </linearGradient>
                        {/* Mask to hide lines where the center hub sits */}
                        <mask id={`centerMask-${index}`}>
                          <rect x="0" y="0" width="100%" height="100%" fill="white" />
                          <circle cx="300" cy="300" r="64" fill="black" />
                        </mask>
                      </defs>
                    </svg>

                    {/* Data Flow Particles */}
                    {/* Web Analytics to Center */}
                    <motion.div
                      className="absolute w-1.5 h-1.5 bg-[hsl(var(--app-primary))] rounded-full pointer-events-none z-10"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 1, 1, 0],
                        x: [140, 200, 300],
                        y: [80, 180, 300]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 0,
                        ease: 'easeInOut'
                      }}
                    />
                    {/* Mobile App to Center */}
                    <motion.div
                      className="absolute w-1.5 h-1.5 bg-[hsl(var(--app-secondary))] rounded-full pointer-events-none z-10"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 1, 1, 0],
                        x: [420, 380, 300],
                        y: [100, 200, 300]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 0.7,
                        ease: 'easeInOut'
                      }}
                    />
                    {/* Social Media to Center */}
                    <motion.div
                      className="absolute w-1.5 h-1.5 bg-[hsl(var(--app-primary))]/70 rounded-full pointer-events-none z-10"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 1, 1, 0],
                        x: [180, 240, 300],
                        y: [420, 360, 300]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 1.4,
                        ease: 'easeInOut'
                      }}
                    />
                    {/* AI Processing to Center */}
                    <motion.div
                      className="absolute w-1.5 h-1.5 bg-[hsl(var(--app-secondary))]/70 rounded-full pointer-events-none z-10"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 1, 1, 0],
                        x: [460, 380, 300],
                        y: [440, 370, 300]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 2.1,
                        ease: 'easeInOut'
                      }}
                    />

                    {/* Floating Image 1: Web Analytics (Top Left) */}
                    <motion.div
                      className="absolute -top-4 left-8 md:left-12 w-36 h-28 md:w-44 md:h-36 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
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
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Web Analytics</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                className="w-2 h-2 bg-emerald-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Live Sessions</span>
                            </div>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">2.4k</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <motion.div 
                                className="w-2 h-2 bg-orange-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                              />
                              <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Page Views</span>
                            </div>
                            <span className="text-[8px] md:text-[10px] font-bold text-orange-500">18.7k</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))] mb-1">
                              <span>Engagement</span>
                              <span>84%</span>
                            </div>
                            <div className="h-1 bg-[hsl(var(--app-border))] rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))]"
                                initial={{ width: 0 }}
                                whileInView={{ width: '84%' }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Image 2: Mobile App Data (Top Right) */}
                    <motion.div
                      className="absolute -top-2 right-4 md:right-8 w-32 h-36 md:w-40 md:h-44 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
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
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Mobile App</div>
                        </div>
                        
                        {/* Phone mockup */}
                        <div className="w-12 h-20 md:w-16 md:h-24 rounded-lg bg-[hsl(var(--app-card))] border-2 border-[hsl(var(--app-border))] mx-auto mb-3 relative overflow-hidden">
                          <div className="absolute top-1 left-1 right-1 h-3 bg-gradient-to-r from-[hsl(var(--app-primary))]/20 to-[hsl(var(--app-secondary))]/20 rounded flex items-center justify-center">
                            <motion.div 
                              className="w-4 h-[2px] bg-[hsl(var(--app-primary))] rounded-full"
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </div>
                          <div className="absolute bottom-2 left-1 right-1 space-y-1">
                            <div className="flex justify-between items-center">
                              <div className="h-[1px] bg-[hsl(var(--app-text-muted))] rounded w-6"></div>
                              <motion.div 
                                className="w-1 h-1 bg-emerald-500 rounded-full"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            </div>
                            <div className="h-[1px] bg-[hsl(var(--app-border))] rounded w-4"></div>
                          </div>
                        </div>

                        {/* App metrics */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">DAU</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-purple-500">15.2k</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Retention</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-pink-500">72%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Image 3: Social Media Data (Bottom Left) */}
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
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Social Channels</div>
                        </div>

                        <div className="flex items-center justify-center mb-3">
                          <div className="relative">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[hsl(var(--app-primary))]/30 flex items-center justify-center bg-gradient-to-br from-[hsl(var(--app-primary))]/10 to-[hsl(var(--app-secondary))]/10">
                              <div className="text-[8px] md:text-[10px] font-mono font-bold text-[hsl(var(--app-primary))]">USER</div>
                            </div>
                            
                            {/* Social platform indicators with better design */}
                            <motion.div 
                              className="absolute -top-1 left-1/2 w-3 h-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-lg flex items-center justify-center"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                              style={{ transformOrigin: '50% 32px' }}
                            >
                              <div className="w-1 h-1 bg-white rounded-full"></div>
                            </motion.div>
                            
                            <motion.div 
                              className="absolute top-1/2 -right-1 w-3 h-3 bg-gradient-to-r from-pink-600 to-pink-500 rounded-full shadow-lg flex items-center justify-center"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 1 }}
                              style={{ transformOrigin: '-16px 50%' }}
                            >
                              <div className="w-1 h-1 bg-white rounded-full"></div>
                            </motion.div>
                            
                            <motion.div 
                              className="absolute -bottom-1 left-1/2 w-3 h-3 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full shadow-lg flex items-center justify-center"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 2 }}
                              style={{ transformOrigin: '50% -32px' }}
                            >
                              <div className="w-1 h-1 bg-white rounded-full"></div>
                            </motion.div>
                            
                            <motion.div 
                              className="absolute top-1/2 -left-1 w-3 h-3 bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-lg flex items-center justify-center"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 1.5 }}
                              style={{ transformOrigin: '16px 50%' }}
                            >
                              <div className="w-1 h-1 bg-white rounded-full"></div>
                            </motion.div>
                          </div>
                        </div>

                        {/* Social metrics */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Reach</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-pink-500">127k</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Engagement</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-rose-500">8.4%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Image 4: AI Processing Engine (Bottom Right) */}
                    <motion.div
                      className="absolute -bottom-4 right-8 md:right-12 w-36 h-32 md:w-44 md:h-36 rounded-lg border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
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
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">AI Processing</div>
                        </div>

                        <div className="flex items-center justify-center mb-3">
                          <motion.div
                            className="relative"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] flex items-center justify-center relative overflow-hidden shadow-lg">
                              <div className="w-4 h-4 md:w-5 md:h-5 bg-[hsl(var(--app-background))] rounded-lg z-10 flex items-center justify-center">
                                <motion.div 
                                  className="w-2 h-2 bg-[hsl(var(--app-primary))] rounded"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                />
                              </div>
                              <motion.div
                                className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_30%,_hsl(var(--app-background))/40_50%,_transparent_70%)]"
                                animate={{ x: [-24, 24] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                              />
                            </div>
                            
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-[hsl(var(--app-primary))]/20"
                              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                            />

                            {/* Neural network indicators */}
                            <div className="absolute -bottom-3 left-0 right-0 flex justify-center space-x-1">
                              {[0, 1, 2, 3].map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-[2px] bg-gradient-to-t from-[hsl(var(--app-secondary))] to-transparent rounded-full"
                                  animate={{ height: [3, 8, 3] }}
                                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        </div>

                        {/* AI metrics */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Models</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">12</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Accuracy</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-teal-500">97.2%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Central Unified Profile Hub */}
                    <div className="absolute z-30 pointer-events-none" style={{ left: '320px', top: '300px', transform: 'translate(-50%, -50%)' }}>
                      <div className="text-center">
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-xs mb-3">
                          Unified Customer Profile
                        </div>
                        <motion.div
                          className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden  "
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                          viewport={{ once: true }}
                        >
                          <Image
                            src="/images/outhad-unified2.avif"
                            alt="Outhad Unified Customer Profile"
                            fill
                            sizes="(max-width: 768px) 96px, 128px"
                            className="object-contain"
                            priority={true}
                          />
                          {/* <motion.div
                            className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_40%,_hsl(var(--app-primary))/20_50%,_transparent_60%)]"
                            animate={{ x: [-100, 100] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          /> */}
                        </motion.div>
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-[8px] md:text-xs mt-2">
                          Real-time Stitching
                        </div>
                      </div>
                    </div>
                  </div>
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
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Signals & Intent</div>
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
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">In‑Session Nudge</div>
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
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-text))]">PDP > 2min • Abandoned once</span>
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
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Decision Path</div>
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
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Decision Stack</div>
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
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-xs mb-3">
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
                            src="/images/outhad-customer-activation-platform/in-session.avif"
                            alt="Outhad In-Session Orchestration"
                            fill
                            sizes="(max-width: 768px) 96px, 128px"
                            className="object-contain"
                            priority={true}
                          />
                        </motion.div>
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-[8px] md:text-xs mt-2">
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
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Exit-Intent Detection</div>
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
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Session Flow</div>
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
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Live UI Experience</div>
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
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Multi-Channel</div>
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
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-xs mb-3">
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
                          <div className="text-black font-mono font-bold text-xs md:text-sm" style={{marginLeft: '50px'}}>CART</div>
                          <motion.div
                            className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_40%,_rgba(255,255,255,0.2)_50%,_transparent_60%)]"
                            animate={{ x: [-100, 100] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </motion.div>
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-[8px] md:text-xs mt-2">
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
                  // Special mobile & social continuity visualization
                  <div className="relative h-[300px] md:h-[600px] overflow-visible">
                    {/* Main container background */}
                    <motion.div
                      className="absolute inset-4 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      <div className="absolute inset-px rounded-2xl bg-[linear-gradient(135deg,_hsl(var(--app-card))_,_hsl(var(--app-card-hover)))]" />
                    </motion.div>

                    {/* QR Code Entry Point (Top Left) */}
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
                          <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">QR Code Scan</div>
                        </div>

                        {/* QR Code mockup */}
                        <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] rounded p-1">
                          <div className="w-full h-full bg-[hsl(var(--app-text))] rounded-sm relative overflow-hidden">
                            {/* QR pattern grid */}
                            <div className="absolute inset-1 grid grid-cols-6 gap-[1px]">
                              {Array.from({ length: 36 }).map((_, i) => (
                                <motion.div
                                  key={i}
                                  className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'} rounded-[0.5px]`}
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  transition={{ duration: 0.1, delay: i * 0.02 }}
                                  viewport={{ once: true }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Scan Success</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-primary))]">97%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Context Kept</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-secondary))]">100%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Social Media Links (Top Right) */}
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
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[hsl(var(--app-secondary))] to-[hsl(var(--app-primary))] flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Social Links</div>
                        </div>
                        
                        {/* Social post mockup */}
                        <div className="w-full h-16 md:h-20 rounded-lg bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] p-2 mb-2">
                          <div className="flex items-start space-x-2">
                            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))]"></div>
                            <div className="flex-1">
                              <div className="text-[4px] md:text-[5px] text-[hsl(var(--app-text))] mb-1">Check out this amazing deal!</div>
                              <div className="h-6 md:h-8 bg-[hsl(var(--app-background))] rounded border border-[hsl(var(--app-primary))]/30 flex items-center justify-center">
                                <motion.div
                                  className="text-[3px] md:text-[4px] text-[hsl(var(--app-primary))] font-bold"
                                  animate={{ opacity: [0.7, 1, 0.7] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  Shop Now →
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Click Rate</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-secondary))]">12.4%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Context Loss</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-primary))]">0%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Platform Transition (Bottom Left) */}
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
                          <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Platform Bridge</div>
                        </div>

                        {/* Platform transition visualization */}
                        <div className="flex items-center justify-center space-x-3 mb-3">
                          {/* Source platform */}
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-10 md:w-10 md:h-12 rounded bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] relative overflow-hidden mb-1">
                              <div className="absolute top-1 left-1 right-1 h-2 bg-gradient-to-r from-[hsl(var(--app-secondary))]/20 to-[hsl(var(--app-primary))]/20 rounded flex items-center justify-center">
                                <div className="text-[3px] md:text-[4px] text-[hsl(var(--app-text))]">Web</div>
                              </div>
                              <div className="absolute bottom-1 left-1 right-1 top-4 bg-[hsl(var(--app-background))] rounded border border-[hsl(var(--app-border))] flex items-center justify-center">
                                <div className="w-3 h-2 bg-[hsl(var(--app-secondary))]/40 rounded"></div>
                              </div>
                            </div>
                            <div className="text-[4px] md:text-[5px] text-[hsl(var(--app-text-muted))]">Social</div>
                          </div>

                          {/* Continuity arrow */}
                          <motion.div
                            className="flex flex-col items-center"
                            animate={{ x: [0, 2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <svg width="12" height="8" viewBox="0 0 12 8" className="text-[hsl(var(--app-primary))]">
                              <path d="M0 4L10 4M8 2L10 4L8 6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            </svg>
                            <div className="text-[3px] md:text-[4px] text-[hsl(var(--app-text-muted))] mt-1">Context</div>
                          </motion.div>

                          {/* Destination platform */}
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-10 md:w-10 md:h-12 rounded bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] relative overflow-hidden mb-1">
                              <div className="absolute top-1 left-1 right-1 h-2 bg-gradient-to-r from-[hsl(var(--app-primary))]/30 to-[hsl(var(--app-secondary))]/30 rounded flex items-center justify-center">
                                <div className="text-[3px] md:text-[4px] text-[hsl(var(--app-text))]">App</div>
                              </div>
                              <div className="absolute bottom-1 left-1 right-1 top-4 bg-[hsl(var(--app-background))] rounded border border-[hsl(var(--app-border))] flex items-center justify-center">
                                <motion.div
                                  className="w-3 h-2 bg-[hsl(var(--app-primary))] rounded"
                                  animate={{ opacity: [0.6, 1, 0.6] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </div>
                            </div>
                            <div className="text-[4px] md:text-[5px] text-[hsl(var(--app-text-muted))]">Mobile</div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Seamless Rate</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-primary))]">94%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Load Time</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-secondary))]">0.8s</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Checkout Completion (Bottom Right) */}
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
                          <div className="w-4 h-4 rounded bg-gradient-to-r from-[hsl(var(--app-secondary))] to-[hsl(var(--app-primary))] flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Checkout Flow</div>
                        </div>

                        {/* Checkout progress steps */}
                        <div className="space-y-2 mb-3">
                          {[
                            { label: 'Cart', progress: 100, delay: 0.5 },
                            { label: 'Info', progress: 85, delay: 1 },
                            { label: 'Payment', progress: 60, delay: 1.5 }
                          ].map((step, idx) => (
                            <div key={step.label} className="flex items-center space-x-2">
                              <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ 
                                  backgroundColor: step.progress === 100 ? 'hsl(var(--app-primary))' : 
                                                 step.progress > 50 ? 'hsl(var(--app-secondary))' : 
                                                 'hsl(var(--app-text-muted))'
                                }}
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: step.progress === 100 ? [0.8, 1, 0.8] : 1
                                }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: step.progress === 100 ? Infinity : 0,
                                  delay: idx * 0.3 
                                }}
                              />
                              <div className="flex-1 h-1 bg-[hsl(var(--app-background))] rounded border border-[hsl(var(--app-border))] relative overflow-hidden">
                                <motion.div
                                  className="absolute inset-0 rounded"
                                  style={{
                                    backgroundColor: step.progress === 100 ? 'hsl(var(--app-primary))' :
                                                    step.progress > 50 ? 'hsl(var(--app-secondary))' :
                                                    'hsl(var(--app-text-muted))'
                                  }}
                                  initial={{ width: '0%', opacity: 0.3 }}
                                  whileInView={{ width: `${step.progress}%`, opacity: 0.6 }}
                                  transition={{ duration: 1.5, delay: step.delay }}
                                />
                              </div>
                              <span className="text-[4px] md:text-[5px] text-[hsl(var(--app-text-muted))] w-6">{step.label}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Completion</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-primary))]">87%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Drop-off</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-[hsl(var(--app-secondary))]">13%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Central Continuity Hub */}
                    <div className="absolute z-30 pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                      <div className="text-center">
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-xs mb-3">
                          Context Continuity
                        </div>
                        <motion.div
                          className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-black font-mono font-bold text-xs md:text-sm" style={{marginLeft: '10px'}}>LINK</div>
                          <motion.div
                            className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_40%,_rgba(255,255,255,0.2)_50%,_transparent_60%)]"
                            animate={{ x: [-100, 100] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </motion.div>
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-[8px] md:text-xs mt-2">
                          Seamless Journey
                        </div>
                      </div>
                    </div>

                    {/* Continuity Flow Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" style={{ overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="continuityGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-primary))" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.4" />
                        </linearGradient>
                        <linearGradient id="continuityGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="hsl(var(--app-primary))" stopOpacity="0.4" />
                        </linearGradient>
                        <mask id={`continuityCenterMask-${index}`}>
                          <rect x="0" y="0" width="100%" height="100%" fill="white" />
                          <circle cx="300" cy="300" r="64" fill="black" />
                        </mask>
                        <marker id="continuityArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                          <path d="M0 0 L0 6 L8 3 z" fill="hsl(var(--app-primary))" opacity="0.7"/>
                        </marker>
                      </defs>
                      <g mask={`url(#continuityCenterMask-${index})`}>
                        <motion.path
                          d="M150 80 Q220 150 280 240"
                          stroke="url(#continuityGradient1)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                        <motion.path
                          d="M440 100 Q370 170 320 240"
                          stroke="url(#continuityGradient2)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 0.7 }}
                          viewport={{ once: true }}
                        />
                        <motion.path
                          d="M180 450 Q240 380 280 340"
                          stroke="url(#continuityGradient1)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 0.9 }}
                          viewport={{ once: true }}
                        />
                        <motion.path
                          d="M440 420 Q370 360 320 340"
                          stroke="url(#continuityGradient2)"
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
                ) : feature.title === 'Auto‑Experimentation' ? (
                  // Special auto-experimentation flywheel layout
                  <div className="relative h-[300px] md:h-[600px] overflow-visible">
                    {/* Main container background */}
                    <motion.div
                      className="absolute inset-4 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      <div className="absolute inset-px rounded-2xl bg-[linear-gradient(135deg,_hsl(var(--app-card))_,_hsl(var(--app-card-hover)))]" />
                    </motion.div>

                    {/* TEST Phase (Top Right) */}
                    <motion.div
                      className="absolute top-8 right-8 md:top-12 md:right-12 w-32 h-24 md:w-40 md:h-32 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: -20, rotate: -3 }}
                      whileInView={{ opacity: 1, y: 0, rotate: -1 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="h-full w-full bg-gradient-to-br from-purple-500/10 to-violet-500/10 p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">TEST</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Variants</span>
                            <motion.span 
                              className="text-[8px] md:text-[10px] font-bold text-purple-500"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >A/B/C</motion.span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Traffic</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-violet-500">20%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Confidence</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-purple-600">94%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* LEARN Phase (Bottom Right) */}
                    <motion.div
                      className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-36 h-28 md:w-44 md:h-36 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, x: 20, rotate: 8 }}
                      whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 h-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">LEARN</div>
                        </div>
                        
                        {/* Learning analytics visualization */}
                        <div className="w-full h-16 md:h-20 rounded-lg bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] relative overflow-hidden mb-2">
                          <div className="absolute inset-2 grid grid-cols-3 gap-1">
                            <motion.div 
                              className="bg-emerald-500/20 rounded"
                              animate={{ height: ['40%', '80%', '60%'] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                            <motion.div 
                              className="bg-teal-500/20 rounded"
                              animate={{ height: ['60%', '40%', '90%'] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.div 
                              className="bg-emerald-600/20 rounded"
                              animate={{ height: ['80%', '60%', '40%'] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Winner</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">Variant B</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Lift</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-teal-500">+12.4%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* DEPLOY Phase (Bottom Left) */}
                    <motion.div
                      className="absolute bottom-8 left-8 md:bottom-12 md:left-12 w-40 h-32 md:w-48 md:h-36 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: 20, rotate: -5 }}
                      whileInView={{ opacity: 1, y: 0, rotate: -1 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 h-full bg-gradient-to-br from-orange-500/10 to-amber-500/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">DEPLOY</div>
                        </div>

                        {/* Deployment progress visualization */}
                        <div className="flex items-center justify-center mb-3">
                          <div className="flex items-center space-x-2">
                            <motion.div 
                              className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <div className="w-2 h-2 bg-orange-500 rounded-sm"></div>
                            </motion.div>
                            <motion.div 
                              className="w-8 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div 
                              className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                            >
                              <div className="w-2 h-2 bg-amber-500 rounded-sm"></div>
                            </motion.div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Status</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">Live</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Traffic</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-orange-500">100%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Revenue Impact</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-amber-500">+$2.4K</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* IMPROVE Phase (Top Left) */}
                    <motion.div
                      className="absolute top-8 left-8 md:top-12 md:left-12 w-36 h-36 md:w-44 md:h-40 rounded-lg border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, x: -20, rotate: -8 }}
                      whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 h-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">IMPROVE</div>
                        </div>

                        {/* Improvement cycle visualization */}
                        <div className="flex items-center justify-center mb-3">
                          <motion.div
                            className="relative w-16 h-16"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          >
                            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 border-dashed"></div>
                            <motion.div 
                              className="absolute top-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div 
                              className="absolute right-0 top-1/2 w-2 h-2 bg-cyan-500 rounded-full transform translate-x-1 -translate-y-1/2"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.div 
                              className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-600 rounded-full transform -translate-x-1/2 translate-y-1"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            />
                            <motion.div 
                              className="absolute left-0 top-1/2 w-2 h-2 bg-cyan-600 rounded-full transform -translate-x-1 -translate-y-1/2"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                            />
                          </motion.div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Next Test</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-blue-500">Ready</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Hypothesis</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-cyan-500">CTA Color</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Auto Queue</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-blue-600">3 Tests</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Cycle Time</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-cyan-600">2.3 days</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Central AI Engine */}
                    <div className="absolute z-30 pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                      <div className="text-center">
                      <div className="text-[hsl(var(--app-text-muted))] font-mono text-xs mb-3" style={{marginLeft: '30px'}}>
                          Auto-Experimentation Engine
                        </div>
                        <motion.div
                          className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-[hsl(var(--app-card))] border-2 border-[hsl(var(--app-border))] overflow-hidden" style={{ boxShadow: '0 0 15px rgba(0,0,0,0.1)', marginLeft: '60px' }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className="w-full h-full bg-gradient-to-br from-[hsl(var(--app-primary))]/20 to-[hsl(var(--app-secondary))]/20 flex items-center justify-center relative"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <div className="text-center relative z-10">
                              <div className="text-[hsl(var(--app-text))] font-mono text-sm md:text-base font-bold">OUTHAD</div>
                              <div className="text-[hsl(var(--app-text-muted))] font-mono text-[8px] md:text-xs mt-1">AI Engine</div>
                            </div>
                            {/* Orbiting dots */}
                            <motion.div 
                              className="absolute top-2 left-1/2 w-1.5 h-1.5 bg-[hsl(var(--app-primary))] rounded-full transform -translate-x-1/2"
                              animate={{ rotate: -360 }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div 
                              className="absolute bottom-2 left-1/2 w-1.5 h-1.5 bg-[hsl(var(--app-secondary))] rounded-full transform -translate-x-1/2"
                              animate={{ rotate: -360 }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                          </motion.div>
                        </motion.div>
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-[8px] md:text-xs mt-2" style={{marginLeft: '20px'}}>
                          Always-On Learning
                        </div>
                      </div>
                    </div>

                    {/* Flywheel Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block" style={{ overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="flywheelGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-primary))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="flywheelGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--app-primary))" stopOpacity="0.3" />
                        </linearGradient>
                        <mask id={`flywheelMask-${index}`}>
                          <rect x="0" y="0" width="100%" height="100%" fill="white" />
                          <circle cx="300" cy="300" r="64" fill="black" />
                        </mask>
                        <marker id="flywheelArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                          <path d="M0 0 L0 6 L8 3 z" fill="hsl(var(--app-primary))" opacity="0.7"/>
                        </marker>
                      </defs>
                      <g mask={`url(#flywheelMask-${index})`}>
                        {/* IMPROVE (top-left) to TEST (top-right) */}
                        <motion.path
                          d="M 220 120 Q 300 90 380 120"
                          stroke="url(#flywheelGradient1)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="6 4"
                          markerEnd="url(#flywheelArrow)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.8 }}
                          transition={{ duration: 2, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                        {/* TEST (top-right) to LEARN (bottom-right) */}
                        <motion.path
                          d="M 480 160 Q 520 300 480 440"
                          stroke="url(#flywheelGradient2)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="6 4"
                          markerEnd="url(#flywheelArrow)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.8 }}
                          transition={{ duration: 2, delay: 0.7 }}
                          viewport={{ once: true }}
                        />
                        {/* LEARN (bottom-right) to DEPLOY (bottom-left) */}
                        <motion.path
                          d="M 380 480 Q 300 510 220 480"
                          stroke="url(#flywheelGradient1)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="6 4"
                          markerEnd="url(#flywheelArrow)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.8 }}
                          transition={{ duration: 2, delay: 0.9 }}
                          viewport={{ once: true }}
                        />
                        {/* DEPLOY (bottom-left) to IMPROVE (top-left) */}
                        <motion.path
                          d="M 120 440 Q 80 300 120 160"
                          stroke="url(#flywheelGradient2)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="6 4"
                          markerEnd="url(#flywheelArrow)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.8 }}
                          transition={{ duration: 2, delay: 1.1 }}
                          viewport={{ once: true }}
                        />
                      </g>
                    </svg>
                  </div>
                ) : feature.title === 'Command Center' ? (
                  // Special command center dashboard layout
                  <div className="relative h-[300px] md:h-[600px] overflow-visible">
                    {/* Main container background */}
                    <motion.div
                      className="absolute inset-4 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-card))]/50 backdrop-blur-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      <div className="absolute inset-px rounded-2xl bg-[linear-gradient(135deg,_hsl(var(--app-card))_,_hsl(var(--app-card-hover)))]" />
                    </motion.div>

                    {/* Checkout Module (Top Left) */}
                    <motion.div
                      className="absolute top-4 left-8 md:left-12 w-32 h-24 md:w-40 md:h-32 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: -20, rotate: -5 }}
                      whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="h-full w-full bg-gradient-to-br from-[hsl(var(--app-primary))]/10 to-[hsl(var(--app-secondary))]/10 p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Checkout</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">CVR</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-blue-500">4.2%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Sessions</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-cyan-500">8.4K</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Revenue</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">$47.2K</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Analytics Module (Top Right) */}
                    <motion.div
                      className="absolute top-2 right-4 md:right-8 w-36 h-28 md:w-44 md:h-36 rounded-xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: -20, rotate: 8 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 5 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 h-full bg-gradient-to-br from-[hsl(var(--app-secondary))]/10 to-[hsl(var(--app-primary))]/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Analytics</div>
                        </div>
                        
                        {/* Mini chart visualization */}
                        <div className="w-full h-16 md:h-20 rounded-lg bg-[hsl(var(--app-card))] border border-[hsl(var(--app-border))] relative overflow-hidden mb-2">
                          <svg className="w-full h-full p-2 hidden md:block" viewBox="0 0 100 40">
                            <defs>
                              <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="hsl(var(--app-primary))" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.4" />
                              </linearGradient>
                            </defs>
                            <motion.polyline
                              points="5,30 20,25 35,15 50,12 65,10 80,12 95,8"
                              fill="none"
                              stroke="url(#chartGrad)"
                              strokeWidth="2"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                              viewport={{ once: true }}
                            />
                            <polygon
                              points="5,40 5,30 20,25 35,15 50,12 65,10 80,12 95,8 95,40"
                              fill="url(#chartGrad)"
                              opacity="0.2"
                            />
                          </svg>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">LTV</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">+47%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">CAC</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-green-500">-18%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Journeys Module (Bottom Left) */}
                    <motion.div
                      className="absolute bottom-8 left-4 md:left-8 w-40 h-32 md:w-48 md:h-36 rounded-2xl border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: 20, rotate: -8 }}
                      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 h-full bg-gradient-to-br from-[hsl(var(--app-primary))]/5 to-[hsl(var(--app-secondary))]/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Journeys</div>
                        </div>

                        {/* Journey flow visualization */}
                        <div className="flex items-center justify-center mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-purple-500/80 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <motion.div 
                              className="w-4 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <div className="w-4 h-4 rounded-sm bg-violet-500/80 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-sm"></div>
                            </div>
                            <motion.div 
                              className="w-4 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            />
                            <div className="w-4 h-4 rounded bg-purple-500/80 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded"></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Active</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-purple-500">24</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Optimizing</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-violet-500">3</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Recovery Rate</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">31.2%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Notifications & Marketing Module (Bottom Right) */}
                    <motion.div
                      className="absolute bottom-4 right-8 md:right-12 w-36 h-36 md:w-44 md:h-40 rounded-lg border border-[hsl(var(--app-border))] bg-[hsl(var(--app-background))] shadow-lg overflow-hidden z-10"
                      initial={{ opacity: 0, y: 20, rotate: 12 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 4 }}
                      whileHover={{ rotate: 0, scale: 1.05, z: 20 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <div className="p-3 h-full bg-gradient-to-br from-[hsl(var(--app-secondary))]/5 to-[hsl(var(--app-primary))]/10">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-4 h-4 rounded bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded"></div>
                          </div>
                          <div className="text-[8px] md:text-[10px] font-mono font-semibold text-[hsl(var(--app-text))]">Messages</div>
                        </div>

                        {/* Message channels visualization */}
                        <div className="flex items-center justify-center mb-3">
                          <div className="grid grid-cols-2 gap-2">
                            <motion.div
                              className="w-8 h-6 rounded-sm bg-orange-500/20 border border-orange-500/30 flex items-center justify-center"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <div className="text-[6px] text-orange-600 font-bold">📧</div>
                            </motion.div>
                            <motion.div
                              className="w-8 h-6 rounded-sm bg-amber-500/20 border border-amber-500/30 flex items-center justify-center"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                            >
                              <div className="text-[6px] text-amber-600 font-bold">📱</div>
                            </motion.div>
                            <motion.div
                              className="w-8 h-6 rounded-sm bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                            >
                              <div className="text-[6px] text-yellow-600 font-bold">🔔</div>
                            </motion.div>
                            <motion.div
                              className="w-8 h-6 rounded-sm bg-red-500/20 border border-red-500/30 flex items-center justify-center"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                            >
                              <div className="text-[6px] text-red-600 font-bold">📣</div>
                            </motion.div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Sent Today</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-orange-500">12.4K</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Delivered</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-amber-500">94%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">Campaigns</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-yellow-500">5 Live</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[6px] md:text-[8px] text-[hsl(var(--app-text-muted))]">ROAS</span>
                            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">4.2x</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Central Command Hub */}
                    <div className="absolute z-30 pointer-events-none" style={{ left: '55%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                      <div className="text-center">
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-xs mb-3" style={{ marginRight: '30px' }}>
                          Command Center
                        </div>
                        <motion.div
                          className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-[hsl(var(--app-card))] border-2 border-[hsl(var(--app-border))] overflow-hidden" style={{marginLeft: '6px'}}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--app-primary))]/20 to-[hsl(var(--app-secondary))]/20 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-[hsl(var(--app-text))] font-mono text-sm md:text-base font-bold">OUTHAD</div>
                              <motion.div
                                className="w-12 h-1 md:w-16 md:h-1 bg-gradient-to-r from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] rounded-full mx-auto mt-1"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <div className="text-[hsl(var(--app-text-muted))] font-mono text-[8px] md:text-xs mt-1">Control Hub</div>
                            </div>
                          </div>
                        </motion.div>
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-[8px] md:text-xs mt-2">
                          Unified Growth Platform
                        </div>
                      </div>
                    </div>

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="commandGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-primary))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="commandGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--app-secondary))" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="hsl(var(--app-primary))" stopOpacity="0.3" />
                        </linearGradient>
                        <mask id={`commandCenterMask-${index}`}>
                          <rect x="0" y="0" width="100%" height="100%" fill="white" />
                          <circle cx="300" cy="300" r="64" fill="black" />
                        </mask>
                      </defs>
                      <g mask={`url(#commandCenterMask-${index})`}>
                        <motion.path
                          d="M140 80 Q220 150 300 300"
                          stroke="url(#commandGradient1)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                        <motion.path
                          d="M460 100 Q380 200 300 300"
                          stroke="url(#commandGradient2)"
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
                          stroke="url(#commandGradient1)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.7 }}
                          transition={{ duration: 2, delay: 0.9 }}
                          viewport={{ once: true }}
                        />
                        <motion.path
                          d="M460 420 Q380 360 300 300"
                          stroke="url(#commandGradient2)"
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
                ) : ('image' in feature && (feature as any).image) || ('video' in feature && (feature as any).video) ? (
                  // Full image/video display without aspect ratio constraints
                    <motion.div
                      className="relative rounded-2xl border border-[hsl(var(--app-border))] overflow-hidden bg-[hsl(var(--app-card))]"
                      whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      {/* Glow border */}
                      <div className="pointer-events-none absolute inset-px rounded-2xl bg-[linear-gradient(135deg,_hsl(var(--app-card))_,_hsl(var(--app-card-hover)))]" />
                      <div className="relative">
                        {('video' in feature && (feature as any).video) ? (
                          <video
                            src={(feature as any).video}
                            className="w-full h-auto"
                            playsInline
                            muted
                            loop
                            autoPlay
                          />
                        ) : (
                          <Image
                            src={(feature as any).image}
                            alt={(feature as any).alt || feature.title}
                            width={800}
                            height={600}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="w-full h-auto object-contain"
                            priority={true}
                          />
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    // Mock visual layout for features without images/videos
                    <motion.div
                      className="relative aspect-video rounded-2xl border border-[hsl(var(--app-border))] overflow-hidden bg-[hsl(var(--app-card))]"
                      whileHover={{ y: -2 }}
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
                        <motion.div className="absolute left-4 top-4 px-3 py-1 rounded-full text-xs font-mono bg-[hsl(var(--app-background))]/70 border border-[hsl(var(--app-border))] text-[hsl(var(--app-text))]"
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
                        <div className="text-[hsl(var(--app-text-muted))] font-mono text-sm text-center">
                          {feature.visual}
                        </div>
                      </div>
                    </motion.div>
                  )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        {/* <motion.div
          className="text-center mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="relative inline-flex items-center justify-center px-8 py-4 rounded-full font-mono text-lg font-semibold text-[hsl(var(--app-background))] shadow-md"
            style={{ backgroundImage: 'linear-gradient(90deg, hsl(var(--app-primary)), hsl(var(--app-secondary)))' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">Start Your Customer Journey</span>
            <motion.span
              className="absolute inset-0 rounded-full"
              initial={{ boxShadow: '0 0 0 0 rgba(0,0,0,0)' }}
              whileHover={{ boxShadow: '0 12px 40px -8px hsl(var(--app-primary)/40%)' }}
            />
          </motion.button>
        </motion.div> */}
      </div>
    </div>
  )
}
