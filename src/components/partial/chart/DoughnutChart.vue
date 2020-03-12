<template>
  <canvas ref="canvas" :height="!isResponsive ? 500 : ''" />
</template>

<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: "DoughnutChart",
  extends: Doughnut,
  props: {
    isResponsive: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped></style>
