const mutations = {
  SET_FAST_SEARCH(state, stringVal) {
    state.fastSearch = stringVal;
  },

  SET_FAST_SEARCH_COUNT(state, count) {
    state.fastSearchCount = count;
  },

  SET_FAST_SEARCH_RESULTS(state, arrOfResults) {
    state.fastSearchResults = arrOfResults;
  }
};

export default mutations;
