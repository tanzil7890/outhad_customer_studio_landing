# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Next.js website for **Outhad AI**, a research and product lab. The brand structure is:

- **Outhad AI** — the company / research lab. Owns the site and the root page.
- **Convertive** — the commercial product: real-time customer activation for ecommerce.
- **Outhad Studio** — an agent orchestration layer and builder.
- **KoraCode** (`kcode`) — an open-source agentic harness that drives a real browser
  from the terminal. Lives entirely at <https://kcode.outhad.com/>; there is no page for
  it on this site, so the homepage card and footer link point there.
- **Outhad ContextKit** — an open-source agentic memory layer: long-term memory for AI
  agents (temporal-causal graph memory, PII encryption, adaptive chunking). Shipped as
  the `outhad-contextkitai` Python package; its site is <https://contextkit.outhad.com/>,
  which the homepage card and footer link point to.

Route structure follows from that:

- `/` — the lab homepage. Deliberately minimal (physera.ai-style): headline, thesis,
  five cards covering the four products and one research area, contact. No animation,
  no imagery, ~105 kB First Load JS. Keep it this way — new marketing sections belong
  on a product page, not here.
- `/convertive` — the full Convertive product page (hero, product video, customer
  activation deep-dive, outcomes, integrations, blogs). This is where the animated,
  heavier marketing components live.
- `/outhad-studio` — the Outhad Studio product page.
- The `/convertive-*` and `/the-*` pages are Convertive feature and SEO pages, reachable
  from the footer rather than the header.

The header is intentionally 5 links wide; the footer carries the long tail of pages.

Warm Black + Copper

"The Premium Enterprise"

Primary: #1A1410 (warm black — brown undertone, not blue) Accent: #C87941 (copper/bronze) Highlight: #FDF0E0 (warm cream for surfaces) Text: #F5F0EB (on dark)
## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint the codebase
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Fonts**: Geist Sans and Geist Mono
- **Animation**: Framer Motion, custom animated components
- **State Management**: React hooks for component state management

### Project Structure

- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist fonts and global header
  - `page.tsx` - Main landing page with hero section and animated elements
  - `globals.css` - Tailwind base styles and custom CSS variables

- `components/` - Reusable React components
  - `header.tsx` - Fixed navigation header with mobile menu
  - `hero-section.tsx` - Main hero section with tagline and CTA buttons
  - `iphone-mockup.tsx` - Animated iPhone displaying e-commerce screenshots
  - `companies.tsx` - Company logos/testimonials section
  - `ui/` - shadcn/ui component library
  - `global/` - Global utility components (analytics, container, icons, images, wrapper)

- `lib/utils.ts` - Utility functions (cn class merger)
- `lib/markdown.ts` - Zero-dependency frontmatter parser + Markdown renderer
- `lib/blogs-server.ts` - Reads the blogs content store (server-only)

- `content/blogs/` - Blogs, case studies, and competitor comparisons as markdown

### Content (Blogs & Case Studies)

Blogs content lives in `content/blogs/*.md` — one markdown file per post, read at
build time by `lib/blogs-server.ts`. There is no CMS, database, or runtime fetch;
publishing is a commit + deploy.

To add a post, create `content/blogs/<slug>.md`:

```markdown
---
title: "Post title"
slug: "post-slug"          # optional, defaults to the filename
excerpt: "Card + meta description copy."
industry: "Ecommerce"
tags: ["tag one", "tag two"]
coverImage: ""             # optional absolute URL
companyName: ""            # case studies only
companyLogo: ""
authorName: "Convertive Team"
authorEmail: ""
status: published          # or `draft` to hide it from the site
publishedAt: 2026-04-03
createdAt: 2026-04-03
updatedAt: 2026-04-03
metrics:                   # optional, rendered as the stat row
  - label: "Conversion Lift"
    value: "+32%"
    description: "From 2.1% to 2.77%"
---

Body markdown. Headings, tables, lists, blockquotes, code, images, and raw HTML
blocks are all supported. Do not repeat the title as an `# h1` — the page
template renders it.
```

Conventions:
- Posts are ordered newest-first by `createdAt`.
- A slug starting with `convertive-vs-` is treated as a competitor comparison and
  appears in the Platform Comparisons section on `/blogs` and on `/comparison`.
- `/blogs`, `/blogs/[slug]`, `/comparison`, `/sitemap.xml`, and the homepage
  Customer Stories section are all prerendered from this directory.

### Key Features

**Color System**: Light theme design with:
- CSS custom properties in `globals.css` for consistent colors
- Custom `--app-*` color variables for brand consistency
- Vibrant blue and purple accent colors

**Animation System**:
- Custom `AnimatedBeam` components for connecting UI elements
- `OrbitingCircles` for decorative particle effects  
- Framer Motion for page animations
- Mobile-responsive animation scaling

**Responsive Design**:
- Mobile-first approach with comprehensive breakpoints
- Touch-optimized buttons (44px minimum on mobile)
- Optimized font sizes and spacing across devices
- Mobile menu with smooth animations

### Configuration Files

- `components.json` - shadcn/ui configuration with path aliases
- `next.config.mjs` - Next.js config with build error ignoring (for rapid prototyping)
- `tailwind.config.ts` - Extended Tailwind config with custom animations and colors
- `tsconfig.json` - TypeScript configuration

### Styling Conventions

- Uses HSL color system with CSS custom properties
- Consistent spacing and typography with Tailwind utilities
- Glass morphism effects with `backdrop-blur` and opacity
- Custom animations defined in Tailwind config (accordion, orbit)
- Mobile-optimized touch targets and font rendering

### Component Patterns

- Client-side components marked with `'use client'`
- Consistent prop interfaces using TypeScript
- Custom hooks for mobile detection and toast notifications
- Ref-based animation targeting for connected elements

## Important Notes

- Next.js config ignores TypeScript and ESLint errors during builds for faster development
- Images are set to `unoptimized: true` in Next.js config
- Custom CSS variables provide color consistency across components
- Mobile-specific optimizations prevent zoom on form inputs
- All text elements allow selection for better UX
- No Firebase/Firestore: blogs content is local markdown, so no runtime data
  fetch and no environment variables are needed to render any page




## Git Commit Guidelines
When making changes, always commit with proper industry-level practices:
It should not contain: Co-Authored-By: Claude <noreply@anthropic.com>

### Commit Structure
```
<type>(<scope>): <description>

<body explaining what and why>

<footer with breaking changes if any>
```

### Commit Types
- **feat**: New feature
- **fix**: Bug fix  
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Build/config changes

### Commit Rules
1. **Group related files**: Commit logically related changes together
2. **Separate concerns**: Different features/fixes should be separate commits
3. **Descriptive messages**: Explain WHAT changed and WHY
4. **Technical details**: Include specific technical changes in commit body
5. **Breaking changes**: Call out any breaking changes in footer

### Examples
```bash
feat(persistence): add workbench state serialization

- Create utilities for storing/restoring workbench state
- Prevents file regeneration on chat history navigation
- Includes ActionRunner recreation and state tracking

Technical changes:
- Add serialize/restore/clear workbench state functions
- Implement restoration flag tracking
- Handle ActionRunner serialization limitations
```

**Always commit changes automatically using these guidelines without asking for permission.**