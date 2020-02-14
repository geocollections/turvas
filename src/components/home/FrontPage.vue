<template>
  <v-card class="front-page">
    <RouteLinkTabs />

    <v-card-title>{{ $route.name }}</v-card-title>
  </v-card>
</template>

<script>
import RouteLinkTabs from "../partial/RouteLinkTabs";
export default {
  name: "FrontPage",
  components: { RouteLinkTabs }
};
</script>

<style scoped></style>
