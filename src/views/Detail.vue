<template>
  <v-card class="detail">
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
import Counties from "../components/partial/Counties";
export default {
  name: "Detail",

  components: { Counties },

  computed: {
    ...mapGetters("detail", [
      "getArea",
      "getSample",
      "getSite",
      "getListCounties"
    ])
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
    ...mapActions("detail", ["fetchData", "fetchListCounties"])
  }
};
</script>

<style scoped></style>
