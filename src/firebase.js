// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXLGv4nYvA0_t7IehN7GhuuY3MRa43OsE",
  authDomain: "aspirobot-auth.firebaseapp.com",
  projectId: "aspirobot-auth",
  storageBucket: "aspirobot-auth.firebasestorage.app",
  messagingSenderId: "1040481639293",
  appId: "1:1040481639293:web:0aeb5d8101980af0c80a14",
  measurementId: "G-G81G7DMDQK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
