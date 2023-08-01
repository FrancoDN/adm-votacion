<template>
  <div class="botonera">

    <div class="botones">
      <v-btn
        width="20vw"
        height="3rem"
        color="#1BAED0"
        style="background-color: #222324; border-radius: 20rem;"
        :class="{ 'active-button': esActivo('presidencia') }"
        @click="cambiarVoto('presidencia')"
        ><p style="margin: 0; color: white; font-weight: 600; font-family: Open Sans; font-size: 1.2vw;">
          Presidencia
        </p></v-btn
      >
      <v-btn
        width="20vw"
        height="3rem"
        color="#1BAED0"
        :class="{ 'active-button': esActivo('gobernacion') }"
        @click="cambiarVoto('gobernacion')"
        style="margin-left: 3rem; margin-right: 3rem; background-color: #222324; border-radius: 20rem;"
        ><p style="margin: 0; color: white; font-weight: 600; font-family: Open Sans; font-size: 1.2vw;">
          Gobernacion
        </p></v-btn
      >
      <v-btn
        width="20vw"
        height="3rem"
        color="#1BAED0"
        style="background-color: #222324; border-radius: 20rem;"
        :class="{ 'active-button': esActivo('intendencia') }"
        @click="cambiarVoto('intendencia')"
        ><p style="color: white; font-weight: 600; font-family: Open Sans; margin: 0; font-size: 1.2vw;'">
          Intendencia
        </p></v-btn
      >
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
  methods: {
    cambiarVoto(tipo) {
      this.$emit("cambiar-voto", tipo);
    },
    esActivo(tipo) {
      return this.tipoVoto === tipo;
    },
  },
};
</script>

<style>
p {
  font-family: Nunito;
  margin: 0;
}
.botonera {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.botones {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.active-button {
  background-color: #1BAED0 !important;
}
</style>