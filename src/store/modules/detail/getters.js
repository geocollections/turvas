const getters = {
  getArea: state => {
    return state.area;
  },

  getAreaSites: state => {
    return state.areaSites;
  },

  getAreaGeometry: state => {
    return state.areaGeometry;
  },

  getAreaReferences: state => {
    return state.areaReferences;
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

  getSiteDescription: state => {
    return state.siteDescription;
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

  getSiteDescriptionHeaders: state => {
    return state.siteDescriptionHeaders;
  },

  getSiteSampleHeaders: state => {
    return state.siteSampleHeaders;
  },

  getSample: state => {
    return state.sample;
  },

  getSampleTaxa: state => {
    return state.sampleTaxa;
  },

  getSampleAnalyses: state => {
    return state.sampleAnalyses;
  },

  getSampleAnalyticalData: state => {
    return state.sampleAnalyticalData;
  },

  filteredSampleHeaders: (state, getters) => {
    return state.sampleHeaders.filter(header => {
      if (getters.getSample[header.value]) {
        return header;
      }
    });
  },

  getSampleTaxaHeaders: state => {
    return state.sampleTaxaHeaders;
  },

  getSampleAnalysesHeaders: state => {
    return state.sampleAnalysesHeaders;
  },

  getListCounties: state => {
    return state.listCounties;
  },

  getListCountiesAsArray: state => {
    if (state.listCounties !== null) {
      return state.listCounties.map(county => county.maakond);
    } else {
      return [];
    }
  }
};

export default getters;
