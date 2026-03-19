# ROI Calculator — Build Specification

## What This Is

A **standalone, single-file HTML page** that:
- Lives completely outside the React app (zero risk of breaking anything)
- Can be sent as a link to any prospect
- Calculates and shows the revenue they are leaving on the table due to anonymous visitors
- Ends with the "Founding Customer Program" CTA

This is NOT built inside the React/Vite app. It is a single `index.html` file that you drop into a folder and deploy independently.

---

## File Location

Create this file at:

```
/roi-calculator/index.html
```

This folder sits at the project root (same level as `/ui`, `/server`). It has **no connection** to the React app, Rails backend, or any Docker service. Deploy it separately to Netlify, Vercel, or GitHub Pages.

**Do not touch:**
- `ui/` — React app untouched
- `server/` — Rails untouched
- `docker-compose.yml` — untouched
- Any existing file

---

## Deploy Strategy

| Option | How | Cost |
|---|---|---|
| Netlify Drop | Drag the `/roi-calculator/` folder to `app.netlify.com/drop` | Free |
| Vercel | `cd roi-calculator && vercel` | Free |
| GitHub Pages | Push to `/docs` folder in repo, enable Pages | Free |
| Self-hosted | Copy `index.html` to any static host | — |

The result is a public URL like `https://roi.tryconvertive.com` or `https://convertive-roi.netlify.app`.

---

## URL Parameter Personalization

The page reads URL parameters so you can pre-fill it per prospect before sending:

```
https://roi.tryconvertive.com?visitors=15000&rate=2.1&aov=65&store=BrandName
```

| Parameter | What It Does | Default |
|---|---|---|
| `visitors` | Monthly visitors pre-filled | 10000 |
| `rate` | Conversion rate pre-filled (e.g. `2.1` = 2.1%) | 2.0 |
| `aov` | Average order value in USD | 65 |
| `store` | Store name shown in headline | "Your store" |

When you send a cold DM, include the customized URL. This makes the page feel hand-built for them.

---

## Page Structure (Top to Bottom)

```
┌─────────────────────────────────────────────────────┐
│  NAV BAR — Logo + "Book a Call" button              │
├─────────────────────────────────────────────────────┤
│  HERO — Headline + subheadline                      │
├─────────────────────────────────────────────────────┤
│  CALCULATOR SECTION                                  │
│  ┌──────────────────┬──────────────────────────┐    │
│  │  LEFT: 3 INPUTS  │  RIGHT: RESULT CARD      │    │
│  │  - Visitors      │  - Revenue at risk        │    │
│  │  - Conv. Rate    │  - New customers/month    │    │
│  │  - AOV           │  - Recovered revenue      │    │
│  └──────────────────┴──────────────────────────┘    │
├─────────────────────────────────────────────────────┤
│  HOW IT WORKS — 3-step visual                       │
├─────────────────────────────────────────────────────┤
│  FOUNDING CUSTOMER PROGRAM CTA                      │
├─────────────────────────────────────────────────────┤
│  LEAD CAPTURE FORM                                  │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

---

## Design Tokens

Use these exact values. They match the Outhad/Convertive brand.

```css
/* Colors */
--color-primary:     #3652AE;   /* brand.300 — main blue */
--color-primary-dark:#001D7D;   /* brand.500 — deep navy */
--color-accent:      #33C0A7;   /* success.400 — teal green (for positive numbers) */
--color-danger:      #E63D2D;   /* mw_orange — red for "money being lost" */
--color-bg:          #F9FAFB;   /* gray.200 — page background */
--color-surface:     #FFFFFF;   /* white — card backgrounds */
--color-border:      #EAECF0;   /* gray.400 — borders */
--color-text-main:   #10182B;   /* black.500 — primary text */
--color-text-muted:  #667085;   /* black.100 — secondary text */
--color-text-light:  #98A2B3;   /* gray.600 — placeholder text */

/* Typography */
--font-family: 'Manrope', sans-serif;   /* same as app */
--font-size-xs:   12px;
--font-size-sm:   14px;
--font-size-base: 16px;
--font-size-lg:   18px;
--font-size-xl:   24px;
--font-size-2xl:  32px;
--font-size-3xl:  48px;

/* Spacing (8px grid) */
--space-1:  8px;
--space-2:  16px;
--space-3:  24px;
--space-4:  32px;
--space-5:  48px;
--space-6:  64px;

/* Border radius */
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;

/* Shadows */
--shadow-card: 0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06);
--shadow-result: 0 2px 8px rgba(54,82,174,0.12), 0 8px 32px rgba(54,82,174,0.08);
```

---

## Section 1: Nav Bar

**Layout:** full-width, white background, `1px solid #EAECF0` bottom border, `position: sticky; top: 0; z-index: 100`.

**Left:** Outhad / Convertive logo text or `<img>` if you have an SVG.

**Right:** One button: `Book a 15-Min Call` — primary blue (`#3652AE`), links to Calendly or email.

**Height:** 64px.

---

## Section 2: Hero

**Background:** White or very light blue gradient (`linear-gradient(160deg, #F0F4FF 0%, #FFFFFF 60%)`).

**Padding:** 80px top, 64px bottom.

**Badge above headline:**
```
[ ✦ Anonymous Visitor Intelligence ]
```
Small pill, background `#E8EDFF`, text `#3652AE`, 12px font, rounded-full.

**Headline (H1, 48px, font-weight 800):**
```
[Store Name], you're leaving
$[X,XXX] on the table every month.
```
Where `[Store Name]` comes from the `?store=` URL param and `$[X,XXX]` is the computed monthly revenue at risk (calculated immediately on load using the URL params or defaults).

**Subheadline (18px, color `#667085`, max-width 560px, centered):**
```
Every anonymous visitor who leaves without converting is revenue gone
forever. This calculator shows exactly how much — and what recovering
even a fraction of it means for your store.
```

**CTA below subheadline:**
```
[ See My Revenue at Risk ↓ ]    [ Book a Free Audit → ]
```
- First button: smooth scroll to calculator, outlined style
- Second button: solid blue `#3652AE`, links to booking

---

## Section 3: Calculator

**Background:** `#F9FAFB`.
**Padding:** 80px vertical.
**Section label above:** `ROI CALCULATOR` in small caps, `#3652AE`, 12px, letter-spacing 2px.
**Section title:** `How much are anonymous visitors costing you?` (32px, bold).

**Two-column layout** (stacks to single column on mobile, breakpoint 768px):

### Left Column: Inputs

Three input fields. Each has: label, number input with stepper arrows, and a small hint line.

---

**Input 1: Monthly Website Visitors**
- Label: `Monthly Website Visitors`
- Hint: `How many unique visitors does your store get per month?`
- Input type: `number`, min `1000`, step `1000`
- Default: `10000` (or `?visitors=` param)
- Format displayed: comma-separated (e.g. `15,000`)

---

**Input 2: Current Conversion Rate (%)**
- Label: `Current Conversion Rate`
- Hint: `What % of visitors make a purchase? (Industry avg: 1.5–3%)`
- Input type: `number`, min `0.1`, max `20`, step `0.1`
- Suffix: `%` shown inside/after the input
- Default: `2.0` (or `?rate=` param)

---

**Input 3: Average Order Value (AOV)**
- Label: `Average Order Value`
- Hint: `What is the typical order value on your store?`
- Input type: `number`, min `1`, step `1`
- Prefix: `$` shown inside/before the input
- Default: `65` (or `?aov=` param)

---

**Below all inputs, a slider:**
- Label: `If Outhad improves your conversion rate by…`
- Range: `0.1%` to `2.0%`, step `0.1%`
- Default: `0.4%`
- Show selected value prominently: `+ 0.4%`
- Small note: `Conservative estimate. Industry average lift: 0.3–0.8%`

---

### Right Column: Result Card

This updates live as inputs change (JS `oninput` events).

**Card style:** White background, `border-radius: 20px`, shadow `--shadow-result`, `border: 2px solid #3652AE`.

**Card header (dark blue background `#001D7D`, white text, `border-radius: 20px 20px 0 0`, padding 24px):**
```
Your Revenue at Risk
```
14px label, then:
```
$47,125 / month
```
Big number, 42px, font-weight 800, white.

Small subtext: `Based on your current anonymous visitor loss`

---

**Card body (white, padding 24px), three metrics stacked:**

Metric 1 — Anonymous sessions lost:
```
Label:  Anonymous Sessions Leaving Monthly
Value:  13,800          ← big, colored #E63D2D (danger red)
Hint:   visitors who leave without converting
```

Metric 2 — New customers recovered:
```
Label:  New Customers Recovered / Month
Value:  +55             ← big, colored #33C0A7 (teal/success)
Hint:   if Outhad adds 0.4% lift
```

Metric 3 — Revenue recovered:
```
Label:  Revenue Recovered / Month
Value:  +$3,575         ← big, colored #33C0A7 (teal/success)
Hint:   55 customers × $65 AOV
```

Divider line.

**Annual impact row:**
```
Annual Revenue Recovered:   $42,900
```
Slightly smaller, but with a teal background pill badge next to it: `[ 60-day free pilot ]`

---

**Card footer (light blue background `#F0F4FF`, padding 24px, `border-radius: 0 0 20px 20px`):**
```
This is a conservative estimate. Outhad clients typically see
0.3–0.8% conversion lift in the first 60 days.

[ Claim Your Free 60-Day Pilot → ]
```
Button: full-width, solid `#3652AE`, white text, smooth scroll to form section.

---

## The Math (JavaScript Formulas)

```javascript
// Inputs
const visitors    = parseInt(visitorsInput.value);
const rate        = parseFloat(rateInput.value) / 100;    // e.g. 0.021
const aov         = parseFloat(aovInput.value);
const lift        = parseFloat(liftSlider.value) / 100;   // e.g. 0.004

// Calculations
const currentCustomers   = visitors * rate;
const anonymousLost      = visitors - currentCustomers;
const newCustomers       = Math.round(visitors * lift);
const revenueRecovered   = newCustomers * aov;
const revenueAtRisk      = anonymousLost * aov;
const annualRecovered    = revenueRecovered * 12;

// Display helpers
function fmt(n)  { return Math.round(n).toLocaleString('en-US'); }
function fmtUSD(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
```

All output fields update on every `input` event — no submit button needed for the calculator. The results animate smoothly using a simple counter animation (count up from 0 to final value over ~600ms).

---

## Section 4: How It Works (3-Step Visual)

**Background:** White.
**Padding:** 80px vertical.
**Title:** `How Outhad converts anonymous visitors in-session` (32px).

Three cards in a row (stack on mobile), each with an icon, number, title, and description:

**Step 1 — Identify**
- Icon: fingerprint or eye icon (SVG, `#3652AE`)
- Number badge: `01`
- Title: `Identify every visitor`
- Body: `We build a live behavioral profile from the first click — even before they give you their email. Scroll depth, categories browsed, price sensitivity, exit signals.`

**Step 2 — Decide**
- Icon: lightning bolt (SVG, `#3652AE`)
- Number: `02`
- Title: `Trigger the right action in milliseconds`
- Body: `When a visitor shows exit intent, our AI fires the right message at the right moment — a personalized offer, not a generic "10% off" popup. All while they're still on the page.`

**Step 3 — Convert**
- Icon: checkmark circle (SVG, `#33C0A7`)
- Number: `03`
- Title: `Capture identity and revenue`
- Body: `Anonymous visitor submits email → profile stitched → cart recovery email fires within minutes (not next day). Your Klaviyo list grows. Revenue recovered.`

---

## Section 5: Founding Customer Program CTA

**Background:** Dark navy `#001D7D`, white text.
**Padding:** 80px vertical.
**Max-width:** 680px centered.

**Badge above headline:**
```
[ ✦ Limited to 5 Stores ]
```
Small pill, background `rgba(255,255,255,0.15)`, white text.

**Headline (H2, 40px, font-weight 800, white):**
```
Founding Customer Program
```

**Body copy (18px, white at 80% opacity, line-height 1.7):**
```
We're not looking for paying customers right now. We're looking for
5 Shopify stores to build alongside us.

Here's what you get:
```

**Three benefit rows** (checkmark icon + text, white):
```
✓  Free for 60 days — full platform, no card required
✓  We do the entire setup — zero work on your end
✓  Direct access to our founding team, not a support ticket
```

**What we ask in return:**
```
In return, we ask for one 30-minute feedback call per week and
a testimonial if it works. That's it.
```

**Social proof line (smaller, italic, `rgba(255,255,255,0.6)`):**
```
We estimate this will recover $2,000–$6,000/month for the average
store in our pilot range. The 5 spots will fill quickly.
```

**CTA button (large, white background, `#001D7D` text, border-radius 12px, padding 18px 40px):**
```
Apply for a Founding Spot →
```
Smooth scroll to form.

---

## Section 6: Lead Capture Form

**Background:** `#F9FAFB`.
**Padding:** 80px vertical.
**Max-width:** 520px centered.

**Title:** `Apply for a Founding Spot` (28px).
**Subtext:** `We'll review your store and get back to you within 24 hours.`

**Fields:**
```
First Name *         [                    ]
Store URL *          [ https://            ]
Monthly Visitors     [       ] (approx)
Email *              [                    ]
```

**Optional dropdown:**
```
Biggest challenge right now:
[ Cart abandonment ▼ ]
Options:
- Cart abandonment
- Low email capture rate
- Can't identify anonymous visitors
- Too many tools, no unified view
- Other
```

**Submit button:** Full width, solid `#3652AE`, 52px tall, `border-radius: 12px`:
```
Apply for Free Access →
```

**Below button (12px, muted gray):**
```
No credit card. No contract. We'll reach out within 24 hours.
```

**On submit:**
- Prevent default
- POST to a simple form endpoint — use Netlify Forms (add `netlify` attribute to `<form>`) or Formspree (`action="https://formspree.io/f/YOUR_ID"`)
- Show inline success message: `"✓ Application received. We'll be in touch within 24 hours."`
- No page reload

---

## Section 7: Footer

**Background:** `#10182B` (darkest).
**Padding:** 40px vertical.
**Two columns:**

Left: Logo + tagline `Turn anonymous visitors into revenue, in-session.`

Right: Links:
- `Privacy Policy`
- `Book a Call`
- `hello@tryconvertive.com`

---

## Animations & Interactions

| Element | Animation |
|---|---|
| Result card numbers | Count-up from 0 on page load + re-animate on input change |
| Slider | Drag updates all numbers in real time |
| "Revenue at risk" header | Number pulses (scale 1→1.05→1) when it updates |
| Section scroll | `scroll-behavior: smooth` on `<html>` |
| Buttons on hover | Slight scale `transform: translateY(-1px)` + shadow |
| Form submit | Button shows spinner → success checkmark |

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| `> 1024px` | Two-column calculator (inputs left, result right) |
| `768px–1024px` | Two-column, tighter spacing |
| `< 768px` | Single column — result card moves ABOVE inputs |
| `< 480px` | Reduce hero font to 32px, increase padding on inputs |

---

## Complete File Structure

```
roi-calculator/
├── index.html          ← everything in one file (HTML + <style> + <script>)
└── (optional) favicon.png
```

The entire page — HTML, CSS, and JavaScript — lives in `index.html`. No build step. No npm. No dependencies. Open it in a browser and it works.

---

## HTML Skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ROI Calculator — Outhad</title>

  <!-- Manrope font (same as app) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <style>
    /* All CSS here — use the design tokens defined above */
  </style>
</head>
<body>

  <!-- 1. Nav -->
  <nav id="nav">...</nav>

  <!-- 2. Hero -->
  <section id="hero">...</section>

  <!-- 3. Calculator -->
  <section id="calculator">
    <div class="calc-inputs">
      <!-- 3 inputs + slider -->
    </div>
    <div class="calc-result">
      <!-- Result card — updates live -->
    </div>
  </section>

  <!-- 4. How It Works -->
  <section id="how-it-works">...</section>

  <!-- 5. Founding Customer CTA -->
  <section id="founding-program">...</section>

  <!-- 6. Form -->
  <section id="apply">
    <form netlify name="roi-calculator-leads">
      <!-- fields -->
    </form>
  </section>

  <!-- 7. Footer -->
  <footer>...</footer>

  <script>
    // 1. Read URL params
    // 2. Set input defaults
    // 3. Run calculation
    // 4. Bind oninput events
    // 5. Count-up animation
    // 6. Form submit handler
  </script>

</body>
</html>
```

---

## JavaScript Logic — Complete Pseudocode

```javascript
// ── 1. Read URL params ──────────────────────────────
const params    = new URLSearchParams(window.location.search);
const storeName = params.get('store')    || 'Your store';
const visitors  = params.get('visitors') || '10000';
const rate      = params.get('rate')     || '2.0';
const aov       = params.get('aov')      || '65';

// ── 2. Set inputs ────────────────────────────────────
document.getElementById('inp-visitors').value = visitors;
document.getElementById('inp-rate').value     = rate;
document.getElementById('inp-aov').value      = aov;
document.getElementById('hero-store').textContent = storeName;

// ── 3. Calculate + update DOM ────────────────────────
function calculate() {
  const v    = parseInt(document.getElementById('inp-visitors').value) || 0;
  const r    = parseFloat(document.getElementById('inp-rate').value) / 100 || 0;
  const a    = parseFloat(document.getElementById('inp-aov').value) || 0;
  const lift = parseFloat(document.getElementById('inp-lift').value) / 100 || 0.004;

  const current     = Math.round(v * r);
  const lost        = v - current;
  const recovered   = Math.round(v * lift);
  const revenue     = recovered * a;
  const annual      = revenue * 12;
  const atRisk      = lost * a;

  animateTo('out-lost',     lost);
  animateTo('out-recovered', recovered);
  animateTo('out-revenue',   revenue,  true);
  animateTo('out-annual',    annual,   true);
  animateTo('out-at-risk',   atRisk,   true);

  // Update hero number
  animateTo('hero-at-risk', atRisk, true);
}

// ── 4. Bind events ───────────────────────────────────
['inp-visitors','inp-rate','inp-aov','inp-lift'].forEach(id => {
  document.getElementById(id).addEventListener('input', calculate);
});

// ── 5. Count-up animation ────────────────────────────
function animateTo(id, target, isMoney = false) {
  const el      = document.getElementById(id);
  const start   = 0;
  const duration = 600;
  const startTime = performance.now();

  function tick(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current  = Math.round(start + (target - start) * eased);

    el.textContent = isMoney
      ? '$' + current.toLocaleString('en-US')
      : current.toLocaleString('en-US');

    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ── 6. Run on load ───────────────────────────────────
calculate();

// ── 7. Form submit ───────────────────────────────────
document.getElementById('apply-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // If using Netlify Forms: just submit the form normally
  // If using Formspree: fetch POST to formspree endpoint

  try {
    const data = new FormData(e.target);
    await fetch('/', { method: 'POST', body: data }); // Netlify
    document.getElementById('form-success').style.display = 'block';
    e.target.style.display = 'none';
  } catch {
    btn.textContent = 'Apply for Free Access →';
    btn.disabled = false;
  }
});
```

---

## Personalized Link Generator (Bonus)

At the bottom of the page (hidden from main flow, only visible if `?admin=1` is in URL), add a small tool:

```
Store Name:    [________________]
Visitors/mo:   [________________]
Conv. Rate:    [________________]
AOV:           [________________]

[ Generate Link ]

Result: https://roi.tryconvertive.com?store=BrandName&visitors=15000&rate=2.1&aov=65
[ Copy Link ]
```

This lets you generate a custom URL for each prospect in 10 seconds before sending a DM.

---

## What This Page Does NOT Need

- No React, Vue, or any framework
- No npm install
- No backend API calls
- No authentication
- No connection to the Rails server or React app
- No Docker
- No Shopify SDK

It is a plain HTML file. One file. Zero dependencies.

---

## Quality Checklist Before Sending to Prospects

- [ ] URL params pre-filled correctly for that prospect's store
- [ ] Hero headline shows their store name
- [ ] "Revenue at risk" in hero matches the calculator default result
- [ ] "Apply" form submission works (test it once with Netlify or Formspree)
- [ ] Page loads in under 2 seconds (no heavy assets)
- [ ] Looks correct on mobile (test Chrome DevTools responsive mode)
- [ ] "Book a Call" button links to real Calendly
- [ ] Founding Customer Program says "5 spots" and sounds real and scarce
- [ ] Email address in footer is monitored

---

## Example Personalized URL to Send in a DM

```
Hey [Founder] — I estimated what anonymous visitor loss is costing
[StoreName] specifically. Built this in 5 mins:

https://roi.tryconvertive.com?store=StoreName&visitors=18000&rate=1.9&aov=72

The "Revenue at Risk" number at the top is based on your traffic.
We're offering 5 stores a free 60-day pilot to recover that. No card,
we do the setup. Worth a look?
```

This message + that link is the entire pitch. The page closes itself.
