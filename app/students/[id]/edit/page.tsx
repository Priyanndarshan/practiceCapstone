// EDIT STUDENT PAGE — Client Component (needs form state + dynamic fetching).
// Route: /students/:id/edit
// On load, fetches the existing student data and pre-fills the form.
// On submit, sends a PATCH request with only the changed fields.
// PATCH (not PUT) is used because we do partial updates — only modified fields are sent.
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Student } from "@/types/student";
import Container from "@/components/Container";

export default function EditStudentPage() {
  // useParams() extracts the dynamic [id] from the URL
  const { id } = useParams();
  const router = useRouter();

  // Single state object for all form fields (cleaner than 4 separate useState calls)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch the current student data to pre-fill the form
  async function fetchStudent() {
    try {
      const res = await fetch(`/api/students/${id}`);
      if (!res.ok) {
        throw new Error("Student not found");
      }

      const data: Student = await res.json();

      // Pre-fill form with existing values
      setFormData({
        name: data.name,
        age: data.age.toString(),
        course: data.course,
        email: data.email,
      });

    } catch (error) {
      alert("Student not found");
      router.push("/students");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  // Generic change handler — uses the input's "name" attribute to update the right field
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Submit the updated data via PATCH /api/students/:id
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch(`/api/students/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        age: Number(formData.age),
      }),
    });

    if (!res.ok) {
      alert("Failed to update student");
      return;
    }

    // On success, redirect to the student's detail page
    router.push(`/students/${id}`);
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <Container>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Edit Student</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              className="form-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              className="form-input"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <input
              className="form-input"
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-3">
            <button className="btn" type="submit">
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
