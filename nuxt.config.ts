export default defineNuxtConfig({
  srcDir:'src',
  public: {
    path: '/assets/',
    static: {
      prefix: '/assets/'
    }
  },
 vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styleMixins/_global.scss" as *;',
        }
      }
    }
},

app: {
  
  head: {
    title: 'Qvadro',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'utf-8' },
      { property: 'og:title', content: 'Автоматы продажи воды' },
      { property: 'og:description', content: 'Продажа аппаратов для продажи привозной воды и системами очистки ОСМОС. Узнайте больше о наших продуктах и технологиях на нашем сайте.' },
      { name: 'description',  content: 'Продажа аппаратов для продажи привозной воды и системами очистки ОСМОС. Узнайте больше о наших продуктах и технологиях на нашем сайте.' },
      { 
        name: 'keywords', 
        content: 'аппарат для продажи воды, вендинговый бизнес, привозная вода, система очистки ОСМОС, вендинговые автоматы для воды,аппарат для продажи воды в Харькове' 
      }
    ],
    script: [{src: 'https://www.youtube.com/iframe_api'}],
   
  }
},
modules: [
  '@pinia/nuxt',
  '@nuxtjs/i18n',
  '@nuxt/image'
],
image: {
  cloudinary: {
    baseURL: 'https://res.cloudinary.com/dc8xphyu3/image/upload/v1697336033/Qvadro/'    
  }

  
},
i18n: {
  vueI18n: './src/i18n/i18n.config.js'  
},

  css:[
    '~/assets/styles/global.scss'
  ],
 
  pinia: {
    autoImports: [
     
      'defineStore', 
      ['defineStore', 'definePiniaStore'], 
    ],
  },
 
})

