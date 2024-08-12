import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {'landing-bg': "url('/images/landing-bg.jpg')", 'flashcard-bg': "url('/images/flashcard-bg.png')"},
      fontFamily: {
        breul:['breul'],
        barlow:['barlow'],
      }
    },
  },
  plugins: [],
};
export default config;
