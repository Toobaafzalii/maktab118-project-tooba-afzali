import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "app-display": ["app-display-font", "sans-serif"],
        "app-peyda": ["app-peyda-black", "sans-serif"],
        "app-peyda-bold": ["app-peyda-bold", "sans-serif"],
        "app-peyda-extrabold": ["app-peyda-extrabold", "sans-serif"],
        "app-peyda-extralight": ["app-peyda-extralight", "sans-serif"],
        "app-peyda-light": ["app-peyda-light", "sans-serif"],
        "app-peyda-medium": ["app-peyda-medium", "sans-serif"],
        "app-peyda-regular": ["app-peyda-regular", "sans-serif"],
        "app-peyda-semibold": ["app-peyda-semibold", "sans-serif"],
        "app-peyda-thin": ["app-peyda-thin", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
