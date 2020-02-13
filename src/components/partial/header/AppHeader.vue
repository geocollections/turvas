<template>
  <v-app-bar app style="z-index: 5000;">
    <template v-slot:img>
      <div class="app-bar-image" />
    </template>

    <v-toolbar-title>
      <router-link
        class="toolbar-title"
        :to="{ path: '/' }"
        title="Mine pealehele"
      >
        Eesti turbauuringute andmebaas
      </router-link>
    </v-toolbar-title>

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
export default {
  name: "AppHeader"
};
</script>

<style scoped>
.toolbar-title {
  text-decoration: none;
  color: #000;
}

.toolbar-title:hover {
  opacity: 0.7;
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
