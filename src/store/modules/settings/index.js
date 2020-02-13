import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  isSplitView: true,
  isMapView: false,
  isDataView: false
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
