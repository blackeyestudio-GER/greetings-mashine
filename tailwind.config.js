/** @type {import('tailwindcss').Config} */
/** https://coolors.co/3aa1bd-586667-1c1e1e-111212-1e4545 */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'moonstone': '#3AA1BD',
        'dim-gray': '#869698',
        //'dim-gray': '#586667',
        'eerie-black': '#1C1E1E',
        'night': '#111212',
        'dark-slate-gray': '#1E4545',
        'dark-slate-gray-darker': '#1A3A3A', // Eine dunklere Variante für Hover-Effekte
      },
      saturate: {
        25: '.25',
        75: '.75',
      },
    },
  },
  plugins: [],
}