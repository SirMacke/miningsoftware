import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Miningsoftware',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          charset: 'utf-8'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Miningsoftware',
        },
        {
          name: 'keywords',
          content: 'Miningsoftware'
        },
        {
          name: 'author',
          content: 'Miningsoftware'
        },
        {
          name: 'application-name',
          content: 'Miningsoftware'
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge'
        },
        {
          name: 'og:title',
          content: 'Miningsoftware'
        },
        {
          name: 'og:description',
          content: 'Miningsoftware'
        },
        {
          name: 'og:type',
          content: 'website'
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.ico' },
      ],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/sass/variables.sass"'
        },
      },
    },
  },
  nitro: {
    plugins: [
      "~/server/db.js"
    ]
  },
  buildModules: [
    ['@nuxt-modules/compression', {
      algorithm: 'brotliCompress'
    }]
  ],
  optimization: {
    splitChunks: {
      maxSize: 300000
    }
  },
});
