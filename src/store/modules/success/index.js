const state = {
  success: false,
  successMessage: ""
};

const actions = {
  updateSuccessState({ commit }, bool) {
    commit("SET_SUCCESS_STATE", bool);
  },

  updateSuccessMessage({ commit }, message) {
    commit("SET_SUCCESS_MESSAGE", message);
  }
};

const mutations = {
  SET_SUCCESS_STATE(state, bool) {
    state.success = bool;
  },

  SET_SUCCESS_MESSAGE(state, message) {
    state.successMessage = message;
  }
};

const getters = {
  getSuccessState: state => {
    return state.success;
  },

  getSuccessMessage: state => {
    return state.successMessage;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
