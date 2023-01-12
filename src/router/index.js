import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlayView from "../views/PlayView.vue";
import GameView from "../views/GameView.vue";
import CreateView from "../views/CreateView.vue";
import CreateGame from "../views/CreateGame.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/play/:id",
    name: "play",
    component: PlayView,
  },
  {
    path: "/game/:id",
    name: "game",
    component: GameView,
  },
  {
    path: "/create",
    name: "create",
    component: CreateView,
  },
  {
    path: "/creategame",
    name: "creategame",
    component: CreateGame,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
