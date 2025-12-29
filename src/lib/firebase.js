import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBMCZJifEaR3JTV00Huy1lLYUjxWxvBkNk",
  authDomain: "testiotdivercelfirebase.firebaseapp.com",
  databaseURL: "https://testiotdivercelfirebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testiotdivercelfirebase",
  storageBucket: "testiotdivercelfirebase.firebasestorage.app",
  messagingSenderId: "764706329432",
  appId: "1:764706329432:web:e45c0d6453b6ac0bb54b2d",
  measurementId: "G-J0XT6V87WT"
};

// LOGIKA BARU: Cek dulu sebelum nyalain
// "Kalau apps-nya 0 (belum ada), nyalain baru. Kalau udah ada, pake yang lama."
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const database = getDatabase(app);