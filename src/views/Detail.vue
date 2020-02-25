<template>
  <v-card class="detail">
    <ErrorSnackbar
      v-if="getErrorState"
      :error="getErrorState"
      :message="getErrorMessage"
      v-on:update:error="updateErrorState"
    />

    <Counties v-if="getListCounties" :counties="getListCounties" />

    <v-divider />

    <router-view />
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorSnackbar from "../components/partial/ErrorSnackbar";
import Counties from "../components/partial/Counties";
export default {
  name: "Detail",

  components: { Counties, ErrorSnackbar },

  computed: {
    ...mapGetters("detail", [
      "getAnalysis",
      "getArea",
      "getSample",
      "getSite",
      "getListCounties"
    ]),
    ...mapGetters("error", ["getErrorState", "getErrorMessage"])
  },

  created() {
    this.fetchListCounties();
  },

  watch: {
    "$route.params.id": {
      handler(newVal) {
        if (newVal) {
          if (this.$route.meta.object === "area") {
            this.fetchData({
              table: this.$route.meta.object,
              id: newVal,
              params: { area_type: 2 }
            });
          } else if (this.$route.meta.object === "site") {
            this.fetchData({
              table: this.$route.meta.object,
              id: newVal,
              params: { project_id: 20 }
            });
          } else {
            this.fetchData({ table: this.$route.meta.object, id: newVal });
          }
        }
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions("detail", ["fetchData", "fetchListCounties"]),
    ...mapActions("error", ["updateErrorState"])
  }
};
</script>

<style scoped></style>
