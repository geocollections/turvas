<template>
  <div class="chart">
    <ScatterChart
      v-if="type === 'scatter'"
      :id="`${type}-chart`"
      :is-responsive="isResponsive"
      :class="{ 'fixed-chart': !isResponsive }"
    />
    <BubbleChart
      v-if="type === 'bubble'"
      :id="`${type}-chart`"
      :is-responsive="isResponsive"
      :class="{ 'fixed-chart': !isResponsive }"
    />
    <LineChart
      v-if="type === 'line'"
      :id="`${type}-chart`"
      :is-responsive="isResponsive"
      :class="{ 'fixed-chart': !isResponsive }"
    />
  </div>
</template>

<script>
import ScatterChart from "./ScatterChart";
import BubbleChart from "./BubbleChart";
import LineChart from "./LineChart";
export default {
  name: "Chart",
  components: { LineChart, BubbleChart, ScatterChart },
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
    defaultColor: "#BDBDBD",
    defaultColorDark: "#424242",
    rabaturvasColor: "#fff9c4",
    rabaturvasColorDark: "#CCC691",
    siirdesooturvasColor: "#c8e6c9",
    siirdesooturvasColorDark: "#95B396",
    madalsooturvasColor: "#bbdefb",
    madalsooturvasColorDark: "#88ABC8",
    jarvemudaColor: "#cfd8dc",
    jarvemudaColorDark: "#9CA5A9",
    slightlyDegraded: "#F44336",
    slightlyDegradedDark: "#B71C1C",
    wellDegraded: "#4CAF50",
    wellDegradedDark: "#1B5E20",
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
                // suggestedMin: 0
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
        // tooltips: {
        //   callbacks: {
        //     label: function(tooltipItem, data) {
        //       return `(${
        //         data["datasets"][0]["data"][tooltipItem["index"]].x
        //       }, ${data["datasets"][0]["data"][tooltipItem["index"]].y}) - ${
        //         data["datasets"][0]["data"][tooltipItem["index"]].rock
        //       }`;
        //     }
        //   }
        // }
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
      return labels.map(label =>
        this.$translate({ et: label.name, en: label.name_en })
      );
    },

    getChartDataset(labels) {
      let builtData = this.buildData(this.type, labels[0].value);

      let rabaturvas = [];
      let siirdesooturvas = [];
      let madalsooturvas = [];
      let jarvemuda = [];

      builtData.forEach(item => {
        if (item.rock) {
          if (item.rock === "rabaturvas") rabaturvas.push(item);
          else if (item.rock === "siirdesooturvas") siirdesooturvas.push(item);
          else if (item.rock === "madalsooturvas") madalsooturvas.push(item);
          else if (item.rock === "järvemuda") jarvemuda.push(item);
        }
      });

      if (rabaturvas.length > 0) {
        labels = [
          ...labels,
          {
            ...labels[0],
            name: "rabaturvas",
            name_en: "bog peat",
            original_name: labels[0].name
          }
        ];
      }
      if (siirdesooturvas.length > 0) {
        labels = [
          ...labels,
          {
            ...labels[0],
            name: "siirdesooturvas",
            name_en: "transitional peat",
            original_name: labels[0].name
          }
        ];
      }
      if (madalsooturvas.length > 0) {
        labels = [
          ...labels,
          {
            ...labels[0],
            name: "madalsooturvas",
            name_en: "fen peat",
            original_name: labels[0].name
          }
        ];
      }
      if (jarvemuda.length > 0) {
        labels = [
          ...labels,
          {
            ...labels[0],
            name: "jarvemuda",
            name_en: "gyttja",
            original_name: labels[0].name
          }
        ];
      }

      if (labels[0].name !== "turba lagunemisaste")
        labels = labels.splice(0).reverse();

      return labels.map(label => {
        console.log(label);
        if (!label.isText) {
          let name = label.name;
          let name_en = label.name_en;
          let data = this.buildData(this.type, label.value);
          let borderColor = this.defaultColorDark;
          let backgroundColor = this.defaultColor;
          let showLine = true;
          let pointBackgroundColor = context => {
            if (
              label.name === "turba lagunemisaste" &&
              context.dataset.data.length > 0
            ) {
              let color = this.slightlyDegraded;
              let index = context.dataIndex;
              let value = context.dataset.data[index];
              if (value && value.x >= 26) color = this.wellDegraded;
              return color;
            }
          };
          let pointBorderColor = context => {
            if (
              label.name === "turba lagunemisaste" &&
              context.dataset.data.length > 0
            ) {
              let color = this.slightlyDegradedDark;
              let index = context.dataIndex;
              let value = context.dataset.data[index];
              if (value && value.x >= 26) color = this.wellDegradedDark;
              return color;
            }
          };
          if (name === "rabaturvas") {
            name = `rabaturvas`;
            name_en = `bog peat`;
            data = rabaturvas;
            borderColor = this.rabaturvasColorDark;
            backgroundColor = this.rabaturvasColor;
            showLine = false;
          } else if (name === "siirdesooturvas") {
            name = `siirdesooturvas`;
            name_en = `transitional peat`;
            data = siirdesooturvas;
            borderColor = this.siirdesooturvasColorDark;
            backgroundColor = this.siirdesooturvasColor;
            showLine = false;
          } else if (name === "madalsooturvas") {
            name = `madalsooturvas`;
            name_en = `fen peat`;
            data = madalsooturvas;
            borderColor = this.madalsooturvasColorDark;
            backgroundColor = this.madalsooturvasColor;
            showLine = false;
          } else if (name === "järvemuda") {
            name = `järvemuda`;
            name_en = `gyttja`;
            data = jarvemuda;
            borderColor = this.jarvemudaColorDark;
            backgroundColor = this.jarvemudaColor;
            showLine = false;
          }

          return {
            label: this.$translate({ et: name, en: name_en }),
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            pointBackgroundColor: pointBackgroundColor,
            pointBorderColor: pointBorderColor,
            pointRadius: 5,
            borderWidth: 2,
            showLine: showLine,
            fill: false,
            lineTension: 0
          };
        } else
          return {
            label: this.$translate({ et: label.name, en: label.name_en }),
            data: [],
            backgroundColor: this.defaultColorDark,
            borderColor: this.defaultColor,
            borderWidth: 2,
            showLine: true,
            fill: false,
            lineTension: 0
          };
      });
    },

    buildData(chartType, field) {
      let filteredData = this.data.filter(data => data[field]);

      if (chartType === "scatter" || chartType === "line") {
        return filteredData.map(data => {
          return {
            x: data[field].toFixed(3),
            y: this.calculateDepth(data.depth, data.depth_interval),
            rock: data.rock,
            rock_en: data.rock_en
          };
        });
      } else if (chartType === "bubble") {
        return filteredData.map(data => {
          return {
            x: data[field].toFixed(3),
            y: this.calculateDepth(data.depth, data.depth_interval),
            r: 5,
            rock: data.rock,
            rock_en: data.rock_en
          };
        });
      } else return [];
    },

    calculateDepth(depth, depthInterval) {
      let newDepth = -(depth + depthInterval) / 2 || this.defaultDepth;
      return newDepth.toFixed(3);
    }
  }
};
</script>

<style scoped>
.fixed-chart {
  width: 300px;
}
</style>
