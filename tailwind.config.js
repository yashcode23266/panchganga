/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mandal: {
          ivory: '#fbfdf8',
          cream: '#f4f8ef',
          green: '#0d3f23',
          leaf: '#5d8f32',
          mint: '#e8f4df',
          gold: '#d6b94e',
          saffron: '#e09f3e',
          ink: '#1d2d22',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 16px 38px rgba(13, 63, 35, 0.12)',
      },
    },
  },
  plugins: [],
};
