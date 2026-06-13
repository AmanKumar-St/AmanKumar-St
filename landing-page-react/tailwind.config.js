/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-deep': '#070B14',
        'royal-mid': '#0E1626',
        'royal-light': '#18253F',
        'accent-gold': '#D4AF37',
        'accent-gold-light': '#F3E5AB',
        'accent-gold-glow': 'rgba(212, 175, 55, 0.5)',
        'neon-white': '#FFFFFF',
        'neon-white-glow': 'rgba(255, 255, 255, 0.8)',
        'neon-cyan-glow': 'rgba(0, 240, 255, 0.6)',
        'text-main': '#E2E8F0',
        'text-muted': '#94A3B8',
        'card-bg': 'rgba(24, 37, 63, 0.4)',
        'card-border': 'rgba(212, 175, 55, 0.2)',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'grid-move': 'gridMove 30s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        gridMove: {
          '0%': { transform: 'rotateX(45deg) translateY(0)' },
          '100%': { transform: 'rotateX(45deg) translateY(60px)' },
        },
        pulseGlow: {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '100%': { transform: 'scale(1.2)', opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
}