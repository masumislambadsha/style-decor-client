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
