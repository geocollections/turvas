const state = {
  defaultBaseLayer: "Fotokaart",
  defaultOverlayLayers: ["Uuringupunktid", "Turbaalad", "Maakonnad"]
};

const actions = {
  updateDefaultBaseLayer({ commit }, layerName) {
    commit("SET_DEFAULT_BASE_LAYER", layerName);
  },

  appendToDefaultOverlayLayer({ commit }, layerName) {
    commit("APPEND_TO_DEFAULT_OVERLAY_LAYERS", layerName);
  },

  removeFromDefaultOverlayLayer({ commit, state }, layerName) {
    let filtered = state.defaultOverlayLayers.filter(
      item => item !== layerName
    );
    commit("SET_DEFAULT_OVERLAY_LAYERS", filtered);
  }
};

const mutations = {
  SET_DEFAULT_BASE_LAYER(state, layerName) {
    state.defaultBaseLayer = layerName;
  },

  APPEND_TO_DEFAULT_OVERLAY_LAYERS(state, layerName) {
    if (state.defaultOverlayLayers) {
      state.defaultOverlayLayers.push(layerName);
    } else state.defaultOverlayLayers = [layerName];
  },

  SET_DEFAULT_OVERLAY_LAYERS(state, arrOfLayerNames) {
    state.defaultOverlayLayers = arrOfLayerNames;
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
