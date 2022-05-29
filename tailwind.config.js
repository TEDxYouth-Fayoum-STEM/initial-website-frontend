const extractColorsPlugin = require("./tailwind/colors-props");

module.exports = {
  content: [
    "**/*.{vue,ts,html,css}",
  ],
  plugins: [extractColorsPlugin],
  darkMode: "class",
  theme: {
    extend: {},
  },
};
