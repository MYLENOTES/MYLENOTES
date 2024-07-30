import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {     
    extend: {
      colors: {
        'text': '#dceffe',
        'background': '#00080e',
        'primary': '#7dc5fb',
        'secondary': '#3206a8',
        'accent': '#9620f7',
       },
    },
  },
  plugins: [],
};
export default config;
