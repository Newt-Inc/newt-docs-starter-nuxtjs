<template>
  <Article v-if="currentArticle" :article="currentArticle" />
</template>

<script>
export default {
  async asyncData({ $config, params, store }) {
    await store.dispatch('fetchApp', $config)
    await store.dispatch('fetchCategories', $config)
    await store.dispatch('fetchArticles', $config)
    await store.dispatch('fetchCurrentArticle', {
      ...$config,
      slug: params.slug,
    })
    return {
      app: store.getters.app,
      currentArticle: store.getters.currentArticle,
      siteTitle: store.getters.siteTitle,
    }
  },
  head() {
    return {
      title: this.currentArticle ? this.currentArticle.title : this.siteTitle,
    }
  },
}
</script>
