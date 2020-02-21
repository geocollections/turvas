<template>
  <v-app>
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
export default {
  name: "App",
  components: { AppHeader }
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
