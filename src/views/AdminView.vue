<template>
  <div>
    <p style="font-weight: 800; font-size: 3.75rem; text-align: center; margin: 0;">
      Estadísticas en tiempo real
    </p>
    <admin-botonera
      :tipoVoto="tipoVoto"
      @cambiar-voto="cambiarVoto"
    ></admin-botonera>
    <div class="admin">
      <!-- <admin-estadistica
        :tipoVoto="tipoVoto"
        class="d-flex flex-column mt-7"
      ></admin-estadistica> -->
      <admin-conteo
        :tipoVoto="tipoVoto"
      ></admin-conteo>
    </div>
  </div>
</template>

<script>
import AdminConteo from "@/components/AdminConteo.vue";
// import AdminEstadistica from "@/components/AdminEstadistica.vue";
import AdminBotonera from "@/components/AdminBotonera.vue";
export default {
  components: {
    AdminConteo,
    // AdminEstadistica,
    AdminBotonera,
  },
  data() {
    return {
      tipoVoto: "intendencia",
    };
  },
  methods: {
    cambiarVoto(tipo) {
      this.tipoVoto = tipo; // Actualizamos el tipo de voto en el componente padre
    },
  },
};
</script>

<style>
p {
  font-family: Nunito;
  margin: 0;
}

.admin {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
}
</style>