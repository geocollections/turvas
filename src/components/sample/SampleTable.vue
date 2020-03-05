<template>
  <div class="sample-table">
    <!-- SAMPLE SEARCH -->
    <SampleSearch />

    <!-- SEARCH -->
    <Search
      v-on:reset:search="resetSampleSearch"
      :results="sampleResults"
      :count="sampleResultsCount"
    />

    <!-- PAGINATION -->
    <v-row no-gutters class="pa-1 pt-0" justify="center">
      <v-col
        cols="9"
        :sm="getMapState ? 9 : 4"
        md="4"
        lg="4"
        class="pa-1"
        align-self="center"
      >
        <v-select
          solo
          dense
          hide-details
          :value="sampleSearchParams.paginateBy"
          :items="paginateByItems"
          @change="handleUpdatePaginateBy"
        />
      </v-col>

      <v-col cols="11" sm="9" md="8" lg="8" class="pa-1">
        <v-pagination
          :value="sampleSearchParams.page"
          :class="{ 'justify-end': $vuetify.breakpoint.mdAndUp }"
          circle
          :length="
            Math.ceil(sampleResultsCount / sampleSearchParams.paginateBy)
          "
          :total-visible="5"
          @input="handleUpdatePage"
        />
      </v-col>
    </v-row>

    <!-- TABLE -->
    <v-card flat>
      <v-card-title>
        <v-icon color="primary" left>fas fa-layer-group</v-icon>
        <span
          >Leitud <b>{{ sampleResultsCount }}</b> proovi</span
        >
      </v-card-title>

      <v-data-table
        class="ws-nowrap-table"
        :headers="sampleHeaders"
        hide-default-footer
        dense
        :items="sampleResults"
        :items-per-page="sampleSearchParams.paginateBy"
        multi-sort
        :page="sampleSearchParams.page"
        expand-icon="fas fa-caret-down"
        :sort-by="sampleSearchParams.sortBy"
        :sort-desc="sampleSearchParams.sortDesc"
        :server-items-length="sampleResultsCount"
        @update:sort-by="handleUpdateSortBy"
        @update:sort-desc="handleUpdateSortDesc"
      >
        <template v-slot:item.sample_id="{ item }">
          <router-link
            :to="`/sample/${item.sample_id}`"
            title="Proovi detailvaade"
            class="table-link"
          >
            {{ item.sample_id }}
          </router-link>
        </template>

        <template v-slot:item.number_additional="{ item }">
          <router-link
            :to="`/sample/${item.sample_id}`"
            title="Proovi detailvaade"
            class="table-link"
          >
            {{ item.number_additional }}
          </router-link>
        </template>

        <template v-slot:item.site="{ item }">
          <router-link
            :to="`/site/${item.site_id}`"
            title="Proovipunkti detailvaade"
            class="table-link"
          >
            {{ item.site }}
          </router-link>
        </template>

        <template v-slot:item.rock="{ item }">
          <v-card
            flat
            style="margin: 2px;"
            class="px-1"
            :class="getColor(item.rock)"
          >
            {{ item.rock }}
          </v-card>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Search from "../partial/Search";
import searchMixin from "../../mixins/searchMixin";
import { mapActions, mapGetters, mapState } from "vuex";
import debounce from "lodash/debounce";
import SampleSearch from "./SampleSearch";
export default {
  name: "SampleTable",

  components: { SampleSearch, Search },

  mixins: [searchMixin],

  computed: {
    ...mapState("search", [
      "sampleHeaders",
      "sampleResults",
      "sampleResultsCount",
      "paginateByItems"
    ]),

    ...mapGetters("settings", ["getMapState"])
  },

  watch: {
    "$route.query": {
      handler(newVal) {
        this.updateSearch(newVal);
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions("search", ["doSampleSearch", "fetchListParameters"]),

    updateSearch: debounce(function(params) {
      this.doSampleSearch(params);
    }, 10),

    getColor(name) {
      let lighten = " lighten-4";
      switch (name) {
        case "järvemuda":
          return "blue-grey" + lighten;
        case "siirdesooturvas":
          return "green" + lighten;
        case "madalsooturvas":
          return "blue" + lighten;
        case "rabaturvas":
          return "yellow" + lighten;
        default:
          return "green" + lighten;
      }
    },

    resetSampleSearch() {
      this.resetSearch();
      this.fetchListParameters(true);
    }
  }
};
</script>

<style scoped></style>
