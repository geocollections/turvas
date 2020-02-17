<template>
  <div class="app-header">
    <v-app-bar
      app
      style="z-index: 5000;"
      src="https://turvas.geoloogia.info/turbasammal.jpg"
      color="lime lighten-4"
      class="app-bar"
    >
      <v-app-bar-nav-icon
        class="text--primary hidden-md-and-up"
        @click="drawer = true"
      />

      <v-toolbar-title>
        <router-link
          class="toolbar-title mr-3"
          :to="{ path: '/' }"
          title="Mine pealehele"
        >
          Eesti turbauuringute andmebaas
        </router-link>
      </v-toolbar-title>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn text title="Turbaalad" to="/area">Turbaalad</v-btn>
        <v-btn text title="Proovipunktid" to="/site">Proovipunktid</v-btn>
        <v-btn text title="Projekti info" to="/about">Projekti info</v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-toolbar-items class="hidden-sm-and-down">
        <v-text-field
          :value="getFastSearch"
          hide-details
          dense
          rounded
          solo
          label="Otsi..."
          color="orange darken-2"
          class="align-center app-header-text-field"
          :class="$route.path === '/about' ? 'ml-4' : 'mx-4'"
          autocomplete="off"
          append-icon="fas fa-search"
          @click:append="doFastSearch"
          v-on:keyup.enter="doFastSearch"
          @input="updateFastSearch"
        />
      </v-toolbar-items>

      <v-btn
        v-if="$route.path !== '/about'"
        @click="updateMapState(!getMapState)"
        :title="getMapState ? 'Peida kaart' : 'Näita kaarti'"
        fab
        icon
        color="black"
        class="hidden-xs-only"
      >
        <span v-if="getMapState" class="fa-stack">
          <i class="fa-stack-2x fas fa-globe-americas"></i>
          <i class="fa-stack-2x fas fa-eye-slash error--text corner-icon"></i>
        </span>

        <span v-else class="fa-stack">
          <i class="fa-stack-2x fas fa-globe-americas"></i>
          <i class="fa-stack-2x fas fa-eye primary--text corner-icon"></i>
        </span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      style="z-index: 5001;"
    >
      <v-list nav>
        <v-list-item-group active-class="green--text text--accent-4">
          <v-list-item to="/area">
            <v-list-item-icon>
              <v-icon>fas fa-layer-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Turbaalad</v-list-item-title>
          </v-list-item>

          <v-list-item to="/site">
            <v-list-item-icon>
              <v-icon>fas fa-map-pin</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Proovipunktid</v-list-item-title>
          </v-list-item>

          <v-list-item to="/about">
            <v-list-item-icon>
              <v-icon>fas fa-info</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Projekti info</v-list-item-title>
          </v-list-item>
        </v-list-item-group>

        <v-list-item class="px-0 pt-2">
          <v-text-field
            :value="getFastSearch"
            hide-details
            solo
            label="Otsi..."
            class="align-center"
            autocomplete="off"
            append-icon="fas fa-search"
            @click:append="doFastSearch"
            v-on:keyup.enter="doFastSearch"
            @input="updateFastSearch"
          />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppHeader",

  data: () => ({
    drawer: false
  }),

  computed: {
    ...mapGetters("search", ["getFastSearch"]),
    ...mapGetters("settings", ["getMapState"])
  },

  watch: {
    "$vuetify.breakpoint.xsOnly"(newVal) {
      this.updateMapState(!newVal);
    }
  },

  methods: {
    ...mapActions("search", ["doFastSearch", "updateFastSearch"]),
    ...mapActions("settings", ["updateMapState"])
  }
};
</script>

<style scoped>
.toolbar-title {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
  transition: color 100ms ease-out;
}

.toolbar-title:hover {
  color: #e65100 !important;
  transition: color 100ms ease-in;
}

.app-bar >>> .v-toolbar__image {
  opacity: 0.25;
}

.corner-icon {
  font-size: 20px;
  padding-left: 12px;
}

.app-header-text-field >>> .v-input__slot {
  background: rgba(196, 208, 150, 0.5) !important;
}
</style>
