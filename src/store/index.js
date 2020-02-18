import Vue from "vue";
import Vuex from "vuex";
import settings from "./modules/settings";
import search from "./modules/search";
import detail from "./modules/detail";
import error from "./modules/error";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    search,
    detail,
    error
  },
  strict: process.env.NODE_ENV !== "production"
});
