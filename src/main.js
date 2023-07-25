import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app';

Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEIUxnyjsetliAawU-UJs7mzx4n6Tb94U",
  authDomain: "votacion-13d0f.firebaseapp.com",
  databaseURL: "https://votacion-13d0f-default-rtdb.firebaseio.com",
  projectId: "votacion-13d0f",
  storageBucket: "votacion-13d0f.appspot.com",
  messagingSenderId: "764733800121",
  appId: "1:764733800121:web:ee8e6c204ab5582e932568"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
