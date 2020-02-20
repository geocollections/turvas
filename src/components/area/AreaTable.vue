<template>
  <div class="area-table">
    {{ areaSearchParams }}

    <!-- SEARCH -->
    <v-row no-gutters class="pa-1">
      <v-col class="px-1">
        <v-btn @click="resetSearch" color="secondary">Puhasta otsing</v-btn>
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
          label="Filtreeri"
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
            title="Ala detailvaade"
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
            rel="noreferrer noopener"
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

export default {
  name: "AreaTable",

  computed: {
    ...mapState("search", [
      "areaHeaders",
      "areaResults",
      "areaResultsCount",
      "paginateByItems",
      "areaSearchParams"
    ]),

    ...mapGetters("settings", ["getMapState"]),

    filter() {
      return this.$route.query.filter || "";
    }
  },

  watch: {
    "$route.query": {
      handler(newVal) {
        console.log(newVal)
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
    },

    handleUpdateFilter(newVal) {
      if (this.areaSearchParams.page === 1) {
        this.$router
          .push({ query: { ...this.$route.query, filter: newVal } })
          .catch(err => {});
      } else {
        this.$router
          .push({
            query: { ...this.$route.query, filter: newVal, page: 1 }
          })
          .catch(err => {});
      }
    },

    handleUpdatePage(newVal) {
      if (this.areaSearchParams.page !== newVal) {
        this.$router
          .push({ query: { ...this.$route.query, page: newVal } })
          .catch(err => {});
      }
    },

    handleUpdatePaginateBy(newVal) {
      this.$router
        .push({
          query: { ...this.$route.query, paginateBy: newVal, page: 1 }
        })
        .catch(err => {});
    },

    handleUpdateSortBy(newVal) {
      if (newVal.length > 0) {
        this.$router
          .push({
            query: { ...this.$route.query, sortBy: newVal.toString() }
          })
          .catch(err => {});
      } else {
        let { sortBy, ...noSortBy } = this.$route.query;
        this.$router.push({ query: noSortBy }).catch(err => {});
      }
    },

    handleUpdateSortDesc(newVal) {
      if (newVal.length > 0) {
        this.$router
          .push({
            query: { ...this.$route.query, sortDesc: newVal.toString() }
          })
          .catch(err => {});
      } else {
        let { sortDesc, ...noSortDesc } = this.$route.query;
        this.$router.push({ query: noSortDesc }).catch(err => {});
      }
    },

    resetSearch() {
      this.$router
        .push({
          path: "/area",
          query: { page: 1, paginateBy: 25, sortBy: "name", sortDesc: "false" }
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped></style>
