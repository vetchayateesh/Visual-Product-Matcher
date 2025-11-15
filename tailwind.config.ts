import { type Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './components/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        'glass': '0 8px 32px rgba(15, 23, 42, 0.08)',
        'card': '0 10px 30px rgba(2,6,23,0.12)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

export default config
