/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",'./node_modules/@tailwindui/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        meteor: "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },},
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
        'display': ["Satisfy", "Press Start 2P"],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
    "compilerOptions": {
      // ...
      "baseUrl": ".",
      "paths": {
        "@/*": [
          "./src/*"
        ]
      }
      // ...
    }
};