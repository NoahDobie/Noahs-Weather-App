/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          background: '#F7F8F9',
          text: '#4b5563',
          primary: '#2C3E5D',
          secondary: '#DCDFE4',
        },
        dark: {
          background: '#1f2937',
          text: '#f9fafb',
          primary: '#374151',
          secondary: '#4b5563',
        },
      },
      minWidth: {
        'screen': '320px',
      },
      minHeight: {
        'screen': '400px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};