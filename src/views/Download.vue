<template>
  <div class="download">
    <v-carousel
      hide-delimiter-background
      cycle
      :show-arrows="false"
      prev-icon="fas fa-angle-left"
      next-icon="fas fa-angle-right"
      height="93.4vh"
    >
      <v-carousel-item
        v-for="slide in getCarouselSlides"
        :key="slide.id"
        :src="slide.src"
        :transition="false"
        :reverse-transition="false"
      >
        <div
          class="image-info white--text"
          :class="$vuetify.breakpoint.smAndDown ? 'image-info-sm' : ''"
        >
          Pildi autor: <b>Tõnis Saadre</b> (Eesti Geoloogiakeskuse kalender
          2000. a)
        </div>

        <v-overlay absolute>
          <v-sheet class="black--text" height="100%" tile color="transparent">
            <v-row class="fill-height" align="center" no-gutters>
              <v-col cols="2"></v-col>
              <v-col cols="8" style="max-width: 1000px">
                <div
                  class="font-weight-medium carousel-text pa-6"
                  :class="{
                    'carousel-text-xs': $vuetify.breakpoint.xsOnly,
                    'carousel-text-sm': $vuetify.breakpoint.smOnly,
                    'carousel-text-md': $vuetify.breakpoint.mdOnly,
                    'carousel-text-lg': $vuetify.breakpoint.lgOnly
                  }"
                >
                  <div class="pb-2">{{ downloadText }}</div>

                  <ul>
                    <li v-for="link in downloadLinks" :key="link.id">
                      <router-link
                        v-if="link.isRouterLink"
                        :to="link.src"
                        :title="link.title"
                        class="download-link"
                        >{{ link.text }}</router-link
                      >
                      <a
                        v-else
                        :href="link.src"
                        :title="link.title"
                        class="download-link"
                        :target="link.target"
                        >{{ link.text }}</a
                      >
                    </li>
                  </ul>
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
import { mapGetters, mapState } from "vuex";

export default {
  name: "Download",
  computed: {
    ...mapState("settings", ["downloadText", "downloadLinks"]),
    ...mapGetters("settings", ["getCarouselSlides"])
  }
};
</script>

<style scoped>
.download >>> .v-overlay__content {
  width: 100%;
  top: -70px;
}

.download-link {
  color: #000;
  font-weight: bold;
}

.download-link:hover {
  opacity: 0.7;
}

.carousel-text {
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
}

.carousel-text-lg {
  font-size: 16px;
}

.carousel-text-md {
  font-size: 14px;
}

.carousel-text-sm {
  font-size: 12px;
}

.carousel-text-xs {
  font-size: 10px;
}

.kik-logo {
  position: absolute;
  z-index: 7;
  width: 150px;
  bottom: 70px;
  right: 30px;
}

.kik-logo-sm {
  width: 100px;
}

.image-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 12px;
  width: 220px;
}

.image-info-sm {
  bottom: 50px;
}
</style>
