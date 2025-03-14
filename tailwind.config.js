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
          primary: "#becfbb",

          secondary: "#d1ccf3",

          accent: "#caddf4",

          neutral: "#E7DCC8",

          "base-100": "#EDF0EB",

          info: "#a5f3fc",

          success: "#d9f99d",

          warning: "#fef9c3",

          error: "#fee2e2",
        },
      },
    ],
  },
};
