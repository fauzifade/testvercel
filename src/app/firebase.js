// src/app/firebase.js

import { initializeApp } from "firebase/app";
// TAMBAHAN 1: Kita wajib import getDatabase
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyBMCZJifEaR3JTV00Huy1lLYUjxWxvBkNk",
  authDomain: "testiotdivercelfirebase.firebaseapp.com",
  // Pastikan databaseURL ini benar (biasanya ada di copy-an config kamu)
  databaseURL: "https://testiotdivercelfirebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testiotdivercelfirebase",
  storageBucket: "testiotdivercelfirebase.firebasestorage.app",
  messagingSenderId: "764706329432",
  appId: "1:764706329432:web:e45c0d6453b6ac0bb54b2d",
  measurementId: "G-J0XT6V87WT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// TAMBAHAN 2: Inisialisasi Database dan EXPORT biar bisa dipakai di file lain
export const database = getDatabase(app);   