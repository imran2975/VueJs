<template>
  <!-- this component is for small screen view -->

  <div class="container bg-dark" :class="{ collapsed: isCollapsed }">
    <!-- if user logged in -->
    <RouterLink to="/profile" class="info">
      <img :src="profileImage" alt="" v-if="user" />
    </RouterLink>

    <p class="profileName text-white" v-if="user && profileInfos">
      Welcome {{ profileInfos.firstName }} {{ profileInfos.lastName }}
    </p>
    <RouterLink to="/profile">
      <button class="btn btn-warning" v-if="user">Edit Profile</button>
    </RouterLink>

    <!-- if user not logged in -->
    <img src="/empty-image.png" alt="" v-if="!user" />
    <RouterLink class="nav-link m-2" to="/sign-in" v-if="!user">
      <button class="btn btn-warning">
        LOGIN/REGISTER
        <i class="fa-solid fa-arrow-right fa-fade"></i>
      </button>
    </RouterLink>

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
        v-if="user"
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
        v-if="user"
        >Contact Us</RouterLink
      >
      <RouterLink
        to="/"
        class="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom m-1"
        :class="{ active: $route.path === '/contact' }"
        v-if="user"
        @click="handleClick"
        >Sign Out</RouterLink
      >
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup(props, { emit }) {
    const store = useStore();
    const profileImage = computed(() => store.state.userImage);
    const profileInfos = computed(() => store.state.userData);

    const handleClick = () => {
      store.dispatch("signout");
    };

    // Emit the sidebar-toggle event on component mount
    onMounted(() => {
      emit("sidebar-toggle", props.isCollapsed);
    });

    const user = computed(() => store.state.user);

    return {
      profileImage,
      profileInfos,
      handleClick,
      user,
    };
  },
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
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

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
}

img {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin: 0 0 1rem 1em;
  object-fit: cover;
}

/* .profileName {
  color: #fff;
} */

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
