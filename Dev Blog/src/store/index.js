import { createStore } from "vuex";

//firebase imports
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const store = createStore({
  state: {
    user: null,

    img: "Logo.png",
    posts: [
      {
        id: 1,
        img: "user4.jpg",
        author: "Imran",
        title: "How to create a simple login page using Html & Css",
      },
      {
        id: 2,
        img: "user5.jpg",
        author: "Ameer",
        title: "Simple Vue Project",
      },
      {
        id: 3,
        img: "user6.jpg",
        author: "Mahmud",
        title:
          "How to create a simple login page using React and firebase auth",
      },
      {
        id: 4,
        img: "user9.jpg",
        author: "Johnson",
        title: "How to create an E-comerce web app using Html & Css",
      },
      {
        id: 5,
        img: "user10.jpg",
        author: "Fati",
        title: "How to create a simple login page using Html & Css",
      },
      {
        id: 6,
        img: "user14.jpg",
        author: "Khadija",
        title: "How to create a simple chat app using Html, Css & Javascript",
      },
    ],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      console.log("user state changed:", state.user);
    },
  },
  actions: {
    async signup(context, { email, password }) {
      console.log("signup action");

      //asyn code
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response) {
        context.commit("setUser", response.user);
      } else {
        throw new Error("could not complete signup");
      }
    },

    async signin(context, { email, password }) {
      console.log("signin action");

      //asyn code
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("setUser", response.user);
      } else {
        throw new Error("could not complete signin");
      }
    },
  },
});

export default store;
