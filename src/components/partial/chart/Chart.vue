<template>
  <div class="chart">
    <canvas ref="canvas" id="scatter-chart"></canvas>
  </div>
</template>

<script>
import { Scatter } from "vue-chartjs";

export default {
  name: "Chart",
  extends: Scatter,
  props: {
    type: {
      type: String,
      default: "scatter"
    },
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
      responsive: true,
      layout: {
        padding: {
          top: 10,
          bottom: 30
        }
      },
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0
      },
      responsiveAnimationDuration: 0,
      scales: {
        xAxes: [
          {
            type: "linear",
            position: "top"
          }
        ]
      }
    },
    listOfColors: [
      "#F44336",
      "#673AB7",
      "#03A9F4",
      "#4CAF50",
      "#FFEB3B",
      "#FF5722",
      "#9E9E9E",
      "#E91E63",
      "#3F51B5",
      "#00BCD4"
    ],
    listOfColorsLighten: [
      "#FFCDD2",
      "#D1C4E9",
      "#B3E5FC",
      "#C8E6C9",
      "#FFF9C4",
      "#FFCCBC",
      "#F5F5F5",
      "#F8BBD0",
      "#C5CAE9",
      "#B2EBF2"
    ],
    listOfColorsDarken: [
      "#B71C1C",
      "#311B92",
      "#01579B",
      "#1B5E20",
      "#F57F17",
      "#BF360C",
      "#212121",
      "#880E4F",
      "#1A237E",
      "#006064"
    ],
    defaultDepth: 0
  }),

  computed: {
    chartDataset() {
      return this.getChartDataset(this.labels);
    },

    chartLabels() {
      return this.getChartLabels(this.labels);
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
          labels: this.chartLabels,
          datasets: this.chartDataset
        },
        this.chartOptions
      );
    },

    getChartLabels(labels) {
      return labels.map(label => label.name);
    },

    getChartDataset(labels) {
      return labels.map((label, index) => {
        if (!label.isText) {
          return {
            label: label.name,
            data: this.data.map(data => {
              if (data[label.value]) {
                return {
                  x: data[label.value],
                  y:
                    -((data.depth + data.depth_interval) / 2) ||
                    this.defaultDepth
                };
              }
            }),
            backgroundColor: this.listOfColorsLighten[index],
            borderColor: this.listOfColorsDarken[index],
            borderWidth: 2
          };
        } else
          return {
            label: label.name,
            data: [],
            backgroundColor: this.listOfColorsLighten[index],
            borderColor: this.listOfColorsDarken[index],
            borderWidth: 2
          };
      });
    }
  }
};
</script>

<style scoped></style>
