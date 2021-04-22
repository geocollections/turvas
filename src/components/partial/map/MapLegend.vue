<template>
  <div
    class="map-legend"
    ref="legend"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="map-legend-row d-flex flex-row">
      <span style="background-color: #70b160;"></span>
      <span>{{ $t("map.area") }}</span>
    </div>
    <div class="map-legend-row d-flex flex-row">
      <span style="background-color: #ec1e17;"></span>
      <span>{{ $t("map.site") }}</span>
    </div>
    <template v-if="isPlansLayerActive">
      <div class="map-legend-row d-flex flex-row">
        <span style="background-color: #fff; border: 1px solid #000;"></span>
        <span>{{ $t("map.plans") }}</span>
      </div>

      <div class="map-legend-row d-flex flex-row">
        <span class="text-center font-weight-bold">M</span>
        <span>{{ $t("map.madalsoo") }}</span>
      </div>

      <div class="map-legend-row d-flex flex-row">
        <span class="text-center font-weight-bold">S<sub>s</sub></span>
        <span>{{ $t("map.siirdesoo") }}</span>
      </div>

      <div class="map-legend-row d-flex flex-row">
        <span class="text-center font-weight-bold">R<sub>s</sub></span>
        <span>{{ $t("map.rabaSega") }}</span>
      </div>

      <div class="map-legend-row d-flex flex-row">
        <span class="text-center font-weight-bold">R</span>
        <span>{{ $t("map.raba") }}</span>
      </div>

      <div class="map-legend-row d-flex flex-row">
        <span class="text-center font-weight-bold">m</span>
        <span>{{ $t("map.metsa") }}</span>
      </div>

      <div class="map-legend-row d-flex flex-row">
        <span
          class="text-center font-weight-bold"
          style="white-space: nowrap; width: 30px"
          >m-mr</span
        >
        <span>{{ $t("map.metsaMare") }}</span>
      </div>

      <div class="map-legend-row d-flex flex-row">
        <span class="text-center font-weight-bold">mr</span>
        <span>{{ $t("map.mare") }}</span>
      </div>

      <div
        class="map-legend-row d-flex flex-row"
        v-for="item in planLegends"
        :key="item.id"
      >
        <span style="width: 52px; height: 20px">
          <img
            :alt="item.id"
            :src="item.icon"
            width="52"
            style="vertical-align: middle"
          />
        </span>
        <span>{{ $t(`map.${item.id}`) }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "MapLegend",
  props: {
    isPlansLayerActive: Boolean
  },
  data() {
    return {
      planLegends: [
        {
          id: "sookaitse_alad",
          icon: require("@/assets/img/legend/sookaitse_alad.png")
        },
        {
          id: "turbamaardla_0_kontuur",
          icon: require("@/assets/img/legend/turbamaardla_0_kontuur.png")
        },
        {
          id: "toostuslasund_kontuur",
          icon: require("@/assets/img/legend/toostuslasund_kontuur.png")
        },
        {
          id: "kultuurpind",
          icon: require("@/assets/img/legend/kultuurpind.png")
        },
        {
          id: "sapropeeli_0_kontuur",
          icon: require("@/assets/img/legend/sapropeeli_0_kontuur.png")
        },
        {
          id: "sapropeeli_toostuslasund",
          icon: require("@/assets/img/legend/sapropeeli_toostuslasund.png")
        },
        {
          id: "alusturba_levikuala",
          icon: require("@/assets/img/legend/alusturba_levikuala.png")
        },
        {
          id: "majandi_piir",
          icon: require("@/assets/img/legend/majandi_piir.png")
        },
        {
          id: "lasundituubi_kontuur",
          icon: require("@/assets/img/legend/lasundituubi_kontuur.png")
        },
        {
          id: "rajooni_piir",
          icon: require("@/assets/img/legend/rajooni_piir.png")
        },
        {
          id: "vabariigi_piir",
          icon: require("@/assets/img/legend/vabariigi_piir.png")
        },
        {
          id: "proovipunkt",
          icon: require("@/assets/img/legend/proovipunkt.png")
        },
        {
          id: "sondeerimispunkt",
          icon: require("@/assets/img/legend/sondeerimispunkt.png")
        },
        {
          id: "vana_proovipunkt",
          icon: require("@/assets/img/legend/vana_proovipunkt.png")
        },
        {
          id: "vana_sondeerimispunkt",
          icon: require("@/assets/img/legend/vana_sondeerimispunkt.png")
        },
        {
          id: "vana_karjaar",
          icon: require("@/assets/img/legend/vana_karjaar.png")
        },
        {
          id: "tootmisala",
          icon: require("@/assets/img/legend/tootmisala.png")
        },
        {
          id: "vana_raudtee",
          icon: require("@/assets/img/legend/vana_raudtee.png")
        }
      ]
    };
  },
  methods: {
    handleMouseEnter() {
      if (this.isPlansLayerActive) this.$emit("handle:mouseEnter");
    },

    handleMouseLeave() {
      this.$emit("handle:mouseLeave");
    }
  }
};
</script>

<style scoped>
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
  opacity: 0.8;
  transition: opacity 200ms ease-in-out;

  max-height: 150px;
  overflow-y: auto;
}

.map-legend:hover {
  opacity: 1;
  /*cursor: default;*/
}

.map-legend-row {
  margin-top: 2px;
  margin-bottom: 2px;
}

.map-legend-row > span:first-child {
  width: 18px;
  height: 18px;
  display: inline-block;
  margin-right: 5px;
}
</style>
