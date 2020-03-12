<template>
  <canvas ref="canvas" :height="!isResponsive ? 500 : ''" />
</template>

<script>
import { Scatter } from "vue-chartjs";

export default {
  name: "ScatterChart",
  extends: Scatter,
  props: {
    isResponsive: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped></style>
