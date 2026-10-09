import { BarChart3, BrainCircuit, Database, Route, Users, type LucideIcon } from 'lucide-react'

/** Single source for site navigation: header (desktop + mobile) and footer. */

export type NavLink = { href: string; name: string; desc?: string; icon?: LucideIcon }

export const PLATFORM_NAV: NavLink[] = [
  { href: '/convertive-data-platform', name: 'Data Platform', desc: 'First-party profiles for every anonymous visitor', icon: Database },
  { href: '/convertive-audiences', name: 'Audiences', desc: 'Live segments that update in milliseconds', icon: Users },
  { href: '/convertive-ai-engine', name: 'AI Engine', desc: 'Predict intent and act before they leave', icon: BrainCircuit },
  { href: '/convertive-journey-orchestration', name: 'Journey Orchestration', desc: 'In-session intervention before visitors leave', icon: Route },
  { href: '/convertive-reporting', name: 'Reporting', desc: 'Track in-session lift and anonymous conversion', icon: BarChart3 },
]

export const INSIGHTS_NAV: NavLink[] = [
  { href: '/the-mechanism', name: 'The Mechanism', desc: 'How in-session decisioning works' },
  { href: '/the-methodology', name: 'The Methodology', desc: 'Measuring anonymous session leakage' },
  { href: '/the-audit', name: 'The Audit', desc: 'Find revenue leaks in 7 steps' },
  { href: '/the-metrics', name: 'The Metrics', desc: 'KPIs for in-session revenue' },
  { href: '/comparison', name: 'The Comparison', desc: 'vs CDPs, popups, retargeting, replay' },
  { href: '/manifesto', name: 'The Manifesto', desc: 'The anonymous conversion problem' },
]

export const PRIMARY_LINKS: NavLink[] = [
  { href: '/#storylines', name: 'How it works' },
  { href: '/blogs', name: 'Blogs' },
  { href: '/careers', name: 'Careers' },
]

export const COMPANY_NAV: NavLink[] = [
  { href: '/blogs', name: 'Blogs' },
  { href: '/roi-calculator', name: 'ROI Calculator' },
  { href: '/audit', name: 'Free ROI Audit' },
  { href: '/careers', name: 'Careers' },
  { href: '/demo', name: 'Book a demo' },
]

export const LEGAL_NAV: NavLink[] = [
  { href: '/privacy-policy', name: 'Privacy Policy' },
  { href: '/terms', name: 'Terms of Service' },
]
