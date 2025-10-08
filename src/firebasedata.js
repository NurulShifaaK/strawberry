// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDL6ijTWCz-qGwI3nXBHEYvJUX_Bl_JD64",
  authDomain: "productsdatas.firebaseapp.com",
  projectId: "productsdatas",
  storageBucket: "productsdatas.firebasestorage.app",
  messagingSenderId: "237378842713",
  appId: "1:237378842713:web:6bf997db8c2e88baf70148"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
