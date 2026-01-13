/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Spark brand colors - Orange/Black theme
        spark: {
          primary: "#FF8C00",      // Orange principal
          secondary: "#FFA500",    // Orange secondaire
          gold: "#FFD700",         // Or/Jaune pour accents
          dark: "#000000",         // Noir profond
        },
        // Background colors - Dark theme
        bg: {
          default: "#000000",      // Fond noir
          secondary: "#0A0A0A",    // Noir légèrement plus clair
          tertiary: "#141414",     // Gris très foncé
        },
        // Text colors
        fg: {
          primary: "#FFFFFF",      // Blanc pur
          secondary: "#CCCCCC",    // Gris clair
          tertiary: "#999999",     // Gris moyen
        },
        // Border colors
        bd: {
          primary: "#FF8C00",      // Bordures orange
          secondary: "#333333",    // Bordures grises
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
