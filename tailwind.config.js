/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        asphalt: "#17181B",
        steel: "#2C2F34",
        chrome: "#C9CDD3",
        sunflower: "#F5B700",
        rust: "#E3572B",
        cream: "#F7F5F0",
      },
      fontFamily: {
        display: ["'Barlow Condensed'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
