const actions = {
  updateSplitViewState({ commit }, bool) {
    if (typeof bool === "boolean" && bool) {
      commit("SET_MAP_VIEW", !bool);
      commit("SET_DATA_VIEW", !bool);
      commit("SET_SPLIT_VIEW", bool);
    }
  },

  updateMapViewState({ commit }, bool) {
    if (typeof bool === "boolean" && bool) {
      commit("SET_SPLIT_VIEW", !bool);
      commit("SET_DATA_VIEW", !bool);
      commit("SET_MAP_VIEW", bool);
    }
  },

  updateDataViewState({ commit }, bool) {
    if (typeof bool === "boolean" && bool) {
      commit("SET_SPLIT_VIEW", !bool);
      commit("SET_MAP_VIEW", !bool);
      commit("SET_DATA_VIEW", bool);
    }
  }
};

export default actions;
