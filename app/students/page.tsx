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
    error,
  } = useStudents(6);

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    await refresh();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-base text-gray-400">
        Loading students...
      </div>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-col flex-wrap justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <Link
            href="/students/add"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-indigo-600 px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-indigo-700 active:scale-95"
          >
            + Add Student
          </Link>
        </div>

        <div className="mb-6 flex flex-col flex-wrap items-stretch gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by name, email or course..."
          />
        </div>

        <div className="mb-6 flex flex-col flex-wrap items-stretch gap-3 sm:flex-row sm:items-center">
          <CourseSelect options={courses} value={courseFilter} onChange={setCourseFilter} />
          <FeesToggle value={feesFilter} onChange={setFeesFilter} />
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {students.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <div className="mb-3 text-4xl">📭</div>
            <p className="text-base">No students found.</p>
          </div>
        ) : (
          <>
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

            <div className="mt-6 flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  &larr; Previous
                </button>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  Next &rarr;
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
