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
          class="hidden-lg-and-up white--text"
          @click="drawer = true"
        />

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-toolbar-title v-on="on">
              <router-link class="toolbar-title mr-3" :to="{ path: '/' }">
                TURB<span class="toolbar-title-a">A</span>
              </router-link>
            </v-toolbar-title>
          </template>
          <span>{{ $t("header.goToFrontPage") }}</span>
        </v-tooltip>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text title="Turbaalad" to="/turbaala" exact color="white">{{
            $t("header.areas")
          }}</v-btn>
          <v-btn
            text
            title="Proovipunktid"
            to="/proovipunkt"
            exact
            color="white"
            >{{ $t("header.sites") }}</v-btn
          >
          <v-btn text title="Proovid" to="/proov" exact color="white">{{
            $t("header.samples")
          }}</v-btn>
          <v-btn
            text
            title="Projekti info"
            to="/projekti_info"
            exact
            color="white"
            >{{ $t("header.projectInfo") }}</v-btn
          >
          <v-btn
            text
            title="Failide allalaadimine"
            to="/allalaadimine"
            exact
            color="white"
            class="hidden-md-and-down"
            >{{ $t("header.download") }}</v-btn
          >
          <v-btn
            text
            title="Loe kasutusjuhendit"
            to="/kasutusjuhend"
            exact
            color="white"
            class="hidden-md-and-down"
            >{{ $t("header.userManual") }}</v-btn
          >
        </v-toolbar-items>

        <v-spacer />

        <v-toolbar-items>
          <!--          <v-tooltip bottom>-->
          <!--            <template v-slot:activator="{ on }">-->
          <!--              <v-btn-->
          <!--                v-on="on"-->
          <!--                icon-->
          <!--                href="https://geoloogia.info"-->
          <!--                target="EMaapouWindow"-->
          <!--              >-->
          <!--                <img-->
          <!--                  height="20"-->
          <!--                  width="20"-->
          <!--                  :src="require('@/assets/img/emaapou6white.svg')"-->
          <!--                  alt="e-Maapõu"-->
          <!--                />-->
          <!--              </v-btn>-->
          <!--            </template>-->

          <!--            <span>{{ $t("header.emaapou") }}</span>-->
          <!--          </v-tooltip>-->

          <v-menu
            transition="slide-y-transition"
            v-model="externalResourcesDropdown"
            offset-y
            z-index="2101"
          >
            <template v-slot:activator="{ on }">
              <v-btn color="white" text v-on="on">
                {{ $t("header.resources") }}
                <v-icon right>{{
                  externalResourcesDropdown
                    ? "fas fa-caret-up"
                    : "fas fa-caret-down"
                }}</v-icon>
              </v-btn>
            </template>

            <v-list color="primary" dark dense>
              <v-list-item
                v-for="(item, id) in externalResources"
                :key="item.text"
                :href="item.url"
                target="ExternalResourcesWindow"
              >
                <v-list-item-icon>
                  <img
                    v-if="id === 0"
                    height="24"
                    width="24"
                    :src="require('@/assets/img/emaapou6white.svg')"
                    :alt="$t(item.text)"
                  />
                  <v-icon v-else v-text="item.icon" />
                </v-list-item-icon>
                <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <lang-buttons />

          <v-text-field
            :value="getFastSearch"
            hide-details
            dense
            solo-inverted
            dark
            :label="$t('header.searchArea')"
            class="align-center hidden-sm-and-down"
            :class="!isAboutPage && !isFrontPage ? 'mx-4' : 'ml-4'"
            autocomplete="off"
            append-icon="fas fa-search"
            @click:append="goToAreaSearch"
            v-on:keyup.enter="goToAreaSearch"
            @input="updateFastSearch"
          />
        </v-toolbar-items>

        <v-tooltip
          bottom
          v-if="
            !isAboutPage && !isFrontPage && !isDownloadPage && !isUserManualPage
          "
        >
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              @click="updateMapState(!getMapState)"
              fab
              icon
              dark
            >
              <v-icon v-if="!!getMapState">fas fa-map</v-icon>
              <v-icon v-else>far fa-map</v-icon>
            </v-btn>
          </template>

          <span>{{
            getMapState ? $t("header.hideMap") : $t("header.showMap")
          }}</span>
        </v-tooltip>
      </v-app-bar>
    </v-hover>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      style="z-index: 5001;"
    >
      <v-list nav>
        <v-list-item-group active-class="primary--text">
          <v-list-item to="/" role="option">
            <v-list-item-icon>
              <v-icon>fas fa-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("header.frontPage") }}</v-list-item-title>
          </v-list-item>

          <v-list-item to="/turbaala" role="option">
            <v-list-item-icon>
              <v-icon>fas fa-layer-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("header.areas") }}</v-list-item-title>
          </v-list-item>

          <v-list-item to="/proovipunkt" role="option">
            <v-list-item-icon>
              <v-icon>fas fa-map-pin</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("header.sites") }}</v-list-item-title>
          </v-list-item>

          <v-list-item to="/proov" role="option">
            <v-list-item-icon>
              <v-icon>fas fa-vials</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("header.samples") }}</v-list-item-title>
          </v-list-item>

          <v-list-item to="/projekti_info" role="option">
            <v-list-item-icon>
              <v-icon>fas fa-info</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{
              $t("header.projectInfo")
            }}</v-list-item-title>
          </v-list-item>

          <v-list-item to="/allalaadimine" role="option">
            <v-list-item-icon>
              <v-icon>fas fa-download</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("header.download") }}</v-list-item-title>
          </v-list-item>

          <v-list-item to="/kasutusjuhend" role="option">
            <v-list-item-icon>
              <v-icon>fas fa-question-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t("header.userManual") }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>

        <v-list-item class="px-0 pt-2">
          <v-text-field
            :value="getFastSearch"
            hide-details
            solo
            :label="$t('header.searchArea')"
            class="align-center"
            autocomplete="off"
            append-icon="fas fa-search"
            @click:append="goToAreaSearch"
            v-on:keyup.enter="goToAreaSearch"
            @input="updateFastSearch"
          />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LangButtons from "@/components/partial/LangButtons";

export default {
  name: "AppHeader",
  components: { LangButtons },
  props: {
    isFrontPage: Boolean,
    isAboutPage: Boolean,
    isUserManualPage: Boolean,
    isDownloadPage: Boolean
  },

  data: () => ({
    drawer: false,
    externalResourcesDropdown: false,
    externalResources: [
      {
        icon: require("@/assets/img/emaapou6white.svg"),
        text: "resources.eMaapou",
        url: "https://geoloogia.info"
      },
      {
        icon: "fab fa-github",
        text: "resources.turvasGithub",
        url: "https://github.com/geocollections/turvas"
      },
      {
        icon: "fas fa-database",
        text: "resources.publicApi",
        url: "https://api.geocollections.info/"
      }
    ]
  }),

  computed: {
    ...mapGetters("search", ["getFastSearch"]),
    ...mapGetters("settings", ["getMapState"])
  },

  methods: {
    ...mapActions("search", ["updateFastSearch"]),
    ...mapActions("settings", ["updateMapState"]),

    goToAreaSearch() {
      if (this.getFastSearch && this.getFastSearch.trim().length > 0) {
        this.$router
          .push({
            path: "/turbaala",
            query: { filter: this.getFastSearch.trim() }
          })
          .catch(err => {});
      }
    }
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

.toolbar-title-a {
  color: rgba(0, 0, 0, 0.87);
  font-weight: bold;
}

.toolbar-title:hover > .toolbar-title-a {
  color: #fff !important;
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
</style>
