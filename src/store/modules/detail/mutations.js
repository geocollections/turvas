const mutations = {
  SET_DATA(state, payload) {
    state[payload.table] = payload.data;
  },

  SET_AREA_SITES(state, sites) {
    state.areaSites = sites;
  },

  SET_SITE_DESCRIPTION(state, sites) {
    state.siteDescription = sites;
  },

  SET_SITE_SAMPLES(state, sites) {
    state.siteSamples = sites;
  },

  SET_LIST_COUNTIES(state, counties) {
    state.listCounties = counties;
  }
};

export default mutations;
