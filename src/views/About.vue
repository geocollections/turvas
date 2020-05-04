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
          title="Keskkonnainvesteeringute keskus"
          v-if="$vuetify.breakpoint.smAndUp"
        >
          <img
            src="https://www.kik.ee/sites/default/files/kik_est_logo__2.png"
            class="kik-logo"
            alt="kik logo"
            :class="$vuetify.breakpoint.smAndDown ? 'kik-logo-sm' : ''"
          />
        </a>
        <v-overlay absolute>
          <v-sheet height="100%" tile color="transparent">
            <v-row class="fill-height" align="center" no-gutters>
              <v-col cols="2" md="1"></v-col>
              <v-col cols="8" md="6" lg="5" xl="4" class="pl-1">
                <div
                  class="font-weight-medium carousel-text"
                  :class="{
                    'carousel-text-xs': $vuetify.breakpoint.xsOnly,
                    'carousel-text-sm': $vuetify.breakpoint.smOnly
                  }"
                >
                  {{ carouselText }}

                  <ul>
                    <li>
                      <a
                        href="/seletuskiri.pdf"
                        class="about-link"
                        title="Lae alla"
                        >Andmete allalaadimine (exceli fail ja digitud
                        plaanid)</a
                      >
                    </li>

                    <li>
                      <a
                        href="/seletuskiri.pdf"
                        class="about-link"
                        title="Ava mahajäetud väljade failid"
                        >Mahajäetud väljade failid</a
                      >
                    </li>
                    <li>
                      <a
                        href="/seletuskiri.pdf"
                        class="about-link"
                        title="Loe projekti seletuskirja"
                        >Projekti seletuskiri</a
                      >
                    </li>
                    <li>
                      <a
                        href="/seletuskiri.pdf"
                        class="about-link"
                        title="Loe projekti turvustust"
                        >Projekti tutvustus</a
                      >
                    </li>
                    <li>
                      <router-link
                        to="/kasutusjuhend"
                        class="about-link"
                        title="Vaata kasutusjuhendit"
                        >Kasutusjuhend</router-link
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
  name: "About",
  computed: {
    ...mapState("settings", ["carouselText"]),
    ...mapGetters("settings", ["getCarouselSlides"])
  }
};
</script>

<style scoped>
.about >>> .v-overlay__content {
  width: 100%;
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
}

.carousel-text-sm {
  font-size: 14px;
}

.carousel-text-xs {
  font-size: 12px;
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
</style>
