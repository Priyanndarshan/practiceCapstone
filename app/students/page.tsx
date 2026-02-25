// Students page (refactored) - commented line-by-line for clarity.
// This page shows a searchable, filterable, paginated list of students.
// Teaching points: custom hook usage (useStudents), composition of filter components, and pagination.

// Enable client-side React features (hooks, state) for this page.
"use client";

// Import next/link for client navigation without full reloads.
import Link from "next/link";
// Import Container component to center and constrain page width.
import Container from "../../components/layout/container";
// Import StudentCard component to render each student row.
import StudentCard from "../../components/ui/student-card";
// Import SearchInput component (controlled input bound to hook's query).
import SearchInput from "../../components/filters/SearchInput";
// Import CourseSelect component to filter by course.
import CourseSelect from "../../components/filters/CourseSelect";
// Import FeesToggle to filter by fees paid/unpaid.
import FeesToggle from "../../components/filters/FeesToggle";
// Import the useStudents hook which encapsulates fetching, filters and pagination.
import { useStudents } from "../../hooks/useStudents";

// Default export: StudentsPage component
export default function StudentsPage() {
  // Destructure the API returned by useStudents to access data and controls
  const {
    students, // current page of students
    loading, // loading indicator while fetching
    query, // current search input value
    setQuery, // function to update search input
    courses, // available course options for the CourseSelect dropdown
    courseFilter, // currently selected course filter
    setCourseFilter, // setter for courseFilter
    feesFilter, // currently selected fees filter
    setFeesFilter, // setter for feesFilter
    page, // current page number
    setPage, // function to change page
    limit, // items per page
    setLimit, // setter for items per page
    totalPages, // total pages available
    refresh, // manual refresh function to re-fetch data
  } = useStudents(6); // initialize hook with default page size = 6

  // handleDelete: invoked when a StudentCard triggers deletion.
  // Shows a confirmation dialog, calls DELETE endpoint, and refreshes results.
  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return; // abort if user cancels

    await fetch(`/api/students/${id}`, { method: "DELETE" }); // request server to delete
    await refresh(); // refresh the current list to reflect deletion
  }

  // If data is still loading, show a simple loading state.
  if (loading) {
    return <div className="loading-state">Loading students...</div>;
  }

  // Main render: container with header, filters, list, and pagination.
  return (
    <Container>
      {/* page content wrapper with subtle animation class */}
      <div className="fade-up" style={{ maxWidth: 780, margin: "0 auto" }}>
        {/* Header row: title + Add Student button */}
        <div className="page-header">
          <h1 className="page-title">Students</h1>
          {/* Link to add student page */}
          <Link href="/students/add" className="btn btn-primary">
            + Add Student
          </Link>
        </div>

        {/* Search bar row */}
        <div className="filter-bar">
          {/* Controlled search input bound to hook's query state */}
          <SearchInput value={query} onChange={setQuery} placeholder="Search by name, email or course..." />
        </div>

        {/* Filter controls row: course select and fees toggle */}
        <div className="filter-bar">
          {/* Dropdown to select course; options come from the hook */}
          <CourseSelect options={courses} value={courseFilter} onChange={setCourseFilter} />
          {/* Toggle to filter by fees paid/unpaid */}
          <FeesToggle value={feesFilter} onChange={setFeesFilter} />
        </div>

        {/* If there are no students after filtering, show an empty state */}
        {students.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p className="empty-state-text">No students found.</p>
          </div>
        ) : (
          <>
            {/* Student list: render a StudentCard for each student */}
            <ul className="student-list">
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  course={student.course}
                  email={student.email}
                  semester={student.semester}
                  feesPaid={student.feesPaid}
                  onDelete={handleDelete} // pass delete handler down as prop
                />
              ))}
            </ul>

            {/* Pagination controls: previous/next and per-page selector */}
            <div className="pagination">
              <div className="pagination-buttons">
                {/* Previous button; disabled on first page */}
                <button className="btn btn-secondary" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
                  ← Previous
                </button>
                {/* Next button; disabled on last page */}
                <button className="btn btn-secondary" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
                  Next →
                </button>
              </div>

              <div className="pagination-info">
                {/* Display current page / total pages */}
                <span>
                  Page {page} of {Math.max(1, totalPages)}
                </span>
                <span>·</span>
                <label htmlFor="perPage">Per page</label>
                {/* Per-page dropdown to change page size; resets to page 1 on change */}
                <select id="perPage" value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }} className="form-input" style={{ width: 72 }}>
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
