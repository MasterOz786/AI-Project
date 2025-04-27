/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // Deep blue
        secondary: "#10B981", // Emerald green
        accent: "#F59E0B", // Amber
      },
    },
  },
  plugins: [],
};
