<template>
  <div class="app-header">
    <v-hover v-slot:default="{ hover }">
      <v-app-bar
        app
        :color="isFrontPage ? '' : 'green lighten-1'"
        :elevation="isFrontPage && hover ? 12 : 4"
        class="app-bar"
        dark
        :class="isFrontPage ? 'app-bar-front' : ''"
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
            Turbageoloogia andmebaas
          </router-link>
        </v-toolbar-title>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn text title="Turbaalad" to="/area" exact active-class="test">Turbaalad</v-btn>
          <v-btn text title="Proovipunktid" to="/site" exact
            >Proovipunktid</v-btn
          >
          <v-btn text title="Projekti info" to="/about" exact
            >Projekti info</v-btn
          >
        </v-toolbar-items>

        <v-spacer />

        <v-toolbar-items class="hidden-sm-and-down">
          <v-text-field
            :value="getFastSearch"
            hide-details
            dense
            solo
            label="Otsi..."
            color="orange darken-2"
            class="align-center app-header-text-field"
            :class="!isAboutPage && !isFrontPage ? 'mx-4' : 'ml-4'"
            autocomplete="off"
            append-icon="fas fa-search"
            @click:append="doFastSearch"
            v-on:keyup.enter="doFastSearch"
            @input="updateFastSearch"
          />
        </v-toolbar-items>

        <v-btn
          v-if="!isAboutPage && !isFrontPage"
          @click="updateMapState(!getMapState)"
          :title="getMapState ? 'Peida kaart' : 'Näita kaarti'"
          fab
          icon
          class="hidden-xs-only"
        >
          <span v-if="getMapState" class="fa-stack">
            <i class="fa-stack-2x fas fa-globe-americas"></i>
            <i class="fa-stack-2x fas fa-eye-slash error--text corner-icon"></i>
          </span>

          <span v-else class="fa-stack">
            <i class="fa-stack-2x fas fa-globe-americas"></i>
            <i class="fa-stack-2x fas fa-eye black--text corner-icon"></i>
          </span>
        </v-btn>
      </v-app-bar>
    </v-hover>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      style="z-index: 5001;"
    >
      <v-list nav>
        <v-list-item-group active-class="green--text text--accent-4">
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>fas fa-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Pealeht</v-list-item-title>
          </v-list-item>

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

  props: {
    isFrontPage: Boolean,
    isAboutPage: Boolean
  },

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
  color: #fff;
  font-weight: 500;
  transition: color 100ms ease-out;
}

.toolbar-title:hover {
  color: #000 !important;
  transition: color 100ms ease-in;
}

.test {
  background-color: rgba(230, 81, 0, 0.12);
}

.app-bar {
  z-index: 5000;
}

.app-bar-front {
  background-color: rgba(102, 187, 106, 0.46) !important;
}

.app-bar-front:hover {
  background-color: rgba(102, 187, 106, 1) !important;
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
