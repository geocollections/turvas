const mutations = {
  SET_FAST_SEARCH(state, stringVal) {
    state.fastSearch = stringVal;
  },

  SET_AREA_RESULTS(state, results) {
    state.areaResults = results;
  },

  SET_AREA_RESULTS_COUNT(state, count) {
    state.areaResultsCount = count;
  },

  SET_AREA_SEARCH_PARAMS(state, params) {
    state.areaSearchParams = { ...params };
  },

  SET_SITE_RESULTS(state, results) {
    state.siteResults = results;
  },

  SET_SITE_RESULTS_COUNT(state, count) {
    state.siteResultsCount = count;
  },

  SET_SITE_SEARCH_PARAMS(state, params) {
    state.siteSearchParams = { ...params };
  },

  SET_SAMPLE_RESULTS(state, results) {
    state.sampleResults = results;
  },

  SET_SAMPLE_RESULTS_COUNT(state, count) {
    state.sampleResultsCount = count;
  },

  SET_SAMPLE_SEARCH_PARAMS(state, params) {
    state.sampleSearchParams = { ...params };
  }
};

export default mutations;
