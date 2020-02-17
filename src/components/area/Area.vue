<template>
  <div class="area">
    <!-- Main data -->
    <v-card flat v-if="getArea" id="general">
      <v-card-title class="display-1">
        {{ getArea.name }} {{ getArea.area_type__name }}
      </v-card-title>

      <v-data-table
        :mobile-breakpoint="9000"
        disable-sort
        disable-filtering
        disable-pagination
        hide-default-header
        hide-default-footer
        :headers="filteredAreaHeaders"
        :items="[getArea]"
      >
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

        <template v-slot:item.eelis>
          <span v-for="(entity, index) in eelisArray" :key="index">
            <a
              class="table-link"
              :href="getEelisUrl(entity)"
              :title="getEelisUrl(entity)"
              target="EelisWindow"
              rel="noreferrer noopener"
            >
              {{ entity }}
            </a>
            <span v-if="index !== eelisArray.length - 1">|</span>
          </span>
        </template>

        <template v-slot:item.description="{ item }">
          <div v-html="item.description" />
        </template>
      </v-data-table>
    </v-card>

    <!-- Related site -->
    <v-card flat v-if="getAreaSites" id="sites">
      <v-card-title class="display-1">Proovipunktid</v-card-title>

      <v-data-table
        disable-sort
        :headers="getAreaSiteHeaders"
        :items="getAreaSites"
      >
        <template v-slot:item.id="{ item }">
          <router-link
            class="table-link"
            :title="`Proovipunkti vaade ID: ${item.id}`"
            :to="`/site/${item.id}`"
          >
            {{ item.id }}
          </router-link>
        </template>

        <template v-slot:item.site="{ item }">
          <router-link
            class="table-link"
            :title="`Proovipunkti vaade ID: ${item.id}`"
            :to="`/site/${item.id}`"
          >
            {{ item.area__name }}
          </router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Area",

  computed: {
    ...mapGetters("detail", [
      "getArea",
      "getAreaSites",
      "filteredAreaHeaders",
      "getAreaSiteHeaders"
    ]),

    eelisArray() {
      if (this.getArea.eelis) {
        if (this.getArea.eelis.includes(";")) {
          return this.getArea.eelis.split(";");
        } else return [this.getArea.eelis];
      } else return [];
    }
  },

  methods: {
    getMaardlaUrl(maardla) {
      return `https://xgis.maaamet.ee/xGIS/bronx/maardlad/showdata.aspx?registrikaart=${maardla}`;
    },

    getEelisUrl(eelis) {
      return `https://register.keskkonnainfo.ee/envreg/main?reg_kood=${eelis}&amp;mount=view`;
    }
  }
};
</script>

<style scoped>
.area >>> tr:hover {
  /*background-color: unset !important;*/
}

.area >>> .v-data-table__mobile-row:hover {
  background: #e8f5e9;
}

.area >>> .v-data-table__mobile-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.area >>> .v-data-table__mobile-row:last-child {
  border-bottom: unset;
}

.area >>> .v-data-table__mobile-row__header {
  width: 100px;
}

.area >>> .v-data-table td {
  height: unset;
  min-height: 48px;
}

.area >>> .v-data-table__mobile-row__cell {
  text-align: left;
  width: 100%;
  padding-left: 10px;
}

.table-link {
  text-decoration: none;
}

.table-link:hover {
  opacity: 0.7;
}
</style>
