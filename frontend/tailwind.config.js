/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          900: '#1E1B4B',
        },
        'amber': {
          400: '#FDB813',
          500: '#F59E0B',
        },
      },
    },
  },
  plugins: [],
}