<template>
  <v-form class="form" @submit.prevent="login">
    <v-card elevation="5" class="tarjeta-login">
      <v-container>
        <v-card-title> <p>Login</p></v-card-title>
        <v-card-text>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              label="Email"
              prepend-icon="mdi-account-circle"
              v-model="user.email"
            ></v-text-field>
            <v-text-field
              type="password"
              label="Contraseña"
              prepend-icon="mdi-lock"
              v-model="user.password"
            ></v-text-field>
          </v-col>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="primary" elevation="2" type="submit">Entrar</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-form>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";

export default {
  name: "LoginCard",

  data: () => ({
    user: {
      email: "",
      password: "",
    },
  }),

  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then((userCredential) => {
          // Obtener el usuario actual
          const user = userCredential.user;
          console.log(user.uid);
          // Obtener información adicional desde la base de datos
          this.getUserInfo(user.uid);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getUserInfo(uid) {
      try {
        const snapshot = await firebase
          .database()
          .ref("users/" + uid)
          .once("value")
          .then((snapshot) => {
            const userInfo = snapshot.val();
            // Hacer algo con la información obtenida, por ejemplo, redirigir a la página correspondiente
            if (userInfo && userInfo.isAdmin) {
              this.$router.push("/admin");
            } else {
              this.$router.push("/user");
            }
          })
          .catch((error) => {
            console.error("Error obteniendo información del usuario:", error);
          });
      } catch (err) {
        console.log(err);
      }
    },
  },

  created() {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&display=swap");
p {
  font-weight: 800;
  font-size: x-large;
  font-family: "Nunito", sans-serif;
}
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.tarjeta-login {
  width: 25%;
}
</style>