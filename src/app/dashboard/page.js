"use client";
import { useEffect, useState } from "react";
import { database } from "../../lib/firebase"; 
import { ref, onValue, set } from "firebase/database";

export default function Dashboard() {
  const [data, setData] = useState({
    suhu: 0,
    gas: 0,
    ph: 0,
    status_heater: "OFF",
    status_dynamo: "OFF"
  });

  const [isDynamoOn, setIsDynamoOn] = useState(false);

  useEffect(() => {
    const monitorRef = ref(database, 'monitoring');
    const unsubMonitor = onValue(monitorRef, (snapshot) => {
      const val = snapshot.val();
      if (val) setData(val);
    });

    const controlRef = ref(database, 'control/dynamo_switch');
    const unsubControl = onValue(controlRef, (snapshot) => {
      setIsDynamoOn(snapshot.val() || false);
    });

    return () => {
      unsubMonitor();
      unsubControl();
    };
  }, []);

  const toggleDynamo = () => {
    const newState = !isDynamoOn;
    set(ref(database, 'control/dynamo_switch'), newState);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-blue-400">🎛️ Control Panel IoT</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
        <div className={`p-6 rounded-xl border-l-4 ${data.suhu >= 40 ? 'bg-red-900/50 border-red-500' : 'bg-slate-800 border-blue-500'}`}>
          <p className="text-gray-400 text-sm">Suhu Air</p>
          <p className="text-4xl font-bold">{data.suhu}°C</p>
          <p className="text-xs mt-2">Heater: {data.status_heater}</p>
        </div>
        <div className="p-6 rounded-xl border-l-4 bg-slate-800 border-yellow-500">
          <p className="text-gray-400 text-sm">Gas Metana</p>
          <p className="text-4xl font-bold">{data.gas} <span className="text-lg">ppm</span></p>
        </div>
        <div className={`p-6 rounded-xl border-l-4 ${data.ph > 8 ? 'bg-red-900/50 border-red-500' : 'bg-slate-800 border-green-500'}`}>
          <p className="text-gray-400 text-sm">Kadar pH</p>
          <p className="text-4xl font-bold">{data.ph}</p>
        </div>
      </div>
      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-md text-center border border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold mb-4">⚙️ Kontrol Dinamo</h2>
        <div className="mb-6 p-3 bg-slate-900 rounded-lg">
          Status: <span className={`font-mono font-bold ${data.status_dynamo.includes("OFF") ? "text-red-400" : "text-green-400"}`}>
            {data.status_dynamo}
          </span>
        </div>
        <button
          onClick={toggleDynamo}
          className={`w-full py-4 rounded-xl font-bold text-xl transition-all shadow-lg
            ${isDynamoOn 
              ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' 
              : 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
            }`}
        >
          {isDynamoOn ? "MATIKAN DINAMO" : "NYALAKAN DINAMO"}
        </button>
        <p className="text-xs text-gray-500 mt-4">
          *Dinamo otomatis mati jika <strong>pH &gt; 8.0</strong>
        </p>
      </div>
    </div>
  );
}