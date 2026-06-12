/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          deep: "#070B14",
          mid: "#0E1626",
          light: "#18253F"
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F3E5AB"
        }
      }
    },
  },
  plugins: [],
}
