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
import Study from "../views/Study.vue";
import Quiz from "../views/Quiz.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home", // Set the page title for this route
      },
    },
    {
      path: "/blogs",
      name: "blogs",
      component: Blogs,
      meta: {
        title: "Blog Page", // Set the page title for this route
      },
    },
    {
      path: "/create-post",
      name: "create-post",
      component: CreatePost,
      meta: {
        title: "Create post", // Set the page title for this route
      },
    },
    {
      path: "/contact-us",
      name: "contact-us",
      component: ContactUs,
      meta: {
        title: "ContactUs", // Set the page title for this route
      },
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignIn,
      meta: {
        title: "Welcome back", // Set the page title for this route
      },
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp,
      meta: {
        title: "Register", // Set the page title for this route
      },
    },

    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        title: "Profile", // Set the page title for this route
      },
    },

    {
      path: "/reset",
      name: "reset",
      component: ResetPassword,
      meta: {
        title: "Forget password", // Set the page title for this route
      },
    },

    {
      path: "/study",
      name: "study",
      component: Study,
      meta: {
        title: "Study", // Set the page title for this route
      },
    },

    {
      path: "/view-post/:postId/:coverImageRef",
      name: "view-post",
      component: ViewPost,
      meta: {
        title: "View post", // Set the page title for this route
      },
    },
    {
      path: "/quiz/:courseCode",
      name: "quiz",
      component: Quiz,
      meta: {
        title: "Quiz", // Set the page title for this route
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Set the page title based on the route's meta or any other logic
  document.title = `Dev Blog - ${to.meta.title}`;
  next();
});

export default router;
