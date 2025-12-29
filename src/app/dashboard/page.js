"use client";
import { useEffect, useState } from "react";
import { database } from "../firebase"; // Pastikan path ini benar
import { ref, onValue } from "firebase/database";

export default function Dashboard() {
  const [suhu, setSuhu] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    // KUNCI UTAMA: Kita "dengar" data dari folder 'cek'
    const sensorRef = ref(database, 'cek'); 
    
    // Fungsi ini jalan otomatis tiap angka di Firebase berubah
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Data masuk:", data); // Cek di Console Browser (F12) kalau penasaran
      
      if (data && data.suhu !== undefined) {
        setSuhu(data.suhu);
        // Bikin jam update otomatis
        const now = new Date();
        setLastUpdate(now.toLocaleTimeString());
      }
    });

    // Bersih-bersih memori pas keluar halaman
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">🔥 IoT Monitor Sederhana</h1>

      {/* KARTU SUHU */}
      <div className="bg-gray-800 p-10 rounded-2xl border-2 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] text-center">
        <p className="text-gray-400 text-lg mb-2">Suhu Ruangan</p>
        
        {/* ANGKA GEDE */}
        <div className="text-7xl font-mono font-bold text-white mb-4">
          {suhu}°C
        </div>

        {/* STATUS NYALA */}
        <div className="flex items-center justify-center gap-2 bg-gray-900/50 py-2 px-4 rounded-full">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs text-green-400">Live Update: {lastUpdate}</span>
        </div>
      </div>

      <p className="mt-8 text-gray-500 text-sm">Data dari ESP32 via Firebase</p>
    </div>
  );
}