<template>
  <div class="card-chart">
    <v-card width="47%" rounded="xxl" class="vue-card">
      <div class="card-state">
        <div class="card-row">
          <p class="label mt-8">Estado de voto</p>
          <p class="label mt-8">Cantidad</p>
          <p class="label mt-8">Porcentajes</p>
        </div>
        <v-divider color="black" class="ml-10 mr-10"></v-divider>
        <div class="card-data">
          <div class="card-column">
            <p class="label mt-6">Confirmados</p>
            <p class="label mt-5 mb-10">Pendientes</p>
          </div>
          <div class="card-column">
            <p class="label mt-6 mr-10" style="color: #1baed0">11.000</p>
            <p class="label mt-5 mb-10 mr-10" style="color: #8a8f90">4.000</p>
          </div>
          <div class="card-column">
            <p class="label mt-6 mr-7" style="color: #1baed0">75%</p>
            <p class="label mt-5 mb-10 mr-7" style="color: #8a8f90">25%</p>
          </div>
        </div>
      </div>
    </v-card>
    <div class="chart-container">
      <Doughnut
        :data="chartData"
        :options="chartOptions"
        style="width: 28rem"
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
    data() {
      return {
        chartData: {
          labels: ["Confirmados", "Pendientes"],
          datasets: [
            {
              label: "Votos",
              backgroundColor: ["#1BAED0", "#8A8F90"],
              backgroundColorHover: ["#0197BA", "#8A8F90    "],
              data: [11, 4],
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
};
</script>

<style>


.vue-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: center;
  height: 23rem;
}

.card-chart {
  background: #e2eaef;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
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

.chart-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>