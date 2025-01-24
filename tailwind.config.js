/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
    themes: ["light", "dark", "retro"],
  },
};
