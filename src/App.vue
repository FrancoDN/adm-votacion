<template>
  <v-app>
    <v-app-bar app color="#0197BA" dark v-if="showNavbar && shouldShowSignOutButton && $route.meta.hideNavbar">
      <v-img src="./assets/vane.png" max-height="10rem" max-width="5rem" contain></v-img>
      <v-icon @click="toggleFullscreen" style="margin-left: 1.5rem;" size="30"> mdi-fullscreen</v-icon>
      <v-spacer></v-spacer>
      <button @click="carga">
        <p class="navBar" v-if="shouldShowCargaButton" >CARGA</p>
      </button>
      <button @click="estadistica">
        <p class="navBar" v-if="shouldShowEstadisticaButton">ESTADÍSTICAS</p>
      </button>
      <button @click="escuela">
        <p class="navBar" v-if="shouldShowEscuelaButton">ESCUELAS</p>
      </button>
      <button @click="intendentes">
        <p class="navBar" v-if="shouldShowIntendentesButton">INTENDENTES</p>
      </button>
      <button @click="mesas">
        <p class="navBar" v-if="shouldShowMesasButton">MESAS</p>
      </button>
      <v-btn v-if="shouldShowSignOutButton" color="#1BAED0" large @click="signOut"
        style="border-radius: 10rem; height: 2.5rem;">
        <p> Salir</p>
      </v-btn>
    </v-app-bar>
    <v-btn v-if="!$route.meta.hideNavbar && shouldShowSignOutButton" color="#1BAED0" large @click="signOut"
        style=" height: 2.5rem;">
        <p> <b>Salir</b></p>
      </v-btn>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";
import { mapState } from 'vuex';
export default {
  name: "App",

  data() {
    return {
      showNavbar: true,
      adminNav: false,
    }
  },
  mounted() {
    this.$root.$on("admin-status-changed", this.updateAdminStatus);
    // Escuchar el evento fullscreenchange para actualizar la variable showNavbar
    document.addEventListener("fullscreenchange", this.handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", this.handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", this.handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", this.handleFullscreenChange);
  },
  beforeUnmount() {
    // Asegurarse de eliminar el listener cuando el componente se desmonta
    this.$root.$off("admin-status-changed", this.updateAdminStatus);
  },
  unmounted() {
    // Remover los listeners del evento fullscreenchange al desmontar el componente
    document.removeEventListener("fullscreenchange", this.handleFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", this.handleFullscreenChange);
    document.removeEventListener("mozfullscreenchange", this.handleFullscreenChange);
    document.removeEventListener("MSFullscreenChange", this.handleFullscreenChange);
  },
  computed: {
    ...mapState(['admin']),
    // Verifica si la ruta actual es la página de inicio de sesión ("/login" en este caso)
    shouldShowSignOutButton() {
      return this.$route.path !== "/";
    },
    shouldShowCargaButton() {
      return this.$route.path !== "/user" && this.$route.path !== "/";
    },
    shouldShowEstadisticaButton() {
      return this.$route.path !== "/admin";
    },
    shouldShowQuinielaButton() {
      return this.$route.path !== "/quiniela";
    },
    shouldShowEscuelaButton() {
      return this.$route.path !== "/escuela";
    },
    shouldShowIntendentesButton() {
      return this.$route.path !== "/intendentes";
    },
    shouldShowMesasButton() {
      return this.$route.path !== "/mesas";
    },
  },

  watch: {
    adminNav() {
      this.$forceUpdate();
    },
  },
  methods: {
    updateAdminStatus(isAdmin) {
      this.adminNav = isAdmin;
    },
    toggleFullscreen() {
      const elem = document.documentElement; // Obtener el elemento raíz (el documento)

      if (document.fullscreenElement) {
        // Si ya está en modo pantalla completa, salir del modo pantalla completa
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        // Si no está en modo pantalla completa, activar el modo pantalla completa
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      }
    },

    // Agregar el método para manejar el cambio de modo pantalla completa
    handleFullscreenChange() {
      this.showNavbar = !document.fullscreenElement;
    },

    quiniela() {
      this.$router.push("/quiniela");
    },

    estadistica() {
      this.$router.push("/admin");
    },

    carga() {
      this.$router.push("/user");
    },

    escuela() {
      this.$router.push("/escuela");
    },
    intendentes() {
      this.$router.push("/intendentes");
    },
    mesas() {
      this.$router.push("/mesas");
    },

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

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,300&family=Open+Sans:wght@800&family=Poppins:wght@600&family=Russo+One&display=swap');

.navBar {
  font-family: Poppins;
  font-size: 1vw;
  margin-right: 4vw;
  color: white;
  text-decoration: none;
}</style>