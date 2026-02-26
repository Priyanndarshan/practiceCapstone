import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-[#0c0a1d] via-[#1a1145] via-[25%] via-[#1e2a5e] via-[50%] via-[#142940] to-[#0a1628] text-white py-16 px-5 relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(99,102,241,0.2),rgba(139,92,246,0.08)_40%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(6,182,212,0.15),rgba(34,211,238,0.05)_40%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[720px] text-center relative z-10">
        <div className="inline-block text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-5 py-1.5 px-3.5 border border-cyan-400/25 rounded-full bg-cyan-400/10">
          Student Management System
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Organize. Track.{" "}
          <span className="bg-gradient-to-br from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Succeed.
          </span>
        </h1>

        <p className="text-white/70 text-[1.05rem] max-w-[52ch] mx-auto mb-8 leading-relaxed">
          A streamlined platform for managing student records, enrollment, and
          academic tracking — built for Indian colleges and universities.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/students"
            className="inline-flex items-center gap-2 py-3 px-6 bg-indigo-600 text-white font-semibold text-[0.95rem] border-none rounded-lg cursor-pointer transition-all duration-150 shadow-[0_4px_16px_rgba(79,70,229,0.3)] hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(79,70,229,0.35)]"
          >
            View Students →
          </Link>
        </div>
      </div>
    </div>
  );
}
