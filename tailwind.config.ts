import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        velora: {
          black: "#0D0D0E",
          noir: "#141416",
          charcoal: "#1F1F23",
          border: "#E5E1D8",
          darkborder: "#2A2A30",
          cream: "#FAF8F5",
          sand: "#F3EFE6",
          gold: {
            50: "#FAF7EF",
            100: "#F4ECDC",
            200: "#E8D9B8",
            300: "#DAC490",
            400: "#CDB06D",
            500: "#BF9B4A", // Classic Champagne Gold
            600: "#A37F33",
            700: "#7E5F24",
            800: "#5D441B",
            900: "#412E14",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
        gold: "0 4px 20px -2px rgba(191, 155, 74, 0.25)",
        floating: "0 20px 40px -15px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
