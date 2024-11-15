/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFFFFF',
        'secondary': '#e2e4e9',
        'variant': '#2d2e2e',
      },
    },
  },
  plugins: [],
}