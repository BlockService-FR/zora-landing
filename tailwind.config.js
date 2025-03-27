/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Comic Neue', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-optimized': 'floatOptimized 6s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'pulse-optimized': 'pulseOptimized 2s ease-in-out infinite',
        'sparkle-optimized': 'sparkleOptimized 1.5s ease-in-out infinite',
      },
      colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        accent: '#FCD34D',
      },
    },
  },
  plugins: [],
};