/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a5f3f",
        secondary: "#2d7a4f",
        accent: "#b8956a",
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        light: "#f9fafb",
        dark: "#1f2937",
        "text-primary": "#1f2937",
        "text-secondary": "#6b7280",
        "text-muted": "#9ca3af",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
