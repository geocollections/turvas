<template>
  <v-container class="pa-0" fluid v-if="$route.name === 'FrontPage'">
    <router-view />
  </v-container>

  <v-container
    v-else
    class="home"
    :fluid="getMapState"
    :class="{ 'pa-0': getMapState }"
  >
    <v-row no-gutters>
      <v-col
        :class="{ 'pa-3': getMapState }"
        :cols="12"
        :sm="!getMapState ? 12 : 6"
        order="2"
        order-sm="1"
      >
        <router-view />
      </v-col>

      <v-col cols="12" sm="6" order="1" order-sm="2" v-show="getMapState">
        <Map />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Map from "../components/partial/map/Map";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { Map },
  computed: {
    ...mapGetters("settings", ["getMapState"])
  }
};
</script>

<style scoped></style>
