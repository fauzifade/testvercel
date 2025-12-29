export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-24 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center w-full mb-4">
          Halo, Dunia! 🚀
        </h1>
        <p className="text-xl text-center w-full text-gray-400">
          Ini website pertama gue yang hosting di Vercel.
        </p>
        
        <div className="mt-10 flex justify-center w-full">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            Klik Gue Dong
          </button>
        </div>
      </div>
    </main>
  );
}