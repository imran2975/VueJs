import { createStore } from "vuex";

//firebase imports
import {
  auth,
  getDocuments,
  getDocs,
  addUser,
  query,
  where,
  usersCollection,
} from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const store = createStore({
  state: {
    user: null,
    userData: null,
    authIsReady: false,
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
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
    setUserData(state, payload) {
      state.userData = payload;
    },
  },
  actions: {
    async signup(context, { email, password, firstName, lastName, userName }) {
      try {
        console.log("signup action");

        // Async code
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
      } catch (error) {
        console.error("Error during signup:", error);
        throw error;
      }
      addUser({ firstName, lastName, userName, email });
      console.log(firstName, lastName, userName, email);
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
    async signout(context) {
      console.log("signout action");
      await signOut(auth);
      context.commit("setUser", null);
    },
  },
});

const unsubscribe = onAuthStateChanged(auth, async (user) => {
  store.commit("setAuthIsReady", true);
  store.commit("setUser", user);
  unsubscribe();
  getDocuments();
  // if (user) {
  //   filterUser(user.email)
  //     .then((userData) => {
  //       store.commit("setUserData", userData); // Assuming you have a mutation called setUserData
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  // }

  if (user) {
    // User is signed in

    // Get the UID of the authenticated user

    // Create a reference to the "users" collection

    // Query Firestore to get the document for the current user based on UID
    const userQuery = query(usersCollection, where("email", "==", user.email));

    try {
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        // The query returned at least one document
        const userData = querySnapshot.docs[0].data();
        console.log("User Data:", userData);
        // You can access specific fields using userData.fieldName
        store.commit("setUserData", userData);
      } else {
        console.log("No user document found for the current user.");
      }
    } catch (error) {
      console.error("Error getting user document:", error);
    }
  } else {
    // User is signed out
    console.log("User is signed out.");
  }
  console.log(store.state.userData);
});

export default store;
