const mutations = {
  SET_DATA(state, payload) {
    state[payload.table] = payload.data;
  },

  SET_AREA_SITES(state, sites) {
    state.areaSites = sites;
  },

  SET_SITE_DESCRIPTION(state, descriptions) {
    state.siteDescription = descriptions;
  },

  SET_SITE_SAMPLES(state, samples) {
    state.siteSamples = samples;
  },

  SET_SAMPLE_TAXA(state, taxa) {
    state.sampleTaxa = taxa;
  },

  SET_SAMPLE_ANALYSES(state, analyses) {
    state.sampleAnalyses = analyses;
  },

  SET_LIST_COUNTIES(state, counties) {
    state.listCounties = counties;
  },

  SET_AREA_GEOMETRY(state, geometry) {
    state.areaGeometry = geometry;
  }
};

export default mutations;
