import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import UserView from '../views/UserView.vue'
import QuinielaView from '../views/QuinielaView.vue'
import TelegramaView from '../views/TelegramaView.vue'
import EscuelasView from '../views/EscuelasView.vue'
import IntendentesView from '../views/IntendentesView.vue'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: {
      requiresAuth: true,
      isAdminRoute: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: {
      requiresAuth: true,
      hideNavbar: true,
    }
  },
  {
    path: '/quiniela',
    name: 'quiniela',
    component: QuinielaView,
    meta: {
      requiresAuth: true,
      isAdminRoute: true
    }
  },
  {
    path: '/intendentes',
    name: 'intendentes',
    component: IntendentesView,
    meta: {
      requiresAuth: true,
      isAdminRoute: true
    }
  },
  {
    path: '/escuela',
    name: 'escuela',
    component: EscuelasView,
    meta: {
      requiresAuth: true,
      isAdminRoute: true
    }
  },
  {
    path: '/telegrama',
    name: 'telegrama',
    component: TelegramaView,
    meta: {
      requiresAuth: true,
      hideNavbar: true,
    }
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/');
  } else if (requiresAuth && currentUser) {
    try {
      const userInfo = await getUserInfo(currentUser.uid);
      to.meta.hideNavbar = userInfo.isAdmin;
      if (userInfo && userInfo.isAdmin) {
        // Si el usuario es un administrador (isAdmin: true), déjalo pasar a cualquier ruta.
        next();
      } else  {
        // Si el usuario no es un administrador (isAdmin: false),
        // permítele acceder solo a rutas protegidas que no sean para administradores.
        if (to.matched.some(record => record.meta.isAdminRoute)) {
          next({ path: '/user' });
        } else {
          next();
        }
      }
    } catch (error) {
      console.error('Error obteniendo información del usuario:', error);
      next('/');
    }
  } else {
    next();
  }
});

function getUserInfo(uid) {
  return firebase
    .database()
    .ref("users/" + uid)
    .once("value")
    .then((snapshot) => {
      const userInfo = snapshot.val();
      return userInfo; // Devuelve directamente el valor de isAdmin
    })
    .catch((error) => {
      console.error("Error obteniendo información del usuario:", error);
      throw error; // Lanza el error para manejarlo en el guard si es necesario
    });
}

export default router
