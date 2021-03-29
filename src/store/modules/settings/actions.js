const actions = {
  updateMapState({ commit }, bool) {
    commit("SET_MAP_STATE", bool);
  },

  updateBlock({ commit }, payload) {
    commit("UPDATE_BLOCK", payload);
  },

  closeCookieLaw({ commit }) {
    commit("UPDATE_COOKIE_LAW", false);
  },

  updateLanguage({ commit }, language) {
    commit("UPDATE_LANGUAGE", language);
  }
};

export default actions;
