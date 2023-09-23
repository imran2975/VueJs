<template>
  <!-- this component is for large screen view -->

  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
      <div class="container-fluid">
        <RouterLink
          to="/"
          class="nav-brand h2"
          :class="{ active: $route.path === '/' }"
          >Dev Blog</RouterLink
        >
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav"></ul>
        </div>
        <RouterLink
          to="/"
          class="nav-link m-2"
          :class="{ active: $route.path === '/' }"
          v-if="authIsReady"
          >Home</RouterLink
        >
        <RouterLink
          to="/blogs"
          class="nav-link m-2"
          :class="{ active: $route.path === '/blogs' }"
          v-if="authIsReady"
          >Blogs</RouterLink
        >
        <RouterLink
          to="/create-post"
          class="nav-link m-2"
          :class="{ active: $route.path === '/create-post' }"
          v-if="(authIsReady, user)"
          >Create Post</RouterLink
        >

        <RouterLink
          to="/"
          class="nav-link m-2"
          :class="{ active: $route.path === '/a' }"
          v-if="authIsReady"
          >Study</RouterLink
        >
        <RouterLink
          to="/contact-us"
          class="nav-link m-2"
          :class="{ active: $route.path === '/contact-us' }"
          v-if="(authIsReady, user)"
          >Contact Us</RouterLink
        >

        <RouterLink class="nav-link m-2" to="/sign-in" v-if="!user">
          <button class="btn btn-warning">
            SIGN IN
            <i class="fa-solid fa-arrow-right fa-fade"></i>
          </button>
        </RouterLink>

        <div class="dropdown" v-if="user" v-show="authIsReady">
          <img
            :src="profileImage"
            alt=""
            class="dropdown-toggle m-2"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />

          <ul
            class="dropdown-menu bg-dark text-white"
            aria-labelledby="dropdownMenuLink"
          >
            <div class="info">
              <img :src="profileImage" alt="" />
              <img src="/placeholder.png" alt="" v-if="!authIsReady" />
              <div class="details">
                <div v-if="authIsReady && user && profileInfos">
                  <h6 v-if="profileInfos">
                    {{ profileInfos.firstName }} {{ profileInfos.lastName }}
                  </h6>
                  <p>{{ profileInfos.userName }}</p>
                  <p>{{ user.email }}</p>
                </div>
                <div v-else>hi</div>
              </div>
            </div>
            <RouterLink
              to="/profile"
              class="nav-link dropdown-item m-2"
              :class="{ active: $route.path === '/' }"
              ><i class="fa-regular fa-user fa-fade"></i> Profile</RouterLink
            >
            <RouterLink
              to="/"
              class="nav-link dropdown-item m-2"
              :class="{ active: $route.path === '/' }"
              @click="handleClick"
              ><i class="fa-solid fa-arrow-right-from-bracket fa-fade"></i>
              LogOut</RouterLink
            >
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";

import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const profileImage = computed(() => store.state.userImage);
    const profileInfos = computed(() => store.state.userData);

    const handleClick = () => {
      store.dispatch("signout");
    };

    return {
      profileImage,
      profileInfos,

      handleClick,
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady),
    };
  },
};
</script>

<style scoped>
.nav-brand {
  text-decoration: none;
  color: #fdb924;
}
.navbar {
  box-shadow: 1px 1px 12px #00000075;
  z-index: 1;
}
.nav-link.active {
  color: #fdb924;
  text-shadow: 1px 1px 1px #00000075;
}

.nav-link:hover {
  color: #fdb924;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 72px;
  left: -170px;
}

img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid #00000075;
  object-fit: cover;
}

.dropdown-toggle:hover {
  cursor: pointer;
}

.dropdown-item {
  background: none;
  color: #fff !important;
}

.dropdown-item:hover {
  background: none;
}

.info {
  display: flex;
  gap: 10px;
  padding: 0.5rem;
  border-bottom: 1px solid #83828275;
}

.details {
  line-height: 0;
  font-size: small;
}
</style>
