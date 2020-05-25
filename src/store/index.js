import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import settings from "./modules/settings";
import search from "./modules/search";
import detail from "./modules/detail";
import error from "./modules/error";
import success from "./modules/success";
import map from "./modules/map";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "turvas.geoloogia.info_v1.0.5",
  storage: window.localStorage,
  reducer: state => ({ settings: state.settings })
});

export default new Vuex.Store({
  modules: {
    settings,
    search,
    detail,
    error,
    success,
    map
  },
  plugins: [vuexLocal.plugin],
  strict: process.env.NODE_ENV !== "production"
});
