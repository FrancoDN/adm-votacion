import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Guard para verificar si el usuario es administrador
export function isAdminUser(to) {
    console.log(to);
}

// Guard para verificar si el usuario está autenticado
export function requireAuth(to, from, next) {
    const user = getCurrentUser(); // Implementa esta función para obtener el objeto de usuario actual
    if (user) {
        // El usuario está autenticado, permite el acceso a la ruta
    console.log("identificado");
        next();
    } else {
        // El usuario no está autenticado, redirige a la página de inicio de sesión
        console.log("no");
        next('/');
    }
}

// Función para obtener el usuario actual, puedes usar firebase.auth().currentUser
function getCurrentUser() {
    const currentUser = firebase.auth().currentUser;
    return currentUser;
}
