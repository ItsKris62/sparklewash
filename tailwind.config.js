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
        fontFamily: {
          montserrat: ['Montserrat', 'sans-serif'],
          roboto: ['Roboto', 'sans-serif'],
          raleway: ['Raleway', 'sans-serif'],
          lato: ['Lato', 'sans-serif'],
          openSans: ['Open Sans', 'sans-serif'],
          playwrite: ['Playwrite AU QLD', 'serif'], // Add Playwrite Australia QLD
        },
    },
  },
  plugins: [],
}

