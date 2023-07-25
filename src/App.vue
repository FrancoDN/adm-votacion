<template>
  <v-app>
    <v-app-bar app color="#0197BA" dark>
      <v-img
        src="./assets/vane.png"
        max-height="10rem"
        max-width="5rem"
        contain
      ></v-img>
      <v-spacer></v-spacer>

      <v-btn v-if="shouldShowSignOutButton" color="red" large @click="signOut">
        Salir
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";

export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    // Verifica si la ruta actual es la página de inicio de sesión ("/login" en este caso)
    shouldShowSignOutButton() {
      return this.$route.path !== "/";
    },
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$router.push("/");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
  },
};
</script>
