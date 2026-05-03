/** @type {import('tailwindcss').Config} */
export default {
  // this tells tailwind where to look for class names
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  // darkMode class means we toggle dark mode manually
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
}
