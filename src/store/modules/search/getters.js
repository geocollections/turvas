const getters = {
  getFastSearch: state => {
    return state.fastSearch;
  },

  getFastSearchCount: state => {
    return state.fastSearchCount;
  },

  getFastSearchResults: state => {
    return state.fastSearchResults;
  },

  getAreaHeaderNames: state => {
    return state.areaHeaders.map(header => header.value);
  },

  getSiteHeaderNames: state => {
    return state.siteHeaders.map(header => header.value);
  }
};

export default getters;
