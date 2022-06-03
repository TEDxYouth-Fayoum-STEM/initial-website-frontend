const extractColorsPlugin = require("./tailwind/colors-props");

module.exports = {
  content: ["**/*.{vue,html,css}"],
  plugins: [extractColorsPlugin, require("@tailwindcss/forms")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#e62b1e",
          300: "#ff2b06",
          200: "#ff4949",
          100: "#fe9f9f",
          50: "#ffebe9",
        },
        dark: "#191d24",
        light: "#f7f7f7",
        brand: {
          fb: "#4267b2",
          ig: "#c13584",
          tw: "#1da1f2",
          ln: "#0a66c2",
          yt: "#ff0000",
        },
        error: "#b00020",
      },
    },
  },
};
