/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage:{
        "login":"url('./assets/cart.png')"
      }
    },
  },
  plugins: [],
}

