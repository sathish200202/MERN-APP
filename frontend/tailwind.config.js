import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('https://wallpaperaccess.com/full/2084291.jpg')",
      },
    },
  },
  plugins: [daisyui],
};
