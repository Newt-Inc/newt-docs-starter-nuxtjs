<template>
  <div class="SearchResult">
    <div class="SearchResult_Text">
      Found {{ numberOfSearchResult }} results for your search
    </div>
    <p v-if="isLoading" class="Empty">Searching...</p>
    <template v-else-if="searchResults.length > 0">
      <div
        v-for="article in searchResults"
        :key="article._id"
        class="SearchResult_Item"
      >
        <div class="SearchResult_ItemUrl">
          {{ `${origin}/article/${article.slug}` }}
        </div>
        <NuxtLink
          :to="`/article/${article.slug}`"
          class="SearchResult_ItemTitle"
        >
          {{ article.title }}
        </NuxtLink>
        <div class="SearchResult_ItemDescription">
          {{ htmlToText(article.body) }}
        </div>
      </div>
    </template>
    <p v-else class="Empty">Please try again with different keywords.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { htmlToText } from 'html-to-text'

export default {
  async asyncData({ $config, store }) {
    await store.dispatch('fetchApp', $config)
    await store.dispatch('fetchCategories', $config)
    await store.dispatch('fetchArticles', $config)
    return {}
  },
  head() {
    return {
      title: `Search | ${this.$route.query.q}`,
    }
  },
  computed: {
    ...mapGetters('search', [
      'searchResults',
      'numberOfSearchResult',
      'isLoading',
    ]),
    ...mapGetters(['siteTitle']),
    origin: () => window.location.origin,
  },
  async created() {
    await this.$store.dispatch('search/searchArticles', {
      ...this.$config,
      searchText: this.$route.query.q || '',
    })
  },
  beforeDestroy() {
    this.$store.dispatch('search/init')
  },
  methods: {
    htmlToText(html) {
      return htmlToText(html, {
        selectors: [
          {
            selector: 'img',
            format: 'skip',
          },
        ],
      })
    },
  },
}
</script>

<style scoped>
.SearchResult {
  padding: 74px 24px 52px 24px;
  flex: 1;
  min-width: 0;
}
.SearchResult_Text {
  margin: 0 0 28px 0;
}
.SearchResult_Item {
  margin: 0 0 28px 0;
}
.SearchResult_ItemUrl {
  font-size: 1.2rem;
}
.SearchResult_ItemTitle {
  font-size: 1.8rem;
  text-decoration: none;
}
.SearchResult_ItemTitle:hover {
  text-decoration: underline;
}
.SearchResult_ItemDescription {
  font-size: 1.4rem;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
@media (min-width: 600px) {
  .SearchResult {
    padding: 60px 0 52px 0;
  }
}
.Empty {
  font-size: 1.6rem;
  margin: -20px 0 0 0;
  color: #888;
}
</style>
