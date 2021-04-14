<template>
  <div class="sample">
    <!-- Main data -->
    <v-card flat v-if="getSample" id="general">
      <h1>
        <CardTitleWrapper
          :text="`${$t('sample.title')}: ${getSample.number_additional}`"
          :index="0"
          input-class="display-1"
        />
      </h1>

      <div v-show="block.sample[0]">
        <v-data-table
          :mobile-breakpoint="9000"
          disable-sort
          disable-filtering
          disable-pagination
          hide-default-footer
          hide-default-header
          :headers="translatedSampleHeaders"
          :items="[getSample]"
        >
          <template v-slot:item.site="{ item }">
            <router-link
              :to="`/proovipunkt/${item.site}`"
              title="Proovipunkti detailvaade"
              class="table-link"
            >
              {{ item.site__name }}
            </router-link>
          </template>

          <template v-slot:item.site__area="{ item }">
            <router-link
              :to="`/turbaala/${item.site__area}`"
              title="Turbaala detailvaade"
              class="table-link"
            >
              {{ item.site__area__name }}
            </router-link>
          </template>
        </v-data-table>
      </div>
    </v-card>

    <!-- Analyses -->
    <v-card flat v-if="getSampleAnalyses && getSampleAnalyses.length > 0">
      <h2>
        <CardTitleWrapper
          :text="$t('sample.titleAnalyses')"
          :index="1"
          input-class="headline"
        />
      </h2>

      <div v-show="block.sample[1]">
        <v-data-table
          class="ws-nowrap-table analyses-table"
          mobile-breakpoint="0"
          multi-sort
          hide-default-footer
          disable-pagination
          disable-sort
          :headers="translatedSampleAnalysesHeaders"
          :items="getSampleAnalyses"
          :group-by="
            $translate({ et: 'analysis_method', en: 'analysis_method_en' })
          "
        >
          <template v-slot:group.header="{ group }">
            <td colspan="3" class="text-start pl-8">
              <span class="font-weight-bold">{{ group }}</span>
              <span v-if="getAnalysis(group, 'lab').length > 0">
                <b> |</b>
                {{ getAnalysis(group, "lab") }}
              </span>
              <span v-if="getAnalysis(group, 'agent').length > 0">
                <b> |</b>
                {{ getAnalysis(group, "agent") }}</span
              >
            </td>
          </template>

          <template v-slot:item.analysis_method="{ item }">
            <div
              v-translate="{
                et: item.analysis_method,
                en: item.analysis_method_en
              }"
            />
          </template>

          <template v-slot:item.parameter_name="{ item }">
            <div
              v-translate="{
                et: item.parameter_name,
                en: item.parameter_name_en
              }"
            />
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
      </div>
    </v-card>

    <!-- Taxon info -->
    <v-card flat v-if="getSampleTaxa && getSampleTaxa.length > 0" id="taxon">
      <h2>
        <CardTitleWrapper
          :text="$t('sample.titleBotanical')"
          :index="2"
          input-class="headline"
        />
      </h2>

      <div v-show="block.sample[2]">
        <h3 class="subtitle-1 pl-6 pr-2" v-if="taxaLab.length > 0">
          <span>{{ $t("sample.lab") }}: </span>
          <span class="font-weight-bold">{{ taxaLab }}</span>
        </h3>
        <h3 class="subtitle-1 pl-6 pr-2" v-if="taxaAgent.length > 0">
          <span>{{ $t("sample.agents") }}: </span>
          <span class="font-weight-bold">{{ taxaAgent }}</span>
        </h3>

        <v-data-table
          class="ws-nowrap-table"
          multi-sort
          hide-default-footer
          disable-pagination
          disable-sort
          :headers="translatedSampleTaxaHeaders"
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

          <template v-slot:item.plutof_taxon_id="{ item }">
            <v-btn
              v-if="item.plutof_taxon_id"
              class="table-link"
              @click="openElurikkusLink(item.plutof_taxon_id)"
              :title="$t('sample.linkToElurikkus')"
              icon
              x-small
              color="primary"
            >
              <v-icon small>fas fa-external-link-alt</v-icon>
            </v-btn>
          </template>
        </v-data-table>

        <v-row no-gutters>
          <v-col>
            <DoughnutChart :labels="chartLabels" :data="chartData" />
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DoughnutChart from "../partial/chart/DoughnutChart";
import CardTitleWrapper from "../partial/CardTitleWrapper";
import detailTranslations from "@/mixins/detailTranslations";

export default {
  name: "Sample",
  components: { CardTitleWrapper, DoughnutChart },
  mixins: [detailTranslations],
  data: () => ({
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
    ]),

    ...mapState("settings", ["block"]),

    chartLabels() {
      return this.getSampleTaxa
        .filter(data => data.value)
        .map(data => {
          return data.parameter_name;
        });
    },

    chartData() {
      return this.getSampleTaxa.map(data => data.value);
    }
  },

  watch: {
    getSampleTaxa(newVal) {
      if (newVal) {
        this.taxaLab = Array.from(
          new Set(
            newVal.map(taxon =>
              this.$translate({ et: taxon.lab, en: taxon.lab_en })
            )
          )
        )
          .filter(lab => lab && lab.length > 0)
          .join(" / ");
        this.taxaAgent = Array.from(
          new Set(newVal.map(taxon => taxon.agent_analysed_free))
        )
          .filter(taxa => taxa && taxa.length > 0)
          .join(" / ");
      }
    }
  },

  methods: {
    getAnalysis(group, labOrAgent) {
      let labs = [];
      let agents = [];
      if (group) {
        let filteredAnalyses = this.getSampleAnalyses.filter(
          analysis =>
            this.$translate({
              et: analysis.analysis_method,
              en: analysis.analysis_method_en
            }) === group
        );
        labs = Array.from(
          new Set(
            filteredAnalyses.map(analysis =>
              this.$translate({
                et: analysis.lab,
                en: analysis.lab_en
              })
            )
          )
        )
          .filter(lab => lab && lab.length > 0)
          .join(", ");
        agents = Array.from(
          new Set(
            filteredAnalyses.map(analysis => analysis.agent_analysed_free)
          )
        )
          .filter(analysis => analysis && analysis.length > 0)
          .join(", ");
      }

      if (labOrAgent === "lab") return labs;
      else return agents;
    },

    openElurikkusLink(id) {
      let url = "https://elurikkus.ee";
      if (id) {
        url = `https://elurikkus.ee/bie-hub/species/${id}`;
      }
      window.open(url, "ElurikkusWindow", "height=700,width=767");
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

.sample > #general >>> .v-data-table__mobile-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.sample > #general >>> .v-data-table__mobile-row:last-child {
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

.analyses-table >>> .v-icon {
  font-size: 16px !important;
}
</style>
