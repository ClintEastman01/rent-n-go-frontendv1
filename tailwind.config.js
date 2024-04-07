/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        myTheme: {
          lightbg: '#f5f5f5',
          darktext: '#262626',
          primary: "#6e9bd3",
          secondary: "#ba98f2",
          accent: "#4930a5",
          neutral: "#151628",
          "base-100": "#ffffff",
          info: "#92bae3",
          success: "#44da8a",
          warning: "#ce7a12",
          error: "#f7365d",
          dark: "#20272F",
          dark1: "#21202f",
          dark2: "#202f2f",
          light: "#cbd5e1",
          grey: "#c8c9ca",
          niceGrey: "#333644",
          niceBlack: "#2b2d38",
          darkTextBody: "#d4d4d4",
          lightTextBody: "#20272F"
        },
      },
    },
  },
  plugins: [],
};
