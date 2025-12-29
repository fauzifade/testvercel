import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // --- PASTE CONFIG KAMU DI SINI (JANGAN SAMPAI HILANG) ---
  apiKey: "AIzaSyBMCZJifEaR3JTV00Huy1lLYUjxWxvBkNk",
  authDomain: "testiotdivercelfirebase.firebaseapp.com",
  databaseURL: "https://testiotdivercelfirebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testiotdivercelfirebase",
  storageBucket: "testiotdivercelfirebase.firebasestorage.app",
  messagingSenderId: "764706329432",
  appId: "1:764706329432:web:e45c0d6453b6ac0bb54b2d",
  measurementId: "G-J0XT6V87WT"
};

// --- BAGIAN INI YANG KITA UBAH ---
// Logika: Cek apakah ada app yang sudah jalan?
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Export database biar bisa dipakai
export const database = getDatabase(app);