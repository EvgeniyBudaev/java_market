/** @type {import('tailwindcss').Config} */

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}), ${opacityValue})`;
  };
}

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue('--color-primary'),
      }
    },
  },
  plugins: [],
}
