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
          // Checks if new data request is needed or not
          if (
            !(
              (this.$route.meta.object === "analysis" &&
                this.getAnalysis &&
                newVal === this.getAnalysis.id.toString()) ||
              (this.$route.meta.object === "area" &&
                this.getArea &&
                newVal === this.getArea.id.toString()) ||
              (this.$route.meta.object === "sample" &&
                this.getSample &&
                newVal === this.getSample.id.toString()) ||
              (this.$route.meta.object === "site" &&
                this.getSite &&
                newVal === this.getSite.id.toString())
            )
          ) {
            if (this.$route.meta.object === "area") {
              this.fetchData({
                table: this.$route.meta.object,
                id: newVal,
                params: { area_type: 2 }
              });
            } else {
              this.fetchData({ table: this.$route.meta.object, id: newVal });
            }
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
