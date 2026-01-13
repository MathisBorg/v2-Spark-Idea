/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Spark brand colors
        spark: {
          primary: "#ACFF73",
          secondary: "#A3E683",
          dark: "#0B0F19",
        },
        // Background colors
        bg: {
          default: "#0B0F19",
          secondary: "#121621",
          tertiary: "#1F242F",
        },
        // Text colors
        fg: {
          primary: "#F5F5F6",
          secondary: "#9C9C9D",
          tertiary: "#94969C",
        },
        // Border colors
        bd: {
          primary: "#333741",
          secondary: "#1F242F",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
