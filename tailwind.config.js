/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [ './src/**/*.html', './src/**/*.vue', './src/**/*.jsx', ],
  content: [
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

