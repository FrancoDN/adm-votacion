<template>
  <v-card class="school-card mb-4 elevation-3" v-if="escuela">
    <v-card-title class="school-title">{{ nombreEscuela }}</v-card-title>
    <v-card-text>
      <v-data-table :headers="encabezados" :items="candidatosYVotos" hide-default-footer class="elevation-1">
        <template v-slot:item="{ item }">
          <tr :class="{ 'highlight-row': item.candidatoIntendente === 'Vanesa QUEYFFER' }">
            <td class="text-left">
              <b>{{ item.nombrePartido }}</b> - {{ item.candidatoIntendente }}
            </td>
            <td class="text-right">{{ item.intendente }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script>
export default {
  props: {
    escuela: Object,
    nombreEscuelaPadre: String,
  },
  computed: {
    candidatosYVotos() {
      if (this.escuela) {
        const candidatosArray = Object.entries(this.escuela);

        // Agregar el nombre del partido a cada candidato
        const candidatosConPartido = candidatosArray.map(([nombrePartido, candidato]) => {
          return {
            ...candidato,
            nombrePartido: nombrePartido
          };
        });

        // Ordenar los candidatos por votos en orden descendente
        candidatosConPartido.sort((a, b) => b.intendente - a.intendente);

        return candidatosConPartido.slice(0, 5);
      }
      return [];
    },
    encabezados() {
      return [
        { text: "Candidato", value: "candidatoIntendente", align: "start" },
        { text: "Votos", value: "intendente", align: "end" },
      ];
    },
    nombreEscuela() {
      return this.nombreEscuelaPadre;
    },
  },
};
</script>

<style scoped>
.highlight-row {
  background-color: rgba(27, 174, 208, 0.5); /* Cambia este color al que prefieras */
}
td {
  font-family: Nunito;
}
.elevation-1 {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-size: 24px;
  font-weight: bold;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}
</style>
