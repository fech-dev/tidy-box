// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "nuxt-firebase-emulators",
    "nuxt-vuefire",
    "@nuxt/eslint",
  ],

  ssr: false,
  css: ["~/assets/css/main.css"],
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-11-27",

  devtools: { enabled: true },

  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
    auth: { enabled: true },
  },
});
