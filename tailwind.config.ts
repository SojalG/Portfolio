import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./scenes/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#090612",
        frost: "#f4ecff",
        signal: "#b185ff",
        ember: "#7b4dff",
        violet: "#8f6bff"
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 42px rgba(177, 133, 255, 0.3)",
        ember: "0 0 54px rgba(123, 77, 255, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
