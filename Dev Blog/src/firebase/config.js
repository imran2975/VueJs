import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5CTF5_9HsfupUzS2vub1ea38RIogCg68",
  authDomain: "dev-blog-2975.firebaseapp.com",
  projectId: "dev-blog-2975",
  storageBucket: "dev-blog-2975.appspot.com",
  messagingSenderId: "789868451115",
  appId: "1:789868451115:web:50156f8f936b21edc4a16e",
};

//init firebase
initializeApp(firebaseConfig);

//init auth service
const auth = getAuth();

export { auth };
