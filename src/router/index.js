import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView";
import DetailsView from "../views/DetailsView";


Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: HomeView,
  },
  {
    name: "detail",
    path: "/detail/:uuid",
    component: DetailsView,
    props: true,
  }
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
