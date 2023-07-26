<template>
  <div class="botonera">

    <div class="botones">
      <v-btn
        width="20rem"
        height="3rem"
        color="#1BAED0"
        :class="{ 'active-button': esActivo('presidencia') }"
        @click="cambiarVoto('presidencia')"
        ><p style="margin: 0; color: white; font-weight: 600">
          Presidencia
        </p></v-btn
      >
      <v-btn
        width="20rem"
        height="3rem"
        color="#1BAED0"
        :class="{ 'active-button': esActivo('gobernacion') }"
        @click="cambiarVoto('gobernacion')"
        style="margin-left: 3rem; margin-right: 3rem"
        ><p style="margin: 0; color: white; font-weight: 600">
          Gobernacion
        </p></v-btn
      >
      <v-btn
        width="20rem"
        height="3rem"
        color="#1BAED0"
        :class="{ 'active-button': esActivo('intendencia') }"
        @click="cambiarVoto('intendencia')"
        ><p style="color: white; font-weight: 600; margin: 0">
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
  background-color: #e1b530 !important;
}
</style>