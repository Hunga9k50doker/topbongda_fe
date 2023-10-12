/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,jsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...colors,
        orangeDark: {
          700: "#756e5f",
          800: "#655e50",
          900: "#524b3f",
        },
      },
    },

    boxShadow: {
      deep: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    },
    fontSize: {
      "3xs": ["0.45rem", "0.75rem"],
      "2xs": ["0.65rem", "0.9rem"],
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "4rem",
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  // xwind options
  xwind: {
    mode: "objectstyles",
  },
  daisyui: {
    styled: true,
    base: false,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
    themes: [
      {
        mytheme: {
          primary: "#0C9512",

          secondary: "#fda068",

          accent: "#f87459",

          neutral: "#b5e0b5",

          "base-100": "#FFFFFF",

          info: "#1092e7",

          success: "#007F4F",

          warning: "#fdd439",

          error: "#F25C45",

          "primary-content": "#ffffff",
        },
      },
    ],
  },
};
