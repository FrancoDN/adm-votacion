<template>
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :height="height"
    style="width: 31.25rem; height: 31.25rem"
  />
</template>
  
  <script>
import { Doughnut } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "VueChart",
  components: {
    Doughnut,
  },
  props: {
    chartId: {
      type: String,
      default: "doughnut-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    cssClasses: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      chartData: {
        labels: ["Vane Va", "UxP", "Juntos", "FDI"],
        datasets: [
          {
            label: "Votos",
            backgroundColor: ["#0C74AE", "#00B8FF", "#FFDA00", "#E00712"],
            data: [40, 20, 80, 10],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
  