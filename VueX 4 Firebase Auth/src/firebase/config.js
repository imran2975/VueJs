import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2R0eP4LQ3cedky3-gT9Om0_8lWNXuITE",
  authDomain: "vuex-4-fb-auth-a649f.firebaseapp.com",
  projectId: "vuex-4-fb-auth-a649f",
  storageBucket: "vuex-4-fb-auth-a649f.appspot.com",
  messagingSenderId: "520654263618",
  appId: "1:520654263618:web:5e8ae441150ab0b9dc24db",
};

initializeApp(firebaseConfig);

const auth = getAuth();

export { auth };
