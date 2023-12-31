export default defineNuxtPlugin(() => {
    const nuxtApp = useNuxtApp()
    nuxtApp.hooks.hook('page:finish', async () => {
      document.querySelector('[data-scroll]')?.scrollTo({ top: 0 })
    })
  })