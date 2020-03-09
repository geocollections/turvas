<template>
  <div class="area">
    <!-- Main data -->
    <v-card flat v-if="getArea" id="general">
      <h1>
        <v-card-title class="display-1">
          {{ getArea.name }} {{ getArea.area_type__name }}
        </v-card-title>
      </h1>

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
          >
            Maardla info Maa-ameti geoportaalis ({{ item.maardla }})
          </a>
        </template>

        <template v-slot:item.eelis>
          <span v-for="(entity, index) in eelisArray" :key="index">
            <a
              class="table-link"
              :href="getEelisUrl(entity)"
              :title="getEelisUrl(entity)"
              target="EelisWindow"
            >
              {{ entity }}
            </a>
            <span v-if="index !== eelisArray.length - 1">|</span>
          </span>
        </template>

        <template v-slot:item.egf>
          <span v-for="(entity, index) in egfArray" :key="index">
            <a
              class="table-link"
              :href="getEgfUrl(entity)"
              :title="getEgfUrl(entity)"
              target="EgfWindow"
            >
              {{ entity }}
            </a>
            <span v-if="index !== egfArray.length - 1">|</span>
          </span>
        </template>

        <template v-slot:item.description="{ item }">
          <div v-html="item.description" />
        </template>
      </v-data-table>
    </v-card>

    <!-- Related site -->
    <v-card flat v-if="getAreaSites" id="sites">
      <h2>
        <v-card-title class="headline">Proovipunktid</v-card-title>
      </h2>

      <v-data-table
        class="ws-nowrap-table"
        multi-sort
        hide-default-footer
        :headers="getAreaSiteHeaders"
        :items="getAreaSites"
      >
        <template v-slot:item.id="{ item }">
          <router-link
            class="table-link"
            title="Proovipunkti detailvaade"
            :to="`/site/${item.id}`"
          >
            {{ item.id }}
          </router-link>
        </template>

        <template v-slot:item.site="{ item }">
          <router-link
            class="table-link"
            title="Proovipunkti detailvaade"
            :to="`/site/${item.id}`"
          >
            {{ item.name }}
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
    },

    egfArray() {
      if (this.getArea.egf) {
        if (this.getArea.egf.includes(";")) {
          return this.getArea.egf.split(";");
        } else return [this.getArea.egf];
      } else return [];
    }
  },

  methods: {
    getMaardlaUrl(maardla) {
      return `https://xgis.maaamet.ee/xGIS/bronx/maardlad/showdata.aspx?registrikaart=${maardla}`;
    },

    getEelisUrl(eelis) {
      return `http://register.keskkonnainfo.ee/envreg/main?reg_kood=${eelis.trim()}&amp;mount=view`;
    },

    getEgfUrl(egf) {
      return `https://www.egt.ee/et/fond-search?INV_EGF%5Bmin%5D=${egf.trim()}`;
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

.area > #general >>> .v-data-table__mobile-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.area > #general >>> .v-data-table__mobile-row:last-child {
  border-bottom: unset;
}

.area >>> .v-data-table__mobile-row__header {
  width: 100px;
}

.area >>> .v-data-table td {
  height: unset;
  min-height: 40px;
}

.area >>> .v-data-table__mobile-row__cell {
  text-align: left;
  width: 100%;
  padding-left: 10px;
}
</style>
