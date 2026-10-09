/**
 * The six Insights articles. Copy is carried over verbatim from the original
 * pages (it also feeds their HowTo and FAQ JSON-LD); only the layout around
 * it changed. Edit article text here, not in the page files.
 */

export type InsightKey = 'mechanism' | 'methodology' | 'audit' | 'metrics' | 'comparison' | 'manifesto'

export const INSIGHTS: { key: InsightKey; index: string; name: string; href: string; desc: string; crumb: string }[] = [
  { key: 'mechanism', index: '01', name: 'The Mechanism', href: '/the-mechanism', desc: 'How in-session decisioning works', crumb: 'The Mechanism' },
  { key: 'methodology', index: '02', name: 'The Methodology', href: '/the-methodology', desc: 'Measuring anonymous session leakage', crumb: 'The Methodology' },
  { key: 'audit', index: '03', name: 'The Audit', href: '/the-audit', desc: 'Find revenue leaks in 7 steps', crumb: 'The Audit' },
  { key: 'metrics', index: '04', name: 'The Metrics', href: '/the-metrics', desc: 'KPIs for in-session revenue', crumb: 'The Metrics' },
  { key: 'comparison', index: '05', name: 'The Comparison', href: '/comparison', desc: 'vs CDPs, popups, retargeting, replay', crumb: 'The Comparison' },
  { key: 'manifesto', index: '06', name: 'The Manifesto', href: '/manifesto', desc: 'The anonymous conversion problem', crumb: 'Manifesto' },
]

export const insightByKey = (key: InsightKey) => INSIGHTS.find((i) => i.key === key)!
export const nextInsight = (key: InsightKey) => INSIGHTS[(INSIGHTS.findIndex((i) => i.key === key) + 1) % INSIGHTS.length]

export type Faq = { question: string; answer: string }

// ── 01 The Mechanism ────────────────────────────────────────────────────────

export const MECHANISM = {
  title: 'How In-Session Decisioning Works',
  lede: 'Most marketing acts hours later. We act in milliseconds. Below is the five-stage loop that turns an anonymous click into a personalized action before the visitor bounces.',
  loopIntro:
    'Each stage runs in parallel where possible. Total budget from event to rendered action is below the threshold a human eye registers as latency. That is the only window that matters — the bounce window is shorter than most dashboards refresh.',
  stages: [
    {
      n: '01',
      title: 'Event ingest',
      latency: '< 10ms',
      ms: 10,
      desc: 'Every click, scroll, hover, add-to-cart, and source signal streams off the page into a low-latency event bus the moment it happens. No batch jobs. No nightly ETL.',
    },
    {
      n: '02',
      title: 'Live profile',
      latency: '< 20ms',
      ms: 20,
      desc: 'Events update an in-memory profile keyed to a cookie or device ID. If identity arrives mid-session — email, login, phone — the anonymous trail is stitched to the known profile in real time. The profile is enriched, never re-built.',
    },
    {
      n: '03',
      title: 'Intent inference',
      latency: '< 30ms',
      ms: 30,
      desc: 'Browsing sequence, dwell time, price-point pattern, and source context feed predictive scores: propensity to convert, bounce risk, price sensitivity, category affinity. The system infers what the visitor wants before they tell you.',
    },
    {
      n: '04',
      title: 'Next-best-action ranking',
      latency: '< 30ms',
      ms: 30,
      desc: 'Multiple eligible actions — discount popup, product rec carousel, free-shipping banner, identity capture, cart save, do nothing — are scored against the live profile. The single highest-expected-lift action wins. Conflicts and message fatigue avoided.',
    },
    {
      n: '05',
      title: 'Render + log + learn',
      latency: '< 10ms',
      ms: 10,
      desc: 'Selected action injected via the on-site SDK. Outcome logged: clicked, ignored, converted, bounced. The learning loop updates the policy so the next session benefits from this one.',
    },
  ],
  windows: [
    { label: 'Anonymous bounce window', value: '8–30s', tone: 'risk' as const },
    { label: 'Average decisioning window in legacy stacks', value: 'hours – days', tone: 'risk' as const },
    { label: 'Convertive decisioning window', value: '< 100ms', tone: 'win' as const },
  ],
  architecture: [
    {
      title: 'Streaming pipeline',
      body: 'Shopify app + JS SDK push clickstream events into a real-time bus. Modern stream processing fans events out to the profile store, decision engine, and analytics in parallel.',
    },
    {
      title: 'In-memory live profile',
      body: 'Per-visitor profile kept hot for the active session. Avoids cold reads against a warehouse during the decision window. Identity stitched on-the-fly when email or login arrives.',
    },
    {
      title: 'Decision engine',
      body: 'Contextual bandit / ranker scores eligible actions per profile. Rule fallbacks when confidence is low. Holdouts preserved for measurement.',
    },
    {
      title: 'Outcome + learning loop',
      body: 'Every impression and outcome feeds back. Policy updates without manual A/B test cycles. The system gets sharper as more sessions flow through.',
    },
  ],
  capabilitiesIntro:
    'A platform either delivers all seven or it is not in-session decisioning. Triggers and rules cover one or two. CDPs cover identity but not action. Popups cover action but not intent. The full loop is the bar.',
  capabilities: [
    { title: 'Recognize intent from clickstream + source', body: 'UTM, referrer, browse pattern, dwell, scroll depth merged into intent signals within seconds.' },
    { title: 'Live profile for anonymous + known', body: 'A single profile per visitor, updated continuously. Anonymous-to-known stitched on-the-fly.' },
    { title: 'Real-time next-best-action selection', body: 'Decision engine picks the action with highest expected lift, not the first matching rule.' },
    { title: 'Adapt actions as behavior shifts', body: 'Cancel a planned email if the user just bought. Suppress a popup if the cart was abandoned. Mid-session pivots, not pre-baked flows.' },
    { title: 'Cross-link offers when intent shifts', body: 'Anonymous browser → cart adder → high-intent. Each transition triggers a different offer class.' },
    { title: 'Deliver in milliseconds', body: 'Sub-100ms end-to-end from event to rendered action. Below the threshold of perceptible delay.' },
    { title: 'Log outcomes + learn loops', body: 'Every action and result feeds back into the decisioning model. The system gets smarter with every session.' },
  ],
  adjacent: {
    title: 'Why CDPs, popups, retargeting, and session replay each fail this loop',
    body: 'Each category solves a slice. None own the full event-to-action loop in under 100ms. Detailed breakdown in the comparison page.',
  },
  faqs: [
    {
      question: 'What does "in-session" actually mean in technical terms?',
      answer:
        'A decision computed and rendered before the user navigates away from the current page or browser tab. End-to-end latency under 100ms — event ingest, profile update, scoring, action selection, and DOM render — measured against the user\'s active session, not against a backend schedule.',
    },
    {
      question: 'How is this different from a marketing automation platform with real-time triggers?',
      answer:
        'Marketing automation triggers fire on rules ("cart abandoned for 30 minutes → email"). In-session decisioning ranks every eligible action by predicted lift for the live profile, picks one, and renders it before the visitor bounces. Triggers react to time. Decisioning reacts to intent.',
    },
    {
      question: 'Does the mechanism require ripping out our existing stack?',
      answer:
        'No. Convertive layers on top of Shopify, your ESP (Klaviyo, Braze), your CDP, and your ad platforms. The mechanism consumes events from those systems and emits decisions back to them — popups on-site, suppression signals to ESP, audience syncs to ad platforms.',
    },
    {
      question: 'How does the system avoid showing conflicting offers?',
      answer:
        'The next-best-action ranker is a global selector. When multiple campaigns are eligible — say a discount popup, a product rec, and an email capture — the ranker picks one based on expected conversion lift for that profile. Frequency caps and mutual exclusivity rules enforce one-action-per-session-stage discipline.',
    },
    {
      question: 'What happens if the AI service is slow or unavailable?',
      answer:
        'Fallback to a cached rule-based decision so the user still sees an action. The system is built to fail gracefully — a slower, simpler decision is better than no decision before the bounce.',
    },
  ] as Faq[],
}

// ── 02 The Methodology ──────────────────────────────────────────────────────

export const METHODOLOGY = {
  title: 'How we measure anonymous session leakage',
  lede: 'Roughly 70% of carts get abandoned. Around 95% of sessions stay anonymous. Somewhere inside those numbers is recoverable revenue. The methodology below quantifies it.',
  definition: {
    name: 'Anonymous Session Leakage',
    body: 'The dollar value of anonymous traffic that left without an intervention strong enough to convert or capture identity, weighted by the intent each session demonstrated.',
    note: 'Intent score gates which sessions count. Recoverable lift is the conversion delta in-session intervention would have produced. Both are what separate this from raw bounce-rate math.',
  },
  /** The formula, term by term, so the page can explain each one. */
  terms: [
    { key: 'session', label: 'anonymous session', explain: 'Every session that never attached an email, phone or login. Most stores: 92–98% of sessions.', step: '01' },
    { key: 'intent', label: 'intent score', explain: 'Gates which sessions count: 3+ pageviews, dwell over 30s, scroll over 60%. These are the high-value leaks.', step: '02' },
    { key: 'bounce', label: 'bounce probability', explain: 'The chance a session in that intent band leaves without converting or identifying.', step: '02' },
    { key: 'aov', label: 'expected AOV', explain: 'What a conversion from that session would be worth. Turns recovered conversions into revenue.', step: '04' },
    { key: 'lift', label: 'recoverable lift', explain: 'The conversion delta an in-session intervention would have produced (8–25% per Convertive benchmarks).', step: '03' },
  ],
  categoriesIntro: 'Total leakage is the sum of four distinct failure modes. Each has its own diagnostic signals and its own fix. Mixing them is why most teams cannot find the bleed.',
  categories: [
    {
      n: '01',
      title: 'Bounce-before-identify',
      desc: 'High-intent anonymous visitor lands, browses, leaves without ever providing an email or phone. No retargeting hook. No remarketing email. Pure loss. Largest leak by volume.',
      signals: ['Sessions with 3+ pageviews and 0 identity events', 'Source: paid social, paid search', 'Above-median scroll depth, no engagement event'],
    },
    {
      n: '02',
      title: 'Cart abandonment leakage',
      desc: 'Visitor adds to cart, never identifies, never checks out. Industry baseline: ~70%. Without identity, you have nothing to follow up with. Largest leak by dollar.',
      signals: ['Add-to-cart without checkout-start', 'Checkout-start without complete', 'Time on cart > 60s with no progress'],
    },
    {
      n: '03',
      title: 'Intent-mismatch leakage',
      desc: 'Visitor sees a generic experience that does not match their actual intent. Bargain hunter shown VIP messaging. Comparison shopper shown a discount. Wrong action, wasted impression.',
      signals: ['Action shown but no engagement', 'Action shown but bounce within 5s', 'Repeat visit with same generic offer'],
    },
    {
      n: '04',
      title: 'Channel miss-fire leakage',
      desc: 'Identity captured but the follow-up fires too late, in the wrong channel, or after the visitor already converted. Email sent next day when SMS in 5 minutes would have closed it.',
      signals: ['Email send > 30 min after exit', 'Channel sent after purchase already complete', 'Duplicate offer across web + email + SMS'],
    },
  ],
  formulaIntro:
    'Walk through these in order. Step 1 is volume. Step 2 narrows to recoverable. Step 3 applies a defensible lift assumption. Step 4 translates to revenue. The output is one number you can put on a slide.',
  formulaSteps: [
    { n: '01', title: 'Anonymous session count', body: 'Total sessions in period × (1 − identification rate). Most stores: 92–98% of sessions.' },
    {
      n: '02',
      title: 'Intent-weighted bounce rate',
      body: 'Filter to sessions with intent score above threshold (3+ pageviews, dwell > 30s, scroll > 60%). Compute bounce rate within that cohort. These are the high-value leaks.',
    },
    {
      n: '03',
      title: 'Recoverable conversion delta',
      body: 'Apply expected lift from in-session intervention (8–25% per Convertive benchmarks) to the high-intent anonymous cohort. The delta is the conversion you should be capturing but are not.',
    },
    { n: '04', title: 'Translate to revenue', body: 'Recoverable conversions × average order value = monthly revenue at risk. This is the leakage number. Annualize for the boardroom.' },
  ],
  heatmapIntro:
    'The aggregate leakage number tells you the size of the bleed. The heatmap tells you which step is doing the bleeding. Each row shows cumulative identification at a stage in the journey — and the gap between rows is the optimization target.',
  heatmap: [
    { stage: 'Landing', identified: '0%', low: 0, high: 0, note: 'Cookie attached, but no identity yet' },
    { stage: 'Engaged (3+ pages)', identified: '~3%', low: 3, high: 3, note: 'Returning known users only' },
    { stage: 'Exit-intent popup', identified: '15–20%', low: 15, high: 20, note: 'Highest single capture step' },
    { stage: 'Cart add', identified: '+5%', low: 5, high: 5, note: 'Save-cart or checkout login' },
    { stage: 'Checkout', identified: '+8–12%', low: 8, high: 12, note: 'Email field on checkout page' },
    { stage: 'Loyalty / post-purchase', identified: '+3–5%', low: 3, high: 5, note: 'Account creation post-conversion' },
  ],
  heatmapNote: 'Numbers above are typical Convertive benchmarks for mid-market DTC stores. Your distribution will differ — the audit measures yours.',
  action: {
    title: 'A leakage number on its own changes nothing',
    body: 'The methodology exists so that intervention has a target. Once you know which leak category dominates and which heatmap stop bleeds the most, the fix is concrete — capture identity earlier, rank actions better, tighten channel timing. The mechanism page covers how Convertive executes those fixes in real time.',
  },
  faqs: [
    {
      question: 'Why is "anonymous session leakage" a more useful metric than bounce rate?',
      answer:
        'Bounce rate treats every bounce equally. Leakage weights each bounce by intent — a visitor who scrolled, browsed three categories, and added to cart is worth orders of magnitude more than a one-pageview drive-by. Leakage isolates the recoverable cohort. Bounce rate hides it.',
    },
    {
      question: 'How is this different from a CDP or analytics tool?',
      answer:
        'Analytics tools tell you that bounces happened. CDPs tell you about identified users. Neither quantifies the dollar value of anonymous traffic that should have been intercepted in real time. The methodology fills that gap by combining intent scoring, identification probability, and lift benchmarks into a single recoverable-revenue number.',
    },
    {
      question: 'Do I need Convertive installed to measure this?',
      answer:
        'No. The framework works on any store with GA4 or equivalent analytics. Convertive accelerates measurement by tagging intent signals and identification events natively, but the methodology is platform-agnostic. The 12-hr free audit applies it to your store without any installation.',
    },
    {
      question: 'What benchmarks do you use for "expected lift"?',
      answer:
        'Public industry data (8–15% on cart-recovery interventions, 10–25% on personalized offers vs generic) plus Convertive\'s own deployment data. The audit tunes lift assumptions to your traffic mix, AOV, and intent distribution rather than applying a flat multiplier.',
    },
    {
      question: 'Why is the Identity Signal Heatmap part of the methodology?',
      answer:
        'Leakage in aggregate tells you the size of the problem. The heatmap tells you where to fix it. By plotting identification rate at each funnel step, the heatmap reveals which step bleeds the most identity — and therefore where a small intervention recovers the most revenue.',
    },
  ] as Faq[],
}

// ── 03 The Audit ────────────────────────────────────────────────────────────

export const AUDIT = {
  title: 'How to find revenue leaks in anonymous traffic',
  lede: 'Seven steps you can run yourself. Each step has a formula, a benchmark, and a red flag. By the end you will have a defensible number for monthly revenue leaking out of your anonymous traffic.',
  stepsIntro:
    'Each step builds on the one before. Step 1 sizes the universe. Step 2 narrows to the recoverable cohort. Steps 3–6 explain the failure modes. Step 7 puts a dollar on the leak.',
  steps: [
    {
      n: '01',
      title: 'Quantify your anonymous traffic share',
      do: 'Pull session count and identified-session count for the last 30 days. Identified = sessions where email, phone, or known login attached at any point.',
      formula: 'anonymous % = 1 − (identified sessions / total sessions)',
      benchmark: 'Most stores: 92–98%. Below 90% means strong identity capture; above 96% means severe leakage exposure.',
      redFlag: 'If you cannot answer this question in your analytics tool, you do not have identity tracking instrumented. Stop here, fix that first.',
    },
    {
      n: '02',
      title: 'Find the intent-weighted bounce',
      do: 'Filter sessions to "engaged" — 3+ pageviews OR 60+ second dwell OR scroll depth > 60%. Compute bounce rate within that cohort. Compare against unfiltered bounce rate.',
      formula: 'high-intent bounce = engaged sessions that bounced / engaged sessions',
      benchmark: 'High-intent bounce > 50% is leakage. Healthy stores sit at 30–45%.',
      redFlag: 'A flat bounce rate hides this. The cohort that browsed but left is what you can recover.',
    },
    {
      n: '03',
      title: 'Measure identity capture rate by step',
      do: 'Plot identification rate at each funnel step: landing → engaged → cart → checkout → purchase. Use the Identity Signal Heatmap framework.',
      formula: 'capture at step N = identified sessions at step N / sessions reaching step N',
      benchmark: 'Exit-intent popup: 15–20%. Cart save: +5%. Checkout: +8–12%. If any step is < 5% gain, it is broken or missing.',
      redFlag: 'Most stores have one step doing 80% of the capture. Fragile. Add a second.',
    },
    {
      n: '04',
      title: 'Walk the cart-abandonment funnel',
      do: 'Build a funnel: add-to-cart → checkout-start → checkout-complete. Compute drop-off at each step. Cross-reference identified vs anonymous within each step.',
      formula: 'cart drop-off = 1 − (checkout-complete / add-to-cart)',
      benchmark: 'Industry average: ~70%. Below 60% is good. Above 75% is leakage.',
      redFlag: 'If anonymous cart adders are 80%+ of total cart adders and you have no identity-capture mechanism on the cart page, that is the leak.',
    },
    {
      n: '05',
      title: 'Audit time-to-first-touch after exit',
      do: 'For sessions that captured identity but did not convert, measure median time from exit to first follow-up message (email, SMS, ad).',
      formula: 'time-to-first-touch = median(timestamp of first follow-up − exit timestamp)',
      benchmark: 'Under 30 minutes is competitive. Next-day batch is leakage. The bounce window passes in seconds; the recovery window passes in hours.',
      redFlag: 'If your ESP fires cart-abandonment emails the next morning, you are losing the recovery to anyone who acts in the same session.',
    },
    {
      n: '06',
      title: 'Find cross-channel attribution gaps',
      do: 'Pick 50 conversions at random. Trace the touch chain: ad → site → email → SMS → purchase. Check whether your attribution tool can connect every step.',
      formula: '% of conversions with full chain visibility',
      benchmark: 'Below 60% chain visibility means you cannot prove which channel converted. You are guessing on spend.',
      redFlag: 'Anonymous-to-known transitions are the most common break point. If web events do not stitch to email opens to SMS clicks, you have parallel siloed analytics.',
    },
    {
      n: '07',
      title: 'Quantify ROAS leakage on retargeting',
      do: 'Pull retargeting ad spend and conversions for the last 30 days. Compare cost per conversion against owned-channel cost per conversion (email, SMS to identified users).',
      formula: 'leakage = retargeting CAC − owned-channel CAC, × converted users that could have been owned',
      benchmark: 'If owned CAC < 1/5 of retargeting CAC, every identified user you fail to capture is paid retargeting tax.',
      redFlag: 'The cheapest channel is the one you own. The leak is failing to convert anonymous to owned before retargeting becomes the only option.',
    },
  ],
  tools: [
    { name: 'GA4', use: 'Sessions, engagement, funnel drop-off' },
    { name: 'Shopify analytics', use: 'Orders, cart starts, checkout funnel, AOV' },
    { name: 'ESP export (Klaviyo / Braze)', use: 'Identification rate, send latency, click-through' },
    { name: 'Ad platform reports', use: 'Retargeting CAC, ROAS, audience overlap' },
    { name: 'Attribution tool (or spreadsheet)', use: 'Touch-chain visibility' },
    { name: 'Spreadsheet', use: 'Where the math actually happens' },
  ],
  goodIntro: 'Hitting one benchmark is noise. Hitting these in combination means your anonymous-traffic activation layer is actually working.',
  /** "What good looks like", one per step, so visitors can score their own store. */
  good: [
    { step: '01', label: 'Anonymous traffic share < 92%', unit: '%', pass: (v: number) => v < 92, placeholder: '95' },
    { step: '02', label: 'High-intent bounce < 45%', unit: '%', pass: (v: number) => v < 45, placeholder: '52' },
    { step: '03', label: 'Cumulative identification by checkout > 25%', unit: '%', pass: (v: number) => v > 25, placeholder: '18' },
    { step: '04', label: 'Cart drop-off < 65%', unit: '%', pass: (v: number) => v < 65, placeholder: '70' },
    { step: '05', label: 'Time-to-first-touch < 30 minutes', unit: 'min', pass: (v: number) => v < 30, placeholder: '720' },
    { step: '06', label: 'Attribution chain visibility > 70%', unit: '%', pass: (v: number) => v > 70, placeholder: '55' },
    { step: '07', label: 'Owned-channel CAC < 1/5 of retargeting CAC (owned ÷ retargeting)', unit: 'ratio', pass: (v: number) => v < 0.2, placeholder: '0.3' },
  ],
  faqs: [
    {
      question: 'How long does the DIY audit take?',
      answer:
        'Plan a half day for data pulls and one day for the math. The bottleneck is usually identity tracking — if it is not instrumented, you spend that day fixing instrumentation before you can audit anything.',
    },
    {
      question: 'What if I do not have identity events instrumented?',
      answer:
        'Start with steps 1, 2, and 4 — those work on session-level data alone. Steps 3, 5, and 6 require identity tracking. The audit will surface that gap as the first thing to fix.',
    },
    {
      question: 'Can I just have you do it?',
      answer:
        'Yes. The free 12-hr ROI audit runs this exact framework on your store and returns a 2-slide breakdown. Faster, more thorough, and benchmarked against comparable stores. Linked at the bottom.',
    },
    {
      question: 'Are these benchmarks reliable?',
      answer:
        'They are typical ranges for mid-market DTC ecommerce on Shopify. Your numbers will vary by category, AOV, and traffic mix. Use them to flag obvious leaks (anything 2×+ outside the range), not to grade incremental performance.',
    },
    {
      question: 'What do I do once I have the leak number?',
      answer:
        'Pick the largest leak category and fix the highest-leverage step. The methodology page covers how to size each leak; the metrics page covers what to track post-fix; the mechanism page covers how Convertive executes the fix in real time.',
    },
  ] as Faq[],
}

// ── 04 The Metrics ──────────────────────────────────────────────────────────

export const METRICS = {
  title: 'The KPIs that matter for in-session revenue infrastructure',
  lede: 'Conversion rate is a lagging indicator. Below are the eight leading ones — the metrics that tell you whether your real-time activation layer actually exists, runs fast enough, and drives revenue.',
  hierarchy:
    'Identity feeds Decisioning feeds Outcome. If identity capture is broken, decisioning has nothing to act on. If decisioning is slow, outcome never moves. Read the stack top-down to find the bottleneck.',
  /** The three to start with, per the FAQ. */
  starters: ['Identification rate', 'Decision latency P50 / P95', 'In-session lift'],
  groups: [
    {
      label: 'Identity',
      metrics: [
        {
          name: 'Identification rate',
          formula: 'identified sessions / total sessions',
          target: '15–25%+',
          why: 'How much of your traffic do you ever know? Most stores sit at 2–8%. Every percentage point unlocks owned-channel reach.',
          instrument: 'Count sessions where email, phone, or known login attaches before exit. Divide by total sessions. Track daily.',
        },
        {
          name: 'Time-to-identify',
          formula: 'median seconds from first event → identity capture',
          target: '< 90s for high-intent',
          why: 'The faster you capture identity, the more session left for personalization. Late capture is half a CDP.',
          instrument: 'Log timestamp of first event vs identity event. Bucket by intent score and source. P50 and P95.',
        },
        {
          name: 'Identity drop-off by funnel step',
          formula: '1 − (identified at step N / identified at step N-1)',
          target: '< 30% per step',
          why: 'The Identity Signal Heatmap. Shows where the funnel leaks identity — exit intent popup, checkout, loyalty signup, etc. Reveals the highest-leverage capture moment.',
          instrument: 'Define funnel: landing → engaged → cart → identify → checkout. Plot identification at each step.',
        },
      ],
    },
    {
      label: 'Decisioning',
      metrics: [
        {
          name: 'Decision latency P50 / P95',
          formula: 'ms from event → rendered action',
          target: '< 100ms P50, < 250ms P95',
          why: 'Anything slower and the bounce wins. Latency is the single most under-measured KPI in personalization stacks.',
          instrument: 'Tag event ingest timestamp. Tag DOM render timestamp. Diff. Pipe to time-series dashboard.',
        },
        {
          name: 'NBA selection accuracy',
          formula: 'lift of selected action vs random eligible action',
          target: '> 1.5× control',
          why: 'The decisioning brain has a job: pick the action that converts. Holdout-aware lift quantifies whether it does.',
          instrument: 'Run 10–20% holdout group on each campaign. Compare conversion rate of NBA-selected vs random or rule-default.',
        },
        {
          name: 'Action coverage',
          formula: 'sessions with ≥1 eligible action / total sessions',
          target: '> 60%',
          why: 'You cannot influence sessions you have no action for. Coverage is the ceiling on revenue impact. Below 60% means most visitors get no intervention.',
          instrument: 'Count sessions where at least one campaign / journey is eligible. Divide by total. Bucket by intent.',
        },
      ],
    },
    {
      label: 'Outcome',
      metrics: [
        {
          name: 'In-session lift',
          formula: '(treated CR − holdout CR) / holdout CR',
          target: '+8–25%',
          why: 'The headline KPI. Did real-time intervention move conversion vs doing nothing? Without a holdout, you are guessing.',
          instrument: 'Run platform-level holdout (5–10% of sessions see no Convertive action). Compare CR weekly. Statistical significance over 4 weeks.',
        },
        {
          name: 'Anonymous → known conversion rate',
          formula: 'identified sessions that purchase / identified sessions',
          target: '8–18%',
          why: 'Identification only matters if it converts. Tracks the second leg of the funnel: did capturing identity actually pay off?',
          instrument: 'Cohort by identification source (popup, checkout, loyalty). Track 7-day and 30-day purchase rate.',
        },
        {
          name: 'Recovered revenue per session',
          formula: 'incremental revenue / treated sessions',
          target: '$0.10–$0.80+',
          why: 'Revenue language. Translates lift into a per-session unit so you can compare against ad spend and CAC. The number that gets the CFO nodding.',
          instrument: 'Revenue from treated cohort − revenue from holdout, divided by treated session count. Roll up monthly.',
        },
      ],
    },
  ],
  /** "Reading the dashboard": a symptom, which layer to check, and why. */
  symptoms: [
    {
      symptom: 'Outcome flat?',
      check: 'Decisioning',
      title: 'Outcome flat? → check Decisioning.',
      body: 'If lift is flat or negative, latency is too high or the NBA ranker is picking weak actions. Pull P95 latency and selection-vs-random lift first.',
      metrics: ['Decision latency P50 / P95', 'NBA selection accuracy'],
    },
    {
      symptom: 'Decisioning starved?',
      check: 'Identity',
      title: 'Decisioning starved? → check Identity.',
      body: 'If action coverage is below 40%, you do not know enough about the visitor to act. Identification rate and identity drop-off explain why.',
      metrics: ['Identification rate', 'Identity drop-off by funnel step'],
    },
    {
      symptom: 'Identity capture stuck?',
      check: 'Identity',
      title: 'Identity capture stuck? → check the funnel step.',
      body: 'The Identity Signal Heatmap shows which step bleeds the most. Most teams find one step that loses 50%+ — fix that, double identification.',
      metrics: ['Identity drop-off by funnel step'],
    },
    {
      symptom: 'Numbers good, revenue flat?',
      check: 'Decisioning',
      title: 'Numbers good, revenue flat? → check coverage.',
      body: 'Per-session lift is real but only on covered sessions. If coverage is 30%, total revenue impact is capped at 30% × per-session lift. Expand action library.',
      metrics: ['Action coverage'],
    },
  ],
  faqs: [
    {
      question: 'Why is conversion rate not enough?',
      answer:
        'Conversion rate is a lagging, multi-causal metric. It moves on traffic mix, seasonality, promo cycles, and stack changes — drowning the signal from any one intervention. The KPIs on this page are leading indicators that isolate the in-session revenue infrastructure.',
    },
    {
      question: 'Do I need all eight to start?',
      answer:
        'No. Start with three: identification rate, decision latency P95, and in-session lift (with a holdout). Those three tell you whether the infrastructure exists, runs in real time, and drives revenue. The rest are diagnostics that explain why.',
    },
    {
      question: 'How does this differ from standard ecommerce KPIs?',
      answer:
        'Standard ecommerce KPIs (CR, AOV, sessions, revenue) measure store performance. These measure infrastructure performance — whether your real-time activation layer is doing its job. They sit upstream of CR and AOV and explain movement in those numbers.',
    },
    {
      question: 'How long until I can read these reliably?',
      answer:
        'Latency and coverage metrics are visible in 24 hours. Identification rate and time-to-identify stabilize in a week. In-session lift requires 2–4 weeks of holdout data depending on traffic volume to reach statistical significance.',
    },
  ] as Faq[],
}

// ── 05 The Comparison ───────────────────────────────────────────────────────

export type Coverage = true | false | 'partial'
export type CategoryKey = 'cdp' | 'popup' | 'retarget' | 'replay'

export const COMPARISON = {
  title: 'Anonymous Intent Activation vs CDPs, Popups, Retargeting, Session Replay',
  lede: 'Each adjacent category solves a slice of the problem. None own the full event-to-action loop in under 100 milliseconds. The gap between them is what Convertive fills.',
  legend: '✓ full · ~ partial · × not in scope. Categories generalized — individual vendors vary.',
  rows: [
    { capability: 'Sub-100ms decisioning', convertive: true, cdp: false, popup: 'partial', retarget: false, replay: false },
    { capability: 'Anonymous → known stitching in real time', convertive: true, cdp: 'partial', popup: false, retarget: false, replay: false },
    { capability: 'Next-best-action ranking across channels', convertive: true, cdp: false, popup: false, retarget: false, replay: false },
    { capability: 'In-session intervention before bounce', convertive: true, cdp: false, popup: true, retarget: false, replay: false },
    { capability: 'Closed-loop learning from outcomes', convertive: true, cdp: false, popup: false, retarget: 'partial', replay: false },
    { capability: 'Web + email + SMS + ads orchestration', convertive: true, cdp: 'partial', popup: false, retarget: 'partial', replay: false },
    { capability: 'Identity-aware suppression', convertive: true, cdp: 'partial', popup: false, retarget: false, replay: false },
    { capability: 'Holdout-aware lift measurement', convertive: true, cdp: false, popup: false, retarget: 'partial', replay: false },
  ] as ({ capability: string; convertive: Coverage } & Record<CategoryKey, Coverage>)[],
  categories: [
    {
      key: 'cdp' as CategoryKey,
      short: 'CDPs',
      label: 'CDPs (Customer Data Platforms)',
      examples: 'Segment, mParticle, Adobe RTCDP, Salesforce CDP, Bloomreach, Hightouch, RudderStack',
      does: 'Unify identified-user data. Sync audiences to downstream tools. Build SQL-defined segments.',
      fails: 'Most update on minutes-to-hours, not milliseconds. Identity-only — anonymous behavior often discarded. No decisioning layer; CDPs ship data, they do not act on it. Activation is downstream and slow.',
      fitWith: 'Convertive layers on top: consume identified profiles from the CDP, add real-time anonymous activation the CDP cannot do. The CDP keeps owning the warehouse-side truth.',
    },
    {
      key: 'popup' as CategoryKey,
      short: 'Popups',
      label: 'Popup tools / on-site messaging',
      examples: 'Justuno, Privy, OptinMonster, Wunderkind (Bouncex), Yieldify, Insider',
      does: 'Display popups, banners, and overlays based on rules (exit intent, time on page, cart value).',
      fails: 'Rule-based, not ranked. No learning loop. No cross-channel context — fires the same popup whether the visitor was just emailed or just bought. Identity capture is the only goal; in-session next-best-action is not the model.',
      fitWith: 'Convertive replaces rule-driven popup logic with an NBA-ranked decision over all eligible actions. A popup is one of many candidates, not the default.',
    },
    {
      key: 'retarget' as CategoryKey,
      short: 'Retargeting',
      label: 'Retargeting / paid-media remarketing',
      examples: 'Meta retargeting, Google remarketing, Criteo, AdRoll, Klaviyo + ESP audience syncs',
      does: 'Show ads or send emails after the visitor leaves the site. Recapture them on a different channel later.',
      fails: 'Hours-to-days delay. The bounce window already closed. Pays per impression even when the user already converted. Cannot intervene before the leave.',
      fitWith: 'Convertive runs the in-session play first; retargeting is the fallback for the cohort that left without identity. The split saves spend.',
    },
    {
      key: 'replay' as CategoryKey,
      short: 'Session replay',
      label: 'Session replay / behavioral analytics',
      examples: 'Hotjar, FullStory, LogRocket, Microsoft Clarity, Contentsquare',
      does: 'Record sessions. Replay user paths. Heatmap clicks. Diagnose UX issues post-hoc.',
      fails: 'Read-only. No intervention. No identity stitching. Diagnostic, not active. By the time you watch the replay, the visitor has been gone for days.',
      fitWith: 'Replay diagnoses where users get stuck; Convertive intervenes in real time when the same pattern is detected. Replay is the lab, Convertive is the floor.',
    },
  ],
  signals: [
    { title: 'Identification rate stuck below 10%.', body: 'Existing tools are not capturing identity in-session. The leak is upstream of your CDP.' },
    { title: 'Retargeting CAC keeps climbing.', body: 'You are paying paid media to fix what should have been an in-session capture. The play moved off-site too late.' },
    { title: 'Channels collide — same offer in popup, email, and ad.', body: 'No global next-best-action selector. Visitors are getting bombarded, not personalized.' },
  ],
  faqs: [
    {
      question: 'Is Anonymous Intent Activation actually a new category?',
      answer:
        'Yes. CDPs were defined around identified data unification. Popup tools around rule-driven overlays. Retargeting around post-session media. Session replay around UX diagnostics. None were architected for sub-100ms decisioning over anonymous in-session intent across channels. That gap is the category.',
    },
    {
      question: 'Do I need to replace my CDP / ESP / popup tool?',
      answer:
        'No. Convertive layers on top of the existing stack. CDPs keep owning the warehouse-side data model. ESPs keep owning email delivery. Popup tools can stay or be replaced over time as their rules get absorbed into the NBA ranker. The integration model is additive.',
    },
    {
      question: 'How is this different from Dynamic Yield, Nosto, or Insider?',
      answer:
        'Those tools focus on on-site personalization (recs, banners, A/B). Strong in their slice. Convertive\'s scope is wider: anonymous-to-known stitching, cross-channel orchestration (web + email + SMS + ads), and a closed learning loop that ranks all eligible actions, not just on-site recs.',
    },
    {
      question: 'What about session replay tools like Hotjar or FullStory?',
      answer:
        'Different category entirely. Replay is read-only diagnostics — useful for debugging UX, not for converting visitors. Convertive intervenes in real time when behavior matches a recoverable pattern. The two are complementary, not overlapping.',
    },
    {
      question: 'Where does retargeting still fit?',
      answer:
        'For the cohort that left without identity capture, retargeting is the only remaining play. Convertive\'s job is to shrink that cohort by converting or capturing identity in-session, so retargeting spend goes to a smaller, more recoverable audience. ROAS improves because waste shrinks.',
    },
  ] as Faq[],
}

// ── 06 The Manifesto ────────────────────────────────────────────────────────

export const MANIFESTO = {
  title: 'Ecommerce does not have a traffic problem. It has an anonymous conversion problem.',
  lede: 'Roughly 70% of carts are abandoned. ~95% of sessions stay anonymous. The leak is not the top of the funnel.',
  opening: [
    'At Convertive, we believe every digital action—every click, scroll, and hesitation—is a signal of intent, not noise. We exist to listen in real time and transform that intent into immersive, predictive commerce, delivered across web, mobile, email, SMS, and ads without delay.',
    'Most of the stack waits hours or days to act. By then the visitor is gone, retargeting is the only play, and CAC has already been paid twice. The fix is not more traffic. It is converting the traffic you already have — while the session is still live.',
  ],
  beliefs: [
    {
      title: 'Unified Intelligence',
      body: 'We unify fragmented behaviors into live, evolving shopper profiles that understand who users are and what they need—before they even know it themselves.',
    },
    {
      title: 'Hyper-Personalization',
      body: 'We deliver hyper-personalized experiences, fueled by real-time behavior and AI: dynamic nudges, upsells, offers, and optimizations that feel intuitive, not intrusive.',
    },
    {
      title: 'Autonomous Optimization',
      body: 'We strip away the manual grind of experimentation. With our AI-powered autonomy, every test writes its own future, continuously learning, optimizing, and deploying—no engineers required.',
    },
    {
      title: 'Real-Time Integration',
      body: 'We inject real-time intelligence into the heart of your stack—layering on top of CDPs, ESPs, checkout platforms, and ad networks—so you build powerful growth workflows in days instead of months.',
    },
  ],
  promise: [
    'Per-session relevance that turns hesitation into conversion.',
    'Intelligent personalization that lifts AOV and ROAS, without guesswork.',
    'A lean, unified stack that saves cost, time, and mental overhead.',
  ],
  closing: [
    'Because in today\'s attention-short world, standing still is giving up.',
    'We\'re here to help you move intelligently, adapt instantly, and compound growth—one live moment at a time.',
  ],
}
