# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "SimpleOuthadStealth" - a Next.js landing page for Outhad, a Customer Activation Platform that uses data and AI. The application features an animated hero section with particle effects, orbiting circles, and animated beams connecting floating feature cards.

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
- **State Management**: React hooks with localStorage for theme persistence

### Project Structure

- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist fonts and global header
  - `page.tsx` - Main landing page with hero section and animated elements
  - `globals.css` - Tailwind base styles and custom CSS variables

- `components/` - Reusable React components
  - `header.tsx` - Fixed navigation header with theme toggle and mobile menu
  - `companies.tsx` - Company logos/testimonials section
  - `ui/` - shadcn/ui component library
  - `global/` - Global utility components (analytics, container, icons, images, wrapper)

- `lib/utils.ts` - Utility functions (cn class merger)

### Key Features

**Theme System**: Dark/light theme toggle with:
- CSS custom properties in `globals.css` for theme colors
- localStorage persistence
- System preference detection
- Custom `--app-*` color variables for consistent theming

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
- Custom CSS variables provide theme consistency across components
- Mobile-specific optimizations prevent zoom on form inputs
- All text elements allow selection for better UX