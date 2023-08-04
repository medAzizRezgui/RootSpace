/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Open Sans", "cursive"],
    },
    extend: {
      colors: {
        bgDark: "#17181C",
        mainDark: "#1E1F24",
        mainGray: "#27292F",
        borderGray: "#3D404B",
        textGray: "#A2A4A7",
      },
    },
  },
  plugins: [],
};
