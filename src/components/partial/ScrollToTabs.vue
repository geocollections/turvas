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
    <v-tab
      v-for="item in names[$route.name]"
      :key="item.idName"
      v-scroll-to="item.idName"
    >
      {{ item.name }}
      <v-icon>{{ item.icon }}</v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: "ScrollToTabs",
  data: () => ({
    names: {
      AreaDetail: [
        { name: "Üldinfo", icon: "fas fa-layer-group", idName: "#general" },
        { name: "Proovipunktid", icon: "fas fa-map-pin", idName: "#sites" }
      ]
    }
  })
};
</script>

<style scoped></style>
