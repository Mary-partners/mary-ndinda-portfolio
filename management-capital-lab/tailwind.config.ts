import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        navy: {
          DEFAULT: "#0f2a43",
          50: "#eef3f8",
          100: "#d6e2ee",
          200: "#adc4dc",
          300: "#7b9dc0",
          400: "#4d729c",
          500: "#2f5479",
          600: "#1e3f60",
          700: "#163150",
          800: "#0f2a43",
          900: "#0a1e31",
        },
        forest: {
          DEFAULT: "#1f5c47",
          50: "#eef6f2",
          100: "#d6ebe2",
          200: "#a9d5c4",
          300: "#74b8a0",
          400: "#469a7f",
          500: "#2c7d63",
          600: "#1f5c47",
          700: "#194a3a",
          800: "#153c30",
          900: "#0f2c23",
        },
        gold: {
          DEFAULT: "#b8862b",
          50: "#fbf6ea",
          100: "#f4e7c6",
          200: "#e9cd89",
          300: "#dcb14e",
          400: "#cf9c34",
          500: "#b8862b",
          600: "#996d22",
          700: "#79541e",
          800: "#5f421d",
          900: "#4f381b",
        },
        cream: {
          DEFAULT: "#f7f3ea",
          50: "#fdfcf8",
          100: "#f7f3ea",
          200: "#efe7d5",
        },
        // Elegant sticky-note surfaces
        note: {
          yellow: "#fbf4d0",
          blue: "#dcecf7",
          green: "#dcefe0",
          pink: "#f8e2e6",
          cream: "#f4ecdc",
          lavender: "#e7e2f4",
        },
        noteBorder: {
          yellow: "#eddda0",
          blue: "#b9d7ec",
          green: "#b4dcbe",
          pink: "#eebfc8",
          cream: "#e3d3b3",
          lavender: "#cdc3e6",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        note: "0 1px 2px rgba(15,42,67,0.06), 0 8px 20px -8px rgba(15,42,67,0.18)",
        "note-hover": "0 4px 8px rgba(15,42,67,0.08), 0 16px 32px -10px rgba(15,42,67,0.28)",
        soft: "0 1px 2px rgba(15,42,67,0.04), 0 10px 30px -12px rgba(15,42,67,0.14)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
