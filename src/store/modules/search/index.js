import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  fastSearch: "",
  areaHeaders: [
    { text: "Nimi", value: "name" },
    { text: "Maakond", value: "maakond" },
    { text: "Ala (ha)", value: "area_ha" },
    { text: "Maardla (ha)", value: "deposit_area_ha" },
    { text: "Maardla", value: "maardla" }
  ],
  areaResults: [],
  areaResultsCount: 0,
  areaSearchParams: {
    page: 1,
    paginateBy: 25,
    sortBy: ["name"],
    sortDesc: [false],
    area_type: "turbaala"
  },
  siteHeaders: [
    { text: "Proovipunkt", value: "name" },
    { text: "Maakond", value: "maakond" },
    { text: "Turbaala", value: "area_name" },
    { text: "X (L-EST, m)", value: "x" },
    { text: "Y (L-EST, m)", value: "y" },
    { text: "Z (m)", value: "z" },
    { text: "Sügavus / turba paksus (m)", value: "depth" }
  ],
  siteResults: [],
  siteResultsCount: 0,
  siteSearchParams: {
    page: 1,
    paginateBy: 25,
    sortBy: ["name"],
    sortDesc: [false],
    project_id: 20
  },
  sampleHeaders: [
    { text: "ID", value: "sample_id" },
    { text: "Number", value: "number_additional" },
    { text: "Proovipunkt", value: "site" },
    { text: "Sügavus", value: "depth" },
    { text: "Sügavus kuni", value: "depth_interval" },
    { text: "Turbaliik", value: "rock", align: "center" }
    // { text: "Takson(id)", value: "taxon", sortable: false }
  ],
  sampleResults: [],
  sampleResultsCount: 0,
  sampleSearchParams: {
    page: 1,
    paginateBy: 25,
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
    { text: "Näita 10 kaupa", value: 10 },
    { text: "Näita 25 kaupa", value: 25 },
    { text: "Näita 50 kaupa", value: 50 },
    { text: "Näita 100 kaupa", value: 100 },
    { text: "Näita 250 kaupa", value: 250 },
    { text: "Näita 500 kaupa", value: 500 },
    { text: "Näita 1000 kaupa", value: 1000 }
  ],
  listParameters: null,
  activeListParameters: null,
  shownActiveListParameters: null,
  lookUpTypes: ["sisaldab", "võrdub", "algab", "lõpeb"]
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
