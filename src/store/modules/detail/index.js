import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
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
  site: null,
  siteSamples: null,
  siteHeaders: [
    { text: "ID", value: "id" },
    { text: "Proovipunkt", value: "name" },
    { text: "Turbaala", value: "area" },
    { text: "X (L-EST, m)", value: "coordx" },
    { text: "Y (L-EST, m)", value: "coordy" },
    { text: "Z (m)", value: "elevation" },
    { text: "Sügavus / turba paksus (m)", value: "depth" },
    { text: "Arvamus", value: "description" }
  ],
  siteSampleHeaders: [
    { text: "ID", value: "id" },
    { text: "Nr.", value: "number_additional" },
    { text: "Algus, m", value: "depth" },
    { text: "Lõpp, m", value: "depth_interval" },
    { text: "Aeg", value: "date_collected_free" },
    { text: "Turbaliik", value: "classification_rock__name", align: "center" }
  ],
  listCounties: null,
  sample: null,
  analysis: null
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
