<template>
  <div class="d-flex justify-center flex-column">
    <estadistica-quiniela
      v-if="numeroDeAvales"
      :numeroDeAvales="numeroDeAvales"
    />
    <chart-quiniela
      v-if="numeroDeAvales && avalesCargados"
      :avalesCargados="avalesCargados"
      :numeroDeAvales="numeroDeAvales"
    />
    <lista-quiniela
      v-if="numeroDeAvales && avalesCargados"
      :avalesCargados="avalesCargados"
      :numeroDeAvales="numeroDeAvales"
    />
  </div>
</template>
  
  <script>
import firebase from "firebase/app";
import "firebase/database";
import EstadisticaQuiniela from "@/components/EstadisticaQuiniela.vue";
import ChartQuiniela from "@/components/ChartQuiniela.vue";
import ListaQuiniela from "@/components/ListaQuiniela.vue";

export default {
  components: {
    EstadisticaQuiniela,
    ChartQuiniela,
    ListaQuiniela,
  },

  data() {
    return {
      avalesCargados: null,
      numeroDeAvales: null,
    };
  },
  async mounted() {
    await this.getAvalsData();
    await this.getAvalesCargadosData();
  },

  methods: {
    async getAvalesCargadosData() {
      firebase
        .database()
        .ref("avalesCargados")
        .once("value")
        .then((snapshot) => {
          this.avalesCargados = snapshot.val();
        })
        .catch((error) => {
          console.error("Error fetching avales cargados data:", error);
        });
    },

    async getAvalsData() {
      firebase
        .database()
        .ref("avales")
        .once("value")
        .then((snapshot) => {
          const avales = snapshot.val();
          this.numeroDeAvales = Object.values(avales);
        })
        .catch((error) => {
          console.error("Error fetching avales data:", error);
        });
    },
  },
};
</script>
  
  <style>
</style>
  