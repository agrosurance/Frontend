/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "780px" },
        widescreen: { min: "780px" },
      },
      colors: {
        primary: "#219d4d",
        secondary: "#ebab2d",
        tertiary: "#51dd8e",
        background: "#ffffff",
        foreground: "#1a1a1a",
        back: "#ffffff",
        front: "#2a2d2f",
        dark: {
          background: "#4a4b4c",
          foreground: "#cfcecd",
        },
      },
      content: {
        visible: '""',
      },
      zIndex: {
        1: 1,
      },
      fontFamily: {
        raleway: "'Raleway', sans-serif",
        poppins: "'Poppins', sans-serif",
      },
      transitionDuration: {
        inherit: "inherit",
      },
    },
  },
  plugins: [],
};
