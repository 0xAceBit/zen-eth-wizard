/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00C076',
        secondary: '#8CA3AF',
        accent: '#D9A441',
        background: '#070A0E',
        surface: '#10161D',
        surfaceElevated: '#151D26',
        border: '#26313C',
        borderSubtle: '#1A232C',
        success: '#00C076',
        warning: '#D9A441',
        error: '#E05252',
        textPrimary: '#F4F7F8',
        textSecondary: '#8CA3AF',
      },
      spacing: {
        'card-sm': '1rem',
        'card': '1.25rem',
        'card-lg': '1.5rem',
        'section': '5rem',
      },
      borderRadius: {
        card: '8px',
        control: '6px',
      },
      boxShadow: {
        card: '0 12px 28px rgba(0, 0, 0, 0.22)',
        subtle: '0 1px 2px rgba(0, 0, 0, 0.28)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'market-grid': 'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
