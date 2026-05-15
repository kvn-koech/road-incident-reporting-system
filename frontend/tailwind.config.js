/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kenya: {
          green: "#006633",
          red: "#990000",
          black: "#000000",
          gold: "#FFCC00",
          white: "#FFFFFF",
        },
        brand: {
          primary: "#10b981", // emerald-500
          secondary: "#065f46", // emerald-800
          danger: "#991b1b", // red-800
          warning: "#f59e0b", // amber-500
          background: "#0a0a0a",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
