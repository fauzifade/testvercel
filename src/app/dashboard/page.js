"use client"; // Wajib tambah ini di baris paling atas karena kita pakai Hooks
import { useEffect, useState } from "react";
import { database } from "../firebase"; // Import config yang tadi dibuat
import { ref, onValue } from "firebase/database";

export default function Dashboard() {
  // Siapkan state buat nampung data
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    status: "Offline"
  });

  useEffect(() => {
    // Arahkan ke folder 'monitoring' di database
    const sensorRef = ref(database, 'monitoring'); 

    // Fungsi ini akan jalan SETIAP KALI data di Firebase berubah
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(data);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8">🔥 IoT Realtime Monitor</h1>

      {/* KARTU STATUS UTAMA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Kartu Suhu */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 text-sm">Temperature</h3>
          <div className="text-4xl font-bold mt-2">{sensorData.temperature}°C</div>
        </div>

        {/* Kartu Kelembaban */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 text-sm">Humidity</h3>
          <div className="text-4xl font-bold mt-2 text-blue-400">{sensorData.humidity}%</div>
        </div>

        {/* Kartu Status Nyala-Nyala */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-center justify-between">
          <div>
            <h3 className="text-gray-400 text-sm">Device Status</h3>
            <div className="text-2xl font-bold mt-2">{sensorData.status}</div>
          </div>

          {/* Logika Lampu: Kalau 'Online' dia hijau, kalau 'Offline' dia merah */}
          <span className="relative flex h-6 w-6">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${sensorData.status === 'Online' ? 'bg-green-400' : 'bg-red-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-6 w-6 ${sensorData.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </span>
        </div>

      </div>
    </div>
  );
}