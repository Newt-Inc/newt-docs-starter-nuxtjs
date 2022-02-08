<template>
  <dl class="Nav_Contents">
    <dt @click="toggleMenu">
      <svg
        v-if="isOpen"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#888"
          fill-rule="nonzero"
          d="M13.825 7.15833333 10 10.975 6.175 7.15833333l-1.175 1.175 5 4.99999997 5-4.99999997z"
        />
      </svg>
      <svg v-else width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#888"
          fill-rule="nonzero"
          d="m8.33333333 5-1.175 1.175L10.975 10l-3.81666667 3.825 1.175 1.175 4.99999997-5z"
        />
      </svg>
      {{ category.name }}
    </dt>
    <dd v-if="isOpen">
      <ul>
        <li v-for="article in articles" :key="article._id">
          <NuxtLink :to="`/article/${article.slug}`">{{
            article.title
          }}</NuxtLink>
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: null,
    },
    articles: {
      type: Array,
      default: () => [],
    },
    current: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  created() {
    if (
      this.current &&
      this.category &&
      this.current.category._id === this.category._id
    ) {
      this.isOpen = true
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style scoped>
.Nav_Contents {
  margin: 0 0 12px 0;
  padding: 0;
}
.Nav_Contents dt {
  margin: 0 0 8px -4px;
  padding: 0;
  font-size: 1.5rem;
  position: relative;
  cursor: pointer;
  display: inline-block;
}
.Nav_Contents dt svg {
  position: relative;
  top: 4px;
  left: 2px;
  margin: 0 4px 0 0;
}
.Nav_Contents dd {
  margin: 0 0 20px 8px;
  padding: 0;
  border-left: 1px solid #e5e5e5;
}
.Nav_Contents dd ul {
  margin: 0;
  padding: 0 0 0 8px;
}
.Nav_Contents dd ul li {
  font-size: 1.4rem;
  margin: 0;
  padding: 0 0 0 24px;
  list-style: none;
}
.Nav_Contents dd ul li a {
  color: #888;
  padding: 3px 0;
  display: inline-block;
  text-decoration: none;
  position: relative;
  transition: color 0.2s;
}
.Nav_Contents dd ul li a::after {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: #888;
  position: absolute;
  left: -18px;
  top: 14px;
}
.Nav_Contents dd ul li a:hover {
  color: #333;
}
.Nav_Contents dd ul li .nuxt-link-active {
  color: #333;
  font-weight: bold;
}
.Nav_Contents dd ul li a[aria-current='true']::after {
  background: #333;
}
</style>
