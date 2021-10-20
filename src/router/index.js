import Vue from "vue";
import VueRouter from "vue-router";

import EnterPage from "../pages/EnterPage.vue";

import NotFound from "../pages/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/enter",
    name: "enter",
    component: EnterPage,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
