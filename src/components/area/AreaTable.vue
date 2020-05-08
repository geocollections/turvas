<template>
  <div class="area-table">
    <!-- SEARCH -->
    <Search
      v-on:reset:search="resetSearch"
      :results="areaResults"
      :count="areaResultsCount"
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
          :value="areaSearchParams.paginateBy"
          :items="paginateByItems"
          @change="handleUpdatePaginateBy"
        />
      </v-col>

      <v-col cols="11" sm="9" md="8" lg="8" class="pa-1">
        <v-pagination
          :value="areaSearchParams.page"
          :class="{ 'justify-end': $vuetify.breakpoint.mdAndUp }"
          circle
          :length="Math.ceil(areaResultsCount / areaSearchParams.paginateBy)"
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
          >Leitud <b>{{ areaResultsCount }}</b> ala</span
        >
        <v-spacer />
        <v-text-field
          :value="filter"
          hide-details
          single-line
          label="Otsi tabelist..."
          @input="handleUpdateFilter"
        ></v-text-field>
      </v-card-title>

      <v-data-table
        class="ws-nowrap-table"
        :headers="areaHeaders"
        hide-default-footer
        dense
        :items="areaResults"
        :items-per-page="areaSearchParams.paginateBy"
        multi-sort
        :page="areaSearchParams.page"
        expand-icon="fas fa-caret-down"
        :sort-by="areaSearchParams.sortBy"
        :sort-desc="areaSearchParams.sortDesc"
        :server-items-length="areaResultsCount"
        @update:sort-by="handleUpdateSortBy"
        @update:sort-desc="handleUpdateSortDesc"
      >
        <template v-slot:item.name="{ item }">
          <router-link
            :to="`/area/${item.id}`"
            title="Turbaala detailvaade"
            class="table-link"
          >
            {{ item.name }}
          </router-link>
        </template>

        <template v-slot:item.maardla="{ item }">
          <a
            class="table-link"
            :href="getMaardlaUrl(item.maardla)"
            :title="getMaardlaUrl(item.maardla)"
            target="MaardlaWindow"
          >
            {{ item.maardla }}
          </a>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import debounce from "lodash/debounce";
import searchMixin from "../../mixins/searchMixin";
import Search from "../partial/Search";

export default {
  name: "AreaTable",

  components: { Search },

  mixins: [searchMixin],

  computed: {
    ...mapState("search", [
      "areaHeaders",
      "areaResults",
      "areaResultsCount",
      "paginateByItems"
    ]),

    ...mapGetters("settings", ["getMapState"]),

    filter() {
      return this.$route.query.filter || "";
    }
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
    ...mapActions("search", ["doAreaSearch"]),

    updateSearch: debounce(function(params) {
      this.doAreaSearch(params);
    }, 10),

    getMaardlaUrl(maardla) {
      return `https://xgis.maaamet.ee/xGIS/bronx/maardlad/showdata.aspx?registrikaart=${maardla}`;
    }
  }
};
</script>

<style scoped></style>
