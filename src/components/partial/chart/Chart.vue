<template>
  <div class="chart">
    <!-- Todo: Add more charts -->
    <ScatterChart
      v-if="type === 'scatter'"
      :id="`${type}-chart`"
      :is-responsive="isResponsive"
      :class="{ 'fixed-chart': !isResponsive }"
    />
  </div>
</template>

<script>
import ScatterChart from "./ScatterChart";
export default {
  name: "Chart",
  components: { ScatterChart },
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
    },
    isResponsive: {
      type: Boolean,
      default: true
    },
    isMulti: {
      type: Boolean,
      default: true
    },
    parameter: {
      type: Object,
      required: false
    },
    index: {
      type: Number,
      required: false
    }
  },

  data: () => ({
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
      return this.getChartDataset(
        this.isMulti ? this.labels : [this.parameter]
      );
    },

    chartLabels() {
      return this.getChartLabels(this.isMulti ? this.labels : [this.parameter]);
    },

    chartOptions() {
      return {
        responsive: this.isResponsive,
        maintainAspectRatio: this.isResponsive,
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
              position: "top",
              ticks: {
                suggestedMin: 0
              }
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                suggestedMax: 0
              }
            }
          ]
        }
      };
    }
  },

  mounted() {
    this.renderMyChart();
  },

  watch: {
    data() {
      this.$children[0].$data._chart.destroy();
      this.renderMyChart();
    },

    labels() {
      this.$children[0].$data._chart.destroy();
      this.renderMyChart();
    }
  },

  methods: {
    renderMyChart() {
      this.$children[0].renderChart(
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
            data: this.buildData(this.type, label.value),
            backgroundColor: this.listOfColorsLighten[
              this.isMulti ? index : this.index
            ],
            borderColor: this.listOfColorsDarken[
              this.isMulti ? index : this.index
            ],
            borderWidth: 2
          };
        } else
          return {
            label: label.name,
            data: [],
            backgroundColor: this.listOfColorsLighten[
              this.isMulti ? index : this.index
            ],
            borderColor: this.listOfColorsDarken[
              this.isMulti ? index : this.index
            ],
            borderWidth: 2
          };
      });
    },

    buildData(chartType, field) {
      if (chartType === "scatter" || chartType === "line") {
        return this.data.map(data => {
          if (data[field]) {
            return {
              x: data[field],
              y: -(data.depth + data.depth_interval) / 2 || this.defaultDepth
            };
          }
        });
      } else return [];
    }
  }
};
</script>

<style scoped>
.fixed-chart {
  width: 300px;
}
</style>
