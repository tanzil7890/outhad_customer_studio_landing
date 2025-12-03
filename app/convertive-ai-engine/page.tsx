'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '../../components/ui/toast/button'
import Footer from '../../components/footer'

// AI Neural Network Visualization Component
const AIEngineVisualization = () => {
  return (
    <div className="relative w-full max-w-[600px] h-[400px]">
      <svg
        viewBox="0 0 600 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>
          
          {/* Neural connection lines gradient */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
          </linearGradient>

          {/* Pulse animation */}
          <animate id="pulseAnim" attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </defs>

        {/* Background */}
        <rect width="600" height="400" fill="url(#aiGradient)" rx="12" />

        {/* Input Layer Nodes */}
        <g className="input-layer">
          {[80, 160, 240, 320].map((y, i) => (
            <g key={`input-${i}`}>
              <circle
                cx="80"
                cy={y}
                r="20"
                fill="#3B82F6"
                fillOpacity="0.8"
                stroke="#3B82F6"
                strokeWidth="2"
              >
                <animate attributeName="r" values="18;22;18" dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </circle>
              <text x="80" y={y + 5} textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace">
                {['DATA', 'USER', 'BEHV', 'TIME'][i]}
              </text>
            </g>
          ))}
        </g>

        {/* Hidden Layer 1 Nodes */}
        <g className="hidden-layer-1">
          {[100, 180, 260, 300].map((y, i) => (
            <g key={`hidden1-${i}`}>
              <circle
                cx="200"
                cy={y}
                r="18"
                fill="#8B5CF6"
                fillOpacity="0.7"
                stroke="#8B5CF6"
                strokeWidth="2"
              >
                <animate attributeName="r" values="16;20;16" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
              </circle>
            </g>
          ))}
        </g>

        {/* Hidden Layer 2 Nodes */}
        <g className="hidden-layer-2">
          {[120, 200, 280].map((y, i) => (
            <g key={`hidden2-${i}`}>
              <circle
                cx="320"
                cy={y}
                r="18"
                fill="#10B981"
                fillOpacity="0.7"
                stroke="#10B981"
                strokeWidth="2"
              >
                <animate attributeName="r" values="16;20;16" dur="2s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
              </circle>
            </g>
          ))}
        </g>

        {/* Output Layer Nodes */}
        <g className="output-layer">
          {[140, 200, 260].map((y, i) => (
            <g key={`output-${i}`}>
              <circle
                cx="480"
                cy={y}
                r="22"
                fill="#F59E0B"
                fillOpacity="0.8"
                stroke="#F59E0B"
                strokeWidth="2"
              >
                <animate attributeName="r" values="20;24;20" dur="2.8s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </circle>
              <text x="480" y={y + 4} textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">
                {['REC', 'PRED', 'OPT'][i]}
              </text>
            </g>
          ))}
        </g>

        {/* Connection lines from input to hidden layer 1 */}
        {[80, 160, 240, 320].map((inputY, i) => 
          [100, 180, 260, 300].map((hiddenY, j) => (
            <line
              key={`input-hidden1-${i}-${j}`}
              x1="100"
              y1={inputY}
              x2="182"
              y2={hiddenY}
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              opacity="0.4"
            >
              <animate attributeName="opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite" begin={`${(i + j) * 0.2}s`} />
            </line>
          ))
        )}

        {/* Connection lines from hidden layer 1 to hidden layer 2 */}
        {[100, 180, 260, 300].map((hidden1Y, i) => 
          [120, 200, 280].map((hidden2Y, j) => (
            <line
              key={`hidden1-hidden2-${i}-${j}`}
              x1="218"
              y1={hidden1Y}
              x2="302"
              y2={hidden2Y}
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate attributeName="opacity" values="0.1;0.6;0.1" dur="3.5s" repeatCount="indefinite" begin={`${(i + j) * 0.3}s`} />
            </line>
          ))
        )}

        {/* Connection lines from hidden layer 2 to output */}
        {[120, 200, 280].map((hidden2Y, i) => 
          [140, 200, 260].map((outputY, j) => (
            <line
              key={`hidden2-output-${i}-${j}`}
              x1="338"
              y1={hidden2Y}
              x2="458"
              y2={outputY}
              stroke="url(#connectionGradient)"
              strokeWidth="1.5"
              opacity="0.5"
            >
              <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" begin={`${(i + j) * 0.4}s`} />
            </line>
          ))
        )}

        {/* Data flow particles */}
        <g className="data-particles">
          {[0, 1, 2].map((i) => (
            <circle
              key={`particle-${i}`}
              r="3"
              fill="#3B82F6"
              fillOpacity="0.8"
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin={`${i * 1.3}s`}
                path="M 80 160 Q 200 180 320 200 Q 400 190 480 200"
              />
            </circle>
          ))}
        </g>

        {/* Layer Labels */}
        <text x="80" y="30" textAnchor="middle" fill="#64748B" fontSize="12" fontFamily="monospace">INPUT</text>
        <text x="200" y="30" textAnchor="middle" fill="#64748B" fontSize="12" fontFamily="monospace">PROCESS</text>
        <text x="320" y="30" textAnchor="middle" fill="#64748B" fontSize="12" fontFamily="monospace">ANALYZE</text>
        <text x="480" y="30" textAnchor="middle" fill="#64748B" fontSize="12" fontFamily="monospace">OUTPUT</text>

        {/* AI Engine Label */}
        <text x="300" y="380" textAnchor="middle" fill="#64748B" fontSize="14" fontFamily="monospace" fontWeight="bold">
          Convertive ENGINE
        </text>
      </svg>
    </div>
  )
}

export default function ConvertiveAIEnginePage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--app-background))] pt-48 sm:pt-56">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[hsl(var(--app-text))] mb-6" style={{fontFamily: 'Nib Pro, sans-serif'}}>
              Convertive Engine
            </h1>
            <p className="text-xl text-[hsl(var(--app-text-muted))] mb-8 font-mono">
              Power your customer activation with advanced machine learning algorithms that predict behavior, personalize experiences, and optimize engagement in real-time across every touchpoint.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="https://cal.com/tanzil-convertive" target="_blank">
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
              <AIEngineVisualization />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Predictive Analytics</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Forecast customer behavior and identify high-value opportunities before they happen using advanced ML models.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Smart Recommendations</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Deliver hyper-personalized product and content recommendations powered by collaborative filtering and deep learning.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Real-time Optimization</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Continuously optimize campaigns, pricing, and experiences using reinforcement learning algorithms.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Customer Lifetime Value</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Accurately predict and maximize CLV with sophisticated modeling that considers purchase patterns and behavior.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Churn Prevention</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Identify at-risk customers early and trigger automated retention campaigns to prevent churn before it happens.</p>
          </div>

          <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-text))] mb-2" style={{fontFamily: 'Nib Pro, sans-serif'}}>Anomaly Detection</h3>
            <p className="text-sm text-[hsl(var(--app-text-muted))] font-mono">Automatically detect unusual patterns in customer behavior and trigger alerts for immediate investigation.</p>
          </div>
        </div>

        {/* AI Models Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-[hsl(var(--app-text))] text-center mb-12" style={{fontFamily: 'Nib Pro, sans-serif'}}>Pre-trained AI Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Propensity Models</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Advanced machine learning models that predict customer propensity to purchase, engage, or churn based on historical data and behavioral signals.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))]">
                <li>• Purchase probability scoring</li>
                <li>• Engagement likelihood prediction</li>
                <li>• Churn risk assessment</li>
                <li>• Conversion rate optimization</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Recommendation Engine</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Sophisticated recommendation algorithms that understand customer preferences and deliver personalized product and content suggestions.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))]">
                <li>• Collaborative filtering algorithms</li>
                <li>• Content-based recommendations</li>
                <li>• Hybrid recommendation systems</li>
                <li>• Real-time personalization</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Dynamic Pricing</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">AI-powered pricing optimization that adjusts prices in real-time based on demand, competition, inventory, and customer behavior patterns.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))]">
                <li>• Demand forecasting algorithms</li>
                <li>• Competitive price monitoring</li>
                <li>• Elasticity-based optimization</li>
                <li>• Personalized pricing strategies</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--app-surface))]/50 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-xl p-8">
              <h3 className="text-xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Sentiment Analysis</h3>
              <p className="text-[hsl(var(--app-text-muted))] mb-6 font-mono">Natural language processing models that analyze customer feedback, reviews, and social media to understand sentiment and emotional drivers.</p>
              <ul className="space-y-2 text-sm text-[hsl(var(--app-text-muted))]">
                <li>• Real-time sentiment monitoring</li>
                <li>• Emotion detection algorithms</li>
                <li>• Topic modeling and analysis</li>
                <li>• Automated response triggers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-[hsl(var(--app-surface))]/30 backdrop-blur-sm border border-[hsl(var(--app-border))] rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-semibold text-[hsl(var(--app-text))] mb-4" style={{fontFamily: 'Nib Pro, sans-serif'}}>Ready to harness the power of AI?</h2>
          <p className="text-lg text-[hsl(var(--app-text-muted))] mb-8 font-mono">
            Transform your customer activation strategy with machine learning that delivers measurable results.
          </p>
          <Link href="https://cal.com/tanzil-convertive" target="_blank">
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