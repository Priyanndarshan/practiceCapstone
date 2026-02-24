// ADD STUDENT PAGE — Client Component (needs form state and navigation).
// Route: /students/add
// Renders a form with client-side validation. On submit, sends POST /api/students.
// If the API returns an error, the message is displayed. On success, redirects to the list.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";

export default function AddStudentPage() {
    const router = useRouter();

    // Each form field gets its own state variable
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        // Prevent default form submission (which would reload the page)
        e.preventDefault();
        setError(null);

        // CLIENT-SIDE VALIDATION — checks before we even hit the API
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
            // POST request to our API route with the form data as JSON
            const res = await fetch("/api/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), age: Number(age), course: course.trim(), email: email.trim() }),
            });

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                throw new Error(payload?.message || "Failed to create student");
            }

            // On success, navigate back to the students list
            router.push("/students");
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Container>
            <div className="max-w-2xl mx-auto py-8">
                <h1 className="text-2xl font-semibold mb-4">Add Student</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input className="form-input" value={age} onChange={(e) => setAge(e.target.value)} required inputMode="numeric" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course</label>
                        <input className="form-input" value={course} onChange={(e) => setCourse(e.target.value)} required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div className="flex items-center gap-3">
                        <button className="btn" type="submit" disabled={submitting}>
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
