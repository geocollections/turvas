<template>
  <div class="app-header">
    <v-hover v-slot:default="{ hover }">
      <v-app-bar
        height="64"
        app
        style="z-index: 5000;"
        :elevation="isFrontPage && hover ? 12 : 4"
        class="app-bar"
        :class="{ 'app-bar-front': isFrontPage }"
      >
        <v-app-bar-nav-icon
          class="hidden-md-and-up white--text"
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
          <v-btn text title="Turbaalad" to="/area" exact color="white"
            >Turbaalad</v-btn
          >
          <v-btn text title="Proovipunktid" to="/site" exact color="white"
            >Proovipunktid</v-btn
          >
          <v-btn text title="Projekti info" to="/about" exact color="white"
            >Projekti info</v-btn
          >
        </v-toolbar-items>

        <v-spacer />

        <v-toolbar-items>
          <v-text-field
            :value="getFastSearch"
            hide-details
            dense
            solo-inverted
            dark
            label="Otsi..."
            class="align-center hidden-sm-and-down"
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
          class="white--text"
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
        <v-list-item-group active-class="primary--text">
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
  color: rgba(0, 0, 0, 0.87) !important;
  transition: color 100ms ease-in;
}

.app-bar {
  background: linear-gradient(
    320deg,
    rgb(129, 199, 132) 0%,
    rgb(76, 175, 80) 100%
  );
}

.app-bar-front {
  background: linear-gradient(
    320deg,
    rgba(129, 199, 132, 0.46) 0%,
    rgba(76, 175, 80, 0.46) 100%
  ) !important;
}

.app-bar-front:hover {
  background: linear-gradient(
    320deg,
    rgba(129, 199, 132, 1) 0%,
    rgba(76, 175, 80, 1) 100%
  ) !important;
}

.app-bar >>> .v-toolbar__image {
  opacity: 0.25;
}

.corner-icon {
  font-size: 20px;
  padding-left: 12px;
}
</style>
