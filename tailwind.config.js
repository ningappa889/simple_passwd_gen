/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#070a12',
          surface: '#0d1322',
          card: '#131b2e',
          border: '#1e293b',
          accent: '#10b981',
          cyan: '#06b6d4',
          violet: '#8b5cf6',
          danger: '#ef4444',
          warning: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'cyber-glow': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.25)',
        'violet-glow': '0 0 25px -5px rgba(139, 92, 246, 0.25)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-fast': 'spin 0.5s linear 1'
      }
    },
  },
  plugins: [],
}
