// Seed script - adds sample case studies to Firestore
// Usage: node scripts/seed-case-studies.mjs

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCChlCXoVyzpxhq95yCW5g6hTbFA09qD5Y',
  authDomain: 'outhad-convertive.firebaseapp.com',
  projectId: 'outhad-convertive',
  storageBucket: 'outhad-convertive.firebasestorage.app',
  messagingSenderId: '985881530122',
  appId: '1:985881530122:web:b04d4a92ea5ffb2efd34f3',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const sampleCaseStudies = [
  {
    title: 'How StyleHaven Achieved 32% Conversion Lift with Real-Time Personalization',
    slug: 'stylehaven-32-percent-conversion-lift',
    excerpt:
      'StyleHaven, a leading online fashion retailer, partnered with Convertive to deploy AI-powered real-time personalization across their entire shopping experience — resulting in a 32% lift in conversions and 45% reduction in cart abandonment.',
    content: `
<h2>The Challenge</h2>
<p>StyleHaven, an online fashion retailer with over 2 million monthly visitors, was struggling with <strong>high cart abandonment rates (78%)</strong> and low conversion rates despite significant ad spend. Their existing marketing stack relied on batch-processed segments and scheduled campaigns — meaning they were always reacting to customer behavior hours or days after it happened.</p>

<blockquote><p>"We were sending the right message to the right person, but always too late. By the time our email hit their inbox, they'd already bought from a competitor." — <em>Sarah Chen, VP of Marketing, StyleHaven</em></p></blockquote>

<h2>The Solution</h2>
<p>Convertive's platform was deployed in under 2 weeks, integrating directly with StyleHaven's Shopify Plus store. Key capabilities activated:</p>

<ul>
<li><strong>Real-Time Intent Detection</strong> — Analyzing scroll depth, hover patterns, and click velocity to identify purchase intent signals</li>
<li><strong>Dynamic Product Recommendations</strong> — Personalized product carousels that update in real-time based on browsing behavior</li>
<li><strong>Smart Cart Recovery</strong> — Triggered interventions (exit-intent overlays, personalized discounts) based on abandonment risk scoring</li>
<li><strong>Unified Customer Profiles</strong> — Merging anonymous and identified sessions across devices for consistent personalization</li>
</ul>

<h2>Implementation Timeline</h2>
<table>
<thead><tr><th>Phase</th><th>Duration</th><th>Activities</th></tr></thead>
<tbody>
<tr><td>Integration</td><td>3 days</td><td>Shopify Plus connector, pixel deployment, data sync</td></tr>
<tr><td>Configuration</td><td>5 days</td><td>Model training, segment mapping, journey setup</td></tr>
<tr><td>Testing</td><td>4 days</td><td>A/B tests, QA, performance validation</td></tr>
<tr><td>Launch</td><td>2 days</td><td>Gradual rollout from 10% to 100% traffic</td></tr>
</tbody>
</table>

<h2>The Results</h2>
<p>Within <strong>90 days</strong> of full deployment, StyleHaven saw dramatic improvements across all key metrics:</p>

<h3>Key Performance Indicators</h3>
<ol>
<li><strong>Conversion Rate:</strong> Increased from 2.1% to 2.77% — a <strong>32% lift</strong></li>
<li><strong>Cart Abandonment:</strong> Reduced from 78% to 43% — a <strong>45% reduction</strong></li>
<li><strong>Average Order Value:</strong> Increased by 18% through personalized cross-sells</li>
<li><strong>Revenue per Session:</strong> Up 41% compared to the previous quarter</li>
</ol>

<h3>Customer Experience Impact</h3>
<p>Beyond the numbers, StyleHaven's customer satisfaction scores improved significantly. Their NPS score jumped from 42 to 67, and repeat purchase rate increased by 23%.</p>

<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="Analytics dashboard showing growth metrics" />

<h2>What's Next</h2>
<p>StyleHaven is now expanding their use of Convertive to include:</p>
<ul>
<li>Post-purchase journey orchestration</li>
<li>Predictive inventory recommendations</li>
<li>Social commerce personalization</li>
<li>Loyalty program integration with real-time reward triggers</li>
</ul>

<hr />

<p><em>"Convertive didn't just improve our metrics — it fundamentally changed how we think about customer relationships. We went from broadcasting campaigns to having genuine 1:1 conversations at scale."</em> — <strong>Sarah Chen, VP of Marketing, StyleHaven</strong></p>
    `.trim(),
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    companyName: 'StyleHaven',
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=SH&backgroundColor=6366f1',
    industry: 'Fashion',
    tags: ['E-commerce', 'Fashion', 'Personalization', 'Cart Recovery', 'Shopify Plus'],
    metrics: [
      { label: 'Conversion Lift', value: '+32%', description: 'From 2.1% to 2.77% conversion rate' },
      { label: 'Cart Abandonment', value: '-45%', description: 'Reduced from 78% to 43%' },
      { label: 'AOV Increase', value: '+18%', description: 'Through personalized cross-sells' },
      { label: 'Revenue/Session', value: '+41%', description: 'Quarter over quarter improvement' },
    ],
    status: 'published',
    authorName: 'Convertive Team',
    authorEmail: 'team@convertive.com',
    publishedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'FreshCart Reduces Abandonment by 52% with AI-Powered Cart Recovery',
    slug: 'freshcart-52-percent-abandonment-reduction',
    excerpt:
      'FreshCart, an online grocery delivery service, used Convertive\'s AI cart recovery engine to reduce abandonment by 52% and recover $2.3M in previously lost revenue within the first quarter.',
    content: `
<h2>About FreshCart</h2>
<p>FreshCart is a premium online grocery delivery service operating in 15 major US cities. With a highly perishable inventory and tight delivery windows, every abandoned cart represents not just lost revenue but potential food waste.</p>

<h2>The Problem</h2>
<p>FreshCart was experiencing <strong>82% cart abandonment</strong> — even higher than the e-commerce average. The unique challenges of grocery e-commerce made this particularly painful:</p>

<ul>
<li><strong>Time-sensitive inventory</strong> — Abandoned carts tied up inventory that could spoil</li>
<li><strong>Complex cart composition</strong> — Average 23 items per cart made re-creation painful for customers</li>
<li><strong>Delivery slot competition</strong> — Abandoned carts often lost their delivery window</li>
<li><strong>High acquisition costs</strong> — $45 average cost to acquire a grocery customer</li>
</ul>

<h2>Convertive's Approach</h2>
<p>We deployed a three-layer recovery strategy:</p>

<h3>Layer 1: Predictive Abandonment Scoring</h3>
<p>Using behavioral signals (scroll patterns, tab switching, time between actions), Convertive's AI predicts abandonment risk <strong>before it happens</strong> and triggers interventions proactively.</p>

<h3>Layer 2: Contextual Recovery Messages</h3>
<p>Instead of generic "You left items behind" emails, Convertive generates contextual recovery messages:</p>
<ul>
<li>Highlighting items at risk of going out of stock</li>
<li>Showing delivery slot availability</li>
<li>Suggesting substitutions for out-of-stock items</li>
<li>Offering smart incentives based on customer lifetime value</li>
</ul>

<h3>Layer 3: Session Continuity</h3>
<p>Cross-device cart persistence ensures customers can seamlessly resume their shopping from any device, with their delivery preferences and substitution rules intact.</p>

<h2>Results After 90 Days</h2>
<table>
<thead><tr><th>Metric</th><th>Before</th><th>After</th><th>Change</th></tr></thead>
<tbody>
<tr><td>Cart Abandonment Rate</td><td>82%</td><td>39%</td><td><strong>-52%</strong></td></tr>
<tr><td>Recovered Revenue</td><td>$0</td><td>$2.3M</td><td><strong>+$2.3M/quarter</strong></td></tr>
<tr><td>Customer Retention</td><td>34%</td><td>51%</td><td><strong>+50%</strong></td></tr>
<tr><td>Avg Items per Order</td><td>23</td><td>28</td><td><strong>+22%</strong></td></tr>
</tbody>
</table>

<blockquote><p>"The ROI was visible within the first week. Convertive paid for itself 40x over in the first quarter alone." — <em>Mike Rodriguez, CEO, FreshCart</em></p></blockquote>

<img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" alt="Fresh groceries ready for delivery" />

<h2>Key Takeaway</h2>
<p>FreshCart's success demonstrates that cart recovery isn't just about reminding customers — it's about <strong>removing friction and adding value</strong> at the exact moment they're most likely to leave.</p>
    `.trim(),
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
    companyName: 'FreshCart',
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=FC&backgroundColor=22c55e',
    industry: 'Food & Beverage',
    tags: ['Grocery', 'Cart Recovery', 'AI', 'Food & Beverage', 'Retention'],
    metrics: [
      { label: 'Abandonment Reduction', value: '-52%', description: 'From 82% to 39% abandonment rate' },
      { label: 'Revenue Recovered', value: '$2.3M', description: 'In the first quarter' },
      { label: 'Customer Retention', value: '+50%', description: 'From 34% to 51% retention rate' },
      { label: 'Items per Order', value: '+22%', description: 'From 23 to 28 average items' },
    ],
    status: 'published',
    authorName: 'Convertive Team',
    authorEmail: 'team@convertive.com',
    publishedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'TechGear Pro: Unified Customer Profiles Drive 28% Higher LTV',
    slug: 'techgear-pro-unified-profiles-28-ltv-increase',
    excerpt:
      'TechGear Pro, a B2C electronics retailer, leveraged Convertive\'s unified customer profiles to eliminate data silos and deliver consistent cross-channel experiences — increasing customer lifetime value by 28%.',
    content: `
<h2>Background</h2>
<p>TechGear Pro is a direct-to-consumer electronics brand selling premium tech accessories, smart home devices, and computer peripherals. With $85M in annual revenue and customers shopping across web, mobile app, and physical pop-up stores, they had a fragmented view of their customers.</p>

<h2>The Data Silo Problem</h2>
<p>TechGear Pro's tech stack had grown organically over five years, resulting in:</p>

<ol>
<li><strong>5 different customer databases</strong> — Web store, mobile app, email platform, loyalty program, and customer support each maintained separate records</li>
<li><strong>47% duplicate profiles</strong> — The same customer often existed as 2-3 separate profiles across systems</li>
<li><strong>No cross-channel attribution</strong> — Unable to track customer journeys that spanned multiple channels</li>
<li><strong>Inconsistent personalization</strong> — A loyal customer might receive a "first-time buyer" discount on a different channel</li>
</ol>

<h2>The Convertive Solution</h2>
<p>Convertive's identity resolution engine was deployed to create a <strong>single source of truth</strong> for every customer:</p>

<h3>Identity Graph Construction</h3>
<p>Using deterministic matching (email, phone, login) and probabilistic signals (device fingerprints, behavioral patterns), Convertive merged fragmented profiles into unified customer records.</p>

<h3>Real-Time Profile Enrichment</h3>
<p>Every interaction across every channel feeds into the unified profile in real-time, including:</p>
<ul>
<li>Browsing behavior and product interests</li>
<li>Purchase history and preferences</li>
<li>Support interactions and satisfaction scores</li>
<li>Loyalty status and point balances</li>
<li>Communication preferences and engagement patterns</li>
</ul>

<h3>Activation Across Channels</h3>
<p>Unified profiles power personalized experiences everywhere:</p>

<table>
<thead><tr><th>Channel</th><th>Personalization Applied</th></tr></thead>
<tbody>
<tr><td>Website</td><td>Dynamic product recommendations, personalized homepage, smart search</td></tr>
<tr><td>Mobile App</td><td>Push notification timing optimization, in-app offers</td></tr>
<tr><td>Email</td><td>Lifecycle stage-appropriate campaigns, product replenishment reminders</td></tr>
<tr><td>Pop-up Stores</td><td>Clienteling with full customer history, personalized in-store offers</td></tr>
</tbody>
</table>

<h2>Impact</h2>
<p>After 6 months of progressive rollout:</p>

<ul>
<li><strong>Customer LTV</strong> increased by <strong>28%</strong></li>
<li><strong>Profile deduplication</strong> reduced customer records by 41%</li>
<li><strong>Cross-channel purchase rate</strong> increased by 35%</li>
<li><strong>Marketing efficiency</strong> improved by 22% (less waste from duplicate mailings)</li>
<li><strong>Support resolution time</strong> decreased by 30% (agents see full customer context)</li>
</ul>

<img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" alt="Technology and data visualization" />

<blockquote><p>"For the first time, we actually know our customers. Not three different versions of them, but the real, complete person behind every purchase." — <em>David Park, CTO, TechGear Pro</em></p></blockquote>
    `.trim(),
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    companyName: 'TechGear Pro',
    companyLogo: 'https://api.dicebear.com/7.x/initials/svg?seed=TG&backgroundColor=3b82f6',
    industry: 'Electronics',
    tags: ['Electronics', 'CDP', 'Unified Profiles', 'Cross-Channel', 'LTV'],
    metrics: [
      { label: 'LTV Increase', value: '+28%', description: 'Customer lifetime value growth' },
      { label: 'Profile Dedup', value: '-41%', description: 'Reduction in duplicate customer records' },
      { label: 'Cross-Channel', value: '+35%', description: 'Increase in cross-channel purchases' },
      { label: 'Marketing Efficiency', value: '+22%', description: 'Less waste, more targeted' },
    ],
    status: 'published',
    authorName: 'Convertive Team',
    authorEmail: 'team@convertive.com',
    publishedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
]

async function seed() {
  console.log('🌱 Seeding case studies...\n')

  const caseStudiesRef = collection(db, 'caseStudies')

  for (const study of sampleCaseStudies) {
    try {
      const docRef = await addDoc(caseStudiesRef, study)
      console.log(`  ✅ Created: "${study.title}" (${docRef.id})`)
    } catch (err) {
      console.error(`  ❌ Failed: "${study.title}"`, err.message || err)
    }
  }

  console.log('\n✨ Seeding complete!')
  process.exit(0)
}

seed()
