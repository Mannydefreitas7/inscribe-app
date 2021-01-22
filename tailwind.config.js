module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'almost': 'calc(100vh - 61px)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
