import { createStore } from "vuex";

//firebase imports
import {
  auth,
  getDocs,
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
    // posts: [
    //   {
    //     id: 1,
    //     img: "user4.jpg",
    //     author: "Imran",
    //     title: "How to create a simple login page using Html & Css",
    //     content:
    //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus cupiditate commodi dolorum nesciunt id deleniti saepe magnam voluptatibus necessitatibus culpa?",
    //   },
    //   {
    //     id: 2,
    //     img: "user5.jpg",
    //     author: "Ameer",
    //     title: "Simple Vue Project",
    //     content:
    //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus cupiditate commodi dolorum nesciunt id deleniti saepe magnam voluptatibus necessitatibus culpa?",
    //   },
    //   {
    //     id: 3,
    //     img: "user6.jpg",
    //     author: "Mahmud",
    //     title:
    //       "How to create a simple login page using React and firebase auth",
    //     content:
    //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus cupiditate commodi dolorum nesciunt id deleniti saepe magnam voluptatibus necessitatibus culpa?",
    //   },
    //   {
    //     id: 4,
    //     img: "user9.jpg",
    //     author: "Johnson",
    //     title: "How to create an E-comerce web app using Html & Css",
    //     content:
    //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus cupiditate commodi dolorum nesciunt id deleniti saepe magnam voluptatibus necessitatibus culpa?",
    //   },
    //   {
    //     id: 5,
    //     img: "user10.jpg",
    //     author: "Fati",
    //     title: "How to create a simple login page using Html & Css",
    //     content:
    //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus cupiditate commodi dolorum nesciunt id deleniti saepe magnam voluptatibus necessitatibus culpa?",
    //   },
    //   {
    //     id: 6,
    //     img: "user14.jpg",
    //     author: "Khadija",
    //     title: "How to create a simple chat app using Html, Css & Javascript",
    //     content:
    //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus cupiditate commodi dolorum nesciunt id deleniti saepe magnam voluptatibus necessitatibus culpa?",
    //   },
    // ],
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

    async createPost(context, data) {
      const storageRef = ref(storage, `postCovers/${data.id}.jpg`);
      addPost(data);
      // uploadBytes(storageRef, imageFile)
      //   .then(async (snapshot) => {
      //     getDownloadURL(ref(storage, `postCovers/${data.id}.jpg`)).then(
      //       (download_url) => {
      //         getDocs(postCollection)
      //           .then((snapshot) => {
      //             let posts = [];
      //             snapshot.docs.forEach((doc) => {
      //               posts.push({ ...doc.data(), postId: doc.id });
      //             });
      //             const filteredPost = posts.filter(
      //               (post) => post.id === data.id
      //             );
      //             console.log(filteredPost[0].id, download_url);

      //             // context.commit("setUpdateNewPost", {
      //             //   postId: filteredPost[0].id,
      //             //   img: download_url,
      //             // });
      //             // updating doc
      //             const docRef = doc(postCollection, filteredPost[0].postId);
      //             updateDoc(docRef, {
      //               img: download_url,
      //             });
      //           })
      //           .catch((err) => {
      //             console.log(err.message);
      //           });
      //       }
      //     );
      //     console.log("Post Cover Uploaded");
      //   })
      //   .catch((err) => console.log(err.message));
    },

    async filterPost(context, postId) {
      const postArray = store.state.posts;
      const filteredPost = postArray.find((p) => p.id === postId); // Use find() instead of filter()

      if (filteredPost) {
        context.commit("setViewPost", filteredPost);
        console.log(filteredPost);
      } else {
        console.error("Post not found");
      }
    },
  },
});

const unsubscribe = onAuthStateChanged(auth, async (user) => {
  store.commit("setAuthIsReady", true);
  store.commit("setUser", user);
  unsubscribe();

  if (user) {
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

        const userId = store.state.user.uid;
        getDownloadURL(ref(storage, `image/${userId}.jpg`)).then(
          (download_url) => store.commit("setUserImage", download_url)
        );
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
});
export default store;
