/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',  // Include your paths to source files
  ],
  theme: {
    extend: {
      // Custom theme extensions (colors, fonts, spacing, etc.)
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),  // Aspect Ratio plugin for image sizing
    // Add other plugins here if needed
  ],
}
