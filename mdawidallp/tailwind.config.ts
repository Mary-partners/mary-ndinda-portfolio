import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep, considered ink — the firm's primary voice.
        ink: {
          DEFAULT: "#0a1929",
          50: "#eef2f6",
          100: "#d5dee8",
          200: "#a7b9cc",
          300: "#7391ae",
          400: "#496b8e",
          500: "#2f4f72",
          600: "#1d3a5a",
          700: "#132c47",
          800: "#0d2038",
          900: "#0a1929",
          950: "#06111d",
        },
        // Muted, minted teal — assurance and clarity.
        teal: {
          DEFAULT: "#1c6b64",
          50: "#edf7f5",
          100: "#d3ece8",
          200: "#a4d7cf",
          300: "#6ebbb0",
          400: "#409a8f",
          500: "#2a7f75",
          600: "#1c6b64",
          700: "#175450",
          800: "#144340",
          900: "#113635",
        },
        // Restrained gold — the premium accent, used sparingly.
        gold: {
          DEFAULT: "#b8912f",
          50: "#fbf7ea",
          100: "#f5ebc9",
          200: "#ebd692",
          300: "#dfbe56",
          400: "#d0a739",
          500: "#b8912f",
          600: "#9a7526",
          700: "#7a5b22",
          800: "#634a20",
          900: "#533f1f",
        },
        sand: {
          DEFAULT: "#f6f3ec",
          50: "#fdfcf9",
          100: "#f9f6ef",
          200: "#f1ece0",
          300: "#e6ddca",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
      },
      letterSpacing: {
        widest2: "0.24em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,25,41,0.04), 0 12px 34px -14px rgba(10,25,41,0.16)",
        lift: "0 4px 10px rgba(10,25,41,0.06), 0 24px 48px -18px rgba(10,25,41,0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
