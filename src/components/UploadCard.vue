<template>
  <div>
    <v-card
      elevation="2"
      color="#0197BA"
      outlined
      rounded="xxl"
      class="tarjeta-votos"
    >
      <v-card-title class="card-title"> Carga de {{ type }} </v-card-title>
      <v-card-text>
        <v-row class="mt-4">
          <v-col cols="12" md="9" sm="8">
            <v-text-field
              ref="textField"
              :label="inputText"
              @keyup.enter="handleEnterKeyPress"
              v-model="inputValue"
              solo
              type="number"
              inputmode="numeric"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              large
              ref="subirButton"
              color="success"
              block
              @click="subirTelegrama()"
              v-if="uploadType"
              >Cargar</v-btn
            >
            <v-btn
              large
              ref="subirButton"
              color="success"
              block
              @click="subirQuiniela()"
              v-else
              >Cargar</v-btn
            >
          </v-col>
          <v-col class="d-flex justify-center justify-space-around pa-0 mt-4">
            <v-btn color="#E1B530" @click="changeType(false)" large
              >Quiniela</v-btn
            >
            <v-btn color="primary" @click="changeType(true)" large
              >Telegrama</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
      } else {
        this.type = "Telegrama";
        this.inputText = "Ingrese el número de telegrama";
        this.uploadType = true;
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
      // Trigger the click event of the "Subir" button when Enter key is pressed
      this.$refs.subirButton.$el.click();
    },
  },
};
</script>

<style>
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
  font-size: 2.5rem;
  color: #fff;
}

.v-text-field__details {
  display: none;
}
</style>
