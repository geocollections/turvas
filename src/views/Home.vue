<template>
  <v-container
    class="home"
    :fluid="!getDataViewState"
    :class="{ 'pa-0': !getDataViewState }"
  >
    <SplitOptions />

    <v-row no-gutters>
      <v-col
        :class="{ 'pa-3': getSplitViewState }"
        :cols="getDataViewState ? 12 : 6"
        v-show="getSplitViewState || getDataViewState"
      >
        <router-view />
      </v-col>

      <v-col
        :cols="getMapViewState ? 12 : 6"
        v-show="getSplitViewState || getMapViewState"
      >
        <Map />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Map from "../components/partial/map/Map";
import SplitOptions from "../components/partial/SplitOptions";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { SplitOptions, Map },
  computed: {
    ...mapGetters("settings", [
      "getSplitViewState",
      "getMapViewState",
      "getDataViewState"
    ])
  }
};
</script>

<style scoped></style>
