// STUDENTS LIST PAGE — Client Component (needs useState, useEffect for fetching data).
// Route: /students
// This page fetches all students from the API on mount and displays them
// using the reusable StudentCard component. It also handles inline deletion.
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Student } from "@/types/student";
import Container from "@/components/Container";
import StudentCard from "@/components/StudentCard";

export default function StudentsPage() {
  // Server data + UI state
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & filter state
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");

  // Fetch students from the API
  async function fetchStudents() {
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  // Debounce the search input (300ms)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Derived list of unique courses for the filter dropdown
  const courses = useMemo(() => {
    const setC = new Set<string>();
    students.forEach((s) => setC.add(s.course));
    return ["all", ...Array.from(setC).sort()];
  }, [students]);

  // Compute filtered list using memoization
  const filtered = useMemo(() => {
    return students.filter((s) => {
      // course filter
      if (courseFilter !== "all" && s.course !== courseFilter) return false;

      // search across name, email, and course
      if (!debouncedQuery) return true;
      const q = debouncedQuery;
      return (
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q)
      );
    });
  }, [students, courseFilter, debouncedQuery]);

  // Delete handler triggers server delete then refreshes
  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    // Re-fetch to keep client in sync with server
    fetchStudents();
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <Container>
      <div className="max-w-3xl mx-auto py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Students</h1>
          <Link href="/students/add" className="btn no-underline">
            Add Student
          </Link>
        </div>

        {/* Search + Filter controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 w-full sm:w-2/3">
            <input
              aria-label="Search students"
              placeholder="Search by name, email or course..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-input"
              style={{ width: "100%" }}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="muted text-sm mr-2">Course</label>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="form-input"
            >
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All" : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="muted">No students found.</p>
        ) : (
          <ul className="space-y-3 list-none p-0">
            {filtered.map((student) => (
              <StudentCard
                key={student.id}
                id={student.id}
                name={student.name}
                course={student.course}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
