<template>
  <div style="height: 100%; width: 100%;">
    <pdf-avales-escuela></pdf-avales-escuela>
    <v-container style="background-color: #0197BA; width: 100%; max-width: 100%; height: 100%;">
      <v-row>
        <v-col v-for="(escuela, nombreEscuela) in escuelas" :key="nombreEscuela" cols="12" md="6">
          <ListaEscuela :escuela="escuela" :nombreEscuelaPadre="nombreEscuela"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
  </template>
  
  <script>
  import firebase from "firebase/app";
  import "firebase/database";
  import ListaEscuela from "@/components/ListaEscuela.vue"; // Asegúrate de importar correctamente el componente
  import PdfAvalesEscuela from "@/components/PdfAvalesEscuela.vue";
  export default {
    components: {
      ListaEscuela,
      PdfAvalesEscuela,
    },
    data() {
      return {
        escuelas: {},
      };
    },
  
    async mounted() {
      await this.obtenerVotosPorEscuela();
      console.log(this.escuelas);
    },
  
    methods: {
      async obtenerVotosPorEscuela() {
        try {
          const snapshot = await firebase
            .database()
            .ref("votosEscuelas")
            .once("value");
          this.escuelas = snapshot.val();
        } catch (error) {
          console.error("Error al obtener datos de votos por escuela:", error);
        }
      },
    },
  };
  </script>
  
  <style></style>
  