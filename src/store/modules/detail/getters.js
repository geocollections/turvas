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
    return state?.siteDescription?.map(item => {
      if (item?.rock?.name) item.rock__name = item.rock.name;
      if (item?.stratigraphy?.stratigraphy)
        item.stratigraphy__stratigraphy = item.stratigraphy.stratigraphy;
      return item;
    });
  },

  getSiteSamples: state => {
    return state.siteSamples;
  },

  filteredSiteHeaders: (state, getters) => {
    return state.siteHeaders.filter(header => {
      if (header.value === "area__text1" && getters?.getSite?.area?.text1)
        return header;
      if (getters.getSite[header.value]) {
        return header;
      }
    });
  },

  getSiteDescriptionHeaders: state => {
    return state.siteDescriptionHeaders;
  },

  getSiteSampleHeaders: state => {
    return state?.siteSampleHeaders?.map(item => {
      if (item?.classification_rock?.name)
        item.classification_rock__name = item.classification_rock.name;
      return item;
    });
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
      if (header.value === "site__area" && getters.getSample?.site?.area)
        return header;
      if (
        header.value === "site__area__maakond__maakond" &&
        getters.getSample?.site?.area?.maakond
      )
        return header;
      if (
        header.value === "stratigraphy__stratigraphy" &&
        getters.getSample?.stratigraphy?.stratigraphy
      )
        return header;
      if (
        header.value === "classification_rock__name" &&
        getters.getSample?.classification_rock?.name
      )
        return header;
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
    if (state.listCounties && state.listCounties.length > 0)
      return state.listCounties.map(county => county.maakond);
    else return [];
  }
};

export default getters;
