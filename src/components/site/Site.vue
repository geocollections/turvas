<template>
  <div class="site">
    <!-- Main data -->
    <v-card flat v-if="getSite" id="general">
      <h1>
        <v-card-title class="display-1">
          Proovipunkt: {{ getSite.name }}
        </v-card-title>
      </h1>

      <v-data-table
        :mobile-breakpoint="9000"
        disable-sort
        disable-filtering
        disable-pagination
        hide-default-header
        hide-default-footer
        :headers="filteredSiteHeaders"
        :items="[getSite]"
      >
        <template v-slot:item.area="{ item }">
          <router-link
            :to="`/area/${item.area}`"
            title="Ala detailvaade"
            class="table-link"
          >
            {{ item.area__name }}
          </router-link>
        </template>
      </v-data-table>
    </v-card>

    <!-- Description -->
    <v-card flat v-if="getSiteDescription" id="description">
      <h2>
        <v-card-title class="headline">Kirjeldus</v-card-title>
      </h2>

      <v-data-table
        class="ws-nowrap-table"
        multi-sort
        disable-pagination
        hide-default-footer
        :headers="getSiteDescriptionHeaders"
        :items="getSiteDescription"
      />
    </v-card>

    <!-- Related samples -->
    <v-card flat v-if="getSiteSamples" id="samples">
      <h2>
        <v-card-title class="headline">Proovid</v-card-title>
      </h2>

      <v-data-table
        class="ws-nowrap-table"
        multi-sort
        disable-pagination
        hide-default-footer
        :headers="getSiteSampleHeaders"
        :items="getSiteSamples"
      >
        <template v-slot:item.id="{ item }">
          <router-link
            class="table-link"
            title="Proovi detailvaade"
            :to="`/sample/${item.id}`"
          >
            {{ item.id }}
          </router-link>
        </template>

        <template v-slot:item.number_additional="{ item }">
          <router-link
            :to="`/sample/${item.id}`"
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
            {{ item.classification_rock__name }}
          </v-card>
        </template>
      </v-data-table>
    </v-card>

    <!-- Analytical data -->
    <v-card
      flat
      v-if="getSampleAnalyticalData && getSampleAnalyticalData.length > 0"
      id="analytical-data"
    >
      <h2>
        <v-card-title class="headline">Analüütilised andmed</v-card-title>
      </h2>

      <v-row no-gutters class="px-1">
        <v-col cols="12" class="pa-1">
          <AutocompleteWrapper
            label="Veerud"
            chips
            clearable
            multiple
            :items="listParameters"
            return-object
            item-text="name"
            item-value="string"
            :value="shownActiveListParameters"
            @input="updateSampleHeaders"
            small-chips
            deletable-chips
          />
        </v-col>
      </v-row>

      <Chart
        v-if="shownActiveListParameters"
        chart-type="bubble"
        :chart-labels="shownActiveListParameters"
        :chart-data="getSampleAnalyticalData"
      />
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import AutocompleteWrapper from "../partial/inputs/AutocompleteWrapper";
import Chart from "../partial/chart/Chart";

export default {
  name: "Site",
  components: { Chart, AutocompleteWrapper },

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
    ])
  },

  methods: {
    ...mapActions("search", ["fetchListParameters", "updateSampleHeaders"]),

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
</style>
