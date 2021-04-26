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
    <div class="live-coordinates" v-if="showLiveCoordinates && latlngLive">
      <div>Lat: {{ latlngLive.lat.toFixed(6) }}</div>
      <div>Lon: {{ latlngLive.lng.toFixed(6) }}</div>
    </div>

    <map-legend
      v-if="$vuetify.breakpoint.smAndUp"
      :is-plans-layer-active="isPlansLayerActive"
      @handle:mouseEnter="map.scrollWheelZoom.disable()"
      @handle:mouseLeave="map.scrollWheelZoom.enable()"
    />

    <a
      href="https://kik.ee"
      target="KikWindow"
      :title="$t('frontpage.kik')"
      v-if="$route.name === 'FrontPage'"
    >
      <img
        src="https://www.kik.ee/sites/default/files/kik_est_logo__2.png"
        class="kik-logo"
        alt="kik logo"
        :class="$vuetify.breakpoint.smAndDown ? 'kik-logo-sm' : ''"
      />
    </a>

    <div
      v-if="$route.name === 'FrontPage'"
      class="app-title"
      :class="{
        'app-title-xs': $vuetify.breakpoint.xsOnly,
        'app-title-sm': $vuetify.breakpoint.smOnly,
        'app-title-md': $vuetify.breakpoint.mdOnly,
        'app-title-lg': $vuetify.breakpoint.lgAndUp
      }"
    >
      {{ $t("frontpage.title") }}
      <div
        class="app-subtitle"
        v-if="$vuetify.breakpoint.smAndUp"
        :class="{
          'app-subtitle-xs': $vuetify.breakpoint.xsOnly,
          'app-subtitle-sm': $vuetify.breakpoint.smOnly,
          'app-subtitle-md': $vuetify.breakpoint.mdOnly,
          'app-subtitle-lg': $vuetify.breakpoint.lgAndUp
        }"
        v-html="$t('frontpage.subtitle')"
      />
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";
import "proj4leaflet";
import { mapActions, mapGetters, mapState } from "vuex";
import { debounce } from "lodash";
import MapLegend from "@/components/partial/map/MapLegend";

export default {
  name: "Map",
  components: { MapLegend },
  data() {
    return {
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
          id: "Põhikaart",
          name: "Põhikaart",
          name_en: "Main map",
          leafletObject: L.tileLayer(
            "https://tiles.maaamet.ee/tm/tms/1.0.0/kaart/{z}/{x}/{y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
            {
              attribution: `<a href='http://www.maaamet.ee/' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.maaamet"
              )}</a>`,
              tms: true,
              detectRetina: true,
              updateWhenIdle: true,
              zIndex: 1
            }
          )
        },
        {
          id: "Fotokaart",
          name: "Fotokaart",
          name_en: "Satellite map",
          leafletObject: L.tileLayer(
            "https://tiles.maaamet.ee/tm/tms/1.0.0/foto/{z}/{x}/{y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
            {
              attribution: `<a href='http://www.maaamet.ee/' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.maaamet"
              )}</a>`,
              tms: true,
              detectRetina: true,
              updateWhenIdle: true,
              zIndex: 1
            }
          )
        },
        {
          id: "Reljeefikaart",
          name: "Reljeefikaart",
          name_en: "Relief map",
          leafletObject: L.tileLayer(
            "https://tiles.maaamet.ee/tm/tms/1.0.0/reljeef/{z}/{x}/{y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
            {
              attribution: `<a href='http://www.maaamet.ee/' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.maaamet"
              )}</a>`,
              tms: true,
              detectRetina: true,
              updateWhenIdle: true
            }
          )
        }
      ],
      overlayMaps: [
        {
          id: "Turbaalad",
          name: "Turbaalad",
          name_en: "Peat areas",
          leafletObject: L.tileLayer.wms(
            "https://gis.geocollections.info/geoserver/wms",
            {
              attribution: `<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.gi"
              )}</a>`,
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
          id: "Uuringupunktid",
          name: "Uuringupunktid",
          name_en: "Sampling sites",
          leafletObject: L.tileLayer.wms(
            "https://gis.geocollections.info/geoserver/wms",
            {
              attribution: `<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.gi"
              )}</a>`,
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
          id: "Turbaalade plaanid",
          name: "Turbaalade plaanid",
          name_en: "Peat area plans",
          leafletObject: L.tileLayer.wms(
            "https://gis.geocollections.info/geoserver/wms",
            {
              attribution: `<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.gi"
              )}</a>`,
              layers: "turvas:Plaanid",
              format: "image/png",
              transparent: true,
              tiled: true,
              detectRetina: true,
              updateWhenIdle: true
            }
          )
        },
        {
          id: "Turbamaardlad 2020",
          name: "Turbamaardlad 2020",
          name_en: "Peat deposits 2020",
          leafletObject: L.tileLayer.wms(
            "https://gis.geocollections.info/geoserver/wms",
            {
              attribution: `<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.gi"
              )}</a>`,
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
          id: "Soosetted (400k)",
          name: "Soosetted (400k)",
          name_en: "Peat sediments (400k)",
          leafletObject: L.tileLayer.wms(
            "https://gis.geocollections.info/geoserver/wms",
            {
              attribution: `<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.gi"
              )}</a>`,
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
          id: "Mullakaart",
          name: "Mullakaart",
          name_en: "Soil map",
          leafletObject: L.tileLayer.wms("https://kaart.maaamet.ee/wms/alus?", {
            attribution: `<a href='https://www.egt.ee/et' target='MapReferenceWindow'>&copy; ${this.$t(
              "map.egt"
            )}</a>`,
            layers: "mullaraster",
            format: "image/png",
            transparent: true,
            tiled: true,
            detectRetina: true,
            updateWhenIdle: true
          })
        },
        {
          id: "Pinnakatte paksus",
          name: "Pinnakatte paksus",
          name_en: "Coating thickness",
          leafletObject: L.tileLayer.wms(
            "https://kaart.maaamet.ee/wms/geoloogia?",
            {
              attribution: `<a href='https://www.egt.ee/et' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.egt"
              )}</a>`,
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
          id: "Aluspõhja reljeef",
          name: "Aluspõhja reljeef",
          name_en: "Bedrock relief",
          leafletObject: L.tileLayer.wms(
            "https://kaart.maaamet.ee/wms/geoloogia?",
            {
              attribution: `<a href='https://www.egt.ee/et' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.egt"
              )}</a>`,
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
          id: "Aluspõhja geoloogia 400k",
          name: "Aluspõhja geoloogia 400k",
          name_en: "Bedrock geology 400k",
          leafletObject: L.tileLayer.wms(
            "https://gis.geocollections.info/geoserver/wms",
            {
              attribution: `<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.gi"
              )}</a>`,
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
          id: "Maakonnad",
          name: "Maakonnad",
          name_en: "Counties",
          leafletObject: L.tileLayer.wms(
            "https://gis.geocollections.info/geoserver/wms",
            {
              attribution: `<a href='https://ttu.ee/geoloogia-instituut' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.gi"
              )}</a>`,
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
          id: "Hübriidkaart",
          name: "Hübriidkaart",
          name_en: "Hybrid map",
          leafletObject: L.tileLayer(
            "https://tiles.maaamet.ee/tm/tms/1.0.0/hybriid/{z}/{x}/{y}.png&ASUTUS=TALTECH&KESKKOND=LIVE&IS=SARV",
            {
              attribution: `<a href='http://www.maaamet.ee/' target='MapReferenceWindow'>&copy; ${this.$t(
                "map.maaamet"
              )}</a>`,
              tms: true,
              detectRetina: true,
              updateWhenIdle: true
            }
          )
        }
      ],
      showLiveCoordinates: false,
      latlngLive: null
    };
  },

  mounted() {
    this.initMap();

    document.getElementById("map").classList.add("cursor-crosshair");
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
    ...mapGetters("detail", ["getAreaSites", "getSample", "getAreaGeometry"]),
    ...mapGetters("map", ["isPlansLayerActive"]),
    computedDefaultBaseLayer() {
      return this.$t("map.Satellite map");
    },
    computedDefaultOverlayLayers() {
      if (this.defaultOverlayLayers && this.defaultOverlayLayers.length > 0) {
        const translated = this.defaultOverlayLayers.map(item => {
          return this.$t(`map.${item}`);
        });
        return translated;
      } else
        return [
          this.$t("map.Turbaalad"),
          this.$t("map.Uuringupunktid"),
          this.$t("map.Maakonnad")
        ];
    }
  },

  watch: {
    "$vuetify.breakpoint.xsOnly"() {
      this.$nextTick(() => {
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
        this.resetAreaAndSiteFromGeoserver();
      },
      immediate: true
    },

    areaFromGeoserver(newVal) {
      if (newVal && this.$route.path !== `/turbaala/${newVal}`) {
        this.$router.push({ path: `/turbaala/${newVal}` });
      }
    },

    siteFromGeoserver(newVal) {
      if (newVal && this.$route.path !== `/proovipunkt/${newVal}`) {
        this.$router.push({ path: `/proovipunkt/${newVal}` });
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
        baseLayers[
          this.$i18n.locale === "ee" ? provider.name : provider.name_en
        ] = provider.leafletObject;
      });
      let overlayMaps = {};
      this.overlayMaps.forEach(
        provider =>
          (overlayMaps[
            this.$i18n.locale === "ee" ? provider.name : provider.name_en
          ] = provider.leafletObject)
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
      if (
        this.defaultBaseLayer &&
        this.defaultBaseLayer !== this.$t("map.Satellite map")
      ) {
        this.map.removeLayer(baseLayers[this.$t("map.Satellite map")]);
        this.map.addLayer(baseLayers[this.computedDefaultBaseLayer]);
      }

      // Adding default overlay layers
      if (
        this.computedDefaultOverlayLayers &&
        this.computedDefaultOverlayLayers.length > 0
      ) {
        this.computedDefaultOverlayLayers.forEach(layer => {
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
        this.map.hasLayer(this.overlayMaps[0].leafletObject) ||
        this.map.hasLayer(this.overlayMaps[1].leafletObject)
      ) {
        let radius = (this.maxZoom + 0.25 - this.map.getZoom()) * 50;
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

    handleMarkerClick(siteId) {
      if (this.$route.params.id !== siteId) {
        this.$router.push({
          path: `/proovipunkt/${siteId}`
        });
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

            L.DomEvent.on(marker, "click", event => {
              L.DomEvent.stopPropagation(event);
              this.handleMarkerClick(site.id);
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

      let baseLabel = this.createLayerControlLabel(this.$t("map.basemaps"));

      // Switching base layers and overlay layers
      layerListEl[0].removeChild(layerListEl[0].children[1]);
      layerListEl[0].appendChild(baseLabel);
      layerListEl[0].appendChild(layerListEl[0].children[0]);

      const overlayLayersEl = document.getElementsByClassName(
        "leaflet-control-layers-overlays"
      );
      let planLabel = this.createLayerControlLabel(this.$t("map.peatResearch"));
      let geoLabel = this.createLayerControlLabel(
        this.$t("map.geologicalBackground")
      );

      overlayLayersEl[0].insertBefore(planLabel, overlayLayersEl[0].firstChild);
      overlayLayersEl[0].insertBefore(geoLabel, overlayLayersEl[0].children[5]);
      overlayLayersEl[0].insertBefore(
        baseLabel,
        overlayLayersEl[0].children[11]
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

.top-controls >>> .leaflet-top,
.top-controls >>> .live-coordinates {
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
  /*margin-top: 56px;*/
  margin-top: 64px; /* mobile size needs to be 8px higher becuase of layerswitch */
  /*margin-right: 134px;*/
  margin-right: 10px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 500;
  background-color: #fff;
  border-radius: 5px;
  padding: 1px 6px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  opacity: 0.7;
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
  z-index: 450;
  width: 150px;
  bottom: 0;
  left: 0;
  margin-left: 10px;
  margin-bottom: 32px;
  transition: opacity 100ms ease-in-out;
}

.kik-logo:hover {
  opacity: 0.8;
}

.kik-logo-sm {
  width: 100px;
}

.app-title {
  position: absolute;
  top: 80px;
  left: 70px;
  right: 50px;
  z-index: 450;
  color: #fff;
  font-weight: 600;
  text-shadow: 1px 1px 10px #000;
}

.app-title-xs {
  font-size: 1.35em;
  left: 55px;
  top: 75px;
  max-width: 300px;
}

.app-title-sm {
  font-size: 2em;
  left: 60px;
  top: 75px;
  max-width: 400px;
}

.app-title-md {
  font-size: 2.5em;
  max-width: 500px;
  left: 70px;
}

.app-title-lg {
  font-size: 3em;
  max-width: 600px;
}

.app-subtitle {
  font-weight: normal;
}

.app-subtitle-xs {
  font-size: 0.65rem;
}

.app-subtitle-sm {
  font-size: 0.75rem;
  letter-spacing: 0.75px;
}

.app-subtitle-md {
  font-size: 0.85rem;
}

.app-subtitle-lg {
  font-size: 0.95rem;
}

.app-subtitle >>> a {
  transition: opacity 100ms ease-in-out;
}

.app-subtitle >>> a:hover {
  opacity: 0.8;
}
</style>
