// UI: Header - top navigation with links; client-side state for mobile menu.
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] h-16 bg-[#0f0e26] border-b border-white/5">
      <div className="w-full max-w-full mx-auto h-full flex items-center justify-between px-[4vw]">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white tracking-tight">
          <span className="text-2xl">🎓</span>
          StudentHub
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          <Link
            href="/"
            className="py-2 px-3.5 text-sm font-medium text-white/70 rounded-lg transition-colors hover:text-white hover:bg-white/10"
          >
            Home
          </Link>
          <Link
            href="/students"
            className="py-2 px-3.5 text-sm font-medium text-white/70 rounded-lg transition-colors hover:text-white hover:bg-white/10"
          >
            Students
          </Link>
        </nav>

        <button
          type="button"
          className="sm:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-[22px] h-0.5 bg-white rounded transition-transform duration-200 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-0.5 bg-white rounded transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-0.5 bg-white rounded transition-transform duration-200 ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="sm:hidden flex flex-col bg-[#0f0e26] border-b border-white/5 py-3 px-5 pb-4">
          <Link
            href="/"
            className="py-3 text-[0.95rem] font-medium text-white/70 border-b border-white/5 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/students"
            className="py-3 text-[0.95rem] font-medium text-white/70 border-b border-white/5 last:border-none hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Students
          </Link>
        </nav>
      )}
    </header>
  );
}
