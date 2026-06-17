import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0B",
          50: "#13131A",
          100: "#1A1A22",
          200: "#22222C",
          300: "#2D2D3A",
        },
        bone: {
          DEFAULT: "#F5F4EF",
          dim: "#B8B7AF",
        },
        gold: {
          DEFAULT: "#E9C46A",
          deep: "#C9A040",
          light: "#F4D77A",
          glow: "#FFD96B",
        },
        silver: {
          DEFAULT: "#D5D5D8",
          deep: "#9C9CA3",
          light: "#EDEDF0",
        },
        bronze: {
          DEFAULT: "#B87333",
          deep: "#8B5A24",
          light: "#D08B4A",
        },
        neon: {
          pink: "#FF2E88",
          magenta: "#D62EFF",
          cyan: "#00E5FF",
          violet: "#7C3AED",
          lime: "#7CFF6B",
        },
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        head: ["var(--font-bebas)", "Impact", "sans-serif"],
        body: ["var(--font-space)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        ultra: "0.32em",
      },
      keyframes: {
        eq: {
          "0%, 100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45", filter: "blur(28px)" },
          "50%": { opacity: "0.85", filter: "blur(36px)" },
        },
        sweep: {
          "0%": { transform: "translateX(-110%) skewX(-20deg)" },
          "100%": { transform: "translateX(220%) skewX(-20deg)" },
        },
        scratch: {
          "0%, 100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-1px, 1px)" },
          "40%": { transform: "translate(1px, -1px)" },
          "60%": { transform: "translate(-2px, 0)" },
          "80%": { transform: "translate(2px, 1px)" },
        },
      },
      animation: {
        eq: "eq 0.9s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        sweep: "sweep 2.6s ease-in-out infinite",
        scratch: "scratch 0.15s steps(2) infinite",
      },
      backgroundImage: {
        "grid-dark":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.4 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
      },
    },
  },
  plugins: [],
};

export default config;
