/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '360': '360deg', // Agrega rotaciones personalizadas
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Animación de giro lento
      },
    },
  },
  plugins: [],
}
