<template>
  <v-app-bar app style="z-index: 5000;">
    <template v-slot:img>
      <div class="app-bar-image" />
    </template>

    <v-toolbar-title>
      <router-link
        class="toolbar-title font-weight-bold secondary--text"
        :to="{ path: '/' }"
        title="Mine pealehele"
      >
        Eesti turbauuringute andmebaas
      </router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-text-field
        :value="getFastSearch"
        hide-details
        solo
        label="Otsi..."
        class="align-center mx-4"
        autocomplete="off"
        append-icon="fas fa-search"
        @click:append="doFastSearch"
        @input="updateFastSearch"
      />
    </v-toolbar-items>

    <v-spacer />

    <v-btn
      @click="$router.go(-1)"
      title="Mine tagasi"
      fab
      icon
      color="secondary"
    >
      <v-icon>fas fa-arrow-left</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppHeader",

  computed: {
    ...mapGetters("search", ["getFastSearch"])
  },

  methods: {
    ...mapActions("search", ["doFastSearch", "updateFastSearch"])
  }
};
</script>

<style scoped>
.toolbar-title {
  text-decoration: none;
  transition: color 100ms ease-out;
}

.toolbar-title:hover {
  opacity: 0.7;
  color: #4caf50 !important;
  transition: color 100ms ease-in;
}

.app-bar-image {
  background-image: url(https://turvas.geoloogia.info/sammal.png);
  height: 64px;
  background-repeat: repeat-x;
  background-position-y: -20px;
  background-position-x: 130px;
  opacity: 0.25;
}
</style>
