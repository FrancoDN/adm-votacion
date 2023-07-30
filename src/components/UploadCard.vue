<template>
  <div
    style="
      background-color: #0197ba;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    "
  >
    <img src="../assets/vane.png" alt="" style="width: 30rem" />
    <p class="card-title">Carga de votos</p>

    <div class="buttonDuo">
      <button
        :style="[buttonQ, buttonTransition]"
        @click="changeType(false)"
        class="d-flex justify-center ma-2"
      >
        <p style="color: black; font-size: 1.2rem; font-weight: 600">
          Quiniela
        </p>
      </button>
      <button
        :style="[buttonT, buttonTransition]"
        @click="changeType(true)"
        class="d-flex justify-center ma-2"
      >
        <p style="color: black; font-size: 1.2rem; font-weight: 600">
          Telegrema
        </p>
      </button>
    </div>
    <div style="display: flex; flex-direction: column; justify-content: center">
      <p
        style="
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          text-align: center;
          margin-top: 1.2rem;
        "
      >
        {{ inputText }}
      </p>
      <div class="pildora">
        <v-text-field
          ref="textField"
          @keyup.enter="handleEnterKeyPress"
          v-model="inputValue"
          type="number"
          hide-details="true"
          inputmode="numeric"
        ></v-text-field>

        <button
          class="botonCarga"
          ref="subirTelegramaButton"
          @click="subirTelegrama()"
          v-if="uploadType"
        >
          <p
            style="color: white; font-size: 1.2rem; font-weight: 600"
            class="d-flex ma-1 justify-center"
          >
            Cargar
          </p>
        </button>

        <button
          class="botonCarga"
          ref="subirQuinielaButton"
          @click="subirQuiniela()"
          v-else
        >
          <p
            style="color: white; font-size: 1.2rem; font-weight: 600"
            class="d-flex ma-1 justify-center"
          >
            Cargar
          </p>
        </button>
      </div>
    </div>

    <transition name="fade">
      <v-alert
        v-if="showAlert"
        border="left"
        prominent
        :type="alertType"
        class="mt-6"
      >
        <template v-slot:default>
          <span v-html="alertMessage"></span>
        </template>
      </v-alert>
    </transition>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
export default {
  data() {
    return {
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
      inputText: "Ingrese el número de telegrama",
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
      console.log("subo telegrama");
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

      const snapshotAvalCargados = await firebase
        .database()
        .ref("avalesCargados")
        .once("value");
      const avalesCargados = snapshotAvalCargados.val();

      if (avalesCargados) {
        // Verificar que avalesCargados no sea undefined
        if (
          Object.values(avalesCargados).some(
            (avalCargado) => avalCargado.avalNumero === avalNumero
          )
        ) {
          // Si el aval ya existe en avalesCargados, mostrar una alerta y no continuar
          this.alertType = "error";
          this.alertMessage = `El aval ${avalNumero} ya fue cargado previamente.`;
          this.showAlert = true;
          this.inputValue = ""; // Limpiar el campo de entrada después de mostrar la alerta

          // Configurar el temporizador para ocultar el v-alert después de 3 segundos
          setTimeout(() => {
            this.showAlert = false;
          }, 3500);
          return;
        }
      }

      const snapshot = await firebase.database().ref("avales").once("value");
      const personasAval = snapshot.val();

      if (personasAval) {
        // Verificar que personasAval no sea undefined
        let persona;
        Object.keys(personasAval).forEach((key) => {
          const avales = personasAval[key]?.avales;
          if (avales && avales.includes(avalNumero)) {
            persona = personasAval[key].name;
          }
        });

        if (persona) {
          // Si el aval existe y corresponde a una persona, lo guardamos en el nuevo objeto
          const nuevoAval = {
            avalNumero: avalNumero,
            fechaCarga: new Date().toISOString(),
            persona: persona,
          };

          firebase
            .database()
            .ref("avalesCargados")
            .push(nuevoAval)
            .then(() => {
              this.alertType = "success";
              this.alertMessage = `Aval <b>${avalNumero}</b> cargado exitosamente a nombre de <b>${persona}</b>.`;
              this.showAlert = true;
              this.inputValue = ""; // Limpiar el campo de entrada después de cargar el aval
              setTimeout(() => {
                this.showAlert = false;
              }, 3500);
            })
            .catch((error) => {
              console.error("Error al cargar el aval:", error);
            });
        } else {
          this.alertType = "warning";
          this.alertMessage = `El aval ${avalNumero} no existe o no corresponde a ninguna persona.`;
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 3500);
        }
      } else {
        this.alertType = "warning";
        this.alertMessage = "No hay datos de avales en la base de datos";
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3500);
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
  transition: opacity 0.5s; /* Duración de la animación (0.5 segundos) */
}
.fade-enter, .fade-leave-to /* .fade-leave-active en <2.1.8 */ {
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
