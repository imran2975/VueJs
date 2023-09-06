<template>
  <div>
    <NavBarLarge id="navbar" />

    <!-- start small screen sidebar and contents -->
    <nav class="navbar navbar-light bg-light d-lg-none">
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
      />
      <RouterView id="content" />
    </div>
    <!-- end small screen sidebar and contents -->

    <!-- large screen view -->
    <RouterView id="content" class="d-sm" />

    <!-- footer for all screen size -->
    <Footer id="footer" />
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import NavBarLarge from "./components/NavBarLarge.vue";
import Footer from "./components/Footer.vue";
import { useStore } from "vuex";
import { onMounted, ref as vueRef } from "vue";
import { storage } from "./firebase/config";
import { ref, getDownloadURL } from "firebase/storage";

export default {
  name: "App",
  components: { SideBar, NavBarLarge, Footer },
  setup() {
    const isSidebarCollapsed = vueRef(false);
    const store = useStore();

    function toggleSidebar() {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    }

    // onMounted(() => {
    //   const userId = store.state.user.uid;
    //   getDownloadURL(ref(storage, `image/${userId}.jpg`)).then((download_url) =>
    //     store.commit("setUserImage", download_url)
    //   );
    // });

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
  z-index: 1;
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
