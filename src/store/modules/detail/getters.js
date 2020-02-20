const getters = {
  getAnalysis: state => {
    return state.analysis;
  },

  getArea: state => {
    return state.area;
  },

  getAreaSites: state => {
    return state.areaSites;
  },

  getListCounties: state => {
    return state.listCounties;
  },

  getSample: state => {
    return state.sample;
  },

  getSite: state => {
    return state.site;
  },

  filteredAreaHeaders: (state, getters) => {
    return state.areaHeaders.filter(header => {
      if (getters.getArea[header.value]) {
        return header;
      }
    });
  },

  getAreaSiteHeaders: state => {
    return state.areaSiteHeaders;
  }
};

export default getters;
