/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: '#21232e',
          secondary: '#2f3043',
          'accent-dark': '#4f46e5',
          accent: '#6366f1',
          'accent-light': '#818cf8',
          info: '#8BE9FD',
          success: '#40d56e',
          warning: '#F1FA8C',
          error: '#FF5555',
          'dark-1': '#293145',
          'dark-2': '#232A3B',
          'dark-3': '#313A55',
          'dark-4': '#2B3348',
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
      },
    },
  },
  plugins: [],
};
