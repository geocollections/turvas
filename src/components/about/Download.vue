<template>
  <v-card-text>
    <div class="pb-2">{{ downloadText }}</div>

    <ul>
      <li v-for="link in downloadLinks" :key="link.id">
        <router-link
          v-if="link.isRouterLink"
          :to="link.src"
          :title="link.title"
          class="table-link"
          >{{ link.text }}</router-link
        >
        <a
          v-else
          :href="link.src"
          :title="link.title"
          class="table-link"
          :target="link.target"
          >{{ link.text }}</a
        >
      </li>
    </ul>
  </v-card-text>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Download",
  computed: {
    ...mapState("settings", ["downloadText", "downloadLinks"])
  }
};
</script>

<style scoped></style>
