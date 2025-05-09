// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx,html}',
      './public/index.html',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        colors: {
          primary: '#2563eb',
          secondary: '#3b82f6',
          accent: '#f97316',
          background: '#f9fafb',
        },
      },
    },
    plugins: [],
  };
  