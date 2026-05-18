/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pup: {
          maroon: '#800000',
          gold: '#FFD700',
          darkMaroon: '#4A0000',
          lightGold: '#FFF2B2'
        }
      }
    },
  },
  plugins: [],
}
