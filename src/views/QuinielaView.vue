<template>
  <div class="d-flex justify-center flex-column">
    <estadistica-quiniela />
    <chart-quiniela />
    <lista-quiniela />
  </div>
</template>
  
  <script>
import EstadisticaQuiniela from '@/components/EstadisticaQuiniela.vue';
import ChartQuiniela from '@/components/ChartQuiniela.vue';
import ListaQuiniela from '@/components/ListaQuiniela.vue';

export default {
  components: {
    EstadisticaQuiniela,
    ChartQuiniela,
    ListaQuiniela,
  },
};
</script>
  
  <style>

</style>
  