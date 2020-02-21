import SearchService from "../../../middleware/SearchService";
import cloneDeep from "lodash/cloneDeep";
import router from "../../../router";

const actions = {
  async doFastSearch({ state }) {
    console.log(state.fastSearch);
    let detailViewResponse = await SearchService.getDetailView("doi", "1");
    console.log(detailViewResponse);
  },

  async doAreaSearch({ state, commit, dispatch }, params = {}) {
    dispatch("updateSearchParams", params);

    let response = await SearchService.doSolrSearch(
      "area",
      state.areaSearchParams
    );
    if (typeof response === "object") {
      commit("SET_AREA_RESULTS", response.results);
      commit("SET_AREA_RESULTS_COUNT", response.count);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  async doSiteSearch({ state, commit, dispatch }, params = {}) {
    dispatch("updateSearchParams", params);

    let response = await SearchService.doSolrSearch(
      "site",
      state.siteSearchParams
    );
    if (typeof response === "object") {
      commit("SET_SITE_RESULTS", response.results);
      commit("SET_SITE_RESULTS_COUNT", response.count);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  updateSearchParams({ commit, getters }, params) {
    let searchParams = cloneDeep(params);

    if (params.page) {
      if (typeof params.page === "number") {
        searchParams.page =
          params.page <= 10000 && params.page > 0 ? params.page : 1;
      } else if (
        typeof params.page === "string" &&
        parseInt(params.page) !== isNaN(params.page)
      ) {
        searchParams.page =
          parseInt(params.page) <= 10000 && parseInt(params.page) > 0
            ? parseInt(params.page)
            : 1;
      } else searchParams.page = 1;
    } else searchParams.page = 1;

    if (params.paginateBy) {
      if (typeof params.paginateBy === "number") {
        searchParams.paginateBy =
          params.paginateBy <= 1000 && params.paginateBy >= 10
            ? params.paginateBy
            : 25;
      } else if (
        typeof params.paginateBy === "string" &&
        parseInt(params.paginateBy) !== isNaN(params.paginateBy)
      ) {
        searchParams.paginateBy =
          parseInt(params.paginateBy) <= 1000 &&
          parseInt(params.paginateBy) >= 10
            ? parseInt(params.paginateBy)
            : 25;
      } else searchParams.paginateBy = 25;
    } else searchParams.paginateBy = 25;

    if (params.sortBy) {
      let sortBy = params.sortBy.includes(",")
        ? params.sortBy.split(",")
        : [params.sortBy];
      if (router.currentRoute.name === "AreaTable") {
        searchParams.sortBy = sortBy.filter(field =>
          getters.getAreaHeaderNames.includes(field)
        );
      } else if (router.currentRoute.name === "SiteTable") {
        searchParams.sortBy = sortBy.filter(field =>
          getters.getSiteHeaderNames.includes(field)
        );
      }
    } else searchParams.sortBy = [];

    if (params.sortDesc) {
      let sortDesc = params.sortDesc.includes(",")
        ? params.sortDesc.split(",")
        : [params.sortDesc];
      let sortDescList = [];
      sortDesc.forEach(field => {
        if (field === "true") sortDescList.push(true);
        else if (field === "false") sortDescList.push(false);
      });
      if (searchParams.sortBy.length === sortDescList.length) {
        searchParams.sortDesc = sortDescList;
      } else {
        searchParams.sortBy = [];
        searchParams.sortDesc = [];
      }
    } else searchParams.sortDesc = [];

    if (params.filter && params.filter.length > 0) {
      searchParams.filter = params.filter;
    } else delete searchParams.filter;

    if (params.maakond && params.maakond.length > 0) {
      searchParams.maakond = params.maakond;
    } else delete searchParams.maakond;

    if (router.currentRoute.name === "AreaTable") {
      searchParams.area_type = "turbaala";

      commit("SET_AREA_SEARCH_PARAMS", searchParams);
    } else if (router.currentRoute.name === "SiteTable") {
      searchParams.project_id = 20;

      commit("SET_SITE_SEARCH_PARAMS", searchParams);
    }
  },

  updateFastSearch({ commit }, searchVal) {
    commit("SET_FAST_SEARCH", searchVal);
  }
};

export default actions;
