<template>
  <div class="area-table">
    <!-- SEARCH -->

    <!-- TABLE -->
    <v-card flat>
      <v-card-title>
        <v-icon color="primary" left>fas fa-layer-group</v-icon>
        <span
          >Leitud <b>{{ areaResultsCount }}</b> ala</span
        >
        <v-spacer />
        <v-text-field
          v-model="filter"
          hide-details
          single-line
          label="Filtreeri"
        ></v-text-field>
      </v-card-title>

      <v-data-table
        class="ws-nowrap-table"
        :headers="areaHeaders"
        hide-default-footer
        dense
        :items="areaResults"
        :items-per-page="areaPaginateBy"
        multi-sort
        :page="areaPage"
        :search="filter"
        expand-icon="fas fa-caret-down"
        :sort-by="areaSortBy"
        :sort-desc="areaSortDesc"
        :server-items-length="areaResultsCount"
      >
        <template v-slot:item.name="{ item }">
          <router-link
            :to="`/area/${item.id}`"
            title="Ala detailvaade"
            class="table-link"
          >
            {{ item.name }}
          </router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AreaTable",
  data: () => ({
    filter: ""
  }),
  computed: {
    ...mapState("search", [
      "areaHeaders",
      "areaResults",
      "areaResultsCount",
      "areaPage",
      "areaPaginateBy",
      "areaSortBy",
      "areaSortDesc"
    ])
  },
  created() {
    if (this.areaResultsCount === 0) this.doAreaSearch({ area_type: 2 });
  },
  methods: {
    ...mapActions("search", ["doAreaSearch"])
  }
};
</script>

<style scoped></style>
