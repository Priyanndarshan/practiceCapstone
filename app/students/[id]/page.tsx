// STUDENT DETAILS PAGE — Client Component (needs dynamic data fetching).
// Route: /students/:id  (the [id] folder makes this a dynamic route)
// Fetches a single student by ID from the API and displays their details.
// Also provides Edit, Delete, and Back actions.
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Student } from "@/types/student";
import Link from "next/link";
import Container from "@/components/Container";

export default function StudentDetailsPage() {
  // useParams() extracts the dynamic [id] from the URL
  const { id } = useParams();
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetches GET /api/students/:id — returns 404 if not found
  async function fetchStudent() {
    try {
      const res = await fetch(`/api/students/${id}`);

      if (!res.ok) {
        throw new Error("Student not found");
      }

      const data = await res.json();
      setStudent(data);
    } catch (err) {
      setError("Student not found");
    } finally {
      setLoading(false);
    }
  }

  // Sends DELETE /api/students/:id then redirects to the list
  async function handleDelete() {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    router.push("/students");
  }

  // Fetch student data when the page loads (or when id changes)
  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <Container>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Student Details</h1>

        <div className="card space-y-2">
          <p><strong>Name:</strong> {student?.name}</p>
          <p><strong>Age:</strong> {student?.age}</p>
          <p><strong>Course:</strong> {student?.course}</p>
          <p><strong>Email:</strong> {student?.email}</p>
        </div>

        <div className="flex gap-3 mt-4">
          <Link href={`/students/${id}/edit`} className="btn-secondary no-underline">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn danger">Delete</button>
          <Link href="/students" className="btn-secondary no-underline">
            Back
          </Link>
        </div>
      </div>
    </Container>
  );
}
