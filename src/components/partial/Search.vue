<template>
  <v-card flat>
    <v-card
      flat
      class="pt-1 px-1 d-flex flex-wrap justify-center justify-md-start"
    >
      <v-card flat v-if="count > 0" class="pa-1">
        <ExportButtons :filename="getFilename()" :table-data="results" />
      </v-card>
      <v-card flat class="pa-1">
        <v-btn @click="$emit('reset:search')">
          {{ $t("search.clear") }}
          <v-icon right small>fas fa-eraser</v-icon>
        </v-btn>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
import ExportButtons from "./export/ExportButtons";
export default {
  name: "Search",
  components: { ExportButtons },
  props: {
    results: {
      type: Array,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  methods: {
    getFilename() {
      let name = this.$t("export.defaultFilename");
      switch (this.$route.meta.object) {
        case "area":
          name = this.$t("export.areaFilename");
          break;
        case "site":
          name = this.$t("export.siteFilename");
          break;
        case "sample":
          name = this.$t("export.sampleFilename");
          break;
        default:
          name = this.$t("export.defaultFilename");
      }
      return name;
    }
  }
};
</script>

<style scoped></style>
