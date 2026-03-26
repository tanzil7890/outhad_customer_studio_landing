'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DataPlatformVisual() {
  const [activeDataPoint, setActiveDataPoint] = useState(0)
  const [showDataFlow, setShowDataFlow] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDataPoint((prev) => (prev + 1) % 6)
    }, 2000)
    
    const flowTimer = setTimeout(() => setShowDataFlow(true), 1000)
    
    return () => {
      clearInterval(interval)
      clearTimeout(flowTimer)
    }
  }, [])

  const dataPoints = [
    { label: "Profile", icon: "👤", angle: 0, color: "#3B82F6", data: "User ID: 12345" },
    { label: "Email", icon: "📧", angle: 60, color: "#10B981", data: "Opens: 85%" },
    { label: "Commerce", icon: "🛒", angle: 120, color: "#F59E0B", data: "Cart: $234" },
    { label: "Mobile", icon: "📱", angle: 180, color: "#8B5CF6", data: "Sessions: 24" },
    { label: "Payment", icon: "💳", angle: 240, color: "#EF4444", data: "LTV: $1,250" },
    { label: "Search", icon: "🔍", angle: 300, color: "#06B6D4", data: "Intent: High" }
  ]

  const personalizedOutputs = [
    "🎯 Targeted Campaigns",
    "💬 Smart Recommendations", 
    "🔔 Behavioral Triggers",
    "📈 Revenue Optimization"
  ]

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900/50 via-[hsl(var(--app-card))] to-purple-900/30 rounded-xl border border-[hsl(var(--app-border))] overflow-hidden">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Neural Network Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => {
            const x1 = Math.random() * 100
            const y1 = Math.random() * 100
            const x2 = Math.random() * 100
            const y2 = Math.random() * 100
            
            return (
              <motion.line
                key={i}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="hsl(var(--app-primary))"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatType: "reverse" }}
              />
            )
          })}
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-center">
        {/* Data Collection Layer */}
        <div className="relative mb-8">
          <motion.div 
            className="relative mx-auto w-32 h-32"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            {/* Central Platform Hub */}
            <motion.div 
              className="absolute inset-6 bg-gradient-to-br from-[hsl(var(--app-primary))] via-[hsl(var(--app-secondary))] to-indigo-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(139, 92, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="text-white text-xs font-bold tracking-wider">CONVERTIVE</div>
                <div className="text-white/80 text-[10px] mt-1">DATA CORE</div>
              </div>
              
              {/* Pulse Rings */}
              {[0, 1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute inset-0 rounded-full border-2 border-white/20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, delay: ring * 0.7, repeat: Infinity }}
                />
              ))}
            </motion.div>
            
            {/* Data Source Points */}
            {dataPoints.map((point, index) => {
              const isActive = index === activeDataPoint
              const radius = 64
              const x = Math.cos((point.angle * Math.PI) / 180) * radius
              const y = Math.sin((point.angle * Math.PI) / 180) * radius
              
              return (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {/* Data Point Container */}
                  <motion.div
                    className="relative"
                    animate={{ 
                      scale: isActive ? 1.2 : 1,
                      y: isActive ? -2 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className={`w-12 h-12 rounded-full border-3 flex items-center justify-center shadow-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-white border-[hsl(var(--app-primary))] scale-110' 
                          : 'bg-[hsl(var(--app-background))] border-gray-300'
                      }`}
                      style={{ borderColor: isActive ? point.color : undefined }}
                    >
                      <span className="text-lg">{point.icon}</span>
                    </div>
                    
                    {/* Data Label */}
                    <motion.div
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                      animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1 : 0.9 }}
                    >
                      <div className="text-[hsl(var(--app-text))] text-xs font-semibold">
                        {point.label}
                      </div>
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="text-[hsl(var(--app-text-muted))] text-[10px] mt-1"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                          >
                            {point.data}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                  
                  {/* Data Flow Lines */}
                  <AnimatePresence>
                    {showDataFlow && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* Flowing Data Particles */}
                        {[0, 1, 2].map((particle) => (
                          <motion.div
                            key={particle}
                            className="absolute w-1 h-1 rounded-full"
                            style={{ backgroundColor: point.color }}
                            animate={{
                              x: [-x * 0.8, -x * 0.1],
                              y: [-y * 0.8, -y * 0.1],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 1.5,
                              delay: particle * 0.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                        
                        {/* Connection Line */}
                        <motion.div
                          className="absolute w-0.5 origin-center"
                          style={{
                            height: `${radius * 0.8}px`,
                            backgroundColor: isActive ? point.color : 'rgba(156, 163, 175, 0.3)',
                            transform: `rotate(${point.angle + 180}deg)`,
                            left: '50%',
                            top: '50%',
                            transformOrigin: 'center top'
                          }}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Processing Indicator */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--app-primary))] to-transparent flex-1" />
            <motion.div
              className="px-3 py-1 bg-[hsl(var(--app-primary))] text-white text-xs rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI PROCESSING
            </motion.div>
            <div className="h-px bg-gradient-to-r from-transparent via-[hsl(var(--app-primary))] to-transparent flex-1" />
          </div>
        </motion.div>

        {/* Personalized Outputs */}
        <motion.div
          className="grid grid-cols-2 gap-2 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          viewport={{ once: true }}
        >
          {personalizedOutputs.map((output, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-2 text-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              transition={{ duration: 0.2 }}
              animate={{ 
                boxShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 10px rgba(59, 130, 246, 0.3)",
                  "0 0 0px rgba(59, 130, 246, 0)"
                ]
              }}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <span className="text-[hsl(var(--app-text))] text-xs font-medium">
                {output}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Status Bar */}
        <motion.div
          className="absolute bottom-3 left-3 right-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between text-xs text-[hsl(var(--app-text-muted))]">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>Live Data Flow</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[hsl(var(--app-primary))] rounded-full"
                  animate={{ height: [4, 12, 4] }}
                  transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}