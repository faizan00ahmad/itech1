import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#08090C",
          2: "#121419",
          3: "#1A1D23",
        },
        accent: {
          DEFAULT: "#F5B700",
          deep: "#A87A00",
          dim: "rgba(245, 183, 0, 0.15)",
          glow: "rgba(245, 183, 0, 0.4)",
        },
        silver: {
          DEFAULT: "#C9CED6",
          light: "#F1F2F4",
          dark: "#8A919C",
          dim: "rgba(201, 206, 214, 0.15)",
        },
        surface: {
          DEFAULT: "rgba(255, 255, 255, 0.04)",
          hover: "rgba(255, 255, 255, 0.08)",
          border: "rgba(255, 255, 255, 0.08)",
        },
        paper: "#EEF0F2",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "18px",
        "3xl": "28px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "section": "clamp(100px, 13vw, 180px)",
      },
      animation: {
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "marquee": "marquee 30s linear infinite",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        "pulse-dot": {
          "50%": { boxShadow: "0 0 0 10px rgba(245, 183, 0, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
