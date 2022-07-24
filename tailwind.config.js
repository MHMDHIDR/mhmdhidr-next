module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif']
      },
      animation: {
        shake: 'shake 200ms 2 cubic-bezier(0.18, 0.94, 1, 1) both'
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translate(.5rem, 0)' },
          '25%': { transform: 'translate(-.5rem, 0)' },
          '50%': { transform: 'translate(.7rem, 0)' },
          '75%': { transform: 'translate(-.7rem, 0)' },
          '100%': { transform: 'translate(0, 0)' }
        }
      }
    }
  },
  plugins: []
}
