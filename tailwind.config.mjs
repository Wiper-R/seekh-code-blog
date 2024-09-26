/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-background": "rgb(var(--primary-background))",
        start: "rgb(var(--start))",
        end: "rgb(var(--end))",
        border: "rgb(var(--border))",
      },
    },
  },
  plugins: [],
};
