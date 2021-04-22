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
    if (state.listParameters && state.listParameters.length > 0) {
      let distinctList = state.listParameters.filter(
        param => state.activeListParameters.indexOf(param) === -1
      );
      return [mustSeeParam, ...distinctList];
    } else return [mustSeeParam];
  },

  getDistinctSampleResults: state => {
    return Array.from(
      new Set(state.sampleResults.map(sample => sample.site))
    ).map(site => {
      return state.sampleResults.find(sample => sample.site === site);
    });
  },

  getListAreasAsArray: state => {
    if (state.listAreas && state.listAreas.length > 0)
      return state.listAreas.map(area => area.name);
    else return [];
  }
};

export default getters;
