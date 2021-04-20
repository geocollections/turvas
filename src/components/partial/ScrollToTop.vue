<template>
  <v-fab-transition>
    <v-btn
      v-show="showFab"
      v-scroll="onScroll"
      fixed
      right
      bottom
      fab
      color="primary"
      dark
      @click="toTop"
      style="z-index: 8"
    >
      <v-icon>fas fa-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  name: "ScrollToTop",
  data: () => ({
    showFab: false
  }),
  methods: {
    onScroll(event) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || event.target.scrollTop || 0;

      this.showFab = top > 400;
    },

    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>
