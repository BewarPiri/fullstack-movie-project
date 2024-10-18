/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, // Use the imported DaisyUI plugin
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "valentine"],
  },
};
