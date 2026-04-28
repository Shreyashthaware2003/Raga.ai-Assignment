/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: "#ffffff",
          dark: "#191919",
        },
      },
    },
  },
  plugins: [],
};
