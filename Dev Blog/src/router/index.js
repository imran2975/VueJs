import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Blogs from "../views/Blogs.vue";
import CreatePost from "../views/CreatePost.vue";
import ContactUs from "../views/ContactUs.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/blogs",
      name: "blogs",
      component: Blogs,
    },
    {
      path: "/create-post",
      name: "create-post",
      component: CreatePost,
    },
    {
      path: "/contact-us",
      name: "contact-us",
      component: ContactUs,
    },
  ],
});

export default router;
