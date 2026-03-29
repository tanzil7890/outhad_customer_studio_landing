
Update app/sitemap.ts to dynamically include all /vs/[slug] routes

Update components/header.tsx to add "Compare" nav link → /vs
Update components/footer.tsx to add "Comparisons" link


2. Legal/Trust Pages — Critical for B2B E-E-A-T
The footer has zero legal links. Google downgrades B2B SaaS sites without Privacy Policy and Terms pages.

Implementation:

Create app/privacy-policy/page.tsx with full privacy policy content
Create app/terms/page.tsx with terms of service content
Add "Legal" column to components/footer.tsx with Privacy Policy + Terms links
Add both to app/sitemap.ts


Wave 3 — Content Strategy (No-Code, High Long-Term Impact)
Blog Topic Cluster Architecture (via Firebase Admin Panel)
Publish these educational posts to capture top-of-funnel traffic:

Cluster: Anonymous Visitor Conversion

"What Are Anonymous Visitors and Why They Cost Ecommerce Brands Revenue"
"7 Tactics to Convert Anonymous Visitors Before They Leave Your Store"
"Anonymous to Known: How Real-Time Identity Stitching Works"
Cluster: In-Session AI
4. "What is In-Session Personalization? Complete Guide for Ecommerce Teams"
5. "Exit Intent Popups Are Dead. Here's What Replaces Them."
6. "In-Session AI vs Batch Personalization: Why Timing is Everything"

Cluster: CDP Alternative
7. "Do You Need a CDP for Ecommerce? A 2025 Buyer's Guide"
8. "CDP vs AI CDP: How the Category Has Evolved Beyond Data Collection"

Cluster: Journey Orchestration
9. "Journey Orchestration vs Marketing Automation: What's the Difference?"
10. "The Ecommerce Journey Orchestration Playbook"

Each post should internally link to: relevant feature page + /roi-calculator + 2 related blog posts.