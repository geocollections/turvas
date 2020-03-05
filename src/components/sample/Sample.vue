<template>
  <div class="sample">
    <!-- Main data -->
    <v-card flat v-if="getSample" id="general">
      <h1>
        <v-card-title class="display-1">
          Proov: {{ getSample.number_additional }}
        </v-card-title>
      </h1>

      <v-data-table
        :mobile-breakpoint="9000"
        disable-sort
        disable-filtering
        disable-pagination
        hide-default-header
        hide-default-footer
        :headers="filteredSampleHeaders"
        :items="[getSample]"
      >
        <template v-slot:item.site="{ item }">
          <router-link
            :to="`/site/${item.site}`"
            title="Proovipunkti detailvaade"
            class="table-link"
          >
            {{ item.site__name }}
          </router-link>
        </template>

        <template v-slot:item.site__area="{ item }">
          <router-link
            :to="`/area/${item.site__area}`"
            title="Ala detailvaade"
            class="table-link"
          >
            {{ item.site__area__name }}
          </router-link>
        </template>
      </v-data-table>
    </v-card>

    <!-- Analyses -->
    <v-card
      flat
      v-if="getSampleAnalyses && getSampleAnalyses.length > 0"
      id="analyses"
    >
      <h2>
        <v-card-title class="headline">Analüüsid</v-card-title>
      </h2>

      <v-data-table
        class="ws-nowrap-table"
        multi-sort
        hide-default-footer
        disable-sort
        :headers="getSampleAnalysesHeaders"
        :items="getSampleAnalyses"
        group-by="analysis_method"
      >
        <template v-slot:item.value="{ item }">
          <div v-if="item.value">{{ item.value }}</div>
          <div v-else-if="item.value_txt">{{ item.value_txt[0] }}</div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Taxon info -->
    <v-card flat v-if="getSampleTaxa && getSampleTaxa.length > 0" id="taxon">
      <h2>
        <v-card-title class="headline">Taksonid</v-card-title>
      </h2>

      <v-data-table
        class="ws-nowrap-table"
        multi-sort
        hide-default-footer
        disable-sort
        :headers="getSampleTaxaHeaders"
        :items="getSampleTaxa"
      >
        <!--        <template v-slot:item.taxon_id="{ item }">-->
        <!--          <a-->
        <!--            class="table-link"-->
        <!--            :href="getFossilsLink(item.taxon_id)"-->
        <!--            title="Link fossiilide portaali"-->
        <!--            target="FossilsWindow"-->
        <!--          >-->
        <!--            {{ item.taxon_id }}-->
        <!--          </a>-->
        <!--        </template>-->

        <template v-slot:item.plutof_taxon_id="{ item }">
          <v-btn
            v-if="item.plutof_taxon_id"
            class="table-link"
            :href="getElurikkusLink(item.plutof_taxon_id)"
            title="Link eElurikkuse portaali"
            target="ElurikkusWindow"
            icon
            color="primary"
          >
            <v-icon>fas fa-external-link-alt</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sample",

  computed: {
    ...mapGetters("detail", [
      "getSample",
      "filteredSampleHeaders",
      "getSampleAnalyses",
      "getSampleAnalysesHeaders",
      "getSampleTaxa",
      "getSampleTaxaHeaders"
    ])
  },

  methods: {
    // getFossilsLink(id) {
    //   if (id) {
    //     return `https://fossiilid.info/${id}`;
    //   } else return "https://fossiilid.info/";
    // },

    getElurikkusLink(id) {
      if (id) {
        return `https://elurikkus.ee/bie-hub/species/${id}`;
      } else return "https://elurikkus.ee";
    }
  }
};
</script>

<style scoped>
.sample >>> tr:hover {
  /*background-color: unset !important;*/
}

.sample >>> .v-data-table__mobile-row:hover {
  background: #e8f5e9;
}

.sample >>> .v-data-table__mobile-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.sample >>> .v-data-table__mobile-row:last-child {
  border-bottom: unset;
}

.sample >>> .v-data-table__mobile-row__header {
  width: 100px;
}

.sample >>> .v-data-table td {
  height: unset;
  min-height: 40px;
}

.sample >>> .v-data-table__mobile-row__cell {
  text-align: left;
  width: 100%;
  padding-left: 10px;
}

#analyses >>> .v-icon {
  font-size: 16px !important;
}
</style>
