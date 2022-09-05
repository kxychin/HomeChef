import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAi27jKMshVx-Jb9KJUbYjvacjC_RgWV8c",
  authDomain: "test-3ad2c.firebaseapp.com",
  projectId: "test-3ad2c",
  storageBucket: "test-3ad2c.appspot.com",
  messagingSenderId: "1047330593601",
  appId: "1:1047330593601:web:04eebca5b7fc29c7831fc0",
  measurementId: "G-GKV3B2J9HC",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export { firebase };
