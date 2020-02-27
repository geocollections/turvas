const getters = {
  getArea: state => {
    return state.area;
  },

  getAreaSites: state => {
    return state.areaSites;
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
  },

  getSite: state => {
    return state.site;
  },

  getSiteSamples: state => {
    return state.siteSamples;
  },

  filteredSiteHeaders: (state, getters) => {
    return state.siteHeaders.filter(header => {
      if (getters.getSite[header.value]) {
        return header;
      }
    });
  },

  getSiteSampleHeaders: state => {
    return state.siteSampleHeaders;
  },

  getSample: state => {
    return state.sample;
  },

  filteredSampleHeaders: (state, getters) => {
    return state.sampleHeaders.filter(header => {
      if (getters.getSample[header.value]) {
        return header;
      }
    });
  },

  getListCounties: state => {
    return state.listCounties;
  }
};

export default getters;
