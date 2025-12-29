"use client";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function Home() {
  const [suhu, setSuhu] = useState(0);

  useEffect(() => {
    const suhuRef = ref(db, "iot/suhu");
    // Listener Real-time
    onValue(suhuRef, (snapshot) => {
      setSuhu(snapshot.val());
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-8">IoT Dashboard</h1>
      <div className="p-10 bg-slate-800 rounded-2xl shadow-xl border border-blue-500">
        <p className="text-xl">Suhu Sensor Saat Ini:</p>
        <p className="text-7xl font-mono text-blue-400 mt-4">{suhu}°C</p>
      </div>
    </main>
  );
}