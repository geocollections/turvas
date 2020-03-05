const getters = {
  getFastSearch: state => {
    return state.fastSearch;
  },

  getAreaHeaderNames: state => {
    return state.areaHeaders.map(header => header.value);
  },

  getSiteHeaderNames: state => {
    return state.siteHeaders.map(header => header.value);
  },

  getSampleHeaderNames: state => {
    return state.sampleHeaders.map(header => header.value);
  },

  distinctListParameters: state => mustSeeParam => {
    let distinctList = state.listParameters.filter(
      param => state.activeListParameters.indexOf(param) === -1
    );
    return [mustSeeParam, ...distinctList];
  },

  getDistinctSampleResults: state => {
    return state.sampleResults;
    // Todo: Return unique samples by site;
  }
};

export default getters;
