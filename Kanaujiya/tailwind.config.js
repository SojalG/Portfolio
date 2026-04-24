/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#02030a",
        neon: {
          blue: "#57e8ff",
          violet: "#9b5cff",
          soft: "#9dd8ff",
        },
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(87, 232, 255, 0.18)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(87,232,255,0.12), transparent 38%), linear-gradient(180deg, rgba(155,92,255,0.1), transparent 32%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "hero-grid-size": "100% 100%, 100% 100%, 120px 120px, 120px 120px",
      },
    },
  },
  plugins: [],
};
