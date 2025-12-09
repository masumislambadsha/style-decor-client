export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#ff6a4a',
        dark: '#111111',
      },
    },
  },
  plugins: [require('daisyui')],
};
// tailwind.config.cjs
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 2.8s linear infinite",
      },
    },
  },
  plugins: [],
};
