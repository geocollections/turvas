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
      <v-col :class="{ 'pa-3': getMapState }" :cols="!getMapState ? 12 : 6">
        <router-view />
      </v-col>

      <v-col cols="6" v-show="getMapState">
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
