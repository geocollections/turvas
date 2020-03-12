const actions = {
  updateMapState({ commit }, bool) {
    commit("SET_MAP_STATE", bool);
  },

  updateBlock({ commit }, payload) {
    commit("UPDATE_BLOCK", payload);
  }
};

export default actions;
