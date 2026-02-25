// Page: /students/add
// Purpose: render a controlled form that creates a new student via POST /api/students.
// For beginners: this shows form state, validation, network request, and navigation.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/container";

// Component: AddStudentPage
// Renders the add-student form and handles submission to the API.
export default function AddStudentPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");
    const [email, setEmail] = useState("");
    const [semester, setSemester] = useState("");
    const [enrollmentYear, setEnrollmentYear] = useState("");
    const [feesPaid, setFeesPaid] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (
            !name.trim() ||
            !age.trim() ||
            !course.trim() ||
            !email.trim() ||
            !semester.trim() ||
            !enrollmentYear.trim()
        ) {
            setError("All fields are required.");
            return;
        }

        if (isNaN(Number(age)) || Number(age) <= 0) {
            setError("Age must be a valid positive number.");
            return;
        }

        if (isNaN(Number(semester)) || Number(semester) < 1 || Number(semester) > 10) {
            setError("Semester must be between 1 and 10.");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    age: Number(age),
                    course: course.trim(),
                    email: email.trim(),
                    semester: Number(semester),
                    enrollmentYear: Number(enrollmentYear),
                    feesPaid,
                }),
            });

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                throw new Error(payload?.message || "Failed to create student");
            }

            router.push("/students");
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Container>
            <div className="fade-up" style={{ maxWidth: 560, margin: "0 auto" }}>
                <div className="page-header">
                    <h1 className="page-title">Add Student</h1>
                </div>

                <form onSubmit={handleSubmit} className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <input className="form-input" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Aarav Sharma" />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="age">Age</label>
                        <input className="form-input" id="age" value={age} onChange={(e) => setAge(e.target.value)} required inputMode="numeric" placeholder="e.g. 20" />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="course">Course</label>
                        <input className="form-input" id="course" value={course} onChange={(e) => setCourse(e.target.value)} required placeholder="e.g. B.Tech CSE" />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-input" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="e.g. aarav@vit.ac.in" />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="semester">Semester</label>
                            <input className="form-input" id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} required inputMode="numeric" placeholder="e.g. 4" min="1" max="10" />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="enrollmentYear">Enrollment Year</label>
                            <input className="form-input" id="enrollmentYear" value={enrollmentYear} onChange={(e) => setEnrollmentYear(e.target.value)} required inputMode="numeric" placeholder="e.g. 2024" min="2018" max="2030" />
                        </div>
                    </div>

                    <div className="checkbox-group">
                        <input type="checkbox" id="feesPaid" checked={feesPaid} onChange={(e) => setFeesPaid(e.target.checked)} />
                        <label htmlFor="feesPaid">Fees Paid</label>
                    </div>

                    {error && <p className="error-text">{error}</p>}

                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                        <button className="btn btn-primary" type="submit" disabled={submitting}>
                            {submitting ? "Adding..." : "Add Student"}
                        </button>
                        <button type="button" onClick={() => router.push("/students")} className="btn btn-secondary">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Container>
    );
}
