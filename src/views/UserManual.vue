<template>
  <div class="user-manual">
    <v-card class="ma-3">
      <v-card-title class="display-1">
        Kasutusjuhend
      </v-card-title>

      <v-card-text>
        Kasutusjuhendist leiab juhiseid, kuidas rakenduse peamised funktsioonid
        töötavad.
      </v-card-text>

      <v-tabs v-model="tab" grow>
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <common-tab v-if="item === 'üldine'" />

          <map-tab v-else-if="item === 'kaart'" />

          <search-tab v-else-if="item === 'otsing'" />

          <table-tab v-else-if="item === 'tabel'" />

          <chart-tab v-else-if="item === 'graafik'" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import CommonTab from "../components/user_manual/CommonTab";
import MapTab from "../components/user_manual/MapTab";
import SearchTab from "../components/user_manual/SearchTab";
import TableTab from "../components/user_manual/TableTab";
import ChartTab from "../components/user_manual/ChartTab";
export default {
  name: "UserManual",
  components: { ChartTab, TableTab, SearchTab, MapTab, CommonTab },
  data: () => ({
    tab: null,
    items: ["üldine", "kaart", "otsing", "tabel", "graafik"]
  })
};
</script>

<style scoped></style>
