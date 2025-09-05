'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function CustomerActivation() {
  const features = [
    {
      title: "Outhad Data Platform",
      subtitle: "Data done right.",
      description: "Start building stronger first-party relationships. Customers are giving you their data. What are you giving them in return? How about highly personalized, customized experiences? With Outhad, you can.",
      visual: "A phone display an IAM simple survey."
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
    <div className="bg-[hsl(var(--app-background))] relative z-10 py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-lg sm:text-xl text-[hsl(var(--app-text))] font-mono mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Customers don't have campaigns, they have conversations. A majority of customers want personalized experiences from companies. Absolutely none of them want to be sold to. That's why the move from totally-siloed campaigns to fully-orchestrated journeys is so darn important. Here's how we're helping organizations on their journey.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {['Outhad Data Platform', 'outhadAI™', 'Journey Orchestration', 'Cross-Channel Messaging', 'Real-time Execution', 'Scale Without Fail'].map((item, index) => (
              <span key={index} className="text-sm sm:text-base font-mono text-[hsl(var(--app-primary))] bg-[hsl(var(--app-card))] px-3 py-1 rounded-full border border-[hsl(var(--app-border))]">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <div className="space-y-20 sm:space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <h3 className="text-2xl sm:text-3xl font-mono text-[hsl(var(--app-primary))] mb-2">
                  {feature.title}
                </h3>
                <h4 className="text-xl sm:text-2xl font-mono text-[hsl(var(--app-text))] mb-6">
                  {feature.subtitle}
                </h4>
                <p className="text-base sm:text-lg text-[hsl(var(--app-text-muted))] font-mono leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Visual */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="aspect-video bg-gradient-to-br from-[hsl(var(--app-card))] to-[hsl(var(--app-card-hover))] rounded-xl border border-[hsl(var(--app-border))] flex items-center justify-center">
                  <div className="text-[hsl(var(--app-text-muted))] font-mono text-sm text-center px-4">
                    {feature.visual}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-20 sm:mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-gradient-to-r from-[hsl(var(--app-primary))] to-[hsl(var(--app-secondary))] text-[hsl(var(--app-background))] px-8 py-4 rounded-full font-mono text-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Customer Journey
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}