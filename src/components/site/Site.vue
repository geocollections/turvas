<template>
  <div class="site">
    <!-- Main data -->
    <v-card flat v-if="getSite" id="general">
      <h1>
        <CardTitleWrapper
          :text="`${$t('site.name')}: ${getSite.name}`"
          :index="0"
          input-class="display-1"
        />
      </h1>

      <div v-show="block.site[0]">
        <v-data-table
          :mobile-breakpoint="9000"
          disable-sort
          disable-filtering
          disable-pagination
          hide-default-footer
          hide-default-header
          :headers="translatedSiteHeaders"
          :items="[getSite]"
        >
          <template v-slot:item.area__text1>
            <span v-for="(entity, index) in planArray" :key="index">
              <a
                class="table-link"
                :href="getPlanUrl(entity)"
                :title="getPlanUrl(entity)"
                :download="entity.trim()"
              >
                {{ entity }}
                <v-icon color="primary" small class="mr-1"
                  >fas fa-download</v-icon
                >
              </a>
              <span v-if="index !== planArray.length - 1">|</span>
            </span>
          </template>

          <template v-slot:item.area="{ item }">
            <router-link
              :to="`/turbaala/${item.area}`"
              title="Turbaala detailvaade"
              class="table-link"
            >
              {{ item.area__name }}
            </router-link>
          </template>
        </v-data-table>
      </div>
    </v-card>

    <!-- Description -->
    <v-card flat v-if="getSiteDescription" id="description">
      <h2>
        <CardTitleWrapper
          :text="$t('site.descriptionTitle')"
          :index="1"
          input-class="headline"
        />
      </h2>

      <div v-show="block.site[1]">
        <v-data-table
          class="ws-nowrap-table"
          multi-sort
          disable-pagination
          hide-default-footer
          :headers="translatedSiteDescriptionHeaders"
          :items="getSiteDescription"
        />
      </div>
    </v-card>

    <!-- Related samples -->
    <v-card flat v-if="getSiteSamples" id="samples">
      <h2>
        <CardTitleWrapper
          :text="$t('site.sampleTitle')"
          :index="2"
          input-class="headline"
        />
      </h2>

      <div v-show="block.site[2]">
        <v-data-table
          class="ws-nowrap-table"
          multi-sort
          disable-pagination
          hide-default-footer
          :headers="translatedSiteSampleHeaders"
          :items="getSiteSamples"
        >
          <template v-slot:item.id="{ item }">
            <router-link
              class="table-link"
              title="Proovi detailvaade"
              :to="`/proov/${item.id}`"
            >
              {{ item.id }}
            </router-link>
          </template>

          <template v-slot:item.number_additional="{ item }">
            <router-link
              :to="`/proov/${item.id}`"
              title="Proovi detailvaade"
              class="table-link"
            >
              {{ item.number_additional }}
            </router-link>
          </template>

          <template v-slot:item.classification_rock__name="{ item }">
            <v-card
              flat
              style="margin: 2px 0;"
              class="px-1"
              :class="getColor(item.classification_rock__name)"
            >
              {{
                $translate({
                  et: item.classification_rock__name,
                  en: item.classification_rock__name_en
                })
              }}
            </v-card>
          </template>
        </v-data-table>
      </div>
    </v-card>

    <!-- Analytical data -->
    <v-card
      flat
      v-if="getSampleAnalyticalData && getSampleAnalyticalData.length > 0"
      id="analytical-data"
    >
      <h2>
        <CardTitleWrapper
          :text="$t('site.analyticalData')"
          :index="3"
          input-class="headline"
        />
      </h2>

      <div v-show="block.site[3]">
        <v-row no-gutters class="px-1">
          <v-col cols="12" class="pa-1">
            <AutocompleteWrapper
              :label="$t('site.analyticalLabel')"
              chips
              clearable
              multiple
              :items="filteredListParameters"
              return-object
              :item-text="$i18n.locale === 'ee' ? 'name' : 'name_en'"
              item-value="string"
              :value="shownActiveListParameters"
              @input="updateSampleHeaders"
              small-chips
              deletable-chips
            />
          </v-col>
        </v-row>

        <v-row no-gutters class="px-1">
          <v-col cols="12" class="pa-1">
            <div v-if="!showChartInfo" class="text-right">
              <v-btn
                class="my-1"
                outlined
                @click="showChartInfo = true"
                :title="$t('site.showHints')"
                color="info"
              >
                {{ $t("site.showHints") }}
                <v-icon right>fas fa-info-circle</v-icon>
              </v-btn>
            </div>
            <v-alert
              v-model="showChartInfo"
              dense
              text
              border="left"
              dismissible
              :close-label="$t('site.closeHints')"
              elevation="3"
              icon="fas fa-info"
              type="info"
              class="my-1"
            >
              <ul>
                <li>
                  {{ $t("site.hintOne") }}
                </li>
                <li>
                  {{ $t("site.hintTwo") }}
                </li>
              </ul>
            </v-alert>
          </v-col>
        </v-row>

        <v-card flat class="d-flex flex-row flex-wrap justify-space-around">
          <v-card
            flat
            v-for="(parameter, index) in shownActiveListParameters"
            :key="parameter.value"
          >
            <div
              class="d-flex flex-column"
              v-if="parameter.name === 'turba lagunemisaste'"
            >
              <div>
                <span class="circle red"></span>
                {{ $t("site.badPeat") }}
              </div>
              <div>
                <div class="circle green"></div>
                {{ $t("site.goodPeat") }}
              </div>
            </div>
            <Chart
              v-if="shownActiveListParameters"
              type="line"
              :labels="shownActiveListParameters"
              :data="getSampleAnalyticalData"
              :is-multi="false"
              :is-responsive="false"
              :parameter="parameter"
              :index="index"
            />
          </v-card>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import AutocompleteWrapper from "../partial/inputs/AutocompleteWrapper";
import Chart from "../partial/chart/Chart";
import CardTitleWrapper from "../partial/CardTitleWrapper";
import detailTranslations from "@/mixins/detailTranslations";

export default {
  name: "Site",

  components: { CardTitleWrapper, Chart, AutocompleteWrapper },

  mixins: [detailTranslations],

  created() {
    this.fetchListParameters();
  },

  computed: {
    ...mapGetters("detail", [
      "getSite",
      "getSiteDescription",
      "getSiteSamples",
      "filteredSiteHeaders",
      "getSiteDescriptionHeaders",
      "getSiteSampleHeaders",
      "getSampleAnalyticalData"
    ]),

    ...mapState("search", [
      "listParameters",
      "shownActiveListParameters",
      "sampleHeaders"
    ]),

    ...mapState("settings", ["block"]),

    ...mapState("detail", ["chartInfo"]),

    showChartInfo: {
      get() {
        return this.chartInfo;
      },

      set(value) {
        this.updateChartInfo(value);
      }
    },

    planArray() {
      if (this.getSite.area__text1) {
        if (this.getSite.area__text1.includes(",")) {
          return this.getSite.area__text1.split(",");
        } else return [this.getSite.area__text1];
      } else return [];
    },

    filteredListParameters() {
      return this.listParameters.filter(item => !item.isText);
    }
  },

  methods: {
    ...mapActions("search", ["fetchListParameters", "updateSampleHeaders"]),
    ...mapActions("detail", ["updateChartInfo"]),

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

    getPlanUrl(file) {
      if (file) return `${location.origin}/plaanid/${file.trim()}`;
      else return "";
    }
  }
};
</script>

<style scoped>
.site >>> tr:hover {
  /*background-color: unset !important;*/
}

.site >>> .v-data-table__mobile-row:hover {
  background: #e8f5e9;
}

.site > #general >>> .v-data-table__mobile-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.site > #general >>> .v-data-table__mobile-row:last-child {
  border-bottom: unset;
}

.site >>> .v-data-table__mobile-row__header {
  width: 100px;
}

.site >>> .v-data-table td {
  height: unset;
  min-height: 40px;
}

.site >>> .v-data-table__mobile-row__cell {
  text-align: left;
  width: 100%;
  padding-left: 10px;
}

.circle {
  display: inline-block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
}
</style>
