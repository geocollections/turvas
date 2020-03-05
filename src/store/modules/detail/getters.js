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
    if (state.sampleTaxa && state.sampleTaxa.length > 0) {
      return state.sampleTaxa.filter(taxon => taxon.taxon_id);
    } else return state.sampleTaxa;
  },

  getSampleAnalyses: state => {
    return state.sampleAnalyses;
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
  }
};

export default getters;
