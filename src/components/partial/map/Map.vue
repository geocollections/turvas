<template>
  <div
    id="map"
    :class="{
      'top-controls': $route.name === 'FrontPage'
    }"
    :style="
      $route.name === 'FrontPage'
        ? 'width: 100%; height: 100%'
        : $vuetify.breakpoint.xsOnly
        ? 'position: relative; width: 100%; height: 50vh;'
        : 'width: 50%;'
    "
  >
    <div
      class="live-coordinates"
      v-if="showLiveCoordinates && latlngLive"
    >
      <div>Lat: {{ latlngLive.lat.toFixed(6) }}</div>
      <div>Lon: {{ latlngLive.lng.toFixed(6) }}</div>
    </div>

    <div class="map-legend">
      <div class="map-legend-row d-flex flex-row">
        <span style="background-color: #70b160;"></span>
        <span>Turbaala</span>
      </div>
      <div class="map-legend-row d-flex flex-row">
        <span style="background-color: #ec1e17;"></span>
        <span>Proovipunkt</span>
      </div>
    </div>

    <a
      href="https://kik.ee"
      target="KikWindow"
      title="Keskkonnainvesteeringute keskus"
    >
      <img
        v-if="$route.name === 'FrontPage'"
        src="https://www.kik.ee/sites/default/files/kik_est_logo__2.png"
        class="kik-logo"
        alt="kik logo"
        :class="$vuetify.breakpoint.smAndDown ? 'kik-logo-sm' : ''"
      />
    </a>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";
import "proj4leaflet";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Map",

  data: () => ({
    map: null,
    maxZoom: 13.25,
    minZoom: 2,
    activeSites: null,
    activeSitesLayer: null,
    activeSitesBounds: null,
    sitesIcon: new L.DivIcon({
      html:
        "<i class='far fa-circle' style='color: #FBC02D; background-color: #FFF9C4; border-radius: 100%;' />",
      className: "map-marker"
    }),
    center: L.latLng(58.65, 25.0),
    tileProviders: [
      {
        name: "Põhikaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/kaart/{z}/{x}/{y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "<a href='http://www.maaamet.ee/' target='MapReferenceWindow'>&copy; Maa-amet</a>",
            tms: true,
            detectRetina: true,
            updateWhenIdle: true,
            zIndex: 1
          }
        )
      },
      {
        name: "Fotokaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/foto/{z}/{x}/{y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "<a  href='http://www.maaamet.ee/' target='MapReferenceWindow'>&copy; Maa-amet</a>",
            tms: true,
            detectRetina: true,
            updateWhenIdle: true,
            zIndex: 1
          }
        )
      },
      {
        name: "Reljeefikaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/reljeef/{z}/{x}/{y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            attribution:
              "<a  href='http://www.maaamet.ee/' target='MapReferenceWindow'>&copy; Maa-amet</a>",
            tms: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      }
    ],
    overlayMaps: [
      {
        name: "Uuringupunktid",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
            layers: "turvas:Turbapunktid",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: false,
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
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
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
        name: "Harjumaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
            layers: "turvas:Harjumaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Hiiumaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
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
        name: "Ida-Virumaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
            layers: "turvas:Ida-Virumaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Jõgevamaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
            layers: "turvas:Jõgevamaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Järvamaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
            layers: "turvas:Järvamaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Läänemaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
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
        name: "Lääne-Virumaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
            layers: "turvas:Lääne-Virumaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Pärnumaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
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
        name: "Põlvamaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
            layers: "turvas:Põlvamaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Raplamaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
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
        name: "Saaremaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
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
        name: "Tartumaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
            layers: "turvas:Tartumaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Valgamaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
            layers: "turvas:Valgamaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Viljandimaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
            layers: "turvas:Viljandimaa",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Võrumaa",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
            layers: "turvas:Võrumaa",
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
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
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
        name: "Turbamaardlad 2020",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
            layers: "maardla:turbamaardlad_2020",
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
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
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
        name: "Soosetted",
        leafletObject: L.tileLayer.wms(
          "https://gis.geocollections.info/geoserver/wms",
          {
            attribution:
              "<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; Geoloogia instituut</a>",
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
            "<a href='https://www.egt.ee/et' target='MapReferenceWindow'>&copy; Eesti Geoloogiateenistus</a>",
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
              "<a href='https://www.egt.ee/et' target='MapReferenceWindow'>&copy; Eesti Geoloogiateenistus</a>",
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
              "<a href='https://www.egt.ee/et' target='MapReferenceWindow'>&copy; Eesti Geoloogiateenistus</a>",
            layers: "GEOL_QP_ISOJOONED_1,GEOL_QP_ISOJOONED_2",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      },
      {
        name: "Hübriidkaart",
        leafletObject: L.tileLayer(
          "https://tiles.maaamet.ee/tm/tms/1.0.0/hybriid/{z}/{x}/{y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
          {
            // attribution:
            //   "<a href='http://www.maaamet.ee/' target='MapReferenceWindow'>&copy; Maa-amet</a>",
            tms: true,
            detectRetina: true,
            updateWhenIdle: true
          }
        )
      }
    ],
    showLiveCoordinates: false,
    latlngLive: null
  }),

  mounted() {
    this.initMap();

    if (this.$route.name === "FrontPage" || this.$route.name === "AreaTable") {
      document.getElementById("map").classList.add("cursor-crosshair");
    } else document.getElementById("map").classList.remove("cursor-crosshair");
  },

  beforeDestroy() {
    this.map.off("baselayerchange", this.handleBaseLayerChange);
    this.map.off("overlayadd", this.handleOverlayAdded);
    this.map.off("overlayremove", this.handleOverlayRemoved);
    this.map.off("click", this.handleMapClick);
    this.map.off("mouseover", this.handleMouseover);
    this.map.off("mouseout", this.handleMouseout);
    this.map.off("mousemove", this.handleMousemove);
  },

  computed: {
    ...mapGetters("settings", ["getMapState"]),
    ...mapState("search", ["siteResults", "siteResultsCount"]),
    ...mapGetters("search", ["getDistinctSampleResults"]),
    ...mapState("map", [
      "defaultBaseLayer",
      "defaultOverlayLayers",
      "areaFromGeoserver",
      "siteFromGeoserver"
    ]),
    ...mapGetters("detail", ["getAreaSites", "getSample", "getAreaGeometry"])
  },

  watch: {
    "$vuetify.breakpoint.xsOnly"() {
      this.$nextTick(() => {
        console.log("tere");
        this.map.invalidateSize();
      });
    },

    getMapState(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.map.invalidateSize();
        });
      }
    },

    // "$vuetify.breakpoint.smAndDown"(newVal) {
    //   if (this.$route.name === "FrontPage") {
    //     if (newVal) {
    //       document
    //         .getElementsByClassName("leaflet-control-layers")
    //         .item(0).className = "leaflet-control-layers leaflet-control";
    //     } else {
    //       document
    //         .getElementsByClassName("leaflet-control-layers")
    //         .item(0).className =
    //         "leaflet-control-layers leaflet-control leaflet-control-layers-expanded";
    //     }
    //   }
    // },

    getAreaSites(newVal) {
      if (
        this.$route.name === "AreaDetail" ||
        this.$route.name === "SiteDetail"
      ) {
        this.updateActiveSites(newVal);
      }
    },

    // Todo: coordinates need formatting
    getAreaGeometry(newVal) {
      if (newVal && newVal.coordinates && newVal.coordinates.length > 0) {
        // console.log(newVal.coordinates);
        // let polygon = L.polygon(newVal.coordinates[0], { color: "#FFF" }).addTo(
        //   this.map
        // );
        // this.map.fitBounds(newVal.coordinates[0]);
        // this.activeSitesBounds = new L.featureGroup(
        //   this.activeSites
        // ).getBounds();
        // this.map.fitBounds(this.activeSitesBounds, { padding: [100, 100] });
      }
    },

    getSample(newVal) {
      if (this.$route.name === "SampleDetail") {
        let siteFromSample = [
          {
            id: newVal.site,
            name: newVal.site__name,
            longitude: newVal.site__longitude,
            latitude: newVal.site__latitude
          }
        ];
        this.updateActiveSites(siteFromSample);
      }
    },

    siteResults(newVal) {
      if (this.$route.name === "SiteTable") {
        this.updateActiveSites(newVal);
      }
    },

    getDistinctSampleResults(newVal) {
      if (this.$route.name === "SampleTable") {
        let sitesFromSample = newVal.map(sample => {
          return {
            id: sample.site_id,
            name: sample.site,
            longitude: sample.longitude,
            latitude: sample.latitude
          };
        });
        this.updateActiveSites(sitesFromSample);
      }
    },

    "$route.name"(newVal) {
      if (newVal === "AreaTable" || newVal === "SampleTable") {
        if (this.activeSitesLayer) this.map.removeLayer(this.activeSitesLayer);
        this.map.fitBounds([
          [59.8937871096, 21.5136411202],
          [57.3959015512, 28.3681954033]
        ]);
      }
    },

    "$route.path": {
      handler() {
        if (
          this.$route.name === "AreaTable" ||
          this.$route.name === "FrontPage"
        ) {
          document.getElementById("map")?.classList.add?.("cursor-crosshair");
          this.resetAreaAndSiteFromGeoserver();
        } else
          document
            .getElementById("map")
            ?.classList.remove?.("cursor-crosshair");
      },
      immediate: true
    },

    areaFromGeoserver(newVal) {
      if (newVal) {
        this.$router.push({ path: `/area/${newVal}` });
      }
    },

    siteFromGeoserver(newVal) {
      if (newVal) {
        this.$router.push({ path: `/site/${newVal}` });
      }
    }
  },

  methods: {
    ...mapActions("search", ["doSiteSearch"]),
    ...mapActions("map", [
      "updateDefaultBaseLayer",
      "appendToDefaultOverlayLayer",
      "removeFromDefaultOverlayLayer",
      "mapClicked",
      "resetAreaAndSiteFromGeoserver"
    ]),

    initMap() {
      this.map = L.map("map", {
        layers: [this.tileProviders[1].leafletObject],
        scrollWheelZoom: true,
        // wheelPxPerZoomLevel: 120,
        cursor: true,
        zoomDelta: 0.25,
        zoomSnap: 0,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
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
          // collapsed: !(
          //   this.$route.name === "FrontPage" && this.$vuetify.breakpoint.mdAndUp
          // )
        })
        .addTo(this.map);

      L.control.scale({ imperial: false }).addTo(this.map);
      this.map.addControl(new window.L.Control.Fullscreen());

      // Adding default base layer
      if (this.defaultBaseLayer && this.defaultBaseLayer !== "Fotokaart") {
        this.map.removeLayer(baseLayers["Fotokaart"]);
        this.map.addLayer(baseLayers[this.defaultBaseLayer]);
      }

      // Adding default overlay layers
      if (this.defaultOverlayLayers && this.defaultOverlayLayers.length > 0) {
        this.defaultOverlayLayers.forEach(layer => {
          if (!this.map.hasLayer(overlayMaps[layer])) {
            this.map.addLayer(overlayMaps[layer]);
          }
        });
      }

      this.updateAreaAndSiteLayerOrdering();
      this.updateLeafletLayerControlStyles();

      this.map.on("baselayerchange", this.handleBaseLayerChange);
      this.map.on("overlayadd", this.handleOverlayAdded);
      this.map.on("overlayremove", this.handleOverlayRemoved);
      this.map.on("click", this.handleMapClick);
      this.map.on("mouseover", this.handleMouseover);
      this.map.on("mouseout", this.handleMouseout);
      this.map.on("mousemove", this.handleMousemove);
    },

    handleBaseLayerChange(event) {
      this.updateDefaultBaseLayer(event.name);
    },

    handleOverlayAdded(event) {
      this.appendToDefaultOverlayLayer(event.name);
      this.updateAreaAndSiteLayerOrdering();
    },

    handleOverlayRemoved(event) {
      this.removeFromDefaultOverlayLayer(event.name);
    },

    handleMapClick(event) {
      if (
        (this.$route.name === "FrontPage" ||
          this.$route.name === "AreaTable") &&
        (this.map.hasLayer(this.overlayMaps[0].leafletObject) ||
          this.map.hasLayer(this.overlayMaps[1].leafletObject))
      ) {
        let radius = (this.maxZoom + 0.25 - this.map.getZoom()) * 500;
        let crs = event.target.options.crs;
        let circle = L.circle(event.latlng, {
          radius: radius
        }).addTo(this.map);

        let bounds = circle.getBounds();
        circle.remove();
        let sw = crs.project(bounds.getSouthWest());
        let ne = crs.project(bounds.getNorthEast());

        let bbox = sw.x + "," + sw.y + "," + ne.x + "," + ne.y;
        if (
          this.map.hasLayer(this.overlayMaps[0].leafletObject) &&
          this.map.hasLayer(this.overlayMaps[1].leafletObject)
        ) {
          this.mapClicked({ bbox: bbox, fetch: "both" });
        } else if (this.map.hasLayer(this.overlayMaps[0].leafletObject)) {
          this.mapClicked({ bbox: bbox, fetch: "site" });
        } else if (this.map.hasLayer(this.overlayMaps[1].leafletObject)) {
          this.mapClicked({ bbox: bbox, fetch: "area" });
        }
      }
    },

    handleMouseover() {
      this.showLiveCoordinates = true;
    },

    handleMouseout() {
      this.showLiveCoordinates = false;
    },

    handleMousemove(event) {
      this.latlngLive = event.latlng;
    },

    updateAreaAndSiteLayerOrdering() {
      this.map.eachLayer(layer => {
        if (
          layer &&
          layer.wmsParams &&
          layer.wmsParams.layers &&
          layer.wmsParams.layers === "turvas:Turbapunktid"
        ) {
          layer.setZIndex(30);
        }
        if (
          layer &&
          layer.wmsParams &&
          layer.wmsParams.layers &&
          layer.wmsParams.layers === "turvas:Turbaalad"
        ) {
          layer.setZIndex(29);
        }
      });
    },

    updateWmsOverlayParams(obj) {
      if (obj) {
        if (obj.area) {
          this.overlayMaps[0].leafletObject.setParams({
            CQL_FILTER: `area_id=${obj.area}`
          });
          this.overlayMaps[1].leafletObject.setParams({
            CQL_FILTER: `area_id=${obj.area}`
          });
        } else if (obj.site) {
          this.overlayMaps[0].leafletObject.setParams({
            CQL_FILTER: `id=${obj.site}`
          });
        }
      } else {
        this.overlayMaps[0].leafletObject.setParams({ CQL_FILTER: "INCLUDE" });
        this.overlayMaps[1].leafletObject.setParams({ CQL_FILTER: "INCLUDE" });
      }
    },

    updateActiveSites(listOfSites) {
      if (listOfSites && listOfSites.length > 0) {
        if (this.activeSitesLayer) this.map.removeLayer(this.activeSitesLayer);
        this.activeSites = [];
        this.activeSitesBounds = null;

        listOfSites.forEach(site => {
          if (site.latitude && site.longitude) {
            let markerRadius =
              this.$route.name === "SiteDetail" &&
              this.$route.params.id === site.id
                ? 7
                : 5;
            let marker = L.circleMarker(
              {
                lat: parseFloat(site.latitude),
                lng: parseFloat(site.longitude)
              },
              {
                radius: markerRadius,
                color:
                  this.$route.name === "SiteDetail" &&
                  this.$route.params.id === site.id
                    ? "#E91E63"
                    : "#FBC02D",
                fill: true,
                fillColor:
                  this.$route.name === "SiteDetail" &&
                  this.$route.params.id === site.id
                    ? "#E91E63"
                    : "#FBC02D",
                fillOpacity: 0.8
              }
            );

            marker.on("click", () => {
              this.$router.push({
                path: `/site/${site.id}`
              });
            });

            marker.bindTooltip(site.name, {
              permanent:
                listOfSites.length === 1 ||
                (this.$route.name === "SiteDetail" &&
                  this.$route.params.id === site.id),
              direction: "right",
              offset: [8, 0]
            });

            this.activeSites.push(marker);
          }
        });

        this.activeSitesLayer = L.layerGroup(this.activeSites);
        this.map.addLayer(this.activeSitesLayer);

        this.activeSitesBounds = new L.featureGroup(
          this.activeSites
        ).getBounds();
        this.map.fitBounds(this.activeSitesBounds, { padding: [100, 100] });
      } else {
        if (this.activeSitesLayer) this.map.removeLayer(this.activeSitesLayer);
        this.activeSites = [];
        this.activeSitesBounds = null;
      }
    },

    updateLeafletLayerControlStyles() {
      const layerListEl = document.getElementsByClassName(
        "leaflet-control-layers-list"
      );

      let baseLabel = this.createLayerControlLabel("Aluskaardid");

      // Switching base layers and overlay layers
      layerListEl[0].removeChild(layerListEl[0].children[1]);
      layerListEl[0].appendChild(baseLabel);
      layerListEl[0].appendChild(layerListEl[0].children[0]);

      const overlayLayersEl = document.getElementsByClassName(
        "leaflet-control-layers-overlays"
      );
      let planLabel = this.createLayerControlLabel("Turbaalade plaanid");
      let geoLabel = this.createLayerControlLabel("Geoloogiline taust");

      overlayLayersEl[0].insertBefore(planLabel, overlayLayersEl[0].firstChild);
      overlayLayersEl[0].insertBefore(
        geoLabel,
        overlayLayersEl[0].children[18]
      );
    },

    createLayerControlLabel(labelName) {
      let node = document.createElement("DIV");
      node.classList.add("leaflet-layer-group-label");
      let textNode = document.createTextNode(labelName);
      node.appendChild(textNode);
      return node;
    }
  }
};
</script>

<style scoped>
#map {
  position: fixed;
  height: calc(100% - 64px);
}

.top-controls >>> .leaflet-top {
  top: 64px;
}

#map >>> .leaflet-layer-group-label {
  font-weight: bold;
  font-size: 1rem;
}

#map >>> .leaflet-control-layers-overlays > label,
#map >>> .leaflet-control-layers-base {
  margin-left: 1rem;
}

#map >>> .leaflet-control-attribution > a {
  color: #000;
}

.live-coordinates {
  margin-bottom: 26px;
  margin-right: 118px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 500;
  background-color: #fff;
  border-radius: 5px;
  padding: 1px 6px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
}

.map-legend {
  margin-right: 10px;
  position: absolute;
  z-index: 500;
  background-color: #fff;
  border-radius: 5px;
  padding: 4px 6px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  right: 0;
  bottom: 0;
  margin-bottom: 26px;
}

.map-legend-row > span:first-child {
  width: 18px;
  height: 18px;
  display: inline-block;
  margin-right: 5px;
}

.cursor-crosshair {
  cursor: crosshair;
}

.cursor-crosshair:active {
  cursor: grabbing;
}

#map >>> .leaflet-control-layers-list {
  max-height: 320px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 5px;
}

.kik-logo {
  position: absolute;
  z-index: 500;
  width: 150px;
  bottom: 0;
  left: 0;
  margin-left: 10px;
  margin-bottom: 32px;
}

.kik-logo-sm {
  width: 100px;
}
</style>
