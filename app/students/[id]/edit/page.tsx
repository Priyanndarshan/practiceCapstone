"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Student } from "@/types/student";
import Container from "@/components/layout/container";

export default function EditStudentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: "",
    email: "",
    semester: "",
    enrollmentYear: "",
    feesPaid: false,
  });

  const [loading, setLoading] = useState(true);

  async function fetchStudent() {
    try {
      const res = await fetch(`/api/students/${id}`);
      if (!res.ok) throw new Error("Student not found");

      const data: Student = await res.json();

      setFormData({
        name: data.name,
        age: data.age.toString(),
        course: data.course,
        email: data.email,
        semester: data.semester.toString(),
        enrollmentYear: data.enrollmentYear.toString(),
        feesPaid: data.feesPaid,
      });
    } catch {
      alert("Student not found");
      router.push("/students");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch(`/api/students/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        age: Number(formData.age),
        semester: Number(formData.semester),
        enrollmentYear: Number(formData.enrollmentYear),
      }),
    });

    if (!res.ok) {
      alert("Failed to update student");
      return;
    }

    router.push(`/students/${id}`);
  }

  if (loading) return <div className="loading-state">Loading...</div>;

  return (
    <Container>
      <div className="fade-up" style={{ maxWidth: 560, margin: "0 auto" }}>
        <div className="page-header">
          <h1 className="page-title">Edit Student</h1>
        </div>

        <form onSubmit={handleSubmit} className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <input className="form-input" id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="age">Age</label>
            <input className="form-input" id="age" type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="course">Course</label>
            <input className="form-input" id="course" type="text" name="course" value={formData.course} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input className="form-input" id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label" htmlFor="semester">Semester</label>
              <input className="form-input" id="semester" type="number" name="semester" value={formData.semester} onChange={handleChange} required min="1" max="10" />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="enrollmentYear">Enrollment Year</label>
              <input className="form-input" id="enrollmentYear" type="number" name="enrollmentYear" value={formData.enrollmentYear} onChange={handleChange} required min="2018" max="2030" />
            </div>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="feesPaid" name="feesPaid" checked={formData.feesPaid} onChange={handleChange} />
            <label htmlFor="feesPaid">Fees Paid</label>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button className="btn btn-primary" type="submit">
              Update Student
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => router.push(`/students/${id}`)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
