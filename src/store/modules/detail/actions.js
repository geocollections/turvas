import SearchService from "../../../middleware/SearchService";

const actions = {
  async fetchData({ commit, dispatch }, payload) {
    let response = await SearchService.getDetailView(
      payload.table,
      payload.id,
      payload.params
    );
    if (typeof response === "object") {
      // dispatch("error/updateErrorState", false, { root: true });
      commit("SET_DATA", {
        table: payload.table,
        data: response
      });

      if (payload.table === "area") {
        dispatch("fetchAreaSites", payload.id);
      }
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  async fetchAreaSites({ commit, dispatch }, id) {
    let response = await SearchService.doRegularSearch("site", { area: id });
    if (typeof response === "object") {
      // dispatch("error/updateErrorState", false, { root: true });
      commit("SET_AREA_SITES", response.results);
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
