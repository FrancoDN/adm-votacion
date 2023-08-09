<template>
  <div style="
      background-color: #0197ba;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    ">
    <img src="../assets/vane.png" alt="" style="width: 30rem" />
    <p class="card-title">Carga de votos</p>

    <div class="buttonDuo">
      <button :style="[buttonQ, buttonTransition]" @click="changeType(false)" class="d-flex justify-center ma-2">
        <p style="color: black; font-size: 1.2rem; font-weight: 600">
          Quiniela
        </p>
      </button>
      <button :style="[buttonT, buttonTransition]" @click="changeType(true)" class="d-flex justify-center ma-2">
        <p style="color: black; font-size: 1.2rem; font-weight: 600">
          Telegrema
        </p>
      </button>
    </div>
    <div style="display: flex; flex-direction: column; justify-content: center">
      <p style="
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          text-align: center;
          margin-top: 1.2rem;
        ">
        {{ inputText }}
      </p>
      <div class="pildora">
        <v-text-field ref="textField" @keyup.enter="handleEnterKeyPress" v-model="inputValue" type="number"
          hide-details="true" inputmode="numeric"></v-text-field>

        <button class="botonCarga" ref="subirTelegramaButton" @click="subirTelegrama()" v-if="uploadType">
          <p style="color: white; font-size: 1.2rem; font-weight: 600" class="d-flex ma-1 justify-center">
            Cargar
          </p>
        </button>

        <button class="botonCarga" ref="subirQuinielaButton" @click="subirQuiniela()" v-else>
          <p style="color: white; font-size: 1.2rem; font-weight: 600" class="d-flex ma-1 justify-center">
            Cargar
          </p>
        </button>
      </div>
    </div>

    <transition name="fade">
      <v-alert v-if="showAlert" border="left" prominent :type="alertType" class="mt-6">
        <template v-slot:default>
          <span v-html="alertMessage"></span>
        </template>
      </v-alert>
    </transition>
    <modal-aval :mostrarModal="mostrarModal" :duplicateAvales="avalesDuplicados"
      @numero-mesa-seleccionado="manejarMesa" />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import ModalAval from "./ModalAvales.vue";
export default {
  components: {
    ModalAval
  },
  data() {
    return {

      avalesDuplicados: [],
      mostrarModal: false,
      nombreApoderadoSeleccionado: "",
      buttonQ: {
        backgroundColor: "white",
        color: "white",
        width: "9rem",
        borderRadius: "10rem",
        fontSize: "1rem",
        fontWeight: "bold",
      },
      buttonT: {
        backgroundColor: "#E1B530",
        color: "white",
        width: "9rem",
        borderRadius: "10rem",
        fontSize: "1rem",
        fontWeight: "bold",
      },
      buttonTransition: {
        transition: "background-color 0.5s, color 0.5s",
      },
      alertType: "",
      showAlert: false,
      alertMessage: "",
      type: "Telegrama",
      booleanType: true,
      uploadType: true,
      inputText: "Ingrese el número de mesa",
      inputValue: "",
    };
  },

  methods: {
    changeType(boton) {
      if (this.booleanType !== boton) {
        this.type = "Quiniela";
        this.inputText = "Ingrese el número de orden";
        this.uploadType = false;
        this.buttonQ.backgroundColor = "#E1B530";
        this.buttonQ.color = "white";
        this.buttonT.backgroundColor = "white";
        this.buttonT.color = "black";
      } else {
        this.type = "Telegrama";
        this.inputText = "Ingrese el número de telegrama";
        this.uploadType = true;
        this.buttonQ.backgroundColor = "white";
        this.buttonQ.color = "black";
        this.buttonT.backgroundColor = "#E1B530";
        this.buttonT.color = "white";
      }
      this.$refs.textField.reset();
    },

    subirTelegrama() {
      const mesaNumero = parseInt(this.inputValue, 10);
      if (isNaN(mesaNumero)) {
        this.alertType = "warning";
        this.alertMessage = "Ingrese un número de mesa válido.";
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3500);
        return;
      }

      localStorage.setItem("mesaNumero", mesaNumero);
      if (localStorage.getItem("mesaNumero")) {
        this.alertType = "success";
        this.alertMessage = `Mesa <b>${mesaNumero}</b> cargada exitosamente`;
        this.showAlert = true;
        this.inputValue = ""; // Limpiar el campo de entrada después de cargar el aval
      }
      setTimeout(() => {
        this.showAlert = false;
        this.$router.push({ name: 'telegrama' });

      }, 3500);
    },

    async subirQuiniela() {
      const avalNumero = parseInt(this.inputValue, 10);
      if (isNaN(avalNumero)) {
        this.alertType = "warning";
        this.alertMessage = "Ingrese un número de orden válido.";
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3500);
        return;
      }

      //* Coroboramos si hay mas de un numero de orden igual en la base de datos
      const snapshot = await firebase.database().ref("avales").once("value");
      const avalesData = snapshot.val();

      const avalesDuplicados = [];
      for (const apoderadoKey in avalesData) {
        const apoderado = avalesData[apoderadoKey];
        this.nombreApoderadoSeleccionado = apoderado.name
        const avalesPersona = apoderado.avales;
        if (avalesPersona) {
          const duplicados = avalesPersona.filter(aval => aval.orden === avalNumero);
          avalesDuplicados.push(...duplicados);
        }
      }
      console.log(avalesDuplicados);
      if (avalesDuplicados.length > 1) {
        this.avalesDuplicados = avalesDuplicados;
        this.mostrarModal = true;
        return;
      }

      //* Coroboramos si el aval ya fue cargado previamente
      const snapshotAvalCargados = await firebase
        .database()
        .ref("avalesCargados")
        .once("value");
      const avalesCargados = snapshotAvalCargados.val();

      if (avalesCargados) {
        if (Object.values(avalesCargados).some(avalCargado => avalCargado.avalNumero === avalNumero)) {
          this.alertType = "error";
          this.alertMessage = `El aval ${avalNumero} ya fue cargado previamente.`;
          this.showAlert = true;
          this.inputValue = "";
          setTimeout(() => {
            this.showAlert = false;
          }, 3500);
          return;
        }
      }

      //* Buscamos el aval en la base de datos en caso de que no se cumpla ninguna condicion anterior
      let personaEncontrada = null;

      for (const apoderadoKey in avalesData) {
        const apoderado = avalesData[apoderadoKey];
        const avalesPersona = apoderado.avales;

        if (avalesPersona) {
          for (const aval of avalesPersona) {
            if (aval.orden === avalNumero) {
              personaEncontrada = {
                nombrePersona: aval.nombre,
                nombreApoderado: apoderado.name,
                telefonoPersona: aval.celular,
                domicilioPersona: aval.domicilio,
                escuelaPersona: aval.escuela,
              };
              break;
            }
          }
        }

        if (personaEncontrada) {
          break;
        }
      }

      //* Creamos el nuevo aval a cargar
      if (personaEncontrada) {
        const nuevoAval = {
          avalNumero: avalNumero,
          fechaCarga: new Date().toISOString(),
          nombreApoderado: personaEncontrada.nombreApoderado,
          persona: {
            nombre: personaEncontrada.nombrePersona,
            celular: personaEncontrada.telefonoPersona,
            domicilio: personaEncontrada.domicilioPersona,
            escuela: personaEncontrada.escuelaPersona,
          },
        };

        //* Si no se encuentra el aval en la base de datos, se muestra un mensaje de error
        this.$swal({
          title: '<p>Confirmar aval</p>',
          html: `<p>¿Estás seguro de que el número de orden: <b>${avalNumero}</b> es correcto?</p>`,
          type: 'question',
          showCancelButton: true,
          cancelButtonText: '<p>Cancelar</p>',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '<p>Confirmar</p>',
        }).then(result => {
          if (result.value) {
            firebase
              .database()
              .ref("avalesCargados")
              .push(nuevoAval)
              .then(() => {
                const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'bottom-end',
                  showConfirmButton: false,
                  timer: 5500,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                    this.inputValue = ""; // Limpiar el campo de entrada después de cargar el aval

                  }
                });

                Toast.fire({
                  icon: 'success',
                  html: `<p>Aval <b>${avalNumero}</b> cargado exitosamente a nombre de <b>${personaEncontrada.nombrePersona}</b>. <br>Apoderado: <b>${personaEncontrada.nombreApoderado}</b></p>`,
                });
              })
              .catch(error => {
                console.error("Error al cargar el aval:", error);
              });
          }
        });
      } else {
        this.alertType = "warning";
        this.alertMessage = `El aval ${avalNumero} no existe o no corresponde a ninguna persona.`;
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3500);
      }
    },

    async manejarMesa(mesaCargada) {
      let nombreApoderado = "";
      const avalNumero = parseInt(this.inputValue, 10);
      // Obtener la lista de avales desde la base de datos
      const snapshotAvales = await firebase.database().ref("avales").once("value");
      const avalesData = snapshotAvales.val();

      // Buscar avales duplicados por número de orden
      const avalesDuplicados = [];
      for (const mesaKey in avalesData) {
        const apoderado = avalesData[mesaKey];
        const avalesPersona = apoderado.avales;
        if (avalesPersona) {
          const duplicados = avalesPersona.filter(aval => aval.orden === avalNumero);
          avalesDuplicados.push(...duplicados);
        }
      }

      // Obtener la lista de escuelas desde Firebase
      const snapshotEscuelas = await firebase.database().ref("escuelas").once("value");
      const escuelasData = snapshotEscuelas.val();

      // Buscar el establecimiento correspondiente al número de mesa ingresado
      let establecimientoEncontrado = null;
      for (const establecimientoKey in escuelasData) {
        const establecimiento = escuelasData[establecimientoKey];
        const mesas = establecimiento.mesa;
        if (mesas && mesas.includes(parseInt(mesaCargada))) {
          establecimientoEncontrado = establecimiento;
          console.log(establecimientoEncontrado);
          break;
        }
      }

      if (!establecimientoEncontrado) {
        console.error("No se encontró un establecimiento para el número de mesa ingresado.");
        return;
      }
      // Buscar el aval duplicado con el mismo nombre de establecimiento
      const avalDuplicadoMismoEstablecimiento = avalesDuplicados.find(aval => aval.escuela === establecimientoEncontrado.establecimiento);

      // Buscar el nombre del apoderado correspondiente al nombre del aval seleccionado
      for (const mesaKey in avalesData) {
        const apoderado = avalesData[mesaKey];
        const avalesPersona = apoderado.avales;
        if (avalesPersona) {
          const avalEncontrado = avalesPersona.find(aval => aval.nombre === avalDuplicadoMismoEstablecimiento.nombre);
          if (avalEncontrado) {
            nombreApoderado = apoderado.name;
            break;
          }
        }
      }
      const snapshotAvalCargados = await firebase
        .database()
        .ref("avalesCargados")
        .once("value");
      const avalesCargados = snapshotAvalCargados.val();

      if (avalesCargados) {
        if (Object.values(avalesCargados).some(avalCargado => avalCargado.persona.nombre === avalDuplicadoMismoEstablecimiento.nombre)) {
          this.alertType = "error";
          this.alertMessage = `El aval ${avalNumero} ya fue cargado previamente.`;
          this.showAlert = true;
          this.inputValue = "";
          setTimeout(() => {
            this.showAlert = false;
          }, 3500);
          return;
        }
      }

      // Subir el aval seleccionado a la base de datos
      const nuevoAval = {
        avalNumero: avalDuplicadoMismoEstablecimiento.orden,
        fechaCarga: new Date().toISOString(),
        nombreApoderado: nombreApoderado,
        persona: {
          nombre: avalDuplicadoMismoEstablecimiento.nombre,
          celular: avalDuplicadoMismoEstablecimiento.celular,
          domicilio: avalDuplicadoMismoEstablecimiento.domicilio,
          escuela: avalDuplicadoMismoEstablecimiento.escuela,
        },
      };

      try {
        await firebase.database().ref("avalesCargados").push(nuevoAval);
        this.mostrarModal = false;

        const Toast = this.$swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 5500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            this.inputValue = ""; // Limpiar el campo de entrada después de cargar el aval
          }
        });

        Toast.fire({
          icon: 'success',
          html: `<p>Aval <b>${avalNumero}</b> cargado exitosamente a nombre de <b>${avalDuplicadoMismoEstablecimiento.nombre}</b>. <br>Apoderado: <b>${nombreApoderado}</b></p>`,
        });
      } catch (error) {
        console.error("Error al cargar el aval:", error);
      }
    },
    handleEnterKeyPress() {
      if (this.uploadType) {
        // Si el tipo de carga es telegrama, hacer clic en el botón de carga de telegrama
        this.$refs.subirTelegramaButton.click();
      } else {
        // Si el tipo de carga es quiniela, hacer clic en el botón de carga de quiniela
        this.$refs.subirQuinielaButton.click();
      }
    },
  },
};
</script>

<style>
.v-input {
  padding: 0;
}

.v-input__control {
  display: flex;
  align-items: center;
}

.v-input__slot {
  margin-left: 1rem;
  display: flex;
  width: 18rem;
  flex-direction: row;
}

.botonCarga {
  border-radius: 20rem;
  background-color: #8a8f90;
  width: 8rem;
  margin-right: 0.3rem;
  height: min-content;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}

.pildora {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 20rem;
  margin-top: 1.2rem;
}

.button-transition {
  transition: background-color 2s, color 2s;
}

.buttonDuo {
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 10rem;
  width: 17rem;
  margin-top: 1.2rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  /* Duración de la animación (0.5 segundos) */
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active en <2.1.8 */
  {
  opacity: 0;
}

.tarjeta-votos {
  width: 40rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-title {
  display: flex;
  justify-content: center;
  font-family: Nunito;
  font-weight: 600;
  font-size: 3.5rem;
  color: #fff;
  margin-top: 3rem;
}

.v-text-field__details {
  display: none;
}
</style>
