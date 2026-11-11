import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#10253F",
          50: "#eef2f7",
          100: "#d6e0ec",
          200: "#aec2d8",
          300: "#7d9bbd",
          400: "#4f74a0",
          500: "#1E3A5F",
          600: "#17304f",
          700: "#10253F",
          800: "#0c1d32",
          900: "#081322",
        },
        gold: {
          DEFAULT: "#B69A57",
          50: "#faf6ec",
          100: "#f1e8cf",
          200: "#e3d2a2",
          300: "#d2b872",
          400: "#c4a65f",
          500: "#B69A57",
          600: "#977d41",
          700: "#776234",
        },
        ink: {
          DEFAULT: "#172331",
          muted: "#64748B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F5F7FA",
        },
        ok: "#15803d",
        warn: "#b45309",
        bad: "#b91c1c",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,37,63,0.04), 0 10px 30px -18px rgba(16,37,63,0.25)",
        panel: "0 10px 40px -12px rgba(16,37,63,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
