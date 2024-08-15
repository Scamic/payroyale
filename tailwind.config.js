/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",'./node_modules/@tailwindui/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'royale-blue': '#2E3A59',
        'royale-gold': '#F9D132',
        blue: "#2997FF",
        gray: {
          DEFAULT: "#86868b",
          100: "#94928d",
          200: "#afafaf",
          300: "#42424570",
        },
        zinc: "#101010",
      },
      fontFamily: {
        'clash': ['"Clash Royale"', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
};