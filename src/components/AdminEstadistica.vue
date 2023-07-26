<template>
   <div class="estadistica">
      <div class="d-flex justify-center">
        <vue-chart :tipo-voto="tipoVoto"></vue-chart>
      </div>
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
  props: {
    tipoVoto: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>

</style>