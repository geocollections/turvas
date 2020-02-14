<template>
  <v-speed-dial
    class="split-options"
    fixed
    v-model="fab"
    bottom
    right
    direction="left"
    transition="slide-y-reverse-transition"
    style="z-index: 2500"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        color="light-green lighten-1"
        dark
        fab
        :title="fab ? 'Sulge seaded' : 'Muuda vaate seadeid'"
      >
        <v-icon v-if="fab">fas fa-times</v-icon>
        <v-icon v-else-if="getDataViewState"
          >fas fa-window-maximize fa-rotate-90</v-icon
        >
        <v-icon v-else-if="getSplitViewState">fas fa-columns</v-icon>
        <v-icon v-else-if="getMapViewState"
          >fas fa-window-maximize fa-rotate-270</v-icon
        >
      </v-btn>
    </template>

    <v-btn
      fab
      dark
      small
      color="light-green darken-2"
      title="Näita ainult kaarti"
      @click="updateMapViewState(true)"
    >
      <v-icon>fas fa-window-maximize fa-rotate-270</v-icon>
    </v-btn>

    <v-btn
      v-if="$vuetify.breakpoint.smAndUp"
      fab
      dark
      small
      color="light-green darken-1"
      title="Näita nii andmeid kui ka kaarti"
      @click="updateSplitViewState(true)"
    >
      <v-icon>fas fa-columns</v-icon>
    </v-btn>

    <v-btn
      fab
      dark
      small
      color="light-green"
      title="Näita ainult andmeid"
      @click="updateDataViewState(true)"
    >
      <v-icon>fas fa-window-maximize fa-rotate-90</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SplitOptions",
  data: () => ({
    fab: false
  }),
  computed: {
    ...mapGetters("settings", [
      "getSplitViewState",
      "getMapViewState",
      "getDataViewState"
    ])
  },
  watch: {
    "$vuetify.breakpoint.xsOnly"(newVal) {
      if (newVal && this.getSplitViewState) this.updateDataViewState(true);
      else if (!newVal && this.getDataViewState)
        this.updateSplitViewState(true);
    }
  },
  methods: {
    ...mapActions("settings", [
      "updateSplitViewState",
      "updateMapViewState",
      "updateDataViewState"
    ])
  }
};
</script>

<style scoped>
.split-options {
  opacity: 0.3;
  transition: opacity 100ms ease-out;
}

.split-options:hover {
  opacity: 1;
  transition: opacity 100ms ease-in;
}

.split-options.v-speed-dial--is-active {
  opacity: 1;
}
</style>
