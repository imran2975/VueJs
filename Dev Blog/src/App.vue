<template>
  <div>
    <NavBarLarge id="navbar" />
    <nav class="navbar navbar-light bg-light d-lg-none">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Dev Blog</span>
        <button class="toggle-btn btn btn-warning" @click="toggleSidebar">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>
    <div class="wrap">
      <SideBar
        :isCollapsed="isSidebarCollapsed"
        class="side-bar"
        @sidebar-toggle="toggleSidebar"
      />
      <RouterView />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import SideBar from "./components/SideBar.vue";
import NavBarLarge from "./components/NavBarLarge.vue";

export default {
  name: "App",
  components: { SideBar, NavBarLarge },
  setup() {
    const isSidebarCollapsed = ref(false);

    function toggleSidebar() {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    }

    return {
      isSidebarCollapsed,
      toggleSidebar,
    };
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
  position: relative;
}

.toggle-btn {
  z-index: 1;
}

@media (max-width: 576px) {
  #navbar {
    display: none;
  }
}
</style>
