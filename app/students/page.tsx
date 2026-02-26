// Students page - searchable, filterable, paginated list.
"use client";

import Link from "next/link";
import Container from "../../components/layout/container";
import StudentCard from "../../components/ui/student-card";
import SearchInput from "../../components/filters/SearchInput";
import CourseSelect from "../../components/filters/CourseSelect";
import FeesToggle from "../../components/filters/FeesToggle";
import { useStudents } from "../../hooks/useStudents";

export default function StudentsPage() {
  const {
    students,
    loading,
    query,
    setQuery,
    courses,
    courseFilter,
    setCourseFilter,
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
    return (
      <div className="flex items-center justify-center py-16 text-gray-400 text-[0.95rem]">
        Loading students...
      </div>
    );
  }

  return (
    <Container>
      <div className="max-w-[780px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <Link
            href="/students/add"
            className="inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold text-white bg-indigo-600 border-none rounded-lg cursor-pointer transition-colors hover:bg-indigo-700 active:scale-[0.98] no-underline"
          >
            + Add Student
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-6 flex-wrap">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by name, email or course..."
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-6 flex-wrap">
          <CourseSelect options={courses} value={courseFilter} onChange={setCourseFilter} />
          <FeesToggle value={feesFilter} onChange={setFeesFilter} />
        </div>

        {students.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-[0.95rem]">No students found.</p>
          </div>
        ) : (
          <>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
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

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 flex-wrap">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold bg-white text-gray-500 border border-gray-200 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold bg-white text-gray-500 border border-gray-200 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  Next →
                </button>
              </div>

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
                  className="w-[72px] py-2 px-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-indigo-600 focus:ring-[3px] focus:ring-indigo-600/10"
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
