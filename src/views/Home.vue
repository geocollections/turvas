<template>
  <v-container class="pa-0" fluid v-if="$route.name === 'FrontPage'">
    <div
      class="app-title"
      :class="{
        'app-title-xs': $vuetify.breakpoint.xsOnly,
        'app-title-sm': $vuetify.breakpoint.smOnly,
        'app-title-md': $vuetify.breakpoint.mdOnly,
        'app-title-lg': $vuetify.breakpoint.lgAndUp
      }"
    >
      Eesti turbauuringute andmebaas
    </div>

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
        style="height: 100%"
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

<style scoped>
.home {
  height: 100%;
}

.app-title {
  position: absolute;
  top: 80px;
  left: 70px;
  right: 50px;
  z-index: 1000;
  color: #fff;
  font-weight: 600;
  text-shadow: 1px 1px 10px #000;
}

.app-title-xs {
  font-size: 1.35em;
  left: 55px;
  top: 75px;
  max-width: 300px;
}

.app-title-sm {
  font-size: 2em;
  left: 60px;
  top: 75px;
  max-width: 400px;
}

.app-title-md {
  font-size: 2.5em;
  max-width: 500px;
  left: 70px;
}

.app-title-lg {
  font-size: 3em;
  max-width: 600px;
}
</style>
