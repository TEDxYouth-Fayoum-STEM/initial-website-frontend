import { defineNuxtConfig } from "nuxt";
import eslintPlugin from "vite-plugin-eslint";

const IS_PROD = process.env.NODE_ENV === "production";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    log: process.env.LOG,
    logPwd: process.env.LOG_PWD,
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  typescript: {
    strict: true,
  },
  vite: {
    plugins: [eslintPlugin()],
    css: { postcss: "postcss.config" },
  },
  css: [
    "swiper/css",
    "swiper/css/navigation",
    "swiper/css/pagination",
    "animate.css/animate.min.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "@vueform/multiselect/themes/default.css",
    "sweetalert2/dist/sweetalert2.min.css",
    "assets/styles/wheel.scss",
    "assets/styles/main.css",
  ],
  build: {
    analyze: true,
    extractCSS: IS_PROD,
    optimizeCSS: IS_PROD,
    transpile: [
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons",
    ],
    postcss: { postcssOptions: require("./postcss.config") },
  },
});
