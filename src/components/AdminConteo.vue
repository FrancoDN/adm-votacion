<template>
  <v-card elevation="2" outlined rounded="xxl" width="35%">
    <v-card-text class="d-flex flex-row justify-space-around">
      <div class="d-flex flex-column mt-7">
        <p
          style="
            font-size: 2.5rem;
            color: black;
            font-family: Nunito;
            font-weight: 400;
          "
        >
          <b>TOTAL</b>
        </p>
        <p class="votos mt-2">{{ total }}</p>
      </div>
      <div class="d-flex flex-column mt-7">
        <p
          style="
            font-size: 2.5rem;
            color: black;
            font-family: Nunito;
            font-weight: 400;
          "
        >
          <b>En blanco</b>
        </p>
        <p class="votos mt-2">{{ enBlanco }}</p>
      </div>
    </v-card-text>
    <v-divider color="black" class="ml-16 mr-16 mb-3"></v-divider>
    <div class="d-flex">
      <v-card-text class="d-flex flex-row justify-space-around">
        <div class="d-flex flex-column ">
          <p class="nombres" style="color: #006da7">Vane Va</p>
          <p class="nombres" style="margin-top: 4.5rem; font-weight: 400">
            UxP
          </p>
          <p class="nombres" style="margin-top: 4.5rem; font-weight: 400">
            Juntos
          </p>
          <p class="nombres" style="margin-top: 4.5rem; font-weight: 400">
            FDI
          </p>
        </div>
        <div class="d-flex flex-column justify-space-around">
          <div>
            <p class="votos" style="color: #006da7">{{ porcentajeVaneVa }}%</p>
            <p class="votos" style="color: #006da7">{{ votosVaneVa }} votos</p>
          </div>
          <div style="margin-top: 2rem">
            <p class="votos" style="color: #00a4e6">{{ porcentajeUxP }}%</p>
            <p class="votos" style="color: #00a4e6">{{ votosUxP }} votos</p>
          </div>
          <div style="margin-top: 2rem">
            <p class="votos" style="color: #e1b530">{{ porcentajeJuntos }}%</p>
            <p class="votos" style="color: #e1b530">{{ votosJuntos }} votos</p>
          </div>
          <div style="margin-top: 2rem">
            <p class="votos" style="color: #ae0c0c">{{ porcentajeFDI }}%</p>
            <p class="votos" style="color: #ae0c0c">{{ votosFDI }} votos</p>
          </div>
        </div>
      </v-card-text>
    </div>
  </v-card>
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
      votosVaneVa: 0,
      votosJuntos: 0,
      votosFDI: 0,
      votosUxP: 0,
      porcentajeVaneVa: 0,
      porcentajeJuntos: 0,
      porcentajeFDI: 0,
      porcentajeUxP: 0,
      total: 0,
      enBlanco: 0,
    };
  },
  watch: {
    tipoVoto(newTipoVoto) {
      this.actualizarConteo(newTipoVoto);
    },
  },
  mounted() {
    // Llamar al método para inicializar el conteo con los datos de Intendencia al cargar la página.
    this.actualizarConteo("intendencia");
  },
  methods: {
    actualizarConteo(tipoVoto) {
      const datosPorTipoDeVoto = {
        presidencia: [30, 40, 20, 10],
        gobernacion: [10, 20, 60, 10],
        intendencia: [70, 30, 10, 2],
      };

      const datosVotos = datosPorTipoDeVoto[tipoVoto];
      this.votosVaneVa = datosVotos[0];
      this.votosUxP = datosVotos[1];
      this.votosJuntos = datosVotos[2];
      this.votosFDI = datosVotos[3];

      this.porcentajeVaneVa = this.votosVaneVa / 100;
      this.porcentajeJuntos = this.votosJuntos / 100;
      this.porcentajeFDI = this.votosFDI / 100;
      this.porcentajeUxP = this.votosUxP / 100;
      // Actualizar el total y votos en blanco en función de los nuevos datos.
      // this.total = this.votosVaneVa + this.votosJuntos + this.votosFDI + this.votosUxP;
      this.total = 10000;
      this.enBlanco = 1111; // Puedes ajustar este valor según tus necesidades.
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&display=swap");

p {
  font-family: "Nunito", sans-serif;
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