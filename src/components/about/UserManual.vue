<template>
  <div class="user-manual">
    <v-card-text class="pt-0">
      <div class="display-1">
        Turbauuringute andmebaasi tehniline iseloomustus
      </div>

      <div class="mt-2">
        Turbauuringute andmaas kasutab geoteaduste infosüsteemi SARV (vt
        <a
          href="https://geocollections.info"
          title="Eesti geokogude portaal"
          class="table-link"
          target="GeocollectionsWindow"
          >https://geocollections.info</a
        >) relatsioonilist andmemudelit ning tehnilist infrastruktuuri, mis on
        välja arendatud Tallinna Tehnikaülikooli geoloogia instituudis enam kui
        10 a vältel, viimastel aastatel peamiselt Eesti teadustaristu teekaardi
        projekti Loodusteaduslikud arhiivid ja andmevõrgustik NATARC (<a
          href="https://natarc.ut.ee"
          title="Eesti teaduse taristu teekaart"
          class="table-link"
          target="NatarchWindow"
          >https://natarc.ut.ee</a
        >) raames. Infosüsteemi andmed ja e-teenused on majutatud
        tehnikaülikooli serveritesse. Infosüsteemi terviklik andmemudel on
        kättesaadav aadressil (<a
          href="https://schema.geocollections.info"
          title="Infosteemi andmemudel"
          class="table-link"
          target="SchemaWindow"
          >https://schema.geocollections.info</a
        >). Turbauuringute andmestiku talletamiseks on kasutusel järgmised
        peamised andeobjektid ja moodulid: ala (<a
          href="https://schema.geocollections.info/area/"
          title="Infosteemi andmemudel 'area' tabeli kohta"
          class="table-link"
          target="SchemaWindow"
          >area</a
        >), proovipunkt (<a
          href="https://schema.geocollections.info/site/"
          title="Infosteemi andmemudel 'site' tabeli kohta"
          class="table-link"
          target="SchemaWindow"
          >site</a
        >), proov (<a
          href="https://schema.geocollections.info/sample/"
          title="Infosteemi andmemudel 'sample' tabeli kohta"
          class="table-link"
          target="SchemaWindow"
          >sample</a
        >), analüüs (<a
          href="https://schema.geocollections.info/analysis/"
          title="Infosteemi andmemudel 'analysis' tabeli kohta"
          class="table-link"
          target="SchemaWindow"
          >analysis</a
        >), analüüsitulemused (<a
          href="https://schema.geocollections.info/analysis_results/"
          title="Infosteemi andmemudel 'analysis_results' tabeli kohta"
          class="table-link"
          target="SchemaWindow"
          >analysis_results</a
        >). Täiendavalt kasutatakse seotud mooduleid kirjanduse, asutuste ja
        isikute, laborite, analüüsimeetodite, failide jms info talletamiseks,
        kuvamiseks ja haldamiseks.
      </div>

      <div class="mt-2">
        Turbauuringute andmebaas kasutab täiendavalt veebipõhise kaardiserveri
        WMS teenuseid ruumiobjektide kuvamiseks, ning SARV-DOI rakendust (<a
          href="https://doi.geocollections.info"
          title="SARV-DOI rakendus"
          class="table-link"
          target="DoiWindow"
          >https://doi.geocollections.info</a
        >) andmebaasi staatilise väljavõtte arhiveerimiseks.
      </div>

      <div class="mt-2">
        Peamine kasutajaliides turbauuringute andmete sirvimiseks ning
        päringuteks, aga ka andmete allalaadimiseks ja turbauuringute
        tutvustamiseks, on käesoleva projekti raames valminud turbauuringute
        andmebaasi veebirakendus <b>TURBA</b>:
        <router-link class="table-link" to="/" title="Mine pealehele"
          >https://turba.geoloogia.info</router-link
        >.
      </div>
    </v-card-text>

    <v-tabs
      slider-size="4"
      v-model="tab"
      grow
      show-arrows
      background-color="transparent"
    >
      <v-tab
        active-class="tab-background"
        class="font-weight-bold"
        style="color: #000;"
        v-for="item in items"
        :key="item"
        >{{ item }}</v-tab
      >
    </v-tabs>

    <v-tabs-items class="user-manual-tabs-items" v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <common-tab v-if="item === 'üldine'" />

        <map-tab v-else-if="item === 'kaart'" />

        <search-tab v-else-if="item === 'otsing'" />

        <table-tab v-else-if="item === 'tabel'" />

        <chart-tab v-else-if="item === 'graafik'" />

        <more-tab v-else-if="item === 'rohkem lugemist'" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import MoreTab from "./user_manual/MoreTab";
import ChartTab from "./user_manual/ChartTab";
import TableTab from "./user_manual/TableTab";
import SearchTab from "./user_manual/SearchTab";
import MapTab from "./user_manual/MapTab";
import CommonTab from "./user_manual/CommonTab";

export default {
  name: "UserManual",

  components: { MoreTab, ChartTab, TableTab, SearchTab, MapTab, CommonTab },

  data: () => ({
    tab: null,
    items: ["üldine", "kaart", "otsing", "tabel", "graafik", "rohkem lugemist"]
  })
};
</script>

<style scoped>
.user-manual-tabs-items {
  background-color: transparent;
}

.tab-background {
  background-color: rgba(0, 0, 0, 0.16);
}
</style>
