import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9w4iLbX2P5GPyKjtn0GqDTv8sQGxPDCg",
  authDomain: "sokdak-d9904.firebaseapp.com",
  projectId: "sokdak-d9904",
  storageBucket: "sokdak-d9904.appspot.com",
  messagingSenderId: "416243686471",
  appId: "1:416243686471:web:fbacc3b1ef4a9841a42562"
};

export default firebase.initializeApp(firebaseConfig);

export const firebaseinstance = firebase
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageServise = firebase.storage();