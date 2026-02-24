"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Student } from "@/types/student";
import Link from "next/link";
import Container from "@/components/layout/container";

export default function StudentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchStudent() {
    try {
      const res = await fetch(`/api/students/${id}`);
      if (!res.ok) throw new Error("Student not found");
      const data = await res.json();
      setStudent(data);
    } catch {
      setError("Student not found");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    router.push("/students");
  }

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  if (loading) return <div className="loading-state">Loading...</div>;
  if (error)
    return (
      <Container>
        <div className="empty-state">
          <div className="empty-state-icon">😕</div>
          <p className="empty-state-text">{error}</p>
          <Link href="/students" className="btn btn-secondary" style={{ marginTop: "1rem", display: "inline-flex" }}>
            ← Back to Students
          </Link>
        </div>
      </Container>
    );

  return (
    <Container>
      <div className="fade-up" style={{ maxWidth: 640, margin: "0 auto" }}>
        <div className="page-header">
          <h1 className="page-title">Student Details</h1>
        </div>

        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div className="student-card-avatar" style={{ width: 56, height: 56, fontSize: "1.4rem" }}>
              {student?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{student?.name}</h2>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>{student?.course}</p>
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Age</span>
              <span className="detail-value">{student?.age} years</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{student?.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Semester</span>
              <span className="detail-value">Semester {student?.semester}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Enrollment Year</span>
              <span className="detail-value">{student?.enrollmentYear}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Fees Status</span>
              <span className="detail-value">
                <span className={`badge ${student?.feesPaid ? "badge-success" : "badge-warning"}`}>
                  {student?.feesPaid ? "Paid" : "Unpaid"}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
          <Link href={`/students/${id}/edit`} className="btn btn-primary">
            Edit Student
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
          <Link href="/students" className="btn btn-secondary">
            ← Back
          </Link>
        </div>
      </div>
    </Container>
  );
}
