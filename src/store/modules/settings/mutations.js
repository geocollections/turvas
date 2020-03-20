const mutations = {
  SET_MAP_STATE(state, bool) {
    state.showMap = bool;
  },

  UPDATE_BLOCK(state, payload) {
    let items = [...state.block[payload.route]];
    items[payload.index] = payload.value;

    state.block[payload.route] = items;
  },

  UPDATE_COOKIE_LAW(state, bool) {
    state.cookieLaw = bool;
  }
};

export default mutations;
