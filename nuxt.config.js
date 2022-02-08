import { resolve } from 'path'
import { createClient } from 'newt-client-js'

const config = {
  projectUid: 'プロジェクトUID',
  appUid: 'AppUID',
  token: 'CDN APIトークン',
  apiType: 'cdn',
  articleModelUid: 'article',
  categoryModelUid: 'category',
}

export default {
  publicRuntimeConfig: {
    ...config,
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Docs',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  alias: {
    utils: resolve(__dirname, './utils'),
  },

  router: {
    async extendRoutes(routes, resolve) {
      const client = createClient({
        projectUid: config.projectUid,
        token: config.token,
        apiType: config.apiType,
      })
      const { items } = await client.getContents({
        appUid: config.appUid,
        modelUid: config.articleModelUid,
        query: {
          depth: 2,
          order: ['sortOrder'],
          select: ['title', 'slug'],
          limit: 1000,
        },
      })
      items.forEach((item) =>
        routes.push({ name: item.title, path: `/article/${item.slug}` })
      )
    },
  },
}
