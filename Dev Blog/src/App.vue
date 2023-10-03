<template>
  <v-app>
    <NavBar />

    <v-content class="mt-15">
      <RouterView />
    </v-content>

    <!-- <NavBarLarge id="navbar" /> -->

    <!-- start small screen sidebar and contents -->
    <!-- <nav class="navbar navbar-light bg-light d-lg-none">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Dev Blog</span>
        <button class="toggle-btn btn btn-warning" @click="toggleSidebar">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>
    <div class="wrap d-lg-none">
      <SideBar
        :isCollapsed="isSidebarCollapsed"
        class="side-bar"
        @sidebar-toggle="toggleSidebar"
        :sidebarToggle="toggleSidebar"
      />
      <RouterView id="content" />
    </div> -->
    <!-- end small screen sidebar and contents -->

    <!-- large screen view -->
    <!-- <RouterView id="content" class="d-sm" /> -->

    <!-- footer for all screen size -->
    <Footer id="footer" />
  </v-app>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import { useStore } from "vuex";
import { onMounted, ref as vueRef } from "vue";

export default {
  name: "App",
  components: { SideBar, NavBar, Footer },
  setup() {
    const isSidebarCollapsed = vueRef(false);
    const store = useStore();

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

#content {
  margin-top: 5rem;
}

#navbar,
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
}

.toggle-btn {
  z-index: 1;
}

@media (max-width: 576px) {
  #navbar,
  .d-sm {
    display: none;
  }
  #content,
  .side-bar {
    margin-top: 3.4rem;
  }
}
</style>
