import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// FIREBASE: //////////
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjE4mhWjYm41NCCTlTnaLsAJ_uWJ2O1Pw",
  authDomain: "language-exchange-38cc0.firebaseapp.com",
  projectId: "language-exchange-38cc0",
  storageBucket: "language-exchange-38cc0.appspot.com",
  messagingSenderId: "1027817611337",
  appId: "1:1027817611337:web:1d7e80aec840b28d6e5f98"
};

const firebaseApp = initializeApp(firebaseConfig);
////////////////////////
const app = createApp(App)

app.use(router);

app.mount('#app')
