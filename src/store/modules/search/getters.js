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

  distinctActiveListParameters: state => {
    if (state.activeListParameters && state.activeListParameters.length > 0) {
      return state.activeListParameters.filter(
        (element, index, array) => array.indexOf(element) === index
      );
    } else return [];
  }
};

export default getters;
