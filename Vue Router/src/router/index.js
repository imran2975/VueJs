import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import Jobs from "../views/Jobs/Jobs.vue";
import JobDetail from "../views/Jobs/JobDetail.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/jobs",
      name: "Jobs",
      component: Jobs,
    },
    {
      path: "/jobs/:id",
      name: "JobDetail",
      component: JobDetail,
      props: true,
    },
    //redirect
    {
      path: "/all-jobs",
      redirect: "/jobs",
    },
    //404 page
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
