import Link from "next/link";

export default function Home() {
  return (
    <div className="hero">
      <div className="hero-inner">
        <div className="hero-sub">Student Management System</div>

        <h1 className="hero-title">
          Organize. Track. <span className="accent">Succeed.</span>
        </h1>

        <p className="hero-lead">
          A streamlined platform for managing student records, enrollment, and
          academic tracking — built for Indian colleges and universities.
        </p>

        <div className="cta-group">
          <Link href="/students" className="btn-hero-primary">
            View Students →
          </Link>
        </div>
      </div>
    </div>
  );
}
