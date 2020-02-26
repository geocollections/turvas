import Vue from "vue";
import Vuex from "vuex";
import settings from "./modules/settings";
import search from "./modules/search";
import detail from "./modules/detail";
import error from "./modules/error";
import success from "./modules/success";
import map from "./modules/map";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    search,
    detail,
    error,
    success,
    map
  },
  strict: process.env.NODE_ENV !== "production"
});
