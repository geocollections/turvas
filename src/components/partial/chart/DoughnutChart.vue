<template>
  <div class="chart">
    <canvas ref="canvas" id="doughnut-chart" />
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: "DoughnutChart",
  extends: Doughnut,
  props: {
    labels: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    chartOptions: {
      layout: {
        padding: {
          top: 10,
          bottom: 30
        }
      },
      cutoutPercentage: 40
    }
  }),

  computed: {
    randomListOfColors() {
      return this.labels.map(
        label =>
          "#" +
          Math.random()
            .toString(16)
            .slice(-6)
      );
    }
  },

  mounted() {
    this.renderMyChart();
  },

  watch: {
    data() {
      this.$data._chart.destroy();
      this.renderMyChart();
    },

    labels() {
      this.$data._chart.destroy();
      this.renderMyChart();
    }
  },

  methods: {
    renderMyChart() {
      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              data: this.data,
              backgroundColor: this.randomListOfColors
            }
          ]
        },
        this.chartOptions
      );
    }
  }
};
</script>

<style scoped></style>
