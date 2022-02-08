<template>
  <div class="Wrapper">
    <Header
      :title="title"
      :icon="icon"
      :articles="articles"
      :categories="categories"
    />
    <main class="Main">
      <Navigation
        :current="currentArticle"
        :articles="articles"
        :categories="categories"
      />
      <Nuxt />
    </main>
    <Badge />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['app', 'categories', 'articles', 'currentArticle']),
    title() {
      return (this.app && this.app.name) || 'Docs'
    },
    icon() {
      return (this.app && this.app.icon && this.app.icon.value) || '✏️'
    },
  },
}
</script>

<style>
html {
  font-size: 62.5%;
  height: 100%;
  scroll-padding-top: 110px;
}
body {
  margin: 0;
  padding: 0;
  font-size: 1.4rem;
  line-height: 1.8;
  color: #333;
  font-family: 'Segoe UI Emoji', 'Helvetica Neue', Arial,
    'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
  -webkit-text-size-adjust: 100%;
  height: 100%;
  overflow-wrap: break-word;
}
a {
  color: #006cdc;
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}
</style>

<style scoped>
.Wrapper {
  width: 100%;
  position: relative;
}
.Main {
  max-width: 1024px;
  margin: 0 auto;
  align-items: flex-start;
  min-height: 0;
  display: block;
  padding: 0;
}
@media (min-width: 600px) {
  .Main {
    display: flex;
    padding: 50px 60px 0 60px;
  }
}
</style>
