// Students page - searchable, filterable, paginated list.
"use client"; // Run this component on the client so hooks and browser APIs work.

import Link from "next/link"; // Next.js component for client-side navigation without full reload.
import Container from "../../components/layout/container"; // Wrapper that constrains page width and padding.
import StudentCard from "../../components/ui/student-card"; // Card component showing one student's info and actions.
import SearchInput from "../../components/filters/SearchInput"; // Text input for searching students by name, email, or course.
import CourseSelect from "../../components/filters/CourseSelect"; // Dropdown to filter students by course.
import FeesToggle from "../../components/filters/FeesToggle"; // Toggle to filter by fees paid status.
import { useStudents } from "../../hooks/useStudents"; // Custom hook that fetches students and manages filters, pagination, and refresh.

export default function StudentsPage() {
  // Destructure all state and handlers from the hook; 6 is the default page size (limit).
  const {
    students, // Array of student objects for the current page.
    loading, // True while the initial or refreshed data is being fetched.
    query, // Current search text.
    setQuery, // Updates search text and triggers refetch.
    courses, // List of unique course names for the filter dropdown.
    courseFilter, // Currently selected course filter (or empty for all).
    setCourseFilter, // Updates course filter and triggers refetch.
    feesFilter, // Current fees filter: "all" | "paid" | "unpaid".
    setFeesFilter, // Updates fees filter and triggers refetch.
    page, // Current page number (1-based).
    setPage, // Sets current page (used by prev/next and when changing limit).
    limit, // Number of students per page.
    setLimit, // Changes page size (e.g. 5, 6, 10).
    totalPages, // Total number of pages based on total count and limit.
    refresh, // Function to refetch students (e.g. after delete).
  } = useStudents(6);

  // Handles delete: confirms with user, calls DELETE API, then refreshes the list.
  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return; // User cancelled; do nothing.
    await fetch(`/api/students/${id}`, { method: "DELETE" }); // Send DELETE request to API route.
    await refresh(); // Refetch students so the list updates without the deleted student.
  }

  // While loading, show a simple centered message instead of the full page.
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-base text-gray-400">
        Loading students...
      </div>
    );
  }

  // Main layout: container with max width, header, filters, list or empty state, and pagination.
  return (
    <Container>
      <div className="mx-auto max-w-3xl">
        {/* Header row: title on the left, "Add Student" link on the right (stacks on small screens). */}
        <div className="mb-6 flex flex-col flex-wrap justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <Link
            href="/students/add"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-indigo-600 px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-indigo-700 active:scale-95"
          >
            + Add Student
          </Link>
        </div>

        {/* Search bar: controlled by query/setQuery from the hook. */}
        <div className="mb-6 flex flex-col flex-wrap items-stretch gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by name, email or course..."
          />
        </div>

        {/* Course and fees filters in one row. */}
        <div className="mb-6 flex flex-col flex-wrap items-stretch gap-3 sm:flex-row sm:items-center">
          <CourseSelect options={courses} value={courseFilter} onChange={setCourseFilter} />
          <FeesToggle value={feesFilter} onChange={setFeesFilter} />
        </div>

        {/* If no students match filters, show empty state; otherwise show list and pagination. */}
        {students.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <div className="mb-3 text-4xl">📭</div>
            <p className="text-base">No students found.</p>
          </div>
        ) : (
          <>
            {/* List of student cards; each card gets delete handler. */}
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  course={student.course}
                  email={student.email}
                  semester={student.semester}
                  feesPaid={student.feesPaid}
                  onDelete={handleDelete}
                />
              ))}
            </ul>

            {/* Pagination: previous/next buttons and per-page selector; resets to page 1 when limit changes. */}
            <div className="mt-6 flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  Next →
                </button>
              </div>

              {/* Page indicator and per-page dropdown; changing limit resets to page 1. */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>
                  Page {page} of {Math.max(1, totalPages)}
                </span>
                <span>·</span>
                <label htmlFor="perPage">Per page</label>
                <select
                  id="perPage"
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className="w-20 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
                >
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={10}>10</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
