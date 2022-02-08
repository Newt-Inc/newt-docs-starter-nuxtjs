<template>
  <nav class="Nav">
    <div class="Nav_Search">
      <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.3890873 1.6109127c1.81744 1.81743998 2.0970461 4.59036739.8388184 6.7018035l3.3116969 3.3126728c.3547755.3547755.3257954.9589604-.0647289 1.3494847-.3626297.3626297-.9094871.4135198-1.2698126.1348865l-.0796721-.0701576-3.22015474-3.21985629C6.7465078 11.5258295 3.60410194 11.3822765 1.6109127 9.3890873c-2.1478836-2.14788361-2.1478836-5.63029099 0-7.7781746 2.14788361-2.1478836 5.63029099-2.1478836 7.7781746 0zM2.95984943 2.95984943c-1.40288642 1.40288642-1.40288642 3.67741472 0 5.08030114 1.40288642 1.40288642 3.67741472 1.40288642 5.08030114 0 1.40288642-1.40288642 1.40288642-3.67741472 0-5.08030114-1.40288642-1.40288642-3.67741472-1.40288642-5.08030114 0z"
          fill="#333"
          fill-rule="nonzero"
        />
      </svg>
      <form action="/search">
        <input
          ref="target"
          v-model="searchText"
          name="q"
          type="search"
          placeholder="Search"
        />
      </form>
    </div>
    <NavigationMenuItem
      v-for="category in categories"
      :key="category._id"
      :category="category"
      :articles="getArticlesOfCategory(category._id)"
      :current="current"
    />
  </nav>
</template>

<script>
export default {
  props: {
    current: {
      type: Object,
      default: null,
    },
    articles: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchText: this.$route.query.q || '',
    }
  },
  methods: {
    getArticlesOfCategory(categoryId) {
      return this.articles.filter(
        (article) => article.category && article.category._id === categoryId
      )
    },
  },
}
</script>

<style scoped>
.Nav {
  max-width: 240px;
  width: 30%;
  margin: 0 60px 0 0;
  padding: 60px 0 20px 0;
  position: sticky;
  top: 50px;
  overflow: auto;
  height: calc(100vh - 153px);
  display: none;
}
@media (min-width: 600px) {
  .Nav {
    display: block;
  }
}
.Nav_Search {
  position: relative;
}
.Nav_Search svg {
  position: absolute;
  left: 12px;
  top: 12px;
  opacity: 0.2;
}
.Nav_Search input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px 16px 10px 36px;
  border-radius: 4px;
  margin: 0 0 36px 0;
  transition: border 0.2s;
  appearance: none;
}
.Nav_Search input:hover {
  border: 1px solid #888;
}
.Nav_Search input:focus {
  outline-offset: 0;
}
</style>
