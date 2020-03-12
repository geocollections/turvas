<template>
  <canvas ref="canvas" :height="!isResponsive ? 500 : ''" />
</template>

<script>
import { Bubble } from "vue-chartjs";

export default {
  name: "BubbleChart",
  extends: Bubble,
  props: {
    isResponsive: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped></style>
