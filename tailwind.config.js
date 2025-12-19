/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e11d48',
        dark: '#0b0b10',
        surface: 'rgba(255,255,255,0.04)',
      },
      boxShadow: {
        glow: '0 0 30px rgba(225, 29, 72, 0.3)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at 20% 20%, rgba(225, 29, 72, 0.12), transparent 35%), radial-gradient(circle at 80% 0%, rgba(225, 29, 72, 0.08), transparent 25%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
