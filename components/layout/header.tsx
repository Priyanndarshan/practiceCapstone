"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-gray-900">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white"
        >
          <span className="text-2xl" aria-hidden></span>
          StudentHub
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/students"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            Students
          </Link>
          <a
            href="/api/logout"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            Logout
          </a>
        </nav>

        <button
          type="button"
          className="flex cursor-pointer flex-col justify-center gap-1.5 border-none bg-transparent p-2 sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block h-0.5 w-5 rounded bg-white transition-all duration-200 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded bg-white transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded bg-white transition-all duration-200 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-b border-white/10 bg-gray-900 px-4 pb-4 pt-3 sm:hidden">
          <Link
            href="/"
            className="border-b border-white/10 py-3 text-base font-medium text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/students"
            className="border-b border-white/10 py-3 text-base font-medium text-gray-300 last:border-none hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Students
          </Link>
          <a
            href="/api/logout"
            className="border-b border-white/10 py-3 text-base font-medium text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Logout
          </a>
        </nav>
      )}
    </header>
  );
}
