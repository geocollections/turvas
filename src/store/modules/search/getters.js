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
  }
};

export default getters;
