/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Plus Jakarta Sans"', 'sans-serif'],
    },
    extend: {
      colors: {
        'black': '#0a0a0a',
        'blue': '#1a6fd4',
        'blue-light': '#57b8f0',
        'white': '#ffffff',
        'gray': '#cccccc',
        
        // Semantic Theme Tokens linked to index.css
        'canvas-bg': 'var(--color-canvas-bg)',
        'canvas-card': 'var(--color-canvas-card)',
        'canvas-footer': 'var(--color-canvas-footer)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'border-subtle': 'var(--color-border-subtle)',
        'border-card': 'var(--color-border-card)',

        // Button Theme Tokens linked to index.css
        'btn-primary-bg': 'var(--color-btn-primary-bg)',
        'btn-primary-text': 'var(--color-btn-primary-text)',
        'btn-primary-hover': 'var(--color-btn-primary-hover)',
        'btn-secondary-bg': 'var(--color-btn-secondary-bg)',
        'btn-secondary-text': 'var(--color-btn-secondary-text)',
        'btn-secondary-border': 'var(--color-btn-secondary-border)',
        'btn-secondary-hover': 'var(--color-btn-secondary-hover)',
      }
    },
  },
  plugins: [],
}
