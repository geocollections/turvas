import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  analysis: null,
  area: null,
  areaSites: null,
  areaHeaders: [
    { text: "ID", value: "id" },
    { text: "Maardla (viide registrisse)", value: "maardla" },
    { text: "Looduskaitse (viide registrisse)", value: "eelis" },
    { text: "Iseloomustus", value: "description" }
  ],
  areaSiteHeaders: [
    { text: "ID", value: "id" },
    { text: "Proovipunkt", value: "site" },
    { text: "X (L-EST, m)", value: "coordx" },
    { text: "Y (L-EST, m)", value: "coordy" },
    { text: "Z (m)", value: "elevation" },
    { text: "Sügavus / turba paksus (m)", value: "depth" }
  ],
  sample: null,
  site: null,
  error: false,
  errorMessage: ""
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
