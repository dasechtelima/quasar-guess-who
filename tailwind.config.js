/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        Mitr: ['"Mitr"', 'sans-serif'],
      },
      colors: {
        'wrong-guess': '#ff5964',
      },
    },
  },
  plugins: [],
}
