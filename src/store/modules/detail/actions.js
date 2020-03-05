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
      } else if (payload.table === "site") {
        dispatch("fetchSiteSamples", payload.id);
        dispatch("fetchSiteDescription", payload.id);
        dispatch("fetchAreaSites", response.area);
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
      sample_id: id
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
