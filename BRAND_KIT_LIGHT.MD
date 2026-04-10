# Convertive Brand Kit — Light Mode
## Warm Black + Copper — Premium Enterprise Palette

> **Core principle:** Every color earns its place. Copper = money/value. Warm black = authority/depth. Warm neutrals = approachable premium. Nothing is decorative — every color communicates something.

---

## 1. Brand Identity

| Property | Value |
|---|---|
| Brand Name | CONVERTIVE |
| Wordmark style | All-caps, Manrope Black (900), letter-spacing: 0.12em |
| Logo file | `logo-black.png` (use on all light backgrounds) |
| Tagline | Turn anonymous visitors into buyers |

**Logo rule:** Single word, single color. Never split "CONVERTIVE" into two colors. Never use different typefaces across placements. Every usage builds brand equity.

---

## 2. Color System — Light Mode

### Primary Brand Colors

| Token | Hex | Swatch | Usage |
|---|---|---|---|
| `brand.primary` | `#1A1410` | ████ | Buttons, active states, primary headings |
| `brand.hover` | `#2D2420` | ████ | Button hover, pressed states |
| `brand.subtle` | `#EDE5DE` | ████ | Tinted backgrounds, low-emphasis areas |

### Copper Accent Scale

> Copper = money, value, conversion. Use on revenue numbers, KPI metrics, and high-signal CTAs **only**. Never use copper decoratively.

| Token | Hex | Swatch | Usage |
|---|---|---|---|
| `copper.100` | `#FDF0E0` | ████ | Callout backgrounds, notification bg |
| `copper.200` | `#F7E4D0` | ████ | Badge backgrounds, tag fills |
| `copper.300` | `#EBBF94` | ████ | Decorative accents, dividers |
| `copper.400` | `#C87941` | ████ | **Base copper** — KPI numbers, accent CTAs, active nav bar |
| `copper.500` | `#A86331` | ████ | Hover state on copper elements |
| `copper.600` | `#7A4420` | ████ | Copper text on light bg (accessible) |

### Surface / Background Scale

> Never use cold grays (`#F9FAFB`, `#E2E8F0`). Every surface needs a warm undertone.

| Token | Hex | Swatch | Usage |
|---|---|---|---|
| `surface.canvas` | `#FAFAF8` | ████ | App/page background |
| `surface.base` | `#FFFFFF` | ████ | Cards, panels, modals |
| `surface.warm` | `#FDF8F4` | ████ | Featured/highlighted cards |
| `surface.hover` | `#F5EFE8` | ████ | Row hover, nav hover, soft hover |
| `surface.sunken` | `#F0E8E0` | ████ | Inputs, code blocks, depressed areas |

### Border Scale

| Token | Hex | Swatch | Usage |
|---|---|---|---|
| `border.strong` | `#D4C4B8` | ████ | Focused inputs, modal outlines |
| `border.default` | `#E8DDD4` | ████ | Card borders, table dividers |
| `border.subtle` | `#F2ECE6` | ████ | Section separators, barely visible |

### Text Scale

| Token | Hex | Swatch | Usage |
|---|---|---|---|
| `text.primary` | `#1A1410` | ████ | Body text, headings |
| `text.secondary` | `#5C4E44` | ████ | Supporting text, descriptions |
| `text.muted` | `#9C8B7E` | ████ | Timestamps, captions, table headers |
| `text.disabled` | `#C4B4A8` | ████ | Disabled states |
| `text.placeholder` | `#B8A89C` | ████ | Input placeholder |

### Semantic / Status Colors

> Traffic-light signals. Never use green decoratively. Never use red for emphasis.

| State | Background | Text | Border | Meaning |
|---|---|---|---|---|
| Success | `#D4F4E8` | `#1A5C40` | `#A8DFC8` | Conversion up, revenue hit, goal achieved |
| Warning | `#FDEFD0` | `#8B5C00` | `#F0CC88` | Declining metric, low engagement |
| Error | `#FAE0DC` | `#8B2020` | `#F0B0A8` | Failed sync, critical alert |
| Info | `#E4EEFC` | `#1A3D6B` | `#A8C8F0` | Neutral data, informational |

---

## 3. Typography — Light Mode

**Font family:** Manrope (variable weight) — everywhere, no exceptions.

### Heading Scale

| Level | Size / Line Height | Weight | Color | Usage |
|---|---|---|---|---|
| H1 | 48px / 60px | 800 ExtraBold | `#1A1410` | Page hero, main selling point |
| H2 | 36px / 44px | 700 Bold | `#1A1410` | Section titles |
| H3 | 24px / 32px | 600 SemiBold | `#1A1410` | Card titles, widget headers |
| H4 | 20px / 28px | 600 SemiBold | `#5C4E44` | Sub-section titles |

### Body Scale

| Level | Size / Line Height | Weight | Color | Usage |
|---|---|---|---|---|
| Body LG | 16px / 24px | 400 Regular | `#1A1410` | Primary readable content |
| Body MD | 14px / 20px | 400 Regular | `#5C4E44` | Secondary content, descriptions |
| Label | 12px / 18px | 500 Medium | `#9C8B7E` | Table headers, field labels (letter-spacing: 0.04em) |
| Caption | 11px / 16px | 500 Medium | `#9C8B7E` | Metadata, timestamps |

### KPI / Metric Numbers

| Level | Size / Line Height | Weight | Color | Usage |
|---|---|---|---|---|
| KPI Hero | 36px / 44px | 800 ExtraBold | `#C87941` | Revenue, conversion rates — money signals |
| KPI Large | 24px / 32px | 700 Bold | `#1A1410` | Visitor counts, event totals |
| KPI Small | 18px / 28px | 600 SemiBold | `#1A1410` | Supporting metrics |

> **Rule:** Revenue and conversion numbers always render in copper `#C87941`. This one color should make users feel the platform's value instantly.

---

## 4. Components — Light Mode

### Buttons

| Variant | Background | Text | Hover | Border | Use for |
|---|---|---|---|---|---|
| **Primary** | `#1A1410` | `#F5F0EB` | `#2D2420` | none | Default actions |
| **Accent** | `#C87941` | `#FFFFFF` | `#A86331` | none | Revenue CTAs: "Activate", "Launch", "Export" |
| **Outline** | `#FFFFFF` | `#1A1410` | `#F5EFE8` | `#1A1410` 1px | Secondary actions |
| **Ghost** | transparent | `#1A1410` | `#F5EFE8` | none | Tertiary actions |
| **Shell** | `#FFFFFF` | `#5C4E44` | `#F5EFE8` | `#D4C4B8` 1px | Neutral utility |

- Border radius: **8px** all buttons
- Font: Manrope SemiBold 600, 14px
- Heights: xs=24px / sm=32px / md=40px / lg=48px

### Navigation — Sidebar

> **Pattern: Dark sidebar + light content area.**
> The sidebar intentionally uses the dark mode palette against the light content. This creates strong visual hierarchy — navigation recedes, content leads. This is the same pattern used by Linear, Vercel, and Raycast. It makes the platform feel more premium and separates chrome from content.

#### Sidebar Shell

```
Outer background:        #1A1410  (warm black — Level 1 surface)
Inner background:        #1A1410
Right border:            1px solid #3D3028  (subtle warm separator)
Width expanded:          240px
Width collapsed:         60px
Transition:              all 0.3s ease
```

#### Logo & Wordmark

```
Logo file:               logo-white.png  (always white on dark sidebar)
Logo size:               28px × 28px
Wordmark:                CONVERTIVE
Wordmark font:           Manrope Black (900)
Wordmark color:          #F5F0EB  (warm white — never pure #FFFFFF)
Wordmark letter-spacing: 0.12em
```

#### Section Headers (SETUP, AUDIENCES, etc.)

```
Text:                    #7A6558  (muted warm — deliberately recedes)
Font:                    Manrope Bold 700, 11px
Letter-spacing:          1.2px (all-caps feel)
Expand/collapse icons:   #7A6558
Divider:                 #2D2420
```

#### Nav Items

```
Inactive:    transparent bg  |  #C4A898 text  |  #C4A898 icon
Hover:       rgba(200,121,65,0.10) bg  |  #3D3028 border  |  #C4A898 text
Active:      rgba(200,121,65,0.18) bg  |  #E09A68 3px left border  |  #F5F0EB text + icon
```

> **Why copper on active?** The copper border is the ONE brand color signal in the dark sidebar. It draws the eye instantly to where the user is. The 3px width and lightened copper `#E09A68` make it vibrant and readable against the dark background.

#### Collapse Toggle Button

```
Color:       #7A6558
Hover bg:    #2D2420
Hover text:  #F5F0EB
```

### KPI Cards

```
Background:      #FFFFFF
Border:          1px solid #E8DDD4
Border radius:   8px
Padding:         24px

Metric number:   Manrope 800 / 36px / #C87941
Metric label:    Manrope 500 / 12px / #9C8B7E / letter-spacing: 0.04em
Delta positive:  #1A5C40
Delta negative:  #8B2020
```

### Data Tables

```
Header row:      #F5EFE8 bg  |  #9C8B7E text  |  Manrope 500 12px
Body row odd:    #FFFFFF
Body row even:   #FDFAF7  (warm tint — never cold gray)
Row hover:       #F5EFE8
Border:          1px solid #E8DDD4
Cell text:       #1A1410
Secondary cell:  #5C4E44
```

### Badges / Tags

| Type | Background | Text |
|---|---|---|
| Default | `#F0E8E0` | `#5C4E44` |
| Copper / Revenue | `#F7E4D0` | `#7A4420` |
| Success | `#D4F4E8` | `#1A5C40` |
| Warning | `#FDEFD0` | `#8B5C00` |
| Error | `#FAE0DC` | `#8B2020` |
| Info | `#E4EEFC` | `#1A3D6B` |
| ML / AI | `#EDE5DE` | `#1A1410` |

### Inputs

```
Background:        #F0E8E0  (sunken warm)
Border:            1px solid #E8DDD4
Border focused:    1px solid #D4C4B8
Border radius:     8px
Height:            40px
Text:              #1A1410
Placeholder:       #B8A89C
```

### Modals / Overlays

```
Overlay:           rgba(26, 20, 16, 0.5)  (warm black overlay, not cold black)
Modal bg:          #FFFFFF
Modal border:      1px solid #E8DDD4
Header text:       #1A1410  Manrope Bold 700 / 18px
Close button:      #9C8B7E  hover #1A1410
```

---

## 5. Spacing Scale

Use only these values — no ad-hoc spacing.

| Token | Value | Use |
|---|---|---|
| `space.1` | 4px | Badge padding, icon gaps |
| `space.2` | 8px | Icon-to-label, inline gaps |
| `space.3` | 12px | Compact component padding |
| `space.4` | 16px | Standard component padding |
| `space.6` | 24px | Section gaps within a card |
| `space.8` | 32px | Card-to-card spacing |
| `space.12` | 48px | Section-to-section spacing |
| `space.16` | 64px | Page section gaps |

---

## 6. Color Psychology Map

| Color | Hex | Meaning | Never use for |
|---|---|---|---|
| Copper | `#C87941` | Money, conversion, revenue, value | Decorative elements, non-metric text |
| Warm Black | `#1A1410` | Authority, depth, primary action | Background fills on content areas |
| Success Green | `#1A5C40` | Positive outcome, goal achieved | Branding, decorative |
| Warning Amber | `#8B5C00` | Attention needed, risk, declining | Positive messaging |
| Error Red | `#8B2020` | Failure, critical alert | Urgency emphasis (use amber instead) |
| Info Navy | `#1A3D6B` | Neutral data, informational context | Warnings or alerts |

---

## 7. What Not To Do — Light Mode

- Never use `bg='black'` on buttons — always `#1A1410`
- Never use undefined tokens like `gray.950` — falls back to system black
- Never use copper `#C87941` on non-revenue/non-conversion elements
- Never use cold grays `#F9FAFB`, `#E2E8F0` — replace with warm equivalents
- Never split the "CONVERTIVE" wordmark into two colors
- Never use green decoratively — green = conversion success only
- Never render all text in copper — it loses meaning immediately

---

## 8. Implementation Files

| File | Purpose |
|---|---|
| `ui/src/chakra-core.config.ts` | Source of truth — colors, typography, component variants |
| `ui/src/chakra.config.ts` | Theme extensions |
| `ui/src/views/Sidebar/Sidebar.tsx` | Logo, wordmark, sidebar layout |
| `ui/src/views/Sidebar/NavButton.tsx` | Nav item active/hover states |
| `ui/src/assets/images/logo-black.png` | Logo for all light backgrounds |

---

*Last updated: 2026-03-30*
*Mode: Light — see `BRAND_KIT_Dark.md` for dark mode*
