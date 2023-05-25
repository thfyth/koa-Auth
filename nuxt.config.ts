// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { "http-equiv": "x-ua-compatible", content: "IE=edge" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      ],
      link: [{ rel: "icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    BASE_URL: "",
  },

  srcDir: "src/",
  dir: {
    public: "../public/",
  },
  build: {
    transpile: ["primevue"],
  },

  nitro: {
    preset: "vercel",
  },

  imports: {
    autoImport: true,
    addons: {
      vueTemplate: true,
    },
  },
  css: [
    "primevue/resources/primevue.css",
    "primeflex/primeflex.css",
    "primeicons/primeicons.css",
    "~/assets/styles/layout.scss",
  ],

  modules: [
    // "nuxt-icon",
    "@pinia/nuxt",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "dayjs-nuxt",
    "@nuxtjs/device",
    // "nuxt-typed-router",
    "~/modules/primevue",
  ],

  vite: {
    build: {
      sourcemap: false,
    },
    clearScreen: true,
    logLevel: "info",
  },
});
