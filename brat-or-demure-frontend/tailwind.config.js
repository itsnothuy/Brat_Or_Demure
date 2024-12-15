/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'royal-blue': '#8a49a1',
        'dark-pink': '#e56969',
        'orange': '#ffc273',
        'purple': '#c1558b',
        'purple-red': '#ffdf9e',
        'red': '#ff6f6f', // Approximate red
        'yellow': '#fff475', // Approximate yellow
      },
      backgroundImage: {
        'gradient-instagram': 'linear-gradient(to bottom right, #8a49a1, #e56969, #ffc273, #c1558b, #ffdf9e, #ff6f6f, #fff475)',
      },
    },
  },
  plugins: [],
};


