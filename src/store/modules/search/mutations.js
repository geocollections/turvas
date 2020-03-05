import { sortItems } from "vuetify/lib/util/helpers";

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
    state.listParameters = parameters;
  },

  INIT_ACTIVE_LIST_PARAMETERS(state, parameters) {
    state.activeListParameters = [parameters[0], parameters[1]];
  },

  UPDATE_SAMPLE_HEADERS(state, listOfParams) {
    const SAMPLE_HEADERS_LENGTH = 7;
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
  },

  UPDATE_ACTIVE_LIST_PARAMETERS(state, payload) {
    state.activeListParameters.splice(payload.index, 1, payload.event);
  },

  UPDATE_ACTIVE_LIST_PARAMETER(state, payload) {
    let activeObject = state.activeListParameters[payload.index];

    activeObject[payload.key] = payload.newValue;

    if (activeObject.isText) {
      if (
        activeObject.text &&
        activeObject.lookUpType &&
        activeObject.text.length > 0
      ) {
        let query = activeObject.text;
        if (activeObject.lookUpType === "sisaldab")
          query = `*${activeObject.text}*`;
        else if (activeObject.lookUpType === "võrdub")
          query = activeObject.text;
        else if (activeObject.lookUpType === "algab")
          query = `${activeObject.text}*`;
        else if (activeObject.lookUpType === "lõpeb")
          query = `*${activeObject.text}`;
        activeObject.query = query;
      } else activeObject.query = "";
    } else {
      if (activeObject.start || activeObject.end) {
        activeObject.query = `[${
          activeObject.start ? activeObject.start : "*"
        } TO ${activeObject.end ? activeObject.end : "*"}]`;
      } else activeObject.query = "";
    }
  },

  ADD_ACTIVE_LIST_PARAMETER(state) {
    let nextUniqueParam = state.listParameters.find(
      param => state.activeListParameters.indexOf(param) === -1
    );

    if (nextUniqueParam) {
      state.activeListParameters = [
        ...state.activeListParameters,
        nextUniqueParam
      ];
    }
  },

  REMOVE_ACTIVE_LIST_PARAMETER(state, index) {
    state.activeListParameters.splice(index, 1);
  },

  SET_SHOWN_ACTIVE_LIST_PARAMETERS(state, list) {
    state.shownActiveListParameters = list;
  }
};

export default mutations;
