import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-6">IoT Project Fauzi</h1>
      <Link 
        href="/dashboard" 
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition"
      >
        Buka Dashboard IoT 🚀
      </Link>
    </div>
  );
}