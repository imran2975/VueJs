<template>
  <nav>
    <v-app-bar app>
      <v-app-bar-nav-icon
        variant="text"
        class="text-grey"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase">
        <span class="text-grey font-weight-light">Dev</span>
        <span class="text-warning">Blog</span>
      </v-app-bar-title>
      <v-btn
        append-icon="mdi-logout"
        variant="tonal"
        id="btn"
        class="d-none d-lg-flex d-xl-none"
        @click="handleSignOut"
        v-if="user"
      >
        SING OUT
      </v-btn>
      <v-btn
        append-icon="mdi-logout"
        variant="tonal"
        id="btn"
        class="d-none d-lg-flex d-xl-none"
        router
        to="/sign-in"
        v-if="!user"
      >
        SING IN
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="bg-blue-grey-darken-1">
      <v-list color="transparent">
        <v-list-item
          v-if="user && profileInfos"
          v-show="authIsReady"
          :prepend-avatar="profileImage"
          :title="profileInfos.firstName + profileInfos.lastName"
          :subtitle="profileInfos.email"
        ></v-list-item>
        <v-list-item
          v-if="!user && !profileInfos"
          v-show="!authIsReady"
          prepend-avatar="/placeholder.png"
          title="......"
          subtitle="....."
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Home"
          router
          to="/"
          :class="{ active: $route.path === '/' }"
          id="link"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-post"
          title="Blogs"
          router
          to="/blogs"
          :class="{ active: $route.path === '/blogs' }"
          id="link"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-gavel"
          title="Admin"
          router
          to=""
          :class="{ active: $route.path === '/admin' }"
          id="link"
          v-if="user && user.email === admin"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-circle"
          title="Profile"
          router
          to="/profile"
          :class="{ active: $route.path === '/profile' }"
          id="link"
          v-if="user"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-pencil-plus"
          title="Create post"
          router
          to="/create-post"
          :class="{ active: $route.path === '/create-post' }"
          id="link"
          v-if="user"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-book-open-page-variant"
          title="Study"
          router
          to="/study"
          :class="{ active: $route.path === '/study' }"
          id="link"
          v-if="user"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-comment-check"
          title="Contact us"
          router
          to="/contact-us"
          :class="{ active: $route.path === '/contact-us' }"
          id="link"
          v-if="user"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="handleSignOut" v-if="user"> Logout </v-btn>
          <v-btn block router to="/sign-in" v-if="!user"> Login </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const profileImage = computed(() => store.state.userImage);
    const profileInfos = computed(() => store.state.userData);
    const admin = "imranabubakar943@gmail.com";

    const drawer = ref(false);

    const handleSignOut = () => {
      store.dispatch("signout");
    };

    return {
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady),
      profileImage,
      profileInfos,
      drawer,
      admin,
      handleSignOut,
    };
  },
};
</script>

<style scoped>
#link:hover {
  color: #fff;
}
.active {
  background: #ffffffcc !important;
  color: #000 !important;
}

#btn {
  font-weight: bold;
}
</style>
