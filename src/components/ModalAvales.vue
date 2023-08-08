<template>
  <div v-if="mostrarModal && modal" class="modal-container">

    <div class="modal-content">
      <v-btn @click="cerrarModal"> Cerrar</v-btn>

      <h2 class="modal-title">Avales con el mismo número de orden</h2>
      <ul class="modal-list">
        <li v-for="(aval, index) in duplicateAvales" :key="index" class="modal-item">
          {{ aval.nombre }}
          <!-- Mostrar más detalles relevantes del aval aquí -->
          <button @click="seleccionarAval(aval)" class="modal-button">Seleccionar</button>
        </li>
      </ul>
    </div>
    <div class="modal-overlay">

    </div>
  </div>
</template>

<script>
export default {
  props: {
    duplicateAvales: Array, // Lista de avales con el mismo número de orden
    mostrarModal: Boolean, // Indica si el modal debe mostrarse o no
  },
  data() {
    return {
      modal: true,
    }
  },
  methods: {
    seleccionarAval(avalSeleccionado) {
      this.$emit("aval-seleccionado", avalSeleccionado);
    },
    cerrarModal() {
      this.modal = false;
      console.log(this.duplicateAvales);
    },
  },
};
</script>

<style scoped>
/* Agrega tus estilos específicos para el modal aquí */

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  position: relative;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.modal-list {
  list-style: none;
  padding: 0;
}

.modal-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
</style>
