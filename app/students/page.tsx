/* Students page (refactored)
   - Uses the `useStudents` hook for all data/state.
   - Composes filter components for search, course, year(s), and fees.
*/
"use client";

import Link from "next/link";
import Container from "../../components/layout/container";
import StudentCard from "../../components/ui/student-card";
import SearchInput from "../../components/filters/SearchInput";
import CourseSelect from "../../components/filters/CourseSelect";
import YearMultiSelect from "../../components/filters/YearMultiSelect";
import FeesToggle from "../../components/filters/FeesToggle";
import { useStudents } from "../../hooks/useStudents";

export default function StudentsPage() {
  const {
    students,
    loading,
    query,
    setQuery,
    courses,
    years,
    courseFilter,
    setCourseFilter,
    yearFilters,
    setYearFilters,
    feesFilter,
    setFeesFilter,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    refresh,
  } = useStudents(6);

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    await fetch(`/api/students/${id}`, { method: "DELETE" });
    await refresh();
  }

  if (loading) {
    return <div className="loading-state">Loading students...</div>;
  }

  return (
    <Container>
      <div className="fade-up" style={{ maxWidth: 780, margin: "0 auto" }}>
        <div className="page-header">
          <h1 className="page-title">Students</h1>
          <Link href="/students/add" className="btn btn-primary">
            + Add Student
          </Link>
        </div>

        <div className="filter-bar">
          <SearchInput value={query} onChange={setQuery} placeholder="Search by name, email or course..." />
        </div>

        <div className="filter-bar">
          <CourseSelect options={courses} value={courseFilter} onChange={setCourseFilter} />
          <YearMultiSelect options={years} selected={yearFilters} onChange={setYearFilters} label="Years" className="relative" />
          <FeesToggle value={feesFilter} onChange={setFeesFilter} />
        </div>

        {students.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p className="empty-state-text">No students found.</p>
          </div>
        ) : (
          <>
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
                  onDelete={handleDelete}
                />
              ))}
            </ul>

            <div className="pagination">
              <div className="pagination-buttons">
                <button className="btn btn-secondary" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
                  ← Previous
                </button>
                <button className="btn btn-secondary" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
                  Next →
                </button>
              </div>

              <div className="pagination-info">
                <span>
                  Page {page} of {Math.max(1, totalPages)}
                </span>
                <span>·</span>
                <label htmlFor="perPage">Per page</label>
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
