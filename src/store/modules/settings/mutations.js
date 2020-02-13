const mutations = {
  SET_SPLIT_VIEW(state, bool) {
    state.isSplitView = bool;
  },

  SET_MAP_VIEW(state, bool) {
    state.isMapView = bool;
  },

  SET_DATA_VIEW(state, bool) {
    state.isDataView = bool;
  }
};

export default mutations;
