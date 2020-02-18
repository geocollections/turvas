import SearchService from "../../../middleware/SearchService";

const actions = {
  async doFastSearch({ state }) {
    console.log(state.fastSearch);
    let detailViewResponse = await SearchService.getDetailView("doi", "1");
    console.log(detailViewResponse);
  },

  async doAreaSearch({ commit, dispatch }, params) {
    let response = await SearchService.doRegularSearch("area", params);
    if (typeof response === "object") {
      dispatch("error/updateErrorState", false, { root: true });
      commit("SET_AREA_RESULTS", response.results);
      commit("SET_AREA_RESULTS_COUNT", response.count);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  updateFastSearch({ commit }, searchVal) {
    commit("SET_FAST_SEARCH", searchVal);
  }
};

export default actions;
