import { defineNuxtConfig } from "nuxt";
import eslintPlugin from "vite-plugin-eslint";

const IS_PROD = process.env.NODE_ENV === "production";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  vite: {
    plugins: [eslintPlugin()],
  },
  css: ["assets/styles/main.css"],
  build: {
    analyze: true,
    extractCSS: IS_PROD,
    optimizeCSS: IS_PROD,
    transpile: [],
    postcss: {
      postcssOptions: require("./postcss.config"),
    },
  },
});
