"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStudentPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!name.trim() || !age.trim() || !course.trim() || !email.trim()) {
            setError("All fields are required.");
            return;
        }

        if (isNaN(Number(age)) || Number(age) <= 0) {
            setError("Age must be a valid positive number.");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), age: Number(age), course: course.trim(), email: email.trim() }),
            });

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                throw new Error(payload?.message || "Failed to create student");
            }

            // Navigate back to students list
            router.push("/students");
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div style={{ padding: 20, maxWidth: 600 }}>
            <h1>Add Student</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>
                        Name
                        <input value={name} onChange={(e) => setName(e.target.value)} required style={{ display: "block", width: "100%" }} />
                    </label>
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>
                        Age
                        <input value={age} onChange={(e) => setAge(e.target.value)} required inputMode="numeric" style={{ display: "block", width: "100%" }} />
                    </label>
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>
                        Course
                        <input value={course} onChange={(e) => setCourse(e.target.value)} required style={{ display: "block", width: "100%" }} />
                    </label>
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>
                        Email
                        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" style={{ display: "block", width: "100%" }} />
                    </label>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div style={{ marginTop: 16 }}>
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Adding..." : "Add Student"}
                    </button>
                    <button type="button" onClick={() => router.push("/students")} style={{ marginLeft: 8 }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}