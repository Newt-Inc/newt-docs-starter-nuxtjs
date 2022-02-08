import { createClient } from 'newt-client-js'

const ARTICLE_MODEL_NAME = 'article'

export const state = () => ({
  searchText: '',
  isLoading: false,
  searchResults: [],
  numberOfSearchResult: 0,
})

export const getters = {
  searchText: (state) => state.searchText,
  isLoading: (state) => state.isLoading,
  searchResults: (state) => state.searchResults,
  numberOfSearchResult: (state) => state.numberOfSearchResult,
}

export const mutations = {
  setSearchText(state, searchText) {
    state.searchText = searchText
  },
  setIsLoading(state, isLoading = false) {
    state.isLoading = isLoading
  },
  setSearchResults(state, articles = []) {
    state.searchResults = articles
  },
  setNumberOfSearchResult(state, number = 0) {
    state.numberOfSearchResult = number
  },
}

export const actions = {
  init: ({ commit }) => {
    commit('setSearchText', '')
    commit('setIsLoading', true)
    commit('setSearchResults', [])
    commit('setNumberOfSearchResult', 0)
  },
  searchArticles: async (
    { commit },
    { projectUid, token, apiType, appUid, searchText }
  ) => {
    try {
      commit('setSearchText', searchText)
      commit('setIsLoading', true)
      commit('setSearchResults', [])
      commit('setNumberOfSearchResult', 0)

      const query = {
        body: {
          fmt: 'text',
        },
        or: [
          {
            title: {
              match: searchText,
            },
          },
          {
            body: {
              match: searchText,
            },
          },
        ],
      }

      const client = createClient({
        projectUid,
        token,
        apiType,
      })
      const { items, total } = await client.getContents({
        appUid,
        modelUid: ARTICLE_MODEL_NAME,
        query: {
          depth: 2,
          order: ['sortOrder'],
          select: ['title', 'category', 'slug', 'body'],
          limit: 1000,
          ...query,
        },
      })

      commit('setSearchResults', items)
      commit('setNumberOfSearchResult', total)
      commit('setIsLoading', false)
    } catch (err) {
      commit('setIsLoading', false)
    }
  },
}
