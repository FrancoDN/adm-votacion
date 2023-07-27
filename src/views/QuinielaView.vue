<template>
  <v-card>
    <div class="statistics">
      <div class="statistic">
        <p class="label">Padron electoral</p>
        <p class="value">50,000</p>
      </div>
      <div class="statistic">
        <p class="label">Porcentaje de avales</p>
        <p class="value">20%</p>
      </div>
      <div class="statistic">
        <p class="label">Participación</p>
        <p class="value">{{ participationPercentage }}%</p>
      </div>
    </div>

    <v-divider></v-divider>

    <div class="chart-container">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>

    <v-divider></v-divider>

    <div class="details">
      <h3>Detalles de votos</h3>
      <v-data-table
        :headers="headers"
        :items="detailsData"
        hide-default-footer
      ></v-data-table>
    </div>

    <v-divider></v-divider>

    <div class="select-person">
      <v-select
        v-model="selectedPersonName"
        :items="peopleWithAvals.map((person) => person.name)"
        label="Seleccione una persona con avales"
        solo
        hide-details
        @input="getAvalesConfirmados(selectedPerson)"
      ></v-select>
    </div>

    <v-divider></v-divider>

    <div class="person-details" v-if="selectedPerson">
  <h3>Detalles de la persona seleccionada</h3>
  <p>Nombre: {{ selectedPerson.name }}</p>
  <p>Avales confirmados: {{ getAvalesConfirmados(selectedPerson) }} de {{ selectedPerson.avales.length }}</p>
  <!-- Puedes mostrar los avales individuales si lo deseas -->
  <p>Avales individuales: {{ selectedPerson.avales.join(", ") }}</p>
</div>
  </v-card>
</template>
  
  <script>
import { Doughnut } from "vue-chartjs";
import firebase from "firebase/app";
import "firebase/database";

export default {
  components: {
    Doughnut,
  },
  data() {
    return {
      participationPercentage: 10, // Actualizar este valor con los datos reales
      totalConfirmedVotes: 500, // Agregar el número total de votos confirmados (actualizar con datos reales)
      totalPendingVotes: 4500, // Agregar el número total de votos pendientes (actualizar con datos reales)
      chartData: {
        labels: ["Confirmados", "Pendientes"],
        datasets: [
          {
            data: [500, 4500],
            backgroundColor: ["#4caf50", "#e0e0e0"],
            hoverBackgroundColor: ["#2e7d32", "#bdbdbd"],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: "bottom",
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const currentValue = dataset.data[tooltipItem.index];
              const total = dataset.data.reduce(
                (previousValue, currentValue) => previousValue + currentValue
              );
              const percentage = ((currentValue / total) * 100).toFixed(2);
              return `${dataset.label}: ${currentValue} (${percentage}%)`;
            },
          },
        },
      },
      headers: [
        { text: "Estado de Voto", value: "status" },
        { text: "Cantidad", value: "quantity" },
        { text: "Porcentaje", value: "percentage" },
      ],
      detailsData: [
        { status: "Confirmados", quantity: 500, percentage: "10%" },
        { status: "Pendientes", quantity: 4500, percentage: "90%" },
      ],
      peopleWithAvals: [],
      selectedPersonName: null, // Nueva variable para almacenar el nombre de la persona seleccionada
      avalesCargados: {},
    };
  },
  mounted() {
    this.getAvalsData();
    this.getAvalesCargadosData();
  },
  methods: {
    getAvalesCargadosData() {
      firebase
        .database()
        .ref("avalesCargados")
        .once("value")
        .then((snapshot) => {
          const data = snapshot.val();
          this.avalesCargados = data;
        })
        .catch((error) => {
          console.error("Error fetching avales cargados data:", error);
        });
    },

    getAvalesConfirmados(persona) {
        console.log(this.avalesCargados);
      if (this.avalesCargados && persona) {
        const personaKey = Object.keys(this.avalesCargados).find(
          (key) => this.avalesCargados[key].name === persona.name
        );
        if (personaKey) {
          return this.avalesCargados[personaKey].avales.length;
        }
      }
      return 0;
    },

    getAvalsData() {
      firebase
        .database()
        .ref("avales")
        .once("value")
        .then((snapshot) => {
          const data = snapshot.val();
          this.peopleWithAvals = Object.values(data);
        })
        .catch((error) => {
          console.error("Error fetching avales data:", error);
        });
    },
   
  },
  computed: {
      selectedPerson() {
        // Buscar la persona seleccionada en base al nombre
        return this.peopleWithAvals.find((person) => person.name === this.selectedPersonName);
      },
    },
};
</script>
  
  <style>
.statistics {
  display: flex;
  justify-content: space-around;
}

.statistic {
  text-align: center;
}

.label {
  font-size: 14px;
  color: #757575;
}

.value {
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
}

.chart-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.details {
  padding: 20px;
}

.select-person {
  padding: 20px;
}

.person-details {
  padding: 20px;
}
</style>
  