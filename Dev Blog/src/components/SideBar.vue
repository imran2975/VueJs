<template>
  <div class="container bg-dark" :class="{ collapsed: isCollapsed }">
    <img src="/Logo.png" alt="" />
    <p class="text-white">Imran Abubakar</p>

    <div class="list-group">
      <RouterLink
        to="/"
        class="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom m-1"
        :class="{ active: $route.path === '/' }"
        >Home</RouterLink
      >
      <RouterLink
        to="/blogs"
        class="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom m-1"
        :class="{ active: $route.path === '/blogs' }"
        >Blogs</RouterLink
      >
      <RouterLink
        to="/create-post"
        class="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom m-1"
        :class="{ active: $route.path === '/create-post' }"
        >Create post</RouterLink
      >

      <RouterLink
        to="/"
        class="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom m-1"
        :class="{ active: $route.path === '/product' }"
        >Portfolio</RouterLink
      >
      <RouterLink
        to="/contact-us"
        class="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom m-1"
        :class="{ active: $route.path === '/contact-us' }"
        >Contact Us</RouterLink
      >
      <RouterLink
        to="/"
        class="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom m-1"
        :class="{ active: $route.path === '/contact' }"
        >Sign Out</RouterLink
      >
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    this.$emit("sidebar-toggle", this.isCollapsed);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  margin-right: 10px;
  height: 100vh;
  width: 20rem;
  position: fixed;
  transition: all 2s;
  z-index: 1;
  line-height: 20px;
}

.container.collapsed {
  margin-left: -20rem;
}

img {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
}

.list-group {
  width: 100%;
  border: none;
}

.list-group-item:hover {
  color: #fdb924 !important;
}

.list-group-item.active {
  color: #fdb924 !important;
}
</style>
