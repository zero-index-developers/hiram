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
        primary: '#7e1e39',
        background: '#FCF8F8',
        accent: '#F2B50B',
      }
    },
  },
  plugins: [],
}
