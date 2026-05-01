import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1a1a1a",
        cream: "#f7f3eb",
        tortilla: "#e8dcc4",
        salsa: "#c41e1e",
        ember: "#e85d2a",
        agave: "#4a635f",
        cocoa: "#5c4033",
        plum: "#1f1426",
        "menu-plum": "#24132d",
        "accent-cyan": "#22d3ee",
        "accent-green": "#4ade80",
        "accent-yellow": "#facc15",
        "accent-pink": "#f472b6",
        "accent-orange": "#fb923c",
        "accent-red": "#f87171",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
