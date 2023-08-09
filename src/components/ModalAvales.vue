<template>
  <div v-if="mostrarModal && modal" class="modal-container">
    <div class="modal-content">
      <v-btn @click="cerrarModal">Cerrar</v-btn>
      <h2 class="modal-title">Ingresar Número de Mesa</h2>
      <input v-model="numeroMesa" type="text" placeholder="Ingrese el número de mesa" class="modal-input" />
      <button @click="seleccionarNumeroMesa" class="modal-button">Cargar</button>
    </div>
    <div class="modal-overlay"></div>
  </div>
</template>

<script>
export default {
  props: {
    mostrarModal: Boolean, // Indica si el modal debe mostrarse o no
  },
  data() {
    return {
      modal: true,
      numeroMesa: '',
    }
  },
  methods: {
    seleccionarNumeroMesa() {
      this.$emit("numero-mesa-seleccionado", this.numeroMesa);
    },
    cerrarModal() {
      this.modal = false;
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

.modal-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
