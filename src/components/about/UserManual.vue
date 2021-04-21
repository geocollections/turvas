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

    <v-card-text
      v-for="item in filteredItems"
      :key="item.id"
      :id="item.id"
      class="user-manual--secondary-content pt-0"
      v-html="
        $translate({ et: item.page.content_et, en: item.page.content_en })
      "
    />
  </div>
</template>

<script>
import SearchService from "@/middleware/SearchService";

export default {
  name: "UserManual",
  data: () => ({
    tab: null,
    items: [
      { id: "common", text: "userManual.common", tableId: 81, page: null },
      { id: "map", text: "userManual.map", tableId: 82, page: null },
      { id: "search", text: "userManual.search", tableId: 83, page: null },
      { id: "table", text: "userManual.table", tableId: 84, page: null },
      { id: "graph", text: "userManual.graph", tableId: 85, page: null },
      { id: "more", text: "userManual.more", tableId: 86, page: null }
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
    if (response && response?.public) this.page = response;

    for (const item of this.items) {
      const itemResponse = await SearchService.getDetailView(
        "page",
        item.tableId
      );
      if (response && response?.public) item.page = itemResponse;
    }

    this.isLoading = false;
  },
  computed: {
    filteredItems() {
      return this.items.filter(
        item => item.page && (item.page?.content_et || item.page?.content_en)
      );
    }
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
  font-weight: 500;
  font-family: "Raleway", "Fira Sans", sans-serif !important;
  margin-bottom: 8px;
}

/* Styles copied from .headline class */
.user-manual--secondary-content >>> h2 {
  line-height: 2rem;
  font-family: "Raleway", "Fira Sans", sans-serif !important;
  font-size: 1.75rem !important;
  font-weight: 500;
  letter-spacing: normal !important;
  padding: 16px 0;
}

.user-manual--secondary-content >>> img {
  max-width: 100%;
  border-radius: 4px;
  display: block;
  height: unset !important;
}
</style>
