const state = {
  error: false,
  errorMessage: ""
};

const actions = {
  updateErrorState({ commit }, bool) {
    commit("SET_ERROR_STATE", bool);
  },

  updateErrorMessage({ commit }, message) {
    commit("SET_ERROR_MESSAGE", message);
  }
};

const mutations = {
  SET_ERROR_STATE(state, bool) {
    state.error = bool;
  },

  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message;
  }
};

const getters = {
  getErrorState: state => {
    return state.error;
  },

  getErrorMessage: state => {
    return state.errorMessage;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
