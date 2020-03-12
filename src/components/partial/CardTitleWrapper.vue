<template>
  <v-card-title
    :class="inputClass"
    class="card-title--clickable"
    @click="updateBlockState(index, !blockState)"
  >
    {{ text }}
    <v-spacer />
    <v-icon color="primary">{{
      blockState ? "fas fa-angle-up" : "fas fa-angle-down"
    }}</v-icon>
  </v-card-title>
</template>

<script>
import sectionsMixin from "../../mixins/sectionsMixin";

export default {
  name: "CardTitleWrapper",
  mixins: [sectionsMixin],
  props: {
    text: {
      type: String
    },
    index: {
      type: Number
    },
    inputClass: {
      type: String
    }
  },

  computed: {
    blockState() {
      let route = "search";
      if (this.$route.name.includes("Detail")) {
        route = this.$route.meta.object;
      }
      return this.block[route][this.index];
    }
  }
};
</script>

<style scoped></style>
