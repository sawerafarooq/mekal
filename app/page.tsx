import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="text-7xl mb-4 animate-bounce">🚀</div>
        <h1 className="font-fredoka text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Mekal Invest
        </h1>
        <p className="text-xl md:text-2xl mb-2 opacity-95">
          A stock-picking competition for classrooms
        </p>
        <p className="text-base opacity-80 mb-10">
          For kids 8–12 · Safe · Educational · Fun
        </p>

        <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto">
          <Link
            href="/invest.html"
            className="block bg-white text-purple-600 font-bold text-lg px-6 py-4 rounded-2xl shadow-xl hover:scale-105 hover:rotate-[-1deg] transition-transform"
          >
            🎮 Open the classic app
            <div className="text-xs font-normal opacity-70 mt-1">
              Quiz, stocks, savings calculator & more
            </div>
          </Link>

          <Link
            href="/game.html"
            className="block bg-white/20 backdrop-blur border border-white/40 text-white font-bold text-lg px-6 py-4 rounded-2xl shadow-xl hover:scale-105 hover:rotate-[1deg] transition-transform"
          >
            🐍 Play Snake
            <div className="text-xs font-normal opacity-70 mt-1">
              The original arcade classic
            </div>
          </Link>
        </div>

        <p className="mt-12 text-sm opacity-60">
          v7.0 · Migrating to Next.js · Classroom features coming soon
        </p>
      </div>
    </main>
  );
}
