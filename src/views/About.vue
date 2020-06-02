<template>
  <div class="about">
    <div
      v-if="carouselSlides && carouselSlides.length > 0"
      class="background-image"
      :style="
        `background-image: url('${carouselSlides[imageIndex].src}'); z-index: 1;`
      "
    ></div>

    <div
      class="v-overlay__scrim"
      style="opacity: 0.46;background-color: rgb(33, 33, 33);border-color: rgb(33, 33, 33); z-index: 2"
    ></div>

    <a
      href="https://kik.ee"
      target="KikWindow"
      title="Keskkonnainvesteeringute keskus"
    >
      <img
        src="https://www.kik.ee/sites/default/files/kik_est_logo__2.png"
        class="kik-logo"
        alt="kik logo"
        :class="{
          'kik-logo-sm': $vuetify.breakpoint.smOnly,
          'kik-logo-xs': $vuetify.breakpoint.xsOnly
        }"
      />
    </a>

    <div class="image-info white--text">
      Pildi autor: <b>Tõnis Saadre</b> (Eesti Geoloogiakeskuse kalender 2000. a)
    </div>

    <v-container style="max-width: 1000px">
      <v-card
        flat
        class="ma-3 user-manual-card pa-3"
        style="z-index: 3"
        :class="{
          'custom-mb-xs': $vuetify.breakpoint.smAndDown,
          'custom-mb-md': $vuetify.breakpoint.mdAndUp
        }"
      >
        <v-card-title
          v-if="$route.name !== 'UserManual'"
          :class="{
            'display-1': $vuetify.breakpoint.smAndDown,
            'display-2': $vuetify.breakpoint.mdOnly,
            'display-3': $vuetify.breakpoint.lgAndUp
          }"
        >
          {{ cardTitle }}
        </v-card-title>

        <v-card-title class="display-3" v-else>{{ cardTitle }}</v-card-title>

        <router-view />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "About",

  data: () => ({
    interval: null,
    imageIndex: 0
  }),

  created() {
    this.preloadImages();
  },

  mounted() {
    this.startInterval();
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  computed: {
    ...mapState("settings", ["carouselSlides"]),

    cardTitle() {
      if (this.$route.name === "ProjectInfo") return "Projekti info";
      else if (this.$route.name === "Download") return "Andmete allalaadimine";
      else return "Kasutusjuhend";
    }
  },

  methods: {
    preloadImages() {
      this.carouselSlides.forEach(item => {
        const linkEl = document.createElement("link");
        linkEl.setAttribute("rel", "preload");
        linkEl.setAttribute("href", item.src);
        linkEl.setAttribute("as", "image");
        document.head.appendChild(linkEl);
      });
    },

    startInterval() {
      this.interval = setInterval(() => {
        if (this.imageIndex === 3) this.imageIndex = 0;
        this.imageIndex += 1;
      }, 6000);
    }
  }
};
</script>

<style scoped>
.background-image {
  position: fixed;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-transition: all 1s ease-in;
  transition: all 1s ease-in;
}

.kik-logo {
  position: absolute;
  z-index: 7;
  width: 150px;
  bottom: 20px;
  right: 20px;
}

.kik-logo-sm {
  width: 100px;
}

.kik-logo-xs {
  width: 100px;
  bottom: 50px;
}

.custom-mb-xs {
  margin-bottom: 175px !important;
}

.custom-mb-md {
  margin-bottom: 200px !important;
}

.image-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 12px;
  width: 220px;
  z-index: 6;
}

.about a {
  color: #000;
  text-decoration: underline;
  font-weight: bold;
}

.about >>> a {
  color: #000;
  text-decoration: underline;
  font-weight: bold;
}
</style>
