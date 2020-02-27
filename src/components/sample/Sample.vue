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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sample",

  computed: {
    ...mapGetters("detail", ["getSample", "filteredSampleHeaders"])
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
</style>
