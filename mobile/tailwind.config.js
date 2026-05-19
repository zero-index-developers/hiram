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
        primary: '#7e1e39',
        background: '#FCF8F8',
        accent: '#F2B50B',
      }
    },
  },
  plugins: [],
}
