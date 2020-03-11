import SearchService from "../../../middleware/SearchService";

const actions = {
  async fetchData({ commit, dispatch }, payload) {
    let response = await SearchService.getDetailView(
      payload.table,
      payload.id,
      payload.params
    );
    if (typeof response === "object") {
      commit("SET_DATA", {
        table: payload.table,
        data: response
      });

      if (payload.table === "area") {
        dispatch("fetchAreaSites", payload.id);
        dispatch("fetchAreaBounds", payload.id);
        dispatch("fetchAreaReferences", payload.id);
      } else if (payload.table === "site") {
        dispatch("fetchSiteSamples", payload.id);
        dispatch("fetchSiteDescription", payload.id);
        dispatch("fetchAreaSites", response.area);
        dispatch("fetchAreaBounds", response.area);
        dispatch("fetchSampleAnalyticalData", payload.id);
      } else {
        dispatch("fetchSampleTaxa", payload.id);
        dispatch("fetchSampleAnalyses", payload.id);
      }
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  async fetchAreaSites({ commit, dispatch }, id) {
    let response = await SearchService.doSolrSearch("site", { area_id: id });
    if (typeof response === "object") {
      commit("SET_AREA_SITES", response.results);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  async fetchAreaBounds({ commit, dispatch }, id) {
    let response = await SearchService.doGeoserverRequest(
      {
        typeName: "turvas:Turbaalad",
        CQL_FILTER: `area_id=${id}`
      },
      false
    );

    if (typeof response === "object") {
      let areaGeometry = response?.features?.[0]?.geometry;
      if (areaGeometry) commit("SET_AREA_GEOMETRY", areaGeometry);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  async fetchAreaReferences({ commit, dispatch }, id) {
    let response = await SearchService.doRegularSearch("reference", {
      localityreference__area: id
    });
    if (typeof response === "object") {
      commit("SET_AREA_REFERENCES", response.results);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  async fetchSiteDescription({ commit, dispatch }, id) {
    let response = await SearchService.doRegularSearch("locality_description", {
      site: id
    });
    if (typeof response === "object") {
      commit("SET_SITE_DESCRIPTION", response.results);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  async fetchSiteSamples({ commit, dispatch }, id) {
    let response = await SearchService.doRegularSearch("sample", { site: id });
    if (typeof response === "object") {
      commit("SET_SITE_SAMPLES", response.results);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  async fetchSampleTaxa({ commit, dispatch }, id) {
    let response = await SearchService.doSolrSearch("peat_taxa", {
      sample_id: id,
      sortBy: ["value"],
      sortDesc: [true]
    });

    if (typeof response === "object") {
      commit("SET_SAMPLE_TAXA", response.results);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  async fetchSampleAnalyses({ commit, dispatch }, id) {
    let response = await SearchService.doSolrSearch("peat_analysis", {
      sample_id: id
    });

    if (typeof response === "object") {
      commit("SET_SAMPLE_ANALYSES", response.results);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  async fetchSampleAnalyticalData({ commit, dispatch }, id) {
    let response = await SearchService.doSolrSearch("peat_samples", {
      site_id: id
    });

    if (typeof response === "object") {
      commit("SET_SAMPLE_ANALYTICAL_DATA", response.results);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  async fetchListCounties({ commit, dispatch }) {
    let response = await SearchService.doRegularSearch("list_maakond");
    if (typeof response === "object") {
      // dispatch("error/updateErrorState", false, { root: true });
      commit("SET_LIST_COUNTIES", response.results);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  }
};

export default actions;
