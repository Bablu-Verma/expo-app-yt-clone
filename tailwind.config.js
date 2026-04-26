/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
    "./context/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ytRed: "#FF0000",
        ytBlack: "#0F0F0F",
        ytWhite: "#FFFFFF",
        ytDarkGray: "#272727",
        ytLightGray: "#F2F2F2",
        ytChipDark: "#373737",
        ytChipLight: "#F2F2F2",
        ytChipActiveDark: "#F1F1F1",
        ytChipActiveLight: "#0F0F0F",
        ytTextDark: "#F1F1F1",
        ytTextLight: "#0F0F0F",
        ytSecondaryDark: "#AAAAAA",
        ytSecondaryLight: "#606060",
      },
    },
  },
  plugins: [],
};
