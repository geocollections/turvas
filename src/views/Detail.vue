<template>
  <v-card class="detail">
    <ErrorSnackbar
      v-if="getErrorState"
      :error="getErrorState"
      :message="getErrorMessage"
      v-on:update:error="updateErrorState"
    />

    <RouteLinkTabs />

    <!--    <v-card-title>-->
    <!--      <b>{{ $route.name }}</b>-->
    <!--    </v-card-title>-->

    <router-view />
  </v-card>
</template>

<script>
import RouteLinkTabs from "../components/partial/ScrollToTabs";
import { mapActions, mapGetters } from "vuex";
import ErrorSnackbar from "../components/partial/ErrorSnackbar";
export default {
  name: "Detail",

  components: { ErrorSnackbar, RouteLinkTabs },

  computed: {
    ...mapGetters("detail", [
      "getErrorState",
      "getErrorMessage",
      "getAnalysis",
      "getArea",
      "getSample",
      "getSite"
    ])
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
          )
            this.fetchData({ table: this.$route.meta.object, id: newVal });
        }
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions("detail", ["fetchData", "updateErrorState"])
  }
};
</script>

<style scoped></style>
