/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './templates/**/*.html.twig',
    './templates/*.html.twig',
    './itc_theme.theme',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'itc-red': '#870000',      // var(--dark-red)
        'itc-dark-red': '#710000', // hover
        'itc-black': '#000000',    // var(--black)
        'itc-dark-gray': '#717171',// var(--dark-gray)
        'itc-light-gray': '#f3f3f3',
        'itc-white': '#ffffff',
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      fontSize: {
        'section-title': ['30px', '36px'], // 30px size, 36px line-height
        'body-text': ['16px', '30px'],     // 16px size, 30px line-height
      },
      spacing: {
        '100': '100px',
        '150': '150px',
      }
    },
  },
  plugins: [],
}
