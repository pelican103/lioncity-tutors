/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // This tells Tailwind to scan ALL relevant files inside the /src folder
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Your "Dynamic Motivator" palette from the previous step goes here
      colors: {
        'brand': {
          'primary': '#EA580C',
          'secondary': '#1E3A8A',
        },
        'accent': '#F97316',
        'background': {
          'primary': '#FFFFFF',
          'secondary': '#F1F5F9',
        },
        'text': {
          'primary': '#1E293B',
          'inverted': '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
};