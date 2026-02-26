import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 px-4 py-16 text-white sm:px-6">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 max-w-2xl text-center">
        <div className="mb-5 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400">
          Student Management System
        </div>

        <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          Organize. Track.{" "}
          <span className="bg-gradient-to-br from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Succeed.
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-300">
          A streamlined platform for managing student records, enrollment, and
          academic tracking — built for Indian colleges and universities.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/students"
            className="inline-flex items-center gap-2 rounded-lg border-none bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl"
          >
            View Students →
          </Link>
        </div>
      </div>
    </div>
  );
}
