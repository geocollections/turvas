const mutations = {
  SET_DATA(state, payload) {
    state[payload.table] = payload.data;
  },

  SET_ERROR_STATE(state, bool) {
    state.error = bool;
  },

  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message;
  }
};

export default mutations;
