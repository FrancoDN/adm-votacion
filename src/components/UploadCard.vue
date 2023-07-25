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
              @input="onInput"
              @keyup.enter="handleEnterKeyPress"
              v-model="inputValue"
              solo
              type="number"
              inputmode="numeric"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn ref="subirButton" color="success" block @click="subirTelegrama()" v-if="uploadType">Cargar</v-btn>
            <v-btn ref="subirButton" color="success" block @click="subirQuiniela()" v-else>Cargar</v-btn>
          </v-col>
          <v-col class="d-flex justify-center justify-space-around pa-0 mt-4">
            <v-btn color="#E1B530" @click="changeType(false)">Quiniela</v-btn>
            <v-btn color="primary" @click="changeType(true)">Telegrama</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
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
      this.$refs.textField.reset(); // Clear the text field
    },

    subirTelegrama() {
        console.log("subo telegrama");
    },

    subirQuiniela() {
        console.log("subo quiniela");
    },

    handleEnterKeyPress() {
      // Trigger the click event of the "Subir" button when Enter key is pressed
      this.$refs.subirButton.$el.click();
      
    },
  },
};
</script>
  
  <style>
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