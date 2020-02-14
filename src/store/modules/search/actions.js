import SearchService from "../../../middleware/SearchService";

const actions = {
  async doFastSearch({ state }) {
    console.log(state.fastSearch);
    let detailViewResponse = await SearchService.getDetailView("doi", "1");
    console.log(detailViewResponse);
  },

  updateFastSearch({ commit }, searchVal) {
    commit("SET_FAST_SEARCH", searchVal);
  }
};

export default actions;
