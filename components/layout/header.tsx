"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="header-inner">
                <Link href="/" className="header-logo">
                    <span className="logo-icon">🎓</span>
                    StudentHub
                </Link>

                {/* Desktop nav */}
                <nav className="header-nav-desktop">
                    <Link href="/" className="header-link">
                        Home
                    </Link>
                    <Link href="/students" className="header-link">
                        Students
                    </Link>
                </nav>

                {/* Mobile hamburger */}
                <button
                    className="hamburger-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
                    <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
                    <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <nav className="header-nav-mobile">
                    <Link
                        href="/"
                        className="header-link-mobile"
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/students"
                        className="header-link-mobile"
                        onClick={() => setMenuOpen(false)}
                    >
                        Students
                    </Link>
                </nav>
            )}
        </header>
    );
}
