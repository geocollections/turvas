import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  area: null,
  areaSites: null,
  areaHeaders: [
    { text: "ID", value: "id" },
    { text: "Maakond", value: "maakond__maakond" },
    { text: "Ala (ha)", value: "area_ha" },
    { text: "Maardla (viide registrisse)", value: "maardla" },
    { text: "Maardla (ha)", value: "deposit_area_ha" },
    { text: "Looduskaitse (viide registrisse)", value: "eelis" },
    { text: "EGF", value: "egf" },
    { text: "Iseloomustus", value: "description" }
  ],
  areaSiteHeaders: [
    { text: "ID", value: "id" },
    { text: "Proovipunkt", value: "site" },
    { text: "X (L-EST, m)", value: "x" },
    { text: "Y (L-EST, m)", value: "y" },
    { text: "Z (m)", value: "z" },
    { text: "Sügavus / turba paksus (m)", value: "depth" }
  ],
  site: null,
  siteDescription: null,
  siteSamples: null,
  siteHeaders: [
    { text: "ID", value: "id" },
    { text: "Proovipunkt", value: "name" },
    { text: "Turbaala", value: "area" },
    { text: "X (L-EST, m)", value: "coordx" },
    { text: "Y (L-EST, m)", value: "coordy" },
    { text: "Z (m)", value: "elevation" },
    { text: "Sügavus / turba paksus (m)", value: "depth" },
    { text: "Avamus", value: "description" }
  ],
  siteDescriptionHeaders: [
    { text: "Ülem. piir (m)", value: "depth_top" },
    { text: "Alum. piir (m)", value: "depth_base" },
    { text: "Nimi", value: "rock__name" },
    { text: "Strat.", value: "stratigraphy__stratigraphy" },
    { text: "Strat. txt", value: "stratigraphy_free" },
    { text: "Kirjeldus", value: "description" }
  ],
  siteSampleHeaders: [
    { text: "ID", value: "id" },
    { text: "Nr.", value: "number_additional" },
    { text: "Algus, m", value: "depth" },
    { text: "Lõpp, m", value: "depth_interval" },
    { text: "Aeg", value: "date_collected_free" },
    { text: "Turbaliik", value: "classification_rock__name", align: "center" }
  ],
  sample: null,
  sampleHeaders: [
    { text: "Proovi ID", value: "id" },
    { text: "Proovipunkt", value: "site" },
    { text: "Turbaala", value: "site__area" },
    { text: "Turba paksus (m)", value: "site__depth" },
    { text: "Avamus", value: "rock" },
    { text: "Proovi koguja(d)", value: "agent_collected_free" },
    { text: "Kogumise aeg", value: "date_collected_free" },
    { text: "EGF", value: "site__area__egf" },
    { text: "Turbaliik", value: "classification_rock__name" }
  ],
  listCounties: null
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
