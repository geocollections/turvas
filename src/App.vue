<template>
  <v-app>
    <AppHeader />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from "./components/partial/header/AppHeader";
export default {
  name: "App",
  components: { AppHeader },
  data: () => ({
    //
  })
};
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>
