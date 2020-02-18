<template>
  <v-card flat tile class="front-page">
    <Map />
  </v-card>
</template>

<script>
import Map from "../partial/map/Map";
export default {
  name: "FrontPage",
  components: {Map}
};
</script>

<style scoped></style>
