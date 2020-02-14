import Vue from "vue";
import Vuex from "vuex";
import settings from "./modules/settings";
import search from "./modules/search";
import detail from "./modules/detail";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    search,
    detail
  },
  strict: process.env.NODE_ENV !== "production"
});
