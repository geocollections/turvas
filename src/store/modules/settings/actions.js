const actions = {
  updateMapState({ commit }, bool) {
    commit("SET_MAP_STATE", bool);
  }
};

export default actions;
