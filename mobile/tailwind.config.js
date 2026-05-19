/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.{js,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
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
