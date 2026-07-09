/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111016",
        paper: "#F4F3EE",
        cobalt: "#2B34FF",
        lime: "#C6F135",
        "lime-soft": "#E8FD94",
        periwinkle: "#94ADFF",
        lilac: "#C5B6F1",
        mist: "#E7E4DA",
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        "serif-alt": ["Palatino", "Book Antiqua", "serif"],
      },
      fontSize: {
        mega: "clamp(3.25rem, 13vw, 12rem)",
      },
      maxWidth: {
        page: "1400px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
