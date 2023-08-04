<template>
  <div style="width: 100%; height: 90%; ">
    <div class="centro">
      <p style="font-size: 2.7vw; font-family: Open Sans; margin-bottom: -1.3vw;">TOTAL</p>
      <p style="font-size: 2.7vw; font-family: Russo One; color: #1BAED0; margin-bottom: -1vw;">{{ sumaVotos |
        formatThousands }}</p>
      <p style="font-size: 1.2vw; font-family: Open Sans;">VOTOS</p>
    </div>
    <div class="chart-container" v-if="chartDataState">
      <Doughnut ref="doughnut" :data="chartData" :options="chartOptions" />
    </div>
    <div class="d-flex flex-column" style="width: 100%; height: 100%;">
      <!-- Primera fila -->
      <div class="results-container" style="width: 100%">
        <div v-for="(resultado, index) in primerosResultados" :key="index" class="result-item" :style="{
          backgroundColor: resultado.color,
          width: '50%',
          justifyContent: 'center',
        }">
          <div v-if="!showVotesOnRight(index)" class="datosIzquierda">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="" style="display: flex; flex-direction: column; width: 17vw; ">
              <p v-if="showVotesOnRight(index)" class="nombreCandidato" v-html="splitName(resultado.politico)"></p>
              <p v-if="!showVotesOnRight(index)" class="nombreCandidatoIzquierda" v-html="splitName(resultado.politico)">
              </p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico" style="text-align: end;">{{ resultado.partido }}</p>
            </div>
            <div class="d-flex flex-column ml-10">
              <p class="votosPorcentaje1F">{{ ((resultado.votos * 100 / padron).toFixed(2)) | formatThousands }}%</p>
              <p class="votosPartido1F">{{ (resultado.votos) | formatThousands }} VOTOS</p>
            </div>
          </div>

          <div v-if="showVotesOnRight(index)" class="datosDerecha">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="d-flex flex-column mr-10">
              <p class="votosPorcentaje1F">{{ ((resultado.votos * 100 / padron).toFixed(2)) | formatThousands }}%</p>
              <p class="votosPartido1F">{{ (resultado.votos) | formatThousands }} VOTOS</p>
            </div>
            <div class="" style="display: flex; flex-direction: column; width: 17vw; ">
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
            <div class="" style="display: flex; flex-direction: column; width: 17vw;">
              <p v-if="!showVotesOnRight(index)" class="nombreCandidatoIzquierda" v-html="splitName(resultado.politico)">
              </p>
              <p v-if="showVotesOnRight(index)" class="nombreCandidato" v-html="splitName(resultado.politico)"></p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico" style="text-align: end;">{{ resultado.partido }}</p>
            </div>
            <div class="d-flex flex-column ml-10">
              <p class="votosPorcentaje2F">{{ ((resultado.votos * 100 / padron).toFixed(2)) | formatThousands }}%</p>
              <p class="votosPartido2F">{{ (resultado.votos) | formatThousands }} VOTOS</p>
            </div>
          </div>

          <div v-if="showVotesOnRight(index)" class="datosDerecha">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="d-flex flex-column mr-10">
              <p class="votosPorcentaje2F">{{ ((resultado.votos * 100 / padron).toFixed(2)) | formatThousands }}%</p>
              <p class="votosPartido2F">{{ (resultado.votos) | formatThousands }} VOTOS</p>
            </div>
            <div class="" style="display: flex; flex-direction: column; width: 17vw; ">
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
            <div class="" style="display: flex; flex-direction: column; width: 17vw;">
              <p v-if="!showVotesOnRight(index)" class="nombreCandidatoIzquierda" v-html="splitName(resultado.politico)">
              </p>
              <p v-if="showVotesOnRight(index)" class="nombreCandidato" v-html="splitName(resultado.politico)"></p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico" style="text-align: end;">{{ resultado.partido }}</p>
            </div>
            <div class="d-flex flex-column ml-10">
              <p class="votosPorcentaje3F">{{ ((resultado.votos * 100 / padron).toFixed(2)) | formatThousands }}%</p>
              <p class="votosPartido3F">{{ (resultado.votos) | formatThousands }} VOTOS</p>
            </div>
          </div>

          <div v-if="showVotesOnRight(index)" class="datosDerecha">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="d-flex flex-column mr-10">
              <p class="votosPorcentaje3F">{{ ((resultado.votos * 100 / padron).toFixed(2)) | formatThousands }}%</p>
              <p class="votosPartido3F">{{ (resultado.votos) | formatThousands }} VOTOS</p>
            </div>
            <div class="" style="display: flex; flex-direction: column; width: 17vw; ">
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

          <div v-if="!showVotesOnRight(index) && index !== 2" class="ultimaFila"
            style="justify-content: start !important; ">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="d-flex flex-column mr-10" v-if="index === 2">
              <p class="votosPorcentaje4F">{{ ((resultado.votos * 100 / padron).toFixed(2)) | formatThousands }}%</p>
              <p class="votosPartido4F">{{ (resultado.votos) | formatThousands }} VOTOS</p>
            </div>

            <div class="" style="display: flex; flex-direction: column; width: 17vw;">
              <p class="nombreCandidato" v-html="splitName(resultado.politico)" style="text-align: end;"></p>
              <v-divider style="background-color: white;"></v-divider>

              <p class="partidoPolitico" style="text-align: end;">{{ resultado.partido }}</p>
            </div>
            <div class="d-flex flex-column ml-10" v-if="index === 0">
              <p class="votosPorcentaje4F">{{ ((resultado.votos * 100 / padron).toFixed(2)) | formatThousands }}%</p>
              <p class="votosPartido4F">{{ (resultado.votos) | formatThousands }} VOTOS</p>
            </div>
          </div>

          <div v-if="!showVotesOnRight(index) && index !== 0" class="ultimaFila" style="justify-content: end !important;">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="d-flex flex-column mr-10" v-if="index === 2">
              <p class="votosPorcentaje4F">{{ ((resultado.votos * 100 / padron).toFixed(2)) | formatThousands }}%</p>
              <p class="votosPartido4F">{{ (resultado.votos) | formatThousands }} VOTOS</p>
            </div>

            <div class="" style="display: flex; flex-direction: column; width: 17vw;">
              <p class="nombreCandidato" v-html="splitName(resultado.politico)" style="text-align: start;"></p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
            <div class="d-flex flex-column ml-10" v-if="index === 0">
              <p class="votosPorcentaje4F">{{ ((resultado.votos * 100 / padron).toFixed(2)) | formatThousands }}%</p>
              <p class="votosPartido4F">{{ (resultado.votos) | formatThousands }} VOTOS</p>
            </div>
          </div>

          <div v-if="showVotesOnRight(index)" class="ultimaFila">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="" style="display: flex; flex-direction: column; width: 17vw; ">
              <p class="nombreCandidato" v-html="splitName(resultado.politico)"></p>
              <v-divider style="background-color: white;"></v-divider>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>


            <div class="d-flex flex-column ml-10">
              <p class="votosPorcentaje4F">{{ ((resultado.votos * 100 / padron).toFixed(2)) | formatThousands }}%</p>
              <p class="votosPartido4F">{{ (resultado.votos) | formatThousands }} VOTOS</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'chart.js/auto';
import { Doughnut } from "vue-chartjs";
import firebase from "firebase/app";
import "firebase/database";
export default {
  components: {
    Doughnut,
  },
  props: {
    tipoVoto: {
      type: String,
      required: true,
    },
  },
  filters: {
    formatThousands(value) {
      if (!value) return '';
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  },
  data() {
    return {
      sumaVotos: 0,
      chartDataState: true,
      chartData: {
        labels: ["Confirmados", "Pendientes"],
        datasets: [
          {
            label: "Votos",
            backgroundColor: [],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: false,
        },
        maintainAspectRatio: false,
      },
      resultados: [],
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
      return this.ordenarResultados().slice(0, 2);
    },
    segundosResultados() {
      return this.ordenarResultados().slice(2, 4);
    },
    tercerosResultados() {
      return this.ordenarResultados().slice(4, 6);
    },
    cuartosResultados() {
      return this.ordenarResultados().slice(6);
    },
  },
  mounted() {
    // Recuperar los datos desde Firebase y asignarlos a "resultados"
    const db = firebase.database();
    const ref = db.ref("partidos");

    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.sumaVotos = 0;
        // Convertir el objeto obtenido de Firebase en un arreglo de candidatos
        const candidatos = Object.keys(data).map((key) => {
          const candidato = data[key].candidato;
          const color = data[key].color;
          const partido = data[key].nombre;
          const votos = data[key].votos;

          this.sumaVotos = this.sumaVotos + votos;
          return { partido, politico: candidato, color, votos: votos };
        });

        // Ordenar el arreglo de candidatos por votos (puedes omitir esto si ya los tienes ordenados en Firebase)
        candidatos.sort((a, b) => b.votos - a.votos);
        // Guardar los 9 candidatos con mayor cantidad de votos en "resultados"
        this.resultados = candidatos.slice(0, 9);
        // Calcular la suma de votos del resto de candidatos y agregar un objeto "Otros" en "chartData"
        const otrosVotos = candidatos.slice(9).reduce((total, candidato) => total + candidato.votos, 0);
        this.chartData = {
          labels: this.resultados.map((r) => r.partido).concat(["Otros"]),
          datasets: [
            {
              label: "Votos",
              backgroundColor: this.resultados.map((r) => r.color).concat("#CCCCCC"),
              data: this.resultados.map((r) => r.votos).concat(otrosVotos),
            },
          ],
        };
        // Actualizar el valor de "sumaVotos" después de recorrer los datos para obtener el total
        this.sumaVotos = this.resultados.reduce((total, candidato) => total + candidato.votos, 0);
      }
    });
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
      return this.resultados.slice().sort((a, b) => b.votos - a.votos);
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

.centro {
  display: flex;
  flex-direction: column;
  width: 17vw;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: white;
  border-radius: 100vw;
  width: 15vw;
  height: 15vw;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Establece un ancho máximo para el gráfico */
.chart-container {
  position: absolute;
  width: 100%;
  height: 28vw;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  font-size: 2vw;
  font-style: normal;
  font-weight: 800;
  color: white;
  white-space: pre-line;
  font-family: Open Sans;
}

.nombreCandidatoIzquierda {
  font-size: 2vw;
  font-style: normal;
  font-weight: 800;
  color: white;
  white-space: pre-line;
  font-family: Open Sans;
  text-align: right;
}

.votosPorcentaje1F {
  font-size: 3.3vw;
  font-style: normal;
  font-weight: 400;
  margin-bottom: -0.8vw !important;
  color: white;
  font-family: Russo One;
}

.votosPorcentaje2F {
  font-size: 2.7vw;
  font-style: normal;
  font-weight: 400;
  margin-bottom: -0.8vw !important;
  color: white;
  font-family: Russo One;
}

.votosPorcentaje3F {
  font-size: 2.5vw;
  font-style: normal;
  font-weight: 400;
  margin-bottom: -0.8vw !important;
  color: white;
  font-family: Russo One;
}

.votosPorcentaje4F {
  font-size: 2.3vw;
  font-style: normal;
  margin-bottom: -0.8vw !important;
  font-weight: 400;
  color: white;
  font-family: Russo One;
}

.votosPartido1F {
  font-size: 1.5vw;
  font-style: normal;
  font-weight: 700;
  color: white;
}

.votosPartido2F,
.votosPartido3F,
.votosPartido4F {
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 700;
  color: white;
}


.partidoPolitico {
  font-size: 1.5vw;
  font-style: normal;
  font-weight: 700;
  color: white;
}

.suma {
  display: flex;
  flex-direction: row;
}

.results-container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}

.result-item {
  display: flex;
  flex: 1 1 33%;
  padding: 0.8vw;
  box-sizing: border-box;
}
</style>