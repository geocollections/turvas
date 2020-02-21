<template>
  <div class="site-table">
<!--    {{ siteSearchParams }}-->

    <!-- SEARCH -->
    <v-row no-gutters class="pt-1 px-1">
      <v-col class="pt-1 px-1">
        <v-btn @click="resetSearch" color="primary">
          Puhasta otsing
          <v-icon right small>fas fa-eraser</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- PAGINATION -->
    <v-row no-gutters class="pa-1" justify="center">
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
          :value="siteSearchParams.paginateBy"
          :items="paginateByItems"
          @change="handleUpdatePaginateBy"
        />
      </v-col>

      <v-col cols="11" sm="9" md="8" lg="8" class="pa-1">
        <v-pagination
          :value="siteSearchParams.page"
          :class="{ 'justify-end': $vuetify.breakpoint.mdAndUp }"
          circle
          :length="Math.ceil(siteResultsCount / siteSearchParams.paginateBy)"
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
          >Leitud <b>{{ siteResultsCount }}</b> proovipunkti</span
        >
        <v-spacer />
        <v-text-field
          :value="filter"
          hide-details
          single-line
          label="Filtreeri"
          @input="handleUpdateFilter"
        ></v-text-field>
      </v-card-title>

      <v-data-table
        class="ws-nowrap-table"
        :headers="siteHeaders"
        hide-default-footer
        dense
        :items="siteResults"
        :items-per-page="siteSearchParams.paginateBy"
        multi-sort
        :page="siteSearchParams.page"
        expand-icon="fas fa-caret-down"
        :sort-by="siteSearchParams.sortBy"
        :sort-desc="siteSearchParams.sortDesc"
        :server-items-length="siteResultsCount"
        @update:sort-by="handleUpdateSortBy"
        @update:sort-desc="handleUpdateSortDesc"
      >
        <template v-slot:item.name="{ item }">
          <router-link
            :to="`/site/${item.id}`"
            title="Proovipunkti detailvaade"
            class="table-link"
          >
            {{ item.name }}
          </router-link>
        </template>

        <template v-slot:item.area_name="{ item }">
          <router-link
            :to="`/area/${item.area_id}`"
            title="Ala detailvaade"
            class="table-link"
          >
            {{ item.area_name }}
          </router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import debounce from "lodash/debounce";
import searchMixin from "../../mixins/searchMixin";

export default {
  name: "SiteTable",

  mixins: [searchMixin],

  computed: {
    ...mapState("search", [
      "siteHeaders",
      "siteResults",
      "siteResultsCount",
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
    ...mapActions("search", ["doSiteSearch"]),

    updateSearch: debounce(function(params) {
      this.doSiteSearch(params);
    }, 10)
  }
};
</script>

<style scoped></style>
