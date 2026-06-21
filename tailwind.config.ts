import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0A0807",
          warm: "#110906",
          deep: "#050403",
        },
        cognac: {
          DEFAULT: "#8B4513",
          light: "#C8862E",
        },
        brass: {
          DEFAULT: "#B8924C",
          bright: "#C8A65E",
          glow: "#D9B26F",
        },
        offwhite: "#F4EFE6",
        warmgrey: "#B5A89A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.4em",
        nav: "0.28em",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.22, 1, 0.36, 1)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      transitionDuration: {
        major: "1200ms",
        micro: "400ms",
      },
    },
  },
  plugins: [],
};
export default config;
