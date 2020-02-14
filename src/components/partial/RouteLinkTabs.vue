<template>
  <v-tabs
    centered
    show-arrows
    background-color="green lighten-1"
    active-class="green lighten-3"
    hide-slider
    icons-and-text
    dark
  >
    <v-tab :to="{ path: '/' }">
      Pealeht
      <v-icon>fas fa-home</v-icon>
    </v-tab>

    <v-tab :to="{ path: '/area' }">
      Turbaala
      <v-icon>fas fa-layer-group</v-icon>
    </v-tab>

    <v-tab :to="{ path: '/site' }">
      Proovipunkt
      <v-icon>fas fa-map-pin</v-icon>
    </v-tab>

    <v-tab :to="{ path: '/sample' }">
      Proov
      <v-icon>fas fa-vial</v-icon>
    </v-tab>

    <v-tab :to="{ path: '/analysis' }">
      Analüüs
      <v-icon>far fa-chart-bar</v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: "RouteLinkTabs"
};
</script>

<style scoped></style>
