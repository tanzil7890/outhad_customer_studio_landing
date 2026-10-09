import localFont from 'next/font/local'

/** Nib Pro display serif, loaded only by Concept 3 (exposed as --font-nib / font-display). */
export const nib = localFont({
  src: [
    { path: '../../../public/fonts/NibPro-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/NibPro-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-nib',
  display: 'swap',
  // Not preloaded: the metric-matched fallback paints the headline immediately and Nib swaps in
  // without competing with critical CSS (keeps LCP on the first paint).
  preload: false,
  adjustFontFallback: 'Times New Roman',
})
