/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        caprasimo: ["Caprasimo", "serif"],
        gaegu: ["Gaegu", "cursive"],
      },
      minHeight: {
        128: "38rem",
      },
      width: {
        130: "43rem",
      },
      height: {
        100: "28rem",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#cfdeca",

          secondary: "#d8dfe9",

          accent: "#eff0a3",

          neutral: "#E7DCC8",

          "base-100": "#EDF0EB",

          info: "#38bdf8",

          success: "#10b981",

          warning: "#fde68a",

          error: "#fda4af",
          black: "#212121",
        },
      },
    ],
  },
};
