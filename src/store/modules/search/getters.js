const getters = {
  getFastSearch: state => {
    return state.fastSearch;
  },

  getFastSearchCount: state => {
    return state.fastSearchCount;
  },

  getFastSearchResults: state => {
    return state.fastSearchResults;
  }
};

export default getters;
