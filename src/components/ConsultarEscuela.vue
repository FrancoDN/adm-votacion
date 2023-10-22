<template>
    <div>
      <v-data-table
      :headers="tableHeaders"
      :items="tableData"
      :search="search"
      class="elevation-1 mt-6 mr-6 ml-6"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Votos por Escuela y Mesa</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar"></v-text-field>
          </v-toolbar>
        </template>
      </v-data-table>
    </div>
  </template>
  
<script>
import firebase from 'firebase/app';
import 'firebase/database';
export default {
    data() {
        return {
            datosAgrupadosPorEscuela: {},
            search: '',
        };
    },
    computed: {
    tableHeaders() {
      return [
        { text: 'Escuela', value: 'escuela' },
        { text: 'Mesa', value: 'mesa' },
        { text: 'Votos en Blanco', value: 'blanco' },
        { text: 'Recurridos', value: 'recurridos' },
        { text: 'Impugnados', value: 'impugnados' },
        { text: 'Nulos', value: 'nulos' },
      ];
    },
    tableData() {
      const data = [];
      for (const escuela in this.datosAgrupadosPorEscuela) {
        for (const mesa in this.datosAgrupadosPorEscuela[escuela]) {
          const mesaData = this.datosAgrupadosPorEscuela[escuela][mesa];
          data.push({
            escuela: escuela,
            mesa: mesa,
            blanco: mesaData.blanco || 0,
            recurridos: mesaData.recurridos || 0,
            impugnados: mesaData.impugnados || 0,
            nulos: mesaData.nulos || 0,
          });
        }
      }
      return data;
    },
    filteredTableData() {
      if (!this.search) {
        return this.tableData;
      }
      const searchQuery = this.search.toLowerCase();
      return this.tableData.filter(item => {
        const escuelaMatch = item.escuela.toLowerCase().includes(searchQuery);
        const mesaMatch = item.mesa.toString().includes(searchQuery);
        return escuelaMatch || mesaMatch;
      });
    },
  },
    methods: {
        
        async agruparPorEscuelas() {
            const dbRef = firebase.database().ref('provincial');
            const escuelasRef = firebase.database().ref('escuelas');

            try {
                const provincialesSnapshot = await dbRef.once('value');
                const provincialesData = provincialesSnapshot.val() || {};

                const escuelasSnapshot = await escuelasRef.once('value');
                const escuelasData = escuelasSnapshot.val() || {};

                const datosAgrupadosPorEscuela = {};

                for (const mesaNumero in provincialesData) {
                    if (Object.prototype.hasOwnProperty.call(provincialesData, mesaNumero)) {
                        const mesaData = provincialesData[mesaNumero];

                        for (const escuelaKey in escuelasData) {
                            if (Object.prototype.hasOwnProperty.call(escuelasData, escuelaKey)) {
                                const escuela = escuelasData[escuelaKey];
                                const mesasEscuela = escuela.mesa;

                                if (Array.isArray(mesasEscuela) && mesasEscuela.includes(parseInt(mesaNumero))) {
                                    if (!datosAgrupadosPorEscuela[escuela.establecimiento]) {
                                        datosAgrupadosPorEscuela[escuela.establecimiento] = {};
                                    }

                                    if (!datosAgrupadosPorEscuela[escuela.establecimiento][mesaNumero]) {
                                        datosAgrupadosPorEscuela[escuela.establecimiento][mesaNumero] = {};
                                    }

                                    Object.keys(mesaData).forEach(lista => {
                                        datosAgrupadosPorEscuela[escuela.establecimiento][mesaNumero][lista] = mesaData[lista];
                                    });
                                }
                            }
                        }
                    }
                }

                this.datosAgrupadosPorEscuela = datosAgrupadosPorEscuela;
                console.log(this.datosAgrupadosPorEscuela);
            } catch (error) {
                console.error('Error al consultar los datos:', error);
            }
        },
    },

    mounted() {
        this.agruparPorEscuelas();
    },
};
</script>
  
<style scoped></style>
  