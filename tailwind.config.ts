import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d8ff",
          300: "#a4bfff",
          400: "#7f9cff",
          500: "#5c78ff",
          600: "#4051f5",
          700: "#3341d8",
          800: "#2b36ae",
          900: "#283489",
          950: "#1a1f50",
        },
        galaxy: {
          dark: "#0a0e27",
          darker: "#050812",
          light: "#1a1f3a",
          accent: "#6366f1",
          purple: "#8b5cf6",
          pink: "#ec4899",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.6s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "stars": "stars 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        stars: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-2000px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
