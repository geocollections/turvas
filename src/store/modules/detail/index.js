import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  area: null,
  areaSites: null,
  areaGeometry: null,
  areaReferences: null,
  areaHeaders: [
    { text: "ID", value: "id" },
    { text: "Maakond", value: "maakond__maakond" },
    { text: "Turbaalade plaan", value: "maakond" },
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
    { text: "Turbaalade plaan", value: "area__maakond" },
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
  sampleAnalyses: null,
  sampleTaxa: null,
  sampleAnalyticalData: null,
  sampleHeaders: [
    { text: "Proovi ID", value: "id" },
    { text: "Proovipunkt", value: "site" },
    { text: "Turbaala", value: "site__area" },
    { text: "Maakond", value: "site__area__maakond__maakond" },
    { text: "Proovi sügavus (m)", value: "depth" },
    { text: "Proovi sügavus (m, intervalli korral)", value: "depth_interval" },
    { text: "Proovi koguja(d)", value: "agent_collected_free" },
    { text: "Kogumise aeg", value: "date_collected_free" },
    { text: "Nimi", value: "rock" },
    { text: "Stratigraafia", value: "stratigraphy__stratigraphy" },
    { text: "Stratigraafia vaba", value: "stratigraphy_free" },
    { text: "Turbaliik", value: "classification_rock__name" }
  ],
  sampleAnalysesHeaders: [
    { text: "Meetod", value: "analysis_method" },
    { text: "Parameeter", value: "parameter_name" },
    { text: "Väärtus", value: "value", align: "center" },
    { text: "Kuupäev", value: "date_analysed_free" }
  ],
  sampleTaxaHeaders: [
    { text: "ID", value: "taxon_id" },
    { text: "Nimi", value: "parameter_name" },
    { text: "Nimi (EST)", value: "parameter_name_et" },
    { text: "Osakaal (%)", value: "value", align: "center" },
    { text: "eElurikkus", value: "plutof_taxon_id", align: "center" }
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
