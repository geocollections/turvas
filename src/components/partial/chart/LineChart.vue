<template>
  <canvas ref="canvas" :height="!isResponsive ? 500 : ''" />
</template>

<script>
import { Line } from "vue-chartjs";

export default {
  name: "LineChart",
  extends: Line,
  props: {
    isResponsive: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped></style>
