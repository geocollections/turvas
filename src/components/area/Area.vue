<template>
  <div class="area">
    <!-- Main data -->
    <v-card flat v-if="getArea" id="general">
      <h1>
        <CardTitleWrapper
          :text="`${getArea.name} ${getArea.area_type__name}`"
          :index="0"
          input-class="display-1"
        />
      </h1>

      <div v-show="block.area[0]">
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
          <template v-slot:item.maakond="{ item }">
            <a class="table-link">
              Lae alla <b>{{ item.maakond__maakond }}</b> turbaalade plaan
              <v-icon color="primary" small>fas fa-download</v-icon>
            </a>
          </template>

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
      </div>
    </v-card>

    <!-- Related site -->
    <v-card flat v-if="getAreaSites" id="sites">
      <h2>
        <CardTitleWrapper
          text="Proovipunktid"
          :index="1"
          input-class="headline"
        />
      </h2>

      <div v-show="block.area[1]">
        <v-data-table
          class="ws-nowrap-table"
          multi-sort
          disable-pagination
          hide-default-footer
          :headers="getAreaSiteHeaders"
          :items="getAreaSites"
        >
          <template v-slot:item.id="{ item }">
            <router-link
              class="table-link"
              title="Proovipunkti detailvaade"
              :to="`/proovipunkt/${item.id}`"
            >
              {{ item.id }}
            </router-link>
          </template>

          <template v-slot:item.site="{ item }">
            <router-link
              class="table-link"
              title="Proovipunkti detailvaade"
              :to="`/proovipunkt/${item.id}`"
            >
              {{ item.name }}
            </router-link>
          </template>
        </v-data-table>
      </div>
    </v-card>

    <!-- Related references -->
    <v-card flat v-if="getAreaReferences" id="references">
      <h2>
        <CardTitleWrapper text="Kirjandus" :index="2" input-class="headline" />
      </h2>

      <div v-show="block.area[2]">
        <AreaReference :data="getAreaReferences" />
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import AreaReference from "./AreaReference";
import CardTitleWrapper from "../partial/CardTitleWrapper";

export default {
  name: "Area",
  components: { CardTitleWrapper, AreaReference },
  computed: {
    ...mapState("settings", ["block"]),

    ...mapGetters("detail", [
      "getArea",
      "getAreaSites",
      "getAreaReferences",
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
      return `https://fond.egt.ee/fond/egf/${egf.trim()}`;
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
