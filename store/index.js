import { createClient } from 'newt-client-js'
const CATEGORY_MODEL_NAME = 'category'
const ARTICLE_MODEL_NAME = 'article'

export const state = () => ({
  app: null,
  categories: [],
  articles: [],
  currentArticle: null,
})

export const getters = {
  app: (state) => state.app,
  categories: (state) => state.categories,
  articles: (state) => state.articles,
  currentArticle: (state) => state.currentArticle,
  topArticle: (state) => {
    const topCategory = state.categories[0]
    if (!topCategory) return null
    const articles = state.articles.filter(
      (article) => article.category._id === topCategory._id
    )
    return articles[0] || null
  },
  siteTitle: (state) => {
    return (state.app && (state.app.name || state.app.uid)) || 'Docs'
  },
}

export const mutations = {
  setApp(state, app) {
    state.app = app
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setArticles(state, articles) {
    state.articles = articles
  },
  setCurrentArticle(state, article) {
    state.currentArticle = article
  },
}

export const actions = {
  async fetchApp({ commit }, { projectUid, token, apiType, appUid }) {
    try {
      const client = createClient({
        projectUid,
        token,
        apiType,
      })
      const app = await client.getApp({
        appUid,
      })
      commit('setApp', app)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchCategories({ commit }, { projectUid, token, apiType, appUid }) {
    try {
      const client = createClient({
        projectUid,
        token,
        apiType,
      })
      const { items } = await client.getContents({
        appUid,
        modelUid: CATEGORY_MODEL_NAME,
        query: {
          depth: 1,
          order: ['sortOrder'],
          select: ['_id', 'name'],
          limit: 1000,
        },
      })
      commit('setCategories', items)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchArticles({ commit }, { projectUid, token, apiType, appUid }) {
    try {
      const client = createClient({
        projectUid,
        token,
        apiType,
      })
      const { items } = await client.getContents({
        appUid,
        modelUid: ARTICLE_MODEL_NAME,
        query: {
          depth: 2,
          order: ['sortOrder'],
          select: ['title', 'category', 'slug'],
          limit: 1000,
        },
      })
      commit('setArticles', items)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchCurrentArticle(
    { commit },
    { projectUid, token, apiType, appUid, slug }
  ) {
    try {
      const client = createClient({
        projectUid,
        token,
        apiType,
      })
      const { items } = await client.getContents({
        appUid,
        modelUid: ARTICLE_MODEL_NAME,
        query: {
          depth: 2,
          order: ['sortOrder'],
          slug,
        },
      })
      commit('setCurrentArticle', items[0] || null)
    } catch (err) {
      // console.error(err)
    }
  },
}
