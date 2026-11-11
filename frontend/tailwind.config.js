/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        campo: {
          navy: '#071C46',
          deep: '#061638',
          secondary: '#0B2452',
          teal: '#00C5B5',
          'teal-dark': '#009E91',
          light: '#F7F9FC',
          surface: '#F4F7FB',
          ink: '#14213D',
          muted: '#64748B',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 2px rgba(7, 28, 70, 0.04), 0 8px 24px -10px rgba(7, 28, 70, 0.08)',
        'workspace': '0 1px 3px rgba(7, 28, 70, 0.05), 0 24px 60px -18px rgba(7, 28, 70, 0.14)',
        'elevated': '0 4px 12px -2px rgba(7, 28, 70, 0.06), 0 20px 44px -12px rgba(7, 28, 70, 0.1)',
      },
      backgroundImage: {
        'grid-subtle':
          'linear-gradient(to right, rgba(7, 28, 70, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(7, 28, 70, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-56': '56px 56px',
      },
    },
  },
  plugins: [],
};
