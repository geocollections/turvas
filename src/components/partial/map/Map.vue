<template>
  <div
    id="map"
    :class="{
      'top-controls': $route.name === 'FrontPage',
      'top-controls-sm':
        $route.name === 'FrontPage' && $vuetify.breakpoint.smAndDown
    }"
    :style="
      $route.name === 'FrontPage' ? 'width: 100%; height: 100vh' : 'width: 50%'
    "
  ></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";
import { mapGetters } from "vuex";

export default {
  name: "Map",

  data: () => ({
    map: null,
    center: L.latLng(58.65, 25.0),
    zoom: 7,
    tileProviders: [
      {
        name: "Maaameti fotokaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/foto@GMC/{z}/{x}/{-y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "Eesti kaardid: <a  href='http://www.maaamet.ee/'>Maa-amet</a>",
            tms: true,
            worldCopyJump: true,
            detectRetina: true,
            zIndex: 1,
            updateWhenIdle: true,
            continuousWorld: true
          }
        )
      },
      {
        name: "Maaameti põhikaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/kaart@GMC/{z}/{x}/{-y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "Eesti kaardid: <a href='http://www.maaamet.ee/' target='MaaAmetWindow'>Maa-amet</a>",
            tms: true,
            worldCopyJump: true,
            detectRetina: true,
            zIndex: 1,
            updateWhenIdle: true,
            continuousWorld: true
          }
        )
      }
    ],
    overlayMaps: [
      {
        name: "Maaameti hübriidkaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/hybriid@GMC/{z}/{x}/{-y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            // attribution:
            //   "Eesti kaardid: <a href='http://www.maaamet.ee/' target='MaaAmetWindow'>Maa-amet</a>",
            tms: true,
            worldCopyJump: true,
            detectRetina: true,
            zIndex: 2,
            updateWhenIdle: true,
            continuousWorld: true
          }
        ),
        minZoom: 6,
        maxZoom: 18
      }
    ]
  }),

  computed: {
    ...mapGetters("settings", ["getMapState"])
  },

  watch: {
    getMapState(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.map.invalidateSize();
        });
      }
    }
  },

  mounted() {
    this.initMap();
  },

  methods: {
    initMap() {
      this.map = L.map("map", {
        layers: [this.tileProviders[1].leafletObject],
        scrollWheelZoom: true,
        wheelPxPerZoomLevel: 120,
        cursor: true,
        center: this.center,
        zoom: this.$route.name === "FrontPage" ? 8 : this.zoom,
        zoomDelta: 0.25,
        zoomSnap: 0
      });

      let baseLayers = {};
      this.tileProviders.forEach(provider => {
        baseLayers[provider.name] = provider.leafletObject;
      });
      let overlayMaps = {};
      this.overlayMaps.forEach(
        provider => (overlayMaps[provider.name] = provider.leafletObject)
      );

      L.control.layers(baseLayers, overlayMaps).addTo(this.map);
      L.control.scale({ imperial: false }).addTo(this.map);
      // Fullscreen
      this.map.addControl(new window.L.Control.Fullscreen());
    }
  }
};
</script>

<style scoped>
#map {
  position: fixed;
  height: 93.3vh;
}

.top-controls >>> .leaflet-top {
  top: 64px;
}

.top-controls-sm >>> .leaflet-top {
  top: 56px;
}
</style>
