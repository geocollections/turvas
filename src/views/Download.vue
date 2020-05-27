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
          <v-sheet height="100%" tile color="transparent">
            <v-row class="fill-height" align="center" no-gutters>
              <v-col cols="2" md="1"></v-col>
              <v-col cols="8" md="6" lg="5" xl="4">
                <!-- WHITE BACKGROUND DIV -->
                <div
                  style="position: absolute;"
                  class="font-weight-medium carousel-text-abs pa-3 white-background-div"
                  :class="{
                    'carousel-text-xs-abs': $vuetify.breakpoint.xsOnly,
                    'carousel-text-sm-abs': $vuetify.breakpoint.smOnly,
                    'carousel-text-md-abs': $vuetify.breakpoint.mdOnly,
                    'carousel-text-lg-abs': $vuetify.breakpoint.lgOnly
                  }"
                >
                  <div style="visibility: hidden">{{ downloadText }}</div>

                  <ul style="visibility: hidden">
                    <li v-for="link in downloadLinks" :key="link.id">
                      <router-link
                        v-if="link.isRouterLink"
                        :to="link.src"
                        :title="link.title"
                        class="about-link"
                        >{{ link.text }}</router-link
                      >
                      <a
                        v-else
                        :href="link.src"
                        :title="link.title"
                        class="about-link"
                        :target="link.target"
                        >{{ link.text }}</a
                      >
                    </li>
                  </ul>
                </div>
                <!--  WHITE BACKGROUND DIV -->

                <div
                  class="font-weight-medium carousel-text pa-3"
                  :class="{
                    'carousel-text-xs': $vuetify.breakpoint.xsOnly,
                    'carousel-text-sm': $vuetify.breakpoint.smOnly,
                    'carousel-text-md': $vuetify.breakpoint.mdOnly,
                    'carousel-text-lg': $vuetify.breakpoint.lgOnly
                  }"
                >
                  <div>{{ downloadText }}</div>

                  <ul>
                    <li v-for="link in downloadLinks" :key="link.id">
                      <router-link
                        v-if="link.isRouterLink"
                        :to="link.src"
                        :title="link.title"
                        class="about-link"
                        >{{ link.text }}</router-link
                      >
                      <a
                        v-else
                        :href="link.src"
                        :title="link.title"
                        class="about-link"
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

.about-link {
  text-decoration: none;
  /*font-weight: bold;*/
}

.about-link:hover {
  opacity: 0.7;
}

.carousel-text {
  font-size: 18px;
  text-shadow: 2px 2px 4px #000;
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

.white-background-div {
  position: absolute;
  z-index: -1;
  border-radius: 4px;
  opacity: 0.46;
  background-color: white;
}

.carousel-text-abs {
  font-size: 18px;
  max-width: 50%;
}

.carousel-text-lg-abs {
  font-size: 16px;
  max-width: 41.6666666667%;
}

.carousel-text-md-abs {
  font-size: 14px;
  max-width: 50%;
}

.carousel-text-sm-abs {
  font-size: 12px;
  max-width: 66.6666666667%;
}
.carousel-text-xs-abs {
  font-size: 10px;
  max-width: 66.6666666667%;
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
