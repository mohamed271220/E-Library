/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#cdccde",
        secondary: "#3385ff",
        "dim-blue": "#06005c",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        hero: "url('assets/images/collection-background.svg')",
        card: "url('assets/images/thumbnail-background.svg')",
      },
      screens: {
        wide: "1440px",
      },
    },
  },
  plugins: [],
};


// black: {
//           100: "#cdccde",
//           200: "#9b99be",
//           300: "#6a669d",
//           400: "#38337d",
//           500: "#06005c",
//           600: "#05004a",
//           700: "#040037",
//           800: "#020025",
//           900: "#010012"
// },