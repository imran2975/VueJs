<template>
  <!-- this component is for small screen view -->

  <div class="container bg-dark" :class="{ collapsed: isCollapsed }">
    <!-- if user logged in -->
    <RouterLink to="/profile" class="info">
      <img :src="profileImage" alt="" v-if="user" @click="sidebarToggle" />
    </RouterLink>

    <p class="profileName text-white" v-if="user && profileInfos">
      Welcome {{ profileInfos.firstName }} {{ profileInfos.lastName }}
    </p>
    <RouterLink to="/profile">
      <button class="btn btn-warning" v-if="user" @click="sidebarToggle">
        Edit Profile
      </button>
    </RouterLink>

    <!-- if user not logged in -->
    <img src="/placeholder.png" alt="" v-if="!user" />
    <RouterLink class="nav-link m-2" to="/sign-in" v-if="!user">
      <button class="btn btn-warning" @click="sidebarToggle">
        LOGIN/REGISTER
        <i class="fa-solid fa-arrow-right fa-fade"></i>
      </button>
    </RouterLink>

    <div class="list-group">
      <RouterLink
        to="/"
        class="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom m-1"
        :class="{ active: $route.path === '/' }"
        @click="sidebarToggle"
        >Home</RouterLink
      >
      <RouterLink
        to="/blogs"
        class="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom m-1"
        :class="{ active: $route.path === '/blogs' }"
        @click="sidebarToggle"
        >Blogs</RouterLink
      >
      <RouterLink
        to="/create-post"
        class="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom m-1"
        :class="{ active: $route.path === '/create-post' }"
        v-if="user"
        @click="sidebarToggle"
        >Create post</RouterLink
      >

      <RouterLink
        to="/"
        class="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom m-1"
        :class="{ active: $route.path === '/product' }"
        @click="sidebarToggle"
        >Study</RouterLink
      >
      <RouterLink
        to="/contact-us"
        class="list-group-item list-group-item-action bg-dark text-white border-0 border-bottom m-1"
        :class="{ active: $route.path === '/contact-us' }"
        v-if="user"
        @click="sidebarToggle"
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
      props.sidebarToggle();
    };

    const closeSidebar = () => {
      props.sidebarToggle();
    };

    // Emit the sidebar-toggle event on component mount
    onMounted(() => {
      emit("sidebar-toggle", props.isCollapsed);
    });

    const user = computed(() => store.state.user);

    // Watch for changes in the isCollapsed prop and add/remove the 'collapsed' class accordingly

    return {
      profileImage,
      profileInfos,
      handleClick,
      user,
      closeSidebar,
    };
  },
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
    sidebarToggle: Function,
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
  z-index: 5;
  line-height: 20px;
  transition: margin-left 0.3s ease-in-out;
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
  border: 2px solid #fdb924;
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
