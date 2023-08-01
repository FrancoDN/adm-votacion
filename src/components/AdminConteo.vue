<template>
  <div style="width: 100%">
    <div class="d-flex flex-column justify-center align-center" style="width: 100%">
      <!-- Primera fila -->
      <div class="results-container" style="width: 100%">
        <div v-for="(resultado, index) in primerosResultados" :key="index" class="result-item" :style="{
          backgroundColor: resultado.color,
          width: '50%',
          justifyContent: 'center',
        }">
          <div v-if="!showVotesOnRight(index)" class="datosIzquierda" style="margin-left: 1.5rem;">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="" style="display: flex; flex-direction: column;">
              <p v-if="showVotesOnRight(index)" class="nombreCandidato" v-html="splitName(resultado.politico)"></p>
              <p v-if="!showVotesOnRight(index)" class="nombreCandidatoIzquierda" v-html="splitName(resultado.politico)">
              </p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
            <div class="d-flex flex-column ml-10">
              <p class="votosPorcentaje1F">{{ (resultado.votos * 100 / padron).toFixed(2) }}%</p>
              <p class="votosPartido1F">{{ resultado.votos }} VOTOS</p>
            </div>
          </div>

          <div v-if="showVotesOnRight(index)" class="datosDerecha">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="d-flex flex-column mr-10">
              <p class="votosPorcentaje1F">{{ (resultado.votos * 100 / padron).toFixed(2) }}%</p>
              <p class="votosPartido1F">{{ resultado.votos }} VOTOS</p>
            </div>
            <div class="" style="display: flex; flex-direction: column; ">
              <p v-if="!showVotesOnRight(index)" class="nombreCandidatoIzquierda" v-html="splitName(resultado.politico)">
              </p>
              <p v-if="showVotesOnRight(index)" class="nombreCandidato" v-html="splitName(resultado.politico)"></p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Segunda fila -->
      <div class="results-container" style="width: 100%">
        <div v-for="(resultado, index) in segundosResultados" :key="index" class="result-item" :style="{
          backgroundColor: resultado.color,
          width: '50%',
          justifyContent: 'center',
        }">
          <div v-if="!showVotesOnRight(index)" class="datosIzquierda">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="" style="display: flex; flex-direction: column;">
              <p v-if="!showVotesOnRight(index)" class="nombreCandidatoIzquierda" v-html="splitName(resultado.politico)">
              </p>
              <p v-if="showVotesOnRight(index)" class="nombreCandidato" v-html="splitName(resultado.politico)"></p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
            <div class="d-flex flex-column ml-10">
              <p class="votosPorcentaje2F">{{ (resultado.votos * 100 / padron).toFixed(2) }}%</p>
              <p class="votosPartido2F">{{ resultado.votos }} VOTOS</p>
            </div>
          </div>

          <div v-if="showVotesOnRight(index)" class="datosDerecha">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="d-flex flex-column mr-10">
              <p class="votosPorcentaje2F">{{ (resultado.votos * 100 / padron).toFixed(2) }}%</p>
              <p class="votosPartido2F">{{ resultado.votos }} VOTOS</p>
            </div>
            <div class="" style="display: flex; flex-direction: column; ">
              <p v-if="!showVotesOnRight(index)" class="nombreCandidatoIzquierda" v-html="splitName(resultado.politico)">
              </p>
              <p v-if="showVotesOnRight(index)" class="nombreCandidato" v-html="splitName(resultado.politico)"></p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tercera fila -->
      <div class="results-container" style="width: 100%">
        <div v-for="(resultado, index) in tercerosResultados" :key="index" class="result-item" :style="{
          backgroundColor: resultado.color,
          width: '50%',
          justifyContent: 'center',
        }">
          <div v-if="!showVotesOnRight(index)" class="datosIzquierda">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="" style="display: flex; flex-direction: column;">
              <p v-if="!showVotesOnRight(index)" class="nombreCandidatoIzquierda" v-html="splitName(resultado.politico)">
              </p>
              <p v-if="showVotesOnRight(index)" class="nombreCandidato" v-html="splitName(resultado.politico)"></p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
            <div class="d-flex flex-column ml-10">
              <p class="votosPorcentaje3F">{{ (resultado.votos * 100 / padron).toFixed(2) }}%</p>
              <p class="votosPartido3F">{{ resultado.votos }} VOTOS</p>
            </div>
          </div>

          <div v-if="showVotesOnRight(index)" class="datosDerecha">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="d-flex flex-column mr-10">
              <p class="votosPorcentaje3F">{{ (resultado.votos * 100 / padron).toFixed(2) }}%</p>
              <p class="votosPartido3F">{{ resultado.votos }} VOTOS</p>
            </div>
            <div class="" style="display: flex; flex-direction: column; ">
              <p v-if="!showVotesOnRight(index)" class="nombreCandidatoIzquierda" v-html="splitName(resultado.politico)">
              </p>
              <p v-if="showVotesOnRight(index)" class="nombreCandidato" v-html="splitName(resultado.politico)"></p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Cuarta fila -->
      <div class="results-container" style="width: 100%">
        <div v-for="(resultado, index) in cuartosResultados" :key="index" class="result-item" :style="{
          backgroundColor: resultado.color,
          width: '33.33%',
          justifyContent: 'center',
        }">

          <div v-if="!showVotesOnRight(index) && index !== 2" class="ultimaFila" style="justify-content: start !important; ">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="d-flex flex-column mr-10" v-if="index === 2">
              <p class="votosPorcentaje4F">{{ (resultado.votos * 100 / padron).toFixed(2) }}%</p>
              <p class="votosPartido4F">{{ resultado.votos }} VOTOS</p>
            </div>

            <div class="" style="display: flex; flex-direction: column;">
              <p class="nombreCandidato" v-html="splitName(resultado.politico)" style="text-align: end;"></p>
              <v-divider style="background-color: white;"></v-divider>
              
              <p class="partidoPolitico" style="text-align: end;">{{ resultado.partido }}</p>
            </div>
            <div class="d-flex flex-column ml-10" v-if="index === 0">
              <p class="votosPorcentaje4F">{{ (resultado.votos * 100 / padron).toFixed(2) }}%</p>
              <p class="votosPartido4F">{{ resultado.votos }} VOTOS</p>
            </div>
          </div>

          <div v-if="!showVotesOnRight(index) && index !== 0" class="ultimaFila" style="justify-content: end !important;">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="d-flex flex-column mr-10" v-if="index === 2">
              <p class="votosPorcentaje4F">{{ (resultado.votos * 100 / padron).toFixed(2) }}%</p>
              <p class="votosPartido4F">{{ resultado.votos }} VOTOS</p>
            </div>

            <div class="" style="display: flex; flex-direction: column;">
              <p class="nombreCandidato" v-html="splitName(resultado.politico)" style="text-align: start;"></p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
            <div class="d-flex flex-column ml-10" v-if="index === 0">
              <p class="votosPorcentaje4F">{{ (resultado.votos * 100 / padron).toFixed(2) }}%</p>
              <p class="votosPartido4F">{{ resultado.votos }} VOTOS</p>
            </div>
          </div>

          <div v-if="showVotesOnRight(index)" class="ultimaFila">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="" style="display: flex; flex-direction: column; ">
              <p class="nombreCandidato" v-html="splitName(resultado.politico)"></p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>


            <div class="d-flex flex-column ml-10">
              <p class="votosPorcentaje4F">{{ (resultado.votos * 100 / padron).toFixed(2) }}%</p>
              <p class="votosPartido4F">{{ resultado.votos }} VOTOS</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tipoVoto: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      resultados: [
        {
          partido: "Todos por Buenos Aires",
          politico: "Vanesa QUEYFFER",
          votos: 20000,
          color: "#1BAED0",
        },
        {
          partido: "Union por la patria",
          politico: "Fabian CAGLIARDI",
          votos: 3000,
          color: "#0E537A",
        },
        {
          partido: "Juntos por el cambio",
          politico: "Pablo SWAR",
          votos: 900,
          color: "#E1B530",
        },
        {
          partido: "FIT",
          politico: "Federico SURILA",
          votos: 400,
          color: "#E15454",
        },
        {
          partido: "Juntos por el cambio",
          politico: "Matias NANNI",
          votos: 300,
          color: "#DD9F00",
        },
        {
          partido: "Nuevo MAS",
          politico: "Juana GAMARRA",
          votos: 200,
          color: "#981414",
        },
        {
          partido: "FIT",
          politico: "Patricia MESA",
          votos: 100,
          color: "#AF3838",
        },
        {
          partido: "La Libertad Avanza",
          politico: "Roxana GARAVENTO",
          votos: 50,
          color: "#5C0F77",
        },
        {
          partido: "Principios y Valores",
          politico: "Ariel LEGUIZA",
          votos: 10,
          color: "#0E537A",
        },
        // Agrega más objetos para los demás partidos
      ],
      padron: 43000,
    };
  },

  // watch: {
  //   tipoVoto(newTipoVoto) {
  //     this.actualizarConteo(newTipoVoto);
  //   },
  // },
  // mounted() {
  //   // Llamar al método para inicializar el conteo con los datos de Intendencia al cargar la página.
  //   this.actualizarConteo("intendencia");
  // },
  computed: {
    primerosResultados() {
      const ordenados = this.resultados
        .slice()
        .sort((a, b) => b.votos - a.votos);
      return ordenados.slice(0, 2);
    },
    segundosResultados() {
      const ordenados = this.resultados
        .slice()
        .sort((a, b) => b.votos - a.votos);
      return ordenados.slice(2, 4);
    },
    tercerosResultados() {
      const ordenados = this.resultados
        .slice()
        .sort((a, b) => b.votos - a.votos);
      return ordenados.slice(4, 6);
    },
    cuartosResultados() {
      const ordenados = this.resultados
        .slice()
        .sort((a, b) => b.votos - a.votos);
      return ordenados.slice(6);
    },
  },
  methods: {
    // actualizarConteo(tipoVoto) {
    //   const datosPorTipoDeVoto = {
    //     presidencia: [],
    //     gobernacion: [],
    //     intendencia: [],
    //   };

    //   const datosVotos = datosPorTipoDeVoto[tipoVoto];
    //   this.votosVaneVa = datosVotos[0];
    //   this.votosUxP = datosVotos[1];
    //   this.votosJuntos = datosVotos[2];
    //   this.votosFDI = datosVotos[3];

    //   this.porcentajeVaneVa = this.votosVaneVa / 100;
    //   this.porcentajeJuntos = this.votosJuntos / 100;
    //   this.porcentajeFDI = this.votosFDI / 100;
    //   this.porcentajeUxP = this.votosUxP / 100;
    //   // Actualizar el total y votos en blanco en función de los nuevos datos.
    //   // this.total = this.votosVaneVa + this.votosJuntos + this.votosFDI + this.votosUxP;
    //   this.total = 10000;
    //   this.enBlanco = 1111; // Puedes ajustar este valor según tus necesidades.
    // },
    ordenarResultados() {
      return this.resultados.sort((a, b) => b.votos - a.votos);
    },
    showVotesOnRight(index) {
      return index % 2 === 1; // Retorna true para índices impares (columna derecha) y false para índices pares (columna izquierda)
    },
    splitName(fullName) {
      // Dividir el nombre y el apellido por un salto de línea (<br>)
      const [nombre, apellido] = fullName.split(" ");
      return `${nombre}<br>${apellido}`;
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,300&family=Open+Sans:wght@800&family=Russo+One&display=swap');

p {
  font-family: "Nunito", sans-serif;
}

/* Este estilo aplicará el ancho deseado para las filas */
.d-flex.flex-row {
  width: 100%;
}

.datosDerecha {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: end;
}

.datosIzquierda {
  display: flex;
  width: 100%;
  align-items: center;
}

.ultimaFila {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

}

.nombreCandidato {
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 800;
  color: white;
  white-space: pre-line;
  font-family: Open Sans;
}

.nombreCandidatoIzquierda {
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 800;
  color: white;
  white-space: pre-line;
  font-family: Open Sans;
  text-align: right;
}

.votosPorcentaje1F {
  font-size: 3.8rem;
  font-style: normal;
  font-weight: 400;
  margin-bottom: -1.2rem !important;
  color: white;
  font-family: Russo One;
}

.votosPorcentaje2F {
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 400;
  margin-bottom: -1.2rem !important;
  color: white;
  font-family: Russo One;
}

.votosPorcentaje3F {
  font-size: 3rem;
  font-style: normal;
  font-weight: 400;
  margin-bottom: -1.2rem !important;
  color: white;
  font-family: Russo One;
}

.votosPorcentaje4F {
  font-size: 2.5rem;
  font-style: normal;
  margin-bottom: -1.2rem !important;
  font-weight: 400;
  color: white;
  font-family: Russo One;
}

.votosPartido1F {
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 700;
  color: white;
}

.votosPartido2F,
.votosPartido3F,
.votosPartido4F {
  font-size: 1.5625rem;
  font-style: normal;
  font-weight: 700;
  color: white;
}


.partidoPolitico {
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 700;
  color: white;
}

.suma {
  display: flex;
  flex-direction: row;
}

.votos {
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  color: #0c74ae;
}

.nombres {
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 700;
  color: black;
}

.results-container {
  display: flex;
  flex-wrap: wrap;
}

.result-item {
  flex: 1 1 33%;
  padding: 1rem;
  box-sizing: border-box;
}
</style>