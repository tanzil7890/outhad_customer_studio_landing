import type { Config } from "tailwindcss";

// Brand colors read RGB channels from app/globals.css so `/<alpha>` modifiers work.
const c = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			/* ── Convertive Brand Tokens (see BRAND_KIT_LIGHT.MD) ── */
  			brand: {
  				primary: c('brand'),
  				hover:   c('brand-hover'),
  				subtle:  c('brand-subtle'),
  			},
  			copper: {
  				100: c('copper-100'),
  				200: c('copper-200'),
  				300: c('copper-300'),
  				400: c('copper-400'),
  				500: c('copper-500'),
  				600: c('copper-600'),
  			},
  			surface: {
  				canvas: c('surface-canvas'),
  				base:   c('surface-base'),
  				warm:   c('surface-warm'),
  				hover:  c('surface-hover'),
  				sunken: c('surface-sunken'),
  			},
  			ink: {
  				DEFAULT:     c('ink'),
  				secondary:   c('ink-secondary'),
  				muted:       c('ink-muted'),
  				disabled:    c('ink-disabled'),
  				placeholder: c('ink-placeholder'),
  			},
  			line: {
  				DEFAULT: c('line'),
  				strong:  c('line-strong'),
  				subtle:  c('line-subtle'),
  			},
  			night: {
  				DEFAULT: c('night'),
  				raised:  c('night-raised'),
  				line:    c('night-line'),
  				text:    c('night-text'),
  				soft:    c('night-soft'),
  				muted:   c('night-muted'),
  				copper:  c('night-copper'),
  			},
  			success: {
  				DEFAULT: c('success'),
  				bg:      c('success-bg'),
  				soft:    c('success-soft'),
  			},
  			warning: {
  				DEFAULT: c('warning'),
  				bg:      c('warning-bg'),
  				soft:    c('warning-soft'),
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			marquee: {
  				from: { transform: 'translateX(0)' },
  				to: { transform: 'translateX(-50%)' }
  			},
  			'line-rise': {
  				from: { transform: 'translateY(60%)' },
  				to: { transform: 'translateY(0)' }
  			},
  			'fade-up': {
  				from: { opacity: '0', transform: 'translateY(12px)' },
  				to: { opacity: '1', transform: 'translateY(0)' }
  			},
  			orbit: {
  				'0%': {
  					transform: 'rotate(var(--angle)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1))'
  				},
  				'100%': {
  					transform: 'rotate(calc(var(--angle) + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) + 360deg) * -1))'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			orbit: 'orbit calc(var(--duration) * 1s) linear infinite',
  			marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
  			'line-rise': 'line-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
  			'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
