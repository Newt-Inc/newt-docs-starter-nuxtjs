<template>
  <header class="Header">
    <div class="Header_Inner">
      <NuxtLink to="/" class="Title">
        <span
          v-if="icon && icon.type === 'emoji' && icon.value"
          class="Title_Icon"
          >{{ icon.value }}
        </span>
        <span
          v-else-if="icon && icon.type === 'image' && icon.value"
          class="Title_Icon"
        >
          <img :src="icon.value" />
        </span>
        <div class="Title_Text">{{ title }}</div>
      </NuxtLink>
      <div class="Link">
        <a
          href="https://github.com/Newt-Inc/newt-docs-starter-nuxtjs"
          rel="noreferrer noopener"
          target="_blank"
          >GitHub</a
        >
      </div>
      <div class="MobileSearch">
        <button class="MobileSearch_Button" @click="focusInput">
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.3890873 1.6109127c1.81744 1.81743998 2.0970461 4.59036739.8388184 6.7018035l3.3116969 3.3126728c.3547755.3547755.3257954.9589604-.0647289 1.3494847-.3626297.3626297-.9094871.4135198-1.2698126.1348865l-.0796721-.0701576-3.22015474-3.21985629C6.7465078 11.5258295 3.60410194 11.3822765 1.6109127 9.3890873c-2.1478836-2.14788361-2.1478836-5.63029099 0-7.7781746 2.14788361-2.1478836 5.63029099-2.1478836 7.7781746 0zM2.95984943 2.95984943c-1.40288642 1.40288642-1.40288642 3.67741472 0 5.08030114 1.40288642 1.40288642 3.67741472 1.40288642 5.08030114 0 1.40288642-1.40288642 1.40288642-3.67741472 0-5.08030114-1.40288642-1.40288642-3.67741472-1.40288642-5.08030114 0z"
              fill="#333"
              fill-rule="nonzero"
            />
          </svg>
        </button>
        <form action="/search">
          <div class="Search_Input">
            <input
              ref="target"
              v-model="searchText"
              name="q"
              type="search"
              placeholder="Search"
            />
          </div>
        </form>
      </div>
      <button class="MobileMenuButton" :class="{ isShow }" @click="toggleMenu">
        <span></span>
      </button>
      <div v-if="isShow" class="MobileMenu">
        <ul>
          <li>
            <a href="/" aria-current="true">{{ title }}</a>
          </li>
          <li>
            <a
              href="https://github.com/Newt-Inc/newt-docs-starter-nuxtjs"
              rel="noreferrer noopener"
              target="_blank"
              >GitHub</a
            >
          </li>
        </ul>
        <HeaderMobileMenuItem
          v-for="category in categories"
          :key="category._id"
          :category="category"
          :articles="getArticlesOfCategory(category._id)"
        />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    app: {
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
      isShow: false,
      searchText: this.$route.query.q || '',
      scrollPosition: 0,
    }
  },
  computed: {
    title() {
      return (this.app && (this.app.name || this.app.uid)) || 'Docs'
    },
    icon() {
      return (this.app && this.app.icon) || { type: 'emoji', value: '📖' }
    },
  },
  methods: {
    focusInput() {
      this.$refs.target.focus()
      const $body = document.querySelector('body')
      $body.style.removeProperty('overflow')
      $body.style.removeProperty('position')
      $body.style.removeProperty('top')
      $body.style.removeProperty('width')
      window.scrollTo(0, this.scrollPosition)
      this.isShow = false
    },
    toggleMenu() {
      const $body = document.querySelector('body')
      if (this.isShow === false) {
        this.scrollPosition = window.pageYOffset
        $body.style.overflow = 'hidden'
        $body.style.position = 'fixed'
        $body.style.width = '100%'
        $body.style.top = `-${this.scrollPosition}px`
        this.isShow = true
      } else {
        $body.style.removeProperty('overflow')
        $body.style.removeProperty('position')
        $body.style.removeProperty('top')
        $body.style.removeProperty('width')
        window.scrollTo(0, this.scrollPosition)
        this.isShow = false
      }
    },
    toggleItems(index) {
      this.$set(this.isOpen, index, !this.isOpen[index])
    },
    getArticlesOfCategory(categoryId) {
      return this.articles.filter(
        (article) => article.category && article.category._id === categoryId
      )
    },
  },
}
</script>

<style scoped>
.Header {
  top: 0;
  background: #fff;
  z-index: 2;
  position: fixed;
  width: calc(100% - 22px);
  padding: 8px 8px 8px 14px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}
.Header_Inner {
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
}
.Title {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  min-width: 0;
}
.Title_Icon {
  width: 20px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
  margin: 0 10px -2px 0;
}
.Title_Icon img {
  width: 26px;
  height: 26px;
  object-fit: cover;
  font-family: 'object-fit: cover'; /* IE11 */
  border-radius: 4px;
}
.Title_Text {
  font-size: 1.6rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (min-width: 600px) {
  .Header {
    padding: 9px 60px;
    width: calc(100% - 120px);
  }
}
.MobileSearch {
  margin-left: auto;
  position: relative;
  display: block;
}
.MobileSearch input {
  font-size: 1.6rem;
  height: 34px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
  opacity: 0;
  background: #fff;
  border: none;
  padding: 0 12px;
  border-radius: 4px;
  appearance: none;
  outline-offset: 0;
}
.MobileSearch input:focus {
  opacity: 1;
  z-index: 1;
}
@media (min-width: 600px) {
  .MobileSearch {
    display: none;
  }
}
.MobileSearch_Button {
  height: 34px;
  width: 34px;
  border: none;
  background: none;
  border-radius: 4px;
  transition: background 0.2s;
  cursor: pointer;
  position: relative;
  z-index: 0;
}
.MobileSearch_Button:hover {
  background: #f0f0f0;
}
.MobileSearch_Button:active {
  background: none;
  transition: none;
}
.MobileSearch_Button > svg {
  position: absolute;
  left: 10px;
  top: 10px;
}
.MobileMenuButton {
  display: block;
  height: 34px;
  width: 34px;
  border: none;
  background: none;
  border-radius: 4px;
  transition: background 0.2s;
  cursor: pointer;
  position: relative;
  z-index: 0;
}
.MobileMenuButton:hover {
  background: #f0f0f0;
}
.MobileMenuButton:active {
  background: none;
  transition: none;
}
.MobileMenuButton.isShow span {
  background: none;
}
.MobileMenuButton.isShow span::before {
  transform: rotate(-45deg);
  top: 0;
}
.MobileMenuButton.isShow span::after {
  transform: rotate(45deg);
  top: 0;
}
.MobileMenuButton span {
  width: 16px;
  height: 2px;
  background: #333;
  position: absolute;
  left: 10px;
  top: 16px;
  border-radius: 1px;
}
.MobileMenuButton span::before {
  content: '';
  width: 16px;
  height: 2px;
  background: #333;
  position: absolute;
  left: 0;
  top: 6px;
  border-radius: 1px;
}
.MobileMenuButton span::after {
  content: '';
  width: 16px;
  height: 2px;
  background: #333;
  position: absolute;
  left: 0;
  top: -6px;
  border-radius: 1px;
}
@media (min-width: 600px) {
  .MobileMenuButton {
    display: none;
  }
}
.MobileMenu {
  position: fixed;
  top: 51px;
  left: 0;
  width: 100%;
  background: #f8f8f8;
  height: calc(100% - 51px);
  z-index: 1;
  display: none;
  overflow: auto;
  padding: 0;
  display: block;
}
.MobileMenu >>> ul {
  margin: 20px 0;
  padding: 0;
  border-top: 1px solid #e5e5e5;
}
.MobileMenu >>> ul li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.MobileMenu >>> ul li a {
  display: block;
  font-size: 1.4rem;
  color: #333;
  text-decoration: none;
  padding: 8px 24px;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
}
.MobileMenu >>> ul li a[aria-current='true'] {
  font-weight: bold;
}
@media (min-width: 600px) {
  .MobileMenu {
    display: none;
  }
}
.Link {
  margin: 0 0 0 auto;
  display: none;
}
.Link > a {
  color: #888;
  text-decoration: none;
  transition: color 0.2s;
  padding: 3px 12px;
}
.Link > a:hover {
  color: #333;
}
@media (min-width: 600px) {
  .Link {
    display: block;
  }
}
</style>
