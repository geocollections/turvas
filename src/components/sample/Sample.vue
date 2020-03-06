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
      <h3 class="subtitle-1 pl-6 pr-2" v-if="analysisLab.length > 0">
        <span>Labor: </span>
        <span class="font-weight-bold">{{ analysisLab }}</span>
      </h3>
      <h3 class="subtitle-1 pl-6 pr-2" v-if="analysisAgent.length > 0">
        <span>Analüüsija(d): </span>
        <span class="font-weight-bold">{{ analysisAgent }}</span>
      </h3>

      <v-data-table
        class="ws-nowrap-table"
        multi-sort
        hide-default-footer
        disable-sort
        :headers="getSampleAnalysesHeaders"
        :items="getSampleAnalyses"
        group-by="analysis_method"
      >
        <template v-slot:group.header="{ group }">
          <td colspan="2" class="text-start font-weight-bold pl-8">
            {{ group }}
          </td>
        </template>
        <template v-slot:item.value="{ item }">
          <div v-if="item.value">
            <span>{{ item.value }}</span>
            <span v-if="item.parameter_name === 'pH'"></span>
            <span v-else> %</span>
          </div>
          <div v-else-if="item.value_txt">{{ item.value_txt[0] }}</div>
        </template>
      </v-data-table>
    </v-card>

    <!-- Taxon info -->
    <v-card flat v-if="getSampleTaxa && getSampleTaxa.length > 0" id="taxon">
      <h2>
        <v-card-title class="headline">Botaaniline koostis</v-card-title>
      </h2>
      <h3 class="subtitle-1 pl-6 pr-2" v-if="taxaLab.length > 0">
        <span>Labor: </span>
        <span class="font-weight-bold">{{ taxaLab }}</span>
      </h3>
      <h3 class="subtitle-1 pl-6 pr-2" v-if="taxaAgent.length > 0">
        <span>Määraja(d): </span>
        <span class="font-weight-bold">{{ taxaAgent }}</span>
      </h3>

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

        <template v-slot:item.parameter_name="{ item }">
          <div class="font-italic">
            {{ item.parameter_name }}
          </div>
        </template>

        <template v-slot:item.name_est="{ item }">
          <div
            v-if="
              item.taxon_id &&
                taxonCommonNames.find(taxon => taxon.id === item.taxon_id)
            "
          >
            {{
              taxonCommonNames.find(taxon => taxon.id === item.taxon_id).name
            }}
          </div>
        </template>

        <template v-slot:item.plutof_taxon_id="{ item }">
          <v-btn
            v-if="item.plutof_taxon_id"
            class="table-link"
            :href="getElurikkusLink(item.plutof_taxon_id)"
            title="Link e-Elurikkuse portaali"
            target="ElurikkusWindow"
            icon
            x-small
            color="primary"
          >
            <v-icon small>fas fa-external-link-alt</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchService from "../../middleware/SearchService";

export default {
  name: "Sample",

  data: () => ({
    taxonCommonNames: [],
    analysisLab: "",
    analysisAgent: "",
    taxaLab: "",
    taxaAgent: ""
  }),

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

  watch: {
    getSampleAnalyses(newVal) {
      if (newVal) {
        this.analysisLab = Array.from(
          new Set(newVal.map(analysis => analysis.lab))
        )
          .filter(lab => lab && lab.length > 0)
          .join(" / ");
        this.analysisAgent = Array.from(
          new Set(newVal.map(analysis => analysis.agent_analysed))
        )
          .filter(analysis => analysis && analysis.length > 0)
          .join(" / ");
      }
    },

    async getSampleTaxa(newVal) {
      if (newVal) {
        this.taxaLab = Array.from(new Set(newVal.map(taxon => taxon.lab)))
          .filter(lab => lab && lab.length > 0)
          .join(" / ");
        this.taxaAgent = Array.from(
          new Set(newVal.map(taxon => taxon.agent_analysed_txt[0]))
        )
          .filter(analysis => analysis && analysis.length > 0)
          .join(" / ");

        for (let taxon of newVal) {
          if (taxon.taxon_id) {
            let name = await this.getTaxonCommonName(taxon.taxon_id);
            if (name)
              this.taxonCommonNames.push({ id: taxon.taxon_id, name: name });
          }
        }
      }
    }
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
    },

    async getTaxonCommonName(taxonId) {
      let response = await SearchService.doRegularSearch("taxon_common_name", {
        taxon: taxonId,
        language: 4,
        fields: "name"
      });
      return response?.results?.[0]?.name;
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
