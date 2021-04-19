import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  fastSearch: "",
  areaHeaders: [
    { text: "name", value: "name" },
    { text: "maakond", value: "maakond" },
    { text: "area_ha", value: "area_ha" },
    { text: "deposit_area_ha", value: "deposit_area_ha" },
    { text: "maardla", value: "maardla" }
  ],
  areaResults: [],
  areaResultsCount: 0,
  areaSearchParams: {
    page: 1,
    paginateBy: 100,
    sortBy: ["name"],
    sortDesc: [false],
    area_type: "turbaala"
  },
  siteHeaders: [
    { text: "name", value: "name" },
    { text: "maakond", value: "maakond" },
    { text: "area_name", value: "area_name" },
    { text: "x", value: "x" },
    { text: "y", value: "y" },
    { text: "z", value: "z" },
    { text: "depth", value: "depth" }
  ],
  siteResults: [],
  siteResultsCount: 0,
  siteSearchParams: {
    page: 1,
    paginateBy: 100,
    sortBy: ["name"],
    sortDesc: [false],
    project_id: 20
  },
  sampleHeaders: [
    { text: "sample_id", value: "sample_id" },
    { text: "number_additional", value: "number_additional" },
    { text: "site", value: "site" },
    { text: "depth", value: "depth" },
    { text: "depth_interval", value: "depth_interval" },
    { text: "rock", value: "rock", align: "center" }
    // { text: "Takson(id)", value: "taxon", sortable: false }
  ],
  sampleResults: [],
  sampleResultsCount: 0,
  sampleSearchParams: {
    page: 1,
    paginateBy: 100,
    sortBy: ["id"],
    sortDesc: [false],
    area: "",
    site: "",
    depth_start: "",
    depth_end: "",
    rock: "",
    egf: ""
  },
  paginateByItems: [
    { text: "search.pagination", value: 10 },
    { text: "search.pagination", value: 25 },
    { text: "search.pagination", value: 50 },
    { text: "search.pagination", value: 100 },
    { text: "search.pagination", value: 250 },
    { text: "search.pagination", value: 500 },
    { text: "search.pagination", value: 1000 }
  ],
  listParameters: null,
  activeListParameters: null,
  shownActiveListParameters: null,
  lookUpTypes: ["sisaldab", "võrdub", "algab", "lõpeb"],
  listAreas: null
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
