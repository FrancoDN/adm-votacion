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

    <p style="font-size: 3rem; font-weight: 700; color: white" class="mt-6">
      Sistema de fiscalización
    </p>
      <v-text-field v-model="user.email" class="mt-6" label="Ingrese el email" solo style="border-radius: 15rem;"></v-text-field>
      <v-text-field v-model="user.password" class="mt-4" label="Ingrese la contraseña" type="password" solo style="border-radius: 15rem;"></v-text-field>
    <button @click="login" class="login mt-4">
      <p style="font-size: 1.2rem; font-weight: 600; margin: 0.2rem;">Ingresar</p>
    </button>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";
import { isAdminUser } from '../router/guard'; // Importa el guard isAdminUser

export default {
  name: "LoginCard",

  data: () => ({
    user: {
      email: "",
      password: "",
    },
  }),

  methods: {
   async login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then((userCredential) => {
          // Obtener el usuario actual
          const user = userCredential.user;
          this.$router.replace('user');
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
            if (userInfo) {
              isAdminUser(userInfo.isAdmin)
            } else {
              this.$router.push("/error");
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

};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&display=swap");
p {
  font-family: "Nunito", sans-serif;
}

.v-input {
  flex: 0;
}

.login {
  background: #E1B530;
  width: 25rem;
  border-radius: 15rem;
  
}
.v-input__slot {
 margin-left: 0rem;
}
</style>