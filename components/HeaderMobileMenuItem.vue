<template>
  <dl class="MobileMenu_Contents">
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
          <a :href="`/article/${article.slug}`">{{ article.title }}</a>
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
  },
  data() {
    return {
      isOpen: false,
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
.MobileMenu_Contents {
  margin: 0 0 20px 0;
  padding: 0;
}
.MobileMenu_Contents dt {
  margin: 0;
  padding: 8px 16px;
  font-size: 1.4rem;
  position: relative;
  cursor: pointer;
  display: block;
  background: #fff;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.MobileMenu_Contents dt svg {
  position: relative;
  top: 4px;
  left: 2px;
  margin: 0 4px 0 0;
}
.MobileMenu_Contents dd {
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #e5e5e5;
}
.MobileMenu_Contents dd ul {
  margin: 0;
  padding: 0;
  border: none;
}
.MobileMenu_Contents dd ul li {
  font-size: 1.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.MobileMenu_Contents dd ul li a {
  padding: 10px 24px 10px 44px;
  border: none;
  position: relative;
}
.MobileMenu_Contents dd ul li a::after {
  content: '';
  width: calc(100% - 44px);
  height: 1px;
  position: absolute;
  background: #e5e5e5;
  left: 44px;
  bottom: 0;
}
.MobileMenu_Contents dd ul li:last-child a::after {
  content: none;
}
</style>
