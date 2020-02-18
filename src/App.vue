<template>
  <v-app>
    <AppHeader
      :is-front-page="$route.name === 'FrontPage'"
      :is-about-page="$route.name === 'About'"
    />

    <v-content v-if="$route.name !== 'FrontPage'">
      <router-view />
    </v-content>

    <div v-else>
      <router-view />
    </div>
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
</style>
