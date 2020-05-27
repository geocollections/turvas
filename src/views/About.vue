<template>
  <div class="about">
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
        <a
          href="https://kik.ee"
          target="KikWindow"
          title="Keskkonnainvesteeringute keskus"
        >
          <img
            src="https://www.kik.ee/sites/default/files/kik_est_logo__2.png"
            class="kik-logo"
            alt="kik logo"
            :class="$vuetify.breakpoint.smAndDown ? 'kik-logo-sm' : ''"
          />
        </a>

        <div
          class="image-info white--text"
          :class="$vuetify.breakpoint.smAndDown ? 'image-info-sm' : ''"
        >
          Pildi autor: <b>Tõnis Saadre</b> (Eesti Geoloogiakeskuse kalender
          2000. a)
        </div>

        <v-overlay absolute>
          <v-sheet class="py-2" height="100%" tile color="transparent">
            <v-row no-gutters>
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
                  <div style="visibility: hidden">{{ carouselText }}</div>

                  <ol class="my-3" style="visibility: hidden">
                    <li>
                      Varasemate uurimistööde andmete kogumine ja
                      digitaliseerimine (turba üldtehnilised näitajad:
                      botaaniline koostis, tuhasus, niiskus, pH, kahjulikud
                      elemendid, kütteväärtus jt).
                    </li>

                    <li>
                      Turbamaardlate ja turbaalade (560) plaanide
                      digitaliseerimine ja georefereerimine.
                    </li>

                    <li>
                      Turbast võetud proovipunktide koordinaatide ja
                      absoluutkõrguste määramine digitaliseeritud ruumiandmete
                      baasil (kasutades ArcGIS programmi).
                    </li>

                    <li>
                      Lühiülevaadete koostamine turbamaardlatest (turba genees,
                      omadused, varude iseloomustus, perspektiivsed
                      kasutusvõimalused) ning nende sidumine andmebaasides
                      olevate andmetega.
                    </li>
                  </ol>

                  <div style="visibility: hidden" v-html="carouselText2" />
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
                  <div>{{ carouselText }}</div>

                  <ol class="my-3">
                    <li>
                      Varasemate uurimistööde andmete kogumine ja
                      digitaliseerimine (turba üldtehnilised näitajad:
                      botaaniline koostis, tuhasus, niiskus, pH, kahjulikud
                      elemendid, kütteväärtus jt).
                    </li>

                    <li>
                      Turbamaardlate ja turbaalade (560) plaanide
                      digitaliseerimine ja georefereerimine.
                    </li>

                    <li>
                      Turbast võetud proovipunktide koordinaatide ja
                      absoluutkõrguste määramine digitaliseeritud ruumiandmete
                      baasil (kasutades ArcGIS programmi).
                    </li>

                    <li>
                      Lühiülevaadete koostamine turbamaardlatest (turba genees,
                      omadused, varude iseloomustus, perspektiivsed
                      kasutusvõimalused) ning nende sidumine andmebaasides
                      olevate andmetega.
                    </li>
                  </ol>

                  <div v-html="carouselText2" />
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
    ...mapState("settings", ["carouselText", "carouselText2"]),
    ...mapGetters("settings", ["getCarouselSlides"])
  }
};
</script>

<style scoped>
.about >>> .v-overlay__content {
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
