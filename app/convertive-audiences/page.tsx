'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '../../components/ui/toast/button'
import Footer from '../../components/footer'

// Hero Image Component - Audience Segmentation Visualization
const AudienceSegmentationChart = () => {
  // Calculate positions to ensure proper spacing and prevent overlaps
  const svgWidth = 480
  const svgHeight = 360
  
  // AI Engine position (center top)
  const aiCenter = { x: svgWidth / 2, y: 70 }
  
  // Audience segment positions with calculated distances
  const segments = [
    // Top row - minimum distance of 100px between centers
    { id: 'high-ltv', cx: 120, cy: 140, r: 32, color: '#3B82F6', label: 'High-LTV Explorer' },
    { id: 'loyalists', cx: 360, cy: 140, r: 35, color: '#8B5CF6', label: 'Brand Loyalists' },
    
    // Middle row - staggered for better visual flow
    { id: 'deal-hunters', cx: 90, cy: 240, r: 28, color: '#10B981', label: 'Deal Hunters' },
    { id: 'explorers', cx: 390, cy: 240, r: 38, color: '#F59E0B', label: 'Category Explorers' },
    
    // Bottom center - positioned to avoid overlap
    { id: 'at-risk', cx: 240, cy: 300, r: 25, color: '#EF4444', label: 'At Risk Customers' }
  ]
  
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
        {/* Background */}
        <rect width={svgWidth} height={svgHeight} fill="transparent" />
        
        {/* Audience Segments - Calculated positions */}
        {segments.map((segment) => (
          <g key={segment.id}>
            <circle 
              cx={segment.cx} 
              cy={segment.cy} 
              r={segment.r} 
              fill={segment.color} 
              fillOpacity="0.15" 
              stroke={segment.color} 
              strokeWidth="2.5"
              className="drop-shadow-sm"
            />
            
            {/* Segment Labels - positioned outside circles to avoid overlap */}
            <text 
              x={segment.cx} 
              y={segment.cy + segment.r + 18} 
              textAnchor="middle" 
              className="text-xs font-mono font-medium"
              fill={segment.color}
            >
              {segment.label.split(' ')[0]}
            </text>
            <text 
              x={segment.cx} 
              y={segment.cy + segment.r + 32} 
              textAnchor="middle" 
              className="text-xs font-mono"
              fill={segment.color}
              fillOpacity="0.8"
            >
              {segment.label.split(' ').slice(1).join(' ')}
            </text>
            
            {/* Customer count indicators */}
            <text 
              x={segment.cx} 
              y={segment.cy + 4} 
              textAnchor="middle" 
              className="text-xs font-mono font-semibold"
              fill={segment.color}
            >
              {segment.id === 'high-ltv' ? '2.3k' : 
               segment.id === 'loyalists' ? '4.1k' :
               segment.id === 'deal-hunters' ? '1.8k' :
               segment.id === 'explorers' ? '3.7k' : '892'}
            </text>
          </g>
        ))}
        
        {/* AI Engine - positioned at calculated center */}
        <g transform={`translate(${aiCenter.x - 25}, ${aiCenter.y - 25})`}>
          {/* Brain circuit background */}
          <circle cx="25" cy="25" r="22" fill="#6366F1" fillOpacity="0.1" stroke="#6366F1" strokeWidth="2" />
          
          {/* Neural network pattern */}
          <g stroke="#6366F1" strokeWidth="1.5" fill="none">
            <circle cx="18" cy="20" r="3" fill="#6366F1" />
            <circle cx="32" cy="20" r="3" fill="#6366F1" />
            <circle cx="25" cy="30" r="3" fill="#6366F1" />
            <line x1="18" y1="23" x2="25" y2="27" />
            <line x1="32" y1="23" x2="25" y2="27" />
          </g>
          
          {/* AI Engine label - positioned below to avoid overlap */}
          <text x="25" y="55" textAnchor="middle" className="text-sm font-mono font-semibold fill-current text-indigo-600">
            AI Engine
          </text>
          <text x="25" y="68" textAnchor="middle" className="text-xs font-mono fill-current text-indigo-500">
            Real-time Analysis
          </text>
        </g>
        
        {/* Data Flow Arrows - calculated paths to avoid overlaps */}
        <defs>
          <marker id="arrowhead" markerWidth="12" markerHeight="8" 
            refX="0" refY="4" orient="auto" markerUnits="strokeWidth">
            <polygon points="0 0, 12 4, 0 8" fill="#6366F1" />
          </marker>
          
          {/* Gradient for flow lines */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: '#6366F1', stopOpacity: 0.8}} />
            <stop offset="100%" style={{stopColor: '#8B5CF6', stopOpacity: 0.6}} />
          </linearGradient>
        </defs>
        
        {/* Curved flow lines from AI Engine to each segment */}
        {segments.map((segment, index) => {
          const startX = aiCenter.x
          const startY = aiCenter.y + 25
          const endX = segment.cx
          const endY = segment.cy - segment.r - 5
          
          // Calculate control points for smooth curves
          const midX = (startX + endX) / 2
          const midY = startY + (index % 2 === 0 ? 40 : 60)
          
          return (
            <path
              key={`flow-${segment.id}`}
              d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
              stroke="url(#flowGradient)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="drop-shadow-sm"
              style={{
                animation: `flow-${index} 3s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            />
          )
        })}
        
        {/* Connection lines between related segments */}
        <g stroke="#64748B" strokeWidth="1" strokeDasharray="3,3" opacity="0.4">
          <line x1="152" y1="140" x2="328" y2="140" />
          <line x1="118" y1="212" x2="362" y2="212" />
          <line x1="215" y1="275" x2="265" y2="275" />
        </g>
        
        {/* Performance metrics overlay */}
        <g transform="translate(20, 20)">
          <rect width="120" height="45" rx="6" fill="#1F2937" fillOpacity="0.9" />
          <text x="10" y="15" className="text-xs font-mono fill-white">Live Metrics</text>
          <text x="10" y="28" className="text-xs font-mono fill-green-400">+24.3% Conversion</text>
          <text x="10" y="40" className="text-xs font-mono fill-blue-400">87% Accuracy</text>
        </g>
        
      </svg>
      
      {/* CSS for flow animations */}
      <style jsx>{`
        @keyframes flow-0 { 0%, 100% { stroke-dashoffset: 0; } 50% { stroke-dashoffset: 10; } }
        @keyframes flow-1 { 0%, 100% { stroke-dashoffset: 5; } 50% { stroke-dashoffset: 15; } }
        @keyframes flow-2 { 0%, 100% { stroke-dashoffset: 10; } 50% { stroke-dashoffset: 0; } }
        @keyframes flow-3 { 0%, 100% { stroke-dashoffset: 15; } 50% { stroke-dashoffset: 5; } }
        @keyframes flow-4 { 0%, 100% { stroke-dashoffset: 20; } 50% { stroke-dashoffset: 10; } }
      `}</style>
    </div>
  )
}

export default function ConvertiveAudiencesPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] pt-48 sm:pt-56">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--app-text))] mb-6" style={{fontFamily: 'Nib Pro, sans-serif'}}>
              Convertive Audiences
            </h1>
            <p className="text-xl text-[hsl(var(--app-text-muted))] mb-8 font-mono">
              Build and manage dynamic customer segments that update in real-time based on behavior, purchase history, and AI-powered insights to deliver hyper-personalized experiences at scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="https://cal.com/tanzil-meeting" target="_blank">
                <Button 
                  size="lg"
                  className="font-mono bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] hover:bg-[hsl(var(--app-text-muted))] rounded-full transition-colors duration-200 px-8"
                >
                  Book Demo
                </Button>
              </Link>
              <Link href="/">
                <Button 
                  variant="outline"
                  size="lg"
                  className="font-mono bg-transparent border border-[hsl(var(--app-text))]/20 text-[hsl(var(--app-text))] hover:bg-[hsl(var(--app-text))]/10 rounded-full transition-colors duration-200 px-8"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <AudienceSegmentationChart />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Real-time Segmentation</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Automatically update audience segments as customer behavior changes, ensuring your targeting stays relevant and effective.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>AI-Powered Insights</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Leverage machine learning to discover hidden patterns and predict customer lifetime value, purchase propensity, and churn risk.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Behavioral Targeting</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Create segments based on browsing patterns, purchase history, engagement levels, and real-time intent signals.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Predictive Scoring</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Score customers by purchase likelihood, churn probability, and lifetime value to prioritize your marketing efforts effectively.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Privacy Compliant</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Built with GDPR, CCPA, and privacy-first principles. Customers maintain control over their data and segmentation preferences.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Cross-Channel Sync</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Synchronize audience segments across email, SMS, social media, and advertising platforms for consistent messaging.</p>
          </div>
        </div>

        {/* Audience Types Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-[hsl(var(--app-text))] text-center mb-12" style={{fontFamily: 'Nib Pro, sans-serif'}}>Pre-built Audience Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>High-Value Customers</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Identify and nurture your most valuable customers like Aisha, who show high lifetime value and exploration behavior.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))] font-mono">
                <li>• Purchase frequency &gt; 3x/month</li>
                <li>• Average order value &gt; $150</li>
                <li>• Product category exploration &gt; 2 categories</li>
                <li>• Customer satisfaction score &gt; 4.5/5</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Deal-Driven Shoppers</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Target price-conscious customers like Mateo who respond well to discounts and promotional campaigns.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))] font-mono">
                <li>• High email engagement with promotions</li>
                <li>• Cart abandonment recovery rate &gt; 40%</li>
                <li>• Price comparison behavior detected</li>
                <li>• Seasonal shopping patterns identified</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>At-Risk Customers</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Proactively identify customers showing churn signals to implement retention strategies before it's too late.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))] font-mono">
                <li>• Declining engagement scores</li>
                <li>• Increased time between purchases</li>
                <li>• Support ticket frequency increase</li>
                <li>• Competitor website visits detected</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Loyal Subscribers</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Reward and expand relationships with subscribers like Riya who show consistent engagement and brand loyalty.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))] font-mono">
                <li>• Subscription retention &gt; 12 months</li>
                <li>• High content engagement rates</li>
                <li>• Brand advocacy through referrals</li>
                <li>• Cross-sell opportunity scores &gt; 0.7</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-[hsl(var(--app-text))] text-center mb-12" style={{fontFamily: 'Nib Pro, sans-serif'}}>Seamless Integrations</h2>
          <div className="bg-[hsl(var(--app-surface))]/30 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-2xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {[
                { name: "Email Platforms", icon: "📧" },
                { name: "Ad Networks", icon: "📱" },
                { name: "CRM Systems", icon: "🔗" },
                { name: "Analytics Tools", icon: "📊" }
              ].map((integration, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl mb-2">{integration.icon}</div>
                  <p className="text-sm font-mono text-[hsl(var(--app-text-muted))]">{integration.name}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-[hsl(var(--app-text-muted))] font-mono mt-8 max-w-2xl mx-auto">
              Export audience segments to your favorite marketing tools or use our API to build custom integrations that fit your workflow.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-[hsl(var(--app-surface))]/30 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Ready to build smarter audience segments?</h2>
          <p className="text-lg text-[hsl(var(--app-text-muted))] mb-8 font-mono">
            Transform generic campaigns into personalized experiences that drive 15-30% higher conversion rates through intelligent audience targeting.
          </p>
          <Link href="https://cal.com/tanzil-meeting" target="_blank">
            <Button 
              size="lg"
              className="font-mono bg-[hsl(var(--app-text))] text-[hsl(var(--app-background))] hover:bg-[hsl(var(--app-text-muted))] rounded-full transition-colors duration-200 px-8"
            >
              Schedule a Demo
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}