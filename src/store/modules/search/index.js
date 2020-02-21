import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  fastSearch: "",
  fastSearchCount: 0,
  fastSearchResults: [],
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
  paginateByItems: [
    { text: "Näita 10 kaupa", value: 10 },
    { text: "Näita 25 kaupa", value: 25 },
    { text: "Näita 50 kaupa", value: 50 },
    { text: "Näita 100 kaupa", value: 100 },
    { text: "Näita 250 kaupa", value: 250 },
    { text: "Näita 500 kaupa", value: 500 },
    { text: "Näita 1000 kaupa", value: 1000 }
  ]
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
