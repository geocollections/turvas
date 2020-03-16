<template>
  <v-app>
    <ErrorSnackbar
      v-if="getErrorState"
      :error="getErrorState"
      :message="getErrorMessage"
      v-on:update:error="updateErrorState"
    />
    <SuccessSnackbar
      v-if="getSuccessState"
      :success="getSuccessState"
      :message="getSuccessMessage"
      v-on:update:success="updateSuccessState"
    />

    <AppHeader
      :is-front-page="$route.name === 'FrontPage'"
      :is-about-page="$route.name === 'About'"
    />

    <v-content :style="$route.name === 'FrontPage' ? 'padding: unset;' : ''">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from "./components/partial/header/AppHeader";
import ErrorSnackbar from "./components/partial/snackbar/ErrorSnackbar";
import SuccessSnackbar from "./components/partial/snackbar/SuccessSnackbar";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: { SuccessSnackbar, ErrorSnackbar, AppHeader },
  computed: {
    ...mapGetters("error", ["getErrorState", "getErrorMessage"]),
    ...mapGetters("success", ["getSuccessState", "getSuccessMessage"])
  },
  watch: {
    $route: {
      handler: to => {
        if (to.name.includes("Detail")) {
          document.title =
            to.meta.title + to.params.id || "Turbageoloogia andmebaas";
        } else {
          document.title = to.meta.title || "Turbageoloogia andmebaas";
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions("error", ["updateErrorState"]),
    ...mapActions("success", ["updateSuccessState"])
  }
};
</script>

<style>
html {
  overflow-y: auto !important;
}

.v-application {
  font-family: "Raleway", "Fira Sans", sans-serif !important;
  -webkit-font-smoothing: antialiased;
}
</style>
