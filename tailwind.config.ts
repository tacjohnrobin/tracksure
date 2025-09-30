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
        brand: {
          DEFAULT: "#1f5e6b",
          light: "#2d7a8a",
          dark: "#153f47",
          base: "#eceef1"
        },
      },
    },
  },
  plugins: [],
};

export default config;
