<template>
  <div style="height: 100%; background-color: black;">
    <!-- <admin-botonera
      :tipoVoto="tipoVoto"
      @cambiar-voto="cambiarVoto"
      style="height: 10%;"
    ></admin-botonera> -->
    
      <admin-conteo
      ></admin-conteo>
  </div>
</template>

<script>
import AdminConteo from "@/components/AdminConteo.vue";
// import AdminBotonera from "@/components/AdminBotonera.vue";
export default {
  components: {
    AdminConteo,
    // AdminEstadistica,
    // AdminBotonera,
  },
  data() {
    return {
      // tipoVoto: "intendencia",
    };
  },
  methods: {
    // cambiarVoto(tipo) {
    //   this.tipoVoto = tipo; // Actualizamos el tipo de voto en el componente padre
    // },
  },
};
</script>

<style>
p {
  font-family: Nunito;
  margin: 0;
}
body {
  overflow: hidden;

}
</style>