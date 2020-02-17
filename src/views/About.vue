<template>
  <div class="about">
    <v-carousel
      hide-delimiter-background
      prev-icon="fas fa-angle-left"
      next-icon="fas fa-angle-right"
      height="93.3vh"
    >
      <v-carousel-item
        v-for="slide in getCarouselSlides"
        :key="slide.id"
        :src="slide.src"
        transition="slide-x-transition"
        reverse-transition="slide-x-transition"
      >
        <a
          href="https://kik.ee"
          target="KikWindow"
          rel="noreferrer noopener"
          title="Keskkonnainvesteeringute keskus"
        >
          <img
            src="https://www.kik.ee/sites/default/files/kik_est_logo__2.png"
            class="kik-logo"
            v-if="slide.id === 1"
          />
        </a>

        <v-overlay absolute>
          <v-sheet height="100%" tile color="transparent">
            <v-row class="fill-height" align="center" no-gutters>
              <v-col cols="2" md="1"></v-col>
              <v-col cols="8" md="6" lg="5" xl="4" class="pl-1">
                <div
                  class="font-weight-medium carousel-text"
                  :class="
                    $vuetify.breakpoint.xsOnly
                      ? 'carousel-text-sm'
                      : 'carousel-text'
                  "
                >
                  {{ slide.text }}
                </div>
              </v-col>
              <v-col cols="2" md="5"></v-col>
            </v-row>
          </v-sheet>
        </v-overlay>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "About",
  computed: {
    ...mapGetters("settings", ["getCarouselSlides"])
  }
};
</script>

<style scoped>
.about >>> .v-overlay__content {
  width: 100%;
}

.carousel-text {
  font-size: 18px;
}

.carousel-text-sm {
  font-size: 14px;
}

.kik-logo {
  position: absolute;
  z-index: 7;
  width: 150px;
  bottom: 70px;
  right: 30px;
}
</style>
