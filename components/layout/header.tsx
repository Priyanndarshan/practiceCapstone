// UI: Header - top navigation with links; client-side state for mobile menu.
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  // Tracks whether the mobile menu is open; toggled by the hamburger button.
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // Sticky bar at top of viewport with dark background and bottom border.
    <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-gray-900">
      {/* Inner flex container: logo left, nav/button right, centered with max-width. */}
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Logo + site name: links to home. */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white"
        >
          <span className="text-2xl" aria-hidden>🎓</span>
          StudentHub
        </Link>

        {/* Desktop nav: visible from sm breakpoint up; hidden on small screens. */}
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
        </nav>

        {/* Hamburger button: visible only on small screens (sm:hidden). Click toggles menuOpen. */}
        <button
          type="button"
          className="flex cursor-pointer flex-col justify-center gap-1.5 border-none bg-transparent p-2 sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {/* Top bar: when open, moves down and rotates to form top of X. */}
          <span
            className={`block h-0.5 w-5 rounded bg-white transition-all duration-200 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          {/* Middle bar: when open, fades out so only two lines form the X. */}
          <span
            className={`block h-0.5 w-5 rounded bg-white transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          {/* Bottom bar: when open, moves up and rotates to form bottom of X. */}
          <span
            className={`block h-0.5 w-5 rounded bg-white transition-all duration-200 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown: only rendered when menuOpen is true; visible only on small screens. */}
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
        </nav>
      )}
    </header>
  );
}
