<template>
  <v-card class="detail">
    <ErrorSnackbar
      v-if="getErrorState"
      :error="getErrorState"
      :message="getErrorMessage"
      v-on:update:error="updateErrorState"
    />
    <SuccessSnackbar
      v-if="getSuccessState"
      :success="getSuccessState"
      :message="getSuccessMessage"
      v-on:update:success="updateSuccessState"
    />

    <Counties
      v-if="
        getListCounties &&
          $route.meta.object !== 'sample' &&
          !$route.name.includes('Detail')
      "
      :counties="getListCounties"
    />

    <v-divider
      v-if="
        getListCounties &&
          $route.meta.object !== 'sample' &&
          !$route.name.includes('Detail')
      "
    />

    <router-view />
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorSnackbar from "../components/partial/snackbar/ErrorSnackbar";
import Counties from "../components/partial/Counties";
import SuccessSnackbar from "../components/partial/snackbar/SuccessSnackbar";
export default {
  name: "Detail",

  components: { SuccessSnackbar, Counties, ErrorSnackbar },

  computed: {
    ...mapGetters("detail", [
      "getArea",
      "getSample",
      "getSite",
      "getListCounties"
    ]),
    ...mapGetters("error", ["getErrorState", "getErrorMessage"]),
    ...mapGetters("success", ["getSuccessState", "getSuccessMessage"])
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
    ...mapActions("error", ["updateErrorState"]),
    ...mapActions("success", ["updateSuccessState"])
  }
};
</script>

<style scoped></style>
