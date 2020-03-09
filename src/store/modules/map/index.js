import SearchService from "../../../middleware/SearchService";

const state = {
  defaultBaseLayer: "Fotokaart",
  defaultOverlayLayers: ["Uuringupunktid", "Turbaalad", "Maakonnad"],
  siteFromGeoserver: null,
  areaFromGeoserver: null
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
  },

  async mapClicked({ commit, dispatch }, bbox) {
    let turbaalad = await SearchService.doGeoserverRequest(
      "turvas:Turbaalad",
      bbox
    );

    let turbapunktid = await SearchService.doGeoserverRequest(
      "turvas:Turbapunktid",
      bbox
    );

    let areaClicked = turbaalad?.features?.[0]?.properties?.area_id;
    let siteClicked = turbapunktid?.features?.[0]?.properties?.id;

    console.log(areaClicked);
    console.log(siteClicked);

    if (siteClicked) {
      commit("SET_SITE_FROM_GEOSERVER", siteClicked);
    } else if (areaClicked) {
      commit("SET_AREA_FROM_GEOSERVER", areaClicked);
    }
  },

  resetAreaAndSiteFromGeoserver({ commit }) {
    commit("SET_SITE_FROM_GEOSERVER", null);
    commit("SET_AREA_FROM_GEOSERVER", null);
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
  },

  SET_SITE_FROM_GEOSERVER(state, siteId) {
    state.siteFromGeoserver = siteId;
  },

  SET_AREA_FROM_GEOSERVER(state, areaId) {
    state.areaFromGeoserver = areaId;
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
