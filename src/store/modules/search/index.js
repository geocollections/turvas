import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  fastSearch: "",
  fastSearchCount: 0,
  fastSearchResults: [],
  areaHeaders: [
    { text: "Nimi", value: "name" },
    { text: "Maakond", value: "maakond__maakond" },
    { text: "Ala (ha)", value: "area_ha" },
    { text: "Maardla (ha)", value: "deposit_area_ha" },
    { text: "Maardla", value: "maardla" },
    { text: "Looduskaitse", value: "eelis" }
  ],
  areaResults: [],
  areaResultsCount: 0,
  areaPage: 1,
  areaPaginateBy: 25,
  areaSortBy: ["name"],
  areaSortDesc: [false]
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
