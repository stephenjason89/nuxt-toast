export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-01-20',
  toast: {
    settings: {
      position: 'topRight',
      timeout: 5000,
    },
  },
})
