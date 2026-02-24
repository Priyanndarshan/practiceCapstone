// HEADER — Server Component (no "use client").
// Renders the top navigation bar on every page (imported in layout.tsx).
// Contains the app logo/name and a link to the Students list.
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="app-container flex items-center justify-between !my-0 !py-4">
        <Link href="/" className="text-xl font-semibold text-indigo-600 no-underline">
          StudentMgmt
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/students" className="text-sm text-gray-700 hover:text-indigo-600 no-underline">
            Students
          </Link>
        </nav>
      </div>
    </header>
  );
}
