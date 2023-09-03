import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
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

// get collection data
const getDocuments = () => {
  getDocs(usersCollection)
    .then((snapshot) => {
      let users = [];
      snapshot.docs.forEach((user) => {
        users.push({ ...user.data(), id: user.id });
      });
      console.log(users);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// adding Document
const addUser = async (data) => {
  try {
    const docRef = await addDoc(usersCollection, data);
    console.log("Document added with ID: ", docRef.id);
  } catch (err) {
    console.error(err.message);
  }
};

// const filterUser = async (userEmail) => {
//   const userQuery = query(usersCollection, where("email", "==", userEmail));
//   try {
//     const querySnapshot = await getDocs(userQuery);
//     if (!querySnapshot.empty) {
//       // The query returned at least one document
//       const userData = querySnapshot.docs[0].data();
//       console.log("User Data:", userData);
//       // You can access specific fields using userData.fieldName
//     } else {
//       console.log("No user document found for the current user.");
//     }
//   } catch (error) {
//     console.error("Error getting user document:", error);
//   }
// };

export {
  auth,
  db,
  usersCollection,
  getDocuments,
  addUser,
  query,
  where,
  getDocs,
};
