<template>
   <div class="estadistica">
      <p style="font-weight: 700; font-size: 3.25rem;"><u>Estadísticas en tiempo real</u></p>
      <div class="d-flex justify-center">
        <vue-chart></vue-chart>
      </div>
      <p style="font-weight: 700; font-size: 3.25rem; text-align: center;"><u>Quiniela</u></p>
      <div class="quiniela"></div>
    </div>
</template>

<script>
import VueChart from './VueChart.vue';
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

</style>