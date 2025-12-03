'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '../../components/ui/toast/button'
import Footer from '../../components/footer'

// Advanced Analytics Dashboard Visualization Component
const ReportingDashboardVisualization = () => {
  return (
    <div className="relative w-full max-w-[600px] h-[400px]">
      <svg
        viewBox="0 0 600 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
          </linearGradient>
          
          {/* Chart gradients */}
          <linearGradient id="chartGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
          </linearGradient>
          
          <linearGradient id="chartGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
          </linearGradient>
          
          <linearGradient id="chartGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
          </linearGradient>

          {/* Drop shadows */}
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="2" dy="2" result="offset"/>
            <feFlood floodColor="#000000" floodOpacity="0.1"/>
            <feComposite in2="offset" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="600" height="400" fill="url(#dashboardGradient)" rx="12" />

        {/* Dashboard Cards */}
        {/* Top Row Cards */}
        <g className="metric-cards">
          {/* Revenue Card */}
          <rect x="20" y="20" width="120" height="70" rx="6" fill="white" fillOpacity="0.9" filter="url(#dropShadow)" />
          <text x="30" y="35" fontSize="8" fill="#64748B" fontFamily="monospace" fontWeight="bold">TOTAL REVENUE</text>
          <text x="30" y="55" fontSize="16" fill="#1F2937" fontFamily="monospace" fontWeight="bold">$2.4M</text>
          <text x="30" y="70" fontSize="8" fill="#10B981">+12.5%</text>
          <circle cx="120" cy="40" r="12" fill="#3B82F6" fillOpacity="0.1" />
          <path d="M115 35 L125 35 L125 45 L115 45 Z" stroke="#3B82F6" strokeWidth="1" fill="none" />
          
          {/* Customers Card */}
          <rect x="160" y="20" width="120" height="70" rx="6" fill="white" fillOpacity="0.9" filter="url(#dropShadow)" />
          <text x="170" y="35" fontSize="8" fill="#64748B" fontFamily="monospace" fontWeight="bold">ACTIVE CUSTOMERS</text>
          <text x="170" y="55" fontSize="16" fill="#1F2937" fontFamily="monospace" fontWeight="bold">18.2K</text>
          <text x="170" y="70" fontSize="8" fill="#10B981">+8.3%</text>
          <circle cx="260" cy="40" r="12" fill="#10B981" fillOpacity="0.1" />
          <circle cx="260" cy="40" r="4" fill="#10B981" />
          
          {/* Conversion Card */}
          <rect x="300" y="20" width="120" height="70" rx="6" fill="white" fillOpacity="0.9" filter="url(#dropShadow)" />
          <text x="310" y="35" fontSize="8" fill="#64748B" fontFamily="monospace" fontWeight="bold">CONVERSION RATE</text>
          <text x="310" y="55" fontSize="16" fill="#1F2937" fontFamily="monospace" fontWeight="bold">3.7%</text>
          <text x="310" y="70" fontSize="8" fill="#EF4444">-2.1%</text>
          <circle cx="400" cy="40" r="12" fill="#F59E0B" fillOpacity="0.1" />
          <path d="M395 45 L405 35 L400 35 L400 40 L395 35 Z" stroke="#F59E0B" strokeWidth="1" fill="#F59E0B" />
          
          {/* Engagement Card */}
          <rect x="440" y="20" width="120" height="70" rx="6" fill="white" fillOpacity="0.9" filter="url(#dropShadow)" />
          <text x="450" y="35" fontSize="8" fill="#64748B" fontFamily="monospace" fontWeight="bold">ENGAGEMENT SCORE</text>
          <text x="450" y="55" fontSize="16" fill="#1F2937" fontFamily="monospace" fontWeight="bold">92.1</text>
          <text x="450" y="70" fontSize="8" fill="#10B981">+5.8%</text>
          <circle cx="540" cy="40" r="12" fill="#8B5CF6" fillOpacity="0.1" />
          <circle cx="540" cy="40" r="4" stroke="#8B5CF6" strokeWidth="2" fill="none" />
        </g>

        {/* Main Chart Area */}
        <rect x="20" y="110" width="360" height="180" rx="6" fill="white" fillOpacity="0.95" filter="url(#dropShadow)" />
        
        {/* Chart Grid */}
        <g className="chart-grid" opacity="0.2">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`hgrid-${i}`} x1="40" y1={130 + i * 30} x2="360" y2={130 + i * 30} stroke="#E5E7EB" strokeWidth="0.5" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <line key={`vgrid-${i}`} x1={40 + i * 40} y1="130" x2={40 + i * 40} y2="270" stroke="#E5E7EB" strokeWidth="0.5" />
          ))}
        </g>
        
        {/* Chart Title */}
        <text x="200" y="125" textAnchor="middle" fontSize="10" fill="#1F2937" fontFamily="monospace" fontWeight="bold">REVENUE TREND (LAST 8 MONTHS)</text>
        
        {/* Revenue Line Chart */}
        <path 
          d="M 40 250 Q 80 220 120 210 Q 160 200 200 180 Q 240 160 280 150 Q 320 145 360 140"
          stroke="#3B82F6" 
          strokeWidth="3" 
          fill="none"
          opacity="0.9"
        />
        
        {/* Area under curve */}
        <path 
          d="M 40 250 Q 80 220 120 210 Q 160 200 200 180 Q 240 160 280 150 Q 320 145 360 140 L 360 270 L 40 270 Z"
          fill="url(#chartGradient1)"
        />
        
        {/* Data points */}
        {[
          {x: 40, y: 250}, {x: 80, y: 220}, {x: 120, y: 210}, {x: 160, y: 200},
          {x: 200, y: 180}, {x: 240, y: 160}, {x: 280, y: 150}, {x: 320, y: 145}, {x: 360, y: 140}
        ].map((point, i) => (
          <g key={`point-${i}`}>
            <circle cx={point.x} cy={point.y} r="4" fill="white" stroke="#3B82F6" strokeWidth="2" />
            <circle cx={point.x} cy={point.y} r="2" fill="#3B82F6" />
            <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
          </g>
        ))}

        {/* Side Panel - Customer Segments */}
        <rect x="400" y="110" width="180" height="180" rx="6" fill="white" fillOpacity="0.95" filter="url(#dropShadow)" />
        
        <text x="490" y="125" textAnchor="middle" fontSize="10" fill="#1F2937" fontFamily="monospace" fontWeight="bold">CUSTOMER SEGMENTS</text>
        
        {/* Donut Chart */}
        <g className="donut-chart" transform="translate(490, 180)">
          {/* Outer ring segments */}
          <circle cx="0" cy="0" r="35" fill="none" stroke="#E5E7EB" strokeWidth="20" opacity="0.2" />
          
          {/* Active segment - 45% */}
          <circle 
            cx="0" 
            cy="0" 
            r="35" 
            fill="none" 
            stroke="#3B82F6" 
            strokeWidth="20" 
            strokeDasharray="63.6 141.4" 
            strokeDashoffset="0"
            transform="rotate(-90)"
            opacity="0.8"
          />
          
          {/* Engaged segment - 30% */}
          <circle 
            cx="0" 
            cy="0" 
            r="35" 
            fill="none" 
            stroke="#10B981" 
            strokeWidth="20" 
            strokeDasharray="42.4 157.6" 
            strokeDashoffset="-63.6"
            transform="rotate(-90)"
            opacity="0.8"
          />
          
          {/* At-risk segment - 25% */}
          <circle 
            cx="0" 
            cy="0" 
            r="35" 
            fill="none" 
            stroke="#F59E0B" 
            strokeWidth="20" 
            strokeDasharray="35.3 164.7" 
            strokeDashoffset="-106"
            transform="rotate(-90)"
            opacity="0.8"
          />
          
          {/* Center text */}
          <text x="0" y="-3" textAnchor="middle" fontSize="12" fill="#1F2937" fontFamily="monospace" fontWeight="bold">18.2K</text>
          <text x="0" y="8" textAnchor="middle" fontSize="6" fill="#64748B" fontFamily="monospace">TOTAL</text>
        </g>
        
        {/* Legend */}
        <g className="legend">
          <rect x="420" y="230" width="8" height="8" fill="#3B82F6" />
          <text x="435" y="238" fontSize="8" fill="#64748B" fontFamily="monospace">Active (45%)</text>
          
          <rect x="420" y="245" width="8" height="8" fill="#10B981" />
          <text x="435" y="253" fontSize="8" fill="#64748B" fontFamily="monospace">Engaged (30%)</text>
          
          <rect x="420" y="260" width="8" height="8" fill="#F59E0B" />
          <text x="435" y="268" fontSize="8" fill="#64748B" fontFamily="monospace">At-risk (25%)</text>
        </g>

        {/* Real-time indicators */}
        <g className="realtime-indicators">
          <circle cx="550" cy="320" r="3" fill="#10B981">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="560" y="324" fontSize="8" fill="#64748B" fontFamily="monospace">Live Updates</text>
          
          <rect x="400" y="340" width="180" height="20" rx="2" fill="#F3F4F6" />
          <rect x="400" y="340" width="135" height="20" rx="2" fill="#3B82F6" fillOpacity="0.2" />
          <text x="490" y="352" textAnchor="middle" fontSize="8" fill="#64748B" fontFamily="monospace">Data Refresh: 75%</text>
        </g>

        {/* Dashboard Title */}
        <text x="300" y="380" textAnchor="middle" fill="#64748B" fontSize="14" fontFamily="monospace" fontWeight="bold">
          CONVERTIVE REPORTING DASHBOARD
        </text>
      </svg>
    </div>
  )
}

export default function ConvertiveReportingPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] pt-48 sm:pt-56">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--app-text))] mb-6" style={{fontFamily: 'Nib Pro, sans-serif'}}>
              Convertive Reporting
            </h1>
            <p className="text-xl text-[hsl(var(--app-text-muted))] mb-8 font-mono">
              Transform your data into actionable insights with advanced analytics, real-time dashboards, and comprehensive reporting tools that drive informed decision-making across your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="https://cal.com/tanzilconvertive" target="_blank">
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
              <ReportingDashboardVisualization />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Real-time Dashboards</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Monitor key metrics and KPIs with live updating dashboards that provide instant visibility into business performance.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Advanced Analytics</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Deep dive into customer behavior patterns, conversion funnels, and performance trends with sophisticated analytical tools.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Custom Report Builder</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Create tailored reports with drag-and-drop functionality, custom filters, and flexible visualization options.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Automated Alerts</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Set up intelligent alerts and notifications for critical metrics, threshold breaches, and anomaly detection.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Collaborative Sharing</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Share reports and dashboards across teams with role-based permissions and interactive commenting features.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Export & Integration</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Export data in multiple formats and integrate with popular BI tools, spreadsheets, and external systems.</p>
          </div>
        </div>

        {/* Dashboard Types Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-[hsl(var(--app-text))] text-center mb-12" style={{fontFamily: 'Nib Pro, sans-serif'}}>Pre-built Dashboard Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Executive Overview</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">High-level business metrics and KPIs designed for C-level executives and strategic decision makers.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))]">
                <li>• Revenue and growth tracking</li>
                <li>• Customer acquisition costs</li>
                <li>• Market share and competitive analysis</li>
                <li>• ROI and profitability metrics</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Marketing Performance</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Comprehensive view of marketing campaigns, channel performance, and attribution analysis.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))]">
                <li>• Campaign ROI and attribution</li>
                <li>• Channel performance comparison</li>
                <li>• Lead generation and conversion funnels</li>
                <li>• Email and social media metrics</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Customer Analytics</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Deep insights into customer behavior, segmentation, and lifecycle analytics for better engagement strategies.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))]">
                <li>• Customer lifetime value analysis</li>
                <li>• Behavioral cohort analysis</li>
                <li>• Churn prediction and prevention</li>
                <li>• Satisfaction and NPS tracking</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Operational Insights</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Monitor operational efficiency, system performance, and team productivity with detailed operational dashboards.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))]">
                <li>• System uptime and performance</li>
                <li>• Team productivity metrics</li>
                <li>• Process efficiency tracking</li>
                <li>• Resource utilization analysis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-[hsl(var(--app-surface))]/30 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Ready to unlock your data's potential?</h2>
          <p className="text-lg text-[hsl(var(--app-text-muted))] mb-8 font-mono">
            Transform raw data into actionable insights with our comprehensive reporting and analytics platform.
          </p>
          <Link href="https://cal.com/tanzilconvertive" target="_blank">
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