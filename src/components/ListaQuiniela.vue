<template>
  <div class="card-quiniela">
    <div class="select-person">
      <p class="quiniela mr-7">Quiniela</p>
      <v-select
        v-model="selectedPersonName"
        :items="peopleWithAvals.map((person) => person.name)"
        label="Seleccione una persona con avales"
        solo
        hide-details
        :menu-props="{ top: true, offsetY: true }"
      ></v-select>
    </div>

    <div class="person-details" v-if="selectedPerson">
      <div class="nombre-avales">
        <p id="nombre" class="d-flex flex-row justify-end">Nombre:</p>
        <p id="nombre">Avales confirmados:</p>
      </div>
      <div class="datos-avales ml-7">
        <p id="nombre">{{ selectedPerson.name }}</p>
        <p id="nombre">
          {{ getAvalesConfirmados(selectedPerson) }} de
          {{ selectedPerson.avales.length }}
        </p>
      </div>
      <div class="progress-bar">
        <v-progress-linear
          color="#1BAED0"
          height="30"
          rounded
          background-color="#DEE2E5"
          :value="
            (getAvalesConfirmados(selectedPerson) * 100) /
            selectedPerson.avales.length
          "
        ></v-progress-linear>
        <p class="percent">
          {{
            ((getAvalesConfirmados(selectedPerson) * 100) /
            selectedPerson.avales.length).toFixed(2)
          }}%
        </p>
      </div>
    </div>
    <pdf-quiniela
      :selectedPersonName="selectedPersonName"
      :avales="avalesCargados"
      :numeroDeAvales="numeroDeAvales"
    />

  </div>
</template>

<script>
import PdfQuiniela from "@/components/PdfQuiniela";

export default {
  components: {
    PdfQuiniela,
  },
  props: {
    numeroDeAvales: {
      type: Array,
      required: true,
    },
    avalesCargados: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      peopleWithAvals: [],
      selectedPersonName: null,
    };
  },
mounted() {
    this.agruparAvalesCargados(this.avalesCargados);
  },
  methods: {
    getSelectedPersonId(selectedPersonName) {
      // Busca en el arreglo "numeroDeAvales" la persona con el nombre seleccionado
      // y devuelve el ID (o un identificador único) de esa persona
      const selectedPerson = this.numeroDeAvales.find(
        (person) => person.name === selectedPersonName
      );
      return selectedPerson ? selectedPerson.id : null;
    },

    agruparAvalesCargados(data) {
      const personasAval = {};

      // Agrupo los avales por el campo "nombreApoderado"
      Object.values(data).forEach((aval) => {
        console.log(aval);
        const nombreApoderado = aval.nombreApoderado;
        if (nombreApoderado && !personasAval[nombreApoderado]) {
          personasAval[nombreApoderado] = [aval];
        } else if (nombreApoderado && personasAval[nombreApoderado]) {
          personasAval[nombreApoderado].push(aval);
        }
      });

      // Creo una lista de objetos con las personas y sus avales
      this.peopleWithAvals = Object.keys(personasAval).map((nombreApoderado) => ({
        name: nombreApoderado,
        avales: personasAval[nombreApoderado],
      }));
    },

    getAvalesConfirmados(persona) {
      // Si la persona tiene avales...
      if (persona && persona.avales) {
        // ...obtenemos el número total de avales que tiene la persona seleccionada
        const avalesConfirmados =
          this.peopleWithAvals.find((p) => p.name === persona.name)?.avales
            ?.length || 0;

        // Y lo devolvemos
        return avalesConfirmados;
      }
      // Si no tiene avales, devolvemos 0
      return 0;
    },
  },

  computed: {
    selectedPerson() {
      // Buscar la persona seleccionada en base al nombre
      return this.numeroDeAvales.find(
        (person) => person.name === this.selectedPersonName
      );
    },
  },
};
</script>

<style>
.select-person {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.percent {
  color: #0197ba;
  font-size: 2rem;
  font-weight: 600;
  margin-left: 2rem;
}

.progress-bar {
  width: 30rem;
  margin-left: 2rem;
  padding-bottom: 0.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

#nombre {
  font-family: Nunito;
  font-size: 2.2rem;
  font-weight: 700;
  color: #000000;
  margin: 0;
}

.person-details {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: 2.5rem;
}

.nombre-avales {
  margin-right: 1rem;
}

.quiniela {
  font-family: Nunito;
  font-size: 2.5rem;
  font-weight: 700;
}
.v-application p {
  margin-bottom: 0px;
}
.v-input__slot {
  width: 25rem;
}

.v-main__wrap {
  background-color: #f3f3f3;
}

.card-quiniela {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1.5rem;
  background-color: #f3f3f3;
}
</style>
