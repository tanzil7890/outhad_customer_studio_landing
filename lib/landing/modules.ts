/**
 * The five platform product pages, as data. Copy, pillars, capabilities and
 * FAQs carry over from the original pages (they also feed each page's
 * Product and FAQ JSON-LD); the headline and demo text are new.
 */

export type ModuleKey = 'data-platform' | 'audiences' | 'ai-engine' | 'journey-orchestration' | 'reporting'

export interface ProductModule {
  key: ModuleKey
  index: string
  /** Short name used in navigation. */
  name: string
  /** Breadcrumb label (kept from the original pages). */
  crumb: string
  href: string
  /** Product name, kept in the H1 for search. */
  product: string
  headline: string[]
  lede: string
  /** One line for the "next module" card. */
  teaser: string
  demo: { eyebrow: string; title: string; note: string }
  pillarsHeading: string
  pillars: { title: string; text: string }[]
  capabilities: string[]
  faqs: { question: string; answer: string }[]
  schema: { name: string; description: string; featureList: string[] }
}

export const MODULES: ProductModule[] = [
  {
    key: 'data-platform',
    crumb: 'Data Platform',
    index: '01',
    name: 'Data Platform',
    href: '/convertive-data-platform',
    product: 'Convertive Data Platform',
    headline: ['Every ghost leaves a trail.', 'We keep all of it.'],
    lede:
      'Build a real-time data foundation for in-session conversion. Stitch anonymous and known activity into one live profile so every decision uses current shopper context.',
    teaser: 'Stream events, stitch identity, and keep every shopper profile activation-ready in real time.',
    demo: {
      eyebrow: 'Live profile',
      title: 'Watch one anonymous session become a profile.',
      note: 'Illustrative session. Sarah is a persona.',
    },
    pillarsHeading: 'Three layers between a click and a decision.',
    pillars: [
      { title: 'Streaming event ingestion', text: 'Capture click, scroll, pause, cart, and checkout events with low-latency processing.' },
      { title: 'Live profile store', text: 'Maintain one evolving profile that merges anonymous and known activity in-session.' },
      { title: 'Activation-ready outputs', text: 'Expose profile, intent, and eligibility signals instantly to decisioning and journeys.' },
    ],
    capabilities: [
      'Session event pipeline with source context',
      'Anonymous identity graph and profile stitching',
      'Cross-device profile continuity controls',
      'Warehouse-friendly sync and export paths',
      'Journey-safe state snapshots for orchestration',
      'Privacy and consent-aware profile governance',
    ],
    faqs: [
      {
        question: 'How does the Convertive Data Platform handle anonymous visitor data?',
        answer:
          'Convertive captures every behavioral signal from anonymous sessions — clicks, scrolls, cart activity, and pauses — and stores them in a live profile. When identity is captured, the anonymous history is stitched into the known profile instantly, with no data loss.',
      },
      {
        question: 'How is this different from a traditional CDP?',
        answer:
          'Traditional CDPs batch-process data from warehouse pipelines with hours or days of latency. Convertive Data Platform processes events in sub-second time during the live session, making data available for in-session decisioning while the shopper is still on-site.',
      },
      {
        question: 'Does Convertive work with our existing data stack?',
        answer:
          'Yes. Convertive ingests events from your ecommerce platform (Shopify, BigCommerce, SFCC, Magento) and can sync profile data back to your warehouse or downstream tools. It is designed to complement, not replace, your existing stack.',
      },
      {
        question: 'How does Convertive handle cross-device identity?',
        answer:
          'Convertive uses probabilistic and deterministic identity signals to link sessions across devices. When a visitor signs in or provides an email, cross-device profiles are merged automatically into one unified live profile.',
      },
    ],
    schema: {
      name: 'Convertive Data Platform',
      description:
        'Real-time ecommerce data platform for anonymous-to-known identity stitching, streaming event ingestion, and activation-ready profile outputs.',
      featureList: [
        'Streaming event ingestion',
        'Anonymous identity graph and profile stitching',
        'Cross-device profile continuity',
        'Live profile store',
        'Activation-ready outputs',
        'Privacy and consent-aware governance',
      ],
    },
  },
  {
    key: 'audiences',
    crumb: 'Audiences',
    index: '02',
    name: 'Audiences',
    href: '/convertive-audiences',
    product: 'Convertive Audiences',
    headline: ['Know which ghosts are which,', 'while they’re still here.'],
    lede:
      'Build segments that update from live browsing behavior, not delayed warehouse snapshots. Convertive Audiences give every anonymous visitor a segment membership the moment they land.',
    teaser: 'Build segments that update from live browsing behavior, not delayed warehouse snapshots.',
    demo: {
      eyebrow: 'Live segment',
      title: 'Pick the rules. Watch membership change as people browse.',
      note: 'Simulated visitors.',
    },
    pillarsHeading: 'Segments that move as fast as your shoppers.',
    pillars: [
      { title: 'Live behavioral signals', text: 'Build segments from real-time session data — scroll depth, product views, cart state, and pause behavior.' },
      { title: 'Anonymous-first architecture', text: 'Every anonymous visitor has a segment membership instantly, before identity is known.' },
      { title: 'Sub-second updates', text: 'Segment membership recalculates continuously during the session, not in overnight batches.' },
    ],
    capabilities: [
      'Session-level intent scoring and segment assignment',
      'Behavioral cohorts by product category and browse depth',
      'Cart abandonment and recovery segment triggers',
      'Cross-device segment continuity after identity stitching',
      'Suppression segments to prevent over-messaging',
      'Lookalike and value-tier audience definitions',
    ],
    faqs: [
      {
        question: 'How quickly do Convertive Audiences update during a session?',
        answer:
          'Convertive recalculates segment membership in sub-second time as behavioral events stream in. A visitor who just added a high-value item to cart is immediately eligible for a different intervention — no batch job required.',
      },
      {
        question: 'Can I build audiences from anonymous visitors who have never logged in?',
        answer:
          'Yes. Convertive is built anonymous-first. Every session generates behavioral signals that feed segment logic from the first page view, before any identity is known. This is the core advantage over tools that require an email address to segment.',
      },
      {
        question: 'How is this different from Klaviyo or Braze audiences?',
        answer:
          'Klaviyo and Braze audiences are built on identified profiles and historical event data synced from other systems. Convertive Audiences use live in-session behavior as the primary signal, which means they work for the 80%+ of traffic that is anonymous and they update during the session rather than after it.',
      },
      {
        question: 'Can Convertive audiences trigger both on-site and off-site channels?',
        answer:
          'Yes. Audiences defined in Convertive feed both on-site interventions (pop-ups, banners, offer overlays) and downstream channel triggers (email, SMS, ad suppression) through the Journey Orchestration layer.',
      },
    ],
    schema: {
      name: 'Convertive Audiences',
      description:
        'Real-time audience segmentation for ecommerce, built on in-session behavioral signals and anonymous-first identity architecture.',
      featureList: [
        'Sub-second segment recalculation',
        'Anonymous-first segmentation',
        'Session-level intent scoring',
        'Cart abandonment triggers',
        'Cross-device segment continuity',
        'Suppression segment support',
      ],
    },
  },
  {
    key: 'ai-engine',
    crumb: 'AI Decisioning',
    index: '03',
    name: 'AI Engine',
    href: '/convertive-ai-engine',
    product: 'Convertive Decisioning',
    headline: ['Not the first rule that matches.', 'The move most likely to work.'],
    lede:
      'Move from static rule priority to ranked in-session decisions. Convertive combines predictive modeling, context signals, and learning loops to select the next best action moment by moment.',
    teaser: 'Rank the next best action for each shopper using current context, intent, and value signals.',
    demo: {
      eyebrow: 'Decision playground',
      title: 'Change the shopper. Watch the best move change.',
      note: 'A simplified model for illustration.',
    },
    pillarsHeading: 'From live signals to one best action.',
    pillars: [
      { title: 'Predictive intent and value', text: 'Score likely conversion, bounce risk, and potential value while the session is live.' },
      { title: 'Action ranking layer', text: 'Choose one best action among competing options to reduce noise and improve conversion quality.' },
      { title: 'Continuous learning loop', text: 'Use outcomes to update policy and improve intervention quality over time.' },
    ],
    capabilities: [
      'Propensity-based intervention timing',
      'Offer aggressiveness by risk and value segment',
      'Recommendation relevance weighting by in-session context',
      'Holdout-aware policy evaluation for incremental lift',
      'Journey-safe suppression and fallback logic',
      'Adaptive strategy updates from observed outcomes',
    ],
    faqs: [
      {
        question: 'What makes Convertive\'s AI decisioning different from rule-based personalization?',
        answer:
          'Rule-based systems fire triggers based on static conditions — "if cart value > $100, show this offer." Convertive\'s AI decisioning ranks competing actions by predicted outcome for each individual shopper using live session context, value signals, and intent scores. It selects the action most likely to convert, not just the first rule that matches.',
      },
      {
        question: 'How does the next-best-action engine handle multiple competing interventions?',
        answer:
          'When multiple journeys or actions are eligible for a shopper, the ranking layer selects one winner based on predicted conversion lift, suppression rules, and channel guardrails. This prevents offer collisions and message fatigue that degrade conversion quality.',
      },
      {
        question: 'Does the AI model learn from our store\'s specific data?',
        answer:
          'Yes. The decisioning engine incorporates your store\'s behavioral patterns, conversion signals, and historical outcomes into its scoring. The continuous learning loop updates the policy model as new session outcomes are observed, improving action quality over time.',
      },
      {
        question: 'How do I measure if the AI decisioning is actually lifting conversions?',
        answer:
          'Convertive Reporting includes holdout-aware lift measurement that isolates the incremental impact of AI-selected interventions versus control groups. You can see decision quality by segment, channel, and intervention type from the Reporting dashboard.',
      },
    ],
    schema: {
      name: 'Convertive AI Decisioning Engine',
      description:
        'Predictive next-best-action engine for in-session ecommerce conversion, using intent scoring, value ranking, and continuous learning loops.',
      featureList: [
        'Predictive intent and value scoring',
        'Next-best-action ranking',
        'Continuous learning loop',
        'Holdout-aware policy evaluation',
        'Journey-safe suppression logic',
        'Offer collision prevention',
      ],
    },
  },
  {
    key: 'journey-orchestration',
    crumb: 'Journey Orchestration',
    index: '04',
    name: 'Journey Orchestration',
    href: '/convertive-journey-orchestration',
    product: 'Convertive Journey Orchestration',
    headline: ['Four channels. One shopper.', 'One conversation.'],
    lede:
      'Run coherent, session-aware journeys across web, checkout, email, SMS, and ads. Convertive coordinates message timing, suppression, and branching so shoppers see one intelligent sequence.',
    teaser: 'Coordinate on-site and cross-channel journeys with guardrails, suppression, and shared state.',
    demo: {
      eyebrow: 'One shopper, every channel',
      title: 'The same session, with and without one orchestration layer.',
      note: 'Illustrative session. Sarah is a persona.',
    },
    pillarsHeading: 'One current truth for every channel.',
    pillars: [
      { title: 'Shared journey state', text: 'Track what each shopper has seen and done so all channels use one current truth.' },
      { title: 'Guardrails and suppression', text: 'Prevent overlapping promotions and redundant messages with explicit suppression rules.' },
      { title: 'Adaptive branch logic', text: 'Update path selection in-session when intent changes or conversion likelihood shifts.' },
    ],
    capabilities: [
      'Global frequency caps by session and channel',
      'Mutual exclusion between competing incentives',
      'Cancellation of stale follow-ups after conversion',
      'Fallback actions when preferred channels are unavailable',
      'Eligibility checks before each send or on-site trigger',
      'Priority overrides for checkout-critical moments',
    ],
    faqs: [
      {
        question: 'What does journey orchestration mean in the context of ecommerce?',
        answer:
          'Journey orchestration coordinates the sequence, timing, and channel of every message or intervention a shopper receives. In ecommerce, this means making sure an on-site offer, an email, and a retargeting ad aren\'t all firing simultaneously for the same shopper — and that the most relevant action wins based on current session context.',
      },
      {
        question: 'How does Convertive prevent conflicting offers from firing at the same time?',
        answer:
          'Convertive uses mutual exclusion rules and suppression logic built into the journey layer. When a shopper is in an active on-site intervention, downstream channels like email and SMS are suppressed. After conversion, stale follow-up sequences are cancelled automatically.',
      },
      {
        question: 'Can Convertive journeys respond to real-time signals mid-session?',
        answer:
          'Yes. Journey branch logic re-evaluates as new behavioral events stream in. If a visitor\'s intent score increases because they just viewed a third product in a category, the journey can shift from a passive nudge to an active offer without waiting for the next session.',
      },
      {
        question: 'How does this differ from marketing automation tools like Klaviyo flows or Braze canvases?',
        answer:
          'Marketing automation tools build flows around historical profile data and channel-specific events. Convertive Journey Orchestration is session-aware and shared-state — it coordinates in-session on-site actions alongside cross-channel messages from a single orchestration layer, using live behavioral signals not post-session triggers.',
      },
    ],
    schema: {
      name: 'Convertive Journey Orchestration',
      description:
        'Session-aware journey orchestration for ecommerce that coordinates on-site interventions and cross-channel messages from shared state with suppression and guardrails.',
      featureList: [
        'Shared journey state across channels',
        'Suppression and mutual exclusion rules',
        'Adaptive in-session branch logic',
        'Global frequency caps',
        'Post-conversion sequence cancellation',
        'Checkout-critical priority overrides',
      ],
    },
  },
  {
    key: 'reporting',
    crumb: 'Reporting',
    index: '05',
    name: 'Reporting',
    href: '/convertive-reporting',
    product: 'Convertive Reporting',
    headline: ['Don’t trust a dashboard.', 'Trust a holdout.'],
    lede:
      'Measure what matters for in-session conversion: identity progression quality, decision effectiveness, and journey-level lift. Reporting is designed for both operators and leadership.',
    teaser: 'Measure identity progression, decision quality, and lift with operator-friendly diagnostics.',
    demo: {
      eyebrow: 'Lift test',
      title: 'Run a holdout and watch the answer firm up.',
      note: 'Simulated data. Your lift depends on your store.',
    },
    pillarsHeading: 'Measure decisions, not just channels.',
    pillars: [
      { title: 'Identity progression analytics', text: 'Track where visitors become known and where identity capture opportunities are lost.' },
      { title: 'Journey diagnostics', text: 'Inspect decision paths, suppression behavior, and cross-channel conflicts by segment.' },
      { title: 'Qualified lift measurement', text: 'Evaluate outcome impact with control-aware reporting and operational context.' },
    ],
    capabilities: [
      'Identity signal heatmap by funnel stage',
      'Action ranking outcomes by segment and context',
      'Suppression and frequency conflict audit logs',
      'Conversion and recovery timeline by channel',
      'Holdout-aware lift and confidence summaries',
      'Latency and delivery health for in-session actions',
    ],
    faqs: [
      {
        question: 'How does Convertive measure conversion lift without a third-party testing tool?',
        answer:
          'Convertive uses holdout groups built into the journey layer. A controlled percentage of eligible shoppers receives no intervention, and conversion rates are compared to the treated group. Lift is calculated with statistical confidence scores so you know when a result is meaningful versus noise.',
      },
      {
        question: 'What is identity progression reporting?',
        answer:
          'Identity progression reporting shows where in the funnel anonymous visitors become known — via email capture, checkout, account login, or other identity events. It highlights which pages and journeys are most effective at advancing identity and where capture opportunities are being missed.',
      },
      {
        question: 'Can I see why a specific shopper received a certain intervention?',
        answer:
          'Yes. Journey diagnostics let you inspect individual decision paths — including which signals triggered eligibility, which action was ranked highest, and whether suppression or guardrails modified the outcome. This is useful for debugging unexpected behavior and auditing AI decisions.',
      },
      {
        question: 'How is Convertive reporting different from Google Analytics or platform dashboards?',
        answer:
          'GA and platform dashboards measure aggregate channel performance. Convertive Reporting measures the quality of individual decisions within sessions — did the AI pick the right action for each shopper? It is designed to answer operational questions like "are my suppression rules working?" and "which segments respond best to which interventions?"',
      },
    ],
    schema: {
      name: 'Convertive Reporting',
      description:
        'Conversion lift reporting and session journey analytics for ecommerce, including identity progression heatmaps, holdout-aware lift measurement, and journey diagnostics.',
      featureList: [
        'Holdout-aware conversion lift measurement',
        'Identity progression analytics',
        'Journey diagnostics by segment',
        'Action ranking outcome reports',
        'Suppression and conflict audit logs',
        'In-session delivery health monitoring',
      ],
    },
  },
]

export const moduleByKey = (key: ModuleKey) => MODULES.find((m) => m.key === key)!

export function nextModule(key: ModuleKey) {
  const i = MODULES.findIndex((m) => m.key === key)
  return MODULES[(i + 1) % MODULES.length]
}
