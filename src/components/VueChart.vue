<template>
  <Doughnut
    :options="chartOptions"
    :data="chartData"
    :key="chartKey" 
    style="width: 37.5rem; height: 37.5rem"
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
    tipoVoto: {
      type: String,
      required: true,
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
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: false,
        },
        maintainAspectRatio: false,
      },
      chartKey: 0, // Inicializamos la variable adicional chartKey
    };
  },


};
</script>
