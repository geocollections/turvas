import SearchService from "../../../middleware/SearchService";

const actions = {
  async fetchData({ commit, dispatch }, payload) {
    let response = await SearchService.getDetailView(payload.table, payload.id);
    if (typeof response === "object") {
      dispatch("updateErrorState", false);
      commit("SET_DATA", {
        table: payload.table,
        data: response
      });

      if (payload.table === "area") {
        dispatch("fetchAreaSites", payload.id);
      }
    } else if (typeof response === "string") {
      dispatch("updateErrorState", true);
      commit("SET_ERROR_MESSAGE", response);
    }
  },

  async fetchAreaSites({ commit, dispatch }, id) {
    let response = await SearchService.doRegularSearch("site", { area: id });
    if (typeof response === "object") {
      dispatch("updateErrorState", false);
      commit("SET_AREA_SITES", response);
    } else if (typeof response === "string") {
      dispatch("updateErrorState", true);
      commit("SET_ERROR_MESSAGE", response);
    }
  },

  updateErrorState({ commit }, bool) {
    commit("SET_ERROR_STATE", bool);
  }
};

export default actions;
