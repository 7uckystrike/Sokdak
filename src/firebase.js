import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBdUIITcPrHMLa5ASJuPkBvuuHU8Rw6nv4",
  authDomain: "nwitter-5ad39.firebaseapp.com",
  projectId: "nwitter-5ad39",
  storageBucket: "nwitter-5ad39.appspot.com",
  messagingSenderId: "196756277423",
  appId: "1:196756277423:web:058ca9103f9f38af11ec5a"
};

export default firebase.initializeApp(firebaseConfig);

export const firebaseinstance = firebase
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageServise = firebase.storage();