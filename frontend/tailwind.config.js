/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical': {
          'blue': '#2563eb',
          'blue-dark': '#1d4ed8',
          'secondary-blue': '#3b82f6',
          'accent-teal': '#0d9488',
          'accent-emerald': '#059669',
          'green': '#10b981',
          'light': '#ecfdf5',
          'dark': '#064e3b',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-medical': 'pulse-medical 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-medical': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      },
      backgroundImage: {
        'medical-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'medical-light': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      },
      boxShadow: {
        'medical': '0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 10px 10px -5px rgba(37, 99, 235, 0.04)',
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}