<template>
  <Article v-if="currentArticle" :article="currentArticle" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ $config, params, store }) {
    await store.dispatch('fetchApp', $config)
    await store.dispatch('fetchCategories', $config)
    await store.dispatch('fetchArticles', $config)
    await store.dispatch('fetchCurrentArticle', {
      ...$config,
      slug: params.slug,
    })
    return {}
  },
  head() {
    return {
      title: this.currentArticle ? this.currentArticle.title : this.siteTitle,
    }
  },
  computed: {
    ...mapGetters(['app', 'currentArticle', 'siteTitle']),
  },
}
</script>
