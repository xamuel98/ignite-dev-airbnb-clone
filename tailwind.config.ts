/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./components/**/*.{js,vue,ts,tsx}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

