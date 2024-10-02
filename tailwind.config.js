/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',],
  theme: {
    extend: {
      colors: {
        navy: '#004080',
        contrast: '#FFD700', // Use the desired contrast color
        lightBeige: '#F5F5DC',},
    },
  },
  plugins: [],
}

