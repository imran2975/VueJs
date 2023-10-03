import { createStore } from "vuex";

//firebase imports
import {
  auth,
  getDocs,
  onSnapshot,
  addUser,
  addPost,
  updateDoc,
  doc,
  query,
  where,
  usersCollection,
  postCollection,
  storage,
} from "../firebase/config";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

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
    userImage: null,
    posts: null,

    viewPost: {},
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
    setUserImage(state, imageUrl) {
      state.userImage = imageUrl;
    },
    setViewPost(state, payload) {
      state.viewPost = payload;
    },
    setPosts(state, payload) {
      state.posts = payload;
      console.log("Post added", state.posts);
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
          const uid = response.user.uid;
          addUser({ firstName, lastName, userName, email, uid });
          console.log(firstName, lastName, userName, email);
        } else {
          throw new Error("could not complete signup");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        throw error;
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
    async signout(context) {
      console.log("signout action");
      await signOut(auth);
      context.commit("setUser", null);
    },

    async createPost(context, data) {
      const storageRef = ref(storage, `postCovers/${data.id}.jpg`);
      addPost(data);
    },

    async filterPost(context, postId) {
      const postArray = store.state.posts;
      const filteredPost = await postArray.find(
        (p) => p.coverImageRef === postId
      ); // Use find() instead of filter()

      if (filteredPost) {
        context.commit("setViewPost", filteredPost);
      } else {
        console.error("Post not found");
      }
    },
  },
});

const unsubscribe = onAuthStateChanged(auth, async (user) => {
  store.commit("setAuthIsReady", true);
  store.commit("setUser", user);

  if (user) {
    // Query Firestore to get the document for the current user based on UID
    const userQuery = query(usersCollection, where("email", "==", user.email));

    try {
      if (user) {
        onSnapshot(userQuery, (snapshot) => {
          const userData = snapshot.docs[0].data();
          console.log(userData);

          // commit state
          store.commit("setUserData", userData);

          // download user image if available
          const userId = store.state.user.uid;
          getDownloadURL(ref(storage, `image/${userId}.jpg`)).then(
            (download_url) => store.commit("setUserImage", download_url)
          );
        });
      } else {
        console.log("user signed out");
      }
    } catch (error) {
      console.error("Error getting user document:", error);
    }
  } else {
    // User is signed out
    console.log("User is signed out.");
  }
});
export default store;
