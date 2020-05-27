<template>
  <v-container class="user-manual" style="max-width: 1000px">
    <v-card class="ma-3">
      <v-card-title class="display-1">
        Kasutusjuhend
      </v-card-title>

      <v-card-text>
        <div class="headline">
          Turbauuringute andmebaasi tehniline iseloomustus
        </div>

        <div class="mt-2">
          Turbauuringute andmaas kasutab geoteaduste infosüsteemi SARV (vt
          <a
            href="https://geocollections.info"
            title="Eesti geokogude portaal"
            target="GeocollectionsWindow"
            >https://geocollections.info</a
          >) relatsioonilist andmemudelit ning tehnilist infrastruktuuri, mis on
          välja arendatud Tallinna Tehnikaülikooli geoloogia instituudis enam
          kui 10 a vältel, viimastel aastatel peamiselt Eesti teadustaristu
          teekaardi projekti Loodusteaduslikud arhiivid ja andmevõrgustik NATARC
          (<a
            href="https://natarc.ut.ee"
            title="Eesti teaduse taristu teekaart"
            target="NatarchWindow"
            >https://natarc.ut.ee</a
          >) raames. Infosüsteemi andmed ja e-teenused on majutatud
          tehnikaülikooli serveritesse. Infosüsteemi terviklik andmemudel on
          kättesaadav aadressil (<a
            href="https://schema.geocollections.info"
            title="Infosteemi andmemudel"
            target="SchemaWindow"
            >https://schema.geocollections.info</a
          >). Turbauuringute andmestiku talletamiseks on kasutusel järgmised
          peamised andeobjektid ja moodulid: ala (<a
            href="https://schema.geocollections.info/area/"
            title="Infosteemi andmemudel 'area' tabeli kohta"
            target="SchemaWindow"
            >area</a
          >), proovipunkt (<a
            href="https://schema.geocollections.info/site/"
            title="Infosteemi andmemudel 'site' tabeli kohta"
            target="SchemaWindow"
            >site</a
          >), proov (<a
            href="https://schema.geocollections.info/sample/"
            title="Infosteemi andmemudel 'sample' tabeli kohta"
            target="SchemaWindow"
            >sample</a
          >), analüüs (<a
            href="https://schema.geocollections.info/analysis/"
            title="Infosteemi andmemudel 'analysis' tabeli kohta"
            target="SchemaWindow"
            >analysis</a
          >), analüüsitulemused (<a
            href="https://schema.geocollections.info/analysis_results/"
            title="Infosteemi andmemudel 'analysis_results' tabeli kohta"
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
            target="DoiWindow"
            >https://doi.geocollections.info</a
          >) andmebaasi staatilise väljavõtte arhiveerimiseks.
        </div>

        <div class="mt-2">
          Peamine kasutajaliides turbauuringute andmete sirvimiseks ning
          päringuteks, aga ka andmete allalaadimiseks ja turbauuringute
          tutvustamiseks, on käesoleva projekti raames valminud turbauuringute
          andmebaasi veebirakendus <b>TURBA</b>:
          <router-link to="/" title="Mine pealehele"
            >https://turba.geoloogia.info</router-link
          >.
        </div>
      </v-card-text>

      <v-tabs v-model="tab" grow show-arrows>
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <common-tab v-if="item === 'üldine'" />

          <map-tab v-else-if="item === 'kaart'" />

          <search-tab v-else-if="item === 'otsing'" />

          <table-tab v-else-if="item === 'tabel'" />

          <chart-tab v-else-if="item === 'graafik'" />

          <more-tab v-else-if="item === 'rohkem lugemist'" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import CommonTab from "../components/user_manual/CommonTab";
import MapTab from "../components/user_manual/MapTab";
import SearchTab from "../components/user_manual/SearchTab";
import TableTab from "../components/user_manual/TableTab";
import ChartTab from "../components/user_manual/ChartTab";
import More from "../components/user_manual/MoreTab";
import MoreTab from "../components/user_manual/MoreTab";
export default {
  name: "UserManual",
  components: { MoreTab, ChartTab, TableTab, SearchTab, MapTab, CommonTab },
  data: () => ({
    tab: null,
    items: ["üldine", "kaart", "otsing", "tabel", "graafik", "rohkem lugemist"]
  })
};
</script>

<style scoped></style>
