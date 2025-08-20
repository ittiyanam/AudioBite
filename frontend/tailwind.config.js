/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dm: ['"DM Serif Text"', 'normal'],
      },
    },
  },
  plugins: [],
}
