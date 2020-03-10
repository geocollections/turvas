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

  SET_SAMPLE_ANALYTICAL_DATA(state, analyticalData) {
    state.sampleAnalyticalData = analyticalData;
  },

  SET_LIST_COUNTIES(state, counties) {
    state.listCounties = counties;
  },

  SET_AREA_GEOMETRY(state, geometry) {
    state.areaGeometry = geometry;
  },

  SET_AREA_REFERENCES(state, references) {
    state.areaReferences = references;
  }
};

export default mutations;
