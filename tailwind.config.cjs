/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        blue: {
          1: "rgb(75, 177, 222)"
        },
        gray: {
          1: "rgb(233, 233, 233)"
        },
        red: {
          1: "rgb(251, 84, 85)"
        }
      },
      fontFamily: {
        sofia : ['Sofia sans', 'sans serif']
      },
      fontWeight: {
        extrablack : "900"
      }
    }
  },
  plugins: [],
}
