<template>
  <div v-if="mostrarModal" class="modal-container">
    <div class="modal-content">
      <h2 class="modal-title">Cargar Aval</h2>
      <label class="modal-label">Número de Mesa:</label>
      <input v-model="numeroMesa" type="number" placeholder="Ingrese el número de mesa" class="modal-input" />
      <button @click="seleccionarNumeroMesa" class="modal-button">Cargar Aval</button>
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
      numeroMesa: '',
    };
  },
  methods: {
    seleccionarNumeroMesa() {
      if (this.numeroMesa !== '') {
        this.$emit("numero-mesa-seleccionado", parseInt(this.numeroMesa));
        this.numeroMesa = '';
      }
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
  width: 300px;
  text-align: center;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.modal-label {
  font-size: 1rem;
  margin-bottom: 5px;
  display: block;
  text-align: left;
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
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.modal-button:hover {
  background-color: #0056b3;
}

.modal-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #999;
}

.modal-close-button:hover {
  color: #333;
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
