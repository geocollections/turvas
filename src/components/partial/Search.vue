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
          Puhasta otsing
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
      let name = "Andmed-turbageoloogia_andmebaas";
      switch (this.$route.meta.object) {
        case "area":
          name = "Alade_tabel-turbageoloogia_andmebaas";
          break;
        case "site":
          name = "Proovipunktide_tabel-turbageoloogia_andmebaas";
          break;
        case "sample":
          name = "Proovide_tabel-turbageoloogia_andmebaas";
          break;
        default:
          name = "Andmed-turbageoloogia_andmebaas";
      }
      return name;
    }
  }
};
</script>

<style scoped></style>
