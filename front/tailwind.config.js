/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    fontSize: {
      12: "0.75rem",
      14: "0.875rem",
      16: "1rem",
      18: "1.125rem",
      20: "1.25rem",
      24: "1.5rem",
    },
    extend: {
      colors: {
        pink: {
          main: "#FF8989",
          bg: "#FFEDED",
        },
        white: {
          DEFAULT: "#FDFDFD",
        },
      },
    },
  },
  plugins: [],
};
