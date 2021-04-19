import SearchService from "../../../middleware/SearchService";
import cloneDeep from "lodash/cloneDeep";
import router from "../../../router";
import i18n from "@/i18n";

const actions = {
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

  async doSampleSearch({ state, commit, dispatch }, params = {}) {
    dispatch("updateSearchParams", params);

    let response = await SearchService.doSolrSearch(
      "peat_samples",
      state.sampleSearchParams
    );
    if (typeof response === "object") {
      commit("SET_SAMPLE_RESULTS", response.results);
      commit("SET_SAMPLE_RESULTS_COUNT", response.count);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  },

  async fetchListParameters({ state, commit, dispatch }, reset = false) {
    if (!state.listParameters || reset) {
      let listOfParameters = [];

      const tablesToFetchParameters = ["peat_taxa", "peat_analysis"];
      let regex = /[|\s\\(\\)\\õ]/gi;

      for (let table of tablesToFetchParameters) {
        let response = await SearchService.doSolrFacetSearch(table, [
          "parameter",
          "parameter_name",
          "parameter_name_en"
        ]);

        if (typeof response === "object") {
          if (table === "peat_taxa") {
            const parameters = response.facet_counts.facet_fields.parameter;

            const mappedParameters = parameters.reduce((prev, val) => {
              if (typeof val !== "number") {
                const replacedParam = val.replace(regex, "_");
                prev.push({
                  name: val,
                  name_en: val,
                  unit: "%",
                  start: null,
                  end: null,
                  value: replacedParam,
                  isText: false,
                  query: ""
                });
              }
              return prev;
            }, []);
            listOfParameters = [...mappedParameters, ...listOfParameters];
          } else if (table === "peat_analysis") {
            const parameters =
              response.facet_counts.facet_pivot[
                "parameter_name,parameter_name_en"
              ];

            const mappedParameters = parameters.reduce((prev, valueObj) => {
              const replacedParam = valueObj.value.replace(regex, "_");
              let object = {
                name: valueObj.value,
                name_en: valueObj.pivot[0].value,
                unit: "%",
                start: null,
                end: null,
                value: replacedParam,
                isText: false,
                query: ""
              };
              if (valueObj.value === "põlemissoojus") {
                object = {
                  ...object,
                  unit: "MJ/kg"
                };
              } else if (valueObj.value === "pH") {
                object = {
                  ...object,
                  unit: "pH"
                };
              } else if (valueObj.value === "turba kasutusala hinnang") {
                object = {
                  ...object,
                  unit: "",
                  isText: true,
                  lookUpType: "sisaldab",
                  text: ""
                };
              } else if (valueObj.value === "turba kasutusala kood") {
                object = {
                  ...object,
                  unit: ""
                };
              } else if (valueObj.value === "turba lagunemisaste (Von Post)") {
                object = {
                  ...object,
                  unit: "",
                  isText: true,
                  lookUpType: "sisaldab",
                  text: ""
                };
              }
              prev.push(object);
              return prev;
            }, []);
            listOfParameters = [...mappedParameters, ...listOfParameters];
          }
        } else if (typeof response === "string") {
          dispatch("error/updateErrorState", true, { root: true });
          dispatch("error/updateErrorMessage", response, { root: true });
        }
      }

      commit("SET_LIST_PARAMETERS", listOfParameters);
      if (listOfParameters && listOfParameters.length > 1) {
        commit("INIT_ACTIVE_LIST_PARAMETERS", {
          parameters: listOfParameters,
          isDetail: router.currentRoute.name.includes("Detail")
        });
        dispatch(
          "updateSampleHeaders",
          // router.currentRoute.name.includes("Detail")
          //   ? [listOfParameters[0], listOfParameters[4], listOfParameters[7]]
          //   : [listOfParameters[0], listOfParameters[1]]
          [listOfParameters[0], listOfParameters[4], listOfParameters[7]]
        );
      }
    }
  },

  updateSearchParams({ commit, getters }, params) {
    let searchParams = cloneDeep(params);

    if (searchParams.page) {
      if (typeof searchParams.page === "number") {
        searchParams.page =
          searchParams.page <= 10000 && searchParams.page > 0
            ? searchParams.page
            : 1;
      } else if (
        typeof searchParams.page === "string" &&
        parseInt(searchParams.page) !== isNaN(searchParams.page)
      ) {
        searchParams.page =
          parseInt(searchParams.page) <= 10000 &&
          parseInt(searchParams.page) > 0
            ? parseInt(searchParams.page)
            : 1;
      } else searchParams.page = 1;
    } else searchParams.page = 1;

    if (searchParams.paginateBy) {
      if (typeof searchParams.paginateBy === "number") {
        searchParams.paginateBy =
          searchParams.paginateBy <= 1000 && searchParams.paginateBy >= 10
            ? searchParams.paginateBy
            : 100;
      } else if (
        typeof searchParams.paginateBy === "string" &&
        parseInt(searchParams.paginateBy) !== isNaN(searchParams.paginateBy)
      ) {
        searchParams.paginateBy =
          parseInt(searchParams.paginateBy) <= 1000 &&
          parseInt(searchParams.paginateBy) >= 10
            ? parseInt(searchParams.paginateBy)
            : 100;
      } else searchParams.paginateBy = 100;
    } else searchParams.paginateBy = 100;

    if (searchParams.sortBy) {
      let sortBy = searchParams.sortBy.includes(",")
        ? searchParams.sortBy.split(",")
        : [searchParams.sortBy];
      if (router.currentRoute.name === "AreaTable") {
        searchParams.sortBy = sortBy.filter(field =>
          getters.getAreaHeaderNames.includes(field)
        );
      } else if (router.currentRoute.name === "SiteTable") {
        searchParams.sortBy = sortBy.filter(field =>
          getters.getSiteHeaderNames.includes(field)
        );
      } else if (router.currentRoute.name === "SampleTable") {
        searchParams.sortBy = sortBy.filter(field =>
          getters.getSampleHeaderNames.includes(field)
        );
      }
    } else searchParams.sortBy = [];

    if (searchParams.sortDesc) {
      let sortDesc = searchParams.sortDesc.includes(",")
        ? searchParams.sortDesc.split(",")
        : [searchParams.sortDesc];
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

    if (router.currentRoute.name === "AreaTable") {
      searchParams.area_type = "turbaala";

      commit("SET_AREA_SEARCH_PARAMS", searchParams);
    } else if (router.currentRoute.name === "SiteTable") {
      searchParams.project_id = 20;

      commit("SET_SITE_SEARCH_PARAMS", searchParams);
    } else {
      if (searchParams.maakond) {
        let maakond = searchParams.maakond.includes(",")
          ? searchParams.maakond.split(",")
          : [searchParams.maakond];
        searchParams.maakond = maakond;
      } else delete searchParams.maakond;

      if (searchParams.area) {
        let area = searchParams.area.includes(",")
          ? searchParams.area.split(",")
          : [searchParams.area];
        searchParams.area = area;
      } else delete searchParams.area;
      commit("SET_SAMPLE_SEARCH_PARAMS", searchParams);
    }
  },

  updateFastSearch({ commit }, searchVal) {
    commit("SET_FAST_SEARCH", searchVal);
  },

  updateSampleHeaders({ commit, dispatch }, value) {
    if (router.currentRoute.name.includes("Detail") && value.length > 10) {
      let clonedValue = [...value];
      clonedValue.shift();
      commit("UPDATE_SAMPLE_HEADERS", clonedValue);
      dispatch("setShownActiveListParameters", clonedValue);
    } else {
      commit("UPDATE_SAMPLE_HEADERS", value);
      dispatch("setShownActiveListParameters", value);
    }
  },

  updateActiveListParameters({ state, commit, dispatch }, payload) {
    commit("UPDATE_ACTIVE_LIST_PARAMETERS", payload);

    let updatedParameters = [...state.shownActiveListParameters, payload.event];
    let uniqueParameters = [...new Set(updatedParameters)];
    dispatch("updateSampleHeaders", uniqueParameters);
  },

  updateActiveListParameter({ commit }, payload) {
    commit("UPDATE_ACTIVE_LIST_PARAMETER", payload);
  },

  addActiveListParameter({ state, commit, dispatch }) {
    if (state.activeListParameters && state.activeListParameters.length < 10) {
      commit("ADD_ACTIVE_LIST_PARAMETER");
      dispatch("updateSampleHeaders", state.activeListParameters);
    }
  },

  removeActiveListParameter({ state, commit, dispatch }, index) {
    if (state.activeListParameters && state.activeListParameters.length >= 2) {
      commit("REMOVE_ACTIVE_LIST_PARAMETER", index);
      dispatch("updateSampleHeaders", state.activeListParameters);
    }
  },

  setShownActiveListParameters({ state, commit }, list) {
    commit("SET_SHOWN_ACTIVE_LIST_PARAMETERS", list);
  },

  async fetchListAreas({ commit, dispatch }) {
    let response = await SearchService.doRegularSearch("area", {
      fields: "id,name",
      sortBy: ["name"],
      sortDesc: [false]
    });
    if (typeof response === "object") {
      commit("SET_LIST_AREAS", response.results);
    } else if (typeof response === "string") {
      dispatch("error/updateErrorState", true, { root: true });
      dispatch("error/updateErrorMessage", response, { root: true });
    }
  }
};

export default actions;
