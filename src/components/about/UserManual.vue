<template>
  <div class="user-manual">
    <v-card-text class="pt-0">
      <div
        class="user-manual--content"
        v-if="page"
        v-html="$translate({ et: page.content_et, en: page.content_en })"
      />
    </v-card-text>

    <v-tabs
      slider-size="4"
      v-model="tab"
      grow
      show-arrows
      background-color="transparent"
    >
      <v-tab
        active-class="tab-background"
        class="font-weight-bold"
        style="color: #000;"
        v-for="item in items"
        :key="item.id"
        @click="$vuetify.goTo(`#${item.id}`)"
        >{{ $t(item.text) }}</v-tab
      >
    </v-tabs>

    <common-tab id="common" />

    <map-tab id="map" />

    <search-tab id="search" />

    <table-tab id="table" />

    <chart-tab id="graph" />

    <more-tab id="more" />
  </div>
</template>

<script>
import MoreTab from "./user_manual/MoreTab";
import ChartTab from "./user_manual/ChartTab";
import TableTab from "./user_manual/TableTab";
import SearchTab from "./user_manual/SearchTab";
import MapTab from "./user_manual/MapTab";
import CommonTab from "./user_manual/CommonTab";
import SearchService from "@/middleware/SearchService";

export default {
  name: "UserManual",

  components: { MoreTab, ChartTab, TableTab, SearchTab, MapTab, CommonTab },

  data: () => ({
    tab: null,
    items: [
      { id: "common", text: "userManual.common" },
      { id: "map", text: "userManual.map" },
      { id: "search", text: "userManual.search" },
      { id: "table", text: "userManual.table" },
      { id: "graph", text: "userManual.graph" },
      { id: "more", text: "userManual.more" }
    ],
    page: null,
    pageId: 80,
    isLoading: false
  }),
  metaInfo() {
    const title = this.$t("header.userManual");
    return {
      title: title
    };
  },
  async created() {
    this.isLoading = true;
    const response = await SearchService.getDetailView("page", this.pageId);
    console.log(response);
    if (response && response?.public) this.page = response;
    this.isLoading = false;
  }
};
</script>

<style scoped>
.user-manual-tabs-items {
  background-color: transparent;
}

.tab-background {
  background-color: rgba(0, 0, 0, 0.16);
}

/* Styles copied from .display-1 class */
.user-manual--content >>> h1 {
  font-size: 2.125rem !important;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
  font-weight: 400;
  font-family: Roboto, sans-serif !important;
  margin-bottom: 8px;
}
</style>
