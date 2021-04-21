<template>
  <v-card-text>
    <div
      class="project-info--content"
      v-if="page"
      v-html="$translate({ et: page.content_et, en: page.content_en })"
    />

    <hr class="mt-6 mb-5" />

    <div class="d-flex flex-row flex-wrap px-5 py-0 justify-space-around">
      <div
        class="align-self-end pa-1"
        v-for="logo in listOfLogos"
        :key="logo.id"
      >
        <a :href="logo.href" :target="logo.target">
          <img
            :title="logo.title"
            :alt="logo.title"
            :src="logo.src"
            :class="logo.class"
          />
        </a>
      </div>
    </div>
  </v-card-text>
</template>

<script>
import { mapState } from "vuex";
import SearchService from "@/middleware/SearchService";

export default {
  name: "ProjectInfo",
  data() {
    return {
      page: null,
      pageId: 79,
      isLoading: false
    };
  },
  computed: {
    ...mapState("settings", [
      "projectInfoText1",
      "projectInfoText2",
      "projectInfoText3",
      "listOfLogos"
    ])
  },
  metaInfo() {
    const title = this.$t("header.projectInfo");
    return {
      title: title
    };
  },
  async created() {
    this.isLoading = true;
    const response = await SearchService.getDetailView("page", this.pageId);
    if (response && response?.public) this.page = response;
    this.isLoading = false;
  }
};
</script>

<style scoped>
.logo {
  margin: 8px;
}

.logo:hover {
  opacity: 0.7;
}

.kik-logo {
  height: 100px;
}

.taltech-logo {
  height: 110px;
}
.natarc-logo {
  padding: 0 0 10px 0;
}
.sarv-logo {
  height: 60px;
  padding: 0 0 10px 0;
}

.asb-logo {
  height: 70px;
}

.kekkila-logo {
  height: 60px;
  margin: 12px;
}

.kalloveen-logo {
  height: 100px;
}

.project-info--content >>> img {
  border-radius: 4px;
  margin-right: 16px !important;
}
</style>
