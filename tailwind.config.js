/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "#FF79C6",
          secondary: "#BD93F9",
          accent: "#FFB86C",
          info: "#8BE9FD",
          success: "#50FA7B",
          warning: "#F1FA8C",
          error: "#FF5555",
        },
        base: {
          50: '#f9fafb',
          100: '#e7e8ee',
          200: '#c3c6d5',
          300: '#949ab3',
          400: '#616b89',
          500: '#3f455a',
          550: '#373c4f',
          600: '#2f3043',
          650: '#2a2d3c',
          700: '#21232e',
        },
      }
    },
  },
  plugins: [],
}