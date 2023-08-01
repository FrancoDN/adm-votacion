<template>
  <div class="card-chart">
    <v-card width="50rem" rounded="xxl" class="vue-card">
      <div class="card-state">
        <div class="card-row">
          <p class="label mt-8">Estado de avales</p>
          <p class="label mt-8">Cantidad</p>
          <p class="label mt-8">Porcentaje</p>
        </div>
        <v-divider color="black" class="ml-10 mr-10"></v-divider>
        <div class="card-data">
          <div class="card-column">
            <p class="label mt-6">Confirmados</p>
            <p class="label mt-5 mb-10">Pendientes</p>
          </div>
          <div class="card-column">
            <p class="label mt-6 mr-10" style="color: #1baed0">
              {{ avalesConfirmados }}
            </p>
            <p class="label mt-5 mb-10 mr-10" style="color: #8a8f90">
              {{ totalAvales - avalesConfirmados }}
            </p>
          </div>
          <div class="card-column">
            <p class="label mt-6" style="color: #1baed0">
              {{ ((avalesConfirmados * 100) / totalAvales).toFixed(2) }}%
            </p>
            <p class="label mt-5 mb-10" style="color: #8a8f90">
              {{ (100 - (avalesConfirmados * 100) / totalAvales).toFixed(2) }}%
            </p>
          </div>
        </div>
      </div>
    </v-card>
    <div class="chart-containerQuiniela" v-if="chartDataState">
      <Doughnut
        :data="chartData"
        :options="chartOptions"
        style="width: 23rem"
      />
    </div>
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";
export default {
  components: {
    Doughnut,
  },
  props: {
    numeroDeAvales: {
      type: Array,
      required: true,
    },
    avalesCargados: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      avalesConfirmados: 0,
      totalAvales: 0,
      chartDataState: null,
      chartData: {
        labels: ["Confirmados", "Pendientes"],
        datasets: [
          {
            label: "Votos",
            backgroundColor: ["#1BAED0", "#8A8F90"],
            backgroundColorHover: ["#0197BA", "#8A8F90    "],
            data: [1, 1],
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
    };
  },
  async mounted() {
    await this.actualizarChart();
  },

  watch: {
    numeroDeAvales: "actualizarChart",
    avalesCargados: "actualizarChart",
  },
  methods: {
    async countTotalAvals(data) {
      if (data) {
        Object.values(data).forEach((persona) => {
          if (persona.avales) {
            this.totalAvales += Object.keys(persona.avales).length;
          }
        });
      }
    },

    async contarAvalConfirmado(avales) {
      let conteoTotal = 0;

      Object.values(avales).forEach((uid) => {
        if (uid.avalNumero) {
          conteoTotal++;
        }
      });
      this.avalesConfirmados = conteoTotal;
    },
    async actualizarChart() {
      await this.countTotalAvals(this.numeroDeAvales);
      await this.contarAvalConfirmado(this.avalesCargados);

      this.chartData.datasets[0].data[0] = this.avalesConfirmados;
      this.chartData.datasets[0].data[1] =
        this.totalAvales - this.avalesConfirmados;
      // Establecer chartDataState en su valor actual
      this.chartDataState = { ...this.chartDataState };

    },
  },
};
</script>

<style>
.vue-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: center;
  height: 20rem;
}

.card-chart {
  background: #e2eaef;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 2rem;
  padding-top: 2rem;
}

.card-row,
.card-data {
  display: flex;
  justify-content: space-around;
}

.card-column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.chart-containerQuiniela {
  display: flex;
  justify-content: center;
}
</style>