/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/index.css',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        'primary-blue': '#005A8C',
        'teal': '#0098B5',
        'light-teal': '#00C2CC',
        'dark-blue': '#003B5C',
        'light-blue': '#E6F3F7',
        'error-red': '#D32F2F',
        'success-green': '#4CAF50',
        'warning-yellow': '#FFC107',
        'disabled-gray': '#9E9E9E',
        'background': '#F5F7FA',
        'text': '#333333',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}