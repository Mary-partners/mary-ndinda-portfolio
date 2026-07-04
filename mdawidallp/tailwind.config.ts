import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary voice: a clean, classic professional navy. This is the
        // audit-firm convention (KPMG, EY, Bates White) and reads far more
        // premium than a muddy near-black.
        ink: {
          DEFAULT: "#0f2a4a",
          50: "#eef3f9",
          100: "#dbe6f1",
          200: "#b6cbe1",
          300: "#87a8cd",
          400: "#5580b2",
          500: "#356198",
          600: "#254c7c",
          700: "#1b3c64",
          800: "#132f4f",
          900: "#0f2a4a",
          950: "#091d36",
        },
        // The accent: a confident emerald. Used for calls to action, active
        // states, and moments that signal assurance and growth.
        teal: {
          DEFAULT: "#0f8a5f",
          50: "#eafaf3",
          100: "#cdf2e1",
          200: "#9ee5c6",
          300: "#66d2a5",
          400: "#33b985",
          500: "#12a06d",
          600: "#0f8a5f",
          700: "#0c6e4d",
          800: "#0b573e",
          900: "#0a4834",
        },
        // A restrained champagne, used only as a whisper of warmth against
        // the navy and emerald. Never the loud accent.
        gold: {
          DEFAULT: "#c6a15b",
          50: "#faf6ec",
          100: "#f3e9cf",
          200: "#e8d3a1",
          300: "#dabd75",
          400: "#cdaa5f",
          500: "#c6a15b",
          600: "#a8843f",
          700: "#856733",
          800: "#6b532d",
          900: "#584628",
        },
        sand: {
          DEFAULT: "#f7f9fb",
          50: "#fbfcfe",
          100: "#f4f7fa",
          200: "#e9eef4",
          300: "#dbe3ec",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,42,74,0.04), 0 12px 34px -14px rgba(15,42,74,0.14)",
        lift: "0 4px 10px rgba(15,42,74,0.06), 0 24px 48px -18px rgba(15,42,74,0.24)",
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
