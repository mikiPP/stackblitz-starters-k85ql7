import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/ui/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'backgroud-color-400': '#F9FBFD',
        'backgroud-color-500': '#F3F5F9',
        'background-color-600': '#F1F5F8',
      },
    },
  },
  plugins: [],
};
export default config;
