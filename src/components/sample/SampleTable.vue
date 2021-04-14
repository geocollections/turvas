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
          :items="translatedPaginateByItems"
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
        <span v-html="$tc('search.sample', sampleResultsCount)" />
      </v-card-title>

      <v-data-table
        class="ws-nowrap-table sample-table"
        :headers="translatedSampleHeaders"
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
            :to="`/proov/${item.sample_id}`"
            :title="$t('sample.detailView')"
            class="table-link"
          >
            {{ item.sample_id }}
          </router-link>
        </template>

        <template v-slot:item.number_additional="{ item }">
          <router-link
            :to="`/proov/${item.sample_id}`"
            :title="$t('sample.detailView')"
            class="table-link"
          >
            {{ item.number_additional }}
          </router-link>
        </template>

        <template v-slot:item.site="{ item }">
          <router-link
            :to="`/proovipunkt/${item.site_id}`"
            :title="$t('site.detailView')"
            class="table-link"
          >
            <div>{{ $translate({ et: item.site, en: item.site_en }) }}</div>
          </router-link>
        </template>

        <template v-slot:item.rock="{ item }">
          <v-card
            flat
            style="margin: 2px;"
            class="px-1"
            :class="getColor(item.rock)"
          >
            <span>
              {{ $translate({ et: item.rock, en: item.rock_en }) }}
            </span>
          </v-card>
        </template>

        <template v-slot:item.looduslik_niiskus="{ item }">
          <div v-if="item.looduslik_niiskus">
            {{
              Math.round((item.looduslik_niiskus + Number.EPSILON) * 100) / 100
            }}
          </div>
        </template>

        <!--        <template v-slot:item.taxon="{ item }">-->
        <!--          <div-->
        <!--            v-for="(entity, index) in taxonData.find(-->
        <!--              el => el.sample_id === item.sample_id-->
        <!--            )"-->
        <!--            :key="index"-->
        <!--          >-->
        <!--            <div v-if="index === 'results' && entity && entity.length > 0">-->
        <!--              <span v-for="(item, key) in entity" :key="key">-->
        <!--                <a-->
        <!--                  class="table-link"-->
        <!--                  :href="item.url"-->
        <!--                  :title="item.url"-->
        <!--                  target="ElurikkusWindow"-->
        <!--                >-->
        <!--                  {{ item.id }}-->
        <!--                </a>-->
        <!--                <span v-if="key !== entity.length - 1">|</span>-->
        <!--              </span>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </template>-->
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
import SearchService from "../../middleware/SearchService";
import tableTranslations from "@/mixins/tableTranslations";
export default {
  name: "SampleTable",

  components: { SampleSearch, Search },

  mixins: [searchMixin, tableTranslations],

  // data: () => ({
  //   taxonData: []
  // }),

  computed: {
    ...mapState("search", ["sampleResults", "sampleResultsCount"]),

    ...mapGetters("settings", ["getMapState"])
  },

  watch: {
    "$route.query": {
      handler(newVal) {
        this.updateSearch(newVal);
      },
      immediate: true
    }

    // sampleResults: {
    //   handler(newVal) {
    //     this.getTaxonData(newVal);
    //   },
    //   deep: true
    // }
  },

  methods: {
    ...mapActions("search", ["doSampleSearch", "fetchListParameters"]),
    ...mapActions("detail", ["fetchSampleTaxa"]),

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

    // async getTaxonData(sampleResults) {
    //   if (sampleResults && sampleResults.length > 0) {
    //     for (const sample of sampleResults) {
    //       let response = await SearchService.doSolrSearch("peat_taxa", {
    //         sample_id: sample.sample_id
    //       });
    //       if (typeof response === "object") {
    //         this.taxonData.push({
    //           sample_id: sample.sample_id,
    //           results: response.results
    //             .filter(item => item.plutof_taxon_id)
    //             .map(item => {
    //               return {
    //                 id: item.plutof_taxon_id,
    //                 url: `https://elurikkus.ee/bie-hub/species/${item.plutof_taxon_id}`,
    //                 sample_id: sample.sample_id
    //               };
    //             })
    //         });
    //       } else
    //         this.taxonData.push({ sample_id: sample.sample_id, results: [] });
    //     }
    //   }
    // }
  }
};
</script>

<style scoped>
.sample-table >>> .v-data-table td,
.sample-table >>> .v-data-table th {
  padding: 0 8px;
}
</style>
