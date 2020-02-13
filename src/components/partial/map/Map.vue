<template>
  <div id="map" :style="getMapViewState ? 'width: 100%' : 'width: 50%'"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { mapGetters } from "vuex";

export default {
  name: "Map",

  data: () => ({
    map: null,
    center: L.latLng(58.5, 25.5),
    zoom: 11,
    tileProviders: [
      {
        name: "OpenStreetMap",
        leafletObject: L.tileLayer(
          "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3V1dG9iaW5lIiwiYSI6ImNpZWlxdXAzcjAwM2Nzd204enJvN2NieXYifQ.tp6-mmPsr95hfIWu3ASz2w",
          {
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            minZoom: 1
          }
        )
      },
      {
        name: "OpenTopoMap",
        leafletObject: L.tileLayer(
          "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
          {
            attribution:
              'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
            minZoom: 1
          }
        )
      },
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
        name: "Maaameti kaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/kaart@GMC/{z}/{x}/{-y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
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
      }
    ],
    overlayMaps: [
      {
        name: "Maaameti hübriidkaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/hybriid@GMC/{z}/{x}/{-y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "Eesti kaardid: <a  href='http://www.maaamet.ee/'>Maa-amet</a>",
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
    ...mapGetters("settings", ["getSplitViewState", "getMapViewState"])
  },

  watch: {
    getSplitViewState(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.map.invalidateSize();
        });
      }
    },

    getMapViewState(newVal) {
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
        layers: [this.tileProviders[0].leafletObject],
        scrollWheelZoom: true
      }).setView(this.center, this.zoom);

      let baseLayers = {};
      this.tileProviders.forEach(provider => {
        baseLayers[provider.name] = provider.leafletObject;
      });
      let overlayMaps = {};
      this.overlayMaps.forEach(
        provider => (overlayMaps[provider.name] = provider.leafletObject)
      );

      L.control.layers(baseLayers, overlayMaps).addTo(this.map);
    }
  }
};
</script>

<style scoped>
  #map {
    position: fixed;
    height: 93.3vh;
  }
</style>
