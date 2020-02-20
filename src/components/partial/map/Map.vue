<template>
  <div>
    <div
      id="map"
      :class="{
        'top-controls': $route.name === 'FrontPage',
        'top-controls-sm':
          $route.name === 'FrontPage' && $vuetify.breakpoint.smAndDown
      }"
      :style="
        $route.name === 'FrontPage'
          ? 'width: 100%; height: 100vh'
          : 'width: 50%'
      "
    ></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";
import "proj4leaflet";
import { mapGetters } from "vuex";

export default {
  name: "Map",

  data: () => ({
    map: null,
    center: L.latLng(58.65, 25.0),
    tileProviders: [
      {
        name: "Fotokaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/foto/{z}/{x}/{y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "Maa-amet &copy; <a  href='http://www.maaamet.ee/' target='MapReferenceWindow'>Maa-amet</a>",
            tms: true,
            detectRetina: true,
            updateWhenIdle: true,
            zIndex: 1
          }
        )
      },
      {
        name: "Põhikaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/kaart/{z}/{x}/{y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "Maa-amet &copy; <a href='http://www.maaamet.ee/' target='MapReferenceWindow'>Maa-amet</a>",
            tms: true,
            detectRetina: true,
            updateWhenIdle: true,
            zIndex: 1
          }
        )
      }
    ],
    overlayMaps: [
      {
        name: "Hübriidkaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/hybriid/{z}/{x}/{y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "Maa-amet &copy; <a href='http://www.maaamet.ee/' target='MapReferenceWindow'>Maa-amet</a>",
            tms: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Reljeefikaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/reljeef/{z}/{x}/{y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "Maa-amet &copy; <a href='http://www.maaamet.ee/' target='MapReferenceWindow'>Maa-amet</a>",
            tms: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Turbaalad",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "Geoloogia instituut &copy; <a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>Geoloogia instituut</a>",
            layers: "turvas:Turbaalad",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Raplamaa turba-alade plaanid",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "Geoloogia instituut &copy; <a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>Geoloogia instituut</a>",
            layers: "turvas:Raplamaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Pärnumaa turba-alade plaanid",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "Geoloogia instituut &copy; <a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>Geoloogia instituut</a>",
            layers: "turvas:Pärnumaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Läänemaa turba-alade plaanid",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "Geoloogia instituut &copy; <a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>Geoloogia instituut</a>",
            layers: "turvas:Läänemaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Saaremaa turba-alade plaanid",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "Geoloogia instituut &copy; <a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>Geoloogia instituut</a>",
            layers: "turvas:Saaremaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Hiiumaa turba-alade plaanid",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "Geoloogia instituut &copy; <a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>Geoloogia instituut</a>",
            layers: "turvas:Hiiumaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Maakonnad",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "Geoloogia instituut &copy; <a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>Geoloogia instituut</a>",
            layers: "turvas:maakonnad",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Turbamaardlad 2018",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "Geoloogia instituut &copy; <a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>Geoloogia instituut</a>",
            layers: "maardla:Maardlad_2018",
            styles: "maardla:turvas2018",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Aluspõhja geoloogia 400k",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "Geoloogia instituut &copy; <a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>Geoloogia instituut</a>",
            layers: "geocollections:bedrock400k",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Soosetted pinnakatte geoloogilisel kaardil",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "Geoloogia instituut &copy; <a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>Geoloogia instituut</a>",
            layers: "turvas:soosetted",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Mullakaart",
        leafletObject: L.tileLayer.wms("https://kaart.maaamet.ee/wms/alus?", {
          attribution:
            "Eesti Geoloogiateenistus &copy; <a href='https://www.egt.ee/et' target='MapReferenceWindow'>Eesti Geoloogiateenistus</a>",
          layers: "mullaraster",
          format: "image/png",
          transparent: true,
          tiled: true,
          detectRetina: true,
          updateWhenIdle: true
        })
      },
      {
        name: "Aluspõhja reljeef",
        leafletObject: L.tileLayer.wms(
          "https://kaart.maaamet.ee/wms/geoloogia?",
          {
            attribution:
              "Eesti Geoloogiateenistus &copy; <a href='https://www.egt.ee/et' target='MapReferenceWindow'>Eesti Geoloogiateenistus</a>",
            layers: "GEOL_APR_ISOJOON_2,GEOL_APR_ISOJOON_1",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Pinnakatte paksus",
        leafletObject: L.tileLayer.wms(
          "https://kaart.maaamet.ee/wms/geoloogia?",
          {
            attribution:
              "Eesti Geoloogiateenistus &copy; <a href='https://www.egt.ee/et' target='MapReferenceWindow'>Eesti Geoloogiateenistus</a>",
            layers: "GEOL_QP_ISOJOONED_1,GEOL_QP_ISOJOONED_2",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
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
    },

    "$vuetify.breakpoint.smAndDown"(newVal) {
      if (this.$route.name === "FrontPage") {
        if (newVal) {
          document
            .getElementsByClassName("leaflet-control-layers")
            .item(0).className = "leaflet-control-layers leaflet-control";
        } else {
          document
            .getElementsByClassName("leaflet-control-layers")
            .item(0).className =
            "leaflet-control-layers leaflet-control leaflet-control-layers-expanded";
        }
      }
    }
  },

  mounted() {
    this.initMap();
  },

  beforeDestroy() {
    this.map.off("baselayerchange", this.handleBaselayerChange);
    this.map.off("overlayadd", this.handleOverlayAdded);
    this.map.off("overlayremove", this.handleOverlayRemoved);
  },

  methods: {
    initMap() {
      this.map = L.map("map", {
        layers: [this.tileProviders[1].leafletObject],
        scrollWheelZoom: true,
        // wheelPxPerZoomLevel: 120,
        cursor: true,
        zoomDelta: 0.25,
        zoomSnap: 0,
        minZoom: 2,
        maxZoom: 13.25,
        crs: new L.Proj.CRS(
          "EPSG:3301",
          "+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 +lon_0=24 +x_0=500000 +y_0=6375000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
          {
            resolutions: [
              4000,
              2000,
              1000,
              500,
              250,
              125,
              62.5,
              31.25,
              15.625,
              7.8125,
              3.90625,
              1.953125,
              0.9765625,
              0.48828125,
              0.244140625,
              0.122070313,
              0.061035156,
              0.030517578,
              0.015258789
            ],
            origin: [40500, 5993000],
            bounds: L.bounds([40500, 5993000], [1064500, 7017000])
          }
        )
      });

      this.map.fitBounds([
        [59.8937871096, 21.5136411202],
        [57.3959015512, 28.3681954033]
      ]);

      let baseLayers = {};
      this.tileProviders.forEach(provider => {
        baseLayers[provider.name] = provider.leafletObject;
      });
      let overlayMaps = {};
      this.overlayMaps.forEach(
        provider => (overlayMaps[provider.name] = provider.leafletObject)
      );

      L.control
        .layers(baseLayers, overlayMaps, {
          collapsed: !(
            this.$route.name === "FrontPage" && this.$vuetify.breakpoint.mdAndUp
          )
        })
        .addTo(this.map);
      L.control.scale({ imperial: false }).addTo(this.map);
      this.map.addControl(new window.L.Control.Fullscreen());

      this.map.on("baselayerchange", this.handleBaselayerChange);
      this.map.on("overlayadd", this.handleOverlayAdded);
      this.map.on("overlayremove", this.handleOverlayRemoved);
    },

    handleBaselayerChange(event) {
      console.log(event);
    },

    handleOverlayAdded(event) {
      console.log(event);
    },

    handleOverlayRemoved(event) {
      console.log(event);
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
