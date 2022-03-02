<template>
  <Article v-if="currentArticle" :article="currentArticle" />
</template>

<script>
import { mapGetters } from 'vuex'
import { htmlToText } from 'html-to-text'
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
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.ogImage,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['currentArticle', 'app']),
    meta() {
      if (this.currentArticle && this.currentArticle.meta) {
        return this.currentArticle.meta
      }
      return null
    },
    title() {
      if (this.meta && this.meta.title) {
        return this.meta.title
      }
      if (this.currentArticle && this.currentArticle.title) {
        return this.currentArticle.title
      }
      return this.app && (this.app.name || this.app.uid || 'Docs')
    },
    description() {
      if (this.meta && this.meta.description) {
        return this.meta.description
      }
      if (this.currentArticle && this.currentArticle.body) {
        return htmlToText(this.currentArticle.body, {
          selectors: [
            {
              selector: 'img',
              format: 'skip',
            },
          ],
        }).slice(0, 200)
      }
      return ''
    },
    ogImage() {
      if (this.meta && this.meta.ogImage) {
        return this.meta.ogImage.src
      }
      return ''
    },
  },
}
</script>
