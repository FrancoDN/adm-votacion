<template>
  <div class="admin">
    <div class="estadistica">
      <p style="font-weight: 700; font-size: 3.25rem;"><u>Estadísticas en tiempo real</u></p>
      <div class="d-flex justify-center">
        <vue-chart></vue-chart>
      </div>
      <p style="font-weight: 700; font-size: 3.25rem; text-align: center;"><u>Quiniela</u></p>
      <div class="quiniela"></div>
    </div>

    <v-card elevation="2" outlined shaped >
      <v-card-title
        style="font-weight: 700; font-family: Nunito; font-size: 3.25rem; margin-bottom: -2rem;"
        ><u>Conteo general</u></v-card-title
      >

      <div class="d-flex">
        <div class="partidos">
          <v-card-text>
            <p class="nombres">Vane Va</p>
            <p class="votos">123456</p>
            <p class="nombres">Juntos</p>
            <p class="votos">123456</p>
            <p class="nombres">FDI</p>
            <p class="votos">123456</p>
            <p class="nombres">UxP</p>
            <p class="votos">123456</p>
          </v-card-text>
        </div>
        <div class="total">
          <v-card-text>
            <p class="nombres"><b>TOTAL</b></p>
            <p class="votos">9999</p>
            <p class="nombres"><b>En blanco</b></p>
            <p class="votos">11111</p>
          </v-card-text>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import VueChart from '@/components/VueChart.vue';
export default {
  components: {
    VueChart,
  },
  data() {
    return {};
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&display=swap");

p {
  font-family: "Nunito", sans-serif;
}

.admin {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
}
.total {
  margin-left: 15rem;
}

.votos {
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  color: #0c74ae;
  margin-top: 2.3rem;
}

.nombres {
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 400;
  color: black;
  margin-top: 3.5rem;
}
</style>