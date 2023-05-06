<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light pt-3 pb-3">
      <div class="container-fluid">
        <h1 class="navbar-brand" href="#"><a>Vuex Auth</a></h1>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
          ref="navbarMenu"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <div class="nav-item">
              <router-link to="/" class="nav-link active" @click="collapseMenu"
                >Home</router-link
              >
            </div>
            <div class="nav-item">
              <router-link to="/" class="nav-link" @click="collapseMenu"
                >News</router-link
              >
            </div>
            <div class="nav-item">
              <router-link to="/" class="nav-link" @click="collapseMenu"
                >Features</router-link
              >
            </div>
            <div class="nav-item">
              <router-link to="/" class="nav-link" @click="collapseMenu"
                >Products</router-link
              >
            </div>

            <!-- for logged out users -->
            <div v-if="!user" class="nav-item">
              <router-link to="/login" class="nav-link" @click="collapseMenu"
                >Login</router-link
              >
            </div>

            <div class="nav-item" v-if="!user">
              <router-link to="/signup" class="nav-link" @click="collapseMenu"
                >Signup</router-link
              >
            </div>
          </ul>
          <!-- for logged in users -->
          <div v-if="user" class="nav-item flex-nowrap">
            <span>Logged in as {{ user.email }}</span>
            <button class="btn btn-danger" @click="handleClick">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const handleClick = () => {
      store.dispatch("logOut");
    };

    const navbarMenu = ref(null);

    const collapseMenu = () => {
      navbarMenu.value.classList.remove("show");
    };

    return {
      handleClick,
      collapseMenu,
      navbarMenu,
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady),
    };
  },
};
</script>
