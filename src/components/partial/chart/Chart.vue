<template>
  <div class="chart">
    <canvas id="turvas-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "Chart",
  props: {
    chartType: {
      type: String,
      default: "scatter"
    },
    chartLabels: {
      type: Array,
      required: true
    },
    chartData: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    chart: null,
    chartOptions: {
      responsive: true,
      layout: {
        padding: {
          top: 10,
          bottom: 30
        }
      },
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
    ]
  }),

  mounted() {
    this.createChart();
  },

  watch: {
    chartLabels: {
      handler(newVal) {
        const labelsAndDatasets = this.updateChart(newVal);
        this.chart.data.labels = labelsAndDatasets[0];
        this.chart.data.datasets = labelsAndDatasets[1];
        this.chart.update();
      },
      deep: true
    }
  },

  methods: {
    createChart() {
      const labelsAndDatasets = this.updateChart(this.chartLabels);

      const ctx = document.getElementById("turvas-chart");
      this.chart = new Chart(ctx, {
        type: this.chartType,
        labels: labelsAndDatasets[0],
        data: {
          datasets: labelsAndDatasets[1]
        },
        options: this.chartOptions
      });
    },

    calculateRadius(value) {
      const max = 15;
      const min = 3;
      if (value >= 100) return max;
      else {
        let newValue = (value * 15) / 100;
        return newValue < min ? min : newValue;
      }
    },

    updateChart(chartLabels) {
      const labels = chartLabels.map(label => label.name);

      const datasets = chartLabels.map((label, index) => {
        if (!label.isText) {
          return {
            label: label.name,
            data: this.chartData.map(data => {
              if (data[label.value]) {
                return {
                  x: data[label.value],
                  y: -data.depth_interval,
                  r: this.calculateRadius(data[label.value])
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

      return [labels, datasets];
    }
  }
};
</script>

<style scoped></style>
