/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        productSans: ['Product Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        primaryDarkMode: '#202124',
        secondary: '#666',
        tertiary: '#999',
        quaternary: '#ccc',
        quinary: '#fff',
      },
    },
  },
  plugins: [],
};
