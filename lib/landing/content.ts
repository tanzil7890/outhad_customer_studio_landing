/**
 * Single source of truth for homepage copy, stats and proof.
 *
 * All three concept pages (/1, /2, /3) render this same content so they can be
 * compared on design alone. Before promoting a concept to `/`:
 *   - `grep -n "placeholder: true" lib/landing/content.ts` must return nothing
 *   - every Stat with status 'needs-source' should be sourced or softened
 */

export type StatKind = 'money' | 'rate' | 'time' | 'count'

export type Stat = {
  display: string
  label: string
  /** Only `money` renders in copper (brand rule: copper = revenue/conversion value). */
  kind: StatKind
  source: string
  status: 'confirmed' | 'needs-source'
}

export type LogoItem = { name: string; src?: string; href?: string; placeholder?: true }

export type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
  avatar?: string
  metric?: { value: string; label: string }
  placeholder?: true
}

export type CaseStudy = {
  company: string
  segment: string
  headline: string
  summary: string
  metrics: { value: string; label: string; kind: StatKind }[]
  href?: string
  placeholder?: true
}

export const BOOK_DEMO = {
  label: 'Book a demo',
  href: '/demo',
  calLink: 'tanzil-convertive/15-min-meeting-inquiry-or-general-chat',
  /** Separate namespace from /demo's inline embed so booking callbacks never double-fire. */
  calNamespace: 'book-demo-modal',
} as const

export const HERO = {
  eyebrow: 'Real-time customer activation for ecommerce',
  lines: ['Convert anonymous visitors', 'before they leave.'],
  lede:
    'Convertive reads intent while the shopper is still on your site, picks the next best action in under 100 milliseconds, and captures the sale and the email before the tab closes.',
  secondaryCta: { label: 'Watch a session', href: '#session' },
}

export const TRUST = {
  label: 'Backed by and building with',
  backers: [
    { name: 'Gateway Capital', src: '/images/landing/gateway-capital.png', href: 'https://gwaycapital.com/' },
    { name: 'AWS Startups', src: '/images/aws_startup.png' },
    { name: 'NVIDIA Inception', src: '/images/Nvidia_Inception_program.png' },
  ],
}

export const PROBLEM = {
  eyebrow: 'The problem',
  lines: ['Ecommerce does not have a traffic problem.', 'It has an anonymous conversion problem.'],
  body:
    'You paid to bring every one of them here. Most browse without logging in, leave without buying, and never give you a way to reach them again. By the time a recovery email could go out, there is no one to send it to, and retargeting means paying to acquire them twice.',
  stat: {
    display: '97 of 100',
    label: 'visitors leave without buying',
    kind: 'count',
    source: 'Inverse of a typical 2–3% ecommerce conversion rate',
    status: 'needs-source',
  } satisfies Stat,
}

export const SESSION = {
  eyebrow: 'Forty-seven seconds',
  lines: ['Watch one anonymous visitor', 'become a customer.'],
  lede:
    'An illustrative session, start to finish. Toggle Convertive off to see what happens on most stores today.',
  disclaimer: 'Illustrative session. “Sarah” is a persona, and scores and timings are simulated.',
}

export const WINDOW = {
  eyebrow: 'The window',
  lines: ['The moment is perishable.'],
  lede: 'Intent shows up and disappears inside a single session. Most tools respond after it is gone.',
  rows: [
    {
      key: 'bounce',
      label: 'An anonymous shopper decides whether to stay',
      display: '8–30 seconds',
      short: '8–30 s',
      seconds: 20,
      stat: {
        display: '8–30 s',
        label: 'anonymous bounce window',
        kind: 'time',
        source: 'TODO: cite source for 8–30s bounce window',
        status: 'needs-source',
      } satisfies Stat,
    },
    {
      key: 'legacy',
      label: 'Batch tools and recovery emails respond',
      display: 'Hours to days',
      short: 'Hours–days',
      seconds: 4 * 60 * 60,
      stat: {
        display: 'Hours–days',
        label: 'typical batch / recovery-email latency',
        kind: 'time',
        source: 'TODO: cite source for batch latency',
        status: 'needs-source',
      } satisfies Stat,
    },
    {
      key: 'convertive',
      label: 'Convertive decides and acts',
      display: 'Under 100 milliseconds',
      short: '<100 ms',
      seconds: 0.1,
      stat: {
        display: '<100 ms',
        label: 'event to rendered action',
        kind: 'time',
        source: 'Convertive platform spec (/the-mechanism)',
        status: 'confirmed',
      } satisfies Stat,
    },
  ],
  quote: 'Triggers react to time. Decisioning reacts to intent.',
}

export const CONTRAST = {
  eyebrow: 'Triggers vs decisioning',
  columns: [
    {
      title: 'Triggers',
      subtitle: 'React to time',
      points: [
        'If a cart sits for an hour, send an email.',
        'The same rule fires for every shopper.',
        'Needs an email address it usually does not have.',
      ],
    },
    {
      title: 'Decisioning',
      subtitle: 'Reacts to intent',
      points: [
        'Exit risk is high and she checked shipping twice: rank the eligible actions now.',
        'Each shopper gets the action with the highest expected lift.',
        'Works on anonymous visitors, inside the same session.',
      ],
    },
  ],
}

export const METHOD = {
  eyebrow: 'How it works',
  lines: ['Detect. Decide. Deliver. Capture.'],
  lede: 'One loop, running inside every live session.',
  steps: [
    {
      key: 'detect',
      title: 'Detect',
      body:
        'Every click, scroll, pause and price check streams into a live profile from the first page view, before you know who the shopper is.',
    },
    {
      key: 'decide',
      title: 'Decide',
      body:
        'The engine scores every eligible action by expected lift for this shopper, right now, and picks one in under 100ms. Not the first rule that happens to match.',
    },
    {
      key: 'deliver',
      title: 'Deliver',
      body:
        'The chosen intervention renders on-site in the same session: an offer, a shipping nudge, a bundle, a size helper. Frequency caps and suppression keep it from getting noisy.',
    },
    {
      key: 'capture',
      title: 'Capture',
      body:
        'Identity is asked for at the moment it is worth something to the shopper. The full anonymous history is stitched to the known profile and passed to your email and SMS tools.',
    },
  ],
} as const

export const PLATFORM = {
  eyebrow: 'The platform',
  lines: ['Everything between the click and the sale.'],
  lede: 'Five modules that share one live profile, so every decision sees the whole session.',
  modules: [
    {
      href: '/convertive-data-platform',
      title: 'Data Platform',
      description: 'Stream events, stitch identity, and keep every shopper profile activation-ready in real time.',
    },
    {
      href: '/convertive-audiences',
      title: 'Audiences',
      description: 'Build segments that update from live browsing behavior, not delayed warehouse snapshots.',
    },
    {
      href: '/convertive-ai-engine',
      title: 'Decisioning',
      description: 'Rank the next best action for each shopper using current context, intent, and value signals.',
    },
    {
      href: '/convertive-journey-orchestration',
      title: 'Journey Orchestration',
      description: 'Coordinate on-site and cross-channel journeys with guardrails, suppression, and shared state.',
    },
    {
      href: '/convertive-reporting',
      title: 'Reporting',
      description: 'Measure identity progression, decision quality, and lift with operator-friendly diagnostics.',
    },
  ],
}

export const INTEGRATIONS = {
  eyebrow: 'Works with your stack',
  lines: ['Converts the visitors Klaviyo never sees.', 'Then hands them to Klaviyo.'],
  lede:
    'Convertive sits on top of the tools you already run. Every email it captures arrives in your ESP with the full browsing history attached.',
  // Carried over from the current homepage integrations grid.
  items: ['Shopify', 'BigCommerce', 'SFCC', 'Magento / Adobe', 'GA4', 'Segment', 'Klaviyo', 'Iterable', 'Meta Ads', 'Google Ads'],
}

// Rendered from video/ (see video/README.md). Subtitles are burned in; the .vtt is published alongside.
export const VIDEO = {
  src: '/videos/convertive-demo.mp4',
  poster: '/videos/convertive-demo-poster.jpg',
  title: 'Watch the 47 seconds',
  duration: '1:14',
}

export const PROOF = {
  eyebrow: 'Evidence',
  lines: ['Brands converting in-session.'],
  lede: 'Results from stores running Convertive on live traffic.',
}

// TODO(proof): replace with real customer logos (SVG/PNG in /public/images/landing/logos).
export const CUSTOMER_LOGOS: LogoItem[] = [
  { name: 'Customer logo 1', placeholder: true },
  { name: 'Customer logo 2', placeholder: true },
  { name: 'Customer logo 3', placeholder: true },
  { name: 'Customer logo 4', placeholder: true },
  { name: 'Customer logo 5', placeholder: true },
  { name: 'Customer logo 6', placeholder: true },
]

// TODO(proof): replace with a real, approved quote.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: '[Testimonial quote, to be supplied. One or two sentences about the result and what changed.]',
    name: '[Name]',
    role: '[Role]',
    company: '[Company]',
    metric: { value: '[+X%]', label: '[metric]' },
    placeholder: true,
  },
]

// TODO(proof): replace with real case studies and measured results.
export const CASE_STUDIES: CaseStudy[] = [
  {
    company: '[Customer 1]',
    segment: '[Apparel & footwear]',
    headline: '[Case study headline, to be supplied]',
    summary: '[One-sentence summary of what Convertive changed for this store.]',
    metrics: [
      { value: '[+X%]', label: 'conversion rate', kind: 'rate' },
      { value: '[$X]', label: 'recovered per month', kind: 'money' },
    ],
    placeholder: true,
  },
  {
    company: '[Customer 2]',
    segment: '[Beauty]',
    headline: '[Case study headline, to be supplied]',
    summary: '[One-sentence summary of what Convertive changed for this store.]',
    metrics: [
      { value: '[X%]', label: 'anonymous visitors identified', kind: 'rate' },
      { value: '[$X]', label: 'added revenue per month', kind: 'money' },
    ],
    placeholder: true,
  },
  {
    company: '[Customer 3]',
    segment: '[Home & lifestyle]',
    headline: '[Case study headline, to be supplied]',
    summary: '[One-sentence summary of what Convertive changed for this store.]',
    metrics: [
      { value: '[+X%]', label: 'average order value', kind: 'rate' },
      { value: '[$X]', label: 'recovered per month', kind: 'money' },
    ],
    placeholder: true,
  },
]

export const ROI = {
  eyebrow: 'The arithmetic',
  lines: ['Run the numbers on your own traffic.'],
  lede: 'Your visitors, your conversion rate, your order value. Pick a scenario and see what a relative lift is worth.',
  disclaimer: 'Illustrative estimate. Results vary by store, traffic mix and offer.',
  defaults: { visitors: 25000, conversionRate: 2.0, aov: 85 },
  // Relative lift on conversion rate. status: needs-source until backed by pilot data.
  scenarios: [
    { key: 'conservative', label: 'Conservative', lift: 0.05 },
    { key: 'expected', label: 'Expected', lift: 0.1 },
    { key: 'strong', label: 'Strong', lift: 0.15 },
  ],
  defaultScenario: 'expected',
} as const

export const FAQS = [
  {
    question: 'What does Convertive do?',
    answer:
      'Convertive helps ecommerce brands convert anonymous visitors before they leave by using live behavioral signals, real-time identity progression, and in-session decisioning to trigger the best next action.',
  },
  {
    question: 'Who is Convertive built for?',
    answer:
      'Convertive is built for ecommerce teams that want stronger conversion, higher cart recovery, and better personalization without stitching together multiple disconnected tools.',
  },
  {
    question: 'How is Convertive different from a traditional CDP or marketing automation tool?',
    answer:
      'Traditional tools often depend on delayed data and channel silos. Convertive focuses on live session context, real-time activation, and coordinated next-best-action decisions while the shopper is still on-site.',
  },
  {
    question: 'Does it replace Klaviyo or my email tools?',
    answer:
      'No. Convertive works on the visitors your email tools cannot see yet: anonymous shoppers in a live session. When it captures an email, that shopper flows into your ESP with their full browsing history attached.',
  },
  {
    question: 'How long does it take to go live?',
    answer:
      'Days, not months. Convertive layers on top of your storefront and existing tools rather than replacing them, and we handle the initial setup with you.',
  },
]

export const FINAL = {
  lines: ['Your highest-value customer', 'is on your site right now.'],
  lede: 'Not in yesterday’s abandoned-cart email. See what Convertive would do with them in a 15-minute demo.',
}
