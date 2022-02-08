<template>
  <div>Loading...</div>
</template>

<script>
export default {
  async asyncData({ store, $config, redirect }) {
    await store.dispatch('fetchCategories', $config)
    await store.dispatch('fetchArticles', $config)
    const article = store.getters.topArticle
    if (article) redirect(302, `/article/${article.slug}`)
    return {}
  },
}
</script>
