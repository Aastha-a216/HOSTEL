/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        'brand-blue': '#0057FF',
        'brand-pink': '#FF6B9D',
        'brand-yellow': '#FFD600',
        'brand-black': '#0A0A0A',
        'brand-off': '#F0F0F0',
      },
      boxShadow: {
        'brutal': '8px 8px 0px #0A0A0A',
        'brutal-sm': '4px 4px 0px #0A0A0A',
        'brutal-lg': '12px 12px 0px #0A0A0A',
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
};
