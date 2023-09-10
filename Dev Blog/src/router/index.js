import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Blogs from "../views/Blogs.vue";
import CreatePost from "../views/CreatePost.vue";
import ContactUs from "../views/ContactUs.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Profile from "../views/Profile.vue";
import ViewPost from "../views/ViewPost.vue";
import ResetPassword from "../views/ResetPassword.vue";

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
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignIn,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
    },

    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },

    {
      path: "/reset",
      name: "reset",
      component: ResetPassword,
    },

    {
      path: "/view-post/:postId/:coverImageRef",
      name: "view-post",
      component: ViewPost,
    },
  ],
});

export default router;
