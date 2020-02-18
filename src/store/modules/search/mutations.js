const mutations = {
  SET_FAST_SEARCH(state, stringVal) {
    state.fastSearch = stringVal;
  },

  SET_FAST_SEARCH_COUNT(state, count) {
    state.fastSearchCount = count;
  },

  SET_FAST_SEARCH_RESULTS(state, arrOfResults) {
    state.fastSearchResults = arrOfResults;
  },

  SET_AREA_RESULTS(state, results) {
    state.areaResults = results;
  },

  SET_AREA_RESULTS_COUNT(state, count) {
    state.areaResultsCount = count;
  }
};

export default mutations;
