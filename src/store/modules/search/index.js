import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  fastSearch: "",
  fastSearchCount: 0,
  fastSearchResults: []
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
