<template>
  <div style="width: 100%">
    <div class="d-flex flex-column justify-center align-center" style="width: 100%">
      <!-- Primera fila -->
      <div class="d-flex flex-row" style="width: 100%">
        <div v-for="(resultado, index) in primerosResultados" :key="index" class="d-flex flex-row" :style="{
          backgroundColor: resultado.color,
          width: '50%',
          justifyContent: 'center',
        }">
          <div v-if="!showVotesOnRight(index)" class="datosIzquierda">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="" style="display: flex; flex-direction: column;">
              <p class="nombreCandidato">{{ resultado.politico }}</p>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
            <p v-if="!showVotesOnRight(index)" class="votosPartido">{{ resultado.votos }} votos</p>
          </div>

          <div v-if="showVotesOnRight(index)" class="datosDerecha">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <p class="votosPartido">{{ resultado.votos }} votos</p>
            <div class="" style="display: flex; flex-direction: column; ">
              <p class="nombreCandidato">{{ resultado.politico }}</p>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Segunda fila -->
      <div class="d-flex flex-row" style="width: 100%">
        <div v-for="(resultado, index) in segundosResultados" :key="index" class="d-flex flex-row" :style="{
          backgroundColor: resultado.color,
          width: '50%',
          justifyContent: 'center',
        }">
          <div v-if="!showVotesOnRight(index)" class="datosIzquierda">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="" style="display: flex; flex-direction: column;">
              <p class="nombreCandidato">{{ resultado.politico }}</p>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
            <p v-if="!showVotesOnRight(index)" class="votosPartido">{{ resultado.votos }} votos</p>
          </div>

          <div v-if="showVotesOnRight(index)" class="datosDerecha">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <p class="votosPartido">{{ resultado.votos }} votos</p>
            <div class="" style="display: flex; flex-direction: column; ">
              <p class="nombreCandidato">{{ resultado.politico }}</p>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tercera fila -->
      <div class="d-flex flex-row" style="width: 100%">
        <div v-for="(resultado, index) in tercerosResultados" :key="index" class="d-flex flex-row" :style="{
          backgroundColor: resultado.color,
          width: '50%',
          justifyContent: 'center',
        }">
          <div v-if="!showVotesOnRight(index)" class="datosIzquierda">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="" style="display: flex; flex-direction: column;">
              <p class="nombreCandidato">{{ resultado.politico }}</p>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
            <p v-if="!showVotesOnRight(index)" class="votosPartido">{{ resultado.votos }} votos</p>
          </div>

          <div v-if="showVotesOnRight(index)" class="datosDerecha">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <p class="votosPartido">{{ resultado.votos }} votos</p>
            <div class="" style="display: flex; flex-direction: column; ">
              <p class="nombreCandidato">{{ resultado.politico }}</p>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Cuarta fila -->
      <div class="d-flex flex-row" style="width: 100%">
        <div v-for="(resultado, index) in cuartosResultados" :key="index" class="d-flex flex-row" :style="{
          backgroundColor: resultado.color,
          width: '33.33%',
          justifyContent: 'center',
        }">

          <div v-if="!showVotesOnRight(index)" class="datosIzquierda">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <p v-if="index === 2" class="votosPartido">{{ resultado.votos }} votos</p>

            <div class="" style="display: flex; flex-direction: column;">
              <p class="nombreCandidato">{{ resultado.politico }}</p>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
            <p v-if="index === 0" class="votosPartido">{{ resultado.votos }} votos</p>

          </div>

          <div v-if="showVotesOnRight(index)" class="datosDerecha">
            <!-- Mostrar votos a la derecha del nombre del político -->
            <div class="" style="display: flex; flex-direction: column; ">
              <p class="nombreCandidato">{{ resultado.politico }}</p>
              <p class="partidoPolitico">{{ resultado.partido }}</p>
            </div>
            <p class="votosPartido">{{ resultado.votos }} votos</p>

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
          votos: 800,
          color: "#0E537A",
        },
        {
          partido: "Juntos por el cambio",
          politico: "Pablo SWAR",
          votos: 600,
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
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&display=swap");

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
  justify-content: space-between;
  align-items: center;
}

.datosIzquierda {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.nombreCandidato {
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  color: white;
}

.votosPartido {
  font-size: 1.875rem;
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
</style>