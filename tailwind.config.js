/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        arena: {
          black: '#05070d',
          navy: '#09111f',
          panel: '#101827',
          cyan: '#35d6ff',
          mint: '#4ade80',
          gold: '#facc15',
          coral: '#fb7185'
        }
      },
      boxShadow: {
        glow: '0 0 34px rgba(53, 214, 255, 0.22)',
        panel: '0 20px 80px rgba(0, 0, 0, 0.35)'
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.72' },
          '50%': { opacity: '1' }
        }
      }
    }
  },
  plugins: []
};
