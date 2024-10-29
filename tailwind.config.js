import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        cerulean: {
          50: "#f1f9fe",
          100: "#e2f3fc",
          200: "#bde7fa",
          300: "#83d5f6",
          400: "#42bfee",
          500: "#19a8de",
          600: "#0c87bd",
          700: "#0b6c99",
          800: "#0d5b7f",
          900: "#114c69",
          950: "#0b3046",
          hover: "#0A2A3E",
        },
        error: {
          500: "#ffb4ab",
          600: "#73342d",
          700: "#561e19",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
