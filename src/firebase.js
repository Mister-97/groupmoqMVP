// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzbio5pa2HJQ8Q8HwLNsezaPnht9vI2B4",
  authDomain: "groupmoq.firebaseapp.com",
  projectId: "groupmoq",
  storageBucket: "groupmoq.appspot.com",   // ⚡ fix this line
  messagingSenderId: "498359963663",
  appId: "1:498359963663:web:b180b74b717f3112db537a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
