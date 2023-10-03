import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  query,
  where,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5CTF5_9HsfupUzS2vub1ea38RIogCg68",
  authDomain: "dev-blog-2975.firebaseapp.com",
  projectId: "dev-blog-2975",
  storageBucket: "dev-blog-2975.appspot.com",
  messagingSenderId: "789868451115",
  appId: "1:789868451115:web:50156f8f936b21edc4a16e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth service
const auth = getAuth(app);

// Initialize Database service
const db = getFirestore();

//collection ref
const usersCollection = collection(db, "users");
const postCollection = collection(db, "posts");
const commentsCollection = collection(db, "comments");

// get collection data

// adding Document
const addUser = async (data) => {
  try {
    const docRef = await addDoc(usersCollection, data);
    console.log("Document added with ID: ", docRef.id);
  } catch (err) {
    console.error(err.message);
  }
};

const addPost = async (data) => {
  try {
    const docRef = await addDoc(postCollection, data);
    console.log("Document added with ID: ", docRef.id);
  } catch (err) {
    console.error(err.message);
  }
};

const addComment = async (data) => {
  try {
    const docRef = await addDoc(commentsCollection, data);
    console.log("comment added with ID: ", docRef.id);
  } catch (err) {
    console.error(err.message);
  }
};

// initializing firebase storage
const storage = getStorage(app);
// const storageRef = ref(storage);

// const imageRef = ref(storage, "images");
// const sparkyRef = ref(storage, "images/imran.jpg");

// uploadBytes(sparkyRef, file).then((snapshot) => {
//   console.log("hi");
// });

// uploadBytes();

export {
  auth,
  db,
  usersCollection,
  postCollection,
  commentsCollection,
  addUser,
  addPost,
  addComment,
  query,
  where,
  getDocs,
  onSnapshot,
  storage,
  getDownloadURL,
  updateDoc,
  doc,
};
