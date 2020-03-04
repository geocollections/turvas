import {sortItems} from "vuetify/lib/util/helpers";

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
  },

  SET_LIST_PARAMETERS(state, parameters) {
    let sortedParams = parameters.sort()
    state.listParameters = sortedParams;
  },

  UPDATE_SAMPLE_HEADERS(state, listOfParams) {
    const SAMPLE_HEADERS_LENGTH = 6;
    if (state.sampleHeaders.length > SAMPLE_HEADERS_LENGTH)
      state.sampleHeaders.length = SAMPLE_HEADERS_LENGTH;

    let newHeaders = [];
    if (listOfParams && listOfParams.length > 0) {
      listOfParams.forEach(param => {
        newHeaders.push({
          text: param.name,
          value: param.value,
          align: "center"
        });
      });
    }

    state.sampleHeaders = [...state.sampleHeaders, ...newHeaders];
  }
};

export default mutations;
